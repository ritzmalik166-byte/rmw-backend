const mysql = require("mysql2/promise");

/**
 * Mirrors /tags/[keyword] slug generation (Section2 blog tags):
 * lowercase, trim, spaces → hyphens, strip quotes.
 */
function keywordToTagSlug(keyword) {
  if (typeof keyword !== "string") return null;

  const cleaned = keyword
    .replace(/['",]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  if (!cleaned) return null;

  const slug = cleaned.replace(/\s+/g, "-");
  return slug || null;
}

/** Same normalization as find-blogs-using-key: LOWER(REPLACE(meta_keywords, ', ', ',')). */
function normalizeMetaKeywordsField(metaKeywords) {
  if (typeof metaKeywords !== "string") return "";
  return metaKeywords.toLowerCase().replace(/, /g, ",");
}

/** Mirrors MySQL FIND_IN_SET — list items are not trimmed. */
function mysqlFindInSet(needle, normalizedField) {
  if (!needle || !normalizedField) return false;
  return normalizedField.split(",").some((item) => item === needle);
}

/** Reverse /tags/[slug] → keyword lookup used by find-blogs-using-key API. */
function slugToLookupKeyword(slug) {
  if (typeof slug !== "string") return null;
  const keyword = decodeURIComponent(slug.replace(/-/g, " ").trim().toLowerCase());
  return keyword || null;
}

/** True when at least one active blog matches the tag API query for this slug. */
function slugHasActiveBlogs(slug, activeBlogRows) {
  const lookupKeyword = slugToLookupKeyword(slug);
  if (!lookupKeyword) return false;

  return activeBlogRows.some((row) =>
    mysqlFindInSet(lookupKeyword, normalizeMetaKeywordsField(row.meta_keywords))
  );
}

async function fetchTagSitemapEntries() {
  const host = process.env.DATABASE_HOST;
  const user = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;
  const database = process.env.DATABASE_NAME;
  const port = Number(process.env.DATABASE_PORT || 3306);

  if (!host || !user || !database) {
    console.warn("[next-sitemap] Skipping tag URLs (database env incomplete).");
    return [];
  }

  let connection;
  try {
    connection = await mysql.createConnection({ host, user, password, database, port });

    const [rows] = await connection.execute(
      `SELECT meta_keywords
       FROM blogs
       WHERE meta_keywords IS NOT NULL
         AND TRIM(meta_keywords) <> ''
         AND status = 'active'`
    );

    const candidateSlugs = new Set();
    for (const row of rows) {
      const normalizedField = normalizeMetaKeywordsField(row.meta_keywords);
      for (const rawToken of normalizedField.split(",")) {
        const slug = keywordToTagSlug(rawToken);
        if (slug) candidateSlugs.add(slug);
      }
    }

    const paths = new Set();
    for (const slug of candidateSlugs) {
      if (slugHasActiveBlogs(slug, rows)) {
        paths.add(`/tags/${slug}`);
      }
    }

    const entries = [...paths].sort();
    console.log(
      `[next-sitemap] Tags: ${candidateSlugs.size} candidates → ${entries.length} /tags URLs with active blogs`
    );

    return entries;
  } catch (error) {
    console.error("[next-sitemap] Tag URL fetch failed", error);
    return [];
  } finally {
    if (connection) await connection.end();
  }
}

module.exports = {
  keywordToTagSlug,
  normalizeMetaKeywordsField,
  mysqlFindInSet,
  slugToLookupKeyword,
  slugHasActiveBlogs,
  fetchTagSitemapEntries,
};
