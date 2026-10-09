"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Link from "next/link";

const Testimonials = () => {
  return (
    <div className="elementor-widget-container">
      <section className="tp-testimonial__3-area pb-140 tp-bg-class">
        <div className="container">
          <div className="tp-testi__3-top mb-80">
            <div className="row align-items-center">
              <div className="col-xl-8 col-lg-8 col-md-8">
                <div className="tp-testi__3-title-box">
                  <h3 className="tp-section-title">
                    Client&apos;s <span>Testimonials</span>
                  </h3>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4">
                <div className="tp-testi__3-action text-md-end">
                  <Link
                    title="More about us"
                    className="tp-btn-primary theme-btn"
                    href="/about/"
                    rel="nofollow"
                    target="_self"
                  >
                    <span>More about us</span>
                    <i className="far fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-xl-4 col-lg-4">
              <div className="tp-testi__3-shape">
                <img
                  decoding="async"
                  src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/testi-3-1-shape-1.png"
                  alt=""
                />
              </div>
            </div>
            <div className="col-xl-8 col-lg-8">
              <div className="tp-testi__3-wrap p-relative">
                <div className="swiper-container tp-testi__3-active swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
                  <Swiper
                    modules={[Autoplay]}
                    loop={true}
                    slidesPerView={1}
                    spaceBetween={30}
                    speed={1000}
                    autoplay={true}
                    className="swiper-wrapper"
                    id="swiper-wrapper-2921014d3e77344fa"
                    aria-live="off"
                  >
                    <SwiperSlide
                      className="swiper-slide swiper-slide-duplicate swiper-slide-next swiper-slide-duplicate-prev"
                      data-swiper-slide-index="2"
                      role="group"
                      aria-label="1 / 5"
                      style={{ width: "856px", marginRight: "30px" }}
                    >
                      <div className="tp-testi__3-item">
                        <div className="tp-testi__3-content">
                          <div className="tp-testi__3-dsc mb-55">
                            <p>
                              creative agency, we believe in the power of
                              imagination and innovation. We are constantly
                              pushing the boundaries of what is possible, and
                              strive to create work that is not only bea utiful
                              and effective,but also meaningful and impactful.
                            </p>
                          </div>
                          <div className="tp-testi__2-author-box d-sm-flex align-items-center justify-content-between">
                            <div className="tp-testi__2-author-info d-flex align-items-center">
                              <div className="tp-testi__2-author-thumb mr-25">
                                <img
                                  decoding="async"
                                  src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/testi-3-1-avater-1.png"
                                  alt=""
                                />
                              </div>
                              <div className="tp-testi__2-author-text">
                                <h3 className="tp-testi__2-author-title">
                                  James N. Johnson
                                </h3>
                                <span className="tp-testi__2-author-designation">
                                  CEO &amp; Founder
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="tp-testimonial-2-icon d-none d-xl-block"></div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide
                      className="swiper-slide swiper-slide-duplicate-active"
                      data-swiper-slide-index="0"
                      role="group"
                      aria-label="2 / 5"
                      style={{ width: "856px", marginRight: "30px" }}
                    >
                      <div className="tp-testi__3-item">
                        <div className="tp-testi__3-content">
                          <div className="tp-testi__3-dsc mb-55">
                            <p>
                              creative agency, we believe in the power of
                              imagination and innovation. We are constantly
                              pushing the boundaries of what is possible, and
                              strive to create work that is not only bea utiful
                              and effective,but also meaningful and impactful.
                            </p>
                          </div>
                          <div className="tp-testi__2-author-box d-sm-flex align-items-center justify-content-between">
                            <div className="tp-testi__2-author-info d-flex align-items-center">
                              <div className="tp-testi__2-author-thumb mr-25">
                                <img
                                  decoding="async"
                                  src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/testi-3-1-avater-1.png"
                                  alt=""
                                />
                              </div>
                              <div className="tp-testi__2-author-text">
                                <h3 className="tp-testi__2-author-title">
                                  James N. Johnson
                                </h3>
                                <span className="tp-testi__2-author-designation">
                                  CEO &amp; Founder
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="tp-testimonial-2-icon d-none d-xl-block"></div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide
                      className="swiper-slide"
                      data-swiper-slide-index="1"
                      role="group"
                      aria-label="3 / 5"
                      style={{ width: "856px", marginRight: "30px" }}
                    >
                      <div className="tp-testi__3-item">
                        <div className="tp-testi__3-content">
                          <div className="tp-testi__3-dsc mb-55">
                            <p>
                              creative agency, we believe in the power of
                              imagination and innovation. We are constantly
                              pushing the boundaries of what is possible, and
                              strive to create work that is not only bea utiful
                              and effective,but also meaningful and impactful.
                            </p>
                          </div>
                          <div className="tp-testi__2-author-box d-sm-flex align-items-center justify-content-between">
                            <div className="tp-testi__2-author-info d-flex align-items-center">
                              <div className="tp-testi__2-author-thumb mr-25">
                                <img
                                  decoding="async"
                                  src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/testi-3-1-avater-1.png"
                                  alt=""
                                />
                              </div>
                              <div className="tp-testi__2-author-text">
                                <h3 className="tp-testi__2-author-title">
                                  James N. Johnson
                                </h3>
                                <span className="tp-testi__2-author-designation">
                                  CEO &amp; Founder
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="tp-testimonial-2-icon d-none d-xl-block"></div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide
                      className="swiper-slide swiper-slide-prev swiper-slide-duplicate-next"
                      data-swiper-slide-index="2"
                      role="group"
                      aria-label="4 / 5"
                      style={{ width: "856px", marginRight: "30px" }}
                    >
                      <div className="tp-testi__3-item">
                        <div className="tp-testi__3-content">
                          <div className="tp-testi__3-dsc mb-55">
                            <p>
                              creative agency, we believe in the power of
                              imagination and innovation. We are constantly
                              pushing the boundaries of what is possible, and
                              strive to create work that is not only bea utiful
                              and effective,but also meaningful and impactful.
                            </p>
                          </div>
                          <div className="tp-testi__2-author-box d-sm-flex align-items-center justify-content-between">
                            <div className="tp-testi__2-author-info d-flex align-items-center">
                              <div className="tp-testi__2-author-thumb mr-25">
                                <img
                                  decoding="async"
                                  src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/testi-3-1-avater-1.png"
                                  alt=""
                                />
                              </div>
                              <div className="tp-testi__2-author-text">
                                <h3 className="tp-testi__2-author-title">
                                  James N. Johnson
                                </h3>
                                <span className="tp-testi__2-author-designation">
                                  CEO &amp; Founder
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="tp-testimonial-2-icon d-none d-xl-block"></div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide
                      className="swiper-slide swiper-slide-duplicate swiper-slide-active"
                      data-swiper-slide-index="0"
                      role="group"
                      aria-label="5 / 5"
                      style={{ width: "856px", marginRight: "30px" }}
                    >
                      <div className="tp-testi__3-item">
                        <div className="tp-testi__3-content">
                          <div className="tp-testi__3-dsc mb-55">
                            <p>
                              creative agency, we believe in the power of
                              imagination and innovation. We are constantly
                              pushing the boundaries of what is possible, and
                              strive to create work that is not only bea utiful
                              and effective,but also meaningful and impactful.
                            </p>
                          </div>
                          <div className="tp-testi__2-author-box d-sm-flex align-items-center justify-content-between">
                            <div className="tp-testi__2-author-info d-flex align-items-center">
                              <div className="tp-testi__2-author-thumb mr-25">
                                <img
                                  decoding="async"
                                  src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/testi-3-1-avater-1.png"
                                  alt=""
                                />
                              </div>
                              <div className="tp-testi__2-author-text">
                                <h3 className="tp-testi__2-author-title">
                                  James N. Johnson
                                </h3>
                                <span className="tp-testi__2-author-designation">
                                  CEO &amp; Founder
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="tp-testimonial-2-icon d-none d-xl-block"></div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                  <span
                    className="swiper-notification"
                    aria-live="assertive"
                    aria-atomic="true"
                  ></span>
                </div>
                <div className="tp-testi__3-arrow">
                  <button
                    className="testi-3-prev"
                    aria-label="Previous slide"
                    aria-controls="swiper-wrapper-2921014d3e77344fa"
                  >
                    <i className="fas fa-long-arrow-left"></i>
                  </button>
                  <button
                    className="testi-3-next"
                    aria-label="Next slide"
                    aria-controls="swiper-wrapper-2921014d3e77344fa"
                  >
                    <i className="fas fa-long-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
