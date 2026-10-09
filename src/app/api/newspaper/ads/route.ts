import { connectMongoDB } from "@/lib/mongo/dbConntect";
import AdsTypeModel from "@/models/AdsType";
import { NextRequest, NextResponse } from "next/server";

// POST - Fetch All Advertisements with filtering
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const { filterData, sorting, parentID } = await req.json();

    const query: Record<string, unknown> = { ...filterData };

    // Filter by parent newspaper if provided
    if (parentID) {
      query.parentID = parentID;
    }

    let sort: Record<string, 1 | -1> | null = null;
    if (sorting) {
      const sortType = sorting === "asc" ? 1 : -1;
      sort = { baseRate: sortType };
    }

    const advertisements = await AdsTypeModel.find(query)
      .populate("parentID", "paperName language")
      .sort(sort);

    return NextResponse.json({
      message: "Advertisements fetched successfully",
      success: true,
      data: advertisements,
    });
  } catch (error) {
    console.log("Internal Server Error In Getting Advertisements", error);
    const errMsg =
      error instanceof Error
        ? error.message
        : "Something went wrong while fetching advertisements.";

    return NextResponse.json(
      {
        message: "Internal Server Error While Fetching Advertisements.",
        success: false,
        error: errMsg,
      },
      { status: 500 }
    );
  }
}


