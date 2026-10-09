import fs from "fs";
import path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const { fetchAllPostSitemapRecords, collectPostSitemapPaths } =
  require("../next-sitemap.blog-sources.js");

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(rootDir, "public");
const dataDir = path.join(rootDir, "data");
const sourcePath = path.join(publicDir, "sitemap-0.xml");
const postSitemapPath = path.join(publicDir, "post-sitemap.xml");
const basePath = path.join(dataDir, "sitemap-0-base.xml");
const URLSET_CLOSE = "</urlset>\n";

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

function parseSitemapUrlBlocks(xml) {
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

function readBlogPathsFromPostSitemap() {
  if (!fs.existsSync(postSitemapPath)) return new Set();

  const xml = fs.readFileSync(postSitemapPath, "utf8");
  const paths = new Set();

  for (const entry of parseSitemapUrlBlocks(xml)) {
    paths.add(entry.path);
  }

  return paths;
}

async function resolveBlogPaths() {
  const fromPostSitemap = readBlogPathsFromPostSitemap();
  if (fromPostSitemap.size > 0) return fromPostSitemap;

  const records = await fetchAllPostSitemapRecords();
  return new Set(collectPostSitemapPaths(records));
}

async function run() {
  if (!fs.existsSync(sourcePath)) {
    console.warn("[build-sitemap-0-base] public/sitemap-0.xml missing; skipping");
    return;
  }

  const blogPaths = await resolveBlogPaths();
  const xml = fs.readFileSync(sourcePath, "utf8");
  const entries = parseSitemapUrlBlocks(xml);
  const header = xml.match(/^[\s\S]*?<urlset[^>]*>\n?/)?.[0];

  if (!header) {
    console.error("[build-sitemap-0-base] Could not parse sitemap-0.xml header");
    process.exit(1);
  }

  const kept = entries
    .filter((entry) => !blogPaths.has(entry.path))
    .map((entry) => entry.block + "\n")
    .join("");

  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(basePath, header + kept + URLSET_CLOSE);

  console.log(
    `[build-sitemap-0-base] Wrote ${basePath} (${entries.length - blogPaths.size} non-blog URLs kept, ${blogPaths.size} blog paths removed)`
  );
}

run().catch((error) => {
  console.error("[build-sitemap-0-base] Failed", error);
  process.exit(1);
});
