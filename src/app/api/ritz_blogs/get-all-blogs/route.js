import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzBlogModel from "@/models/Blog.Schema";
import { NextResponse } from "next/server";

const ADMIN_FIELDS =
  "blogTitle blogBanner blogSlug blogStatus publishStatus scheduledAt publishedAt createdAt updatedAt";

export async function GET() {
  try {
    await connectMongoDB({});

    const allBlogs = await RitzBlogModel.find()
      .select(ADMIN_FIELDS)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        allBlogs,
        message:
          allBlogs.length > 0
            ? "All blogs fetched successfully!"
            : "There are no blogs",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.log(
      "There are some errors in fetching the all blogs plz fix the bug first ",
      error
    );
    return NextResponse.json(
      { message: "Internal Server Err" },
      {
        status: 500,
      }
    );
  }
}