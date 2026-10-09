import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import path from "path";
import fs from "fs";
import ManagementModel from "@/models/Management";
import jwt from "jsonwebtoken";
import ManagementActivitiesModel from "@/models/ManagementActivities";
import { revalidateBlogListingPages } from "@/lib/revalidateBlogs";
import {
  generateSlugFromTitle,
  isValidSlugInput,
  normalizeSlug,
} from "@/lib/slugify";

function isNewBlogImageUpload(file: unknown): file is File {
  return (
    typeof File !== "undefined" &&
    file instanceof File &&
    file.size > 0
  );
}

// GET blog by slug
export async function GET(
  req: NextRequest,
  context: { params: { blog_slug: string } }
) {
  try {
    const { blog_slug } = await context.params;
    // console.log("Slug received:", blog_slug);

    if (!blog_slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // Normalize slug by collapsing multiple dashes to single dash
    const normalizedSlug = decodeURIComponent(blog_slug).replace(/-+/g, "-");

    const db = getDBPool();
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT * FROM blogs WHERE slug = ? LIMIT 1",
      [normalizedSlug]
    );

    // console.log("DB rows:", rows);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog: rows[0], isBlog: true }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function deleteFileFromUploads(url: string) {
  try {
    const filePath = path.join(process.cwd(), "public", url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.warn("Failed to delete previous image:", err);
  }
}

async function saveFileToUploads(
  file: File,
  filename: string
): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadDir = path.join(`${process.env.SERVER_IMG_PATH}`, "images");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, filename);
  fs.writeFileSync(filePath, buffer);
  return `/images/${filename}`;
}

// PUT (Update blog by slug)
export async function PATCH(
  req: NextRequest,
  context: { params: { blog_slug: string } }
) {
  try {
    // Only super_admin and editor Can Update A Blog 
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
    const { blog_slug } = await context.params;

    if (!blog_slug) {
      return NextResponse.json(
        { error: "Blog slug is required" },
        { status: 400 }
      );
    }

    const db = getDBPool();

    // Normalize slug by collapsing multiple dashes to single dash
    const normalizedSlug = decodeURIComponent(blog_slug).replace(/-+/g, "-");

    const [existingRows] = await db.execute<RowDataPacket[]>(
      "SELECT blog_image FROM blogs WHERE slug = ?",
      [normalizedSlug]
    );

    if (!existingRows || existingRows.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const existingImage =
      existingRows[0].blog_image != null
        ? String(existingRows[0].blog_image)
        : "";

    const formData = await req.formData();

    const category_id = formData.get("category_id") as string;
    const title = formData.get("title") as string;
    const slugInput = formData.get("slug") as string;
    const meta_title = formData.get("meta_title") as string;
    const meta_description = formData.get("meta_description") as string;
    const meta_keywords = formData.get("meta_keywords") as string;
    const description = formData.get("description") as string;
    const blogImageField = formData.get("blog_image");

    const newSlug = slugInput
      ? normalizeSlug(slugInput)
      : generateSlugFromTitle(title);

    if (!newSlug || !isValidSlugInput(newSlug)) {
      return NextResponse.json(
        { error: "A valid slug URL is required (letters, numbers, and hyphens only)" },
        { status: 400 }
      );
    }

    const [slugConflict] = await db.execute<RowDataPacket[]>(
      "SELECT id FROM blogs WHERE slug = ? AND slug != ? LIMIT 1",
      [newSlug, normalizedSlug]
    );
    if (slugConflict.length > 0) {
      return NextResponse.json(
        { error: "This slug URL is already in use. Please choose a different one." },
        { status: 409 }
      );
    }

    let blogImagePath = existingImage;

    if (isNewBlogImageUpload(blogImageField)) {
      const filename = `${Date.now()}_${path.basename(blogImageField.name)}`;
      blogImagePath = await saveFileToUploads(blogImageField, filename);
      if (existingImage) {
        deleteFileFromUploads(existingImage);
      }
    }

    await db.execute(
      `UPDATE blogs 
       SET category_id = ?, title = ?, slug = ?,
           meta_title = ?, meta_description = ?, meta_keywords = ?, 
           blog_image = ?, description = ? 
       WHERE slug = ?`,
      [
        category_id,
        title,
        newSlug,
        meta_title,
        meta_description,
        meta_keywords,
        blogImagePath,
        description,
        normalizedSlug,
      ]
    );

    // Create A New Management Activity
    const newManagementActivity = new ManagementActivitiesModel({ managementId: actor._id, activity: `User ${actor.name} (${actor.email}) updated a blog: ${blog_slug}`, activityTime: new Date() });
    await newManagementActivity.save();

    await revalidateBlogListingPages();

    return NextResponse.json(
      { message: "Blog updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}
