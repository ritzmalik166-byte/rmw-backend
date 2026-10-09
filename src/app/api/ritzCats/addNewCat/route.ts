import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzCats from "@/models/RitzCats.Schema";

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    const data = await request.json();

    // Basic validation
    if (!data.categoryName) {
      return NextResponse.json(
        { message: "Category name is required", success: false },
        { status: 400 }
      );
    }

    // Check if category already exists
    const existingCategory = await RitzCats.findOne({ 
      categoryName: data.categoryName 
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: "Category already exists", success: false },
        { status: 409 }
      );
    }

    // Generate slug
    const categorySlug = data.categoryName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    // Create new category
    const newCategory = new RitzCats({
      categoryName: data.categoryName,
      categorySlug,
      categoryMetaTitle: data.categoryMetaTitle,
      categoryMetaDescription: data.categoryMetaDescription,
      categoryMetaKeywords: data.categoryMetaKeywords,
    });

    await newCategory.save();

    return NextResponse.json(
      {
        message: "Category added successfully",
        success: true,
        data: newCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding category:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}