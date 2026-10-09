import UserAnalyticModel from "@/models/User.Analytics.Schema";
import { getFilterDate } from "../utils/ExtractDate";
import { durationConverter } from "./GetAllUsers";
import { FilterQuery } from "mongoose";
import { connectMongoDB } from "@/lib/mongo/dbConntect";

interface QUERY {
  createdAt?: Date;
}
interface OBJ {
  trafficSource: string;
}

export async function getUserRefferalSources(duration: string) {
  await connectMongoDB();

  const extractDay = durationConverter(duration);
  const filterDate = !isNaN(extractDay) && extractDay !== Infinity ? getFilterDate(extractDay) : NaN;

  const query: FilterQuery<QUERY> = {};
  if (!isNaN(extractDay) && extractDay !== Infinity) {
    query.createdAt = { $gte: filterDate };
  }

  const allData = await UserAnalyticModel.find(query, {
    trafficSource: 1,
    _id: 0,
  });

  const trafficsFrom: { [key: string]: number } = {};
  allData.forEach((obj: OBJ) => {
    const domain = analyzeSourceLink(obj.trafficSource);
    if (domain) {
      trafficsFrom[domain] = (trafficsFrom[domain] ?? 0) + 1;
    }
  });

  // 🔹 Sorting: highest to lowest traffic
  const sortedTraffic = Object.entries(trafficsFrom)
    .sort(([, a], [, b]) => b - a) // descending
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: number });

  return sortedTraffic;
}

// Domain extractor
function analyzeSourceLink(link: string) {
  if (!link || link.trim() === "") {
    return "Direct";
  }

  try {
    const url = new URL(link.startsWith("http") ? link : `https://${link}`);
    const hostname = url.hostname;
    const parts = hostname.split(".");
    if (parts.length >= 2) {
      return parts[parts.length - 2]; // main domain
    }
    return hostname;
  } catch (e) {
    console.log(e);
    return "Direct";
  }
}
