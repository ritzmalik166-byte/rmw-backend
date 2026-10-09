"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Download,
  Eye,
  EyeOff,
  FileText,
  ImageOff,
  Layers,
  Pencil,
  PencilLine,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  formatScheduledAt,
  isBlogPubliclyVisible,
  resolveAdminPublishLabel,
} from "@/lib/blogPublish";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useRouter, useSearchParams } from "next/navigation";
import RMWPopup from "@/components/rmw_popup/RMWPopup";

import {
  buildMongoCategoryLookup,
  buildMysqlCategoryLookup,
  exportBlogsToExcel,
  mapMongoBlogToExportRow,
  mapMysqlBlogToExportRow,
  type ExportProgress,
  type MongoBlogExportSource,
  type MysqlBlogExportSource,
} from "@/lib/exportBlogsExcel";

function managementAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("rm_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

interface Blog {
  _id: string;
  blogBanner: string;
  blogTitle: string;
  blogCategory: string;
  categoryName: string;
  createdAt: string | Date;
  blogStatus: boolean;
  blogSlug: string;
  publishStatus?: string;
  scheduledAt?: string | Date;
}

interface SQLBLOGS {
  id?: number;
  category_id?: number | string;
  blog_image: string;
  created_at: string | Date;
  title: string;
  slug: string;
  status: string;
}
interface MERGEDBLOGS {
  title: string;
  blogIMG: string;
  createdAT: string;
  blogID: string;
  blogStatus: string;
  publishLabel: "draft" | "scheduled" | "published" | "inactive";
  scheduledAtLabel?: string;
  canViewPublic: boolean;
  mongoID?: string;
  categoryName?: string;
  createdTime?: number;
}

type StatusFilter = "all" | "draft" | "scheduled" | "published" | "inactive";

function isMongoBlog(blg: Blog | SQLBLOGS): blg is Blog {
  return "blogTitle" in blg && "blogSlug" in blg;
}

function toTimestamp(value: string | Date | undefined | null): number {
  const time = value ? new Date(value).getTime() : NaN;
  return Number.isNaN(time) ? 0 : time;
}

/** Lowercase + naive singular form per word, so "Case Studies" matches category "Case Study". */
function normalizeCategorySearch(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .map((word) => word.replace(/ies$/, "y").replace(/([^s])s$/, "$1"))
    .join(" ");
}

function countByLabel(blogs: MERGEDBLOGS[], label: StatusFilter) {
  if (label === "all") return blogs.length;
  return blogs.filter((blog) => blog.publishLabel === label).length;
}

function publishBadgeStyle(label: MERGEDBLOGS["publishLabel"]) {
  switch (label) {
    case "draft":
      return { background: "rgba(100,116,139,0.12)", color: "#475569" };
    case "scheduled":
      return { background: "rgba(245,158,11,0.12)", color: "#D97706" };
    case "published":
      return { background: "rgba(16,185,129,0.12)", color: "#059669" };
    case "inactive":
      return { background: "rgba(239,68,68,0.12)", color: "#DC2626" };
    default:
      return { background: "rgba(100,116,139,0.12)", color: "#475569" };
  }
}

const STATUS_CARDS: {
  key: StatusFilter;
  label: string;
  hint: string;
  icon: LucideIcon;
  accent: string;
  tint: string;
}[] = [
  { key: "all", label: "All blogs", hint: "CMS + legacy archive", icon: Layers, accent: "#0B1623", tint: "rgba(11,22,35,0.07)" },
  { key: "published", label: "Published", hint: "Live on the website", icon: CircleCheck, accent: "#059669", tint: "rgba(16,185,129,0.12)" },
  { key: "scheduled", label: "Scheduled", hint: "Queued to go live", icon: CalendarClock, accent: "#D97706", tint: "rgba(245,158,11,0.14)" },
  { key: "draft", label: "Drafts", hint: "Work in progress", icon: PencilLine, accent: "#475569", tint: "rgba(100,116,139,0.14)" },
  { key: "inactive", label: "Inactive", hint: "Hidden from readers", icon: EyeOff, accent: "#DC2626", tint: "rgba(239,68,68,0.1)" },
];

const EMPTY_MESSAGES: Record<StatusFilter, string> = {
  all: "No blogs found.",
  published: "No published blogs found.",
  scheduled: "No scheduled blogs yet.",
  draft: "No draft blogs yet.",
  inactive: "No inactive blogs found.",
};

const LIST_GRID_COLUMNS = "grid-cols-[minmax(0,1fr)_150px_170px_128px]";

function blogImageSrc(img: string): string | null {
  if (!img) return null;
  return img.includes("/images")
    ? `${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images${img.split("/images")[1]}`
    : `/blogs/${img}`;
}

function getPageNumbers(current: number, total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "gap")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("gap");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total - 1) pages.push("gap");
  pages.push(total);
  return pages;
}

