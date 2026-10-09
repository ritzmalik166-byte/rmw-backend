import { useEffect, useMemo, useRef, useState } from "react";

const MAX_CONCURRENT_PREVIEWS = 3;
const SEEK_SECONDS = [0.1, 0.5, 1, 2, 3, 5, 8];
const LOAD_TIMEOUT_MS = 30000;

/** @type {Array<() => Promise<void>>} */
const previewQueue = [];
let activePreviewLoads = 0;

function drainPreviewQueue() {
  while (activePreviewLoads < MAX_CONCURRENT_PREVIEWS && previewQueue.length > 0) {
    const run = previewQueue.shift();
    activePreviewLoads += 1;
    run()
      .catch(() => {})
      .finally(() => {
        activePreviewLoads -= 1;
        drainPreviewQueue();
      });
  }
}

function enqueuePreviewLoad(task) {
  return new Promise((resolve) => {
    previewQueue.push(async () => {
      await task();
      resolve();
    });
    drainPreviewQueue();
  });
}

/** Use full URL — #t= fragments often fail on Azure blob MP4s. */
export function getVideoPreviewSrc(src) {
  return src || "";
}

function isVisible(el) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.bottom > -240 && rect.top < vh + 240;
}

function hasRenderableFrame(video) {
  return video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0;
}

/**
 * Lazy-loads a poster frame when visible. Queues loads so large blob MP4s don't starve each other.
 */
export function useVideoPosterFrame(src, poster) {
  const videoRef = useRef(null);
  const previewSrc = useMemo(() => getVideoPreviewSrc(src), [src]);
  const [thumbFailed, setThumbFailed] = useState(false);

  useEffect(() => {
    setThumbFailed(false);
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    if (poster) {
      setThumbFailed(false);
      return;
    }

    let cancelled = false;
    let seekAttempt = 0;
    let loadTimeoutId = null;
    let loadStarted = false;
    let retried = false;
    const abort = new AbortController();
    const { signal } = abort;

    const clearLoadTimeout = () => {
      if (loadTimeoutId) {
        window.clearTimeout(loadTimeoutId);
        loadTimeoutId = null;
      }
    };

    const tryShowFrame = () => {
      if (cancelled || seekAttempt >= SEEK_SECONDS.length) return;

      const target = SEEK_SECONDS[seekAttempt];
      seekAttempt += 1;

      try {
        video.currentTime = target;
      } catch {
        window.setTimeout(tryShowFrame, 300);
      }
    };

    const startPreview = () => {
      if (cancelled || loadStarted) return;

      enqueuePreviewLoad(() => {
        if (cancelled || loadStarted) return;
        loadStarted = true;

        return new Promise((resolve) => {
          const finish = (failed = false) => {
            clearLoadTimeout();
            if (!cancelled) {
              video.pause();
              if (failed) setThumbFailed(true);
            }
            resolve();
          };

          loadTimeoutId = window.setTimeout(() => finish(true), LOAD_TIMEOUT_MS);

          const onSeeked = () => {
            if (cancelled) return;
            if (hasRenderableFrame(video)) {
              setThumbFailed(false);
              finish(false);
              return;
            }
            if (seekAttempt < SEEK_SECONDS.length) tryShowFrame();
            else finish(true);
          };

          const onReady = () => {
            if (cancelled) return;
            if (hasRenderableFrame(video)) {
              setThumbFailed(false);
              finish(false);
              return;
            }
            tryShowFrame();
          };

          const onError = () => {
            if (cancelled) return;
            if (!retried) {
              retried = true;
              seekAttempt = 0;
              video.src = src;
              video.load();
              return;
            }
            finish(true);
          };

          video.addEventListener("seeked", onSeeked, { signal });
          video.addEventListener("loadeddata", onReady, { signal });
          video.addEventListener("canplay", onReady, { signal });
          video.addEventListener("loadedmetadata", onReady, { signal });
          video.addEventListener("error", onError, { signal });

          video.preload = "auto";
          video.muted = true;
          video.playsInline = true;
          video.src = previewSrc;

          if (video.readyState === 0) video.load();
          else onReady();
        });
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startPreview();
      },
      { rootMargin: "240px", threshold: 0.01 }
    );

    observer.observe(video);
    if (isVisible(video)) startPreview();

    return () => {
      cancelled = true;
      abort.abort();
      clearLoadTimeout();
      observer.disconnect();
    };
  }, [src, previewSrc, poster]);

  return { videoRef, previewSrc, poster, thumbFailed };
}
