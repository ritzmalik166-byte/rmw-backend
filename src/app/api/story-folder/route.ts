import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getDBPool } from "@/lib/db"; // adjust your import path accordingly
import { ResultSetHeader } from 'mysql2';

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const slug = formData.get("slug");
    const category = formData.get("category") || "";
    const author = formData.get("author") || "";

    // Validate fields
    if (
      typeof title !== "string" ||
      typeof slug !== "string" ||
      !title.trim() ||
      !slug.trim()
    ) {
      return NextResponse.json(
        { error: "Title and slug are required." },
        { status: 400 }
      );
    }

    // Handle coverImage correctly with type checking
    const coverImageRaw = formData.get("image");

    let coverImage: File;

    if (Array.isArray(coverImageRaw)) {
      coverImage = coverImageRaw[0];
    } else if (coverImageRaw instanceof File) {
      coverImage = coverImageRaw;
    } else {
      return NextResponse.json(
        { error: "Invalid or missing cover image" },
        { status: 400 }
      );
    }

    // Prepare directory for storing images
    const imagesDir = path.join(process.cwd(), "public", "storyImages");
    await fs.mkdir(imagesDir, { recursive: true });

    // Generate unique filename for image
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalName = coverImage.name.replace(/\s+/g, "-");
    const fileName = `${uniqueSuffix}-${originalName}`;
    const filePath = path.join(imagesDir, fileName);

    // Save file to disk
    const buffer = Buffer.from(await coverImage.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    // Store the relative path to the image for your frontend
    const coverImageUrl = `/storyImages/${fileName}`;

    // Insert into database
    const pool = getDBPool();

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO story_folders (title, slug, cover_image_url, category, author)
   VALUES (?, ?, ?, ?, ?)`,
      [title, slug, coverImageUrl, category, author]
    );

    // Now you get proper type safety
    const insertId = result.insertId;


    return NextResponse.json({
      id: insertId,
      title,
      slug,
      cover_image_url: coverImageUrl,
      category,
      author,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    });
  } catch (error) {
    console.error("Error in story-folder POST:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
