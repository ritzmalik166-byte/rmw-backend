import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzCats from "@/models/RitzCats.Schema";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongoDB();
        const allCategories = await RitzCats.find({});
        if (allCategories.length === 0 || !allCategories) {
            return NextResponse.json({
                message: "There are no categories found in data base please try again latter!",
                success: false,
            }, {
                status: 500,
            });
        }
        return NextResponse.json({
            message:"All categories has been fetched successfully!",
            success:true,
            allCategories
        }, {
            status:200,
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