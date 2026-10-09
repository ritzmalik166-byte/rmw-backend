import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";

function formatTelegramEnquiry(name: string, phone: string, email: string, service: string, query: string): string {
  return [
    "📩 New Contact Enquiry",
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    "👤 Name: " + name.trim(),
    "📞 Phone: " + phone.trim(),
    "📧 Email: " + email.trim(),
    "📋 Service: " + service.trim(),
    "",
    "💬 Message:",
    query.trim(),
    "━━━━━━━━━━━━━━━━━━━━",
  ].join("\n");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, query } = body;

    if (!name || !phone || !email || !service || !query) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const pool = getDBPool();

    await pool.execute(
      "INSERT INTO contactQueries (name, phone, email, service, query) VALUES (?, ?, ?, ?, ?)",
      [name, phone, email, service, query]
    );

    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramBotToken && telegramChatId) {
      const text = formatTelegramEnquiry(name, phone, email, service, query);
      const response = await fetch(
        `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text,
          }),
        }
      );
      const data = await response.json();
      if (!data.ok) {
        console.error("Telegram send failed:", data);
      }
    }

    return NextResponse.json({ message: "Query submitted successfully" });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
