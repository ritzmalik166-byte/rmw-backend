"use client"; //changed
import { useSplitText } from "@/hooks/useSplitText"; //chg
const Work = () => {
  const textRefs = useSplitText();

  return (
    <div
      className="elementor-element elementor-element-d158cde e-con-full e-flex e-con e-parent"
      data-id="d158cde"
      data-element_type="container"
    >
      <div
        className="elementor-element elementor-element-fcf7045 e-con-full e-flex e-con e-child"
        data-id="fcf7045"
        data-element_type="container"
      >
        <div
          className="elementor-element elementor-element-c524b31 elementor-widget elementor-widget-fun-facts"
          data-id="c524b31"
          data-element_type="widget"
          data-widget_type="fun-facts.default"
        >
          <div className="elementor-widget-container">
            <div className="tp-funfact__area fix tp-funfact__1 p-relative">
              <div className="tp-funfact__shape">
              </div>
              <div
                className="tp-funfact__box tp-funfact__bg pb-35"
                data-background="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/08/funfact-bg-1-1.jpg"
              >
                <div className="container">
                  <div className="row justify-content-center">
                    <div
                      className="col-xl-6"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div className="tp-funfact__title-box tp-cursor-point-area mb-3 p-relative tp_fun_fact_title_text_align">
                        <h3
                          className="tp-section-title tp-funfact-title tp-split__text tp-split__in-right"
                        >
                          Let’s Work <span>Together</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="tp-funfact__wrap ">
                    <div className="row">
                      <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <div
                          className="tp-funfact__item text-center wow tpFadeInUp"
                          data-wow-duration=".9s"
                          data-wow-delay=".1s"
                        >
                          <h3 className="tp-funfact__number">
                            <b
                              className="purecounter"
                              data-purecounter-duration="1"
                              data-purecounter-end="5"
                            >
                              1
                            </b>
                            B+
                          </h3>
                          <div className="tp-funfact__text">
                            <span> Words Written </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <div
                          className="tp-funfact__item text-center wow tpFadeInUp"
                          data-wow-duration=".9s"
                          data-wow-delay=".1s"
                        >
                          <h3 className="tp-funfact__number">
                            <b
                              className="purecounter"
                              data-purecounter-duration="1"
                              data-purecounter-end="500"
                            >
                              1
                            </b>
                            M+
                          </h3>
                          <div className="tp-funfact__text">
                            <span> Creatives Published </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <div
                          className="tp-funfact__item text-center wow tpFadeInUp"
                          data-wow-duration=".9s"
                          data-wow-delay=".1s"
                        >
                          <h3 className="tp-funfact__number">
                            <b
                              className="purecounter"
                              data-purecounter-duration="1"
                              data-purecounter-end="2"
                            >
                              1
                            </b>
                            K+
                          </h3>
                          <div className="tp-funfact__text">
                            <span> Campaigns Executed </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <div
                          className="tp-funfact__item text-center wow tpFadeInUp"
                          data-wow-duration=".9s"
                          data-wow-delay=".1s"
                        >
                          <h3 className="tp-funfact__number">
                            <b
                              className="purecounter"
                              data-purecounter-duration="1"
                              data-purecounter-end="10"
                            >
                              500
                            </b>
                            +
                          </h3>
                          <div className="tp-funfact__text">
                            <span> Success Stories </span>
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
      </div>
    </div>
  );
};

export default Work;