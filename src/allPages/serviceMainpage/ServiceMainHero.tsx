"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ServiceMainHero = () => {
  const lines = ['"Just Another"', 'to "The One."'];
  const [svgSize, setSvgSize] = useState({ width: 300, height: 200 });
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 628) {
        // Width less than 628: width 300, height 280
        setSvgSize({ width: 300, height: 200 });
      } else if (w >= 628 && w < 1024) {
        // Width between 628 and 1024: width 628, height 300
        setSvgSize({ width: 628, height: 200 });
      } else {
        // Width 1024 and above: width 800, height 350
        setSvgSize({ width: 800, height: 200 });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const { width: svgWidth, height: svgHeight } = svgSize;
  const fontSizeClamp = "clamp(2rem, 8vw, 5rem)";

  // vertical position centered roughly in the SVG
  const textY = svgHeight / 2;
  return (
    <div
      className="elementor-element elementor-element-00d6da7 e-con-full e-flex e-con e-parent e-lazyloaded"
      data-id="00d6da7"
      style={{ padding: "0", margin: "0" }}
    >
      <div
        className="elementor-element elementor-element-3a22ef0 e-con-full e-flex e-con e-child"
        data-id="3a22ef0"
        data-element_type="container"
        style={{ padding: "0", margin: "0" }}
      >
        <div
          className="elementor-element elementor-element-e84e3a9 elementor-widget elementor-widget-hero-banner"
          data-id="e84e3a9"
          data-element_type="widget"
          style={{ backgroundColor: "white" }}
        >
          <div className="elementor-widget-container">
            <section className="tp-hero-2-area fix tp-hero__space tp-hero__2-bg tp-hero__2-overlay p-relative tp-bg-className">
              <div className="tp-hero__2-wrap">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-xl-8 col-lg-4">
                      <div className="tp-hero__2-title-box md:mb-64 p-relative">
                        <h1 className="tp-hero__subtitle text-blue md:mb-30">
                          Services Tailored to Transform Your Brand from
                        </h1>
                        <div
                          style={{
                            width: "100%",
                            maxWidth: svgWidth,
                            position: "relative",
                            // height: svgHeight,
                            textAlign: "start",
                            // marginTop: "90px",
                            // backgroundColor:'red',
                          }}
                          className="tp-hero-v-banner"
                        >
                          <svg
                            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                            style={{
                              width: "100%",
                              height: "auto",
                              aspectRatio: `${svgWidth} / ${svgHeight}`,
                            }}
                          >
                            <defs>
                              <clipPath id="video-text-clip">
                                <text
                                  x={svgWidth / 2}
                                  y={textY / 2}
                                  textAnchor="start"
                                  fill="white"
                                  fontFamily="Arial, sans-serif"
                                  fontWeight="bold"
                                  style={{
                                    fontSize: fontSizeClamp,
                                    userSelect: "none",
                                  }}
                                >
                                  {lines.map((line, index) => (
                                    <tspan
                                      key={index}
                                      x={0}
                                      dy={index === 0 ? "0" : "1em"} // vertical offset between lines
                                    >
                                      {line}
                                    </tspan>
                                  ))}
                                </text>
                              </clipPath>
                            </defs>
                          </svg>
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              clipPath: "url(#video-text-clip)",
                              WebkitClipPath: "url(#video-text-clip)",
                            }}
                          >
                            <video
                              src="/videos/bg_pattern.mp4"
                              autoPlay
                              loop
                              muted
                              playsInline
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="tp-hero__2-action d-flex align-items-center">
                        <span>
                          <Link
                            title="Contact Us"
                            href="/contact.html"
                            className="tp-hero__action-btn tp-hero__2-btn"
                          >
                            <span>
                              <svg
                                width="33"
                                height="33"
                                viewBox="0 0 33 33"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1.99996 26.5469L29.4548 7.97636M6.73828 2L31.2851 6.73832L26.5468 31.2852"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="square"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </span>
                          </Link>
                        </span>
                        <Link href="/contact.html" title="Contact Us" target="_self">
                          CONTACT US
                        </Link>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-5">
                      <div className="tp-hero__2-content p-relative">
                        <div className="tp-hero__2-circle-shape">
                          <Image fill
                            decoding="async"
                            src="/service-first-images/One_roof_2.png"
                            alt="Ritz Media Services"
                            style={{ maxHeight: "220px", objectFit:'contain', margin:'auto' }}
                          />
                        </div>
                        <div
                          className="tp-hero__2-icon md:mb-70 wow tpfadeUp animated"
                          data-wow-duration=".9s"
                          data-wow-delay=".3s"
                          style={{
                            visibility: "visible",
                            animationDuration: "0.9s",
                            animationDelay: "0.3s",
                          }}
                        >
                          <Link href="/contact.html/" title="Contact Us" target="_self">
                            <span>
                              <svg
                                width="93"
                                height="93"
                                viewBox="0 0 93 93"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 88L83.75 9.25M5 4H89V88"
                                  stroke="currentColor"
                                  strokeWidth="6.5"
                                  strokeLinecap="square"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </span>
                          </Link>
                        </div>
                        <p className="mt-20">
                          At Ritz Media World, we have an obsession with being
                          wizards of quirkiness that morph good ideas into
                          brilliant ones. Our services deliver results that
                          drive your competitors' desire. We blend digital magic,
                          classic & modern media, and creative ingenuity to
                          ensure that your brand doesn’t just speak; it
                          captivates.
                        </p>
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

export default ServiceMainHero;
