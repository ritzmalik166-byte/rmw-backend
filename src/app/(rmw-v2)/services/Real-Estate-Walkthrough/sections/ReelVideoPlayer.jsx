"use client";

import { useEffect, useRef, useState } from "react";
import { getVideoPreviewSrc } from "./useVideoPosterFrame";

export function ReelVideoPlayer({
  src,
  previewSrc,
  title,
  objectFit = "contain",
  showControls = true,
  autoPlay = true,
  className = "",
}) {
  const [ready, setReady] = useState(false);
  const mainRef = useRef(null);
  const posterRef = useRef(null);
  const effectivePreview = previewSrc || getVideoPreviewSrc(src);

  useEffect(() => {
    setReady(false);
    const main = mainRef.current;
    const poster = posterRef.current;
    if (!main) return;

    poster?.load();

    const markReady = () => {
      setReady(true);
      if (autoPlay) main.play().catch(() => {});
    };

    const onCanPlay = () => markReady();

    const primeMain = () => {
      try {
        if (main.currentTime < 0.05) main.currentTime = 0.1;
      } catch {
        /* wait for more buffer */
      }
    };

    main.addEventListener("canplay", onCanPlay, { once: true });
    main.addEventListener("loadeddata", primeMain, { once: true });
    main.addEventListener("error", () => setReady(true), { once: true });

    main.preload = "auto";
    main.playsInline = true;
    if (main.readyState === 0) main.load();
    else if (main.readyState >= 3) markReady();
    else primeMain();

    return () => {
      main.removeEventListener("canplay", onCanPlay);
      main.removeEventListener("loadeddata", primeMain);
    };
  }, [src, autoPlay]);

  return (
    <div className={`relative overflow-hidden bg-[#0a1128] ${className}`}>
      <video
        ref={posterRef}
        src={effectivePreview}
        title={title}
        className={`absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-500 ${
          ready ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
      />

      {!ready && (
        <div
          className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center bg-black/25"
          aria-hidden
        >
          <div className="h-11 w-11 animate-spin rounded-full border-2 border-white/25 border-t-white" />
        </div>
      )}

      <video
        ref={mainRef}
        src={src}
        title={title}
        className={`relative z-[3] h-full w-full transition-opacity duration-500 ${
          ready ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        } ${objectFit === "cover" ? "object-cover" : "object-contain"}`}
        controls={showControls && ready}
        playsInline
        preload="auto"
      />
    </div>
  );
}
