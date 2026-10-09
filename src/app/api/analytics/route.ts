import { NextRequest, NextResponse } from "next/server";
import { getAllUsersQuery } from "./temp/GetAllUsers";
import { GetAllSessions } from "./temp/GetAllSessions";
import { getAllBounceRate } from "./temp/GetAllBounce";
import { getALlAverageVisitDuration } from "./temp/GetAverageVistiDuration";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import { getAllDevicesInfo } from "./temp/GetDevicesInfo";
import { getUserTravelsPath } from "./temp/GetAllUserTravelsPath";
import { getUserRefferalSources } from "./temp/GetUserRefferalSources";
import { getUserSpendTimeOnEveryPage } from "./temp/GetUserPageActivities";
import { getAllSessionsWithCityWise } from "./temp/GetAllSessionCityWise";

type FILTER =
  | "Revisit"
  | "More Than 10 Sec"
  | "More Than 30 Sec"
  | "More Than 1 Min"
  | "All Sessions";

type TYPE =  "Total" | "Revisit" | "Unique" | "Organic";


type DURATION =
  | "All Time"
  | "Last 7 Days"
  | "Last 30 Days"
  | "Last 6 Month"
  | "Last 1 Year";

interface RequestBody {
  queryType: string;
  duration: DURATION;
  filter: FILTER;
  qType: TYPE;
}
type DevicesInfo = object[];
type TotalUsers = { totalUsers: string; performanceAvg: string };
type SessionCount = { totalSessions: string; performanceAvg: string };
type BounceRate = { totalBounceUsers: string; lastUsersBounceRate: string };
type AvgVisitDuration = { usersSpentTime: string; lastSpentTimeAvg: string };
type SessionAnalyticsByCity = {
  totalSessions: number;
  totalSessionsRaw: number;
  cityWise: Record<string, unknown>;
  cityWiseRaw: Record<string, unknown>;
};
type UserTravelPaths = Record<string, number>;
type UserReferralSources = Record<string, number>;
type UserPageActivity = Record<string, object>;

type AnalyticsData =
  | DevicesInfo
  | TotalUsers
  | SessionCount
  | BounceRate
  | AvgVisitDuration
  | SessionAnalyticsByCity
  | UserTravelPaths
  | UserReferralSources
  | UserPageActivity;

interface AnalyticsResponse {
  queryType: string;
  data: AnalyticsData;
}

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const body: RequestBody = await req.json();
    const { queryType, duration, filter, qType } = body;

    const responseData: AnalyticsResponse[] = [];

    // Devices info always included
    const devicesData = await getAllDevicesInfo();
    responseData.push({ queryType: "Devices Info", data: devicesData });

    const runQuery = async <T extends unknown[], R>(
      type: string,
      fn: (...args: T) => Promise<R>,
      ...args: T
    ) => {
      const data = await fn(...args);
      responseData.push({ queryType: type, data: data as AnalyticsData });
    };

    if (queryType === "All") {
      await runQuery("Total Users", getAllUsersQuery, duration);
      await runQuery("Session Count", GetAllSessions, duration, filter);
      await runQuery("Bounce Rate", getAllBounceRate, duration);
      await runQuery(
        "Avg. Visit Duration",
        getALlAverageVisitDuration,
        duration
      );
      await runQuery(
        "Session Analytics By City",
        getAllSessionsWithCityWise,
        duration,
        qType
      );
      await runQuery("User Travel Paths", getUserTravelsPath, duration);
      await runQuery("User Referral Sources", getUserRefferalSources, duration);
      await runQuery(
        "User Page Activity",
        getUserSpendTimeOnEveryPage,
        duration
      );
    } else {
      switch (queryType) {
        case "Total Users":
          await runQuery("Total Users", getAllUsersQuery, duration);
          break;
        case "Session Count":
          await runQuery("Session Count", GetAllSessions, duration, filter);
          break;
        case "Bounce Rate":
          await runQuery("Bounce Rate", getAllBounceRate, duration);
          break;
        case "Avg. Visit Duration":
          await runQuery(
            "Avg. Visit Duration",
            getALlAverageVisitDuration,
            duration
          );
          break;
        case "Session Analytics By City":
          await runQuery(
            "Session Analytics By City",
            getAllSessionsWithCityWise,
            duration,
            qType
          );
          break;
        case "User Travel Paths":
          await runQuery("User Travel Paths", getUserTravelsPath, duration);
          break;
        case "User Referral Sources":
          await runQuery(
            "User Referral Sources",
            getUserRefferalSources,
            duration
          );
          break;
        case "User Page Activity":
          await runQuery(
            "User Page Activity",
            getUserSpendTimeOnEveryPage,
            duration
          );
          break;
      }
    }

    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
