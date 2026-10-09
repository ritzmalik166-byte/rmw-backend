"use client";

import { ImagePlus, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useBlogContext } from "@/blogContext/BlogContext";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { formatSlugInput, generateSlugFromTitle, normalizeSlug } from "@/lib/slugify";
import { ADD_BLOG_STEP1_KEY } from "@/lib/addBlogDraft";
import {
  BlogField,
  BlogWizardShell,
  blogInputClass,
  blogPrimaryBtnClass,
  blogSecondaryBtnClass,
} from "@/components/addBlog/BlogWizardShell";
import { BLOG_AUTHORS, DEFAULT_BLOG_AUTHOR } from "@/lib/blogAuthors";

const LOCAL_STORAGE_KEY = ADD_BLOG_STEP1_KEY;

interface Category {
  _id: string;
  categoryName: string;
  categorySlug: string;
}

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const count = parseInt(params.count as string, 10) || 0;
  const slugEditedManually = useRef(false);

  const {
    setBlogTitle,
    setMetaTitle,
    setBlogBanner,
    blogBanner,
    blogTitle,
    metaKeywords,
    mtDesc,
    setMtDesc,
  } = useBlogContext();

  const [localTitle, setLocalTitle] = useState<string>(blogTitle || "");
  const [localSlug, setLocalSlug] = useState<string>("");
  const [localMeta, setLocalMeta] = useState<string>(metaKeywords || "");
  const [localBanner, setLocalBanner] = useState<string>(blogBanner || "");
  const [localCategory, setLocalCategory] = useState<string>("none-selected");
  const [localAuthor, setLocalAuthor] = useState<string>(DEFAULT_BLOG_AUTHOR);
  const [localMtDsc, setLocalMtDesc] = useState(mtDesc || "");
  const [ritzCategories, setRitzCategory] = useState<Category[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setLocalTitle(parsed.blogTitle || "");
      setLocalSlug(parsed.blogSlug || "");
      setLocalMeta(parsed.metaKeywords || "");
      setLocalBanner(parsed.blogBanner || "");
      setLocalCategory(parsed.blogCategory || "none-selected");
      setLocalAuthor(parsed.blogAuthor || DEFAULT_BLOG_AUTHOR);
      setBlogTitle(parsed.blogTitle || "");
      setMetaTitle(parsed.metaKeywords || "");
      setBlogBanner(parsed.blogBanner || "");
      setMtDesc(parsed.mtDesc || "");
      setLocalMtDesc(parsed.mtDesc || "");
      if (parsed.blogSlug) slugEditedManually.current = true;
    }
  }, []);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const { data } = await axios.get(`/api/ritzCats/getAllCats`);
        setRitzCategory(data.allCategories);
      } catch {
        setError("Could not load categories. Please refresh the page.");
      }
    };
    fetchAllCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setLocalBanner(base64String);
      setBlogBanner(base64String);
    };
    reader.readAsDataURL(file);
  };

  const saveDataToLocalStorage = () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        blogTitle: localTitle,
        blogSlug: localSlug,
        metaKeywords: localMeta,
        blogBanner: localBanner,
        blogCategory: localCategory,
        blogAuthor: localAuthor,
        mtDesc: localMtDsc,
      })
    );
  };

  const handleContinue = () => {
    setError("");
    if (!localTitle.trim()) {
      setError("Please enter a blog title.");
      return;
    }
    if (!localSlug.trim()) {
      setError("Please enter a URL slug.");
      return;
    }
    if (!localMtDsc.trim()) {
      setError("Please add a meta description for SEO.");
      return;
    }
    if (!localMeta.trim()) {
      setError("Please add meta keywords.");
      return;
    }
    if (!localBanner) {
      setError("Please upload a cover image.");
      return;
    }
    if (!localCategory || localCategory === "none-selected") {
      setError("Please select a category.");
      return;
    }
    if (!localAuthor) {
      setError("Please select an author.");
      return;
    }

    saveDataToLocalStorage();
    router.push(`/admin/add-blog/step-2/page/${count + 1}`);
  };

  return (
    <BlogWizardShell
      currentStep={1}
      title="Blog details"
      subtitle="Set up the basics — title, SEO settings, category, and a strong cover image."
      breadcrumbExtra="Step 1"
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/add-blog")}
            className={blogSecondaryBtnClass}
          >
            Back
          </button>
          <button type="button" onClick={handleContinue} className={blogPrimaryBtnClass}>
            Continue to content
          </button>
        </div>
      }
    >
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[320px,1fr]">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-700">Cover image</p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
            <input
              type="file"
              className="absolute inset-0 z-20 cursor-pointer opacity-0"
              accept="image/*"
              onChange={handleImageChange}
            />
            {localBanner ? (
              <img
                src={localBanner}
                alt="Selected cover"
                className="h-64 w-full object-cover"
              />
            ) : (
              <div className="flex h-64 flex-col items-center justify-center gap-3 px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <ImagePlus className="h-7 w-7 text-[#2955B3]" />
                </div>
                <div>
                  <p className="font-semibold text-slate-700">Upload cover image</p>
                  <p className="mt-1 text-xs text-slate-400">
                    JPG, PNG or WebP. This appears on the blog listing.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-blue-50/70 p-4 text-sm text-slate-600">
            <div className="mb-1 flex items-center gap-2 font-semibold text-[#2955B3]">
              <Sparkles className="h-4 w-4" />
              Quick tip
            </div>
            The title auto-generates your URL slug. You can still edit the slug manually.
          </div>

          <BlogField label="Blog title" required hint="Use a clear, descriptive headline.">
            <input
              type="text"
              value={localTitle}
              onChange={(e) => {
                const nextTitle = e.target.value;
                setLocalTitle(nextTitle);
                setBlogTitle(nextTitle);
                if (!slugEditedManually.current) {
                  setLocalSlug(generateSlugFromTitle(nextTitle));
                }
              }}
              placeholder="e.g. How to generate real estate leads in 2026"
              className={blogInputClass}
            />
          </BlogField>

          <BlogField
            label="URL slug"
            required
            hint={`Live URL: /${normalizeSlug(localSlug) || "your-slug-here"}`}
          >
            <input
              type="text"
              value={localSlug}
              onChange={(e) => {
                slugEditedManually.current = true;
                setLocalSlug(formatSlugInput(e.target.value));
              }}
              onBlur={() => setLocalSlug(normalizeSlug(localSlug))}
              placeholder="how-to-generate-real-estate-leads"
              className={blogInputClass}
            />
          </BlogField>

          <div className="grid gap-6 md:grid-cols-2">
            <BlogField
              label="Meta description"
              required
            >
              <textarea
                value={localMtDsc}
                onChange={(e) => {
                  setLocalMtDesc(e.target.value);
                  setMtDesc(e.target.value);
                }}
                rows={3}
                placeholder="Short summary shown in Google search results..."
                className={blogInputClass}
              />
            </BlogField>

            <BlogField label="Meta keywords" required hint="Separate keywords with commas.">
              <input
                type="text"
                value={localMeta}
                onChange={(e) => {
                  setLocalMeta(e.target.value);
                  setMetaTitle(e.target.value);
                }}
                placeholder="real estate, lead generation, marketing"
                className={blogInputClass}
              />
            </BlogField>
          </div>

          <BlogField label="Category" required>
            <select
              value={localCategory}
              onChange={(e) => setLocalCategory(e.target.value)}
              className={blogInputClass}
            >
              <option value="none-selected">Select a category</option>
              {ritzCategories.map((category) => (
                <option key={category._id} value={category.categorySlug}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </BlogField>

          <BlogField label="Author" required hint="Who wrote this blog post?">
            <select
              value={localAuthor}
              onChange={(e) => setLocalAuthor(e.target.value)}
              className={blogInputClass}
            >
              {BLOG_AUTHORS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </BlogField>
        </div>
      </div>
    </BlogWizardShell>
  );
};

export default Page;
