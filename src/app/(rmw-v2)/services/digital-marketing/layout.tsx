import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Digital Marketing Agency in India | Performance-Driven Services",
  description:
    "Get results with the best digital marketing agency. Expert in SEO, content, branding, influencer marketing, and custom web solutions tailored for growth.",

  authors: [{ name: "Ritz Media World" }],
  publisher: "Ritz Media World",

  alternates: {
    canonical: "https://ritzmediaworld.com/services/digital-marketing",
  },

  keywords: [
    "digital marketing agency India",
    "best digital marketing company",
    "performance marketing services",
    "online marketing agency",
    "SEO PPC social media",
    "top digital marketing experts",
    "ROI driven marketing",
    "full-service digital agency",
  ],
};

export default function Service2Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}