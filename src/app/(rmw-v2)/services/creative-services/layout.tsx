import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Leading Creative Agency in India | Branding & Design Experts",

    description:
        "Leading creative agency specializing in branding, logo design, packaging, and visual identity to elevate your brand’s presence across all platforms.",

    authors: [{ name: "Ritz Media World" }],
    publisher: "Ritz Media World",

    keywords: [
        "Best creative digital marketing agency",
        "creative digital marketing agency",
        "Creative services",
        "Creative Design Solutions",
        "Professional Branding Services",
        "Best Creative Services for Startups & Brands",
        "Best creative digital marketing agency in india",
        "Logo design",
        "Creatives",
        "Creative Content & Design Agency",
        "Custom Creative Services",
        "From Concept to Execution",
        "Innovative Creative Services",
        "Professional Creative Design Agency",
        "Digital & Print Services",
        "Creative Services Delhi",
        "Creative Services Noida",
        "Creative service agency to hire",
    ],

    alternates: {
        canonical: "https://ritzmediaworld.com/services/creative-services",
    },
    

    openGraph: {
        title: "Leading Creative Agency in India | Branding & Design Experts",
        description:
            "Leading creative agency specializing in branding, logo design, packaging, and visual identity to elevate your brand’s presence across all platforms.",
        url: "https://ritzmediaworld.com/services-v3/creative-services",
        siteName: "Ritz Media World",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Leading Creative Agency in India | Branding & Design Experts",
        description:
            "Leading creative agency specializing in branding, logo design, packaging, and visual identity to elevate your brand’s presence across all platforms.",
    },
};

export default function CreativeServicesLayout({ children, }: { children: React.ReactNode; }) {
    return <div>{children}</div>;
}