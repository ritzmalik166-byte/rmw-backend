const mysql = require("mysql2/promise");
const { resolveServiceSitemapPath } = require("./next-sitemap.shared");

/** DB slug → canonical public path when URL alias differs from service_second.link */
const SERVICE_SHORT_SLUG_REDIRECT_OVERRIDES = {
  "content-marketing": "contents-marketing/customized-content-strategy",
};

/**
 * Mirrors routing + DB shape used by app routes:
 * - /services/[secondPage] → services.link (@/lib/meta getMetaOrThrow serviceSecond)
 * - /services/[secondPage]/[thirdPage] → getAllSlugs("serviceThird") join
 */
function safeSegment(slugOrPath) {
  if (typeof slugOrPath !== "string") return null;
  const cleaned = slugOrPath.trim().replace(/^\/+|\/+$/g, "");
  if (!cleaned) return null;
  return cleaned;
}

async function fetchServiceSitemapEntries() {
  const host = process.env.DATABASE_HOST;
  const user = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;
  const database = process.env.DATABASE_NAME;
  const port = Number(process.env.DATABASE_PORT || 3306);

  if (!host || !user || !database) {
    console.warn("[next-sitemap] Skipping service URLs (database env incomplete).");
    return [];
  }

  let connection;
  try {
    connection = await mysql.createConnection({ host, user, password, database, port });

    const [secondRows] = await connection.execute(
      "SELECT link FROM services WHERE link IS NOT NULL AND TRIM(link) <> '' ORDER BY id ASC"
    );

    const [thirdRows] = await connection.execute(
      `SELECT services.link AS second_link, service_second.link AS third_link
       FROM service_second
       INNER JOIN services ON service_second.service_id = services.id
       WHERE services.link IS NOT NULL AND TRIM(services.link) <> ''
         AND service_second.link IS NOT NULL AND TRIM(service_second.link) <> ''`
    );

    const paths = new Map();

    for (const row of secondRows) {
      const seg = safeSegment(row.link);
      if (!seg) continue;
      const resolved = resolveServiceSitemapPath(`/services/${seg}`);
      if (resolved) paths.set(resolved, null);
    }

    for (const row of thirdRows) {
      const s = safeSegment(row.second_link);
      const t = safeSegment(row.third_link);
      if (!s || !t) continue;
      const resolved = resolveServiceSitemapPath(`/services/${s}/${t}`);
      if (resolved) paths.set(resolved, null);
    }

    const secondCount = secondRows.length;
    const thirdPairCount = thirdRows.length;
    console.log(
      `[next-sitemap] Services: ${secondCount} second-level rows, ${thirdPairCount} third-level rows → ${paths.size} unique /services URLs`
    );

    return Array.from(paths.entries()).map(([path, lastmod]) => ({ path, lastmod }));
  } catch (error) {
    console.error("[next-sitemap] Service URL fetch failed", error);
    return [];
  } finally {
    if (connection) await connection.end();
  }
}

/**
 * Third-level slugs wrongly exposed as /services/{slug} (not top-level services).
 * Maps third_link -> "parent_link/third_link" for 301 redirects and sitemap cleanup.
 */
async function fetchServiceShortSlugRedirects() {
  const host = process.env.DATABASE_HOST;
  const user = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;
  const database = process.env.DATABASE_NAME;
  const port = Number(process.env.DATABASE_PORT || 3306);

  if (!host || !user || !database) {
    console.warn(
      "[next-sitemap] Skipping service short-slug redirects (database env incomplete)."
    );
    return {};
  }

  let connection;
  try {
    connection = await mysql.createConnection({ host, user, password, database, port });

    const [secondRows] = await connection.execute(
      "SELECT link FROM services WHERE link IS NOT NULL AND TRIM(link) <> '' ORDER BY id ASC"
    );

    const [thirdRows] = await connection.execute(
      `SELECT services.link AS second_link, service_second.link AS third_link
       FROM service_second
       INNER JOIN services ON service_second.service_id = services.id
       WHERE services.link IS NOT NULL AND TRIM(services.link) <> ''
         AND service_second.link IS NOT NULL AND TRIM(service_second.link) <> ''
       ORDER BY services.id ASC, service_second.id ASC`
    );

    const topLevel = new Set();
    for (const row of secondRows) {
      const seg = safeSegment(row.link);
      if (seg) topLevel.add(seg);
    }

    /** @type {Record<string, string>} */
    const redirects = {};

    for (const row of thirdRows) {
      const parent = safeSegment(row.second_link);
      const child = safeSegment(row.third_link);
      if (!parent || !child || topLevel.has(child)) continue;
      if (!redirects[child]) {
        redirects[child] = `${parent}/${child}`;
      }
    }

    Object.assign(redirects, SERVICE_SHORT_SLUG_REDIRECT_OVERRIDES);

    console.log(
      `[next-sitemap] Service short-slug redirects: ${Object.keys(redirects).length} orphan /services/{slug} paths`
    );

    return redirects;
  } catch (error) {
    console.error("[next-sitemap] Service short-slug redirect fetch failed", error);
    return {};
  } finally {
    if (connection) await connection.end();
  }
}

module.exports = {
  fetchServiceSitemapEntries,
  fetchServiceShortSlugRedirects,
};
