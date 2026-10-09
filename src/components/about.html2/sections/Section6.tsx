"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import s6 from "./Section6.module.css";

function Section6() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoType, setVideoType] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const determineVideoType = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVideoType("desktop");
      } else if (width >= 768) {
        setVideoType("tablet");
      } else {
        setVideoType("mobile");
      }
    };

    determineVideoType();
    window.addEventListener("resize", determineVideoType);
    return () => window.removeEventListener("resize", determineVideoType);
  }, []);

  const handlePlayClick = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setVideoType("desktop");
    } else if (width >= 768) {
      setVideoType("tablet");
    } else {
      setVideoType("mobile");
    }
    setIsVideoOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
    document.body.style.overflow = "unset";
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const getVideoSource = () => {
    switch (videoType) {
      case "desktop":
        return "/new-page/dekstop-vd.mp4";
      case "tablet":
        return "/new-page/tab-vd.mp4";
      case "mobile":
        return "/new-page/mobile-vd.mp4";
      default:
        return "/new-page/dekstop-vd.mp4";
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <section className={`flex w-full items-center justify-center pb-[40px] xl:pb-[70px] ${s6.root}`}>
      <div className={`w-full ${styles.containerWidth} ${s6.container}`}>
      <div className={`relative isolate h-auto w-full min-w-0 max-w-full overflow-hidden sm:h-[300px] md:h-[350px] lg:h-[426px] ${s6.frame}`}>
  <div className="relative z-0 w-full sm:hidden">
    <Image
      src="/varunimage/team-bg3.jpg"
      alt="Ritz Media World – team video"
      title="Ritz Media World – team video"
      width={596}
      height={290}
      className="h-auto w-full max-w-full"
      sizes="100vw"
    />
  </div>

  <div className="absolute inset-0 z-0 hidden min-h-0 min-w-0 overflow-hidden sm:block">
    <Image
      src="/home-v3/s2/team-bg3.png"
      alt="Ritz Media World – team video"
      title="Ritz Media World – team video"
      fill
      className="h-auto object-center md:h-full"
      sizes="(min-width: 1370px) 1300px, 95vw"
    />
  </div>

  <div
    role="button"
    tabIndex={0}
    onClick={handlePlayClick}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handlePlayClick();
      }
    }}
    aria-label="Play Ritz Media World agency overview video"
    className={`absolute left-1/2 top-1/2 z-20 flex h-[44px] w-[44px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#FFFFFF] transition-transform hover:scale-110 sm:h-[50px] sm:w-[50px] lg:h-[54px] lg:w-[54px] ${s6.playBtn}`}
  >
    <svg
      width="10"
      height="11"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-[9px] w-[8px] sm:h-[11px] sm:w-[10px] ${s6.playIcon}`}
    >
      <path
        d="M9 4.46558C9.66667 4.85048 9.66667 5.81273 9 6.19763L1.5 10.5278C0.833332 10.9127 -5.28905e-07 10.4315 -4.95256e-07 9.66173L-1.16704e-07 1.00148C-8.30548e-08 0.231676 0.833333 -0.249449 1.5 0.135451L9 4.46558Z"
        fill="black"
      />
    </svg>
  </div>

  <div className="pointer-events-none absolute inset-0 z-10 bg-[#00000051]" />
</div>
      </div>

      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          onClick={handleCloseVideo}
        >
          <div className="absolute inset-0 bg-black bg-opacity-90" />
          <div
            className="relative z-10 flex h-[90vh] w-[90vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseVideo}
              className="absolute right-4 top-4 z-20 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-white bg-opacity-90 transition-all hover:scale-110 hover:bg-opacity-100 sm:right-6 sm:top-6 sm:h-[48px] sm:w-[48px]"
              aria-label="Close video"
              type="button"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[20px] w-[20px] sm:h-[24px] sm:w-[24px]"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <video
              ref={videoRef}
              src={getVideoSource()}
              className="h-full w-full object-contain"
              title="Ritz Media World – agency overview video"
              aria-label="Ritz Media World agency overview video"
              autoPlay
              controls
              playsInline
              key={videoType}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Section6;
