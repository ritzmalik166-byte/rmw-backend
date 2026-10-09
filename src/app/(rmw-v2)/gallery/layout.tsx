import React from "react";
import type { Metadata } from "next";
import {
  GALLERY_CANONICAL_URL,
  GALLERY_PAGE_DESCRIPTION,
  GALLERY_PAGE_KEYWORDS,
  GALLERY_PAGE_TITLE,
} from "./gallery-images";

export const metadata: Metadata = {
  title: GALLERY_PAGE_TITLE,
  description: GALLERY_PAGE_DESCRIPTION,
  keywords: GALLERY_PAGE_KEYWORDS,
  alternates: {
    canonical: GALLERY_CANONICAL_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: GALLERY_CANONICAL_URL,
    siteName: "Ritz Media World",
    title: GALLERY_PAGE_TITLE,
    description: GALLERY_PAGE_DESCRIPTION,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

