import { connectMongoDB } from "@/lib/mongo/dbConntect";
import UserAnalyticModel from "@/models/User.Analytics.Schema";
import { NextResponse } from "next/server";

interface OBJ {
  timeCount: number;
  pageLink: string;
}

export async function POST(req: Request) {
  try {
    await connectMongoDB();

    const text = await req.text(); // read raw
    const data = text ? JSON.parse(text) : {};
    if (!data) {
      return NextResponse.json(
        { message: "Data not found!", succeess: false },
        { status: 500 }
      );
    }
    let userDevice = "desktop";
    const userAgent = navigator.userAgent.toLowerCase();

    // Mobile detection
    if (/android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
      userDevice = "mobile";
    }
    // Tablet detection
    else if (
      /ipad|tablet|kindle|playbook|silk/i.test(userAgent) ||
      (/android/i.test(userAgent) && !/mobile/i.test(userAgent))
    ) {
      userDevice = "tablet";
    }

    const { user, userVisitTimePerPage, trafficSource, userAddress } = data;
    

    let userTotalVisitTime = 0;
    let isUserBounce = true;
    userVisitTimePerPage.forEach((ele: OBJ) => {
      userTotalVisitTime += ele.timeCount;
    });
    if (userTotalVisitTime >= 10) {
      isUserBounce = false;
    }
   

     await UserAnalyticModel.create({
      user,
      userAddress,
      isUserBounce,
      userTotalVisitTime,
      userRevisitCount: 1,
      userDevice,
      trafficSource,
      userVisitTimePerPage,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error in create-user API:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
