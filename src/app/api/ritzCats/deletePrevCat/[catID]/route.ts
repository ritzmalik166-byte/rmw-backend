import { connectMongoDB } from "@/lib/mongo/dbConntect";
import ManagementModel from "@/models/Management";
import RitzCats from "@/models/RitzCats.Schema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import ManagementActivitiesModel from "@/models/ManagementActivities";

export async function DELETE(request: NextRequest,
    { params }: { params: { catID: string } }) {
    try {
        await connectMongoDB();
        // Only super_admin and editor Can Delete A Category 
        const token = request.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ message: "Token is required" }, { status: 400 });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string | undefined };
        if (!decoded) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        if (decoded.role !== "super_admin" && decoded.role !== "editor" && decoded.role !== undefined) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const actor = await ManagementModel.findById(decoded.id as string);
        if (!actor || !actor.isActive) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const catID = params.catID;
        if (!catID) {
            return NextResponse.json({
                message: "Category Id Not Found, Please Try Again !",
                success: false,
            }, {
                status: 404,
            });
        }
        await RitzCats.findByIdAndDelete(catID);
        // Create A New Management Activity
        const newManagementActivity = new ManagementActivitiesModel({ managementId: actor._id, activity: `User ${actor.name} (${actor.email}) deleted a category: ${catID}`, activityTime: new Date() });
        await newManagementActivity.save();
        return NextResponse.json({
            message: "Category Deleted Successfully!",
            // Create A New Management Activity
            success: true,
        }, {
            status: 200,
        })
    } catch (error) {
        // console.log('====================================');
        console.log("There are some error in your delete single category controller plz fix the bug first ", error);
        // console.log('====================================');
        return NextResponse.json({
            message: "Internal Server Error",
            success: false,
        }, {
            status: 500,
        })
    }
}