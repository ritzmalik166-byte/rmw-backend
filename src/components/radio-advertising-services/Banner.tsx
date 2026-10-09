"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Banner() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth < 768); // md breakpoint
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    return (
        <section
            style={{
                backgroundImage: `url(${isMobile
                    ? "/alishba-services-v3/radio-advertising/Radio-banner-mobile.png"
                    : "/alishba-services-v3/radio-advertising/Radio-banner2.jpg"
                    })`,
            }}
            className={`w-full min-h-[520px]  md:min-h-[363px] lg:min-h-[490px] xl:h-[516px]
        bg-cover bg-no-repeat bg-center flex items-center justify-center md:justify-start text-center md:text-left md:items-end pb-8 sm:pb-12 md:pb-8 lg:pb-10
         px-4 sm:px-6 md:px-0 lg:px-0`}>
            <div className="flex flex-col gap-3 md:gap-0 xl:gap-4  w-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-none">
                <div className="w-[120px] hidden md:block sm:w-[140px] md:w-[155px] lg:w-[179px] h-[28px] sm:h-[32px] md:h-[35px] lg:h-[37px] relative">
                    <Image
                        src="/home-v3/service-imgs/s1/yellow-reactangle.png"
                        alt="RMW"
                        title="RMW"
                        fill
                        className="object-contain"
                        sizes="(min-width:1024px) 165px, (min-width:768px) 155px, (min-width:640px) 140px, 120px"
                        priority
                    />
                    <p className={`font-[700]  text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] text-white absolute top-[50%] uppercase -translate-y-1/2 right-4 sm:right-5 md:right-10 lg:right-8 ${styles.fontmontserrat}`}>
                        Services
                    </p>
                </div>
                <div className="pl-0 sm:pl-4 md:pl-8 lg:pl-16 pb-[177px] md:pb-0">

                    <h1 className={`font-[800] text-[28px] sm:text-[36px] md:text-[24px] lg:text-[30px] xl:text-[55px] text-white leading-[30px] md:leading-normal mb-2 md:mb-0 xl:leading-14 mt-1 sm:mt-2 md:mt-3 ${styles.fontmontserrat}`}>
                        Radio Advertising
                    </h1>
                    <h2 className={`font-[500] text-[14px] sm:text-[16px] md:text-[16px] lg:text-[19px] xl:text-[21px] text-white leading-tight sm:leading-snug md:leading-normal ${styles.fontmontserrat}`}>
                        Broadcast your brand message louder, <br className="hidden md:block xl:hidden" /> clearer, <br className="hidden  xl:block" /> more effectively.
                    </h2>
                </div>
            </div>
        </section>
    );
}
