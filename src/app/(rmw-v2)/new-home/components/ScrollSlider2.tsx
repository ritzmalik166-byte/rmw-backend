"use client";

import { MoveRight, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BsStars } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

export interface CardData {
  id: number;
  title: string;
  description: string;
  imgSrc: string;
}

interface ScrollSliderProps {
  cards: CardData[];
  sectionRef: React.RefObject<HTMLElement | null>;
}

function ScrollSlider2({ cards, sectionRef }: ScrollSliderProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    
    return () => {
      window.removeEventListener("resize", checkDesktop);
    };
  }, []);

  useEffect(() => {
    if (!trackRef.current || !sliderRef.current || !sectionRef.current || cards.length === 0) return;

    gsap.set(trackRef.current, { x: 0 });

    if (trackRef.current) {
      trackRef.current.style.paddingRight = isDesktop ? "calc(100vw - 2rem)" : "1rem";
    }

    const ctx = gsap.context(() => {
      const updateScrollDistance = () => {
        const track = trackRef.current;
        const slider = sliderRef.current;
        if (!track || !slider) return 0;

        const trackWidth = track.scrollWidth;
        const viewportWidth = slider.clientWidth;
        const scrollDistance = trackWidth - viewportWidth;
        return Math.max(0, scrollDistance);
      };

      const scrollDistance = updateScrollDistance();
      const isMobile = window.innerWidth < 1024;

      if (scrollDistance && scrollDistance > 0) {
        gsap.to(trackRef.current, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isMobile ? "top top" : "top -16%",
            end: () => {
              const track = trackRef.current;
              const slider = sliderRef.current;
              if (!track || !slider) return "+=0";
              
              const trackWidth = track.scrollWidth;
              const viewportWidth = slider.clientWidth;
              const actualDistance = trackWidth - viewportWidth;
              
           
              const isMobileScreen = window.innerWidth < 1024;
              
              if (isMobileScreen) {
            
                return `+=${Math.max(actualDistance, 100)}`;
              } else {
                // On desktop, use more space for smoother transition
                return `+=${actualDistance + viewportWidth * 0.5}`;
              }
            },
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            markers: false, // Set to true for debugging
          },
        });
      }
    }, sectionRef);

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
      if (trackRef.current) {
        trackRef.current.style.paddingRight = window.innerWidth >= 1024 ? "calc(100vw - 2rem)" : "1rem";
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [cards.length, sectionRef, isDesktop]);

  return (
    <div ref={sliderRef} className="w-full overflow-x-hidden">
      <div
        ref={trackRef}
        className="flex gap-2 sm:gap-3 lg:gap-12"
        style={{ 
          willChange: "transform"
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative
             flex flex-shrink-0 flex-col  rounded-[12px] sm:rounded-[16px] md:rounded-[20px] transition-transform duration-300 hover:-translate-y-2
             w-[calc(100vw-2rem)] sm:w-[calc(100vw-3rem)] 
             md:w-[calc(50vw-2rem)] 
             lg:w-[480px] min-h-[280px] 
             sm:min-h-[350px] md:min-h-[400px] lg:min-h-[500px] h-auto lg:min-h-[582px] flex flex-col justify-between items-center py-4 sm:py-6 md:py-8"
          >
            <div className="w-full text-center flex justify-center items-center px-2 sm:px-4">
              <p className="text-[#FFFFFF] text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-[400] leading-tight sm:leading-relaxed lg:max-w-[400px]">
              {card.title}
              </p>
            </div>
            <div className="w-full h-[180px] sm:h-[240px] md:h-[300px] lg:h-[380px] relative flex items-center justify-center">
              <Image
                src={card.imgSrc}
                alt={card.title}
                fill
                style={{ objectFit: "contain", zIndex: 50 }}
                sizes="(min-width: 1024px) 680px, (min-width: 768px) 50vw, 100vw"
                priority
                className="px-2 sm:px-4"
              />

              {/* Absolute Positioned Btn  */}
              <button className="w-[90px] sm:w-[110px] md:w-[123px] h-[28px] sm:h-[32px] md:h-[35px] bg-[#F59612] rounded-[6px] text-white text-[11px] sm:text-[12px] md:text-[14px] font-[400] flex items-center justify-center gap-1 rotate-[16deg] absolute cursor-pointer 
              top-[-4px] sm:top-[-6px] right-[40px] 
              sm:right-[50px] md:right-[60px] lg:right-[-20px] 
              z-[999]">
                <BsStars className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                Excellence
              </button>
            </div>
        
            {/* Absolute Position Div  */}
            <div className="absolute bottom-0 lg:bottom-auto left-0 sm:left-4 md:left-20 lg:left-[-10px] lg:top-[155px] h-[200px] sm:h-[280px] md:h-[350px] lg:h-[410px] w-auto z-0 opacity-60 sm:opacity-70 md:opacity-80 lg:opacity-100">
              <img className="h-full w-full object-contain" src="/new-page/rct.png" alt="Decoration" />
            </div> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScrollSlider2;