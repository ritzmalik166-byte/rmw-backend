const { siteUrl, ROBOTS_POLICIES } = require("./next-sitemap.shared");

/**
 * Legacy robots.txt config (next-sitemap requires .next/build-manifest).
 * robots.txt is static in public/robots.txt — not generated at build time.
 * Optional manual regen: node scripts/generate-robots.mjs
 *
 * @type {import('next-sitemap').IConfig}
 */
module.exports = {
  siteUrl,
  outDir: "./public",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  transform: async () => null,
  additionalPaths: async () => [],
  robotsTxtOptions: {
    policies: ROBOTS_POLICIES,
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },
};
