"use client";

import React, { useEffect, useRef, useState, Suspense, memo } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
import { setSessionStorageSafe } from "@/lib/safeWebStorage";

// Optimized dynamic imports for better code splitting and LCP
const CalendarDays = dynamic(() => import("lucide-react").then(mod => ({ default: mod.CalendarDays })), {
  loading: () => <span>📅</span>,
  ssr: false
});

import styles from "./page.module.css";

interface BlogBody {
  metaTitle: string;
  metaDescription: string;
  innerImg?: string;
}

interface BlogInfo {
  blogTitle: string;
  blogBanner: string;
  blogBody: BlogBody[];
  createdAt: string;
}

// Memoized blog content component for better performance
const BlogContent = memo(({ blogInfo }: { blogInfo: BlogInfo }) => {
  const articleRef = useRef(null);

  return (
    <article ref={articleRef} className={styles.article}>
      {/* Header */}
      <header className={styles.blogHeader}>
        <img
          src={blogInfo.blogBanner}
          alt="Blog banner"
          className={styles.blogBanner}
          loading="lazy"
        />
        <h1 className={styles.blogTitle}>{blogInfo.blogTitle}</h1>
        <p className={styles.publishedDate}>
          <CalendarDays
            size={16}
            style={{ marginRight: 6, display: "inline-block" }}
          />
          Published on {new Date(blogInfo.createdAt).toLocaleDateString()}
        </p>
        <hr className={styles.hr} />
      </header>
      
      {/* Blog Sections */}
      {blogInfo.blogBody.map((section, idx) => (
        <section key={idx} className={styles.blogSection}>
          <h2 className={styles.metaTitle}>{section.metaTitle}</h2>

          <div
            className={styles.metaDescription}
            dangerouslySetInnerHTML={{ __html: section.metaDescription }}
          />

          {section.innerImg && (
            <img
              src={section.innerImg}
              alt={`Section image ${idx + 1}`}
              className={styles.innerImg}
              loading="lazy"
            />
          )}
        </section>
      ))}
    </article>
  );
});

BlogContent.displayName = "BlogContent";

const BlogPage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const [blogInfo, setSingleBlog] = useState<BlogInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) fetchSingleBlog();
  }, [id]);

  const fetchSingleBlog = async () => {
    try {
      setLoading(true);
      
      // Check cache first for better performance
      const cached = sessionStorage.getItem(`blog-${id}`);
      if (cached) {
        setSingleBlog(JSON.parse(cached));
        setLoading(false);
        return;
      }

      const res = await axios.get<{ blog: BlogInfo }>(
        `/api/ritz_blogs/get-single-blog/${id}`
      );
      setSingleBlog(res.data.blog);

      setSessionStorageSafe(`blog-${id}`, JSON.stringify(res.data.blog));
      setError(null);
    } catch (error) {
      console.error("Error fetching single blog:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
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
        <p className={styles.loadingText}>Loading your blog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.loadingText}>{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Preload critical resources for better LCP */}
      <link rel="preload" title="Single Blog" href={`/api/ritz_blogs/get-single-blog/${id}`} as="fetch" crossOrigin="anonymous" />
      
      <div className={styles.container}>
        {!blogInfo ? (
          <p className={styles.loadingText}>Loading your blog...</p>
        ) : (
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
            <BlogContent blogInfo={blogInfo} />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default BlogPage;
