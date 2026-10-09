import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzBlogModel from "@/models/Blog.Schema";
import jwt from "jsonwebtoken";
import ManagementModel from "@/models/Management";
import ManagementActivitiesModel from "@/models/ManagementActivities";
import { revalidateBlogListingPages } from "@/lib/revalidateBlogs";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { blogID: string } }
) {
  try {
    await connectMongoDB();
    // Only super_admin and editor Can Delete A Blog 
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Token is required" }, { status: 400 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string | undefined };
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (decoded.role !== "super_admin" && decoded.role !== "editor" && decoded.role !== undefined) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const actor = await ManagementModel.findById(decoded.id as string);
    if (!actor || !actor.isActive) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const blogId = params.blogID;

    if (!blogId) {
      return NextResponse.json(
        { message: "Blog ID is required", success: false },
        { status: 400 }
      );
    }

    
    const find_blog = await RitzBlogModel.findOne({blogSlug:blogId});
    if(!find_blog) {
      return NextResponse.json({message:"Blog Not Found"}, {status:404});
    }

    const deletedBlog = await RitzBlogModel.findByIdAndDelete(find_blog._id);

    if (!deletedBlog) {
      return NextResponse.json(
        { message: "Blog not found or already deleted", success: false },
        { status: 404 }
      );
    }

    // Create A New Management Activity
    const newManagementActivity = new ManagementActivitiesModel({ managementId: actor._id, activity: `User ${actor.name} (${actor.email}) deleted a blog: ${find_blog.blogTitle}`, activityTime: new Date() });
    await newManagementActivity.save();

    await revalidateBlogListingPages();

    return NextResponse.json(
      { message: "Blog deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("❌ Error in DELETE blog controller:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
