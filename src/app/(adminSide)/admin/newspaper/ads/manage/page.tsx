"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { IAdvertisementWithId, CategoryEnum } from "@/types/advertisement";
import { Loader } from "../../components";
import { Popup, PopupType } from "../../components";
import Link from "next/link";

interface PopupState {
  show: boolean;
  type: PopupType;
  message: string;
}

interface DeleteModalState {
  show: boolean;
  ad: IAdvertisementWithId | null;
}

const ManageAdvertisementsPage: React.FC = () => {
  const [advertisements, setAdvertisements] = useState<IAdvertisementWithId[]>([]);
  const [filteredAds, setFilteredAds] = useState<IAdvertisementWithId[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sorting, setSorting] = useState<"asc" | "desc" | "">("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryEnum | "">("");
  
  const [popup, setPopup] = useState<PopupState>({
    show: false,
    type: "info",
    message: "",
  });

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    show: false,
    ad: null,
  });

  // Fetch advertisements
  const fetchAdvertisements = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/newspaper/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filterData: categoryFilter ? { category: categoryFilter } : {},
          sorting,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setAdvertisements(result.data);
        setFilteredAds(result.data);
      } else {
        setPopup({
          show: true,
          type: "error",
          message: result.message || "Failed to fetch advertisements",
        });
      }
    } catch (error) {
      console.error("Error fetching advertisements:", error);
      setPopup({
        show: true,
        type: "error",
        message: "An error occurred while fetching advertisements",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvertisements();
  }, [sorting, categoryFilter]);

  // Search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredAds(advertisements);
    } else {
      const filtered = advertisements.filter((ad) => {
        const search = searchTerm.toLowerCase();
        const parentName = (ad as unknown as { parentID: { paperName: string } }).parentID?.paperName || "";
        return (
          ad.adtype.toLowerCase().includes(search) ||
          ad.adLabel.toLowerCase().includes(search) ||
          parentName.toLowerCase().includes(search)
        );
      });
      setFilteredAds(filtered);
    }
  }, [searchTerm, advertisements]);

  // Handle delete
  const handleDeleteClick = (ad: IAdvertisementWithId) => {
    setDeleteModal({ show: true, ad });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.ad) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/newspaper/ads/${deleteModal.ad._id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setPopup({
          show: true,
          type: "success",
          message: result.message || "Advertisement deleted successfully",
        });
        setDeleteModal({ show: false, ad: null });
        fetchAdvertisements();
      } else {
        setPopup({
          show: true,
          type: "error",
          message: result.message || "Failed to delete advertisement",
        });
      }
    } catch (error) {
      console.error("Error deleting advertisement:", error);
      setPopup({
        show: true,
        type: "error",
        message: "An error occurred while deleting the advertisement",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closePopup = () => setPopup((prev) => ({ ...prev, show: false }));

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      {popup.show && <Popup type={popup.type} message={popup.message} onClose={closePopup} />}

      {/* Delete Modal */}
      {deleteModal.show && deleteModal.ad && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Delete Advertisement</h3>
            <p>Are you sure you want to delete <strong>{deleteModal.ad.adtype}</strong>?</p>
            <div className={styles.modalActions}>
              <button onClick={() => setDeleteModal({ show: false, ad: null })} className={styles.cancelBtn}>
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className={styles.deleteBtn}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Manage Advertisements</h1>
          <p className={styles.subtitle}>View, edit, and manage all advertisement listings</p>
        </div>
        <Link href="/admin/newspaper/ads/add" title="Add New Advertisement" className={styles.addButton}>
          + Add New Advertisement
        </Link>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search advertisements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select value={sorting} onChange={(e) => setSorting(e.target.value as "asc" | "desc" | "")} className={styles.select}>
          <option value="">Sort by Rate</option>
          <option value="asc">Rate: Low to High</option>
          <option value="desc">Rate: High to Low</option>
        </select>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value as CategoryEnum | "")} className={styles.select}>
          <option value="">All Categories</option>
          <option value="Top Choice">Top Choice</option>
          <option value="Other Ad Options">Other Ad Options</option>
        </select>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <span>Total: {advertisements.length}</span>
        <span>Showing: {filteredAds.length}</span>
      </div>

      {/* Table */}
      {filteredAds.length === 0 ? (
        <div className={styles.empty}>
          <h3>No advertisements found</h3>
          <p>Start by adding your first advertisement</p>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Images</th>
                <th>Ad Type</th>
                <th>Newspaper</th>
                <th>Category</th>
                <th>Base Rate</th>
                <th>Label</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAds.map((ad) => {
                const parentData = (ad as unknown as { parentID: { paperName: string; language: string } }).parentID;
                return (
                  <tr key={ad._id}>
                    <td>
                      <div className={styles.imageGrid}>
                        {ad.imgs.slice(0, 2).map((img, idx) => (
                          <img key={idx}  src={`${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images${img.split("/images")[1]}`} alt="Ad" className={styles.thumbnail} />
                        ))}
                        {ad.imgs.length > 2 && <span className={styles.moreImages}>+{ad.imgs.length - 2}</span>}
                      </div>
                    </td>
                    <td><strong>{ad.adtype}</strong></td>
                    <td>{parentData?.paperName} ({parentData?.language})</td>
                    <td><span className={styles.badge}>{ad.category}</span></td>
                    <td>₹{ad.baseRate.toLocaleString()}</td>
                    <td>{ad.adLabel}</td>
                    <td>
                      <div className={styles.actions}>
                        <Link href={`/admin/newspaper/ads/edit?id=${ad._id}`} title="Edit Advertisement" className={styles.editBtn}>✏️</Link>
                        <button onClick={() => handleDeleteClick(ad)} className={styles.delBtn}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageAdvertisementsPage;