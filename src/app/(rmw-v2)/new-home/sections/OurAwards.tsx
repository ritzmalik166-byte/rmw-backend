"use client";

import Link from "next/link";
import React, { useRef } from "react";
import ScrollSlider2 from "../components/ScrollSlider2";

// Card data array with dynamic backgrounds
const cardsData = [
  {
    id: 3,
    title: "Best Creative Agency (Real Estate) in Delhi/NCR By Big FM",
    description:
      "A credibility-driven recognition awarded for long-term reliability, impactful brand results, and ethical advertising practices. Highlights Ritz Media World's leadership in delivering consistent success to real estate giants and corporate brands across NCR.",
    imgSrc: "/new-page/awards/7.jpg",
  },
  {
    id: 5,
    title: "Best Real Estate Podcast In India - HT Smartcast Podmasters Awards 2025",
    description:
      "Awarded for unmatched marketing performance, integrated communication strategies, and exceptional client satisfaction. Recognises Ritz Media World's dominance in delivering full-funnel marketing outcomes across print, digital, outdoor, and experiential platforms.",
    imgSrc: "/new-page/awards/aw5.jpg",
  },
  {
    id: 4,
    title: "Most Trusted Advertising Agency in Delhi/NCR – The Economic Times (2024)",
    description:
      "Conferred to leading organisations shaping industry excellence. Ritz Media World received this honour for pioneering creative standards, innovative campaign frameworks, and multi-platform brand strategies that influence consumer behaviour at scale.",
    imgSrc: "/new-page/awards/aw4.jpg",
  },
    {
   
    id: 1,
    title: " Most Trusted Advertising Agency in Delhi/NCR – The Economic Times (2022)",
    description:
      "A prestigious honour celebrating exceptional creativity, strategic thinking, and breakthrough campaigns. Awarded to Ritz Media World for consistently delivering high-impact advertising solutions that redefine brand storytelling across real estate, lifestyle, and consumer categories.",
    imgSrc: "/new-page/awards/aw1.jpg",
  },
  {
    id: 2,
    title: "Excellence in Digital Media – Hindustan Times (2024)",
    description:
      "Recognises outstanding performance in digital innovation, content strategy, and ROI-focused campaigns. Ritz Media World earned this award for transforming brand visibility through data-driven marketing and high-engagement digital solutions across North India.",
    imgSrc: "/new-page/awards/aw7.jpg",
  },
  
];

function OurAwards() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full justify-center overflow-hidden overflow-x-hidden py-12 sm:py-16 md:py-20 lg:py-24 max-w-full bg-cover bg-no-repeat bg-center bg-[url(/home-v3/awards-bg/awards-bg-mobile.png)] md:bg-[url(/home-v3/awards-bg/awards-bg-desktop.png)]"
    >
      <div className="flex w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[95%] flex-col gap-8 sm:gap-10 md:gap-12 px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Row 1 */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 text-center">
          <button className="inline-flex h-8 sm:h-9 md:h-10 w-[140px] sm:w-[150px] md:w-[156px] items-center justify-center rounded-full bg-[#F3830E] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] font-[400] text-[#ffffff] px-3">
            Achievement Awards
          </button>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-semibold text-[#ffffff] leading-tight sm:leading-snug lg:leading-[1.1] md:flex">
            Awards & Company
            <span className="text-[#F3830E] md:block transform -translate-y-[2px] sm:-translate-y-[4px]">
              Recognitions
            </span>
          </h2>
        </div>

        {/* Row 2 - Slider */}
        <ScrollSlider2 cards={cardsData} sectionRef={sectionRef} /> 
      </div>
    </section>
  );
}

export default OurAwards;
