import { Suspense } from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Banner from "@/components/blogs/sections/Banner";
import BlogList from "@/components/blogs/sections/BlogList";
import BlogListSkeleton from "@/components/blogs/sections/BlogListSkeleton";
import { GET_ALL_BLOGS } from "@/app/api/get_all_blogs/route";

const BrandImpactSection1 = dynamic(
    () => import("@/components/copy/BrandImpactSection1")
);

const BLOGS_PER_PAGE = 10;

/** Refetch listing from Mongo/MySQL periodically (production was serving a stale build). */
export const revalidate = 60;

function parseBlogPageParam(pageParam: string | undefined): number | null {
    if (pageParam === undefined) return 1;
    const page = Number(pageParam);
    if (!Number.isInteger(page) || page < 1) return null;
    return page;
}

async function Page({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page: pageParam } = await searchParams;
    const requestedPage = parseBlogPageParam(pageParam);
    if (requestedPage === null) notFound();

    const all_blogs = await GET_ALL_BLOGS();
    const blogs = all_blogs?.data ?? [];
    const totalPages = Math.max(1, Math.ceil(blogs.length / BLOGS_PER_PAGE));

    if (requestedPage > totalPages) notFound();

    return (
        <>
            <Banner />
            <Suspense fallback={<BlogListSkeleton />}>
                <BlogList all_blogs={blogs} initialPage={requestedPage} />
            </Suspense>
            <div className="w-full pb-[35px] lg:pb-[70px]">
                <BrandImpactSection1 />
            </div>
        </>
    );
}

export default Page;
