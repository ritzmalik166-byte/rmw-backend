import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request, context) {
  const { imageName } = await context.params;

  const imagePath = path.join(`${process.env.SERVER_IMG_PATH}/images`, imageName);
      console.log("API HIT AND THIS IS ------------------------------ imagePath", imagePath);  
  try {
    if (!fs.existsSync(imagePath)) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const extension = path.extname(imageName).toLowerCase();

    const mimeTypeMap = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp",
    };

    const contentType = mimeTypeMap[extension] || "application/octet-stream";

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (err) {
    console.error("Image read error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
