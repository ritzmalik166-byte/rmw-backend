"use client";

import React, { useState, useMemo, useEffect } from "react";
import styles from "./page.module.css";
import {
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import RMWPopup from "@/components/rmw_popup/RMWPopup";

// ✅ TypeScript Interface (based on schema)
interface WebStory {
  _id: string;
  title: string;
  description: string;
  titleAlign: "top" | "center" | "bottom";
  descAlign: "top" | "center" | "bottom";
  img: string;
  metaDescription: string;
  metaKeyWords: string;
  topic: {
    _id: string;
    name: string;
  };
  buttonCTA: {
    btnTxt: string;
    btnLink: string;
    btnColor: string;
    btnTxtColor: string;
  };
  createdAt: string;
  updatedAt: string;
}

const ITEMS_PER_PAGE = 10;

function WebStoryManagerPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [storyPages, setStoryPages] = useState<WebStory[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ message: "", status: 0 });
  const filteredStories = useMemo(() => {
    return storyPages.filter(
      (story) =>
        story.title.toLowerCase().includes(search.toLowerCase()) ||
        story.topic?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, storyPages]);

  const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE);
  const paginatedStories = filteredStories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const navigation = useRouter();
  const handleNavigation = (id: string) => {
    navigation.push(`/admin/update/update-web-story/${id}`);
  };

  const getAllPages = async () => {
    try {
      const { data, status } = await axios.get(
        "/api/rizt_webStories/get-pages-for-manage"
      );
      setStoryPages(data.allPages || []);
      setPopupData({ message: data.message, status });
      setShowPopup(true);
    } catch (error) {
      if (typeof error === "object" && error !== null && "message" in error) {
        setPopupData({
          message: (error as { message: string }).message,
        status: (error instanceof Error && "status" in error)
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
    getAllPages();
  }, []);

  const deleteStoryPage = async (id: string) => {
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("rm_token")
          : null;
      const { status, data } = await axios.delete(
        `/api/rizt_webStories/delete-webStory-page/${id}`,
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      setPopupData({ message: data.message, status });
      setShowPopup(true);
      if (status === 200) {
        window.location.reload();
      }
    } catch (error) {
      if (typeof error === "object" && error !== null && "message" in error) {
        setPopupData({
          message: (error as { message: string }).message,
        status: (error instanceof Error && "status" in error)
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
    <section className={styles.container}>
      {showPopup && (
        <RMWPopup
          message={popupData.message}
          status={popupData.status}
          onClose={() => setShowPopup(false)}
        />
      )}
      <h1 className={styles.heading}>Manage Web Stories</h1>

      <div className={styles.searchWrapper}>
        <Search size={18} />
        <input
          className={styles.search}
          type="text"
          placeholder="Search by title or topic..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className={styles.grid}>
        {paginatedStories.map((story) => (
          <div key={story._id} className={styles.card}>
            <img
              src={`${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images/${
                story.img.split("images")[1]
              }`}
              alt={story.title}
              className={styles.storyImage}
            />

            <div className={styles.cardTop}>
              <h3>{story.title}</h3>
              {/* <span className={styles.topic}>
                {story.topic?.name || "No topic"}
              </span> */}
            </div>

            <p className={styles.desc}>
              {story.description || "No description"}
            </p>

            <div className={styles.meta}>
              <small>
                <strong>Meta Desc:</strong> {story.metaDescription}
              </small>
              <small>
                <strong>Meta Keywords:</strong> {story.metaKeyWords}
              </small>
            </div>

            <div className={styles.alignments}>
              <span>Title Align: {story.titleAlign}</span>
              <span>Description Align: {story.descAlign}</span>
            </div>

            <div className={styles.ctaPreview}>
              <a
                href={story.buttonCTA?.btnLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: story.buttonCTA?.btnColor || "#333",
                  color: story.buttonCTA?.btnTxtColor || "#fff",
                }}
                className={styles.ctaButton}
              >
                {story.buttonCTA?.btnTxt || "Click"}
              </a>
            </div>

            <div className={styles.actions}>
              {/* <button title="View">
                <Eye size={18} />
              </button> */}
              <button onClick={() => handleNavigation(story._id)} title="Edit">
                <Pencil size={18} />
              </button>
              <button onClick={() => deleteStoryPage(story._id)} title="Delete">
                <Trash2 size={18} color="#dc2626" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button onClick={handlePrev} disabled={currentPage === 1}>
            <ChevronLeft size={20} />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
}

export default WebStoryManagerPage;
