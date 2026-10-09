"use client";
import Image from "next/image";
import React from "react";
import { GoSmiley } from "react-icons/go";
import { FiAward } from "react-icons/fi";
import { FiBriefcase } from "react-icons/fi";

function Section8() {
  const statsData = [
    {
      boldText: "350+",
      restText: " very satisfied clients around the worldwide.",
      icn: <GoSmiley className="w-[34px] h-[34px]" />,
    },
    {
      boldText: "200+",
      restText: " good award winning digital media agency.",
      icn: <FiAward className="w-[34px] h-[34px]" />,
    },
    {
      boldText: "300+",
      restText: " successfully project completed in one year.",
      icn: <FiBriefcase className="w-[34px] h-[34px]" />,
    },
  ];

  return (
    <section className="w-full min-h-screen flex justify-center items-center md:py-8 lg:py-4 xl:py-16">
      {/* Centered Align Container  */}
      <div className="w-[90%] flex flex-col justify-center items-center gap-8 md:gap-12 lg:gap-6 xl:gap-16">
        {/* Top Row 1  */}
        <div className="flex flex-col justify-center items-center gap-2 md:gap-6 lg:gap-2 text-center md:px-4">
          <h2 className="font-[600] text-[28px] sm:text-[32px] md:text-[36px]">
            Why Choose Us
          </h2>
          <p className="font-[400] text-[18px] sm:text-[20px] md:text-[22px] text-[#00000099]">
            17+ Years Of Storytelling Turning Brands into Household Names
          </p>
          <p className="font-[400] text-[14px] sm:text-[15px] md:text-[16px] text-[#00000099] text-center max-w-4xl">
            We've held hands with budding brands that have shattered ceilings of
            convention. With us behind them, they have achieved great feats in
            their industry and went on to dominate their competition.
          </p>
        </div>

        {/* Main Image Container  */}
        <div className="w-full max-w-[1030px] h-[300px] sm:h-[400px] md:h-[480px] lg:h-[533px] relative">
          <Image
            src="/new-about/s8/ab-s8-i1.png"
            alt="RMW"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1030px"
          />

          {/* Absolute Positioned Glass Div  */}
          <div
            className="glassDiv w-[280px] sm:w-[320px] md:w-[352px] h-[140px] sm:h-[160px] md:h-[194px] flex justify-center items-center text-center glassCard z-10 p-4"
            style={{ position: "absolute", bottom: "10px", right: "10px" }}
          >
            <p className="font-[600] text-[16px] sm:text-[20px] md:text-[24px] text-white">
              Years of Storytelling, Turning Ideas Into Stories That Matter
            </p>
          </div>
        </div>

        {/* Bottom Container  */}
        <div className="w-full flex flex-col md:flex-row justify-center md:justify-between lg:justify-center items-center gap-6 md:gap-4 lg:gap-8">
          {statsData.map((ob, idx) => {
            return (
              <div
                key={idx}
                className="w-full md:w-[calc(33.333%-1rem)] lg:w-[343px] min-h-[77px] border-t-2 border-t-[#D9D9D9] flex justify-between items-center gap-4 pt-4"
              >
                <p className="font-[600] text-[16px] sm:text-[17px] md:text-[18px] text-[#00000099]">
                  <span className="text-[#0F1640] font-bold">{ob.boldText}</span>
                  {ob.restText}
                </p>
                <div className="flex-shrink-0">{ob.icn}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Section8;