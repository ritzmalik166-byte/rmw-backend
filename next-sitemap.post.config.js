const {
  siteUrl,
  fetchAllPostSitemapRecords,
  collectPostSitemapPaths,
} = require("./next-sitemap.blog-sources");
const { getSitemapBuildLastmod, isExcludedSitemapPath } = require("./next-sitemap.shared");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  outDir: "./public",
  sitemapBaseFileName: "post-sitemap",
  generateIndexSitemap: false,
  generateRobotsTxt: false,

  /** Drop every Next-discovered route; blogs come only from `additionalPaths`. */
  transform: async () => null,

  additionalPaths: async (config) => {
    const buildLastmod = getSitemapBuildLastmod();
    const records = await fetchAllPostSitemapRecords();
    const uniquePaths = collectPostSitemapPaths(records);

    const items = [];

    for (const path of uniquePaths) {
      if (isExcludedSitemapPath(path)) continue;
      const transformed = await config.transform(config, path);

      items.push({
        ...transformed,
        loc: `${siteUrl}${path}`,
        lastmod: buildLastmod,
        changefreq: "weekly",
        priority: 0.8,
      });
    }

    console.log(`[next-sitemap:post-sitemap] Post URLs (blogs + case studies): ${items.length}`);
    return items;
  },
};
