import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const pool = await getDBPool();
        const data =  await req.json();
        const s3para = data.s3para;
        if (!id || !s3para) {
            return NextResponse.json(
              { message: "Invalid request", success: false },
              { status: 400 }
            );
          }
        //   await pool.query("UPDATE services SET s2para = ? WHERE id = ?", [s3para, id]);
        return NextResponse.json({ message: "Service AI data updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating service AI data:", error);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}   