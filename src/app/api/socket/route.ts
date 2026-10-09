import { connectMongoDB } from "@/lib/mongo/dbConntect";
import ACtiveUser from "@/models/ActiveUsersCount";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

  await ACtiveUser.create({ ipAddress: ip });

  return NextResponse.json({ message: "Active User!" });
}


export async function GET() {
  try {
    await connectMongoDB();

    const activeUsers = await ACtiveUser.find({
      createdAt: { $gte: new Date(Date.now() - 2 * 60 * 1000) },
    });
    
    // Get unique IPs for accurate count
    const uniqueIPs = [...new Set(activeUsers.map(user => user.ipAddress))];
    
    return NextResponse.json({ count: uniqueIPs });
  } catch (error) {
    console.error("Internal Server Error!", error);
    return NextResponse.json(
      { message: "Internal Server Error!", error },
      { status: 500 }
    );
  }
}
