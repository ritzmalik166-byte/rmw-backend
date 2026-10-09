import { getDBPool } from "@/lib/db";
import saveFilesIntoDataBase from "@/lib/fileHandler";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const title = form.get("title");
    const description = form.get("description");
    const service2_id = form.get("service2_id");
    const file = form.get("form");
    const pool = await getDBPool();
    if (!file || typeof file !== "object" || "name" in file) {
      return NextResponse.json(
        {
          message: "Image is required",
          success: false,
        },
        {
          status: 404,
        }
      );
    }
    const image_url = await saveFilesIntoDataBase(file, (file as File).name);
     await pool.query(
      "INSERT INTO service_third (title, description, image_url, service2_id) VALUES (?, ?, ?, ?)",
      [title, description, image_url, service2_id]
    );
  } catch (error) {
    console.log(
      "There are some errors in add new page section plz fix the bug first ",
      error
    );
    return NextResponse.json(
      {
        message: "Internal Server Errors!",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
