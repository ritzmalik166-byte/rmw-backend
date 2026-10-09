import { getDBPool } from "@/lib/db";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import { STATIC_PAGE_SLUGS, EXCLUDED_SITEMAP_PATHS } from "@/lib/sitemap/constants";
import RitzBlogModel from "@/models/Blog.Schema";
import { getPublicBlogFilter } from "@/lib/blogPublish";

type PostRecord = {
  slug?: string;
  blogSlug?: string;
  link?: string;
  updated_at?: string | Date;
  updatedAt?: string | Date;
  created_at?: string | Date;
  createdAt?: string | Date;
};

function safeToPath(slugOrPath: string | null | undefined): string | null {
  if (typeof slugOrPath !== "string") return null;
  const cleaned = slugOrPath.trim().replace(/^\/+|\/+$/g, "");
  if (!cleaned) return null;
  return `/${cleaned}`;
}

function pickBlogSlug(blog: PostRecord | null | undefined): string | null {
  if (!blog || typeof blog !== "object") return null;
  return blog.slug || blog.blogSlug || blog.link || null;
}

export function collectPostSitemapPaths(records: PostRecord[]): string[] {
  const uniquePaths = new Set<string>();

  for (const record of records) {
    const postPath = safeToPath(pickBlogSlug(record));
    if (!postPath) continue;

    const normalized = postPath.replace(/^\/+/, "");
    if (STATIC_PAGE_SLUGS.has(normalized)) continue;
    if (EXCLUDED_SITEMAP_PATHS.has(postPath)) continue;

    uniquePaths.add(postPath);
  }

  return [...uniquePaths];
}

async function fetchMongoBlogRecords(): Promise<PostRecord[]> {
  await connectMongoDB();
  const docs = await RitzBlogModel.find(
    getPublicBlogFilter(),
    { blogSlug: 1, createdAt: 1, updatedAt: 1 }
  )
    .lean()
    .exec();

  return Array.isArray(docs) ? (docs as PostRecord[]) : [];
}

async function fetchMySQLBlogRecords(
  whereClause: string
): Promise<PostRecord[]> {
  const db = getDBPool();
  const [rows] = await db.execute(
    `SELECT slug, created_at, updated_at FROM blogs ${whereClause} ORDER BY id DESC`
  );
  return Array.isArray(rows) ? (rows as PostRecord[]) : [];
}

export async function fetchAllPostSitemapRecords(): Promise<PostRecord[]> {
  const [mongoRecords, mysqlBlogs, caseStudies] = await Promise.all([
    fetchMongoBlogRecords(),
    fetchMySQLBlogRecords("WHERE category_id != 1 AND status = 1"),
    fetchMySQLBlogRecords("WHERE category_id = 1"),
  ]);

  return [...mongoRecords, ...mysqlBlogs, ...caseStudies];
}

export async function fetchPostSitemapPaths(): Promise<string[]> {
  const records = await fetchAllPostSitemapRecords();
  return collectPostSitemapPaths(records);
}
