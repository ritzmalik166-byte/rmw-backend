"use client";

import React, { useRef, useState } from "react";
import styles from "./FileUpload.module.css";

interface FileUploadProps {
  label: string;
  name: string;
  onChange: (file: File | null) => void;
  required?: boolean;
  error?: string;
  accept?: string;
  preview?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  onChange,
  required = false,
  error,
  accept = "image/*",
  preview,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>(preview || "");
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    } else {
      setFileName("");
      setPreviewUrl("");
      onChange(null);
    }
  };

  const handleRemove = () => {
    setFileName("");
    setPreviewUrl("");
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      <div className={styles.uploadContainer}>
        <input
          ref={fileInputRef}
          type="file"
          id={name}
          name={name}
          onChange={handleFileChange}
          required={required}
          accept={accept}
          className={styles.fileInput}
        />

        {!previewUrl ? (
          <div
            className={`${styles.uploadArea} ${error ? styles.uploadAreaError : ""}`}
            onClick={handleClick}
          >
            <div className={styles.uploadIcon}>📁</div>
            <p className={styles.uploadText}>Click to upload or drag and drop</p>
            <p className={styles.uploadSubtext}>PNG, JPG, JPEG (max. 5MB)</p>
          </div>
        ) : (
          <div className={styles.previewContainer}>
            <img src={previewUrl} alt="Preview" className={styles.previewImage} />
            <div className={styles.fileInfo}>
              <p className={styles.fileName}>{fileName}</p>
              <button
                type="button"
                onClick={handleRemove}
                className={styles.removeButton}
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};


