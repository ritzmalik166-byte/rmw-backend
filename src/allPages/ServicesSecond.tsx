"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import axios from "axios";
import Loader from "@/components/loader/Loader";

// Static/Above-the-fold components
import ServiceFirst from "./serviceSecondPage/ServiceFirst";

// Lazy load below-the-fold components for performance
const SwiperHome = dynamic(() => import("./Homepage/SwiperHome"), { ssr: false });
const Service = dynamic(() => import("./Homepage/Service"), { ssr: false });
const ServiceImg = dynamic(() => import("./serviceSecondPage/ServiceImg"), { ssr: false });
const Feedback = dynamic(() => import("./Homepage/Feedback"), { ssr: false });
const ServiceEndTag = dynamic(() => import("@/components/endTag/serviceEndTag"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer/Footer"), { ssr: false });

type CardItem = {
  title: string;
  imgSrc?: string;
  description: string;
  link: string;
};

type ServicesSecondInitialData = {
  cards: CardItem[];
  s2heading: string | null;
  s2para: string | null;
  s2endtag: string | null;
  img1: string | null;
  img2: string | null;
};

const ServicesSecondPage = ({ initialData }: { initialData?: ServicesSecondInitialData }) => {
  const [card, setCard] = useState<CardItem[]>(initialData?.cards ?? []);
  const [head, setHead] = useState<string | null>(initialData?.s2heading ?? null);
  const [img1, setImg1] = useState<string | null>(initialData?.img1 ?? null);
  const [img2, setImg2] = useState<string | null>(initialData?.img2 ?? null);
  const [para, setPara] = useState<string | null>(initialData?.s2para ?? null);
  const [endTag, setEndTag] = useState<string | null>(initialData?.s2endtag ?? null);
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const serviceSecond = params?.secondPage as string;

  useEffect(() => {
    if (initialData) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/services/${serviceSecond}`);

        const updatedCards: CardItem[] = response.data.cards.map((item: CardItem) => ({
          ...item,
          link: `${serviceSecond}/${item.link}`,
        }));

        setCard(updatedCards);
        setHead(response.data.s2heading);
        setPara(response.data.s2para);
        setEndTag(response.data.s2endtag);
        setImg1(response.data.img1);
        setImg2(response.data.img2);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceSecond, initialData]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center mt-4">Error: {error}</div>;

  return (
    <>
      <ServiceFirst heading={head} image1={img1} image2={img2} />

      <SwiperHome />

      {para && (
        <p
          style={{
            position: "relative",
            padding: "20px 10px",
            maxWidth: "950px",
            fontSize: "19px",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          {para}
        </p>
      )}

      <Service data={card} />
      <ServiceImg />
      <Feedback />
      <ServiceEndTag endtag={endTag} />
      <Footer />
    </>
  );
};

export default ServicesSecondPage;
