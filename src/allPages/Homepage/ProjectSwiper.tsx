"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "@/app/styles/marque.css";

// Extracted repeated SVG into a constant (for reuse)
const HexagonSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="46"
    height="46"
    viewBox="0 0 46 46"
    fill="none"
  >
    <path
      d="M41.6707 10.156L25.0593 0.551229C24.4333 0.190337 23.7234 0.000366211 23.0008 0.000366211C22.2782 0.000366211 21.5683 0.190337 20.9423 0.551229L4.33092 10.156C3.71549 10.5122 3.20418 11.0235 2.84797 11.639C2.49176 12.2544 2.30309 12.9525 2.30078 13.6635V32.3365C2.30309 33.0475 2.49176 33.7456 2.84797 34.361C3.20418 34.9765 3.71549 35.4878 4.33092 35.844L20.9423 45.4488C21.5683 45.8097 22.2782 45.9996 23.0008 45.9996C23.7234 45.9996 24.4333 45.8097 25.0593 45.4488L41.6707 35.844C42.2861 35.4878 42.7974 34.9765 43.1536 34.361C43.5098 33.7456 43.6985 33.0475 43.7008 32.3365V13.6635C43.6985 12.9525 43.5098 12.2544 43.1536 11.639C42.7974 11.0235 42.2861 10.5122 41.6707 10.156ZM5.09912 11.4831L21.7105 1.8791C22.103 1.65327 22.5479 1.53443 23.0008 1.53443C23.4536 1.53443 23.8986 1.65327 24.2911 1.8791L40.9025 11.4831C41.1919 11.6509 41.4454 11.8742 41.6484 12.1402L31.4472 18.0435L24.2405 13.4366C23.8705 13.2011 23.4409 13.076 23.0023 13.076C22.5637 13.076 22.1342 13.2011 21.7642 13.4366L14.5575 18.0435L4.35622 12.1402C4.5583 11.8745 4.81074 11.6512 5.09912 11.4831ZM23.0008 31.5483L15.9858 27.3401L22.5845 23.1173C22.7084 23.0374 22.8526 22.9949 23 22.9949C23.1474 22.9949 23.2917 23.0374 23.4156 23.1173L30.0158 27.3409L23.0008 31.5483ZM30.6675 25.9363L24.2405 21.8239C23.8693 21.5894 23.4391 21.4649 23 21.4649C22.5609 21.4649 22.1308 21.5894 21.7596 21.8239L15.3341 25.9363V19.3683L22.5876 14.7323C22.7109 14.6533 22.8543 14.6114 23.0008 14.6114C23.1473 14.6114 23.2907 14.6533 23.414 14.7323L30.6675 19.3683V25.9363ZM5.09912 34.5169C4.71607 34.2957 4.39769 33.978 4.17572 33.5954C3.95376 33.2129 3.83598 32.7788 3.83412 32.3365V13.6635C3.83412 13.6467 3.83412 13.6298 3.83412 13.6129L13.8008 19.3821V26.5121C13.802 26.9089 13.9053 27.2988 14.1008 27.6441C14.2963 27.9895 14.5774 28.2787 14.9171 28.484L22.2341 32.877V44.3379C22.0521 44.2854 21.8765 44.2128 21.7105 44.1217L5.09912 34.5169ZM42.1675 32.3365C42.1656 32.7788 42.0478 33.2129 41.8259 33.5954C41.6039 33.978 41.2855 34.2957 40.9025 34.5169L24.2911 44.1209C24.1251 44.2121 23.9494 44.2846 23.7675 44.3371V32.877L31.0845 28.487C31.4242 28.2818 31.7053 27.9926 31.9008 27.6472C32.0963 27.3019 32.1996 26.912 32.2008 26.5152V19.3852L42.1675 13.616C42.1675 13.6329 42.1675 13.6497 42.1675 13.6666V32.3365Z"
      fill="#8A5A0D"
    ></path>
  </svg>
);

// Slide data array (to avoid repetition)
const slidesData = [
  { href: "/services/digital-marketing", text: "DIGITAL MARKETING" },
  { href: "/services/print-advertising", text: "PRINT ADVERTISING" },
  { href: "/services/radio-advertising", text: "RADIO ADVERTISING" },
  { href: "/services/creative-services", text: "CREATIVE SERVICES" },
  { href: "/services/contents-marketing", text: "CONTENT MARKETING" },
];

const ProjectSwiper = () => (
  <div
    className="elementor-element elementor-element-0179a03 e-con-full e-flex e-con e-parent"
    data-id="0179a03"
    data-element_type="container"
  >
    <div
      className="elementor-element elementor-element-046a5f2 e-con-full e-flex e-con e-child"
      data-id="046a5f2"
      data-element_type="container"
    >
      <div
        className="elementor-element elementor-element-97f63e7 elementor-widget elementor-widget-text-slider"
        data-id="97f63e7"
        data-element_type="widget"
        data-widget_type="text-slider.default"
      >
        <div className="elementor-widget-container">
          <div className="tp-text__slider-area fix pt-10 pb-20">
            <div className="tp-text__1-box">
              <Swiper
                modules={[Autoplay]}
                loop
                freeMode
                slidesPerView="auto"
                spaceBetween={30}
                centeredSlides
                allowTouchMove={false}
                speed={10000}
                autoplay={{
                  delay: 1,
                  disableOnInteraction: true,
                }}
                className="tp-text__1-slider-active"
              >
                {slidesData.map(({ href, text }, index) => (
                  <SwiperSlide key={index}>
                    <div className="tp-text__2-wrap">
                      <h2 className="tp-text__2-text">
                        <Link href={href} title={text}>{text}</Link>
                        <span>
                          <HexagonSVG />
                        </span>
                      </h2>
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
);

export default ProjectSwiper;
