import { connectMongoDB } from "@/lib/mongo/dbConntect";
import TopicModel from "@/models/Story.Topic";
import WebStoryModel from "@/models/WebStory.Schema";
import {  NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import ManagementModel from "@/models/Management";
import ManagementActivitiesModel from "@/models/ManagementActivities";

export async function DELETE(  req: NextRequest, { params }: { params: { topicID: string } }) {
  try {
    await connectMongoDB();
    const { topicID } = params;
    // const topicID = await params.topicID;
    // Only super_admin and editor Can Delete A Web Story Topic 
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
    if (!topicID) {
      return NextResponse.json(
        { message: "Topic Id Is Missing!", success: false },
        {
          status: 404,
        }
      );
    }
    const deletedTopic = await TopicModel.findByIdAndDelete(topicID);
    console.log("This is deleted topic ", deletedTopic);
    
    if (!deletedTopic) {
      return NextResponse.json(
        { message: "Internal Server Errros!", success: false },
        { status: 500 }
      );
    }
    const topicPages = await WebStoryModel.find({ topic: topicID });
    if (topicPages && topicPages.length > 0) {
      await Promise.all(
        topicPages.map((page) => WebStoryModel.findByIdAndDelete(page._id))
      );
    }
    // Create A New Management Activity
    const newManagementActivity = new ManagementActivitiesModel({ managementId: actor._id, activity: `User ${actor.name} (${actor.email}) deleted a web story topic: ${deletedTopic.topicTitle}`, activityTime: new Date() });
    await newManagementActivity.save();
    return NextResponse.json(
      { message: "Topic Deleted Sucessfully!", success: false },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      "There are some errors in your delete web story controller plz fix all the bugs first!",
      error
    );
    return NextResponse.json(
      { message: "Internal Server Errors !", success: false },
      {
        status: 500,
      }
    );
  }
}
