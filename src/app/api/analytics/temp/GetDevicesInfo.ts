import { connectMongoDB } from "@/lib/mongo/dbConntect";
import UserAnalyticModel from "@/models/User.Analytics.Schema";

export async function getAllDevicesInfo() {
  await connectMongoDB();
  const allDevices = await UserAnalyticModel.find(
    {},
    { userDevice: 1, _id: 0 }
  );
  let mobiles: string[] = [];
  let tablets: string[] = [];
  let desktops: string[] = [];
  if (allDevices.length > 0) {
    mobiles = allDevices.filter((dvs) => dvs.userDevice === "mobile");
    tablets = allDevices.filter((dvs) => dvs.userDevice === "tablet");
    desktops = allDevices.filter((dvs) => dvs.userDevice === "desktop");
  }
  const totalDevices = mobiles.length + tablets.length + desktops.length;
  const mobilesPercentage = (mobiles.length * 100) / totalDevices;
  const tabletsPercentage = (tablets.length * 100) / totalDevices;
  const desktopsDevices = (desktops.length * 100) / totalDevices;
  const devicesData = [
    {
      totalPhones: mobiles.length,
      overAllPercentage: mobilesPercentage,
    },
    {
      totalTablets: tablets.length,
      overAllPercentage: tabletsPercentage,
    },
    {
      totalDekstopDevices: desktops.length,
      overAllPercentage: desktopsDevices,
    },
  ];
  return devicesData;
}
