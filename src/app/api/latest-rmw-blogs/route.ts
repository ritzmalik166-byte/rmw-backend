import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzBlogModel from "@/models/Blog.Schema";

export async function GET() {
  try {
    await connectMongoDB();
    //  Latest 3 Blogs .
    const latestBlogs = await RitzBlogModel.find()
      .sort({ createdAt: -1 })
      .limit(3);
    if (latestBlogs.length < 1) {
      return NextResponse.json(
        { message: "There are no blogs" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { latestBlogs, message: "Latest RMW blogs fetched successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      "There are some errors in fetching the latest RMW blogs plz fix the bug first ",
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