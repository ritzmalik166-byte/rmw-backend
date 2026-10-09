import { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://ritzmediaworld.com"),
    title: "3D Rendering Services for Real Estate & Architecture",
    description: "Professional 3D rendering services in India for architecture, interiors, products, and real estate. High-quality 3D exterior rendering services & CGI visuals.",
    authors: [{ name: "Ritz Media World" }],
    publisher: "Ritz Media World",
    alternates: {
        canonical: "https://ritzmediaworld.com/services/3d-rendering-services",
    },
    keywords: [
        "3D rendering services", 
        "3D visualization services", 
        "3D walkthrough", 
        "3D architectural walkthrough", 
        "3D architectural walkthrough company", 
        "3D architectural walkthrough studio", 
        "3D architectural walkthrough firm", 
        "3D architectural rendering studio", 
        "3D architectural Visualization studio", 
        "Best VFX companies in India"
      
    ],
    openGraph: {
        title: "3D Rendering Services for Real Estate & Architecture | Ritz Media World",
        description: "Professional 3D rendering services in India for architecture, interiors, products, and real estate. High-quality 3D exterior rendering services & CGI visuals.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "3D Rendering Services for Real Estate & Architecture | Ritz Media World",
        description: "Professional 3D rendering services in India for architecture, interiors, products, and real estate. High-quality 3D exterior rendering services & CGI visuals.",
    },
};

export default function ThreeDRenderingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}