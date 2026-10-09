import Link from "next/link";
const ServiceThirdVideo = () => {
  return (
    <div
      className="elementor-element elementor-element-7f0eda8 e-con-full e-flex e-con e-parent e-lazyloaded"
      data-id="7f0eda8"
      data-element_type="container"
    >
      <div
        className="elementor-element elementor-element-9802923 e-con-full e-flex e-con e-child"
        data-id="9802923"
        data-element_type="container"
      >
        <div
          className="elementor-element elementor-element-e6996be elementor-widget elementor-widget-video"
          data-id="e6996be"
          data-element_type="widget"
          data-widget_type="video.default"
        >
          <div className="elementor-widget-container">
            <section
              className="tp-video__area tp-video__3-bg pt-195 pb-190 wow avtrix_clip_up tp-bg-className"
              data-wow-delay="s"
              data-wow-duration="s"
              style={{
                visibility: "visible",
                animationName: "avtrix_clip_up",
                backgroundImage:
                  "url(https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/video-bg-2-1.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="tp-video__content text-center">
                      <Link
                        title="Play Video"
                        href="/" target="_blank"
                        className="tp-video__3-play-icon popup-video p-relative"
                      >
                        <div
                          className="tp-video__3-play-bg"
                          data-background="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/video-2-circle-1.png"
                          style={{
                            backgroundImage:
                              "url(https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/video-2-circle-1.png)",
                          }}
                        ></div>
                        <h3 className="tp-video__3-text">
                          <span>Play</span>
                        </h3>
                      </Link>
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

export default ServiceThirdVideo;
