"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import styles from "./S3.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

function S4() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoType, setVideoType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Data array for success stories
  const successStories = [
    {
      img: "/new-theme/home/digital-advertising.jpg",
      category: "Digital Advertising",
      title: "Digital Advertising",
      description: (
        <>
          Recognized as the best{" "}
          <b style={{ fontFamily: "OpenSansBold" }}>
            digital marketing and advertising agency
          </b>
          , we deliver performance-driven digital advertising strategies that help businesses increase brand visibility, attract qualified leads, and achieve measurable growth. As a trusted{" "}
          <b style={{ fontFamily: "OpenSansBold" }}>
            advertising agency
          </b>
          , our experts combine data-driven insights, precision audience targeting, paid media, and advanced analytics to create high-impact campaigns across Google, Meta, LinkedIn, YouTube, and other leading digital platforms, ensuring every marketing investment delivers maximum ROI.
        </>
      ),
      stats: [
        { value: "320%", label: "Increase in campaign reach" },
        { value: "78%", label: "Improvement in lead quality" },
        { value: "210%", label: "Growth in digital enquiries" },
      ],
      link: "https://ritzmediaworld.com/services/digital-marketing",
    },
    {
      img: "/new-theme/home/SEO-and-CONTENT-marketing.jpg",
      category: "Content Marketing",
      title: "SEO & Content Marketing",
      description:
        "Our content marketing strategies help brands build authority and organic growth by combining SEO-led planning with consistent, high-quality storytelling across digital platforms.",
      stats: [
        { value: "400%", label: "Organic traffic growth" },
        { value: "95%", label: "Organic traffic growth" },
        { value: "180%", label: "Increase in qualified leads" },
      ],
      link: "https://ritzmediaworld.com/services/digital-marketing/search-engine-optimization-seo",
    },
    {
      img: "/new-theme/home/high-performance-digital-platform.jpg",
      category: "Web Development",
      title: "High-Performance Digital Platforms",
      description:
        "We build scalable, user-centric websites that enhance brand credibility, improve user experience, and support long-term digital growth through optimized design and technology.",
      stats: [
        { value: "60%", label: "Improvement in page load speed" },
        { value: "75%", label: "Improvement in page load speed" },
        { value: "140%", label: "Growth in conversion rates" },
      ],
      link: "https://ritzmediaworld.com/services/web-designing-and-development",
    },
    // {
    //   img: "/home-v3/s4/590-influncer.png",
    //   category: "Digital Advertising",
    //   title: "Digital Advertising",
    //   description:
    //     "Our digital advertising case studies showcase how smart targeting, compelling creatives, and data-driven optimisation translate into real business outcomes. Explore how brands across sectors achieved higher visibility, stronger engagement, and measurable conversions through strategic, performance-focused campaigns.",
    //   stats: [
    //     { value: "250%", label: "Increase in qualified leads" },
    //     { value: "85%", label: "Target audience reach" },
    //     { value: "40%", label: "Conversion rate" },
    //   ],
    //   link: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india",
    // },
    {
      img: "/new-theme/home/print-advertising2.jpg",
      category: "Print Advertising",
      title: "Print Advertising",
      description:
        "Our print advertising case studies show how powerful layouts, sharp messaging, and strategic placements cut through clutter to capture attention instantly. See how brands achieved stronger recall, higher response rates, and impactful visibility through well-crafted print communication.",
      stats: [
        { value: "180%", label: "Lift in brand awareness" },
        { value: "3X", label: "Growth in social engagement" },
        { value: "65%", label: "Increase in market share" },
      ],
      link: "https://ritzmediaworld.com/services/print-advertising",
    },
    {
      img: "/new-theme/home/audio-led-brand-storytelling.jpg",
      category: "Radio Advertisement",
      title: "Audio-Led Brand Storytelling",
      description:
        "We create radio campaigns that connect emotionally with listeners through compelling scripts, strong voice selection, and optimized media planning across regional and national stations.",
      stats: [
        { value: "250%", label: "Increase in listener engagement" },
        { value: "85%", label: "Campaign frequency efficiency" },
        { value: "160%", label: "Growth in local brand recall" },
      ],
      link: "https://ritzmediaworld.com/services/radio-advertising",
    },

    {
      img: "/new-theme/home/social-media-marketing.jpg",
      category: "Social Media Marketing",
      title: "Social Media Marketing",
      description:
        "Our social media marketing campaigns drive engagement and conversions through strategic content creation, community building, and data-driven optimization. Discover how brands achieved remarkable growth in followers, engagement rates, and sales through our comprehensive social media strategies.",
      stats: [
        { value: "300%", label: "Increase in followers" },
        { value: "120%", label: "Engagement rate" },
        { value: "65%", label: "Sales growth" },
      ],
      link: "https://ritzmediaworld.com/services/digital-marketing/social-media-management",
    },
  ];

  // Detect screen size for video selection
  useEffect(() => {
    const determineVideoType = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVideoType('desktop');
      } else if (width >= 768) {
        setVideoType('tablet');
      } else {
        setVideoType('mobile');
      }
    };

    determineVideoType();

    window.addEventListener('resize', determineVideoType);
    return () => window.removeEventListener('resize', determineVideoType);
  }, []);

  const handlePlayClick = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setVideoType('desktop');
    } else if (width >= 768) {
      setVideoType('tablet');
    } else {
      setVideoType('mobile');
    }
    setIsVideoOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
    document.body.style.overflow = 'unset';
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const getVideoSource = () => {
    switch (videoType) {
      case 'desktop':
        return '/nuv-video.mp4'; //nuv-video.mp4
      case 'tablet':
        return '/nuv-video.mp4';
      case 'mobile':
        return '/nuv-video.mp4';
      default:
        return '/nuv-video.mp4';
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <section className="w-full min-w-0 min-h-screen overflow-x-clip bg-white flex justify-center items-center flex-col md:gap-4 py-10 sm:py-16 lg:py-[70px]">
      {/* Center Align Container 1 (+ video strip shares same width as slider) */}
      <div
        className={`w-full min-w-0 max-w-full h-[95%] flex flex-col gap-4 sm:gap-6 lg:gap-[45px] ${styles.container}`}
      >
        {/* Top Row  */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          {/* Left Side Container  */}
          <div className="w-full sm:w-auto text-center md:text-left">
            <p
              className="font-[600] text-[14px] sm:text-[16px] text-[#C99237] uppercase"
              style={{
                fontFamily: "OpenSansSemiBold",
              }}
            >
              PRoven result
            </p>
            <h2
              className="font-[700] text-[24px] sm:text-[30px] lg:text-[36px]"
              style={{
                fontFamily: "MontserratBold",
              }}
            >
              Success Stories That Inspire
            </h2>
            <p
              className="font-[400] text-[14px] sm:text-[16px]"
              style={{
                fontFamily: "OpenSansRegular",
              }}
            >
              Real challenges. Creative solutions. Measurable results
            </p>
          </div>
          {/* Slider Btns  */}
          <div className="flex gap-2 md:flex-shrink-0 justify-center md:justify-end w-full md:w-auto">
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
        </div>

        {/* Bottom Row - Swiper Slider  */}
        <div className="w-full min-h-[300px] sm:min-h-[350px] lg:min-h-[395px]">
          <div className="w-full overflow-visible">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              spaceBetween={64}
              slidesPerView={1}
              loop={true}
              loopAdditionalSlides={2}
              breakpoints={{
                // Mobile
                320: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                // Tablet
                768: {
                  slidesPerView: 1,
                  spaceBetween: 32,
                },
                // Desktop
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 64,
                },
              }}
              className={styles.swiperContainer}
            >
              {successStories.map((story, idx) => {
                return (
                  <SwiperSlide key={idx} style={{ height: "auto" }}>
                    <div className="w-full h-full flex flex-col lg:flex-row justify-start gap-6 sm:gap-8 xl:gap-16">
                      {/* Image Card  */}
                      <div className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[395px] w-full lg:w-[450px] xl:w-[590px] relative flex-shrink-0">
                        <Image
                          src={story.img}
                          onClick={() => window.open(story.link, "_blank")}
                          alt={story.title}
                          title={story.title}
                          fill
                          quality={68}
                          sizes="(min-width: 1280px) 590px, (min-width: 1024px) 450px, 100vw"
                          className="object-cover cursor-pointer"
                        ></Image>
                      </div>

                      {/* Content Card  */}
                      <div className="w-full lg:w-[500px] text-center md:text-left xl:w-[604px] flex flex-col gap-4 lg:gap-2 xl:gap-5">
                        <h3
                          onClick={() => window.open(story.link, "_blank")}
                          className="font-[600] text-[16px] sm:text-[18px] text-[#C99237] cursor-pointer"
                          style={{
                            fontFamily: "OpenSansSemiBold",
                          }}
                        >
                          {story.category}
                        </h3>
                        <h4
                          onClick={() => window.open(story.link, "_blank")}
                          className="font-[600] text-[22px] sm:text-[24px] lg:text-[26px] cursor-pointer"
                          style={{
                            fontFamily: "OpenSansSemiBold",
                          }}
                        >
                          {story.title}
                        </h4>
                        <p
                          onClick={() => window.open(story.link, "_blank")}
                          className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px] cursor-pointer"
                          style={{
                            fontFamily: "OpenSansRegular",
                          }}
                        >
                          {story.description}
                        </p>

                        <div className="w-full flex flex-row justify-between items-stretch gap-4 sm:gap-2 lg:gap-4 xl:gap-2">
                          {story.stats.map((stat, statIdx) => {
                            return (
                              <div
                                key={statIdx}
                                onClick={() => window.open(story.link, "_blank")}
                                className={`flex flex-1 min-h-[130px] sm:min-h-[140px] lg:min-h-[152px] py-4 flex-col justify-center items-center gap-1 w-full ${statIdx === 1
                                  ? "sm:px-4 lg:px-8 xl:px-4 sm:border-l-[1px] sm:border-r-[1px] sm:border-l-[#D8D8D8] sm:border-r-[#D8D8D8]"
                                  : ""
                                  }`}
                              >
                                <Image
                                  src="/home-v3/s4/arrow.png"
                                  alt="RMW"
                                  title="RMW"
                                  width={28}
                                  height={28}
                                  className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px]"
                                />
                                <p
                                  className="font-[700] text-[32px] sm:text-[33px] xl:text-[44px]"
                                  style={{
                                    fontFamily: "MontserratBold",
                                  }}
                                >
                                  {stat.value}
                                </p>
                                <p
                                  className="font-[600] text-[12px] sm:text-[14px] lg:text-[15px] text-center"
                                  style={{
                                    fontFamily: "OpenSansSemiBold",
                                  }}
                                >
                                  {stat.label}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        {/* Video strip — same horizontal box as slider (parent already has .container) */}
        <div className="relative isolate w-full min-w-0 max-w-full overflow-hidden h-[250px] sm:h-[300px] md:h-[350px] lg:h-[426px] xl:h-[590px] cursor-pointer" onClick={handlePlayClick}>
          <div className="absolute inset-0 z-0 min-h-0 min-w-0 overflow-hidden">
            <Image
              src="/nuv-banner.jpg"
              alt="Ritz Media World – team video"
              title="Ritz Media World – team video"
              fill
              quality={65}
              className="object-cover object-center"
              sizes="(min-width: 1370px) 1300px, 95vw"
            />
          </div>

          <div
            onClick={handlePlayClick}
            className="flex overflow-hidden absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] lg:w-[54px] lg:h-[54px] rounded-full justify-center items-center bg-[#FFFFFF] hover:scale-110 transition-transform"
          >
            <svg
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[8px] h-[9px] sm:w-[10px] sm:h-[11px]"
            >
              <path
                d="M9 4.46558C9.66667 4.85048 9.66667 5.81273 9 6.19763L1.5 10.5278C0.833332 10.9127 -5.28905e-07 10.4315 -4.95256e-07 9.66173L-1.16704e-07 1.00148C-8.30548e-08 0.231676 0.833333 -0.249449 1.5 0.135451L9 4.46558Z"
                fill="black"
              />
            </svg>
          </div>

          <div className="pointer-events-none absolute inset-0 z-10 bg-[#00000051]" />
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[9999] flex justify-center items-center"
          onClick={handleCloseVideo}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-90"></div>
          {/* Video Container */}
          <div
            className="relative w-[90vw] h-[90vh] flex justify-center items-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseVideo}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 flex justify-center items-center cursor-pointer transition-all hover:scale-110"
              aria-label="Close video"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <video
              ref={videoRef}
              src={getVideoSource()}
              className="w-full h-full object-contain"
              autoPlay
              controls
              playsInline
              key={videoType}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default S4;


