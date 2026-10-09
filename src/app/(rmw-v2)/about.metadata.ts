import type { Metadata } from "next";

export const ABOUT_PAGE_TITLE =
  "About Ritz Media World | Award-Winning Delhi NCR Advertising Agency";

export const ABOUT_PAGE_DESCRIPTION =
  "Learn how Ritz Media World crafts data-driven brand stories and digital campaigns. Over 17 years of experience turning brands into household names in Delhi NCR.";

export const aboutPageMetadata: Metadata = {
  title: ABOUT_PAGE_TITLE,
  description: ABOUT_PAGE_DESCRIPTION,
  keywords:
    "Ritz Media World, advertising agency Delhi NCR, creative agency Delhi, full service ad agency Noida, digital marketing agency Delhi NCR, brand storytelling agency India, print radio advertising Delhi NCR, award winning ad agency Delhi, client-centric marketing agency India, advertising & media services Delhi India",
  authors: [{ name: "Ritz Media World" }],
  publisher: "Ritz Media World",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: ABOUT_PAGE_TITLE,
    description:
      "Learn how Ritz Media World crafts data-driven brand stories and digital campaigns.",
    siteName: "Ritz Media World",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://ritzmediaworld.com/about.html",
  },
};
