import { connectMongoDB } from "@/lib/mongo/dbConntect";
import NewsPaperModel from "@/models/NewsPaper";
import AdsTypeModel from "@/models/AdsType";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectMongoDB();

    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json(
        {
          message: "Slug parameter is required",
          success: false,
        },
        { status: 400 }
      );
    }

    // First, find the newspaper by slug to get its ID
    const newspaper = await NewsPaperModel.findOne({ slug });
    
    if (!newspaper) {
      return NextResponse.json(
        {
          message: "Newspaper not found",
          success: false,
        },
        { status: 404 }
      );
    }

    // Find all advertisements for this newspaper
    const advertisements = await AdsTypeModel.find({ parentID: newspaper._id })
      .sort({ category: 1, baseRate: 1 }); // Sort by category first, then by price

    return NextResponse.json({
      message: "Newspaper and advertisements fetched successfully",
      success: true,
      data: {
        newspaper,
        advertisements,
      },
    });
  } catch (error) {
    console.log("Error fetching newspaper and advertisements:", error);
    const errMsg =
      error instanceof Error
        ? error.message
        : "Something went wrong while fetching the newspaper data.";

    return NextResponse.json(
      {
        message: "Internal Server Error While Fetching The Newspaper Data.",
        success: false,
        error: errMsg,
      },
      { status: 500 }
    );
  }
}
