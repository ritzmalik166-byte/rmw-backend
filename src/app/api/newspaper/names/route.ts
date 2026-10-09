import { connectMongoDB } from "@/lib/mongo/dbConntect";
import NewsPaperModel from "@/models/NewsPaper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    // Fetch only paperName and slug fields for better performance
    const newspapers = await NewsPaperModel.find({}, { 
      paperName: 1, 
      slug: 1, 
      language: 1,
      _id: 0 
    }).sort({ paperName: 1 }); // Sort alphabetically by paper name

    return NextResponse.json({
      message: "Newspaper names fetched successfully",
      success: true,
      data: newspapers,
    });
  } catch (error) {
    console.log("Error fetching newspaper names:", error);
    const errMsg =
      error instanceof Error
        ? error.message
        : "Something went wrong while fetching the newspaper names.";

    return NextResponse.json(
      {
        message: "Internal Server Error While Fetching The Newspaper Names.",
        success: false,
        error: errMsg,
      },
      { status: 500 }
    );
  }
}
