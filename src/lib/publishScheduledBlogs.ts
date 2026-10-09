import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzBlogModel from "@/models/Blog.Schema";
import { revalidateBlogListingPages } from "@/lib/revalidateBlogs";

export type PublishedScheduledBlog = {
  id: string;
  title: string;
  slug: string;
  scheduledAt: Date | string | null | undefined;
};

export async function publishScheduledBlogs(now = new Date()) {
  await connectMongoDB();

  const dueBlogs = await RitzBlogModel.find({
    publishStatus: "scheduled",
    scheduledAt: { $lte: now },
  })
    .select("_id blogTitle blogSlug scheduledAt")
    .lean();

  if (!dueBlogs.length) {
    return {
      publishedCount: 0,
      published: [] as PublishedScheduledBlog[],
      checkedAt: now.toISOString(),
    };
  }

  const ids = dueBlogs.map((blog) => blog._id);

  await RitzBlogModel.updateMany(
    { _id: { $in: ids } },
    {
      $set: {
        publishStatus: "published",
        blogStatus: true,
        publishedAt: now,
      },
    }
  );

  await revalidateBlogListingPages();

  const published: PublishedScheduledBlog[] = dueBlogs.map((blog) => ({
    id: String(blog._id),
    title: blog.blogTitle,
    slug: blog.blogSlug,
    scheduledAt: blog.scheduledAt,
  }));

  return {
    publishedCount: published.length,
    published,
    checkedAt: now.toISOString(),
  };
}

export function verifyCronAuth(request: Request): boolean {
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    return process.env.NODE_ENV === "development";
  }

  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${secret}`;
}
