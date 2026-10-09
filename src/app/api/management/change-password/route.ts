import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import ManagementModel from "@/models/Management";
import ManagementActivitiesModel from "@/models/ManagementActivities";
import jwt from "jsonwebtoken";

function validateManagementPassword(password: string): string | null {
  const missing: string[] = [];
  if (password.length < 8) missing.push("at least 8 characters");
  if (!/[A-Z]/.test(password)) missing.push("an uppercase letter");
  if (!/[a-z]/.test(password)) missing.push("a lowercase letter");
  if (!/[0-9]/.test(password)) missing.push("a number");
  if (!/[^A-Za-z0-9]/.test(password)) missing.push("a special character");
  if (missing.length === 0) return null;
  return `Password must include ${missing.join(", ")}.`;
}

export async function PATCH(req: NextRequest) {
  try {
    await connectMongoDB();
    const { userId, password } = await req.json();

    if (!userId || !password) {
      return NextResponse.json(
        { message: "User ID and password are required" },
        { status: 400 }
      );
    }

    const policyError = validateManagementPassword(password);
    if (policyError) {
      return NextResponse.json({ message: policyError }, { status: 400 });
    }

    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Token is required" }, { status: 400 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      role: string;
    };
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (decoded.role !== "super_admin") {
      return NextResponse.json(
        { message: "Only super admins can change passwords" },
        { status: 403 }
      );
    }

    const actor = await ManagementModel.findById(decoded.id);
    if (!actor || !actor.isActive) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const target = await ManagementModel.findById(userId);
    if (!target) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    target.password = hashedPassword;
    await target.save();

    await ManagementActivitiesModel.create({
      managementId: actor._id,
      activity: `${actor.name} (${actor.email}) changed password for ${target.name} (${target.email})`,
      activityTime: new Date(),
    });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
