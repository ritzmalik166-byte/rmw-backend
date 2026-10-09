"use client";

import { useState, useEffect } from "react";
import S5Card from "./cards/S5Card";
import S5CardMobile from "./cards/S5CardMobile";
import styles from "./page.module.css";

const CARD_WIDTH = 378;
const CARD_GAP = 16;

const cardContent = [
    {
        title: "Advertising Concept Development",
        content: "As a leading radio advertising agency, we craft compelling, audio-centric campaign ideas, specifically designed to resonate with FM radio audiences.               Our approach is designed to guarantee that your radio advertisement breaks through, delivers brand awareness, and generates measurable results in the target market.",
        image: "/alishba-services-v3/radio-advertising/Adv-Con-Dev.png",
        link: "https://ritzmediaworld.com/services/radio-advertising/advertisement-concept-development",
    },
    {
        title: "Scriptwriting ",
        content: "For successful FM ad campaigns, storytelling is a great beginning. Our skilled scriptwriters write attention-grabbing, conversion-oriented scripts for radio ads and commercials. Every message is crafted with the goal of communicating value and inspiring people to take action.",
        image: "/alishba-services-v3/radio-advertising/Scriptwriting.png",
        link: "https://ritzmediaworld.com/services/radio-advertising/scriptwriting",
    },
    {
        title: "Professional Voiceover Casting",
        content: "The key to any successful radio ad campaign really comes down to finding the right voice. We offer voiceover casting that fits with your brand personality and target audience. We help you build credibility and keep listeners engaged with our voice talent.",
        image: "/alishba-services-v3/radio-advertising/professional-voice-cov.png",
        link: "https://ritzmediaworld.com/services/radio-advertising/voiceover-casting",
    },
    {
        title: "Radio Recording & Production",
        content: "With our radio commercial production services, we provide quality audio, precise editing, and effective sound designs, ensuring that your advertisements reach the wider audience of popular FM channels through professional studio recordings and efficient production techniques.",
        image: "/alishba-services-v3/radio-advertising/recording-production.png",
        link: "https://ritzmediaworld.com/services/radio-advertising/recording-and-production",
    },
    {
        title: "Media Planning & Buying",
        content: "For effective campaigns, strategic media planning is essential for successful radio advertising. As an experienced radio advertising agency, we recognize that the media planning and buying service is crucial for selecting the most appropriate FM stations, time slots, and programs that are more likely to reach out to your target audience.",
        image: "/alishba-services-v3/radio-advertising/media-planning.png",
        link: "https://ritzmediaworld.com/services/radio-advertising/media-planning-and-buying",
    },
    {
        title: "Cost Negotiation & Slot Optimization",
        content: "Unlike other forms of smart radio media buying, where placement is not enough and relationships are crucial, smart radio media buying includes superior relationships and negotiation skills. With our smart radio media buying strategy, you get prime time and cost-effective FM radio advertising.",
        image: "/alishba-services-v3/radio-advertising/cost-nagotiation.png",
        link: "https://ritzmediaworld.com/services/radio-advertising/radio-cost-negotiation-india",
    },
];

const TOTAL_CARDS = cardContent.length;
const SLIDE_STEP = CARD_WIDTH + CARD_GAP;
const SLIDE_PERCENT = 100 / TOTAL_CARDS;

function useIsXl() {
    const [isXl, setIsXl] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1280px)");
        const set = () => setIsXl(mq.matches);
        set();
        mq.addEventListener("change", set);
        return () => mq.removeEventListener("change", set);
    }, []);
    return isXl;
}

/** Cards visible in the xl:hidden slider: 1 mobile, 2 sm–lg, 3 lg–xl (Tailwind breakpoints). */
function useMobileVisibleCount() {
    const [count, setCount] = useState(1);
    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w >= 1280) setCount(1);
            else if (w >= 1024) setCount(3);
            else if (w >= 640) setCount(2);
            else setCount(1);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);
    return count;
}

