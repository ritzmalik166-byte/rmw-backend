"use client";
import Accordion from "@/components/Accordian";
import Image from "next/image";
import React, { memo } from "react";

interface ServiceItem {
  title: string;
  description: string;
  link: string;
}

interface ServiceProps {
  data: ServiceItem[];
}

const Service: React.FC<ServiceProps> = ({ data }) => {
  const containerStyle: React.CSSProperties = {
    backgroundColor: "#FFA122",
  };

  const rowStyle: React.CSSProperties = {
    backgroundColor: "#FFA122",
    paddingTop: "1rem",
  };

  const videoWrapperStyle: React.CSSProperties = {
    position: "relative",
    width: "60%",
    margin: "auto",
  };

  const videoStyle: React.CSSProperties = {
    position: "absolute",
    top: "0",
    left: "5px",
    width: "95%",
    zIndex: "-1",
    borderRadius: "50px",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <div className="tp-service__area fix tp-bg-class">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-services__title-box mb-45">
              <span
                className="tp-section-title-pre mb-30"
                style={{ borderRadius: "0px" }}
              >
                Services
              </span>
              <div className="tp-section-title-wrap d-md-flex align-items-center justify-content-between">
                <h2 className="tp-section-title">
                  What We Provide
                  <br />
                  <span>
                    <i
                      style={{ top: "-15px", fontSize: "22px" }}
                      className="tp-hero__subtitle mb-8"
                    >
                      is more than what you’ll ever need
                    </i>
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion Section */}
      <div style={containerStyle}>
        <div className="container">
          <div className="row align-items-center" style={rowStyle}>
            <div className="col-xl-6 gx-0">
              <Accordion data={data} />
            </div>

            {/* Image + Video Section */}
            <div className="col-xl-6">
              <div className="tp-services__thumb">
                <div style={videoWrapperStyle}>
                  <Image
                    src="/home-images/mobile-frame-img.png"
                    alt="mobile"
                    width={500}
                    height={800}
                    style={{ width: "100%", height: "auto" }}
                    priority
                  />
                  <video
                    src="/test-images/test-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    style={videoStyle}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Service);