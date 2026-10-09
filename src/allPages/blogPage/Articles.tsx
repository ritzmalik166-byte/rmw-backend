"use client";

import Loader from "@/components/loader/Loader";
import axios from "axios";
import React, { useEffect, useState, useMemo, useCallback, memo } from "react";
import { CalendarDays, Share2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useBlogContext } from "@/context/AllBlogContext";
import { setSessionStorageSafe } from "@/lib/safeWebStorage";

// Define MergedBlogs2 type here to ensure it includes 'slug'
export type MergedBlogs2 = {
  id: string;
  banner: string;
  title: string;
  createdAt: string;
  meta_description: string;
  status: string;
  slug: string;
};
import Image from "next/image";

// ---------------- Types ----------------
interface Article {
  _id: string;
  blogBanner: string;
  blogTitle: string;
  createdAt: string;
  blogDescription: string;
  blogStatus: boolean;
  blogSlug: string;
}

interface Article2 {
  slug: string;
  blog_image: string;
  title: string;
  created_at: string;
  meta_description: string;
  status: string;
}

// ---------------- Normalizers ----------------
const normalizeArticle = (blog: Article): MergedBlogs2 => ({
  id: blog._id,
  banner: blog.blogBanner,
  title: blog.blogTitle,
  createdAt: blog.createdAt,
  meta_description: blog.blogDescription,
  status: blog.blogStatus ? "active" : "inactive",
  slug: blog.blogSlug,
});

const normalizeArticle2 = (blog: Article2): MergedBlogs2 => ({
  id: blog.slug,
  banner: blog.blog_image,
  title: blog.title,
  createdAt: blog.created_at,
  meta_description: blog.meta_description,
  status: blog.status,
  slug: blog.slug,
});

/** Card UI only needs a short snippet; full Mongo HTML must not go into sessionStorage (iOS quota). */
function writeBlogListSessionCache(merged: MergedBlogs2[]): void {
  const metaLimits = [640, 400, 240, 0];
  for (const max of metaLimits) {
    const slim =
      max === 0
        ? merged.map((b) => ({ ...b, meta_description: "" }))
        : merged.map((b) => ({
              ...b,
              meta_description:
                  typeof b.meta_description === "string"
                      ? b.meta_description.slice(0, max)
                      : (b.meta_description ?? ""),
          }));
    try {
      sessionStorage.removeItem("all-blogs");
    } catch {
      /* ignore */
    }
    if (setSessionStorageSafe("all-blogs", JSON.stringify(slim))) return;
  }
}

