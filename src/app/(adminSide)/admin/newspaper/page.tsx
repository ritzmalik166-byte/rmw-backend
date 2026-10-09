"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import {
  FrequencyEnum,
  PositionEnum,
  LocationType,
} from "@/types/newspaper";
import { FormInput } from "./components/FormInput";
import { FileUpload } from "./components/FileUpload";
import { Loader } from "./components";
import { Popup, PopupType } from "./components/Popup";

interface FormData {
  paperName: string;
  language: string;
  price: string;
  spendType: string;
  location: LocationType;
  areaCovered: string;
  category: string;
  publications: string;
  frequency: FrequencyEnum;
  position: PositionEnum;
  circulation: string;
  readership: string;
  title: string;
  desc: string;
  metaTitle: string;
  metaDesc: string;
  logoImg: File | null;
}

interface ValidationErrors {
  [key: string]: string;
}

interface PopupState {
  show: boolean;
  type: PopupType;
  message: string;
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

const NewspaperUploadPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    paperName: "",
    language: "",
    price: "",
    spendType: "",
    location: {
      city: "",
      area: "",
      state: "",
      country: "",
    },
    areaCovered: "",
    category: "",
    publications: "",
    frequency: "Daily",
    position: "Main",
    circulation: "",
    readership: "",
    title: "",
    desc: "",
    metaTitle: "",
    metaDesc: "",
    logoImg: null,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [popup, setPopup] = useState<PopupState>({
    show: false,
    type: "info",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Handle nested location fields
    if (name.startsWith("location.")) {
      const locationField = name.split(".")[1] as keyof LocationType;
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      logoImg: file,
    }));

    if (errors.logoImg) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.logoImg;
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Required text fields
    const requiredFields: Array<keyof FormData> = [
      "paperName",
      "language",
      "price",
      "spendType",
      "areaCovered",
      "category",
      "publications",
      "circulation",
      "readership",
      "title",
      "desc",
      "metaTitle",
      "metaDesc",
    ];

