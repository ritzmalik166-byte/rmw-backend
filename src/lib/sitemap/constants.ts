export const SITE_URL = "https://ritzmediaworld.com";

export const STATIC_PAGE_SLUGS = new Set([
  "blogs",
  "contact-us",
  "about.html",
  "new-home",
  "tags2",
  "category2",
]);

/** Blog/page paths that must not appear in sitemaps (keep in sync with next-sitemap.shared.js). */
export const EXCLUDED_SITEMAP_PATHS = new Set([
  "/services/contents-marketing/content-marketing",
  "/best-content-marketing-agency-delhi-ncr",
  "/career2",
  "/services/print-advertising2",
  "/services/print-advertising2/a",
  "/discussion-forum",
  "/services/real-estate-walkthrough",
  "/services/Real-Estate-Walkthrough",
]);

export const SITEMAP_XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
} as const;

export const URLSET_OPEN =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

export const URLSET_CLOSE = "</urlset>\n";
