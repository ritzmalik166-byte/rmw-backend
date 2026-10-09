"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface WEBSTORIES {
  storyPages: {
    createdAt: Date;
    descAlign: string;
    description: string;
    img: string;
    metaDescription: string;
    metaKeyWords: string;
    title: string;
    titleAlign: string;
    topic: string;
    _id: string;
    buttonCTA: {
      btnColor: string;
      btnLink: string;
      btnTxt: string;
      btnTxtColor: string;
    };
  }[];
  _doc: {
    createdAt: Date;
    description: string;
    isActive: boolean;
    metaDescription: string;
    metaKeyWords: string;
    pages: number;
    topicImg: string;
    topicTitle: string;
    _id: string;
    slug: string;
  };
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "").trim();
}

function WebStories() {
  const [allWebStories, setAllWebStories] = useState<WEBSTORIES[]>([]);

  const getAllWebStories = async () => {
    try {
      const { data } = await axios.get(
        "/api/rizt_webStories/get-all-webStories"
      );
      setAllWebStories(data.webStories);
    } catch (error) {
      console.log("Error fetching web stories", error);
    }
  };

  useEffect(() => {
    getAllWebStories();
  }, []);

  const navigation = useRouter();
  const handleStoryNavigation = (slug: string) => {
    navigation.push(`/amp/story/${slug}`);
  };

  return (
    <section className={styles.reelStoriesWrapper}>
      {allWebStories.length > 0 ? (
        <div className={styles.reelContainer}>
          {allWebStories.filter((stry)=>stry._doc.isActive === true).map(
            (story) =>
              story.storyPages.length > 0 && (
                <div
                  key={story._doc._id}
                  className={`${styles.reelCard} ${styles.flipCard}`}
                  onClick={() => handleStoryNavigation(story._doc.slug)}
                >
                  <div className={styles.flipCardInner}>
                    {/* Front Side */}
                    <div className={styles.flipCardFront}>
                      <div className={styles.reelImageContainer}>
                        <Image
                          src={`${
                            process.env.NEXT_PUBLIC_SERVER_IMG_PATH
                          }/api/images/${
                            story._doc.topicImg.split("images")[1]
                          }`}
                          alt={story._doc.topicTitle}
                          fill
                          className={styles.reelImage}
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <h2 className={styles.title3d} style={{ color: "white" }}>
                        {story._doc.topicTitle}
                      </h2>
                    </div>

                    {/* Back Side */}
                    <div className={styles.flipCardBack}>
                      <h3 style={{ color: "white" }}>
                        {story._doc.topicTitle}
                      </h3>
                      <p className={styles.storyDescription}>
                        {stripHtml(story._doc.description) ||
                          "No description available"}
                      </p>
                      {/* <button className={styles.viewButton}>View Story</button> */}
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.noStories}>No stories available</p>
        </div>
      )}
    </section>
  );
}

export default WebStories;

//  src={`${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images/${page.img.split("images")[1]}`}
