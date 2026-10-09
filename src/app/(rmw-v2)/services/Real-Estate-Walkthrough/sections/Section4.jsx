"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styles from "./page.module.css";
import accordionStyles from "./Section4.module.css";
import { ReelVideoPlayer } from "./ReelVideoPlayer";
import { useVideoPosterFrame } from "./useVideoPosterFrame";

const RMW_VIDEO_BLOB =
  "https://otherassets.blob.core.windows.net/rmw/";

const blobVideo = (filename) => `${RMW_VIDEO_BLOB}${encodeURI(filename)}`;

const EXPAND_MS = 1550;

const PROPERTY_TYPES = [
  {
    icon: "/varun.icon/Residential.svg",
    label: "Residential Apartments",
  },
  { icon: "/varun.icon/Villas.svg", label: "Villas & Bungalows" },
  { icon: "/varun.icon/Commercial.svg", label: "Commercial Towers" },
  { icon: "/varun.icon/Townships.svg", label: "Townships" },
];

const SERVICES = [
  {
    id: "01",
    title: "3D Architectural Walkthrough Animation",
    description:
      "A fully animated cinematic video showing you around the development, from the outside of the building, through to the lobby and individual apartments, leisure facilities, grounds. The walkthrough animations are photoreal lit, natural camera movement with ambient sound for a full, emotional, walkthrough.",
    video: blobVideo("Laadli GovindVan 4k Walkthrough (1) (1).mp4"),
    propertyTypes: PROPERTY_TYPES,
  },
  {
    id: "02",
    title: "3D Aerial Flythrough Animation",
    description:
      "A fully animated cinematic video showing you around the development, from the outside of the building, through to the lobby and individual apartments, leisure facilities, grounds. The walkthrough animations are photoreal lit, natural camera movement with ambient sound for a full, emotional, walkthrough.",
    video: blobVideo("Final Teaser (1).mp4"),
    propertyTypes: PROPERTY_TYPES,
  },
  {
    id: "03",
    title: "Interior Walkthrough Animation",
    description:
      "A fully animated cinematic video showing you around the development, from the outside of the building, through to the lobby and individual apartments, leisure facilities, grounds. The walkthrough animations are photoreal lit, natural camera movement with ambient sound for a full, emotional, walkthrough.",
    video: blobVideo("Service reel 10th Hor (1).mp4"),
    propertyTypes: PROPERTY_TYPES,
  },
];

