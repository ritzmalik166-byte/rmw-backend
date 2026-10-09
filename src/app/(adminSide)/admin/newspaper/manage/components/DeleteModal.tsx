"use client";

import React from "react";
import styles from "./DeleteModal.module.css";

interface DeleteModalProps {
  newspaperName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  newspaperName,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.iconContainer}>
          <span className={styles.icon}>⚠️</span>
        </div>

        <h2 className={styles.title}>Delete Newspaper</h2>

        <p className={styles.message}>
          Are you sure you want to delete{" "}
          <strong className={styles.newspaperName}>{newspaperName}</strong>?
        </p>

        <p className={styles.warning}>
          This action cannot be undone. All associated data will be permanently
          deleted.
        </p>

        <div className={styles.actions}>
          <button onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={onConfirm} className={styles.confirmButton}>
            Delete Newspaper
          </button>
        </div>
      </div>
    </div>
  );
};


