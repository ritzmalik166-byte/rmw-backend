import { connectMongoDB } from "@/lib/mongo/dbConntect";
import { getDBPool } from "@/lib/db";
import RitzBlogModel from "@/models/Blog.Schema";
import { getPublicBlogFilter } from "@/lib/blogPublish";

export interface BLOGSSTRUCTURE {
  blogTitle: string;
  blogBanner: string;
  blogSlug: string;
  createdAt: Date;
}

export interface SITEBANNERSSTRUCTURE {
  id: number;
  title: string;
  paragraph: string;
  mobile_banner: string;
  tab_banner: string;
  desktop_banner: string;
  banner_status: boolean;
}

/** Pinned home page blogs (13–15 Apr 2026) — do not auto-update with newer posts */
const HOME_PAGE_BLOG_SLUGS = [
  "why-every-brand-needs-a-digital-marketing-strategy",
  "ai-tools-every-marketer-should-use-in-2026",
  "real-estate-lead-generation-ideas-strategies",
] as const;

export async function fetchHomePageBlogs(): Promise<BLOGSSTRUCTURE[]> {
  try {
    await connectMongoDB();
    const blogs = await RitzBlogModel.find({
      ...getPublicBlogFilter(),
      blogSlug: { $in: [...HOME_PAGE_BLOG_SLUGS] },
    }).lean();

    return HOME_PAGE_BLOG_SLUGS.flatMap((slug) => {
      const blog = (blogs as Array<{ blogSlug?: string }>).find(
        (b) => b.blogSlug === slug,
      );
      if (!blog) return [];
      const row = blog as {
        blogTitle?: string;
        blogBanner?: string;
        blogSlug?: string;
        createdAt?: Date;
      };
      return [
        {
          blogTitle: row.blogTitle || "",
          blogBanner: row.blogBanner || "",
          blogSlug: row.blogSlug || "",
          createdAt: row.createdAt || new Date(),
        },
      ];
    });
  } catch (error) {
    console.log(
      "There are some errors in fetching the home page RMW blogs plz fix the bug first ",
      error,
    );
    return [];
  }
}

export async function fetchLatestBlogs(): Promise<BLOGSSTRUCTURE[]> {
  try {
    await connectMongoDB();
    // Latest 3 Blogs
    const latestBlogs = await RitzBlogModel.find(getPublicBlogFilter())
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();
    
    if (latestBlogs.length < 1) {
      return [];
    }

    return latestBlogs.map((blog: any) => ({
      blogTitle: blog.blogTitle || "",
      blogBanner: blog.blogBanner || "",
      blogSlug: blog.blogSlug || "",
      createdAt: blog.createdAt || new Date(),
    }));
  } catch (error) {
    console.log(
      "There are some errors in fetching the latest RMW blogs plz fix the bug first ",
      error
    );
    return [];
  }
}

export async function fetchSiteBanners(): Promise<SITEBANNERSSTRUCTURE[]> {
  try {
    const pool = getDBPool();
    const [rows] = await pool.execute("SELECT * FROM rmw_banners") as any[];
    
    if (!Array.isArray(rows) || rows.length === 0) {
      return [];
    }

    return rows.map((row: any) => ({
      id: row.id,
      title: row.title || "",
      paragraph: row.paragraph || "",
      mobile_banner: row.mobile_banner || "",
      tab_banner: row.tab_banner || "",
      desktop_banner: row.desktop_banner || "",
      banner_status: row.banner_status || false,
    }));
  } catch (error) {
    console.log(
      "There are some errors in fetching the site banners plz fix the bug first ",
      error
    );
    return [];
  }
}

