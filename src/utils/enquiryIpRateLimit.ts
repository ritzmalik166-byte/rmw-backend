import { connectMongoDB } from "@/lib/mongo/dbConntect";
import IpRateLimiting from "@/models/IpRateLimiting";
import { NextRequest, NextResponse } from "next/server";

export const ENQUIRY_DAILY_IP_LIMIT = 4;

export const ENQUIRY_IP_LIMIT_MESSAGE =
  "Daily limit reached. You can submit up to 4 enquiries per IP address per day. Please try again tomorrow.";

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

function isSameUtcDay(a: Date, b: Date): boolean {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

export type EnquiryIpRateLimitResult =
  | { allowed: true; count: number; remaining: number }
  | { allowed: false; count: number; remaining: 0; error: string };

/**
 * Checks/increments the per-IP daily enquiry counter.
 * Returns allowed:false when the IP has already used 4 submissions today.
 */
export async function checkAndIncrementEnquiryIpLimit(
  clientIp: string
): Promise<EnquiryIpRateLimitResult> {
  if (!clientIp || clientIp === "unknown") {
    // Still track unknown IPs under a shared bucket to avoid bypass
    clientIp = "unknown";
  }

  await connectMongoDB();
  const now = new Date();

  let record = await IpRateLimiting.findOne({ ip: clientIp });

  if (!record) {
    record = await IpRateLimiting.create({
      ip: clientIp,
      count: 1,
      lastAccess: now,
    });
    return {
      allowed: true,
      count: 1,
      remaining: ENQUIRY_DAILY_IP_LIMIT - 1,
    };
  }

  const lastAccess = record.lastAccess
    ? new Date(record.lastAccess)
    : new Date(0);
  const isToday = isSameUtcDay(lastAccess, now);

  if (!isToday) {
    record.count = 1;
    record.lastAccess = now;
    await record.save();
    return {
      allowed: true,
      count: 1,
      remaining: ENQUIRY_DAILY_IP_LIMIT - 1,
    };
  }

  if (record.count >= ENQUIRY_DAILY_IP_LIMIT) {
    return {
      allowed: false,
      count: record.count,
      remaining: 0,
      error: ENQUIRY_IP_LIMIT_MESSAGE,
    };
  }

  record.count += 1;
  record.lastAccess = now;
  await record.save();

  return {
    allowed: true,
    count: record.count,
    remaining: Math.max(0, ENQUIRY_DAILY_IP_LIMIT - record.count),
  };
}

export function enquiryIpLimitExceededResponse(error = ENQUIRY_IP_LIMIT_MESSAGE) {
  return NextResponse.json(
    { success: false, error },
    { status: 429 }
  );
}
