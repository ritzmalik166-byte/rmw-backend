import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";

export const GET = async () => {
  const db = getDBPool();

  try {
    // Get all main services
    const [services] = await db.query(
      "SELECT id, title AS name, link FROM services"
    );

    // For each service, get its second-layer entries
    const servicesWithSub = await Promise.all(
      (services as { id: number; name: string; link: string }[]).map(
        async (service) => {
          const [sub] = await db.query(
            "SELECT title AS name, link FROM service_second WHERE service_id = ?",
            [service.id]
          );

          return {
            name: service.name,
            link: `/services/${service.link}`,
            sub: (sub as { name: string; link: string }[]).map((item) => ({
              name: item.name,
              link: `/services/${service.link}/${item.link}`,
            })),
          };
        }
      )
    );

    return NextResponse.json(servicesWithSub);
  } catch (error) {
    console.error("Error fetching services menu:", error);
    return NextResponse.json(
      { error: "Failed to fetch services menu" },
      { status: 500 }
    );
  }
};
