"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";

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
                backgroundImage: `url(${
                    isMobile
                        ? "/clients-page/bannermobile.jpg"
                        : "/clients-page/bannerdesktop.jpg"
                })`,
            }}
            className={`relative w-full overflow-hidden bg-[#0F1640] bg-cover bg-no-repeat bg-center
                flex items-end justify-center md:justify-start
                min-h-[300px] sm:min-h-[340px] md:min-h-[363px] lg:min-h-[490px] xl:min-h-[516px]
                ${styles.bannerHeight}
                px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16
                pb-8 sm:pb-10 md:pb-10 lg:pb-12`}
        >
            <div className="relative z-10 flex w-full max-w-[1280px] flex-col text-center md:text-left">
                <div className="flex w-full flex-col items-center gap-2 sm:gap-2.5 md:items-start md:gap-3 lg:gap-4">
                    <h1
                        className={`font-[800] text-white ${styles.fontmontserrat} ${styles.clientsBannerTitle}`}
                    >
                        Clients
                    </h1>
                    <p
                        className={`font-[500] text-white ${styles.fontmontserrat} ${styles.clientsBannerSubtitle}`}
                    >
                        Leading Brands Trust Our Expertise For Reliable Innovative
                        Business Solutions
                    </p>
                </div>
            </div>
        </section>
    );
}
