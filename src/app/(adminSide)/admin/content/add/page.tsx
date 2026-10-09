"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import RMWLoader from "@/components/rmw_loader/RMWLoader";
import RMWPopup from "@/components/rmw_popup/RMWPopup";

interface ParentService {
  id: string;
  title: string;
}

const Page = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [rmwLoader, setRMWLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ message: "", status: 0 });
  const [parentServices, setParentServices] = useState<ParentService[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    service2_id: "",
    image: null as File | null,
  });

  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const objectUrl = URL.createObjectURL(file);
      setPreviewURL(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image || !formData.title || !formData.service2_id) {
      alert("Please fill all required fields.");
      return;
    }
    setRMWLoader(true);
    const fdata = new FormData();
    fdata.append("title", formData.title);
    fdata.append("description", formData.description);
    fdata.append("service2_id", formData.service2_id);
    fdata.append("image_url", formData.image);

    try {
      const { status, data } = await axios.post("/api/your-endpoint", fdata);
      setRMWLoader(false);
      setPopupData({ message: data.message, status });
      setShowPopup(true);
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

  const getAllServiceSecondIDs = async () => {
    try {
      const { data, status } = await axios.get(
        "/api/sql-single-page-card/get-service-scnd-ids"
      );
      setParentServices(data.data[0]);
      setPopupData({ message: data.message, status });
      setShowPopup(true);
    } catch (error) {
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

  useEffect(() => {
    getAllServiceSecondIDs();
    return () => {
      // Clean up object URLs
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, []);

  return (
    <div className={styles.cardContainer}>
      {showPopup && (
        <RMWPopup
          message={popupData.message}
          status={popupData.status}
          onClose={() => setShowPopup(false)}
        />
      )}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className={styles.cardForm}
      >
        <div
          className={styles.imageSection}
          onClick={() => fileRef.current?.click()}
        >
          {previewURL ? (
            <Image
              src={previewURL}
              alt="Preview"
              width={300}
              height={200}
              className={styles.previewImage}
            />
          ) : (
            <div className={styles.imagePlaceholder}>Click to Upload Image</div>
          )}
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileRef}
            onChange={handleImageChange}
          />
        </div>

        <input
          type="text"
          name="title"
          placeholder="Title"
          className={styles.input}
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className={styles.textarea}
          value={formData.description}
          onChange={handleChange}
        />

        {parentServices.length > 0 ? (
          <select
            name="service2_id"
            value={formData.service2_id}
            onChange={handleChange}
            className={styles.input}
            required
          >
            <option value="">Select Parent Service</option>
            {parentServices.map((ser) => (
              <option key={ser.id} value={ser.id}>
                {ser.title}
              </option>
            ))}
          </select>
        ) : (
          <p className={styles.loadingText}>Loading services...</p>
        )}

        <button type="submit" className={styles.submitBtn}>
          {rmwLoader ? <RMWLoader /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Page;
