"use client";

import Image from "next/image";
import { useRef } from "react";
import styles from "@/components/celebrity-endorsements/page.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

const testimonials = [
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
  {
    client: "FAIRFOX - EON",
    para: "If there is one thing serving as a full service digital agency for more than a decade taught us, it has to be the value of relationships. Therefore, our relationship with our clients is both a priority and a point of pride to us.",
    role: "Marketing Head",
  },
];

export default function Section5() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative w-full bg-[#FFFFFF] py-[35px] lg:py-[70px] flex justify-center px-4 sm:px-6 lg:px-0">
      <div className="hidden lg:block absolute right-0 top-10 bottom-0 sm:top-12 sm:bottom-0 md:top-14 md:bottom-0 lg:top-16 lg:bottom-0 left-[45%] bg-[#F7F7F7] z-0" />
      <div className={`w-full mx-auto overflow-x-hidden ${styles.containerWidth}`}>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 xl:gap-10 items-start lg:items-center xl:items-start">
          <div className="flex w-full max-lg:mx-auto flex-col items-center text-center lg:w-[30%] lg:items-start lg:text-left xl:w-[26%] pt-1 mt-0 lg:mt-0 xl:mt-[100px]">
            <h2
              className="uppercase text-[#C99237] text-[16px] tracking-wide font-[600] leading-[28px]"
              style={{ fontFamily: "OpenSansSemiBold" }}
            >
              Client Testimonials
            </h2>
            <h3
              className="text-black text-[24px] md:text-[30px] lg:text-[23px]  xl:text-[34px] leading-[1.02] font-[700] mt-3 xl:whitespace-nowrap"
              style={{ fontFamily: "MontserratBold" }}
            >
              What Our Clients Say
            </h3>
            <p
              className="text-[#00000] text-[16px] sm:text-[17px] lg:text-[16px] leading-[1.45] mt-3 w-full max-lg:max-w-none lg:max-w-[281px] lg:mx-0"
              style={{ fontFamily: "OpenSansRegular" }}
            >
              Don&apos;t just take our word for it, hear from the brands we&apos;ve
              helped transform.
            </p>

            {/* <div className="mt-6 flex flex-wrap justify-center gap-3 lg:flex-nowrap lg:justify-start">
              <button
                onClick={() =>
                  window.open("/category/case-study", "_blank")
                }
                className="h-[40px] px-6 rounded-[6px] bg-[#C99237] text-white text-[15px] sm:text-[16px] font-[600] cursor-pointer whitespace-nowrap"
                style={{ fontFamily: "OpenSansSemiBold" }}
              >
                Text Tutorial
              </button>
              <button
                onClick={() =>
                  window.open("https://ritzmediaworld.com/web-stories", "_blank")
                }
                className="h-[40px] px-3 rounded-[6px] bg-transparent text-black text-[15px] sm:text-[16px] font-[600] cursor-pointer whitespace-nowrap"
                style={{ fontFamily: "OpenSansSemiBold" }}
              >
                Video Tutorial
              </button>
            </div> */}
          </div>

          <div className="w-full lg:w-[78%] relative overflow-x-hidden">
            <div className="hidden lg:block absolute top-6 right-2 z-20">
              <div className="relative w-[71px] h-[27px]">
                <Image
                  src="/service-v3/influencer-marketing-agency-in-india/s5/left_right_slider.svg"
                  alt="Testimonial slider controls"
                  title="Testimonial slider controls"
                  fill
                  className="object-contain pointer-events-none"
                />
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="absolute left-0 top-0 w-[27px] h-[27px] cursor-pointer"
                />
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => swiperRef.current?.slideNext()}
                  className="absolute right-0 top-0 w-[27px] h-[27px] cursor-pointer"
                />
              </div>
            </div>

            <div className="relative z-10 lg:ml-19 lg:pt-14 w-full">
              <Swiper
                className="[&_.swiper]:!overflow-visible [&_.swiper-wrapper]:items-stretch"
                modules={[Autoplay]}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                loop={true}
                slidesPerView={1}
                spaceBetween={12}
                autoplay={{ delay: 4500, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 1, spaceBetween: 12 },
                  768: { slidesPerView: 2, spaceBetween: 16 },
                  1024: { slidesPerView: "auto", spaceBetween: 20 },
                  1280: { slidesPerView: "auto", spaceBetween: 25 },
                }}
              >
                {testimonials.map((item) => (
                  <SwiperSlide key={item.client} className="!box-border !w-full sm:!w-full md:!w-[calc((100%-16px)/2)] lg:!w-[405px] p-2">
                    <div
                      className="relative mx-auto flex h-[330px] w-full flex-col gap-5 bg-white p-6 text-center shadow-[0px_2px_15px_0px_#D0D0D040] rounded-none border-[#E7E7E7] lg:mx-0 lg:gap-3 lg:px-6 lg:pb-7 lg:pl-12 lg:pt-12 lg:text-left"
                    >
                      <p
                        className="font-[400] text-[16px] text-[#060606] leading-[28px] overflow-y-auto flex-1 min-h-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        style={{ fontFamily: "OpenSansRegular" }}
                      >
                        {item.para}
                      </p>
                      <div>
                        <p
                          className="text-[18px] text-[#000000]"
                          style={{ fontFamily: "OpenSansBold" }}
                        >
                          {item.client}
                        </p>
                        <p
                          className="font-[400] text-[14px] text-[#282828] mt-1"
                          style={{ fontFamily: "OpenSansRegular" }}
                        >
                          {item.role}
                        </p>
                      </div>
                      <img
                        src="/home-v3/exl-icn.png"
                        alt="Quote"
                        title="Quote"
                        className="pointer-events-none absolute top-4 left-4 z-0 hidden h-[28px] w-[32px] object-contain rotate-180 lg:block"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="flex lg:hidden justify-center mt-2">
              <div className="relative w-[71px] h-[27px]">
                <Image
                  src="/service-v3/influencer-marketing-agency-in-india/s5/left_right_slider.svg"
                  alt="Testimonial slider controls"
                  title="Testimonial slider controls"
                  fill
                  className="object-contain pointer-events-none"
                />
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="absolute left-0 top-0 w-[27px] h-[27px] cursor-pointer"
                />
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => swiperRef.current?.slideNext()}
                  className="absolute right-0 top-0 w-[27px] h-[27px] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
