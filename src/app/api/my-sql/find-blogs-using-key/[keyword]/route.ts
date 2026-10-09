import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { getDBPool } from "@/lib/db";

export async function GET(
  req: NextRequest,
  context: { params: { keyword: string } }
) {
  try {
    const rawKeyword = context.params.keyword || "";

    // Normalize incoming slug: replace hyphens, lowercase, trim
    const normalizedKeyword = decodeURIComponent(
      rawKeyword.replace(/-/g, " ").trim().toLowerCase()
    );

    if (!normalizedKeyword) {
      return NextResponse.json({ error: "Keyword is required" }, { status: 400 });
    }

    const db = getDBPool();

    const [rows] = await db.execute<RowDataPacket[]>(
      `
      SELECT *
      FROM blogs
      WHERE FIND_IN_SET(
        ?, 
        LOWER(REPLACE(meta_keywords, ', ', ','))
      )
      AND status = 'active'
      ORDER BY created_at DESC
      `,
      [normalizedKeyword]
    );

    return NextResponse.json({ blogs: rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs by keyword:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}