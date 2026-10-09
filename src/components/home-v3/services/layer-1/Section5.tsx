"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import styles from './page.module.css';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

function Section5() {
    const swiperRef = useRef<SwiperType | null>(null);

    // Testimonial data - you can add more testimonials here
    const testimonials = [
        {
            quote: "To me, advertising my brand was merely a means to ensure my elongated presence in the market. Thanks to ritz Media world, my advertisements not only ensured my brand's sustenance but have also got me a great number of quality leads.",
            name: "Madhusudan Ghee",
            position: "Managing Director"
        },
        {
            quote: "Ritz Media World has transformed our digital presence completely. Their strategic approach and creative solutions have significantly increased our brand visibility and customer engagement.",
            name: "John Smith",
            position: "CEO, Tech Solutions Inc."
        },
        {
            quote: "Working with Ritz Media World has been a game-changer for our business. Their team's expertise in digital marketing and SEO has driven exceptional results for our company.",
            name: "Sarah Johnson",
            position: "Marketing Director"
        },
        {
            quote: "The professionalism and results-driven approach of Ritz Media World exceeded our expectations. They truly understand how to connect brands with their target audience effectively.",
            name: "Michael Chen",
            position: "Founder, StartupXYZ"
        }
    ];
    return (
        <section className="w-full flex justify-center items-center  ">

            {/* Centered Align Container  */}
            <div className={`w-full flex flex-col justify-center items-center gap-0 xl:gap-8 ${styles.containerWidth}`}>

                {/* Top Container  */}
                <div className="w-full flex flex-col text-center justify-center items-center  px-4 sm:px-0">
                    <p className={`font-[600] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] text-[#C99237] uppercase ${styles.fontopensans}`}>Excellence</p>
                    <h2 className={`font-[700] text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] text-[#000000] leading-tight sm:leading-snug px-2 sm:px-0 ${styles.fontmontserrat}`}>Why Leading Brands Choose Our IT Solutions</h2>
                    <p className={`font-[400] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] text-[#000000] ${styles.fontopensans}`}>Trusted by brands for SEO services, Brand Awareness, & Lead Generation.</p>
                </div>

                {/* Bottom Container   */}
                <div className="w-full flex flex-col gap-3 sm:gap-4 xl:gap-5">
                    {/* Row 1  */}
                    <div className="flex flex-col md:flex-row md:items-stretch w-full justify-between gap-2 sm:gap-3 xl:gap-4">
                        {/* Left Side Container  */}
                        <div className="w-full md:w-[65%] lg:w-[827px] xl:w-[900px] h-[200px] sm:h-[250px] md:h-[319px] lg:h-[319px] relative overflow-hidden">
                            <Image src="/service-v3/layer1/s5/team-q-img.jpg" alt="Ritz Media World – skilled team delivering technology solutions" title="Ritz Media World" fill className="object-contain object-center" sizes="(max-width: 1024px) 65vw, 827px" />

                            <div className="absolute left-0 bottom-0 border-b border-[#DED6D6] bg-white max-w-full lg:max-w-[427px] py-1 lg:py-5">
                                <p className={`font-[600] text-[13px] sm:text-[14px] text-center md:text-left md:text-[15px] lg:text-[16px] xl:text-[17px] max-w-[95%] lg:max-w-[90%] xl:max-w-[95%] leading-normal ${styles.fontmontserrat}`}>A Skilled Team Delivering Reliable Technology Solutions That Drive Business Growth</p>
                            </div>
                        </div>

                        {/* Facts & Numbers  */}
                        <div className={`flex flex-col justify-between 
                                            gap-2 sm:gap-3 lg:gap-4 xl:gap-5
                                            w-full md:w-[35%] lg:w-[397px] xl:w-[430px]
                                            h-auto md:h-[240px] lg:h-[252px] xl:h-[280px] 2xl:h-[340px]
                                            bg-[#0F1640]
                                            py-4 sm:py-5 lg:py-5 xl:py-6
                                            px-4 sm:px-5 lg:px-6 xl:px-8
                                            md:shrink-0
                                            mt-3 md:mt-18 lg:mt-14 xl:mt-5 2xl:mt-0 ${styles.factNumbers}`}>
                            {/* Top Row  */}
                            <div className="text-center md:text-left">
                                <p className={`font-[400] uppercase text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16px] xl:text-[17px] text-white ${styles.fontopensans}`}>Facts & Numbers</p>
                            </div>

                            {/* Bottom Row  */}
                            <div className="min-w-0 text-center md:text-left">
                                <p className={`font-[600] text-[44px] sm:text-[52px] md:text-[50px] lg:text-[64px] xl:text-[70px] text-white leading-none ${styles.fontopensans}`}>90<span className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px]">%</span></p>
                                <p className={`font-[400] text-[15px] sm:text-[16px] md:text-[15px] lg:text-[19px] xl:text-[20px] text-white leading-normal mt-2 sm:mt-3 xl:mt-4 ${styles.fontopensans}`}>clients recommend <br />
                                    <span className="font-[800] ">RITZ MEDIA WORLD </span> <br />
                                    for best digital marketing services. </p>
                            </div>
                        </div>
                    </div>

                    {/* Row 2  */}
                    <div className="flex flex-col md:flex-row md:items-stretch w-full justify-between gap-3">
                        {/* rating */}
                        <div className="w-full md:w-[35%] lg:w-[35%] xl:w-[397px] h-auto min-h-0 md:min-h-[300px] lg:min-h-[319px] xl:min-h-[335px] flex flex-col justify-between gap-3 sm:gap-4 xl:gap-5 bg-[#FFF2DD] py-4 sm:py-5 lg:py-4 xl:py-5 px-4 sm:px-5 lg:px-6 xl:px-7">
                            {/* Row 1  */}
                            <div className="flex w-full justify-between gap-2 sm:gap-4 xl:gap-5">
                                <div className="flex flex-col gap-1 sm:gap-2 xl:gap-3">
                                    <p className={`font-[500] text-[32px] sm:text-[40px] md:text-[33px] lg:text-[50px] xl:text-[55px] leading-none ${styles.fontmontserrat}`}>1M+</p>
                                    <p className={`font-[600] text-[13px] sm:text-[14px]  lg:text-[16px]  ${styles.fontopensans}`}>Creatives Published</p>
                                </div>
                                <div className="flex flex-col gap-1 sm:gap-2 xl:gap-3">
                                    <p className={`font-[500] text-[32px] sm:text-[40px] md:text-[33px] lg:text-[50px] xl:text-[55px] leading-none ${styles.fontmontserrat}`}>500+</p>
                                    <p className={`font-[600] text-[13px] sm:text-[14px]  lg:text-[16px]  ${styles.fontopensans}`}>Success Stories</p>
                                </div>
                            </div>

                            {/* Row 2  */}
                            <div onClick={() => window.open("https://share.google/KiTNs3mJMr5qUOkjK", "_blank")} className="w-full sm:w-[193px] lg:w-[269px] xl:w-[290px] h-[80px] sm:h-[95px] lg:h-[111px] xl:h-[120px] relative mx-auto sm:mx-0">
                                <Image src="/g-5-star2.png" alt="Google reviews – Ritz Media World" title="Ritz Media World" fill className="object-contain cursor-pointer" />
                            </div>
                        </div> 
            
                        <div className="w-full md:w-[63%] lg:w-[63%] xl:w-[calc(100%-427px)] h-auto min-h-0 md:min-h-[300px] lg:min-h-[319px] xl:min-h-[335px] relative bg-[#F7F7F7] flex flex-col justify-between gap-3 sm:gap-4 xl:gap-7 py-4 sm:py-5 lg:py-4 xl:py-5 px-4 sm:px-5 lg:px-6 xl:px-7">
                            {/* Top Static Row  */}
                            <div className="w-full flex justify-between items-center">
                                <p className={`font-[400] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] uppercase ${styles.fontopensans}`}>reviews</p>
                                <div className="flex gap-3 sm:gap-4 xl:gap-5">
                                    <button
                                        className="cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => swiperRef.current?.slidePrev()}
                                        aria-label="Previous review"
                                    >
                                        <img src="/lft.svg" alt="Ritz Media World – previous testimonial" title="Ritz Media World" className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] xl:w-[26px] xl:h-[26px]" />
                                    </button>
                                    <button
                                        className="cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => swiperRef.current?.slideNext()}
                                        aria-label="Next review"
                                    >
                                        <img src="/rght.svg" alt="Ritz Media World – next testimonial" title="Ritz Media World" className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] xl:w-[26px] xl:h-[26px]" />
                                    </button>
                                </div>
                            </div>
                            {/* Bottom Dynamic Slider Container */}
                            <Swiper
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper;
                                }}
                                loop={true}
                                modules={[Navigation]}
                                className={styles.testimonialSwiper}
                                style={{ width: '100%', maxWidth: '100%', height: 'auto' }}
                            >
                                {testimonials.map((testimonial, idx) => (
                                    <SwiperSlide key={idx}>
                                        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 xl:gap-7 max-w-full lg:max-w-[90%] xl:max-w-[92%]">
                                            <p className={`font-[400] text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[22px] leading-relaxed ${styles.fontopensans} `}>
                                                "{testimonial.quote}"
                                            </p>

                                            <div className="flex flex-col gap-1 sm:gap-2 xl:gap-3">
                                                <p className="font-[700] text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[19px]">{testimonial.name}</p>
                                                <p className="font-[400] text-[12px] sm:text-[13px] lg:text-[14px] xl:text-[15px]">{testimonial.position}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section5;