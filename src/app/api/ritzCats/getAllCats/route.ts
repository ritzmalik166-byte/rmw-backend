import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzCats from "@/models/RitzCats.Schema";
import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db"
import { RowDataPacket } from "mysql2";
import { Types } from "mongoose";
interface Category extends RowDataPacket {
    id: number,
    name: string,
    link: string
}
interface MongoObject {
    _id: Types.ObjectId | number,
    categoryName: string,
    categorySlug: string
}
interface CategoryDocument {
    _id: Types.ObjectId;
    categoryName: string;
    categorySlug: string;
}

export async function GET() {
    try {
        await connectMongoDB();
        const allCategories = await RitzCats.find<CategoryDocument>({});
        const pool = getDBPool();
        const [rows] = await pool.execute<Category[]>(
            "SELECT * FROM categories WHERE name = ?",
            ["Case Study"]
        );
        let data = rows[0];
        const cast_study = {
            _id: data.id,
            categoryName: data.name,
            categorySlug: data.link
        }

        if (allCategories.length === 0 || !allCategories) {
            return NextResponse.json({
                message: "There are no categories found in data base please try again latter!",
                success: false,
            }, {
                status: 500,
            });
        }
        const categories: MongoObject[] = allCategories.map<MongoObject>((category) => ({
            _id: category._id,
            categoryName: category.categoryName,
            categorySlug: category.categorySlug
        }));

        if (cast_study) categories.push(cast_study);
        
        return NextResponse.json({
            message: "All categories has been fetched successfully!",
            success: true,
            categories
        }, {
            status: 200,
        })
    } catch (error) {
        // console.log('====================================');
        console.log("There are some errors in get all categories controller plz fix the bug first ", error);
        // console.log('====================================');
        return NextResponse.json({
            message: "Internal Server Error",
            success: false,
        }, {
            status: 500,
        })
    }
}