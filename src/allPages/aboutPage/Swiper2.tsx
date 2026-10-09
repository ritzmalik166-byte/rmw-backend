"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "@/app/styles/marque.css";
import Link from "next/link";

const Swiper2 = () => {
  return (
    <div className="elementor-widget-container">
      <section className="tp-text-slider__9-area fix tp-text__inner-1 pb-20">
        <div className="tp-text__slider-4-wrap p-relative">
          <div
            className="swiper-container tp-text__4-slider-active swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events swiper-container-rtl"
            dir="rtl"
          >
            <Swiper
              modules={[Autoplay]}
              loop={true}
              slidesPerView={"auto"}
              spaceBetween={30}
              centeredSlides={true}
              allowTouchMove={false}
              speed={10000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: true,
              }}
              dir="ltr"
              id="swiper-wrapper-af37dab55c4fb398"
              aria-live="off"
            >
              <SwiperSlide
                className="swiper-slide swiper-slide-duplicate"
                data-swiper-slide-index="0"
                role="group"
                aria-label="1 / 18"
                style={{ marginLeft: "30px" }}
              >
                <div className="tp-text__4-wrap">
                  <h3 className="tp-text__9-text">
                  <Link
                  title="Digital Marketing"
                  href="/services/digital-marketing"
                > DIGITAL _ MARKETING
                </Link>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide swiper-slide-duplicate"
                data-swiper-slide-index="1"
                role="group"
                aria-label="2 / 18"
                style={{ marginLeft: "30px" }}
              >
                <div className="tp-text__4-wrap">
                <h3 className="tp-text__9-text">
                <Link
                  title="Printing Marketing"
                  href="/services/print-advertising"
                >  PRINT_ADVERTISING
                </Link>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide swiper-slide-duplicate"
                data-swiper-slide-index="2"
                role="group"
                aria-label="3 / 18"
                style={{ marginLeft: "30px" }}
              >
                <div className="tp-text__4-wrap">
                <h3 className="tp-text__9-text">
                <Link
                  title="Radio Marketing"
                  href="/services/radio-advertising"
                >RADIO_ADVERTISING
                </Link>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide swiper-slide-duplicate"
                data-swiper-slide-index="3"
                role="group"
                aria-label="4 / 18"
                style={{ marginLeft: "30px" }}
              >
                <div className="tp-text__4-wrap">
                <h3 className="tp-text__9-text">
                <Link
                  title="Creative Services"
                  href="/services/creative-services"
                > CREATIVE_SERVICES
                </Link>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide swiper-slide-duplicate"
                data-swiper-slide-index="4"
                role="group"
                aria-label="5 / 18"
                style={{ marginLeft: "30px" }}
              >
                <div className="tp-text__4-wrap">
                <h3 className="tp-text__9-text">
                <Link
                  title="Content Marketing"
                  href="/services/contents-marketing"
                > CONTENT_MARKETING
                </Link>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-prev"
                data-swiper-slide-index="5"
                role="group"
                aria-label="6 / 18"
                style={{ marginLeft: "30px" }}
              >
                <div className="tp-text__4-wrap">
                <h3 className="tp-text__9-text">
                <Link
                  title="Web Development"
                  href="/services/web-designing-and-development"
                > WEB_DEVELOPMENT
                </Link>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-prev"
                data-swiper-slide-index="5"
                role="group"
                aria-label="7 / 18"
                style={{ marginLeft: "30px" }}
              >
                <div className="tp-text__4-wrap">
                <h3 className="tp-text__9-text">
                <Link
                  title="Celebrity Endorsements"
                  href="/services/celebrity-endorsements"
                > CELEBRITY_ENDORSEMENTS
                </Link>
                  </h3>
                </div>
              </SwiperSlide>
             <SwiperSlide
                className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-prev"
                data-swiper-slide-index="5"
                role="group"
                aria-label="7 / 18"
                style={{ marginLeft: "30px" }}
              >
                <div className="tp-text__4-wrap">
                <h3 className="tp-text__9-text">
                <Link
                  title="Influencer Marketing"
                  href="/services/influencer-marketing-agency-in-india"
                > INFLUENCER_MARKETING
                </Link>
                  </h3>
                </div>
              </SwiperSlide>
            </Swiper>
            <span
              className="swiper-notification"
              aria-live="assertive"
              aria-atomic="true"
            ></span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Swiper2;
