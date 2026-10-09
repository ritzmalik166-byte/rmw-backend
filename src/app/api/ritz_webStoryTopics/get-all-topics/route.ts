import { connectMongoDB } from "@/lib/mongo/dbConntect";
import TopicModel from "@/models/Story.Topic";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const allTopics = await TopicModel.find({});
    if (!allTopics || allTopics.length === 0) {
      return NextResponse.json(
        { message: "Topics Are Not Available Right", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "All Topics Has Been Fetched Successfully!", sucess: true, allTopics },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(
      "Internal Server Errors in Get All Topics Controller Plz Fix All The Bufs First ",
      error
    );
    return NextResponse.json(
      {
        message: "Internal Server Error!",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
