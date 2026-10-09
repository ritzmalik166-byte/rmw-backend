import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { getDBPool } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const status = formData.get("status") as "active" | "inactive";
    const imageFile = formData.get("image") as File | null;

    if (!title || !status || !imageFile) {
      return NextResponse.json(
        {
          error: "All fields are required",
        },
        { status: 400 }
      );
    }

    // save image in public/media-banners
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}_${imageFile.name}`;
    const uplaodPath = path.join(
      process.cwd(),
      "public/media-banners",
      fileName
    );
    await writeFile(uplaodPath, buffer);

    // save data to db
    const pool = getDBPool();

    await pool.execute(
      "INSERT INTO media_banner (title, image, status) VALUES(?,?,?)",
      [title, fileName, status]
    );

    return NextResponse.json(
      {
        message: "Media banner saved.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding media banner: ", error);
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
}
