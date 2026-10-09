"use client";

import Image from "next/image";
import styles from './discussion.module.css';

export default function WhyJoin() {

    const EXPLORE_ARROW_IMAGE =
        "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";
    return (
        <section className="w-full flex justify-center items-center py-5  md:py-5 lg:py-5">
        <div className={`w-full flex justify-center items-center  pl-4 sm:pl-6 md:pl-6 lg:pl-12 ${styles.page_containerWidth}`}>

            {/* MAIN GRID */}
            <div className="
                mx-auto 
                grid 
                grid-cols-1 
                md:grid-cols-2
                lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.45fr)]
                xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.45fr)]
               gap-2 lg:gap-0
               border-t border-[#F7F7F7] 
            ">

                {/* LEFT SECTION */}
                <div className="col-span-1
                    md:col-span-1 lg:col-span-1 xl:col-span-1
                    flex flex-col gap-5 sm:gap-6 justify-start xl:justify-end h-full
                ">
                    {/* Circle + Heading */}
                    <div className="
                        relative self-center md:self-start
                        w-[200px] h-[220px]
                        sm:w-[220px] sm:h-[240px]
                        md:w-[240px] md:h-[260px]
                        xl:w-[250px] xl:h-[285px]
                    ">
                        <img
                            src="/discussion-forum/circle.png"
                            alt="Why Join"
                            className="w-full h-full object-contain"
                        />

                        <h2 className={`
                            absolute inset-0 flex items-center text-left 
                            px-5 sm:px-6 xl:px-6
                            text-[16px] sm:text-[18px] md:text-[20px] xl:text-[22px]
                            font-bold leading-snug text-black
                            ${styles.montserratBold}
                        `}>
                            Why Join Our <br /> Discussion <br />Forum?
                        </h2>
                    </div>

                    {/* Paragraph */}
                    <p className={`
                         leading-relaxed 
                        text-[14px] sm:text-[15px] md:text-[16px]
                        max-w-full sm:max-w-sm
                        lg:pr-4 xl:pr-6
                        ${styles.fontopensans}
                    `}>
                        At <span className="font-bold">Ritz Media World</span>, we believe that the best ideas come from collaboration and conversation. With 17+ years of experience as a top marketing agency in India and a top ad agency in Noida, we bring real-world insights into every discussion.
                    </p>

                    {/* CTA */}
                    <div className={`flex items-center gap-3 sm:gap-4 ${styles.montserrat}`}>
                        <span className="text-[15px] sm:text-[16px] xl:text-lg font-medium">
                            Let’s Talk Today
                        </span>

                        <div className="
                            cursor-pointer 
                            w-[40px] h-[40px]
                            sm:w-[44px] sm:h-[44px]
                            xl:w-12 xl:h-12
                            bg-[#C99237] rounded-full 
                            flex items-center justify-center
                        ">
                            <img src={EXPLORE_ARROW_IMAGE} alt="Explore Arrow" />
                        </div>
                    </div>
                </div>

                {/* MIDDLE IMAGE */}
                <div className="
                    w-full flex justify-center lg:justify-end 
                    md:col-span-1 
                    xl:col-span-1
                    xl:pl-6 
                    items-center xl:items-end
                ">
                    <div className={`
                        relative 
                        w-[260px] h-[300px]
                        sm:w-[300px] sm:h-[340px]
                        md:w-[320px] md:h-[360px]
                        lg:w-[344px] lg:h-[469px]
                        xl:w-[344px] xl:h-[469px]
                    `}>
                        <Image
                            src="/discussion-forum/whyjoin.png"
                            alt="discussion"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* RIGHT LIST */}
                <div className={`
                    bg-[#F7F7F7] 
                    p-4 sm:p-5 md:p-8
                    md:col-span-2 
                    xl:col-span-1 lg:col-span-1 
                    h-auto min-[1024px]:max-[1239px]:h-[514px] min-[1240px]:max-[1365px]:h-[488px] xxl:h-[639px] 
                `}>
                    <div className={`flex flex-col gap-4 sm:gap-5 md:gap-8 lg:gap-12 xl:gap-13 justify-center lg:justify-end h-full ${styles.fontopensans}`}>
                        {[
                            "Ask questions about digital marketing agencies and strategies",
                            "Discuss trends with a social media marketing agency in India",
                            "Get expert advice from a content marketing agency in Noida",
                            "Connect with professionals looking for the best marketing agency in India",
                            "Learn strategies used by the top digital marketing company in Noida"
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3 sm:gap-4 ">

                                <img
                                    src="/discussion-forum/check.png"
                                    alt="check"
                                    className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] mt-1.5 sm:mt-2"
                                />

                                <p className="
                                    text-black
                                    text-[14px] sm:text-[14px] md:text-[15px] lg:text-[14px] xl:text-[16px]
                                    leading-relaxed 
                                ">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </section>
    );
}