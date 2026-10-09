"use client";

import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type TimelineItem = {
  icn: string;
  year: string;
  title: string;
  para: string;
};

const TIMELINE_DATA: TimelineItem[] = [
  {
    icn: "/new-page/icns/glob_white.png",
    year: "2008",
    title: "Foundation",
    para: "Ritz Media World launched with a mission to reimagine brand communication for India's growth markets.",
  },
  {
    icn: "/new-page/icns/glob_white.png",
    year: "2012",
    title: "Innovation Leadership",
    para: "Pioneered centrespread storytelling in Hindustan Times, setting new creative benchmarks for print.",
  },
  {
    icn: "/new-page/icns/glob_white.png",
    year: "2016",
    title: "Digital Expansion",
    para: "Scaled into 360° digital marketing, unifying performance, content, and automation for premium brands.",
  },
  {
    icn: "/new-page/icns/glob_white.png",
    year: "2020",
    title: "Premium Positioning",
    para: "Became the go to agency for UHNI and luxury lifestyle brands across India and the Middle East.",
  },
  {
    icn: "/new-page/icns/glob_white.png",
    year: "2025",
    title: "Today",
    para: "17+ years, 1000+ campaigns, 500+ success stories and we’re still elevating brands to market leadership.",
  },
];

const TIMELINE_STATS = [
  {
    value: "17+",
    label: "Years of Excellence",
  },
  {
    value: "1000+",
    label: "Campaigns Delivered",
  },
  {
    value: "500+",
    label: "Success Stories",
  },
  {
    value: "50+",
    label: "Cities Covered",
  },
];

