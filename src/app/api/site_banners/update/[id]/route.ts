import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import path from "path";
import fs from "fs";

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

async function deleteImage(imagePath: string) {
    try {
        if (!imagePath) {
            return;
        }
        
        // Extract filename from path (e.g., "/images/filename.jpg" -> "filename.jpg")
        const filename = imagePath.split('/').pop() || imagePath;
        
        // Skip if it's already a full URL (external image)
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return;
        }
        
        const imageDir = path.join(`${process.env.SERVER_IMG_PATH}`, "images");
        const filePath = path.join(imageDir, filename);
        
        // Check if file exists before deleting
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Deleted previous image: ${filename}`);
        }
    } catch (error) {
        // Log error but don't throw - we don't want to fail the update if image deletion fails
        console.error(`Error deleting image ${imagePath}:`, error);
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const pool = getDBPool();
        const [rows] = await pool.execute("SELECT * FROM rmw_banners WHERE id = ?", [id]) as any[];
        const existingBanner = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        
        if (!existingBanner) {
            return NextResponse.json({ error: "Site banner not found" }, { status: 404 });
        }

        const formData = await request.formData();
        const title = formData.get("title") as string;
        const paragraph = formData.get("paragraph") as string;
        const banner_location = formData.get("banner_location") as string;
        const mobile_banner = formData.get("mobile_banner") as File;
        const tab_banner = formData.get("tab_banner") as File;
        const dekstop_banner = formData.get("dekstop_banner") as File;

        // Get existing image paths
        const existingDesktopBanner = (existingBanner.desktop_banner || existingBanner.dekstop_banner || "") as string;
        const existingTabBanner = (existingBanner.tab_banner || "") as string;
        const existingMobileBanner = (existingBanner.mobile_banner || "") as string;

        let dekstop_banner_path = existingDesktopBanner;
        let tab_banner_path = existingTabBanner;
        let mobile_banner_path = existingMobileBanner;

        // Delete previous images if new ones are being uploaded
        if (dekstop_banner && dekstop_banner instanceof File) {
            // Delete old desktop banner
            await deleteImage(existingDesktopBanner);
            // Save new desktop banner
            dekstop_banner_path = await saveFileToUploads(dekstop_banner, `${Date.now()}-${dekstop_banner.name}`);
        }
        
        if (tab_banner && tab_banner instanceof File) {
            // Delete old tablet banner
            await deleteImage(existingTabBanner);
            // Save new tablet banner
            tab_banner_path = await saveFileToUploads(tab_banner, `${Date.now()}-${tab_banner.name}`);
        }
        
        if (mobile_banner && mobile_banner instanceof File) {
            // Delete old mobile banner
            await deleteImage(existingMobileBanner);
            // Save new mobile banner
            mobile_banner_path = await saveFileToUploads(mobile_banner, `${Date.now()}-${mobile_banner.name}`);
        }


        const result = await pool.execute("UPDATE rmw_banners SET title = ?, paragraph = ?, banner_location = ?, mobile_banner = ?, tab_banner = ?, desktop_banner = ? WHERE id = ?", [title, paragraph, banner_location, mobile_banner_path, tab_banner_path, dekstop_banner_path, id]);
        return NextResponse.json({ message: "Site banner updated successfully", result }, { status: 200 });
    } catch (error) {
        console.error("Error updating site banner:", error);
        return NextResponse.json({ error: "Failed to update site banner" }, { status: 500 });
    }

}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        if(!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }
        const pool = getDBPool();
        const [rows] = await pool.execute("SELECT * FROM rmw_banners WHERE id = ?", [id]) as any[];
        const existingBanner = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        if(!existingBanner) {
            return NextResponse.json({ error: "Site banner not found" }, { status: 404 });
        }
        await deleteImage(existingBanner.mobile_banner);
        await deleteImage(existingBanner.tab_banner);
        await deleteImage(existingBanner.desktop_banner);
        const result = await pool.execute("DELETE FROM rmw_banners WHERE id = ?", [id]);
        return NextResponse.json({ message: "Site banner deleted successfully", result }, { status: 200 });
    } catch (error) {
        console.error("Error deleting site banner:", error);
        return NextResponse.json({ error: "Failed to delete site banner" }, { status: 500 });
    }
}



export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const pool = getDBPool();
        if(!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }
        const [rows] = await pool.execute("SELECT * FROM rmw_banners WHERE id = ?", [id]) as any[];
        const existingBanner = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        if(!existingBanner) {
            return NextResponse.json({ error: "Site banner not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Site banner fetched successfully", existingBanner }, { status: 200 });
    } catch (error) {
        console.error("Error getting site banner:", error);
        return NextResponse.json({ error: "Failed to get site banner" }, { status: 500 });
    }
}