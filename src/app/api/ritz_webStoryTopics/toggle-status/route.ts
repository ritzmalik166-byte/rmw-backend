import { connectMongoDB } from "@/lib/mongo/dbConntect";
import TopicModel from "@/models/Story.Topic";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    await connectMongoDB();
    const { id, status } = await req.json();
    // console.log("These are status and id from toggle state ", id, status);
    
    if (!id) {
      return NextResponse.json(
        {
          message: "Invalid Credentials",
          success: false,
        },
        {
          status: 404,
        }
      );
    }
    const updated = await TopicModel.findByIdAndUpdate(id, {
      isActive: status,
    });
    if (!updated) {
      return NextResponse.json(
        { message: "Topic Status Change Failed!", success: false },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        message: "Topic Status Changed Successfully!",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(
      "Internal Server Errors in Toggle Topic Status Controller ",
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
