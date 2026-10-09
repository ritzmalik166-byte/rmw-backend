"use client";

import React, { useState } from "react";
import styles from "./FilterPanel.module.css";
import { FrequencyEnum, PositionEnum } from "@/types/newspaper";

interface FilterData {
  language?: string;
  category?: string;
  frequency?: FrequencyEnum;
  position?: PositionEnum;
  "location.city"?: string;
  "location.state"?: string;
  "location.country"?: string;
}

interface FilterPanelProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sorting: "asc" | "desc" | "";
  onSortChange: (sorting: "asc" | "desc" | "") => void;
  filterData: FilterData;
  onApplyFilters: (filters: FilterData) => void;
  onClearFilters: () => void;
}

const frequencyOptions: FrequencyEnum[] = [
  "Daily",
  "Weekly",
  "Monday - Friday",
  "Fortnightly",
  "Bi-Weekly",
  "Monthly",
];

const positionOptions: PositionEnum[] = ["Main", "Supplement"];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  searchTerm,
  onSearchChange,
  sorting,
  onSortChange,
  filterData,
  onApplyFilters,
  onClearFilters,
}) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [localFilters, setLocalFilters] = useState<FilterData>(filterData);

  const handleFilterChange = (key: keyof FilterData, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const handleApply = () => {
    // Remove empty values
    const cleanedFilters: FilterData = {};
    Object.entries(localFilters).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        cleanedFilters[key as keyof FilterData] = value as never;
      }
    });
    onApplyFilters(cleanedFilters);
    setShowFilters(false);
  };

  const handleClear = () => {
    setLocalFilters({});
    onClearFilters();
    setShowFilters(false);
  };

  const activeFilterCount = Object.values(filterData).filter(
    (v) => v && v !== ""
  ).length;

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search newspapers..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>

        <div className={styles.actions}>
          <select
            value={sorting}
            onChange={(e) =>
              onSortChange(e.target.value as "asc" | "desc" | "")
            }
            className={styles.sortSelect}
          >
            <option value="">Sort by Price</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`${styles.filterButton} ${
              activeFilterCount > 0 ? styles.filterButtonActive : ""
            }`}
          >
            🔧 Filters
            {activeFilterCount > 0 && (
              <span className={styles.filterBadge}>{activeFilterCount}</span>
            )}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className={styles.filterPanel}>
          <div className={styles.filterGrid}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Language</label>
              <input
                type="text"
                placeholder="e.g., English, Hindi"
                value={localFilters.language || ""}
                onChange={(e) => handleFilterChange("language", e.target.value)}
                className={styles.filterInput}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Category</label>
              <input
                type="text"
                placeholder="e.g., National, Regional"
                value={localFilters.category || ""}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className={styles.filterInput}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Frequency</label>
              <select
                value={localFilters.frequency || ""}
                onChange={(e) =>
                  handleFilterChange("frequency", e.target.value)
                }
                className={styles.filterInput}
              >
                <option value="">All Frequencies</option>
                {frequencyOptions.map((freq) => (
                  <option key={freq} value={freq}>
                    {freq}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Position</label>
              <select
                value={localFilters.position || ""}
                onChange={(e) => handleFilterChange("position", e.target.value)}
                className={styles.filterInput}
              >
                <option value="">All Positions</option>
                {positionOptions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>City</label>
              <input
                type="text"
                placeholder="e.g., Mumbai, Delhi"
                value={localFilters["location.city"] || ""}
                onChange={(e) =>
                  handleFilterChange("location.city", e.target.value)
                }
                className={styles.filterInput}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>State</label>
              <input
                type="text"
                placeholder="e.g., Maharashtra"
                value={localFilters["location.state"] || ""}
                onChange={(e) =>
                  handleFilterChange("location.state", e.target.value)
                }
                className={styles.filterInput}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Country</label>
              <input
                type="text"
                placeholder="e.g., India"
                value={localFilters["location.country"] || ""}
                onChange={(e) =>
                  handleFilterChange("location.country", e.target.value)
                }
                className={styles.filterInput}
              />
            </div>
          </div>

          <div className={styles.filterActions}>
            <button onClick={handleClear} className={styles.clearBtn}>
              Clear All
            </button>
            <button onClick={handleApply} className={styles.applyBtn}>
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


