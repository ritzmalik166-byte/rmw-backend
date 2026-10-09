import { SITE_URL, URLSET_CLOSE, URLSET_OPEN } from "@/lib/sitemap/constants";

export type SitemapUrlItem = {
  path: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
};

export function escapeXml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function pathFromLoc(loc: string | null | undefined): string | null {
  if (!loc) return null;
  try {
    const pathname = new URL(loc).pathname;
    if (pathname === "/") return "/";
    return pathname.replace(/\/+$/, "");
  } catch {
    return null;
  }
}

export function formatUrlEntry({
  loc,
  lastmod,
  changefreq = "weekly",
  priority = "0.8",
}: {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}): string {
  let entry = `<url><loc>${escapeXml(loc)}</loc>`;
  if (lastmod) entry += `<lastmod>${escapeXml(lastmod)}</lastmod>`;
  entry += `<changefreq>${escapeXml(changefreq)}</changefreq>`;
  entry += `<priority>${escapeXml(priority)}</priority>`;
  entry += "</url>\n";
  return entry;
}

export function buildPostUrlItems(
  paths: Iterable<string>,
  lastmod = new Date().toISOString()
): SitemapUrlItem[] {
  const items: SitemapUrlItem[] = [];
  for (const postPath of paths) {
    items.push({
      path: postPath,
      lastmod,
      changefreq: "weekly",
      priority: "0.8",
    });
  }
  return items;
}

export function buildUrlsetXml(items: SitemapUrlItem[]): string {
  const body = items
    .map((item) =>
      formatUrlEntry({
        loc: `${SITE_URL}${item.path}`,
        lastmod: item.lastmod,
        changefreq: item.changefreq,
        priority: item.priority,
      })
    )
    .join("");
  return URLSET_OPEN + body + URLSET_CLOSE;
}

export function parseSitemapUrlBlocks(xml: string): { block: string; path: string }[] {
  const entries: { block: string; path: string }[] = [];
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

export function mergeBaseXmlWithPostItems(
  baseXml: string,
  postItems: SitemapUrlItem[],
  excludedPaths: Set<string>
): string {
  const postPaths = new Set(postItems.map((item) => item.path));
  const pathsToReplace = new Set([...excludedPaths, ...postPaths]);
  const existingEntries = parseSitemapUrlBlocks(baseXml);
  const keptEntries = existingEntries.filter((entry) => !pathsToReplace.has(entry.path));
  const blogBlocks = postItems.map((item) =>
    formatUrlEntry({
      loc: `${SITE_URL}${item.path}`,
      lastmod: item.lastmod,
      changefreq: item.changefreq,
      priority: item.priority,
    })
  );
  const header = baseXml.match(/^[\s\S]*?<urlset[^>]*>\n?/)?.[0] || URLSET_OPEN;
  const body =
    keptEntries.map((entry) => entry.block + "\n").join("") + blogBlocks.join("");
  return header + body + URLSET_CLOSE;
}
