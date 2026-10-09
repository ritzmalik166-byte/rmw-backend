"use client";
import React, { useEffect, useState, useRef } from "react";

type FlightDirection = "left-to-right" | "right-to-left" | "left-bottom-to-right-top" | "right-bottom-to-left-top";

function FlyingSanta2() {
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState<FlightDirection>("left-to-right");
  const santaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let sparkleTimeoutId: NodeJS.Timeout;

    const showSanta = () => {
      // Randomly choose from 4 directions
      const directions: FlightDirection[] = [
        "left-to-right",
        "right-to-left",
        "left-bottom-to-right-top",
        "right-bottom-to-left-top"
      ];
      const randomDirection = directions[Math.floor(Math.random() * directions.length)];
      setDirection(randomDirection);
      setIsVisible(true);

      // Hide after 7-8 seconds (flight duration)
      const flightDuration = 7500 + Math.random() * 500; // 7.5-8 seconds
      timeoutId = setTimeout(() => {
        setIsVisible(false);

        // Show again after 10 seconds
        sparkleTimeoutId = setTimeout(() => {
          showSanta();
        }, 10000);
      }, flightDuration);
    };

    // Start first flight after 15 seconds
    const initialTimeout = setTimeout(() => {
      showSanta();
    }, 15000);

    // Cleanup
    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
      clearTimeout(sparkleTimeoutId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes flyLeftToRight {
            0% {
              left: -400px;
              top: 15%;
              opacity: 0;
            }
            5% {
              opacity: 1;
            }
            95% {
              opacity: 1;
            }
            100% {
              left: calc(100% + 400px);
              top: 15%;
              opacity: 0;
            }
          }

          @keyframes flyRightToLeft {
            0% {
              left: calc(100% + 400px);
              top: 15%;
              opacity: 0;
            }
            5% {
              opacity: 1;
            }
            95% {
              opacity: 1;
            }
            100% {
              left: -400px;
              top: 15%;
              opacity: 0;
            }
          }

          @keyframes flyLeftBottomToRightTop {
            0% {
              left: -400px;
              bottom: 0%;
              opacity: 0;
            }
            5% {
              opacity: 1;
            }
            95% {
              opacity: 1;
            }
            100% {
              left: calc(100% + 400px);
              bottom: 70%;
              opacity: 0;
            }
          }

          @keyframes flyRightBottomToLeftTop {
            0% {
              left: calc(100% + 400px);
              bottom: 0%;
              opacity: 0;
            }
            5% {
              opacity: 1;
            }
            95% {
              opacity: 1;
            }
            100% {
              left: -400px;
              bottom: 70%;
              opacity: 0;
            }
          }

          .flying-santa-container {
            position: fixed;
            z-index: 9998;
            pointer-events: none;
            width: 400px;
            height: 300px;
          }

          .flying-santa-container.left-to-right {
            animation: flyLeftToRight 7.5s linear forwards;
          }

          .flying-santa-container.right-to-left {
            animation: flyRightToLeft 7.5s linear forwards;
            transform: scaleX(-1);
          }

          .flying-santa-container.left-bottom-to-right-top {
            animation: flyLeftBottomToRightTop 7.5s linear forwards;
          }

          .flying-santa-container.right-bottom-to-left-top {
            animation: flyRightBottomToLeftTop 7.5s linear forwards;
            transform: scaleX(-1);
          }

          .santa-gif {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
            transform: scaleX(-1);
          }
        `
      }} />
      <div
        ref={santaRef}
        className={`flying-santa-container ${direction}`}
      >
        <img
          src="/25dec/sfsf.gif"
          alt="Flying Santa"
          className="santa-gif"
        />
      </div>
    </>
  );
}

export default FlyingSanta2;
