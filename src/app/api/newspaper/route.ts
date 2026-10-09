import { connectMongoDB } from "@/lib/mongo/dbConntect";
import NewsPaperModel from "@/models/NewsPaper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const { filterData, sorting } = await req.json();
    // console.log("This is filter data ", filterData);
    
    const sort = {};
    if (sorting) {
      const sortType = sorting === "asc" ? 1 : -1;
      Object.assign(sort, { price: sortType });
    }
    const newspapersData = await NewsPaperModel.find(filterData).sort(sort);
    
    return NextResponse.json({
      message: "NewsPaper fetched successfully",
      success: true,
      data: newspapersData,
    });
  } catch (error) {
    console.log("Internal Server Error In Getting The NewsPaper", error);
    const errMsg =
      error instanceof Error
        ? error.message
        : "Something went wrong while uploading the newspaper ads.";

    return NextResponse.json(
      {
        message: "Internal Server Error While Uploading The NewsPaper Ads.",
        success: false,
        error: errMsg, // send actual error message safely
      },
      { status: 500 }
    );
  }
}
