import { NextResponse } from "next/server";
import { isIPv4, isIPv6 } from "node:net";
import { getDBPool } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

function getClientIP(request: Request): string {
    const xForwardedFor = request.headers.get("x-forwarded-for");
    if (xForwardedFor) {
        return xForwardedFor.split(",")[0].trim();
    }

    const realIp = request.headers.get("x-real-ip");
    if (realIp) {
        return realIp;
    }

    const cfIp = request.headers.get("cf-connecting-ip");
    if (cfIp) {
        return cfIp;
    }

    return "127.0.0.1";
}

/** Store IPv6 form: native IPv6 as-is, IPv4 as IPv4-mapped (::ffff:a.b.c.d). */
function toStoredIpv6(ip: string): string | null {
    const s = ip.trim();
    if (!s) return null;
    if (isIPv6(s)) return s;
    if (isIPv4(s)) return `::ffff:${s}`;
    return null;
}

export async function POST(request: Request) {
    try {
        const { message } = await request.json();

        const ip = toStoredIpv6(getClientIP(request));
        if (!ip) {
            return NextResponse.json({ message: "Invalid Host Request" }, { status: 400 });
        }

        const { user_message, bot_reply, user_id } = message;

        if (!user_message || !bot_reply || !user_id) {
            return NextResponse.json({ message: "Invalid Message Request" }, { status: 400 });
        }

        const db = getDBPool();

        // Check user
        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT * FROM chatbot_users WHERE user_id = ?",
            [user_id]
        );

        let userId: number;

        if (rows.length === 0) {
            // Create user
            const [result] = await db.query<ResultSetHeader>(
                "INSERT INTO chatbot_users (user_id) VALUES (?)",
                [user_id]
            );
            userId = result.insertId;
        } else {
            userId = rows[0].id;
        }

        await db.query(
            "INSERT INTO user_chatting_history (user_message, bot_reply, user_id) VALUES (?, ?, ?)",
            [user_message, bot_reply, userId]
        );

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}