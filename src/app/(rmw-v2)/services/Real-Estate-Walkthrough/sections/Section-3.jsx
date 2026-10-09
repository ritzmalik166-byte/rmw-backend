"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { ReelVideoPlayer } from "./ReelVideoPlayer";
import { useVideoPosterFrame } from "./useVideoPosterFrame";

const RMW_VIDEO_BLOB =
  "https://otherassets.blob.core.windows.net/rmw/";

const blobVideo = (filename) => `${RMW_VIDEO_BLOB}${encodeURI(filename)}`;

const LANDSCAPE_VIDEOS = [
  { id: "landscape-1", src: blobVideo("Final Teaser (1).mp4"), title: "Final Teaser" },
  {
    id: "landscape-2",
    src: blobVideo("Laadli GovindVan 4k Walkthrough (1) (1).mp4"),
    title: "Laadli GovindVan 4K Walkthrough",
  },
  {
    id: "landscape-3",
    src: blobVideo("RMW STATE W 4K (1) (1) (1) (1) (1).mp4"),
    title: "RMW State Walkthrough",
  },
  {
    id: "landscape-4",
    src: blobVideo("Service reel 10th Hor (1).mp4"),
    title: "Service Reel Horizontal",
  },
  { id: "landscape-5", src: blobVideo("Service reel 3rd.mp4"), title: "Service Reel 3rd" },
  {
    id: "landscape-6",
    src: blobVideo("document_6327964334412537333.mp4"),
    title: "Walkthrough Showcase",
  },
];

const PORTRAIT_VIDEOS = [
  {
    id: "portrait-1",
    src: blobVideo("Edelstein Abode Service Reel (1).mp4"),
    title: "Edelstein Abode Service Reel",
  },
  {
    id: "portrait-2",
    src: blobVideo("Service reel 6th F.mp4"),
    title: "Service Reel 6th F",
  },
  {
    id: "portrait-3",
    src: blobVideo("Service reel revised.mp4"),
    title: "Service Reel Revised",
  },
  { id: "portrait-4", src: blobVideo("Service reel 5th.mp4"), title: "Service Reel 5th" },
];

function PlayIcon() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/90 sm:h-[80px] sm:w-[80px]">
      <svg
        viewBox="0 0 24 24"
        fill="white"
        className="h-6 w-6 sm:h-9 sm:w-9"
        aria-hidden
      >
        <path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l11.04-7.36a1 1 0 0 0 0-1.72L9.5 4.28a1 1 0 0 0-1.5.86z" />
      </svg>
    </span>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 sm:h-6 sm:w-6"
      aria-hidden
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VideoCard({ video, aspectClass, onOpen }) {
  const { videoRef, previewSrc, poster, thumbFailed } = useVideoPosterFrame(
    video.src,
    video.poster
  );

  return (
    <button
      type="button"
      className={`relative w-full cursor-pointer overflow-hidden bg-[#0a1128] text-left ${aspectClass}`}
      onClick={() => onOpen({ ...video, previewSrc })}
      aria-label={`Play ${video.title} in modal`}
    >
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          className="pointer-events-none h-full w-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          src={previewSrc}
          title={video.title}
          className="pointer-events-none h-full w-full object-cover"
          muted
          playsInline
          preload="none"
          tabIndex={-1}
        />
      )}
      {thumbFailed && !poster && (
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-3 text-center text-[12px] font-medium text-white/70 sm:text-[13px]"
          style={{ fontFamily: "MontserratMedium, Montserrat, sans-serif" }}
        >
          {video.title}
        </span>
      )}
      <span className="absolute inset-0 z-10 flex items-center justify-center bg-black/15 transition-colors hover:bg-black/25">
        <PlayIcon />
      </span>
    </button>
  );
}

function VideoModal({ video, isPortrait, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90" aria-hidden />

      <div
        className={`relative z-10 flex max-h-[90vh] w-full flex-col ${
          isPortrait ? "max-w-[min(100%,360px)]" : "max-w-5xl"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`relative overflow-hidden rounded-lg bg-black ${
            isPortrait ? "aspect-[9/16]" : "aspect-video"
          }`}
        >
          <ReelVideoPlayer
            key={video.src}
            src={video.src}
            previewSrc={video.previewSrc}
            title={video.title}
            objectFit="contain"
            className="h-full w-full"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-3 top-3 z-[100] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 transition-all hover:scale-110 hover:bg-white sm:right-4 sm:top-4 sm:h-12 sm:w-12"
            aria-label="Close video"
          >
            <CloseIcon />
          </button>
        </div>

        <p
          className="mt-3 text-center text-sm text-white/90 sm:text-base"
          style={{
            fontFamily: "MontserratRegular, Montserrat, sans-serif",
          }}
        >
          {video.title}
        </p>
      </div>
    </div>
  );
}

export default function Section3() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPortraitModal, setIsPortraitModal] = useState(false);

  const openVideo = useCallback((video, isPortrait) => {
    setActiveVideo(video);
    setIsPortraitModal(isPortrait);
    document.body.style.overflow = "hidden";
  }, []);

  const closeVideo = useCallback(() => {
    setActiveVideo(null);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    if (!activeVideo) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeVideo();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeVideo, closeVideo]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section className="w-full bg-white px-0 pb-[35px] sm:px-0 lg:pb-[70px]">
      <div className={`mx-auto w-full ${styles.containerWidth}`}>
        <h2
          className="mb-8 text-center text-[20px] font-normal leading-[36px] text-[#000000] sm:mb-10 sm:text-[28px] md:mb-10 md:text-[30px] md:leading-[42px] lg:mb-12"
          style={{
            fontFamily: "MontserratRegular, Montserrat, sans-serif",
            fontWeight: 400,
          }}
        >
          Walkthrough Showcase
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:gap-4 lg:gap-5 xl:gap-6">
          {LANDSCAPE_VIDEOS.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              aspectClass="aspect-video"
              onOpen={(v) => openVideo(v, false)}
            />
          ))}
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:gap-4 md:mt-4 md:grid-cols-2 md:gap-4 lg:mt-5 lg:grid-cols-4 lg:gap-5 xl:mt-6 xl:gap-6">
          {PORTRAIT_VIDEOS.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              aspectClass="aspect-[9/16]"
              onOpen={(v) => openVideo(v, true)}
            />
          ))}
        </div>
      </div>

      {activeVideo && (
        <VideoModal
          video={activeVideo}
          isPortrait={isPortraitModal}
          onClose={closeVideo}
        />
      )}
    </section>
  );
}
