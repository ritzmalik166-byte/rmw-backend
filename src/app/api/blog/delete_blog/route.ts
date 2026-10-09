// import { NextResponse } from "next/server";
// import { getDBPool } from "@/lib/db";

// export async function DELETE(req: Request) {
//   try {
//     const { blog_slug } = await req.json();

//     if (!blog_slug) {
//       return NextResponse.json({ error: "Blog slug is required" }, { status: 400 });
//     }

//     const pool = await getDBPool();

//     // Check if blog exists
//     const [existingBlog]: any = await pool.query("SELECT * FROM blogs WHERE slug = ?", [blog_slug]);

//     if (!existingBlog.length) {
//       return NextResponse.json({ error: "Blog not found" }, { status: 404 });
//     }

//     // Delete blog
//     await pool.query("DELETE FROM blogs WHERE slug = ?", [blog_slug]);

//     return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import ManagementModel from "@/models/Management";
import jwt from "jsonwebtoken";
import ManagementActivitiesModel from "@/models/ManagementActivities";
import { revalidateBlogListingPages } from "@/lib/revalidateBlogs";

type Blog = {
  id: string;
  blog_image: string;
  title: string;
  slug: string;
  category_name: string;
  created_at: string;
  status: "active" | "inactive";
};

type BlogRow = Blog & RowDataPacket;

export async function DELETE(req: Request) {
  try {
    // Only super_admin and editor Can Delete A Blog 
    const token = req.headers.get("Authorization")?.split(" ")[1];
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
    const { blog_slug } = await req.json();

    if (!blog_slug) {
      return NextResponse.json({ error: "Blog slug is required" }, { status: 400 });
    }

    const pool = await getDBPool();

    const [rows] = await pool.query<BlogRow[]>("SELECT * FROM blogs WHERE slug = ?", [blog_slug]);
    const existingBlog = rows[0];

    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    await pool.query("DELETE FROM blogs WHERE slug = ?", [blog_slug]);

    // Create A New Management Activity
    const newManagementActivity = new ManagementActivitiesModel({ managementId: actor._id, activity: `User ${actor.name} (${actor.email}) deleted a blog: ${blog_slug}`, activityTime: new Date() });
    await newManagementActivity.save();

    await revalidateBlogListingPages();

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}

