import { getDBPool } from "@/lib/db";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";
import ManagementModel from "@/models/Management";
import ManagementActivitiesModel from "@/models/ManagementActivities";
const UPLOAD_RELATIVE_URL_PREFIX = "service-third-images/updated-images";

async function saveServiceThirdImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = path.extname(file.name) || ".png";
  const stem = path
    .basename(file.name, ext)
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(0, 80);
  const filename = `${Date.now()}-${stem || "image"}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", UPLOAD_RELATIVE_URL_PREFIX);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);
  return `${UPLOAD_RELATIVE_URL_PREFIX}/${filename}`;
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
     // Get Token And Verify Management And Save Acitivity
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
     if (!actor) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
     }
     if (!actor.isActive) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
     }
     


    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        { message: "id is required", success: false },
        { status: 400 }
      );
    }

    const pool =  getDBPool();
    const [existingRows] = await pool.query<RowDataPacket[]>(
      "SELECT title, description, image_url FROM service_third WHERE id = ?",
      [id]
    );

    if (!existingRows?.length) {
      return NextResponse.json(
        { message: "No service_third row found for this id", success: false },
        { status: 404 }
      );
    }

    const formData = await request.formData();

    const assignments: string[] = [];
    const values: unknown[] = [];

    if (formData.has("title")) {
      assignments.push("title = ?");
      values.push(String(formData.get("title")));
    }
    if (formData.has("description")) {
      assignments.push("description = ?");
      values.push(String(formData.get("description")));
    }

    const imageField = formData.get("image_url") ?? formData.get("image");
    if (imageField instanceof File && imageField.size > 0) {
      const imagePath = await saveServiceThirdImage(imageField);
      assignments.push("image_url = ?");
      values.push(imagePath);
    }

    if (assignments.length === 0) {
      return NextResponse.json(
        { message: "Nothing to update; send title, description, and/or an image file", success: false },
        { status: 400 }
      );
    }

    values.push(id);
    await pool.query(
      `UPDATE service_third SET ${assignments.join(", ")} WHERE id = ?`,
      values
    );

    const [updated] = await pool.query<RowDataPacket[]>(
      "SELECT id, title, description, image_url FROM service_third WHERE id = ?",
      [id]
    );
    await ManagementActivitiesModel.create({
      managementId: actor.id,
      activity: `Service Third Images Updated for ${updated[0].title} And Update By ${actor.name}`,
      activityTime: new Date(),
    });

    return NextResponse.json(
      {
        message: "service_third updated successfully",
        success: true,
        row: updated[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in service-third-images-update:", error);
    return NextResponse.json(
      { error: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
