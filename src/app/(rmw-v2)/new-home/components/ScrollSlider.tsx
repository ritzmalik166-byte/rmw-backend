"use client";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface CardData {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
  features: string[];
  link: string;
  linkText: string;
  bg: string; // Can be solid color or gradient
  ellipseImage: string;
  featureDotColor: string;
  buttonBg?: string;
  buttonTextColor?: string;
  buttonHoverBg?: string;
}

interface ScrollSliderProps {
  cards: CardData[];
  sectionRef: React.RefObject<HTMLElement | null>;
}

function ScrollSlider({ cards, sectionRef }: ScrollSliderProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!trackRef.current || !sliderRef.current || !sectionRef.current || cards.length === 0) return;

    // Set initial position
    gsap.set(trackRef.current, { x: 0 });

    // Create ScrollTrigger animation
    const ctx = gsap.context(() => {
      const updateScrollDistance = () => {
        const track = trackRef.current;
        const slider = sliderRef.current;
        if (!track || !slider) return 0;

        const trackWidth = track.scrollWidth;
        const viewportWidth = slider.clientWidth;
        // Calculate scroll distance - we want to scroll until the last card is fully visible
        const scrollDistance = trackWidth - viewportWidth;
        return Math.max(0, scrollDistance);
      };

      const scrollDistance = updateScrollDistance();

      if (scrollDistance && scrollDistance > 0) {
        gsap.to(trackRef.current, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 10%",
            end: () => {
              const track = trackRef.current;
              const slider = sliderRef.current;
              if (!track || !slider) return "+=0";
              
              const trackWidth = track.scrollWidth;
              const viewportWidth = slider.clientWidth;
              // Calculate the actual scroll distance needed
              const actualDistance = trackWidth - viewportWidth;
              // On mobile, use minimal extra space to prevent overflow
              const isMobileNow = window.innerWidth < 1024;
              const extraSpace = isMobileNow ? 0 : viewportWidth * 0.5;
              return `+=${actualDistance + extraSpace}`;
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
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [cards.length, sectionRef]);

  return (
    <div ref={sliderRef} className="w-full overflow-x-hidden">
      <div
        ref={trackRef}
        className="flex gap-4 sm:gap-6 pl-0 pr-4 sm:pr-6 md:pr-0"
        style={{ 
          willChange: "transform",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative md:py-6 flex min-h-[440px] flex-shrink-0 flex-col overflow-hidden w-[calc(100vw-5rem)] rounded-[20px] sm:rounded-[28px] transition-transform duration-300 md:w-[calc(50vw-2rem)] lg:w-[700px]"
            style={{
              background: card.bg,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div className="relative z-10 flex h-full flex-col justify-between gap-4 sm:gap-6 rounded-[20px] sm:rounded-[28px] px-6 py-8 sm:px-8 sm:py-10 md:px-10">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[#FFFFFF33]">
                <Image
                  src={card.icon}
                  alt={card.iconAlt}
                  width={36}
                  height={36}
                  className="w-8 h-8 sm:w-9 sm:h-9"
                  onClick={() => window.open(card.link, "_blank")}
                />
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <h2 onClick={() => window.open(card.link, "_blank")} className="text-2xl sm:text-[28px] md:text-[32px] font-[600] text-white leading-tight">
                  {card.title}
                </h2>
                <p className="text-sm text-[#FFFFFFE5] sm:text-[15px] md:text-[16px] font-[400] leading-relaxed">
                  {card.description}
                </p>
              </div>

           

              <Link
                title={card.linkText}
                href={card.link} target="_blank"
                className={`group inline-flex md:h-[40px] w-full items-center justify-center gap-2 rounded-[8px] px-6 py-3 text-[14px] lg:text-[16px] font-[500] transition-colors duration-200 ${
                  card.buttonBg || "bg-[#FFFFFF]"
                } ${card.buttonTextColor || "text-black"} ${
                  card.buttonHoverBg || "hover:bg-[#F3830E] hover:text-[#ffffff]"
                } hover:text-white`}
              >
                {card.linkText}
                <MoveRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Absolute Position Image Container */}
            <div className="absolute -right-16 -top-16 sm:-right-20 sm:-top-20 md:-right-22 md:-top-22 z-0 opacity-60 sm:opacity-70 md:opacity-100">
              <img
                src={card.ellipseImage}
                alt="RMW"
                className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[256px] md:h-[256px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScrollSlider;

