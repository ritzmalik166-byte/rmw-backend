"use client";

import React, { useEffect, useRef, useState, Suspense, memo } from "react";

// Memoized story data to prevent unnecessary re-renders
const stories = [
  {
    id: 1,
    slug: "how-money-is-made",
    title: "How money is made",
    slides: [
      {
        type: "image",
        text: "Money is made by printing presses in secure facilities.",
        image: "/storytestimg.jpg",
      },
      {
        type: "video",
        text: "Modern currency includes watermarks, threads, and holograms.",
        image: "/storytestvid.mp4",
      },
    ],
  },
  {
    id: 2,
    slug: "burger-sisters-of-kenya",
    title: "The burger sisters of Kenya",
    slides: [
      {
        type: "video",
        text: "Meet two sisters who launched Kenya's best burger spot.",
        image: "/slides/burger1.jpg",
      },
    ],
  },
  {
    id: 3,
    slug: "fashion-bright-future",
    title: "11 designers who represent fashion's bright future",
    slides: [
      {
        type: "image",
        text: "These young designers are redefining fashion today.",
        image: "/slides/fashion1.jpg",
      },
    ],
  },
];

// Memoized story player component for better performance
const StoryPlayerComponent = memo(({ story }: { story: typeof stories[0] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);
  const currentSlide = story?.slides?.[currentIndex];

  // Optimized video handling
  useEffect(() => {
    if (!currentSlide) return;

    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.pause();
    }

    if (currentSlide.type === "video" && mainVideoRef.current) {
      const video = mainVideoRef.current;

      const onTimeUpdate = () => {
        if (video.currentTime >= 60) {
          video.pause();
        }
      };

      video.addEventListener("timeupdate", onTimeUpdate);

      return () => {
        video.removeEventListener("timeupdate", onTimeUpdate);
      };
    }
  }, [currentSlide]);

  // Auto-advance with optimized timer
  useEffect(() => {
    if (!isPaused) {
      const timer = setTimeout(() => {
        goToNext();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isPaused]);

  // Sync video state
  useEffect(() => {
    if (!currentSlide) return;
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [isMuted, isPaused, currentSlide]);

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? story.slides.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % story.slides.length);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: currentSlide.text,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      alert("Share not supported in this browser.");
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const togglePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused((prev) => !prev);
  };

  if (!story || !currentSlide) {
    return (
      <div 
        className="d-flex justify-content-center align-items-center" 
        style={{ 
          minHeight: '100vh',
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite'
        }}
      >
        <style jsx>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      className="position-relative d-flex align-items-center justify-content-center vh-100 vw-100 text-white overflow-hidden"
      onClick={goToNext}
      style={{
        cursor: "pointer",
        zIndex: 10000,
        padding: 0,
        margin: 0,
        border: "none",
      }}
    >
      {/* Background media */}
      {currentSlide.type === "video" ? (
        <video
          ref={backgroundVideoRef}
          src={currentSlide.image}
          muted
          playsInline
          preload="metadata"
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            objectFit: "cover",
            filter: "blur(20px) brightness(0.6)",
            transform: "scale(1.08)",
            zIndex: 0,
            border: "none",
            outline: "none",
            boxShadow: "none",
          }}
        />
      ) : (
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${currentSlide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px) brightness(0.6)",
            transform: "scale(1.08)",
            zIndex: 0,
          }}
        />
      )}

      {/* Main content */}
      <div
        className="position-relative z-2 p-3 rounded-4 shadow-lg text-white"
        style={{
          width: "320px",
          height: "570px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          overflow: "hidden",
        }}
      >
        {/* Controls */}
        <div
          className="position-absolute top-2 end-0 d-flex gap-2 p-3"
          style={{ zIndex: 20 }}
        >
          <button
            onClick={toggleMute}
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "28px",
              height: "28px",
              background: "rgba(100, 100, 100, 0.4)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#fff",
              transition: "all 0.3s ease",
            }}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>

          <button
            onClick={togglePause}
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "28px",
              height: "28px",
              background: "rgba(100, 100, 100, 0.4)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#fff",
              transition: "all 0.3s ease",
            }}
          >
            {isPaused ? "▶️" : "⏸️"}
          </button>

          <button
            onClick={handleShare}
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "28px",
              height: "28px",
              background: "rgba(100, 100, 100, 0.4)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#fff",
              transition: "all 0.3s ease",
            }}
          >
            📤
          </button>
        </div>

        {/* Main media */}
        {currentSlide.type === "video" ? (
          <video
            ref={(el) => {
              mainVideoRef.current = el;
              videoRef.current = el;
            }}
            src={currentSlide.image}
            autoPlay
            muted
            playsInline
            preload="metadata"
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ objectFit: "cover", zIndex: 0 }}
          />
        ) : (
          <img
            src={currentSlide.image}
            alt="slide background"
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ objectFit: "cover", zIndex: 0 }}
            loading="lazy"
          />
        )}

        {/* Progress indicators */}
        <div className="d-flex w-100 mb-3" style={{ gap: "2px" }}>
          {story.slides.map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-pill position-relative"
              style={{
                flex: 1,
                height: "2px",
                backgroundColor: "rgba(255,255,255,0.3)",
                overflow: "hidden",
                borderRadius: "30%"
              }}
            >
              <div
                className="position-absolute top-0 start-0 h-100 bg-white"
                style={{
                  width: i < currentIndex ? "100%" : i === currentIndex ? "100%" : "0%",
                  animation: i === currentIndex ? "fillProgress 10s linear forwards" : "none",
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Text content */}
        <div className="position-relative z-2 h-100 d-flex flex-column justify-content-end">
          <div className="text-white fw-bold fs-6 mb-2">
            {currentSlide.text}
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        className="position-absolute rounded-circle border-0 d-flex align-items-center justify-content-center"
        style={{
          left: "calc(50% - 210px)",
          width: "40px",
          height: "40px",
          backgroundColor: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(6px)",
          zIndex: 10,
        }}
        onClick={(e) => {
          e.stopPropagation();
          goToPrev();
        }}
      >
        ←
      </button>

      <button
        className="position-absolute rounded-circle border-0 d-flex align-items-center justify-content-center"
        style={{
          right: "calc(50% - 210px)",
          width: "40px",
          height: "40px",
          backgroundColor: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(6px)",
          zIndex: 10,
        }}
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
      >
        →
      </button>
    </div>
  );
});

StoryPlayerComponent.displayName = "StoryPlayerComponent";

export default function StoryPage({ params }: { params: { storyId: string } }) {
  const story = stories.find((s) => s.slug === params.storyId);

  return (
    <>
      {/* Preload critical resources for better LCP */}
      <link rel="preload" title="Story Image" href="/storytestimg.jpg" as="image" />
      <link rel="preload" title="Story Video" href="/storytestvid.mp4" as="video" type="video/mp4" />
      
      <Suspense fallback={
        <div 
          className="d-flex justify-content-center align-items-center" 
          style={{ 
            minHeight: '100vh',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        >
          <style jsx>{`
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
          `}</style>
        </div>
      }>
        <StoryPlayerComponent story={story!} />
      </Suspense>
    </>
  );
}
