"use client";
import React, { useRef, useState, useEffect } from "react";

function S51() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSource, setVideoSource] = useState("/new-page/dekstop-vd.mp4");
  const [posterImage, setPosterImage] = useState<string | null>(null);

  
  // Capture frame from video at 3 seconds to use as poster
  useEffect(() => {
    const capturePosterFrame = () => {
      if (!videoRef.current) return;

      const video = videoRef.current;
      let isCaptured = false;
      
      const handleLoadedMetadata = () => {
        // Ensure video has valid dimensions
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          // Seek to 3 seconds (or max duration if video is shorter)
          const seekTime = Math.min(2, video.duration - 0.1);
          video.currentTime = seekTime;
        }
      };

      const handleSeeked = () => {
        if (isCaptured) return;
        isCaptured = true;

        // Create canvas to capture the frame
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext("2d");
        if (ctx && canvas.width > 0 && canvas.height > 0) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          // Convert to data URL and set as poster
          const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
          setPosterImage(dataUrl);
          // Reset video to beginning
          video.currentTime = 0;
        }
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("seeked", handleSeeked);

      // Set preload to metadata to ensure we can capture the frame
      video.preload = "metadata";
      // Load the video to trigger metadata load
      video.load();

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("seeked", handleSeeked);
      };
    };

    // Small delay to ensure video element is ready
    const timer = setTimeout(capturePosterFrame, 100);
    return () => clearTimeout(timer);
  }, [videoSource]);
  
  // Detect screen size for responsive video
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVideoSource("/nuv-video.mp4");
      } else if (width >= 768 && width < 1024) {
        setVideoSource("/nuv-video.mp4");
      } else {
        setVideoSource("/nuv-video.mp4");
      }
      
      // Reload video when source changes
      if (videoRef.current) {
        videoRef.current.load();
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle play button click
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Stop video when clicking anywhere on website (except the play button)
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't stop if clicking on the play button or its children
      if (playButtonRef.current && playButtonRef.current.contains(target)) {
        return;
      }
      
      // Don't stop if clicking on the video element itself
      if (videoRef.current && videoRef.current.contains(target)) {
        return;
      }
      
      if (videoRef.current && isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    if (isPlaying) {
      document.addEventListener("click", handleDocumentClick);
      return () => document.removeEventListener("click", handleDocumentClick);
    }
  }, [isPlaying]);

  // Handle section click to stop video
  const handleSectionClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't stop if clicking on the play button or its children
    if (playButtonRef.current && playButtonRef.current.contains(target)) {
      return;
    }
    
    // Don't stop if clicking on the video element itself
    if (videoRef.current && videoRef.current.contains(target)) {
      return;
    }
    
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  

  return (
    <section 
      className="w-full overflow-hidden overflow-x-hidden overflow-y-hidden min-h-[664px] lg:min-h-screen flex justify-center items-center"
      onClick={handleSectionClick}
    >
      <div className="w-full h-full relative max-w-full overflow-x-hidden overflow-y-hidden">
        {/* Poster Image Overlay - Shows when video is not playing */}
        {!isPlaying && posterImage && (
          <img
            src={'/nuv-banner.jpg'}
            alt="Video poster"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
          />
        )}

        {/* Video Background */}
        <video
          ref={videoRef}
          className={`w-full h-full object-cover max-w-full ${!isPlaying ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          loop
          muted
          playsInline
          preload="metadata"
          poster={'/nuv-banner.jpg'}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          style={{ zIndex: isPlaying ? 2 : 0, pointerEvents: isPlaying ? 'auto' : 'none' }}
        >
          <source src={videoSource} type="video/mp4" />
        </video>

        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/30" style={{ zIndex: 3 }} />

        {/* Content - Hide when video is playing */}
        {!isPlaying && (
          <div className="absolute top-1/2 transform -translate-y-1/2 inset-0 flex flex-col items-center px-4 py-6 z-10 transition-opacity duration-300 overflow-x-hidden overflow-y-hidden max-w-full max-h-full">
            <div className="flex flex-col items-center justify-center w-full h-full max-w-full max-h-full">       
              {/* Custom Play Button */}
              <button
                ref={playButtonRef}
                onClick={handlePlayClick}
                className="pulse-button w-[88px] h-[88px] sm:w-[110px] sm:h-[110px] rounded-full cursor-pointer flex items-center justify-center transition-opacity hover:opacity-90 focus:outline-none aspect-square"
                aria-label="Play video"
              >
                {/* Pulsing background behind border */}
                <div className="pulse-border-bg" />
                
                {/* Outer white border */}
                <div className="absolute inset-0 rounded-full z-20" />
                
                {/* Play Icon */}
                <svg
                  className="relative z-30 w-[30%] h-[30%] text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default S51;
