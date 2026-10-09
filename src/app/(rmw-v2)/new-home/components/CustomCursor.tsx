"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const magnifierRef = useRef<HTMLDivElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const [hoverType, setHoverType] = useState<"none" | "heading" | "image">("none");

  // heading zoom data
  const [headingHtml, setHeadingHtml] = useState("");
  const [headingRect, setHeadingRect] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // image zoom data
  const [imgSrc, setImgSrc] = useState("");
  const [imgOffset, setImgOffset] = useState({ x: 0, y: 0 });
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  useEffect(() => setMounted(true), []);

  // enable after refs
  useEffect(() => {
    if (!mounted) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const check = () => {
      if (cursorRef.current && magnifierRef.current) setEnabled(true);
      else setTimeout(check, 40);
    };
    check();
  }, [mounted]);

  // mouse logic
  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;
    const magnifier = magnifierRef.current;

    const oldCursor = document.body.style.cursor;
    document.body.style.cursor = "none"; // hide native cursor always

    const move = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (cursor) {
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
      }
      if (magnifier) {
        magnifier.style.left = `${x}px`;
        magnifier.style.top = `${y}px`;
      }

      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      if (!el) {
        setHoverType("none");
        return;
      }

      // ---------- IMAGE ZOOM ----------
      const img = el.closest("img") as HTMLImageElement | null;
      if (img) {
        const rect = img.getBoundingClientRect();

        setHoverType("image");
        setCursorPos({ x, y });
        setImgSrc(img.src);
        setImgOffset({ x: rect.left, y: rect.top });
        setImgSize({ width: rect.width, height: rect.height });
        return;
      }

      // ---------- HEADING TRUE ZOOM ----------
      const h = el.closest("h1,h2,h3,h4,h5,h6") as HTMLElement | null;
      if (h) {
        const rect = h.getBoundingClientRect();

        setHoverType("heading");
        setCursorPos({ x, y });

        // clone html exactly (font, color, shadow, weight, etc.)
        setHeadingHtml(h.innerHTML);
        setHeadingRect({
          x: rect.left,
          y: rect.top,
          w: rect.width,
          h: rect.height,
        });

        return;
      }

      setHoverType("none");
    };

    document.addEventListener("mousemove", move);
    return () => {
      document.removeEventListener("mousemove", move);
      document.body.style.cursor = oldCursor;
    };
  }, [enabled]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* custom cursor dot */}
      <div
        ref={cursorRef}
        style={{
          width: 12,
          height: 12,
          background: "black", // changed to BLACK
          borderRadius: "50%",
          position: "fixed",
          left: 0,
          top: 0,
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
          zIndex: 99999,
          transition: ".12s ease",
        }}
      />

      {/* magnifier */}
      <div
        ref={magnifierRef}
        style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          border: "3px solid rgba(255,255,255,0.5)",
          overflow: "hidden",
          position: "fixed",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99998,
          background: "rgba(0,0,0,0.25)",
          backdropFilter: "blur(4px)",
          display: hoverType === "none" ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* IMAGE ZOOM */}
        {hoverType === "image" && imgSrc && (
          <img
            src={imgSrc}
            style={{
              position: "absolute",
              width: imgSize.width * 2.5,
              height: imgSize.height * 2.5,
              left: -(cursorPos.x - imgOffset.x) * 2.5 + 90,
              top: -(cursorPos.y - imgOffset.y) * 2.5 + 90,
              pointerEvents: "none",
            }}
            alt=""
          />
        )}

        {/* HEADING TRUE ZOOM */}
        {hoverType === "heading" && (
          <div
            style={{
              position: "absolute",
              width: headingRect.w * 2.5,
              height: headingRect.h * 2.5,
              left: -(cursorPos.x - headingRect.x) * 2.5 + 90,
              top: -(cursorPos.y - headingRect.y) * 2.5 + 90,
              pointerEvents: "none",
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: headingHtml }}
              style={{
                transform: "scale(2.5)",
                transformOrigin: "top left",
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
          </div>
        )}
      </div>
    </>,
    document.body
  );
}
