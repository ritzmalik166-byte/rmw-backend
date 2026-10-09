import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import ManagementModel from "@/models/Management";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ManagementActivitiesModel from "@/models/ManagementActivities";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }
        const management = await ManagementModel.findOne({ email });
        if (!management) {
            return NextResponse.json({ message: "Management not found" }, { status: 404 });
        }
        const isPasswordValid = await bcrypt.compare(password, management.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }
        const isActive = management.isActive;
        if (!isActive) {
            return NextResponse.json({ message: "User is not active" }, { status: 401 });
        }
        const token = jwt.sign({ id: management._id, email: management.email, role: management.role }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
        // Create A New Management Activity
        const newManagementActivity = new ManagementActivitiesModel({ managementId: management._id, activity: `User ${management.name} (${management.email}) logged in`, activityTime: new Date() });
        await newManagementActivity.save();
        return NextResponse.json({ message: "Login successful", token, user: { email: management.email, name: management.name, role: management.role } }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}