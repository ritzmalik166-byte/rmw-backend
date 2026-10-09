// app/api/blog/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzBlogModel from "@/models/Blog.Schema";
import { getPublicBlogFilter, isBlogPubliclyVisible } from "@/lib/blogPublish";
import RitzCats from "@/models/RitzCats.Schema";

// GET single blog by ID | Slug
// utils/slugify.ts
export function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumerics with -
    .replace(/^-+|-+$/g, ""); // trim - from start and end
}

export async function GET(
  request: NextRequest,
  { params }: { params: { blogID: string } }
) {
  try {
    await connectMongoDB();
    const blogId = await params.blogID;
    const blSlug = slugify(blogId);

    if (!blogId) {
      return NextResponse.json(
        { message: "Blog ID is required", success: false },
        { status: 400 }
      );
    }
    // console.log(blSlug, "This is blg Slug ");
    // const tst_bl = await RitzBlogModel.find({});
    // console.log("These are all mongo blogs ", tst_bl);
    
    const blog = await RitzBlogModel.findOne({
      blogSlug: blSlug
    });

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found", success: false },
        { status: 404 }
      );
    }

    if (!isBlogPubliclyVisible(blog)) {
      return NextResponse.json(
        { message: "Blog not found", success: false },
        { status: 404 }
      );
    }

    const publicFilter = getPublicBlogFilter();
    const blogCat = await RitzCats.findById(blog.blogCategoryId);
    // console.log('====================================');
    // console.log('these are blog cats related ', blogCat);
    // console.log('====================================');

    const catRelatedBlogs = await RitzBlogModel.find({
      ...publicFilter,
      blogCategoryId: blogCat,
    }).sort({ createdAt: -1 })
      .limit(4);
    const recentBlogs = await RitzBlogModel.find(publicFilter).sort({ createdAt: -1 }).limit(4);
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
