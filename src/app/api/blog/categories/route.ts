import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";

export async function GET() {
  const db = getDBPool();
  try {
    const [categories] = await db.query("SELECT id, name FROM categories");
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return NextResponse.json({ error: "Failed to fetch blog categories" }, { status: 500 });
  }
}
