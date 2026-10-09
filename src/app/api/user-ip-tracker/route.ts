import { getDBPool } from "@/lib/db";
import { getLocationFromIP } from "@/utils/ipLocation";
import { getNearestPostalInfo } from "@/utils/reverseGeoEnncode";
import { NextResponse } from "next/server";

// ./src/app/api/user-ip-tracker/route.ts
// import { NextResponse } from 'next/server';
import type { NextRequest } from "next/server";
interface USERTRACKEDDATA {
  user_city?: string | undefined;
  user_pinCode?: string | undefined;
  user_country?: string | undefined;
  user_place?: string | undefined;
  user_device?: string | undefined;
}

function getDeviceBrand(userAgent: string | null): string {
  if (!userAgent) return "Unknown";
  const ua = userAgent.toLowerCase();

  if (ua.includes("iphone")) return "iPhone";
  if (ua.includes("ipad")) return "iPad";
  if (ua.includes("samsung") || ua.includes("sm-")) return "Samsung";
  if (ua.includes("huawei")) return "Huawei";
  if (ua.includes("xiaomi") || ua.includes("redmi")) return "Xiaomi";
  if (ua.includes("oneplus")) return "OnePlus";
  if (ua.includes("pixel")) return "Google Pixel";
  if (ua.includes("android")) return "Android Device";
  if (ua.includes("macintosh")) return "Mac";
  if (ua.includes("windows")) return "Windows PC";

  return "Unknown";
}

export async function GET(req: NextRequest) {
  try {
    // Read IP from 'x-forwarded-for' header (standard in proxies/CDNs like Vercel)
    const forwarded = req.headers.get("x-forwarded-for");
    // Fallback IP if header is missing
    const ip = forwarded?.split(",")[0]?.trim() || "Unknown";
    const user_Info = await getLocationFromIP(ip);
    const user_data: USERTRACKEDDATA = {};
    const city = user_Info?.city;
    const country = user_Info?.country;

    const lat = user_Info?.latitude;
    const long = user_Info?.longitude;
    // console.log("User Latitude ", user_Info);
    const userAgent = req.headers.get("user-agent");
    const deviceBrand = getDeviceBrand(userAgent);
    user_data.user_device = deviceBrand;

    let userPinCode;
    let userPlace;
    let userDistData;
    if (lat && long) {
      userDistData = getNearestPostalInfo(lat, long, city);
      userPinCode = userDistData?.postalCode;
      userPlace = userDistData?.place;
    }
    user_data.user_city = city;
    user_data.user_pinCode = userPinCode;
    user_data.user_country = country;
    user_data.user_place = userPlace;

    // console.log(
    //   "This user data i am gathering from users ip address: ",
    //   user_data
    // );

    return NextResponse.json(
      { IP_ADDRESS: ip, userAddress: user_data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching IP:", error);
    return NextResponse.json({ error: "Failed to fetch IP" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user_ip } = await req.json();

    if (!user_ip) {
      return NextResponse.json(
        { message: "User IP is required!" },
        { status: 400 }
      );
    }

    const db = getDBPool();
    await db.execute("INSERT INTO users_ip (user_ip) VALUES (?)", [user_ip]);

    return NextResponse.json(
      { message: "User IP saved successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving user IP to database:", error);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}
