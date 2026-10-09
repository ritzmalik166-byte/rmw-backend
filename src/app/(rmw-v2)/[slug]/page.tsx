import React from "react";
import type { Metadata } from "next";
import BlogInner from "@/components/blogs/inner/BlogInner";
import { get_single_blog } from "@/app/api/get_all_blogs/[slug]/route";
import { GET_ALL_BLOGS } from "@/app/api/get_all_blogs/route";
import { normalizeBlogSlug } from "@/lib/blogUrl";
import { toPlainObject } from "@/lib/toPlainObject";

type BlogLayoutData = { blog: any; categoryName: string; all_categories: any; latest_3_blogs: any; related_blogs: any };

const SITE_ORIGIN = "https://ritzmediaworld.com";

/** Blog slugs that must not emit a rel=canonical tag. */
const SLUGS_WITHOUT_CANONICAL = new Set(["top-10-seo-service-companies-in-noida"]);

/** Mongo blogs use camelCase fields, legacy MySQL blogs use snake_case columns. */
function firstNonEmpty(...values: unknown[]): string {
    for (const value of values) {
        if (typeof value === "string" && value.trim()) return value.trim();
    }
    return "";
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug: rawSlug } = await params;
    const slug = normalizeBlogSlug(rawSlug);
    const canonicalUrl = `${SITE_ORIGIN}/${slug}`;
    const omitCanonical = SLUGS_WITHOUT_CANONICAL.has(slug);
    const result = await get_single_blog(slug);
    const data: BlogLayoutData | null = Array.isArray(result) && (result[1] as { status?: number })?.status === 200
        ? (result[0] as BlogLayoutData)
        : null;
    const blog = data?.blog;
    const title = firstNonEmpty(
        blog?.metaTitle,
        blog?.meta_title,
        blog?.blogBody?.[0]?.metaTitle,
        blog?.blogTitle,
        blog?.title,
    ) || "Blog";
    const meta_description = firstNonEmpty(blog?.meta_description, blog?.mtDesc);
    const meta_keywords = firstNonEmpty(blog?.meta_keywords, blog?.metaKeywords);
    const keywords = (typeof meta_keywords === "string" ? meta_keywords.split(",").map((k: string) => k.trim()).filter(Boolean) : []) as string[];

    return {
        title,
        description: meta_description || undefined,
        keywords: keywords.length > 0 ? keywords : undefined,
        ...(!omitCanonical && {
            alternates: {
                canonical: canonicalUrl,
            },
        }),
        openGraph: {
            title,
            description: meta_description || undefined,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: meta_description || undefined,
        },
    };
}

async function BlogPageContent({ slug }: { slug: string }) {
    const result = await get_single_blog(slug);
    const data: BlogLayoutData | null = Array.isArray(result) && (result[1] as { status?: number })?.status === 200
        ? (result[0] as BlogLayoutData)
        : null;
    const { blog, categoryName, all_categories, latest_3_blogs, related_blogs } = data ?? { blog: null, categoryName: "", all_categories: null, latest_3_blogs: null, related_blogs: null };
    const all_blogs = await GET_ALL_BLOGS();

    return (
        <BlogInner
            slug={slug}
            category={categoryName}
            blog={toPlainObject(blog)}
            categoryName={categoryName}
            all_categories={toPlainObject(all_categories)}
            latest_3_blogs={toPlainObject(latest_3_blogs)}
            related_blogs={toPlainObject(related_blogs)}
            all_blogs={toPlainObject(all_blogs?.data ?? null)}
        />
    );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug: rawSlug } = await params;
    return <BlogPageContent slug={normalizeBlogSlug(rawSlug)} />;
}
