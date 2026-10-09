import saveFilesIntoDataBase from "@/lib/fileHandler";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import TopicModel from "@/models/Story.Topic";
import WebStoryModel from "@/models/WebStory.Schema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import ManagementModel from "@/models/Management";
import ManagementActivitiesModel from "@/models/ManagementActivities";
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    // Only super_admin and editor Can Add A Web Story 
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
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const titleAlign = formData.get("titleAlign");
    const buttonCTA = formData.get("buttonCTA");
    const descAlign = formData.get("descAlign");
    const img = formData.get("img"); // File object
    const metaDescription = formData.get("metaDescription");
    const metaKeyWords = formData.get("metaKeyWords");
    // const categoryId = formData.get("categoryId");
    const topicID = formData.get("topicID");

    if (!img || !(img instanceof File)) {
      console.log("❌ img is missing or not a valid file");
      return NextResponse.json(
        {
          message: "❌ img is missing or not a valid file",
          success: false,
        },
        {
          status: 404,
        }
      );
    }
   

    if (
      !metaDescription ||
      !metaKeyWords ||
      !topicID
    ) {
      return NextResponse.json(
        { message: "All fields are required!", success: false },
        { status: 404 }
      );
    }
    const imgPath = await saveFilesIntoDataBase(img, img.name);
    const btnCTA = JSON.parse(buttonCTA as string);
    const storyPage = await WebStoryModel.create({
      title,
      description,
      titleAlign,
      buttonCTA:btnCTA,
      descAlign,
      img: imgPath,
      metaDescription,
      metaKeyWords,
      topic: topicID,
    });
    if (!storyPage) {
      return NextResponse.json(
        { message: "Internal Server Error!", success: false },
        { status: 500 }
      );
    }
    await TopicModel.findByIdAndUpdate(topicID, {
      $inc: { pages: +1 },
    });
    // Create A New Management Activity
    const newManagementActivity = new ManagementActivitiesModel({ managementId: actor._id, activity: `User ${actor.name} (${actor.email}) added a new web story: ${title}`, activityTime: new Date() });
    await newManagementActivity.save();

    return NextResponse.json(
      { message: "Story Page Addedd Successfully.", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log(
      "There are some errors in you add web story controller plz fix the bug first ",
      error
    );
    return NextResponse.json(
      { message: "Internal Server Error.", success: false },
      { status: 500 }
    );
  }
}
