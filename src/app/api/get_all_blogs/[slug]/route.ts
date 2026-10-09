import { getDBPool } from "@/lib/db";
import redisClient from "@/lib/redis_server";
import RitzBlogModel from "@/models/Blog.Schema";
import { getPublicBlogFilter } from "@/lib/blogPublish";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import { RowDataPacket } from "mysql2";
import mongoose, { Types } from "mongoose";
import RitzCatsModel from "@/models/RitzCats.Schema";
import { toPlainObject } from "@/lib/toPlainObject";

type BlogWithCategoryId = { blogCategoryId?: string; category_id?: number };

function getBlogCategoryId(b: unknown): string {
    const x = b as BlogWithCategoryId;
    const id = x?.category_id ?? x?.blogCategoryId;
    return id != null ? String(id) : "";
}

function normalizeSlug(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}



export async function get_single_blog(slug: string) {
    try {
        if (!slug) {
            return [{ message: "Slug is required", error: null }, { status: 400 }];
        }
        const all_categories = await get_all_blogs_categories();
        const cached_blog = await redisClient.get(`cached_blog_${slug}`);
        const cached_category = await redisClient.get(`cached_blog_category_${slug}`);
        const latest_3_blogs = await get_latest_3_blogs();
        if (cached_blog && cached_category) {
            const blog_category_id = getBlogCategoryId(JSON.parse(cached_blog));
            const related_blogs = await GET_4_RELATED_BLOGS(blog_category_id);
            return [{ blog: JSON.parse(cached_blog), categoryName: cached_category, all_categories: all_categories.data, latest_3_blogs: latest_3_blogs.data, related_blogs: related_blogs.data }, { status: 200 }];
        }
        const blog = await getBlogBySlug(slug);
        if (blog.status === 200) {
            await redisClient.set(`cached_blog_${slug}`, JSON.stringify(blog.data), { EX: 60 * 1 });
            await redisClient.set(`cached_blog_category_${slug}`, JSON.stringify(blog.categoryName), { EX: 60 * 1 });
            const related_blogs = await GET_4_RELATED_BLOGS(getBlogCategoryId(blog.data));

            return [{
                blog: toPlainObject(blog.data),
                categoryName: blog.categoryName,
                all_categories: toPlainObject(all_categories.data),
                latest_3_blogs: toPlainObject(latest_3_blogs.data),
                related_blogs: toPlainObject(related_blogs.data),
            },
            { status: 200 }];
        }
        return [{ message: blog.message, error: null }, { status: blog.status }];
    } catch (error) {
        console.error("Error in fetching blog by slug", error);
        return { message: "Internal Server Error", error: null, status: 500 };
    }
}
async function getBlogBySlug(slug: string) {
    try {
        await connectMongoDB();
        let blog;
        let id;
        let categoryName = "Not Found";
        const decodedSlug = decodeURIComponent(slug);
        const normalizedSlug = normalizeSlug(decodedSlug);
        const slugCandidates = Array.from(new Set([decodedSlug, normalizedSlug].filter(Boolean)));

        blog = await RitzBlogModel.findOne({ blogSlug: { $in: slugCandidates } }).lean();

        if (!blog) {
            const db = getDBPool();
            const [rows] = await db.execute<RowDataPacket[]>(
                "SELECT * FROM blogs WHERE slug IN (?, ?) LIMIT 1",
                [decodedSlug, normalizedSlug]
            );
            blog = rows[0];
            id = getBlogCategoryId(blog);
        }
        if (blog) {
            id = id ?? getBlogCategoryId(blog);
            const category = await get_blog_category(id);
            if (category.status === 200) {
                categoryName = category.data as string;
            }
            return {
                status: 200,
                message: "Blog fetched successfully",
                data: blog,
                categoryName: categoryName
            }
        } else {
            return {
                status: 404,
                message: "Blog not found",
                data: null
            }
        }
    } catch (error) {
        console.error("Error in fetching blog by slug", error);
        return {
            status: 500,
            message: "Internal Server Error",
        }
    }
}

async function get_blog_category(id: string) {
    try {
        await connectMongoDB();

        let name;
        if (!id) {
            return {
                status: 400,
                message: "Category ID is required",
                data: null
            }
        }
        let category;
        if (mongoose.Types.ObjectId.isValid(id)) {
            category = await RitzCatsModel.findOne({
                _id: new mongoose.Types.ObjectId(id)
            });
            name = category?.categoryName as string;
        }

        if (!category) {
            let [rows] = await getDBPool().execute<RowDataPacket[]>(
                "SELECT * FROM categories WHERE id = ?",
                [id]
            );
            category = rows[0];
            name = category.name as string;
        }

        if (category) {
            return {
                status: 200,
                message: "Category fetched successfully",
                data: name
            }
        }
        return {
            status: 404,
            message: "Category not found",
            data: null
        }

    } catch (error) {
        console.error("Error in fetching blog category", error);
        return {
            status: 500,
            message: "Internal Server Error",
            data: null
        }
    }
}

