import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";

export async function GET() {
  try {
    const db = getDBPool();
    const [rows] = await db.query("SELECT * FROM blogs");
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error in fetching mysql blogs ", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}