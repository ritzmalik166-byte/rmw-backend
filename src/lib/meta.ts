// lib/meta.ts
import { getDBPool } from "@/lib/db";
import type { RowDataPacket, FieldPacket } from "mysql2";

export type SlugType =
  | { slug: string }
  | { secondPage: string; thirdPage: string };

interface MetaDataRow extends RowDataPacket {
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

interface BlogRow extends RowDataPacket {
  slug: string;
}

interface CategoryRow extends RowDataPacket {
  link: string;
}

interface ServiceRow extends RowDataPacket {
  link: string;
}

interface ServiceThirdRow extends RowDataPacket {
  secondPage: string;
  thirdPage: string;
}

// ✅ Get metadata by slug or name
// For serviceThird, pass parentServiceLink (services.link / URL second segment) so meta is resolved via service_second.service_id.
export async function getMetaOrThrow(
  slug: string,
  type: "blog" | "category" | "serviceSecond" | "serviceThird",
  parentServiceLink?: string
): Promise<{
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}> {
  const pool = await getDBPool();
  let query = "";
  let queryParams: string[] = [slug];

  if (type === "blog") {
    query =
      "SELECT meta_title, meta_description, meta_keywords FROM blogs WHERE slug = ? LIMIT 1";
  } else if (type === "category") {
    query =
      "SELECT meta_title, meta_description, meta_keywords FROM categories WHERE link = ? LIMIT 1";
  } else if (type === "serviceSecond") {
    query =
      "SELECT meta_title, meta_description, meta_keywords FROM services WHERE link = ? LIMIT 1";
  } else if (type === "serviceThird") {
    if (!parentServiceLink) {
      throw new Error(
        "getMetaOrThrow(serviceThird): parentServiceLink (secondPage) is required"
      );
    }
    query = `
      SELECT ss.meta_title, ss.meta_description, ss.meta_keywords
      FROM service_second ss
      WHERE ss.service_id = (SELECT id FROM services WHERE link = ? LIMIT 1)
        AND ss.link = ?
      LIMIT 1`;
    queryParams = [parentServiceLink, slug];
  }

  const [rows]: [MetaDataRow[], FieldPacket[]] = await pool.query(
    query,
    queryParams
  );
  const data = rows[0];
  if (!data) throw new Error("NOT_FOUND");
  return data;
}

// ✅ Get all slugs/links based on type for static generation.
// Returns [] when DB is unreachable so `next build` is not blocked.
export async function getAllSlugs(
  type: "blog" | "category" | "serviceSecond" | "serviceThird"
): Promise<SlugType[]> {
  try {
    const pool = await getDBPool();
    let query = "";

    if (type === "blog") {
      query = "SELECT slug FROM blogs";
      const [rows]: [BlogRow[], FieldPacket[]] = await pool.query(query);
      return rows.map((row) => ({ slug: row.slug }));
    }

    if (type === "category") {
      query = "SELECT link FROM categories";
      const [rows]: [CategoryRow[], FieldPacket[]] = await pool.query(query);
      return rows.map((row) => ({ slug: row.link }));
    }

    if (type === "serviceSecond") {
      query = "SELECT link FROM services";
      const [rows]: [ServiceRow[], FieldPacket[]] = await pool.query(query);
      return rows.map((row) => ({ slug: row.link }));
    }

    if (type === "serviceThird") {
      query = `
        SELECT service_second.link AS thirdPage, services.link AS secondPage
        FROM service_second
        JOIN services ON service_second.service_id = services.id
      `;
      const [rows]: [ServiceThirdRow[], FieldPacket[]] = await pool.query(query);
      return rows.map((row) => ({
        secondPage: row.secondPage,
        thirdPage: row.thirdPage,
      }));
    }

    return [];
  } catch (error) {
    console.warn(`[getAllSlugs] Falling back to [] for "${type}":`, error);
    return [];
  }
}
