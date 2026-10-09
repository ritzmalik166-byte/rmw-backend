import { notFound } from "next/navigation";
import Page from "../page";
import { isRenderingServiceTabSlug } from "../service-tab-slugs";

type SlugPageProps = {
    params: Promise<{ slug: string }>;
};

export default async function RenderingServiceSlugPage({ params }: SlugPageProps) {
    const { slug } = await params;

    if (!isRenderingServiceTabSlug(slug)) {
        notFound();
    }

    return <Page initialTabSlug={slug} />;
}
