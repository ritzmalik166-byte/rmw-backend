"use client";

import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import dynamic from "next/dynamic";

// Optimized dynamic imports for better code splitting and LCP
const PagesBanner = dynamic(() => import("@/components/pagesBanner/PagesBanner"), {
  loading: () => (
    <div 
      style={{ 
        height: '20vh', 
        background: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: '700', color: '#333' }}>Category</h1>
    </div>
  ),
  ssr: false
});

const Categorycards = dynamic(() => import("@/allPages/Category/catergory"), {
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

const Footer = dynamic(() => import('@/components/footer/Footer'), { 
  loading: () => <div style={{ height: '200px', background: '#f8f9fa' }} />,
  ssr: false 
});

const Page = () => {
  const params = useParams();
  const categorySlug = params?.categorypage as string;

  // Convert "web-design" → "Web Design"
  const formatCategoryTitle = (slug: string) => {
    if (!slug) return '';
    return slug
      .split('-')
      .map(word => word.toUpperCase())
      .join(' ');
  };

  const formattedCategory = formatCategoryTitle(categorySlug);

  return (
    <>
      {/* Preload critical resources for better LCP */}
      <link rel="preload" title="Background Pattern" href="/videos/bg_pattern.mp4" as="video" type="video/mp4" />
      <link rel="preload" title="Category Banner" href={`/category-images/${categorySlug}-banner.jpg`} as="image" />
      
      <section style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
        <Suspense fallback={
          <div 
            style={{ 
              height: '20vh', 
              background: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h1 style={{ fontSize: '3rem', fontWeight: '700', color: '#333' }}>{formattedCategory}</h1>
          </div>
        }>
          <PagesBanner
            headingTitle={formattedCategory}
            videoURL={"/videos/bg_pattern.mp4"}
            mtP={"120px"}
            mtS={"100px"}
            sH={"20vh"}
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
          <Categorycards />
        </Suspense>
        
        <Suspense fallback={<div style={{ height: '200px', background: '#f8f9fa' }} />}>
          <Footer />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
