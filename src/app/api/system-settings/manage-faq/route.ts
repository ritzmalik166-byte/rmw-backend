import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { ResultSetHeader } from "mysql2";

// POST API to add a new FAQ
export async function POST(req: NextRequest) {
  try {
    const { title, description, status } = await req.json();

    const query = `
      INSERT INTO faqs (title, description, status)
      VALUES (?, ?, ?)
    `;

    const [result] = await getDBPool().execute<ResultSetHeader>(query, [
      title,
      description,
      status || "active", // default to active if not provided
    ]);

    return NextResponse.json(
      { success: true, id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while posting FAQ:", error);
    return NextResponse.json({ error: "Failed to post FAQ" }, { status: 500 });
  }
}

// GET API to fetch FAQs
export async function GET() {
  try {
    const query = `
        SELECT id, title, description, status, created_at, updated_at
        FROM faqs
        ORDER BY created_at DESC
      `;

    const [rows] = await getDBPool().execute(query);

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error while fetching FAQs:", error);
    return NextResponse.json(
      { error: "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}
