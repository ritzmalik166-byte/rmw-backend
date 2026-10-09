import { NextResponse } from "next/server";
import {
  publishScheduledBlogs,
  verifyCronAuth,
} from "@/lib/publishScheduledBlogs";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  if (!verifyCronAuth(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await publishScheduledBlogs();

    return NextResponse.json(
      {
        message:
          result.publishedCount > 0
            ? `Published ${result.publishedCount} scheduled blog(s)`
            : "No scheduled blogs due for publishing",
        ...result,
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[cron/publish-scheduled-blogs]", error);
    return NextResponse.json(
      { message: "Failed to publish scheduled blogs", error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}
