import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db"; // Ensure this is correctly set up

const db = getDBPool();

export async function GET() {
    try {
        const [rows] = await db.query("SELECT id, title, blog_image, slug, created_at FROM blogs ORDER BY id DESC LIMIT 3"); // Adjust table name
        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
