"use client";
import Image from "next/image";
import styles from './discussion.module.css';

export default function WhoShouldJoin() {
    const EXPLORE_ARROW_IMAGE =
        "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

    const cards = [
        { icon: "/discussion-forum/briefcase.png", line1: "Business owners &", line2: "entrepreneurs" },
        { icon: "/discussion-forum/professional.png", line1: "Marketing", line2: "professionals" },
        { icon: "/discussion-forum/rocket.png", line1: "Startups &", line2: "founders" },
        { icon: "/discussion-forum/realState.png", line1: "Real estate", line2: "developers" },
        { icon: "/discussion-forum/School.png", line1: "Schools & educational", line2: "institutions" },
    ];

    return (
        <section className="w-full flex justify-center items-center py-5  md:py-5 lg:py-5">    
        <div className={`w-full  px-4 md:px-12 flex justify-center items-center ${styles.page_containerWidth}`}>
            <div className="max-w-[1320px] mx-auto">
                {/* MAIN GRID */}
                <div className="
                    grid 
                    grid-cols-1 
                    md:grid-cols-1 
                    lg:grid-cols-[1fr_280px] 
                    xl:grid-cols-[1fr_360px] 
                    gap-3
                ">
                    {/* LEFT SIDE */}
                    <div className="
                        grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-2 
                        lg:grid-cols-3 
                        gap-3
                    ">

                        {/* TITLE */}
                        <div className="flex items-start sm:col-span-1 lg:col-span-1">
                            <h2 className={`
                                text-[26px] leading-[32px]
                                sm:text-[32px] sm:leading-[38px]
                                md:text-[36px] md:leading-[42px]
                                lg:text-[32px] lg:leading-[32px]
                                xl:text-[42px] xl:leading-[48px]
                                 text-black
                            ${styles.montserratBold} `}>
                                Who Should Join?
                            </h2>
                        </div>

                        {/* CARDS */}
                        {cards.map((card, i) => (
                            <div
                                key={i}
                                className="
                                    bg-[#F7F7F7] 
                                    min-h-[100px] sm:min-h-[121px] lg:h-[141px]
                                    px-4 sm:px-[18px] 
                                    flex items-center gap-3 sm:gap-[14px]
                                "
                            >
                                <Image
                                    src={card.icon}
                                    alt="icon"
                                    width={45}
                                    height={45}
                                    className="w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] md:w-[40px] md:h-[40px] lg:w-[40px] lg:h-[40px] xl:w-[42px] xl:h-[42px]"
                                />

                                <p
                                    className={`
                                        text-[13px] leading-[20px]
                                        sm:text-[15px] sm:leading-[25px]
                                        md:text-[14px] md:leading-[22px]
                                        lg:text-[14px] lg:leading-[22px]
                                        xl:text-[18px] xl:leading-[30px]
                                        font-[600] text-black

                                        flex flex-col md:flex-col 
                                        max-md:flex-row max-md:flex-wrap

                                        ${styles.fontopensans}
                                    `}
                                >
                                    <span>{card.line1}</span>
                                    <span className="max-md:ml-1">{card.line2}</span>
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT CTA */}
                    <div className="
                        bg-white border border-[#E6E6E6] 
                        p-4 sm:p-5 lg:p-[35px] 
                        h-auto lg:h-[294px]
                        flex flex-col justify-between gap-4
                    ">
                        <p className={`
                            text-[13px] leading-[20px]
                            sm:text-[15px] sm:leading-[24px]
                            md:text-[14px] md:leading-[22px]
                            xl:text-[18px] xl:leading-[30px]
                            text-black
                        ${styles.fontopensans} `}>
                            Anyone searching for a{" "}
                            <span className="font-[600]">
                                digital marketing company in Noida
                            </span>{" "}
                            or{" "}
                            <span className="font-[600]">
                                top ad agency in Delhi NCR
                            </span>
                        </p>

                        <div className={`flex items-center gap-3 ${styles.montserrat} font-[500]`}>
                            <span className="text-[14px] sm:text-[15px] lg:text-[18px] font-[500]">
                                Let’s Connect
                            </span>

                            <div className="w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] lg:w-[36px] lg:h-[36px] bg-[#C99237] rounded-full flex items-center justify-center">
                                <img
                                    src={EXPLORE_ARROW_IMAGE}
                                    alt="Explore Arrow"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </section>
    );
}