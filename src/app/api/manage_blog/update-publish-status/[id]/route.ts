import RitzBlogModel from "@/models/Blog.Schema";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();
    console.log("API HIT");
    
    const { id } = await params;

    const current = await RitzBlogModel.findById(id);
    console.log(id, current);
    
    if (!current) {
      return NextResponse.json(
        { message: "Blog Not Found!" },
        { status: 404 }
      );
    }

    if (current.publishStatus !== "draft") {
      return NextResponse.json(
        {
          message: `Cannot publish blog. Current status is "${current.publishStatus}".`,
        },
        { status: 400 }
      );
    }

    current.publishStatus = "published";
    await current.save();

    return NextResponse.json(
      {
        message: "Blog published successfully!",
        data: current,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal Server Error!", error);

    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}