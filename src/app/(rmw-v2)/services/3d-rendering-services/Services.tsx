"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import "./3dservice.css";
import React from "react";
import {
    getRenderingServiceTabIndex,
    getRenderingServiceTabIndexFromPathname,
    getRenderingServiceTabIndexFromSlug,
    getRenderingServiceTabSlug,
    getRenderingServiceTabSlugFromPathname,
    isRenderingServiceDeepLink,
    peekRenderingServiceScrollIntent,
    renderingServiceHref,
    resolveRenderingServiceTabIndex,
    RENDERING_SERVICES_SECTION_ID,
    scrollToRenderingServicesSection,
    takeRenderingServiceScrollIntent,
    type RenderingServiceTabSlug,
} from "./service-tab-slugs";

type Services3DProps = {
    initialTabSlug?: RenderingServiceTabSlug;
};

function serviceImageSrc(filename: string): string {
    return `/services/3drendring/${encodeURIComponent(filename)}`;
}

const accent = "#C99237";



type ServiceTab = {
    num: string;
    slug: RenderingServiceTabSlug;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    features: { label: string; icon: string }[];
};

const services: ServiceTab[] = [
    {
        num: "01",
        slug: "3d-exterior-rendering",
        title: "3D Exterior Rendering",
        description:
            "Get to experience the architecture, facade materials, landscaping, and site of the building through photo-realistic exterior renderings that provide unmatched clarity. The right option for pre-launch marketing, investor portfolio and collateral.",
        image: serviceImageSrc("F8.png"),
        imageAlt: "Modern residential complex 3D exterior visualization",
        features: [
            { label: "Residential Apartments", icon: "/services/3drendring/processicon/service1/service1.png" },
            { label: "Villas Bungalows", icon: "/services/3drendring/processicon/service1/service2.png" },
            { label: "Commercial Towers", icon: "/services/3drendring/processicon/service1/service3.png" },
            { label: "Townships", icon: "/services/3drendring/processicon/service1/service4.png" },
        ],
    },
    {
        num: "02",
        slug: "3d-interior-rendering",
        title: "3D Interior Rendering",
        description:
            "Real-to-life living & dining rooms, master bedrooms, kitchens and commercial spaces are vividly depicted through interiors that display proper lighting, texture of material, furniture and décor. A prime service for luxury and high-end residences.",
        image: serviceImageSrc("interior.png"),
        imageAlt: "Luxury interior 3D visualization",
        features: [
            { label: "Living Dining Spaces", icon: "/services/3drendring/processicon/service2/service1.png" },
            { label: "Master Bedrooms", icon: "/services/3drendring/processicon/service2/service2.png" },
            { label: "Kitchens Bathrooms", icon: "/services/3drendring/processicon/service2/service3.png" },
            { label: "Office Interiors", icon: "/services/3drendring/processicon/service2/service4.png" },
        ],
    },
    {
        num: "03",
        slug: "aerial-township",
        title: "Aerial & Township",
        description:
            "3D Master plans and bird's-eye view renderings will effectively and realistically depict the overall planning, grandeur and scale of plots, mixed use development projects and entire townships. An excellent tool for the government submissions, investor pitch and RERA filing.",
        image: serviceImageSrc("Site f2.jpeg"),
        imageAlt: "Aerial view of urban township development",
        features: [
            { label: "Master Plan Views", icon: "/services/3drendring/processicon/service3/service1.png" },
            { label: "Aerial Perspectives", icon: "/services/3drendring/processicon/service3/service2.png" },
            { label: "Site Layout Renders", icon: "/services/3drendring/processicon/service3/service3.png" },
            { label: "Township Visualization", icon: "/services/3drendring/processicon/service3/service4.png" },
        ],
    },
    {
        num: "04",
        slug: "3d-floor-plan-rendering",
        title: "3D Floor Plan Rendering",
        description:
            "The most simplified and easily understandable form of floor plan design is the 3D floor plan which helps avoid ambiguity on the site during a site visit by depicting the layout, furnishing and texture. Suitable for unit floor plans, 3D cut-away views, furnished layouts, and commercial space plans.",
        image: serviceImageSrc("Floor-Plan-new.png"),
        imageAlt: "3D floor plan visualization",
        features: [
            { label: "Unit Floor Plans", icon: "/services/3drendring/processicon/service4/service1.png" },
            { label: "3D Cut-Away Views", icon: "/services/3drendring/processicon/service4/service2.png" },
            { label: "Furnished Layouts", icon: "/services/3drendring/processicon/service4/service3.png" },
            { label: "Commercial Space Plans", icon: "/services/3drendring/processicon/service4/service4.png" },
        ],
    },
    {
        num: "05",
        slug: "amenity-landscape-rendering",
        title: "Amenity & Landscape Rendering",
        description:
            "The best selling tool for any residential project, be it the exclusive renderings of club houses, swimming pools, manicured gardens, play zones, gyms and rooftops which are a major draw.",
        image: serviceImageSrc("f3.jpeg"),
        imageAlt: "Amenity and landscape 3D rendering",
        features: [
            { label: "Clubhouse Renders", icon: "/services/3drendring/processicon/service5/service1.png" },
            { label: "Pool Landscape", icon: "/services/3drendring/processicon/service5/service2.png" },
            { label: "Gym Co-working", icon: "/services/3drendring/processicon/service5/service3.png" },
            { label: "Rooftop Terrace", icon: "/services/3drendring/processicon/service5/service4.png" },
        ],
    },
];


