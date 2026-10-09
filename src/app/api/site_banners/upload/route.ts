import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import path from "path";
import fs from "fs";
import { DM_Serif_Display } from "next/font/google";


async function saveFileToUploads(file: File, filename: string) {
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

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const paragraph = formData.get('paragraph') as string;
        const banner_location = formData.get('banner_location') as string;
        const mobile_banner = formData.get('mobile_banner') as File;
        const tab_banner = formData.get('tab_banner') as File;
        const dekstop_banner = formData.get('dekstop_banner') as File;
        if (!title || !paragraph || !banner_location || !mobile_banner || !tab_banner || !dekstop_banner) {
            return NextResponse.json({
                message: "All fields are required",
            }, { status: 400 });
        }
        if (!mobile_banner.type.includes('image')) {
            return NextResponse.json({
                message: "Mobile banner must be an image",
            }, { status: 400 });
        }
        if (!tab_banner.type.includes('image')) {
            return NextResponse.json({
                message: "Tab banner must be an image",
            }, { status: 400 });
        }
        if (!dekstop_banner.type.includes('image')) {
            return NextResponse.json({
                message: "Desktop banner must be an image",
            }, { status: 400 });
        }
        const pool = getDBPool();

        const mobile_banner_path = await saveFileToUploads(mobile_banner, `${Date.now()}-${mobile_banner.name}`);
        const tab_banner_path = await saveFileToUploads(tab_banner, `${Date.now()}-${tab_banner.name}`);
        const dekstop_banner_path = await saveFileToUploads(dekstop_banner, `${Date.now()}-${dekstop_banner.name}`);


        const result = await pool.execute("INSERT INTO rmw_banners (title, paragraph, banner_location, mobile_banner, tab_banner, desktop_banner) VALUES (?, ?, ?, ?, ?, ?)", [title, paragraph, banner_location, mobile_banner_path, tab_banner_path, dekstop_banner_path]);
        return NextResponse.json({ message: "Site banners uploaded successfully" }, { status: 200 });

    } catch (error) {
        console.log("Error in site banners upload", error);
        return NextResponse.json({
            message: "Error in site banners upload",
            error: error,
        }, { status: 500 });
    }
}