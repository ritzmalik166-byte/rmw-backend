import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
      const pool = await getDBPool();
      const allData = await pool.query("SELECT * from services");
      return NextResponse.json({ message: "Service AI data updated successfully", data: allData }, { status: 200 });
    } catch (error) {
        console.error("Error updating service AI data:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}