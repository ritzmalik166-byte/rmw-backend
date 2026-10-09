"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./category.module.css";
import Link from "next/link";
import Loader from "@/components/loader/Loader";
import { useParams } from "next/navigation";
import Image from "next/image";

type Card = {
  id?: string;
  blog_image?: string;
  title?: string;
  slug?: string;
  _id: string;
  blogTitle?: string;
  blogBanner?: string;
  blogSlug?: string;
};

const Category = () => {
  const [cardData, setCardData] = useState<Card[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const category_slug = params?.categorypage as string;
  const itemsPerPage = 6;
  const [isMongo, setIsMongo] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/category/${category_slug}`);
        console.log("response", response.data);
        setCardData(response.data);
        setIsMongo(false);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching data:", error);
        try {
          const res = await axios.get(
            `/api/ritz_blogs/get-categorized-blogs/${category_slug}`
          );
          console.log("res", res.data.blogs);
          setCardData(res.data.blogs);
          setIsMongo(true);
          setCurrentPage(1);
        } catch (error) {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category_slug]);

  const totalPages = Math.ceil(cardData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedCards = cardData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  // ✅ Use early return for loading and error
  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="container my-5">
      {cardData.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">No blogs found.</div>
      ) : (
        <>
          <div className="row">
            {selectedCards.map((card) => (
              <div
                key={card._id || card.slug || card.blogSlug || card.id}
                className="col-lg-4 col-md-6 mb-4"
              >
                <div
                  style={{ height: "100%" }}
                  className={`card bg-white text-black ${styles.card}`}
                >
                  <div className={styles.imageContainer}>
                    {(isMongo && card.blogBanner) ||
                    (!isMongo && card.blog_image) ? (
                      <Image
                        src={
                          isMongo
                            ? `https://ritzmediaworld.com/api/images${
                                card.blogBanner?.split("/images")[1] || ""
                              }`
                            : (
                              card.blog_image?.includes("/images")
                                ? `https://ritzmediaworld.com/api/images${card.blog_image.split("/images")[1]}`
                                : `https://ritzmediaworld.com/blogs/${card.blog_image}`
                            )
                        }
                        alt={card.title || card.blogTitle || "Blog image"}
                        fill
                        className={styles.image}
                        style={{ objectFit: "fill" }}
                        priority={false}
                        unoptimized
                      />
                    ) : (
                      <div
                        style={{ height: "200px", backgroundColor: "#ccc" }}
                      />
                    )}
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">
                      {card.title || card.blogTitle}
                    </h5>
                    <Link
                      title="Read more"
                    target="_blank"
                      href={`/${isMongo ? card.blogSlug : card.slug}`}
                      className={styles.button}
                    >
                      Read more <span className={styles.arrow}>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <nav
              className="d-flex flex-wrap align-items-center justify-content-center gap-3 mt-4"
              aria-label="Category pages"
            >
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={handlePrev}
                disabled={currentPage <= 1}
              >
                Previous
              </button>
              <span className="text-muted small">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={handleNext}
                disabled={currentPage >= totalPages}
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default Category;
