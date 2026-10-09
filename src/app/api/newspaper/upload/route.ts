import { connectMongoDB } from "@/lib/mongo/dbConntect";
import NewsPaperModel from "@/models/NewsPaper";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
// Post New NewsPaper
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const formData = await req.formData();

    const paperName = formData.get("paperName")?.toString();
    const language = formData.get("language")?.toString();
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
    const metaTitle = formData.get("metaTitle")?.toString();
    const metaDesc = formData.get("metaDesc")?.toString();
    const areaCovered = formData.get("areaCovered")?.toString();
    const logoImg = formData.get("logoImg") as File | null;

    if (
      !paperName ||
      !language ||
      !logoImg ||
      !price ||
      !spendType ||
      !location ||
      !options ||
      !category ||
      !publications ||
      !frequency ||
      !position ||
      !circulation ||
      !readership ||
      !title ||
      !desc ||
      !areaCovered
    ) {
      return NextResponse.json(
        { message: "All Fields Are Required!", success: false },
        { status: 400 }
      );
    }

    const slug =
      paperName.toLowerCase().split(" ").join("-") +
      "-" +
      language.toLowerCase() +
      "-" +
      "advertising";

    let imagePath = "";
    if (logoImg) {
      const bytes = await logoImg.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}_${logoImg.name}`;
      const uploadDir = path.join(`${process.env.SERVER_IMG_PATH}`, "images");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      imagePath = `/images/${fileName}`;
    }

    const data = await NewsPaperModel.create({
      paperName,
      language,
      logoImg: imagePath,
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
      areaCovered,
      metaTitle,
      metaDesc,
    });

    if (!data) {
      return NextResponse.json(
        {
          message: "Sorry News Paper Uploading Failed! Please Try Again Later.",
          success: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "News Paper Posted Successfully!",
        success: true,
        preview: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Internal Server Error in Posting NewsPaper: ", error);
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        message: "Internal Server Error While Uploading The NewsPaper Ads.",
        success: false,
        error: errMsg,
      },
      { status: 500 }
    );
  }
}
