import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import redisClient from "@/lib/redis_server";

export async function GET(request: Request) {
    try {
        const db = getDBPool();
        const cached_bot_chats = await redisClient.get("cached_bot_chats");
        const cached_chats_users = await redisClient.get("cached_chats_users");

        if (cached_bot_chats && cached_chats_users) {
            return NextResponse.json({ bot_chats: JSON.parse(cached_bot_chats), chats_users: JSON.parse(cached_chats_users) }, { status: 200 });
        }

        const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM user_chatting_history");
        const [userRows] = await db.query<RowDataPacket[]>("SELECT * FROM chatbot_users");

        if (rows.length > 0) {
            await redisClient.set("cached_bot_chats", JSON.stringify(rows), { EX: 60 * 2 }); 
        }
        if (userRows.length > 0) {
            await redisClient.set("cached_chats_users", JSON.stringify(userRows), { EX: 60 * 2 }); 
        }
        return NextResponse.json({ bot_chats: rows, chats_users: userRows }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}