"use client";

import React from "react";
import styles from "./Loader.module.css";

export interface LoaderProps {
  size?: "small" | "medium" | "large";
  text?: string;
  variant?: "spinner" | "dots";
  overlay?: boolean;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  text,
  variant = "spinner",
  overlay = false,
  className = "",
}) => {
  const getSpinnerClass = () => {
    switch (size) {
      case "small":
        return styles.spinnerSmall;
      case "large":
        return styles.spinnerLarge;
      default:
        return styles.spinner;
    }
  };

  const getTextClass = () => {
    switch (size) {
      case "small":
        return styles.textSmall;
      case "large":
        return styles.textLarge;
      default:
        return styles.text;
    }
  };

  const renderSpinner = () => (
    <div className={`${styles.loader} ${className}`}>
      <div className={getSpinnerClass()}></div>
      {text && <span className={getTextClass()}>{text}</span>}
    </div>
  );

  const renderDots = () => (
    <div className={`${styles.loader} ${className}`}>
      <div className={styles.dots}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
      {text && <span className={getTextClass()}>{text}</span>}
    </div>
  );

  const content = variant === "dots" ? renderDots() : renderSpinner();

  if (overlay) {
    return (
      <div className={styles.overlay}>
        <div className={styles.overlayContent}>
          {variant === "dots" ? (
            <div className={styles.dots}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
          ) : (
            <div className={getSpinnerClass()}></div>
          )}
          {text && <span className={getTextClass()}>{text}</span>}
        </div>
      </div>
    );
  }

  return content;
};
