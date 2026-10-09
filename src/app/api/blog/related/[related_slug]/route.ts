import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";

const db = getDBPool();

interface BlogCategoryRow extends RowDataPacket {
  category_id: number;
}

interface BlogRow extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  blog_image: string;
  created_at: string;
}

export async function GET(
  request: Request,
  context: { params: { related_slug: string } }
) {
  try {
    const related_param = await context.params; // destructure param wrapper
    const { related_slug } = related_param;

    // Normalize slug by collapsing multiple dashes to single dash
    const normalizedSlug = decodeURIComponent(related_slug).replace(/-+/g, "-");

    const [blogRows] = await db.query<BlogCategoryRow[]>(
      "SELECT category_id FROM blogs WHERE slug = ? LIMIT 1",
      [normalizedSlug]
    );

    if (blogRows.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const categoryId = blogRows[0].category_id;

    const [relatedBlogs] = await db.query<BlogRow[]>(
      "SELECT id, title, slug, blog_image, created_at FROM blogs WHERE category_id = ? AND slug != ? ORDER BY id DESC LIMIT 5",
      [categoryId, normalizedSlug]
    );

    return NextResponse.json({ related: relatedBlogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
