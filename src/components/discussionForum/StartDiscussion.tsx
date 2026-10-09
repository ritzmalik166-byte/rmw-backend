import React from 'react'
import styles from './discussion.module.css';

export default function StartDiscussion() {

    const EXPLORE_ARROW_IMAGE =
        "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

    return (
        <section className="w-full flex justify-center items-center py-5  md:py-8 lg:py-10">
        <div className="w-full bg-white px-4  sm:px-6 md:px-10 lg:px-14 xl:px-13">
            <div className="mx-auto flex w-full flex-col items-center rounded-[5px] bg-[#F7F7F7] px-6 py-12 text-center  sm:px-10 sm:py-16 md:px-14 lg:px-20">
                <h2 className={`text-[20px] sm:text-[30px] md:text-[36px] ${styles.montserratBold}`}>
                    Start Your Discussion Today
                </h2>

                <p className={`mx-auto mt-5 max-w-5xl text-[14px] leading-8  sm:text-[16px] md:text-[18px] ${styles.poppins}`}>
                    Drop your question, share your views & ideas, or explore ongoing discussions and be part of a growing community driven by creativity, strategy, and results.
                </p>

                <div className="flex items-center gap-6 mt-5">
                    <span className={`text-[18px] font-[500] ${styles.montserrat}`}>
                        Start Discussion
                    </span>

                    <div className="w-[36px] h-[36px] bg-[#C99237] rounded-full flex items-center justify-center">
                        <img src={EXPLORE_ARROW_IMAGE} alt="Explore Arrow" className="text-white text-[16px]" />
                    </div>
                </div>
            </div>
        </div>
        </section>
    )
}
