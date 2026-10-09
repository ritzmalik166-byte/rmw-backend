"use client";
import React from "react";
import styles from "./page.module.css";
import { AlertTriangle } from "lucide-react";

interface DeleteWarningModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteWarningModal: React.FC<DeleteWarningModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <AlertTriangle size={40} color="#ff4d4f" />
        <h3>Warning</h3>
        <p>Are you sure you want to delete this data? This action cannot be undone.</p>
        <div className={styles.modalActions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.deleteBtn} onClick={onConfirm}>
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWarningModal;