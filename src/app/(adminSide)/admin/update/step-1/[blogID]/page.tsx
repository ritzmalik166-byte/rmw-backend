"use client";

import { Home, ImagePlus, Monitor } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useBlogContext } from "@/blogContext/BlogContext";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { formatSlugInput, normalizeSlug } from "@/lib/slugify";
import { BLOG_AUTHORS, DEFAULT_BLOG_AUTHOR } from "@/lib/blogAuthors";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const blogID = params.blogID as string;

  interface BlogBody {
    metaTitle: string;
    metaDescription: string;
    innerImg?: string;
  }

  interface BlogInfo {
    blogTitle: string;
    blogSlug: string;
    blogBanner: string;
    blogBody: BlogBody[];
    createdAt: string;
    blogCategoryId: string;
    metaKeywords: string;
    mtDesc: string;
    blogAuthor?: string;
  }

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
  const [localBlogMetaTitle, setLocalBlogMetaTitle] = useState<string>("");
  const [localSlug, setLocalSlug] = useState<string>("");
  const [localMeta, setLocalMeta] = useState<string>(metaKeywords || "");
  const [localBanner, setLocalBanner] = useState<string>(blogBanner || "");
  const [localCategory, setLocalCategory] = useState<string>("none-selected"); // Category ID - Load from localStorage or fetch from backend
  const [localCategoryName, setLocalCategoryName] = useState<string>(""); // Category Name for display
  const [localMtDesc, setLocalMtDesc] = useState(mtDesc || "");
  const [localAuthor, setLocalAuthor] = useState<string>(DEFAULT_BLOG_AUTHOR);
  const apiCategoryRef = useRef<string>("none-selected"); // Store category ID from latest API call

  useEffect(() => {
    if (!localMtDesc && mtDesc) {
      setLocalMtDesc(mtDesc);
    }
  }, [mtDesc]);


  // Sync localCategory with API category if localCategory is empty or default
  useEffect(() => {
    if ((!localCategory || localCategory === "none-selected" || localCategory === "All Category") && apiCategoryRef.current && apiCategoryRef.current !== "none-selected") {
      setLocalCategory(apiCategoryRef.current);
    }
  }, [localCategory]);

  useEffect(() => {
    if (!blogID) return;

    const LOCAL_KEY = `update-blog-step-1-${blogID}`;
    const savedData = localStorage.getItem(LOCAL_KEY);
    console.log("====================================");
    console.log("This data received from local storage", savedData);
    console.log("====================================");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setLocalTitle(parsed.blogTitle || "");
      setLocalBlogMetaTitle(parsed.blogMetaTitle || "");
      setLocalSlug(parsed.blogSlug || "");
      setLocalMeta(parsed.metaKeywords || "");
      setLocalBanner(parsed.blogBanner || "");
      // Use parsed category ID if available and valid, otherwise will be set from API
      const savedCategoryId = parsed.blogCategoryId || parsed.blogCategory;
      if (savedCategoryId && savedCategoryId !== "none-selected" && savedCategoryId !== "All Category") {
        setLocalCategory(savedCategoryId);
      }
      // Set category name if available
      if (parsed.blogCategoryName) {
        setLocalCategoryName(parsed.blogCategoryName);
      }

      setBlogTitle(parsed.blogTitle || "");
      setMetaTitle(parsed.metaKeywords || "");
      setBlogBanner(parsed.blogBanner || "");
      // Use parsed.mtDesc if available, otherwise fallback to context mtDesc
      const mtDescValue = parsed.mtDesc || mtDesc || "";
      setLocalMtDesc(mtDescValue);
      setMtDesc(mtDescValue);
      setLocalAuthor(parsed.blogAuthor || DEFAULT_BLOG_AUTHOR);
    }
     
    getSingleBlogInfo(blogID, LOCAL_KEY);
  }, [blogID]);

  const getSingleBlogInfo = async (id: string, LOCAL_KEY: string): Promise<void> => {
    try {
      const res = await axios.get<{ blog: BlogInfo }>(
        `/api/ritz_blogs/get-single-blog/obj_id/${id}`
      );
      const blog = res.data.blog;
      console.log("====================================");
      console.log("This is blog ", blog);
      console.log("====================================");
      setLocalTitle(blog.blogTitle || "");
      setLocalBlogMetaTitle(blog.blogBody?.[0]?.metaTitle || "");
      setLocalSlug(blog.blogSlug || "");
      setLocalMeta(blog.metaKeywords || "");
      setLocalBanner(blog.blogBanner || "");
      
      // Store API category ID in ref for fallback
      const apiCategoryId = blog.blogCategoryId || "none-selected";
      apiCategoryRef.current = apiCategoryId;
      
      // Set category from API only if localCategory is not set or is default value
      // This ensures localStorage category takes priority, but API category is used as fallback
      if (!localCategory || localCategory === "none-selected" || localCategory === "All Category") {
        setLocalCategory(apiCategoryId);
      }

      setBlogTitle(blog.blogTitle || "");
      // setMetaTitle(blog.metaDescription || "");
      setBlogBanner(blog.blogBanner || "");
      
      // Set mtDesc from API response, fallback to context if empty
      const mtDescValue = blog.mtDesc || mtDesc || "";
      setLocalMtDesc(mtDescValue);
      setMtDesc(mtDescValue);
      setLocalAuthor(blog.blogAuthor || DEFAULT_BLOG_AUTHOR);

      // Find category name from fetched categories
      let categoryName = "";
      if (ritzCategories.length > 0 && blog.blogCategoryId) {
        const matchedCategory = ritzCategories.find(cat => cat._id === blog.blogCategoryId);
        if (matchedCategory) {
          categoryName = matchedCategory.categoryName;
        }
      }

      // Save to localStorage (category name will be set later when categories are loaded)
      localStorage.setItem(
        LOCAL_KEY,
        JSON.stringify({
          blogTitle: blog.blogTitle,
          blogMetaTitle: blog.blogBody?.[0]?.metaTitle || "",
          blogSlug: blog.blogSlug,
          metaKeywords: blog.metaKeywords,
          blogBanner: blog.blogBanner,
          blogCategoryId: blog.blogCategoryId,
          mtDesc: blog.mtDesc || mtDesc || "",
          blogAuthor: blog.blogAuthor || DEFAULT_BLOG_AUTHOR,
        })
      );
    } catch (error) {
      console.error("Error fetching blog info", error);
      alert("Error fetching blog info from backend.");
    }
  };

  const saveDataToLocalStorage = () => {
    const LOCAL_KEY = `update-blog-step-1-${blogID}`;
    // alert("This function hit!");
    const data = {
      blogTitle: localTitle,
      blogMetaTitle: localBlogMetaTitle,
      blogSlug: localSlug,
      metaKeywords: localMeta,
      blogBanner: localBanner,
      blogCategoryId: localCategory,
      blogCategoryName: localCategoryName,
      mtDesc: localMtDesc,
      blogAuthor: localAuthor,
    };
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  };

  const count = parseInt(params.count as string, 10) || 0;

  const handleNavigation = (path: string) => {
    if (path.includes(`/admin/update/step-2/page/${blogID}/${count}`)) {
      if (!localTitle || !localSlug || !localMeta || !localBanner || !localCategory || !localMtDesc || !localAuthor) {
        alert("Please fill in all fields before proceeding to the next step.");
        return;
      }
      saveDataToLocalStorage();
      router.push(`/admin/update/step-2/page/${blogID}/${count + 1}`);
    } else {
      alert("Back Function hit");
      router.push(path);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLocalBanner(base64String);
        setBlogBanner(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch All Categories 
    interface Category {
    _id: string;
    categoryName: string;
    categorySlug: string;
    categoryMetaTitle: string;
    categoryMetaDescription: string;
    categoryMetaKeywords: string;
    createdAt: string;
    updatedAt: string;
  }
   const [ritzCategories, setRitzCategory] = useState<Category[]>([]);
    const fetchAllCategories = async () => {
      try {
        const { data } = await axios.get(`/api/ritzCats/getAllCats`);
        setRitzCategory(data.allCategories);
      } catch (error) {
        console.log(error);
        alert("Internal Server Error In Fetching All Categories!");
      }
    };
  
    useEffect(() => {
      fetchAllCategories();
    }, []);

    // Match category ID with categories and set category name (after categories are loaded)
    useEffect(() => {
      if (localCategory && localCategory !== "none-selected" && ritzCategories.length > 0) {
        const matchedCategory = ritzCategories.find(cat => cat._id === localCategory);
        if (matchedCategory) {
          setLocalCategoryName(matchedCategory.categoryName);
          
          // Update localStorage with category name
          const LOCAL_KEY = `update-blog-step-1-${blogID}`;
          const currentData = localStorage.getItem(LOCAL_KEY);
          if (currentData) {
            const parsed = JSON.parse(currentData);
            parsed.blogCategoryId = localCategory;
            parsed.blogCategoryName = matchedCategory.categoryName;
            localStorage.setItem(LOCAL_KEY, JSON.stringify(parsed));
          }
        }
      }
    }, [localCategory, ritzCategories, blogID]);

  return (
    <div className="bg-[#EEEEEE] flex flex-col gap-6 sm:gap-8 md:gap-12 p-4 md:p-8 min-h-screen">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-[#ACACAC] flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-light uppercase">
          <Monitor className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" /> Add Blog
        </h1>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 bg-white p-3 rounded-md shadow-sm text-sm">
        <Link href="/" title="Home" target="_blank" className="text-[#2955B3] flex items-center gap-2">
          <Home className="w-4 h-4" /> Home
        </Link>
        <span className="text-[#ACACAC] font-bold">/</span>
        <span className="text-[#838383] flex items-center gap-2">
          <Monitor className="w-4 h-4" /> Add Blog
        </span>
        <span className="text-[#ACACAC] font-bold">/</span>
        <span className="text-[#838383] flex items-center gap-2">Step 1</span>
      </div>
      <div className="addBloContainer bg-white p-5 rounded-md shadow-md flex flex-col lg:flex-row gap-6">
        <div
          style={{ padding: localBanner ? "20px" : "0px" }}
          className="flex-1 flex flex-col justify-center items-center gap-4 border rounded-md border-[#797979a5] relative overflow-hidden w-full max-w-md transition-all duration-300 bg-white shadow-sm"
        >
          <input
            type="file"
            className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0 z-20"
            accept="image/*"
            onChange={handleImageChange}
          />

          {localBanner ? (
            <div style={{
              position:'relative',
              height:'100%',
              width:"100%"
            }}>
              <Image
              src={`${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images${
                blogBanner.split("/images")[1]
              }`}
              alt={localTitle}
              fill
              style={{objectFit:'cover'}}
            />
            </div>
          ) : (
            <div className="p-4">
              <label className="text-sm font-semibold text-[#444]">
                Upload Blog Banner:
              </label>

              <div className="w-40 h-40 flex items-center justify-center border border-dashed border-[#aaa] rounded-md bg-[#f9f9f9] relative z-10 hover:bg-[#f1f1f1] transition">
                <ImagePlus className="w-10 h-10 text-[#666]" />
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-2 p-4">
            <label className="text-sm font-semibold text-[#444]">
              Blog Title
            </label>
            <input
              type="text"
              value={localTitle}
              onChange={(e) => {
                setLocalTitle(e.target.value);
                setBlogTitle(e.target.value);
              }}
              placeholder="Enter blog title here..."
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          <div className="flex flex-col gap-2 p-4">
            <label className="text-sm font-semibold text-[#444]">
              Blog Meta Title
            </label>
            <input
              type="text"
              value={localBlogMetaTitle}
              onChange={(e) => setLocalBlogMetaTitle(e.target.value)}
              placeholder="Enter blog meta title..."
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          <div className="flex flex-col gap-2 p-4">
            <label className="text-sm font-semibold text-[#444]">
              Slug URL
            </label>
            <input
              type="text"
              value={localSlug}
              onChange={(e) => setLocalSlug(formatSlugInput(e.target.value))}
              onBlur={() => setLocalSlug(normalizeSlug(localSlug))}
              placeholder="e.g. my blog post"
              className="w-full border rounded-md px-4 py-2"
            />
            <p className="text-xs text-[#666]">
              Blog will open at /{normalizeSlug(localSlug) || "your-slug-url"}
            </p>
          </div>

          <div className="flex flex-col gap-2 p-4">
            <label className="text-sm font-semibold text-[#444]">
              Meta Keywords
            </label>
            <input
              type="text"
              value={localMeta}
              onChange={(e) => {
                setLocalMeta(e.target.value);
                setMetaTitle(e.target.value);
              }}
              placeholder="Enter meta keywords..."
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          <div className="flex flex-col gap-2 p-4">
            <label className="text-sm font-semibold text-[#444]">
              Meta Description (mtDesc)
            </label>
            <textarea
              value={localMtDesc || mtDesc || ""}
              onChange={(e) => {
                setLocalMtDesc(e.target.value);
                setMtDesc(e.target.value);
              }}
              placeholder="Enter meta description..."
              className="w-full border rounded-md px-4 py-2 min-h-[100px] resize-y"
              rows={4}
            />
          </div>

          <div className="flex flex-col gap-2 p-4">
            <label className="text-sm font-semibold text-[#444]">
              Blog Category
            </label>
            <select
              value={localCategory}
              onChange={(e) => {
                const selectedCategoryId = e.target.value;
                setLocalCategory(selectedCategoryId);
                
                // Find and set category name
                const selectedCategory = ritzCategories.find(cat => cat._id === selectedCategoryId);
                if (selectedCategory) {
                  setLocalCategoryName(selectedCategory.categoryName);
                }
                
                // Save to localStorage immediately when category changes
                const LOCAL_KEY = `update-blog-step-1-${blogID}`;
                const currentData = localStorage.getItem(LOCAL_KEY);
                if (currentData) {
                  const parsed = JSON.parse(currentData);
                  parsed.blogCategoryId = selectedCategoryId;
                  parsed.blogCategoryName = selectedCategory?.categoryName || "";
                  localStorage.setItem(LOCAL_KEY, JSON.stringify(parsed));
                }
              }}
              className="w-full border rounded-md px-4 py-2"
            >
          {/* All Categories Will Be Show Here  */}
           <option value="none-selected">Select Category</option>
              {ritzCategories.length > 0 ? (
                ritzCategories.map((data, idx) => {
                  return (
                    <option key={idx} value={data._id}>
                      {data.categoryName}
                    </option>
                  );
                })
              ) : (
                <p>Categories are loading...</p>
              )}
             
            </select>
          </div>

          <div className="flex flex-col gap-2 p-4">
            <label className="text-sm font-semibold text-[#444]">
              Author
            </label>
            <select
              value={localAuthor}
              onChange={(e) => setLocalAuthor(e.target.value)}
              className="w-full border rounded-md px-4 py-2"
            >
              {BLOG_AUTHORS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center w-full flex-wrap gap-4">
        <button
          onClick={() => handleNavigation("/admin/add-blog")}
          className="bg-[#d1d5db] hover:bg-[#cbd5e1] cursor-pointer text-black px-5 py-2 rounded-md"
        >
          Back to Main
        </button>

        <button
          onClick={() =>
            handleNavigation(`/admin/update/step-2/page/${blogID}/${count}`)
          }
          className="bg-[#2955B3] hover:bg-[#1e3f8a] cursor-pointer text-white px-5 py-2 rounded-md"
        >
          Continue to Step 2
        </button>
      </div>
      <footer className="admin-footer text-center text-sm text-[#666] pt-10">
        Designed and Developed by <strong>Ritz Media World</strong>
      </footer>
    </div>
  );
};

export default Page;
