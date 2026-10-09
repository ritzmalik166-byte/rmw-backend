import { connectMongoDB } from "@/lib/mongo/dbConntect";
import WebStoryModel from "@/models/WebStory.Schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { topicID: string } }
) {
  try {
    await connectMongoDB();
    const id = await params.topicID;
    if (!id) {
      return NextResponse.json(
        {
          message: "ID is required to fetch the blog!",
          success: false,
        },
        {
          status: 500,
        }
      );
    }
    const singleStoryPage = await WebStoryModel.findById(id);
    if (!singleStoryPage) {
      return NextResponse.json(
        {
          message: "Sorry Story Page Not Found!",
          success: false,
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Single Page Fetched Successfully!",
        success: false,
        singleStoryPage
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(
      "There are some errors in your get single page controller plz fix all the bugs ",
      error
    );
    return NextResponse.json(
      { message: "Internal Server Error!", success: false },
      { status: 500 }
    );
  }
}
