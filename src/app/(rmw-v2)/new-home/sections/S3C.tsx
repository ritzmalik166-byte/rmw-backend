"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function S3C() {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const logoGridRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const logoCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // PRM logos - shown first with higher priority
  const prmLogos = [

    {
      name: "PRM 9",
      src: "/new-page/logos/prm-9.jpg",
      alt: "PRM Logo 9",
    },
    {
      name: "PRM 22",
      src: "/new-page/logos/prm-22.jpg",
      alt: "PRM Logo 22",
    },
    // mpf-logo.webp
    {
      name: "MPF",
      src: "/new-page/logos/mpf-bl.png",
      alt: "MPF Logo",
    },
    {
      name: "PRM 1",
      src: "/new-page/logos/rdx-lg.avif",
      alt: "PRM Logo 1",
    },
    {
      name: "PRM 2",
      src: "/new-page/logos/prm-2.png",
      alt: "PRM Logo 2",
    },
    {
      name: "PRM 3",
      src: "/new-page/logos/prm-3.png",
      alt: "PRM Logo 3",
    },
    {
      name: "PRM 4",
      src: "/new-page/logos/prm-4.png",
      alt: "PRM Logo 4",
    },
    {
      name: "PRM 5",
      src: "/new-page/logos/prm-5.png",
      alt: "PRM Logo 5",
    },
    {
      name: "PRM 6",
      src: "/new-page/logos/prm-6.png",
      alt: "PRM Logo 6",
    },
    {
      name: "PRM 7",
      src: "/new-page/logos/prm-7.png",
      alt: "PRM Logo 7",
    },
    {
      name: "PRM 8",
      src: "/new-page/logos/prm-8.jpg",
      alt: "PRM Logo 8",
    },
    
    {
      name: "PRM 10",
      src: "/new-page/logos/prm-10.png",
      alt: "PRM Logo 10",
    },
    {
      name: "PRM 11",
      src: "/new-page/logos/prm-11.jpg",
      alt: "PRM Logo 11",
    },
    {
      name: "PRM 12",
      src: "/new-page/logos/prm-12.png",
      alt: "PRM Logo 12",
    },
    {
      name: "PRM 13",
      src: "/new-page/logos/exotica-logo.png",
      alt: "PRM Logo 13",
    },
    {
      name: "PRM 14",
      src: "/new-page/logos/prm-14.png",
      alt: "PRM Logo 14",
    },
    
    {
      name: "PRM 16",
      src: "/new-page/logos/prm-16.png",
      alt: "PRM Logo 16",
    },
    {
      name: "PRM 17",
      src: "/new-page/logos/prm-17.jpg",
      alt: "PRM Logo 17",
    },
    {
      name: "PRM 18",
      src: "/new-page/logos/prm-18.png",
      alt: "PRM Logo 18",
    },
    {
      name: "PRM 19",
      src: "/new-page/logos/prm-19.png",
      alt: "PRM Logo 19",
    },
    {
      name: "PRM 20",
      src: "/new-page/logos/prm-20.jpg",
      alt: "PRM Logo 20",
    },
    {
      name: "Honda",
      src: "/new-page/logos/scnd-3.jpg",
      alt: "Honda Logo",
    },
    {
      name: "BMW",
      src: "/new-page/logos/scnd-4.jpg",
      alt: "BMW Logo",
    },
    {
      name: "Adani Realty",
      src: "/new-page/logos/scnd-5.jpg",
      alt: "Adani Realty Logo",
    },
    // {
    //   name: "PRM 21",
    //   src: "/new-page/logos/prm-21.png",
    //   alt: "PRM Logo 21",
    // },
   
  ];

  // Other client logos - shown after PRM logos when expanded
  const otherClientLogos = [

    {
      name: "Jindal Steel & Power",
      src: "/new-page/logos/scnd-6.jpg",
      alt: "Jindal Steel & Power Logo",
    },
    {
      name: "Cars24",
      src: "/new-page/logos/scnd-7.jpg",
      alt: "Cars24 Logo",
    },
    {
      name: "Zomato",
      src: "/new-page/logos/scnd-8.jpg",
      alt: "Zomato Logo",
    },
    {
      name: "Honda",
      src: "/new-page/logos/scnd-9.jpg",
      alt: "Honda Logo",
    },
    {
      name: "HDFC ERGO",
      src: "/new-page/logos/scnd-10.jpg",
      alt: "HDFC ERGO Logo",
    },
    {
      name: "DLF",
      src: "/new-page/logos/scnd-11.jpg",
      alt: "DLF Logo",
    },
    {
      name: "Rakesh",
      src: "/new-page/logos/scnd-12.jpg",
      alt: "Rakesh Logo",
    },
    {
      name: "TVS",
      src: "/new-page/logos/scnd-13.jpg",
      alt: "TVS Logo",
    },
    {
      name: "SBI",
      src: "/new-page/logos/scnd-14.jpg",
      alt: "SBI Logo",
    },
    {
      name: "Punjab National Bank",
      src: "/new-page/logos/scnd-15.jpg",
      alt: "Punjab National Bank Logo",
    },
    {
      name: "Visit Monaco",
      src: "/new-page/logos/scnd-16.jpg",
      alt: "Visit Monaco Logo",
    },
    {
      name: "IndiGo",
      src: "/new-page/logos/scnd-17.jpg",
      alt: "IndiGo Logo",
    },
    {
      name: "IndiGo",
      src: "/new-page/logos/scnd-18.jpg",
      alt: "IndiGo Logo",
    },
  ];

  // Combine logos: PRM first, then other logos if expanded
  const displayedLogos = showAll 
    ? [...prmLogos, ...otherClientLogos]
    : prmLogos;

  // Reset refs array when displayedLogos changes
  useEffect(() => {
    logoCardRefs.current = logoCardRefs.current.slice(0, displayedLogos.length);
  }, [displayedLogos.length]);

  // Set up ScrollTrigger animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate entire section from Y axis with scrub
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.1,
            ease: "linear",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 100%",
              end: "top 50%",
              // scrub: 1,
              // markers:true
            },
          }
        );
      }

      // Animate heading with linear smooth timeline
      if (headingRef.current) {
        const headingTl = gsap.timeline({
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 100%",
            end: "top 60%",
          
            // markers:true
          },
        });

        headingTl.fromTo(
          headingRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.1,
            ease: "linear", // Linear easing for smooth animation
          }
        );
      }

      // Animate logo cards with linear smooth ScrollTrigger
      if (logoGridRef.current) {
        // Wait a bit for refs to be populated
        const checkRefs = () => {
          const visibleCards = logoCardRefs.current
            .slice(0, displayedLogos.length)
            .filter((ref) => ref !== null) as HTMLDivElement[];
          
          if (visibleCards.length > 0) {
            const logoTl = gsap.timeline({
              scrollTrigger: {
                trigger: logoGridRef.current,
                start: "top 95%",
                end: "top 30%",
                scrub: 1, // Smooth scroll-linked animation
                // markers:true
              },
            });

            logoTl.fromTo(
              visibleCards,
              {
                opacity: 0,
                y: 50,
                scale: 0.9,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.2,
                ease: "linear", // Linear easing for smooth animation
                stagger: {
                  amount: 1, // Total duration for all cards
                  from: "start",
                  ease: "linear", // Linear stagger distribution
                },
              }
            );
          }
        };

        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          setTimeout(checkRefs, 100);
        });
      }

    }, sectionRef);

    return () => {
      ctx.revert(); // Cleanup
    };
  }, [displayedLogos.length]); // Re-run when logos change

  // Animate newly shown logos when "Show More" is clicked with linear animation
  useEffect(() => {
    if (showAll && logoCardRefs.current.length > prmLogos.length) {
      // Wait for DOM to update
      setTimeout(() => {
        const newCards = logoCardRefs.current
          .slice(prmLogos.length)
          .filter((ref) => ref !== null) as HTMLDivElement[];
        
        if (newCards.length > 0) {
          gsap.fromTo(
            newCards,
            {
              opacity: 0,
              y: 40,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "linear", // Linear easing for smooth animation
              stagger: {
                amount: 0.6,
                from: "start",
                ease: "linear", // Linear stagger distribution
              },
            }
          );
        }
        
        // Refresh ScrollTrigger after content expands to prevent affecting other sections
        // Use double requestAnimationFrame to ensure layout has fully updated
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        });
      }, 50);
    } else if (!showAll) {
      // Also refresh when collapsing to ensure proper recalculation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    }
  }, [showAll, prmLogos.length]);

  return (
      <section 
        ref={sectionRef}
        className="w-full bg-grediant-lr from-[#FCFCFD] to-[#ffffff] py-12 sm:py-16 lg:py-20 overflow-x-hidden max-w-full"
      >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div 
          ref={headingRef}
          className="mb-8 text-center sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl font-[600] text-[#101828] sm:text-3xl lg:text-[48px]">
            Clients
          </h2>
        </div>

        {/* Logo Grid */}
        <div 
          ref={logoGridRef}
          className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-5"
        >
          {displayedLogos.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              ref={(el) => {
                logoCardRefs.current[index] = el;
              }}
              className="group overflow-hidden flex items-center justify-center rounded-lg bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md sm:p-4 md:p-5 lg:p-6 w-[calc(50%-6px)] sm:w-[calc(33.333%-10.67px)] md:w-[calc(25%-12px)] lg:w-[calc(16.666%-16.67px)]"
            >
              <div className="relative h-12 w-full sm:h-14 md:h-16 lg:h-20">
                <Image
                  src={client.src}
                  alt={client.alt}
                  fill
                  className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Show Less Button */}
        {otherClientLogos.length > 0 && (
          <div 
            ref={buttonRef}
            className="mt-8 flex justify-center items-center sm:mt-12 lg:mt-16"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex liquid cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#D4A574] px-6 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#c2925d] sm:px-8 sm:py-3.5"
            >
              {showAll ? "Show Less" : "Show More"}
              <MoveRight className={`h-5 w-5 transition-transform duration-200 ${showAll ? 'rotate-180' : 'group-hover:translate-x-1'}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default S3C;
