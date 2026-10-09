"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Optimized dynamic imports for better code splitting and LCP
const PagesBanner = dynamic(() => import("@/components/pagesBanner/PagesBanner"), {
  loading: () => (
    <div 
      style={{ 
        height: '10vh', 
        background: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: '700', color: '#333' }}>Blogs</h1>
    </div>
  ),
  ssr: false
});

const SearchUsingKey = dynamic(() => import("./SearchUsingKey"), {
  loading: () => (
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{ 
        minHeight: '400px',
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

interface Props {
  params: {
    keyword: string;
  };
}

const Page = async ({ params }: Props) => {
  const key = await params.keyword;
  
  return (
    <>
      {/* Preload critical resources for better LCP */}
      <link rel="preload" title="Background Pattern" href="/videos/bg_pattern.mp4" as="video" type="video/mp4" />
      <link rel="preload" title="Tags Banner" href="/tags/tags-banner.jpg" as="image" />
      
      <section
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <div className="body-overlay"></div>
        
        <Suspense fallback={
          <div 
            style={{ 
              height: '10vh', 
              background: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h1 style={{ fontSize: '3rem', fontWeight: '700', color: '#333' }}>Blogs</h1>
          </div>
        }>
          <PagesBanner
            headingTitle={"Blogs"}
            videoURL={"/videos/bg_pattern.mp4"}
            mtP={"120px"}
            mtS={"100px"}
            sH={"10vh"}
          />
        </Suspense>
        
        <Suspense fallback={
          <div 
            className="d-flex justify-content-center align-items-center" 
            style={{ 
              minHeight: '400px',
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
          <SearchUsingKey keyword={key} />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
