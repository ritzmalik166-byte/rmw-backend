import type { Metadata } from "next";
import { fetchMeta } from "@/lib/fetch_meta";
import { resolveServiceSecondSlug } from "@/lib/serviceSlugAliases";

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
    const resolvedSlug = resolveServiceSecondSlug("contents-marketing", slug);
    const serviceData = await fetchMeta(resolvedSlug, "contents-marketing");
    console.log("serviceData", serviceData);
    if (!serviceData) {
        console.log(`Service data not found for slug: ${slug}`);
        return {
            alternates: {
                canonical: `https://ritzmediaworld.com/services/contents-marketing/${slug}`,
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
                `/services/contents-marketing/${slug}`,
            ),
        },
    };
}

export default function Layout({ children }: LayoutProps) {
    return <>{children}</>;
}