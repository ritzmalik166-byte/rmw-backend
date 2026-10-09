"use client"
import Image from 'next/image'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import styles from './S3.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

function S7() {
    const swiperRef = useRef<SwiperType | null>(null);

    const awardsData = [
        {
            img: "/new-page/awards/7.jpg",
            para: "Best Creative Agency (Real Estate) in Delhi/NCR By Big FM",
            highlite: "Excellence"
        },
        {
            img: "/new-page/awards/aw5.jpg",
            para: "Best Real Estate Podcast In India - HT Smartcast Podmasters Awards 2025",
            highlite: "Excellence"
        },
        {
            img: "/new-page/awards/aw4.jpg",
            para: "Most Trusted Advertising Agency in Delhi/NCR – The Economic Times (2024)",
            highlite: "Excellence"
        },
        {
            img: "/new-page/awards/aw1.jpg",
            para: "Most Trusted Advertising Agency in Delhi/NCR – The Economic Times (2022)",
            highlite: "Excellence"
        },
        {
            img: "/new-page/awards/aw7.jpg",
            para: "Excellence in Digital Media – Hindustan Times (2024)",
            highlite: "Excellence"
        },
       
    ];

    return (
        <section className='w-full lg:min-h-[647px] bg-[url(/home-v3/awards-bg/awards-bg-mobile.png)] xl:bg-[url(/home-v3/awards-bg/awards-bg-desktop.png)] bg-cover bg-no-repeat bg-center flex justify-center items-center py-10  lg:py-[70px]'>

            {/* Center Align Container  */}
            <div className={`w-full  flex flex-col gap-6 ${styles.container}`}>
                {/* Top Row  */}
                <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                    {/* Left Side Container  */}
                    <div className="text-center md:text-left">
                        <h2 className='font-[600] text-[14px] sm:text-[15px] lg:text-[16px] text-[#C99237] uppercase' style={{
                            fontFamily: "OpenSansSemiBold",
                        }}>Achievement Awards</h2>
                        <h3 className='font-[700] text-[24px] sm:text-[28px] lg:text-[36px] text-white' style={{
                            fontFamily: "MontserratBold",
                        }}>Awards & Company Recognition</h3>
                    </div>

                    <div className="flex gap-2 md:flex-shrink-0 justify-center md:justify-end w-full md:w-auto">
                        <button 
                            onClick={() => swiperRef.current?.slidePrev()}
                            className='cursor-pointer'
                            aria-label="Previous slide"
                        >
                            <Image src="/home-v3/rghtw.png" alt="RMW" title="RMW" width={27} height={27} className='w-[27px] h-[27px]' />
                        </button>
                        <button 
                            onClick={() => swiperRef.current?.slideNext()}
                            className='cursor-pointer'
                            aria-label="Next slide"
                        >
                            <Image src="/home-v3/lftbw.png" alt="RMW" title="RMW" width={27} height={27} className='w-[27px] h-[27px]' />
                        </button>
                    </div>
                </div>

                <div className="w-full overflow-visible ">
                    <Swiper
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            // Mobile
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            // Small Tablet
                            640: {
                                slidesPerView: 1.5,
                                spaceBetween: 20,
                            },
                            // Tablet
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                            // Large Tablet / Small Desktop
                            1024: {
                                slidesPerView: 2.5,
                                spaceBetween: 28,
                            },
                            // Desktop
                            1280: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                        }}
                        className={styles.swiperContainer}
                    >
                        {awardsData.map((ob, idx) => {
                            return (
                                <SwiperSlide key={idx} style={{ height: 'auto' }}>
                                    <div className='w-full max-w-[401px] mx-auto xl:pl-[10px]'>
                                        <div className="w-full h-[250px] sm:h-[280px] lg:h-[326px] border-1 border-[#C9923780] relative flex justify-center items-center">
                                            <div className="w-[90%] h-[95%] flex justify-center items-center relative">
                                                <Image src={ob.img} alt={ob.para} title={ob.para} fill className='object-contain'></Image>
                                            </div>

                                            {/* Absolute Position BTN  */}
                                            <div className='w-[110px] sm:w-[120px] lg:w-[125px] h-[32px] sm:h-[34px] lg:h-[36px] rounded-[50px] bg-[#ffffff] text-[#F59612] flex justify-center items-center gap-1 absolute top-2 -left-3 sm:-left-2.5 lg:-left-3 z-10'>
                                                <Image src="/home-v3/s7/star2.png" alt="Excellence" title="Excellence" width={24} height={24} className='w-[20px] sm:w-[22px] lg:w-[24px] h-[20px] sm:h-[22px] lg:h-[24px]' />
                                                <p className='font-[600] text-[12px] sm:text-[13px] lg:text-[14px]' style={{
                                                    fontFamily: "OpenSansSemiBold",
                                                }}>{ob.highlite}</p>
                                            </div>
                                        </div>

                                        <div className='w-full min-h-[51px] bg-[#C992372E] text-white py-3 px-4 sm:p-3.5 lg:p-4 text-center sm:text-left'>
                                            <p className='font-[400] text-[13px] leading-[25px] sm:text-[14px] lg:text-[15px]' style={{
                                                fontFamily: "OpenSansRegular",
                                            }}>
                                                {ob.para}
                                            </p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>

        </section>
    )
}

export default S7