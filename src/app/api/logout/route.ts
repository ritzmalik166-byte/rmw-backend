import { NextResponse } from "next/server";

const COOKIE_NAME = "auth_token"; // The name of the cookie storing JWT

export async function POST() {
  try {
    // Clear the authentication cookie
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0), // Immediately expire the cookie
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
