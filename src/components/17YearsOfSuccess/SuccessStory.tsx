"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

function SuccessStory() {
  const message = "17 Years of Delivering Growth. ";
  const [dimensions, setDimensions] = useState({
    circleSize: 200,
    fontSize: 16,
    transformOrigin: 100,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 550) {
        setDimensions({
          circleSize: 100,
          fontSize: 8,
          transformOrigin: 50,
        });
      } else if (window.innerWidth <= 768) {
        setDimensions({
          circleSize: 150,
          fontSize: 12,
          transformOrigin: 75,
        });
      } else if (window.innerWidth >= 991 && window.innerWidth <= 1092) {
         setDimensions({
          circleSize: 150,
          fontSize: 12,
          transformOrigin: 75,
        });
      } else {
        setDimensions({
          circleSize: 200,
          fontSize: 20,
          transformOrigin: 100,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.circleContainer}>
      <div
        className={styles.circle}
        style={{
          height: `${dimensions.circleSize}px`,
          width: `${dimensions.circleSize}px`,
        }}
      >
        <div className={styles.rotatingText}>
          {message.split("").map((char, index) => (
            <span
              key={index}
              className={styles.character}
              style={{
                transform: `rotate(${index * (360 / message.length)}deg)`,
                animationDelay: `${index * 0.05}s`,
                fontSize: `${dimensions.fontSize}px`,
                transformOrigin: `0 ${dimensions.transformOrigin}px`,
                height: `${dimensions.transformOrigin}px`,
              }}
            >
              {char}
            </span>
          ))}
        </div>
        <div
          className={styles.centerContent}
          style={{
            width: `${dimensions.circleSize * 0.7}px`,
            height: `${dimensions.circleSize * 0.7}px`,
          }}
        >
          <div className={styles.animatedDiv}>
            <div className={styles.smallDiv}>
              <img src="/17_Years.png" alt="17 Years" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessStory;
