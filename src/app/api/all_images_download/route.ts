import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzBlogModel from "@/models/Blog.Schema";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import path from "path";
import fs from "fs";
import archiver from "archiver";
import axios from "axios";

interface BlogImageRow extends RowDataPacket {
  blog_image: string;
  title: string;
}

type ImageEntry = {
  imagePath: string;
  title: string;
};

export async function GET() {
  try {
    await connectMongoDB();
    const db = getDBPool();
    const mongoImages = await RitzBlogModel.find(
      {},
      { blogBanner: 1, blogTitle: 1 }
    );
    if (mongoImages.length === 0) {
      return NextResponse.json(
        {
          message: "No Images Found In MongoDB",
          success: false,
        },
        { status: 404 }
      );
    }
    const [sqlImages] = await db.query<BlogImageRow[]>(
      "SELECT blog_image, title FROM blogs"
    );
    const sqlImagesArray = sqlImages as BlogImageRow[];
    if (sqlImagesArray.length === 0) {
      return NextResponse.json(
        {
          message: "No Images Found In MySQL",
          success: false,
        },
        { status: 404 }
      );
    }

    const allImages: ImageEntry[] = [
      ...mongoImages.map((image) => ({
        imagePath: image.blogBanner,
        title: image.blogTitle,
      })),
      ...sqlImagesArray.map((image) => ({
        imagePath: image.blog_image,
        title: image.title,
      })),
    ];

    const zipFileName = "all_images.zip";
    const zipPath = path.join(process.cwd(), "public", zipFileName);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(output);

    for (const image of allImages) {
      try {
        let imageUrl = image.imagePath;
        if (!imageUrl) {
          continue;
        }

        if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
          let baseUrl = process.env.NEXT_PUBLIC_SERVER_IMG_PATH || "http://localhost:3000";
          baseUrl = baseUrl.replace(/\/$/, ""); 
          
          if (imageUrl.startsWith("/")) {
            if (imageUrl.includes("/images")) {
              imageUrl = `${baseUrl}/api/images${imageUrl.split("/images")[1]}`;
            } else if (imageUrl.startsWith("/blogs/")) {
              imageUrl = `${baseUrl}${imageUrl}`;
            } else {
              imageUrl = `${baseUrl}${imageUrl}`;
            }
          } else {
            imageUrl = `${baseUrl}/blogs/${imageUrl}`;
          }
        }

        try {
          new URL(imageUrl); 
        } catch (urlError) {
          console.error(`Invalid URL constructed for blog: ${image.title}`, {
            originalUrl: image.imagePath,
            constructedUrl: imageUrl,
          });
          continue; 
        }
        const response = await axios.get(imageUrl, {
          responseType: "arraybuffer",
          timeout: 10000, 
        });
        const nodeBuffer = Buffer.from(response.data, "binary");

        const blogTitle = image.title || "image";
        const sanitizedTitle = blogTitle
          .replace(/[<>:"/\\|?*]/g, "_")
          .trim()
          .substring(0, 100); 

        const imageExtension = imageUrl.split(".").pop()?.toLowerCase() || "jpg";
        const imageName = `rmw-blogs/${sanitizedTitle}/image.${imageExtension}`;

        archive.append(nodeBuffer, { name: imageName });
      } catch (error) {
        console.error(`Error downloading image for blog: ${image.title}`, error);
        continue;
      }
    }
    await archive.finalize();

    await new Promise<void>((resolve, reject) => {
      output.on("close", () => resolve());
      archive.on("error", (err: Error) => reject(err));
      output.on("error", (err: Error) => reject(err));
    });

    return NextResponse.json({ url: `/${zipFileName}`, success: true });
  } catch (err) {
    console.log(
      "Internal Server Errors In Download All Images As Zip => ",
      err
    );
    return NextResponse.json(
      {
        message: "Internal Server Errors In Download All Images As Zip => ",
        success: false,
        error: err,
      },
      { status: 500 }
    );
  }
}
