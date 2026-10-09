import type { Metadata } from "next";
import { fetchMeta } from "@/lib/fetch_meta";

type LayoutProps = {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
};

function getCanonicalUrl(link: string | undefined, fallbackPath: string) {
    if (link?.startsWith("http")) return link;

    const path = link
        ? link.startsWith("/")
            ? link
            : `/${link}`
        : fallbackPath;

    // Enforce nested service canonical URL format.
    if (!path.startsWith("/services/")) {
        return `https://ritzmediaworld.com${fallbackPath}`;
    }

    return `https://ritzmediaworld.com${path}`;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const { slug } = await params;
    const serviceData = await fetchMeta(slug, "radio-advertising");

    if (!serviceData) {
        return {
            alternates: {
                canonical: `https://ritzmediaworld.com/services/radio-advertising/${slug}`,
            },
        };
    }

    return {
        title: serviceData.meta_title,
        description: serviceData.meta_description,
        keywords: serviceData.meta_keywords,
        alternates: {
            canonical: getCanonicalUrl(
                serviceData.link ?? undefined,
                `/services/radio-advertising/${slug}`,
            ),
        },
    };
}

export default function Layout({ children }: LayoutProps) {
    return <>{children}</>;
}