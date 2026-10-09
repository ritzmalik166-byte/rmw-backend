"use client";

import { useEffect } from "react";

const VisitTracker = () => {
  useEffect(() => {
    // console.log("📡 VisitTracker mounted");

    fetch(`/api/track-visit?url=${window.location.pathname}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("📊 Visit logged:", data);
      })
      .catch((err) => {
        console.error("❌ Visit logging failed:", err);
      });
  }, []);

  return null;
};

export default VisitTracker;
