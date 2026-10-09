"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Editor from "@/components/Editor/Editor";
import axios from "axios";
import RMWPopup from "@/components/rmw_popup/RMWPopup";
import RMWLoader from "@/components/rmw_loader/RMWLoader";

// allTopics
interface ALLTOPICS {
  topicTitle: string;
  _id: string;
}
function Page() {
  const [allTopics, setAllTopics] = useState<ALLTOPICS[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ message: "", status: 0 });
  const [rmwLoader, setRMWLoader] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    titleAlign: "top",
    descriptionAlign: "bottom",
    metaDescription: "",
    metaKeywords: "",
    topicID: "",
  });
  const [btnCTA, setBtnCTA] = useState({
    btnTxt: "",
    btnLink: "",
    btnColor: "#000000",
    btnTxtColor: "#ffffff",
  });
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgFile(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("titleAlign", form.titleAlign);
    formData.append("descAlign", form.descriptionAlign);
    formData.append("metaDescription", form.metaDescription);
    formData.append("metaKeyWords", form.metaKeywords);
    formData.append("topicID", form.topicID);
    setRMWLoader(true);
    // formData.append("buttonCTA[btnTxt]", form.btnTxt);
    // formData.append("buttonCTA[btnLink]", form.btnLink);
    // formData.append("buttonCTA[btnColor]", form.btnColor);
    formData.append("buttonCTA", JSON.stringify(btnCTA));

    if (imgFile) {
      formData.append("img", imgFile);
    }
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("rm_token")
          : null;
      const { status, data } = await axios.post(
        "/api/rizt_webStories/addWebStory",
        formData,
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      if (status === 201) {
        setForm({
          title: "",
          description: "",
          titleAlign: "top",
          descriptionAlign: "bottom",
          metaDescription: "",
          metaKeywords: "",
          topicID: "",
        });
        setBtnCTA({
          btnTxt: "",
          btnLink: "",
          btnColor: "#000000",
          btnTxtColor: "#ffffff",
        });
        setImgPreview(null);
      }
      setPopupData({ message: data.message, status });
      setShowPopup(true);
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

  const getAllWebStoryTopics = async () => {
    try {
      const { data, status } = await axios.get(
        "/api/ritz_webStoryTopics/get-all-topics"
      );
      setAllTopics(data?.allTopics);
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
    getAllWebStoryTopics();
  }, []);
  return (
    <section className={styles.pageContainer}>
      {showPopup && (
        <RMWPopup
          message={popupData.message}
          status={popupData.status}
          onClose={() => setShowPopup(false)}
        />
      )}
      <h1 className={styles.pageTitle}>Create Web Story</h1>

      <div className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            id="title"
            placeholder="Enter story title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label>Title Alignment</label>
          <select
            name="titleAlign"
            value={form.titleAlign}
            onChange={handleChange}
          >
            <option value="top">Top</option>
            <option value="center">Center</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Description</label>
          <Editor
            value={form.description}
            onChange={(val: string) => setForm({ ...form, description: val })}
          />
        </div>

        <div className={styles.field}>
          <label>Description Alignment</label>
          <select
            name="descriptionAlign"
            value={form.descriptionAlign}
            onChange={handleChange}
          >
            <option value="top">Top</option>
            <option value="center">Center</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="btnTxt">Button Text</label>
          <input
            name="btnTxt"
            id="btnTxt"
            placeholder="Read More"
            value={btnCTA.btnTxt}
            onChange={(e) =>
              setBtnCTA((prev) => ({
                ...prev,
                btnTxt: e.target.value,
              }))
            }
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="btnLink">Button Link</label>
          <input
            name="btnLink"
            id="btnLink"
            placeholder="https://example.com/story"
            value={btnCTA.btnLink}
            onChange={(e) => {
              setBtnCTA((prev) => ({
                ...prev,
                btnLink: e.target.value,
              }));
            }}
          />
        </div>

        <div className={styles.colorRow}>
          <div className={styles.colorField}>
            <label>Button Background</label>
            <input
              name="btnColor"
              type="color"
              value={btnCTA.btnColor}
              onChange={(e) => {
                setBtnCTA((prev) => ({
                  ...prev,
                  btnColor: e.target.value,
                }));
              }}
            />
          </div>
          <div className={styles.colorField}>
            <label>Button Text Color</label>
            <input
              name="btnTxtColor"
              type="color"
              value={btnCTA.btnTxtColor}
              onChange={(e) => {
                setBtnCTA((prev) => ({
                  ...prev,
                  btnTxtColor: e.target.value,
                }));
              }}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="metaDescription">Meta Description</label>
          <input
            name="metaDescription"
            id="metaDescription"
            placeholder="Short SEO description"
            value={form.metaDescription}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="metaKeywords">Meta Keywords</label>
          <input
            name="metaKeywords"
            id="metaKeywords"
            placeholder="story, blog, keywords"
            value={form.metaKeywords}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="topicID">Select Topic</label>
          <select name="topicID" id="topicID" onChange={handleChange}>
            {allTopics ? (
              allTopics.map((topic) => {
                return (
                  <option value={topic._id} key={topic._id}>
                    {topic.topicTitle}
                  </option>
                );
              })
            ) : (
              <p>No Topics Available Right Now!</p>
            )}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="img">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imgPreview && (
            <img src={imgPreview} alt="Preview" className={styles.imgPreview} />
          )}
        </div>

        <button className={styles.submitButton} onClick={handleSubmit}>
          {rmwLoader ? <RMWLoader /> : "Submit"}
        </button>
      </div>
    </section>
  );
}

export default Page;