"use client"
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function RMWLoader() {
  const dotsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (dotsRef.current.length) {
      gsap.to(dotsRef.current, {
        y: -6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.2,
        duration: 0.5,
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center gap-1">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) dotsRef.current[i] = el;
          }}
          className="w-2 h-2 rounded-full bg-white"
        ></div>
      ))}
    </div>
  );
}

export default RMWLoader;
