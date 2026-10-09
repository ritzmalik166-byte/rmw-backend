import { connectMongoDB } from "@/lib/mongo/dbConntect";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import RitzCats from "@/models/RitzCats.Schema";
import RitzBlogModel from "@/models/Blog.Schema";
import ManagementActivitiesModel from "@/models/ManagementActivities";
import jwt from "jsonwebtoken";
import ManagementModel from "@/models/Management";
import { revalidateBlogListingPages } from "@/lib/revalidateBlogs";
import {
  generateSlugFromTitle,
  isValidSlugInput,
  normalizeSlug,
} from "@/lib/slugify";
import { BLOG_AUTHORS, isBlogAuthor } from "@/lib/blogAuthors";

export function generateSlug(title) {
  return generateSlugFromTitle(title);
}

async function saveFileToUploads(file, filename) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadDir = path.join(`${process.env.SERVER_IMG_PATH}`, "images");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, filename);
  fs.writeFileSync(filePath, buffer);
  return `/images/${filename}`;
}

async function resolveUniqueSlug(baseSlug, publishStatus) {
  let blogSlug = baseSlug;
  let existingSlug = await RitzBlogModel.findOne({ blogSlug });

  if (existingSlug && publishStatus === "draft") {
    blogSlug = `${baseSlug}-draft-${Date.now()}`;
    existingSlug = await RitzBlogModel.findOne({ blogSlug });
  }

  return { blogSlug, existingSlug };
}

