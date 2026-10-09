"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/core-css.css";
import "../styles/unit-css.css";
import "../styles/spacing.css";
import "../styles/magnific-popup-css.css";
import "../styles/elementor-css.css";
import "../styles/animation-css.css";
// import Head from "next/head";

import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./page.module.css";
import ServiceThirdHero from "@/allPages/serviceThirdPage/ServiceThirdHero";
import ServiceThirdQuality from "@/allPages/serviceThirdPage/ServiceThirdQuality";
import ServiceThirdColorMarque from "@/allPages/serviceThirdPage/ServiceThirdColorMarque";
import ServiceThirdAward from "@/allPages/serviceThirdPage/ServiceThirdAward";
import ServiceMainTestimonial from "@/allPages/serviceMainpage/ServiceMainTestimonial";
import ProjectSwiper from "@/allPages/Homepage/ProjectSwiper";
import ServiceThirdSlowMarque from "@/allPages/serviceThirdPage/ServiceThirdSlowMarque";
import ServiceEndTag from "@/components/endTag/serviceEndTag";
import Footer from "@/components/footer/Footer";
import Loader from "@/components/loader/Loader";
import { rewriteLegacyBlogPostHref } from "@/lib/blogUrl";
import Form from "@/allPages/Contactpage/Form";
import Header from "@/components/header/Header";
import {
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  X,
  Share2,
  Search,
  ExternalLink,
  CalendarDays,
  // Loader2,
} from "lucide-react";
import Image from "next/image";
// import { useBlogContext } from "@/context/AllBlogContext";
// import { title } from "process";
// import styles from "./page.module.css"
// Blog interface
export interface BlogBodyPage {
  metaTitle: string;
  metaDescription: string;
  innerImg: string;
}

export interface Blog {
  // MySQL Fields
  id?: number;
  title?: string;
  slug?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  blog_image?: string;
  description?: string;
  created_at?: string;
  status?: string;
  category_id?: string;
  // MongoDB Fields
  _id?: string;
  blogTitle?: string;
  blogSlug?: string;
  blogCategoryId?: string;
  blogDescription?: string;
  metaKeywords?: string;
  blogBanner?: string;
  blogBody?: BlogBodyPage[]; // updated to an array
  createdAt?: string;
  blogStatus?: string;
  blogAuthor?: string;
}

// Service interface
interface CardData {
  title: string;
  description: string;
  image_url?: string;
}
interface CategoryData {
  _id?: string;
  categoryName?: string;
  categoryMetaDescription?: string;
  categoryMetaTitle?: string;
  categoryMetaKeywords?: string;
  categorySlug?: string;
  name?: string;
  id?: string;
}

interface Article {
  _id: string;
  blogBanner: string;
  blogTitle: string;
  createdAt: string;
  meta_description: string;
  blogDescription: string;
}

interface Article2 {
  slug: string;
  blog_image: string;
  title: string;
  created_at: string;
  meta_description: string;
}

interface MergedBlogs {
  id: string;
  banner: string;
  title: string;
  createdAt: string;
  meta_description: string;
}

const normalizeArticle = (blog: Article): MergedBlogs => ({
  id: blog.blogTitle,
  banner: blog.blogBanner,
  title: blog.blogTitle,
  createdAt: blog.createdAt,
  meta_description: blog.blogDescription,
});

const normalizeArticle2 = (blog: Article2): MergedBlogs => ({
  id: blog.slug,
  banner: blog.blog_image,
  title: blog.title,
  createdAt: blog.created_at,
  meta_description: blog.meta_description,
});
interface RecentBlogs {
  _id: string;
  blogBanner: string;
  blogTitle: string;
  createdAt: string;
  meta_description: string;
  blogDescription: string;
  blogSlug: string;
}
// app/blog/[slug]/page.tsx

type DetailPageProps = {
  ssrHeading?: string;
};

const srOnlyH1Style: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
};

