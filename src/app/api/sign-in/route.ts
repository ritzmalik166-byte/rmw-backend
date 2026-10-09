import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDBPool } from "@/lib/db"; // Your MySQL pool connection
import { RowDataPacket } from "mysql2";

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = "auth_token"; // Cookie name

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const db = getDBPool();
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    
    if (rows.length === 0) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    
    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET as string, { expiresIn: "7d" });

    // ✅ Store token in HTTP-only secure cookie
    const response = NextResponse.json({ message: "Login successful", user: { email: user.email} });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "strict", // CSRF protection
      path: "/", // Available on all routes
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
