import { connectMongoDB } from "@/lib/mongo/dbConntect";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import ManagementModel from "@/models/Management";
import {
  duplicateKeyConflictMessage,
  importBlogFromGoogleDoc,
} from "@/lib/google/googleDocBlogImport";

type JwtPayload = {
  id: string;
  role?: string;
};

function optionalFormString(value: FormDataEntryValue | null): string | null {
  return value == null ? null : String(value);
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Token is required" }, { status: 400 });
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    } catch {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!decoded?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (decoded.role !== "super_admin" && decoded.role !== "editor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const actor = await ManagementModel.findById(decoded.id);
    if (!actor || !actor.isActive) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Author always comes from JWT actor — never from FormData
    const blogAuthor = String(actor.name || "").trim();
    if (!blogAuthor) {
      return NextResponse.json(
        { message: "Authenticated author profile is incomplete" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const blogBannerFile = formData.get("blogBanner");

    const result = await importBlogFromGoogleDoc({
      actor,
      blogAuthor,
      blogTitle: String(formData.get("blogTitle") || "").trim(),
      blogSlugInput: optionalFormString(formData.get("blogSlug")),
      blogCategoryId: String(formData.get("blogCategoryId") || "").trim(),
      publishStatus: String(formData.get("publishStatus") || "published").trim(),
      scheduledAtRaw: optionalFormString(formData.get("scheduledAt")),
      googleDocIdRaw: String(formData.get("googleDocId") || "").trim(),
      googleDocUrlRaw: String(formData.get("googleDocUrl") || "").trim(),
      banner:
        blogBannerFile instanceof File && blogBannerFile.size > 0
          ? { kind: "file", file: blogBannerFile }
          : null,
    });

    if (!result.ok) {
      return NextResponse.json({ message: result.message }, { status: result.status });
    }

    return NextResponse.json(
      {
        message: result.message,
        blog: result.blog,
        scheduledAt: result.scheduledAt,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const conflictMessage = duplicateKeyConflictMessage(error);
    if (conflictMessage) {
      return NextResponse.json({ message: conflictMessage }, { status: 409 });
    }

    const err = error as { message?: string };
    console.error("[import-google-doc] Unexpected error:", err?.message || error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