async function get_all_blogs_categories() {
    try {
        await connectMongoDB();
        const cached_categories = await redisClient.get(`cached_categories`);
        if (cached_categories) {
            return {
                status: 200,
                message: "Categories fetched successfully",
                data: JSON.parse(cached_categories)
            }
        }
        const mongo_categories = await RitzCatsModel.find({}).lean();
        const [mysql_categories] = await getDBPool().query<RowDataPacket[]>("SELECT * FROM categories");

        let mongo_msql_cached_blogs = [];
        mongo_msql_cached_blogs = JSON.parse(await redisClient.get(`mongo_msql_cached_blogs`) || "[]");

        if (!mongo_msql_cached_blogs || mongo_msql_cached_blogs.length === 0) {
            const mongo_blogs = await RitzBlogModel.find({}).lean();
            const [mysql_blogs] = await getDBPool().query<RowDataPacket[]>("SELECT * FROM blogs");
            mongo_msql_cached_blogs = [...mongo_blogs, ...mysql_blogs];
            await redisClient.set(`mongo_msql_cached_blogs`, JSON.stringify(mongo_msql_cached_blogs), { EX: 60 * 1 });
        }

        const categories = [{
            mongo_categories: mongo_categories.map((category) => ({
                id: category._id,
                name: category.categoryName,
                total_blogs: mongo_msql_cached_blogs.filter((blog: any) => blog.category_id === category._id).length,
                link: category.categorySlug
            })),
            mysql_categories: mysql_categories.map((category) => ({
                id: category.id,
                name: category.name,
                total_blogs: mongo_msql_cached_blogs.filter((blog: any) => blog.category_id === category.id).length,
                link: category.link
            }))
        }]
        if (categories.length > 0) {
            await redisClient.set(`cached_categories`, JSON.stringify(categories), { EX: 60 * 1 });
            return {
                status: 200,
                message: "Categories fetched successfully",
                data: categories
            }
        }
        return {
            status: 404,
            message: "Categories not found",
            data: null
        }
    } catch (error) {
        console.error("Error in fetching all blogs categories", error);
        return {
            status: 500,
            message: "Internal Server Error",
            data: null
        }
    }
}


export async function get_latest_3_blogs() {
    try {
        await connectMongoDB();
        const cached_latest_3_blogs = await redisClient.get(`cached_latest_3_blogs`);
        if (cached_latest_3_blogs) {
            return {
                status: 200,
                message: "Latest 3 blogs fetched successfully",
                data: JSON.parse(cached_latest_3_blogs)
            }
        }
        const publicFilter = getPublicBlogFilter();
        const latest_3_blogs = await RitzBlogModel.find(publicFilter, {
            blogTitle: 1,
            blogBanner: 1,
            blogSlug: 1,
            createdAt: 1,
            _id: 0,
            metaKeywords: 1,
            mtDesc: 1,
        }).sort({ createdAt: -1 }).limit(3).lean();
        await redisClient.set(`cached_latest_3_blogs`, JSON.stringify(latest_3_blogs), { EX: 60 * 1 });
        return {
            status: 200,
            message: "Latest 3 blogs fetched successfully",
            data: latest_3_blogs
        }
    } catch (error) {
        console.error("Error in fetching latest 3 blogs", error);
        return {
            status: 500,
            message: "Internal Server Error",
            data: null
        }
    }
}

async function GET_4_RELATED_BLOGS(category_id: string) {
    try {
        await connectMongoDB();
        const cached_4_related_blogs = await redisClient.get(`cached_4_related_blogs_${category_id}`);
        if (cached_4_related_blogs) {
            return {
                status: 200,
                message: "4 related blogs fetched successfully",
                data: JSON.parse(cached_4_related_blogs)
            }
        }
        let related_blogs = [];

        const [rows] = await getDBPool().query<RowDataPacket[]>("SELECT * FROM blogs WHERE category_id = ? AND status = 1 ORDER BY created_at DESC LIMIT 4", [category_id]);
        related_blogs = rows;
        if ((!related_blogs || related_blogs.length === 0) && mongoose.Types.ObjectId.isValid(category_id)) {
            const publicFilter = getPublicBlogFilter();

            related_blogs = await RitzBlogModel.find({ blogCategoryId: new mongoose.Types.ObjectId(category_id), ...publicFilter }, {
                blogTitle: 1,
                blogBanner: 1,
                blogSlug: 1,
                createdAt: 1,
                _id: 0,
                metaKeywords: 1,
                mtDesc: 1,
            }).sort({ createdAt: -1 }).limit(4).lean();
        }
        if (related_blogs.length > 0) {
            await redisClient.set(`cached_4_related_blogs_${category_id}`, JSON.stringify(related_blogs), { EX: 60 * 1 });
            return {
                status: 200,
                message: "4 related blogs fetched successfully",
                data: related_blogs
            }
        }
        return {
            status: 404,
            message: "4 related blogs not found",
            data: null
        }
    } catch (error) {
        console.error("Error in fetching 4 related blogs", error);
        return {
            status: 500,
            message: "Internal Server Error",
            data: null
        }
    }
}
