"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileUp,
  ImagePlus,
  Info,
  Link2,
  X,
} from "lucide-react";
import {
  BlogField,
  BlogWizardShell,
  blogInputClass,
  blogPrimaryBtnClass,
  blogSecondaryBtnClass,
} from "@/components/addBlog/BlogWizardShell";
import PublishOptionsPanel from "@/components/addBlog/PublishOptionsPanel";
import RMWPopup from "@/components/rmw_popup/RMWPopup";
import RMWLoader from "@/components/rmw_loader/RMWLoader";
import {
  formatSlugInput,
  generateSlugFromTitle,
  isValidSlugInput,
  normalizeSlug,
} from "@/lib/slugify";
import {
  extractGoogleDocId,
  resolveGoogleDocFormField,
} from "@/lib/google/docId";
import {
  getPublishSuccessMessage,
  type PublishMode,
} from "@/lib/blogPublish";

interface Category {
  _id: string;
  categoryName: string;
  categorySlug: string;
}

const ALLOWED_BANNER_TYPES = ["image/jpeg", "image/png", "image/webp"];

const TEMPLATE_PREVIEW = `BLOG META
==========

META TITLE
Your SEO title

META DESCRIPTION
Your SEO description

META KEYWORDS
keyword1, keyword2, keyword3

MT DESC
Your short description


BLOG CONTENT
============

Introduction

Main Heading

Your content...

Conclusion

Final content...`;

function submitLabel(mode: PublishMode): string {
  if (mode === "draft") return "Save draft";
  if (mode === "scheduled") return "Schedule blog";
  return "Import & Publish";
}

