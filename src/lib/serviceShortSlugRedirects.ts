import redirects from "@/data/service-short-slug-redirects.json";

/** third-level slug → canonical /services/{parent}/{slug} path (no leading slash) */
const SERVICE_SHORT_SLUG_REDIRECTS: Record<string, string> = redirects;

/**
 * /services/{orphanSlug} → /services/{parent}/{orphanSlug}, or null if not an orphan.
 */
export function getServiceShortSlugRedirect(pathname: string): string | null {
  const match = pathname.match(/^\/services\/([^/]+)\/?$/);
  if (!match) return null;

  const slug = match[1];
  const canonical = SERVICE_SHORT_SLUG_REDIRECTS[slug];
  if (!canonical) return null;

  return `/services/${canonical}`;
}
