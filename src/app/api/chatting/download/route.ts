import { RowDataPacket } from "mysql2";
import { getDBPool } from "@/lib/db";
import { NextResponse } from "next/server";
import redisClient from "@/lib/redis_server";
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");
        if (!startDate || !endDate) {
            return NextResponse.json({ message: "Start and end date are required" }, { status: 400 });
        }
        const cached_filter_chatting_history = await redisClient.get(`cached_filter_chatting_history_${startDate}_${endDate}`);
        const cached_filter_chatbot_users = await redisClient.get(`cached_filter_chatbot_users_${startDate}_${endDate}`);

        if (cached_filter_chatting_history && cached_filter_chatbot_users) {
            return NextResponse.json({ chatting_history: JSON.parse(cached_filter_chatting_history), chatbot_users: JSON.parse(cached_filter_chatbot_users) }, { status: 200 });
        }

        const db = getDBPool();
        const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM user_chatting_history WHERE chat_timing BETWEEN ? AND ? ORDER BY chat_timing DESC", [startDate, endDate]);
        const [userRows] = await db.query<RowDataPacket[]>("SELECT * FROM chatbot_users WHERE created_at BETWEEN ? AND ? ORDER BY created_at DESC", [startDate, endDate]);

        if (rows.length > 0) {
            await redisClient.set(`cached_filter_chatting_history_${startDate}_${endDate}`, JSON.stringify(rows), { EX: 60 * 10 });
        }
        if (userRows.length > 0) {
            await redisClient.set(`cached_filter_chatbot_users_${startDate}_${endDate}`, JSON.stringify(userRows), { EX: 60 * 10 });
        }
        if (rows.length === 0) {
            return NextResponse.json({ message: "No data found" }, { status: 404 });
        }
        return NextResponse.json({ chatting_history: rows, chatbot_users: userRows }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}