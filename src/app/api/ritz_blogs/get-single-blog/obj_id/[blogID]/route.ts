// app/api/blog/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzBlogModel from "@/models/Blog.Schema";
import RitzCats from "@/models/RitzCats.Schema";


export async function GET(
  request: NextRequest,
  { params }: { params: { blogID: string } }
) {
  try {
    await connectMongoDB();
    const blogId = await params.blogID;

    if (!blogId) {
      return NextResponse.json(
        { message: "Blog ID is required", success: false },
        { status: 400 }
      );
    }

    const blog = await RitzBlogModel.findById(blogId);

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found", success: false },
        { status: 404 }
      );
    }
    const blogCat = await RitzCats.findById(blog.blogCategoryId);
    // console.log('====================================');
    // console.log('these are blog cats related ', blogCat);
    // console.log('====================================');

    const catRelatedBlogs = await RitzBlogModel.find({
      blogCategoryId: blogCat,
    }).sort({ createdAt: -1 })
      .limit(4);
    const recentBlogs = await RitzBlogModel.find({}).sort({ createdAt: -1 }).limit(4);
    const categoryN = blogCat?.categoryName;

    return NextResponse.json(
      { message: "Blog fetched successfully", blog, latestRBlogs: catRelatedBlogs, recentBlogs, categoryN, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("❌ Error in GET single blog controller:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
