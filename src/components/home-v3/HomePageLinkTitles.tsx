"use client";

import { useEffect } from "react";

const DEFAULT_TITLE = "Ritz Media World";

function needsTitle(anchor: HTMLAnchorElement) {
  const t = anchor.getAttribute("title");
  return t == null || t.trim() === "";
}

export default function HomePageLinkTitles() {
  useEffect(() => {
    const apply = () => {
      document.querySelectorAll("a").forEach((node) => {
        const el = node as HTMLAnchorElement;
        if (needsTitle(el)) {
          el.setAttribute("title", DEFAULT_TITLE);
        }
      });
    };

    apply();

    const observer = new MutationObserver(() => {
      apply();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