function scrollTabIntoContainer(
    container: HTMLElement | null,
    tabEl: HTMLElement | null,
    smooth: boolean
) {
    if (!container || !tabEl) return;

    const tabItem =
        tabEl.classList.contains("services-tab-item")
            ? tabEl
            : tabEl.closest<HTMLElement>(".services-tab-item");
    if (!tabItem) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = tabItem.getBoundingClientRect();
    const targetLeft =
        container.scrollLeft +
        (tabRect.left - containerRect.left) -
        (container.clientWidth - tabRect.width) / 2;

    container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: smooth ? "smooth" : "auto",
    });
}

function focusActiveTabInStrip(
    getRefs: () => { container: HTMLElement | null; tabItem: HTMLElement | null },
    smooth: boolean,
    attempt = 0
) {
    const { container, tabItem } = getRefs();

    if (tabItem && container) {
        scrollTabIntoContainer(container, tabItem, smooth);
        return;
    }

    if (attempt >= 20) return;

    requestAnimationFrame(() => {
        focusActiveTabInStrip(getRefs, smooth, attempt + 1);
    });
}

function readActiveIndexFromLocation(initialTabSlug?: RenderingServiceTabSlug): number {
    if (typeof window === "undefined") {
        return initialTabSlug
            ? (getRenderingServiceTabIndexFromSlug(initialTabSlug) ?? 0)
            : 0;
    }

    return resolveRenderingServiceTabIndex(window.location.pathname, initialTabSlug);
}

function resolveActiveIndex(
    pathname: string,
    initialTabSlug?: RenderingServiceTabSlug
): number {
    const fromPath = getRenderingServiceTabIndexFromPathname(pathname);
    if (fromPath !== null) return fromPath;

    if (typeof window !== "undefined") {
        const fromWindow = getRenderingServiceTabIndexFromPathname(window.location.pathname);
        if (fromWindow !== null) return fromWindow;
    }

    if (initialTabSlug) {
        const fromSlug = getRenderingServiceTabIndexFromSlug(initialTabSlug);
        if (fromSlug !== null) return fromSlug;
    }

    return 0;
}

