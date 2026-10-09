"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { ChevronDown } from "lucide-react";

const LOGOS_PER_PAGE = 16;

type Section3Props = {
    logos: string[];
};

function Section3({ logos }: Section3Props) {
    const [visibleCount, setVisibleCount] = useState(() =>
        Math.min(LOGOS_PER_PAGE, logos.length)
    );

    const visibleLogos = logos.slice(0, visibleCount);
    const hasMore = visibleCount < logos.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + LOGOS_PER_PAGE, logos.length));
    };

    if (logos.length === 0) {
        return null;
    }

    return (
        <section className="flex w-full flex-col items-center justify-center bg-white pb-10 pt-0 sm:pb-12 xl:pb-[70px]">
            <div className={`w-full ${styles.containerWidth}`}>
                <div className={styles.clientsLogoGrid}>
                    {visibleLogos.map((imgSrc, idx) => (
                        <div
                            key={`${imgSrc}-${idx}`}
                            className={styles.clientsLogoCell}
                        >
                            <img
                                src={imgSrc}
                                alt={`Client logo ${idx + 1}`}
                                className={styles.clientsLogoImg}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {hasMore && (
                <div className="mt-8 flex w-full items-center justify-center xl:mt-10">
                    <button
                        type="button"
                        onClick={handleLoadMore}
                        className="flex h-[50px] w-[179px] cursor-pointer items-center justify-center gap-2 rounded-[700px] bg-[#0F1640] font-[500]"
                    >
                        <span className="font-[400] text-[16px] text-white">
                            Load More
                        </span>
                        <ChevronDown className="h-5 w-5 text-white" />
                    </button>
                </div>
            )}
        </section>
    );
}

export default Section3;
