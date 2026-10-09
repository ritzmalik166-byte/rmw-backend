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

  if (!path.startsWith("/services/")) {
    return `https://ritzmediaworld.com${fallbackPath}`;
  }

  return `https://ritzmediaworld.com${path}`;
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const serviceData = await fetchMeta(slug, "web-designing-and-development");

  if (!serviceData) {
    return {
      alternates: {
        canonical: `https://ritzmediaworld.com/services/web-designing-and-development/${slug}`,
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
        `/services/web-designing-and-development/${slug}`,
      ),
    },
  };
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
