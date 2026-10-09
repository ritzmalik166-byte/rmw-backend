import fs from "fs";
import path from "path";
import { fetchPostSitemapPaths } from "@/lib/sitemap/postRecords";
import { mergeBaseXmlWithPostItems, parseSitemapUrlBlocks } from "@/lib/sitemap/xml";
import type { SitemapUrlItem } from "@/lib/sitemap/xml";

const BASE_FILE = path.join(process.cwd(), "data/sitemap-0-base.xml");
const STATIC_FILE = path.join(process.cwd(), "public/sitemap-0.xml");

function readBaseXml(): string | null {
  if (fs.existsSync(BASE_FILE)) {
    return fs.readFileSync(BASE_FILE, "utf8");
  }
  if (fs.existsSync(STATIC_FILE)) {
    return fs.readFileSync(STATIC_FILE, "utf8");
  }
  return null;
}

async function stripKnownPostPaths(xml: string): Promise<string> {
  const postPaths = new Set(await fetchPostSitemapPaths());
  const entries = parseSitemapUrlBlocks(xml);
  const header = xml.match(/^[\s\S]*?<urlset[^>]*>\n?/)?.[0];
  const close = "</urlset>\n";

  if (!header) return xml;

  const kept = entries
    .filter((entry) => !postPaths.has(entry.path))
    .map((entry) => entry.block + "\n")
    .join("");

  return header + kept + close;
}

export async function buildSitemap0WithPosts(
  postItems: SitemapUrlItem[]
): Promise<string | null> {
  const rawBase = readBaseXml();
  if (!rawBase) return null;

  const baseXml = fs.existsSync(BASE_FILE)
    ? rawBase
    : await stripKnownPostPaths(rawBase);

  const previousPostPaths = new Set(
    parseSitemapUrlBlocks(rawBase).map((entry) => entry.path)
  );

  return mergeBaseXmlWithPostItems(baseXml, postItems, previousPostPaths);
}