function Section5() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isXl = useIsXl();
    const mobileVisibleCount = useMobileVisibleCount();

    const maxIndexBelowXl = Math.max(0, TOTAL_CARDS - mobileVisibleCount);
    const maxIndexXl = TOTAL_CARDS - 1;
    const maxIndex = isXl ? maxIndexXl : maxIndexBelowXl;

    const totalStepsBelowXl = Math.max(1, TOTAL_CARDS - mobileVisibleCount + 1);
    const totalSteps = isXl ? TOTAL_CARDS : totalStepsBelowXl;

    useEffect(() => {
        const capBelow = Math.max(0, TOTAL_CARDS - mobileVisibleCount);
        const cap = isXl ? TOTAL_CARDS - 1 : capBelow;
        setCurrentIndex((i) => Math.min(i, cap));
    }, [isXl, mobileVisibleCount]);

    const goNext = () =>
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    const goPrev = () =>
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

    const progressPercent = ((currentIndex + 1) / totalSteps) * 100;
    const currentPage = (currentIndex + 1).toString().padStart(2, "0");
    const totalPageLabel = totalSteps.toString().padStart(2, "0");

    const trackTransform = isXl
        ? `translateX(-${currentIndex * SLIDE_STEP}px)`
        : `translateX(-${currentIndex * SLIDE_PERCENT}%)`;

    const cardWidthPercent = 100 / TOTAL_CARDS;
    const mobileTrackWidthPercent = (TOTAL_CARDS * 100) / mobileVisibleCount;

    const mobileCardInnerClass =
        mobileVisibleCount === 1
            ? "w-full h-full min-h-0 max-w-[min(100%,320px)] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[440px] mx-auto"
            : "w-full h-full min-h-0 mx-auto";

    return (
        <section className="w-full py-8 sm:py-12 md:py-16 xl:py-[70px] flex justify-center items-center">

            {/* Centered Align Container  */}
            <div className={`w-full flex flex-col justify-center items-center gap-6 sm:gap-8 xl:gap-10 ${styles.containerWidth}`}>
                <div className="w-full flex flex-col justify-center items-center text-center px-2 sm:px-0">
                    <a href='/services' target='_blank' className={`font-[600] text-[12px] sm:text-[14px] xl:text-[16px] uppercase text-[#C99237] ${styles.fontpoppins}`}>
                        Services
                    </a>
                    <h2 className={`font-[700] text-[24px] sm:text-[28px] md:text-[32px] xl:text-[36px] ${styles.fontmontserrat}`}>
                        What We Provide
                    </h2>
                    <p className={`font-[400] text-[14px] sm:text-[15px] xl:text-[16px] ${styles.fontopensans}`}>
                        Is more than what you'll ever need
                    </p>
                </div>

                <div className="w-full flex flex-col gap-6 sm:gap-8 justify-between">
                    {/* Mobile only: slider with image-on-top cards */}
                    <div className="w-full flex justify-center overflow-hidden xl:hidden">
                        <div className="w-full overflow-hidden">
                            <div
                                className={`${styles.s5SliderTrack} flex items-stretch`}
                                style={{
                                    width: `${mobileTrackWidthPercent}%`,
                                    transform: `translateX(-${currentIndex * SLIDE_PERCENT}%)`,
                                }}
                            >
                                {cardContent.map((card, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-center items-stretch flex-shrink-0 min-w-0 px-1.5 sm:px-2 md:px-2.5"
                                        style={{ width: `${cardWidthPercent}%`, flexBasis: `${cardWidthPercent}%` }}
                                    >
                                        <div className={mobileCardInnerClass}>
                                            <S5CardMobile
                                                link={card.link}
                                                title={card.title}
                                                image={card.image}
                                                content={card.content}
                                                index={index}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sm and up: existing book-style slider (unchanged) */}
                    <div className="hidden xl:flex w-full justify-center overflow-hidden">
                        <div className="w-full overflow-hidden">
                            <div
                                className={`${styles.s5SliderTrack} flex ${isXl ? "gap-4" : ""}`}
                                style={{
                                    width: isXl ? undefined : `${TOTAL_CARDS * 100}%`,
                                    transform: trackTransform,
                                }}
                            >
                                {cardContent.map((card, index) => (
                                    <div
                                        key={index}
                                        className={`flex justify-center items-center flex-shrink-0 xl:flex-none ${isXl ? "" : "min-w-0"}`}
                                        style={isXl ? undefined : { width: `${cardWidthPercent}%`, flexBasis: `${cardWidthPercent}%` }}
                                    >
                                        <div className="flex justify-center items-center [&>*]:origin-center [&>*]:scale-[0.82] sm:[&>*]:scale-90 md:[&>*]:scale-95 xl:[&>*]:scale-100">
                                            <S5Card
                                                isActive={index === currentIndex}
                                                isOpen={index === currentIndex}
                                                title={card.title}
                                                content={card.content}
                                                image={card.image}
                                                link={card.link}
                                                index={index}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Pagination, progress bar, prev/next (shared) */}
                    <div className="flex w-full justify-between items-center gap-2 sm:gap-4">
                        <div className="flex justify-between items-center min-w-[60px] sm:min-w-[80px] xl:w-[100px]">
                            <p className="font-[500] text-[14px] sm:text-[18px] xl:text-[20px] text-[#222222]">
                                {currentPage}
                            </p>
                            <span className="font-[500] text-[14px] sm:text-[18px] xl:text-[20px] text-[#808080]">/</span>
                            <p className="font-[500] text-[14px] sm:text-[18px] xl:text-[20px] text-[#808080]">
                                {totalPageLabel}
                            </p>
                        </div>

                        <div className="flex-1 min-w-0 h-[2px] bg-[#D9D9D9] rounded-[5px] relative overflow-hidden mx-1 sm:mx-2">
                            <div
                                className="h-full bg-[#000000] rounded-[5px] transition-all duration-300 ease-out"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>

                        <div className="flex justify-between items-center gap-1 min-w-[56px] sm:min-w-[72px] xl:w-[100px]">
                            <button
                                type="button"
                                onClick={goPrev}
                                className="w-6 h-6 sm:w-7 sm:h-7 xl:w-[28px] xl:h-[28px] cursor-pointer flex justify-center items-center hover:opacity-80 transition-opacity flex-shrink-0"
                                aria-label="Previous card"
                            >
                                <img src="/lft-btn.svg" alt="Ritz Media World – previous" title="Ritz Media World – previous" className="w-full h-full object-contain" />
                            </button>
                            <button
                                type="button"
                                onClick={goNext}
                                className="w-6 h-6 sm:w-7 sm:h-7 xl:w-[28px] xl:h-[28px] cursor-pointer flex justify-center items-center hover:opacity-80 transition-opacity flex-shrink-0"
                                aria-label="Next card"
                            >
                                <img src="/rght-btn.svg" alt="Ritz Media World – next" title="Ritz Media World – next" className="w-full h-full object-contain" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Section5;
