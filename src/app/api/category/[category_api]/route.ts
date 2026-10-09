import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";

const db = getDBPool();


export async function GET(
  req: NextRequest,
  context: { params: { category_api: string } }
) {
  const { category_api } = await context.params;

  try {
    const [rows] = await db.query(
      `
      SELECT 
        b.title, 
        b.blog_image, 
        b.slug
      FROM blogs b
      INNER JOIN categories c ON b.category_id = c.id
      WHERE c.link = ?
      ORDER BY b.id DESC
      `,
      [category_api]
    );

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
