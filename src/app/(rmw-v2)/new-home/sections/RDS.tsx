"use client";
import React from "react";
import S4Card from "../components/S4Card";

function RDS() {
  const s4CardsData = [
    {
      linkTxt: "Digital Marketing",
      title: "Digital marketing strategies that drive growth.",
      list: [
        {
          text: "SEO (Search Engine Optimization)",
          link: "https://ritzmediaworld.com/services/digital-marketing/search-engine-optimization-seo",
        },
        {
          text: "PPC (Google Ads) Services",
          link: "https://ritzmediaworld.com/services/digital-marketing/ppc-google-ads-agency",
        },
        {
          text: "Social Media Management",
          link: "https://ritzmediaworld.com/services/digital-marketing/social-media-management",
        },
        {
          text: "ORM (Online Reputation Management)",
          link: "https://ritzmediaworld.com/services/digital-marketing/orm-in-digital-marketing",
        },
      ],
      cardBg: "bg-gradient-to-tl from-[#F7FFDF] to-[#FFE8D1]",
      linkBG: "bg-[#21EAB5]",
      linkTxtColor: "text-[#101828]",
      img: "/new-page/digital.jpg",
      link: "/services/digital-marketing",
      border: "border-[1px] border-[#EEEEEE]",
      btnBg: "bg-[#EA2175]",
    },
    {
      linkTxt: "Creative Services",
      title: "Creative design solutions that elevate brands.",
      list: [
        {
          text: "Branding & Identity Development",
          link: "https://ritzmediaworld.com/services/digital-marketing/brand-awareness",
        },
        {
          text: "Graphic Design",
          link: "https://ritzmediaworld.com/services/creative-services/graphic-designing",
        },
        {
          text: "Logo Design",
          link: "https://ritzmediaworld.com/services/creative-services/logo-design",
        },
        {
          text: "Print Advertising Design",
          link: "https://ritzmediaworld.com/services/print-advertising",
        },
      ],
      cardBg: "bg-gradient-to-tl from-[#F7FFDF] to-[#EFFFD1]",
      linkBG: "bg-[#21EAB5]",
      linkTxtColor: "text-[#101828]",
      img: "/new-page/banners-for-rmw9.jpg",
      link: "/services/creative-services",
      border: "border-[1px] border-[#EEEEEE]",
      btnBg: "bg-[#EAE721]",
    },
    {
      linkTxt: "Print Advertising",
      title: "Print advertising campaigns that maximize impact.",
      list: [
        {
          text: "Ad Placement",
          link: "https://ritzmediaworld.com/services/print-advertising/ad-placements",
        },
        {
          text: "Copywriting",
          link: "https://ritzmediaworld.com/services/print-advertising/copywriting",
        },
        {
          text: "Ad Scheduling",
          link: "https://ritzmediaworld.com/services/print-advertising/advertisement-scheduling",
        },
        {
          text: "Cost Negotiation",
          link: "https://ritzmediaworld.com/services/print-advertising/negotiating-rates",
        },
      ],
      cardBg: "bg-gradient-to-tl from-[#F7FFDF] to-[#D1FFEC]",
      linkBG: "bg-[#21EAB5]",
      linkTxtColor: "text-[#101828]",
      img: "/new-page/banners-for-rmw5.jpg",
      link: "/services/print-advertising",
      border: "border-[1px] border-[#ECF6FF]",
      btnBg: "bg-[#21EAB5]",
    },
  ];

  return (
    <section
      className="w-full  relative flex flex-col items-center px-4"
      style={{
        paddingTop: "50px !important",
      }}
    >
      <div className="w-full sm:w-[95%] md:w-[92%] lg:w-[90%]">
        <div className="flex flex-col mb-6 gap-2 sm:gap-2.5 md:gap-3 w-full">
          <button className="inline-flex w-fit rounded-full bg-[#F3830E] px-4 py-1.5 sm:px-5 sm:py-2 text-[12px] sm:text-[13px] lg:text-[14px] font-[400] text-white">
            What We Do
          </button>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#101828] lg:text-[48px] lg:leading-[1.1]">
            360° Brand{" "}
            <span className="text-[#F3830E]">Elevation Services</span>
          </h2>
          <p className="max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-4xl text-sm sm:text-base md:text-lg lg:text-[20px] text-[#4A5565] font-[400] leading-relaxed">
            Our in-house team masters the entire spectrum of digital marketing ,
            from strategy and creative development to sophisticated campaigns
            .Our in-house team masters the entire spectrum
          </p>
        </div>
        {s4CardsData.map((ob, idx) => (
          <div
            key={idx}
            className={`lg:sticky w-full mb-4 sm:mb-6 md:mb-8 lg:mb-10 z-[${
              10 + idx
            }] `}
            style={{ top: idx == 0 ? `${2 * 25}px` : `${idx * 200}px` }}
          >
            <S4Card
              link={ob.link}
              linkTxt={ob.linkTxt}
              title={ob.title}
              list={ob.list}
              cardBg={ob.cardBg}
              linkBG={ob.linkBG}
              linkTxtColor={ob.linkTxtColor}
              img={ob.img}
              border={ob.border}
              btnBg={ob.btnBg}
              idx={idx}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default RDS;