"use client";

import React from "react";
import "./LoadingLinesAndDots.css";

const SECTOR_COUNT = 60;
const RADIUS_EM = 4.25;

export function LoadingLinesAndDots({ className = "" }: { className?: string }) {
  const sectors: React.ReactNode[] = [];

  for (let i = 0; i < SECTOR_COUNT; i++) {
    const fraction = i / SECTOR_COUNT;
    const sectorStyle: React.CSSProperties = {
      animationDelay: `calc(var(--anim-dur) * ${-fraction})`,
      transform: `rotate(${-fraction * 360}deg) translateY(${RADIUS_EM}em)`,
    };

    sectors.push(
      <div
        key={`sector-${i + 1}`}
        className="loadingLinesAndDots__sector"
        style={sectorStyle}
      >
        <div className="loadingLinesAndDots__line" />
        <div className="loadingLinesAndDots__dot" />
        <div className="loadingLinesAndDots__dot" />
      </div>
    );
  }

  return (
    <div
      className={`loadingLinesAndDots ${className}`.trim()}
      role="status"
      aria-label="Loading"
    >
      {sectors}
    </div>
  );
}

export default LoadingLinesAndDots;
