import { getDBPool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pool = await getDBPool();
    const id = await params.id;
    if (!id) {
      return NextResponse.json(
        {
          message: "ID is required to delete the page card",
          success: false,
        },
        {
          status: 404,
        }
      );
    }
    const deleted = await pool.query("DELETE FROM service_third WHERE id = ?", [
      id,
    ]);
    if (!deleted) {
      return NextResponse.json(
        {
          message: "Internal Server Error!",
          success: false,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Page Card Deleted Successfully!",
        succee: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(
      "There are some errors in delete page card controller plz fix the bug first ",
      error
    );
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
