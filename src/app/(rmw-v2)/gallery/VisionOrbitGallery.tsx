"use client";

import Image from "next/image";
import { useGesture } from "@use-gesture/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY_IMAGE_SRCS as GALLERY_IMAGES } from "./gallery-images";
import "./vision-orbit-gallery.css";

const CARD_ANGLE = 48;
const CARD_SPACING_EXTRA = 56;
const ALL_PHOTOS_ANIM_MS = 480;
const DRAG_THRESHOLD = 0.22;
const WHEEL_THRESHOLD = 70;
const WHEEL_COOLDOWN_MS = 520;
const BOOT_PRELOAD_RADIUS = 3;
const MAX_BOOT_WAIT_MS = 900;
const PRELOAD_CONCURRENCY = 4;
const PARTICLE_COUNT = 10;

function preloadOne(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

async function preloadImages(
  sources: readonly string[],
  concurrency = PRELOAD_CONCURRENCY
): Promise<void> {
  if (sources.length === 0) return;
  const queue = [...sources];
  const workers = Array.from(
    { length: Math.min(concurrency, queue.length) },
    async () => {
      while (queue.length > 0) {
        const src = queue.shift();
        if (src) await preloadOne(src);
      }
    }
  );
  await Promise.all(workers);
}

function criticalSources(centerIndex: number, total: number): string[] {
  const urls = new Set<string>();
  for (let d = -BOOT_PRELOAD_RADIUS; d <= BOOT_PRELOAD_RADIUS; d++) {
    const i = ((centerIndex + d) % total + total) % total;
    urls.add(GALLERY_IMAGES[i]);
  }
  return [...urls];
}

async function preloadForBoot(): Promise<void> {
  const critical = criticalSources(0, GALLERY_IMAGES.length);
  await Promise.race([
    preloadImages(critical, PRELOAD_CONCURRENCY),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, MAX_BOOT_WAIT_MS);
    }),
  ]);
}

function WindowsLoadingDots() {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-5"
      role="status"
      aria-live="polite"
      aria-label="Loading gallery"
    >
      <div className="flex items-end gap-[5px]" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="carousel-3d-loader-dot h-2 w-2 rounded-full bg-[#0078D4] sm:h-2.5 sm:w-2.5"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
      <p className="text-sm text-white/55">Loading gallery</p>
    </div>
  );
}

function shortestOffset(i: number, center: number, count: number) {
  let offset = i - center;
  if (offset > count / 2) offset -= count;
  if (offset < -count / 2) offset += count;
  return offset;
}

