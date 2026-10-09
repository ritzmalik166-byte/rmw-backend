import { Providers } from "@/app/provider/Provider";
import type { Metadata } from "next";

export const metadata = {
  alternates: {
    canonical: "https://ritzmediaworld.com/blogs",
  },
  title: "Insights & Marketing Trends | Ritz Media World Blog Delhi NCR",
  description:
    "Explore expert blogs from Ritz Media World covering advertising trends, creative campaigns, brand strategy, and the future of digital marketing.",
  keywords:
    "advertising insights, branding articles, digital marketing tips, marketing trends India, marketing agency blogs, brand strategy blog, advertising trends, creative marketing ideas, digital marketing insights, brand strategy, media agency blog, marketing innovations, Digital Marketing Agency in Delhi NCR, Best digital marketing agency in Delhi NCR, Best digital marketing agency in Delhi, Best ad agency, social media marketing agency, content marketing agency, Creative service, best ad agencies, print advertising services, best print advertising services, Radio advertising agency",
  openGraph: {
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
