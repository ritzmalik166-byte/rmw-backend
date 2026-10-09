import Link from "next/link";
const ServiceMainAbout = () => {
  return (
    <div
      className="elementor-element elementor-element-17cfdcd e-con-full e-flex e-con e-parent e-lazyloaded"
      data-id="17cfdcd"
      data-element_type="container"
    >
      <div
        className="elementor-element elementor-element-48ba934 e-con-full e-flex e-con e-child"
        data-id="48ba934"
        data-element_type="container"
      >
        <div
          className="elementor-element elementor-element-c5a8ae4 elementor-widget elementor-widget-cta"
          data-id="c5a8ae4"
          data-element_type="widget"
          data-widget_type="cta.default"
        >
          <div className="elementor-widget-container">
            <section className="tp-cta__2-area bg-[#0f1640] fix pt-110" style={{ backgroundColor: "#0f1640" }}>
              <div className="container-fluid p-0">
                <div className="row">
                  <div className="col-xl-6 col-lg-6">
                    <div className="tp-cta__2-item p-relative">
                      <div
                        className="tp-cta__2-thumb wow avtrix_clip_up"
                        data-background="/services/Successful-Profitable-Products-465x640.png"
                        data-wow-delay=".3s"
                        data-wow-duration="2s"
                        style={{
                          backgroundImage:
                            "url(/services/Successful-Profitable-Products-465x640.png)",
                          visibility: "visible",
                          animationDuration: "2s",
                          animationDelay: "0.3s",
                          animationName: "avtrix_clip_up",
                        }}
                      ></div>
                      <div className="tp-cta__2-circle"></div>
                      <div className="tp-cta__2-content">
                        <div className="tp-cta__2-text p-relative">
                          <p className="tp-cta__2-title mb-45 text-white" style={{lineHeight:"50px"}}>
                            We Build <span>Successful</span> <br />
                            Profitable Products
                          </p>
                          <Link
                            title="More about us"
                            className="tp-btn-secondary hover:text-white"
                            href="/about.html"
                            target="_blank"
                            rel="nofollow"
                          >
                            more about
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6">
                    <div className="tp-cta__2-item p-relative">
                      <div className="tp-cta__2-circle-2"></div>
                      <div
                        className="tp-cta__2-thumb wow avtrix_clip_down"
                        data-background="/services/Company-Mission-465x640.png"
                        data-wow-delay=".3s"
                        data-wow-duration="2s"
                        style={{
                          backgroundImage:
                            "url(/services/Company-Mission-465x640.png)",
                          visibility: "visible",
                          animationDuration: "2s",
                          animationDelay: "0.3s",
                          animationName: "avtrix_clip_down",
                        }}
                      ></div>
                      <div className="tp-cta__2-content">
                        <div className="tp-cta__2-text-2 p-relative">
                          <p className="tp-cta__2-title tp-cta-mission text-white">
                            <span>COMPANY</span> <br />
                            MISSION
                          </p>
                          <Link
                            title="More about us"
                            className="tp-cta_2-mission-arrow"
                            href="https://ritzmediaworld.com/about.html" target="_blank"
                            rel="nofollow"
                          >
                            <span>
                              <svg
                                width="63"
                                height="63"
                                viewBox="0 0 63 63"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 59L56.5 6.5M4 3H60V59"
                                  stroke="white"
                                  strokeWidth="4.5"
                                  strokeLinecap="square"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </span>
                          </Link>
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

export default ServiceMainAbout;
