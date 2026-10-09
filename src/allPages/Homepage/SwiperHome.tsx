"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import styles from "./page.module.css";
import Image from "next/image";

const logos = [
  "/home-images/home-swiper1-img2.jpeg",
  "/home-images/home-swiper1-img3.jpeg",
  "/home-images/home-swiper1-img4.jpeg",
  "/home-images/home-swiper1-img5.jpeg",
  "/home-images/home-swiper1-img6.jpeg",
  "/home-images/home-swiper1-img7.jpeg",
  "/home-images/home-swiper1-img8.jpeg",
  "/home-images/home-swiper1-img9.jpeg",
  "/home-images/home-swiper1-img10.jpeg",
  "/home-images/home-swiper1-img11.jpeg",
  "/home-images/home-swiper1-img12.jpeg",
  "/home-images/home-swiper1-img13.jpeg",
  "/home-images/home-swiper1-img14.jpeg",
  "/home-images/home-swiper1-img15.jpeg",
  "/home-images/home-swiper1-img16.jpeg",
  "/home-images/home-swiper1-img17.jpeg",
  "/newLogos/lg1.png",
  "/newLogos/lg5.png",
  "/newLogos/lg7.png",
  "/newLogos/lg9.png",
  "/newLogos/lg10.png",
  "/newLogos/lg11.png",
  "/newLogos/lg12.png",
  "/newLogos/lg13.png",
  "/newLogos/lg14.png",
  "/newLogos/lg15.png",
];

const SwiperHome = () => {
  return (
    <div
      className="elementor-element elementor-element-dbafe44 e-con-full e-flex e-con e-parent"
      data-id="dbafe44"
      data-element_type="container"
    >
      <h2
        className="text-center uppercase"
        style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Our Clients
      </h2>
      <div
        className="elementor-element elementor-element-0c208c3 e-con-full e-flex e-con e-child"
        data-id="0c208c3"
        data-element_type="container"
      >
        <div
          className="elementor-element elementor-element-ad4ca69 elementor-widget elementor-widget-brand"
          data-id="ad4ca69"
          data-element_type="widget"
          data-widget_type="brand.default"
        >
          <div className="elementor-widget-container">
            <div className="tp-brand__area pb-20">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="tp-brand-wrap">
                      <div className="swiper-container tp-brand__active">
                        <Swiper
                          modules={[Autoplay]}
                          slidesPerView={5}
                          loop={true}
                          autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                          }}
                          centeredSlides={true}
                          breakpoints={{
                            1200: { slidesPerView: 5 },
                            992: { slidesPerView: 4 },
                            768: { slidesPerView: 2 },
                            576: { slidesPerView: 1 },
                            0: { slidesPerView: 1 },
                          }}
                          onSlideChangeTransitionStart={(swiper) => {
                            const isLight =
                              swiper.slides[swiper.activeIndex].classList.contains(
                                "is-light"
                              );
                            document
                              .querySelector(".tp-slider-variation")
                              ?.classList.toggle("is-light", isLight);
                          }}
                          className="tp-slider-active"
                        >
                          {logos.map((src, index) => (
                            <SwiperSlide key={index}>
                              <div className="tp-brand__item">
                                <div className={styles.topBrandLogoImgD}>
                                  <Image
                                    src={src}
                                    alt="Brand logo"
                                    width={207}
                                    height={240}
                                    // fill
                                    className={styles.swImg}
                                    quality={70}
                                    loading="lazy"
                                    sizes="(max-width: 768px) 50vw, 207px"
                                  />
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperHome;