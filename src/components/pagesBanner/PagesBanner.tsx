"use client";
import React, { useEffect, useState } from "react";
import styles from "./Pages.module.css";

interface VideoTextProps {
  headingTitle?: string;
  videoURL: string;
  mtP: string | number;
  mtS: string | number;
  sH: string | number;
}

export default function VideoText({
  headingTitle,
  videoURL,
  mtP,
  mtS,
  sH,
}: VideoTextProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Use matchMedia for better performance
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    
    const checkScreen = () => setIsMobile(mediaQuery.matches);
    checkScreen();

    // Use matchMedia listener instead of resize events
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Optimized video loading for better LCP
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    // Use requestIdleCallback for better performance
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(() => {
        setShouldLoadVideo(true);
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        setShouldLoadVideo(true);
      }, 0);
    }
  }, []);

  return (
    <div
      className={styles.wrapper}
      style={{
        marginTop: isMobile ? mtS : mtP,
        height: isMobile ? sH : "auto",
      }}
    >
      {shouldLoadVideo && (
        <video
          className={styles.video}
          src={videoURL}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Background pattern video"
          poster=""
          onLoadStart={() => {
            // Optimize video loading
            if (typeof window !== 'undefined') {
              requestIdleCallback(() => {
                // Additional optimizations when video starts loading
              });
            }
          }}
        />
      )}
      <h1 className={styles.text}>{headingTitle}</h1>
    </div>
  );
}
