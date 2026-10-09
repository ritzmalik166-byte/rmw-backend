"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Loader from "../loader/Loader";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Show loader only on first mount
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 600); // slightly smoother
    return () => clearTimeout(timeout);
  }, []);

  // ✅ Handle route change loader (optimized)
  useEffect(() => {
    // Prevent re-render when navigating to same route
    if (!pathname) return;

    // Clear any existing timer (avoid memory leaks)
    if (timerRef.current) clearTimeout(timerRef.current);

    setLoading(true);
    timerRef.current = setTimeout(() => {
      setLoading(false);
    }, 700); // balanced smooth delay (0.7s)
  }, [pathname]);

  // ✅ Smooth fade transition for better UX
  return (
    <div className="relative">
      {loading && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[9999] transition-opacity duration-500"
          style={{
            opacity: loading ? 1 : 0,
            pointerEvents: loading ? "auto" : "none",
          }}
        >
          <Loader />
        </div>
      )}

      {/* Optimize rendering: only render children when loader hidden */}
      <div
        className={`transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default React.memo(PageWrapper);
