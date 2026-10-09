"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useParams } from "next/navigation";
import Loader from "@/components/loader/Loader";

// Above-the-fold components
import ServiceThirdHero from "./ServiceThirdHero";
import ServiceThirdQuality from "./ServiceThirdQuality";

// Lazy load below-the-fold components
const ServiceThirdAward = dynamic(() => import("./ServiceThirdAward"), { ssr: false });
const ServiceThirdColorMarque = dynamic(() => import("./ServiceThirdColorMarque"), { ssr: false });
const ServiceThirdSlowMarque = dynamic(() => import("./ServiceThirdSlowMarque"), { ssr: false });
const ServiceMainTestimonial = dynamic(() => import("../serviceMainpage/ServiceMainTestimonial"), { ssr: false });
const ProjectSwiper = dynamic(() => import("../Homepage/ProjectSwiper"), { ssr: false });
const Form = dynamic(() => import("../Contactpage/Form"), { ssr: false });
const ServiceEndTag = dynamic(() => import("@/components/endTag/serviceEndTag"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer/Footer"), { ssr: false });

interface CardData {
  title: string;
  description: string;
  image_url?: string;
}

type ServiceThirdInitialData = {
  cards: Array<CardData & { image_url?: string | null }>;
  s3heading1: string | null;
  s3endtag: string | null;
};

const ServiceThirdMainPage = ({ initialData }: { initialData?: ServiceThirdInitialData }) => {
  const params = useParams();
  const { secondPage, thirdPage } = params as { secondPage: string; thirdPage: string };

  const [cardData, setCardData] = useState<CardData[]>(
    initialData?.cards?.map((item) => ({ ...item, image_url: item.image_url ?? undefined })) ?? []
  );
  const [head, setHead] = useState<string | null>(initialData?.s3heading1 ?? null);
  const [endTag, setEndTag] = useState<string | null>(initialData?.s3endtag ?? null);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (initialData) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/services/${secondPage}/${thirdPage}`);
        setCardData(
          (res.data.cards || []).map((item: CardData & { image_url?: string | null }) => ({
            ...item,
            image_url: item.image_url ?? undefined,
          }))
        );
        setHead(res.data.s3heading1 || null);
        setEndTag(res.data.s3endtag || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (secondPage && thirdPage) {
      fetchData();
    }
  }, [secondPage, thirdPage, initialData]);

  if (loading) return <Loader />;

  return (
    <>
      {head && <ServiceThirdHero heading={head} />}
      <ServiceThirdQuality cardData={cardData} />
      <ServiceThirdColorMarque />
      <ServiceThirdAward />
      <ServiceMainTestimonial />
      <ProjectSwiper />
      <Form />
      <ServiceThirdSlowMarque />
      {endTag && <ServiceEndTag endtag={endTag} />}
      <Footer />
    </>
  );
};

export default ServiceThirdMainPage;
