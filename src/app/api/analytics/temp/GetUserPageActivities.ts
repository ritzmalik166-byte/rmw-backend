import UserAnalyticModel from "@/models/User.Analytics.Schema";
import { getFilterDate } from "../utils/ExtractDate";
import { durationConverter } from "./GetAllUsers";
import { FilterQuery } from "mongoose";
import { connectMongoDB } from "@/lib/mongo/dbConntect";

interface QUERY {
  createdAt?: Date;
}

interface SUBOBJ {
  pageLink: string;
  timeCount: number; // seconds
}

interface OBJ {
  userVisitTimePerPage: SUBOBJ[];
}

interface FormattedTime {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
}

function formatTime(seconds: number): FormattedTime {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return {
    hours: hrs,
    minutes: mins,
    seconds: secs,
    formatted: `${hrs}h ${mins}m ${secs}s`,
  };
}

export async function getUserSpendTimeOnEveryPage(duration: string): Promise<Record<string, FormattedTime>> {
  await connectMongoDB();

  const extractDay = durationConverter(duration);
  const filterDate = !isNaN(extractDay) && extractDay !== Infinity ? getFilterDate(extractDay) : NaN;

  const query: FilterQuery<QUERY> = {};
  if (!isNaN(extractDay) && extractDay !== Infinity) {
    query.createdAt = { $gte: filterDate };
  }

  const data: OBJ[] = await UserAnalyticModel.find(query, {
    userVisitTimePerPage: 1,
    _id: 0,
  });

  // Total time per page
  const userSpentTimeOnPage: Record<string, number> = {};

  data.forEach((obj) => {
    obj.userVisitTimePerPage.forEach((doc) => {
      const link = doc.pageLink;
      const count = doc.timeCount; // seconds
      userSpentTimeOnPage[link] = (userSpentTimeOnPage[link] ?? 0) + count;
    });
  });

  // Format result
  const formattedResult: Record<string, FormattedTime> = {};
  Object.entries(userSpentTimeOnPage).forEach(([link, totalSec]) => {
    formattedResult[link] = formatTime(totalSec);
  });

  return formattedResult;
}
