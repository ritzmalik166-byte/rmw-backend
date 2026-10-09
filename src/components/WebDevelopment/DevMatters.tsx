"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./webDevelopment.module.css";
import Image from "next/image";

/** Below 768px: one card per slide. 768px and above: two cards per slide. */
const TWO_CARDS_MIN_WIDTH = 768;

const cards = [
    {
        title: "Strong First Impression",
        description:
            "Professional web development services \n provide a credible and aesthetically \npleasing website that makes a great first \n impression right away. Companies \n searching for web developers appreciate \n websites designed to engage and convert \nvisitors.",
        icon: "/webDevelopment/dev2.png",
    },
    {
        title: "Seamless User Experience",
        description:
            "Responsive web development services \n ensure your website works flawlessly\n on mobile, tablet, and computer\n  platforms. A seamless user experience\n keeps visitors interested and decreases\n bounce rates.",
        icon: '/webDevelopment/userExp.png',
    },
    {
        title: "SEO Friendly Structure",
        description:
            "We are a team of professional web developers providing high-performance, SEO optimized websites that improve search-engine ranking, drive organic traffic to your business, and enhance your visibility",
        icon: '/webDevelopment/seo.jpg',
    },
    {
        title: "Fast Reliable Websites",
        description:
            "With our professional web development services, you can expect your website to be fast-loading, highly secure, and high-performing, helping to build user trust and enhance the overall user experience.",
        icon: '/webDevelopment/www (2).jpg',
    },
    // 👉 Add more cards here (it will auto create slides)
];

export default function DevMatters() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [cardsPerSlide, setCardsPerSlide] = useState<1 | 2>(1);

    useEffect(() => {
        const mq = window.matchMedia(`(min-width: ${TWO_CARDS_MIN_WIDTH}px)`);
        const sync = () => setCardsPerSlide(mq.matches ? 2 : 1);
        sync();
        mq.addEventListener("change", sync);
        return () => mq.removeEventListener("change", sync);
    }, []);

    useEffect(() => {
        setActiveIndex(0);
    }, [cardsPerSlide]);

    const chunkedCards = useMemo(() => {
        const chunks: (typeof cards)[] = [];
        for (let i = 0; i < cards.length; i += cardsPerSlide) {
            chunks.push(cards.slice(i, i + cardsPerSlide));
        }
        return chunks;
    }, [cardsPerSlide]);

    const slideCount = Math.max(chunkedCards.length, 1);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % slideCount);
    };

    const handlePrev = () => {
        setActiveIndex((prev) =>
            prev === 0 ? slideCount - 1 : prev - 1
        );
    };

    return (
        <section className="w-full bg-[#0B1550] py-12 md:py-10 lg:py-10 xl:py-16">
            <div className={`${styles.page_containerWidth} pr-4 sm:pr-6 lg:pr-10`}>

                {/* HEADER — slider arrows only from lg; mobile/tablet arrows sit below the image */}
                <div className="relative flex items-start justify-between gap-4">
                    <h2
                        className={`w-full text-center text-[25px] px-8 md:px-10 lg:px-12 xl:px-14 leading-[1.15] text-white md:text-left md:text-[30px] lg:text-[36px] ${styles.montserratBold}`}
                    >
                        Why Web Development Matters
                    </h2>

                    {/* Desktop / large tablet arrows (lg+) */}
                    <div className="mt-6 hidden items-center gap-3 text-white/85 lg:flex">
                        <button
                            type="button"
                            onClick={handlePrev}
                            className=" hover:opacity-70 cursor-pointer"
                            aria-label="Previous slide"
                        >
                            <Image
                                alt="Previous slide"
                                title="Previous slide"
                                src="/varun.icon/left-arrow.svg"
                                width={30}
                                height={30}
                                className="w-[27px] h-[27px] "
                            />
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            className=" hover:opacity-70  cursor-pointer"
                            aria-label="Next slide"
                        >
                            <Image
                                alt="Next slide"
                                title="Next slide"
                                src="/varun.icon/right-arrow.svg"
                                width={30}
                                height={30}
                                className="w-[27px] h-[27px] "
                            />
                        </button>
                    </div>
                </div>

                {/* Image stays fixed; only card pairs slide */}
                <div className="mt-8 grid grid-cols-1 items-center  lg:mt-10 lg:grid-cols-[1.05fr_1.50fr] lg:gap-6">
                    {/* IMAGE — tablet (md) single-column layout pe full width bahut bada lagta hai; lg+ split column pe full width */}
                    <div className="relative mr-auto w-full md:max-w-lg lg:max-w-none">
                        <img
                            src="/webDevelopment/devmatter.png"
                            alt="AI web development"
                            title="AI web development"
                            className="h-auto w-full object-contain"
                        />
                    </div>



                    <div className="relative min-w-0 overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${activeIndex * 100}%)`,
                            }}
                        >
                            {chunkedCards.map((group, slideIndex) => (
                                <div
                                    key={`${cardsPerSlide}-${slideIndex}`}
                                    className={
                                        group.length > 1
                                            ? "w-full flex-shrink-0 grid grid-cols-1 divide-y divide-white md:grid-cols-2 md:divide-y-0 md:divide-x"
                                            : "w-full flex-shrink-0 grid grid-cols-1"
                                    }
                                >
                                    {group.map(({ title, description, icon }, index) => {
                                        const globalCardIndex =
                                            slideIndex * cardsPerSlide + index;
                                        return (
                                            <article
                                                key={`${slideIndex}-${index}-${title}`}
                                                className="px-5 pt-5 lg:pt-0 md:py-6 text-center lg:px-6 xl:px-8"
                                            >
                                                <div className="mb-3 flex h-[90px] items-center justify-center lg:mb-4">
                                                    <img
                                                        src={icon}
                                                        alt={title}
                                                        title={title}
                                                        className={`mx-auto object-contain ${globalCardIndex % 2 === 0
                                                            ? "w-[106px] h-[74px]"
                                                            : "w-[72px] h-[82px]"
                                                            }`}
                                                    />
                                                </div>

                                                <h3
                                                    className={`text-[18px] leading-[1.2] text-white lg:text-[20px] ${styles.montserratBold}`}
                                                >
                                                    {title}
                                                </h3>

                                                <p
                                                    className={`whitespace-normal xl:whitespace-pre-line mx-auto mt-3 text-[14px]  md:text-[15px] lg:text-[14px]  xl:text-[16px] leading-[1.8] text-white lg:mt-4 ${styles.fontopensans}`}
                                                >
                                                    {description}
                                                </p>
                                            </article>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Mobile + tablet (below lg): controls below image, above cards */}
                    <div className=" pt-4 flex items-center justify-center gap-6 text-white lg:hidden">
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="cursor-pointer hover:opacity-70"
                            aria-label="Previous slide"
                        >
                            <Image
                                alt="Previous slide"
                                title="Previous slide"
                                src="/varun.icon/left-arrow.svg"
                                width={30}
                                height={30}
                                className="h-[27px] w-[27px]"
                            />
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            className="cursor-pointer hover:opacity-70"
                            aria-label="Next slide"
                        >
                            <Image
                                alt="Next slide"
                                title="Next slide"
                                src="/varun.icon/right-arrow.svg"
                                width={30}
                                height={30}
                                className="h-[27px] w-[27px]"
                            />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
