export type ServiceSecondMeta = {
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    link: string | null;
};

function getPublicOrigin(): string {
    const raw =
        process.env.NEXT_PUBLIC_BASE_URL ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
        "http://localhost:3000";
    return raw.replace(/\/$/, "");
}

export async function fetchMeta(link: string, slug: string): Promise<ServiceSecondMeta | null> {
    const trimmed = link.trim();
    if (!trimmed) return null;

    const origin = getPublicOrigin();
    const url2 = `${origin}/api/get_meta_info/${encodeURIComponent(trimmed)}/${slug}`;
    // console.log("url2", url2);
    try {
        const res2 = await fetch(url2, {
            method: "GET",
            headers: { Accept: "application/json" },
            next: { revalidate: 3600 },
        });
        const data2 = await res2.json();

        // console.log("data2", data2);

        const meta_data = data2.data || null;
        if (meta_data) {
            return {
                meta_title: meta_data.meta_title,
                meta_description: meta_data.meta_description,
                meta_keywords: meta_data.meta_keywords,
                link: meta_data.link,
            };
        } else {
            return null;
        }
    } catch (e) {
        console.error("fetchMeta error:", e);
        return null;
    }
}
