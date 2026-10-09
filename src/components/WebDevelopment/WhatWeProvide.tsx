"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GoArrowLeft, GoArrowRight, GoArrowUpRight } from "react-icons/go";
import styles from "./webDevelopment.module.css";
import Image from "next/image";
import Link from "next/link";

type ProvideSlide = {
    id: string;
    title: string;
    description: string;
    image: string;
    serviceUrlLink: string;
};


export default function WhatWeProvide() {
    const EXPLORE_ARROW_IMAGE =
        "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";


    const slides: ProvideSlide[] = [
        {
            id: "01",
            title: "UI/UX Design",
            description:
                "Good UX isn't just usability. It's about a data-driven UX strategy and conversion-driven UI design. We can deliver the best mobile first responsive designs, intuitive UIs and user-centric digital experience designs, increasing engagement, accessibility and streamlining customer journey with: Wireframing, Prototyping, Usability Testing and Interaction design. We deliver not just traffic, but enhance user retention rates, increase conversion rates and generate tangible ROI.",
            image: "/webDevelopment/ui-ux.jpg",
            serviceUrlLink: "/services/web-designing-and-development/ui-ux-design",
        },
        {
            id: "02",
            title: "Custom Website Design & Development",
            description:
                "Your business deserves better than a website template. Your business deserves custom website design and full-stack web development designed for performance. Your custom designed websites are responsive and scalable and designed based on your business, customer, and business conversion goals. Our landing pages were created with clean code architecture with the use of a fast loading framework to offer high performance and optimized design for optimal user engagement, search presence, and conversion with the use of each pixel and design element for the benefit of generating leads from clicks.",
            image: "/webDevelopment/Custom-Design-Development.jpg",
            serviceUrlLink: "/services/web-designing-and-development/custom-design-development",
        },
        {
            id: "03",
            title: "E-commerce Website Development",
            description:
                "E-commerce is about delivering a high-performance online shopping experience. Our e-commerce solutions cover custom e-commerce development, secure payment gateway integration, shopping cart optimization, mobile commerce readiness, SEO optimization, speed optimization, product UX design, and conversion funnels. We develop conversion-driven e-commerce sites that increase online sales, customer retention, and lifetime value to build your trustworthy and scalable digital store.",
            image: "/webDevelopment/E-Com-Web-Dev.jpg",
            serviceUrlLink: "/services/web-designing-and-development/e-commerce-web-designing",
        },
        {
            id: "04",
            title: "Landing Page Development",
            description:
                "Our landing pages are designed for you by using conversion rate optimization (CRO), A/B testing, performance marketing, and SEO friendly designs. We engineer your landing pages to have high click-through rates, high quality leads, and excellent campaign ROI through mobile responsiveness and optimizing the conversion of your landing page to acquire quality leads.",
            image: "/webDevelopment/LandingPageDev.jpg",
            serviceUrlLink: "/services/web-designing-and-development/landing-page-development-services",
            // image: "/webDevelopment/WordPress-Web-Design.jpg",
        },
        {
            id: "05",
            title: "WordPress Web Design",
            description: "A robust, flexible and SEO optimized custom WordPress design and development for smart online businesses. We specialize in custom WordPress designs that are fully responsive, easy to use and manage (CMS based), search engine friendly with clean coded and plugin integrated, to get a performant, conversion focused, smart WordPress website to drive leads and sales through content marketing.",
            image: "/webDevelopment/WordPress-Web-Design.jpg",
            serviceUrlLink: "/services/web-designing-and-development/wordpress-web-designing",
        },

    ];

    const HEADING = "What We Provide";
    const SUBHEADING = "Is more than what you'll ever need";

    const slideTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 48 : -48,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 48 : -48,
            opacity: 0,
        }),
    };
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const activeSlide = useMemo(() => slides[activeIndex], [activeIndex]);

    const goPrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % slides.length);
    };

    return (
        <section className={`w-full  py-6 md:py-10  lg:py-14 border-t border-[#D9D9D9] ${styles.page_containerWidth} `}>
            <div className={`${styles.page_containerWidth} mx-auto px-4 md:px-10 lg:px-10 xl:px-13`}>
                <div className="grid grid-cols-1 items-start gap-5 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:items-stretch xl:grid-cols-[1.1fr_1fr_1.1fr] xl:gap-6">
                    <div className="flex flex-col text-center md:col-span-2 md:text-left lg:col-span-1 lg:min-h-[450px] xl:min-h-[480px]">
                        <div className="shrink-0">
                            <p className={`text-[16px] text-[#C99237] ${styles.poppinsMedium}`}>SERVICES</p>
                            <h2
                                className={`mt-1 text-[26px] leading-[1.1] text-[#0A0A0A] md:text-[30px] lg:text-[30px] xl:text-[36px] ${styles.montserratBold}`}
                            >
                                {HEADING}
                            </h2>
                            <p className={`mt-1 text-[16px] font-[400] text-[#101010] ${styles.fontopensans}`}>
                                {SUBHEADING}
                            </p>
                            <div className="sr-only">
                                {slides.map((slide) => (
                                    <h3 key={`service-heading-${slide.id}`}>
                                        {slide.title}
                                    </h3>
                                ))}
                            </div>
                        </div>

                        <div className="hidden min-h-0 flex-1 lg:block" aria-hidden />

                        <div className="mt-4 shrink-0 border-t border-[#D9D9D9] pt-4 lg:mt-0 lg:pt-5">
                            <div className="relative min-h-[3.5rem] overflow-hidden sm:min-h-[4rem] lg:h-[88px] xl:h-[96px]">
                                <Link href={activeSlide?.serviceUrlLink} target="_blank" title={activeSlide?.title.trim()} rel="noopener noreferrer">
                                <AnimatePresence mode="wait" initial={false} custom={direction}>
                                    <motion.div
                                        key={activeIndex}
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={slideTransition}
                                        className="will-change-transform lg:absolute lg:inset-0"
                                    >
                                        <div
                                            className={`grid grid-cols-[auto_1fr] items-start gap-x-2 gap-y-0 text-[#111111] ${styles.montserrat}`}
                                        >
                                            <span className="shrink-0 pt-[0.15em] text-[16px] font-[500] leading-none">
                                                {activeSlide.id}
                                            </span>
                                            <p className="min-w-0 text-left text-[18px] font-[600] leading-[1.2] sm:text-[20px] md:text-[22px] lg:text-[15px] xl:text-[26px]">
                                                {activeSlide.title.trim()}
                                            </p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                                </Link>
                            </div>
                        </div>
                    </div>

                <div className="relative mx-auto w-full h-[260px] max-w-[280px] overflow-hidden rounded-[80px] sm:h-[300px] sm:max-w-[320px] sm:rounded-[100px] md:col-span-2 md:h-[300px] md:max-w-[360px] md:rounded-[120px] lg:col-span-1 lg:h-[450px] lg:max-w-[340px] xl:h-[480px] xl:rounded-[140px]">
                       <Link href={activeSlide?.serviceUrlLink} 
                       target="_blank" title={activeSlide?.title.trim()} rel="noopener noreferrer">
                        <AnimatePresence mode="wait" initial={false} custom={direction}>
                            <motion.img
                                key={activeIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={slideTransition}
                                src={activeSlide.image}
                                alt={`${activeSlide.title.trim()} – web development service`}
                                title={activeSlide.title.trim()}
                                className="absolute inset-0 h-full w-full object-cover will-change-transform"
                            />
                        </AnimatePresence>
                        </Link>
                    </div>

                    <div className="flex min-w-0 flex-col text-center md:col-span-2 md:text-left lg:col-span-1 lg:min-h-[450px] xl:min-h-[480px]">
                        <div className="relative shrink-0 lg:h-[300px] lg:overflow-hidden xl:h-[340px]">
                            <AnimatePresence mode="wait" initial={false} custom={direction}>
                                <motion.div
                                    key={activeIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={slideTransition}
                                    className="will-change-transform lg:absolute lg:inset-0"
                                >
                                    <p
                                        className={`text-[14px] leading-[1.65] text-[#111111] sm:text-[15px] sm:leading-[1.7] md:text-[15px] md:leading-[1.75] lg:text-[15px] xl:text-[16px] ${styles.fontopensans}`}
                                    >
                                        {activeSlide.description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="mt-4 flex shrink-0 flex-col items-center justify-between gap-4 border-t border-[#D8D8D8] pt-4 pb-2 sm:flex-row sm:items-center md:mt-6 md:pb-4 md:items-start lg:mt-5 lg:pb-0">
                            <Link
                                href={activeSlide?.serviceUrlLink}
                                target="_blank"
                                title="Learn more"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center md:justify-start gap-4 md:gap-4 lg:gap-4 xl:gap-6 outline-none focus-visible:ring-2 focus-visible:ring-[#C99237] focus-visible:ring-offset-2 rounded-sm"
                            >
                                <span className={`
                        text-[16px] md:text-[16px] lg:text-[15px] xl:text-[18px] font-[500]  ${styles.montserrat}
                    `}>
                                    Learn more
                                </span>

                                <div className="
                                    w-[30px] h-[30px]
                                    sm:w-[34px] sm:h-[34px]
                                    md:w-[36px] md:h-[36px]
                                    bg-[#C99237] rounded-full 
                                    flex items-center justify-center cursor-pointer hover:bg-[#0F1640]
                                ">
                                    <img
                                        src={EXPLORE_ARROW_IMAGE}
                                        alt="Learn more – explore services arrow"
                                        title="Learn more – explore services"
                                    />
                                </div>
                            </Link>

                            <div className="flex w-full items-center justify-center gap-6 sm:w-auto md:justify-between lg:gap-4 xl:gap-6">
                                <div className="relative ">
                                    <AnimatePresence mode="wait" initial={false} custom={direction}>
                                        <motion.p
                                            key={activeIndex}
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={slideTransition}
                                            className={`text-[16px] font-[500] ${styles.fontopensans} will-change-transform`}
                                        >
                                            {/* Active index (BLACK) */}
                                            <span className="text-black">
                                                {String(activeIndex + 1).padStart(2, "0")}
                                            </span>

                                            <span className="text-[#888888]">  {" / "}</span>

                                            {/* Total slides (GRAY) */}
                                            <span className="text-[#888888]">
                                                {String(slides.length).padStart(2, "0")}
                                            </span>
                                        </motion.p>
                                    </AnimatePresence>
                                </div>
                                <button
                                    onClick={goPrev}
                                    type="button"
                                    aria-label="Previous slide"
                                    className="transition-opacity hover:opacity-70 cursor-pointer"
                                >
                                    <Image
                                        src="/webDevelopment/arrow-left.png"
                                        alt="Previous slide"
                                        title="Previous slide"
                                        width={27}
                                        height={27}
                                        className="h-[20px] w-[20px] xl:h-[27px] xl:w-[27px]"
                                    />
                                </button>

                                <button
                                    onClick={goNext}
                                    type="button"
                                    aria-label="Next slide"
                                    className="transition-opacity hover:opacity-70 cursor-pointer"
                                >
                                    <Image
                                        src="/webDevelopment/arrow-right.png"
                                        alt="Next slide"
                                        title="Next slide"
                                        width={27}
                                        height={27}
                                        className="h-[20px] w-[20px] xl:h-[27px] xl:w-[27px]"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
