import UserAnalyticModel from "@/models/User.Analytics.Schema";
import { FilterQuery } from "mongoose";
import { getFilterDate } from "../utils/ExtractDate";
import { convertUsersToKMCr } from "../utils/CountHandler";
import { getPercentage } from "../utils/GetPercentage";
import { connectMongoDB } from "@/lib/mongo/dbConntect";

interface IUserAnalytic {
  createdAt?: Date;
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

export async function getAllUsersQuery(duration: string) {
  await connectMongoDB();
  const acDuration = durationConverter(duration);
  const filterDuration = !isNaN(acDuration) && acDuration !== Infinity ? getFilterDate(acDuration) : NaN;

  const dblDuration = doubleDuration(duration);
  const compDate = !isNaN(dblDuration) && dblDuration !== Infinity ? getFilterDate(dblDuration) : NaN;

  const query: FilterQuery<IUserAnalytic> = {};
  if (!isNaN(acDuration) && acDuration !== Infinity && !isNaN(filterDuration as any)) {
    query.createdAt = { $gte: filterDuration };
  }
  const query2: FilterQuery<IUserAnalytic> = {};
  if (!isNaN(dblDuration) && dblDuration !== Infinity && !isNaN(compDate as any)) {
    query2.createdAt = { $gte: compDate };
  }

  console.log('🔍 getAllUsersQuery Debug:', {
    duration,
    acDuration,
    filterDuration,
    query,
    dblDuration,
    compDate,
    query2
  });

  const data = await UserAnalyticModel.find(query);
  const comparionData = await UserAnalyticModel.find(query2);
  
  console.log('📊 Query results:', {
    actualDataCount: data.length,
    comparisonDataCount: comparionData.length
  });

  const totalUsers = convertUsersToKMCr(data.length);
  const performanceAvg = getPercentage(comparionData.length, data.length);
  return {
    totalUsers,
    performanceAvg,
  };
}
