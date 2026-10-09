"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { GALLERY_IMAGE_SRCS as GALLERY_IMAGES } from "./gallery-images";

const INITIAL_COUNT = 24;
const LOAD_MORE_COUNT = 12;

function preloadImages(sources: readonly string[]): Promise<void> {
  if (sources.length === 0) return Promise.resolve();
  return new Promise((resolve) => {
    let done = 0;
    const tick = () => {
      done += 1;
      if (done >= sources.length) resolve();
    };
    sources.forEach((src) => {
      const img = new window.Image();
      img.onload = tick;
      img.onerror = tick;
      img.src = src;
    });
  });
}

function WindowsLoadingDots({ label = "Loading" }: { label?: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-5 py-20 sm:py-28"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="flex items-end gap-[5px]" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="gallery-win-dot h-2 w-2 rounded-full bg-[#0078D4] sm:h-2.5 sm:w-2.5"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
      <p className="text-sm text-[#4A5565]">{label}</p>
      <style jsx>{`
        @keyframes gallery-win-dot-bounce {
          0%,
          80%,
          100% {
            transform: translateY(0);
            opacity: 0.35;
          }
          40% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }
        .gallery-win-dot {
          animation: gallery-win-dot-bounce 1.05s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function altFromPath(path: string) {
  const name = path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "Gallery photo";
  return name.replace(/[_-]+/g, " ").trim();
}

export default function GalleryCollage() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const visibleImages = GALLERY_IMAGES.slice(0, visibleCount);
  const hasMore = visibleCount < GALLERY_IMAGES.length;

  useEffect(() => {
    let cancelled = false;
    setIsInitialLoading(true);
    preloadImages(GALLERY_IMAGES.slice(0, INITIAL_COUNT)).then(() => {
      if (!cancelled) setIsInitialLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLoadMore = useCallback(async () => {
    const nextCount = Math.min(
      visibleCount + LOAD_MORE_COUNT,
      GALLERY_IMAGES.length
    );
    const batch = GALLERY_IMAGES.slice(visibleCount, nextCount);
    if (batch.length === 0) return;

    setIsLoadingMore(true);
    await preloadImages(batch);
    setVisibleCount(nextCount);
    setIsLoadingMore(false);
  }, [visibleCount]);

  const openAt = useCallback((index: number) => setActiveIndex(index), []);
  const close = useCallback(() => setActiveIndex(null), []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + visibleImages.length) % visibleImages.length
    );
  }, [visibleImages.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? null : (i + 1) % visibleImages.length
    );
  }, [visibleImages.length]);

  const activeSrc =
    activeIndex !== null ? visibleImages[activeIndex] : null;
  const activeAlt = activeSrc ? altFromPath(activeSrc) : "";

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, goPrev, goNext]);

  return (
    <section className="w-full bg-[#F8F6F3] py-8 sm:py-12">
      <div className="mx-auto w-[92%] max-w-6xl">
        <header className="mb-8 text-center sm:mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4A574] sm:text-sm">
            Ritz Media World
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#101828] sm:text-3xl md:text-4xl">
            Memories Gallery
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#4A5565] sm:text-base">
            Team moments, celebrations, and behind-the-scenes highlights.
            Tap any photo to view it full size.
          </p>
        </header>

        {isInitialLoading ? (
          <WindowsLoadingDots label="Loading gallery" />
        ) : (
          <>
        {/* Masonry: each image keeps its natural aspect ratio — no crop */}
        <div
          className="columns-2 gap-3 animate-in fade-in duration-300 sm:columns-3 sm:gap-4 lg:columns-4"
          role="list"
        >
          {visibleImages.map((src, index) => {
            const alt = altFromPath(src);
            return (
              <article
                key={src}
                role="listitem"
                className="mb-3 break-inside-avoid sm:mb-4"
              >
                <button
                  type="button"
                  onClick={() => openAt(index)}
                  className="group relative block w-full overflow-hidden rounded-xl border border-[#E8DDD1]/80 bg-white p-1.5 shadow-sm transition hover:border-[#D4A574]/50 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A574]"
                  aria-label={`View full size: ${alt}`}
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={0}
                    height={0}
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 280px"
                    className="h-auto w-full rounded-lg"
                    style={{ width: "100%", height: "auto" }}
                    loading={index < 8 ? "eager" : "lazy"}
                  />
                  <span className="pointer-events-none absolute inset-0 flex items-end justify-center rounded-xl bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="mb-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-[#101828] shadow">
                      <Expand className="h-3.5 w-3.5" aria-hidden />
                      View full size
                    </span>
                  </span>
                </button>
              </article>
            );
          })}
        </div>

        {hasMore && (
          <div className="mt-8 flex flex-col items-center gap-2 sm:mt-10">
            {isLoadingMore ? (
              <WindowsLoadingDots label="Loading more photos" />
            ) : (
              <button
                type="button"
                onClick={handleLoadMore}
                className="rounded-full border border-[#D4A574] bg-white px-6 py-2.5 text-sm font-medium text-[#101828] transition hover:bg-[#D4A574]/10"
              >
                Load more photos
              </button>
            )}
            <p className="text-xs text-[#4A5565]">
              Showing {visibleCount} of {GALLERY_IMAGES.length}
            </p>
          </div>
        )}
          </>
        )}
      </div>

      {activeSrc !== null && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/90 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Full size gallery image"
          onClick={close}
        >
          <div
            className="mb-3 flex shrink-0 items-center justify-between text-white sm:mb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-medium sm:text-base">
              {activeIndex + 1} / {visibleImages.length}
            </p>
            <button
              type="button"
              onClick={close}
              className="rounded-full bg-white/10 p-2.5 transition hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-0 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:left-2 sm:p-3"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>

            <div className="relative mx-10 flex max-h-[calc(100vh-120px)] w-full max-w-4xl items-center justify-center sm:mx-14">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeSrc}
                alt={activeAlt}
                className="max-h-[calc(100vh-120px)] max-w-full object-contain"
              />
            </div>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-0 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:right-2 sm:p-3"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>
          </div>

          <p
            className="mt-3 shrink-0 text-center text-xs text-white/70 sm:text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {activeAlt}
          </p>
        </div>
      )}
    </section>
  );
}
