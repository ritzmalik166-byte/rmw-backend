"use client";
import { useSplitText } from "@/hooks/useSplitText";
import Link from "next/link";

const ServiceMainTalk = () => {

  const textRefs = useSplitText();

  return (
    <div
      className="elementor-element elementor-element-4522f87 e-con-full e-flex e-con e-parent e-lazyloaded"
      data-id="4522f87"
      data-element_type="container"
    >
      <div
        className="elementor-element elementor-element-32cdd03 e-con-full e-flex e-con e-child"
        data-id="32cdd03"
        data-element_type="container"
      >
        <div
          className="elementor-element elementor-element-d9329e1 elementor-widget elementor-widget-cta"
          data-id="d9329e1"
          data-element_type="widget"
          data-widget_type="cta.default"
        >
          <div className="elementor-widget-container">
            <section
              className="tp-cta__2-area fix bg-[#0f1640] pt-65 pb-40 wow none animated"
              data-wow-duration="s"
              data-wow-delay="s"
              style={{ visibility: "visible", backgroundColor: "#0f1640" }}
            >
              <div className="container">
                <div className="tp-cta__3-box">
                  <div className="row align-items-center">
                    <div className="col-xl-8 col-lg-8 col-md-8">
                      <div className="tp-cta__3-text">
                        <h2
                        ref={(el) => { if (el) textRefs.current.push(el) }}
                          className="text-white text-6xl tp-split__text tp-split__in-right"
                          style={{ perspective: "400px" }}
                        >
                          Let&apos;s Do Something Remarkable Together.
                        </h2>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4">
                      <div className="tp-cta__3-action d-none d-md-block text-md-end">
                        <Link
                          title="Contact Us"
                          href="/contact.html"
                          target="_self"
                          rel="nofollow"
                        >
                          <svg
                            width="122"
                            height="122"
                            viewBox="0 0 122 122"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 118.23L112.028 10.2019M4 3H119.23V118.23"
                              stroke="currentColor"
                              strokeWidth="4.5"
                              strokeLinecap="square"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </Link>
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

export default ServiceMainTalk;
