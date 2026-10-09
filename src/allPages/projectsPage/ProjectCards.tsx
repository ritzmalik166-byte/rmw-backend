"use client";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import styles from "./Card.module.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

const Loader = dynamic(() => import("@/components/loader/Loader"), {
  ssr: false,
});

type Card = {
  id: string;
  blog_image: string;
  title: string;
  slug: string;
};

function ProjectCardItem({ card, idx }: { card: Card; idx: number }) {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div
        style={{ height: "100%" }}
        className={`card bg-white text-black ${styles.card}`}
      >
        <div className={styles.imageContainer}>
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/blogs/${card.blog_image}`}
            className={styles.image}
            alt={card.title}
            title={card.title}
            fill
            quality={idx < 2 ? 80 : 60}
          />
        </div>
        <div className="card-body text-center">
          <h2 className="card-title" style={{fontSize: "20px", fontWeight: "600"}}>{card.title}</h2>
          <Link href={card.slug} title="Case Studies" target="_blank" className={`bg-[#6ea2ee] ${styles.button}`}>
            Case Studies <span className={styles.arrow}>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}



const ProjectCards = () => {
  const [cardData, setCardData] = useState<Card[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/case_studies");
        const cards = Array.isArray(response.data) ? response.data : [];
        setCardData(cards);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(cardData.length / itemsPerPage);

  // Memoize slice to avoid recalculating on every render
  const selectedCards = useMemo(
    () =>
      cardData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [cardData, currentPage]
  );

  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  if (loading)
    return (
      <div className="text-center my-5">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 my-5">
        <p>{error}</p>
      </div>
    );

  if (cardData.length === 0) {
    return (
      <div className="text-center my-5">
        <p>No case studies available right now.</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        {selectedCards.map((card, idx) => (
          <ProjectCardItem key={card.id} card={card} idx={idx} />
        ))}
      </div>

      {/* Pagination */}
      <div className="text-center mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="mx-2"
          style={{
            color: "#000",
            background: "var(--tp-primary-blue)",
            padding: "10px 20px",
            borderRadius: "30px",
            fontWeight: "bold",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            opacity: currentPage === 1 ? 0.5 : 1,
            transition: "all 0.3s ease-in-out",
            boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          ⬅ Prev
        </button>

        <span
          style={{
            fontSize: "16px",
            padding: "5px 15px",
            color: "#0c0c0c",
            borderRadius: "20px",
          }}
        >
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="mx-2"
          style={{
            color: "#000",
            background: "var(--tp-primary-blue)",
            padding: "10px 20px",
            borderRadius: "30px",
            fontWeight: "bold",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            opacity: currentPage === totalPages ? 0.5 : 1,
            transition: "all 0.3s ease-in-out",
            boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default ProjectCards;
