"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Editor from "@/components/Editor/Editor";
import { Monitor, Home, ImagePlus, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import RMWPopup from "@/components/rmw_popup/RMWPopup";
import RMWLoader from "@/components/rmw_loader/RMWLoader";

const Page = () => {
  interface BlogBodyItem {
    metaTitle: string;
    metaDescription: string;
    innerImg: string;
  }

  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ message: "", status: 0 });
  const [rmwLoader, setRMWLoader] = useState(false);
  const params = useParams();
  const router = useRouter();
  const blogID = params.blogID as string;
  const count = parseInt(params.count as string, 10) || 1;

  const LOCAL_KEY = (page: number) => `add-blog-step-2-${blogID}-page-${page}`;
  const [blogBody, setBlogBody] = useState<BlogBodyItem[]>([]);

  const [totalPages, setTotalPages] = useState<number>(1);

  const [localTitle, setLocalTitle] = useState<string>("");
  const [localMeta, setLocalMeta] = useState<string>("");
  const [localImage, setLocalImage] = useState<string>("");

  const fetchBlogBody = async () => {
    try {
      const { data, status } = await axios.get(
        `/api/ritz_blogs/get-single-blog/obj_id/${blogID}`
      );
      setPopupData({ message: data.message, status });
      const blog = data.blog;
      if (blog?.blogBody) {
        setBlogBody(blog.blogBody);
        setTotalPages(blog.blogBody.length);

        const local = localStorage.getItem(LOCAL_KEY(count));
        if (local) {
          const parsed = JSON.parse(local);
          setLocalTitle(parsed.metaTitle || "");
          setLocalMeta(parsed.metaDescription || "");
          setLocalImage(parsed.innerImg || "");
        } else if (blog.blogBody[count - 1]) {
          setLocalTitle(blog.blogBody[count - 1].metaTitle || "");
          setLocalMeta(blog.blogBody[count - 1].metaDescription || "");
          setLocalImage(blog.blogBody[count - 1].innerImg || "");
        }
      }
    } catch (err) {
      console.error("Error fetching blog:", err);
      alert("Failed to load blog.");
    }
  };

  useEffect(() => {
    fetchBlogBody();
  }, [blogID]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY(count));
    if (saved) {
      const parsed = JSON.parse(saved);
      setLocalTitle(parsed.metaTitle || "");
      setLocalMeta(parsed.metaDescription || "");
      setLocalImage(parsed.innerImg || "");
    } else if (blogBody[count - 1]) {
      setLocalTitle(blogBody[count - 1].metaTitle || "");
      setLocalMeta(blogBody[count - 1].metaDescription || "");
      setLocalImage(blogBody[count - 1].innerImg || "");
    }
    //  if(localImage) {
    //    alert(localImage);
    //  }
  }, [count, blogBody]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setLocalImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImg = () => {
    setLocalImage(" ");
  };

  const saveDataToLocalStorage = () => {
    localStorage.setItem(
      LOCAL_KEY(count),
      JSON.stringify({
        metaTitle: localTitle,
        metaDescription: localMeta,
        innerImg: localImage,
      })
    );
  };

  const handleNavigation = (toPage: number) => {
    saveDataToLocalStorage();
    router.push(`/admin/update/step-2/page/${blogID}/${toPage}`);
  };

  function base64ToFile(base64: string, filename: string): File {
    try {
      const arr = base64.split(",");
      if (arr.length < 2) {
        throw new Error("Invalid Base64 format");
      }

      const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    } catch (error) {
      console.error("base64ToFile error:", error);
      throw error; // Or return null if you prefer
    }
  }

  const handleSubmit = async () => {
    saveDataToLocalStorage();
    try {
      const step1Key = `update-blog-step-1-${blogID}`;
      const step1Data = JSON.parse(localStorage.getItem(step1Key) || "{}");
      setRMWLoader(true);
  
      const finalBody = [];
      const innerImageMap: Record<number, File> = {};
      for (let i = 1; i <= totalPages; i++) {
        const saved = localStorage.getItem(LOCAL_KEY(i));
        const parsed = saved ? JSON.parse(saved) : blogBody[i - 1];

        let innerImgKey = "";
        if (parsed?.innerImg?.startsWith("data:image/")) {
          try {
            const file = base64ToFile(parsed.innerImg, `innerImg-${i}.png`);
            innerImageMap[i - 1] = file;
            innerImgKey = `innerImg-${i - 1}`;
          } catch (error) {
            console.error(`Invalid image at step ${i}:`, error);
          }
        }

        finalBody.push({
          metaTitle: parsed.metaTitle || "",
          metaDescription: parsed.metaDescription || "",
          innerImg: innerImgKey, // will be "" if no valid image
        });
      }

      const formData = new FormData();
      formData.append("blogId", blogID);
      formData.append("blogTitle", step1Data.blogTitle);
      formData.append("blogMetaTitle", step1Data.blogMetaTitle || "");
      formData.append("blogSlug", step1Data.blogSlug || "");
      formData.append("metaKeywords", step1Data.metaKeywords);
      formData.append("blogCategoryId", step1Data.blogCategoryId || step1Data.blogCategory || "");
      formData.append("blogStatus", step1Data.blogStatus || true);
      formData.append("blogBody", JSON.stringify(finalBody));
      if (step1Data.mtDesc) {
        formData.append("mtDesc", step1Data.mtDesc);
      }
      if (step1Data.blogAuthor) {
        formData.append("blogAuthor", step1Data.blogAuthor);
      }

      if (step1Data.blogBanner?.startsWith("data:image/")) {
        const bannerFile = base64ToFile(step1Data.blogBanner, "blogBanner.png");
        formData.append("blogBanner", bannerFile);
      }

      Object.entries(innerImageMap).forEach(([index, file]) => {
        formData.append(`innerImg-${index}`, file);
      });

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("rm_token")
          : null;
      const { data, status } = await axios.put(
        `/api/ritz_blogs/update-prev-blog/${blogID}`,
        formData,
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      setRMWLoader(false);
      setPopupData({ message: data.message, status });
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
      } else {
        setEimgLoder(false);
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

  return (
    <div className="p-4 bg-[#f7f7f7] min-h-screen space-y-6">
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
      <div className="flex items-center gap-2">
        <Monitor className="w-6 h-6 text-gray-600" />
        <h1 className="text-2xl font-bold text-gray-700">
          Update Blog - Step 2
        </h1>
      </div>

      <div className="flex items-center text-sm gap-2 text-gray-500">
        <Link href="/" title="Home" target="_blank" className="text-blue-600 flex items-center gap-1">
          <Home className="w-4 h-4" /> Home
        </Link>
        <span>/</span> <span>Step 2</span> <span>/</span>{" "}
        <span>Page {count}</span>
      </div>

      <div className="bg-white rounded-md p-4 shadow space-y-4">
        {/* Meta Title */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Page Title
          </label>

          <input
            className="w-full border px-4 py-2 rounded"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            placeholder="Enter meta title"
          />
        </div>
        {/* Meta Description */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Page Description
          </label>

          <Editor value={localMeta} onChange={(val) => setLocalMeta(val)} />
        </div>
        {/* Inner Image Section */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Inner Image
          </label>

          {localImage && (
            <div
              style={{
                position: "relative",
                height: "100%",
                width: "100%",
              }}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images${
                  localImage.split("/images")[1]
                }`}
                alt={localTitle}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          )}

          <div className="relative inline-block">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="border border-dashed border-gray-400 px-4 py-6 rounded-md bg-gray-50 flex flex-col items-center justify-center text-gray-600">
              <ImagePlus className="w-6 h-6 mb-1" />
              <span>Upload New Image</span>
            </div>
            {/* Selected Image Will Show Here  */}
            {localImage && (
              <div className="border border-dashed mt-2 border-gray-400 px-4 py-6 rounded-md bg-gray-50 flex flex-col items-center justify-center text-gray-600">
                <img
                  src={localImage}
                  alt={localImage}
                  className="w-full h-full mb-1"
                />
              </div>
            )}
          </div>
          <div onClick={handleRemoveImg}>
            <button className="px-6 py-2 mt-10 cursor-pointer hover:bg-red-700 rounded-md bg-red-600 text-white font-bold">
              Remove Img
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handleNavigation(i + 1)}
              className={`px-4 py-2 cursor-pointer rounded-md text-sm ${
                i + 1 === count
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Page {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {rmwLoader ? <RMWLoader /> : "Submit"}
        </button>
      </div>
      {uploadImgModal && (
        <div className="fixed h-screen w-screen inset-0 z-[900] flex items-center justify-center">
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
      <button
        onClick={imgUploaderModal}
        className="px-6 py-2 bg-green-700 text-white font-bold cursor-pointer hover:bg-green-800 z-50"
      >
        Create Image URL
      </button>
    </div>
  );
};

export default Page;
