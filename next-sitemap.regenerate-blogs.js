const fs = require("fs");
const path = require("path");
const {
  siteUrl,
  STATIC_PAGE_SLUGS,
  safeToPath,
  pickBlogSlug,
  fetchAllPostSitemapRecords,
} = require("./next-sitemap.blog-sources");
const { fetchImageSitemapEntries } = require("./next-sitemap.image-sources");
const { SITEMAP_INDEX_FILES, getSitemapBuildLastmod, isExcludedSitemapPath } = require("./next-sitemap.shared");

const publicDir = path.join(process.cwd(), "public");

const URLSET_OPEN =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

const URLSET_CLOSE = "</urlset>\n";

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function pathFromLoc(loc) {
  if (!loc) return null;
  try {
    const pathname = new URL(loc).pathname;
    if (pathname === "/") return "/";
    return pathname.replace(/\/+$/, "");
  } catch {
    return null;
  }
}

function buildBlogItems(records) {
  const buildLastmod = getSitemapBuildLastmod();
  const uniquePaths = new Set();

  for (const blog of records) {
    const rawSlug = pickBlogSlug(blog);
    const blogPath = safeToPath(rawSlug);
    if (!blogPath) continue;

    const normalized = blogPath.replace(/^\/+/, "");
    if (STATIC_PAGE_SLUGS.has(normalized)) continue;
    if (isExcludedSitemapPath(blogPath)) continue;

    uniquePaths.add(blogPath);
  }

  const items = [];

  for (const blogPath of uniquePaths) {
    items.push({
      path: blogPath,
      loc: `${siteUrl}${blogPath}`,
      lastmod: buildLastmod,
      changefreq: "weekly",
      priority: "0.8",
    });
  }

  return items;
}

function formatUrlEntry({ loc, lastmod, changefreq, priority, images }) {
  let entry = `<url><loc>${escapeXml(loc)}</loc>`;
  if (lastmod) entry += `<lastmod>${escapeXml(lastmod)}</lastmod>`;
  entry += `<changefreq>${escapeXml(changefreq || "weekly")}</changefreq>`;
  entry += `<priority>${escapeXml(priority || "0.8")}</priority>`;

  if (images?.length) {
    for (const image of images) {
      entry += "<image:image>";
      entry += `<image:loc>${escapeXml(image.loc)}</image:loc>`;
      if (image.title) {
        entry += `<image:title>${escapeXml(image.title)}</image:title>`;
      }
      entry += "</image:image>";
    }
  }

  entry += "</url>\n";
  return entry;
}

function readBlogPathsFromPostSitemap() {
  const filePath = path.join(publicDir, "post-sitemap.xml");
  if (!fs.existsSync(filePath)) return new Set();

  const xml = fs.readFileSync(filePath, "utf8");
  const paths = new Set();
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  let match;

  while ((match = locRegex.exec(xml)) !== null) {
    const blogPath = pathFromLoc(match[1]);
    if (blogPath) paths.add(blogPath);
  }

  return paths;
}

function parseSitemapUrlEntries(xml) {
  const entries = [];
  const urlRegex = /<url>([\s\S]*?)<\/url>/g;
  let match;

  while ((match = urlRegex.exec(xml)) !== null) {
    const block = match[0];
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
    const entryPath = pathFromLoc(loc);
    if (!entryPath) continue;
    entries.push({ block, path: entryPath });
  }

  return entries;
}

function writePostSitemap(blogItems) {
  const body = blogItems.map((item) => formatUrlEntry(item)).join("");
  fs.writeFileSync(path.join(publicDir, "post-sitemap.xml"), URLSET_OPEN + body + URLSET_CLOSE);
}

function syncSitemap0(blogItems, previousBlogPaths) {
  const filePath = path.join(publicDir, "sitemap-0.xml");
  if (!fs.existsSync(filePath)) {
    console.warn("[regenerate-blog-sitemaps] sitemap-0.xml missing; skipping sync");
    return;
  }

  const newBlogPaths = new Set(blogItems.map((item) => item.path));
  const blogPathsToReplace = new Set([...previousBlogPaths, ...newBlogPaths]);
  const xml = fs.readFileSync(filePath, "utf8");
  const existingEntries = parseSitemapUrlEntries(xml);
  const keptEntries = existingEntries.filter((entry) => !blogPathsToReplace.has(entry.path));
  const blogBlocks = blogItems.map((item) => formatUrlEntry(item));
  const header = xml.match(/^[\s\S]*?<urlset[^>]*>\n?/)?.[0] || URLSET_OPEN;
  const body = keptEntries.map((entry) => entry.block + "\n").join("") + blogBlocks.join("");
  fs.writeFileSync(filePath, header + body + URLSET_CLOSE);
}

async function writeImagesSitemap() {
  const buildLastmod = getSitemapBuildLastmod();
  const entries = await fetchImageSitemapEntries();
  const items = [];

  for (const entry of entries) {
    if (!entry.images?.length) continue;

    const images = entry.images
      .map(({ url, title }) => {
        try {
          return { loc: new URL(url).href, title: title || undefined };
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    if (!images.length) continue;

    items.push({
      loc: `${siteUrl}${entry.path}`,
      lastmod: buildLastmod,
      changefreq: "weekly",
      priority: "0.6",
      images,
    });
  }

  const body = items.map((item) => formatUrlEntry(item)).join("");
  fs.writeFileSync(path.join(publicDir, "images-sitemap.xml"), URLSET_OPEN + body + URLSET_CLOSE);
}

function writeSitemapIndex() {
  const lastmod = getSitemapBuildLastmod();
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
}

/**
 * Regenerate blog-related sitemap files after admin publish/update/delete.
 * @returns {Promise<{ ok: boolean, blogCount: number, error?: string }>}
 */
async function regenerateBlogSitemaps() {
  try {
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const previousBlogPaths = readBlogPathsFromPostSitemap();
    const records = await fetchAllPostSitemapRecords();
    const blogItems = buildBlogItems(records);

    if (blogItems.length === 0 && previousBlogPaths.size > 0) {
      return {
        ok: false,
        blogCount: 0,
        error:
          "Refusing to regenerate blog sitemaps with zero blogs while post-sitemap already has entries (database may be unreachable).",
      };
    }

    writePostSitemap(blogItems);
    syncSitemap0(blogItems, previousBlogPaths);
    await writeImagesSitemap();
    writeSitemapIndex();

    console.log(
      `[regenerate-blog-sitemaps] Updated post-sitemap, sitemap-0, images-sitemap, and sitemap index (${blogItems.length} posts)`
    );

    return { ok: true, blogCount: blogItems.length };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[regenerate-blog-sitemaps] Failed", error);
    return { ok: false, blogCount: 0, error: message };
  }
}

module.exports = {
  regenerateBlogSitemaps,
};
