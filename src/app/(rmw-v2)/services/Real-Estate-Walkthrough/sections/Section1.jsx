"use client";

import styles from "./Section1.module.css";
import { useState, useEffect } from "react";

export default function Section1() {
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
          ? "/services/walkthrough/bannermobile.jpg"
          : "/services/walkthrough/bannerdesktop.jpg"
          })`,
  }}
    className="flex w-full min-w-0 min-h-[460px] items-start justify-center overflow-visible bg-[#0a1128] bg-[url('/varunimage/banner-of-render-%20services-mobile.jpg')] bg-cover bg-center bg-no-repeat px-6 pt-18 pb-10 sm:min-h-[400px] sm:px-10 sm:pb-12 md:min-h-[300px] md:items-end md:justify-start md:bg-[url('/varunimage/banner-of-render-%20services.jpg')] md:px-0 md:pt-40 md:pb-14 lg:min-h-[500px] xl:min-h-[570px] lg:px-0 lg:pt-44 lg:pb-16 xl:px-0 xl:pt-48 xl:pb-20 ">
      <div className="flex w-full max-w-4xl flex-col items-center gap-1 text-center md:translate-y-[50px] md:items-start md:gap-2 md:text-left lg:gap-3 xl:gap-5">
        <div className="relative hidden h-[32px] w-[140px] md:block md:h-[37px] md:w-[170px]">
          <img
            src="/home-v3/service-imgs/s1/yellow-reactangle.png"
            alt="Ritz Media World – real estate walkthrough services badge"
            title="Ritz Media World – real estate walkthrough services badge"
            className="h-full w-full object-contain"
          />
          <p
            className={`absolute top-1/2 right-6 -translate-y-1/2 text-[12px] font-bold uppercase tracking-wide text-white sm:right-7 sm:text-[14px] md:right-8 md:text-[16px] ${styles.fontmontserrat}`}
          >
            SERVICES
          </p>
        </div>

        <h1
          className={`text-[32px] font-extrabold leading-[1.1] text-white sm:text-[40px] md:text-[26px] lg:text-[30px] xl:text-[55px] lg:leading-[1.08] xl:px-14 lg:px-13 md:px-12 ${styles.bannerHeadlineSm}`}
          style={{ fontFamily: "MontserratExtraBold, Montserrat, sans-serif" }}
        >
          <span className="block">Real Estate</span>
          <span className="block">Walkthrough Services</span>
        </h1>

        <p
          className=" text-[14px] font-normal leading-[1.5] text-white sm:text-[16px] md:text-[13px] lg:text-[15px] lg:leading-[1.45] xl:whitespace-nowrap xl:px-14 lg:px-13 md:px-12 xl:text-[22px]"
          style={{ fontFamily: "MontserratMedium, Montserrat, sans-serif" }}
        >
          High-quality 3D walkthroughs showcasing every aspect of the property
        </p>
      </div>
    </section>
  );
}
