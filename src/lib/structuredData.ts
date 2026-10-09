const SITE_URL = "https://ritzmediaworld.com";

/** Homepage + default canonical (no trailing slash). */
export const SITE_CANONICAL_URL = SITE_URL;

/** Social share image — live site RMW logo used in navbar / favicon. */
export const OG_IMAGE_PATH = "/rmw-logo-sm-size.png";
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

export const OG_IMAGE_METADATA = {
  url: OG_IMAGE_PATH,
  width: 95,
  height: 120,
  alt: "Ritz Media World - Top Advertising Agency in Delhi NCR",
} as const;

/** Organization schema — matches site Organization JSON-LD script. */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ritz Media World",
  url: SITE_URL,
  logo: "https://ritzmediaworld.com/_next/image?url=%2Frmw-logo-sm-size.png&w=256&q=70",
  sameAs: [
    "https://www.facebook.com/ritzmediaworld/",
    "https://x.com/ritzmediaworld",
    "https://www.instagram.com/ritzmediaworld/",
    "https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia",
    "https://www.linkedin.com/company/ritzmediaworld/?originalSubdomain=in",
  ],
};

const localBusinessSameAs = [
  "https://www.facebook.com/ritzmediaworld.rmw",
  "https://www.instagram.com/ritzmediaworld.rmw/",
  "https://www.linkedin.com/company/ritzmediaworld",
  "https://twitter.com/ritzmediaworld",
  "https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia",
] as const;

/** AdvertisingAgency JSON-LD — rendered site-wide from root layout. */
export const advertisingAgencyJsonLd = {
  "@context": "https://schema.org",
  "@type": "AdvertisingAgency",
  "@id": "https://ritzmediaworld.com/#localbusiness",
  name: "Ritz Media World",
  url: SITE_URL,
  image: OG_IMAGE_URL,
  logo: `${SITE_URL}/rmw-logo-sm-size.png`,
  description:
    "Ritz Media World is a full-service advertising and digital marketing agency in Noida offering branding, SEO, social media marketing, web development, influencer marketing, print advertising, and radio advertising services.",
  telephone: "+91-9220516777",
  email: "info@ritzmediaworld.com",
  priceRange: "₹₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "402-404, 4th Floor, Corporate Park, Tower A1, Sector 142",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201305",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "28.5046",
    longitude: "77.4145",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:30",
      closes: "18:30",
    },
  ],
  sameAs: [...localBusinessSameAs],
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  hasMap: "https://maps.google.com/?q=Ritz+Media+World+Noida",
  serviceArea: {
    "@type": "Place",
    name: "India",
  },
};