const DetailPage: React.FC<DetailPageProps> = ({ ssrHeading }) => {
  const [showModal, setShowModal] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  // const newSl = slug;
  const [loading, setLoading] = useState(true);
  const [searchB, setSearchB] = useState<string>("");
  const [singleBlog, setSingleBlog] = useState<Blog | null>(null);
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [head, setHead] = useState<string | null>(null);
  const [endTag, setEndTag] = useState<string | null>(null);
  const [cats, setRitzCats] = useState<CategoryData[]>([]);
  const [latestRBlogs, setLatestRBlogs] = useState<Blog[]>([]);
  const [blogs, setBlogs] = useState<MergedBlogs[]>([]);
  const [clickedPlatform, setClickedPlatform] = useState<string | null>(null);
  const router = useRouter();
  const [recentB, setRecentB] = useState<RecentBlogs[]>([]);
  // const [searchedBlog, setSearchedBlog] = useState<boolean>(false);
  // NEXT_PUBLIC_SERVER_IMG_PATHs
  const staticAPI = process.env.NEXT_PUBLIC_SERVER_IMG_PATH
    ? `${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images`
    : `/api/images`;
  const [mBC, setMBC] = useState<string>();

  const navigation = useRouter();
  const handleSingleBlogs = (slug: string) => {
    const url = slug.split(" ").join("-").toLowerCase();
    navigation.push(`/${url}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const cleanSlug = slug?.replace(/\.html$/, "");
        const catData2 = await axios.get(`/api/blog/categories`);

        const [resMongo, resMySQL] = await Promise.all([
          axios.get("/api/ritz_blogs/get-all-blogs"),
          axios.get("/api/all_blogs"),
        ]);
        const mongoBlogs: Article[] = resMongo.data.allBlogs || [];
        const mysqlBlogs: Article2[] = resMySQL.data || [];

        const merged: MergedBlogs[] = [
          ...mongoBlogs.map(normalizeArticle),
          ...mysqlBlogs.map(normalizeArticle2),
        ];

        setBlogs(merged);

        setRitzCats([...catData2.data]);
        const response = await axios.get(`/api/resolve/${cleanSlug}`);

        if (response.data.type === "blog") {
          setSingleBlog(response.data.blog);
          setLatestRBlogs(response.data.latestRBlogs[0]);
          // console.log(response.data.latestRBlogs[0]);
        } else if (response.data.type === "service") {
          const { secondLayer, thirdLayer } = response.data;

          const serviceResponse = await axios.get(
            `/api/services/${secondLayer}/${thirdLayer}`
          );
          const res = await axios.get(
            `/api/ritz_blogs/get-single-blog/${cleanSlug}`
          );
          setRecentB(res.data.recentBlogs);
          if (res) {
            setMBC(res?.data.categoryN);
          }

          setCardData(serviceResponse.data.cards || []);
          setHead(serviceResponse.data.s3heading1 || null);
          setEndTag(serviceResponse.data.s3endtag || null);
        } else {
          throw new Error("Not a blog or service, fallback to MongoDB");
        }
      } catch (error) {
        console.log("Error resolving via MySQL. Fallback to MongoDB.", error);
        try {
          const cleanSlug = slug?.replace(/\.html$/, "");
          const res = await axios.get(
            `/api/ritz_blogs/get-single-blog/${cleanSlug}`
          );
          setRecentB(res.data.recentBlogs);
          if (res) {
            setMBC(res?.data.categoryN);
            // console.log(mBC);
          }
          setLatestRBlogs(res.data.latestRBlogs);
          setSingleBlog(res.data.blog);
        } catch (err: any) {
          console.error("Fallback MongoDB fetch failed:", err);
          // Check if the error is a 404 (blog not found)
          if (err?.response?.status === 404) {
            setLoading(false);
            // Navigate to /404/not-found page
            router.replace('/404/not-found');
            return;
          }
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  useEffect(() => {
    if (clickedPlatform) {
      const timeout = setTimeout(() => setClickedPlatform(null), 1000);
      return () => clearTimeout(timeout);
    }
  }, [clickedPlatform]);

  const callLatestBlog = async () => {
    // console.log("API HIT");
    try {
      const res = await axios.get("/api/ritz_blogs/get-all-blogs");
      const logs = res.data.allBlogs;

      setRecentB(logs.splice(0, 3));
    } catch (err) {
      console.error("Fallback MongoDB fetch failed:", err);
    }
  };

  useEffect(() => {
    // if(!recentB){
    callLatestBlog();
    // }
  }, [slug]);

  function getShareUrl(
    platform: string,
    title: string,
    url: string
  ): string | undefined {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);

    switch (platform) {
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      case "twitter":
        return `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      case "whatsapp":
        return `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
      default:
        return undefined;
    }
  }
  const path = usePathname();
  const handleCopy2 = (fullPath: string) => {
    const url = `${window.location.origin}${path}/${fullPath}`;
    navigator.clipboard.writeText(url);
    alert("Url Has Copied!");
  };

  const handleCopy = (platform: string) => {
    setClickedPlatform(platform);

    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const fullUrl = `${baseUrl}/${slug}`;
    const title = singleBlog?.title ?? "";

    if (platform === "copy") {
      navigator.clipboard
        .writeText(fullUrl)
        .then(() => {
          // optional toast or alert
          // console.log("URL copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
      return; // ✅ Don't continue
    }

    const shareUrl = getShareUrl(platform, title, fullUrl);
    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  const contentRef = useRef(null);

  const handleLinksNavigation = () => {
    const links = document.querySelectorAll("#ctBody a");
    // console.log(contentRef.current);
    links.forEach((aLink) => {
      const gtHref = aLink.getAttribute("href");
      aLink.setAttribute("target", "_blank");
      if (gtHref) {
        const rewritten = rewriteLegacyBlogPostHref(gtHref);
        if (rewritten) aLink.setAttribute("href", rewritten);
      }
    });
    const ctBody = document.querySelector("#ctBody");

    if (ctBody && /<p>\s*(?:&nbsp;|\u00A0)\s*<\/p>/i.test(ctBody.innerHTML)) {
      ctBody.innerHTML = ctBody.innerHTML.replace(
        /<p>\s*(?:&nbsp;|\u00A0)\s*<\/p>/gi,
        ""
      );
    }

    // if (
    //   ctBody &&
    //   document.querySelector("#ctBody")?.innerHTML.includes("<br>")
    // ) {
    //   ctBody.innerHTML = ctBody.innerHTML.replace(/<br\s*\/?>/g, "");
    // }

    if (singleBlog?.title) {
      const targetNode =
        ctBody?.childNodes?.[0]?.childNodes?.[0]?.childNodes?.[0];

      if (targetNode?.textContent?.includes(singleBlog.title)) {
        targetNode.textContent = targetNode.textContent.replace(
          singleBlog.title,
          ""
        );
      }
    }
    if (ctBody) {
      const allH1 = ctBody.getElementsByTagName("h1");

      const h1Array = Array.from(allH1);

      h1Array.forEach((h1) => {
        const h2 = document.createElement("h2");
        h2.innerHTML = h1.innerHTML;

        for (const attr of h1.attributes) {
          h2.setAttribute(attr.name, attr.value);
        }
        if (h1.parentNode) {
          h1.parentNode.replaceChild(h2, h1);
        }
      });
    }
  };

  // document.addEventListener("DOMContentLoaded", () => {
  //   const cleanWordPressComments = () => {
  //     const ctBody = document.querySelector("#ctBody");
  //     if (ctBody) {
  //       // Create a temporary div to work with
  //       const tempDiv = document.createElement('div');
  //       tempDiv.innerHTML = ctBody.innerHTML;

  //       // Remove WordPress comments
  //       const comments = tempDiv.querySelectorAll('*');
  //       comments.forEach(node => {
  //         Array.from(node.childNodes).forEach(child => {
  //           if (child.nodeType === Node.COMMENT_NODE &&
  //               child.nodeValue.includes('wp:')) {
  //             node.removeChild(child);
  //           }
  //         });
  //       });

  //       // Update the DOM
  //       ctBody.innerHTML = tempDiv.innerHTML;
  //     }
  //   };

  //   // Run immediately
  //   cleanWordPressComments();

  //   // Run again after a short delay in case other scripts modify the content
  //   setTimeout(cleanWordPressComments, 500);
  // });
 
  useEffect(() => {
    if (singleBlog) {
      handleLinksNavigation();
    }
  }, [singleBlog]);

  if (loading) {
    return (
      <>
        <h1 style={srOnlyH1Style}>{ssrHeading || "Blog Details"}</h1>
        <Loader />
      </>
    );
  }

  // ✅ Render Blog if found
  if (singleBlog) {
    const isMongo = !!singleBlog.blogTitle;

    // const [isClick, setIsClick] = useState<boolean>();
  
    return (
      <>
        {/* <Header /> */}

        <div className={styles.wrapper}>
          {/* Left Side Blog Content */}
          <div className={styles.leftSide}>
            <div>
              
              <div className={styles.bannerImage}>
                <Image
                  src={
                    isMongo
                      ? `${staticAPI}${singleBlog.blogBanner?.split("/images")[1]
                      }`
                      : `${singleBlog?.blog_image?.split("/images")[1] ? `${staticAPI}${singleBlog.blog_image.split("/images")[1]}` :  `/blogs/${singleBlog.blog_image}`}`
                  }
                  fill
                  priority
                  alt={
                    (isMongo ? singleBlog.blogTitle : singleBlog.title) ||
                    "Ritz Media World"
                  }
                  className={styles.imgD}
                />
              </div>
              {/* Date + Category + Share */}
              <div className={styles.blogMeta}>
                <div>
                  <span>
                    {new Date(
                      isMongo ? singleBlog.createdAt! : singleBlog.created_at!
                    ).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className={styles.category}>
                    {isMongo
                      ? mBC
                      : cats.find((id) => id.id === singleBlog.category_id)
                        ?.name || "Unknown Category"}
                  </span>
                  {isMongo && singleBlog.blogAuthor ? (
                    <span className={styles.category}>
                      By {singleBlog.blogAuthor}
                    </span>
                  ) : null}
                </div>
                <Share2
                  className={styles.shareIcon}
                  onClick={() => setShowModal(true)}
                />
              </div>
              {/* Blog Title */}
              <h1 className={styles.blogTitle}>
                {isMongo ? singleBlog.blogTitle : singleBlog.title}
              </h1>
              {/* Blog Content */}
              <div ref={contentRef} id="ctBody" className={styles.contentBody}>
                {isMongo ? (
                  singleBlog.blogBody?.map((page, idx) => (
                    <div key={idx}>
                      {/* This  is Title Of Blog Body  */}
                      <h2>{(isMongo && singleBlog.blogTitle?.includes(page.metaTitle)) ? "" : page.metaTitle}</h2>

                      {/* This Is Inner Image  */}
                      {page.innerImg && (
                        <div className={styles.innerImg}>
                          <Image
                            src={`${staticAPI}${page.innerImg.split("/images")[1]
                              }`}
                            alt={page.metaTitle}
                            fill
                            priority
                            className={styles.innerMainImg}
                          />
                        </div>
                      )}

                      {/* This Is Description  */}
                      <div className={styles.tableWrapper}>
                        <div
                          className={styles.contentBody}
                          dangerouslySetInnerHTML={{
                            __html: page.metaDescription,
                          }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.tableWrapper}>
                    <div
                      className={styles.contentBody}
                      dangerouslySetInnerHTML={{
                        __html: singleBlog.description!,
                      }}
                    />
                  </div>
                )}
              </div>
              {/* Tags */}
              <div className={styles.keywords}>
                {(isMongo ? singleBlog.metaKeywords : singleBlog.meta_keywords)
                  ?.split(",")
                  .map((word: string, idx: number) => {
                    const cleaned = word
                      .replace(/['",]/g, "") // Remove both single and double quotes
                      .replace(/\s+/g, " ") // Convert multiple spaces to a single space
                      .trim(); // Trim start and end

                    const slug = cleaned.replace(/\s+/g, "-"); // Replace spaces with dashes

                    return (
                      cleaned && (
                        <span
                          key={idx}
                          onClick={() => router.push(`/tags/${slug}`)}
                          style={{
                            cursor: "pointer",
                            marginRight: "8px",
                            marginBottom: "8px",
                            padding: "4px 10px",
                            display: "inline-block",
                            borderRadius: "8px",
                            backgroundColor: "#f1f1f1",
                            fontSize: "14px",
                            border: "1px solid #ccc",
                          }}
                        >
                          {cleaned}
                        </span>
                      )
                    );
                  })}
              </div>
            </div>

            <div className="container py-4">
              <h2 className="mb-4 text-center text-lg-start">Latest Blogs</h2>

              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                {recentB && recentB.length > 0 ? (
                  recentB
                    .filter((bl) => bl._id != singleBlog._id)
                    .map((data) => (
                      <div
                        className="col"
                        key={data._id}
                        onClick={() => handleSingleBlogs(data.blogSlug)}
                      >
                        <div
                          className="card h-100 border-0 shadow-sm"
                          style={{
                            borderRadius: "1rem",
                            overflow: "hidden",
                            background: "#fff",
                            transition: "transform 0.3s ease-in-out",
                          }}
                        >
                          {/* Image */}
                          <div className={styles.recentImgDiv}>
                            <Image
                              src={
                                data.blogBanner.includes("/images")
                                  ? `/api/images${data.blogBanner.split("/images")[1]
                                  }`
                                  : `/blogs/${data.blogBanner}`
                              }
                              alt={data.blogTitle}
                              fill
                              priority
                              className={styles.recentInnerImg}
                              onMouseOver={(e) =>
                              (e.currentTarget.style.transform =
                                "scale(1.05)")
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.transform = "scale(1)")
                              }
                            />
                          </div>

                          {/* Content */}
                          <div className="card-body d-flex flex-column justify-content-between p-3">
                            {/* Title */}
                            <h5
                              className="card-title fw-semibold text-truncate"
                              title={data.blogTitle}
                            >
                              {data.blogTitle
                                .split(/\s+/)
                                .slice(0, 12)
                                .join(" ")}
                            </h5>

                            {/* Description */}
                            {data.meta_description && (
                              <p
                                className="card-text text-muted small mt-2 mb-3"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    data.meta_description
                                      .split(/\s+/)
                                      .slice(0, 30)
                                      .join(" ") + "...",
                                }}
                              ></p>
                            )}

                            {/* Footer Buttons */}
                            <div className="d-flex justify-content-between align-items-center mt-auto">
                              {/* Date */}
                              <span className="d-flex align-items-center gap-1 text-muted small">
                                <CalendarDays size={16} />
                                <span>
                                  {new Date(data.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </span>
                              </span>

                              {/* Share Button */}
                              <button
                                type="button"
                                className="btn d-flex align-items-center gap-1"
                                style={{
                                  color: "#E5B05C",
                                  // borderColor: "#E5B05C",
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopy2(
                                    data?.blogTitle?.split(" ").join("-")
                                  );
                                }}
                              >
                                <Share2 size={16} />
                                Share
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-center">No Recent Blog Posted</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Side Panel */}
          <div className={styles.rightSide}>
            {/* Search Bar */}
            <div className={styles.searchWrap}>
              <Search />
              <input
                onChange={(e) => setSearchB(e.target.value)}
                type="text"
                placeholder="Search blogs..."
              />
            </div>

            <Link
              href="/contact.html"
              title="Contact Us"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactUsBtn}
            >
              Contact Us
            </Link>

            {/* Search Results */}
            {searchB && (
              <div className={styles.searchResults}>
                {blogs
                  .filter((blog) =>
                    blog.title.toLowerCase().includes(searchB.toLowerCase())
                  )
                  .map((blog, idx) => {
                    return (
                      <div
                        onClick={() => router.push(`/${blog.id}`)}
                        className={styles.resultCard}
                        key={`${blog.id}-${idx}`}
                      >
                        <div className={styles.resultCardImage}>
                          <Image
                            src={
                              blog.banner.includes("/images/")
                                ? `${staticAPI}${blog.banner.split("/images")[1]
                                }`
                                : `/blogs/${blog.banner}`
                            }
                            alt={blog.title}
                            priority
                            unoptimized
                            fill
                            // className={}
                            style={{
                              objectFit: "contain",
                            }}
                          />
                        </div>
                        <b className={styles.resultCardTitle}>{blog.title}</b>
                      </div>
                    );
                  })}
              </div>
            )}
            {/* Blog Categories */}
            {/* {cats && ( */}
            <div className={styles.categories}>
              {cats &&
                // const isMG = data.id;
                cats.map((data) => {
                  return (
                    <div
                      onClick={() =>
                        router.push(
                          `/category/${data.name?.toLowerCase().split(" ").join("-") ||
                          data.categorySlug
                          }`
                        )
                      }
                      key={data._id || data.id}
                      className={styles.categoryCard}
                    >
                      {data.categoryName || data.name}
                    </div>
                  );
                })}
            </div>

            {/* Related Blogs */}
            <div className={styles.relatedBlogs}>
              <h3>Related Blogs : </h3>
              {latestRBlogs.length > 0 &&
                latestRBlogs
                  .filter(
                    (blog) =>
                      blog._id !== singleBlog?._id || blog.id !== singleBlog.id
                  )
                  .map((blog, idx) => (
                    <div
                      onClick={() =>
                        handleSingleBlogs(blog.blogSlug || blog.slug || "")
                      }
                      className={styles.resultCard}
                      key={idx}
                    >
                      <div className={styles.resultCardImage}>
                        <Image
                          src={
                            isMongo
                              ? `${staticAPI}${blog.blogBanner?.split("/images")[1]
                              }`
                              : `/blogs/${blog.blog_image}`
                          }
                          alt={
                            (isMongo ? blog.blogTitle : blog.title) ||
                            "Ritz Media World"
                          }
                          fill
                          priority
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      </div>

                      <b>{isMongo ? blog.blogTitle : blog.title}</b>
                    </div>
                  ))}
            </div>
            {/* )} */}
          </div>

          {/* Share Modal */}
          {showModal && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalBox}>
                <X
                  className={styles.modalClose}
                  onClick={() => setShowModal(false)}
                />
                <button
                  style={{
                    backgroundColor:
                      clickedPlatform === "copy" ? "yellowgreen" : undefined,
                    color: clickedPlatform === "copy" ? "white" : undefined,
                    fontWeight: clickedPlatform === "copy" ? "bold" : undefined,
                  }}
                  onClick={() => handleCopy("copy")}
                >
                  <Copy /> Copy URL
                </button>
                <button
                  style={{
                    backgroundColor:
                      clickedPlatform === "facebook"
                        ? "yellowgreen"
                        : undefined,
                    color: clickedPlatform === "facebook" ? "white" : undefined,
                    fontWeight:
                      clickedPlatform === "facebook" ? "bold" : undefined,
                  }}
                  onClick={() => handleCopy("facebook")}
                >
                  <Facebook /> Facebook
                </button>
                <button
                  style={{
                    backgroundColor:
                      clickedPlatform === "twitter" ? "yellowgreen" : undefined,
                    color: clickedPlatform === "twitter" ? "white" : undefined,
                    fontWeight:
                      clickedPlatform === "twitter" ? "bold" : undefined,
                  }}
                  onClick={() => handleCopy("twitter")}
                >
                  <Twitter /> X
                </button>
                <button
                  style={{
                    backgroundColor:
                      clickedPlatform === "linkedin"
                        ? "yellowgreen"
                        : undefined,
                    color: clickedPlatform === "linkedin" ? "white" : undefined,
                    fontWeight:
                      clickedPlatform === "linkedin" ? "bold" : undefined,
                  }}
                  onClick={() => handleCopy("linkedin")}
                >
                  <Linkedin /> LinkedIn
                </button>
                <button
                  style={{
                    backgroundColor:
                      clickedPlatform === "whatsapp"
                        ? "yellowgreen"
                        : undefined,
                    color: clickedPlatform === "whatsapp" ? "white" : undefined,
                    fontWeight:
                      clickedPlatform === "whatsapp" ? "bold" : undefined,
                  }}
                  onClick={() => handleCopy("whatsapp")}
                >
                  <ExternalLink /> WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </>
    );
  }

  // ✅ Else render service_third content
  return (
    <>
      <h1 style={srOnlyH1Style}>{ssrHeading || head || "Service Details"}</h1>
      <Header />
      {head && <ServiceThirdHero heading={head} />}
      <ServiceThirdQuality cardData={cardData} />
      <ServiceThirdColorMarque />
      <ServiceThirdAward />
      <ServiceMainTestimonial />
      <ProjectSwiper />
      <Form />
      <ServiceThirdSlowMarque />
      <ServiceEndTag endtag={endTag} />
      <Footer />
    </>
  );
};

export default DetailPage;