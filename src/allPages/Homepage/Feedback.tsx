"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const testimonials = [
  {
    author: "Madhusudan Ghee",
    designation: "Managing Director",
    content:
      "To me, advertising my brand was merely a means to ensure my elongated presence in the market. Thanks to ritz Media world, my advertisements not only ensured my brand’s sustenance but have also got me a great number of quality leads.",
  },
  {
    author: "FAIRFOX - EON",
    designation: "Marketing Head",
    content:
      "If there is one thing serving as a full service digital agency for more than a decade taught us, it has to be the value of relationships. Therefore, our relationship with our clients is both a priority and a point of pride to us.",
  },
  {
    author: "Eldeco Group",
    designation: "Managing Director",
    content:
      "They not only make sure that they deliver on their promises, but also educate you on what exactly is needed to be done for your brand, thereby preventing you from under or over spending your precious money.",
  },
  {
    author: "Escorts Tractor",
    designation: "Chief Communication Officer",
    content:
      "I must admit that RMW and its team of professionals are always on my favourite list. They have always delivered the best services to me even if they had to put in extra efforts and their team has always been available for extensive support.",
  },
];

// 🔹 Reusable testimonial item
type TestimonialItemProps = {
  author: string;
  designation: string;
  content: string;
};

const TestimonialItem = ({ author, designation, content }: TestimonialItemProps) => (
  <div className="tp-testimonial__item">
    <div className="tp-testimonial__thumb-box mb-25 d-flex align-items-center justify-content-between">
      <div className="tp-testimonial__thumb"></div>
      <div className="tp-testimonial__icon">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="34"
            viewBox="0 0 46 34"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.6491 17.336C14.7498 17.336 14.8503 17.3637 14.9371 17.4201C15.1018 17.5246 15.1932 17.7105 15.1731 17.9017C14.885 20.6874 14.1452 23.2837 12.9738 25.6189C11.9386 27.6816 10.5833 29.4923 8.92531 31.0312C17.0185 26.8031 20.3125 17.782 19.2013 10.4938C18.5036 5.91889 15.7208 1.02949 10.0035 1.02949C5.06897 1.02946 1.05343 4.95374 1.05343 9.77708C1.05352 14.5995 5.06894 18.5238 10.0035 18.5238C11.5416 18.5237 13.0578 18.1359 14.3902 17.4022C14.4707 17.3575 14.5603 17.3361 14.6491 17.336Z"
              fill="#8A5A0D"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M40.1872 17.336C40.2878 17.336 40.3884 17.3637 40.4762 17.4201C40.6408 17.5246 40.7313 17.7105 40.7121 17.9018C40.4241 20.6874 39.6834 23.2837 38.5119 25.6189C37.4768 27.6816 36.1224 29.4923 34.4644 31.0313C42.5558 26.8031 45.8506 17.7821 44.7395 10.4938C44.0418 5.91889 41.2599 1.02949 35.5426 1.02949C30.6071 1.02946 26.5925 4.95374 26.5925 9.77708C26.5926 14.5995 30.6071 18.5238 35.5426 18.5238C37.0799 18.5237 38.597 18.1359 39.9294 17.4022C40.0099 17.3575 40.0985 17.3361 40.1872 17.3361Z"
              fill="#8A5A0D"
            />
          </svg>
        </span>
      </div>
    </div>
    <div className="tp-testimonial__content">
      <p>{content}</p>
      <div className="tp-testimonial__author">
        <h3 className="tp-testimonial__author-title">{author}</h3>
        <span className="tp-testimonial__author-designation">
          <span>{designation}</span>
        </span>
      </div>
    </div>
  </div>
);

const Feedback = () => {
  return (
    <div
      className="elementor-element elementor-element-43b8018 e-con-full e-flex e-con e-parent"
      data-id="43b8018"
      data-element_type="container"
    >
      <div
        className="elementor-element elementor-element-42bb39e e-con-full e-flex e-con e-child"
        data-id="42bb39e"
        data-element_type="container"
      >
        <div
          className="elementor-element elementor-element-1b52e19 elementor-widget elementor-widget-testimonial"
          data-id="1b52e19"
          data-element_type="widget"
          data-widget_type="testimonial.default"
        >
          <div className="elementor-widget-container">
            <section className="tp-testimonial__area fix tp-bg-class">
              <div className="container">
                <div className="tp-testimonial__wrap p-relative">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="tp-awards__title-box mb-20">
                        <span
                          className="tp-section-title-pre mb-20"
                          style={{ borderRadius: "0px" }}
                        >
                          Clients Feedback
                        </span>
                        <div className="tp-section-title-wrap d-flex align-items-center justify-content-between">
                          <h3 className="tp-section-title">
                            Client’s <span> Testimonial </span>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="swiper-container tp-testimonial__active">
                      <Swiper
                        spaceBetween={75}
                        slidesPerView={3}
                        loop={true}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        breakpoints={{
                          1200: { slidesPerView: 3 },
                          992: { slidesPerView: 2 },
                          768: { spaceBetween: 30, slidesPerView: 2 },
                          576: { slidesPerView: 1 },
                          0: { slidesPerView: 1 },
                        }}
                        modules={[Autoplay]}
                        className="tp-testimonial__active"
                      >
                        {testimonials.map((t, idx) => (
                          <SwiperSlide key={idx}>
                            <TestimonialItem {...t} />
                          </SwiperSlide>
                        ))}
                      </Swiper>
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

export default Feedback;
