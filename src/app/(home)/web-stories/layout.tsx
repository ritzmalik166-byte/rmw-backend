import { Providers } from "@/app/provider/Provider";
import type { Metadata } from "next";
import { OG_IMAGE_METADATA } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Web Stories & Visual Campaigns | Ritz Media World Delhi NCR",
  description:
    "Discover Ritz Media World’s immersive Web Stories, visual brand narratives & campaign snapshots created by a top Delhi NCR full-service agency.",
  keywords:
    "web stories agency Delhi NCR, visual storytelling campaigns India, brand narrative web stories Delhi, digital brand stories Delhi NCR, immersive brand content agency India, web stories marketing Delhi, visual content agency Delhi NCR, brand campaign stories India, web stories full-service agency Delhi NCR, creative brand storytelling India",
  metadataBase: new URL("https://ritzmediaworld.com"),
  alternates: {
    canonical: "/web-stories",
  },
  openGraph: {
    title: "Web Stories & Visual Campaigns | Ritz Media World Delhi NCR",
    description:
      "Discover Ritz Media World’s immersive Web Stories, visual brand narratives & campaign snapshots created by a top Delhi NCR full-service agency.",
    url: "https://ritzmediaworld.com/web-stories",
    siteName: "Ritz Media World",
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE_METADATA],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://twitter.com/ritzmediaworld",
    title: "Web Stories & Visual Campaigns | Ritz Media World Delhi NCR",
    description:
      "Discover engaging web stories, visual content, and interactive narratives from Ritz Media World.",
    images: [OG_IMAGE_METADATA.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WebStoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}