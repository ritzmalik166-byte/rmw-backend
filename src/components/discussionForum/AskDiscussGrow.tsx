"use client";

import Image from 'next/image'
import React from 'react'
import styles from './discussion.module.css';

export default function AskDiscussGrow() {

    const EXPLORE_ARROW_IMAGE =
        "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

    return (
        <section className={`flex justify-center items-center
            w-full bg-[#08143f] text-white 
            px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 
            py-8 sm:py-10 md:py-12 lg:py-14
            my-5 md:my-12 
        `}>
            <div className="mx-auto flex flex-col items-center text-center">
                {/* HEADING */}
                <h1 className={`
                    text-[28px] leading-tight tracking-[-0.02em]
                    sm:text-[36px]
                    md:text-[48px]
                    lg:text-[56px]
                    ${styles.montserratBold}
                `}>
                    ASK. DISCUSS. GROW.
                </h1>

                {/* QUOTE IMAGE */}
                <div className="relative mt-6 sm:mt-8 flex items-center justify-center">
                    <div className="
                        relative 
                        w-[160px] h-[160px]
                        sm:w-[200px] sm:h-[200px]
                        md:w-[220px] md:h-[220px]
                        lg:w-[242px] lg:h-[215px]
                    ">
                        <Image
                            src="/discussion-forum/quote.png"
                            alt="discussion quote bubble"
                            fill
                            className="object-contain"
                        />

                        <div className={`
                            absolute inset-0 flex flex-col items-center justify-center 
                            px-3 sm:px-4 md:px-6 
                            text-[19px] sm:text-[14px] md:text-[25px] lg:text-[30px]
                            font-semibold leading-tight text-center
                            ${styles.montserratMedium}
                        `}>
                            <span>Got a</span>
                            <span>question or</span>
                            <span>idea?</span>
                        </div>
                    </div>
                </div>

                {/* TEXT */}
                <p className={`
                    mx-auto mt-6 sm:mt-8 md:mt-10
                    text-[16px] sm:text-[14px] md:text-[16px] lg:text-[16px]
                    leading-6 sm:leading-[35px]
                    text-[#e8ebf4]
                   ${styles.fontopensans}
                `}>
                    Start a discussion and get insights from industry experts and the creative minds at{" "}<br />
                    <span className={`font-semibold text-white  text-[16px] xl:text-[26px] ${styles.montserratBold}`}>
                        RITZ MEDIA WORLD
                    </span>.
                </p>

                <p className={`
                    mx-auto mt-2 
                    text-[16px] sm:text-[16px] md:text-[16px]
                    leading-6 sm:leading-7 
                   ${styles.fontopensans}
                `}>
                    Because great brands are not built alone, they are built through ideas, conversations, and strategy.
                </p>

                {/* CTA */}
                <div className="flex items-center gap-4 sm:gap-6 mt-5 sm:mt-8">
                    <span className={`
                        text-[16px] sm:text-[18px] md:text-[18px] font-[500] ${styles.montserrat}
                    `}>
                        Let’s Talk
                    </span>

                    <div className="
                        w-[30px] h-[30px]
                        sm:w-[34px] sm:h-[34px]
                        md:w-[36px] md:h-[36px]
                        bg-[#C99237] rounded-full 
                        flex items-center justify-center
                    ">
                        <img src={EXPLORE_ARROW_IMAGE} alt="Explore Arrow" />
                    </div>
                </div>

            </div>
        </section>
    )
}