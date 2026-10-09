import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        if(!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }
        const pool = getDBPool();
        const [rows] = await pool.execute("SELECT * FROM rmw_banners WHERE id = ?", [id]) as any[];
        const existingBanner = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        if(!existingBanner) {
            return NextResponse.json({ error: "Site banner not found" }, { status: 404 });
        }
        // If The banner is unactive so active and if active so inactive
        const result = await pool.execute("UPDATE rmw_banners SET banner_status = ? WHERE id = ?", [existingBanner.status === 1 ? 0 : 1, id]);
        return NextResponse.json({ message: "Site banner status changed successfully", result }, { status: 200 });
    } catch (error) {
        console.error("Error uploading site banner:", error);
        return NextResponse.json({ error: "Failed to upload site banner" }, { status: 500 });
    }
}