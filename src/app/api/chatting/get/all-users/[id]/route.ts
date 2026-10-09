// Here This Will Send The All The Chatting History Of The User With The Given ID
import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import redisClient from "@/lib/redis_server";
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const db = getDBPool();
        const cached_chatting_history = await redisClient.get(`cached_chatting_history_${id}`);
        if (cached_chatting_history) {
            return NextResponse.json({ chatting_history: JSON.parse(cached_chatting_history) }, { status: 200 });
        }
        const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM user_chatting_history WHERE user_id = ? ORDER BY id DESC", [id]);
        if (rows.length > 0) {
            await redisClient.set(`cached_chatting_history_${id}`, JSON.stringify(rows), { EX: 60 * 2 });
        }
        if (rows.length === 0) {
            return NextResponse.json({ message: "No data found" }, { status: 404 });
        }
        return NextResponse.json({ chatting_history: rows }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}