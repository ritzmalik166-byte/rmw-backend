// This is Tracking Script Controller ::
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import TrackModel from "@/models/Analytics.Schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { name, email, phoneNumber, pinCode, city, deviceName, gender, trafficSource, revisit, perPageTrack, deviceIPAddress } = await req.json();
        const existingUser = await TrackModel.findOne({ deviceIPAddress });
        if (!existingUser) {
            await TrackModel.create({ name, email, phoneNumber, pinCode, city, deviceName, gender, trafficSource, revisit: revisit + 1, perPageTrack });
            return NextResponse.json({ message: "Welcome To Our Site", success: true }, { status: 201 });
        }
        await TrackModel.findByIdAndUpdate(existingUser._id, {
            $push: { perPageTrack: { $each: { perPageTrack } } },
            $inc: { revisit: 1 },
            trafficSource
        });
        return NextResponse.json({ message: "Welcome Back To Our Site", success: true }, { status: 201 });
    } catch (error) {
        console.log('====================================');
        console.log("There are some errors in your track user data from website controller ", error);
        console.log('====================================');
        return NextResponse.json({ message: "Internal Server Error.", success: false }, { status: 500 });
    }
}