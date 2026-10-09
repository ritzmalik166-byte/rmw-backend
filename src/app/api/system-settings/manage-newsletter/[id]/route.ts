import { getDBPool } from "@/lib/db";
import { ResultSetHeader } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

// DELETE API to remove a newsletter based on its ID
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params; // Get the ID from the URL parameters

    // SQL query to delete the newsletter by ID
    const query = "DELETE FROM newsletter WHERE id = ?";

    // Execute the delete query
    // const [result]: [ResultSetHeader, any[]] = await getDBPool().execute(
    //   query,
    //   [id]
    // );
    const [result] = await getDBPool().execute<ResultSetHeader>(query, [id]);

    // Check if the deletion was successful
    if (result.affectedRows > 0) {
      return NextResponse.json(
        { message: "Newsletter deleted successfully." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Newsletter not found." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