export default function UploadNewBlogPage() {
  const router = useRouter();
  const slugEditedManually = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogSlug, setBlogSlug] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("none-selected");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState("");
  const [googleDocInput, setGoogleDocInput] = useState("");
  const [publishMode, setPublishMode] = useState<PublishMode>("published");
  const [scheduledAt, setScheduledAt] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [showTemplate, setShowTemplate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [popup, setPopup] = useState<{ message: string; status: number } | null>(
    null
  );

  const detectedDocId = extractGoogleDocId(googleDocInput);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/ritzCats/getAllCats");
        setCategories(data.allCategories || []);
      } catch {
        setError("Could not load categories. Please refresh the page.");
      }
    };
    void fetchCategories();
  }, []);

  useEffect(() => {
    return () => {
      if (bannerPreview.startsWith("blob:")) {
        URL.revokeObjectURL(bannerPreview);
      }
    };
  }, [bannerPreview]);

  const setBannerFromFile = (file: File | null) => {
    if (bannerPreview.startsWith("blob:")) {
      URL.revokeObjectURL(bannerPreview);
    }
    if (!file) {
      setBannerFile(null);
      setBannerPreview("");
      return;
    }
    if (!ALLOWED_BANNER_TYPES.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      return;
    }
    setError("");
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setBannerFromFile(file);
    e.target.value = "";
  };

  const validate = (): string | null => {
    if (!blogTitle.trim()) return "Please enter a blog title.";

    const slug = normalizeSlug(blogSlug);
    if (!slug || !isValidSlugInput(slug)) {
      return "A valid slug URL is required (letters, numbers, and hyphens only).";
    }

    if (!selectedCategoryId || selectedCategoryId === "none-selected") {
      return "Please select a category.";
    }

    if (
      (publishMode === "published" || publishMode === "scheduled") &&
      !bannerFile
    ) {
      return "Please upload a blog banner.";
    }

    if (!googleDocInput.trim()) {
      return "Please enter a Google Docs URL or document ID.";
    }

    if (!resolveGoogleDocFormField(googleDocInput)) {
      return "Please enter a valid Google Docs URL or document ID.";
    }

    if (publishMode === "scheduled") {
      if (!scheduledAt) return "Schedule date and time are required.";
      const when = new Date(scheduledAt);
      if (Number.isNaN(when.getTime()) || when <= new Date()) {
        return "Scheduled time must be in the future.";
      }
    }

    return null;
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setPopup({ message: validationError, status: 400 });
      return;
    }

    const docField = resolveGoogleDocFormField(googleDocInput);
    if (!docField) {
      const msg = "Please enter a valid Google Docs URL or document ID.";
      setError(msg);
      setPopup({ message: msg, status: 400 });
      return;
    }

    const formData = new FormData();
    formData.append("blogTitle", blogTitle.trim());
    formData.append("blogSlug", normalizeSlug(blogSlug));
    formData.append("blogCategoryId", selectedCategoryId);
    formData.append("publishStatus", publishMode);

    if (publishMode === "scheduled" && scheduledAt) {
      formData.append("scheduledAt", new Date(scheduledAt).toISOString());
    }

    if ("googleDocUrl" in docField) {
      formData.append("googleDocUrl", docField.googleDocUrl);
    } else {
      formData.append("googleDocId", docField.googleDocId);
    }

    if (bannerFile) {
      formData.append("blogBanner", bannerFile);
    }

    const token =
      typeof window !== "undefined" ? localStorage.getItem("rm_token") : null;

    setSubmitting(true);
    try {
      const { data, status } = await axios.post(
        "/api/blog/import-google-doc",
        formData,
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      const successMessage =
        data?.message || getPublishSuccessMessage(publishMode, scheduledAt);
      setPopup({ message: successMessage, status: status || 201 });

      setTimeout(() => {
        router.push(
          publishMode === "scheduled"
            ? "/admin/manage-blogs?status=scheduled"
            : publishMode === "draft"
              ? "/admin/manage-blogs?status=draft"
              : "/admin/manage-blogs"
        );
      }, 1200);
    } catch (err: unknown) {
      const ax = err as {
        response?: { data?: { message?: string }; status?: number };
        message?: string;
      };
      const message =
        ax.response?.data?.message ||
        "Google document could not be imported. Please try again.";
      const status = ax.response?.status || 500;
      setError(message);
      setPopup({ message, status });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {popup && (
        <RMWPopup
          message={popup.message}
          status={popup.status}
          onClose={() => setPopup(null)}
        />
      )}

      <BlogWizardShell
        hideSteps
        badgeLabel="Docs Import"
        breadcrumbLabel="Blogs"
        breadcrumbExtra="Import Blog"
        title="Import Blog from Google Docs"
        subtitle="Upload a blog banner and import your structured blog content directly from Google Docs."
        footer={
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              disabled={submitting}
              onClick={() => router.push("/admin/manage-blogs")}
              className={blogSecondaryBtnClass}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={() => void handleSubmit()}
              className={blogPrimaryBtnClass}
            >
              {submitting ? <RMWLoader /> : submitLabel(publishMode)}
            </button>
          </div>
        }
      >
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-8">
          {/* Blog information */}
          <section className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#0B1623]">Blog information</h2>
              <p className="text-sm text-slate-500">
                Title, slug, and category are set here. Metadata and body come from Google Docs.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-700">
                  Blog banner <span className="text-red-500">*</span>
                </p>
                <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="absolute inset-0 z-20 cursor-pointer opacity-0"
                    accept="image/jpeg,image/png,image/webp"
                    disabled={submitting}
                    onChange={handleBannerChange}
                  />
                  {bannerPreview ? (
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={bannerPreview}
                        alt="Selected banner"
                        className="h-56 w-full object-cover sm:h-64"
                      />
                      <button
                        type="button"
                        disabled={submitting}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setBannerFromFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="absolute right-3 top-3 z-30 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow hover:bg-white"
                        aria-label="Remove banner"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/50 to-transparent px-4 py-3 text-center text-xs font-medium text-white">
                        Click to replace
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-56 flex-col items-center justify-center gap-3 px-6 text-center sm:h-64">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                        <ImagePlus className="h-7 w-7 text-[#2955B3]" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700">Upload banner</p>
                        <p className="mt-1 text-xs text-slate-400">
                          JPG, PNG or WebP. This is the only image uploaded here.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-5">
                <BlogField label="Blog title" required hint="Use a clear, descriptive headline.">
                  <input
                    type="text"
                    value={blogTitle}
                    disabled={submitting}
                    onChange={(e) => {
                      const nextTitle = e.target.value;
                      setBlogTitle(nextTitle);
                      if (!slugEditedManually.current) {
                        setBlogSlug(generateSlugFromTitle(nextTitle));
                      }
                    }}
                    placeholder="e.g. How to Build a Scalable Real Estate Website"
                    className={blogInputClass}
                  />
                </BlogField>

                <BlogField
                  label="URL slug"
                  required
                  hint={`Live URL: /${normalizeSlug(blogSlug) || "your-slug-here"}`}
                >
                  <input
                    type="text"
                    value={blogSlug}
                    disabled={submitting}
                    onChange={(e) => {
                      slugEditedManually.current = true;
                      setBlogSlug(formatSlugInput(e.target.value));
                    }}
                    onBlur={() => setBlogSlug(normalizeSlug(blogSlug))}
                    placeholder="how-to-build-a-scalable-real-estate-website"
                    className={blogInputClass}
                  />
                </BlogField>

                <BlogField label="Category" required>
                  <select
                    value={selectedCategoryId}
                    disabled={submitting}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    className={blogInputClass}
                  >
                    <option value="none-selected">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </BlogField>
              </div>
            </div>
          </section>

          {/* Google Docs import */}
          <section className="rounded-2xl border border-[#2955B3]/20 bg-gradient-to-br from-blue-50/80 to-white p-5 sm:p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2955B3] text-white shadow-sm">
                <FileUp className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0B1623]">
                  Import from Google Docs
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Your Google Doc should follow the required blog template. Metadata and
                  rich blog content will be imported automatically.
                </p>
              </div>
            </div>

            <BlogField
              label="Google Docs URL or Document ID"
              required
              hint="Paste a docs.google.com link or the document ID only."
            >
              <div className="relative">
                <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={googleDocInput}
                  disabled={submitting}
                  onChange={(e) => setGoogleDocInput(e.target.value)}
                  placeholder="https://docs.google.com/document/d/... or 1AbCdEfGhIj..."
                  className={`${blogInputClass} pl-10`}
                />
              </div>
            </BlogField>

            {googleDocInput.trim() && (
              <div
                className={`mt-3 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium ${
                  detectedDocId
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-800"
                }`}
              >
                {detectedDocId ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Google Docs document ID detected
                  </>
                ) : (
                  <>
                    <Info className="h-3.5 w-3.5" />
                    Enter a valid Google Docs URL or document ID
                  </>
                )}
              </div>
            )}

            <div className="mt-4 rounded-xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-600">
              <p className="mb-2 flex items-center gap-2 font-semibold text-slate-700">
                <Info className="h-4 w-4 text-[#2955B3]" />
                How should my Google Doc be structured?
              </p>
              <p className="mb-2 text-xs leading-relaxed text-slate-500">
                Your document should contain{" "}
                <strong className="text-slate-700">BLOG META</strong> (META TITLE, META
                DESCRIPTION, META KEYWORDS, MT DESC) and{" "}
                <strong className="text-slate-700">BLOG CONTENT</strong> with Google Docs
                formatting — headings, paragraphs, bold, italic, links, lists, and tables.
              </p>
              <p className="text-xs text-slate-500">
                Images inside the Google Doc are not uploaded through this form. Only the
                blog banner is uploaded here.
              </p>
            </div>

            <button
              type="button"
              disabled={submitting}
              onClick={() => setShowTemplate((v) => !v)}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#2955B3] hover:underline"
            >
              {showTemplate ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              {showTemplate ? "Hide Google Docs template" : "View Google Docs template"}
            </button>

            {showTemplate && (
              <pre className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">
                {TEMPLATE_PREVIEW}
              </pre>
            )}
          </section>

          {/* Publishing */}
          <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6">
            <PublishOptionsPanel
              mode={publishMode}
              scheduledAt={scheduledAt}
              onModeChange={setPublishMode}
              onScheduledAtChange={setScheduledAt}
              disabled={submitting}
            />
          </section>
        </div>
      </BlogWizardShell>
    </>
  );
}
