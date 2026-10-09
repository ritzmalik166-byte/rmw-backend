"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  GALLERY_CTA,
  GALLERY_FEATURE_HEADINGS,
  GALLERY_FEATURE_STRIP,
  getFeatureModalImages,
  GALLERY_FILTER_OPTIONS,
  GALLERY_GRID_IMAGES,
  GALLERY_HERO,
  GALLERY_IMAGES,
  GALLERY_STATS,
  type GalleryFilterId,
  type GalleryImage,
  type GalleryStat,
} from "./gallery-images";
import "./memories-gallery.css";

const FILTER_LOAD_MS = 1000;

function imagesForFilter(filter: GalleryFilterId): GalleryImage[] {
  if (filter === "all") return GALLERY_GRID_IMAGES;
  return GALLERY_GRID_IMAGES.filter((img) => img.category === filter);
}

export default function MemoriesGallery() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilterId>("all");
  const [displayedFilter, setDisplayedFilter] = useState<GalleryFilterId>("all");
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const galleryPanelRef = useRef<HTMLDivElement>(null);
  const filterLoadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedScrollYRef = useRef<number | null>(null);
  const [categoryModal, setCategoryModal] = useState<{
    title: string;
    images: GalleryImage[];
  } | null>(null);
  const [viewer, setViewer] = useState<{
    images: GalleryImage[];
    index: number;
  } | null>(null);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const visibleImages = useMemo(
    () => imagesForFilter(displayedFilter),
    [displayedFilter]
  );

  const lockScrollPosition = useCallback(() => {
    savedScrollYRef.current = window.scrollY;
  }, []);

  const restoreScrollPosition = useCallback(() => {
    const y = savedScrollYRef.current;
    if (y == null) return;
    window.scrollTo({ top: y, left: 0, behavior: "auto" });
  }, []);

  const handleFilterChange = useCallback(
    (next: GalleryFilterId) => {
      if (isFilterLoading) return;
      if (next === activeFilter) return;

      if (filterLoadTimerRef.current) {
        clearTimeout(filterLoadTimerRef.current);
      }

      lockScrollPosition();

      const applyFilter = () => {
        setDisplayedFilter(next);
        setIsFilterLoading(false);
        filterLoadTimerRef.current = null;
      };

      setActiveFilter(next);
      setIsFilterLoading(true);

      const delay =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? 0
          : FILTER_LOAD_MS;

      if (delay === 0) {
        applyFilter();
        return;
      }

      filterLoadTimerRef.current = setTimeout(applyFilter, delay);
    },
    [activeFilter, isFilterLoading, lockScrollPosition]
  );

  useLayoutEffect(() => {
    restoreScrollPosition();
    const raf = requestAnimationFrame(() => {
      restoreScrollPosition();
      requestAnimationFrame(restoreScrollPosition);
    });
    return () => cancelAnimationFrame(raf);
  }, [isFilterLoading, displayedFilter, activeFilter, restoreScrollPosition]);

  useEffect(() => {
    return () => {
      if (filterLoadTimerRef.current) {
        clearTimeout(filterLoadTimerRef.current);
      }
    };
  }, []);

  const openViewer = useCallback((images: GalleryImage[], index: number) => {
    if (!images.length) return;
    setViewer({ images, index: Math.max(0, Math.min(index, images.length - 1)) });
  }, []);

  const closeViewer = useCallback(() => {
    setViewer(null);
  }, []);

  const openFeatureModal = useCallback((featureIndex: number) => {
    const images = getFeatureModalImages(featureIndex);
    const title = GALLERY_FEATURE_HEADINGS[featureIndex] ?? "Memories";
    if (!images.length) return;
    setCategoryModal({ title, images });
  }, []);

  const closeCategoryModal = useCallback(() => {
    setCategoryModal(null);
    setViewer(null);
  }, []);

  const modalOpen = categoryModal != null || viewer != null;

  useEffect(() => {
    if (!modalOpen) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (viewer) {
        closeViewer();
        return;
      }
      closeCategoryModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen, viewer, closeViewer, closeCategoryModal]);

  return (
    <div className="memories-gallery">
      <div className="mg-page-bg" aria-hidden>
        <div className="mg-page-bg-mesh" />
        <div className="mg-page-bg-vignette" />
      </div>

      {/* Hero */}
      <section className="mg-hero">
        <div
          className="mg-hero-bg"
          style={{ backgroundImage: `url('${GALLERY_HERO.src}')` }}
          role="img"
          aria-label={GALLERY_HERO.label}
          title={GALLERY_HERO.title}
        />
        <div className="mg-hero-vignette" aria-hidden />
        <div className="mg-hero-content">
          <h1 className="mg-hero-heading">
            Ritz Media World{" "}
            <span className="mg-hero-heading-golden">Memories Gallery ✨</span>
            {" "}- Reliving Our Best Moments
          </h1>
        </div>
      </section>

      {/* Stats */}
      <div className="mg-stats">
        {GALLERY_STATS.map((stat) => (
          <GalleryStatCounter key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Featured highlights */}
      <section className="mg-features" aria-label="Featured gallery highlights">
        <div className="mg-feature-strip">
          {GALLERY_FEATURE_STRIP.map((item, index) => {
            const heading = GALLERY_FEATURE_HEADINGS[index] ?? item.label;
            const headingId = `mg-feature-heading-${index}`;
            return (
              <article key={item.src} className="mg-feature-col">
                <div className="mg-feature-card">
                  <h2 id={headingId} className="mg-feature-heading">
                    {heading}
                  </h2>
                  <button
                    type="button"
                    className="mg-feature-item"
                    onClick={() => openFeatureModal(index)}
                    aria-labelledby={headingId}
                  >
                    <span className="mg-feature-media">
                      <Image
                        src={item.src}
                        alt={heading}
                        title={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </span>
                    <span className="mg-feature-overlay" aria-hidden />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Filters + grid — updates in place without scrolling the page */}
      <div className="mg-gallery-block">
      <div className="mg-filter-bar">
        <h2 className="mg-filter-title">All Memories</h2>
        <div className="mg-filters" role="group" aria-label="Filter gallery">
          {GALLERY_FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              aria-pressed={activeFilter === opt.id}
              aria-busy={isFilterLoading && activeFilter === opt.id}
              tabIndex={isFilterLoading ? -1 : 0}
              className={`mg-filter-btn${activeFilter === opt.id ? " active" : ""}${isFilterLoading ? " mg-filter-btn--busy" : ""}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.preventDefault();
                handleFilterChange(opt.id);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <section className="mg-gallery-section" aria-label="Photo gallery">
        <div ref={galleryPanelRef} className="mg-gallery-panel">
          {visibleImages.length === 0 && !isFilterLoading ? (
            <div className="mg-gallery-empty" role="status">
              <p className="mg-gallery-empty-title">No photos in this category yet</p>
              <p className="mg-gallery-empty-text">
                Try another filter or view all memories to explore the full gallery.
              </p>
              <button
                type="button"
                className="mg-filter-btn active mg-gallery-empty-btn"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.preventDefault();
                  handleFilterChange("all");
                }}
              >
                View all memories
              </button>
            </div>
          ) : (
            <>
              <div
                className={`mg-gallery-grid${isFilterLoading ? " mg-gallery-grid--busy" : ""}`}
                aria-busy={isFilterLoading}
              >
                {visibleImages.map((img, idx) => (
                  <div key={img.src} className="mg-gallery-cell">
                    <GalleryGridItem
                      image={img}
                      index={idx}
                      onOpen={() => openViewer(visibleImages, idx)}
                    />
                  </div>
                ))}
              </div>
              {isFilterLoading && (
                <div
                  className="mg-gallery-loader-overlay"
                  role="status"
                  aria-live="polite"
                  aria-label="Loading gallery photos"
                >
                  <div className="mg-gallery-loader">
                    <div className="mg-gallery-loader-spinner" aria-hidden />
                    <p className="mg-gallery-loader-text">Loading memories…</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      </div>

      {/* CTA */}
      <section className="mg-cta" aria-labelledby="mg-cta-heading">
        <div className="mg-cta-inner">
          <div className="mg-cta-glow" aria-hidden />
          <h2 id="mg-cta-heading" className="mg-cta-title">
            {GALLERY_CTA.heading}
          </h2>
          <p className="mg-cta-text">
            {GALLERY_CTA.bodyLead}
            <Link
              href={GALLERY_CTA.homeHref}
              className="mg-cta-brand-link"
              title={GALLERY_CTA.homeTitle}
            >
              <strong>{GALLERY_CTA.brandLabel}</strong>
            </Link>
            {GALLERY_CTA.bodyTrail}  
          </p>
          <Link
            href={GALLERY_CTA.href}
            className="mg-cta-btn"
            title={GALLERY_CTA.linkTitle}
            target={GALLERY_CTA.target}
            rel={GALLERY_CTA.rel}
          >
            {GALLERY_CTA.buttonLabel}
            <span className="mg-cta-btn-arrow" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="mg-divider">
        <div
          className="mg-divider-line"
          style={{
            background: "linear-gradient(to left, rgba(201,146,55,0.25), transparent)",
          }}
        />
      </div>

      {portalReady &&
        createPortal(
          <>
            {categoryModal && (
              <GalleryCategoryModal
                title={categoryModal.title}
                images={categoryModal.images}
                onClose={closeCategoryModal}
                onOpenImage={(index) => openViewer(categoryModal.images, index)}
              />
            )}
            {viewer && (
              <GalleryViewer
                images={viewer.images}
                index={viewer.index}
                onClose={closeViewer}
                onIndexChange={(index) =>
                  setViewer((prev) => (prev ? { ...prev, index } : null))
                }
              />
            )}
          </>,
          document.body
        )}
    </div>
  );
}

function GalleryCategoryModal({
  title,
  images,
  onClose,
  onOpenImage,
}: {
  title: string;
  images: GalleryImage[];
  onClose: () => void;
  onOpenImage: (index: number) => void;
}) {
  return (
    <div
      className="mg-category-modal open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mg-category-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="mg-category-modal-panel">
        <header className="mg-category-modal-header">
          <div>
            <p className="mg-category-modal-eyebrow">Memories Gallery</p>
            <p id="mg-category-modal-title" className="mg-category-modal-title">
              {title}
            </p>
          </div>
          <button
            type="button"
            className="mg-modal-close"
            onClick={onClose}
            aria-label="Close gallery"
          >
            ✕
          </button>
        </header>
        <div className="mg-category-modal-body">
          <div className="mg-category-modal-grid">
            {images.map((img, idx) => (
              <button
                key={img.src}
                type="button"
                className="mg-category-modal-cell"
                onClick={() => onOpenImage(idx)}
                aria-label={`View ${img.label}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.label}
                  title={img.title}
                  loading="lazy"
                />
                <span className="mg-category-modal-cell-label">{img.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryViewer({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const current = images[index];
  const hasMultiple = images.length > 1;

  const go = useCallback(
    (dir: -1 | 1) => {
      onIndexChange((index + dir + images.length) % images.length);
    },
    [images.length, index, onIndexChange]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go]);

  if (!current) return null;

  return (
    <div
      className="mg-viewer open"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        className="mg-modal-close mg-viewer-close"
        onClick={onClose}
        aria-label="Close viewer"
      >
        ✕
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            className="mg-viewer-nav mg-viewer-prev"
            onClick={() => go(-1)}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            className="mg-viewer-nav mg-viewer-next"
            onClick={() => go(1)}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}

      <div className="mg-viewer-stage">
        <div className="mg-viewer-frame">
          <div className="mg-viewer-frame-glow" aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={current.src}
            src={current.src}
            alt={current.label}
            title={current.title}
            className="mg-viewer-img"
          />
        </div>
        <div className="mg-viewer-meta">
          <p className="mg-viewer-label">{current.label}</p>
        </div>
      </div>

      {hasMultiple && (
        <div className="mg-viewer-thumbs" aria-label="Gallery thumbnails">
          {images.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              className={`mg-viewer-thumb${idx === index ? " active" : ""}`}
              onClick={() => onIndexChange(idx)}
              aria-label={`View image ${idx + 1}: ${img.label}`}
              aria-current={idx === index ? "true" : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const STAT_ANIMATION_MS = 2000;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function GalleryStatCounter({ stat }: { stat: GalleryStat }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active || stat.symbol != null || stat.value == null) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(stat.value);
      return;
    }

    const target = stat.value;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / STAT_ANIMATION_MS);
      setDisplayValue(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, stat.symbol, stat.value]);

  const numberText =
    stat.symbol != null
      ? stat.symbol
      : `${displayValue}${stat.suffix ?? ""}`;

  return (
    <div
      ref={rootRef}
      className={`mg-stat-item${active ? " mg-stat-item--active" : ""}`}
    >
      <div className="mg-stat-number" aria-live="polite">
        {numberText}
      </div>
      <div className="mg-stat-label">{stat.label}</div>
    </div>
  );
}

function GalleryGridItem({
  image,
  index,
  onOpen,
}: {
  image: GalleryImage;
  index: number;
  onOpen: () => void;
}) {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <button
      type="button"
      className="mg-gallery-item"
      style={{ animationDelay: `${(index % 12) * 60}ms` }}
      onClick={onOpen}
      aria-label={`View ${image.label}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.label}
        title={image.title}
        loading="lazy"
        onError={() => setHidden(true)}
      />
      <div className="mg-gallery-item-label">
        <span>{image.label}</span>
      </div>
    </button>
  );
}
