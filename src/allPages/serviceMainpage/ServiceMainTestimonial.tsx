"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const TESTIMONIAL_SLIDE_STYLE = {
  width: "446px",
  marginRight: "30px",
} as const;

type TestimonialSlideConfig = {
  swiperSlideClassName: string;
  dataSwiperSlideIndex: string;
  ariaLabel: string;
  headingIsH2: boolean;
  quote: string;
  authorName: string;
  authorDesignation: string;
  authorInfoClassName: string;
};

const TESTIMONIAL_SLIDES: TestimonialSlideConfig[] = [
  {
    swiperSlideClassName:
      "swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active",
    dataSwiperSlideIndex: "2",
    ariaLabel: "1 / 5",
    headingIsH2: true,
    quote:
      "To me, advertising my brand was merely a means to ensure my elongated presence in the market. Thanks to ritz Media world, my advertisements not only ensured my brand’s sustenance but have also got me a great number of quality leads.",
    authorName: "Madhusudan Ghee",
    authorDesignation: "Managing Director",
    authorInfoClassName:
      "tp-testi__2-author-info d-flex align-items-center gap-1",
  },
  {
    swiperSlideClassName: "swiper-slide swiper-slide-duplicate-next",
    dataSwiperSlideIndex: "0",
    ariaLabel: "2 / 5",
    headingIsH2: false,
    quote:
      "If there is one thing serving as a full service digital agency for more than a decade taught us, it has to be the value of relationships. Therefore, our relationship with our clients is both a priority and a point of pride to us.",
    authorName: "FAIRFOX - EON",
    authorDesignation: "Marketing Head",
    authorInfoClassName: "tp-testi__2-author-info d-flex align-items-center",
  },
  {
    swiperSlideClassName: "swiper-slide swiper-slide-prev",
    dataSwiperSlideIndex: "1",
    ariaLabel: "3 / 5",
    headingIsH2: false,
    quote:
      "They not only make sure that they deliver on their promises, but also educate you on what exactly is needed to be done for your brand, thereby preventing you from under or over spending your precious money.",
    authorName: "Eldeco Group",
    authorDesignation: "Managing Director",
    authorInfoClassName: "tp-testi__2-author-info d-flex align-items-center",
  },
];

function TestimonialSectionTitle({ asH2 }: { asH2: boolean }) {
  const inner = (
    <>
      Best Creative
      <span>
        <i>Agency</i>
      </span>
      <br /> In Our Town Forever
    </>
  );
  if (asH2) {
    return <h2 className="tp-section-title mb-60">{inner}</h2>;
  }
  return (
    <div className="tp-section-title mb-60" style={{ lineHeight: "60px" }}>
      {inner}
    </div>
  );
}

function TestimonialAuthorStars() {
  return (
    <div className="tp-testi__2-author-review">
      <span>
        <i className="fas fa-star"></i>
      </span>
      <span>
        <i className="fas fa-star"></i>
      </span>
      <span>
        <i className="fas fa-star"></i>
      </span>
      <span>
        <i className="fas fa-star"></i>
      </span>
      <span>
        <i className="fas fa-star-half-alt"></i>
      </span>
    </div>
  );
}

function TestimonialSlideBody(slide: TestimonialSlideConfig) {
  return (
    <div className="tp-testi__2-item">
      <div className="tp-testi__2-content">
        <div className="tp-testi__2-title-box mb-45">
          <TestimonialSectionTitle asH2={slide.headingIsH2} />
          <p>{slide.quote}</p>
        </div>
        <div className="tp-testi__2-author-box d-sm-flex align-items-center justify-content-between">
          <div className={slide.authorInfoClassName}>
            <div className="tp-testi__2-author-text">
              <p className="tp-testi__2-author-title">{slide.authorName}</p>
              <span className="tp-testi__2-author-designation text-black">
                {slide.authorDesignation}
              </span>
            </div>
          </div>
          <TestimonialAuthorStars />
        </div>
      </div>
    </div>
  );
}

const ServiceMainTestimonial = () => {
  return (
    <div
      className="elementor-element elementor-element-b5f6978 e-con-full e-flex e-con e-parent e-lazyloaded"
      data-id="b5f6978"
      data-element_type="container"
    >
      <div
        className="elementor-element elementor-element-c5097da e-con-full e-flex e-con e-child"
        data-id="c5097da"
        data-element_type="container"
      >
        <div
          className="elementor-element elementor-element-6dff02f elementor-widget elementor-widget-testimonial"
          data-id="6dff02f"
          data-element_type="widget"
          data-widget_type="testimonial.default"
        >
          <div className="elementor-widget-container">
            <section className="tp-testimonial-2-area fix tp-testi__2-bg-style tp-testi__2-plr p-relative">
              <div className="tp-testi__2-shape-1">
                <img
                  decoding="async"
                  src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/testi-2-1-shape.png"
                  alt="Ritz Media World"
                />
              </div>

              <div className="tp-testi__2-shape-2">
                <img
                  decoding="async"
                  src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/testi-2-2-shape.png"
                  alt="Ritz Media World"
                  style={{
                    filter:
                      "sepia(10%) saturate(120%) brightness(105%) hue-rotate(185deg)",
                  }}
                />
              </div>

              <div className="container">
                <div className="tp-testi__2-wrap">
                  <div className="row align-items-center">
                    <div className="col-xl-6 col-lg-6 order-md-1 order-sm-1">
                      <div className="swiper-container tp-testi__2-active swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
                        <Swiper
                          modules={[Autoplay]}
                          loop={true}
                          slidesPerView={1}
                          spaceBetween={30}
                          speed={1000}
                          autoplay={true}
                          className="swiper-wrapper"
                          id="swiper-wrapper-7d773315613f04db"
                          aria-live="off"
                        >
                          {TESTIMONIAL_SLIDES.map((slide, index) => (
                            <SwiperSlide
                              key={`${slide.ariaLabel}-${index}`}
                              className={slide.swiperSlideClassName}
                              data-swiper-slide-index={
                                slide.dataSwiperSlideIndex
                              }
                              role="group"
                              aria-label={slide.ariaLabel}
                              style={TESTIMONIAL_SLIDE_STYLE}
                            >
                              <TestimonialSlideBody {...slide} />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        <span
                          className="swiper-notification"
                          aria-live="assertive"
                          aria-atomic="true"
                        ></span>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 order-xl-1 order-md-0 order-sm-0">
                      <div className="tp-testi__2-thumb-box">
                        <div className="tp-testi__2-thumb p-relative">
                          <span className="tp-testi__2-thumb-shape"></span>
                        </div>
                      </div>
                    </div>
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

export default ServiceMainTestimonial;
