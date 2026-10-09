"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import Editor from "@/components/Editor/Editor";
import { Button } from "@/components/ui/button";
import axios from "axios";
import RMWPopup from "@/components/rmw_popup/RMWPopup";
import RMWLoader from "@/components/rmw_loader/RMWLoader";

interface WebStory {
  title: string;
  description: string;
  titleAlign: string;
  buttonCTA: {
    btnTxt: string;
    btnLink: string;
    btnColor: string;
    btnTxtColor: string;
  };
  img: string;
  metaDescription: string;
  metaKeyWords: string;
  topic: string;
  descAlign: string;
}
interface TOPICS {
  topicTitle: string;
  _id: string;
}

const Page = () => {
  // const router = useRouter();
  const [story, setStory] = useState<WebStory>();
  const [loading, setLoading] = useState(true);
  const [previewImg, setPreviewImg] = useState<string>("");
  const params = useParams();
  const [imgFile, setImageFile] = useState<File | null>(null);
  const [topics, setTopics] = useState<TOPICS[]>([]);
  const [rmwLoader, setRMWLoader] = useState(false);
  const { slug } = params;
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ message: "", status: 0 });

  const getSingleStoryPage = async () => {
    try {
      const { data, status } = await axios.get(
        `/api/rizt_webStories/get-single-page/${slug}`
      );
      if (status === 200) {
        setLoading(false);
        setStory(data.singleStoryPage);
      }
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

  const getAllTopics = async () => {
    try {
      const { data, status } = await axios.get(
        "/api/ritz_webStoryTopics/get-all-topics"
      );
      if (status === 200) {
        setTopics(data.allTopics);
      }
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
    setLoading(true);
    if (slug) {
      getSingleStoryPage();
      getAllTopics();
    }
  }, [slug]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!story) return;

    try {
      const formData = new FormData();
      setRMWLoader(true);
      // Append primitive fields
      formData.append("title", story.title);
      formData.append("description", story.description);
      formData.append("titleAlign", story.titleAlign);
      formData.append("descAlign", story.descAlign);
      formData.append("metaDescription", story.metaDescription);
      formData.append("metaKeyWords", story.metaKeyWords);
      formData.append("topic", story.topic);

      // Append nested buttonCTA fields
      formData.append("buttonCTA[btnTxt]", story.buttonCTA.btnTxt);
      formData.append("buttonCTA[btnLink]", story.buttonCTA.btnLink);
      formData.append("buttonCTA[btnColor]", story.buttonCTA.btnColor);
      formData.append("buttonCTA[btnTxtColor]", story.buttonCTA.btnTxtColor);

      // Append image (assuming story.img is a string URL)
      if (imgFile) {
        formData.append("img", imgFile);
      }

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("rm_token")
          : null;
      const { status, data } = await axios.patch(
        `/api/rizt_webStories/update-webStoryPage/${slug}`,
        formData,
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      setPopupData({ message: data.message, status });
      setShowPopup(true);
       setRMWLoader(false);
      if (status === 200) {
        window.location.reload();
      }
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setStory((prev) =>
            prev && typeof reader.result === "string"
              ? { ...prev, img: reader.result }
              : prev
          );
          setPreviewImg(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (!story) return <p className={styles.loading}>Story not found</p>;

  return (
    <section className={styles.container}>
      {showPopup && (
        <RMWPopup
          message={popupData.message}
          status={popupData.status}
          onClose={() => setShowPopup(false)}
        />
      )}
      <h1 className={styles.heading}>Update Web Story</h1>

      <form
        onSubmit={handleUpdate}
        encType="multipart/formData"
        className={styles.form}
      >
        <label className={styles.label}>Title</label>
        <input
          className={styles.input}
          type="text"
          value={story.title}
          onChange={(e) => setStory({ ...story, title: e.target.value })}
          required
        />

        <label className={styles.label}>Description</label>
        <Editor
          value={story.description}
          onChange={(val: string) =>
            setStory((prev) => prev && { ...prev, description: val })
          }
        />

        <label className={styles.label}>Upload Image</label>
        <input
          className={styles.input}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {(previewImg || story.img) && (
          <img
            src={
              previewImg
                ? previewImg
                : `${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images/${
                    story.img.split("images")[1]
                  }`
            }
            alt="Preview"
            className={styles.previewImg}
          />
        )}

        <label className={styles.label}>Meta Keywords</label>
        <input
          className={styles.input}
          type="text"
          value={story.metaKeyWords}
          onChange={(e) => setStory({ ...story, metaKeyWords: e.target.value })}
        />

        <label className={styles.label}>Meta Description</label>
        <input
          className={styles.input}
          type="text"
          value={story.metaDescription}
          onChange={(e) =>
            setStory({ ...story, metaDescription: e.target.value })
          }
        />

        <label className={styles.label}>Topic</label>
        <select
          name="topic"
          id="topic"
          className={styles.input}
          onChange={(e) => setStory({ ...story, topic: e.target.value })}
        >
          {topics &&
            topics
              .filter((topic) => topic._id === story.topic)
              .map((fTopic) => {
                return (
                  <option value={fTopic._id} key={fTopic._id}>
                    {fTopic.topicTitle}
                  </option>
                );
              })}
          {topics.map((topic) => {
            return (
              <option value={topic._id} key={topic._id}>
                {topic.topicTitle}
              </option>
            );
          })}
        </select>

        <label className={styles.label}>Title Alignment</label>
        <select
          className={styles.select}
          value={story.titleAlign}
          onChange={(e) =>
            setStory({ ...story, titleAlign: e.target.value as string })
          }
        >
          <option value="top">Top</option>
          <option value="center">Center</option>
          <option value="bottom">Bottom</option>
        </select>

        <label className={styles.label}>Description Alignment</label>
        <select
          className={styles.select}
          value={story.descAlign}
          onChange={(e) =>
            setStory({ ...story, descAlign: e.target.value as string })
          }
        >
          <option value="top">Top</option>
          <option value="center">Center</option>
          <option value="bottom">Bottom</option>
        </select>

        <label className={styles.label}>Button Text</label>
        <input
          className={styles.input}
          type="text"
          value={story.buttonCTA.btnTxt}
          onChange={(e) =>
            setStory({
              ...story,
              buttonCTA: { ...story.buttonCTA, btnTxt: e.target.value },
            })
          }
        />

        <label className={styles.label}>Button Link</label>
        <input
          className={styles.input}
          type="text"
          value={story.buttonCTA.btnLink}
          onChange={(e) =>
            setStory({
              ...story,
              buttonCTA: { ...story.buttonCTA, btnLink: e.target.value },
            })
          }
        />

        <label className={styles.label}>Button Background Color</label>
        <input
          className={styles.input}
          type="color"
          value={story.buttonCTA.btnColor}
          onChange={(e) =>
            setStory({
              ...story,
              buttonCTA: { ...story.buttonCTA, btnColor: e.target.value },
            })
          }
        />

        <label className={styles.label}>Button Text Color</label>
        <input
          className={styles.input}
          type="color"
          value={story.buttonCTA.btnTxtColor}
          onChange={(e) =>
            setStory({
              ...story,
              buttonCTA: { ...story.buttonCTA, btnTxtColor: e.target.value },
            })
          }
        />

        <Button className={styles.button} type="submit">
          {rmwLoader ? <RMWLoader /> : "Submit"}
        </Button>
      </form>
    </section>
  );
};

export default Page;
