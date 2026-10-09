const mysql = require("mysql2/promise");
const mongoose = require("mongoose");

const siteUrl = "https://ritzmediaworld.com";

const BLOG_API_CANDIDATES = [
  process.env.SITEMAP_BLOGS_API_URL,
  `${siteUrl}/api/get_all_blogs`,
  `${siteUrl}/api/all_blogs`,
].filter(Boolean);

const STATIC_PAGE_SLUGS = new Set([
  "blogs",
  "contact-us",
  "about.html",
  "new-home",
  "tags2",
  "category2",
]);

function safeToPath(slugOrPath) {
  if (typeof slugOrPath !== "string") return null;
  const cleaned = slugOrPath.trim().replace(/^\/+|\/+$/g, "");
  if (!cleaned) return null;
  return `/${cleaned}`;
}

function pickBlogSlug(blog) {
  if (!blog || typeof blog !== "object") return null;
  return blog.slug || blog.blogSlug || blog.link || null;
}

function pickBlogLastmod(blog) {
  if (!blog || typeof blog !== "object") return null;
  return blog.updated_at || blog.updatedAt || blog.created_at || blog.createdAt || null;
}

function toIsoOrNull(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

async function fetchBlogRecordsFromApi() {
  for (const endpoint of BLOG_API_CANDIDATES) {
    try {
      console.log(`[next-sitemap] Fetching blogs from: ${endpoint}`);
      const response = await fetch(endpoint, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!response.ok) continue;

      const payload = await response.json();
      const records = Array.isArray(payload) ? payload : payload?.blogs || payload?.data || [];

      if (Array.isArray(records)) return records;
    } catch (error) {
      console.error(`[next-sitemap] API fetch failed`, error);
    }
  }
  return [];
}

async function fetchBlogRecordsFromMySQL() {
  const host = process.env.DATABASE_HOST;
  const user = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;
  const database = process.env.DATABASE_NAME;
  const port = Number(process.env.DATABASE_PORT || 3306);

  if (!host || !user || !database) return [];

  let connection;
  try {
    connection = await mysql.createConnection({ host, user, password, database, port });
    const [rows] = await connection.execute(
      "SELECT slug, created_at FROM blogs WHERE category_id != 1 AND status = 1 ORDER BY id DESC"
    );
    return Array.isArray(rows) ? rows : [];
  } catch (error) {
    console.error("[next-sitemap] MySQL failed", error);
    return [];
  } finally {
    if (connection) await connection.end();
  }
}

async function fetchBlogRecordsFromMongo() {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) return [];

  let conn;
  try {
    conn = await mongoose.createConnection(mongoUrl).asPromise();
    const docs = await conn.collection("ritzblogmodels").find(
      { blogStatus: true },
      { projection: { blogSlug: 1, createdAt: 1, updatedAt: 1 } }
    ).toArray();

    return Array.isArray(docs) ? docs : [];
  } catch (error) {
    console.error("[next-sitemap] Mongo failed", error);
    return [];
  } finally {
    if (conn) await conn.close();
  }
}

async function fetchBlogRecords() {
  const apiRecords = await fetchBlogRecordsFromApi();
  const mysqlRecords = await fetchBlogRecordsFromMySQL();
  const mongoRecords = await fetchBlogRecordsFromMongo();

  const merged = [
    ...(Array.isArray(apiRecords) ? apiRecords : []),
    ...(Array.isArray(mysqlRecords) ? mysqlRecords : []),
    ...(Array.isArray(mongoRecords) ? mongoRecords : []),
  ];

  if (merged.length === 0) {
    console.warn("[next-sitemap] No blog records found from API/MySQL/Mongo.");
  } else {
    console.log(
      `[next-sitemap] Source counts -> API: ${Array.isArray(apiRecords) ? apiRecords.length : 0}, MySQL: ${Array.isArray(mysqlRecords) ? mysqlRecords.length : 0}, Mongo: ${Array.isArray(mongoRecords) ? mongoRecords.length : 0}, Merged: ${merged.length}`
    );
  }

  return merged;
}

/** work.html case-study cards — same source as /api/case_studies (category_id = 1). */
async function fetchCaseStudyRecordsFromApi() {
  const endpoint =
    process.env.SITEMAP_CASE_STUDIES_API_URL || `${siteUrl}/api/case_studies`;

  try {
    console.log(`[next-sitemap] Fetching case studies from: ${endpoint}`);
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) return [];

    const records = await response.json();
    return Array.isArray(records) ? records : [];
  } catch (error) {
    console.error("[next-sitemap] Case studies API fetch failed", error);
    return [];
  }
}

async function fetchCaseStudyRecordsFromMySQL() {
  const host = process.env.DATABASE_HOST;
  const user = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;
  const database = process.env.DATABASE_NAME;
  const port = Number(process.env.DATABASE_PORT || 3306);

  if (!host || !user || !database) return [];

  let connection;
  try {
    connection = await mysql.createConnection({ host, user, password, database, port });
    const [rows] = await connection.execute(
      "SELECT slug, created_at FROM blogs WHERE category_id = 1 ORDER BY id DESC"
    );
    return Array.isArray(rows) ? rows : [];
  } catch (error) {
    console.error("[next-sitemap] Case studies MySQL failed", error);
    return [];
  } finally {
    if (connection) await connection.end();
  }
}

async function fetchCaseStudyRecords() {
  const apiRecords = await fetchCaseStudyRecordsFromApi();
  const mysqlRecords = await fetchCaseStudyRecordsFromMySQL();

  const bySlug = new Map();
  for (const record of [...apiRecords, ...mysqlRecords]) {
    const slug = pickBlogSlug(record);
    if (slug) bySlug.set(slug, record);
  }

  const merged = [...bySlug.values()];

  if (merged.length === 0) {
    console.warn("[next-sitemap] No case study records found from API/MySQL.");
  } else {
    console.log(
      `[next-sitemap] Case studies -> API: ${apiRecords.length}, MySQL: ${mysqlRecords.length}, Merged: ${merged.length}`
    );
  }

  return merged;
}

/** Deduped root paths for blogs + work.html case studies. */
function collectPostSitemapPaths(records) {
  const { isExcludedSitemapPath } = require("./next-sitemap.shared");
  const uniquePaths = new Set();

  for (const record of records) {
    const rawSlug = pickBlogSlug(record);
    const postPath = safeToPath(rawSlug);
    if (!postPath) continue;

    const normalized = postPath.replace(/^\/+/, "");
    if (STATIC_PAGE_SLUGS.has(normalized)) continue;
    if (isExcludedSitemapPath(postPath)) continue;

    uniquePaths.add(postPath);
  }

  return uniquePaths;
}

async function fetchAllPostSitemapRecords() {
  const [blogs, caseStudies] = await Promise.all([
    fetchBlogRecords(),
    fetchCaseStudyRecords(),
  ]);
  return [...blogs, ...caseStudies];
}

module.exports = {
  siteUrl,
  STATIC_PAGE_SLUGS,
  safeToPath,
  pickBlogSlug,
  pickBlogLastmod,
  toIsoOrNull,
  fetchBlogRecords,
  fetchCaseStudyRecords,
  fetchAllPostSitemapRecords,
  collectPostSitemapPaths,
};
