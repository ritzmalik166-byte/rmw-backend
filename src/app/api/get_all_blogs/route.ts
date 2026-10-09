import { getDBPool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzBlogModel from "@/models/Blog.Schema";
import { getPublicBlogFilter } from "@/lib/blogPublish";
import mongoose from "mongoose";
import RitzCats from "@/models/RitzCats.Schema";


export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();
        const page = Number(req.nextUrl.searchParams.get("page")) || 1;
        const limit = 10;
        const publicFilter = getPublicBlogFilter();
        const mongoTotal = await RitzBlogModel.countDocuments(publicFilter);
        const skip = (page - 1) * limit;
        let blogs: any[] = [];
        if (skip >= mongoTotal) {
            const mysqlOffset = skip - mongoTotal;
            // Fetch from MySQL
            const [mysqlBlogs] = await getDBPool().query("SELECT blog_image, title, slug, meta_description, meta_keywords, description, created_at FROM blogs WHERE category_id != 1 ORDER BY id DESC, created_at DESC LIMIT ? OFFSET ?", [limit, mysqlOffset]);
            blogs = Array.isArray(mysqlBlogs) ? mysqlBlogs : [];
        } else {
            blogs = await RitzBlogModel.find(publicFilter, {
                blogTitle: 1,
                blogBanner: 1,
                blogDescription: 1,
                blogSlug: 1,
                metaKeywords: 1,
                mtDesc: 1,
                createdAt: 1,
                _id: 0
            }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
        }
        return NextResponse.json({ blogs }, { status: 200 });

    } catch (error) {
        console.error("Error in fetching all blogs", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET_ALL_BLOGS() {
    try {
        await connectMongoDB();
        const mongo_blogs = await RitzBlogModel.find(getPublicBlogFilter(), {
            blogTitle: 1,
            blogBanner: 1,
            blogSlug: 1,
            blogDescription: 1,
            createdAt: 1,
        }).sort({ createdAt: -1 }).lean();
        const [mysql_blogs] = await getDBPool().query<any[]>("SELECT blog_image, title, slug, description, created_at FROM blogs WHERE category_id != 1 ORDER BY id DESC, created_at DESC");
        const blogs = [...mongo_blogs, ...mysql_blogs];
        const normalized_blogs = normalizeMongoMsqlBlogs(blogs);
        return {
            status: 200,
            message: "All blogs fetched successfully",
            data: normalized_blogs
        }
    } catch (error) {
        console.error("Error in fetching all blogs", error);
        return {
            status: 500,
            message: "Internal Server Error",
            data: null
        }
    }
}

function normalizeMongoMsqlBlogs(blogs: any[]): any[] {
    return blogs.map((blog) => ({
        title: blog.title || blog.blogTitle,
        slug: blog.slug || blog.blogSlug,
        meta_description: blog.meta_description || blog.mtDesc,
        meta_keywords: blog.meta_keywords || blog.metaKeywords,
        created_at: blog.created_at || blog.createdAt,
        banner: blog.blog_image || blog.blogBanner,
        description: blog.description || blog.blogDescription,
    }));
}

export async function FIND_BLOGS_BY_CATEGORY(categorySlug: string) {
    try {
        if (!categorySlug) {
            return {
                status: 400,
                message: "Category Slug is required",
                data: null
            }
        }
        await connectMongoDB();

        // Fetch Category By Slug 
        let category;
        category = await RitzCats.findOne({ categorySlug });

        if (!category) {
            const [mysql_category] = await getDBPool().query<any[]>("SELECT * FROM categories WHERE link = ?", [categorySlug]);
            category = mysql_category[0];
        }

        const categoryId = category?._id || category?.id || null;
        if (!categoryId) {
            return {
                status: 404,
                message: "Category not found",
                data: null,
                category_meta_details: null
            }
        }

        const meta_details = {
            title: category?.categoryName || category?.name,
            description: category?.meta_description || category?.metaDescription,
            keywords: category?.meta_keywords || category?.metaKeywords,
        }
        const isValidObjectId =
            mongoose.Types.ObjectId.isValid(categoryId) &&
            String(new mongoose.Types.ObjectId(categoryId)) === categoryId;


        if (isValidObjectId) {
            const blogs = await RitzBlogModel.find({ blogCategoryId: new mongoose.Types.ObjectId(categoryId) }, {
                blogTitle: 1,
                blogBanner: 1,
                blogSlug: 1,
                blogDescription: 1,
                createdAt: 1,
                metaKeywords: 1,
                mtDesc: 1,
            }).sort({ createdAt: -1 }).lean();
            return {
                status: 200,
                message: "Blogs fetched successfully",
                data: blogs,
                category_meta_details: meta_details
            }
        }
        const [mysql_blogs] = await getDBPool().query<any[]>("SELECT blog_image, title, slug, description, created_at FROM blogs WHERE category_id = ? ORDER BY id DESC, created_at DESC", [categoryId]);
        return {
            status: 200,
            message: "Blogs fetched successfully",
            data: mysql_blogs,
            category_meta_details: meta_details
        }
    } catch (error) {
        console.error("Error in fetching blogs by category", error);
        return {
            status: 500,
            message: "Internal Server Error",
            data: null
        }
    }
}

export async function FIND_BLOGS_BY_KEYWORD(keyword: string) {
    try {
        if (!keyword) {
            return {
                status: 400,
                message: "Keyword is required",
                data: null
            }
        }
        await connectMongoDB();

        const [mysql_blogs] = await getDBPool().query<any[]>("SELECT blog_image, title, slug, description, created_at FROM blogs WHERE FIND_IN_SET(?, LOWER(REPLACE(meta_keywords, ', ', ','))) ORDER BY id DESC, created_at DESC", [keyword]);
        const mongo_blogs = await RitzBlogModel.find({ metaKeywords: { $regex: keyword, $options: "i" } }, {
            blogTitle: 1,
            blogBanner: 1,
            blogSlug: 1,
            blogDescription: 1,
            createdAt: 1,
            metaKeywords: 1,
            mtDesc: 1,
        }).sort({ createdAt: -1 }).lean();
        const blogs = [...mongo_blogs, ...mysql_blogs];
        const normalized_blogs = normalizeMongoMsqlBlogs(blogs);
        return {
            status: 200,
            message: "Blogs fetched successfully",
            data: normalized_blogs
        }
    } catch (error) {
        console.error("Error in fetching blogs by keyword", error);
        return {
            status: 500,
            message: "Internal Server Error",
            data: null
        }
    }
}