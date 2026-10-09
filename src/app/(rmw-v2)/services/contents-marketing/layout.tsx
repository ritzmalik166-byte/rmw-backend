import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://ritzmediaworld.com"),
    title: "Content Marketing Company in India | SEO Blogs & Strategy Experts",
    description:
        "Top content marketing company in India for SEO blogs, content strategy & traffic growth. Drive leads with expert storytelling & keyword-rich content.",
    authors: [{ name: "Ritz Media World" }],
    publisher: "Ritz Media World",
    keywords: [
        "Content Marketing",
        "Best Content Marketing agency",
        "Content Marketing agency",
        "Top 10 content marketing agency",
        "Content Marketing Services",
        "SEO Content & Strategy",
        "Content Marketing Experts",
        "Best Content Marketing Company",
        "Strategic Content Marketing Services",
        "SEO Content Marketing Agency",
        "Full-Service Content Marketing Agency",
        "Results-Driven Content Marketing",
        "web Designing company in Noida",
    ],
    alternates: {
        canonical: "https://ritzmediaworld.com/services/contents-marketing",
    },
};

export default function ContentMarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div>{children}</div>;
}