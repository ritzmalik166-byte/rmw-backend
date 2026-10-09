import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";

type ThirdLayerCard = RowDataPacket & {
  title: true;
  description: true;
  image_url: true;
};

export async function GET(
  req: NextRequest,
  {
    params,
  }: { params: { servicesSecondLayer: string; servicesThirdLayer: string } }
) {
  try {
    const { servicesSecondLayer, servicesThirdLayer } = await params;

    if (!servicesSecondLayer || !servicesThirdLayer) {
      return NextResponse.json(
        { error: "Missing route parameters" },
        { status: 400 }
      );
    }

    const pool = await getDBPool();

    const [services] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM services WHERE link = ? LIMIT 1",
      [servicesSecondLayer]
    );

    if (services.length === 0) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const serviceId = services[0].id;

    const [serviceSeconds] = await pool.query<RowDataPacket[]>(
      `SELECT id, s3heading1, s3para, s3endtag 
       FROM service_second 
       WHERE link = ? AND service_id = ? 
       LIMIT 1`,
      [servicesThirdLayer, serviceId]
    );

    if (serviceSeconds.length === 0) {
      return NextResponse.json(
        { error: "Service second layer not found" },
        { status: 404 }
      );
    }

    const serviceSecond = serviceSeconds[0];
    const serviceSecondId = serviceSecond.id;

    const [thirdLayerCards] = await pool.query<ThirdLayerCard[]>(
      "SELECT id, title, description, image_url FROM service_third WHERE service2_id = ?",
      [serviceSecondId]
    );

    return NextResponse.json({
      s3heading1: serviceSecond.s3heading1,
      s3para: serviceSecond.s3para,
      s3endtag: serviceSecond.s3endtag,
      cards: thirdLayerCards,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}