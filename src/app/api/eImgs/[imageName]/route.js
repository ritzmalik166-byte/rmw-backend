import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import EImagesModels from "@/models/EImages";

export async function GET(req, context) {
  const { imageName } = await context.params;
  const imagePath = path.join(`${process.env.EIMAGES}/eImages`, imageName);

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
  } catch (error) {
    console.log(error);
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
export async function DELETE(req, context) {
  try {
    const id = context.params.imageName; // this is coming from URL param
    if (!id) {
      return NextResponse.json(
        { message: "Id is required to delete an image!", success: false },
        { status: 404 }
      );
    }

    // if your DB stores the actual fileName with the document:
    const doc = await EImagesModels.findById(id);
    if (!doc) {
      return NextResponse.json(
        { message: "Image not found in DB!", success: false },
        { status: 404 }
      );
    }

    const fileEndPoinst = doc.imgPath.replace("/eImages", "");
    const imagePath = path.join(
      `${process.env.EIMAGES}/eImages`,
      fileEndPoinst
    );

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      } else {
        console.log("Image deleted from server successfully!");
      }
    });

    await EImagesModels.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Image has been deleted successfully!", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { message: "Internal Server Errors!", success: false },
      { status: 500 }
    );
  }
}
