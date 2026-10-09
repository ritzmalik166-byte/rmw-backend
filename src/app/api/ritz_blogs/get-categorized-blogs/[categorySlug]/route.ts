import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzBlogModel from "@/models/Blog.Schema";
import RitzCats from "@/models/RitzCats.Schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { categorySlug: string } }
) {
    try {
        await connectMongoDB();
        const categorySlugs = params.categorySlug;
        if (!categorySlugs) {
            return NextResponse.json({
                message: "Category Slug Not Found",
                success: false
            }, {
                status: 404
            });
        }
        const findCat = await RitzCats.findOne({
            categorySlug: categorySlugs
        });
        if (!findCat) {
            return NextResponse.json({ message: "Sorry Category Not Found, Please Try Again!", success: false }, {
                status: 404
            });
        }
        const categoryID = findCat?._id;
        const categorizedBlogs = await RitzBlogModel.find({
            blogCategoryId: categoryID
        });
        return NextResponse.json({
            message: "Categorized Blogs Fetched Successfully!",
            success: true,
            blogs: categorizedBlogs
        }, { status: 200 })

    } catch (error) {
        // console.log('====================================');
        console.log("There are some errors in findCategorized blog controller plz fix the bug first!", error);
        // console.log('====================================');
        return NextResponse.json({
            message: "Internal Server Error",
            success: false,
        } , {
            status: 500
        })
    }
}