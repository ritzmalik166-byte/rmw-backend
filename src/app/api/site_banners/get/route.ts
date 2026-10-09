import { getDBPool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const pool = getDBPool();
        const [rows] = await pool.execute("SELECT * FROM rmw_banners");
        return NextResponse.json({ message: "Site banners fetched successfully", rows }, { status: 200 });
    } catch (error) {
        console.log("Error in site banners get", error);
        return NextResponse.json({ message: "Error in site banners get", error }, { status: 500 });
    }
}