function TimelineCard({
  item,
  txtAlign,
  cardRef,
}: {
  item: TimelineItem;
  txtAlign: String;
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div 
      ref={cardRef}
      className="w-full max-w-[525px] rounded-[20px] bg-white p-6 shadow-[0_20px_60px_rgba(16,24,40,0.08)] timeline-card"
      style={{ 
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <div className={`flex flex-col gap-3 ${txtAlign}`}>
        <div>
          <span className="text-[28px] font-semibold text-[#F3830E]">
            {item.year}
          </span>
        </div>
        <div>
          <p className="text-base font-semibold text-[#101828]">{item.title}</p>
        </div>
        <p className="text-sm leading-relaxed text-[#4A5565]">{item.para}</p>
      </div>
    </div>
  );
}

function S7() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);
  const timelineLineRef = useRef<HTMLDivElement | null>(null);
  const timelineLineFillRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Check if all refs are ready
  useEffect(() => {
    const checkReady = () => {
      const allCardsReady = TIMELINE_DATA.every((_, idx) => cardRefs.current[idx] !== null && cardRefs.current[idx] !== undefined);
      const allIconsReady = TIMELINE_DATA.every((_, idx) => iconRefs.current[idx] !== null && iconRefs.current[idx] !== undefined);
      
      if (allCardsReady && allIconsReady && timelineContainerRef.current) {
        setIsReady(true);
      }
    };

    checkReady();
    const timeout = setTimeout(checkReady, 200);
    
    return () => clearTimeout(timeout);
  }, []);

  useGSAP(() => {
    if (!sectionRef.current || !timelineContainerRef.current || !isReady) return;

    // Wait for DOM to be ready
    const initAnimations = () => {
      const cards = cardRefs.current.filter(Boolean);
      const icons = iconRefs.current.filter(Boolean);

      // Animate timeline line fill (Desktop)
      if (timelineLineFillRef.current) {
        gsap.set(timelineLineFillRef.current, {
          scaleY: 0,
          transformOrigin: "top",
        });

        gsap.to(timelineLineFillRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineContainerRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
            markers: false,
          },
        });
      }

      // Animate cards with book page opening effect
      // Use the actual index from TIMELINE_DATA to determine even/odd
      TIMELINE_DATA.forEach((_, dataIndex) => {
        const card = cardRefs.current[dataIndex];
        if (!card) return;

        // Check if card is visible (has dimensions and is not hidden)
        const rect = card.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(card);
        const isVisible = computedStyle.display !== 'none' && 
                         computedStyle.visibility !== 'hidden' &&
                         rect.width > 0 && 
                         rect.height > 0;
        
        if (!isVisible) {
          // If card is not visible, try again after a short delay (for responsive layouts)
          setTimeout(() => {
            const retryRect = card.getBoundingClientRect();
            const retryStyle = window.getComputedStyle(card);
            const retryVisible = retryStyle.display !== 'none' && 
                               retryStyle.visibility !== 'hidden' &&
                               retryRect.width > 0 && 
                               retryRect.height > 0;
            
            if (retryVisible) {
              animateCard(card, dataIndex);
            }
          }, 100);
          return;
        }

        animateCard(card, dataIndex);
      });

      // Helper function to animate a card with page-opening effect
      function animateCard(card: HTMLDivElement, dataIndex: number) {
        const isEven = dataIndex % 2 === 0;
        
        // Set transform origin to the edge for page-opening effect
        // Even cards (left side) open from right edge
        // Odd cards (right side) open from left edge
        const transformOrigin = isEven ? "right center" : "left center";
        
        // Add perspective to parent for 3D effect
        const parent = card.parentElement;
        if (parent) {
          gsap.set(parent, {
            perspective: 1200,
            transformStyle: "preserve-3d",
          });
        }

        // Set initial state - card is "closed" (rotated 90 degrees like a closed book page)
        gsap.set(card, {
          rotationY: isEven ? -45 : 45,
          transformOrigin: transformOrigin,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          // opacity: 0,
          scale: 0.95, // Slightly smaller when closed
        });

        // Animate to final state - card "opens" (rotates to 0 like opening a book page)
        gsap.to(card, {
          rotationY: 0,
          // opacity: 1,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
            markers: false,
            invalidateOnRefresh: true,
          },
        });
      }

      // Animate icons with scale and rotation
      icons.forEach((icon) => {
        if (!icon) return;

        gsap.set(icon, {
          scale: 0,
          rotation: -180,
          opacity: 0,
        });

        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          opacity: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: icon,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
            markers: false,
          },
        });
      });

      // Handle mobile line segments with color fill
      const mobileLines = document.querySelectorAll(".mobile-timeline-line");
      mobileLines.forEach((line) => {
        const lineElement = line as HTMLElement;
        
        // Skip if already has fill element
        if (lineElement.querySelector(".mobile-timeline-fill")) return;

        // Create fill element
        const fillLine = document.createElement("span");
        fillLine.className = "mobile-timeline-fill absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#F3830E] to-transparent";
        lineElement.style.position = "relative";
        lineElement.appendChild(fillLine);

        gsap.set(fillLine, {
          scaleY: 0,
          transformOrigin: "top",
        });

        gsap.to(fillLine, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: lineElement,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
            markers: false,
          },
        });
      });
    };

    // Initialize animations
    initAnimations();
    
    // Refresh ScrollTrigger after initialization
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    // Handle window resize to refresh animations
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars?.trigger === sectionRef.current ||
          trigger.vars?.trigger === timelineContainerRef.current ||
          cardRefs.current.some((card) => card && trigger.vars?.trigger === card) ||
          iconRefs.current.some((icon) => icon && trigger.vars?.trigger === icon)
        ) {
          trigger.kill();
        }
      });
    };
  }, { scope: sectionRef, dependencies: [isReady] });

  return (
    <section 
      ref={sectionRef}
      className="relative flex w-full justify-center overflow-hidden overflow-x-hidden bg-gradient-to-br from-[#F9FAFB] to-[#ffffff] py-16 sm:py-20 lg:py-20 max-w-full"
    >
      <div className="flex w-full max-w-[96%] flex-col gap-14 px-4 sm:px-6 lg:px-0">
        {/* Row 1 */}
        <div className="flex flex-col items-center gap-5 text-center">
          <button className="inline-flex h-9 w-[130px] items-center justify-center rounded-full bg-[#F3830E] text-[14px] font-[400] text-[#ffffff] ">
            Our Journey
          </button>
          <h2 className="text-3xl font-semibold text-[#101828] sm:text-4xl lg:text-[48px] lg:leading-[1.1] md:flex">
            17 Years of <span className="text-[#F3830E] md:block transform -translate-y-[4px]">Brand Excellence</span>
          </h2>
          <p className="max-w-2xl text-base text-[#4A5565] sm:text-lg">
            From pioneering print innovations to 360° digital mastery, our
            journey reflects our commitment to excellence.
          </p>
        </div>

        {/* Row 2 */}
        <div 
          ref={timelineContainerRef}
          className="relative flex flex-col gap-12 sm:gap-14 md:gap-16 lg:gap-20"
        >
          {/* Desktop Timeline Line - Background (Gray) */}
          <div 
            ref={timelineLineRef}
            className="hidden lg:block absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#E5E7EB] via-[#D1D5DB] to-[#E5E7EB]"
          />
          
          {/* Desktop Timeline Line - Fill (Gold) */}
          <div 
            ref={timelineLineFillRef}
            className="hidden lg:block absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#E4C08C] via-[#F3830E] to-[#E4C08C]"
            style={{ transformOrigin: "top" }}
          />

          {TIMELINE_DATA.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.year}
                className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:justify-between"
              >
                {/* Left Card - Desktop Only */}
                <div
                  className={`hidden lg:flex ${
                    isEven ? "justify-end" : "justify-end"
                  }`}
                  style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                >
                  {isEven ? (
                    <TimelineCard 
                      item={item} 
                      txtAlign={"text-right"}
                      cardRef={(el) => {
                        // Always prefer desktop card ref (it's visible on desktop)
                        if (el) {
                          cardRefs.current[index] = el;
                        }
                      }}
                    />
                  ) : null}
                </div>

                {/* Center Icon and Line */}
                <div className="relative flex flex-col items-center gap-2 sm:gap-3">
                  {/* Mobile/Tablet Top Line Segment */}
                  <span 
                    className="mobile-timeline-line h-8 sm:h-10 w-[2px] bg-gradient-to-b from-transparent via-[#D1D5DB] to-transparent lg:hidden relative"
                  />
                  
                  {/* Icon Container */}
                  <div 
                    ref={(el) => {
                      if (el) iconRefs.current[index] = el;
                    }}
                    className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center overflow-hidden justify-center rounded-full border border-[#F6E2C8] bg-white shadow-[0_12px_30px_rgba(212,165,116,0.28)] p-1 z-10"
                  >
                    <div className="bg-[#F3830E] w-full h-full rounded-full flex justify-center items-center">
                      <Image
                        src={item.icn}
                        alt={item.title}
                        width={26}
                        height={26}
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                    </div>
                  </div>
                  
                  {/* Mobile/Tablet Bottom Line Segment */}
                  <span 
                    className="mobile-timeline-line h-8 sm:h-10 w-[2px]  lg:hidden relative"
                  />
                  
                  {/* Desktop Line Segments */}
                  <span className="hidden lg:block h-12 w-[2px] " />
                  <span className="hidden lg:block h-12 w-[2px] " />
                </div>

                {/* Right Card - Desktop Only */}
                <div
                  className={`hidden lg:flex ${
                    isEven ? "justify-start" : "justify-start"
                  }`}
                  style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                >
                  {!isEven ? (
                    <TimelineCard 
                      item={item} 
                      txtAlign={"text-left"}
                      cardRef={(el) => {
                        // Always prefer desktop card ref (it's visible on desktop)
                        if (el) {
                          cardRefs.current[index] = el;
                        }
                      }}
                    />
                  ) : null}
                </div>

                {/* Mobile/Tablet Card - Set ref only if desktop card didn't set it */}
                <div 
                  className="lg:hidden"
                  style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                >
                  <TimelineCard 
                    item={item} 
                    txtAlign={"text-left"}
                    cardRef={(el) => {
                      // On mobile/tablet, set ref only if desktop card didn't set it
                      // Desktop cards are hidden on mobile, so this will work
                      if (el && !cardRefs.current[index]) {
                        cardRefs.current[index] = el;
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 3 */}
        {/* <div className="grid w-full gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
          {TIMELINE_STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-[14px] border border-[#E5E7EB] bg-white px-6 py-6 text-center "
            >
              <h2 className="text-3xl font-semibold text-[#F3830E] sm:text-[36px]">
                {stat.value}
              </h2>
              <p className="text-[16px] font-[400] text-[#364153] sm:text-[13px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}

export default S7;
