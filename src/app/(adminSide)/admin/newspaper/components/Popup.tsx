"use client";

import React from "react";
import styles from "./Popup.module.css";

export type PopupType = "success" | "error" | "warning" | "info";

interface PopupProps {
  type: PopupType;
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export const Popup: React.FC<PopupProps> = ({
  type,
  message,
  onClose,
  autoClose = true,
  autoCloseDelay = 5000,
}) => {
  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
        return "ℹ";
      default:
        return "ℹ";
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={`${styles.popup} ${styles[type]}`}>
        <div className={styles.popupHeader}>
          <div className={styles.iconContainer}>
            <span className={styles.icon}>{getIcon()}</span>
          </div>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close popup"
          >
            ✕
          </button>
        </div>
        <div className={styles.popupBody}>
          <p className={styles.message}>{message}</p>
        </div>
        {autoClose && (
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBar}
              style={{
                animation: `shrink ${autoCloseDelay}ms linear forwards`,
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};


