import Image from "next/image";
import React from "react";
import styles from "./webDevelopment.module.css";

const BANNER_ALT =
    "Web Development services – custom responsive websites by Ritz Media World";

function Section1() {
    return (
        <section
            className={`relative flex h-[460px] w-full items-center overflow-hidden pb-8 sm:pb-4 px-0 md:h-[380px] md:items-end lg:min-h-[560px] xl:min-h-[620px]`}
            aria-label={BANNER_ALT}
        >
            <Image
                src="/webDevelopment/tab-web-devlopment-.jpg"
                alt={BANNER_ALT}
                title={BANNER_ALT}
                fill
                priority
                className="object-cover object-bottom md:hidden"
                sizes="100vw"
            />
            <Image
                src="/webDevelopment/banner.jpg"
                alt={BANNER_ALT}
                title={BANNER_ALT}
                fill
                priority
                className="hidden object-cover object-right-bottom md:block"
                sizes="100vw"
            />

            {/* Bottom text */}
            <div className="relative z-10 flex w-full max-w-full flex-col gap-3 sm:gap-4 md:max-w-[80%] md:gap-0 lg:max-w-none lg:gap-3 xl:gap-6">
                {/* Row 1  Yellow ReactAngle */}
                <div className="hidden md:block md:w-[160px] xl:w-[170px]  md:h-[30px] xl:h-[37px] relative">
                    <img src="/home-v3/service-imgs/s1/yellow-reactangle.png" 
                    alt="Ritz Media World – influencer marketing" title="Ritz Media World – influencer marketing" className='w-full h-full' />
                    <p className={`font-[700] uppercase text-[16px] text-white absolute top-[50%] transform translate-y-[-50%] right-8 leading-tight ${styles.montserrat} `}>Services</p>
                </div>

                {/* Row 2  */}
                <div className="flex flex-col gap-2 pb-[176px] pl-0 md:pb-[15px] md:pl-9 lg:pb-0 lg:pl-10 xl:pl-12">
                    <h1 className={`mt-1 text-center text-[26px] font-[800] leading-[1.1] text-white sm:mt-2 sm:text-[36px] sm:leading-[1.15] md:mt-0 md:text-left md:text-[31px] md:leading-[1.2] lg:text-[55px] lg:leading-14 ${styles.montserratExtraBold}`}>
                        Web Development
                    </h1>
                    <h2 className={`text-center text-[14px] font-[500] leading-[1.45] text-white sm:text-[16px] sm:leading-[1.5] md:text-left lg:text-[19px] xl:text-[21px] ${styles.montserratMedium}`}>
                        <span className="block">Custom, responsive and conversion focused website{" "}</span>
                        <span className="block">development for your brand</span>
                    </h2>
                </div>
            </div>
        </section>
    )
}

export default Section1;