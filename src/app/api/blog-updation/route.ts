import { getDBPool } from "@/lib/db";
import RitzBlogModel from "@/models/Blog.Schema";
import { NextRequest, NextResponse } from "next/server";
import { revalidateBlogListingPages } from "@/lib/revalidateBlogs";

export async function PATCH(req: NextRequest) {
  try {
    const { blStatus, dbSt, blID } = await req.json();
    if (!blID || !dbSt) {
      return NextResponse.json(
        { message: "Invalid Credentials", blStatus },
        { status: 404 }
      );
    }
    let res;
    if (dbSt === "mongo") {
      res = await RitzBlogModel.findByIdAndUpdate(blID, {
        blogStatus: blStatus,
      });
    } else {
      const query = await getDBPool();
      res = await query.execute("UPDATE blogs SET status = ? WHERE slug = ? ", [
        blStatus,
        blID,
      ]);
    }
    if (!res) {
      return NextResponse.json(
        { message: "Internal Server Err", success: false },
        { status: 400 }
      );
    }
    await revalidateBlogListingPages();

    return NextResponse.json(
      { message: "Blog Status Updates", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("Internal Server Error!", error);
    return NextResponse.json(
      {
        message: "Internal Server Error!",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
