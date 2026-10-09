"use client";

import React, { useState, useCallback, useRef, useEffect, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./discussion.module.css";

const topics = [
    {
        title: "Digital Marketing & SEO",
        tag: "SEO",
        bullets: [
            "How to choose the right SEO company in Noida?",
            "SEO vs Paid Ads – what works better for your business?",
            "How do top SEO companies in Noida rank websites?",
            "AI in digital marketing: Opportunity or threat?",
        ],
        text: "Best strategies for ranking higher and driving organic traffic.",
        imageSrc: "/discussion-forum/discussiontopic.png",
    },
    {
        title: "Branding & Creative Strategy",
        tag: "Branding",
        bullets: [
            "How to choose the best digital marketing agencies for branding?",
            // "Building a brand identity that resonates with your audience",
            // "Creative direction for digital-first campaigns",
            // "Measuring brand awareness and recall",
        ],
        text: "How to choose the best digital marketing agencies for branding?",
        imageSrc: "/discussion-forum/discussiontopic.png",
    },
    {
        title: "Social Media & Content Marketing",
        tag: "Social",
        bullets: [
            "Best strategies used by a social media marketing agency",
            // "Content calendars that actually drive engagement",
            // "Influencer marketing: ROI and best practices",
            // "Short-form vs long-form content – what wins?",
        ],
        text: "Best strategies used by a social media marketing agency.",
        imageSrc: "/discussion-forum/discussiontopic.png",
    },
    {
        title: "Advertising (Print, Radio & Media)",
        tag: "Ads",
        bullets: [
            "How effective are print advertising services in Delhi?",
            // "Radio ads in the digital age – still relevant?",
            // "Combining traditional and digital media for max reach",
            // "Measuring ROI on offline advertising campaigns",
        ],
        text: "How effective are print advertising services in Delhi?",
        imageSrc: "/discussion-forum/discussiontopic.png",
    },
    {
        title: "Industry-Specific Marketing (Schools & Real Estate)",
        tag: "Industry",
        bullets: [
            "Best digital marketing services for school in Delhi",
            // "Real estate marketing strategies that convert",
            // "Healthcare marketing: compliance and creativity",
            // "Hospitality marketing in the post-pandemic era",
        ],
        text: "Best digital marketing services for school in Delhi.",
        imageSrc: "/discussion-forum/discussiontopic.png",
    },
];

const cardBackgrounds = ["#FDFDFD", "#F9F9F9", "#FDFDFD", "#F9F9F9"];

function smallCardsForPanel(panelActiveIndex: number) {
    return topics
        .map((topic, i) => ({ ...topic, originalIndex: i }))
        .filter((_, i) => i !== panelActiveIndex)
        .slice(0, 4);
}

export default function DiscussionTopics() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [isMobileTablet, setIsMobileTablet] = useState(false);
    const touchStartX = useRef<number | null>(null);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const apply = () => setReduceMotion(mq.matches);
        apply();
        mq.addEventListener("change", apply);
        return () => mq.removeEventListener("change", apply);
    }, []);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 1023px)");
        const apply = () => setIsMobileTablet(mq.matches);
        apply();
        mq.addEventListener("change", apply);
        return () => mq.removeEventListener("change", apply);
    }, []);

    const slideCount = topics.length;
    const slideFractionPct = 100 / slideCount;

    const goPrev = useCallback(() => {
        setActiveIndex((i) => (i - 1 + slideCount) % slideCount);
    }, [slideCount]);

    const goNext = useCallback(() => {
        setActiveIndex((i) => (i + 1) % slideCount);
    }, [slideCount]);

    const goTo = useCallback(
        (i: number) => {
            if (i < 0 || i >= slideCount) return;
            setActiveIndex(i);
        },
        [slideCount]
    );

    const visibleSmallCards = smallCardsForPanel(activeIndex);

    const trackStyle: CSSProperties = {
        width: `${slideCount * 100}%`,
        transform: `translateX(-${(activeIndex * 100) / slideCount}%)`,
    };

    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) < 48) return;
        if (dx < 0) goNext();
        else goPrev();
    };

    const renderSmallCard = (
        card: ReturnType<typeof smallCardsForPanel>[number],
        slotIndex: number,
        density: "compact" | "desktop"
    ) => (
        <div
            key={card.originalIndex}
            style={{ backgroundColor: cardBackgrounds[slotIndex] }}
            className={
                density === "desktop"
                    ? `flex h-full min-h-0 min-w-0 cursor-pointer flex-col gap-2 border border-transparent p-3 transition-colors duration-200 hover:border-blue-100 hover:bg-blue-50 xl:p-3.5`
                    : `flex min-h-[140px] cursor-pointer flex-col gap-2 border border-transparent p-4 transition-colors duration-200 hover:border-blue-100 hover:bg-blue-50 sm:min-h-[160px] sm:p-2.5 md:min-h-[200px] md:p-3.5`
            }
            onClick={() => goTo(card.originalIndex)}
        >
            <h4
                className={`min-h-[2.5rem] text-[14px] leading-snug sm:min-h-[3rem] md:min-h-[3.5rem] md:text-[14px] lg:text-[13px] xl:text-[16px] ${slotIndex !== 3 ? "px-2 md:px-3 lg:px-2 xl:px-2.5" : ""} ${styles.montserratMedium}`}
            >
                {card.title}
            </h4>
            <p
                className={`mt-auto font-[400] text-[13px] leading-relaxed text-black sm:text-[13px] md:text-[13px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] ${slotIndex !== 1 ? "lg:px-2" : ""} ${styles.fontopensans}`}
            >
                {card.text}
            </p>
        </div>
    );

    return (
        <section className="flex w-full items-center justify-center py-5 md:py-8 lg:py-12">
            <div
                className={`flex w-full items-center justify-center px-4 md:px-4 lg:px-5 xl:px-5 ${styles.page_containerWidth}`}
            >
                <div className="mx-auto w-full">
                    <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl md:leading-none">
                        Discussion Topics
                    </h2>

                    {/* Main + thumbs: two columns on lg+ so right strip shares one transform with left */}
                    <div
                        className="grid grid-cols-1 items-stretch gap-3 px-1 md:grid-cols-2 md:gap-3 md:px-6 lg:grid-cols-[minmax(0,437px)_minmax(0,1fr)] lg:gap-0 lg:px-8 xl:grid-cols-[minmax(0,512px)_minmax(0,1fr)] xl:px-8 2xl:grid-cols-[minmax(0,537px)_minmax(0,1fr)] 2xl:gap-0"
                    >
                        {/* Left: main carousel */}
                        <div
                            className="relative min-h-0 min-w-0 touch-pan-y overflow-hidden border border-[#E6E6E6] bg-white md:col-span-2 lg:col-span-1"
                            onTouchStart={onTouchStart}
                            onTouchEnd={onTouchEnd}
                            role="region"
                            aria-roledescription="carousel"
                            aria-label="Discussion topics"
                        >
                            <div className="relative h-[512px]">
                                {/* <button
                                    type="button"
                                    onClick={goPrev}
                                    className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md ring-1 ring-black/5 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    aria-label="Previous topic"
                                >
                                    <ChevronLeft className="h-5 w-5" aria-hidden />
                                </button> */}
                                {/* <button
                                    type="button"
                                    onClick={goNext}
                                    className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md ring-1 ring-black/5 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    aria-label="Next topic"
                                >
                                    <ChevronRight className="h-5 w-5" aria-hidden />
                                </button> */}

                                {isMobileTablet ? (
                                    <div
                                        key={topics[activeIndex]?.title}
                                        className={`h-full overflow-y-auto px-4 py-6 sm:px-12 ${reduceMotion ? styles.discussionPanelRevealReducedMotion : styles.discussionPanelReveal}`}
                                    >
                                        <h3 className="mb-6 text-2xl font-bold">{topics[activeIndex]?.title}</h3>
                                        <div className="relative mb-6 w-full ">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={topics[activeIndex]?.imageSrc}
                                                alt={topics[activeIndex]?.title ?? ""}
                                                className="h-full w-full rounded-3xl object-contain"
                                            />
                                        </div>
                                        <ul
                                            className={`space-y-4 text-[13px] lg:text-[13px] xl:text-[16px] text-black ${styles.fontopensans}`}
                                        >
                                            {topics[activeIndex]?.bullets.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 font-[400]">
                                                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-black" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <div
                                        className={`flex h-full ${reduceMotion ? styles.discussionSliderTrackReducedMotion : styles.discussionSliderTrack}`}
                                        style={trackStyle}
                                    >
                                        {topics.map((topic, slideIdx) => (
                                            <div
                                                key={topic.title}
                                                className="flex h-full shrink-0 flex-col overflow-y-auto px-4 py-6 sm:px-12"
                                                style={{ width: `${slideFractionPct}%` }}
                                                aria-hidden={slideIdx !== activeIndex}
                                            >
                                                <div
                                                    className={
                                                        slideIdx === activeIndex
                                                            ? reduceMotion
                                                                ? styles.discussionPanelRevealReducedMotion
                                                                : styles.discussionPanelReveal
                                                            : undefined
                                                    }
                                                >
                                                    <h3 className="mb-6 text-2xl font-bold">{topic.title}</h3>
                                                    <div className="relative mb-6 w-full ">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={topic.imageSrc}
                                                            alt={slideIdx === activeIndex ? topic.title : ""}
                                                            className="h-full w-full rounded-3xl object-contain"
                                                        />
                                                    </div>
                                                    <ul
                                                        className={`space-y-4 text-[13px] lg:text-[13px] xl:text-[16px] text-black ${styles.fontopensans}`}
                                                    >
                                                        {topic.bullets.map((item, i) => (
                                                            <li key={i} className="flex items-start gap-3 font-[400]">
                                                                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-black" />
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: static cards on small screens */}
                        <div className="grid min-w-0 grid-cols-1 gap-3 md:col-span-2 lg:hidden">
                            {visibleSmallCards.map((card, slotIndex) =>
                                renderSmallCard(card, slotIndex, "compact")
                            )}
                        </div>

                        {/* Right: same horizontal index as main — full strip slides */}
                        <div
                            className="relative hidden min-h-0 min-w-0 touch-pan-y overflow-hidden border border-[#E6E6E6] md:col-span-2 lg:block lg:border-l-0 lg:col-span-1"
                            onTouchStart={onTouchStart}
                            onTouchEnd={onTouchEnd}
                        >
                            <div className="h-[512px] overflow-hidden">
                                <div
                                    className={`flex h-full ${reduceMotion ? styles.discussionSliderTrackReducedMotion : styles.discussionSliderTrack}`}
                                    style={trackStyle}
                                >
                                    {topics.map((_, panelIdx) => (
                                        <div
                                            key={panelIdx}
                                            className="grid h-full min-w-0 shrink-0 grid-cols-4 gap-0"
                                            style={{ width: `${slideFractionPct}%` }}
                                            aria-hidden={panelIdx !== activeIndex}
                                        >
                                            {smallCardsForPanel(panelIdx).map((card, slotIndex) =>
                                                renderSmallCard(card, slotIndex, "desktop")
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                        {/* <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={goPrev}
                                className="rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 sm:hidden"
                                aria-label="Previous topic"
                            >
                                <ChevronLeft className="h-5 w-5" aria-hidden />
                            </button>
                            <div className="flex items-center gap-2">
                                {topics.map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => goTo(i)}
                                        className={`rounded-full transition-all duration-300 ease-out ${i === activeIndex ? "h-2 w-5 bg-black" : "h-2 w-2 bg-gray-300 hover:bg-gray-500"}`}
                                        aria-label={`Topic ${i + 1} of ${slideCount}`}
                                        aria-current={i === activeIndex ? "true" : undefined}
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={goNext}
                                className="rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 sm:hidden"
                                aria-label="Next topic"
                            >
                                <ChevronRight className="h-5 w-5" aria-hidden />
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
