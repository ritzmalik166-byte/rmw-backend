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
    const serviceData = await fetchMeta(slug, "influencer-marketing-agency-in-india");
    const metaOverrides: Record<string, { title: string; description: string }> = {
        "campaign-integration": {
            title: "Influencer Marketing Campaign Integration Services | Ritz Media World",
            description:
                "Expert influencer campaign integration services in India. Combine strategy, creators, and content to deliver consistent messaging and measurable growth.",
        },
        "creative-collaboration": {
            title:
                "Creative Collaboration with Influencers | Grow Your Brand with Ritz Media World",
            description:
                "Boost brand impact with creative influencer collaborations. Ritz Media World delivers strategic storytelling, content creation, and high-performing campaigns in India.",
        },
    };
    const override = metaOverrides[slug];
    // console.log("serviceData", serviceData);
    if (!serviceData) {
        return {
            alternates: {
                canonical: `https://ritzmediaworld.com/services/influencer-marketing-agency-in-india/${slug}`,
            },
        };
    }

    return {
        title: override?.title ?? serviceData.meta_title,
        description: override?.description ?? serviceData.meta_description,
        keywords: serviceData.meta_keywords,
        alternates: {
            canonical: getCanonicalUrl(
                serviceData.link ?? undefined,
                `/services/influencer-marketing-agency-in-india/${slug}`,
            ),
        },
    };
}

export default function Layout({ children }: LayoutProps) {
    return <>{children}</>;
}