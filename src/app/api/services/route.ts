import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2/promise";
import { getDBPool } from "@/lib/db"; // Assuming your DB connection file is in `lib/db.ts`

export async function GET() {
  try {
    const db = getDBPool(); // Get the database pool connection
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM services"); // Fetch data from `services` table
    let dataObj = [...rows];
    for (let obj of rows) {
      let service_id = obj.id;
      const [rows] = await db.query<RowDataPacket[]>("SELECT * from service_second where service_id = ?", [service_id]);

      rows.forEach((row) => {
        dataObj.forEach((ob) => {
          let sub = [];
          if (ob.id === row.service_id) {
            if (!ob.sub) {
              ob.sub = [];
            }      
            ob.sub.push(row)
          }
        })
      })
    }
    return NextResponse.json({ success: true, data: dataObj });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
