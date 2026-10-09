import { getDBPool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        {
          message: "ID Is Required To Fetch The Single Blog!",
          success: false,
        },
        {
          status: 404,
        }
      );
    }
    const pool =  getDBPool();
    const cardData = await pool.query(
      "Select id, title, description, image_url FROM service_third WHERE id = ?",
      [id]
    );
    if (!cardData) {
      return NextResponse.json(
        {
          message: "Sorry Page Card Data Not Found!",
          success: false,
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Page Card Fetched Successfully",
        success: true,
        card: cardData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(
      "There are some error sin sql single blog controller plz fix the bug first ",
      error
    );
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
}
