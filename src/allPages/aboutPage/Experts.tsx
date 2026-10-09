"use client";
// import { useSplitText } from "@/hooks/useSplitText"; // Disabled for performance
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "@/app/styles/marque.css";
// import Link from "next/link";
import styles from "./page.module.css";

import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import Image from "next/image";

const Experts = () => {
  // const textRefs = useSplitText(); // Disabled for performance

  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    // Use matchMedia for better performance
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', checkMobile);
      return () => mediaQuery.removeEventListener('change', checkMobile);
    }
  }, []);
  const swiperKey = isMobile ? "mobile-swiper" : "desktop-swiper";

  return (
    <div className="elementor-widget-container">
      <section className="tp-team__3-area tp-team__inner-1 p-relative">
        <div className="container">
          <div className="tp-team__title-box mb-75">
            <span
              className="tp-section-title-pre mb-25 tp-split__text tp-split__in-right"
            ></span>
            <div className="tp-section-title-wrap mb-20 d-sm-flex align-items-center justify-content-between">
              <h3
                className="tp-section-title tp-split__text tp-split__in-right"
              >
                Our Masterminds
              </h3>
            </div>
          </div>

          <div className="tp-team__wrap">
            <div className="swiper-container tp-team__3-active">
              {isClient && (
                <Swiper
                  className="swiper-wrapper"
                  spaceBetween={30}
                  slidesPerView={4}
                  loop={true}
                  modules={[Autoplay]}
                  key={swiperKey}
                  autoplay={
                    isMobile
                      ? { delay: 1000, disableOnInteraction: false }
                      : false
                  }
                  speed={1200}
                  breakpoints={{
                    992: {
                      slidesPerView: 3,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    576: {
                      slidesPerView: 1,
                    },
                    0: {
                      slidesPerView: 1,
                    },
                  }}
                >
                  <SwiperSlide className="swiper-slide">
                    <div
                      className="tp-team__3-item wow none"
                      data-wow-duration=""
                      data-wow-delay=""
                    >
                      <div className={styles.ourMasters}>
                        <Image
                          decoding="async"
                          src="/founders/RItesh_Malik.png"
                          alt="About Our Agency & Legacy"
                          fill
                          quality={75}
                          loading="lazy"
                        />
                      </div>
                      <div className="tp-team__3-content d-flex align-items-center justify-content-between">
                        <div className="tp-team__3-text">
                          <h3 className="tp-team__3-title">RITESH MALIK</h3>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div
                      className="tp-team__3-item wow none"
                      data-wow-duration=""
                      data-wow-delay=""
                    >
                      <div className={styles.ourMasters}>
                        <Image
                          decoding="async"
                          src="/founders/Satvinder_Kaur.png"
                          alt="About Our Agency & Legacy"
                          fill
                          quality={75}
                          loading="lazy"
                     
                        />
                      </div>
                      <div className="tp-team__3-content d-flex align-items-center justify-content-between">
                        <div className="tp-team__3-text">
                          <h3 className="tp-team__3-title">SATVINDER KAUR</h3>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div
                      className="tp-team__3-item wow none"
                      data-wow-duration=""
                      data-wow-delay=""
                    >
                      <div className={styles.ourMasters}>
                        <Image
                          decoding="async"
                          src="/founders/Nishi_Malik.png"
                          alt="About Our Agency & Legacy"
                          fill
                          quality={75}
                          loading="lazy"
                        />
                      </div>
                      <div className="tp-team__3-content d-flex align-items-center justify-content-between">
                        <div className="tp-team__3-text">
                          <h3 className="tp-team__3-title">NISHI MALIK</h3>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experts;
