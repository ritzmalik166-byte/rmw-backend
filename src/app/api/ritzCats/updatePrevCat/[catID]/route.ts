import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzCats from "@/models/RitzCats.Schema";
import { NextRequest, NextResponse } from "next/server";
import ManagementModel from "@/models/Management";
import jwt from "jsonwebtoken";
import ManagementActivitiesModel from "@/models/ManagementActivities";
  
// Utility to generate slug
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { catID: string } }
) {
  try {
    await connectMongoDB();
    // Only super_admin and editor Can Update A Category 
    const token = request.headers.get("Authorization")?.split(" ")[1];
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

    const catID = params.catID;
    if (!catID) {
      return NextResponse.json(
        {
          message: "Category ID not provided",
          success: false,
        },
        { status: 400 }
      );
    }

    const {
      categoryName,
      categoryMetaTitle,
      categoryMetaDescription,
      categoryMetaKeywords,
    }: {
      categoryName: string;
      categoryMetaTitle?: string;
      categoryMetaDescription?: string;
      categoryMetaKeywords?: string[];
    } = await request.json();

    const categorySlug = generateSlug(categoryName);

    const updatedCategory = await RitzCats.findByIdAndUpdate(
      catID,
      {
        categoryName,
        categorySlug,
        categoryMetaTitle,
        categoryMetaDescription,
        categoryMetaKeywords,
      },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return NextResponse.json(
        {
          message: "Category not found",
          success: false,
        },
        { status: 404 }
      );
    }

    // Create A New Management Activity
    const newManagementActivity = new ManagementActivitiesModel({ managementId: actor._id, activity: `User ${actor.name} (${actor.email}) updated a category: ${categoryName}`, activityTime: new Date() });
    await newManagementActivity.save();

    return NextResponse.json(
      {
        message: "Category updated successfully!",
        success: true,
        data: updatedCategory,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in update category controller:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}