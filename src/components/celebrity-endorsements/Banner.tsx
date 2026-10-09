import Image from "next/image";
import React from "react";
import styles from "./page.module.css";

export default function Banner() {
    return (
        <section className={`w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[490px] 
        bg-[url("/radio-advertising-page/s1/banner1.png")] 
        bg-cover bg-no-repeat bg-center flex items-end pb-8 sm:pb-12 md:pb-16 lg:pb-20
         xl:pb-26 px-4 sm:px-6 md:px-8 lg:px-0`}>
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-none">
                <div className="w-[120px] sm:w-[140px] md:w-[155px] lg:w-[179px] h-[28px] sm:h-[32px] md:h-[35px] lg:h-[37px] relative">
                    <Image
                        src="/home-v3/service-imgs/s1/yellow-reactangle.png"
                        alt="RMW"
                        fill
                        className="object-contain"
                        sizes="(min-width:1024px) 165px, (min-width:768px) 155px, (min-width:640px) 140px, 120px"
                        priority
                    />
                    <p className={`font-[700]  text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] text-white absolute top-[50%] uppercase -translate-y-1/2 right-4 sm:right-5 md:right-6 lg:right-8 ${styles.fontmontserrat}`}>
                        Services
                    </p>
                </div>
                <div className="pl-0 sm:pl-4 md:pl-8 lg:pl-16">
                    <p className={`font-[500] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px] xl:text-[21px] text-white leading-tight sm:leading-snug md:leading-normal ${styles.fontmontserrat}`}>
                    Broadcast your brand message louder, clearer, more effectively.
                    </p>
                    <h1 className={`font-[800] text-[28px] sm:text-[36px] md:text-[48px] lg:text-[55px] text-white leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-14 mt-1 sm:mt-2 md:mt-3 ${styles.fontmontserrat}`}>
                    Radio Advertising<br />
                        <span className="font-[500]">Services</span>
                    </h1>
                </div>
            </div>
        </section>
    );
}
