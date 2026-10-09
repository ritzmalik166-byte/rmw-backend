import { Metadata } from "next";
import { OG_IMAGE_METADATA } from "@/lib/structuredData";

export const metadata: Metadata = {
  metadataBase: new URL("https://ritzmediaworld.com"),

  title: "Advertising & Digital Services | Ritz Media World Delhi-NCR",
  description:
    "Discover Ritz Media World’s full-service solutions in digital, print, radio and creative advertising designed to grow your brand and drive real results.",

  authors: [{ name: "Ritz Media World" }],
  publisher: "Ritz Media World",

  alternates: {
    canonical: "https://ritzmediaworld.com/services",
  },

  keywords: [
    "Ritz Media World services",
    "advertising agency India",
    "digital marketing services",
    "print and radio ads",
    "creative branding solutions",
    "media agency",
    "brand promotion India",
    "best print advertising services",
    "top print advertising services",
    "radio advertising cost",
    "Best",
    "Radio Ads Services in Delhi",
    "Best Radio Ads Services in Noida",
    "PR Services in Noida",
    "Digital Marketing Services Delhi NCR",
    "marketing services",
    "creative services",
    "ppc services",
  ],

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ritzmediaworld.com",
    siteName: "Ritz Media World",
    title:
      "Top Advertising Agency in Delhi NCR, Digital Marketing Noida | Ritz Media World",
    description:
      "Top advertising agency in Delhi NCR. Ritz media world offer SEO, radio, creative print ads services in Greater Noida. Most trusted digital marketing company.",
    images: [OG_IMAGE_METADATA],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Top Advertising Agency in Delhi NCR, Digital Marketing Noida | Ritz Media World",
    description:
      "Top advertising agency in Delhi NCR. Ritz media world offer SEO, radio, creative print ads services in Greater Noida. Most trusted digital marketing company.",
    images: [OG_IMAGE_METADATA.url],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}