export default function Services3D({ initialTabSlug }: Services3DProps = {}) {
    const pathname = usePathname();
    const [active, setActive] = useState(() =>
        resolveActiveIndex(
            typeof window !== "undefined" ? window.location.pathname : pathname,
            initialTabSlug
        )
    );
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const tabItemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const tabListRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);
    const deepLinkScrollTimer = useRef<number | null>(null);
    const [canScrollTabsLeft, setCanScrollTabsLeft] = useState(false);
    const [canScrollTabsRight, setCanScrollTabsRight] = useState(false);

    const current = services[active];

    const updateTabScrollState = useCallback(() => {
        const el = tabListRef.current;
        if (!el) return;
        const maxScroll = el.scrollWidth - el.clientWidth;
        setCanScrollTabsLeft(el.scrollLeft > 4);
        setCanScrollTabsRight(el.scrollLeft < maxScroll - 4);
    }, []);

    const scrollTabs = useCallback((direction: "left" | "right") => {
        const el = tabListRef.current;
        if (!el) return;
        const step = Math.max(220, Math.round(el.clientWidth * 0.65));
        el.scrollBy({
            left: direction === "left" ? -step : step,
            behavior: "smooth",
        });
    }, []);

    const updateTabUrl = useCallback((slug: RenderingServiceTabSlug) => {
        if (typeof window === "undefined") return;

        const nextPath = renderingServiceHref(slug);
        if (window.location.pathname !== nextPath) {
            window.history.replaceState(null, "", nextPath);
        }
    }, []);

    const showActiveTabInStrip = useCallback((index: number, smooth = true) => {
        focusActiveTabInStrip(
            () => ({
                container: tabListRef.current,
                tabItem: tabItemRefs.current[index] ?? null,
            }),
            smooth
        );
    }, []);

    const selectTab = useCallback((index: number, options?: { updateUrl?: boolean }) => {
        setActive(index);
        showActiveTabInStrip(index);

        if (options?.updateUrl === false) return;

        const slug = getRenderingServiceTabSlug(index);
        if (slug) updateTabUrl(slug);
    }, [showActiveTabInStrip, updateTabUrl]);

    const scrollToServicesSection = useCallback((index: number) => {
        if (deepLinkScrollTimer.current !== null) {
            window.clearTimeout(deepLinkScrollTimer.current);
        }

        const runScroll = () => {
            showActiveTabInStrip(index, false);
            scrollToRenderingServicesSection(sectionRef.current, "smooth");
            window.setTimeout(() => showActiveTabInStrip(index, false), 400);
            window.setTimeout(() => showActiveTabInStrip(index, false), 900);
        };

        runScroll();
        deepLinkScrollTimer.current = window.setTimeout(runScroll, 250);
    }, [showActiveTabInStrip]);

    const applyDeepLinkTab = useCallback(
        (index: number, shouldScroll: boolean) => {
            setActive(index);
            showActiveTabInStrip(index, false);

            if (shouldScroll) {
                scrollToServicesSection(index);
            }
        },
        [scrollToServicesSection, showActiveTabInStrip]
    );

    useLayoutEffect(() => {
        const legacyHashIndex = getRenderingServiceTabIndex(window.location.hash);
        if (legacyHashIndex !== null) {
            const slug = getRenderingServiceTabSlug(legacyHashIndex);
            if (slug) {
                window.history.replaceState(null, "", renderingServiceHref(slug));
                setActive(legacyHashIndex);
                showActiveTabInStrip(legacyHashIndex, false);
            }
            return;
        }

        const index = resolveActiveIndex(pathname, initialTabSlug);
        const windowIndex =
            typeof window !== "undefined"
                ? getRenderingServiceTabIndexFromPathname(window.location.pathname)
                : null;
        const effectiveIndex = windowIndex ?? index;

        if (
            isRenderingServiceDeepLink(pathname) ||
            initialTabSlug ||
            windowIndex !== null
        ) {
            setActive(effectiveIndex);
            showActiveTabInStrip(effectiveIndex, false);
        }
    }, [pathname, initialTabSlug, showActiveTabInStrip]);

    useEffect(() => {
        const slugFromPath =
            getRenderingServiceTabSlugFromPathname(pathname) ??
            (typeof window !== "undefined"
                ? getRenderingServiceTabSlugFromPathname(window.location.pathname)
                : null);
        const slug = slugFromPath ?? initialTabSlug ?? null;

        if (!slug) return;

        const index = resolveActiveIndex(pathname, initialTabSlug);
        const fromMenu = takeRenderingServiceScrollIntent(slug);
        const isDeepLink =
            isRenderingServiceDeepLink(pathname) ||
            initialTabSlug !== undefined ||
            fromMenu;

        if (isDeepLink) {
            applyDeepLinkTab(index, true);
        }
    }, [pathname, initialTabSlug, applyDeepLinkTab]);

    useEffect(() => {
        const handlePageshow = () => {
            const slug = getRenderingServiceTabSlugFromPathname(window.location.pathname);
            if (!slug || !peekRenderingServiceScrollIntent(slug)) return;

            const index = getRenderingServiceTabIndexFromSlug(slug) ?? 0;
            applyDeepLinkTab(index, takeRenderingServiceScrollIntent(slug));
        };

        window.addEventListener("pageshow", handlePageshow);
        return () => window.removeEventListener("pageshow", handlePageshow);
    }, [applyDeepLinkTab]);

    useEffect(() => {
        const onPopState = () => {
            const index = readActiveIndexFromLocation(initialTabSlug);
            setActive(index);
            showActiveTabInStrip(index, false);
        };

        window.addEventListener("popstate", onPopState);
        return () => {
            window.removeEventListener("popstate", onPopState);
            if (deepLinkScrollTimer.current !== null) {
                window.clearTimeout(deepLinkScrollTimer.current);
            }
        };
    }, [initialTabSlug, showActiveTabInStrip]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
            let next = index;
            if (e.key === "ArrowRight") next = (index + 1) % services.length;
            else if (e.key === "ArrowLeft") next = (index - 1 + services.length) % services.length;
            else if (e.key === "Home") next = 0;
            else if (e.key === "End") next = services.length - 1;
            else return;
            e.preventDefault();
            selectTab(next);
            tabRefs.current[next]?.focus();
        },
        [selectTab]
    );

    useEffect(() => {
        showActiveTabInStrip(active, false);
    }, [active, showActiveTabInStrip]);

    useEffect(() => {
        const el = tabListRef.current;
        if (!el) return;

        updateTabScrollState();

        const onScroll = () => updateTabScrollState();
        el.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        const observer = new ResizeObserver(onScroll);
        observer.observe(el);

        return () => {
            el.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            observer.disconnect();
        };
    }, [updateTabScrollState]);

    return (

        <section
            ref={sectionRef}
            id={RENDERING_SERVICES_SECTION_ID}
            className="scroll-mt-28 bg-white px-4 pb-[35px] sm:px-6 md:pb-[70px]"
        >
            <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
                <header className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] sm:text-sm"
                        style={{ color: accent }}>
                        Services
                    </p>

                    <h2 className=" text-center text-[30px] pt-1 sm:text-[45px] md:text-[45px]  
          font-semibold leading-[36px] font-weight-600 text-[#111111]
     md:leading-[42px] "
                        style={{
                            fontFamily: "MontserratRegular, Montserrat, sans-serif",
                            fontWeight: 600,
                        }}
                    >
                        Our 3D Rendering Services
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl font-regular font-weight-400 text-sm leading-7 text-[#111111] sm:text-base md:text-lg md:leading-8">
                        We create your ideas into 3D visualizations &amp; make your projects valuable, attract
                        buyers and drive faster sales.
                    </p>
                </header>

                <div className="mt-5">
                    <div className="-mx-4 flex items-stretch gap-1 px-4 sm:mx-0 sm:gap-2 sm:px-0">
                        <button
                            type="button"
                            className="services-tab-nav-btn self-center"
                            onClick={() => scrollTabs("left")}
                            disabled={!canScrollTabsLeft}
                            aria-label="Scroll service tabs left"
                        >
                            <ChevronLeft className="h-5 w-5" aria-hidden />
                        </button>
                        <div
                            ref={tabListRef}
                            role="tablist"
                            aria-label="3D rendering service types"
                            className="services-tabs-scroll flex min-w-0 flex-1 flex-nowrap gap-6 overflow-x-auto overflow-y-hidden border-b border-[#e5e5e5] sm:gap-10 md:gap-14 lg:gap-20 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {services.map((tab, i) => {
                                const isActive = i === active;
                                return (
                                    <div
                                        key={tab.title}
                                        ref={(el) => {
                                            tabItemRefs.current[i] = el;
                                        }}
                                        className={`services-tab-item relative min-w-[min(78vw,260px)] shrink-0 sm:min-w-[200px] md:min-w-[240px] lg:min-w-[280px] xl:min-w-max ${isActive ? "services-tab-active" : ""}`}
                                    >
                                        <span
                                            className="pointer-events-none block px-3 pt-4 text-left text-xs font-normal text-[#9ca3af] sm:px-4 sm:text-sm xl:px-6"
                                            aria-hidden="true"
                                        >
                                            {tab.num}
                                        </span>
                                        <h3
                                            id={`service-tab-heading-${i}`}
                                            className="services-tab-title pointer-events-none m-0 whitespace-nowrap px-3 pb-4 text-[15px] font-bold leading-snug text-[#111111] sm:px-4 sm:text-base md:text-[28px] md:leading-[36px] lg:text-[32px] lg:leading-[42px] xl:px-6"
                                        >
                                            {tab.title}
                                        </h3>
                                        <button
                                            ref={(el) => {
                                                tabRefs.current[i] = el;
                                            }}
                                            type="button"
                                            role="tab"
                                            aria-selected={isActive}
                                            aria-labelledby={`service-tab-heading-${i}`}
                                            id={`service-tab-${i}`}
                                            aria-controls={`service-panel-${i}`}
                                            tabIndex={isActive ? 0 : -1}
                                            onClick={() => selectTab(i)}
                                            onKeyDown={(e) => onKeyDown(e, i)}
                                            className="services-tab-hit absolute inset-0 z-10 cursor-pointer border-0 bg-transparent p-0"
                                        >
                                            <span className="sr-only">{tab.title}</span>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        <button
                            type="button"
                            className="services-tab-nav-btn self-center"
                            onClick={() => scrollTabs("right")}
                            disabled={!canScrollTabsRight}
                            aria-label="Scroll service tabs right"
                        >
                            <ChevronRight className="h-5 w-5" aria-hidden />
                        </button>
                    </div>
                </div>

                <div
                    key={active}
                    role="tabpanel"
                    id={`service-panel-${active}`}
                    aria-labelledby={`service-tab-heading-${active}`}
                    className="services-panel-enter mt-8 grid grid-cols-1 
                    gap-8 lg:mt-10 lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-14"
                >
                    <div className="relative w-full overflow-hidden bg-[#f5f5f5]">
                        <img
                            src={current.image}
                            alt={current.imageAlt}
                            title={current.imageAlt}
                            className="h-auto min-h-[220px] w-full object-cover sm:min-h-[280px] md:min-h-[340px] lg:h-[407px] lg:min-h-0"
                        />
                    </div>

                    <div className="flex flex-col max-w-[500px] justify-center items-center">
                        <p className="text-left font-regular font-weight-400 text-sm leading-relaxed text-[#111111] sm:text-base md:text-[18px] md:leading-8">
                            {current.description}
                        </p>

                        <ul className="services-tabs-scroll mt-8 flex w-full gap-6 overflow-x-auto pb-1 md:mt-10 md:gap-8 lg:mt-12">
                            {current.features.map((f) => (
                                <li
                                    key={f.label}
                                    className="flex md:min-w-[4.5rem] min-w-[4.5rem] shrink-0 flex-col items-start text-left sm:min-w-[6.5rem]"
                                >
                                    <img
                                        src={f.icon}
                                        alt={f.label}
                                        title={f.label}
                                        className="w-10 h-10 object-contain"
                                    />
                                    <span
                                        className="mt-3 text-[10px] font-semibold uppercase leading-snug tracking-wide sm:text-[11px]"
                                        style={{ color: accent }}
                                    >
                                        {
                                            f.label.split(' ').map((word, index) => (
                                                <React.Fragment key={index}>
                                                    {word}
                                                    <br />
                                                </React.Fragment>
                                            ))
                                        }
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
