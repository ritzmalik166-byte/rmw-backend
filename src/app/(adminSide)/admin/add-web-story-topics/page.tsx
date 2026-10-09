"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Editor from "@/components/Editor/Editor";
import axios from "axios";
import RMWPopup from "@/components/rmw_popup/RMWPopup";
import RMWLoader from "@/components/rmw_loader/RMWLoader";

const Page = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [rmwLoader, setRMWLoader] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ message: "", status: 0 });
  const [description, setDescription] = useState<string>("");
  const [formValues, setFormValues] = useState({
    topicTitle: "",
    metaKeyWords: "",
    metaDescription: "",
    isActive: "true",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    setRMWLoader(true);
    formData.append("topicTitle", formValues.topicTitle);
    formData.append("description", description);
    formData.append("metaKeyWords", formValues.metaKeyWords);
    formData.append("metaDescription", formValues.metaDescription);
    formData.append("isActive", formValues.isActive);
    if (selectedImage) {
      formData.append("topicImg", selectedImage);
    }
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("rm_token")
          : null;
      const { status, data } = await axios.post(
        "/api/ritz_webStoryTopics/add-story-topic",
        formData,
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      setPopupData({ message: data.message, status });
      setShowPopup(true);
      if (status === 201) {
        setFormValues({
          topicTitle: "",
          metaKeyWords: "",
          metaDescription: "",
          isActive: "true",
        });
        setDescription("");
        setImagePreview(null);
      }
      setRMWLoader(false);
    } catch (error) {
      setRMWLoader(false);
      if (typeof error === "object" && error !== null && "message" in error) {
        setPopupData({
          message: (error as { message: string }).message,
          status:
            error instanceof Error && "status" in error
              ? (error as { status?: number }).status ?? 500
              : 500,
        });
      } else {
        setPopupData({ message: "An unknown error occurred.", status: 500 });
      }
      setShowPopup(true);
    }
  };

  return (
    <section className={styles.container}>
      {showPopup && (
        <RMWPopup
          message={popupData.message}
          status={popupData.status}
          onClose={() => setShowPopup(false)}
        />
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.heading}>Create New Story Topic</h1>

        <input
          type="text"
          name="topicTitle"
          className={styles.input}
          placeholder="Topic Title"
          required
          value={formValues.topicTitle}
          onChange={handleInputChange}
        />

        <Editor value={description} onChange={setDescription} />

        <input
          type="text"
          name="metaKeyWords"
          className={styles.input}
          placeholder="Meta Keywords"
          required
          value={formValues.metaKeyWords}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="metaDescription"
          className={styles.input}
          placeholder="Meta Description"
          required
          value={formValues.metaDescription}
          onChange={handleInputChange}
        />

        <select
          name="isActive"
          className={styles.select}
          value={formValues.isActive}
          onChange={handleInputChange}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <label className={styles.imageLabel}>
          Upload Topic Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
        </label>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className={styles.previewImage}
          />
        )}

        <button type="submit" className={styles.button}>
          {rmwLoader ? <RMWLoader /> : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default Page;
