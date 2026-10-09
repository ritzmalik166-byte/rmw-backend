"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function RouteChangeHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Kill only route-based triggers
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // Refresh AFTER DOM flush
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [pathname]);

  return null;
}
