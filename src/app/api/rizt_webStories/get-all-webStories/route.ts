import { connectMongoDB } from "@/lib/mongo/dbConntect";
import TopicModel from "@/models/Story.Topic";
import WebStoryModel from "@/models/WebStory.Schema";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectMongoDB();
    const allTopics = await TopicModel.find();
    const allPages = await WebStoryModel.find();
    if (!allTopics || allTopics.length === 0) {
      return NextResponse.json(
        { message: "Topics Are Not Available Right Now!", success: false },
        { status: 404 }
      );
    }
    // if (!allPages || allPages.length === 0) {
    //   return NextResponse.json(
    //     { message: "Pages Are Not Available Right Now!", success: false },
    //     { status: 404 }
    //   );
    // }
    // console.log(allTopics, allPages);

    const webStories = allTopics.map((topic) => {
      const relatedPages = allPages.filter(
        (page) => page.topic.toString() === topic._id.toString()
      );
      return {
        ...topic,
        storyPages: relatedPages,
      };
    });
    return NextResponse.json(
      {
        message: "All Web Story Pages Fetched Successfully",
        success: true,
        webStories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      "There are some errors in your get all web stories controller plz fix the bug first",
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