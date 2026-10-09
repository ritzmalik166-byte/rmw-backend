import { Providers } from "@/app/provider/Provider";
import Elementor from "@/allPages/Elementor";
import CookieConsentWithLead from "@/components/Cookies/CookieConsentWithLead";

export const metadata = {
  title: "Top Advertising Agency in Delhi NCR, Digital Marketing Noida",
  description:
    "Top advertising agency in Delhi NCR. Ritz media world offer SEO, radio, creative print ads services in Greater Noida. Most trusted digital marketing company.",
  keywords:
    "Top Advertising Agency, Advertising Agency in Delhi, Advertising Agency in Delhi NCR, Ads Agency in Delhi NCR, Best ad agency in Delhi, Best ad agency in Noida, ad agency in Noida, ad agency in Delhi, ad agency in Delhi NCR",
  metadataBase: new URL("https://www.ritzmediaworld.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Top Advertising Agency in Delhi NCR, Digital Marketing Noida",
    description:
      "Top advertising agency in Delhi NCR. Ritz media world offer SEO, radio, creative print ads services in Greater Noida. Most trusted digital marketing company.",
    url: "https://www.ritzmediaworld.com",
    siteName: "Ritz Media World",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://ritzmediaworld.com/rmw-logo-sm-size.png",
        alt: "Ritz Media World Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://twitter.com/ritzmediaworld",
    title: "Top Advertising Agency in Delhi NCR, Digital Marketing Noida",
    description:
      "Top advertising agency in Delhi NCR. Ritz media world offer SEO, radio, creative print ads services in Greater Noida. Most trusted digital marketing company.",
    images: [
      {
        url: "https://ritzmediaworld.com/rmw-logo-sm-size.png",
        alt: "Ritz Media World Logo",
      },
    ],
  },
};

export default function Home() {
  return (
    <Providers>
      <Elementor />
      <CookieConsentWithLead />
    </Providers>
  );
}
