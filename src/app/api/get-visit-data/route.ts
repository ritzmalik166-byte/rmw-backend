// import { NextResponse } from "next/server";
// import { getDBPool } from "@/lib/db";
// import { RowDataPacket } from "mysql2";

// type VisitorData = {
//   browser: string;
//   visitors: number;
// };

// type VisitorRow = VisitorData & RowDataPacket;

// export async function GET() {
//   try {
//     const pool = await getDBPool();

//     const [rows] = await pool.query<VisitorRow[]>(
//       `SELECT browser, SUM(visitors) AS visitors FROM visit_logs GROUP BY browser`
//     );

//     return NextResponse.json(rows);
//   } catch (error) {
//     console.error("Error fetching visitor data:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";

type TotalVisitorsRow = {
  totalVisitors: number;
} & RowDataPacket;

export async function GET() {
  try {
    const pool = await getDBPool();

    const [rows] = await pool.query<TotalVisitorsRow[]>(
      `SELECT SUM(visitors) AS totalVisitors FROM visit_logs`
    );

    // Return just the number, or an object with the number
    const totalVisitors = rows[0]?.totalVisitors || 0;

    return NextResponse.json({ visitors: totalVisitors });
  } catch (error) {
    console.error("Error fetching total visitor count:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
