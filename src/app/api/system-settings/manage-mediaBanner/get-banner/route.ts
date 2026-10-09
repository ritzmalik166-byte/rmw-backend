import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";

export async function GET() {
  try {
    const db = getDBPool();

    const [rows] = await db.execute(`
      SELECT id, title, image, status, created_at 
      FROM media_banner 
      ORDER BY created_at DESC
    `);

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching media banners:", error);
    return NextResponse.json(
      { error: "Failed to fetch media banners" },
      { status: 500 }
    );
  }
}
