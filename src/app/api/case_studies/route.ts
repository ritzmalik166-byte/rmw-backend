import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db"; // Ensure this is correctly set up

export async function GET() {
  try {
    const db = getDBPool();
    const [rows] = await db.query(
      "SELECT id, title, blog_image, slug FROM blogs WHERE category_id = ? ORDER BY id DESC",
      [1]
    );
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Database query error in /api/case_studies:", error);
    // Return an empty array so the client can render gracefully instead of hard-failing.
    return NextResponse.json([], { status: 200 });
  }
}
