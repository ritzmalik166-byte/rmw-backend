"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
// import Link from "next/link";
import styles from "./page.module.css";
import { CalendarDays, Share2 } from "lucide-react";

interface Blog {
  blog_image: string;
  title: string;
  slug: string;
  meta_description: string;
  meta_keywords: string;
  created_at: string;
}

interface Props {
  keyword: string;
}

const SearchUsingKey: React.FC<Props> = ({ keyword }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // console.log("this keywords i am taking in layout ", keyword);
  useEffect(() => {
    const fetchBlogs = async () => {
      if (!keyword) return;

      try {
        const response = await axios.get(
          `/api/my-sql/find-blogs-using-key/${keyword}`
        );
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [keyword]);

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found for this keyword.</p>
      ) : (
        <div className={styles.gridOuter}>
          <div className={styles.grid}>
            {blogs.map((blog, index) => (
              <div onClick={()=>window.open(`/${blog.slug}`, "_blank")} key={index} className={styles.card}>
                {/* Image */}
                <div className={styles.cardImageWrap}>
                  <img
                    src={
                      blog.blog_image?.includes("/images")
                        ? `https://ritzmediaworld.com/api/images${blog.blog_image.split("/images")[1]}`
                        : `https://ritzmediaworld.com/blogs/${blog.blog_image}`
                    }
                    alt={blog.title}
                    className={styles.cardImage}
                  />
                </div>
                {/* Content */}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>
                    {blog.title.split(" ").slice(0, 10).join(" ")}
                  </h3>
                  <p className={styles.cardDesc}>
                    {blog.meta_description?.split(/\s+/).slice(0, 30).join(" ")}
                    ...
                  </p>
                  <div className={styles.cardFooter}></div>
                </div>
                {/* Footer Actions */}
                <div className={styles.cardFooter}>
                  <div className={styles.cardDate}>
                    <CalendarDays size={14} />
                    {new Date(blog.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // handleCopy(...)
                    }}
                    className={styles.shareBtn}
                  >
                    <Share2 size={15} /> Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchUsingKey;