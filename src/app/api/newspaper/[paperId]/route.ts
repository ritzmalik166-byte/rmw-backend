import { connectMongoDB } from "@/lib/mongo/dbConntect";
import AdsTypeModel from "@/models/AdsType";
import NewsPaperModel from "@/models/NewsPaper";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

interface UpdateFields {
  paperName?: string;
  language?: string;
  logoImg?: string;
  slug?: string;
  price?: string;
  spendType?: string;
  location?: string;
  options?: string;
  category?: string;
  publications?: string;
  frequency?: string;
  position?: string;
  circulation?: string;
  readership?: string;
  title?: string;
  desc?: string;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { paperId: string } }
) {
  try {
    await connectMongoDB();
    const paperId = params.paperId;
    // console.log("This is paper id ", paperId);
    
    if (!paperId) {
      return NextResponse.json(
        { message: "Paper ID is required!", success: false },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    const paperName = formData.get("paperName")?.toString();
    const language = formData.get("language")?.toString();
    const img = formData.get("logoImg") as File | undefined;
    const slug = formData.get("slug")?.toString();
    const price = formData.get("price")?.toString();
    const spendType = formData.get("spendType")?.toString();
    const location = formData.get("location")?.toString();
    const options = formData.get("options")?.toString();
    const category = formData.get("category")?.toString();
    const publications = formData.get("publications")?.toString();
    const frequency = formData.get("frequency")?.toString();
    const position = formData.get("position")?.toString();
    const circulation = formData.get("circulation")?.toString();
    const readership = formData.get("readership")?.toString();
    const title = formData.get("title")?.toString();
    const desc = formData.get("desc")?.toString();

    const updateData: UpdateFields = {
      paperName,
      language,
      slug,
      price,
      spendType,
      location,
      options,
      category,
      publications,
      frequency,
      position,
      circulation,
      readership,
      title,
      desc,
    };

    let newImgPath = "";
    let paperFId = "";
    if (img) {
      const existingPaper = await NewsPaperModel.findOne({slug:paperId});
      // console.log("This is existing paper ", existingPaper);
      
      if (existingPaper?.logoImg) {
        paperFId = existingPaper._id;
        const prevImgPath = path.join(
          process.env.SERVER_IMG_PATH || "",
          existingPaper.logoImg
        );
        if (fs.existsSync(prevImgPath)) {
          fs.unlinkSync(prevImgPath);
        }
      }

      const bytes = await img.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = img.name;
      const uploadDir = path.join(`${process.env.SERVER_IMG_PATH}`, "images");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      newImgPath = `/images/${fileName}`;
      updateData.logoImg = newImgPath;
    }

    // Remove undefined fields (PATCH should only update sent fields)
    Object.keys(updateData).forEach(
      (key) =>
        updateData[key as keyof UpdateFields] === undefined &&
        delete updateData[key as keyof UpdateFields]
    );

    const data = await NewsPaperModel.findByIdAndUpdate(paperFId, updateData, {
      new: true,
    });

    if (!data) {
      return NextResponse.json(
        {
          message: "Sorry News Paper Updating Failed! Please Try Again Later.",
          success: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "News Paper Updated Successfully!",
        success: true,
        preview: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Internal Server Errors In Updating The NewsPaper", error);
    const errMsg =
      error instanceof Error
        ? error.message
        : "Something went wrong while updating the newspaper ads.";

    return NextResponse.json(
      {
        message: "Internal Server Error While Updating The NewsPaper Ads.",
        success: false,
        error: errMsg,
      },
      { status: 500 }
    );
  }
}

// Delete News Paper
export async function DELETE(
  req: NextRequest,
  { params }: { params: { paperId: string } }
) {
  try {
    await connectMongoDB();
    const paperId = params.paperId;

    if (!paperId) {
      return NextResponse.json(
        { message: "Paper ID is required!", success: false },
        {
          status: 404,
        }
      );
    }
    const existingPaper = await NewsPaperModel.findById(paperId);
    if (existingPaper?.logoImg) {
      const prevImgPath = path.join(
        process.env.SERVER_IMG_PATH || "",
        existingPaper.logoImg
      );
      if (fs.existsSync(prevImgPath)) {
        fs.unlinkSync(prevImgPath);
      }
    }
    const data = await NewsPaperModel.findByIdAndDelete(paperId);
    if (!data) {
      return NextResponse.json(
        {
          message:
            "Sorry News Paper Deleting Failed!. Please Try Again Letter.",
          success: false,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        message: "News Paper Deleted Successfully!",
        success: true,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("Internal Server Errors In Deleting The NewsPaper", error);
    const errMsg =
      error instanceof Error
        ? error.message
        : "Something went wrong while uploading the newspaper ads.";

    return NextResponse.json(
      {
        message: "Internal Server Error While Uploading The NewsPaper Ads.",
        success: false,
        error: errMsg, // send actual error message safely
      },
      { status: 500 }
    );
  }
}

// Get The Single News Paper
export async function GET(
  req: NextRequest,
  { params }: { params: { paperId: string } }
) {
  try {
    await connectMongoDB();
    const slug = params.paperId;
    console.log("This is geted sk=lug ", slug);

    const newsPaper = await NewsPaperModel.findOne({ slug: slug });
    if (!newsPaper) {
      return NextResponse.json(
        {
          message: "NewsPaper Not Found!",
          success: false,
          id: slug,
        },
        {
          status: 404,
        }
      );
    }
    const filter = {
      parentID: newsPaper._id,
      category: "Top Choice",
    };
    const filter2 = {
      parentID: newsPaper._id,
      category: "Other Ad Options",
    };
    const topChoices = await AdsTypeModel.find(filter).sort({ createdAt: -1 });
    const otherAds = await AdsTypeModel.find(filter2).sort({
      createdAt: -1,
    });
    const allSupliments = await NewsPaperModel.find({
      publications: newsPaper.publications,
    }).sort({ createdAt: -1 });
    return NextResponse.json({
      message: "Data Fetched Successfully!",
      sucess: true,
      newsPaper,
      topChoices,
      otherAds,
      allSupliments,
    });
  } catch (error) {
    console.log(
      "Internal Server Errors In Get Single Newspaper Controller ",
      error
    );
    const errMsg =
      error instanceof Error ? error.message : "Unknown Internal Server Error!";
    return NextResponse.json(
      {
        message: errMsg,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}