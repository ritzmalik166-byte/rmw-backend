import { connectMongoDB } from "@/lib/mongo/dbConntect";
import ACtiveUser from "@/models/ActiveUsersCount";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

 
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    const deletedUser = await ACtiveUser.findOneAndDelete({
      ipAddress: ip,
    });

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found", ip });
    }

    return NextResponse.json({
      message: "User deleted successfully",
      ip,
    });
  } catch (error) {
    console.error("Internal Server Error!", error);
    return NextResponse.json(
      { message: "Internal Server Error!", error },
      { status: 500 }
    );
  }
}