    requiredFields.forEach((field) => {
      const value = formData[field];
      if (!value || (typeof value === "string" && value.trim() === "")) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1").trim()} is required`;
      }
    });

    // Validate price
    if (formData.price && isNaN(Number(formData.price))) {
      newErrors.price = "Price must be a valid number";
    } else if (formData.price && Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    // Validate location fields
    if (!formData.location.city.trim()) {
      newErrors["location.city"] = "City is required";
    }
    if (!formData.location.area.trim()) {
      newErrors["location.area"] = "Area is required";
    }
    if (!formData.location.state.trim()) {
      newErrors["location.state"] = "State is required";
    }
    if (!formData.location.country.trim()) {
      newErrors["location.country"] = "Country is required";
    }

    // Validate file
    if (!formData.logoImg) {
      newErrors.logoImg = "Logo image is required";
    } else {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(formData.logoImg.type)) {
        newErrors.logoImg = "Only JPG, JPEG, and PNG files are allowed";
      }
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (formData.logoImg.size > maxSize) {
        newErrors.logoImg = "File size must be less than 5MB";
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
      formDataToSend.append("paperName", formData.paperName.trim());
      formDataToSend.append("language", formData.language.trim());
      formDataToSend.append("price", formData.price.trim());
      formDataToSend.append("spendType", formData.spendType.trim());
      formDataToSend.append("areaCovered", formData.areaCovered.trim());
      formDataToSend.append("category", formData.category.trim());
      formDataToSend.append("publications", formData.publications.trim());
      formDataToSend.append("frequency", formData.frequency);
      formDataToSend.append("position", formData.position);
      formDataToSend.append("circulation", formData.circulation.trim());
      formDataToSend.append("readership", formData.readership.trim());
      formDataToSend.append("title", formData.title.trim());
      formDataToSend.append("desc", formData.desc.trim());
      formDataToSend.append("metaTitle", formData.metaTitle.trim());
      formDataToSend.append("metaDesc", formData.metaDesc.trim());

      // Append location as JSON string
      formDataToSend.append("location", JSON.stringify(formData.location));

      // Append file
      if (formData.logoImg) {
        formDataToSend.append("logoImg", formData.logoImg);
      }

      const response = await fetch("/api/newspaper/upload", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setPopup({
          show: true,
          type: "success",
          message: result.message || "Newspaper uploaded successfully!",
        });

        // Reset form after successful submission
        setTimeout(() => {
          resetForm();
        }, 2000);
      } else {
        setPopup({
          show: true,
          type: "error",
          message: result.message || "Failed to upload newspaper. Please try again.",
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
      paperName: "",
      language: "",
      price: "",
      spendType: "",
      location: {
        city: "",
        area: "",
        state: "",
        country: "",
      },
      areaCovered: "",
      category: "",
      publications: "",
      frequency: "Daily",
      position: "Main",
      circulation: "",
      readership: "",
      title: "",
      desc: "",
      metaTitle: "",
      metaDesc: "",
      logoImg: null,
    });
    setErrors({});
  };

  const closePopup = () => {
    setPopup((prev) => ({ ...prev, show: false }));
  };

  return (
    <div className={styles.container}>
      {isLoading && <Loader text="Uploading newspaper..." overlay />}
      {popup.show && (
        <Popup type={popup.type} message={popup.message} onClose={closePopup} />
      )}

      <div className={styles.header}>
        <h1 className={styles.title}>Upload New Newspaper</h1>
        <p className={styles.subtitle}>
          Fill in the details below to add a new newspaper to the system
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Basic Information Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Basic Information</h2>

          <div className={styles.row}>
            <FormInput
              label="Paper Name"
              name="paperName"
              value={formData.paperName}
              onChange={handleInputChange}
              required
              error={errors.paperName}
              placeholder="Enter newspaper name"
            />

            <FormInput
              label="Language"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              required
              error={errors.language}
              placeholder="Enter language"
            />
          </div>

          <div className={styles.row}>
            <FormInput
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              error={errors.category}
              placeholder="Enter category"
            />

            <FormInput
              label="Publications"
              name="publications"
              value={formData.publications}
              onChange={handleInputChange}
              required
              error={errors.publications}
              placeholder="Enter publications"
            />
          </div>

          <FileUpload
            label="Logo Image"
            name="logoImg"
            onChange={handleFileChange}
            required
            error={errors.logoImg}
            accept="image/jpeg,image/jpg,image/png"
          />
        </div>

        {/* Pricing Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Pricing Information</h2>

          <div className={styles.row}>
            <FormInput
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              required
              error={errors.price}
              placeholder="Enter price"
              min={0}
              step="0.01"
            />

            <FormInput
              label="Spend Type"
              name="spendType"
              value={formData.spendType}
              onChange={handleInputChange}
              required
              error={errors.spendType}
              placeholder="e.g., Per Column Cm"
            />
          </div>
        </div>

        {/* Location Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Location Details</h2>

          <div className={styles.row}>
            <FormInput
              label="City"
              name="location.city"
              value={formData.location.city}
              onChange={handleInputChange}
              required
              error={errors["location.city"]}
              placeholder="Enter city"
            />

            <FormInput
              label="Area"
              name="location.area"
              value={formData.location.area}
              onChange={handleInputChange}
              required
              error={errors["location.area"]}
              placeholder="Enter area"
            />
          </div>

          <div className={styles.row}>
            <FormInput
              label="State"
              name="location.state"
              value={formData.location.state}
              onChange={handleInputChange}
              required
              error={errors["location.state"]}
              placeholder="Enter state"
            />

            <FormInput
              label="Country"
              name="location.country"
              value={formData.location.country}
              onChange={handleInputChange}
              required
              error={errors["location.country"]}
              placeholder="Enter country"
            />
          </div>

          <FormInput
            label="Area Covered"
            name="areaCovered"
            value={formData.areaCovered}
            onChange={handleInputChange}
            required
            error={errors.areaCovered}
            placeholder="Enter area covered"
          />
        </div>

        {/* Publication Details Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Publication Details</h2>

          <div className={styles.row}>
            <FormInput
              label="Frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleInputChange}
              required
              error={errors.frequency}
              options={frequencyOptions}
            />

            <FormInput
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              required
              error={errors.position}
              options={positionOptions}
            />
          </div>

          <div className={styles.row}>
            <FormInput
              label="Circulation"
              name="circulation"
              value={formData.circulation}
              onChange={handleInputChange}
              required
              error={errors.circulation}
              placeholder="Enter circulation"
            />

            <FormInput
              label="Readership"
              name="readership"
              value={formData.readership}
              onChange={handleInputChange}
              required
              error={errors.readership}
              placeholder="Enter readership"
            />
          </div>
        </div>

        {/* SEO Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>SEO & Description</h2>

          <FormInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            error={errors.title}
            placeholder="Enter title"
          />

          <FormInput
            label="Description"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            required
            error={errors.desc}
            placeholder="Enter description"
            textarea
            rows={4}
          />

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
            Upload Newspaper
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewspaperUploadPage;
