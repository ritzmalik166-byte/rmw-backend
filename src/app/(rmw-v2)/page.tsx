import { Suspense } from "react";
import type { Metadata } from "next";
import HomePage from "@/components/home-v3/HomePage";
import LoadingLinesAndDots from "@/components/ui/LoadingLinesAndDots";
import { OG_IMAGE_METADATA } from "@/lib/structuredData";

const HOME_CANONICAL_URL = "https://ritzmediaworld.com/";
const HOME_PAGE_TITLE = "Ritz Media World: Creative + Strategy + Media Agency";

export const metadata: Metadata = {
  title: HOME_PAGE_TITLE,
  openGraph: {
    title: HOME_PAGE_TITLE,
    images: [OG_IMAGE_METADATA],
  },
  twitter: {
    title: HOME_PAGE_TITLE,
    images: [OG_IMAGE_METADATA.url],
  },
};

export const revalidate = 300;
export const dynamic = "force-static";

export default function Page() {
  return (
    <>
      <link rel="canonical" href={HOME_CANONICAL_URL} />
      <div className="relative">
        <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center"><LoadingLinesAndDots /></div>}>
          <HomePage />
        </Suspense>
      </div>
    </>
  );
}