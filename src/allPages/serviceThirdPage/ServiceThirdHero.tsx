"use client";
import PagesBanner from "../../components/pagesBanner/PagesBanner";
// import Link from "next/link";
type headingProp = {
  heading: string | null;
};
const ServiceThirdHero = ({ heading }: headingProp) => {
  const lines = heading?.toUpperCase();

  return (
    <div
      className="elementor-element elementor-element-9b5be38 e-con-full e-flex e-con e-parent e-lazyloaded"
      data-id="9b5be38"
      data-element_type="container"
      style={{ padding: "0", margin: "0" }}
    >
      <div
        className="elementor-element elementor-element-88259bc e-con-full e-flex e-con e-child"
        data-id="88259bc"
        data-element_type="container"
        style={{ padding: "0", margin: "0" }}
      >
        <div
          className="elementor-element elementor-element-3f42da0 elementor-widget elementor-widget-hero-banner"
          data-id="3f42da0"
          data-element_type="widget"
          data-widget_type="hero-banner.default"
        >
          <div className="elementor-widget-container">
            <section
              className="tp-hero__3-area fix tp-hero__3-space tp-hero__3-bg tp-hero__3-overlay p-relative tp-bg-className"
              data-background="/service-banner/Service_Bg_RMW.jpg"
              style={{
                backgroundImage: "/service-banner/Service_Bg_RMW.jpg",
              }}
            >
              <div className="tp-hero__3-wrap">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-xl-12">
                      <div className="tp-hero__3-title-box p-relative">
                        {/* <div
                          style={{
                            width: "100%",
                            maxWidth: '100vw',
                            margin: "0 auto",
                            position: "relative",
                            // height: '70vh',
                            height:'50vh',
                            textAlign: "start",
                            // marginTop: "90px",
                            backgroundColor:'red'
                          }}
                        > */}
                        <PagesBanner
                          headingTitle={lines}
                          videoURL={"/videos/bg_pattern.mp4"}
                          mtP={"80px"}
                          mtS={"50px"}
                          sH={"auto"}
                        />
                        {/* </div> */}
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

export default ServiceThirdHero;
