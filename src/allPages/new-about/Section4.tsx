"use client";
import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
  import { useRouter } from "next/navigation";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Section4() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const topHeaderRef = useRef<HTMLDivElement | null>(null);
  const centeredContainerRef = useRef<HTMLDivElement | null>(null);
  const leftTextRef = useRef<HTMLParagraphElement | null>(null);
  const statCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);



const router = useRouter();



  const d1 = [
    {
      cnt: 350,
      icn: "+",
      ttl: "Satisfied Clients",
      para: "Brands we've helped grow and succeed",
      link: "/#testimonials",
      lft: "left-12 md:left-16"
    },
    {
      cnt: 40,
      icn: "+",
      ttl: "Service Categories",
      para: "Designed to suit your growth needs at every stage.",
      link: "/#testimonials",
      lft: "left-8 md:left-10"
    },
  ];
  const d2 = [
    {
      cnt: 35,
      icn: "+",
      ttl: "Awards",
      para: "Passion, Obsession, and Persistence always pay off.",
      link: "/#testimonials",
      lft: "left-8 md:left-10"
    },
    {
      cnt: 17,
      icn: "+",
      ttl: "Glorious Years",
      para: "grueling hours that have led to remarkable branding success.",
      link: "/#testimonials",
      lft: "left-7 md:left-8"
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Responsive match media
    const mm = gsap.matchMedia();

    // Animate top header container
    if (topHeaderRef.current) {
      const headerChildren = topHeaderRef.current.querySelectorAll("h2, p");
      gsap.from(headerChildren, {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: topHeaderRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }

    // Animate centered container elements
    if (centeredContainerRef.current) {
      const centeredChildren = centeredContainerRef.current.children;
      gsap.from(centeredChildren, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: centeredContainerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    // Animate left side text
    if (leftTextRef.current) {
      gsap.from(leftTextRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: leftTextRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }

    // Animate stat cards with responsive settings
    mm.add("(min-width: 640px)", () => {
      // Desktop/Tablet: Stagger animation
      statCardRefs.current.forEach((card, idx) => {
        if (!card) return;
        gsap.from(card, {
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          delay: idx * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    mm.add("(max-width: 639px)", () => {
      // Mobile: Simpler animation
      statCardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    // Animate image container
    if (imageContainerRef.current) {
      mm.add("(min-width: 1024px)", () => {
        // Desktop: Slide from right
        gsap.from(imageContainerRef.current, {
          x: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });

      mm.add("(max-width: 1023px)", () => {
        // Mobile/Tablet: Fade and slide up
        gsap.from(imageContainerRef.current, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }

    return () => {
      mm.revert();
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full flex flex-col items-center gap-4 md:gap-5 lg:gap-8 pb-8 sm:pb-10 px-4 sm:px-6 md:px-0">
      {/* Top Header Container  */}
      <div ref={topHeaderRef} className="w-[100%] min-h-[180px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[234px] bg-[#E7EEFA] flex justify-center items-center py-8 sm:py-10 md:py-12 px-4 sm:px-6">
        {/* Centered Align Text Container  */}
        <div className=" lg:max-w-4xl text-center px-4">
          <h2
            style={{
              fontFamily: "InterSemiBold",
            }}
            className="font-[600] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] uppercase"
          >
            Our Vision
          </h2>
          <p
            style={{
              fontFamily: "InterRegular",
            }}
            className="font-[400] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-[#00000099] capitalize mt-2 sm:mt-3"
          >
            Building a tapestry of visuals that inspire intent. Seeking innovation before it occurs, and delivering measurable success.

          </p>
        </div>
      </div>

      {/* Centered Align Container  */}
      <div ref={centeredContainerRef} className="md:w-[90%] flex flex-col justify-between items-center gap-3 sm:gap-4 px-0">
        <p
          style={{
            fontFamily: "InterRegular",
          }}
          className="w-[120px] sm:w-[130px] h-[30px] sm:h-[34px] rounded-full bg-[#F6F6F6] flex justify-center items-center font-[400] text-[12px] sm:text-[13px] md:text-[14px] text-[#4A5565]"
        >
          Proven Results
        </p>

        <h2
          style={{
            fontFamily: "InterSemiBold",
          }}
          className="font-[600] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] text-center"
        >
          Our Work is Our <span className="text-[#F79024]">Reward</span>
        </h2>

        <p
          style={{
            fontFamily: "InterRegular",
          }}
          className="font-[400] text-[14px] sm:text-[15px] md:text-[16px] md:max-w-4xl text-center text-[#00000099] px-4"
        >
          We take pride in challenges that agencies tend to avoid. It is what drives us to do things never done before. That is what brings us our recognition and some awards along the way.
        </p>
      </div>
      
      <div className="w-[90%] flex flex-col lg:flex-row justify-between items-center gap-8 sm:gap-10 md:gap-12 xl:gap-0">
        {/* Left Side Container  */}
        <div className="w-full md:w-[95%] lg:w-[60%] xl:w-[639px] flex flex-col gap-6 sm:gap-8 md:gap-10">
          {/* Text Content  */}
          <p
            ref={leftTextRef}
            style={{
              fontFamily: "InterRegular",
            }}
            className="font-[400] text-[14px] sm:text-[15px] md:text-[16px] text-[#00000099] text-center lg:text-start"
          >
            Our Mad Men are obsessed with building stories. Like a moth to a flame, they're just obsessed with any branding problem that may need a solution. Our Mad Men are obsessed with building stories. Like a moth.
          </p>

          <div className="w-full relative flex flex-col sm:flex-row  justify-center xl:justify-between gap-4 lg:gap-8">
            {/* Left Side Sub Container  */}
            <div className="flex flex-col w-full sm:w-[48%] lg:w-[250px] xl:w-[307px] gap-4">
              {d1.map((val, idx) => {
                return (
                  <div
                    key={idx}
                   
                    ref={(el) => {
                      statCardRefs.current[idx] = el;
                    }}
                    className="w-full h-[140px] sm:h-[150px] md:h-[155px] capitalize shadow-[0_4px_16px_0_rgba(0,0,0,0.1)] relative flex justify-center items-center overflow-hidden abs3"
                  >
                    {/* Centered Align Container  */}
                    <div className="w-[90%] z-10">
                      <div className="relative">
                        <p
                          style={{
                            fontFamily: "InterSemiBold",
                          }}
                          className="font-[600] text-[28px] sm:text-[32px] md:text-[36px]"
                        >
                          {val.cnt}
                        </p>
                        <p
                          style={{
                            fontFamily: "InterSemiBold",
                          }}
                          className={`font-[500] text-[28px] sm:text-[32px] md:text-[36px] absolute -top-3 sm:-top-4 ${val.lft}`}
                        >
                          {val.icn}
                        </p>
                        <p
                          style={{
                            fontFamily: "InterRegular",
                          }}
                          className="font-[400] text-[14px] sm:text-[16px] md:text-[18px] text-[rgba(0, 0, 0, 1)]"
                        >
                          {val.ttl}
                        </p>
                      </div>
                      <p
                        style={{
                          fontFamily: "InterRegular",
                        }}
                        className="font-[400] text-[12px] sm:text-[14px] md:text-[16px] text-[#00000099] mt-1"
                      >
                        {val.para}
                      </p>
                    </div>

                    {/* Absolute Positioned Animated Elips  */}
                    <div className="absolute -top-5 -left-6 w-[60px] sm:w-[65px] md:w-[70px] h-[60px] sm:h-[65px] md:h-[70px] bg-[#ED8B24] rounded-full z-0 abs3Abs"></div>
                  </div>
                );
              })}
            </div>

            {/* Right Side Sub Container  */}
            <div className="flex flex-col w-full sm:w-[48%]  lg:w-[250px] xl:w-[307px] gap-4 mt-0 sm:mt-6">
              {d2.map((val, idx) => {
                return (
                  <div
                    key={idx}
                   
                    ref={(el) => {
                      statCardRefs.current[d1.length + idx] = el;
                    }}
                    className="w-full h-[140px] sm:h-[150px] md:h-[155px] capitalize shadow-[0_4px_16px_0_rgba(0,0,0,0.1)] relative flex justify-center items-center overflow-hidden abs3"
                  >
                    {/* Centered Align Container  */}
                    <div className="w-[90%] z-10">
                      <div className="relative">
                        <p
                          style={{
                            fontFamily: "InterSemiBold",
                          }}
                          className="font-[600] text-[28px] sm:text-[32px] md:text-[36px]"
                        >
                          {val.cnt}
                        </p>
                        <p
                          style={{
                            fontFamily: "InterSemiBold",
                          }}
                          className={`font-[500] text-[28px] sm:text-[32px] md:text-[36px] absolute -top-3 sm:-top-4 ${val.lft}`}
                        >
                          {val.icn}
                        </p>
                        <p
                          style={{
                            fontFamily: "InterRegular",
                          }}
                          className="font-[400] text-[14px] sm:text-[16px] md:text-[18px] text-[rgba(0, 0, 0, 1)]"
                        >
                          {val.ttl}
                        </p>
                      </div>
                      <p
                        style={{
                          fontFamily: "InterRegular",
                        }}
                        className="font-[400] text-[12px] sm:text-[14px] md:text-[16px] text-[#00000099] mt-1"
                      >
                        {val.para}
                      </p>
                    </div>

                    {/* Absolute Positioned Animated Elips  */}
                    <div className="absolute -top-5 -left-6 w-[60px] sm:w-[65px] md:w-[70px] h-[60px] sm:h-[65px] md:h-[70px] bg-[#ED8B24] rounded-full z-0 abs3Abs"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div> 
       
        {/* Right Side Container  */}
        <div
          ref={imageContainerRef}
          className="w-full 
          h-[345px]
          md:w-[60%] lg:w-[380px]
          xl:w-[545px]
          sm:h-[500px] imgCont md:h-[450px] lg:h-[450px] xl:h-[652px] relative mt-4 sm:mt-6 lg:mt-0"
        >
          <Image
            src={"/new-about/aw1.png"}
            fill
            alt="RMW"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 545px"
          ></Image>
        </div>
      </div>
    </section>
  );
}

export default Section4;