import "./styles/tailwind.css";
import "./styles/global.css";
import { Metadata } from "next";
import NewNavbar from "./layout/NewNavbar";
import NewFooter from "./layout/NewFooter";
import RubyProvider from "@/ruby-context/ruby.context";
import ClientWidgets from "./layout/ClientWidgets";
import { OG_IMAGE_METADATA, SITE_CANONICAL_URL } from "@/lib/structuredData";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CANONICAL_URL),
  authors: [{ name: "Ritz Media World" }],
  publisher: "Ritz Media World",
  title:
    "Top Advertising Agency in Delhi NCR, Digital Marketing Noida | Ritz Media World",
  description:
    "Top advertising agency in Delhi NCR. Ritz media world offer SEO, radio, creative print ads services in Greater Noida. Most trusted digital marketing company.",
  keywords: [
    "Best advertising agency in Delhi NCR",
    "Top Advertising Agency",
    "Advertising Agency in Delhi",
    "Best Advertising Agency in Delhi NCR",
    "Ads Agency in Delhi NCR",
    "Best ad agency in Delhi",
    "Best ad agency in Noida",
    "ad agency in Noida",
    "ad agency in Delhi",
    "ad agency in Delhi NCR",
    "Digital marketing agency",
    "Creative Agency",
    "Branding agency In Delhi",
    "Branding agency In Noida",
    "Branding agency In Delhi NCR",
    "Creative Advertising Agency",
    "Social Media Marketing Agency",
    "Content Marketing Agency",
    "Best Creative Advertising Agency",
    "Best marketing agency in India",
    "Creative service",
    "SEO company in noida",
    "Radio advertising agency",
    "Best ad agency",
    "Digital Marketing company",
    "Digital Marketing company in noida",
    "Digital Marketing company in Delhi",
    "digital marketing and creative agency",
    "Best digital marketing agency in Delhi",
    "Newspaper ad agency",
    "Top Marketing Agency in India",
    "creative digital marketing agency",
    "best seo services in noida",
    "best seo agency in greater noida",
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
    creator: "@ritzmediaworld",
    site: "@ritzmediaworld",
  },
};

export default function NewRMWW({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Navbar></Navbar> */}
      <NewNavbar></NewNavbar>
      <RubyProvider>
        {children}
        <ClientWidgets />
        {/* <EnquiryForm /> */}
      </RubyProvider>
      {/* <Footer></Footer> */}
      <NewFooter></NewFooter>
    </>
  );
}
