"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";

import { FreeMode, Autoplay } from "swiper/modules";

const ServiceThirdFeatureMarque = () => {
  return (
    <div
      className="elementor-element elementor-element-086a844 e-con-full e-flex e-con e-parent e-lazyloaded"
      data-id="086a844"
      data-element_type="container"
    >
      <div
        className="elementor-element elementor-element-14cb3cd e-con-full e-flex e-con e-child"
        data-id="14cb3cd"
        data-element_type="container"
      >
        <div
          className="elementor-element elementor-element-f4545cd elementor-widget elementor-widget-text-slider"
          data-id="f4545cd"
          data-element_type="widget"
          data-widget_type="text-slider.default"
        >
          <div className="elementor-widget-container">
            <section className="tp-text-slider__5-area fix black-bg ">
              <div className="container">
                <div className="tp-text__5-box">
                  <div className="swiper-container tp-text__5-slider-active swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
                    <Swiper
                          loop={true}
                          freeMode={true}
                          slidesPerView="auto"
                          spaceBetween={30}
                          allowTouchMove={false}
                          speed={7000}
                          autoplay={{
                            delay: 1,
                            disableOnInteraction: true,
                          }}
                          modules={[FreeMode, Autoplay]}
                      className="swiper-wrapper slide-transtion"
                      id="swiper-wrapper-559ce0e42d31414a"
                      aria-live="off"
                    >
                      <SwiperSlide
                        className="swiper-slide swiper-slide-active"
                        data-swiper-slide-index="1"
                        role="group"
                        aria-label="7 / 15"
                        style={{ marginRight: "30px" }}
                      >
                        <div className="tp-text__5-wrap">
                          <h3 className="tp-text__5-text">
                            FEATURED PROJECTS
                          </h3>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide
                        className="swiper-slide swiper-slide-next"
                        data-swiper-slide-index="2"
                        role="group"
                        aria-label="8 / 15"
                        style={{ marginRight: "30px" }}
                      >
                        <div className="tp-text__5-wrap">
                          <h3 className="tp-text__5-text">
                            FEATURED PROJECTS
                          </h3>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide
                        className="swiper-slide"
                        data-swiper-slide-index="3"
                        role="group"
                        aria-label="9 / 15"
                        style={{ marginRight: "30px" }}
                      >
                        <div className="tp-text__5-wrap">
                          <h3 className="tp-text__5-text">
                            FEATURED PROJECTS
                          </h3>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide
                        className="swiper-slide"
                        data-swiper-slide-index="4"
                        role="group"
                        aria-label="10 / 15"
                        style={{ marginRight: "30px" }}
                      >
                        <div className="tp-text__5-wrap">
                          <h3 className="tp-text__5-text">
                            FEATURED PROJECTS
                          </h3>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide
                        className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-prev"
                        data-swiper-slide-index="0"
                        role="group"
                        aria-label="11 / 15"
                        style={{ marginRight: "30px" }}
                      >
                        <div className="tp-text__5-wrap">
                          <h3 className="tp-text__5-text">
                            FEATURED PROJECTS
                          </h3>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide
                        className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
                        data-swiper-slide-index="1"
                        role="group"
                        aria-label="12 / 15"
                        style={{ marginRight: "30px" }}
                      >
                        <div className="tp-text__5-wrap">
                          <h3 className="tp-text__5-text">
                            FEATURED PROJECTS
                          </h3>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide
                        className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next"
                        data-swiper-slide-index="2"
                        role="group"
                        aria-label="13 / 15"
                        style={{ marginRight: "30px" }}
                      >
                        <div className="tp-text__5-wrap">
                          <h3 className="tp-text__5-text">
                            FEATURED PROJECTS
                          </h3>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide
                        className="swiper-slide swiper-slide-duplicate"
                        data-swiper-slide-index="3"
                        role="group"
                        aria-label="14 / 15"
                        style={{ marginRight: "30px" }}
                      >
                        <div className="tp-text__5-wrap">
                          <h3 className="tp-text__5-text">
                            FEATURED PROJECTS
                          </h3>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide
                        className="swiper-slide swiper-slide-duplicate"
                        data-swiper-slide-index="4"
                        role="group"
                        aria-label="15 / 15"
                        style={{ marginRight: "30px" }}
                      >
                        <div className="tp-text__5-wrap">
                          <h3 className="tp-text__5-text">
                            FEATURED PROJECTS
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
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceThirdFeatureMarque;
