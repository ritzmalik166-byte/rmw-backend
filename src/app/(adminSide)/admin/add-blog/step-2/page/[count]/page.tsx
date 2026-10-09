"use client";

import { ImagePlus, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useBlogContext } from "@/blogContext/BlogContext";
import { useParams, useRouter } from "next/navigation";
import Editor from "@/components/Editor/Editor";
import axios from "axios";
import RMWPopup from "@/components/rmw_popup/RMWPopup";
import RMWLoader from "@/components/rmw_loader/RMWLoader";
import {
  ADD_BLOG_STEP1_KEY,
  ADD_BLOG_STEP2_PREFIX,
  clearAddBlogDraft,
} from "@/lib/addBlogDraft";
import PublishOptionsPanel from "@/components/addBlog/PublishOptionsPanel";
import {
  BlogField,
  BlogWizardShell,
  blogInputClass,
  blogPrimaryBtnClass,
  blogSecondaryBtnClass,
} from "@/components/addBlog/BlogWizardShell";
import {
  getPublishSuccessMessage,
  type PublishMode,
} from "@/lib/blogPublish";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const count = parseInt(params.count as string, 10) || 1;

  const LOCAL_STORAGE_KEY = `${ADD_BLOG_STEP2_PREFIX}${count}`;

  const {
    setMetaTitle,
    setInnerImg,
    setMetaDescription,
  } = useBlogContext();

  const [localTitle, setLocalTitle] = useState<string>("");
  const [localMeta, setLocalMeta] = useState<string>("");
  const [localBanner, setLocalBanner] = useState<string>("");
  const [localCategory, setLocalCategory] = useState<string>("All Category");
  const [pageNum, setPageNum] = useState(count);

  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ message: "", status: 0 });
  const [rmwLoader, setRMWLoader] = useState(false);
  const [publishMode, setPublishMode] = useState<PublishMode>("published");
  const [scheduledAt, setScheduledAt] = useState("");
  const [formError, setFormError] = useState("");
  // const [blogBody, setBlogBody] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const { blogTitle, metaKeywords, blogBanner, blogCategory } = parsed;

      setLocalTitle(blogTitle || "");
      setMetaTitle(blogTitle || "");

      setLocalMeta(metaKeywords || "");
      setMetaDescription(metaKeywords || "");

      setLocalBanner(blogBanner || "");
      setInnerImg(blogBanner || "");

      setLocalCategory(blogCategory || "All Category");
    }
  }, [count]);

  useEffect(() => {
    setPageNum(count);
  }, [count]);

  const saveDataToLocalStorage = () => {
    const data = {
      blogTitle: localTitle,
      metaKeywords: localMeta,
      blogBanner: localBanner,
      blogCategory: localCategory,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  const handleNext = () => {
    setFormError("");
    if (!localTitle.trim() || !localMeta.trim()) {
      setFormError("Add a page title and content before adding another page.");
      return;
    }
    saveDataToLocalStorage();
    router.push(`/admin/add-blog/step-2/page/${count + 1}`);
  };
  const removeInnImg = () => {
    setLocalBanner(" ");
  };
  const handlePrev = () => {
    if (count > 1) {
      saveDataToLocalStorage();
      router.push(`/admin/add-blog/step-2/page/${count - 1}`);
    } else {
      saveDataToLocalStorage();
      router.push(`/admin/add-blog/step-1`);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setLocalBanner(base64);
        setInnerImg(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  function dataURLtoFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(",");
    const match = arr[0].match(/:(.*?);/);

    if (!match) {
      throw new Error("MIME type could not be extracted from the data URL.");
    }

    const mime = match[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const handleUploadBlog = async () => {
    saveDataToLocalStorage();
    setFormError("");

    if (publishMode === "scheduled" && !scheduledAt) {
      setFormError("Please choose a schedule date and time.");
      return;
    }

    if (publishMode === "published" && (!localTitle.trim() || !localMeta.trim())) {
      setFormError("Add a page title and content before publishing.");
      return;
    }

    try {
      const savedData1 = localStorage.getItem(ADD_BLOG_STEP1_KEY);

      let blogTitle = "";
      let blogSlug = "";
      let blogBanner = null;
      let metaKeywords = "";
      let blogCategory = "All Category";
      let mtDesc = "";
      let blogAuthor = "";
      setRMWLoader(true);
      if (savedData1) {
        const parsed = JSON.parse(savedData1);
        blogTitle = parsed.blogTitle || "";
        blogSlug = parsed.blogSlug || "";
        metaKeywords = parsed.metaKeywords || "";
        blogCategory = parsed.blogCategory || "All Category";
        mtDesc = parsed.mtDesc;
        blogAuthor = parsed.blogAuthor || "";

        if (parsed.blogBanner?.startsWith("data:image")) {
          blogBanner = dataURLtoFile(parsed.blogBanner, "cover.jpg");
        }
      }

      const combinedBlogBody = [];
      const imageFiles = [];

      for (let i = 1; i <= count; i++) {
        const step2Data = localStorage.getItem(`${ADD_BLOG_STEP2_PREFIX}${i}`);
        if (step2Data) {
          const parsed = JSON.parse(step2Data);

          combinedBlogBody.push({
            metaTitle: parsed.blogTitle || "",
            metaDescription: parsed.metaKeywords || "",
          });

          if (parsed.blogBanner?.startsWith("data:image")) {
            const file = dataURLtoFile(parsed.blogBanner, `inner-img-${i}.jpg`);
            imageFiles.push(file);
          } else {
            imageFiles.push(null);
          }
        }
      }

      const formData = new FormData();
      formData.append("blogTitle", blogTitle);
      formData.append("blogSlug", blogSlug);
      formData.append("metaKeywords", metaKeywords);
      formData.append("blogCategory", blogCategory);
      formData.append("mtDesc", mtDesc);
      formData.append("blogAuthor", blogAuthor);
      formData.append("blogBody", JSON.stringify(combinedBlogBody));
      formData.append("publishStatus", publishMode);
      if (publishMode === "scheduled" && scheduledAt) {
        formData.append("scheduledAt", new Date(scheduledAt).toISOString());
      }

      if (blogBanner instanceof File) {
        formData.append("blogBanner", blogBanner);
      }

      imageFiles.forEach((img, index) => {
        if (img instanceof File) {
          formData.append(`innerImg-${index}`, img);
        }
      });

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("rm_token")
          : null;
      const { data, status } = await axios.post(
        "/api/ritz_blogs/add-new-blog",
        formData,
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      if (status === 201) {
        clearAddBlogDraft();
        alert(getPublishSuccessMessage(publishMode, scheduledAt));
        router.push(
          publishMode === "scheduled"
            ? "/admin/manage-blogs?status=scheduled"
            : publishMode === "draft"
              ? "/admin/manage-blogs?status=draft"
              : "/admin/manage-blogs"
        );
        return;
      }
      setPopupData({ message: data.message, status });
      setShowPopup(true);
      setRMWLoader(false);
    } catch (error) {
      setRMWLoader(false);
      if (axios.isAxiosError(error)) {
        setPopupData({
          message: error.response?.data?.message || error.message,
          status: error.response?.status || 500,
        });
      } else if (typeof error === "object" && error !== null && "message" in error) {
        setPopupData({
          message: (error as { message: string }).message,
          status: 500,
        });
      } else {
        setPopupData({ message: "An unknown error occurred.", status: 500 });
      }
      setShowPopup(true);
    }
  };

  interface IMGFORPREVIEW {
    url: string;
    id: string;
  }
  interface GETLINKS {
    imgPath: string;
    _id: string;
  }
  // From Here The Image URL Generator Logic Is Starting
  const [uploadImgModal, setUploadImgModal] = useState(false);
  const [imgToSend, setImgToSend] = useState<File[]>([]);
  const [imgToShow, setImgToShow] = useState<IMGFORPREVIEW[]>([]);
  const [linkToShow, setLinkToShow] = useState<GETLINKS[]>([]);
  const [eImgLoder, setEimgLoder] = useState(false);
  // const [copiedImgLink, setCopiedImgLink] = useState("");
  // const [allPrevUplodedImgs, setAllPrevSelectedImgs] = useState([]);
  const imgUploaderModal = () => {
    setUploadImgModal((pr) => !pr);
  };
  const handleSelectNewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e) return;
    const allfiles = e.target.files;
    if (allfiles && allfiles?.length > 0) {
      [...allfiles].forEach((file) => {
        setImgToSend((pr) => [file, ...pr]);
        const url = URL.createObjectURL(file);
        setImgToShow((pr) => [...pr, { id: file.name, url: url }]);
      });
    }
  };
  const removeExtraImgs = (key: string) => {
    setImgToSend((pr) => pr.filter((img) => img.name !== key));
    setImgToShow((pr) => pr.filter((img) => img.id !== key));
  };

  const handleUploadSelectedImg = async () => {
    if (imgToSend.length === 0) return;
    const eImg = new FormData();
    try {
      setEimgLoder(true);

      for (let i = 0; i < imgToSend.length; i++) {
        eImg.append(`eImage-${i}`, imgToSend[i]);
      }
      const { data, status } = await axios.post("/api/eImgs", eImg);
      if (status === 201) {
        setImgToShow([]);
        setImgToSend([]);
        setLinkToShow((pr) => [...pr, data.files]);
        setEimgLoder(false);
        setEimgLoder(false);
      } else {
        setEimgLoder(false);
      }
      setPopupData({ message: data.message, status });
      setShowPopup(true);
    } catch (error) {
      setEimgLoder(false);
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

  useEffect(() => {
    const fetchSavedImage = async () => {
      try {
        const data = await axios.get("/api/eImgs");
        if (data.status === 200) {
          setLinkToShow(data.data.allImages);
        }
      } catch (error) {
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
    fetchSavedImage();
  }, []);

  const handleDeleteSavedImg = async (id: string) => {
    try {
      const { data, status } = await axios.delete(`/api/eImgs/${id}`);
      if (status === 200) {
        setLinkToShow((pr) => pr.filter((img) => img._id !== id));
      }
      setPopupData({ message: data.message, status });
      setShowPopup(true);
    } catch (error) {
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

  const submitLabel =
    publishMode === "draft"
      ? "Save draft"
      : publishMode === "scheduled"
        ? "Schedule blog"
        : "Publish now";

  return (
    <>
      {showPopup && (
        <RMWPopup
          message={popupData.message}
          status={popupData.status}
          onClose={() => setShowPopup(false)}
        />
      )}

      <BlogWizardShell
        currentStep={3}
        title="Write your blog content"
        subtitle="Add page sections with rich text. Use multiple pages for long-form posts."
        breadcrumbExtra={`Content · Page ${pageNum}`}
        footer={
          <div className="space-y-5">
            <PublishOptionsPanel
              mode={publishMode}
              scheduledAt={scheduledAt}
              onModeChange={setPublishMode}
              onScheduledAtChange={setScheduledAt}
              disabled={rmwLoader}
            />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={handlePrev} className={blogSecondaryBtnClass}>
                  Back
                </button>
                <button type="button" onClick={handleNext} className={blogSecondaryBtnClass}>
                  <Plus className="h-4 w-4" />
                  Add page
                </button>
              </div>
              <button
                type="button"
                onClick={handleUploadBlog}
                disabled={rmwLoader}
                className={blogPrimaryBtnClass}
              >
                {rmwLoader ? <RMWLoader /> : submitLabel}
              </button>
            </div>
          </div>
        }
      >
        {formError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {formError}
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-2">
          {Array.from({ length: count }, (_, index) => {
            const pageNumber = index + 1;
            const isActive = pageNumber === count;
            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => {
                  saveDataToLocalStorage();
                  router.push(`/admin/add-blog/step-2/page/${pageNumber}`);
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "bg-[#2955B3] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Page {pageNumber}
              </button>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-[300px,1fr]">
          <div className="space-y-3">
            <BlogField label="Section image" hint="Optional image for this page section.">
              <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 z-20 cursor-pointer opacity-0"
                  onChange={handleImageChange}
                />
                {localBanner && localBanner.trim() ? (
                  <img
                    src={localBanner}
                    alt="Section visual"
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-56 flex-col items-center justify-center gap-2 px-4 text-center">
                    <ImagePlus className="h-8 w-8 text-[#2955B3]" />
                    <p className="text-sm font-medium text-slate-600">Upload section image</p>
                  </div>
                )}
              </div>
            </BlogField>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={imgUploaderModal}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
              >
                Create image URL
              </button>
              <button
                type="button"
                onClick={removeInnImg}
                className="rounded-xl bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
              >
                Remove image
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <BlogField label="Page title" required hint="Heading shown for this content section.">
              <input
                type="text"
                value={localTitle}
                onChange={(e) => {
                  setLocalTitle(e.target.value);
                  setMetaTitle(e.target.value);
                }}
                placeholder="Enter section title..."
                className={blogInputClass}
              />
            </BlogField>

            <BlogField label="Page content" required hint="Write the main body using the rich text editor.">
              <Editor
                value={localMeta}
                onChange={(val: string) => {
                  setLocalMeta(val);
                  setMetaDescription(val);
                }}
              />
            </BlogField>
          </div>
        </div>
      </BlogWizardShell>

      {uploadImgModal && (
        <div className="fixed inset-0 z-[900] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={imgUploaderModal}
          />
          {/* Modal */}
          <div className="relative mx-auto w-[min(92vw,640px)] h-[80vh]">
            <div className="rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl ring-1 ring-black/5 overflow-hidden h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Upload Image
                </h2>
                <button
                  onClick={imgUploaderModal}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5">
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 space-y-6 overflow-y-auto flex-1">
                {/* Upload Section */}
                <div className="space-y-5">
                  {/* Dropzone */}
                  <label
                    htmlFor="file"
                    className="block cursor-pointer rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 p-6 text-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <svg viewBox="0 0 24 24" className="h-6 w-6">
                        <path
                          d="M12 16V7m0 0l-3 3m3-3l3 3M5 17a4 4 0 01.88-7.9 5 5 0 019.9-1.1A4.5 4.5 0 1119 17H5z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-zinc-800 dark:text-zinc-200">
                      <span className="font-medium underline decoration-dotted">
                        Click to choose
                      </span>{" "}
                      or drag & drop
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      PNG, JPG, WebP (max 10MB)
                    </p>
                  </label>
                  <input
                    id="file"
                    type="file"
                    multiple
                    className="sr-only"
                    onChange={handleSelectNewImg}
                  />

                  {/* Preview */}
                  <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-3">
                    {imgToShow.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {imgToShow.map((url, i) => (
                          <div
                            key={url.id}
                            className="relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800"
                          >
                            <img
                              src={url.url}
                              alt={`preview-${i}`}
                              className="w-full h-28 object-cover"
                            />
                            {/* Cross button */}
                            <button
                              onClick={() => removeExtraImgs(url.id)}
                              type="button"
                              className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:bg-red-500 hover:text-white transition"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center rounded-lg">
                        <span className="text-xs text-zinc-500">
                          Preview will appear here
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Previous Uploads */}

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    Previously Uploaded
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {linkToShow &&
                      linkToShow.map((img) => (
                        <div
                          key={img._id}
                          className="relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800"
                        >
                          <img
                            src={`${
                              process.env.NEXT_PUBLIC_SERVER_EIMG_PATH
                            }/api/eImgs/${img.imgPath?.replace(
                              "/eImages/",
                              ""
                            )}`}
                            alt="uploaded"
                            className="w-full h-28 object-cover"
                          />

                          {/* Delete Cross Icon */}
                          <button
                            onClick={() => handleDeleteSavedImg(img._id)}
                            className="absolute top-2 cursor-pointer right-2 bg-white/80 dark:bg-zinc-900/80 p-1 rounded-full shadow hover:bg-red-500 hover:text-white transition"
                          >
                            <X size={16} />
                          </button>

                          {/* Copy Button */}
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `${
                                  process.env.NEXT_PUBLIC_SERVER_EIMG_PATH
                                }/api/eImgs/${img.imgPath?.replace(
                                  "/eImages/",
                                  ""
                                )}`
                              );
                            }}
                            className="absolute bottom-2 right-2 rounded-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur px-2 py-1 cursor-pointer text-xs border border-zinc-300 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800 active:bg-[#005a03] active:text-[#FFFFFF] active:font-bold active:border-none"
                          >
                            Copy
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={imgUploaderModal}
                  className="h-10 rounded-lg px-4 text-sm border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                {eImgLoder ? (
                  <div className="h-10 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <button
                    disabled={imgToSend.length <= 0}
                    onClick={handleUploadSelectedImg}
                    className={`h-10 rounded-lg px-4 text-sm bg-zinc-900 text-white hover:bg-[#1e7a10] ${
                      imgToSend.length > 0
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                  >
                    Upload
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Page;
