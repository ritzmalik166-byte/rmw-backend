// src/components/IntersectionObserverClient.tsx
"use client";
import { useEffect } from "react";

export default function IntersectionObserverClient() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("show", entry.isIntersecting);
      });
    });

    const hiddenElements = document.querySelectorAll(".tp-section-hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
