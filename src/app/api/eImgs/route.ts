import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import EImagesModels from "@/models/EImages";

const sanitizeFileName = (name: string) => {
  return name.replace(/\s+/g, "-");
};

const uploadImgHandler = async (fileName: string, file: File) => {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);
  const uploadDir = path.join(`${process.env.EIMAGES}`, "eImages");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, fileName);
  fs.writeFileSync(filePath, bytes);
  return `/eImages/${fileName}`;
};

export async function POST(req: NextRequest) {
  try {
    const images = await req.formData();
    const createdUrls: string[] = [];

    for (const [key, value] of images.entries()) {
      if (value instanceof File) {
        console.log(key);

        const cleanName = sanitizeFileName(value.name);
        const fileName = `${Date.now()}-${cleanName}`;

        const createdUrl = await uploadImgHandler(fileName, value);
        if (createdUrl) createdUrls.push(createdUrl);
      }
    }

    if (createdUrls.length > 0) {
      for (const img of createdUrls) {
        await EImagesModels.create({ imgPath: img });
      }
      return NextResponse.json(
        {
          message: "Images Uploaded Successfully!",
          success: true,
          files: createdUrls,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        message: "Images Couldn't Upload In Database. Please resolve the bugs.",
        success: false,
      },
      { status: 500 }
    );
  } catch (error) {
    console.log("Internal Server Error!", error);
    return NextResponse.json(
      {
        message: "Internal Server Error!",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allImages = await EImagesModels.find();
    if (allImages.length > 0) {
      return NextResponse.json(
        {
          message: "Saved Images Fetched Successfully!",
          success: true,
          allImages,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "Images Are not Available!",
          success: false,
        },
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.log("Internal Server Error In Fetching The Uploded Images!", error);
    return NextResponse.json(
      { message: "Internal Server Error!", success: false },
      { status: 500 }
    );
  }
}
