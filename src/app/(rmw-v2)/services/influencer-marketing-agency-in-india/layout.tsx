import { Metadata } from "next";
import { OG_IMAGE_METADATA } from "@/lib/structuredData";

export const metadata: Metadata = {
  metadataBase: new URL("https://ritzmediaworld.com"),
  alternates: {
    canonical:
      "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india",
  },
  title: "Influencer Marketing Agency in India | Engage Top Social Influencers",
  description: "Delhi NCR’s leading influencer marketing agency. Partner with top Instagram, YouTube & LinkedIn influencers to grow your brand visibility.",
  authors: [{ name: "Ritz Media World" }],
  publisher: "Ritz Media World",
  keywords: [
    "Influencer Marketing Services",
    "Boost Brand Engagement",
    "top influencers across Instagram",
    "Top Influencer Marketing Agency",
    "Verified Creators",
    "influencer campaigns with trusted creators",
    "Influencer Campaign Management",
    "Social Media Growth",
    "Hire Influencers for Brand Promotions",
    "Micro & Macro Influencers",
    " Influencer Marketing Experts",
    " ROI-Focused Campaigns",
    "strategic influencer marketing",
    "audience targeting",
    "Instagram Influencer Marketing",
    " Reach Millennials & Gen Z",
    "YouTube Influencer Marketing","sponsored content from trusted influencers"," Influencer Outreach & Strategy","Build Brand Loyalty","End-to-End Influencer Marketing Solutions","All Niches Covered","Influencer Marketing Agency in Delhi NCR"," Delhi NCR Influencer Marketing Experts","Regional Influencer Marketing"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ritzmediaworld.com",
    siteName: "Ritz Media World",
    title: "Top Advertising Agency in Delhi NCR, Digital Marketing Noida | Ritz Media World",
    description: "Top advertising agency in Delhi NCR. Ritz media world offer SEO, radio, creative print ads services in Greater Noida. Most trusted digital marketing company.",
    images: [OG_IMAGE_METADATA],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Advertising Agency in Delhi NCR, Digital Marketing Noida | Ritz Media World",
    description: "Top advertising agency in Delhi NCR. Ritz media world offer SEO, radio, creative print ads services in Greater Noida. Most trusted digital marketing company.",
    images: [OG_IMAGE_METADATA.url],
  },
};


export default function InfluencerMarketingLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}