// /api/upload-resume
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import {
  checkAndIncrementEnquiryIpLimit,
  enquiryIpLimitExceededResponse,
  getClientIp,
} from "@/utils/enquiryIpRateLimit";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const clientIp = getClientIp(req);
    const rateLimit = await checkAndIncrementEnquiryIpLimit(clientIp);
    if (!rateLimit.allowed) {
      return enquiryIpLimitExceededResponse(rateLimit.error);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const publicPath = `/uploads/${fileName}`;
    return NextResponse.json({ success: true, filePath: publicPath });
  } catch (error) {
    console.error("Error uploading resume", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}
