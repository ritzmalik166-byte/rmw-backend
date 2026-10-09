"use client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import HoverCard from "../components/HoverCard";
import AnimatedBtn from "../components/AnimatedBtn";

function NewS2() {
  // Static images - no longer changing on hover
  const mainImg = "/new-page/s2/rm-s2-i1.jpg";
  const subImg = "/new-page/s2/rm-s2.jpg";
  const mainImgRef = useRef<HTMLDivElement | null>(null);
  const subImgRef = useRef<HTMLDivElement | null>(null);
  const mainImgElementRef = useRef<HTMLImageElement | null>(null);
  const subImgElementRef = useRef<HTMLImageElement | null>(null);


  // Set up initial refs for images on mount
  useEffect(() => {
    if (mainImgRef.current) {
      const imgElement = mainImgRef.current.querySelector("img") as HTMLImageElement;
      if (imgElement) {
        mainImgElementRef.current = imgElement;
      }
    }
  }, []);

  useEffect(() => {
    if (subImgRef.current) {
      const imgElement = subImgRef.current.querySelector("img") as HTMLImageElement;
      if (imgElement) {
        subImgElementRef.current = imgElement;
      }
    }
  }, []);


  return (
    <section className="w-full overflow-x-hidden relative flex flex-col gap-8 sm:gap-8 md:gap-0  items-center min-h-[60vh] py-8 sm:py-10 md:py-20 px-4 sm:px-6 max-w-full">
      {/* Center Align Text Divs */}
      <div className="flex flex-col justify-center gap-4 sm:gap-5 md:gap-6 items-center w-full md:w-[85%] lg:w-[65%] z-10">
        <div className="text-center">
          <h3 className="font-[500] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-tight sm:leading-snug">
            What can you expect from the
            It’s a potent question with a surprisingly simple answer. You can expect a dose of obsession with creative storytelling with a strong hint of consistency.
            {" "}
            <span className="text-[#F79024]">
              Best advertising agency in NOIDA?
            </span>
            That’s what
            <span className="text-[#F79024]">  Ritz Media World</span> is all about.
          </h3>
        </div>
        <AnimatedBtn btnText="Click Me to know more" link=" https://ritzmediaworld.com/services" txt="text-white"></AnimatedBtn>
      </div>

      {/* Center Align Main Div  */}
      <div className="w-full max-w-[1171px] flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 lg:gap-0 z-10">
        {/* Left Side Div  */}
        <div className="w-full lg:w-[820px] flex flex-col justify-between gap-4 sm:gap-5">
          {/* Top Div  */}
          <div className="w-full h-[60px] sm:h-[80px] lg:h-[100px]"></div>

          {/* Bottom Div  */}
          <div
            ref={mainImgRef}
            className="w-full h-[250px] sm:h-[320px] md:h-[380px] overflow-hidden lg:h-[442px] relative group cursor-pointer"
            onMouseEnter={() => {
              if (mainImgElementRef.current) {
                gsap.to(mainImgElementRef.current, {
                  scale: 1.08,
                  duration: 0.6,
                  ease: "power2.out",
                });
              }
            }}
            onMouseLeave={() => {
              if (mainImgElementRef.current) {
                gsap.to(mainImgElementRef.current, {
                  scale: 1,
                  duration: 0.6,
                  ease: "power2.out",
                });
              }
            }}
          >
            <Image
              src={'/new-page/s2/new-s2-img2.png'}
              onClick={() => window.open("https://ritzmediaworld.com/services/creative-services/branding-and-identity-development", "_blank")}
              alt="RMW"
              fill
              className="object-cover transition-transform duration-300 ease-out"
              style={{ 
                willChange: "opacity, transform, filter"
              }}
              priority
              onLoad={() => {
                // Update ref when image loads
                if (mainImgRef.current) {
                  const imgElement = mainImgRef.current.querySelector("img") as HTMLImageElement;
                  if (imgElement) {
                    mainImgElementRef.current = imgElement;
                  }
                }
              }}
            ></Image>
          </div>
        </div>

        {/* Right Side Div */}
        <div className="w-full lg:w-[309px] flex flex-col justify-between gap-4 sm:gap-5">
          {/* Top Section Image Div  */}
          <div
            ref={subImgRef}
            className="w-full h-[200px] sm:h-[250px] md:h-[280px] overflow-hidden lg:h-[311px] relative group cursor-pointer"
            onMouseEnter={() => {
              if (subImgElementRef.current) {
                gsap.to(subImgElementRef.current, {
                  scale: 1.08,
                  duration: 0.6,
                  ease: "power2.out",
                });
              }
            }}
            onMouseLeave={() => {
              if (subImgElementRef.current) {
                gsap.to(subImgElementRef.current, {
                  scale: 1,
                  duration: 0.6,
                  ease: "power2.out",
                });
              }
            }}
          >
            <Image
              src={'/new-page/s2/new-s2-img.png'}
              onClick={() => window.open("https://ritzmediaworld.com/services", "_blank")}
              alt="RMW"
              fill
              className="object-cover transition-transform duration-300 ease-out"
              style={{ 
                willChange: "opacity, transform, filter"
              }}
              priority
              onLoad={() => {
                // Update ref when image loads
                if (subImgRef.current) {
                  const imgElement = subImgRef.current.querySelector("img") as HTMLImageElement;
                  if (imgElement) {
                    subImgElementRef.current = imgElement;
                  }
                }
              }}
            ></Image>
          </div>

          {/* Bottom Section Card  */}
          <HoverCard
            width="w-full  lg:w-[309px]"
            height="h-[120px] sm:h-[140px] lg:h-[154px]"
            title="1B+"
            para="Words Written"
            id={"not-hover"}
            img={"/new-page/s2/rm-s2-i4.jpg"}
            imgID={4}
          ></HoverCard>
        </div>
      </div>

      {/* Center Align Bottom Div  */}
      <div className="w-full z-10 max-w-[1078px] flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 lg:gap-0 sm:h-auto lg:h-[220px] mt-6 sm:mt-8 lg:mt-10">
        {[
          {
            ttl: "1M+",
            para: "Creatives Published",
            id: "",
            img: "/new-page/s2/rm-s2-i1.jpg",
            imgID: 1,
          },
          {
            ttl: "1K+",
            para: "Campaigns Executed",
            id: "btm",
            img: "/new-page/s2/rm-s2.jpg",
            imgID: 2,
          },
          {
            ttl: "500+",
            para: "Success Stories",
            id: "",
            img: "/new-page/s2/rm-s2-i3.jpg",
            imgID: 3,
          },
        ].map((ob, idx) => {
          return (
            <HoverCard
              width="w-full  sm:w-[calc(33.333%-16px)] lg:w-[309px]"
              height="h-[120px] sm:h-[140px] lg:h-[154px]"
              title={ob.ttl}
              para={ob.para}
              id={ob.id}
              key={idx}
              img={ob.img}
              imgID={ob.imgID}
            />
          );
        })}
      </div>



      {/* Absolute Position Left Elps  */}
        <div className="absolute top-0 left-0 w-[837px] h-[837px] z-0 overflow-hidden max-w-full pointer-events-none">
          <img src="/new-page/rm-el1.png" className="w-full h-full object-cover max-w-full" alt="RMW" />
        </div>

         {/* Absolute Position Right Elps  */}
         <div className="absolute bottom-0 right-0 w-[837px] h-[837px] z-0 overflow-hidden max-w-full pointer-events-none">
          <img src="/new-page/rm-el2.png" className="w-full h-full object-cover max-w-full" alt="RMW" />
        </div>
    </section>
  );
}

export default NewS2;

