import { getDBPool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";

type ServiceThirdRow = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  service2_id: number;
};

export async function GET(request: NextRequest) {
  try {
    const pool = getDBPool();
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") ?? searchParams.get("search") ?? "").trim();

    let rows: RowDataPacket[];

    if (q) {
      const like = `%${q}%`;
      const [result] = await pool.query<RowDataPacket[]>(
        `SELECT id, title, description, image_url, service2_id
         FROM service_third
         WHERE title LIKE ?
            OR description LIKE ?
            OR image_url LIKE ?
            OR CAST(id AS CHAR) LIKE ?
            OR CAST(service2_id AS CHAR) LIKE ?
         ORDER BY id DESC`,
        [like, like, like, like, like]
      );
      rows = result;
    } else {
      const [result] = await pool.query<RowDataPacket[]>(
        "SELECT id, title, description, image_url, service2_id FROM service_third ORDER BY id DESC"
      );
      rows = result;
    }

    return NextResponse.json(
      {
        success: true,
        message: q
          ? `Found ${rows.length} service third row(s) matching your search`
          : "Service Third data fetched successfully",
        total: rows.length,
        query: q || null,
        data: rows as unknown as ServiceThirdRow[],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in service-third-images-update list API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch service_third data",
        data: [],
      },
      { status: 500 }
    );
  }
}