import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import ManagementModel from "@/models/Management";
import TrafficModel from "@/models/Traffic";

/** Path: /api/tracker/get-traffic/<range> */
const RANGE_TO_DAYS: Record<string, number> = {
    last7days: 7,
    last30days: 30,
    last60days: 60,
    last90days: 90,
    last180days: 180,
    last365days: 365,
};


function buildTrafficFilter(rangeKey: string):
    | { ok: true; filter: Record<string, unknown>; label: string }
    | { ok: false; reason: string } {
    const key = rangeKey.trim().toLowerCase();

    if (key === "alltime") {
        return { ok: true, filter: {}, label: key };
    }

    const days = RANGE_TO_DAYS[key];
    if (days === undefined) {
        return {
            ok: false,
            reason:
                "Invalid range. Use: alltime, last7days, last30days, last60days, last90days, last180days, last365days",
        };
    }

    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    return {
        ok: true,
        filter: { createdAt: { $gte: since } },
        label: key,
    };
}

export async function GET(
    _req: NextRequest,
    context: { params: Promise<{ query: string }> }
) {
    try {
        await connectMongoDB();

        const token = _req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 401 });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
                id: string;
                role: string;
            };
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const actor = await ManagementModel.findById(decoded.id);
        if (!actor || !actor.isActive) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { query: rangeSegment } = await context.params;
        const parsed = buildTrafficFilter(rangeSegment || "");

        if (!parsed.ok) {
            return NextResponse.json({ error: parsed.reason }, { status: 400 });
        }

        const traffic = await TrafficModel.find(parsed.filter)
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json(
            {
                success: true,
                range: parsed.label,
                count: traffic.length,
                data: traffic,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in get-traffic API:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
