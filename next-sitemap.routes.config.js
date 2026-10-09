const {
  siteUrl,
  fetchAllPostSitemapRecords,
  collectPostSitemapPaths,
} = require("./next-sitemap.blog-sources");
const { fetchServiceSitemapEntries } = require("./next-sitemap.service-sources");
const { fetchCategorySitemapEntries } = require("./next-sitemap.category-sources");
const { fetchTagSitemapEntries } = require("./next-sitemap.tag-sources");
const { getSitemapBuildLastmod, isExcludedSitemapPath } = require("./next-sitemap.shared");

/** Paths that must never appear in sitemap-0.xml (admin, internal, legacy). */
const EXCLUDED_PATHS = [
  "/admin",
  "/admin/*",
  "/api/*",
  "/test",
  "/_backup",
  "/backup-page",
  "/404/*",
  "/slug_img",
  "/contactUs-page",
  "/blogs_old",
  "/about.html2",
  "/about.html3",
  "/contact.html2",
  "/contact.html2/*",
  "/work.html2",
  "/work.html2/*",
  "/web-development2",
  "/blogTst",
  "/stories",
  "/stories/*",
  "/all-ritz-blogs",
  "/all-ritz-blogs/*",
  "/career2",
  "/career2/*",
  "/services/print-advertising2",
  "/services/print-advertising2/*",
  "/discussion-forum",
  "/discussion-forum/*",
  "/services/real-estate-walkthrough",
  "/services/real-estate-walkthrough/*",
  "/services/Real-Estate-Walkthrough",
  "/services/Real-Estate-Walkthrough/*",
  "/tags2",
  "/tags2/*",

];

function matchesExcludedPath(path) {
  if (typeof path !== "string") return false;
  for (const rule of EXCLUDED_PATHS) {
    if (rule.endsWith("/*")) {
      const prefix = rule.slice(0, -2);
      if (path === prefix || path.startsWith(`${prefix}/`)) return true;
    } else if (path === rule) {
      return true;
    }
  }
  return false;
}

/**
 * Generates sitemap-0.xml: Next.js build routes + blogs, services, and categories.
 * Requires `next build` output in .next. Run first in postbuild.
 *
 * @type {import('next-sitemap').IConfig}
 */
module.exports = {
  siteUrl,
  outDir: "./public",
  sitemapBaseFileName: "sitemap",
  generateIndexSitemap: true,
  generateRobotsTxt: false,
  exclude: EXCLUDED_PATHS,

  transform: async (config, path) => ({
    loc: `${siteUrl}${path}`,
    lastmod: getSitemapBuildLastmod(),
    changefreq: "weekly",
    priority: 0.7,
  }),

  additionalPaths: async (config) => {
    const buildLastmod = getSitemapBuildLastmod();
    const uniquePaths = new Map();

    for (const path of await fetchCategorySitemapEntries()) {
      if (!isExcludedSitemapPath(path) && !matchesExcludedPath(path)) uniquePaths.set(path, true);
    }

    for (const path of await fetchTagSitemapEntries()) {
      if (!isExcludedSitemapPath(path) && !matchesExcludedPath(path)) uniquePaths.set(path, true);
    }

    const records = await fetchAllPostSitemapRecords();
    let blogPathCount = 0;

    for (const postPath of collectPostSitemapPaths(records)) {
      if (isExcludedSitemapPath(postPath) || matchesExcludedPath(postPath)) continue;
      if (!uniquePaths.has(postPath)) blogPathCount++;
      uniquePaths.set(postPath, true);
    }

    for (const { path: servicePath } of await fetchServiceSitemapEntries()) {
      if (
        isExcludedSitemapPath(servicePath) ||
        matchesExcludedPath(servicePath) ||
        uniquePaths.has(servicePath)
      ) {
        continue;
      }
      if (!uniquePaths.has(servicePath)) {
        uniquePaths.set(servicePath, true);
      }
    }

    const items = [];

    for (const path of uniquePaths.keys()) {
      const transformed = await config.transform(config, path);

      items.push({
        ...transformed,
        loc: `${siteUrl}${path}`,
        lastmod: buildLastmod,
        changefreq: "weekly",
        priority:
          path.startsWith("/category/") || path.startsWith("/tags/") ? 0.7 : 0.8,
      });
    }

    console.log(
      `[next-sitemap:sitemap-0] Categories + tags + posts (${blogPathCount}) + services → ${items.length} additional paths`
    );
    return items;
  },
};
