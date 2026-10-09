"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import SuccessStory from "@/components/17YearsOfSuccess/SuccessStory";

// "abcabcbb" ==> length = 3 *abc
// "bbbbb" ==> 1 *b

const Home = () => {
  const lines = ["ADVERTISING", "BRANDING", "COMMUNICATION"];
  const fontSizeClamp = "clamp(2rem, 6vw, 5rem)";

  return (
    <div
      className="elementor-element elementor-element-199ac0f e-con-full e-flex e-con e-parent"
      data-id="199ac0f"
      data-element_type="container"
      style={{ margin: "0", padding: "0px !important" }}
    >
      <div
        className="elementor-element elementor-element-5a1b25c e-con-full e-flex e-con e-child"
        data-id="5a1b25c"
        data-element_type="container"
        style={{ padding: "0px !important" }}
      >
        <div
          className="elementor-element elementor-element-12cef4b elementor-widget elementor-widget-hero-banner"
          data-id="12cef4b"
          data-element_type="widget"
          data-widget_type="hero-banner.default"
        >
          {/* <Suspense fallback={<div style={{ height: 200 }} />}> */}
          <SuccessStory />
          {/* </Suspense> */}

          <div className="elementor-widget-container">
            <section className="tp-hero__area fix tp-hero__space tp-hero__bg p-relative tp-bg-className">
              <div className="tp-hero__wrap">
                <div className="container">
                  <div className="row">
                    {/* Left Column */}
                    <div className="col-xl-8 col-lg-7">
                      <div
                        className="tp-hero__title-box p-relative"
                        style={{ minHeight: "3em" }} // CLS prevention
                      >
                        <h1 style={{ 
                          position: "absolute",
                          width: "1px",
                          height: "1px",
                          padding: "0",
                          margin: "-1px",
                          overflow: "hidden",
                          clip: "rect(0, 0, 0, 0)",
                          whiteSpace: "nowrap",
                          borderWidth: "0"
                        }}>
                          Telling Stories to Remember with Advertising, Branding, Communication
                        </h1>
                        <span className="tp-hero__subtitle mb-20">
                          Telling Stories to Remember with
                        </span>

                        <div
                          style={{
                            width: "100%",
                            maxWidth: "800px",
                            position: "relative",
                            aspectRatio: "16/7",
                            textAlign: "start",
                          }}
                        >
                          <svg
                            viewBox="0 0 800 350"
                            style={{
                              width: "100%",
                              // height: "100%",
                            }}
                          >
                            <defs>
                              <clipPath id="video-text-clip">
                                <text
                                  x={0}
                                  y={70}
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
                                      dy={index === 0 ? "0" : "1.2em"}
                                    >
                                      {line}
                                    </tspan>
                                  ))}
                                </text>
                              </clipPath>
                            </defs>
                          </svg>

                          {/* Video Background with Poster */}
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
                              preload="metadata"
                              poster="/videos/bg_pattern_poster.jpg"
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

                      {/* Action Buttons */}
                      <div className="tp-hero__action d-flex align-items-center mt-4">
                        <span>
                          <Link
                            title="Contact RMW"
                            href="/contact.html"
                            className="tp-hero__action-btn"
                            aria-label="Contact RMW"
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
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="square"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </Link>
                        </span>
                        <Link
                          title="Learn more about RMW"
                          href="/contact.html"
                          rel="nofollow"
                          target="_self"
                          aria-label="Learn more about RMW"
                        >
                          LEARN MORE
                        </Link>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-xl-4 col-lg-5">
                      <div className="tp-hero__content tp-hero-content">
                        <div className="tp-hero__thumb mb-80 p-relative">
                          <div className={styles.megaPhoneDiv}>
                            <Image
                              src="/home-images/Megaphone_RMW_Home.png"
                              alt="gf"
                              fill
                              priority
                              fetchPriority="high"
                              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 400px"
                              style={{ objectFit: "contain" }}
                              quality={80}
                            />
                          </div>
                        </div>

                        <p style={{ color: "#8a5a0d" }}>
                          Billions of words written, Millions of Creatives
                          Delivered, Thousands of Campaigns executed, and
                          hundreds of success stories completed. This is a quick
                          summary of what Ritz Media World is all about.
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

export default Home;
