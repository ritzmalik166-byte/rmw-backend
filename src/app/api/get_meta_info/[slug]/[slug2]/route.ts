import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string; slug2: string } }
) {
  try {
    console.log("API CALLED");
    const { slug, slug2 } = await params;

    const pool = await getDBPool();
    const parent_service_link = slug2;
    const child_service_link = slug;
    console.log("parent_service_link", parent_service_link);
    console.log("child_service_link", child_service_link);

    // get parent service id 
    const [parentRows] = await pool.query<RowDataPacket[]>(
      "select id from services where link = ?",
      [parent_service_link]
    );
    
    if (parentRows.length === 0) {
      return NextResponse.json({ message: "Parent service not found" }, { status: 404 });
    }
    
    const parentId = parentRows[0].id;
    console.log("parentId", parentId);
    
    console.log("child_service_link", child_service_link);
    
    // Get meta title, meta_keywords and desc from child service
    const [rows] = await pool.query<RowDataPacket[]>(
      "select meta_title, meta_description, meta_keywords from service_second where service_id = ? and link = ?",
      [parentId, child_service_link]
    );

    if(rows.length === 0) {
      return NextResponse.json({ message: "Child service not found" }, { status: 404 });
    }

    return NextResponse.json({
      data: rows[0] || null,
    }, {
      status: 200,
    });
  } catch (error) {
    console.error("Error in get_meta_info", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}