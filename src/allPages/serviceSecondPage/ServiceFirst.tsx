"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useGSAPHoverEffect from "@/hooks/useGSAPHoverEffect";
import { useParams } from "next/navigation";
type ServiceFirstProps = {
  heading?: string | null;
  image1?: string | null;
  image2?: string | null;
};

const ServiceFirst = ({ heading }: ServiceFirstProps) => {
  // const textRefs = useSplitText();
  const lines = heading?.toUpperCase().split(" ");
  const [svgSize, setSvgSize] = useState({ width: 320, height: 200 });
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 628) {
        // Width less than 628: width 300, height 280
        setSvgSize({ width: 320, height: 200 });
      } else if (w >= 628 && w < 1024) {
        // Width between 628 and 1024: width 628, height 300
        setSvgSize({ width: 628, height: 300 });
      } else {
        // Width 1024 and above: width 800, height 350
        setSvgSize({ width: 800, height: 350 });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const params = useParams();
  const { width: svgWidth, height: svgHeight } = svgSize;
  const fontSizeClamp = "clamp(2.5rem, 8vw, 6rem)";

  // vertical position centered roughly in the SVG
  const textY = svgHeight / 2;
  useGSAPHoverEffect();
  console.log(params.secondPage);
  return (
    <div className="elementor-widget-container">
      <section className="tp-services__area tp-service__plr">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-service__wrap p-relative">
                <div className="z-index-2">
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
                    {heading || "Our Services"}
                  </h1>
                  <div
                    className="tttlll"
                    style={{
                      width: "100%",
                      maxWidth: svgWidth,
                      margin: "0 auto",
                      position: "relative",
                      textAlign: "start",
                      //  backgroundColor:'yellow'
                    }}
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
                            y={textY / 1.5}
                            textAnchor="middle"
                            fill="white"
                            fontFamily="Arial, sans-serif"
                            fontWeight="bold"
                            style={{
                              fontSize: fontSizeClamp,
                              userSelect: "none",
                            }}
                          >
                            {lines?.map((line, index) => (
                              <tspan
                                key={index}
                                x={svgWidth / 2}
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
                <div className="tp-service__btn-wrap text-center">
                  <div className="tp-hover__btn-wrap tp-btn__bounce">
                    <Link
                      title="Let's Talk Today"
                      className="tp-hover__btn tp-hover__btn-item"
                      href={`${
                        params.secondPage === "print-advertising"
                          ? "/services/print-advertising/newspaper-ad-rates"
                          : "/contact.html"
                      }`}
                      target="_self"
                      rel="nofollow"
                    >
                      <span className="tp-btn__circle-text">
                        LET&#039;S TALK TODAY
                      </span>
                      <span className="tp-btn__circle-arrow">
                        <svg
                          width="26"
                          height="27"
                          viewBox="0 0 26 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 25.37L23.8469 2.52313M1 1H25.37V25.37"
                            stroke="black"
                            strokeLinecap="square"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
                {/* <div className="tp-service__thumb-box-1 d-none d-xl-block">
                  <div className="tp-service__thumb p-relative">
                    <img
                      decoding="async"
                      src={`/service-second-images/${image1}.jpg`}
                      alt=""
                    />
                    <div className="tp-service__thumb-shape-1">
                      <span>
                        <img
                          decoding="async"
                          src={`/service-second-images/${image2}.jpg`}
                          alt=""
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="tp-service__thumb-box-2 d-none d-xl-block">
                  <div className="tp-service__thumb p-relative">
                    <img
                      decoding="async"
                      src={`/service-second-images/${image2}.jpg`}
                      alt=""
                    />
                    <div className="tp-service__thumb-shape-2">
                      <span>
                        <img
                          decoding="async"
                          src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/shape-2.png"
                          alt=""
                        />
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceFirst;
