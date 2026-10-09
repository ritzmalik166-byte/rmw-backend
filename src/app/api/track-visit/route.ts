import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { UAParser } from "ua-parser-js";
import { RowDataPacket } from "mysql2";

// interface VisitLog extends RowDataPacket {
// url: string;
//   user_id: string;
//   browser: string;
//   visitors: number;
//   last_visited?: Date;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const pool = await getDBPool();
//     const { searchParams } = new URL(req.url);
//     const url = searchParams.get("url");

//     const rawBrowser = req.headers.get("user-agent") || "unknown";
//     const parser = new UAParser(rawBrowser);
//     const parsed = parser.getResult();
//     const browser = parsed.browser.name;

//     if (!url) {
//       return NextResponse.json({ error: "URL is required" }, { status: 400 });
//     }

//     const cookieStore = cookies();
//     let userId = (await cookieStore).get("visitor_id")?.value;
//     let isNewVisitor = false;

//     if (!userId) {
//       userId = uuidv4();
//       isNewVisitor = true;
//     }

//     // ✅ Check if this user has already visited this URL
//     const [rows] = await pool.query<VisitLog[]>(
//       "SELECT * FROM visit_logs WHERE url = ? AND user_id = ?",
//       [url, userId]
//     );

//     if (rows.length > 0) {
//       // ✅ Visitor exists → update visit count and last_visited
//       await pool.execute(
//         `UPDATE visit_logs
//          SET visitors = visitors + 1, last_visited = CURRENT_TIMESTAMP
//          WHERE url = ? AND user_id = ?`,
//         [url, userId]
//       );
//     } else {
//       // ✅ New visitor for this URL → insert row
//       await pool.execute(
//         `INSERT INTO visit_logs (url, user_id, browser, visitors)
//          VALUES (?, ?, ?, 1)`,
//         [url, userId, browser]
//       );
//     }

//     const response = NextResponse.json({
//       success: true,
//       message: isNewVisitor ? "New visitor recorded" : "Visit updated",
//     });

//     // ✅ Set cookie only if new
//     if (isNewVisitor) {
//       response.cookies.set("visitor_id", userId, {
//         httpOnly: true,
//         secure: true,
//         maxAge: 60 * 60 * 24 * 30, // 30 days
//       });
//     }

//     return response;
//   } catch (error) {
//     console.error("Error logging visit:", error);
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

interface VisitLog extends RowDataPacket {
  user_id: string;
  browser: string;
  referer: string;
  visitors: number;
  last_visited?: Date;
}

export async function POST(req: NextRequest) {
  try {
    const pool = await getDBPool();
    const rawBrowser = req.headers.get("user-agent") || "unknown";
    const parser = new UAParser(rawBrowser);
    const parsed = parser.getResult();
    const browser = parsed.browser.name || "unknown";

    const referer = req.headers.get("referer") || "Direct";

    const cookieStore = cookies();
    let userId = (await cookieStore).get("visitor_id")?.value;
    let isNewVisitor = false;

    if (!userId) {
      userId = uuidv4();
      isNewVisitor = true;
    }

    const [rows] = await pool.query<VisitLog[]>(
      "SELECT * FROM visit_logs WHERE user_id = ?",
      [userId]
    );

    if (rows.length === 0) {
      // ✅ New unique visitor
      await pool.execute(
        `INSERT INTO visit_logs (user_id, browser, referer, visitors) 
         VALUES (?, ?, ?, 1)`,
        [userId, browser, referer]
      );
    } else {
      // ✅ Existing user — just update the timestamp (not visitor count)
      await pool.execute(
        `UPDATE visit_logs 
         SET last_visited = CURRENT_TIMESTAMP 
         WHERE user_id = ?`,
        [userId]
      );
    }

    const response = NextResponse.json({
      success: true,
      message: isNewVisitor
        ? "New unique visitor recorded"
        : "Returning user timestamp updated",
    });

    if (isNewVisitor) {
      response.cookies.set("visitor_id", userId, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return response;
  } catch (error) {
    console.error("Error logging visit:", error);
    return NextResponse.json(
      { error: "Failed to log visitor" },
      { status: 500 }
    );
  }
}
