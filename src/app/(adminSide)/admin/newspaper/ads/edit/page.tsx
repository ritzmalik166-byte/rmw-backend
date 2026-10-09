"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { CategoryEnum } from "@/types/advertisement";
import { FormInput } from "../../components";
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
  existingImgs: string[];
  newImages: File[];
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

function EditAdvertisementContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const adId = searchParams.get("id");

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
    existingImgs: [],
    newImages: [],
  });

  const [newspapers, setNewspapers] = useState<NewspaperOption[]>([]);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [popup, setPopup] = useState<PopupState>({
    show: false,
    type: "info",
    message: "",
  });

  // Fetch newspapers and advertisement data
  useEffect(() => {
    if (!adId) {
      setPopup({
        show: true,
        type: "error",
        message: "No advertisement ID provided",
      });
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch newspapers
        const newspapersRes = await fetch("/api/newspaper", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filterData: {}, sorting: "" }),
        });

        const newspapersResult = await newspapersRes.json();
        if (newspapersRes.ok && newspapersResult.success) {
          setNewspapers(newspapersResult.data);
        }

        // Fetch advertisement
        const adRes = await fetch(`/api/newspaper/ads/${adId}`);
        const adResult = await adRes.json();

        if (adRes.ok && adResult.success) {
          const ad = adResult.singleAds;
          if (ad) {
            setFormData({
              adtype: ad.adtype || "",
              adDesc: ad.adDesc || "",
              baseRate: ad.baseRate?.toString() || "",
              quantity: ad.quantity || "",
              adLabel: ad.adLabel || "",
              adTiming: ad.adTiming || "",
              details: ad.details || "",
              category: ad.category || "Top Choice",
              parentID: ad.parentID?._id || ad.parentID || "",
              metaTitle: ad.metaTitle || "",
              metaDesc: ad.metaDesc || "",
              existingImgs: ad.imgs || [],
              newImages: [],
            });
          } else {
            setPopup({
              show: true,
              type: "error",
              message: "Advertisement data not found",
            });
          }
        } else {
          setPopup({
            show: true,
            type: "error",
            message:
              adResult.message || "Failed to fetch advertisement details",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setPopup({
          show: true,
          type: "error",
          message: "An error occurred while fetching data",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [adId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNewImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      newImages: files,
    }));
  };

  const handleRemoveExistingImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      existingImgs: prev.existingImgs.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveNewImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      newImages: prev.newImages.filter((_, i) => i !== index),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

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
        newErrors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .trim()} is required`;
      }
    });

    if (formData.baseRate && isNaN(Number(formData.baseRate))) {
      newErrors.baseRate = "Base rate must be a valid number";
    } else if (formData.baseRate && Number(formData.baseRate) <= 0) {
      newErrors.baseRate = "Base rate must be greater than 0";
    }

    if (formData.existingImgs.length === 0 && formData.newImages.length === 0) {
      newErrors.imgs = "At least one image is required";
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

    if (!adId) {
      setPopup({
        show: true,
        type: "error",
        message: "No advertisement ID provided",
      });
      return;
    }

    setIsSaving(true);

    try {
      const formDataToSend = new FormData();

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

      // Send existing images as JSON string
      formDataToSend.append(
        "existingImgs",
        JSON.stringify(formData.existingImgs)
      );

      // Append new images
      formData.newImages.forEach((img) => {
        formDataToSend.append("imgs", img);
      });

      const response = await fetch(`/api/newspaper/ads/${adId}`, {
        method: "PATCH",
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setPopup({
          show: true,
          type: "success",
          message: result.message || "Advertisement updated successfully!",
        });

        setTimeout(() => {
          router.push("/admin/newspaper/ads/manage");
        }, 2000);
      } else {
        setPopup({
          show: true,
          type: "error",
          message:
            result.message ||
            "Failed to update advertisement. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error updating advertisement:", error);
      setPopup({
        show: true,
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const closePopup = () => {
    setPopup((prev) => ({ ...prev, show: false }));
  };

  if (isLoading) {
    return <Loader text="Loading advertisement details..." />;
  }

  if (!adId) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Invalid Request</h2>
          <p className={styles.errorMessage}>No advertisement ID provided</p>
          <Link title="Back to Manage"
            href="/admin/newspaper/ads/manage"
            className={styles.backButton}
          >
            Back to Manage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {isSaving && <Loader text="Updating advertisement..." />}
      {popup.show && (
        <Popup type={popup.type} message={popup.message} onClose={closePopup} />
      )}

      <div className={styles.header}>
        <div className={styles.headerTop}>
          <Link href="/admin/newspaper/ads/manage" title="Back to Manage" className={styles.backLink}>
            ← Back to Manage
          </Link>
        </div>
        <h1 className={styles.title}>Edit Advertisement</h1>
        <p className={styles.subtitle}>
          Update the advertisement details below
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Basic Information Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Basic Information</h2>

          <div className={styles.formGroup}>
            <label htmlFor="parentID" className={styles.customLabel}>
              Select Newspaper
              <span className={styles.required}>*</span>
            </label>
            <select
              id="parentID"
              name="parentID"
              value={formData.parentID}
              onChange={handleInputChange}
              required
              className={`${styles.select} ${
                errors.parentID ? styles.selectError : ""
              }`}
            >
              <option value="">Select Newspaper</option>
              {newspapers.map((np) => (
                <option key={np._id} value={np._id}>
                  {np.paperName} ({np.language})
                </option>
              ))}
            </select>
            {errors.parentID && (
              <span className={styles.errorText}>{errors.parentID}</span>
            )}
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

          {/* Existing Images */}
          {formData.existingImgs.length > 0 && (
            <div className={styles.imageSection}>
              <h3 className={styles.subTitle}>Existing Images</h3>
              <div className={styles.imageGrid}>
                {formData.existingImgs.map((img, index) => (
                  <div key={index} className={styles.imageItem}>
                    <img
                      src={`${
                        process.env.NEXT_PUBLIC_SERVER_IMG_PATH
                      }/api/images${img.split("/images")[1]}`}
                      alt={`Existing ${index + 1}`}
                      className={styles.image}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(index)}
                      className={styles.removeBtn}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Images */}
          <div className={styles.imageSection}>
            <h3 className={styles.subTitle}>Add New Images (Optional)</h3>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleNewImagesChange}
              className={styles.fileInput}
            />
            {formData.newImages.length > 0 && (
              <div className={styles.imageGrid}>
                {Array.from(formData.newImages).map((file, index) => (
                  <div key={index} className={styles.imageItem}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`New ${index + 1}`}
                      className={styles.image}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(index)}
                      className={styles.removeBtn}
                    >
                      ✕
                    </button>
                    <div className={styles.fileName}>{file.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {errors.imgs && (
            <span className={styles.errorText}>{errors.imgs}</span>
          )}
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
          <Link title="Back to Manage"
            href="/admin/newspaper/ads/manage"
            className={styles.cancelButton}
          >
            Cancel
          </Link>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSaving}
          >
            Update Advertisement
          </button>
        </div>
      </form>
    </div>
  );
}

export default function EditAdvertisementPage() {
  return (
    <Suspense fallback={<Loader text="Loading..." />}>
      <EditAdvertisementContent />
    </Suspense>
  );
}
