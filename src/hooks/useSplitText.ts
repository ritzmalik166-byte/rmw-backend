"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/utils/SplitText"; // Ensure this exists

gsap.registerPlugin(ScrollTrigger, SplitText);

export const useSplitText = () => {
  const textRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (textRefs.current.length > 0) {
      textRefs.current.forEach((el) => {
        const split = new SplitText(el, { type: "chars" });
        gsap.from(split.chars, {
          opacity: 0,
          y: 50,
          stagger: 0.02,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    }
  }, []);

  return textRefs;
};




