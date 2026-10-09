import { getMetaOrThrow, getAllSlugs } from "@/lib/meta";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { secondPage: string };
}): Promise<Metadata> {
  try {
    const getParam = await params;
    const data = await getMetaOrThrow(getParam.secondPage, "serviceSecond");
    const canonicalUrl = `https://ritzmediaworld.com/services/${getParam.secondPage}`;
    return {
      title: data.meta_title,
      description: data.meta_description,
      keywords: data.meta_keywords,
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } catch {
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const slugs = (await getAllSlugs("serviceSecond")) as { slug: string }[];
    return slugs.map(({ slug }) => ({ secondPage: slug }));
  } catch (error) {
    console.warn(
      "[services/[secondPage]] generateStaticParams fallback to []:",
      error
    );
    return [];
  }
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { secondPage: string };
}) {
  try {
    const getParam = await params;
    await getMetaOrThrow(getParam.secondPage, "serviceSecond");
    return <>{children}</>;
  } catch {
    notFound();
  }
}
