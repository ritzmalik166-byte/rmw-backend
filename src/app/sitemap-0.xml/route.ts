import { NextResponse } from "next/server";
import { SITEMAP_XML_HEADERS } from "@/lib/sitemap/constants";
import { fetchPostSitemapPaths } from "@/lib/sitemap/postRecords";
import { buildSitemap0WithPosts } from "@/lib/sitemap/readBaseSitemap";
import { buildPostUrlItems } from "@/lib/sitemap/xml";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const paths = await fetchPostSitemapPaths();
    const postItems = buildPostUrlItems(paths);
    const xml = await buildSitemap0WithPosts(postItems);

    if (!xml) {
      return new NextResponse("Sitemap base unavailable", { status: 503 });
    }

    return new NextResponse(xml, { headers: SITEMAP_XML_HEADERS });
  } catch (error) {
    console.error("[sitemap-0.xml] Failed to generate sitemap:", error);
    return new NextResponse("Sitemap unavailable", { status: 503 });
  }
}
