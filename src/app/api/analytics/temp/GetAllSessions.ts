import UserAnalyticModel from "@/models/User.Analytics.Schema";
import { FilterQuery } from "mongoose";
import { getFilterDate } from "../utils/ExtractDate";
import { convertUsersToKMCr } from "../utils/CountHandler";
import { getPercentage } from "../utils/GetPercentage";
import { connectMongoDB } from "@/lib/mongo/dbConntect";

// Interface for UserAnalytic document (partial)
interface IUserAnalytic {
  createdAt?: Date;
  userRevisitCount?: number;
  userTotalVisitTime?: number;
}

export function durationConverter(duration: string): number {
  let dur;
  switch (duration) {
    case "All":
      dur = Infinity; // Special case for all time
      break;
    case "Last 7 Days":
      dur = 7;
      break;
    case "Last 30 Days":
      dur = 30;
      break;
    case "Last 6 Month":
      dur = 182;
      break;
    case "Last 12 Month":
      dur = 365;
      break;
    case "Last 1 Year":
      dur = 365;
      break;
    default:
      dur = NaN;
  }
  return dur;
}

export function doubleDuration(duration: string): number {
  let dur;
  switch (duration) {
    case "All":
      dur = Infinity; // Special case for all time
      break;
    case "Last 7 Days":
      dur = 14;
      break;
    case "Last 30 Days":
      dur = 61;
      break;
    case "Last 6 Month":
      dur = 365;
      break;
    case "Last 12 Month":
      dur = 730;
      break;
    case "Last 1 Year":
      dur = 730;
      break;
    default:
      dur = NaN;
  }
  return dur;
}

function timeConverter(sec: string): number | string {
  let dur;
  switch (sec) {
    case "All":
    case "All Sessions":
      dur = "All Sessions";
      break;
    case "Session Revisit":
      dur = "Revisit";
      break;
    case "More Than 10 Sec":
      dur = 10;
      break;
    case "More Than 30 Sec":
      dur = 30;
      break;
    case "More Than 1 Min":
    case "More Than 1 Min.":
      dur = 60;
      break;
    default:
      dur = "All Sessions";
  }
  return dur;
}
interface DATA {
  userRevisitCount: number;
}
export async function GetAllSessions(duration: string, dataFilter: string) {
    await connectMongoDB();
  const acDuration = durationConverter(duration);
  const filterDuration = !isNaN(acDuration) && acDuration !== Infinity ? getFilterDate(acDuration) : NaN;
  const dblDuration = doubleDuration(duration);
  const compDate = !isNaN(dblDuration) && dblDuration !== Infinity ? getFilterDate(dblDuration) : NaN;
  const seconds = timeConverter(dataFilter);
  const query: FilterQuery<IUserAnalytic> = {};
  let allSessions = false;
  if (!isNaN(acDuration) && acDuration !== Infinity && !isNaN(filterDuration as any)) {
    query.createdAt = { $gte: filterDuration };
  }

  console.log('🔍 GetAllSessions Debug:', {
    duration,
    dataFilter,
    acDuration,
    filterDuration,
    seconds,
    query
  });
  if (seconds === "Revisit") {
    query.userRevisitCount = { $gte: 2 };
  } else if (seconds === "All Sessions") {
    allSessions = true;
  } else if (typeof seconds === "number") {
    query.userTotalVisitTime = { $gte: seconds };
  }
  const query2: FilterQuery<IUserAnalytic> = {};
  if (!isNaN(dblDuration) && dblDuration !== Infinity && !isNaN(compDate as any)) {
    query2.createdAt = { $gte: compDate };
  }
  
  let sessionsCount = 0;
  let userData = [];
  
  if (allSessions) {
    const sessionData: DATA[] = await UserAnalyticModel.find(query, {
      userRevisitCount: 1,
      _id: 0,
    });
    if (sessionData) {
      sessionData.forEach((dt) => {
        sessionsCount += dt.userRevisitCount;
      });
    }
  } else {
    userData = await UserAnalyticModel.find(query);
  }
  
  let comparisionCount = 0;
  let comparionUserData = [];

  if (allSessions) {
    const sessionData: DATA[] = await UserAnalyticModel.find(query2, {
      userRevisitCount: 1,
      _id: 0,
    });
    if(sessionData) {
      sessionData.forEach((dt) => {
        comparisionCount += dt.userRevisitCount;
      });
    }
  } else {
    comparionUserData = await UserAnalyticModel.find(query2, {
      userRevisitCount: 1,
      _id: 0,
    });
  }

  const totalSessions = convertUsersToKMCr(
    userData.length > 0 ? userData.length : sessionsCount
  );
  const performanceAvg = getPercentage(
    comparionUserData.length > 0 ? comparionUserData.length : comparisionCount,
    userData.length > 0 ? userData.length : sessionsCount
  );
  return {
    totalSessions,
    performanceAvg,
  };
}