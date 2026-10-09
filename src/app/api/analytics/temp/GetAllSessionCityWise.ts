import UserAnalyticModel from "@/models/User.Analytics.Schema";
import { getFilterDate } from "../utils/ExtractDate";
import { durationConverter } from "./GetAllUsers";
import { FilterQuery } from "mongoose";
import { connectMongoDB } from "@/lib/mongo/dbConntect";

interface QTYPE {
  userRevisitCount?: number;
  trafficSource?: string;
  createdAt: Date;
}

type TYPE = "Total" | "Revisit" | "Unique" | "Organic";

interface DATA {
  user: string;
  userAddress: {
    userCity: string;
  };
  userRevisitCount: number;
}

// Type for aggregate result when queryType === "Unique"
interface UniqueSession {
  _id: string;        // user id
  userCity: string;   // first city
  count: number;      // always 1
}

function formatCount(num: number): string | number {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1).replace(/\.0$/, "") + "Cr";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
}

export async function getAllSessionsWithCityWise(
  duration: string,
  queryType: TYPE
) {
  await connectMongoDB();

  const filterDuration = durationConverter(duration);
  const filterDate = !isNaN(filterDuration) && filterDuration !== Infinity
    ? getFilterDate(filterDuration)
    : NaN;

  const query: FilterQuery<QTYPE> = {};
  if (!isNaN(filterDuration) && filterDuration !== Infinity) {
    query.createdAt = { $gte: filterDate };
  }

  if (queryType === "Revisit") {
    query.userRevisitCount = { $gte: 2 };
  } else if (queryType === "Organic") {
    query.trafficSource = { $regex: "google\\.com", $options: "i" };
  }

  // Separate variables for type-safe handling
  let uniqueData: UniqueSession[] = [];
  let normalData: DATA[] = [];

  if (queryType === "Unique") {
    uniqueData = await UserAnalyticModel.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$user",
          userCity: { $first: "$userAddress.userCity" },
          count: { $sum: 1 },
        },
      },
    ]);
  } else {
    normalData = await UserAnalyticModel.find(query).select(
      "user userAddress.userCity userRevisitCount"
    );
  }

  // City wise aggregation (keep raw counts as number)
  const cityWithSessions: Record<string, number> = {};

  if (queryType === "Unique") {
    for (const item of uniqueData) {
      const city = item.userCity || "Unknown";
      cityWithSessions[city] = (cityWithSessions[city] || 0) + 1;
    }
  } else {
    for (const item of normalData) {
      const city = item.userAddress?.userCity || "Unknown";
      cityWithSessions[city] = (cityWithSessions[city] || 0) + 1;
    }
  }

  const totalSessions = Object.values(cityWithSessions).reduce(
    (acc, curr) => acc + curr,
    0
  );

  // 🔹 Final response: formatted + raw
  const formattedCityWise: Record<string, string | number> = {};
  for (const [city, count] of Object.entries(cityWithSessions)) {
    formattedCityWise[city] = formatCount(count);
  }

  return {
    totalSessions: formatCount(totalSessions),
    totalSessionsRaw: totalSessions,
    cityWise: formattedCityWise,
    cityWiseRaw: cityWithSessions,
  };
}
