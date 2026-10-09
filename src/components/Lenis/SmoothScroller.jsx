"use client"; // Important: make this a client component

import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroller = () => {
  useEffect(() => {
    // Initialize Lenis only on the client
    const lenis = new Lenis();

    // Animate scrolling
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup (optional)
    return () => {
      // Lenis doesn't have a destroy method, but if needed you can stop animation here
    };
  }, []);

  return null; // No UI needed
};

export default SmoothScroller;
