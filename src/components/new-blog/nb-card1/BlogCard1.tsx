"use client";

import React from "react";
import { Share2, BookOpen } from "lucide-react";

type BlogCardProps = {
  data: {
    _id: string;
    blogTitle: string;
    blogBanner: string;
  };
};

const BlogCard1: React.FC<BlogCardProps> = ({ data }) => {
  const { _id, blogTitle, blogBanner } = data;

  const handleReadMore = () => {
    window.location.href = `/${_id}`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blogTitle,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <div className="w-[500px] h-[500px] flex flex-col overflow-hidden bg-red-500 dark:bg-gray-900 rounded-xl shadow-md dark:shadow-gray-800 border dark:border-gray-800 transition hover:shadow-2xl">
      {/* Image Section */}
      <div className="h-52 w-[100%] bg-green-500 overflow-hidden">
        <img
          src={blogBanner}
          alt={blogTitle}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between bg-blue-600 flex-grow p-5">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 line-clamp-2 text-center">
          {blogTitle}
        </h3>

        {/* Button Section */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <button
            onClick={handleReadMore}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-black bg-blue-600 hover:bg-blue-700 rounded-full transition"
          >
            <BookOpen size={18} /> Read More
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full transition"
          >
            <Share2 size={18} /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard1;