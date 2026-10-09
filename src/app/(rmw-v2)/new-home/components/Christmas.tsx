"use client";
import React from "react";
import { Great_Vibes, Montserrat, Open_Sans } from "next/font/google";
import FlyingSanta from "./FlyingSanta";
import Snowfall from "./Snowfall";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: "800",
  subsets: ["latin"],
});
const montserratRegular = Montserrat({
    weight: "400",
    subsets: ["latin"],
  });

  const montserratSemiBold = Montserrat({
    weight: "600",
    subsets: ["latin"],
  });

const openSansBold = Open_Sans({
  weight: "700",
  subsets: ["latin"],
});

function Christmas() {
  return (
    <section className="relative w-full h-[75vh] md:min-h-screen bg-[url('/25dec/10.png')]
    lg:bg-[url('/25dec/banner1.png')] bg-no-repeat bg-cover bg-center flex justify-center md:items-center py-6 md:py-0">
      {/* Absolute Position Container  */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <img src="/25dec/7.png" alt="Christmas" className="w-full h-auto" />
      </div>

      {/* Center Align Container  */}
      <div className="flex flex-col gap-2 md:gap-2 text-center items-center z-10 px-4 md:px-0 mt-24 md:mt-0">
        <h2 className={`${greatVibes.className} font-[400] text-[50px] md:text-[120px] text-white leading-tight md:leading-normal`}>Merry Christmas</h2>

        <div className="flex items-center gap-1 md:gap-2 flex-col md:flex-row">
          <img src="/25dec/8.png" alt="" className="hidden md:block" />
          <div className="flex flex-col gap-1 md:gap-2 text-center">
            <h3 className={` ${montserratRegular.className} text-[25px] md:text-[31px] text-white uppercase leading-tight md:leading-normal`}>
              <b className={`font-[800] ${montserrat.className}`}>Beyond</b> your typical <br />
              Advertising agency
            </h3>
            <p className={` ${montserratSemiBold.className} text-[14px] md:text-[18px] text-white`}>
              Award-Winning Agency Since 2008{" "}
            </p>
          </div>
          <img src="/25dec/9.png" alt="" className="hidden md:block" />
        </div>

        <div className=" flex flex-col mt-6 md:mt-0 md:flex-row gap-3 md:gap-6 w-full md:w-auto items-center md:items-center">
          <button onClick={()=>window.open("https://ritzmediaworld.com/contact.html", "_blank")} className={`${openSansBold.className} w-full max-w-[280px] md:max-w-none md:w-[199px] h-[48px] md:h-[54px] bg-[#C99237] cursor-pointer text-white font-[700] text-[13px] md:text-[15px] rounded-[5px] transition-all duration-300 hover:bg-[#B0802A] hover:scale-105 hover:shadow-lg whitespace-nowrap flex items-center justify-center`}>
            Free Consultation
          </button>

          <button onClick={()=>window.open("https://ritzmediaworld.com/web-stories", "_blank")} className=" max-w-[280px] h-[48px] md:h-[54px] text-[13px] md:text-[15px] font-[700] cursor-pointer flex justify-center gap-3 md:gap-4 items-center transition-all duration-300 hover:scale-105 group">
            <div className="flex cursor-pointer w-[48px] h-[48px] md:w-[54px] md:h-[54px] rounded-full justify-center items-center bg-[#FFFFFF] transition-all duration-300 group-hover:bg-[#C99237] group-hover:scale-110 shrink-0">
              <svg
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 4.46558C9.66667 4.85048 9.66667 5.81273 9 6.19763L1.5 10.5278C0.833332 10.9127 -5.28905e-07 10.4315 -4.95256e-07 9.66173L-1.16704e-07 1.00148C-8.30548e-08 0.231676 0.833333 -0.249449 1.5 0.135451L9 4.46558Z"
                  fill="black"
                  className="transition-all duration-300 group-hover:!fill-white"
                />
              </svg>
            </div>
            <p className={`${openSansBold.className} text-[13px] md:text-[15px] font-[700] text-white transition-all duration-300 group-hover:text-[#C99237] whitespace-nowrap`}>Watch Our Story</p>
          </button>
        </div>
      </div>
      <Snowfall />
      {/* <FlyingSanta /> */}
    </section>
  );
}
export default Christmas;
