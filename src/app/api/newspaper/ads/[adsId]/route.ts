import { connectMongoDB } from "@/lib/mongo/dbConntect";
import AdsTypeModel from "@/models/AdsType";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface UpdateFields {
  adtype?: string;
  adDesc?: string;
  baseRate?: string;
  quantity?: string;
  adLabel?: string;
  adTiming?: string;
  details?: string;
  category?: string;
  parentID?: string;
  imgs?: string[];
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { adsId: string } }
) {
  try {
    await connectMongoDB();
    const adsId = params.adsId;
    console.log("This is ads id ", adsId);
    
    if (!adsId) {
      return NextResponse.json(
        {
          message: "Advertisement ID is required!",
          success: false,
        },
        { status: 404 }
      );
    }

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

    const updateData: UpdateFields = {
      adtype,
      adDesc,
      baseRate,
      quantity,
      adLabel,
      adTiming,
      details,
      category,
      parentID,
    };

    // 🖼️ Handle images (existing + new)
    const imgsArr = formData.getAll("imgs") as File[];
    const existingImgsStr = formData.get("existingImgs")?.toString();
    console.log("This is imgs array ", imgsArr);
    console.log("This is existing imgs ", existingImgsStr);
    
    let finalImgPaths: string[] = [];
    
    // Handle existing images
    if (existingImgsStr) {
      try {
        const existingImgs = JSON.parse(existingImgsStr);
        if (Array.isArray(existingImgs)) {
          finalImgPaths = [...existingImgs];
        }
      } catch (error) {
        console.error("Error parsing existing images:", error);
      }
    }
    
    // Handle new uploaded images
    if (imgsArr && imgsArr.length > 0) {
      const uploadDir = path.join(
        `${process.env.SERVER_IMG_PATH}`,
        "adsImages"
      );
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      for (const img of imgsArr) {
        if (img instanceof File) {
          const bytes = await img.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const fileName = `${Date.now()}-${img.name}`;
          const filePath = path.join(uploadDir, fileName);
          fs.writeFileSync(filePath, buffer);
          finalImgPaths.push(`/adsImages/${fileName}`);
        }
      }
    }
    
    // Update with final image paths
    if (finalImgPaths.length > 0) {
      updateData.imgs = finalImgPaths;
    }

    // 🧹 Remove undefined fields (PATCH behavior)
    Object.keys(updateData).forEach(
      (key) =>
        updateData[key as keyof UpdateFields] === undefined &&
        delete updateData[key as keyof UpdateFields]
    );

    const updatedAd = await AdsTypeModel.findByIdAndUpdate(adsId, updateData, {
      new: true,
    });

    if (!updatedAd) {
      return NextResponse.json(
        {
          message: "Advertisement Updating Failed! Please Try Again.",
          success: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Advertisement Updated Successfully!",
        success: true,
        preview: updatedAd,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Internal Server Error While Updating Advertisement:", error);
    const errMsg =
      error instanceof Error ? error.message : "Unknown Internal Error";

    return NextResponse.json(
      {
        message: "Internal Server Error While Updating Advertisement.",
        success: false,
        error: errMsg,
      },
      { status: 500 }
    );
  }
}

// 🗑️ Delete Advertisement + Images
export async function DELETE(
  req: NextRequest,
  { params }: { params: { adsId: string } }
) {
  try {
    await connectMongoDB();

    const adsId = params.adsId;
    if (!adsId) {
      return NextResponse.json(
        {
          message: "Advertisement ID is required!",
          success: false,
        },
        { status: 404 }
      );
    }

    // 🔍 First find the ad to get its image paths before deletion
    const existingAd = await AdsTypeModel.findById(adsId);
    if (!existingAd) {
      return NextResponse.json(
        {
          message: "Advertisement not found!",
          success: false,
        },
        { status: 404 }
      );
    }

    // 🖼️ Delete images from local directory if they exist
    if (existingAd.imgs && existingAd.imgs.length > 0) {
      for (const imgPath of existingAd.imgs) {
        const fullPath = path.join(process.env.SERVER_IMG_PATH || "", imgPath);
        if (fs.existsSync(fullPath)) {
          try {
            fs.unlinkSync(fullPath);
            console.log("🗑️ Deleted image:", fullPath);
          } catch (err) {
            console.warn("⚠️ Failed to delete image:", fullPath, err);
          }
        }
      }
    }

    // 🧹 Now delete the ad from the database
    const deletedAd = await AdsTypeModel.findByIdAndDelete(adsId);

    if (!deletedAd) {
      return NextResponse.json(
        {
          message: "Failed to delete advertisement, please try again.",
          success: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Advertisement and its images deleted successfully!",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal Server Error while deleting advertisement:", error);
    const errMsg = error instanceof Error ? error.message : "Unknown Error";

    return NextResponse.json(
      {
        message: "Internal Server Error while deleting advertisement.",
        success: false,
        error: errMsg,
      },
      { status: 500 }
    );
  }
}

// Get Single Add
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      adsId: string;
    };
  }
) {
  try {
    await connectMongoDB();
    const adsId = await params.adsId;
    console.log("This is get API Param ", adsId);

    if (!adsId) {
      return NextResponse.json(
        {
          message: "Paper Slug Not Found!",
          success: false,
        },
        {
          status: 500,
        }
      );
    }
    const singleAds = await AdsTypeModel.findById(adsId);
    if (!singleAds) {
      return NextResponse.json(
        {
          message: "Sorry Ads Not Found!",
          success: false,
        },
        {
          status: 404,
        }
      );
    }
    const topChoices = await AdsTypeModel.find({
      parentID: singleAds.parentID,
    });
    return NextResponse.json({
      message: "All Data Fetched Successfully!",
      success: true,
      singleAds,
      topChoices,
    });
  } catch (error) {
    console.log("Internal Server Error In Get Single Adver..", error);
    const errMsg =
      error instanceof Error
        ? error.message
        : "Unknown Internal Server Error, Please Try Again!";
    return NextResponse.json(
      { message: errMsg, success: false },
      {
        status: 500,
      }
    );
  }
}
