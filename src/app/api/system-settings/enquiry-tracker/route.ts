import { connectMongoDB } from "@/lib/mongo/dbConntect";
import EnquiryTrackerModel from "@/models/EnquiryTracker";
import { FilterQuery } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildFilter(searchParams: URLSearchParams): FilterQuery<Record<string, unknown>> {
  const filter: FilterQuery<Record<string, unknown>> = {};

  const exactFields = [
    "etype",
    "country",
    "state",
    "city",
    "connectionType",
    "isp",
    "organisation",
    "timezone",
  ] as const;

  for (const field of exactFields) {
    const value = searchParams.get(field)?.trim();
    if (value) {
      filter[field] = { $regex: `^${escapeRegex(value)}$`, $options: "i" };
    }
  }

  const ip = searchParams.get("ip")?.trim();
  if (ip) {
    filter.$or = [
      { ip: { $regex: escapeRegex(ip), $options: "i" } },
      { ipv4: { $regex: escapeRegex(ip), $options: "i" } },
      { ipv6: { $regex: escapeRegex(ip), $options: "i" } },
    ];
  }

  const q = searchParams.get("q")?.trim();
  if (q) {
    const regex = { $regex: escapeRegex(q), $options: "i" };
    filter.$and = [
      ...(Array.isArray(filter.$and) ? filter.$and : []),
      {
        $or: [
          { name: regex },
          { email: regex },
          { message: regex },
          { mobile: regex },
          { ip: regex },
          { ipv4: regex },
          { ipv6: regex },
          { country: regex },
          { state: regex },
          { city: regex },
          { isp: regex },
          { organisation: regex },
          { asn: regex },
          { timezone: regex },
          { connectionType: regex },
          { etype: regex },
        ],
      },
    ];
  }

  const from = searchParams.get("from")?.trim();
  const to = searchParams.get("to")?.trim();
  if (from || to) {
    const createdAt: { $gte?: Date; $lte?: Date } = {};
    if (from) {
      const fromDate = new Date(from);
      if (!Number.isNaN(fromDate.getTime())) createdAt.$gte = fromDate;
    }
    if (to) {
      const toDate = new Date(to);
      if (!Number.isNaN(toDate.getTime())) {
        toDate.setHours(23, 59, 59, 999);
        createdAt.$lte = toDate;
      }
    }
    if (createdAt.$gte || createdAt.$lte) {
      filter.createdAt = createdAt;
    }
  }

  return filter;
}

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();

    const { searchParams } = request.nextUrl;
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") || 20)));
    const skip = (page - 1) * limit;

    const filter = buildFilter(searchParams);

    const [items, total, connectionStats] = await Promise.all([
      EnquiryTrackerModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      EnquiryTrackerModel.countDocuments(filter),
      EnquiryTrackerModel.aggregate([
        { $match: filter },
        { $group: { _id: "$connectionType", count: { $sum: 1 } } },
      ]),
    ]);

    const connectionTypeCounts = connectionStats.reduce(
      (acc: Record<string, number>, row: { _id: string | null; count: number }) => {
        const key = row._id || "unknown";
        acc[key] = row.count;
        return acc;
      },
      {} as Record<string, number>
    );

    return NextResponse.json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
      stats: {
        total,
        connectionTypeCounts,
      },
    });
  } catch (error) {
    console.error("GET EnquiryTracker Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch enquiry tracker data" },
      { status: 500 }
    );
  }
}
