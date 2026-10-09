// app/services/[secondPage]/[thirdPage]/layout.tsx
import React from "react";
import { getMetaOrThrow } from "@/lib/meta";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Optional: generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ secondPage: string; thirdPage: string }>;
}): Promise<Metadata> {
  const { secondPage, thirdPage } = await params;
  const canonicalUrl = `https://ritzmediaworld.com/services/${secondPage}/${thirdPage}`;
  const alternates = { canonical: canonicalUrl };

  try {
    const data = await getMetaOrThrow(thirdPage, "serviceThird", secondPage);
    return {
      title: data.meta_title,
      description: data.meta_description,
      keywords: data.meta_keywords,
      alternates,
    };
  } catch {
    // Use default metadata for new slugs
    return {
      title:
        "Book Newspaper Ads Online | Best Newspaper Advertising Agency India",
      description:
        "Book newspaper ads online at discounted rates with Delhi-NCR’s top agency. Compare full, half & quarter page ad costs across leading papers. Instant booking & expert support.",
      keywords:
        "book ads, book ads online, book classified ads online, newspaper advertising, dainik jagran newspaper ad booking, classified advertising rates, newspaper classified ad, print ads, advertisement, dainik jagran advertisement rates, dainik jagran advertisement cost, book matrimonial ad in newspaper, newspaper classified advertising cost, classified advertising rates, classified ad booking cost, newspaper classified ad rates, newspaper advertising cost, classified advertising rate card, Paper Advertisement पेपर वाले विज्ञापन, Hindustan Times ad rates, Times of India ad rates, Print ad rates, Print ads rate, full-page ad rates, half-page ad rates, quarter-page ad rates, Jacket Ad rates, Cost for Matrimonial, Property, Tender, Recruitment, Legal, Education & Public Notice Classifieds.",
      alternates,
    };
  }
}

// Optional: if you still want static params for existing slugs
import { getAllSlugs } from "@/lib/meta"; // <-- Add missing import

export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs("serviceThird");
    return slugs as { secondPage: string; thirdPage: string }[];
  } catch (error) {
    console.warn(
      "[services/[secondPage]/[thirdPage]] generateStaticParams fallback to []:",
      error
    );
    return [];
  }
}
export const dynamic = "force-dynamic";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ secondPage: string; thirdPage: string }>;
}) {
  const { secondPage, thirdPage } = await params;

  try {
    // Try fetching meta for existing slugs
    await getMetaOrThrow(thirdPage, "serviceThird", secondPage);
  } catch (err) {
    console.warn(
      `Meta not found for slug: ${thirdPage}. Using default meta.`,
      err
    );
    // Do not call notFound() here to allow rendering for new slugs
  }

  return <>{children}</>;
}
