import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";

type SecondLayerCard = RowDataPacket & {
  id: number;
  title: string;
  description: string;
  link: string;
  service_id: number;
};

export async function GET(
  req: NextRequest,
  context: { params?: { servicesSecondLayer?: string } }
) {
  try {
    const { servicesSecondLayer } = await Promise.resolve(context.params || {});

    if (!servicesSecondLayer) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const pool = await getDBPool();

    // 1. Get service matching the slug
    const [services] = await pool.query<RowDataPacket[]>(
      "SELECT id, s2heading, s2para, s2endtag, img1, img2 FROM services WHERE link = ?",
      [servicesSecondLayer]
    );

    if (services.length === 0) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const service = services[0];

    // 2. Get all second-layer cards related to the service_id
    const [cards] = await pool.query<SecondLayerCard[]>(
      "SELECT id, title, description, link FROM service_second WHERE service_id = ?",
      [service.id]
    );

    return NextResponse.json({
      s2heading: service.s2heading,
      s2para: service.s2para,
      s2endtag: service.s2endtag,
      img1: service.img1,
      img2: service.img2,
      cards,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
