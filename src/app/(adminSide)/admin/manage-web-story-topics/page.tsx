"use client";

import React, { useState, useMemo, useEffect } from "react";
import styles from "./page.module.css";
import {
  PencilIcon,
  Trash2Icon,
  ToggleLeftIcon,
  ToggleRightIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import RMWPopup from "@/components/rmw_popup/RMWPopup";

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "").trim();
}

interface WEBSTORIES {
  _doc: {
    _id: string;
    createdAt: Date;
    description: string;
    isActive: boolean;
    metaDescription: string;
    metaKeyWords: string;
    pages: number;
    topicImg: string;
    topicTitle: string;
    slug: string;
  };
}

const PER_PAGE = 9;

const Page = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [allWebStories, setAllWebStories] = useState<WEBSTORIES[]>([]);
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ message: "", status: 0 });
  const filteredTopics = useMemo(() => {
    return allWebStories.filter((topic) => {
      const title = topic?._doc.topicTitle?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();
      return title.includes(search);
    });
  }, [searchTerm, allWebStories]);

  const totalPages = Math.ceil(filteredTopics.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const currentTopics = filteredTopics.slice(start, start + PER_PAGE);

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { data, status } = await axios.patch(
        `/api/ritz_webStoryTopics/toggle-status`,
        {
          id,
          status: !currentStatus,
        }
      );
      setAllWebStories((prev) =>
        prev.map((topic) =>
          topic._doc._id === id ? { ...topic, isActive: data.isActive } : topic
        )
      );
      if (status === 200) {
        window.location.reload();
      }

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

  const deleteTopic = async (id: string) => {
   
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("rm_token")
          : null;
      const { data, status } = await axios.delete(
        `/api/ritz_webStoryTopics/delete-webStory-topic/${id}`
      ,
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      setAllWebStories((prev) => prev.filter((topic) => topic._doc._id !== id));
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

  const getAllWebStoryTopic = async () => {
    setLoading(true);
    try {
      const { data, status } = await axios.get(
        "/api/rizt_webStories/get-all-webStories"
      );
      console.log("Fetched web stories:", data?.webStories);
      setAllWebStories(Array.isArray(data?.webStories) ? data.webStories : []);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllWebStoryTopic();
  }, []);

  if (loading) {
    return (
      <section className={styles.container}>
        <div className={styles.loading}>Loading topics...</div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      {showPopup && (
        <RMWPopup
          message={popupData.message}
          status={popupData.status}
          onClose={() => setShowPopup(false)}
        />
      )}
      <div className={styles.header}>
        <h1 className={styles.heading}>Manage Web Story Topics</h1>
        <button
          className={styles.createBtn}
          onClick={() => router.push("/admin/add-web-story-topics")}
        >
          Create New Topic
        </button>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by title..."
          className={styles.searchBar}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {currentTopics.length === 0 ? (
        <div className={styles.emptyState}>
          {searchTerm ? "No matching topics found" : "No topics available"}
        </div>
      ) : (
        <>
          <div className={styles.cardGrid}>
            {currentTopics.map((topic) => (
              <div key={topic._doc._id} className={styles.card}>
                <div className={styles.imageContainer}>
                  {topic._doc.topicImg ? (
                    <Image
                      src={`${
                        process.env.NEXT_PUBLIC_SERVER_IMG_PATH
                      }/api/images/${topic._doc.topicImg.split("images")[1]}`}
                      alt={topic._doc.topicTitle || "Topic image"}
                      className={styles.image}
                      width={300}
                      height={200}
                      priority
                    />
                  ) : (
                    <div className={styles.noImage}>No Image</div>
                  )}
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.title}>
                    {topic._doc.topicTitle || "Untitled Topic"}
                  </h3>
                  <p className={styles.description}>
                    {stripHtml(topic._doc.description) ||
                      "No description available"}
                  </p>
                  <div className={styles.meta}>
                    <span className={styles.pages}>
                      {topic._doc.pages || 0}{" "}
                      {topic._doc.pages === 1 ? "page" : "pages"}
                    </span>
                    <span
                      className={`${styles.status} ${
                        topic._doc.isActive ? styles.active : styles.inactive
                      }`}
                    >
                      {topic._doc.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className={styles.actions}>
                    {/* <button
                      title="View"
                      onClick={() =>
                        router.push(
                          `/web-stories/${topic._doc.slug || topic._doc._id}`
                        )
                      }
                    >
                      <EyeIcon size={18} />
                    </button> */}
                    <button
                      title="Edit"
                      onClick={() =>
                        router.push(
                          `/admin/update/update-web-story-topic/${topic._doc.slug}`
                        )
                      }
                    >
                      <PencilIcon size={18} />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => deleteTopic(topic._doc._id)}
                    >
                      <Trash2Icon size={18} />
                    </button>
                    <button
                      title="Toggle Active"
                      onClick={() =>
                        toggleActive(topic._doc._id, topic._doc.isActive)
                      }
                    >
                      {topic._doc.isActive ? (
                        <ToggleRightIcon size={20} color="#4CAF50" />
                      ) : (
                        <ToggleLeftIcon size={20} color="#9E9E9E" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                Prev
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    className={`${styles.pageBtn} ${
                      page === pageNum ? styles.active : ""
                    }`}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && <span className={styles.ellipsis}>...</span>}
              <button
                className={styles.pageBtn}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Page;
