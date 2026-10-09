"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Link from "next/link";

function Section4() {
    const slidesData = [
        {
            title: "Expand Your Reach",
            description: "Increase your brand visibility and get good leads with the right content and campaigns for the right audience."
        },
        {
            title: "Engage Your Audience",
            description: "Provide impactful engagement that resonates with users, builds trust, and encourages them to spend more time with your brand."
        },
        {
            title: "Turn Interest into Action",
            description: "Use smart approach and persuasive content for conversion of visitors into valuable customers."
        },
        {
            title: "Build Loyalty",
            description: "Foster lasting connections so they come back and continuously buy your product/service."
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    };

    const goToPrev = () => {
        setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
    };

    return (
        <section className="w-full flex justify-center items-center py-8 sm:py-12 md:py-16 lg:py-20 xl:py-[70px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 border-b border-[#D9D9D9] overflow-x-hidden
        ">
            {/* Centered Align Container  */}
            <div className={`flex flex-col items-center ${styles.containerWidth} justify-center gap-6 sm:gap-8 md:gap-9 lg:gap-10 xl:gap-10`}>
                {/* Top Row  */}
                <div className="flex justify-center items-center relative w-full">
                    <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[280px] md:h-[280px] lg:w-[350px] lg:h-[350px] xl:w-[425px] xl:h-[425px] rounded-full border border-[#D6A047]"></div>
                    <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[280px] md:h-[280px] lg:w-[350px] lg:h-[350px] xl:w-[425px] xl:h-[425px] rounded-full border border-[#D6A047] -ml-[15px] sm:-ml-[20px] md:-ml-[30px] lg:-ml-[35px] xl:-ml-[40px]"></div>

                    {/* Absolute Positioned circle container  */}
                    <div className="absolute top-[50%] left-[50%] w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[280px] md:h-[280px] lg:w-[350px] lg:h-[350px] xl:w-[425px] xl:h-[425px] rounded-full
                     bg-gradient-to-br from-[#C1892C] to-[#EFBB68]
                      -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-center">
                        <p className={`font-[600] text-[24px] sm:text-[32px] md:text-[44px] lg:text-[56px] xl:text-[70px] text-[#ffffff] ${styles.fontMontserrat}`}>Engage</p>
                    </div>

                    {/* Absolute Positioned text container  */}
                    <div className="absolute top-[50%] left-[50%] w-full flex justify-between  md:justify-center -translate-x-1/2 -translate-y-1/2 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-0  md:gap-[25rem] xl:gap-[35rem]">
                        <p className={`font-[500] text-[18px] sm:text-[32px] md:text-[44px] lg:text-[56px] xl:text-[70px] text-[#0F1640] ${styles.fontMontserrat}`}>Reach</p>
                        <p className={`font-[500]  text-[18px] sm:text-[32px] md:text-[44px] lg:text-[56px] xl:text-[70px] text-[#0F1640]  ${styles.fontMontserrat}`}>Convert</p>
                    </div>
                </div>

                {/* Bottom Slider Container  */}
                <div className="flex flex-col xl:w-[75%] w-full sm:flex-row justify-center items-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-2 px-4">
                    {/* Left Side Button Container  */}
                    <div className="order-2 sm:order-1 hidden sm:block">
                        <button onClick={goToPrev} className="flex items-center justify-center"><BsArrowLeft className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] md:w-[24px] md:h-[24px] lg:w-[25px] lg:h-[25px] xl:w-[27px] xl:h-[27px] cursor-pointer" /></button>
                    </div>
                    {/* Centered Align Slide Container  */}
                    <div className="flex flex-col gap-2 text-center order-1 sm:order-2 flex-1 max-w-full sm:max-w-none overflow-hidden">
                        <div className="relative ">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{
                                    transform: `translateX(-${currentSlide * (100 / slidesData.length)}%)`,
                                    width: `${slidesData.length * 100}%`
                                }}
                            >
                                {slidesData.map((slide, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-2 text-center flex-shrink-0"
                                        style={{ width: `calc(100% / ${slidesData.length})` }}
                                    >
                                        <h4 className={`font-[700] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] ${styles.fontMontserrat}`}>{slide.title}</h4>
                                        <p className={`font-[400] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] max-w-full sm:max-w-[400px] md:max-w-[450px] lg:max-w-[480px] xl:max-w-[520px] mx-auto ${styles.fontopensans}`}>{slide.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 w-full justify-center items-center sm:hidden">
                        <button onClick={goToPrev} className="flex items-center justify-center"><BsArrowLeft className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] md:w-[24px] md:h-[24px] lg:w-[25px] lg:h-[25px] xl:w-[27px] xl:h-[27px] cursor-pointer" /></button>
                        <button onClick={goToNext} className="flex items-center justify-center"><BsArrowRight className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] md:w-[24px] md:h-[24px] lg:w-[25px] lg:h-[25px] xl:w-[27px] xl:h-[27px] cursor-pointer" /></button>
                    </div>
                    {/* Right Side Button Container  */}
                    <div className="order-3 hidden sm:block">
                        <button onClick={goToNext} className="flex items-center justify-center"><BsArrowRight className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] md:w-[24px] md:h-[24px] lg:w-[25px] lg:h-[25px] xl:w-[27px] xl:h-[27px] cursor-pointer" /></button>
                    </div>
                </div>

                <div className="w-full flex justify-center items-center">
                    <Link href="/contact.html" target="_blank" title="Let's Talk Today" aria-label="Let's Talk Today" className="mt-4 lg:mt-5 flex items-center text-[#  ] justify-center gap-4 cursor-pointer letsTalkToday p-3 rounded-[5px]">
                        <span
                            className=" text-[18px]   md:text-[20px] font-[500]"
                            style={{ fontFamily: "MontserratMedium" }}
                        >
                            Let&apos;s Talk Today
                        </span>
                        <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C99237] flex items-center justify-center hover:bg-[#b8822f] transition-colors letsTalkTodayIcon">

                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.4276 2.92383L17.1346 9.08052L12.9493 4.01635L19.4276 2.92383Z" fill="white" />
                                <rect x="2.19678" y="16.7171" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19678 16.7171)" fill="white" />
                            </svg>

                        </span>
                    </Link>     
                </div>
            </div>
        </section>
    )
}

export default Section4;