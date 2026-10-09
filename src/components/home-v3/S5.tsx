"use client"
import Image from "next/image";
import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Controller } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import styles from './S3.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

function S5() {
    const timelineSwiperRef = useRef<SwiperType | null>(null);
    const cardsSwiperRef = useRef<SwiperType | null>(null);
    const [timelineSwiper, setTimelineSwiper] = useState<SwiperType | null>(null);
    const [cardsSwiper, setCardsSwiper] = useState<SwiperType | null>(null);
    const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    
    // Data array for timeline items
    const timelineData = [
        {
            year: "2008",
            img: "/home-v3/s5/s5i5.jpg",
            ttl: "Foundation",
            para: "Ritz Media World launched with a mission to reimagine brand communication for India's growth markets."
        },
        {
            year: "2012",
            img: "/home-v3/s5/s5i2.png",
            ttl: "Innovation Leadership",
            para: "Pioneered centrespread storytelling in Hindustan Times, setting new creative benchmarks for print."
        },
        {
            year: "2016",
            img: "/home-v3/s5/s5i3.png",
            ttl: "Digital Expansion",
            para: "Scaled into 360° digital marketing, unifying performance, content, and automation for premium brands."
        },
        {
            year: "2020",
            img: "/home-v3/s5/2020-img.png",
            ttl: "Premium Positioning",
            para: "Became the go-to agency for UHNI and luxury lifestyle brands across India and the Middle East."
        },
        {
            year: "2026",
            img: "/home-v3/s5/2026-img.png",
            ttl: "Today",
            para: "18+ years, 1000+ campaigns, 500+ success stories—and we’re still elevating brands to market leadership."
        },
       
      
    ];

    useEffect(() => {
        if (timelineSwiper && cardsSwiper) {
            timelineSwiper.controller.control = cardsSwiper;
            cardsSwiper.controller.control = timelineSwiper;
        }
    }, [timelineSwiper, cardsSwiper]);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        
        cardRefs.current.forEach((cardRef, index) => {
            if (!cardRef) return;
            
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        setVisibleCards((prev) => {
                            const newSet = new Set(prev);
                            if (entry.isIntersecting) {
                                newSet.add(index);
                            } else {
                                newSet.delete(index);
                            }
                            return newSet;
                        });
                    });
                },
                {
                    threshold: 0.3, 
                    rootMargin: '0px',
                }
            );
            
            observer.observe(cardRef);
            observers.push(observer);
        });
        
        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, [cardsSwiper, timelineData.length]);

    const handlePrev = () => {
        if (timelineSwiper) {
            timelineSwiper.slidePrev();
        }
        if (cardsSwiper) {
            cardsSwiper.slidePrev();
        }
    };

    const handleNext = () => {
        if (timelineSwiper) {
            timelineSwiper.slideNext();
        }
        if (cardsSwiper) {
            cardsSwiper.slideNext();
        }
    };

    return (
        <section className='w-full lg:min-h-[632px] bg-[#F7F7F7] py-10 lg:py-[70px] flex justify-center items-center px-4 sm:px-6 lg:px-0'>
            {/* Center Align Container  */}
            <div className={`w-full  flex flex-col gap-6 sm:gap-8 ${styles.container}`}>
                {/* Top Row  */}
                <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                    {/* Left Side Container  */}
                    <div className='w-full sm:w-auto text-center md:text-left'>
                        <h2 className='font-[600] text-[14px] sm:text-[16px] text-[#C99237] uppercase' style={{
                            fontFamily: "OpenSansSemiBold",
                        }}>Our Journey</h2>
                        <h3 className='font-[700] text-[24px] sm:text-[30px] lg:text-[36px]' style={{
                            fontFamily: "MontserratBold",
                        }}>17 Years of Brand Excellence</h3>
                        <p className='font-[400] text-[14px] sm:text-[16px]' style={{
                            fontFamily: "OpenSansRegular",
                        }}>From pioneering print innovations to 360° Digital Marketing, our journey reflects our commitment to excellence.</p>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto md:flex-shrink-0 justify-center md:justify-end">
                        {/* Slider Buttons  */}
                        <button 
                            onClick={handlePrev}
                            className='cursor-pointer'
                            aria-label="Previous slide"
                        >
                            <Image src="/home-v3/s3/lftb.png" alt="RMW" title="RMW" width={27} height={27} className='w-[27px] h-[27px]' />
                        </button>
                        <button 
                            onClick={handleNext}
                            className='cursor-pointer'
                            aria-label="Next slide"
                        >
                            <Image src="/home-v3/s3/rhgt.png" alt="RMW" title="RMW" width={27} height={27} className='w-[27px] h-[27px]' />
                        </button>
                    </div>
                </div>

                {/* Bottom Row - Swiper Slider  */}
                <div className="w-full">
                    <div className="w-full flex flex-col gap-6">
                        <div className="w-full overflow-hidden">
                            <Swiper
                                onSwiper={(swiper) => {
                                    timelineSwiperRef.current = swiper;
                                    setTimelineSwiper(swiper);
                                }}
                                modules={[Navigation, Controller]}
                                spaceBetween={0}
                                slidesPerView={3}
                                allowTouchMove={false}
                                controller={{ control: cardsSwiper }}
                                breakpoints={{
                                    // Mobile
                                    320: {
                                        slidesPerView: 1,
                                        spaceBetween: 0,
                                    },
                                    // Tablet
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 0,
                                    },
                                    // Desktop
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 0,
                                    },
                                }}
                                style={{ width: '100%' }}
                            >
                                {timelineData.map((item, idx) => {
                                    const isMiddleItem = (idx % 2) !== 0;
                                    const isCardVisible = visibleCards.has(idx);
                                    
                                    return (
                                        <SwiperSlide key={idx}>
                                            <div className="flex justify-center items-center w-full">
                                                {isMiddleItem && isCardVisible ? (
                                                    <p
                                                        className={`relative font-[700] text-[24px] sm:text-[28px] lg:text-[30px] px-2 sm:px-4 ${styles.timelineYearWithLines}
                                                            before:content-['']
                                                            before:absolute
                                                            before:top-1/2
                                                            before:right-full
                                                            before:w-0
                                                            before:h-[1px]
                                                            before:bg-[#B2B2B2]
                                                            after:content-['']
                                                            after:absolute
                                                            after:top-1/2
                                                            after:left-full
                                                            after:w-0
                                                            after:h-[1px]
                                                            after:bg-[#B2B2B2]
                                                            lg:before:w-[200px]
                                                            xl:before:w-[305px]
                                                            lg:after:w-[200px]
                                                            xl:after:w-[305px]`}
                                                        style={{
                                                            fontFamily: "OpenSansBold",
                                                        }}
                                                    >
                                                        {item.year}
                                                    </p>
                                                ) : (
                                                    <p className="font-[700] text-[24px] sm:text-[28px] lg:text-[30px]" style={{
                                                        fontFamily: "OpenSansBold",
                                                    }}>
                                                        {item.year}
                                                    </p>
                                                )}
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>

                        <div className="w-full overflow-visible">
                            <Swiper
                                onSwiper={(swiper) => {
                                    cardsSwiperRef.current = swiper;
                                    setCardsSwiper(swiper);
                                    if (timelineSwiper) {
                                        swiper.controller.control = timelineSwiper;
                                        timelineSwiper.controller.control = swiper;
                                    }
                                }}
                                modules={[Navigation, Controller]}
                                spaceBetween={40}
                                slidesPerView={1}
                                controller={{ control: timelineSwiper }}
                                breakpoints={{
                                    // Mobile
                                    320: {
                                        slidesPerView: 1,
                                        spaceBetween: 20,
                                    },
                                    // Tablet
                                    640: {
                                        slidesPerView: 1.5,
                                        spaceBetween: 30,
                                    },
                                    // Small Desktop
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 40,
                                    },
                                    // Large Desktop
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 60,
                                    },
                                    // Extra Large Desktop
                                    1280: {
                                        slidesPerView: 3,
                                        spaceBetween: 80,
                                    },
                                }}
                                className={styles.swiperContainer}
                            >
                                {timelineData.map((ob, idx) => {
                                    return (
                                        <SwiperSlide key={idx} style={{ height: 'auto' }}>
                                            <div 
                                                ref={(el) => {
                                                    cardRefs.current[idx] = el;
                                                }}
                                                className='w-full max-w-[276px] mx-auto flex flex-col gap-3 text-center justify-center items-center'
                                            >
                                                <div className='w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] lg:w-[165px] lg:h-[165px] border-1 border-[#E2DEDE] rounded-full flex justify-center items-center'>
                                                    <Image src={ob.img} alt={ob.ttl} title={ob.ttl} width={165} height={165} className='w-[95%] h-[95%] rounded-full object-cover' />
                                                </div>
                                                <p className='font-[600] text-[18px] sm:text-[20px]' style={{
                                                    fontFamily: "OpenSansSemiBold",
                                                }}>{ob.ttl}</p>
                                                <p className='font-[400] text-[13px] sm:text-[14px]' style={{
                                                    fontFamily: "OpenSansRegular",
                                                }}>
                                                    {ob.para}
                                                </p>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default S5