import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";

// POST API to upload newsletter
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Prepare the SQL query with a parameter
    const query = "INSERT INTO newsletter (email) VALUES (?)";

    // Execute the query with the provided email
    const [result] = await getDBPool().execute(query, [email]);

    return NextResponse.json({ success: true, id: result }, { status: 201 });
  } catch (error) {
    console.error("Error while posting newsletter:", error);
    return NextResponse.json(
      { error: "Failed to post newsletter" },
      { status: 500 }
    );
  }
}

// GET API to fetch newsletter
export async function GET() {
  try {
    // Query to fetch all newsletters
    const query =
      "SELECT id, email, addDate FROM newsletter ORDER BY addDate DESC";

    // Execute the query using your database pool
    const [rows] = await getDBPool().execute(query);

    // Return the newsletters in the response
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error while fetching newsletters:", error);
    return NextResponse.json(
      { error: "Failed to fetch newsletters" },
      { status: 500 }
    );
  }
}
