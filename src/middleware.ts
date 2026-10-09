import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  getLegacyBlogRedirectPath,
  getLegacyHtmlBlogRedirectPath,
  isBlogImageFetchAccept,
} from "@/lib/blogUrl";
import { getServiceShortSlugRedirect } from "@/lib/serviceShortSlugRedirects";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const url = req.nextUrl;

  // Orphan third-level service slugs: /services/ad-placements → /services/print-advertising/ad-placements
  const serviceRedirect = getServiceShortSlugRedirect(pathname);
  if (serviceRedirect) {
    const dest = new URL(serviceRedirect, url.origin);
    dest.search = url.search;
    return NextResponse.redirect(dest, 301);
  }

  // Canonicalize /web-stories from www -> non-www
  if (pathname === "/web-stories" && url.hostname === "www.ritzmediaworld.com") {
    const redirectUrl = url.clone();
    redirectUrl.hostname = "ritzmediaworld.com";
    return NextResponse.redirect(redirectUrl, 301);
  }

  // Ignore Next.js internal paths
  if (url.pathname.startsWith("/_next") || url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const splitLink = url.pathname.split("/");
  const year = splitLink[1];
  const day = splitLink[2];
  const month = splitLink[3];
  if (year && day && month && splitLink[4]) {
    const dateStr = `${year}/${month}/${day}`;
    const dateObj = new Date(dateStr);
    if (!isNaN(dateObj.getTime())) {
      return NextResponse.redirect(
        new URL(`/${splitLink[4]}`, req.url),
        301
      );
    }
  }

  if (
    url.pathname.startsWith("/iizuka.city.official") ||
    url.pathname.startsWith("/refund-policy.html") ||
    url.pathname.startsWith("/fr") ||
    url.pathname.startsWith("/water-well-screen") ||
    url.pathname.startsWith("/propateer")
  ) {
    return NextResponse.redirect(new URL("/", url.origin), 301);
  }
  if (
    url.pathname.startsWith(
      "/best-locations-for-outdoor-advertising-in-new-delhi-"
    )
  ) {
    return NextResponse.redirect(
      new URL(
        "/best-locations-for-outdoor-advertising-in-new-delhi",
        req.url
      ),
      301
    );
  }

  // Legacy blog URLs: /my-post.html -> /my-post (keep about.html, contact.html, work.html)
  const legacyHtmlDest = getLegacyHtmlBlogRedirectPath(pathname);
  if (legacyHtmlDest) {
    const dest = new URL(legacyHtmlDest, url.origin);
    dest.search = url.search;
    return NextResponse.redirect(dest, 301);
  }

  // Legacy blog URLs: /blogs/<slug> -> /<slug> (images under /blogs/ stay as-is)
  const legacyBlogDest = getLegacyBlogRedirectPath(pathname);
  if (legacyBlogDest) {
    const isLegacyBlogPath =
      /^\/blogs2?(\/|$)/i.test(pathname) || /^\/blog2?(\/|$)/i.test(pathname);
    if (isLegacyBlogPath && isBlogImageFetchAccept(req.headers.get("accept"))) {
      return NextResponse.next();
    }
    const dest = new URL(legacyBlogDest, url.origin);
    dest.search = url.search;
    return NextResponse.redirect(dest, 301);
  }

  // Redirect /admin to /admin/dashboard (management auth is client-side via rm_token)
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

// ✅ Apply middleware to matching routes (including date-style URLs: /year/day/month/slug)
export const config = {
  matcher: [
    // Date-style redirect: /2024/15/01/blog-slug -> /blog-slug
    "/:year/:day/:month/:slug*",
    // ✅ Previous matchers (keep as they are)
    "/admin/:path*",
    "/blogs/:path*",
    "/blogs2",
    "/blogs2/:path*",
    "/blog/:path*",
    "/blog2",
    "/blog2/:path*",
    "/fr/:path*",
    "/refund-policy.html",
    "/iizuka.city.official/:path*",
    "/water-well-screen/:path*",
    "/propateer/:path*",
    "/best-locations-for-outdoor-advertising-in-new-delhi-:path*",

    "/web-stories",
    "/services/:slug",
    "/:slug.html",
  ],
};
