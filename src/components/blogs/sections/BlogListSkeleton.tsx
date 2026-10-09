import S2CardSkeleton from "./cards/S2CardSkeleton";

function BlogListSkeleton() {
    return (
        <section className="w-full flex justify-center items-center py-[35px] lg:py-[70px]">
            <div className="w-full flex flex-col items-center justify-center gap-10 md:gap-12 px-5 md:px-10 lg:px-[50px] xl:max-w-[1300px] xl:mx-auto">
                <div className="w-full max-w-[342px] h-[46px] rounded-full bg-gray-200 animate-pulse" />
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <S2CardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default BlogListSkeleton;
