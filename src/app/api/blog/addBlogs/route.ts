import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { getDBPool } from "@/lib/db"; // Assuming you have a database connection setup
import { revalidateBlogListingPages } from "@/lib/revalidateBlogs";
import {
  generateSlugFromTitle,
  isValidSlugInput,
  normalizeSlug,
} from "@/lib/slugify";

// This is MySQL

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();

    // Extract form values
    const category_id = formData.get("category_id") as string;
    const title = formData.get("title") as string;
    const slugInput = formData.get("slug") as string;
    const meta_title = formData.get("meta_title") as string;
    const meta_description = formData.get("meta_description") as string;
    const meta_keywords = formData.get("meta_keywords") as string;
    const description = formData.get("description") as string;
    const blog_image = formData.get("blogImage") as File | null;

    const slug = slugInput
      ? normalizeSlug(slugInput)
      : generateSlugFromTitle(title);

    if (!slug || !isValidSlugInput(slug)) {
      return NextResponse.json(
        { error: "A valid slug URL is required (letters, numbers, and hyphens only)" },
        { status: 400 }
      );
    }

    const db = getDBPool();
    const [existing] = await db.execute(
      "SELECT id FROM blogs WHERE slug = ? LIMIT 1",
      [slug]
    );
    if (Array.isArray(existing) && existing.length > 0) {
      return NextResponse.json(
        { error: "This slug URL is already in use. Please choose a different one." },
        { status: 409 }
      );
    }

    let imagePath = "";

    // Handle image upload
    if (blog_image) {
      const bytes = await blog_image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Define image path (saving to public/uploads folder)
      const fileName = `${Date.now()}_${blog_image.name}`;
      const uploadDir = path.join(process.cwd(), "static/images", fileName);

      await writeFile(uploadDir, buffer);
      imagePath = `${fileName}`;
    }
    // Insert data into MySQL
    await db.execute(
      "INSERT INTO blogs (category_id, title,slug, meta_title, meta_description, meta_keywords, blog_image, description) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        category_id,
        title,
        slug,
        meta_title,
        meta_description,
        meta_keywords,
        imagePath,
        description,
      ]
    );

    await revalidateBlogListingPages();

    return NextResponse.json(
      { message: "Blog added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding blog:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}