interface MONGOEXCELBLOG {
  blogBanner: string;
  metaDescription: string;
  metaTitle: string;
  _id: string;
  blogCategoryId: string;
  blogDescription: string;
  blogSlug: string;
  blogStatus: boolean;
  blogTitle: string;
  createdAt: string;
  updatedAt: string;
  metaKeywords: string;
  mtDesc: string;
}

interface MYSQLBLOGS {
  blog_image: string;
  category_id: number;
  created_at: string;
  description: string;
  id: number;
  meta_description: string;
  meta_keywords: string;
  meta_title: string;
  slug: string;
  status: string;
  title: string;
  updated_at: string;
}

export default function ManageBlogs() {
  // const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  // const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteBlog, setDeleteBlog] = useState<Blog | null>(null);
  // const [selectedCategory, setSelectedCategory] = useState("All");
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [llength, setLastLength] = useState<number>(0);
  // const [sqlBlogs, setSQLBlogs] = useState<SQLBLOGS[]>([]);
  const [mergedBlogs, setMergedBlogs] = useState<MERGEDBLOGS[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchedBl, setSearchedB] = useState("");
  // const [isMongo, setIsMongo] =
  const blogsPerPage = 15;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ message: "", status: 0 });
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  // const [blogForSearch, setBlogForSearch] = useState<MERGEDBLOGS[]>([]);

  function mergedALLBLOGS(
    blog: (Blog | SQLBLOGS)[],
    mysqlCategoryNames: Record<string, string> = {}
  ): MERGEDBLOGS[] {
    return blog.map((blg) => {
      if (isMongoBlog(blg)) {
        const mongoBLG = blg;
        const publishLabel = resolveAdminPublishLabel({
          publishStatus: mongoBLG.publishStatus,
          scheduledAt: mongoBLG.scheduledAt,
          blogStatus: mongoBLG.blogStatus,
        });
        return {
          title: mongoBLG.blogTitle,
          blogIMG: mongoBLG.blogBanner,
          createdAT: new Date(mongoBLG.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          blogID: mongoBLG.blogSlug,
          blogStatus: mongoBLG.blogStatus === true ? "active" : "inactive",
          publishLabel,
          scheduledAtLabel:
            publishLabel === "scheduled" && mongoBLG.scheduledAt
              ? formatScheduledAt(mongoBLG.scheduledAt)
              : undefined,
          canViewPublic: isBlogPubliclyVisible(mongoBLG),
          mongoID: mongoBLG._id,
          categoryName: mongoBLG.categoryName || undefined,
          createdTime: toTimestamp(mongoBLG.createdAt),
        };
      } else {
        const sqlBlog = blg as SQLBLOGS;
        const publishLabel =
          sqlBlog.status === "active" ? "published" : "inactive";
        return {
          title: sqlBlog.title,
          blogIMG: sqlBlog.blog_image,
          createdAT: new Date(sqlBlog.created_at).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          blogID: sqlBlog.slug,
          blogStatus: sqlBlog.status,
          publishLabel,
          canViewPublic: sqlBlog.status === "active",
          categoryName:
            sqlBlog.category_id != null
              ? mysqlCategoryNames[String(sqlBlog.category_id)]
              : undefined,
          createdTime: toTimestamp(sqlBlog.created_at),
        };
      }
    });
  }

  // useEffect(() => {
  //   setSearchQuery("");
  //   setSelectedCategory("");
  // }, []);
  // const allMergedRef = useRef<MERGEDBLOGS[]>([]);

  const [lftBtn, setLftBtn] = useState(0);
  const [rightBtn, setRightBtn] = useState(9);

  const getFilteredBlogs = () => {
    let list = mergedBlogs;
    if (statusFilter !== "all") {
      list = list.filter((blog) => blog.publishLabel === statusFilter);
    }
    if (searchedBl.trim()) {
      const categoryQuery = normalizeCategorySearch(searchedBl);
      list = list.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchedBl.toLowerCase()) ||
          (!!blog.categoryName &&
            normalizeCategorySearch(blog.categoryName).includes(categoryQuery))
      );
    }
    return list;
  };

  // Fetch blogs whenever filters or page changes
  const loadBlogs = async (showSuccessPopup = false) => {
    setLoading(true);
    try {
      const { data, status } = await axios.get(`/api/ritz_blogs/get-all-blogs`, {
        headers: managementAuthHeaders(),
        params: { _: Date.now() },
      });
      // /api/all_blogs excludes Case Studies (category_id 1) for the public site; admin needs every MySQL blog
      const [res2, mysqlCategoryNames] = await Promise.all([
        axios.get("/api/all_mysql_blogs", {
          params: { _: Date.now() },
        }),
        buildMysqlCategoryLookup(),
      ]);

      let combined: MERGEDBLOGS[] = [];

      if (data?.allBlogs) {
        combined = [...combined, ...mergedALLBLOGS(data.allBlogs)];
        setTotalBlogs(data.allBlogs.length);
      }

      if (Array.isArray(res2?.data)) {
        combined = [...combined, ...mergedALLBLOGS(res2.data, mysqlCategoryNames)];
      }

      combined.sort((a, b) => (b.createdTime ?? 0) - (a.createdTime ?? 0));

      setMergedBlogs(combined);
      setLastLength(combined.length);
      setLastSyncedAt(new Date());

      if (showSuccessPopup && data?.message) {
        setPopupData({ message: data.message, status });
        setShowPopup(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const tab = searchParams.get("status");
    if (
      tab === "draft" ||
      tab === "scheduled" ||
      tab === "published" ||
      tab === "inactive" ||
      tab === "all"
    ) {
      setStatusFilter(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    loadBlogs(true);
  }, []);

  const handleDelete = async () => {
    if (!deleteBlog) return;
    try {
      const { data, status } = await axios.delete("/api/blog/delete_blog", {
        data: { blog__id: deleteBlog._id },
        headers: managementAuthHeaders(),
      });
      // After deletion, refetch current page (or adjust page if last blog deleted)
      const newTotal = totalBlogs - 1;
      const maxPage = Math.ceil(newTotal / blogsPerPage);
      if (currentPage > maxPage) setCurrentPage(maxPage > 0 ? maxPage : 1);
      else setCurrentPage(currentPage);
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
    setDeleteBlog(null);
  };

  // const totalPages = Math.ceil(totalBlogs / blogsPerPage);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [deleteKey, setDeleteKey] = useState("");

  const deleteBlogNow = async () => {
    try {
      if (!deleteKey) {
        alert("Internal Key Error Please Try Again!");
        return;
      } else {
        const { data, status } = await axios.delete(
          `/api/ritz_blogs/delete-blog/${deleteKey}`,
          { headers: managementAuthHeaders() }
        );
        setPopupData({ message: data.message, status });
        setShowPopup(true);
        if (status === 200) {
          window.location.reload();
          setDeleteConfirmModal(false);
        }
      }
    } catch (error) {
      try {
        if (!deleteKey) {
          alert("Internal Key Error Please Try Again!");
          return;
        } else {
          const res = await axios.delete(`/api/delete_blog/${deleteKey}`, {
            headers: managementAuthHeaders(),
          });
          if (res.status === 200) {
            alert("Your Blog Has Been Deleted Successfully!");
            window.location.reload();
            setDeleteConfirmModal(false);
          }
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
        setDeleteConfirmModal(false);
      }
      // console.log("====================================");
      console.log(
        "There are some errors in your delete blog now controller plz fix the bug first ",
        error
      );
      // console.log("====================================");
    }
  };

  const handleDataDeleteModal = (key: string) => {
    setDeleteKey(" ");
    setDeleteConfirmModal(true);
    setDeleteKey(key);
  };

  // Pagination Is Starting From Here
  const [page, setPage] = useState<MERGEDBLOGS[]>([]);
  const [ttPage, setTTPage] = useState(0);

  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setActivePage(1);
    setLftBtn(0);
  }, [statusFilter, searchedBl]);

  useEffect(() => {
    const filtered = getFilteredBlogs();
    let start = lftBtn;
    if (start >= filtered.length) {
      start = 0;
      if (lftBtn !== 0) {
        setLftBtn(0);
      }
    }
    setPage(filtered.slice(start, Math.min(start + 9, filtered.length)));
    setLastLength(filtered.length);
    setTTPage(Math.max(1, Math.ceil(filtered.length / 9)));
  }, [mergedBlogs, statusFilter, searchedBl, lftBtn]);

  const leftPage = () => {
    const filteredLength = getFilteredBlogs().length;
    let newLeft = lftBtn - 9;
    if (newLeft < 0) newLeft = 0;

    let newRight = Math.min(newLeft + 9, filteredLength);
    setActivePage((prev) => (prev > 1 ? prev - 1 : prev));
    setLftBtn(newLeft);
    setRightBtn(newRight);
  };

  const rightPage = () => {
    const filteredLength = getFilteredBlogs().length;
    let newLeft = lftBtn + 9;
    if (newLeft >= filteredLength) return;

    let newRight = Math.min(newLeft + 9, filteredLength);
    setActivePage((prev) => (prev < Math.ceil(filteredLength / 9) ? prev + 1 : prev));
    setLftBtn(newLeft);
    setRightBtn(newRight);
  };

  const directPageNavigation = (e: HTMLElement) => {
    const filteredLength = getFilteredBlogs().length;
    const pageNum = Number(e.innerText);
    setActivePage(pageNum);
    let newLeft = (pageNum - 1) * 9;
    let newRight = Math.min(newLeft + 9, filteredLength);
    if (newLeft >= filteredLength) {
      newLeft = 0;
      newRight = Math.min(9, filteredLength);
    }

    setLftBtn(newLeft);
    setRightBtn(newRight);
  };

  const getEntriesManually = (e: number) => {
    const val = Number(e);
    setPage(getFilteredBlogs().slice(0, val));
  };

  const handleActiveBtnToggle = async (
    blStatus: string,
    dbSt: string,
    blID: string
  ) => {
    try {
      let res;
      if (dbSt.includes("mongo")) {
        res = await axios.patch("/api/blog-updation", {
          blStatus: blStatus === "active" ? false : true,
          dbSt,
          blID,
        });
      } else {
        res = await axios.patch("/api/blog-updation", {
          blStatus: blStatus === "active" ? "inactive" : "active",
          dbSt,
          blID,
        });
      }
      if (res.status === 200) {
        window.location.reload();
      } else {
        alert("Server Error!");
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

  function stripHTML(html: string) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  const [backupLoading, setBackupLoading] = useState(false);
  const [backupProgress, setBackupProgress] = useState<ExportProgress>({
    phase: "preparing",
    current: 0,
    total: 0,
    percent: 0,
    label: "Starting backup...",
  });

  const rmwBackUpHandler = async () => {
    setBackupLoading(true);
    setBackupProgress({
      phase: "preparing",
      current: 0,
      total: 0,
      percent: 2,
      label: "Fetching blogs...",
    });
    let mongoBlogs: MONGOEXCELBLOG[] | undefined;
    let sqlBlogs: MYSQLBLOGS[] | undefined;

    try {
      const [mysqlCategoryNames, mongoCategoryNames] = await Promise.all([
        buildMysqlCategoryLookup(),
        buildMongoCategoryLookup(),
      ]);

      setBackupProgress((prev) => ({
        ...prev,
        percent: 8,
        label: "Fetching MongoDB blogs...",
      }));

      // Fetch All The MongoDb Blogs ::
      try {
        const { data } = await axios.get<{ allBlogs: MONGOEXCELBLOG[] }>(
          "/api/ritz_blogs/get-all-blogs"
        );
        if (data && data.allBlogs && data.allBlogs.length > 0) {
          mongoBlogs = data.allBlogs.map((ob: MONGOEXCELBLOG) => {
            const plainText = stripHTML(ob.blogDescription);
            return {
              ...ob,
              blogDescription: plainText,
            };
          });
        }
      } catch (error) {
        console.error("Error in fetching MongoDB blogs:", error);
        setPopupData({
          message: "Failed to fetch MongoDB blogs. Continuing with available data...",
          status: 500,
        });
        setShowPopup(true);
      }

      setBackupProgress((prev) => ({
        ...prev,
        percent: 15,
        label: "Fetching MySQL blogs...",
      }));

      // Fetch All The MySQL Blogs ::
      try {
        const { data } = await axios.get<MYSQLBLOGS[]>("/api/all_mysql_blogs");
        if (data && Array.isArray(data) && data.length > 0) {
          sqlBlogs = data.map((ob: MYSQLBLOGS) => {
            const plainText = stripHTML(ob.description);
            return {
              ...ob,
              description: plainText,
            };
          });
        }
      } catch (error) {
        console.error("Error in fetching MySQL blogs:", error);
        setPopupData({
          message: "Failed to fetch MySQL blogs. Continuing with available data...",
          status: 500,
        });
        setShowPopup(true);
      }

      setBackupProgress((prev) => ({
        ...prev,
        percent: 20,
        label: "Preparing export rows...",
      }));

      const exportRows = [
        ...(mongoBlogs || []).map((blog) =>
          mapMongoBlogToExportRow(
            blog as MongoBlogExportSource,
            stripHTML,
            mongoCategoryNames
          )
        ),
        ...(sqlBlogs || []).map((blog) =>
          mapMysqlBlogToExportRow(
            blog as MysqlBlogExportSource,
            stripHTML,
            mysqlCategoryNames
          )
        ),
      ];

      if (exportRows.length === 0) {
        setPopupData({
          message: "No blogs found to backup.",
          status: 404,
        });
        setShowPopup(true);
        setBackupLoading(false);
        return;
      }

      const fileName = `rmw-blogs-backup-${new Date().toISOString().split("T")[0]}.xlsx`;
      await exportBlogsToExcel(exportRows, fileName, setBackupProgress);

      setPopupData({
        message: `Backup completed. ${exportRows.length} blogs exported with images in Excel.`,
        status: 200,
      });
      setShowPopup(true);
    } catch (error) {
      console.error("Error in backup process:", error);
      setPopupData({
        message:
          error instanceof Error && "message" in error
            ? (error as { message: string }).message
            : "An error occurred during backup process.",
        status:
          error instanceof Error && "status" in error
            ? (error as { status?: number }).status ?? 500
            : 500,
      });
      setShowPopup(true);
    } finally {
      setBackupLoading(false);
      setBackupProgress({
        phase: "done",
        current: 0,
        total: 0,
        percent: 0,
        label: "",
      });
    }
  };

  const isInitialLoading = loading && mergedBlogs.length === 0;
  const isRefreshing = loading && mergedBlogs.length > 0;
  const hasSearch = searchedBl.trim().length > 0;
  const filteredForRange = getFilteredBlogs();
  const firstIndex = page.length > 0 ? filteredForRange.indexOf(page[0]) : -1;
  const showingFrom = firstIndex >= 0 ? firstIndex + 1 : 0;
  const showingTo = firstIndex >= 0 ? firstIndex + page.length : 0;
  const canGoPrev = lftBtn > 0;
  const canGoNext = lftBtn + 9 < llength;
  const pageNumbers = getPageNumbers(activePage, ttPage);
  const totalCount = mergedBlogs.length;

  const editHref = (blog: MERGEDBLOGS) =>
    blog.mongoID
      ? `/admin/update/step-1/${blog.mongoID}`
      : `/admin/update/sqlB/${blog.blogID}`;

  const toggleVisibility = (blog: MERGEDBLOGS) =>
    blog.blogIMG.includes("/images")
      ? handleActiveBtnToggle(
          blog.blogStatus,
          "mongo",
          blog.mongoID ? blog.mongoID : blog.blogID
        )
      : handleActiveBtnToggle(blog.blogStatus, "mysql", blog.blogID);

  const renderThumb = (blog: MERGEDBLOGS, size: "sm" | "lg") => {
    const src = blogImageSrc(blog.blogIMG);
    const box =
      size === "sm"
        ? "h-[60px] w-[96px] rounded-xl"
        : "h-40 w-full rounded-none";
    if (!src) {
      return (
        <div
          className={`${box} flex flex-shrink-0 items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 text-slate-300 ring-1 ring-inset ring-slate-200/70`}
        >
          <ImageOff className="h-5 w-5" />
        </div>
      );
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={blog.title}
        width={size === "sm" ? 192 : 640}
        height={size === "sm" ? 120 : 320}
        loading="lazy"
        decoding="async"
        className={`${box} flex-shrink-0 object-cover ring-1 ring-black/5`}
      />
    );
  };

  const renderPublishBadge = (blog: MERGEDBLOGS) => (
    <span
      className="inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize"
      style={publishBadgeStyle(blog.publishLabel)}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: publishBadgeStyle(blog.publishLabel).color }}
      />
      {blog.publishLabel}
    </span>
  );

  const renderVisibilitySwitch = (blog: MERGEDBLOGS) => {
    const isActive = blog.blogStatus === "active";
    return (
      <button
        type="button"
        role="switch"
        aria-checked={isActive}
        onClick={() => toggleVisibility(blog)}
        title={isActive ? "Click to deactivate" : "Click to activate"}
        className="group/switch inline-flex w-fit cursor-pointer items-center gap-2 text-[12px] font-medium text-slate-600"
      >
        <span
          className={`relative inline-flex h-[18px] w-8 items-center rounded-full transition-colors duration-200 ${
            isActive ? "bg-emerald-500" : "bg-slate-300 group-hover/switch:bg-slate-400"
          }`}
        >
          <span
            className={`absolute h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
              isActive ? "translate-x-[16px]" : "translate-x-[2px]"
            }`}
          />
        </span>
        <span className="capitalize">{blog.blogStatus}</span>
      </button>
    );
  };

  const iconButton =
    "inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-all duration-150 hover:-translate-y-px hover:shadow-sm";

  return (
    <div className="flex min-h-screen flex-col gap-6 pb-10">
      {showPopup && (
        <RMWPopup
          message={popupData.message}
          status={popupData.status}
          onClose={() => setShowPopup(false)}
        />
      )}

      <AnimatePresence>
        {deleteConfirmModal && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: "rgba(11,22,35,0.55)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.currentTarget === e.target) setDeleteConfirmModal(false);
            }}
          >
            <motion.div
              className="relative w-full max-w-[420px] overflow-hidden rounded-2xl bg-white shadow-[0_24px_80px_rgba(11,22,35,0.28)]"
              initial={{ y: 16, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="h-1 w-full bg-gradient-to-r from-red-500 via-rose-500 to-red-600" />
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 ring-1 ring-red-100">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-[#0B1623]">
                      Delete this blog?
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      This action cannot be undone. The blog will be permanently
                      removed from the website and the admin panel.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-2.5">
                  <button
                    className="h-10 cursor-pointer rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    onClick={() => setDeleteConfirmModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="h-10 cursor-pointer rounded-xl bg-gradient-to-br from-red-500 to-red-600 px-4 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(239,68,68,0.3)] transition hover:brightness-105"
                    onClick={deleteBlogNow}
                  >
                    Yes, delete blog
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Breadcrumb currentPage="Manage Blogs" middleLinks={[]} />

      {/* Page header */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_12px_32px_-16px_rgba(16,24,40,0.12)]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(197,157,79,0.18),transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-32 right-40 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(41,85,179,0.08),transparent_70%)]" />

        <div className="relative flex flex-wrap items-start justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B1623] to-[#1E2D3D] shadow-[0_8px_20px_rgba(11,22,35,0.22)]">
              <FileText className="h-5 w-5 text-[#C59D4F]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[22px] font-bold tracking-tight text-[#0B1623]">
                  Manage Blogs
                </h1>
                <span className="rounded-full border border-[#C59D4F]/30 bg-[#C59D4F]/10 px-2 py-0.5 text-[11px] font-semibold text-[#9A7530]">
                  {totalCount} posts
                </span>
              </div>
              <p className="mt-1 max-w-xl text-sm text-slate-500">
                Create, schedule and manage every article across the CMS and the
                legacy archive from one place.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                {lastSyncedAt && (
                  <span>
                    Last synced{" "}
                    {lastSyncedAt.toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => loadBlogs(false)}
              disabled={loading}
              title="Refresh blogs"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-wait"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              type="button"
              onClick={rmwBackUpHandler}
              disabled={backupLoading}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#0B1623] transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Download className="h-4 w-4 text-slate-500" />
              {backupLoading ? `Backing up… ${backupProgress.percent}%` : "Get Backup"}
            </button>
            <Link
              title="Add New Blog"
              href={"/admin/add-blog"}
              className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-br from-[#C59D4F] to-[#9A7530] px-4 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(197,157,79,0.32)] transition hover:brightness-105"
            >
              <Plus className="h-4 w-4" />
              New Blog
            </Link>
          </div>
        </div>

        {backupLoading && (
          <div className="relative mt-5 rounded-xl border border-slate-200/70 bg-slate-50/80 p-3">
            <div className="flex items-center justify-between text-xs font-medium text-slate-600">
              <span>{backupProgress.label || "Preparing backup…"}</span>
              <span className="tabular-nums">{backupProgress.percent}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#C59D4F] to-[#9A7530] transition-all duration-300"
                style={{ width: `${backupProgress.percent}%` }}
              />
            </div>
          </div>
        )}
      </section>

      {/* Status overview — doubles as the status filter */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {STATUS_CARDS.map((card) => {
          const count = countByLabel(mergedBlogs, card.key);
          const isActive = statusFilter === card.key;
          const share = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
          const Icon = card.icon;
          return (
            <button
              key={card.key}
              type="button"
              onClick={() => setStatusFilter(card.key)}
              aria-pressed={isActive}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-12px_rgba(16,24,40,0.18)] ${
                isActive
                  ? "border-transparent shadow-[0_12px_28px_-12px_rgba(16,24,40,0.22)] ring-2 ring-[#C59D4F]/70"
                  : "border-slate-200/70 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">
                    {card.label}
                  </p>
                  <p className="mt-2 text-[26px] font-bold leading-none tracking-tight text-[#0B1623] tabular-nums">
                    {isInitialLoading ? (
                      <span className="inline-block h-6 w-12 animate-pulse rounded-md bg-slate-100" />
                    ) : (
                      count
                    )}
                  </p>
                </div>
                <span
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105"
                  style={{ background: card.tint, color: card.accent }}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-[11.5px] text-slate-500">
                <span>{card.hint}</span>
                {card.key !== "all" && <span className="tabular-nums">{share}%</span>}
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${card.key === "all" ? (totalCount > 0 ? 100 : 0) : share}%`,
                    background: card.accent,
                    opacity: card.key === "all" ? 0.85 : 0.7,
                  }}
                />
              </div>
            </button>
          );
        })}
      </section>

      {/* Blog list */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_12px_32px_-16px_rgba(16,24,40,0.12)]">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchedBl}
              placeholder="Search by title or category…"
              onChange={(e) => setSearchedB(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-9 text-sm text-[#0B1623] outline-none transition placeholder:text-slate-400 focus:border-[#C59D4F] focus:bg-white focus:ring-4 focus:ring-[#C59D4F]/10 [&::-webkit-search-cancel-button]:hidden"
            />
            {hasSearch && (
              <button
                type="button"
                onClick={() => setSearchedB("")}
                title="Clear search"
                className="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-200/70 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {statusFilter !== "all" && (
              <button
                type="button"
                onClick={() => setStatusFilter("all")}
                className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 bg-white pl-3 pr-2 text-xs font-semibold capitalize text-slate-600 transition hover:bg-slate-50"
              >
                {statusFilter}
                <X className="h-3.5 w-3.5 text-slate-400" />
              </button>
            )}
            <span className="text-xs text-slate-500 tabular-nums">
              {llength > 0
                ? `Showing ${showingFrom}–${showingTo} of ${llength}`
                : "No results"}
            </span>
            {isRefreshing && (
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <RefreshCw className="h-3 w-3 animate-spin" />
                Syncing
              </span>
            )}
            <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
              Rows
              <select
                onChange={(E) => getEntriesManually(Number(E.target.value))}
                className="h-8 cursor-pointer rounded-lg border border-slate-200 bg-white px-2 text-xs font-medium text-[#0B1623]"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                {mergedBlogs.length > 0 && (
                  <option value={mergedBlogs && Math.ceil(mergedBlogs.length / 2)}>
                    {mergedBlogs && Math.ceil(mergedBlogs.length / 2)}
                  </option>
                )}
              </select>
            </label>
          </div>
        </div>

        {/* Desktop column header */}
        <div
          className={`hidden md:grid ${LIST_GRID_COLUMNS} gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500`}
        >
          <span>Blog</span>
          <span>Added</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {isInitialLoading ? (
          <div className="divide-y divide-slate-100">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="h-[60px] w-[96px] flex-shrink-0 animate-pulse rounded-xl bg-slate-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-2/3 animate-pulse rounded bg-slate-100" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
                </div>
                <div className="hidden h-3 w-24 animate-pulse rounded bg-slate-100 md:block" />
                <div className="hidden h-6 w-24 animate-pulse rounded-full bg-slate-100 md:block" />
                <div className="hidden h-8 w-24 animate-pulse rounded-lg bg-slate-100 md:block" />
              </div>
            ))}
          </div>
        ) : page.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-200/70">
              <FileText className="h-6 w-6 text-slate-300" />
            </div>
            <p className="mt-4 text-sm font-semibold text-[#0B1623]">
              {hasSearch ? `No results for “${searchedBl.trim()}”` : EMPTY_MESSAGES[statusFilter]}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {hasSearch
                ? "Try a different title or category name."
                : "Blogs you create will show up here."}
            </p>
            <div className="mt-5 flex gap-2">
              {(hasSearch || statusFilter !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchedB("");
                    setStatusFilter("all");
                  }}
                  className="h-9 cursor-pointer rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Clear filters
                </button>
              )}
              <Link
                href={"/admin/add-blog"}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#0B1623] px-4 text-sm font-semibold text-white transition hover:bg-[#1E2D3D]"
              >
                <Plus className="h-4 w-4" />
                New Blog
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop rows */}
            <div className="hidden divide-y divide-slate-100 md:block">
              {page.map((blog) => (
                <div
                  key={`${blog.mongoID ? "mongo" : "mysql"}-${blog.blogID}`}
                  className={`group grid ${LIST_GRID_COLUMNS} items-center gap-4 px-5 py-3.5 transition-colors duration-150 hover:bg-slate-50/70`}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    {renderThumb(blog, "sm")}
                    <div className="min-w-0">
                      <Link
                        href={editHref(blog)}
                        title={blog.title}
                        className="line-clamp-2 text-[14px] font-semibold leading-snug text-[#0B1623] transition-colors hover:text-[#9A7530]"
                      >
                        {blog.title}
                      </Link>
                      <div className="mt-1.5 flex min-w-0 flex-wrap items-center gap-1.5">
                        <span className="max-w-[260px] truncate font-mono text-[11px] text-slate-400">
                          /{blog.blogID}
                        </span>
                        {blog.categoryName && (
                          <span className="rounded-md bg-[#2955B3]/[0.07] px-1.5 py-0.5 text-[10.5px] font-semibold text-[#2955B3]">
                            {blog.categoryName}
                          </span>
                        )}
                        <span
                          className={`rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold ${
                            blog.mongoID
                              ? "bg-[#C59D4F]/10 text-[#9A7530]"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {blog.mongoID ? "CMS" : "Legacy"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[12.5px] text-slate-600">
                    <div className="font-medium">{blog.createdAT}</div>
                    {blog.scheduledAtLabel && (
                      <div className="mt-1 inline-flex items-center gap-1 text-[11.5px] font-medium text-amber-600">
                        <CalendarClock className="h-3 w-3" />
                        {blog.scheduledAtLabel}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    {renderPublishBadge(blog)}
                    {renderVisibilitySwitch(blog)}
                  </div>

                  <div className="flex items-center justify-end gap-1">
                    {blog.canViewPublic ? (
                      <Link
                        href={`/${blog.blogID}`}
                        title="View blog"
                        className={`${iconButton} hover:bg-blue-50 hover:text-blue-600`}
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    ) : (
                      <span
                        title="Not publicly visible yet"
                        className={`${iconButton} cursor-not-allowed text-slate-300 hover:translate-y-0 hover:shadow-none`}
                      >
                        <Eye className="h-4 w-4" />
                      </span>
                    )}
                    <Link
                      title="Edit blog"
                      href={editHref(blog)}
                      className={`${iconButton} hover:bg-emerald-50 hover:text-emerald-600`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      title="Delete blog"
                      onClick={() => handleDataDeleteModal(blog.blogID)}
                      className={`${iconButton} cursor-pointer hover:bg-red-50 hover:text-red-600`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile cards */}
            <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 md:hidden">
              {page.map((blog) => (
                <div
                  key={`${blog.mongoID ? "mongo" : "mysql"}-${blog.blogID}`}
                  className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
                >
                  <div className="relative">
                    {renderThumb(blog, "lg")}
                    <div className="absolute left-3 top-3">{renderPublishBadge(blog)}</div>
                  </div>
                  <div className="p-4">
                    <Link
                      href={editHref(blog)}
                      className="line-clamp-2 text-sm font-semibold leading-snug text-[#0B1623]"
                    >
                      {blog.title}
                    </Link>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11.5px] text-slate-500">
                      <span>{blog.createdAT}</span>
                      {blog.categoryName && (
                        <span className="rounded-md bg-[#2955B3]/[0.07] px-1.5 py-0.5 text-[10.5px] font-semibold text-[#2955B3]">
                          {blog.categoryName}
                        </span>
                      )}
                    </div>
                    {blog.scheduledAtLabel && (
                      <div className="mt-1.5 inline-flex items-center gap-1 text-[11.5px] font-medium text-amber-600">
                        <CalendarClock className="h-3 w-3" />
                        {blog.scheduledAtLabel}
                      </div>
                    )}
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                      {renderVisibilitySwitch(blog)}
                      <div className="flex gap-1">
                        {blog.canViewPublic && (
                          <Link
                            href={`/${blog.blogID}`}
                            title="View blog"
                            className={`${iconButton} hover:bg-blue-50 hover:text-blue-600`}
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        )}
                        <Link
                          title="Edit blog"
                          href={editHref(blog)}
                          className={`${iconButton} hover:bg-emerald-50 hover:text-emerald-600`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          title="Delete blog"
                          onClick={() => handleDataDeleteModal(blog.mongoID || blog.blogID)}
                          className={`${iconButton} cursor-pointer hover:bg-red-50 hover:text-red-600`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {!isInitialLoading && llength > 0 && (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-5 py-3.5 sm:flex-row">
            <p className="text-xs text-slate-500 tabular-nums">
              Page <span className="font-semibold text-[#0B1623]">{activePage}</span> of{" "}
              <span className="font-semibold text-[#0B1623]">{ttPage}</span>
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={leftPage}
                disabled={!canGoPrev}
                className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg px-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </button>
              {pageNumbers.map((p, i) =>
                p === "gap" ? (
                  <span key={`gap-${i}`} className="px-1.5 text-xs text-slate-400">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    onClick={(e) => directPageNavigation(e.currentTarget)}
                    aria-current={p === activePage ? "page" : undefined}
                    className={`h-8 min-w-8 cursor-pointer rounded-lg px-2 text-xs font-semibold tabular-nums transition ${
                      p === activePage
                        ? "bg-[#0B1623] text-white shadow-[0_4px_10px_rgba(11,22,35,0.2)]"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                type="button"
                onClick={rightPage}
                disabled={!canGoNext}
                className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg px-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </section>

      <AnimatePresence>
        {deleteBlog && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: "rgba(11,22,35,0.55)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-[420px] overflow-hidden rounded-2xl bg-white shadow-[0_24px_80px_rgba(11,22,35,0.28)]"
              initial={{ y: 16, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="h-1 w-full bg-gradient-to-r from-red-500 via-rose-500 to-red-600" />
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 ring-1 ring-red-100">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-[#0B1623]">
                      Delete this blog?
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      Are you sure you want to delete &quot;{deleteBlog.blogTitle}
                      &quot;? This cannot be undone.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-2.5">
                  <button
                    className="h-10 cursor-pointer rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    onClick={() => setDeleteBlog(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="h-10 cursor-pointer rounded-xl bg-gradient-to-br from-red-500 to-red-600 px-4 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(239,68,68,0.3)] transition hover:brightness-105"
                    onClick={handleDelete}
                  >
                    Yes, delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
