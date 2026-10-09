import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Real Estate 3D Walkthrough & Architectural Visualization Services",
    description: "Premium Real Estate Walkthrough Services for builders, architects, and developers. Showcase projects with realistic 3D walkthroughs and virtual property experiences.",
    authors: [{ name: "Ritz Media World" }],
    publisher: "Ritz Media World",
    keywords: [
        "real estate 3D walkthrough",
        "architectural visualization services",
        "3D walkthrough services",
        "property walkthrough video",
        "virtual property tour",
        "real estate virtual tour",
        "3D property tour",
        "360 virtual tour real estate",
    ],
    openGraph: {
        title: "Real Estate 3D Walkthrough & Architectural Visualization Services",
        description: "Premium Real Estate Walkthrough Services for builders, architects, and developers. Showcase projects with realistic 3D walkthroughs and virtual property experiences.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Real Estate 3D Walkthrough & Architectural Visualization Services",
        description: "Premium Real Estate Walkthrough Services for builders, architects, and developers. Showcase projects with realistic 3D walkthroughs and virtual property experiences.",
    },
};

export default function RealEstateWalkthroughLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div>{children}</div>;
}
