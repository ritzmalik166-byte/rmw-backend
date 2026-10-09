"use client";

import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { setSessionStorageSafe } from "@/lib/safeWebStorage";

// Optimized dynamic imports for better code splitting and LCP
const BlogCard1 = dynamic(() => import("@/components/new-blog/nb-card1/BlogCard1"), {
  loading: () => (
    <div 
      style={{ 
        width: '300px',
        height: '400px',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        borderRadius: '8px'
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

type BlogType = {
  _id: string;
  blogTitle: string;
  blogBanner: string;
};

const BlogPage: React.FC = () => {
  const [allBlogs, setAllBlogs] = useState<BlogType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllBlogs = async () => {
    try {
      // Check cache first for better performance
      const cached = sessionStorage.getItem("ritz-blogs");
      if (cached) {
        setAllBlogs(JSON.parse(cached));
        setLoading(false);
        return;
      }

      const { data } = await axios.get(
        "/api/ritz_blogs/get-all-blogs"
      );
      setAllBlogs(data.allBlogs);

      const listForCache = (data.allBlogs as BlogType[]).map((b) => ({
        _id: b._id,
        blogTitle: b.blogTitle,
        blogBanner: b.blogBanner,
      }));
      setSessionStorageSafe("ritz-blogs", JSON.stringify(listForCache));
      setError(null);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setError("Unable to load blogs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <>
      {/* Preload critical resources for better LCP */}
      <link rel="preload" title="All Blogs" href="/api/ritz_blogs/get-all-blogs" as="fetch" crossOrigin="anonymous" />
      
      <main className="px-4 md:px-8 py-10 bg-red-500 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Header */}
        <section className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore All Blogs
          </h1>
          <p className="text-lg text-gray-100 dark:text-gray-300">
            Discover articles by creators at Ritz Media — Stay updated with the
            latest in tech, trends, and tutorials.
          </p>
        </section>

        {/* Blog List */}
        <section className="flex flex-wrap justify-center gap-6">
          {loading && (
            <div className="w-full flex justify-center">
              <div 
                style={{ 
                  width: '300px',
                  height: '400px',
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite',
                  borderRadius: '8px'
                }}
              >
                <style jsx>{`
                  @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                  }
                `}</style>
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-center w-full">{error}</p>}

          {!loading && !error && allBlogs && allBlogs.length === 0 && (
            <p className="text-center text-lg w-full">No blogs found.</p>
          )}

          {!loading &&
            !error &&
            allBlogs &&
            allBlogs.map((blog) => (
              <Suspense key={blog._id} fallback={
                <div 
                  style={{ 
                    width: '300px',
                    height: '400px',
                    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                    borderRadius: '8px'
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
                <BlogCard1 data={blog} />
              </Suspense>
            ))}
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-100 dark:text-gray-400">
          Designed & Developed by{" "}
          <span className="font-semibold">@Ritz Media</span>
        </footer>
      </main>
    </>
  );
};

export default BlogPage;
