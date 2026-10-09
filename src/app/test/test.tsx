"use client"

import React, { useEffect, useState } from 'react';

const ResponsiveVideoTextWithClamp = () => {
  // State for svgWidth and svgHeight based on window width
  const [svgSize, setSvgSize] = useState({ width: 320, height: 280 });

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 628) {
        // Width less than 628: width 300, height 280
        setSvgSize({ width: 320, height: 280 });
      } else if (w >= 628 && w < 1024) {
        // Width between 628 and 1024: width 628, height 300
        setSvgSize({ width: 628, height: 300 });
      } else {
        // Width 1024 and above: width 800, height 350
        setSvgSize({ width: 800, height: 350 });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const { width: svgWidth, height: svgHeight } = svgSize;

  // Updated clamp: min 3rem (~48px), max 6rem (96px), scaling with vw
  // Approximating vw based on full window width; this should still work well
  const fontSizeClamp = 'clamp(2.8rem, 8vw, 6rem)';

  // vertical center to place text
  const textY = svgHeight / 2;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: svgWidth,
        margin: '0 auto',
        position: 'relative',
        height: svgHeight,
        textAlign: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
      }}
    >
      {/* SVG mask is hidden but defines the mask */}
      <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ width: '100%', height: 'auto', aspectRatio: `${svgWidth} / ${svgHeight}` }}
      >
        <defs>
          <mask
            id="video-text-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={svgWidth}
            height={svgHeight}
          >
            <rect width={svgWidth} height={svgHeight} fill="black" />
            <text
              x={svgWidth / 2} // center horizontally at half width
              y={textY}
              dominantBaseline="middle"
              textAnchor="middle"
              fill="white"
              fontFamily="Arial, sans-serif"
              fontWeight="bold"
              style={{
                fontSize: fontSizeClamp,
                userSelect: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              CONTACT US
            </text>
          </mask>
        </defs>
      </svg>

      <video
        src="/videos/bg_pattern.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',

          // apply the SVG mask here
          maskImage: 'url(#video-text-mask)',
          WebkitMaskImage: 'url(#video-text-mask)',

          // ensure mask fits container
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',

          // Use contain so mask scales proportionally, avoiding shift
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
        }}
      />
    </div>
  );
};

export default ResponsiveVideoTextWithClamp;
