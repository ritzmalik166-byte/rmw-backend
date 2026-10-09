"use client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import Script from "next/script";
import { LuArrowUpRight } from "react-icons/lu";
import AnimatedBtn from "@/app/(rmw-v2)/new-home/components/AnimatedBtn";

declare global {
  interface Window {
    confetti: (options: {
      particleCount?: number;
      spread?: number;
      origin?: { y?: number; x?: number };
    }) => void;
  }
}

function Section2() {
  const circleRef = useRef<HTMLDivElement>(null);
  const confettiLoaded = useRef(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.confetti === "function"
    ) {
      confettiLoaded.current = true;
    }
  }, []);

  const handleHover = () => {
    if (
      typeof window !== "undefined" &&
      typeof window.confetti === "function"
    ) {
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Button animation (scale effect)
      if (circleRef.current) {
        circleRef.current.style.transform = "scale(0.95)";
        setTimeout(() => {
          if (circleRef.current) {
            circleRef.current.style.transform = "scale(1)";
          }
        }, 100);
      }
    }
  };

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          confettiLoaded.current = true;
        }}
      />

      <section className="w-full lg:overflow-x-hidden h-auto lg:min-h-screen flex items-center relative px-4 sm:px-6 md:px-8 lg:px-10 lg:pt-10 pt-10 lg:py-0 ">
        <div
          className="w-full xl:w-[95%] 
           xl:p-0
            min-h-[400px]
        gap-6 sm:gap-4 xl:gap-10 relative flex flex-col items-center  xl:items-end z-10"
        >
          <div className="w-[280px] h-[260px] sm:w-[380px] sm:h-[350px] md:w-[450px] md:h-[415px] lg:w-[535px] lg:h-[494px] absolute inset-0 opacity-50 sm:opacity-70 md:opacity-90 lg:opacity-100 hidden xl:block">
            <Image
              src="/new-about/s2/ab-s2-i1.png"
              alt="RMW"
              fill
              quality={65}
              sizes="535px"
              className="object-contain"
            />
          </div>
          <div className="w-full sm:w-[90%] md:w-[95%] lg:w-[826px] z-10">
            <p
              style={{
                fontFamily: "InterMedium",
              }}
              className="font-[500] text-[20px] sm:text-[24px] md:text-[26px] lg:text-[36px] leading-tight sm:leading-normal xl:text-start text-center"
            >
              We believe in staying ahead, with <span className="text-[#F79024]">CREATIVE STORYTELLING</span> and <span className="text-[#F79024]">LEVERAGING A.I.</span> to deliver <span className="text-[#F79024]">STUNNING VISUALS</span> in <span className="text-[#F79024]">RECORD TIME</span>.
            </p>
          </div>
          <div
            className="w-full
           sm:w-[95%]
            md:w-[90%] xl:w-[900px]
             xl:w-[1079px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[582px] relative z-10"
          >
            <Image
             src={"/gallery/New Team Image (18-Nov-2025).jpg"}
              alt="RMW"
              fill
              quality={68}
              style={{ objectFit: "cover" }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1536px) 1079px, 1200px"
            />

            <div
              ref={circleRef}
              className="w-[150px] h-[150px] scale-100 hover:scale-90  md:w-[200px] md:h-[200px] lg:w-[270px] lg:h-[270px] bg-[#F3830E] rounded-full hidden xl:flex justify-center items-center 
              
              absolute -bottom-[15px] -left-[15px] 
              sm:-bottom-[20px] sm:-left-[20px] 
              md:-bottom-[25px] md:-left-[25px]

               lg:-bottom-30 lg:-left-30 
               cursor-pointer transition-transform duration-100 z-20
               absDeks
               
               "
              onMouseEnter={handleHover}
            >
              <div className="flex flex-col justify-center items-center text-center w-[90px] sm:w-[110px] md:w-[135px] lg:w-[162px] h-[90px] sm:h-[110px] md:h-[135px] lg:h-[162px]">
                <div className="relative mb-[-12px] sm:mb-[-16px] md:mb-[-20px] lg:mb-[-26px]">
                  <p
                    style={{
                      fontFamily: "InterBold",
                    }}
                    className="font-[700] text-[48px] sm:text-[60px] md:text-[75px] lg:text-[96px] text-[#FFFFFF]"
                  >
                    17
                  </p>
                  <p className="font-[400] text-[24px] sm:text-[30px] md:text-[38px] lg:text-[46px] text-[#FFFFFF] absolute -top-1 -right-3 sm:-right-4 md:-right-5 lg:-right-7">
                    +
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: "InterMedium",
                  }}
                  className="font-[500] text-[10px] sm:text-[12px] md:text-[15px] lg:text-[18px] text-[#FFFFFF] px-2"
                >
                  Years working experience
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Paragraph Container  */}
          <div className="w-full sm:w-[95%] md:w-[90%] xl:w-[900px] flex flex-col gap-3 z-10">
            <p
              style={{
                fontFamily: "InterRegular",
              }}
              className="font-[400] text-[14px] sm:text-[15px] md:text-[16px] xl:text-start text-center text-[#00000099]"
            >
              For the better part of the last two decades, RITZ MEDIA WORLD has been building narratives that market momentum