function getCardStyle(offset: number, gapPx: number) {
  const abs = Math.abs(offset);
  const x = offset * gapPx;
  const y = abs * abs * 12;
  const z = abs < 0.45 ? 240 - abs * 260 : Math.max(-620, -abs * 190);
  const rotateY = offset * -CARD_ANGLE;
  const rotateX = abs * 2.5;
  const scale = abs < 0.08 ? 1.04 : Math.max(0.74, 1 - abs * 0.1);
  const opacity = abs > 3.2 ? 0 : Math.max(0.3, 1 - abs * 0.16);
  const zIndex = Math.round(42 - abs * 8 + (abs < 0.4 ? 14 : 0));

  return {
    transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`,
    opacity,
    zIndex,
    pointerEvents: (abs < 1.6 ? "auto" : "none") as React.CSSProperties["pointerEvents"],
    className: abs < 0.38 ? "is-center" : "",
  };
}

function imageLabelFromPath(path: string) {
  const name = path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "Gallery photo";
  return name.replace(/[_-]+/g, " ").trim();
}

export default function VisionOrbitGallery() {
  const count = GALLERY_IMAGES.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [allPhotosOpen, setAllPhotosOpen] = useState(false);
  const [allPhotosClosing, setAllPhotosClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [gapPx, setGapPx] = useState(280);
  const [portalReady, setPortalReady] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const wheelAccumRef = useRef(0);
  const wheelLockedRef = useRef(false);
  const movedRef = useRef(false);
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2.6,
        delay: Math.random() * 10,
        dur: 7 + Math.random() * 10,
      })),
    []
  );

  activeRef.current = activeIndex;
  dragOffsetRef.current = dragOffset;

  const centerOffset = activeIndex + dragOffset;

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    preloadForBoot().then(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const critical = new Set(criticalSources(0, count));
    const rest = GALLERY_IMAGES.filter((src) => !critical.has(src));
    const run = () => {
      void preloadImages(rest, 3);
    };
    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(run, { timeout: 5000 });
      return () => window.cancelIdleCallback(idleId);
    }
    const timeoutId = window.setTimeout(run, 400);
    return () => window.clearTimeout(timeoutId);
  }, [isLoading, count]);

  useEffect(() => {
    if (isLoading) return;
    void preloadImages(criticalSources(activeIndex, count), 3);
  }, [activeIndex, isLoading, count]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const syncGap = () => {
      const w = el.clientWidth;
      const cardW = Math.min(360, Math.max(240, w * 0.42));
      setGapPx(Math.min(440, Math.max(300, cardW + CARD_SPACING_EXTRA)));
    };
    syncGap();
    const ro = new ResizeObserver(syncGap);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isLoading]);

  const snapTo = useCallback((index: number) => {
    setActiveIndex(((index % count) + count) % count);
    setDragOffset(0);
    dragOffsetRef.current = 0;
  }, [count]);

  const go = useCallback(
    (dir: 1 | -1) => {
      snapTo(activeRef.current + dir);
    },
    [snapTo]
  );

  const openModal = useCallback(
    (index: number) => {
      const i = ((index % count) + count) % count;
      setModalIndex(i);
      snapTo(i);
    },
    [count, snapTo]
  );

  const closeModal = useCallback(() => setModalIndex(null), []);

  const openAllPhotos = useCallback(() => {
    setAllPhotosClosing(false);
    setAllPhotosOpen(true);
  }, []);

  const closeAllPhotos = useCallback(() => {
    if (!allPhotosOpen || allPhotosClosing) return;
    setAllPhotosClosing(true);
    window.setTimeout(() => {
      setAllPhotosOpen(false);
      setAllPhotosClosing(false);
    }, ALL_PHOTOS_ANIM_MS);
  }, [allPhotosOpen, allPhotosClosing]);

  const modalGo = useCallback(
    (dir: 1 | -1) => {
      setModalIndex((prev) => {
        if (prev === null) return null;
        const next = (prev + dir + count) % count;
        snapTo(next);
        return next;
      });
    },
    [count, snapTo]
  );

  const visibleIndices = useMemo(() => {
    const center = Math.round(centerOffset);
    const set = new Set<number>();
    for (let d = -3; d <= 3; d++) {
      set.add(((center + d) % count + count) % count);
    }
    return Array.from(set);
  }, [centerOffset, count]);

  useGesture(
    {
      onDragStart: () => {
        setIsDragging(true);
        movedRef.current = false;
      },
      onDrag: ({ movement: [mx], velocity: [vx], direction: [dx], last }) => {
        const offset = -mx / gapPx;
        if (Math.abs(offset - dragOffsetRef.current) > 0.05) movedRef.current = true;
        dragOffsetRef.current = offset;
        setDragOffset(offset);

        if (last) {
          setIsDragging(false);
          const total = activeRef.current + dragOffsetRef.current;
          const next = Math.round(total);
          const frac = total - next;
          const flickBoost =
            Math.abs(vx) > 0.35 ? (vx * dx > 0 ? -1 : 1) * 0.15 : 0;
          const adjustedFrac = frac + flickBoost;
          if (Math.abs(adjustedFrac) > DRAG_THRESHOLD) {
            snapTo(next + (adjustedFrac > 0 ? 1 : -1));
          } else {
            snapTo(next);
          }
          setTimeout(() => {
            movedRef.current = false;
          }, 120);
        }
      },
    },
    { target: stageRef, eventOptions: { passive: true } }
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (e: WheelEvent) => {
      if (modalIndex !== null || allPhotosOpen || allPhotosClosing) return;
      e.preventDefault();
      if (wheelLockedRef.current) return;

      wheelAccumRef.current += e.deltaY + e.deltaX * 0.65;
      if (Math.abs(wheelAccumRef.current) < WHEEL_THRESHOLD) return;

      const dir = wheelAccumRef.current > 0 ? 1 : -1;
      wheelAccumRef.current = 0;
      wheelLockedRef.current = true;
      go(dir);
      window.setTimeout(() => {
        wheelLockedRef.current = false;
      }, WHEEL_COOLDOWN_MS);
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [modalIndex, allPhotosOpen, allPhotosClosing, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (modalIndex !== null) closeModal();
        else if (allPhotosOpen || allPhotosClosing) closeAllPhotos();
        return;
      }
      if (modalIndex !== null) {
        if (e.key === "ArrowLeft") modalGo(-1);
        if (e.key === "ArrowRight") modalGo(1);
        return;
      }
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalIndex, allPhotosOpen, allPhotosClosing, closeModal, closeAllPhotos, modalGo, go]);

  useEffect(() => {
    if (modalIndex === null && !allPhotosOpen && !allPhotosClosing) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalIndex, allPhotosOpen, allPhotosClosing]);

  const handleCardClick = (index: number) => {
    if (movedRef.current) return;
    openModal(index);
  };

  if (isLoading) {
    return (
      <section className="carousel-3d-root">
        <WindowsLoadingDots />
      </section>
    );
  }

  const modalSrc =
    modalIndex !== null ? GALLERY_IMAGES[modalIndex] : null;
  const modalLabel = modalSrc ? imageLabelFromPath(modalSrc) : "";

  const allPhotosMounted = allPhotosOpen || allPhotosClosing;

  const allPhotosModal =
    portalReady && allPhotosMounted ? (
      <div
        className={`carousel-3d-all-modal ${allPhotosClosing ? "is-closing" : "is-open"}`}
        role="dialog"
        aria-modal="true"
        aria-label="All gallery photos"
        onClick={closeAllPhotos}
      >
        <div
          className="carousel-3d-all-modal-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="carousel-3d-all-modal-header">
            <button
              type="button"
              className="carousel-3d-all-modal-close"
              onClick={closeAllPhotos}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="carousel-3d-all-modal-scroll">
            <div className="carousel-3d-grid">
              {GALLERY_IMAGES.map((src, i) => {
                const imageLabel = imageLabelFromPath(src);
                return (
                <button
                  key={src}
                  type="button"
                  className="carousel-3d-grid-item"
                  onClick={() => openModal(i)}
                  aria-label={`Open photo ${i + 1} of ${count}`}
                >
                  <Image
                    src={src}
                    alt={imageLabel}
                    title={imageLabel}
                    fill
                    sizes="(max-width: 640px) 50vw, 280px"
                    className="carousel-3d-card-img"
                    loading="lazy"
                  />
                </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    ) : null;

  const lightboxModal =
    portalReady && modalSrc !== null && modalIndex !== null ? (
      <div
        className="carousel-3d-modal carousel-3d-modal--lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Full size photo"
        onClick={closeModal}
      >
        <div
          className="carousel-3d-modal-toolbar carousel-3d-modal-toolbar--end"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="carousel-3d-modal-close"
            onClick={closeModal}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className="carousel-3d-modal-body"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="carousel-3d-modal-nav carousel-3d-modal-nav--left"
            onClick={() => modalGo(-1)}
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="carousel-3d-modal-image-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={modalSrc} alt={modalLabel} title={modalLabel} />
          </div>

          <button
            type="button"
            className="carousel-3d-modal-nav carousel-3d-modal-nav--right"
            onClick={() => modalGo(1)}
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    ) : null;

  return (
    <section className="carousel-3d-root" aria-label="3D carousel gallery">
      <div className="carousel-3d-bg" aria-hidden>
        <div className="carousel-3d-bg-mesh" />
        <div className="carousel-3d-bg-orb carousel-3d-bg-orb--1" />
        <div className="carousel-3d-bg-orb carousel-3d-bg-orb--2" />
        <div className="carousel-3d-bg-orb carousel-3d-bg-orb--3" />
        <div className="carousel-3d-particles">
          {particles.map((p) => (
            <span
              key={p.id}
              className="carousel-3d-particle"
              style={
                {
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  animationDuration: `${p.dur}s`,
                  animationDelay: `${p.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <div className="carousel-3d-bg-vignette" />
      </div>

      <div className="carousel-3d-content">
      <div className="carousel-3d-heading-wrap">
        <h1 className="carousel-3d-heading">
          Ritz Media World{" "}
          <span className="carousel-3d-heading-golden">Memories Gallery ✨</span> - Reliving Our Best Moments
        </h1>
      </div>
      <div className="carousel-3d-wrap">
        <div className="carousel-3d-inner">
        <button
          type="button"
          className="carousel-3d-arrow carousel-3d-arrow--left"
          onClick={() => go(-1)}
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2} />
        </button>

        <div ref={stageRef} className="carousel-3d-stage">
          <div className="carousel-3d-track">
            {visibleIndices.map((i) => {
              const src = GALLERY_IMAGES[i];
              const imageLabel = imageLabelFromPath(src);
              const offset = shortestOffset(i, centerOffset, count);
              const style = getCardStyle(offset, gapPx);

              return (
                <div
                  key={src}
                  className={`carousel-3d-card ${style.className} ${isDragging ? "is-dragging" : "is-sliding"}`}
                  style={{
                    transform: style.transform,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                    pointerEvents: style.pointerEvents,
                  }}
                >
                  <button
                    type="button"
                    className="carousel-3d-card-inner"
                    onClick={() => handleCardClick(i)}
                    aria-label={`Open photo ${i + 1} of ${count}`}
                    aria-current={i === activeIndex ? "true" : undefined}
                  >
                    <div className="carousel-3d-card-media">
                      <Image
                        src={src}
                        alt={imageLabel}
                        title={imageLabel}
                        fill
                        sizes="(max-width: 640px) 72vw, 320px"
                        quality={72}
                        className="carousel-3d-card-img"
                        draggable={false}
                        priority={Math.abs(offset) < 0.6}
                        loading={Math.abs(offset) < 1.2 ? "eager" : "lazy"}
                      />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="carousel-3d-arrow carousel-3d-arrow--right"
          onClick={() => go(1)}
          aria-label="Next photo"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2} />
        </button>
        </div>
      </div>

      <div className="carousel-3d-view-all-wrap">
        <button
          type="button"
          className="carousel-3d-view-all-btn"
          onClick={openAllPhotos}
        >
          View all photos
        </button>
      </div>

      {portalReady &&
        createPortal(
          <>
            {allPhotosModal}
            {lightboxModal}
          </>,
          document.body
        )}
      </div>
    </section>
  );
}
