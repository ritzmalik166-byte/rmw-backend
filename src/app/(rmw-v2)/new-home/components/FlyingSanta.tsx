"use client";
import React, { useEffect, useState, useRef } from "react";

function FlyingSanta() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationType, setAnimationType] = useState<"left-to-right" | "right-to-left">("left-to-right");
  const currentTypeRef = useRef<"left-to-right" | "right-to-left">("left-to-right");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Function to show Santa with specific animation
    const showSanta = (type: "left-to-right" | "right-to-left") => {
      currentTypeRef.current = type;
      setAnimationType(type);
      setIsVisible(true);
      
      // Hide Santa after animation completes (5 seconds)
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        
        // After 10 seconds of being hidden, show the opposite animation
        setTimeout(() => {
          const nextType = currentTypeRef.current === "left-to-right" ? "right-to-left" : "left-to-right";
          showSanta(nextType);
        }, 10000);
      }, 5000);
    };

    // Start first animation (bottom-left to top-right)
    showSanta("left-to-right");

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes FlyingSantaLeftToRight {
            0% {
              bottom: 0%;
              left: -25%;
              transform: rotateY(0deg);
              opacity: 0;
              visibility: hidden;
            }
            2% {
              bottom: 1.4%;
              left: -15%;
              transform: rotateY(0deg);
              opacity: 1;
              visibility: visible;
            }
            20% {
              bottom: 14%;
              left: 5%;
              transform: rotateY(0deg);
              opacity: 1;
              visibility: visible;
            }
            40% {
              bottom: 28%;
              left: 35%;
              transform: rotateY(0deg);
              opacity: 1;
              visibility: visible;
            }
            60% {
              bottom: 42%;
              left: 65%;
              transform: rotateY(0deg);
              opacity: 1;
              visibility: visible;
            }
            80% {
              bottom: 56%;
              left: 95%;
              transform: rotateY(0deg);
              opacity: 1;
              visibility: visible;
            }
            98% {
              bottom: 68.6%;
              left: 120%;
              transform: rotateY(0deg);
              opacity: 1;
              visibility: visible;
            }
            100% {
              bottom: 70%;
              left: 125%;
              transform: rotateY(0deg);
              opacity: 0;
              visibility: hidden;
            }
          }

          @keyframes FlyingSantaRightToLeft {
            0% {
              bottom: 0%;
              left: 125%;
              transform: rotateY(180deg);
              opacity: 0;
              visibility: hidden;
            }
            2% {
              bottom: 1.4%;
              left: 115%;
              transform: rotateY(180deg);
              opacity: 1;
              visibility: visible;
            }
            20% {
              bottom: 14%;
              left: 95%;
              transform: rotateY(180deg);
              opacity: 1;
              visibility: visible;
            }
            40% {
              bottom: 28%;
              left: 65%;
              transform: rotateY(180deg);
              opacity: 1;
              visibility: visible;
            }
            60% {
              bottom: 42%;
              left: 35%;
              transform: rotateY(180deg);
              opacity: 1;
              visibility: visible;
            }
            80% {
              bottom: 56%;
              left: 5%;
              transform: rotateY(180deg);
              opacity: 1;
              visibility: visible;
            }
            98% {
              bottom: 68.6%;
              left: -20%;
              transform: rotateY(180deg);
              opacity: 1;
              visibility: visible;
            }
            100% {
              bottom: 70%;
              left: -25%;
              transform: rotateY(180deg);
              opacity: 0;
              visibility: hidden;
            }
          }

          .flying-santa {
            width: 20vw;
            min-width: 175px;
            max-width: 300px;
            z-index: 9999;
            cursor: pointer;
            pointer-events: none;
            position: fixed;
            opacity: 0;
            visibility: hidden;
          }

          .flying-santa.left-to-right {
            animation: FlyingSantaLeftToRight 5s linear forwards;
          }

          .flying-santa.right-to-left {
            animation: FlyingSantaRightToLeft 5s linear forwards;
          }
        `
      }} />
      <img
        className={`flying-santa ${animationType}`}
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/191814/santas.gif"
        alt="Flying Santa"
      />
    </>
  );
}

export default FlyingSanta;

