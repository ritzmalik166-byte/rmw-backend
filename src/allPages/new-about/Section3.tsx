"use client";
import Image from "next/image";
import React from "react";

function Section3() {
  const d1 = [
    {
      img: "/new-about/branding.jpg",
      service: "Brand Identity",
      link: "https://ritzmediaworld.com/services/creative-services/branding-and-identity-development",
    },
    {
      img: "/new-about/content.jpg",
      service: "Content Marketing",
      link: "https://ritzmediaworld.com/services/contents-marketing",
    },
  ];
  const d2 = [
    {
      img: "/new-about/advertising_design.jpg",
      service: "Advertising Design",
      link: "https://ritzmediaworld.com/services/print-advertising/advertisement-designing",
    },
    {
      img: "/new-about/digital-marketing.jpg",
      service: "Digital Marketing",
      link: "https://ritzmediaworld.com/services/digital-marketing",
    },
  ];
  return (
    <section className="w-full min-h-screen flex justify-center items-center py-8 sm:py-10 md:py-12 lg:py-10 relative px-4 sm:px-6 md:px-8 lg:px-0">
      {/* Absolute Positioned Element  */}
      <div className="w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[700px] md:h-[700px] lg:w-[837px] lg:h-[837px] z-0 absolute top-0 right-0 rounded-full blur-[400px] sm:blur-[600px] md:blur-[700px] lg:blur-[800px] bg-[#FFECD9]"></div>

      {/* Centered Align Container  */}
      <div
        className="
      w-[95%] sm:w-[90%] md:w-[95%] xl:w-[80%] 
      flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 lg:gap-14 xl:gap-16 z-10"
      >
        {/* Left Side Cotnainer  */}
        <div className="flex flex-col sm:flex-row lg:flex-col lg:justify-start lg:items-start justify-center items-center gap-4 sm:gap-5 md:gap-6 w-full lg:w-auto">
          {d1.map((idx, i) => {
            return (
              <div
                className="w-full
                 sm:w-[90%]
                  md:w-[85%] lg:w-[450px]
                  xl:w-[489px]
                   h-[300px] sm:h-[400px] md:h-[480px] lg:h-[565px] relative overflow-hidden group cursor-pointer"
                key={i}
              >
                <Image
                  src={idx.img}
                  alt={idx.service}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 489px"
                  onClick={() => window.open(idx.link, "_blank")}
                  className="transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                <button
                  onClick={() => window.open(idx.link, "_blank")}
                  className="min-w-[100px] sm:min-w-[120px]  md:min-w-[137px] px-3 sm:px-4 h-[28px] sm:h-[32px] md:h-[34px] absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#ED8B24] liquid rounded-full cursor-pointer text-white font-[400] text-[12px] sm:text-[13px] md:text-[14px] z-10"
                  style={{
                    fontFamily: "InterRegular",
                  }}
                >
                 <h3> {idx.service}</h3>
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Side Container */}
        <div className="flex flex-col sm:flex-row lg:flex-col lg:justify-start lg:items-start justify-center items-center gap-6 sm:gap-8 md:gap-6 lg:gap-12 mt-0  lg:mt-20 w-full lg:w-auto">
          {d2.map((idx, i) => {
            return (
              <div
              onClick={() => window.open(idx.link, "_blank")}
                className="w-full sm:w-[90%] md:w-[85%] lg:w-[450px]
                  xl:w-[489px] h-[300px] sm:h-[400px] md:h-[480px] lg:h-[565px] relative overflow-hidden group cursor-pointer"
                key={i}
              >
                <Image
                  src={idx.img}
                  alt={idx.service}
                  fill
                  
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 489px"
                  className="transition-transform duration-700 ease-in-out group-hover:scale-110"
                  
                />
                <button
                  onClick={() => window.open(idx.link, "_blank")}
                  className="min-w-[100px] sm:min-w-[120px] md:min-w-[137px] px-3 sm:px-4 h-[28px] sm:h-[32px] md:h-[34px] absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#ED8B24] liquid rounded-full cursor-pointer text-white font-[400] text-[12px] sm:text-[13px] md:text-[14px] z-10"
                  style={{
                    fontFamily: "InterRegular",
                  }}
                >
                 <h3> {idx.service}</h3>
                </button>

                {/* Absolute Positioned Overlay Container  */}
                <div className="absolute inset-0 z-[0] w-full h-full bg-gradient-to-t from-[#00000099] to-[#66666600]"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Section3;