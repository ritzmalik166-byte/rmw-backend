import { getDBPool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pool = await getDBPool();
    const data = await pool.query("SELECT id, title from service_second");
    if (!data) {
      return NextResponse.json(
        {
          message: "Data Not Found!",
          success: false,
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        message: "All services has been fetched successfully!",
        success: true,
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(
      "There are some errors in get-service-scnd-ids so plz fix the bugs first ",
      error
    );
    return NextResponse.json(
      {
        message: "Internal Server Errors!",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
