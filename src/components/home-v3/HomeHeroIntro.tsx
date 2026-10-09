import React from "react";
import styles from "@/app/(rmw-v2)/page.module.css";

function HomeHeroIntro() {
  return (
    <section
      className={`w-full bg-white pt-6 pb-2 md:pt-8 md:pb-3 lg:pt-10 lg:pb-4 ${styles.container2}`}
      aria-labelledby="home-hero-heading"
    >
      <h1
        id="home-hero-heading"
        className="font-[700] text-[22px] sm:text-[26px] md:text-[30px] lg:text-[26px] xl:text-[30px] text-[#0F1640] leading-tight text-center md:text-center"
      >
        India&apos;s Best Real Estate Digital Marketing &amp; Lead Generation Agency
      </h1>
      <p className="mt-3 md:mt-4 mx-auto  font-[400] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[24px] text-[#4A4A4A] leading-[1.55] text-center max-w-[950px]">
        As a Leading Advertising &amp; Digital Marketing Agency in Noida, Ritz Media World Helps Brands Grow with 17+ Years of Proven Expertise
      </p>
    </section>
  );
}

export default HomeHeroIntro;
