import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
const AboutAward = () => {
  return (
    <div>
      <div className="elementor-widget-container">
        <section className="tp-awards__5-area fix tp-awards__5 pt-35 about_our_work-mp">
          <div className="container ">
            <div className="row">
              <div className="col-xl-5 about_our_work">
                {/* <div className="tp-awards__5-thumb-box p-relative"> */}
                  <div className={styles.tpthumb}>
                    <Image
                      src="/about-images/award.jpg"
                      style={{ objectFit: "cover" }}
                      fill
                      priority
                      quality={75}
                      sizes="(max-width: 768px) 100vw, 40vw"
                      alt="about the agency & legacy"
                    />
                  </div>
                {/* </div> */}
              </div>
              <div className="col-xl-7">
                <div className="tp-awards__5-content justify-center">
                  <div className="tp-awards__5-title-box mb-70">
                    <h3
                      className="tp-section-title tp-split__text tp-split__in-right"
                      style={{ perspective: "400px" }}
                    >
                      <div
                        className="tp-split__line"
                        style={{
                          display: "block",
                          textAlign: "start",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              translate: "none",
                              rotate: "none",
                              scale: "none",
                              transform: "translate(0px, 0px)",
                              opacity: 1,
                              // backgroundColor:'red'
                            }}
                          >
                            Our Work is Our Reward
                          </div>
                        </div>
                      </div>
                    </h3>
                    <p>
                      Our Mad Men are obsessed with building stories. Like a
                      moth to a flame, they’re just obsessed with any branding
                      problem that may need a solution.
                    </p>
                  </div>
                  <div className="tp-awards__5-funfact-box mb-80 p-relative d-sm-flex align-items-center justify-content-between">
                    <div className="tp-awards__5-funfact-item text-center">
                      <p className="text-black">Satisfied Clients</p>
                      <h3 className="tp-awards__5-funfact-text">
                        <b
                          className="purecounter"
                          data-purecounter-duration="0"
                          data-purecounter-end="25"
                        >
                          300
                        </b>
                        +
                      </h3>
                    </div>
                    <div className="tp-awards__5-funfact-item text-center">
                      <p className="text-black">Service Catagories</p>
                      <h3 className="tp-awards__5-funfact-text">
                        <b
                          className="purecounter"
                          data-purecounter-duration="0"
                          data-purecounter-end="153"
                        >
                          40
                        </b>
                        +
                      </h3>
                    </div>
                    <div className="tp-awards__5-funfact-item text-center">
                      <p className="text-black">Award Win</p>
                      <h3 className="tp-awards__5-funfact-text">
                        <b
                          className="purecounter"
                          data-purecounter-duration="0"
                          data-purecounter-end="56"
                        >
                          35
                        </b>
                        +
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutAward;
