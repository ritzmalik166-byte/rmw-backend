import UserAnalyticModel from "@/models/User.Analytics.Schema";
import { getFilterDate } from "../utils/ExtractDate";
import { doubleDuration, durationConverter } from "./GetAllUsers";
import { FilterQuery } from "mongoose";
import { getPercentage } from "../utils/GetPercentage";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
interface QUERYTYPE {
  createdAt?: Date;
  userTotalVisitTime: number;
}
interface GETDATA {
  userTotalVisitTime: number;
}
export async function getALlAverageVisitDuration(duration: string) {
  await connectMongoDB();
  const actualDuration = durationConverter(duration);
  const comparisonDuration = doubleDuration(duration);
  const filterDate = !isNaN(actualDuration) && actualDuration !== Infinity
    ? getFilterDate(actualDuration)
    : NaN;
  const comparionDate = !isNaN(comparisonDuration) && comparisonDuration !== Infinity
    ? getFilterDate(comparisonDuration)
    : NaN;

  const query: FilterQuery<QUERYTYPE> = {};
  if (!isNaN(actualDuration) && actualDuration !== Infinity && !isNaN(filterDate as any)) {
    query.createdAt = { $gte: filterDate };
    query.userTotalVisitTime = { $gte: 1 };
  }
  const query2: FilterQuery<QUERYTYPE> = {};
  if (!isNaN(comparisonDuration) && comparisonDuration !== Infinity && !isNaN(comparionDate as any)) {
    query2.createdAt = { $gte: comparionDate };
    query2.userTotalVisitTime = { $gte: 1 };
  }
  const actualData: GETDATA[] = await UserAnalyticModel.find(query, {
    userTotalVisitTime: 1,
    _id: 0,
  });
  const comparionData: GETDATA[] = await UserAnalyticModel.find(query2, {
    userTotalVisitTime: 1,
    _id: 0,
  });
  let totalSeconds = 0;
  if (actualData.length > 0) {
    actualData.forEach((item) => {
      totalSeconds += item.userTotalVisitTime;
    });
  }
  let totalSecondsForComparison = 0;

  if (comparionData.length > 0) {
    comparionData.forEach((item) => {
      totalSecondsForComparison += item.userTotalVisitTime;
    });
  }

  const spentTime: string = secondsConverter(totalSeconds);
  const comparionTime: string = secondsConverter(totalSecondsForComparison);
    console.log(
    "This is comparioson time in seconds ",
    comparionTime,
    "and this is spent time in seconds ",
    spentTime
  );

  const analyticalSpentTime = timePercentage(spentTime, comparionTime);
  return {
    usersSpentTime: spentTime,
    lastSpentTimeAvg: analyticalSpentTime,
  };
}
function timePercentage(spentTime: string, comparionTime: string) {
  let spentTimeInSeconds: number;
  let comparisonTimeInSeconds: number;

  // 🔹 convert spentTime to seconds
  const spentTimeIsInMinutes = Number(spentTime.split("Minutes")[0]);
  if (isNaN(spentTimeIsInMinutes)) {
    spentTimeInSeconds = Number(spentTime.split("Hours")[0]) * 60 * 60;
  } else {
    spentTimeInSeconds = spentTimeIsInMinutes * 60;
  }

  // 🔹 convert comparionTime to seconds
  const comparisionTimeIsInMinutes = Number(comparionTime.split("Minutes")[0]);
  if (isNaN(comparisionTimeIsInMinutes)) {
    comparisonTimeInSeconds = Number(comparionTime.split("Hours")[0]) * 60 * 60;
  } else {
    comparisonTimeInSeconds = comparisionTimeIsInMinutes * 60;
  }

  // 🔹 Prevent divide by zero
  if (comparisonTimeInSeconds === 0) {
    return "∞%"; // ya "0%" / "No Data"
  }

  const lastTimePercentage = getPercentage(
    comparisonTimeInSeconds,
    spentTimeInSeconds
  );
  return lastTimePercentage;
}


function secondsConverter(seconds: number): string {
  const minutes: number = parseFloat((seconds / 60).toFixed(2));
  if (minutes > 60) {
    const hour = minutresToHoursConverter(minutes);
    return hour + " Hours";
  }
  return minutes + " Minutes";
}
function minutresToHoursConverter(minutes: number) {
  const hours: number = parseFloat((minutes / 60).toFixed(2));
  return hours;
}
