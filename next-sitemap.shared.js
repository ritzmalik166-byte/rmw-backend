const { siteUrl } = require("./next-sitemap.blog-sources");

/** One ISO timestamp per Node process — used as lastmod for all URLs in a sitemap run. */
let sitemapBuildLastmod = null;

function getSitemapBuildLastmod() {
  if (!sitemapBuildLastmod) {
    sitemapBuildLastmod = new Date().toISOString();
  }
  return sitemapBuildLastmod;
}

/** Sitemap index entries written after sub-sitemaps are generated. */
const SITEMAP_INDEX_FILES = [
  "sitemap-0.xml",
  "page-sitemap.xml",
  "post-sitemap.xml",
  "images-sitemap.xml",
];

/** Paths that must never appear in any sitemap file. */
const EXCLUDED_SITEMAP_PATHS = new Set([
  "/services/contents-marketing/content-marketing",
  "/best-content-marketing-agency-delhi-ncr",
  "/career2",
  "/services/print-advertising2",
  "/services/print-advertising2/a",
  "/discussion-forum",
  "/services/real-estate-walkthrough",
  "/services/Real-Estate-Walkthrough",
]);

/**
 * Path prefixes that must never appear in any sitemap file.
 * Use for dynamic routes (e.g. /services/print-advertising2/[slug]).
 */
const EXCLUDED_SITEMAP_PREFIXES = [
  "/career2",
  "/services/print-advertising2",
  "/discussion-forum",
  "/services/real-estate-walkthrough",
  "/services/Real-Estate-Walkthrough",
];

/** DB / legacy service path → canonical public URL in sitemaps. */
const SERVICE_SITEMAP_PATH_ALIASES = {
  "/services/contents-marketing/content-marketing":
    "/services/contents-marketing/customized-content-strategy",
};

function normalizeSitemapPath(path) {
  if (typeof path !== "string") return null;
  let normalized = path.trim();
  if (!normalized.startsWith("/")) normalized = `/${normalized}`;
  normalized = normalized.replace(/\/+$/, "") || "/";
  return normalized;
}

function isExcludedSitemapPath(path) {
  const normalized = normalizeSitemapPath(path);
  if (!normalized) return false;
  if (EXCLUDED_SITEMAP_PATHS.has(normalized)) return true;
  for (const prefix of EXCLUDED_SITEMAP_PREFIXES) {
    if (normalized === prefix || normalized.startsWith(`${prefix}/`)) return true;
  }
  return false;
}

function resolveServiceSitemapPath(path) {
  const normalized = normalizeSitemapPath(path);
  if (!normalized) return null;
  if (SERVICE_SITEMAP_PATH_ALIASES[normalized]) {
    return SERVICE_SITEMAP_PATH_ALIASES[normalized];
  }
  if (isExcludedSitemapPath(normalized)) return null;
  return normalized;
}

/** Custom robots.txt policies (also used on production). */
const ROBOTS_POLICIES = [
  { userAgent: "*", disallow: ["/admin/"] },
  { userAgent: "ChatGPT-User", allow: "/" },
  { userAgent: "OAI-SearchBot", allow: "/" },
  { userAgent: "GPTBot", allow: "/" },
  { userAgent: "Google-Extended", allow: "/" },
  { userAgent: "Bingbot", allow: "/" },
];

module.exports = {
  siteUrl,
  SITEMAP_INDEX_FILES,
  ROBOTS_POLICIES,
  EXCLUDED_SITEMAP_PATHS,
  EXCLUDED_SITEMAP_PREFIXES,
  SERVICE_SITEMAP_PATH_ALIASES,
  isExcludedSitemapPath,
  resolveServiceSitemapPath,
  getSitemapBuildLastmod,
};
