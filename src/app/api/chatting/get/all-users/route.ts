import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import redisClient from "@/lib/redis_server";
export async function GET(request: Request) {
    try {
        const db = getDBPool();
        const cached_chatbot_users = await redisClient.get("cached_chatbot_users");
        if (cached_chatbot_users) {
            return NextResponse.json({ chatbot_users: JSON.parse(cached_chatbot_users) }, { status: 200 });
        }
        const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM chatbot_users ORDER BY id DESC");
        if (rows.length > 0) {
            await redisClient.set("cached_chatbot_users", JSON.stringify(rows), { EX: 60 * 2 });
        }
        return NextResponse.json({ chatbot_users: rows }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}   