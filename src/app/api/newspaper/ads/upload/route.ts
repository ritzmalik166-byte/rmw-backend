import AdsTypeModel from "@/models/AdsType";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

async function saveTheImagesIntoLocalFile(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}_${file.name}`;

  // Create File Path ::
  const uploadDir = path.join(`${process.env.SERVER_IMG_PATH}`, "images");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  const filePath = path.join(uploadDir, fileName);
  fs.writeFileSync(filePath, buffer);
  return `/images/${fileName}`;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const adtype = formData.get("adtype")?.toString();
    const adDesc = formData.get("adDesc")?.toString();
    const baseRate = formData.get("baseRate")?.toString();
    const quantity = formData.get("quantity")?.toString();
    const adLabel = formData.get("adLabel")?.toString();
    const adTiming = formData.get("adTiming")?.toString();
    const details = formData.get("details")?.toString();
    const category = formData.get("category")?.toString();
    const parentID = formData.get("parentID")?.toString();
    const metaTitle = formData.get("metaTitle")?.toString();
    const metaDesc = formData.get("metaDesc")?.toString();
    const imgsArr = formData.getAll("imgs") as File[] | null;
    if (
      !adtype ||
      !adDesc ||
      !baseRate ||
      !quantity ||
      !adTiming ||
      !details ||
      !parentID ||
      !adLabel ||
      !category
    ) {
      return NextResponse.json(
        {
          message: "Please provide all the required fields.",
          success: false,
        },
        { status: 400 }
      );
    }

    if (imgsArr?.length === 0) {
      return NextResponse.json(
        {
          message: "Images Are required .",
          success: false,
        },
        { status: 400 }
      );
    }
    const imgArr: string[] = [];
    if (imgsArr) {
      for (const file of imgsArr) {
        const url = await saveTheImagesIntoLocalFile(file);
        imgArr.push(url);
      }
    }
    const slug = adtype.toLowerCase().split(" ").join("-");

    const data = await AdsTypeModel.create({
      adtype,
      adDesc,
      baseRate,
      slug,
      quantity,
      adLabel,
      adTiming,
      details,
      category,
      parentID,
      metaTitle,
      metaDesc,
      imgs: imgArr,
    });

    if (!data) {
      return NextResponse.json(
        {
          message:
            "Advertisement Uploading Failed! Please Check All Required Fields And Try Again Later.",
          success: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Advertisement Uploaded Successfully!",
      success: true,
      preview: data,
    });
  } catch (error) {
    console.log("Internal Server Error While Uploading Ads: ", error);
    const errMsg = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        message: "Internal Server Error While Uploading The Ads.",
        success: false,
        error: errMsg,
      },
      { status: 500 }
    );
  }
}
