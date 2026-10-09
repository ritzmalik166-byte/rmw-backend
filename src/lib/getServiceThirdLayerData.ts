import { getDBPool } from "@/lib/db";
import { resolveServiceSecondSlug } from "@/lib/serviceSlugAliases";
import { RowDataPacket } from "mysql2";

export async function getServiceThirdData(
  slug: string,
  parentServiceLink?: string,
) {
  try {
    const db = getDBPool();
    const resolvedSlug = parentServiceLink
      ? resolveServiceSecondSlug(parentServiceLink, slug)
      : slug;

    let service2Id: number;

    if (parentServiceLink) {
      const [services] = await db.query<RowDataPacket[]>(
        "SELECT id FROM services WHERE link = ? LIMIT 1",
        [parentServiceLink],
      );

      if (services.length === 0) return [];

      const [service2Rows] = await db.query<RowDataPacket[]>(
        "SELECT id FROM service_second WHERE link = ? AND service_id = ? LIMIT 1",
        [resolvedSlug, services[0].id],
      );

      if (service2Rows.length === 0) return [];

      service2Id = service2Rows[0].id;
    } else {
      const [service2Rows] = await db.query<RowDataPacket[]>(
        "SELECT id FROM service_second WHERE link = ?",
        [resolvedSlug],
      );

      if (service2Rows.length === 0) return [];

      service2Id = service2Rows[0].id;
    }

    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM service_third WHERE service2_id = ?",
      [service2Id],
    );

    if (rows.length === 0) return [];

    return rows;
  } catch (error) {
    console.error("Error in getServiceThirdData:", error);
    return [];
  }
}
