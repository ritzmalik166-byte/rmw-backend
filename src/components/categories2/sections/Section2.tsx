"use client";
import LoadingLinesAndDots from "@/components/ui/LoadingLinesAndDots";
import styles from "./page.module.css"; 
import { useEffect, useState } from "react";
import S2Card from "./S2Card";
import { FiFileText } from "react-icons/fi";

function Section2({ all_blogs }: { all_blogs: any[] }) {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loadingState, setLoadingState] = useState<boolean>(true);
    const [loadMoreBlogs, setLoadMoreBlogs] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    useEffect(() => {
        if (all_blogs && all_blogs.length > 0) {
            setBlogs(all_blogs.slice(0, page * 10));
            setLoadingState(false);
            setLoadMoreBlogs(false);
        }
    }, [all_blogs, page]);

    function add_more_blogs() {
        setLoadMoreBlogs(true);
        setPage(page + 1);
    }

    return (
        <section className="w-full flex justify-center items-center   py-16 md:py-[70px]">

            {/* Centered Align Container  */}
            <div className={`w-full flex ${styles.containerWidth} flex-col items-center justify-center gap-10 md:gap-12`}>

                {/* Row 1 For Cards - 1 col below sm, 2 cols from sm  */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-2">
                    {loadingState ? (
                        blogs.length === 0 ? (
                            <div className="col-span-1 sm:col-span-2 flex flex-col items-center justify-center min-h-[280px] py-16 px-6 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-[#E8EBFF] flex items-center justify-center mb-5">
                                    <FiFileText className="w-8 h-8 text-[#0F1640]/60" aria-hidden />
                                </div>
                                <h3 className="font-semibold text-[#0F1640] text-lg sm:text-xl mb-2">
                                    No blogs found
                                </h3>
                                <p className="text-[#0F1640]/70 text-sm sm:text-base max-w-sm">
                                    There are no posts in this category yet. Check back later for new content.
                                </p>
                            </div>
                        ) : (
                            <div className="col-span-1 sm:col-span-2 flex justify-center items-center min-h-[280px] py-12">
                                <LoadingLinesAndDots className="text-[#0F1640]" />
                            </div>
                        )
                    ) : (
                        <>
                            {
                                blogs && blogs.length > 0 && blogs.map((blog: any) => (
                                    <S2Card key={blog.slug} blog={blog} />
                                ))

                            }
                            <div
                                onClick={add_more_blogs}
                                className={`col-span-1 sm:col-span-2 flex justify-center items-center py-4 text-center border-t border-b border-[#D3D9FF] cursor-pointer mt-6 sm:mt-10 ${(blogs.length === 0 || !blogs) ? "hidden" : "block"}`}>
                                {loadingState ? (
                                    <div className="flex justify-center">
                                        <LoadingLinesAndDots className="text-[#0F1640] w-[6em] h-[6em]" />
                                    </div>
                                ) : (
                                    <p className="font-[600] text-[16px] sm:text-[18px] text-[#0F1640]">{all_blogs.length === blogs.length ? "No more blogs" : "Load more"}</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}


export default Section2;