const { siteUrl } = require("./next-sitemap.blog-sources");
const { fetchImageSitemapEntries } = require("./next-sitemap.image-sources");
const { getSitemapBuildLastmod } = require("./next-sitemap.shared");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  outDir: "./public",
  sitemapBaseFileName: "images-sitemap",
  generateIndexSitemap: false,
  generateRobotsTxt: false,

  transform: async () => null,

  additionalPaths: async (config) => {
    const buildLastmod = getSitemapBuildLastmod();
    const entries = await fetchImageSitemapEntries();
    const items = [];

    for (const entry of entries) {
      if (!entry.images?.length) continue;

      const imageObjects = entry.images
        .map(({ url, title }) => {
          try {
            return { loc: new URL(url), title: title || undefined };
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      if (!imageObjects.length) continue;

      const transformed = await config.transform(config, entry.path);

      items.push({
        ...transformed,
        loc: `${siteUrl}${entry.path}`,
        lastmod: buildLastmod,
        changefreq: "weekly",
        priority: 0.6,
        images: imageObjects,
      });
    }

    console.log(`[next-sitemap:images-sitemap] Page URLs with image entries: ${items.length}`);
    return items;
  },
};
