"use client";
import React from "react";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import AnimatedBtn from "../new-home/components/AnimatedBtn";

function SubHero() {
  return (
    <section className="min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[576px] w-full overflow-x-hidden relative flex justify-center items-center py-8 sm:py-10 md:py-12 lg:py-0">
      <Image
        src="/new-about/ab-s1.png"
        alt="About Us hero background"
        fill
        priority
        quality={60}
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Absolut Positioned Overlay Container  */}
      <div className="w-full h-full absolute inset-0 bg-gradient-to-l from-[#3D29097D] to-[#61360A] z-0"></div>

      {/* Centered Align Div  */}
      <div
        className="w-[96%]  md:w-[98%] lg:w-[90%] xl:w-[85%] flex flex-col lg:justify-between 
      gap-3 lg:gap-5
       z-5 px-4 sm:px-6 md:px-8 lg:px-0"
      >
        <h1
          style={{
            fontFamily: "InterRegular",
          }}
          className="font-[400] text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px] text-white"
        >
          About Us
        </h1>
        <h2
          style={{
            fontFamily: "InterSemiBold",
          }}
          className="font-[600] text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] text-white leading-tight lg:leading-normal"
        >
         Our Reputation is the success we deliver
        </h2>

        {/* Page Tracker  */}
        <div className="flex justify-between items-center w-[140px] sm:w-[150px] md:w-[155px] gap-1 sm:gap-2">
          <p
            style={{
              fontFamily: "InterMedium",
            }}
            className="font-[500] text-[14px] sm:text-[15px] md:text-[16px] text-white"
          >
            Home
          </p>
          {/* Right Arrow Icon  */}
          <MdKeyboardArrowRight className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] md:w-[24px] md:h-[24px] text-white flex-shrink-0" />
          <p
            style={{
              fontFamily: "InterMedium",
            }}
            className="font-[500] text-[14px] sm:text-[15px] md:text-[16px] text-[#E7B25E]"
          >
            About Us
          </p>
        </div>

        {/* Circle Div  */}
        <div className="lg:mt-8">
          {" "}
          <AnimatedBtn
            btnText="Click Me to know more"
            link="https://ritzmediaworld.com/contact.html"
            bg="bg-white"
            txt="text-black"
          ></AnimatedBtn>
        </div>
      </div>
    </section>
  );
}

export default SubHero;
