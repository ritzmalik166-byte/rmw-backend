function S2CardSkeleton() {
    return (
        <div className="w-full max-w-[613px] mx-auto flex flex-col gap-4 sm:gap-5 lg:gap-6 mb-4 animate-pulse">
            {/* Top Row - matches S2Card structure */}
            <div className="w-full flex flex-col gap-3 sm:gap-4 lg:gap-5">
                {/* Image placeholder */}
                <div className="w-full h-[220px] sm:h-[200px] lg:h-[250px] xl:h-[345px] rounded-lg bg-gray-200" />
                {/* Title placeholder */}
                <div className="h-5 sm:h-5 lg:h-6 bg-gray-200 rounded w-[85%] max-w-[500px]" />
                <div className="h-5 sm:h-5 lg:h-6 bg-gray-200 rounded w-[60%] max-w-[300px]" />
                {/* Description placeholder */}
                <div className="space-y-2 max-w-[540px]">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-[80%]" />
                </div>
            </div>
            {/* Bottom row - date, read more, share */}
            <div className="flex items-center gap-2 lg:gap-6 pt-1">
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="pl-4 sm:pl-5 lg:pl-6 pr-4 sm:pr-5 lg:pr-6 border-l border-r border-gray-200">
                    <div className="h-4 bg-gray-200 rounded w-20" />
                </div>
                <div className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] rounded-full bg-gray-200 shrink-0" />
            </div>
        </div>
    );
}

export default S2CardSkeleton;
