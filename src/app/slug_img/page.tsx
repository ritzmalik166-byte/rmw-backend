export const dynamic = "force-dynamic";
import React from "react";
import DetailPage from "./DetailPage";
import { Metadata } from "next";
import axios from "axios";
import Header from "@/components/header/Header";
import { redirect } from "next/navigation";

interface Article {
  _id: string;
  blogBanner: string;
  blogTitle: string;
  createdAt: string;
  meta_description: string;
  blogDescription: string;
}

interface MergedBlogs {
  id: string;
  banner: string;
  title: string;
  createdAt: string;
  meta_description: string;
  mtDesc?: string;
  metaKeywords?: string;
  blogBody?: {
    metaTitle?: string;
    metaDescription?: string;
    innerImg?: string;
  }[];
}

const normalizeArticle = (blog: any): MergedBlogs => ({
  id: blog.blogTitle,
  banner: blog.blogBanner,
  title: blog.blogTitle,
  createdAt: blog.createdAt,
  meta_description: blog.blogDescription,
  mtDesc: blog.mtDesc,
  metaKeywords: blog.metaKeywords,
  blogBody: blog.blogBody,
});

function stripHtmlTags(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, " ") // remove HTML tags
    .replace(/\s+/g, " ") // normalize whitespace
    .replace(/&nbsp;/g, " ") // decode &nbsp;
    .replace(/&[#A-Za-z0-9]+;/g, "") // remove other entities
    .trim();
}

function getCleanDescription(input: string): string {
  return stripHtmlTags(input).replace(/\s+/g, " ").trim();
}

/** Get first ~100 words of text for rich share card description. */
function getFirst100Words(text: string, maxChars = 600): string {
  const cleaned = getCleanDescription(text);
  if (cleaned.length <= maxChars) return cleaned;
  const truncated = cleaned.slice(0, maxChars);
  const lastSpace = truncated.lastIndexOf(" ");
  return lastSpace > maxChars * 0.6 ? truncated.slice(0, lastSpace) : truncated;
}

/** Site base URL for canonical and openGraph (SEO). */
const SITE_URL = "https://ritzmediaworld.com";

/** Build absolute image URL for og:image / twitter:image (required for rich cards). */
function buildAbsoluteImageUrl(baseURL: string | undefined, path: string | undefined): string {
  if (!baseURL || !path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = baseURL.replace(/\/$/, "");
  if (path.startsWith("/")) return `${base}${path}`;
  return `${base}/uploads/${path}`;
}

interface Blog {
  id?: string | number;
  title?: string;
  banner?: string;
  createdAt?: string;
  meta_description?: string;
  description?: string;
  blog_image?: string;
  blogBanner?: string;
  blogTitle?: string;
  blogDescription?: string;
  meta_title?: string;
  meta_keywords?: string;
  metaKeywords?: string;
  blogBody?: {
    metaTitle?: string;
    metaDescription?: string;
    innerImg?: string;
  }[];
  mtDesc?: string;
}

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const baseURL = process.env.NEXT_PUBLIC_SERVER_IMG_PATH;
  let blog: Blog | null = null;
  let isMongo = false;

  try {
    // Try MySQL
    try {
      const mysqlRes = await axios.get(`${baseURL}/api/resolve/${slug}`);
      if (mysqlRes?.data?.blog) {
        blog = mysqlRes.data.blog;
      }
    } catch {
      // Fallback to MongoDB
      try {
        const mongoRes = await axios.get(
          `${baseURL}/api/ritz_blogs/get-single-blog/${slug}`
        );
        if (mongoRes?.data?.blog) {
          // Preserve all fields including mtDesc and metaKeywords
          const normalized = normalizeArticle(mongoRes.data.blog);
          blog = {
            ...normalized,
            ...mongoRes.data.blog, // Preserve original blog object with all fields
          };
          isMongo = true;
        }
      } catch (err) {
        console.error("MongoDB fetch failed:", err);
        // Both MySQL and MongoDB failed, redirect to 404 page
        redirect("/404/not-found");
      }
    }

    if (!blog) {
      return {
        title: "Blog Not Found",
        description: "This blog post does not exist or has been deleted.",
        alternates: { canonical: `${SITE_URL}/${slug}` },
      };
    }

    // Prepare Metadata
    const title =
      blog.meta_title || blog.title || blog.blogTitle || "Untitled Blog";
    const keywords = blog.meta_keywords || blog.metaKeywords || "ritz media";

    // Use mtDesc as primary description, fallback to other sources
    const mtDescText = getCleanDescription(blog.mtDesc || "");
    const shortDesc = mtDescText.slice(0, 160);

    let blogBodyText = "";
    if (isMongo && Array.isArray(blog.blogBody)) {
      blogBodyText = blog.blogBody
        .map((item) => getCleanDescription(item?.metaDescription || ""))
        .join(" ");
    }

    // For rich share card: ~100 words (~600 chars) for WhatsApp, Facebook, Twitter, LinkedIn
    const rawLongDesc = mtDescText || blogBodyText || (blog.meta_description ? getCleanDescription(blog.meta_description) : "") || (blog.blogDescription ? getCleanDescription(blog.blogDescription) : "");
    const ogDescriptionLong = getFirst100Words(rawLongDesc);
    const ogDescription = ogDescriptionLong.length > 160 ? ogDescriptionLong : (shortDesc || ogDescriptionLong);

    // Prepare keywords (single string for meta name="keywords" in head)
    const keywordsArray = keywords.split(",").map((k: string) => k.trim()).filter(k => k.length > 0);

    const canonicalUrl = `${SITE_URL}/${slug}`;

    return {
      title,
      description: ogDescription,
      keywords: keywordsArray,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title,
        description: ogDescription,
        type: "article",
        url: canonicalUrl,
        images: [
          {
            url: buildAbsoluteImageUrl(baseURL, blog.blog_image || blog.blogBanner),
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: ogDescription,
        images: [buildAbsoluteImageUrl(baseURL, blog.blog_image || blog.blogBanner)],
      },
    };
  } catch (err: any) {
    // Re-throw redirect errors so Next.js can handle them
    if (err?.digest?.startsWith('NEXT_REDIRECT')) {
      throw err;
    }
    console.error("Metadata generation error:", err);
    return {
      title: "Error Loading Blog",
      description: "There was an issue generating metadata for this blog.",
      alternates: { canonical: `${SITE_URL}/${slug}` },
    };
  }
}

// Server Component (default)
export default function page({ params }: Props) {
  const fallbackHeading = decodeURIComponent(params.slug || "blog")
    .replace(/\.html$/, "")
    .split("-")
    .join(" ")
    .trim();

  return (
    <>
      {" "}
      <Header /> 
      <DetailPage ssrHeading={fallbackHeading} />
    </>
  ); // DetailPage can be 'use client' if it needs state/hooks
}