// ---------------- Component ----------------
const Articles: React.FC = memo(() => {
  const { blogs, setBlogs } = useBlogContext();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const cardsPerPage = 6; // Further reduced for better initial render performance and TBT
  const path = usePathname();

  // 🔹 Restore pagination from sessionStorage
  useEffect(() => {
    const savedPage = Number(sessionStorage.getItem("page-no"));
    if (savedPage > 1) setCurrentPage(savedPage);
  }, []);

  // 🔹 Animate cards on blog change (optimized for performance)
  useEffect(() => {
    if (blogs?.length && typeof window !== "undefined" && blogs.length > 0) {
      setSessionStorageSafe("blog-animated", "true");
    }
  }, [blogs?.length]);

  // 🔹 Fetch blogs (with caching in sessionStorage)
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Check cache first
        const cached = sessionStorage.getItem("all-blogs");
        if (cached) {
          setBlogs(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const [resMongo, resMySQL] = await Promise.all([
          axios.get("/api/ritz_blogs/get-all-blogs"),
          axios.get("/api/all_blogs"),
        ]);

        const mongoBlogs: Article[] = resMongo.data.allBlogs || [];
        const mysqlBlogs: Article2[] = resMySQL.data || [];

        const merged: MergedBlogs2[] = [
          ...mongoBlogs.map(normalizeArticle),
          ...mysqlBlogs.map(normalizeArticle2),
        ];

        setBlogs(merged);

        writeBlogListSessionCache(merged);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [setBlogs]);

  // 🔹 Search + Pagination (memoized for performance) - MUST be before any returns
  const filteredBlogs = useMemo(() => {
    if (!blogs || !Array.isArray(blogs)) return [];
    return blogs
      .filter((b) => b.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(
        (b): b is MergedBlogs2 =>
          typeof b.status === "string" && b.status !== undefined
      );
  }, [blogs, searchQuery]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredBlogs.length / cardsPerPage);
  }, [filteredBlogs.length, cardsPerPage]);

  const currentCards = useMemo(() => {
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    return filteredBlogs.slice(indexOfFirstCard, indexOfLastCard);
  }, [filteredBlogs, currentPage, cardsPerPage]);

  // 🔹 Pagination handlers (memoized)
  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setSessionStorageSafe("page-no", String(newPage));
    }
  }, [currentPage, totalPages]);

  const handlePrev = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setSessionStorageSafe("page-no", String(newPage));
    }
  }, [currentPage]);

  // 🔹 Copy URL
  const [customAlert, setCustomAlert] = useState<boolean>(false);
  useEffect(() => {
    if (customAlert) {
      const timer = setTimeout(() => {
        setCustomAlert(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [customAlert]);

  const handleCopy = useCallback((fullPath: string) => {
    const url = `${window.location.origin}${path}/${fullPath}`;
    navigator.clipboard.writeText(url);
    setCustomAlert(true);
  }, [path]);

  // 🔹 Open blog
  const handleSingleBlogs = useCallback((slug: string) => {
    window.open(`/${slug}`, "_blank");
  }, []);

  // 🔹 Handle search change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  // 🔹 Show loading state immediately to prevent layout shift
  if (loading) return <Loader />;
  if (error)
    return <p className="text-center text-danger mt-4">Error: {error}</p>;
  
  // 🔹 Guard
  if (!blogs || !Array.isArray(blogs)) return null;

  // ---------------- Render ----------------
  function stripHtml(description: string) {
    if (!description) return "";
    return description
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  return (
    <div className="container mt-4 mb-5">
      {customAlert && (
        <div
          style={{
            position: "fixed",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "green",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            zIndex: 1000,
            minWidth: "250px",
            justifyContent: "space-between",
            transition: "opacity 0.3s ease",
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setCustomAlert(false)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            {/* Cross Icon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Alert Message */}
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: 700,
                color: "white",
              }}
            >
              URL Copied Successfully
            </p>
          </div>
        </div>
      )}

      {/* Search Input */}
      <div className="text-center mb-4">
         <input
           type="text"
           placeholder="Search by title..."
           value={searchQuery}
           onChange={handleSearchChange}
           className="form-control w-100 w-md-50 mx-auto p-2 rounded shadow"
           style={{ 
             maxWidth: "400px",
             contain: "layout style",
           }}
         />
      </div>

      {/* Blog Cards */}

       <div
         style={{
           display: "grid",
           gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
           gap: "2rem",
           padding: "1rem",
           contain: "layout",
         }}
       >
        {" "}
        {currentCards
          .filter((bl) => bl.status === "active")
          .map((article) => (
             <div
               className="mnc-card"
               key={article.id}
               onClick={() => handleSingleBlogs(article.slug)}
               style={{
                 display: "flex",
                 flexDirection: "column",
                 height: "100%",
                 borderRadius: "16px",
                 overflow: "hidden",
                 backgroundColor: "#fff",
                 boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                 transition: "transform 0.2s ease, box-shadow 0.2s ease",
                 cursor: "pointer",
                 contain: "layout style paint",
                 willChange: "transform",
                  minHeight: "440px",
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.transform = "translateY(-5px)";
                 e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.1)";
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.transform = "translateY(0)";
                 e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
               }}
             >
              {/* Image Section */}
               <div
                 style={{
                   height: "200px",
                   width: "100%",
                   overflow: "hidden",
                   position: "relative",
                   contain: "layout style paint",
                 }}
               >
                 <Image
                   src={
                     article.banner.includes("/images")
                       ? `/api/images${article.banner.split("/images")[1]}`
                       : `/blogs/${article.banner}`
                   }
                   alt={article.title}
                   fill
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                   loading="lazy"
                   quality={75}
                   placeholder="blur"
                   blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                   priority={false}
                   onLoad={() => {
                     // Optimize image loading
                     if (typeof window !== 'undefined') {
                       requestIdleCallback(() => {
                         // Preload next images when idle
                       });
                     }
                   }}
                 />
              </div>
              {/* Content Section */}
               <div
                 style={{
                   padding: "1rem",
                   display: "flex",
                   flexDirection: "column",
                   flexGrow: 1,
                   contain: "layout style",
                 }}
               >
                {/* Title */}
                 <h3
                   style={{
                     fontSize: "1.1rem",
                     fontWeight: "600",
                     marginBottom: "0.75rem",
                     color: "#333",
                     contain: "layout style",
                   }}
                 >
                  {article.title.split(" ").slice(0, 10).join(" ")}{" "}
                </h3>
                 <p
                   style={{
                     fontSize: "1rem",
                     color: "#555",
                     lineHeight: "1.6",
                     flexGrow: 1,
                     contain: "layout style",
                     minHeight: "76.8px", // Fixed height: 1rem * 1.6 lineHeight * 3 lines = 48px, but using 76.8px for 3 lines with line-height
                     display: "flex",
                     alignItems: "flex-start",
                   }}
                 >
                  {(() => {
                    const description = article?.meta_description || "";
                    const plainText = stripHtml(description) || "";
                    // Fixed character limit: 120 characters for consistent card heights
                    const maxChars = 120;
                    if (plainText.length <= maxChars) {
                      return plainText;
                    }
                    // Truncate at character limit, ensuring we don't cut in the middle of a word
                    const truncated = plainText.slice(0, maxChars);
                    const lastSpace = truncated.lastIndexOf(" ");
                    const finalText = lastSpace > maxChars * 0.8 
                      ? truncated.slice(0, lastSpace) 
                      : truncated;
                    return `${finalText.trim()}...`;
                  })()}
                </p>

                {/* Footer Actions */}
                 <div
                   style={{
                     display: "flex",
                     justifyContent: "space-between",
                     alignItems: "center",
                     marginTop: "1rem",
                     contain: "layout style",
                   }}
                 >
                  {/* Date */}
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#888",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <CalendarDays size={14} />
                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  {/* Share */}
                   <button
                     onClick={(e) => {
                       e.stopPropagation();
                       handleCopy(article.title.split(" ").join("-"));
                     }}
                     style={{
                       background: "transparent",
                       border: "1px solid #E5B05C",
                       color: "#E5B05C",
                       borderRadius: "6px",
                       padding: "0.3rem 0.6rem",
                       fontSize: "0.85rem",
                       display: "flex",
                       alignItems: "center",
                       gap: "0.3rem",
                       cursor: "pointer",
                       contain: "layout style paint",
                       willChange: "background-color, color",
                     }}
                   >
                    <Share2 size={15} /> Share
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      {filteredBlogs.length > 0 && (
        <div className="text-center mt-4">
                 <button
                   onClick={handlePrev}
                   disabled={currentPage === 1}
                   className="mx-2"
                   style={{
                     color: "#000",
                     background: "var(--tp-primary-blue)",
                     padding: "10px 20px",
                     borderRadius: "30px",
                     fontWeight: "bold",
                     cursor: currentPage === 1 ? "not-allowed" : "pointer",
                     opacity: currentPage === 1 ? 0.5 : 1,
                     transition: "all 0.3s ease-in-out",
                     boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
                     contain: "layout style paint",
                     willChange: "background-color, opacity",
                   }}
                 >
            ⬅ Prev
          </button>

          <span
            style={{
              fontSize: "16px",
              padding: "5px 15px",
              color: "#0c0c0c",
              borderRadius: "20px",
            }}
          >
            Page {currentPage} of {totalPages}
          </span>

                 <button
                   onClick={handleNext}
                   disabled={currentPage === totalPages}
                   className="mx-2"
                   style={{
                     color: "#000",
                     background: "var(--tp-primary-blue)",
                     padding: "10px 20px",
                     borderRadius: "30px",
                     fontWeight: "bold",
                     cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                     opacity: currentPage === totalPages ? 0.5 : 1,
                     transition: "all 0.3s ease-in-out",
                     boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
                     contain: "layout style paint",
                     willChange: "background-color, opacity",
                   }}
                 >
            Next ➡
          </button>
        </div>
      )}

      {/* No Results */}
      {filteredBlogs.length === 0 && (
        <p className="text-center text-muted mt-4">
          No blogs found for your search.
        </p>
      )}
    </div>
  );
});

Articles.displayName = "Articles";

export default Articles;