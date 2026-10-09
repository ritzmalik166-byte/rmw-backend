import { getDBPool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = getDBPool();
    const [rows] = await db.query("SELECT * FROM services");

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Services Not Found" },
        { status: 404 }
      );
    }

    // Add sub services
    for (const service of rows) {
      const [sub] = await db.query(
        "SELECT * FROM service_second WHERE service_id = ?",
        [service.id]
      );

      service.sub = sub;

      // Add third services
      for (const subItem of sub) {
        const [third] = await db.query(
          "SELECT * FROM service_third WHERE service2_id = ?",
          [subItem.id]
        );

        subItem.third = third;
      }
    }

    return NextResponse.json(
      { success: true, data: rows },
      { status: 200 }
    );
  } catch (error) {
    console.log("Get Services Error :: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error,
      },
      { status: 500 }
    );
  }
}