"use client";
import { useSplitText } from "@/hooks/useSplitText";
// import Link from "next/link";

type ServiceEndtagProp = {
  endtag: string | null;
};

const ServiceEndTag = ({ endtag }: ServiceEndtagProp) => {

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
              className="tp-cta__2-area fix wow none animated"
              data-wow-duration="s"
              data-wow-delay="s"
              style={{ visibility: "visible",
                backgroundColor: "#0f1640",
              }}
              
            >
              <div className="container">
                <div className="tp-cta__3-box">
                  <div className="row align-items-center">
                    <div className="">
                      <div className="tp-cta__3-text">
                        <h3
                        ref={(el) => { if (el) textRefs.current.push(el) }}
                          className="text-white text-6xl tp-split__text tp-split__in-right"
                          style={{position: "relative",
                            padding:"20px 10px",
                            maxWidth:"1000px",
                            fontSize:"30px",
                        left: "50%",
                        transform: "translate(-50%)",
                        textAlign: "center"}}
                        >
                          {endtag}
                        </h3>
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

export default ServiceEndTag;
