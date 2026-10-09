import { connectMongoDB } from "@/lib/mongo/dbConntect";
import ManagementModel from "@/models/Management";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import ManagementActivitiesModel from "@/models/ManagementActivities";

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();
        // Check Is User Is Editor Or Super Admin
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ message: "Token is required" }, { status: 400 });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string };
        if (!decoded) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        if (decoded.role !== "super_admin" && decoded.role !== "editor") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const actor = await ManagementModel.findById(decoded.id);
        if (!actor || !actor.isActive) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        // Super admins see everyone (so they can change passwords / manage other super admins).
        // Editors only see non–super-admin accounts, excluding themselves.
        const filter =
            decoded.role === "super_admin"
                ? {}
                : {
                      _id: { $ne: decoded.id },
                      role: { $ne: "super_admin" },
                  };
        const management = await ManagementModel.find(filter)
            .select("-password")
            .sort({ createdAt: -1 });

        // Full activity history only for super_admin; editors use team list + PATCH/DELETE only
        const activities =
            decoded.role === "super_admin"
                ? await ManagementActivitiesModel.find({}).sort({ createdAt: -1 })
                : [];
        return NextResponse.json({ message: "Management fetched successfully", management, activities }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}