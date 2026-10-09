"use client";
import React, { useRef } from "react";
import S4Card from "../components/S4Card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

function NewS4() {
  const s4CardsData = [
    {
      linkTxt: "Digital Marketing",
      title: "Digital marketing strategies that drive growth.",
      list: [
        { text: "SEO (Search Engine Optimization)", link: "https://ritzmediaworld.com/services/digital-marketing/search-engine-optimization-seo" },
        { text: "PPC (Google Ads) Services", link: "https://ritzmediaworld.com/services/digital-marketing/ppc-google-ads-agency" },
        { text: "Social Media Management", link: "https://ritzmediaworld.com/services/digital-marketing/social-media-management" },
        { text: "ORM (Online Reputation Management)", link: "https://ritzmediaworld.com/services/digital-marketing/orm-in-digital-marketing" },
      ],
      cardBg: "bg-gradient-to-tl from-[#D1FFEC] to-[#F7FFDF]",
      linkBG: "bg-[#21EAB5]",
      linkTxtColor: "text-[#101828]",
      img: "/new-page/digital.jpg",
      top: "top-0",
      link: "/services/digital-marketing",
    },
    {
      linkTxt: "Creative Services",
      title: "Creative design solutions that elevate brands.",
      list: [
        { text: "Branding & Identity Development", link: "https://ritzmediaworld.com/services/digital-marketing/brand-awareness" },
        { text: "Graphic Design", link: "https://ritzmediaworld.com/services/creative-services/graphic-designing" },
        { text: "Logo Design", link: "https://ritzmediaworld.com/services/creative-services/logo-design" },
        { text: "Print Advertising Design", link: "https://ritzmediaworld.com/services/print-advertising" },
      ],
      cardBg: "bg-gradient-to-tl from-[#F7FFDF] to-[#EFFFD1]",
      linkBG: "bg-[#21EAB5]",
      linkTxtColor: "text-[#101828]",
      img: "/new-page/banners-for-rmw9.jpg",
      top: "top-20",
      link: "/services/creative-services", 
    },
    {
      linkTxt: "Print Advertising",
      title: "Print advertising campaigns that maximize impact.",
      list: [
        { text: "Ad Placement", link: "https://ritzmediaworld.com/services/print-advertising/ad-placements" },
        { text: "Copywriting", link: "https://ritzmediaworld.com/services/print-advertising/copywriting" },
        { text: "Ad Scheduling", link: "https://ritzmediaworld.com/services/print-advertising/advertisement-scheduling" },
        { text: "Cost Negotiation", link: "https://ritzmediaworld.com/services/print-advertising/negotiating-rates" },
      ],
      cardBg: "bg-gradient-to-tl from-[#F7FFDF] to-[#FFE8D1]",
      linkBG: "bg-[#21EAB5]",
      linkTxtColor: "text-[#101828]",
      img: "/new-page/banners-for-rmw5.jpg",
      top: "top-8",
      link: "/services/print-advertising",
    },
  ];

  const cardRefs = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <section ref={sectionRef} className="w-full overflow-x-hidden flex flex-col justify-center items-center py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 max-w-full">
      {/* Center Align Div  */}
      <div className="w-full sm:w-[95%] md:w-[92%] lg:w-[90%] h-full flex flex-col">
        {/* Top Text Content Div  */}
        <div className="flex flex-col gap-2 sm:gap-2.5 md:gap-3">
          <button className="inline-flex w-fit rounded-full bg-[#D4A574] px-4 py-1.5 sm:px-5 sm:py-2 text-[12px] sm:text-[13px] lg:text-[14px] font-[400] text-white">
            What We Do
          </button>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#101828] lg:text-[48px] lg:leading-[1.1]">
            360° Brand{" "}
            <span className="text-[#D4A574]">Elevation Services</span>
          </h2>
          <p className="max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-4xl text-sm sm:text-base md:text-lg lg:text-[20px] text-[#4A5565] font-[400] leading-relaxed">
            Our in-house team masters the entire spectrum of digital marketing ,
            from strategy and creative development to sophisticated campaigns
            .Our in-house team masters the entire spectrum
          </p>
        </div>
         <div className="w-full hidden justify-center items-center mt-6 sm:mt-8 md:mt-10 lg:mt-12  flex-col gap-6 sm:gap-8 md:gap-9 lg:gap-10  relative h-[110vh] overflow-hidden">
          {/* Cards Section   */}
          {/* {s4CardsData.map((ob, idx) => {
            return (
              // <S4Card
              //   link={ob.link}
              //   ref={(el) => {
              //     if (el) cardRefs.current[idx] = el;
              //   }}
              //   key={idx}
              //   linkTxt={ob.linkTxt}
              //   title={ob.title}
              //   list={ob.list}
              //   cardBg={ob.cardBg}
              //   linkBG={ob.linkBG}
              //   linkTxtColor={ob.linkTxtColor}
              //   img={ob.img}
              //   top={ob.top}
              // />
            )
          })} */}
        </div>
      </div>
         {/* Bottom Cards Div  */}
        
    </section>
  );
}

export default NewS4;