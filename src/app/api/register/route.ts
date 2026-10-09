import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = "auth_token"; // Cookie name

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value; // Read JWT from cookie
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: Admin access required" },
        { status: 401 }
      );
    }

    // ✅ Verify JWT Token
    const decoded = jwt.verify(token, JWT_SECRET as string) as {
      id: number;
      email: string;
      role: string;
    };

    // ✅ Only allow admins to register new users
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: Only admins can register users" },
        { status: 403 }
      );
    }

    // ✅ Get user details from request
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ Validate role (Only "admin" or "user" allowed)
    if (role !== "admin" && role !== "user") {
      return NextResponse.json(
        { message: "Invalid role: Must be 'admin' or 'user'" },
        { status: 400 }
      );
    }

    const db = getDBPool();

    // ✅ Check if the email is already taken
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    
    if (rows.length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Insert new user into database
    await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
