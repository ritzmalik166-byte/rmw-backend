"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Montserrat } from "next/font/google";


const montserratDisplay = Montserrat({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

interface WebsiteGatewayProps {
  onComplete?: () => void;
}

export default function WebsiteGateway({ onComplete }: WebsiteGatewayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const fullText = "www.ritzmediaworld.com";

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;

    if (typeof window !== "undefined") {
      sessionStorage.removeItem("rmw_gateway_hide_started");
      const runtimeWindow = window as Window & { __rmwGatewayHideStarted?: boolean };
      runtimeWindow.__rmwGatewayHideStarted = false;
    }

    let charIndex = 0;
    let typeInterval: ReturnType<typeof setInterval>;

    gsap.fromTo(
      text,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    const startTimeout = setTimeout(() => {
      typeInterval = setInterval(() => {
        if (charIndex <= fullText.length) {
          setDisplayText(fullText.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          

          const tl = gsap.timeline();
          
          tl.to(text, {
            letterSpacing: "-2px",
            scale: 0.95,
            duration: 0.4,
            ease: "power4.inOut",
          })
          .to(text, {
            letterSpacing: "normal",
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
          .to(container, {
            scale: 0.2,
            x: "-40vw",
            y: "-40vh",
            opacity: 0,
            duration: 1.2,
            ease: "power3.inOut",
            delay: 0.4,
            onStart: () => {
              if (typeof window !== "undefined") {
                sessionStorage.setItem("rmw_gateway_hide_started", "true");
                const runtimeWindow = window as Window & { __rmwGatewayHideStarted?: boolean };
                runtimeWindow.__rmwGatewayHideStarted = true;
                window.dispatchEvent(new Event("rmw:gateway-hide-start"));
              }
            },
            onComplete: () => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("rmw:gateway-closed"));
              }
              setIsVisible(false);
              if (onComplete) {
                onComplete();
              }
            }
          });
        }
      }, 100); // 100ms per character typing speed
    }, 400);

    return () => {
      clearTimeout(startTimeout);
      if (typeInterval) clearInterval(typeInterval);
      gsap.killTweensOf(text);
      gsap.killTweensOf(container);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F1640]"
    >
      <div
        ref={textRef}
        className={`${montserratDisplay.className} text-2xl md:text-4xl lg:text-6xl font-bold flex items-center`}
      >
        <span
          style={{
            background: "linear-gradient(to right, #C1892C, #EFBB68)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            display: "inline-block",
            whiteSpace: "nowrap"
          }}
        >
          {displayText}
        </span>
        <span className="animate-pulse text-[#EFBB68] ml-1">_</span>
      </div>
    </div>
  );
}