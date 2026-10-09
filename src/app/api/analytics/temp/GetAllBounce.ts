import UserAnalyticModel from "@/models/User.Analytics.Schema";
import { getFilterDate } from "../utils/ExtractDate";
import { doubleDuration, durationConverter } from "./GetAllUsers";
import { FilterQuery } from "mongoose";
import { convertUsersToKMCr } from "../utils/CountHandler";
import { getPercentage } from "../utils/GetPercentage";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
interface QUERYTYPE {
  createdAt?: Date;
}

export async function getAllBounceRate(duration: string) {
  await connectMongoDB();
  const actualDuration = durationConverter(duration);
  const dblDuration = doubleDuration(duration);
  const filterDate = !isNaN(actualDuration) && actualDuration !== Infinity
    ? getFilterDate(actualDuration)
    : NaN;
  const analyzeDate = !isNaN(dblDuration) && dblDuration !== Infinity ? getFilterDate(dblDuration) : NaN;

  const query: FilterQuery<QUERYTYPE> = {};
  if (!isNaN(actualDuration) && actualDuration !== Infinity && !isNaN(filterDate as any)) {
    query.createdAt = { $gte: filterDate };
    query.isUserBounce = true;
  }
  const query2: FilterQuery<QUERYTYPE> = {};
  if (!isNaN(dblDuration) && dblDuration !== Infinity && !isNaN(analyzeDate as any)) {
    query2.createdAt = { $gte: analyzeDate };
    query.isUserBounce = true;
  }
  const actualData = await UserAnalyticModel.find(query);
  const analyticalData = await UserAnalyticModel.find(query2);

  const totalBounceUsers = convertUsersToKMCr(actualData.length);
  const lastUsersBounceRate = getPercentage(
    analyticalData.length,
    actualData.length
  );
  console.log(analyticalData.length,
    actualData.length);
  
  return {
    totalBounceUsers,
    lastUsersBounceRate,
  };
}