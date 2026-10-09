import { connectMongoDB } from "@/lib/mongo/dbConntect";
import WebStoryModel from "@/models/WebStory.Schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const allPages = await WebStoryModel.find();
    if (allPages.length < 1) {
      return NextResponse.json(
        {
          message: "There are no story pages posted till now!",
          success: false,
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        message: "All pages has been fetched successfully!",
        success: true,
        allPages
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Internal Server Errors In get pages for manage ", error);
    return NextResponse.json(
      {
        message: "Internal Server Errors!",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
