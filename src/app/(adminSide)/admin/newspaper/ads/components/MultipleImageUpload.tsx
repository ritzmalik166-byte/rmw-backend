"use client";

import React, { useRef, useState } from "react";
import styles from "./MultipleImageUpload.module.css";

interface MultipleImageUploadProps {
  label: string;
  onChange: (files: File[]) => void;
  required?: boolean;
  error?: string;
  accept?: string;
  maxFiles?: number;
}

export const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  label,
  onChange,
  required = false,
  error,
  accept = "image/*",
  maxFiles = 10,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length + files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} images`);
      return;
    }

    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);

    // Generate previews
    const newPreviews: string[] = [];
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === selectedFiles.length) {
          setPreviews([...previews, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    onChange(newFiles);
  };

  const handleRemove = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setFiles(newFiles);
    setPreviews(newPreviews);
    onChange(newFiles);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      <div className={styles.uploadContainer}>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          required={required && files.length === 0}
          accept={accept}
          multiple
          className={styles.fileInput}
        />

        <div
          className={`${styles.uploadArea} ${error ? styles.uploadAreaError : ""}`}
          onClick={handleClick}
        >
          <div className={styles.uploadIcon}>📁</div>
          <p className={styles.uploadText}>Click to upload images</p>
          <p className={styles.uploadSubtext}>
            PNG, JPG, JPEG (max. 5MB each, up to {maxFiles} images)
          </p>
          <p className={styles.uploadCount}>
            {files.length} / {maxFiles} images selected
          </p>
        </div>

        {previews.length > 0 && (
          <div className={styles.previewGrid}>
            {previews.map((preview, index) => (
              <div key={index} className={styles.previewItem}>
                <img src={preview} alt={`Preview ${index + 1}`} className={styles.previewImage} />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className={styles.removeButton}
                  title="Remove image"
                >
                  ✕
                </button>
                <div className={styles.fileName}>{files[index]?.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};


