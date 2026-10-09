"use client";

import React, { useEffect, useState, Suspense, memo } from "react";
import dynamic from "next/dynamic";

// Optimized dynamic imports for better code splitting and LCP
const RDXModal = dynamic(() => import("@/components/mod/RDXModal"), {
  loading: () => <div style={{ height: '200px', background: '#f8f9fa' }} />,
  ssr: false
});

const SwiperSlider = dynamic(() => import("./slider/SwiperSlider"), {
  loading: () => (
    <div 
      style={{ 
        height: '400px',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite'
      }}
    >
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  ),
  ssr: false
});

const SwiperSlider2 = dynamic(() => import("./slider/SwiperSlider2"), {
  loading: () => (
    <div 
      style={{ 
        height: '400px',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite'
      }}
    >
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  ),
  ssr: false
});

const RDXCourseContent = dynamic(() => import("./RDXCourseContent"), {
  loading: () => (
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite'
      }}
    >
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  ), 
});

function Page() {
  const [showRTZModal, setShowRTZModal] = useState<boolean>(false);
  
  const modalFormHandler = () => {
    setShowRTZModal((pr) => !pr);
  };

  return (
    <>
      {/* Preload critical resources for better LCP */}
      <link rel="preload" title="Ritz Digital Xperts Academy" href="/RITZ DIGITAL XPERTS ACADEMY.png" as="image" />
      <link rel="preload" title="Ritz Digital Xperts Academy Image" href="/rdx/s2/rdx-s2-img1.png" as="image" />
      
    <main>
        <Suspense fallback={<div style={{ height: '200px', background: '#f8f9fa' }} />}>
          {showRTZModal && <RDXModal onClick={modalFormHandler} />}
        </Suspense>

        <Suspense fallback={
          <div 
            className="d-flex justify-content-center align-items-center" 
            style={{
              minHeight: '100vh',
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite'
            }}
          >
            <style jsx>{`
              @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
              }
            `}</style>
          </div>
        }>
          <RDXCourseContent modalFormHandler={modalFormHandler} />
        </Suspense>
    </main>
    </>
  );
}

export default Page;
