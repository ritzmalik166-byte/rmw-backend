import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

function resolveImageUrl(imagePath: string): string {
  const trimmed = imagePath?.trim();
  if (!trimmed) return "";

  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  let baseUrl =
    process.env.NEXT_PUBLIC_SERVER_IMG_PATH ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://ritzmediaworld.com";
  baseUrl = baseUrl.replace(/\/$/, "");

  if (trimmed.includes("/images")) {
    return `${baseUrl}/api/images${trimmed.split("/images")[1]}`;
  }

  if (trimmed.startsWith("/blogs/")) {
    return `${baseUrl}${trimmed}`;
  }

  if (trimmed.startsWith("/")) {
    return `${baseUrl}${trimmed}`;
  }

  return `${baseUrl}/blogs/${trimmed}`;
}

export async function GET(req: NextRequest) {
  try {
    const src = req.nextUrl.searchParams.get("src");
    if (!src?.trim()) {
      return NextResponse.json({ error: "Image path is required" }, { status: 400 });
    }

    const imageUrl = resolveImageUrl(src);
    if (!imageUrl) {
      return NextResponse.json({ error: "Invalid image path" }, { status: 400 });
    }

    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      timeout: 20000,
      validateStatus: (status) => status === 200,
    });

    const contentType =
      (response.headers["content-type"] as string | undefined)?.toLowerCase() ||
      "image/jpeg";

    const base64 = Buffer.from(response.data).toString("base64");

    return NextResponse.json({
      success: true,
      base64,
      contentType,
      imageUrl,
    });
  } catch (error) {
    console.error("[backup-image] fetch failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
