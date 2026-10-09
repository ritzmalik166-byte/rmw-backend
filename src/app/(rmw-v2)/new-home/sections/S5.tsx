"use client";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedBtn from "../components/AnimatedBtn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type StoryResult = {
  icn: string;
  title: string;
  para: string;
  bg: string;
};

type StoryCard = {
  title: string;
  img: string;
  subTitle: string;

  para2: string;
  res?: string;
  results: StoryResult[];
  link: string;
  btn: string;
  imgLink: string;
};

const storiesData: StoryCard[] = [
  {
    title: "Digital Advertising",
    img: "/new-page/digital-ad.jpg",
    subTitle: "Luxury Real Estate",

    para2:
      "Our digital advertising case studies showcase how smart targeting, compelling creatives, and data-driven optimisation translate into real business outcomes. Explore how brands across sectors achieved higher visibility, stronger engagement, and measurable conversions through strategic, performance-focused campaigns.",
    res: "Results",
    results: [
      {
        icn: "/new-page/icns/badge-icn.png",
        title: "250%",
        para: "Increase in qualified leads",
        bg: "bg-[#FFD0F6]",
      },
      {
        icn: "/new-page/icns/users-icn.png",
        title: "85%",
        para: "Target audience reach",
        bg: "bg-[#FFF2D0]",
      },
      {
        icn: "/new-page/icns/globe-icn.png",
        title: "40%",
        para: "Conversion rate",
        bg: "bg-[#EFFFD0]",
      },
    ],
    link: "/case-study-indigos-skyrocketing-dominance-in-the-indian-airline-market",
    btn: "Digital Advertising",
    imgLink: "https://ritzmediaworld.com/services/digital-marketing",
  },
  {
    title: "Print Advertising",
    img: "/new-page/for-print.jpg",
    subTitle: "Lifestyle & Retail",

    para2:
      "Our print advertising case studies show how powerful layouts, sharp messaging, and strategic placements cut through clutter to capture attention instantly. See how brands achieved stronger recall, higher response rates, and impactful visibility through well-crafted print communication.",
    res: "Results",
    results: [
      {
        icn: "/new-page/icns/badge-icn.png",
        title: "180%",
        para: "Lift in brand awareness",
        bg: "bg-[#FFD0F6]",
      },
      {
        icn: "/new-page/icns/users-icn.png",
        title: "3X",
        para: "Growth in social engagement",
        bg: "bg-[#FFF2D0]",
      },
      {
        icn: "/new-page/icns/globe-icn.png",
        title: "65%",
        para: "Increase in market share",
        bg: "bg-[#EFFFD0]",
      },
    ],
    link: "/the-timeless-rise-of-the-times-of-india-a-branding-and-advertising-case-study",
    btn: "Print Advertising",
    imgLink: "https://ritzmediaworld.com/services/print-advertising",
  },
  {
    title: "Brand Identity",
    img: "/new-page/brand.jpg",
    subTitle: "Healthcare & Wellness",
    para2:
      "Our content marketing case studies reveal how insightful blogs, videos, and social content build trust over time. See how brands turned storytelling into steady traffic, stronger engagement, and high-intent leads that convert long after campaigns go live.",
    res: "Results",
    results: [
      {
        icn: "/new-page/icns/badge-icn.png",
        title: "210%",
        para: "Rise in global inquiries",
        bg: "bg-[#FFD0F6]",
      },
      {
        icn: "/new-page/icns/users-icn.png",
        title: "92%",
        para: "Patient satisfaction scores",
        bg: "bg-[#FFF2D0]",
      },
      {
        icn: "/new-page/icns/globe-icn.png",
        title: "54%",
        para: "Increase in repeat visits",
        bg: "bg-[#EFFFD0]",
      },
    ],
    link: "/buzz-behind-the-brand-apple-iphone-launch-secrets-revealed",
    btn: "Brand Identity",
    imgLink: "https://ritzmediaworld.com/services/digital-marketing/brand-awareness",
  },
  {
    title: "Social Media Management",
    img: "/new-page/social.jpg",
    subTitle: "Healthcare & Wellness",
    para2:
      "Our social media management case studies showcase how consistent posting, smart community building, and data-led optimisation turn followers into fans. See how brands achieved better visibility, engagement, and conversions through always-on, platform-native content and active reputation management.",
    res: "Results",
    results: [
      {
        icn: "/new-page/icns/badge-icn.png",
        title: "210%",
        para: "Rise in global inquiries",
        bg: "bg-[#FFD0F6]",
      },
      {
        icn: "/new-page/icns/users-icn.png",
        title: "92%",
        para: "Patient satisfaction scores",
        bg: "bg-[#FFF2D0]",
      },
      {
        icn: "/new-page/icns/globe-icn.png",
        title: "54%",
        para: "Increase in repeat visits",
        bg: "bg-[#EFFFD0]",
      },
    ],
    link: "/how-did-cooking-shows-influence-indias-cooking-utensil-sales",
    btn: "Brand Identity",
    imgLink: "https://ritzmediaworld.com/services/digital-marketing/social-media-management",
  },
];

