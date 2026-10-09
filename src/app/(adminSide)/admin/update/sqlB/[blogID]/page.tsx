"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Editor from "@/components/Editor/Editor";
import styles from "./page.module.css";
import Image from "next/image";
import RMWLoader from "@/components/rmw_loader/RMWLoader";
import RMWPopup from "@/components/rmw_popup/RMWPopup";
import { formatSlugInput, normalizeSlug } from "@/lib/slugify";

interface BlogData {
  title: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  blog_image: string;
  description: string;
  category_id: number;
  slug: string;
}
interface CategoryData {
  id: number;
  name: string;
}

function Page() {
  const params = useParams();
  const id = params.blogID as string;
  const [rmwLoader, setRMWLoader] = useState(false);
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [editorValue, setEditorValue] = useState<string>("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [ritzCats, setRitzCats] = useState<CategoryData[]>([]);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ message: "", status: 0 });

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const { data, status } = await axios.get(`/api/blog/${id}`);
        const allCats = await axios.get("/api/blog/categories");
        setRitzCats(allCats.data);
        setBlog(data.blog);
        setEditorValue(data.blog.description);
        setImagePreview(data.blog.blog_image); // Existing image
        setPopupData({ message: data.message, status });
      } catch (error) {
        setRMWLoader(false);
        if (typeof error === "object" && error !== null && "message" in error) {
          setPopupData({
            message: (error as { message: string }).message,
            status:
              error instanceof Error && "status" in error
                ? (error as { status?: number }).status ?? 500
                : 500,
          });
        } else {
          setPopupData({ message: "An unknown error occurred.", status: 500 });
        }
        setShowPopup(true);
      }
    };

    if (id) fetchSingleBlog();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (imagePreview && newImage) {
        URL.revokeObjectURL(imagePreview); // Clean up old preview
      }
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!blog) return;

    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("meta_title", blog.meta_title);
    formData.append("meta_description", blog.meta_description);
    formData.append("meta_keywords", blog.meta_keywords);
    formData.append("category_id", String(blog.category_id));
    formData.append("description", editorValue);
    formData.append("slug", blog.slug);
    setRMWLoader(true);
    if (newImage) {
      formData.append("blog_image", newImage);
    }
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("rm_token")
          : null;
      const { status, data } = await axios.patch(`/api/blog/${id}`, formData, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      setPopupData({ message: data.message, status });
      setRMWLoader(false);
      setShowPopup(true);
    } catch (error) {
      setRMWLoader(false);
      if (typeof error === "object" && error !== null && "message" in error) {
        setPopupData({
          message: (error as { message: string }).message,
          status:
            error instanceof Error && "status" in error
              ? (error as { status?: number }).status ?? 500
              : 500,
        });
      } else {
        setPopupData({ message: "An unknown error occurred.", status: 500 });
      }
      setShowPopup(true);
    }
  };

  if (!blog) return <div className={styles.loader}>Loading blog data...</div>;

  return (
    <section className={styles.container}>
      {showPopup && (
        <RMWPopup
          message={popupData.message}
          status={popupData.status}
          onClose={() => setShowPopup(false)}
        />
      )}
      {rmwLoader && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[9999]">
          <RMWLoader />
        </div>
      )}
      <h1 className={styles.heading}>Edit Blog</h1>
      <div className={styles.form}>
        {/* Title */} <label>Title</label>
        <input
          type="text"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        />
        {/* Slug URL */} <label>Slug URL</label>
        <input
          type="text"
          value={blog.slug}
          onChange={(e) =>
            setBlog({ ...blog, slug: formatSlugInput(e.target.value) })
          }
          onBlur={() =>
            setBlog((prev) =>
              prev ? { ...prev, slug: normalizeSlug(prev.slug) } : prev
            )
          }
          placeholder="e.g. my blog post"
        />
        <p className="text-xs text-[#666]">
          Blog will open at /{normalizeSlug(blog.slug) || "your-slug-url"}
        </p>
        {/* Meta Title */} <label>Meta Title</label>
        <input
          type="text"
          value={blog.meta_title}
          onChange={(e) => setBlog({ ...blog, meta_title: e.target.value })}
        />
        {/* Meta Description */} <label>Meta Description</label>
        <textarea
          rows={3}
          value={blog.meta_description}
          onChange={(e) =>
            setBlog({ ...blog, meta_description: e.target.value })
          }
        />
        {/* Meta Keywords */} <label>Meta Keywords</label>
        <input
          type="text"
          value={blog.meta_keywords}
          onChange={(e) => setBlog({ ...blog, meta_keywords: e.target.value })}
        />
        {/* Category */} <label>Category</label>
        <select
          className={styles.select}
          value={blog.category_id}
          onChange={(e) =>
            setBlog({ ...blog, category_id: Number(e.target.value) })
          }
        >
          {ritzCats
            .filter((cat) => cat.id === blog.category_id)
            .map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            ))}

          {ritzCats
            .filter((cat) => cat.id !== blog.category_id)
            .map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            ))}
        </select>
        {/* Blog Image */} <label>Blog Image</label>
        {imagePreview && (
          <div
            style={{
              position: "relative",
              minHeight: "200px",
              minWidth: "200px",
            }}
          >
            <Image
              src={
                newImage
                  ? imagePreview
                  : blog.blog_image.includes("/images")
                  ? `${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images${
                      blog.blog_image.split("/images")[1]
                    }`
                  : `/blogs/${blog.blog_image}`
              }
              alt={blog.meta_title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
        )}
        <button
          type="button"
          className={styles.changeImageBtn}
          onClick={() => fileInputRef.current?.click()}
        >
          Change Image
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />
        {/* Description */} <label>Description</label>
        <Editor value={editorValue} onChange={setEditorValue} />
        <button onClick={handleSubmit} className={styles.submitBtn}>
          {rmwLoader ? <RMWLoader /> : "Submit"}
        </button>
      </div>
    </section>
  );
}

export default Page;
