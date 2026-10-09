"use client";
import { CiSearch } from "react-icons/ci";
import S2Card from "./cards/S2Card";
import styles from "./page.module.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FiFileText } from "react-icons/fi";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BLOGS_PER_PAGE = 10;

function normalizeMongoMsqlBlogs(blogs: any[]): any[] {
    return blogs.map((blog) => ({
        title: blog.title || blog.blogTitle,
        slug: blog.slug || blog.blogSlug,
        meta_description: blog.meta_description || blog.mtDesc,
        meta_keywords: blog.meta_keywords || blog.metaKeywords,
        created_at: blog.created_at || blog.createdAt,
        banner: blog.banner || blog.blog_image || blog.blogBanner,
        description: blog.description || blog.blogDescription,
    }));
}

function getBlogTime(blog: any) {
    const rawDate = blog?.created_at || blog?.createdAt;
    const parsed = new Date(rawDate).getTime();
    return Number.isNaN(parsed) ? 0 : parsed;
}

function sortBlogsByDateDesc(list: any[]) {
    return [...list].sort((a, b) => getBlogTime(b) - getBlogTime(a));
}

function getVisiblePages(current: number, total: number): (number | "ellipsis")[] {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }
    const pages: (number | "ellipsis")[] = [1];
    if (current > 3) pages.push("ellipsis");
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 2) pages.push("ellipsis");
    pages.push(total);
    return pages;
}

function Section2({
    all_blogs,
    initialPage = 1,
}: {
    all_blogs: any[];
    initialPage?: number;
}) {
    const sectionRef = useRef<HTMLElement>(null);
    const [searchValue, setSearchValue] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(initialPage);

    const sortedBlogs = useMemo(
        () => sortBlogsByDateDesc(normalizeMongoMsqlBlogs(all_blogs ?? [])),
        [all_blogs]
    );

    const filteredBlogs = useMemo(() => {
        const normalizedSearch = String(searchValue ?? "").toLowerCase().trim();
        if (!normalizedSearch) return sortedBlogs;
        return sortedBlogs.filter((blog) =>
            String(blog?.title ?? "").toLowerCase().includes(normalizedSearch)
        );
    }, [searchValue, sortedBlogs]);

    const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE));
    const safePage = Math.min(Math.max(1, currentPage), totalPages);

    const paginatedBlogs = useMemo(() => {
        const start = (safePage - 1) * BLOGS_PER_PAGE;
        return filteredBlogs.slice(start, start + BLOGS_PER_PAGE);
    }, [filteredBlogs, safePage]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const goToPage = useCallback(
        (page: number) => {
            const nextPage = Math.min(Math.max(1, page), totalPages);
            setCurrentPage(nextPage);
            sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        },
        [totalPages]
    );

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
        setCurrentPage(1);
    };

    const visiblePages = getVisiblePages(safePage, totalPages);
    const showPagination = filteredBlogs.length > BLOGS_PER_PAGE;

    return (
        <section
            ref={sectionRef}
            className="w-full flex justify-center items-center py-[35px] lg:py-[70px]"
        >
            <div
                className={`w-full flex ${styles.containerWidth} flex-col items-center justify-center gap-10 md:gap-12`}
            >
                <div className="w-full flex justify-center items-center">
                    <div className="w-full max-w-[342px] h-[46px] border border-[#D0CFCF] rounded-full flex items-center gap-3 px-5 focus-within:border-[#0F1640]/40 focus-within:ring-2 focus-within:ring-[#0F1640]/10 transition-shadow">
                        <CiSearch className="w-[22px] h-[22px] text-[#484848] shrink-0" />
                        <input
                            type="text"
                            placeholder="Search by title ..."
                            value={searchValue}
                            className="flex-1 h-full outline-none bg-transparent text-[14px] font-[400] text-[#484848] placeholder:text-[#484848]"
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-2">
                    {paginatedBlogs.length > 0 ? (
                        <>
                            {paginatedBlogs.map((blog: any) => (
                                <S2Card key={blog.slug} blog={blog} />
                            ))}

                            {showPagination && (
                                <nav
                                    className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row items-center justify-center gap-4 py-6 mt-6 sm:mt-10 border-t border-b border-[#D3D9FF]"
                                    aria-label="Blog pagination"
                                >
                                    <button
                                        type="button"
                                        onClick={() => goToPage(safePage - 1)}
                                        disabled={safePage <= 1}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-md font-[600] text-[14px] sm:text-[15px] text-[#0F1640] border border-[#D3D9FF] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F5F7FF] transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Previous
                                    </button>

                                    <ul className="flex flex-wrap items-center justify-center gap-1.5">
                                        {visiblePages.map((page, index) =>
                                            page === "ellipsis" ? (
                                                <li
                                                    key={`ellipsis-${index}`}
                                                    className="px-2 text-[#0F1640]/50 font-[600]"
                                                >
                                                    …
                                                </li>
                                            ) : (
                                                <li key={page}>
                                                    <button
                                                        type="button"
                                                        onClick={() => goToPage(page)}
                                                        aria-current={
                                                            page === safePage ? "page" : undefined
                                                        }
                                                        className={`min-w-[40px] h-[40px] px-3 rounded-md font-[600] text-[14px] sm:text-[15px] transition-colors ${
                                                            page === safePage
                                                                ? "bg-[#0F1640] text-white"
                                                                : "text-[#0F1640] border border-[#D3D9FF] hover:bg-[#F5F7FF]"
                                                        }`}
                                                    >
                                                        {page}
                                                    </button>
                                                </li>
                                            )
                                        )}
                                    </ul>

                                    <button
                                        type="button"
                                        onClick={() => goToPage(safePage + 1)}
                                        disabled={safePage >= totalPages}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-md font-[600] text-[14px] sm:text-[15px] text-[#0F1640] border border-[#D3D9FF] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F5F7FF] transition-colors"
                                    >
                                        Next
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </nav>
                            )}
                        </>
                    ) : (
                        <div className="col-span-1 sm:col-span-2 flex flex-col items-center justify-center min-h-[280px] py-16 px-6 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-[#E8EBFF] flex items-center justify-center mb-5">
                                <FiFileText
                                    className="w-8 h-8 text-[#0F1640]/60"
                                    aria-hidden
                                />
                            </div>
                            <h3 className="font-semibold text-[#0F1640] text-lg sm:text-xl mb-2">
                                No blogs found
                            </h3>
                            <p className="text-[#0F1640]/70 text-sm sm:text-base max-w-sm">
                                {searchValue
                                    ? "No blogs match your search. Try a different title."
                                    : "There are no blogs found. Check back later for new content."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Section2;