function S5() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const articleRefs = useRef<(HTMLElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const resultCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Wait for DOM to be ready
    const initAnimations = () => {
      // Animate header section
      if (headerRef.current && headerRef.current.children.length > 0) {
        gsap.from(headerRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 3,
            invalidateOnRefresh: true,
          },
        });
      }

      // Animate each article with responsive animations
      articleRefs.current.forEach((article, idx) => {
        if (!article) return;

      const imageContainer = imageRefs.current[idx];
      const contentContainer = contentRefs.current[idx];
      const isEven = idx % 2 === 0;

      // Mobile/Tablet animations (stack vertically, animate from bottom)
      const mobileMatch = gsap.matchMedia();
      mobileMatch.add("(max-width: 1023px)", () => {
        if (imageContainer) {
          gsap.set(imageContainer, {
            y: 50,
            opacity: 0,
          });
        }
        if (contentContainer) {
          gsap.set(contentContainer, {
            y: 50,
            opacity: 0,
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: article,
            start: "top 80%",
            end: "top 40%",
            scrub: 3,
            invalidateOnRefresh: true,
          },
        });

        if (imageContainer) {
          tl.to(imageContainer, {
            y: 0,
            opacity: 1,
            duration: 3,
            ease: "power3.out",
          }, 0);
        }

        if (contentContainer) {
          tl.to(contentContainer, {
            y: 0,
            opacity: 1,
            duration: 3,
            ease: "power3.out",
          }, 0.2);
        }
      });

      // Desktop animations (side by side, animate from left/right)
      const desktopMatch = gsap.matchMedia();
      desktopMatch.add("(min-width: 1024px)", () => {
        const imageStartX = isEven ? -150 : 150;
        const contentStartX = isEven ? 150 : -150;

        if (imageContainer) {
          gsap.set(imageContainer, {
            x: imageStartX,
            opacity: 0,
          });
        }
        if (contentContainer) {
          gsap.set(contentContainer, {
            x: contentStartX,
            opacity: 0,
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: article,
            start: "top 80%",
            end: "top 40%",
            scrub: 3,
            invalidateOnRefresh: true,
          },
        });

        if (imageContainer) {
          tl.to(imageContainer, {
            x: 0,
            opacity: 1,
            duration: 3,
            ease: "power3.out",
          }, 0);
        }

        if (contentContainer) {
          tl.to(contentContainer, {
            x: 0,
            opacity: 1,
            duration: 3,
            ease: "power3.out",
          }, 0.2);
        }
      });

      // Animate result cards with stagger and scrub
      const resultCards = article.querySelectorAll(".result-card");
      if (resultCards.length > 0) {
        // Set initial state for all cards
        gsap.set(resultCards, {
          y: 50,
          opacity: 0,
          scale: 0.9,
        });

        // Create timeline for smooth scrubbed animation
        const cardsTl = gsap.timeline({
          scrollTrigger: {
            trigger: article,
            start: "top 75%",
            end: "top 25%",
            scrub: 3,
            invalidateOnRefresh: true,
          },
        });

        // Animate each card with stagger
        resultCards.forEach((card, cardIdx) => {
          cardsTl.to(
            card,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 3,
              ease: "power2.out",
            },
            cardIdx * 0.1 // Stagger delay
          );
        });
      }
    });
  };

    // Initialize animations after a short delay to ensure refs are populated
    const timeoutId = setTimeout(() => {
      initAnimations();
      ScrollTrigger.refresh();
    }, 100);

    // Hover effects for images - only animate the image, not the container
    const imageHoverHandlers: Array<{
      container: HTMLDivElement;
      image: HTMLImageElement | null;
      enter: () => void;
      leave: () => void;
    }> = [];

    imageRefs.current.forEach((imageContainer) => {
      if (!imageContainer) return;
      // Find the image element inside the container
      const image = imageContainer.querySelector("img") as HTMLImageElement | null;

      const handleEnter = () => {
        if (image) {
          gsap.to(image, {
            scale: 1.1,
            duration: 3,
            ease: "power2.out",
          });
        }
      };

      const handleLeave = () => {
        if (image) {
          gsap.to(image, {
            scale: 1,
            duration: 3,
            ease: "power2.out",
          });
        }
      };

      imageContainer.addEventListener("mouseenter", handleEnter);
      imageContainer.addEventListener("mouseleave", handleLeave);

      imageHoverHandlers.push({
        container: imageContainer,
        image,
        enter: handleEnter,
        leave: handleLeave,
      });
    });

    // Hover effects for result cards
    const cardHoverHandlers: Array<{
      card: HTMLDivElement;
      enter: () => void;
      leave: () => void;
    }> = [];

    resultCardRefs.current.forEach((card) => {
      if (!card) return;

      const handleEnter = () => {
        gsap.to(card, {
          y: -8,
          scale: 1.05,
          duration: 3,
          ease: "power2.out",
        });
      };

      const handleLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
            duration: 3,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);

      cardHoverHandlers.push({
        card,
        enter: handleEnter,
        leave: handleLeave,
      });  
    });

    return () => {
      clearTimeout(timeoutId);
      
      // Cleanup event listeners
      imageHoverHandlers.forEach(({ container, enter, leave }) => {
        container.removeEventListener("mouseenter", enter);
        container.removeEventListener("mouseleave", leave);
      });

      cardHoverHandlers.forEach(({ card, enter, leave }) => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      });

      // Cleanup ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars?.trigger === sectionRef.current ||
          articleRefs.current.some((article) => article && trigger.vars?.trigger === article) ||
          (headerRef.current && trigger.vars?.trigger === headerRef.current)
        ) {
          trigger.kill();
        }
      });
    };
  }, { scope: sectionRef, dependencies: [storiesData.length] });

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full justify-center overflow-hidden overflow-x-hidden bg-[#ffffff] py-16 sm:py-0 md:pb-[5px] lg:py-10 mb-4 mt-4 max-w-full "
    >
      <div className="flex w-full max-w-[99%] flex-col gap-12 px-4 sm:px-6 lg:px-0 lg:pb-10">
        {/* Row 1 */}
        <div
          ref={headerRef}
          className="flex flex-col items-center gap-4 text-center"
        >
          <button className="inline-flex h-9 w-[130px] items-center justify-center rounded-full bg-[#E8DDD1] text-[14px] font-[400] text-[#8B7355] ">
            Proven Results
          </button>
          <h2 className="text-3xl font-[600] text-[#101828] sm:text-4xl lg:text-[48px] lg:leading-[1.15] md:flex">
            Success Stories That{" "}
            <span className="text-[#F3830E] font-[600] md:block transform -translate-y-[4px]">
              Inspire
            </span>
          </h2>
          <p className="text-base text-[#4A5565] sm:text-[20px] font-[400]">
            Real challenges. Creative solutions. Measurable results
          </p>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col gap-16 sm:gap-20">
          {storiesData.map((story, idx) => (
            <article
              key={story.title}
              ref={(el) => {
                if (el) articleRefs.current[idx] = el;
              }}
              className={`flex flex-col gap-8 lg:items-center min-h-[384px] lg:justify-center lg:gap-0  ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
            >
              <div
                ref={(el) => {
                  if (el) imageRefs.current[idx] = el;
                }}
                className="relative w-full overflow-hidden rounded-[16px] bg-white shadow-[0_25px_65px_rgba(16,24,40,0.12)] sm:w-[85%] sm:self-center lg:w-[40%]"
              >
                <div className="relative aspect-[4/3] overflow-hidden lg:w-full lg:h-[481px]">
                  <Image
                    src={story.img}
                    alt={story.title}
                    fill
                    className="object-fill"
                    onClick={()=>window.open(story.imgLink, "_blank")}
                  />
                  {/* Absolute Positioned Div  */}
                  <button className="min-w-[155px] px-4 h-[32px] rounded-full absolute top-4 left-4 cursor-pointer font-[400] text-[14px] text-[#ffffff] bg-[#242321] z-10">
                    {story.title}
                  </button>
                </div>
              </div>

              <div
                ref={(el) => {
                  if (el) contentRefs.current[idx] = el;
                }}
                className="flex w-full lg:h-full flex-col justify-between gap-14 rounded-[28px]te px-6  sm:px-6 lg:w-[42%]"
              >
                <div className="flex flex-col gap-[24px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-[14px] font-[400] text-[#F3830E]">
                      {story.subTitle}
                    </p>
                    <h3 onClick={()=>window.open(story.imgLink, "_blank")} className="text-[26px] font-semibold text-[#333333] sm:text-[32px] cursor-pointer">
                      {story.title}
                    </h3>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-[#364153] sm:text-base">
                        {story.para2}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap lg:flex-nowrap gap-2">
                    {story.results.map((result, resultIdx) => (
                      <div
                        key={`${story.title}-${result.title}`}
                        ref={(el) => {
                          if (el) {
                            const globalIdx = idx * 3 + resultIdx;
                            resultCardRefs.current[globalIdx] = el;
                          }
                        }}
                        className={`result-card flex md:h-[127px] w-[160px] h-[127px] md:w-[190px] flex-col items-center justify-center gap-2 rounded-2xl  ${result.bg} text-center sm:w-[200px]`}
                      >
                        <Image
                          src={result.icn}
                          alt={result.title}
                          width={24}
                          height={24}
                        />
                        <h4 className="text-xl font-semibold text-[#101828]">
                          {result.title}
                        </h4>
                        <p className="text-xs text-[#4A5565] sm:text-sm">
                          {result.para}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  title="View Full Case Study"
                  href={story.link} target="_blank"
                  className="group inline-flex items-center hover:bg-black hover:text-white gap-3 text-[14px] font-[500] w-[198px] h-[36px] border-[0.8px] border-[#3D28171A] rounded-[8px] pl-3 text-[#3D2817] transition-transform duration-200 hover:translate-x-1 "
                >
                  View Full Case Study
                  <MoveRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="w-full flex justify-center items-center">
          {" "}
          <AnimatedBtn btnText="Click Me to know more" link="/services" txt="text-white"></AnimatedBtn>
        </div>
      </div>
    </section>
  );
}

export default S5;
