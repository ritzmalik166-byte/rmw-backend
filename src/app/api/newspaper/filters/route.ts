import { connectMongoDB } from "@/lib/mongo/dbConntect";
import NewsPaperModel from "@/models/NewsPaper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    // Fetch all newspapers to extract unique filter values
    const newspapers = await NewsPaperModel.find({}, {
      language: 1,
      areaCovered: 1,
      category: 1,
      publications: 1,
      frequency: 1,
      position: 1
    });

    // Extract unique values for each filter
    const locations = [...new Set(newspapers.map(n => n.areaCovered).filter(Boolean))].sort();
    const languages = [...new Set(newspapers.map(n => n.language).filter(Boolean))].sort();
    const categories = [...new Set(newspapers.map(n => n.category).filter(Boolean))].sort();
    const publications = [...new Set(newspapers.map(n => n.publications).filter(Boolean))].sort();
    const frequencies = [...new Set(newspapers.map(n => n.frequency).filter(Boolean))].sort();
    const positions = [...new Set(newspapers.map(n => n.position).filter(Boolean))].sort();

    return NextResponse.json({
      message: "Filter options fetched successfully",
      success: true,
      data: {
        locations,
        languages,
        categories,
        publications,
        frequencies,
        positions
      }
    });
  } catch (error) {
    console.log("Internal Server Error In Getting Filter Options", error);
    const errMsg =
      error instanceof Error
        ? error.message
        : "Something went wrong while fetching filter options.";

    return NextResponse.json(
      {
        message: "Internal Server Error While Fetching Filter Options.",
        success: false,
        error: errMsg,
      },
      { status: 500 }
    );
  }
}
