import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";


export async function GET(req: NextRequest) {
    const link = req.nextUrl.searchParams.get("link")?.trim();
    if (!link) {
        return NextResponse.json(
            { error: "Query parameter `link` is required" },
            { status: 400 },
        );
    }
    
    try {
        const db = getDBPool();
        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT * FROM service_second WHERE link = ? LIMIT 1",
            [link],
        );
        // console.log("rows", rows);  
        if (!rows.length) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        const row = rows[0];
        return NextResponse.json(
            {
                meta_title: row.meta_title ?? null,
                meta_description: row.meta_description ?? null,
                meta_keywords: row.meta_keywords ?? null,
                link: row.link ?? null,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error("GET /api/service-second/meta:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
