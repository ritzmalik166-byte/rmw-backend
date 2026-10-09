"use client";
import React from "react";
import { BiAnalyse } from "react-icons/bi";
import { SiAdobecreativecloud } from "react-icons/si";
import { FaGlobe } from "react-icons/fa6";
// import { useSplitText } from "@/hooks/useSplitText"; // Disabled for performance

const Experience = () => {
  // const textRefs = useSplitText(); // Disabled for performance

  return (
    <div
      className="elementor-element elementor-element-f0d1a29 e-con-full e-flex e-con e-parent"
      data-id="f0d1a29"
      data-element_type="container"
    >
      <div
        className="elementor-element elementor-element-08b9f06 e-con-full e-flex e-con e-child"
        data-id="08b9f06"
        data-element_type="container"
      >
        <div
          className="elementor-element elementor-element-60129ff elementor-widget elementor-widget-choose-us"
          data-id="60129ff"
          data-element_type="widget"
          data-widget_type="choose-us.default"
        >
          <div className="elementor-widget-container">
            <section className="tp-chooseus__area fix tp-chooseus__1 p-relative tp-bg-class" style={{ overflow: 'hidden', minHeight: '500px', position: 'relative' }}>
              <div
                className="tp-chooseus__bg-thumb d-none d-xl-block wow avtrix_clip_right"
                style={{
                  backgroundImage: "url(/newImg.jpg)",
                  backgroundPosition:'center',
                  backgroundSize:'cover',
                  backgroundRepeat: 'no-repeat',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '40%',
                  maxWidth: '40%',
                  height: '100%',
                  zIndex: 1,
                  pointerEvents: 'none'
                }}
                data-wow-delay=".3s"
                data-wow-duration="2.5s"
              >
              </div>
              <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '60px', paddingBottom: '60px' }}>
                <div className="row">
                  <div className="col-xl-7 offset-xl-5" style={{ paddingLeft: '30px' }}>
                    <div className="tp-chooseus__wrap" style={{ position: 'relative' }}>
                      <div className="tp-chooseus__title-box mb-45" style={{ position: 'relative' }}>
                        <span
                          className="tp-section-title-2-pre tp-split__text tp-split__in-right mb-15"
                        >
                          Why choose us
                        </span>
                        <br />

                        <p
                          className="tp-section-title-2"
                          style={{ color: "black" }}
                        >
                          <span
                            style={{
                              color: "var(--tp-theme-primary) !important",
                            }}
                          >
                            17+ Years
                          </span>{" "} 
                          Of Storytelling Turning Brands in to Household Names
                        </p>
                        <p>
                          We've held hands with budding brands that have
                          shattered sealings of convention. With us behind them,
                          they have achieved great feats in their industry and
                          went on to dominate their competition.
                        </p>
                      </div>
                      <div className="tp-experience" style={{ position: 'relative' }}>
                        <div className="tp-ex-contain">
                          <div className="tp-ex-icon">
                            <SiAdobecreativecloud size={40} color="#8a5a0d" />
                          </div>
                          <h2
                            className="tp-ex-head"
                            style={{ color: "#0c0c0c", textAlign: "center" }}
                          >
                            Creative Strategy
                          </h2>
                        </div>
                        <div className="tp-ex-contain">
                          <div className="tp-ex-icon">
                            <FaGlobe size={40} color="#8a5a0d" />
                          </div>
                          <h2
                            className="tp-ex-head"
                            style={{ color: "#0c0c0c", textAlign: "center" }}
                          >
                            Digital Marketing
                          </h2>
                        </div>
                        <div className="tp-ex-contain">
                          <div className="tp-ex-icon">
                            <BiAnalyse size={40} color="#8a5a0d" />
                          </div>
                          <h2
                            className="tp-ex-head"
                            style={{ color: "#0c0c0c", textAlign: "center" }}
                          >
                            Market Analysis
                          </h2>
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

export default Experience;