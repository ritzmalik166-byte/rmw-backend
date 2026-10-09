import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import ManagementModel from "@/models/Management";
import jwt from "jsonwebtoken";

import ManagementActivitiesModel from "@/models/ManagementActivities";
export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { name, email, password, role, } = await req.json();
        if (!name || !email || !password || !role) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }
        if (role !== "super_admin" && role !== "editor") {
            return NextResponse.json({ message: "Invalid role" }, { status: 400 });
        }


        // Extract Token from headers
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

        const management = await ManagementModel.findById(decoded.id);
        if (!management) {
            return NextResponse.json({ message: "Management not found" }, { status: 404 });
        }
        const managementName = management.name;
        const managementEmail = management.email;
        const existingUser = await ManagementModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "Email already exists" }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const isActive = true;
        const newManagement = new ManagementModel({ name, email, password: hashedPassword, role, isActive });
        await newManagement.save();

        const newManagementActivity = new ManagementActivitiesModel({
            managementId: decoded.id,
            activity: `${managementName} (${managementEmail}) registered ${name} (${email}) as ${role}`,
            activityTime: new Date(),
        });
        await newManagementActivity.save();
        return NextResponse.json({ message: "Management registered successfully" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        await connectMongoDB();
        const { isActive, userId } = await req.json();
        // Extract Token from headers
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ message: "Token is required" }, { status: 400 });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string };
        if (!decoded) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Fetch Management Email and Name Using decoded.id
        const management = await ManagementModel.findById(decoded.id);
        if (!management) {
            return NextResponse.json({ message: "Management not found" }, { status: 404 });
        }
        if (!management.isActive) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const managementEmail = management.email;
        const managementName = management.name;

        // Check Is User Already is Exists Or Not
        const isUserExists = await ManagementModel.findById(userId);
        if (!isUserExists) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        if (decoded.role === "editor" && isUserExists.role === "super_admin") {
            return NextResponse.json({ message: "Editors cannot change super admin accounts" }, { status: 403 });
        }
        if (String(isUserExists._id) === String(decoded.id) && isActive === false) {
            return NextResponse.json({ message: "You cannot deactivate your own account" }, { status: 403 });
        }

        // Update The user Status
        const updatedUser = await ManagementModel.findByIdAndUpdate(userId, { isActive }, { new: true });
        if (!updatedUser) {
            return NextResponse.json({ message: "User status update failed" }, { status: 400 });
        }
        // Create A New Management Activity
        const newManagementActivity = new ManagementActivitiesModel({ managementId: decoded.id, activity: `User ${managementName} (${managementEmail}) status updated to ${isActive ? "active" : "inactive"}`, activityTime: new Date() });
        await newManagementActivity.save();
        return NextResponse.json({ message: "User status updated successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connectMongoDB();
        const { userId } = await req.json();
        // Extract Token from headers
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ message: "Token is required" }, { status: 400 });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string };
        if (!decoded) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        // Fetch Management Email and Name Using decoded.id
        const management = await ManagementModel.findById(decoded.id);
        if (!management) {
            return NextResponse.json({ message: "Management not found" }, { status: 404 });
        }
        if (!management.isActive) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const managementEmail = management.email;
        const managementName = management.name;

        // Check Is User Already is Exists Or Not
        const isUserExists = await ManagementModel.findById(userId);
        if (!isUserExists) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        if (String(isUserExists._id) === String(decoded.id)) {
            return NextResponse.json({ message: "You cannot delete your own account" }, { status: 403 });
        }
        if (decoded.role === "editor" && isUserExists.role === "super_admin") {
            return NextResponse.json({ message: "Editors cannot delete super admin accounts" }, { status: 403 });
        }

        // Delete The user
        await ManagementModel.findByIdAndDelete(userId);
        // Create A New Management Activity
        const newManagementActivity = new ManagementActivitiesModel({ managementId: decoded.id, activity: `User ${managementName} (${managementEmail}) deleted by ${decoded.role}`, activityTime: new Date() });
        await newManagementActivity.save();
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();
        // Extract Token from headers
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ message: "Token is required" }, { status: 400 });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string };
        if (!decoded) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        // Fetch Management Email and Name Using decoded.id
        const management = await ManagementModel.findById(decoded.id);
        if (!management) {
            return NextResponse.json({ message: "Management not found" }, { status: 404 });
        }
        const isActive = management.isActive;
        if (!isActive) {
            return NextResponse.json({ message: "User is not active" }, { status: 401 });
        }
        const managementEmail = management.email;
        const managementName = management.name;
        return NextResponse.json({
            message: "Management fetched successfully",
            user: {
                id: String(management._id),
                email: managementEmail,
                name: managementName,
                role: management.role,
            },
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}