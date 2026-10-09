import { connectMongoDB } from "@/lib/mongo/dbConntect";
import TopicModel from "@/models/Story.Topic";
import { NextRequest, NextResponse } from "next/server";
import saveFilesIntoDataBase from "@/lib/fileHandler";
import jwt from "jsonwebtoken";
import ManagementModel from "@/models/Management";
import ManagementActivitiesModel from "@/models/ManagementActivities";
export async function PATCH(
  req: NextRequest,
  { params }: { params: { topicID: string } }
) {
  try {
    console.log("API HIT");
    // Only super_admin and editor Can Update A Web Story Topic 
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
    await connectMongoDB();
    const topicID = params.topicID;
    if (!topicID) {
      return NextResponse.json(
        { message: "Topic ID Not Found!", success: false },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const topicTitle = formData.get("topicTitle") as string;
    const description = formData.get("description") as string;
    const metaKeyWords = formData.get("metaKeyWords") as string;
    const metaDescription = formData.get("metaDescription") as string;
    const isActive = formData.get("isActive") === "true"; // Checkbox boolean

    const file = formData.get("topicImg");

    // if (!file || !(file instanceof File)) {
    //   console.log("❌ topicImg is missing or not a valid file");
    //   return NextResponse.json(
    //     {
    //       message: "❌ topicImg is missing or not a valid file",
    //       success: false,
    //     },
    //     {
    //       status: 404,
    //     }
    //   );
    // }
    let imgPath: string | undefined;
    if (file && file instanceof File) {
      imgPath = await saveFilesIntoDataBase(file, file.name);
    }
    
    const updatedTopic = await TopicModel.findByIdAndUpdate(
      topicID,
      {
        topicTitle,
        description,
        metaKeyWords,
        metaDescription,
        isActive,
        ...(imgPath ? { topicImg: imgPath } : {}),
      },
      { new: true } 
    );

    if (!updatedTopic) {
      return NextResponse.json(
        { message: "Failed to update topic", success: false },
        { status: 500 }
      );
    }

    // Create A New Management Activity
    const newManagementActivity = new ManagementActivitiesModel({ managementId: actor._id, activity: `User ${actor.name} (${actor.email}) updated a web story topic: ${topicTitle}`, activityTime: new Date() });
    await newManagementActivity.save();

    return NextResponse.json(
      { message: "Topic Updated Successfully!", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in updating topic:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
