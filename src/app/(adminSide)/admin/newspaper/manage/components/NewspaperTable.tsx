"use client";

import React from "react";
import styles from "./NewspaperTable.module.css";
import Link from "next/link";
import { INewspaper } from "@/types/newspaper";

interface NewspaperWithId extends INewspaper {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface NewspaperTableProps {
  newspapers: NewspaperWithId[];
  onDelete: (newspaper: NewspaperWithId) => void;
}

export const NewspaperTable: React.FC<NewspaperTableProps> = ({
  newspapers,
  onDelete,
}) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };
  // const staticAPI = process.env.NEXT_PUBLIC_SERVER_IMG_PATH
  // ? `${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images`
  // : `/api/images`;

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Logo</th>
              <th className={styles.th}>Paper Name</th>
              <th className={styles.th}>Language</th>
              <th className={styles.th}>Location</th>
              <th className={styles.th}>Price</th>
              <th className={styles.th}>Frequency</th>
              <th className={styles.th}>Position</th>
              <th className={styles.th}>Created</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {newspapers.map((newspaper) => (
              <tr key={newspaper._id} className={styles.tr}>
                <td className={styles.td}>
                  <div className={styles.logoContainer}>
                    {newspaper.logoImg ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images${newspaper.logoImg.split("/images")[1]}`}
                        alt={newspaper.paperName}
                        className={styles.logo}
                      />
                    ) : (
                      <div className={styles.logoPlaceholder}>📰</div>
                    )}
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.paperInfo}>
                    <div className={styles.paperName}>{newspaper.paperName}</div>
                    <div className={styles.category}>{newspaper.category}</div>
                  </div>
                </td>
                <td className={styles.td}>
                  <span className={styles.badge}>{newspaper.language}</span>
                </td>
                <td className={styles.td}>
                  <div className={styles.location}>
                    <div>{newspaper.location.city}</div>
                    <div className={styles.locationSub}>
                      {newspaper.location.state}
                    </div>
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.priceInfo}>
                    <div className={styles.price}>
                      {formatPrice(newspaper.price)}
                    </div>
                    <div className={styles.spendType}>{newspaper.spendType}</div>
                  </div>
                </td>
                <td className={styles.td}>
                  <span className={styles.badge}>{newspaper.frequency}</span>
                </td>
                <td className={styles.td}>
                  <span
                    className={`${styles.positionBadge} ${
                      newspaper.position === "Main"
                        ? styles.positionMain
                        : styles.positionSupplement
                    }`}
                  >
                    {newspaper.position}
                  </span>
                </td>
                <td className={styles.td}>
                  {formatDate(newspaper.createdAt)}
                </td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <Link
                      href={`/admin/newspaper/edit?id=${newspaper.slug}`}
                      className={styles.editBtn}
                      title="Edit"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => onDelete(newspaper)}
                      className={styles.deleteBtn}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