export async function POST(request) {
  try {
    await connectMongoDB();
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Token is required" }, { status: 400 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (decoded.role !== "super_admin" && decoded.role !== "editor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const actor = await ManagementModel.findById(decoded.id);
    if (!actor || !actor.isActive) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const blogTitle = String(formData.get("blogTitle") || "").trim();
    const blogSlugInput = formData.get("blogSlug");
    const metaKeywords = formData.get("metaKeywords");
    const blogBodyRaw = formData.get("blogBody");
    const blogCategory = formData.get("blogCategory");
    const mtDesc = formData.get("mtDesc");
    const blogAuthorRaw = String(formData.get("blogAuthor") || "").trim();
    const publishStatus = String(formData.get("publishStatus") || "published");
    const scheduledAtRaw = formData.get("scheduledAt");

    if (!blogTitle) {
      return NextResponse.json({ message: "Blog title is required" }, { status: 400 });
    }

    if (!blogAuthorRaw || !isBlogAuthor(blogAuthorRaw)) {
      return NextResponse.json(
        { message: `Please select a valid author (${BLOG_AUTHORS.join(", ")})` },
        { status: 400 }
      );
    }

    if (!["draft", "scheduled", "published"].includes(publishStatus)) {
      return NextResponse.json({ message: "Invalid publish status" }, { status: 400 });
    }

    let scheduledAt = null;
    if (publishStatus === "scheduled") {
      if (!scheduledAtRaw) {
        return NextResponse.json(
          { message: "Schedule date and time are required" },
          { status: 400 }
        );
      }
      scheduledAt = new Date(String(scheduledAtRaw));
      if (Number.isNaN(scheduledAt.getTime()) || scheduledAt <= new Date()) {
        return NextResponse.json(
          { message: "Scheduled time must be in the future" },
          { status: 400 }
        );
      }
    }

    const baseSlug = blogSlugInput
      ? normalizeSlug(String(blogSlugInput))
      : generateSlug(blogTitle);

    if (!baseSlug || !isValidSlugInput(baseSlug)) {
      return NextResponse.json(
        {
          message:
            "A valid slug URL is required (letters, numbers, and hyphens only)",
        },
        { status: 400 }
      );
    }

    const { blogSlug, existingSlug } = await resolveUniqueSlug(
      baseSlug,
      publishStatus
    );

    if (existingSlug) {
      return NextResponse.json(
        {
          message: "This slug URL is already in use. Please choose a different one.",
        },
        { status: 409 }
      );
    }

    let fetchCat = blogCategory
      ? await RitzCats.findOne({ categorySlug: blogCategory })
      : null;

    if (!fetchCat && publishStatus === "draft") {
      fetchCat = await RitzCats.findOne().sort({ createdAt: 1 });
    }

    if (!fetchCat) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    if (publishStatus === "published") {
      if (!blogCategory || blogCategory === "none-selected") {
        return NextResponse.json({ message: "Please select a category" }, { status: 400 });
      }
      if (!mtDesc) {
        return NextResponse.json({ message: "Meta description is required" }, { status: 400 });
      }
    }

    let blogBannerPath = "";
    const innerImgMap = {};

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        const filename = `${Date.now()}-${value.name}`;
        const savedPath = await saveFileToUploads(value, filename);

        if (key === "blogBanner") {
          blogBannerPath = savedPath;
        } else if (key.startsWith("innerImg-")) {
          const index = key.split("-")[1];
          innerImgMap[index] = savedPath;
        }
      }
    }

    if (publishStatus === "published" && !blogBannerPath) {
      return NextResponse.json(
        { message: "Cover image is required to publish" },
        { status: 400 }
      );
    }

    let blogBodyParsed = [];
    try {
      blogBodyParsed = JSON.parse(blogBodyRaw || "[]");
    } catch {
      blogBodyParsed = [];
    }

    if (!Array.isArray(blogBodyParsed) || blogBodyParsed.length === 0) {
      blogBodyParsed = [
        {
          metaTitle: blogTitle,
          metaDescription: "",
        },
      ];
    }

    const blogBody = blogBodyParsed.map((item, index) => ({
      metaTitle: item.metaTitle || blogTitle,
      metaDescription: item.metaDescription || "",
      innerImg: innerImgMap[index] || "",
    }));

    if (publishStatus === "published") {
      const hasContent = blogBody.some(
        (item) => String(item.metaDescription || "").trim().length > 0
      );
      if (!hasContent) {
        return NextResponse.json(
          { message: "Add page content before publishing" },
          { status: 400 }
        );
      }
    }

    const blogDescription =
      blogBody.find((item) => String(item.metaDescription || "").trim())?.metaDescription ||
      blogBody[0]?.metaDescription ||
      "";

    const isLive = publishStatus === "published";
    const publishedAt =
      publishStatus === "published"
        ? new Date()
        : publishStatus === "scheduled"
          ? null
          : null;

    const newBlog = await RitzBlogModel.create({
      blogTitle,
      blogBanner: blogBannerPath,
      blogBody,
      metaKeywords,
      blogCategoryId: fetchCat._id,
      blogStatus: isLive,
      publishStatus,
      scheduledAt: publishStatus === "scheduled" ? scheduledAt : undefined,
      publishedAt,
      blogSlug,
      blogDescription,
      mtDesc,
      blogAuthor: blogAuthorRaw,
    });

    const activityLabel =
      publishStatus === "draft"
        ? "saved a draft blog"
        : publishStatus === "scheduled"
          ? "scheduled a blog"
          : "added a new blog";

    const newManagementActivity = new ManagementActivitiesModel({
      managementId: actor._id,
      activity: `User ${actor.name} (${actor.email}) ${activityLabel}: ${blogTitle}`,
      activityTime: new Date(),
    });
    await newManagementActivity.save();

    if (publishStatus === "scheduled") {
      const { ensureScheduledBlogScheduler } = await import(
        "@/lib/scheduledBlogScheduler"
      );
      ensureScheduledBlogScheduler();
    }

    if (isLive) {
      await revalidateBlogListingPages();
    }

    return NextResponse.json(
      {
        message:
          publishStatus === "draft"
            ? "Draft saved successfully"
            : publishStatus === "scheduled"
              ? "Blog scheduled successfully. It will publish automatically at the chosen time."
              : "Blog published successfully",
        blog: newBlog,
        scheduledAt:
          publishStatus === "scheduled" && scheduledAt
            ? scheduledAt.toISOString()
            : undefined,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error?.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || "field";
      const friendlyField = field === "blogTitle" ? "title" : field === "blogSlug" ? "URL slug" : field;
      return NextResponse.json(
        {
          message: `A blog with this ${friendlyField} already exists. Please use a different ${friendlyField} or edit the existing blog.`,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
