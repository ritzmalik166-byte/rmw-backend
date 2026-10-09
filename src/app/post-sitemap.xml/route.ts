import { NextResponse } from "next/server";
import { SITEMAP_XML_HEADERS } from "@/lib/sitemap/constants";
import { fetchPostSitemapPaths } from "@/lib/sitemap/postRecords";
import { buildPostUrlItems, buildUrlsetXml } from "@/lib/sitemap/xml";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const paths = await fetchPostSitemapPaths();
    const items = buildPostUrlItems(paths);
    const xml = buildUrlsetXml(items);

    return new NextResponse(xml, { headers: SITEMAP_XML_HEADERS });
  } catch (error) {
    console.error("[post-sitemap.xml] Failed to generate sitemap:", error);
    return new NextResponse("Sitemap unavailable", { status: 503 });
  }
}
