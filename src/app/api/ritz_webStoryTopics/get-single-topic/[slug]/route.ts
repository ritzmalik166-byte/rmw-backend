import { connectMongoDB } from "@/lib/mongo/dbConntect";
import TopicModel from "@/models/Story.Topic";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectMongoDB();
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json(
        {
          mesage: "Slug is required to fetch the single StoryTopic",
          success: false,
        },
        {
          status: 500,
        }
      );
    }
    const singleStoryTopic = await TopicModel.findOne({
      slug,
    });
    if (!singleStoryTopic) {
      return NextResponse.json(
        {
          message: "Sorry topic info not found!",
          success: false,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Single Topic Fetched Successfully!",
        success: true,
        singleStoryTopic,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(
      "There are some errors in get single StoryTopic controller plz fix the bug first ",
      error
    );
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