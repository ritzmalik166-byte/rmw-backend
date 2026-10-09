const { siteUrl } = require("./next-sitemap.blog-sources");
const { fetchServiceSitemapEntries } = require("./next-sitemap.service-sources");
const { getStaticPagePaths } = require("./next-sitemap.static-page-paths");
const { getSitemapBuildLastmod, isExcludedSitemapPath } = require("./next-sitemap.shared");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  outDir: "./public",
  sitemapBaseFileName: "page-sitemap",
  generateIndexSitemap: false,
  generateRobotsTxt: false,

  /** Static list + DB services; no other Next-discovered routes. */
  transform: async () => null,

  additionalPaths: async (config) => {
    const buildLastmod = getSitemapBuildLastmod();
    /** @type {Set<string>} */
    const uniquePaths = new Set();

    const staticPaths = getStaticPagePaths();
    for (const path of staticPaths) {
      if (!isExcludedSitemapPath(path)) uniquePaths.add(path);
    }

    for (const { path } of await fetchServiceSitemapEntries()) {
      if (!isExcludedSitemapPath(path)) uniquePaths.add(path);
    }

    const items = [];

    for (const path of uniquePaths) {
      const transformed = await config.transform(config, path);

      items.push({
        ...transformed,
        loc: `${siteUrl}${path}`,
        lastmod: buildLastmod,
        changefreq: "weekly",
        priority: 0.8,
      });
    }

    console.log(
      `[next-sitemap:page-sitemap] URLs: ${items.length} (${staticPaths.length} static + DB services, deduped)`
    );
    return items;
  },
};
