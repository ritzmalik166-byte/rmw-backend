"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import styles from "./S3.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

function S3() {
  const swiperRef = useRef<SwiperType | null>(null);

  // Data array for slides
  const slidesData = [
    {
      img: "/varunimage/digital-what-we-do.jpg",
      category: "Digital Marketing",
      ttl: "Digital marketing strategies that drive growth",
      list: [
        {subService:"SEO (Search Engine Optimization)", link: "https://ritzmediaworld.com/services/digital-marketing/search-engine-optimization-seo"},
        {subService:"PPC (Google Ads) Services", link: "https://ritzmediaworld.com/services/digital-marketing/ppc-google-ads-agency"},
        {subService:"Social Media Management", link: "https://ritzmediaworld.com/services/digital-marketing/social-media-management"},
        {subService:"ORM (Online Reputation Management)", link: "https://ritzmediaworld.com/services/digital-marketing/orm-in-digital-marketing"},
      ],
      link: "https://ritzmediaworld.com/services/digital-marketing",
    },
    {
      img: "/varunimage/creative-what-we-do.jpg",
      category: "Creative Services",
      ttl: "Creative design solutions that elevate brands",
      list: [
        {subService:"Branding & Identity Development", link: "https://ritzmediaworld.com/services/digital-marketing/brand-awareness"},
        {subService:"Graphic Design", link: "https://ritzmediaworld.com/services/creative-services/graphic-designing"},
        {subService:"Logo Design", link: "https://ritzmediaworld.com/services/creative-services/logo-design"},
        {subService:"Print Advertising Design", link: "https://ritzmediaworld.com/services/print-advertising"},
      ],
      link: "https://ritzmediaworld.com/services/creative-services",
    },
    {
      img: "/varunimage/print-what-we-do.jpg",
      category: "Print Advertising",
      ttl: "Print advertising campaigns that maximize impact",
      list: [
        {subService:"Ad Placement", link: "https://ritzmediaworld.com/services/print-advertising/ad-placements"}, 
        {subService:"Copywriting", link: "https://ritzmediaworld.com/services/print-advertising/copywriting"},
        {subService:"Ad Scheduling", link: "https://ritzmediaworld.com/services/print-advertising/advertisement-scheduling"},
        {subService:"Cost Negotiation", link: "https://ritzmediaworld.com/services/print-advertising/negotiating-rates"},
      ],
      link: "https://ritzmediaworld.com/services/print-advertising",
    },
    {
      img: "/varunimage/influencer-what-we-to.jpg",
      category: "Influencer Marketing",
      ttl: "Authentic collaborations that build trust and reach",
      list: [
        {subService:"Influencer Identification", link: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india/identification-influence-marketing-agency"},
        {subService:"Cost-Benefit Analysis", link: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india/cost-benefit-analysis"},
        {subService:"Terms Negotiations", link: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india/terms-negotiations"},
        {subService:"Creative Collaboration", link: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india/creative-collaboration"},
      ],
      link: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india",
    },
    {
      img: "/varunimage/radio-what-we-do.jpg",
      category: "Radio Advertising",
      ttl: "Audio narratives that connect brands with listeners",
      list: [
        {subService:"Advertising Concept Development", link: "https://ritzmediaworld.com/services/radio-advertising/advertisement-concept-development"},
        {subService:"Scriptwriting", link: "https://ritzmediaworld.com/services/radio-advertising/scriptwriting"},
        {subService:"Voiceover Casting", link: "https://ritzmediaworld.com/services/radio-advertising/voiceover-casting"},
        {subService:"Recording & Production", link: "https://ritzmediaworld.com/services/radio-advertising/recording-and-production"},
      ],
      link: "https://ritzmediaworld.com/services/radio-advertising",
    },
    {
      img: "/varunimage/development-what-we-do.jpg",
      category: "Web Development",
      ttl: "Digital platforms designed for performance and scale",
      list: [
        {subService:"UI/UX Design", link: "https://ritzmediaworld.com/services/web-designing-and-development/ui-ux-design"},
        {subService:"Custom Design & Development", link: "https://ritzmediaworld.com/services/web-designing-and-development/custom-design-development"},
        {subService:"E-Commerce Website Development", link: "https://ritzmediaworld.com/services/web-designing-and-development/e-commerce-web-designing"},
        {subService:"Landing Page Development", link: "https://ritzmediaworld.com/services/web-designing-and-development/landing-page-development-services"},
      ],
      link: "https://ritzmediaworld.com/services/web-designing-and-development",
    },
    {
      img: "/varunimage/content-what-we-do.jpg",
      category: "Content Marketing",
      ttl: "Strategic content that informs, engages, and converts",
      list: [
        {subService:"Customized Content Strategy", link: "https://ritzmediaworld.com/services/contents-marketing/customized-content-strategy"},
        {subService:"Email and Newsletters Marketing", link: "https://ritzmediaworld.com/services/contents-marketing/email-and-newsletters-marketing"},
        {subService:"Asset Creation and Infographics", link: "https://ritzmediaworld.com/services/contents-marketing/asset-creation-and-infographics"},
        {subService:"Content Promotion and Optimization", link: "https://ritzmediaworld.com/services/contents-marketing/content-promotion-and-optimization"},
      ],
      link: "https://ritzmediaworld.com/services/contents-marketing",
    },
    {
      img: "/varunimage/celebrity-what-we-do.jpg",
      category: "Celebrity Endorsements",
      ttl: "Celebrity Endorsements campaigns that maximize impact",
      list: [
        {subService:"Celebrity Identification", link: "https://ritzmediaworld.com/services/celebrity-endorsements/celebrity-identification-services"},
        {subService:"Contract Negotiations", link: "https://ritzmediaworld.com/services/celebrity-endorsements/negotiating-contracts"},
        {subService:"Creative Collaboration", link: "https://ritzmediaworld.com/services/celebrity-endorsements/creative-collaboration"},
        {subService:"Campaign Integration", link: "https://ritzmediaworld.com/services/celebrity-endorsements/campaign-integration"},
      ],
      link: "https://ritzmediaworld.com/services/celebrity-endorsements",
    },
  ];

  return (
    <section className="w-full min-h-[895px] bg-[#F7F7F7]  flex justify-center md:justify-end items-center md:pt-0 pt-[70px]">
      {/* Centered Align End Container  */}
      <div className={`w-full  h-[90%] ${styles.container}`}>
        {/* Top Row  */}
        <div className="text-center md:text-left">
          <p className="uppercase font-[600] text-[16px] text-[#C99237]">
            What We Do
          </p>
          <h2
            className="font-[700] text-[24px] md:text-[36px]"
            style={{
              fontFamily: "MontserratBold",
            }}
          >
            360° Brand Elevation Services
          </h2>
          <p className="font-[400] text-[16px] max-w-6xl" 
          style={{
            fontFamily: "OpenSansRegular",
          }}
          >
          From strategy to execution, we help brands grow with clarity, consistency, and impact across every touchpoint.
          </p>
        </div>

        {/* Bottom Row  */}
        <div className="w-full flex flex-col gap-6">
          {/* Btn Container  */}
          <div className="w-full flex justify-center md:justify-end items-center gap-2 pr-6 mt-4 md:mt-0">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="cursor-pointer"
              aria-label="Previous slide"
            >
              <Image
                src="/home-v3/s3/lftb.png"
                alt="RMW"
                title="RMW"
                width={27}
                height={27}
                className="w-[27px] h-[27px]"
              />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="cursor-pointer"
              aria-label="Next slide"
            >
              <Image
                src="/home-v3/s3/rhgt.png"
                alt="RMW"
                title="RMW"
                width={27}
                height={27}
                className="w-[27px] h-[27px]"
              />
            </button>
          </div>

          {/* Swiper Slider Container  */}
          <div className="w-full overflow-visible">
            <Swiper
              loop={true}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                // Mobile (default)
                320: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                // Tablet
                640: {
                  slidesPerView: 1.2,
                  spaceBetween: 16,
                },
                // Small Desktop
                768: {
                  slidesPerView: 1.5,
                  spaceBetween: 16,
                },
                // Medium Desktop
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                // Large Desktop
                1280: {
                  slidesPerView: 2.5,
                  spaceBetween: 16,
                },
                // Extra Large Desktop
                1440: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
              }}
              className={styles.swiperContainer}
            >
              {slidesData.map((ob, idx) => {
                return (
                  <SwiperSlide
                  
                    key={idx}
                    style={{ height: "auto", width: "auto" }}
                  >
                    <div className="min-h-[642px] w-full max-w-[503px] sm:w-[503px] relative">
                      <div className="w-full min-h-[336px] relative z-0">
                        <Image
                          src={ob.img}
                          onClick={()=>window.open(ob.link, "_blank")}
                          alt={ob.ttl}
                          title={ob.ttl}
                          fill
                          quality={68}
                          sizes="(min-width: 1440px) 503px, (min-width: 1024px) 38vw, (min-width: 640px) 60vw, 100vw"
                          className="object-cover"
                        ></Image>
                      </div>
                      <div className="w-full max-w-[442px] sm:w-[442px] z-10 h-[calc(100%-336px)] bg-[#F7F7F7] absolute bottom-8 right-0 pl-4 xl:w-full sm:pl-8 py-6 sm:py-8 flex flex-col gap-3 xl:p-5 ">
                        <h3
                          className="font-[600] text-[16px] sm:text-[18px] text-[#C99237] cursor-pointer"
                          onClick={()=>window.open(ob.link, "_blank")}
                          style={{
                            fontFamily: "OpenSansSemiBold",
                          }}
                        >
                          {ob.category}
                        </h3>
                        <h4
                          className="font-[600] text-[22px] sm:text-[26px] cursor-pointer"
                          onClick={()=>window.open(ob.link, "_blank")}
                          style={{
                            fontFamily: "OpenSansSemiBold",
                          }}
                        >
                          {ob.ttl}
                        </h4>
                        <ul className="font-[400] text-[14px] sm:text-[16px] flex flex-col gap-2 list-disc pl-5">
                          {ob.list.map((item, listIdx) => {
                            return (
                              <li
                                key={listIdx}
                                style={{
                                  fontFamily: "OpenSansRegular",
                                }}
                              >
                                <Link href={item.link} target="_blank" title={item.subService}><h5 className="inline font-[400] text-[14px] sm:text-[16px]">{item.subService}</h5></Link>
                              </li>
                            );
                          })}
                        </ul>
                        <div>
                          <Link
                            href={ob.link}
                            title="Know More"
                            target="_blank"
                            className="font-[600] text-[14px] sm:text-[16px] underline"
                            style={{
                              fontFamily: "OpenSansSemiBold",
                            }}
                          >
                            Know More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default S3;
