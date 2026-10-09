import { connectMongoDB } from "@/lib/mongo/dbConntect";
import { NextRequest, NextResponse } from "next/server";
import RitzBlogModel from "@/models/Blog.Schema";
import fs from "fs";
import path from "path";
import {
  generateSlugFromTitle,
  isValidSlugInput,
  normalizeSlug,
} from "@/lib/slugify";
import jwt from "jsonwebtoken";
import ManagementModel from "@/models/Management";
import ManagementActivitiesModel from "@/models/ManagementActivities";
import { revalidateBlogListingPages } from "@/lib/revalidateBlogs";
import { isBlogAuthor } from "@/lib/blogAuthors";

interface BlogBodyItem {
    metaTitle: string;
    metaDescription: string;
    innerImg?: string;
}

async function saveFileToUploads(file: File, filename: string): Promise<string> {
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

function deleteFileFromUploads(url: string) {
    try {
        const filePath = path.join(process.cwd(), "public", url);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch (err) {
        console.warn("Failed to delete previous image:", err);
    }
}

export async function PUT(req: NextRequest, { params }: { params: { blogID: string } }) {
    try {
        await connectMongoDB();
        // Only super_admin and editor Can Update A Blog 
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ message: "Token is required" }, { status: 400 });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string | undefined };
        if (!decoded) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        if (decoded.role !== "super_admin" && decoded.role !== "editor" && decoded.role !== undefined) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const actor = await ManagementModel.findById(decoded.id as string);
        if (!actor || !actor.isActive) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const formData = await req.formData();
        const blogId = params.blogID;
        const blogTitle = formData.get("blogTitle");
        const blogMetaTitle = formData.get("blogMetaTitle");
        const blogSlugInput = formData.get("blogSlug");
        const metaKeywords = formData.get("metaKeywords");
        const blogBodyRaw = formData.get("blogBody");
        const blogCategoryId = formData.get("blogCategoryId") || formData.get("blogCategory"); // Support both for backward compatibility
        const mtDesc = formData.get("mtDesc");
        const blogAuthorRaw = String(formData.get("blogAuthor") || "").trim();

        if (blogAuthorRaw && !isBlogAuthor(blogAuthorRaw)) {
            return NextResponse.json(
                { message: "Please select a valid author from the list." },
                { status: 400 }
            );
        }

        const blogSlug = blogSlugInput
            ? normalizeSlug(String(blogSlugInput))
            : generateSlugFromTitle(String(blogTitle || ""));

        if (!blogSlug || !isValidSlugInput(blogSlug)) {
            return NextResponse.json(
                { message: "A valid slug URL is required (letters, numbers, and hyphens only)" },
                { status: 400 }
            );
        }

        const slugConflict = await RitzBlogModel.findOne({
            blogSlug,
            _id: { $ne: blogId },
        });
        if (slugConflict) {
            return NextResponse.json(
                { message: "This slug URL is already in use. Please choose a different one." },
                { status: 409 }
            );
        }

        let blogBannerPath = "";
        const innerImgMap: Record<string, string> = {};

        // console.log("This blog id i am receiving during update mongo ", blogId);

        // Fetch existing blog to access previous image paths
        const existingBlog = await RitzBlogModel.findById(blogId);
        if (!existingBlog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        const existingBlogBody: BlogBodyItem[] = (existingBlog.blogBody || []).map(
            (item) => ({
                metaTitle: item.metaTitle || "",
                metaDescription: item.metaDescription || "",
                innerImg: item.innerImg || "",
            })
        );
        const prevBannerPath: string = existingBlog.blogBanner;

        // Upload new files (if any) and mark old ones for deletion
        for (const [key, value] of formData.entries()) {
            if (value instanceof File && value.size > 0) {
                const filename = `${Date.now()}-${value.name}`;
                const savedPath = await saveFileToUploads(value, filename);

                if (key === "blogBanner") {
                    blogBannerPath = savedPath;

                    // Delete old banner if new uploaded
                    if (prevBannerPath) {
                        deleteFileFromUploads(prevBannerPath);
                    }
                } else if (key.startsWith("innerImg-")) {
                    const index = key.split("-")[1];
                    innerImgMap[index] = savedPath;

                    // Delete old inner image if new uploaded
                    const existingInnerImg = existingBlogBody[+index]?.innerImg;
                    if (existingInnerImg) {
                        deleteFileFromUploads(existingInnerImg);
                    }
                }
            }
        }

        const blogBodyParsed = JSON.parse(typeof blogBodyRaw === "string" ? blogBodyRaw : "[]");

        const updatedBlogBody = blogBodyParsed.map((item: BlogBodyItem, index: number): BlogBodyItem => ({
            ...item,
            innerImg: innerImgMap[index] || item.innerImg || "",
        }));

        if (typeof blogMetaTitle === "string") {
            if (updatedBlogBody.length === 0) {
                updatedBlogBody.push({
                    metaTitle: blogMetaTitle,
                    metaDescription: "",
                    innerImg: "",
                });
            } else {
                updatedBlogBody[0].metaTitle = blogMetaTitle;
            }
        }

        const updateData: Partial<{
            blogTitle: string | FormDataEntryValue | null;
            blogBody: BlogBodyItem[];
            metaKeywords: FormDataEntryValue | null;
            blogCategoryId: string | FormDataEntryValue | null;
            blogStatus: boolean;
            blogBanner?: string;
            blogSlug?:string;
            mtDesc?: FormDataEntryValue | null;
            blogAuthor?: string;
        }> = {
            blogTitle,
            blogBody: updatedBlogBody,
            metaKeywords,
            blogCategoryId: blogCategoryId || undefined,
            blogStatus:true,
            blogSlug,
            mtDesc: mtDesc || undefined,
        };

        if (blogAuthorRaw) {
            updateData.blogAuthor = blogAuthorRaw;
        }

        if (blogBannerPath) {
            updateData.blogBanner = blogBannerPath;
        }

        const updatedBlog = await RitzBlogModel.findByIdAndUpdate(
            blogId,
            { $set: updateData },
            { new: true }
        );

        // Create A New Management Activity
        const newManagementActivity = new ManagementActivitiesModel({ managementId: actor._id, activity: `User ${actor.name} (${actor.email}) updated a blog: ${existingBlog.blogTitle}`, activityTime: new Date() });
        await newManagementActivity.save();

        await revalidateBlogListingPages();

        return NextResponse.json(
            { message: "Blog Updated Successfully", blog: updatedBlog },
            { status: 200 }
        );
    } catch (error) {
        console.log("Update Blog Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error },
            { status: 500 }
        );
    }
}
