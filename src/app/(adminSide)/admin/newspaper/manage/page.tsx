"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { INewspaper, FrequencyEnum, PositionEnum } from "@/types/newspaper";
import { Loader } from "../components/Loader";
import { Popup, PopupType } from "../components/Popup";
import { FilterPanel } from "./components/FilterPanel";
import { NewspaperTable } from "./components/NewspaperTable";
import { DeleteModal } from "./components/DeleteModal";
import { Pagination } from "./components/Pagination";
import Link from "next/link";

interface NewspaperWithId extends INewspaper {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface PopupState {
  show: boolean;
  type: PopupType;
  message: string;
}

interface FilterData {
  language?: string;
  category?: string;
  frequency?: FrequencyEnum;
  position?: PositionEnum;
  "location.city"?: string;
  "location.state"?: string;
  "location.country"?: string;
}

const ITEMS_PER_PAGE = 10;

const ManageNewspapersPage: React.FC = () => {
  const [newspapers, setNewspapers] = useState<NewspaperWithId[]>([]);
  const [filteredNewspapers, setFilteredNewspapers] = useState<NewspaperWithId[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [popup, setPopup] = useState<PopupState>({
    show: false,
    type: "info",
    message: "",
  });
  
  const [filterData, setFilterData] = useState<FilterData>({});
  const [sorting, setSorting] = useState<"asc" | "desc" | "">("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const [deleteModal, setDeleteModal] = useState<{
    show: boolean;
    newspaper: NewspaperWithId | null;
  }>({
    show: false,
    newspaper: null,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch newspapers
  const fetchNewspapers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/newspaper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filterData,
          sorting,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setNewspapers(result.data);
        setFilteredNewspapers(result.data);
      } else {
        setPopup({
          show: true,
          type: "error",
          message: result.message || "Failed to fetch newspapers",
        });
      }
    } catch (error) {
      console.error("Error fetching newspapers:", error);
      setPopup({
        show: true,
        type: "error",
        message: "An error occurred while fetching newspapers",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewspapers();
  }, [filterData, sorting]);

  // Search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredNewspapers(newspapers);
    } else {
      const filtered = newspapers.filter((newspaper) => {
        const search = searchTerm.toLowerCase();
        return (
          newspaper.paperName.toLowerCase().includes(search) ||
          newspaper.language.toLowerCase().includes(search) ||
          newspaper.category.toLowerCase().includes(search) ||
          newspaper.location.city.toLowerCase().includes(search) ||
          newspaper.location.state.toLowerCase().includes(search)
        );
      });
      setFilteredNewspapers(filtered);
    }
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, newspapers]);

  // Pagination
  const totalPages = Math.ceil(filteredNewspapers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentNewspapers = filteredNewspapers.slice(startIndex, endIndex);

  // Handle delete
  const handleDeleteClick = (newspaper: NewspaperWithId) => {
    setDeleteModal({
      show: true,
      newspaper,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.newspaper) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/newspaper/${deleteModal.newspaper._id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setPopup({
          show: true,
          type: "success",
          message: result.message || "Newspaper deleted successfully",
        });
        setDeleteModal({ show: false, newspaper: null });
        fetchNewspapers(); // Refresh the list
      } else {
        setPopup({
          show: true,
          type: "error",
          message: result.message || "Failed to delete newspaper",
        });
      }
    } catch (error) {
      console.error("Error deleting newspaper:", error);
      setPopup({
        show: true,
        type: "error",
        message: "An error occurred while deleting the newspaper",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, newspaper: null });
  };

  const closePopup = () => {
    setPopup((prev) => ({ ...prev, show: false }));
  };

  const handleApplyFilters = (filters: FilterData) => {
    setFilterData(filters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilterData({});
    setSorting("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleSortChange = (newSorting: "asc" | "desc" | "") => {
    setSorting(newSorting);
  };

  return (
    <div className={styles.container}>
      {isLoading && <Loader text="Loading newspapers..." />}
      {popup.show && (
        <Popup type={popup.type} message={popup.message} onClose={closePopup} />
      )}
      {deleteModal.show && deleteModal.newspaper && (
        <DeleteModal
          newspaperName={deleteModal.newspaper.paperName}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Manage Newspapers</h1>
          <p className={styles.subtitle}>
            View, edit, and manage all newspaper listings
          </p>
        </div>
        <div className={styles.headerRight}>
          <Link href="/admin/newspaper" title="Add New Newspaper" className={styles.addButton}>
            + Add New Newspaper
          </Link>
        </div>
      </div>

      <FilterPanel
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sorting={sorting}
        onSortChange={handleSortChange}
        filterData={filterData}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />

      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Total Newspapers:</span>
          <span className={styles.statValue}>{newspapers.length}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Showing:</span>
          <span className={styles.statValue}>{filteredNewspapers.length}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Current Page:</span>
          <span className={styles.statValue}>
            {currentPage} of {totalPages || 1}
          </span>
        </div>
      </div>

      {filteredNewspapers.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📰</div>
          <h3 className={styles.emptyTitle}>No newspapers found</h3>
          <p className={styles.emptyText}>
            {searchTerm || Object.keys(filterData).length > 0
              ? "Try adjusting your filters or search term"
              : "Start by adding your first newspaper"}
          </p>
          {(searchTerm || Object.keys(filterData).length > 0) && (
            <button onClick={handleClearFilters} className={styles.clearButton}>
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <>
          <NewspaperTable
            newspapers={currentNewspapers}
            onDelete={handleDeleteClick}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ManageNewspapersPage;