. It doesn’t just influence behaviors but develop lasting habits.
            </p>
            <p
              style={{
                fontFamily: "InterRegular",
              }}
              className="font-[400] text-[14px] sm:text-[15px] md:text-[16px] xl:text-start text-center text-[#00000099]"
            >
              {/* We pride ourselves on going out of our way to understand the consumer mindset across all demographics. This enables us to build campaigns that don't just speak at them, but we build campaigns
              that speak to them. */}
              We pride ourselves on going out of our way to understand the consumer mindset across all demographics.This enables us to build campaigns that don’t just speak at audiences, but speak to them.
            </p>
            {/* Circle Div  */}
            <div className="mt-2 sm:mt-4 md:mt-6 flex lg:justify-start md:items-start justify-center items-center">
              <AnimatedBtn
                btnText="Click Me to know more"
                  link="https://ritzmediaworld.com/contact.html"
                txt="text-white"
              />
            </div>
          </div>
        </div>

        <div className="w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[700px] md:h-[700px] lg:w-[837px] lg:h-[837px] z-0 absolute bottom-0 right-0 rounded-full blur-[400px] sm:blur-[600px] md:blur-[700px] lg:blur-[800px] bg-[#FFECD9]"></div>


        <div
          ref={circleRef}
          className="w-[100px] h-[100px] 
               md:w-[180px] md:h-[180px] 
              
               lg:w-[200px] lg:h-[200px]

                bg-[#F3830E] rounded-full xl:hidden 
                flex justify-center items-center
             
                absolute lg:bottom-56 right-0
                md:bottom-64
                bottom-72
                
                 cursor-pointer transition-transform duration-100 z-20 crclAbs"
          onMouseEnter={handleHover}
        >
          {/* Centered Align Div  */}
          <div className="flex flex-col justify-center items-center text-center w-[90px] sm:w-[110px] md:w-[135px] lg:w-[162px] h-[90px] sm:h-[110px] md:h-[135px] lg:h-[162px]">
            <div className="relative mb-[-12px] sm:mb-[-16px] md:mb-[-20px] lg:mb-[-26px]">
              <p
                style={{
                  fontFamily: "InterBold",
                }}
                className="font-[700] text-[36px] md:text-[75px] lg:text-[76px] text-[#FFFFFF]"
              >
                17
              </p>
              <p className="font-[400] text-[24px] sm:text-[30px] md:text-[38px] lg:text-[46px] text-[#FFFFFF] absolute -top-1 -right-3 sm:-right-4 md:-right-5 lg:-right-7">
                +
              </p>
            </div>
            <p
              style={{
                fontFamily: "InterMedium",
              }}
              className="font-[500] text-[10px] sm:text-[12px] md:text-[15px] lg:text-[18px] text-[#FFFFFF] px-2"
            >
              Years working experience
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Section2;