function getExpandedRect() {
  const padding = 32;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let width = Math.min(vw - padding * 2, 1024);
  let height = (width * 9) / 16;

  if (height > vh - padding * 2) {
    height = vh - padding * 2;
    width = (height * 16) / 9;
  }

  return {
    left: (vw - width) / 2,
    top: (vh - height) / 2,
    width,
    height,
  };
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
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

function PlayShowreelOverlay({ onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-3 bg-black/20 transition-colors hover:bg-black/30"
      aria-label="Play showreel in expanded view"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/90 sm:h-[72px] sm:w-[72px]">
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="h-7 w-7 sm:h-8 sm:w-8"
          aria-hidden
        >
          <path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l11.04-7.36a1 1 0 0 0 0-1.72L9.5 4.28a1 1 0 0 0-1.5.86z" />
        </svg>
      </span>
      <span
        className="text-[14px] font-medium text-white sm:text-[16px]"
        style={{ fontFamily: "MontserratMedium, Montserrat, sans-serif" }}
      >
        Play Showreel
      </span>
    </button>
  );
}

function ShowreelVideoModal({ item, originRect, onClosed }) {
  const [expanded, setExpanded] = useState(false);
  const [targetRect, setTargetRect] = useState(null);
  const [mounted, setMounted] = useState(false);
  const closeTimerRef = useRef(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useLayoutEffect(() => {
    setTargetRect(getExpandedRect());
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setExpanded(true));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (expanded) setTargetRect(getExpandedRect());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [expanded]);

  const beginClose = useCallback(() => {
    clearCloseTimer();
    setExpanded(false);
    closeTimerRef.current = window.setTimeout(onClosed, EXPAND_MS);
  }, [onClosed]);

  const closeImmediately = useCallback(() => {
    clearCloseTimer();
    onClosed();
  }, [onClosed]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeImmediately();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeImmediately]);

  useEffect(() => () => clearCloseTimer(), []);

  if (!mounted || !originRect) return null;

  const current = expanded && targetRect ? targetRect : originRect;

  return createPortal(
    <>
      <div
        className={`${accordionStyles.videoModalBackdrop} ${
          expanded
            ? accordionStyles.videoModalBackdropVisible
            : accordionStyles.videoModalBackdropHidden
        }`}
        aria-hidden
        onClick={beginClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        className={`${accordionStyles.videoModalPlayer} ${
          expanded ? accordionStyles.videoModalPlayerExpanded : ""
        }`}
        style={{
          left: current.left,
          top: current.top,
          width: current.width,
          height: current.height,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {expanded ? (
          <ReelVideoPlayer
            key={item.video}
            src={item.video}
            previewSrc={item.previewSrc}
            title={item.title}
            objectFit="contain"
            showControls
            className="h-full w-full"
          />
        ) : (
          <video
            src={item.previewSrc || item.video}
            title={item.title}
            className="h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
          />
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            closeImmediately();
          }}
          className={`${accordionStyles.videoModalClose} ${
            expanded ? accordionStyles.videoModalCloseVisible : ""
          }`}
          aria-label="Close video"
        >
          <CloseIcon />
        </button>
      </div>
    </>,
    document.body
  );
}

function RichServicePanel({ item, onClose, onOpenVideo }) {
  const videoContainerRef = useRef(null);
  const { videoRef: previewVideoRef, previewSrc } = useVideoPosterFrame(item.video);

  const handleOpenVideo = () => {
    const el = videoContainerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    onOpenVideo(
      { ...item, previewSrc },
      {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      }
    );
  };

  return (
    <div className="pt-5 pb-8 sm:pt-6  md:pb-12 ">
      <div
        className={`flex w-full flex-col-reverse  items-center justify-between gap-6 md:flex-row md:items-stretch ${accordionStyles.row}`}
      >
        <div className={`min-w-0 w-full md:w-[calc(100%-477px)] ${accordionStyles.leftCol}`}>
          <span
            className="block text-[16px] font-medium leading-none text-[#111111] sm:text-[18px]"
            style={{
              fontFamily: "MontserratMedium, Montserrat, sans-serif",
            }}
          >
            {item.id}
          </span>

          <h3
            className="mt-3 max-w-[500px] text-[22px] font-semibold leading-[32px] text-[#111111] sm:mt-4 sm:text-[26px] sm:leading-[38px] md:text-[30px] md:leading-[44px]"
            style={{
              fontFamily: "MontserratSemiBold, Montserrat, sans-serif",
              fontWeight: 600,
            }}
          >
            {item.title}
          </h3>

          <p
            className="mt-5 max-w-full text-[15px] leading-[26px] text-[#111111] sm:mt-6 sm:text-[16px] sm:leading-[28px] md:mt-8"
            style={{
              fontFamily: "OpenSansRegular, Open Sans, sans-serif",
              fontWeight: 400,
            }}
          >
            {item.description}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:mt-10 sm:grid-cols-4 sm:gap-x-4 md:mt-6">
            {item.propertyTypes.map((type) => (
              <div
                key={type.label}
                className="flex flex-col items-center text-center"
              >
                <Image
                  src={type.icon}
                  alt={`${type.label} – property type icon`}
                  title={type.label}
                  width={48}
                  height={48}
                  className="h-10 w-10 sm:h-12 sm:w-12"
                />
                <p
                  className="mt-3 text-[11px] font-semibold leading-[16px] text-[#C99237] sm:text-[14px] sm:leading-[20px]"
                  style={{
                    fontFamily: "OpenSansSemiBold, Open Sans, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {type.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={`h-auto w-full shrink-0 md:w-[477px] ${accordionStyles.imgCol}`}>
          <div className="mb-3 flex justify-end sm:mb-4">
            <button
              type="button"
              onClick={onClose}
              className="flex shrink-0  items-center justify-center"
              aria-label={`Close ${item.title}`}
            >
              <Image
                src="/varun.icon/cross-content-marketing.svg"
                alt="Close service details"
                title={`Close ${item.title}`}
                width={28}
                height={28}
                className="h-6 w-6 sm:h-7 sm:w-7"
              />
            </button>
          </div>
          <div
            ref={videoContainerRef}
            className="relative w-full overflow-hidden bg-[#0a1128]"
          >
            <video
              ref={previewVideoRef}
              src={previewSrc}
              className="block h-auto w-full object-cover"
              muted
              playsInline
              preload="none"
              tabIndex={-1}
            />
            <PlayShowreelOverlay onOpen={handleOpenVideo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Section4() {
  const [openId, setOpenId] = useState("01");
  const [videoModal, setVideoModal] = useState(null);

  const closeVideoModal = useCallback(() => {
    setVideoModal(null);
    document.body.style.overflow = "";
  }, []);

  const openVideoModal = useCallback((item, originRect) => {
    setVideoModal({ item, originRect });
    document.body.style.overflow = "hidden";
  }, []);

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
    closeVideoModal();
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section
      className={`flex w-full items-center justify-center bg-white pb-[35px] lg:pb-[70px] ${accordionStyles.root}`}
    >
      <div className={`w-full ${styles.containerWidth} ${accordionStyles.container}`}>
        <h2
          className="mb-8 text-center text-[32px] font-semibold leading-[40px] text-[#111111] sm:mb-10 sm:text-[40px] md:mb-12 md:text-[45px] md:leading-[54px]"
          style={{
            fontFamily: "MontserratSemiBold, Montserrat, sans-serif",
            fontWeight: 600,
          }}
        >
          Our Services
        </h2>

        <div className="border-t border-[#222222]">
          {SERVICES.map((item) => {
            const isOpen = openId === item.id;
            const hasRichContent = Boolean(item.video && item.propertyTypes);

            return (
              <div key={item.id} className="border-b border-[#22222]">
                {!(isOpen && hasRichContent) && (
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full items-start cursor-pointer justify-between gap-4 py-5 text-left sm:gap-6 sm:py-6 md:py-7"
                    aria-expanded={isOpen}
                  >
                    <div className="flex min-w-0 flex-1 items-center">
                      <h3
                        className="min-w-0 text-[18px] font-semibold leading-[26px] text-[#111111] sm:text-[20px] sm:leading-[28px] lg:text-[22px]"
                        style={{
                          fontFamily: "MontserratSemiBold, Montserrat, sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <span className="mt-1 flex shrink-0 items-center justify-center">
                      {isOpen ? (
                        <Image
                          src="/varun.icon/cross-content-marketing.svg"
                          alt="Collapse service section"
                          title={`Close ${item.title}`}
                          width={28}
                          height={28}
                          className="h-6 w-6 sm:h-7 sm:w-7"
                        />
                      ) : (
                        <span
                          className="select-none text-[28px] font-light leading-none text-[#6E6E6E] sm:text-[32px]"
                          aria-hidden
                        >
                          +
                        </span>
                      )}
                    </span>
                  </button>
                )}

                <div
                  className={`${accordionStyles.accordionContent} ${
                    isOpen
                      ? accordionStyles.accordionContentOpen
                      : accordionStyles.accordionContentClosed
                  }`}
                >
                  {isOpen && hasRichContent ? (
                    <RichServicePanel
                      item={item}
                      onClose={() => toggleItem(item.id)}
                      onOpenVideo={openVideoModal}
                    />
                  ) : (
                    isOpen &&
                    item.description && (
                      <div className="pb-6 sm:pb-8">
                        <p
                          className="text-[15px] leading-[26px] text-[#111111] sm:text-[16px] sm:leading-[28px]"
                          style={{
                            fontFamily: "OpenSansRegular, Open Sans, sans-serif",
                          }}
                        >
                          {item.description}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {videoModal && (
        <ShowreelVideoModal
          item={videoModal.item}
          originRect={videoModal.originRect}
          onClosed={closeVideoModal}
        />
      )}
    </section>
  );
}
