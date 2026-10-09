"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { CategoryEnum } from "@/types/advertisement";
import { FormInput } from "../../components";
import { MultipleImageUpload } from "../components/MultipleImageUpload";
import { Loader } from "../../components";
import { Popup, PopupType } from "../../components";
import Link from "next/link";

interface FormData {
  adtype: string;
  adDesc: string;
  baseRate: string;
  quantity: string;
  adLabel: string;
  adTiming: string;
  details: string;
  category: CategoryEnum;
  parentID: string;
  metaTitle: string;
  metaDesc: string;
  imgs: File[];
}

interface ValidationErrors {
  [key: string]: string;
}

interface PopupState {
  show: boolean;
  type: PopupType;
  message: string;
}

interface NewspaperOption {
  _id: string;
  paperName: string;
  language: string;
}

const categoryOptions: CategoryEnum[] = ["Top Choice", "Other Ad Options"];

const AddAdvertisementPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    adtype: "",
    adDesc: "",
    baseRate: "",
    quantity: "",
    adLabel: "",
    adTiming: "",
    details: "",
    category: "Top Choice",
    parentID: "",
    metaTitle: "",
    metaDesc: "",
    imgs: [],
  });

  const [newspapers, setNewspapers] = useState<NewspaperOption[]>([]);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingNewspapers, setIsFetchingNewspapers] = useState<boolean>(true);
  const [popup, setPopup] = useState<PopupState>({
    show: false,
    type: "info",
    message: "",
  });

  // Fetch all newspapers for dropdown
  useEffect(() => {
    const fetchNewspapers = async () => {
      try {
        const response = await fetch("/api/newspaper", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filterData: {},
            sorting: "",
          }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setNewspapers(result.data);
        } else {
          setPopup({
            show: true,
            type: "error",
            message: "Failed to load newspapers",
          });
        }
      } catch (error) {
        console.error("Error fetching newspapers:", error);
        setPopup({
          show: true,
          type: "error",
          message: "Error loading newspapers",
        });
      } finally {
        setIsFetchingNewspapers(false);
      }
    };

    fetchNewspapers();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImagesChange = (files: File[]) => {
    setFormData((prev) => ({
      ...prev,
      imgs: files,
    }));

    if (errors.imgs) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.imgs;
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Required text fields
    const requiredFields: Array<keyof FormData> = [
      "adtype",
      "adDesc",
      "baseRate",
      "quantity",
      "adLabel",
      "adTiming",
      "details",
      "parentID",
      "metaTitle",
      "metaDesc",
    ];

    requiredFields.forEach((field) => {
      const value = formData[field];
      if (!value || (typeof value === "string" && value.trim() === "")) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1").trim()} is required`;
      }
    });

    // Validate baseRate
    if (formData.baseRate && isNaN(Number(formData.baseRate))) {
      newErrors.baseRate = "Base rate must be a valid number";
    } else if (formData.baseRate && Number(formData.baseRate) <= 0) {
      newErrors.baseRate = "Base rate must be greater than 0";
    }

    // Validate images
    if (formData.imgs.length === 0) {
      newErrors.imgs = "At least one image is required";
    } else {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      const invalidFiles = formData.imgs.filter(
        (file) => !validTypes.includes(file.type)
      );
      if (invalidFiles.length > 0) {
        newErrors.imgs = "Only JPG, JPEG, and PNG files are allowed";
      }
      const maxSize = 5 * 1024 * 1024; // 5MB
      const oversizedFiles = formData.imgs.filter((file) => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        newErrors.imgs = "Each file must be less than 5MB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setPopup({
        show: true,
        type: "error",
        message: "Please fix all validation errors before submitting",
      });
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append all text fields
      formDataToSend.append("adtype", formData.adtype.trim());
      formDataToSend.append("adDesc", formData.adDesc.trim());
      formDataToSend.append("baseRate", formData.baseRate.trim());
      formDataToSend.append("quantity", formData.quantity.trim());
      formDataToSend.append("adLabel", formData.adLabel.trim());
      formDataToSend.append("adTiming", formData.adTiming.trim());
      formDataToSend.append("details", formData.details.trim());
      formDataToSend.append("category", formData.category);
      formDataToSend.append("parentID", formData.parentID);
      formDataToSend.append("metaTitle", formData.metaTitle.trim());
      formDataToSend.append("metaDesc", formData.metaDesc.trim());

      // Append all images
      formData.imgs.forEach((img) => {
        formDataToSend.append("imgs", img);
      });

      const response = await fetch("/api/newspaper/ads/upload", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setPopup({
          show: true,
          type: "success",
          message: result.message || "Advertisement uploaded successfully!",
        });

        // Reset form after successful submission
        setTimeout(() => {
          resetForm();
        }, 2000);
      } else {
        setPopup({
          show: true,
          type: "error",
          message: result.message || "Failed to upload advertisement. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setPopup({
        show: true,
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      adtype: "",
      adDesc: "",
      baseRate: "",
      quantity: "",
      adLabel: "",
      adTiming: "",
      details: "",
      category: "Top Choice",
      parentID: "",
      metaTitle: "",
      metaDesc: "",
      imgs: [],
    });
    setErrors({});
  };

  const closePopup = () => {
    setPopup((prev) => ({ ...prev, show: false }));
  };

  if (isFetchingNewspapers) {
    return <Loader text="Loading newspapers..." />;
  }

  return (
    <div className={styles.container}>
      {isLoading && <Loader text="Uploading advertisement..." />}
      {popup.show && (
        <Popup type={popup.type} message={popup.message} onClose={closePopup} />
      )}

      <div className={styles.header}>
        <div className={styles.headerTop}>
          <Link href="/admin/newspaper/ads/manage" title="Back to Manage" className={styles.backLink}>
            ← Manage Advertisements
          </Link>
        </div>
        <h1 className={styles.title}>Add New Advertisement</h1>
        <p className={styles.subtitle}>
          Fill in the details below to add a new advertisement
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Basic Information Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Basic Information</h2>

          <div className={styles.formGroup}>
            <label htmlFor="parentID" className={styles.customLabel}>
              Select Newspaper
              {true && <span className={styles.required}>*</span>}
            </label>
            <select
              id="parentID"
              name="parentID"
              value={formData.parentID}
              onChange={handleInputChange}
              required
              className={`${styles.select} ${errors.parentID ? styles.selectError : ""}`}
            >
              <option value="">Select Newspaper</option>
              {newspapers.map((np) => (
                <option key={np._id} value={np._id}>
                  {np.paperName} ({np.language})
                </option>
              ))}
            </select>
            {errors.parentID && <span className={styles.errorText}>{errors.parentID}</span>}
          </div>

          <div className={styles.row}>
            <FormInput
              label="Ad Type"
              name="adtype"
              value={formData.adtype}
              onChange={handleInputChange}
              required
              error={errors.adtype}
              placeholder="e.g., Jacket, Customize, Full Page"
            />

            <FormInput
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              error={errors.category}
              options={categoryOptions}
            />
          </div>

          <FormInput
            label="Ad Description"
            name="adDesc"
            value={formData.adDesc}
            onChange={handleInputChange}
            required
            error={errors.adDesc}
            placeholder="Enter advertisement description"
            textarea
            rows={3}
          />

          <div className={styles.row}>
            <FormInput
              label="Ad Label"
              name="adLabel"
              value={formData.adLabel}
              onChange={handleInputChange}
              required
              error={errors.adLabel}
              placeholder="e.g., Premium, Standard"
            />

            <FormInput
              label="Ad Timing"
              name="adTiming"
              value={formData.adTiming}
              onChange={handleInputChange}
              required
              error={errors.adTiming}
              placeholder="e.g., Daily, Weekend Only"
            />
          </div>
        </div>

        {/* Pricing & Details Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Pricing & Details</h2>

          <div className={styles.row}>
            <FormInput
              label="Base Rate"
              name="baseRate"
              type="number"
              value={formData.baseRate}
              onChange={handleInputChange}
              required
              error={errors.baseRate}
              placeholder="Enter base rate"
              min={0}
              step="0.01"
            />

            <FormInput
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
              error={errors.quantity}
              placeholder="e.g., Per Page, Per Column"
            />
          </div>

          <FormInput
            label="Details"
            name="details"
            value={formData.details}
            onChange={handleInputChange}
            required
            error={errors.details}
            placeholder="Enter detailed information"
            textarea
            rows={4}
          />
        </div>

        {/* Images Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Advertisement Images</h2>

          <MultipleImageUpload
            label="Upload Images"
            onChange={handleImagesChange}
            required
            error={errors.imgs}
            maxFiles={10}
          />
        </div>

        {/* SEO Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>SEO Information</h2>

          <FormInput
            label="Meta Title"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleInputChange}
            required
            error={errors.metaTitle}
            placeholder="Enter meta title"
          />

          <FormInput
            label="Meta Description"
            name="metaDesc"
            value={formData.metaDesc}
            onChange={handleInputChange}
            required
            error={errors.metaDesc}
            placeholder="Enter meta description"
            textarea
            rows={3}
          />
        </div>

        {/* Form Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            onClick={resetForm}
            className={styles.resetButton}
            disabled={isLoading}
          >
            Reset Form
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            Upload Advertisement
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdvertisementPage;

