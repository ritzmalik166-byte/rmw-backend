import { connectMongoDB } from "@/lib/mongo/dbConntect";
import WebStoryModel from "@/models/WebStory.Schema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import ManagementModel from "@/models/Management";
import ManagementActivitiesModel from "@/models/ManagementActivities";
export async function DELETE(
  req: NextRequest,
  { params }: { params: { pageId: string } }
) {
  try {
    await connectMongoDB();
    // Only super_admin and editor Can Delete A Web Story Page 
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Token is required" }, { status: 400 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string | undefined };
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (decoded.role !== "super_admin" && decoded.role !== "editor" && decoded.role !== undefined) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const actor = await ManagementModel.findById(decoded.id as string);
    if (!actor || !actor.isActive) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const pageId = await params.pageId;
    if (!pageId) {
      return NextResponse.json(
        { message: "Page Id Is Required!", success: false },
        { status: 404 }
      );
    }
    const deletedStoryPage = await WebStoryModel.findByIdAndDelete(pageId);
    // Create A New Management Activity
    const newManagementActivity = new ManagementActivitiesModel({ managementId: actor._id, activity: `User ${actor.name} (${actor.email}) deleted a web story page: ${pageId}`, activityTime: new Date() });
    await newManagementActivity.save();

    if (!deletedStoryPage) {
      return NextResponse.json(
        {
          message:
            "Due To Internal Server We Could't Delete Your Web Story Page, Please Try Again Letter!",
          success: false,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        message: "Web Story Page Has Been Deleted Successfully!",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      "There are some errors in your delete web story page controller plz fix the bug first ",
      error
    );
    return NextResponse.json(
      { message: "Internal Server Errors!", success: false },
      {
        status: 500,
      }
    );
  }
}
