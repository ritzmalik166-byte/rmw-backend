"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Section6.css";
import { Pagination, Autoplay } from "swiper/modules";
import containerStyles from "@/components/celebrity-endorsements/page.module.css";

const testimonialData = [
  {
    client: "FAIRFOX - EON",
    para: "If there is one thing serving as a full service digital agency for more than a decade taught us, it has to be the value of relationships. Therefore, our relationship with our clients is both a priority and a point of pride to us.",
    role: "Marketing Head",
  },
  {
    client: "Madhusudan Ghee",
    para: "To me, advertising my brand was merely a means to ensure my elongated presence in the market. Thanks to ritz Media world, my advertisements not only ensured my brand's sustenance but have also got me a great number of quality leads.",
    role: "Managing Director",
  },
  {
    client: "Eldeco Group",
    para: "They not only make sure that they deliver on their promises, but also educate you on what exactly is needed to be done for your brand, thereby preventing you from under or over spending your precious money.",
    role: "Managing Director",
  },
  {
    client: "Escorts Tractor",
    para: "I must admit that RMW and its team of professionals are always on my favourite list. They have always delivered the best services to me even if they had to put in extra efforts and their team has always been available for extensive support.",
    role: "Chief Communication Officer",
  },
];

export default function Section6() {
  return (
    <section className="w-full py-10 sm:py-12 md:py-16 lg:py-20 flex justify-center px-4 sm:px-6 lg:px-0">
      <div className={`w-full mx-auto overflow-hidden flex flex-col ${containerStyles.containerWidth}`}>
        {/* Top Row */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h2
            className="font-[600] text-[14px] sm:text-[15px] lg:text-[16px] uppercase text-[#C99237]"
            style={{ fontFamily: "OpenSansSemiBold" }}
          >
            Clients Testimonials
          </h2>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 lg:gap-8 items-center md:items-end text-center md:text-left">
            <h3
              className="font-[700] text-[22px] sm:text-[26px] md:text-[28px] lg:text-[36px]"
              style={{ fontFamily: "MontserratBold" }}
            >
              What Our Clients Say
            </h3>
            <p
              className="font-[400] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]"
              style={{ fontFamily: "OpenSansRegular" }}
            >
              Don&apos;t just take our word for it, hear from the brands we&apos;ve
              helped transform.
            </p>
          </div>
          {/* <div className="flex flex-row gap-2 justify-center md:justify-start mt-3">
            <button
              onClick={() =>
                window.open("/category/case-study", "_blank")
              }
              className="s1-btn-gold w-[140px] sm:w-[146px] h-[37px] rounded-[5px] bg-[#C99237] cursor-pointer text-white font-[600] text-[13px] sm:text-[14px] md:text-[16px]"
              style={{ fontFamily: "OpenSansSemiBold" }}
            >
              <p className="text-white">Text Tutorial</p>
            </button>
            <button
              onClick={() =>
                window.open("https://ritzmediaworld.com/web-stories", "_blank")
              }
              className="s1-btn-transparent w-[140px] sm:w-[146px] h-[37px] rounded-[5px] bg-[#ffffff] cursor-pointer text-black font-[600] text-[13px] sm:text-[14px] md:text-[16px]"
              style={{ fontFamily: "OpenSansSemiBold" }}
            >
              <p>Video Tutorial</p>
            </button>
          </div> */}
        </div>

        {/* Testimonial Slider Container */}
        <div className="mt-6 sm:mt-8">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            className="testimonialSwiper"
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 20 },
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 2.5, spaceBetween: 28 },
              1280: { slidesPerView: 3, spaceBetween: 30 },
            }}
          >
            {testimonialData.map((ob, idx) => (
              <SwiperSlide key={idx}>
                <div className="w-full max-w-[393px] mx-auto min-h-[280px] sm:min-h-[300px] lg:h-[331px] bg-white rounded-lg shadow-[0_2px_15px_0_rgba(208,208,208,0.25)] flex flex-col gap-8 sm:gap-9 lg:gap-10 p-6 sm:p-7 lg:p-8 relative">
                  <p
                    className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px] text-[#060606] flex-grow"
                    style={{ fontFamily: "OpenSansRegular" }}
                  >
                    {ob.para}
                  </p>

                  <div>
                    <p
                      className="text-[16px] sm:text-[17px] lg:text-[18px]"
                      style={{ fontFamily: "OpenSansBold" }}
                    >
                      <b>{ob.client}</b>
                    </p>
                    <p
                      className="font-[400] text-[13px] sm:text-[13.5px] lg:text-[14px] text-[#282828]"
                      style={{ fontFamily: "OpenSansRegular" }}
                    >
                      {ob.role}
                    </p>
                  </div>

                  <img
                    src="/home-v3/exl-icn.png"
                    alt="Ritz Media World – excellence"
                    title="Ritz Media World"
                    className="absolute bottom-4 z-0 right-4"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
