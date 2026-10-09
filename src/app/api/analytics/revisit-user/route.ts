import { connectMongoDB } from "@/lib/mongo/dbConntect";
// import AnalyticModel from "@/models/Analytics.Schema";
import UserAnalyticModel from "@/models/User.Analytics.Schema";
import { NextRequest } from "next/server";

interface OBJ {
  timeCount: number;
  pageLink: string;
}

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    console.log("API HIT");

    const txt = await req.text();
    const data = txt ? JSON.parse(txt) : {};

    const { user, userVisitTimePerPage = [] } = data;
    // console.log(user, userVisitTimePerPage);
    const findedUser = await UserAnalyticModel.findOne({ user });
    if (!findedUser) {
      // console.log("User Not Found, ", user);
      return new Response(JSON.stringify({ success: false }), { status: 404 });
    }

    // total time for this visit
    let count = 0;
    (userVisitTimePerPage as OBJ[]).forEach((ele) => {
      count += Number(ele.timeCount || 0);
    });

    // bounce logic (>= 10 sec = not a bounce)
    const isUserBounce = count < 10;

    const updatedUser = await UserAnalyticModel.findByIdAndUpdate(
      findedUser._id,
      {
        $push: { userVisitTimePerPage: { $each: userVisitTimePerPage } },
        $inc: { userRevisitCount: 1, userTotalVisitTime: count },
        $set: { isUserBounce },
      }
    );
    // console.log(updatedUser);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Internal Server Errors!", error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
