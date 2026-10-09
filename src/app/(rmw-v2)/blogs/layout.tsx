import type { Metadata } from "next";
import type { ReactNode } from "react";

const BLOG_INDEX_TITLE =
    "Insights & Marketing Trends | Ritz Media World Blog Delhi NCR";
const BLOG_INDEX_DESCRIPTION =
    "Explore expert blogs from Ritz Media World covering advertising trends, creative campaigns, brand strategy, and the future of digital marketing.";
const BLOG_INDEX_URL = "https://ritzmediaworld.com/blogs";

const BLOG_INDEX_KEYWORDS = [
    "advertising insights",
    "branding articles",
    "digital marketing tips",
    "marketing trends India",
    "marketing agency blogs",
    "brand strategy blog",
    "advertising trends",
    "creative marketing ideas",
    "digital marketing insights",
    "brand strategy",
    "media agency blog",
    "marketing innovations",
    "Digital Marketing Agency in Delhi NCR",
    "Best digital marketing agency in Delhi NCR",
    "Best digital marketing agency in Delhi",
    "Best ad agency",
    "social media marketing agency",
    "content marketing agency",
    "Creative service",
    "best ad agencies",
    "print advertising services",
    "best print advertising services",
    "Radio advertising agency",
];

export const metadata: Metadata = {
    metadataBase: new URL("https://ritzmediaworld.com"),
    title: BLOG_INDEX_TITLE,
    description: BLOG_INDEX_DESCRIPTION,
    keywords: BLOG_INDEX_KEYWORDS,
    authors: [{ name: "Ritz Media World" }],
    publisher: "Ritz Media World",
    alternates: {
        canonical: BLOG_INDEX_URL,
    },
    openGraph: {
        title: BLOG_INDEX_TITLE,
        description: BLOG_INDEX_DESCRIPTION,
        url: BLOG_INDEX_URL,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: BLOG_INDEX_TITLE,
        description: BLOG_INDEX_DESCRIPTION,
    },
};

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <link
                rel="preload"
                as="image"
                type="image/webp"
                href={`${BLOG_INDEX_URL}/blogs2/s1-layer-mob.webp`}
                media="(max-width: 767px)"
                fetchPriority="high"
            />
            <link
                rel="preload"
                as="image"
                type="image/webp"
                href={`${BLOG_INDEX_URL}/blogs2/s1-layer-desk.webp`}
                media="(min-width: 768px)"
            />
            {children}
        </>
    );
}
