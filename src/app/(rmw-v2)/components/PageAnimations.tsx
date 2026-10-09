"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PageAnimations() {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const setInitialStates = () => {
      const sections = document.querySelectorAll("section");
      sections.forEach((section, index) => {
        if (index === 0) return;

        // Helper function to filter out elements within no-animation containers
        const filterNoAnimationElements = (elements: NodeListOf<Element>): Element[] => {
          return Array.from(elements).filter((el) => {
            // Check if element or any of its ancestors has data-no-gsap-animation
            let current: Element | null = el;
            while (current && current !== section) {
              if (current.hasAttribute('data-no-gsap-animation')) {
                return false;
              }
              current = current.parentElement;
            }
            return true;
          });
        };

        const headings = filterNoAnimationElements(section.querySelectorAll("h1, h2, h3"));
        const paragraphs = filterNoAnimationElements(section.querySelectorAll("p"));
        const images = filterNoAnimationElements(section.querySelectorAll("img"));
        const buttons = filterNoAnimationElements(section.querySelectorAll("button"));
        const lists = filterNoAnimationElements(section.querySelectorAll("ul, ol"));

        const allElements = [
          ...headings,
          ...paragraphs,
          ...images,
          ...buttons,
        ] as HTMLElement[];
        allElements.forEach((el) => {
          if (el) {
            gsap.set(el, { autoAlpha: 0 });
          }
        });

        // Set initial state for list items
        lists.forEach((list) => {
          const listItems = Array.from(list.querySelectorAll("li") as NodeListOf<HTMLElement>).filter((item) => {
            // Check if list item or any of its ancestors has data-no-gsap-animation
            let current: Element | null = item;
            while (current && current !== section) {
              if (current.hasAttribute('data-no-gsap-animation')) {
                return false;
              }
              current = current.parentElement;
            }
            return true;
          });
          listItems.forEach((item) => {
            if (item) {
              gsap.set(item, { autoAlpha: 0 });
            }
          });
        });
      });
    };

    // Set initial states immediately (synchronously)
    setInitialStates();

    // Initialize Lenis smooth scroll (only for this page)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Animation function using requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }

    rafIdRef.current = requestAnimationFrame(raf);

    // Set up GSAP ScrollTrigger animations after DOM is ready
    const initAnimations = () => {
      // Get all sections for animation
      const sections = document.querySelectorAll("section");

      // Now wait for next frame to ensure DOM is fully rendered before animating
      requestAnimationFrame(() => {
        // Animation for S1 (Hero Section) - Initial load animation
        const s1Section = sections[0];
        if (s1Section) {
          const heroElements = s1Section.querySelectorAll("h1, p, button, img");
          if (heroElements.length > 0) {
            gsap.fromTo(
              heroElements,
              {
                autoAlpha: 0,
                y: 50,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                stagger: 0.1,
                delay: 0.3,
              }
            );
          }
        }

        // Animate all other sections
        sections.forEach((section, index) => {
          // Skip S1 as it's already animated on load
          if (index === 0) return;

          if (section.children.length === 0) return;

          // Helper function to filter out elements within no-animation containers
          const filterNoAnimationElements = (elements: NodeListOf<Element>): Element[] => {
            return Array.from(elements).filter((el) => {
              // Check if element or any of its ancestors has data-no-gsap-animation
              let current: Element | null = el;
              while (current && current !== section) {
                if (current.hasAttribute('data-no-gsap-animation')) {
                  return false;
                }
                current = current.parentElement;
              }
              return true;
            });
          };

          // Get all elements to animate
          const headings = filterNoAnimationElements(section.querySelectorAll("h1, h2, h3"));
          const paragraphs = filterNoAnimationElements(section.querySelectorAll("p"));
          const images = filterNoAnimationElements(section.querySelectorAll("img"));
          const buttons = filterNoAnimationElements(section.querySelectorAll("button"));
          const lists = filterNoAnimationElements(section.querySelectorAll("ul, ol"));

          // Create a timeline for section animations
          const sectionTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 95%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          });

          // Animate headings (use 'to' since initial state is already set)
          if (headings.length > 0) {
            gsap.set(headings, { y: 50 });
            sectionTl.to(
              headings,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.1,
              },
              0 // Start at timeline position 0
            );
          }

          // Animate paragraphs
          if (paragraphs.length > 0) {
            gsap.set(paragraphs, { y: 30 });
            sectionTl.to(
              paragraphs,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.05,
              },
              0.2 // Start slightly after headings
            );
          }

          // Animate images
          if (images.length > 0) {
            gsap.set(images, { scale: 0.95 });
            sectionTl.to(
              images,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.1,
              },
              0.1 // Start slightly after headings
            );
          }

          // Animate buttons
          if (buttons.length > 0) {
            gsap.set(buttons, { scale: 0.9 });
            sectionTl.to(
              buttons,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.4)",
                stagger: 0.1,
              },
              0.4 // Start after other elements
            );
          }

          // Animate lists
          if (lists.length > 0) {
            lists.forEach((list, listIndex) => {
              const listItems = list.querySelectorAll("li");
              if (listItems.length > 0) {
                gsap.set(listItems, { x: -20 });
                sectionTl.to(
                  listItems,
                  {
                    autoAlpha: 1,
                    x: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    stagger: 0.06,
                  },
                  0.3 + listIndex * 0.2 // Stagger lists
                );
              }
            });
          }

          // Special animations for specific sections

          // S2 - Service cards/interactive elements
          if (index === 1) {
            const interactiveElements = Array.from(
              section.querySelectorAll('[class*="flex"] > div:not(:empty)') as NodeListOf<HTMLElement>
            ).filter((el) => {
              // Exclude elements within no-animation containers
              let current: Element | null = el;
              while (current && current !== section) {
                if (current.hasAttribute('data-no-gsap-animation')) {
                  return false;
                }
                current = current.parentElement;
              }
              return true;
            });
            if (interactiveElements.length > 0) {
              gsap.set(interactiveElements, { y: 40 });
              sectionTl.to(
                interactiveElements,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.7,
                  ease: "power2.out",
                  stagger: 0.12,
                },
                0.2
              );
            }
          }

          // S3/S4/S7 - Swiper slides animation
          if (index === 2 || index === 3 || index === 6) {
            const swiperSlides = section.querySelectorAll(
              ".swiper-slide"
            ) as NodeListOf<HTMLElement>;
            if (swiperSlides.length > 0) {
              gsap.set(swiperSlides, {
                x: index === 6 ? 0 : 40,
                scale: index === 6 ? 0.95 : 1,
              });
              sectionTl.to(
                swiperSlides,
                {
                  autoAlpha: 1,
                  x: 0,
                  scale: 1,
                  duration: 0.7,
                  ease: index === 6 ? "back.out(1.2)" : "power2.out",
                  stagger: 0.1,
                },
                0.3
              );
            }
          }

          // S5 - Timeline elements
          if (index === 4) {
            const timelineElements = section.querySelectorAll(
              '.swiper-slide, [class*="flex"] > div'
            ) as NodeListOf<HTMLElement>;
            if (timelineElements.length > 0) {
              gsap.set(timelineElements, { x: -30 });
              sectionTl.to(
                timelineElements,
                {
                  autoAlpha: 1,
                  x: 0,
                  duration: 0.7,
                  ease: "power2.out",
                  stagger: 0.15,
                },
                0.3
              );
            }
          }

          // S6 - Testimonial cards
          if (index === 5) {
            const testimonialCards = section.querySelectorAll(
              ".swiper-slide > div"
            ) as NodeListOf<HTMLElement>;
            if (testimonialCards.length > 0) {
              gsap.set(testimonialCards, { y: 30, scale: 0.96 });
              sectionTl.to(
                testimonialCards,
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.7,
                  ease: "power2.out",
                  stagger: 0.1,
                },
                0.3
              );
            }
          }

          // S8 - Blog and CTA sections
          if (index === 7) {
            // Find blog cards by finding divs that contain images
            const allDivs = section.querySelectorAll(
              '[class*="flex"] > div'
            ) as NodeListOf<HTMLElement>;
            const blogCards = Array.from(allDivs).filter((div) =>
              div.querySelector("img")
            );
            const ctaSection = section.querySelector(
              '[class*="flex"]:last-child'
            ) as HTMLElement;

            if (blogCards.length > 0) {
              gsap.set(blogCards, { y: 40 });
              sectionTl.to(
                blogCards,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.7,
                  ease: "power2.out",
                  stagger: 0.12,
                },
                0.3
              );
            }

            if (ctaSection) {
              gsap.set(ctaSection, { scale: 0.96 });
              sectionTl.to(
                ctaSection,
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.8,
                  ease: "power2.out",
                },
                0.6
              );
            }
          }
        });

        // Refresh ScrollTrigger after all animations are set up
        ScrollTrigger.refresh();
      });
    };

    const initTimeout = setTimeout(() => {
      // Set initial states again in case new elements were added
      setInitialStates();
      // Then initialize animations
      initAnimations();
    }, 150);

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      clearTimeout(initTimeout);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      // Kill all ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null; // This component doesn't render anything
}

