import { getDBPool } from "@/lib/db";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import EnquiryTrackerModel from "@/models/EnquiryTracker";
import { getEnquiryIpInfo } from "@/utils/enquiryIpInfo";
import {
  checkAndIncrementEnquiryIpLimit,
  enquiryIpLimitExceededResponse,
  getClientIp,
} from "@/utils/enquiryIpRateLimit";
import { validateEnquiryMessage } from "@/utils/enquiryValidation";
import { NextRequest, NextResponse } from "next/server";

// GET /api/enquiries
export async function GET() {
  try {
    const db = getDBPool();
    const [rows] = await db.query(
      "SELECT * FROM enquiries ORDER BY send_date DESC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET Enquiries Error:", error);
    return new NextResponse("Failed to fetch enquiries", { status: 500 });
  }
}

// Utility: convert FormData to plain object
const formDataToObject = (formData: FormData) => {
  const data: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === "string") {
      data[key] = value;
    }
  });
  return data;
};

const WEBSITE_BASE_URL = "https://ritzmediaworld.com";

interface EnquiryData {
  etype?: string;
  name?: string;
  email?: string;
  mobile?: string;
  phone?: string;
  message?: string;
  category?: string;
  resumePath?: string;
}

function formatResumeUrl(resume: string | null): string {
  if (!resume || !resume.trim()) return "—";
  const path = resume.trim().startsWith("/") ? resume.trim() : "/" + resume.trim();
  return WEBSITE_BASE_URL + path;
}

function formatTelegramEnquiry(
  etype: string,
  name: string,
  email: string,
  mobile: string | null,
  message: string,
  category: string | null,
  resume: string | null
): string {
  const lines = [
    "📩 New Enquiry",
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    "📋 Type: " + (etype || "—").trim(),
    "👤 Name: " + (name || "").trim(),
    "📧 Email: " + (email || "").trim(),
    "📞 Mobile: " + (mobile || "—").trim(),
    "📁 Category: " + (category || "—").trim(),
    "📎 Resume: " + formatResumeUrl(resume),
    "",
    "💬 Message:",
    (message || "").trim(),
    "━━━━━━━━━━━━━━━━━━━━",
  ];
  return lines.join("\n");
}

async function saveEnquiryTracker(input: {
  name: string;
  email: string;
  message: string;
  etype: string;
  mobile: string | null;
  clientIp: string;
}) {
  try {
    const ipInfo = await getEnquiryIpInfo(input.clientIp);
    await connectMongoDB();
    await EnquiryTrackerModel.create({
      name: input.name,
      email: input.email,
      message: input.message,
      etype: input.etype,
      mobile: input.mobile,
      ...ipInfo,
    });
  } catch (trackerError) {
    console.error("EnquiryTracker save failed:", trackerError);
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = getDBPool();
    let data: EnquiryData = {};
    const contentType = request.headers.get("content-type");

    if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();
      data = formDataToObject(formData);
    } else if (contentType?.includes("application/json")) {
      data = await request.json();
    } else {
      return NextResponse.json(
        { success: false, error: "Unsupported Content-Type" },
        { status: 400 }
      );
    }

    // Extract and normalize fields
    const etype = data.etype || "contact";
    const name = data.name || null;
    const email = data.email || null;
    const mobile = data.mobile || data.phone || null;
    const message = data.message || null;
    const category = data.category || null;
    const resume = data.resumePath || null;
    const clientIp = getClientIp(request);

    // Validate required fields
    if (!etype || !name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const validation = validateEnquiryMessage(message);
    if (!validation.ok) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const rateLimit = await checkAndIncrementEnquiryIpLimit(clientIp);
    if (!rateLimit.allowed) {
      return enquiryIpLimitExceededResponse(rateLimit.error);
    }

    // Save + notify for all enquiries (vulgar or genuine)
    await db.query(
      `INSERT INTO enquiries (etype, name, email, mobile, message, category, resume)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [etype, name, email, mobile, message, category, resume]
    );

    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    if (telegramBotToken && telegramChatId) {
      const text = formatTelegramEnquiry(etype, name, email, mobile, message, category, resume);
      const response = await fetch(
        `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: telegramChatId, text }),
        }
      );
      const telegramData = await response.json();
      if (!telegramData.ok) console.error("Telegram send failed:", telegramData);
    }

    // Track every enquiry (vulgar or genuine)
    await saveEnquiryTracker({
      name,
      email,
      message,
      etype,
      mobile,
      clientIp,
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully.",
    });
  } catch (error) {
    console.error("Error handling enquiry:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
