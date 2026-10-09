import { getDBPool } from "@/lib/db";
import saveFilesIntoDataBase from "@/lib/fileHandler";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from 'mysql2';
interface RESULTEDDATA{
    title:string;
    description:string;
    image_url:string
}
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pool = await getDBPool();
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { message: "ID is required to fetch the page card", success: false },
        { status: 400 }
      );
    }

    // Get current/existing data
    const [existingRows] = await (pool.query(
      "SELECT title, description, image_url FROM service_third WHERE id = ?",
      [id]
    ) as unknown as [RESULTEDDATA[], RowDataPacket[]]);

    if (!existingRows || existingRows.length === 0) {
      return NextResponse.json(
        { message: "No card found with this ID", success: false },
        { status: 404 }
      );
    }

    const existingData = existingRows[0];

    const formData = await req.formData();
    const title = formData.get("title") || existingData.title;
    const description = formData.get("description") || existingData.description;
    const file = formData.get("image_url");

    let image_url = existingData.image_url;

    if (file && typeof file === "object" && "name" in file) {
      image_url = await saveFilesIntoDataBase(file, (file as File).name);
    }

    // Update only with new or existing values
    await pool.query(
      "UPDATE service_third SET title = ?, description = ?, image_url = ? WHERE id = ?",
      [title, description, image_url, id]
    );

    return NextResponse.json(
      {
        message: "Page Card has been updated successfully!",
        success: true,
        updatedFields: { title, description, image_url },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating page card:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}