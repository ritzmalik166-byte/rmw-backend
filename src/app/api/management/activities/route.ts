import { connectMongoDB } from "@/lib/mongo/dbConntect";
import ManagementActivitiesModel from "@/models/ManagementActivities";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export async function GET(req: NextRequest) {
    try {
        await connectMongoDB(); 
        // Only Super Admin Can Use This 
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ message: "Token is required" }, { status: 400 });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string };
        if (!decoded) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        if (decoded.role !== "super_admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const activities = await ManagementActivitiesModel.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ activities }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}           