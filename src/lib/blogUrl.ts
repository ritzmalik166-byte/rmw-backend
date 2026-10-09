const DEFAULT_SITE_ORIGIN = "https://ritzmediaworld.com";

/** App Router pages that intentionally use a .html URL (not legacy blog slugs). */
export const LEGACY_STATIC_HTML_PAGES = new Set([
  "about.html",
  "contact.html",
  "work.html",
]);

/** Strip a trailing .html from blog slug params (legacy WordPress-style URLs). */
export function normalizeBlogSlug(slug: string): string {
  const trimmed = slug.trim().replace(/^\/+|\/+$/g, "");
  return trimmed.replace(/\.html$/i, "");
}

/**
 * Redirect legacy blog URLs like /my-post.html → /my-post.
 * Returns null for real static pages (about.html, contact.html, work.html).
 */
export function getLegacyHtmlBlogRedirectPath(pathname: string): string | null {
  if (!pathname.endsWith(".html")) return null;

  const segment = pathname.replace(/^\/+|\/+$/g, "");
  if (!segment || segment.includes("/")) return null;
  if (LEGACY_STATIC_HTML_PAGES.has(segment.toLowerCase())) return null;

  const slug = normalizeBlogSlug(segment);
  if (!slug || slug === segment) return null;
  return `/${slug}`;
}

/** Resolve blog banner / blog_image stored path to a loadable image URL. */
export function resolveBlogBannerUrl(
  banner: string | null | undefined
): string {
  const raw = typeof banner === "string" ? banner.trim() : "";
  if (!raw) return "";

  if (/^https?:\/\//i.test(raw)) return raw;

  const origin = (
    process.env.NEXT_PUBLIC_SERVER_IMG_PATH || DEFAULT_SITE_ORIGIN
  ).replace(/\/$/, "");

  if (raw.includes("/images")) {
    const tail = raw.split("/images")[1] || "";
    if (!tail) return "";
    const path = tail.startsWith("/") ? tail : `/${tail}`;
    return `${origin}/api/images${path}`;
  }

  const filename = raw.replace(/^\/+/, "");
  if (!filename) return "";
  return `${origin}/blogs/${filename}`;
}

/** True when path under /blogs/ is a static file (image, font, etc.), not a post slug. */
export function isBlogStaticAssetPath(path: string): boolean {
  const segment = path.replace(/^\/+/, "").split(/[?#]/)[0];
  if (!segment) return false;

  const parts = segment.split("/").filter(Boolean);
  const last = parts[parts.length - 1] ?? "";

  if (
    /\.(jpe?g|png|gif|webp|svg|avif|ico|mp4|webm|pdf|woff2?|ttf|css|js)$/i.test(
      last
    )
  ) {
    return true;
  }

  // Legacy dated uploads: /blogs/2023/09/acr-768x404.jpg
  if (/^\d{4}$/.test(parts[0] ?? "") && /^\d{1,2}$/.test(parts[1] ?? "")) {
    return true;
  }

  // Resized filenames: cook-1024x539.jpg, db16fa7c-..._1100_550.png
  if (/-\d+x\d+(\.[a-z0-9]+)?$/i.test(last) || /_\d+_\d+(\.[a-z0-9]+)?$/i.test(last)) {
    return true;
  }

  // UUID-prefixed image names
  if (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(
      last
    )
  ) {
    return true;
  }

  return false;
}

/** Browser image requests (img/srcset) — do not redirect /blogs/ asset URLs. */
export function isBlogImageFetchAccept(acceptHeader: string | null): boolean {
  const accept = acceptHeader ?? "";
  if (!accept.includes("image/")) return false;
  return !accept.includes("text/html");
}

/** Collapse repeated legacy segments: /blogs/blogs/... -> /blogs/... */
function collapseDuplicateBlogSegments(pathname: string): string {
  let p = pathname.replace(/\/+$/, "") || "/";
  let prev = "";
  while (prev !== p) {
    prev = p;
    p = p
      .replace(/\/blogs\/blogs\//gi, "/blogs/")
      .replace(/\/blog\/blogs\//gi, "/blogs/")
      .replace(/\/blogs\/blog\//gi, "/blogs/")
      .replace(/\/blogs2\/blogs2\//gi, "/blogs2/")
      .replace(/\/blog2\/blog2\//gi, "/blog2/");
  }
  return p;
}

/**
 * Returns redirect target for legacy blog URL paths, or null to keep as-is.
 * - /blogs/blogs/40, /blogs/60 -> /blogs (pagination)
 * - /blogs/my-post, /blogs2/my-post, /blog2/my-post -> /my-post
 * - /blogs/image.jpg, /blogs2/image.jpg -> null (static asset)
 */
export function getLegacyBlogRedirectPath(pathname: string): string | null {
  const normalized = collapseDuplicateBlogSegments(pathname);

  if (normalized === "/blogs") return null;

  if (normalized === "/blogs2" || normalized === "/blog2") {
    return "/blogs";
  }

  // Legacy pagination: /blogs/blogs/40, /blogs/40
  if (/^\/blogs\/blogs\/\d+$/i.test(normalized)) {
    return "/blogs";
  }
  if (/^\/blogs\/\d+$/i.test(normalized)) {
    return "/blogs";
  }

  if (normalized.startsWith("/blogs/")) {
    const rest = normalized.slice("/blogs/".length);
    if (!rest) return null;
    if (isBlogStaticAssetPath(rest)) return null;
    return `/${rest}`;
  }

  if (normalized.startsWith("/blog/")) {
    const rest = normalized.slice("/blog/".length);
    if (!rest) return null;
    if (/^\d+$/.test(rest.split("/")[0]) && !rest.includes("/")) {
      return "/blogs";
    }
    if (isBlogStaticAssetPath(rest)) return null;
    return `/${rest}`;
  }

  if (normalized.startsWith("/blogs2/")) {
    const rest = normalized.slice("/blogs2/".length);
    if (!rest) return "/blogs";
    if (isBlogStaticAssetPath(rest)) return null;
    return `/${rest}`;
  }

  if (normalized.startsWith("/blog2/")) {
    const rest = normalized.slice("/blog2/".length);
    if (!rest) return "/blogs";
    if (isBlogStaticAssetPath(rest)) return null;
    return `/${rest}`;
  }

  return null;
}

/**
 * Rewrites legacy blog post URLs in href attributes.
 */
export function rewriteLegacyBlogPostHref(href: string): string | null {
  if (!href || typeof href !== "string") return null;
  const h = href.trim();

  try {
    if (/^https?:\/\//i.test(h)) {
      const u = new URL(h);
      if (!/^(?:www\.)?ritzmediaworld\.com$/i.test(u.hostname)) return null;
      const dest = getLegacyBlogRedirectPath(u.pathname);
      if (!dest) return null;
      return `${u.origin}${dest}${u.search}${u.hash}`;
    }
  } catch {
    return null;
  }

  const pathOnly = h.split(/[?#]/)[0];
  const suffix = h.slice(pathOnly.length);
  const dest = getLegacyBlogRedirectPath(pathOnly);
  if (!dest) return null;
  return `${dest}${suffix}`;
}
