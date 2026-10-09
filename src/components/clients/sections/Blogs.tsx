"use client";

import LoadingLinesAndDots from "@/components/ui/LoadingLinesAndDots";
import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiFileText } from "react-icons/fi";
import Link from "next/link";

const readMoreBtnClass =
    "inline-flex w-full sm:w-auto items-center justify-center px-5 sm:px-6 py-2.5 sm:py-2 border border-[#C99237] text-black font-semibold text-sm sm:text-[15px] rounded-lg hover:bg-[#C99237] hover:text-white transition-colors whitespace-nowrap";

export default function Blogs() {
    const [loadingState, setLoadingState] = useState<boolean>(true);
    const [blogs, setBlogs] = useState<any[]>([]);

    const getBlogTime = (blog: any) => {
        const rawDate = blog?.created_at || blog?.createdAt;
        const parsed = new Date(rawDate).getTime();
        return Number.isNaN(parsed) ? 0 : parsed;
    };

    const sortBlogsByDateDesc = (list: any[]) => {
        return [...list].sort((a, b) => getBlogTime(b) - getBlogTime(a));
    };

    function normalizeMongoMsqlBlogs(blogList: any[]): any[] {
        return blogList.map((blog) => ({
            title: blog.title || blog.blogTitle,
            slug: blog.slug || blog.blogSlug,
            meta_description: blog.meta_description || blog.mtDesc,
            meta_keywords: blog.meta_keywords || blog.metaKeywords,
            created_at: blog.created_at || blog.createdAt,
            banner: blog.blog_image || blog.blogBanner,
            description: blog.description || blog.blogDescription,
        }));
    }

    const fetchBlogs = async () => {
        try {
            setLoadingState(true);
            const response = await axios.get("/api/get_all_blogs?page=1");
            const normalizedBlogs = normalizeMongoMsqlBlogs(response.data.blogs);
            setBlogs(sortBlogsByDateDesc(normalizedBlogs).slice(0, 3));
        } catch (error) {
            console.error("Error in fetching blogs", error);
        } finally {
            setLoadingState(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <section className="w-full flex justify-center items-center py-8 sm:py-12 md:py-[35px] lg:py-[70px]">
            <div className={`w-full flex ${styles.containerWidth} flex-col items-stretch justify-center gap-8 sm:gap-10 md:gap-12`}>
                {/* Header — desktop: button top-right; mobile: button below grid */}
                <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-4 sm:gap-6">
                    <div className="flex w-full flex-col gap-2 sm:gap-3 text-center md:text-left md:max-w-[min(100%,700px)] md:pr-4">
                        <span className="text-[#C99237] text-sm sm:text-[15px] md:text-base font-semibold uppercase tracking-wide">
                            Latest Insights
                        </span>
                        <h2 className="text-[#000] text-xl sm:text-2xl md:text-[24px] lg:text-[28px] font-bold leading-tight">
                            Here&apos;s what we&apos;ve been up to
                        </h2>
                        <p className="text-[#000] text-sm sm:text-[15px] md:text-base font-normal leading-relaxed">
                            Explore industry insights, expert tips, and creative inspiration from the Ritz team.
                            Our blog is where we share knowledge, ideas, and what&apos;s next in digital.
                        </p>
                    </div>
                    <div className="hidden md:flex shrink-0 self-center md:self-auto">
                        <Link href="/blogs" title="Read more blogs" className={readMoreBtnClass}>
                            Read more blogs
                        </Link>
                    </div>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {loadingState ? (
                        <div className="col-span-full flex justify-center items-center min-h-[220px] sm:min-h-[280px] py-10 sm:py-12">
                            <LoadingLinesAndDots className="text-[#0F1640]" />
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center min-h-[220px] sm:min-h-[280px] py-12 sm:py-16 px-4 sm:px-6 text-center">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#E8EBFF] flex items-center justify-center mb-4 sm:mb-5">
                                <FiFileText className="w-7 h-7 sm:w-8 sm:h-8 text-[#0F1640]/60" aria-hidden />
                            </div>
                            <h3 className="font-semibold text-[#0F1640] text-lg sm:text-xl mb-2">
                                No blogs found
                            </h3>
                            <p className="text-[#0F1640]/70 text-sm sm:text-base max-w-sm">
                                There are no blogs found. Check back later for new content.
                            </p>
                        </div>
                    ) : (
                        blogs.map((blog: any) => (
                            <Link
                                title={blog.title || "Blog Image"}
                                key={blog.slug}
                                href={`/${blog.slug}`}
                                className="group flex h-full w-full flex-col hover:underline"
                            >
                                <div className="flex w-full flex-col overflow-hidden">
                                    <img
                                        src={
                                            blog.banner?.includes("/images")
                                                ? `https://ritzmediaworld.com/api/images${blog.banner.split("/images")[1]}`
                                                : `https://ritzmediaworld.com/blogs/${blog.banner}`
                                        }
                                        alt={blog.title || "Blog Image"}
                                        className="w-full h-[180px] sm:h-[200px] lg:h-[212px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                    />
                                    <div className="flex items-center gap-2 pt-4 pb-2 text-[#575757] text-xs sm:text-sm font-normal leading-relaxed">
                                        <span className="shrink-0">
                                            <img
                                                src="/clients-page/dateiocn.png"
                                                alt=""
                                                className="h-4 w-4 sm:h-5 sm:w-5"
                                            />
                                        </span>
                                        {new Date(blog?.created_at || new Date()).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "numeric",
                                            year: "numeric",
                                        })}
                                    </div>
                                    <h3 className="text-[#000] text-base sm:text-lg font-semibold leading-snug line-clamp-2">
                                        {blog.title}
                                    </h3>
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                <div className="w-full flex justify-center px-1 md:hidden">
                    <Link href="/blogs" title="Read more blogs" className={readMoreBtnClass}>
                        Read more blogs
                    </Link>
                </div>
            </div>
        </section>
    );
}
