"use client";

import { useEffect } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

export function TrackPageView() {
  const pathname = usePathname();

  useEffect(() => {
    axios.post(`/api/track-visit?url=${encodeURIComponent(pathname)}`)
      .catch((error) => console.error("Visit tracking failed:", error));
  }, [pathname]);

  return null;
}
