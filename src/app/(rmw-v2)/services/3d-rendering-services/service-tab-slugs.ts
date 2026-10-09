export const RENDERING_SERVICES_BASE_PATH = "/services/3d-rendering-services";
export const RENDERING_SERVICES_SECTION_ID = "our-3d-rendering-services";

export const RENDERING_SERVICE_TAB_SLUGS = [
    "3d-exterior-rendering",
    "3d-interior-rendering",
    "aerial-township",
    "3d-floor-plan-rendering",
    "amenity-landscape-rendering",
] as const;

export type RenderingServiceTabSlug = (typeof RENDERING_SERVICE_TAB_SLUGS)[number];

export function isRenderingServiceTabSlug(slug: string): slug is RenderingServiceTabSlug {
    return (RENDERING_SERVICE_TAB_SLUGS as readonly string[]).includes(slug);
}

export function renderingServiceHref(slug: RenderingServiceTabSlug): string {
    return `${RENDERING_SERVICES_BASE_PATH}/${slug}`;
}

export function getRenderingServiceTabSlugFromPathname(pathname: string): RenderingServiceTabSlug | null {
    const prefix = `${RENDERING_SERVICES_BASE_PATH}/`;
    if (!pathname.startsWith(prefix)) return null;

    const slug = pathname.slice(prefix.length).split("/")[0]?.toLowerCase();
    if (!slug || !isRenderingServiceTabSlug(slug)) return null;

    return slug;
}

export function getRenderingServiceTabIndexFromSlug(slug: string): number | null {
    if (!isRenderingServiceTabSlug(slug)) return null;
    return RENDERING_SERVICE_TAB_SLUGS.indexOf(slug);
}

export function resolveRenderingServiceTabIndex(
    pathname: string,
    initialTabSlug?: RenderingServiceTabSlug
): number {
    if (initialTabSlug) {
        const fromSlug = getRenderingServiceTabIndexFromSlug(initialTabSlug);
        if (fromSlug !== null) return fromSlug;
    }

    return getRenderingServiceTabIndexFromPathname(pathname) ?? 0;
}

export function getRenderingServiceTabIndexFromPathname(pathname: string): number | null {
    const slug = getRenderingServiceTabSlugFromPathname(pathname);
    if (!slug) return null;

    return RENDERING_SERVICE_TAB_SLUGS.indexOf(slug);
}

/** @deprecated Legacy hash URLs — use pathname helpers instead. */
export function getRenderingServiceTabIndex(hash: string): number | null {
    const slug = hash.replace(/^#/, "").toLowerCase();
    const index = RENDERING_SERVICE_TAB_SLUGS.indexOf(slug as RenderingServiceTabSlug);
    return index >= 0 ? index : null;
}

export function getRenderingServiceTabSlug(index: number): RenderingServiceTabSlug | null {
    return RENDERING_SERVICE_TAB_SLUGS[index] ?? null;
}

export function isRenderingServiceDeepLink(pathname: string): boolean {
    return getRenderingServiceTabIndexFromPathname(pathname) !== null;
}

export const RENDERING_SERVICE_SCROLL_INTENT_KEY = "rmw:3d-rendering-scroll-intent";

/** Set when a 3D sub-service is chosen from the site menu (survives route cache). */
export function markRenderingServiceScrollIntent(slug: RenderingServiceTabSlug) {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(
        RENDERING_SERVICE_SCROLL_INTENT_KEY,
        `${Date.now()}:${slug}`
    );
}

export function markRenderingServiceScrollIntentFromHref(href: string) {
    const slug = getRenderingServiceTabSlugFromPathname(href);
    if (slug) markRenderingServiceScrollIntent(slug);
}

export function takeRenderingServiceScrollIntent(
    slug: RenderingServiceTabSlug,
    maxAgeMs = 20000
): boolean {
    if (typeof window === "undefined") return false;

    const raw = sessionStorage.getItem(RENDERING_SERVICE_SCROLL_INTENT_KEY);
    if (!raw) return false;

    const [ts, storedSlug] = raw.split(":");
    sessionStorage.removeItem(RENDERING_SERVICE_SCROLL_INTENT_KEY);

    if (storedSlug !== slug) return false;

    const age = Date.now() - Number(ts);
    return Number.isFinite(age) && age >= 0 && age <= maxAgeMs;
}

export function peekRenderingServiceScrollIntent(
    slug: RenderingServiceTabSlug,
    maxAgeMs = 20000
): boolean {
    if (typeof window === "undefined") return false;

    const raw = sessionStorage.getItem(RENDERING_SERVICE_SCROLL_INTENT_KEY);
    if (!raw) return false;

    const [ts, storedSlug] = raw.split(":");
    if (storedSlug !== slug) return false;

    const age = Date.now() - Number(ts);
    return Number.isFinite(age) && age >= 0 && age <= maxAgeMs;
}

/** Fixed navbar clearance when scrolling to the services block. */
export const RENDERING_SERVICES_SCROLL_OFFSET = 120;

export function scrollToRenderingServicesSection(
    sectionEl: HTMLElement | null,
    behavior: ScrollBehavior = "smooth"
) {
    if (!sectionEl || typeof window === "undefined") return;

    const scrollOnce = () => {
        const top =
            sectionEl.getBoundingClientRect().top +
            window.scrollY -
            RENDERING_SERVICES_SCROLL_OFFSET;

        window.scrollTo({
            top: Math.max(0, top),
            behavior,
        });
    };

    scrollOnce();
    requestAnimationFrame(scrollOnce);
    window.setTimeout(scrollOnce, 150);
    window.setTimeout(scrollOnce, 400);
    window.setTimeout(scrollOnce, 800);
    window.setTimeout(scrollOnce, 1200);
}
