import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const {
  siteUrl,
  SITEMAP_INDEX_FILES,
  EXCLUDED_SITEMAP_PATHS,
  EXCLUDED_SITEMAP_PREFIXES,
  getSitemapBuildLastmod,
} = require("../next-sitemap.shared.js");
const {
  fetchServiceShortSlugRedirects,
} = require("../next-sitemap.service-sources.js");

const publicDir = path.join(process.cwd(), "public");
const redirectsPath = path.join(
  process.cwd(),
  "src/data/service-short-slug-redirects.json"
);
const lastmod = getSitemapBuildLastmod();

/** Drop legacy / internal routes from sitemap-0. */
const SITEMAP_0_EXCLUDE_LOC =
  /\/contact\.html2|\/work\.html2|\/web-development2|\/stories<\/loc>|\/all-ritz-blogs<\/loc>/;

const EXCLUDED_SITEMAP_LOC_PATTERNS = [...EXCLUDED_SITEMAP_PATHS].map(
  (p) =>
    new RegExp(
      `<loc>${siteUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</loc>`
    )
);

const EXCLUDED_SITEMAP_PREFIX_LOC_PATTERNS = (EXCLUDED_SITEMAP_PREFIXES || []).map((prefix) => {
  const escapedSite = siteUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Match <loc>{siteUrl}{prefix}</loc> or any child like <loc>{siteUrl}{prefix}/...</loc>
  return new RegExp(`<loc>${escapedSite}${escapedPrefix}(?:/[^<]*)?</loc>`);
});

function stripExcludedPathsFromSitemapFile(fileName) {
  const filePath = path.join(publicDir, fileName);
  if (!fs.existsSync(filePath)) return 0;

  const xml = fs.readFileSync(filePath, "utf8");
  const lines = xml.split("\n");
  let removed = 0;

  const filtered = lines.filter((line) => {
    if (!line.includes("<loc>")) return true;
    for (const pattern of EXCLUDED_SITEMAP_LOC_PATTERNS) {
      if (pattern.test(line)) {
        removed++;
        return false;
      }
    }
    for (const pattern of EXCLUDED_SITEMAP_PREFIX_LOC_PATTERNS) {
      if (pattern.test(line)) {
        removed++;
        return false;
      }
    }
    return true;
  });

  const output = filtered.join("\n");
  if (output !== xml) {
    fs.writeFileSync(filePath, output);
  }

  return removed;
}

function stripOrphanServiceUrlsFromSitemap0(redirects) {
  const filePath = path.join(publicDir, "sitemap-0.xml");
  if (!fs.existsSync(filePath)) return 0;

  const orphanSlugs = Object.keys(redirects);
  if (orphanSlugs.length === 0) return 0;

  const orphanLocPatterns = orphanSlugs.map(
    (slug) =>
      new RegExp(
        `<loc>${siteUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/services/${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</loc>`
      )
  );

  const xml = fs.readFileSync(filePath, "utf8");
  const lines = xml.split("\n");
  let removed = 0;

  const filtered = lines.filter((line) => {
    if (!line.includes("<loc>")) return true;
    if (SITEMAP_0_EXCLUDE_LOC.test(line)) {
      removed++;
      return false;
    }
    for (const pattern of orphanLocPatterns) {
      if (pattern.test(line)) {
        removed++;
        return false;
      }
    }
    return true;
  });

  const output = filtered.join("\n");
  if (output !== xml) {
    fs.writeFileSync(filePath, output);
  }

  return removed;
}

async function run() {
  const redirects = await fetchServiceShortSlugRedirects();
  const redirectCount = Object.keys(redirects).length;

  if (redirectCount > 0) {
    fs.writeFileSync(redirectsPath, `${JSON.stringify(redirects, null, 2)}\n`);
    console.log(
      `[finalize-sitemaps] Wrote ${redirectCount} service short-slug redirects`
    );
  }

  const removed = stripOrphanServiceUrlsFromSitemap0(
    redirectCount > 0 ? redirects : require("../src/data/service-short-slug-redirects.json")
  );

  if (removed > 0) {
    console.log(
      `[finalize-sitemaps] Removed ${removed} orphan /services/{slug} URLs from sitemap-0.xml`
    );
  }

  let excludedRemoved = 0;
  for (const file of [
    "sitemap-0.xml",
    "page-sitemap.xml",
    "post-sitemap.xml",
    "images-sitemap.xml",
  ]) {
    excludedRemoved += stripExcludedPathsFromSitemapFile(file);
  }

  if (excludedRemoved > 0) {
    console.log(
      `[finalize-sitemaps] Removed ${excludedRemoved} excluded URL(s) from sitemap files`
    );
  }

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_INDEX_FILES.map(
  (file) => `  <sitemap>
    <loc>${siteUrl}/${file}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`
).join("\n")}
</sitemapindex>
`;

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapIndex);

  console.log(
    `[finalize-sitemaps] Wrote sitemap index with ${SITEMAP_INDEX_FILES.length} entries`
  );
}

run().catch((error) => {
  console.error("[finalize-sitemaps] Failed", error);
  process.exit(1);
});
