import type { Metadata } from "next";
import data from "../../../../../../servive-layer-2.json";

type LayoutProps = {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
};

function getServiceDataBySlug(slug: string) {
    return data.find((item: any) => item.link?.split("/").pop() === slug);
}

function getCanonicalUrl(link: string | undefined, fallbackPath: string) {
    if (link?.startsWith("http")) return link;

    const path = link
        ? link.startsWith("/")
            ? link
            : `/${link}`
        : fallbackPath;

    return `https://ritzmediaworld.com${path}`;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const { slug } = await params;
    const serviceData = getServiceDataBySlug(slug);

    if (!serviceData) {
        return {
            alternates: {
                canonical: `https://ritzmediaworld.com/services/print-advertising2/${slug}`,
            },
        };
    }

    return {
        title: serviceData.meta_titles,
        description: serviceData.meta_description,
        keywords: serviceData.meta_keywords,
        alternates: {
            canonical: getCanonicalUrl(serviceData.link, `/services/print-advertising2/${slug}`),
        },
    };
}

export default function Layout({ children }: LayoutProps) {
    return <>{children}</>;
}
