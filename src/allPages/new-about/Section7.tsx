"use client";
import Image from "next/image";
import React from "react";

function Section7() {
  return (
    <section className="w-full min-h-screen flex justify-center items-center py-8 xl:py-16 bg-[#FAFAFA]">
      {/* Centered Align Container  */}
      <div className="w-[90%] flex flex-col gap-8 xl:gap-12">
        {/* Centered Align Container  */}
        <div className="w-full flex flex-col justify-center items-center text-center gap-2 xl:gap-4">
          <h2 className="font-[600] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px]">
            Our Culture
          </h2>
          <p className="font-[400] text-[14px] sm:text-[15px] md:text-[16px] text-[#00000099] max-w-3xl md:px-4">
            In our culture, we nurture creativity, seek out innovation, encourage collaboration, cultivate happiness, and occasionally break into senseless laughter.
          </p>
        </div>

        {/* Gallery Section  */}
        <div className="w-full flex flex-col gap-4 md:gap-6 ">
          {/* This Is Row 1  */}
          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 ">
            {[
              "/new-about/s7/s7-r1-i1.png",
              "/new-about/s7/s7-r1-i2.png",
              "/varunimage/employeeimage.jpg",
            ].map((img, idx) => {
              return (
                <div
                  className="w-full sm:w-[calc(33.333%-0.67rem)] md:w-[calc(33.333%-1rem)] lg:w-[400px] h-[200px] sm:h-[250px] md:h-[280px] lg:h-[303px] relative overflow-hidden group cursor-pointer"
                  key={idx}
                >
                  <Image
                    src={img}
                    alt="RMW"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 400px"
                    className="transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                </div>
              );
            })}
          </div>

          {/* This Is Row 2  */}
          <div className="flex flex-col lg:flex-row justify-center gap-4 md:gap-6 ">
            {/* Left Side  */}
            <div className="flex w-full lg:w-[400px] flex-col gap-4 md:gap-6 ">
              {["/new-about/s7/s7-r2-i1.png", "/new-about/s7/s7-r2-i3.png"].map(
                (img, idx) => {
                  return (
                    <div
                      className={`w-full ${idx === 0
                        ? "h-[200px] sm:h-[250px] md:h-[280px] lg:h-[303px]"
                        : "h-[300px] sm:h-[350px] md:h-[400px] lg:h-[449px]"
                        } relative overflow-hidden group cursor-pointer`}
                      key={idx}
                    >
                      <Image
                        src={img}
                        alt="RMW"
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 1024px) 100vw, 400px"
                        className="transition-transform duration-700 ease-in-out group-hover:scale-110"
                      />
                    </div>
                  );
                }
              )}
            </div>

            {/* Right Side  */}
            <div className="w-full lg:w-[820px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[766px] relative overflow-hidden group cursor-pointer">
              <Image
                src={"/new-about/s7/s7-r2-i2.png"}
                alt="RMW"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1024px) 100vw, 820px"
                className="transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* Bottom Button Section  */}
        <div className="w-full flex justify-center items-center">
          <button onClick={() => window.open("https://ritzmediaworld.com/gallery", "_blank")} className="w-[155px] liquid h-[42px] font-[500] text-[18px] text-white rounded-[8px] bg-[#ED8B24] cursor-pointer">
            View More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Section7;
