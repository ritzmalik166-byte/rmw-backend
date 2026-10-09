
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import styles from "./loading.module.css";

// Optimized dynamic imports for better code splitting and LCP
// Server-side rendering enabled for better page speed
const Articles = dynamic(() => import("@/allPages/blogPage/Articles"), {
  loading: () => (
    <div 
      className={`d-flex justify-content-center align-items-center ${styles.shimmer}`}
      style={{ 
        minHeight: '400px'
      }}
    />
  )
});

const Footer = dynamic(() => import("@/components/footer/Footer"), {
  loading: () => <div style={{ height: '200px', background: '#f8f9fa' }} />
});

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
  )
});

const page = () => {
  return (
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
            className={`d-flex justify-content-center align-items-center ${styles.shimmer}`}
            style={{ 
              minHeight: '400px'
            }}
          />
        }>
          <Articles />
        </Suspense>

        <Suspense fallback={<div style={{ height: '200px', background: '#f8f9fa' }} />}>
          <Footer />
        </Suspense>
      </section>
  );
};

export default page;