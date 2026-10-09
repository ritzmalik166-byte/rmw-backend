"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../../../components/WebDevelopment/webDevelopment.module.css";
import {
  HiChevronRight,
  HiCodeBracket,
  HiDocumentText,
  HiFaceSmile,
  HiHomeModern,
  HiLightBulb,
  HiMegaphone,
  HiNewspaper,
  HiStar,
} from "react-icons/hi2";
import {
  SERVICES_MEGA_MENU_CATEGORIES,
  SERVICES_MEGA_TAGLINE,
} from "./servicesMegaMenuData";
import { markRenderingServiceScrollIntentFromHref } from "../services/3d-rendering-services/service-tab-slugs";

const GOLD = "#C59D4F";

function megaMenuServiceClick(
  href: string,
  onNavigate?: () => void
) {
  markRenderingServiceScrollIntentFromHref(href);
  onNavigate?.();
}

function megaMenuLinkProps(href: string) {
  if (
    href.startsWith("/services/3d-rendering-services/") ||
    href.includes("#")
  ) {
    return { scroll: false as const };
  }

  return { target: "_blank" as const, rel: "noopener noreferrer" };
}

const CATEGORY_IMAGE_MAP: Record<string, string> = {
  "creative-services": "/varun.icon/creative-service.svg",
  "print-advertising": "/varun.icon/print.svg",
  "radio-advertising": "/varun.icon/radio.svg",
  "content-marketing": "/varun.icon/content-marketing.svg",
  "web-development": "/varun.icon/webdevelopment.svg",
  "celebrity-endorsements": "/varun.icon/celebrity.svg",
  "influencer-marketing": "/varun.icon/influenecer.svg",
  // "real-estate-walkthrough": "/varun.icon/real.svg",
  "3d-rendering-services": "/varun.icon/rendering-service.svg",
  "digital-marketing": "/varun.icon/digital.svg",
};

function RadioServiceIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 10v4a2 2 0 002 2h2l4 3v-14l-4 3H6a2 2 0 00-2 2z" />
      <path d="M16 8.5a5 5 0 010 7" />
      <path d="M18.5 6a8 8 0 010 12" />
    </svg>
  );
}

function CategoryIcon({
  categoryId,
  active,
}: {
  categoryId: string;
  active: boolean;
}) {
  const cls = `h-5 w-5 shrink-0 ${active ? "text-white" : "text-neutral-700"}`;
  switch (categoryId) {
    case "digital-marketing":
      return <HiMegaphone className={cls} aria-hidden />;
    case "creative-services":
      return <HiLightBulb className={cls} aria-hidden />;
    case "print-advertising":
      return <HiNewspaper className={cls} aria-hidden />;
    case "radio-advertising":
      return <RadioServiceIcon className={cls} />;
    case "content-marketing":
      return <HiDocumentText className={cls} aria-hidden />;
    case "web-development":
      return <HiCodeBracket className={cls} aria-hidden />;
    case "celebrity-endorsements":
      return <HiStar className={cls} aria-hidden />;
    case "influencer-marketing":
      return <HiFaceSmile className={cls} aria-hidden />;
    case "real-estate-walkthrough":
      return <HiDocumentText className={cls} aria-hidden />;
    case "3d-rendering-services":
      return <HiLightBulb className={cls} aria-hidden />;
    default:
      return <HiDocumentText className={cls} aria-hidden />;
  }
}

function CategoryAvatar({
  categoryId,
  categoryName,
  active,
  size = "sm",
}: {
  categoryId: string;
  categoryName: string;
  active: boolean;
  size?: "sm" | "lg";
}) {
  const wrapperSize = size === "lg" ? "h-[17px] w-[17px]" : "h-6 w-6";
  const imageSize = size === "lg" ? 30 : 22;
  const imageSrc = CATEGORY_IMAGE_MAP[categoryId];
  if (imageSrc) {
    return (
      <span
        className={`relative flex ${wrapperSize} shrink-0 items-center justify-center overflow-hidden transition-colors duration-200 ${
          active ? "" : ""
        }`}
      >
        <Image
          src={imageSrc}
          alt={categoryName}
          title={categoryName}
          width={imageSize}
          height={imageSize}
          className={`h-full w-full object-contain transition-[filter] duration-200 ${
            active ? "brightness-0 invert" : "brightness-0"
          }`}
        />
      </span>
    );
  }

  return (
    <span
      className={`flex ${wrapperSize} shrink-0 items-center justify-center transition-colors duration-200 ${
        active ? "" : ""
      }`}
    >
      <CategoryIcon categoryId={categoryId} active={active} />
    </span>
  );
}

function ServiceThumb({ src, title }: { src?: string; title: string }) {
  if (src) {
    return (
      <div className="relative h-17 w-17 shrink-0 overflow-hidden rounded-[12px]">
        <Image
          src={src}
          alt=""
          width={65}
          height={65}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#C59D4F]/20 to-neutral-200/90 text-xs font-bold text-neutral-600"
      aria-hidden
    >
      {title.replace(/[^A-Z]/g, "").slice(0, 3) || "•"}
    </div>
  );
}

function FooterInsights() {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4  bg-[#F7F7FE] px-4 py-4 sm:grid-cols-3 sm:px-5 sm:py-4 rounded-sm">
      <div>
        <p
          className={`${styles.montserrat} text-[20px] font-semibold text-black sm:text-[15px]`}
        >
          Your Partner in Digital <br /> Growth
        </p>
        <p
          className={`mt-1 text-[14px] leading-snug text-[#373737] sm:text-[13px] ${styles.fontopensans}`}
        >
          Where brands grow faster online
        </p>
      </div>
      <div className="flex gap-3 sm:items-start">
        <svg
          className="mt-0.5 h-6 w-6 shrink-0 sm:h-10 sm:w-10 p-1 rounded-lg bg-white"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden
        >
          <path
            d="M4 24 L10 16 L16 20 L28 8"
            stroke={GOLD}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 8h6v6"
            stroke={GOLD}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div>
          <p
            className={`text-[14px] md:text-[15px] font-semibold text-neutral-900 ${styles.montserrat} `}
          >
            High ROI Marketing
          </p>
          <p
            className={`mt-1 text-[12px] leading-snug text-[#373737] sm:text-[13px] ${styles.fontopensans}`}
          >
            Maximize leads and conversions efficiently
          </p>
        </div>
      </div>
      <div className="flex gap-3 sm:items-start">
        <Image
          src="/navbar/data-driven.png"
          alt=""
          width={32}
          height={32}
          className="mt-0.5 shrink-0 sm:h-10 sm:w-10 p-1 rounded-lg bg-white"
        />
        <div>
          <p
            className={`text-[14px] font-semibold text-neutral-900 sm:text-[15px] ${styles.montserrat} `}
          >
            Data Driven Strategy
          </p>
          <p
            className={`mt-1 text-[12px] leading-snug text-[#373737] sm:text-[13px] ${styles.fontopensans}`}
          >
            Decisions powered by real insights
          </p>
        </div>
      </div>
    </div>
  );
}

type MegaMenuPanelProps = {
  activeCategoryIndex: number;
  onCategoryChange: (index: number) => void;
  onNavigate?: () => void;
};

export function ServicesMegaMenuPanel({
  activeCategoryIndex,
  onCategoryChange,
  onNavigate,
}: MegaMenuPanelProps) {
  const cat = SERVICES_MEGA_MENU_CATEGORIES[activeCategoryIndex];
  const subServiceGridCols =
    cat.id === "3d-rendering-services"
      ? "sm:grid-cols-3"
      : "sm:grid-cols-2";
  if (!cat) return null;

  return (
    <div className="flex max-h-[min(78vh,720px)] flex-col overflow-hidden  bg-white  shadow-[0_2px_10px_rgba(136,136,136,0.25)] ">
      <div className="shrink-0 px-5 pb-3 pt-4 sm:px-8 sm:pb-0 sm:pt-5 lg:px-10">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-4">
          <p
            className={`${styles.montserrat} text-2xl tracking-tight font-[600]  sm:text-[24px]`}
          >
            Services
          </p>
          <p
            className={`text-sm  sm:pb-0.5 sm:text-[14px] ${styles.fontopensans}`}
          >
            {SERVICES_MEGA_TAGLINE}
          </p>
        </div>
        <div
          className="mt-3 h-[2px] w-full sm:mt-4"
          style={{ backgroundColor: "#C99237" }}
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain lg:flex lg:flex-col">
        <div className="grid flex-1 grid-cols-1 gap-6 px-5 py-5 sm:px-8 sm:py-1 lg:min-h-full lg:grid-cols-[minmax(200px,23%)_1fr] lg:gap-0 lg:px-10 lg:overflow-visible">
          <nav
            className="relative z-10 flex min-w-0 flex-col gap-0.5 overflow-visible lg:self-start pt-5 lg:pt-3"
            aria-label="Service categories"
          >
            {SERVICES_MEGA_MENU_CATEGORIES.map((c, i) => {
              const active = i === activeCategoryIndex;
              return (
                <Link
                  key={c.id}
                  href={c.href}
                  title={c.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onNavigate}
                  onMouseEnter={() => onCategoryChange(i)}
                  onFocus={() => onCategoryChange(i)}
                  className={`group flex items-center gap-3 rounded-full px-3 py-2.5 text-left lg:px-4 lg:py-2.5 ${
                    active
                      ? "text-white shadow-md lg:relative lg:z-20 lg:-mr-3 "
                      : "text-black hover:bg-neutral-100 "
                  }`}
                  style={
                    active
                      ? { backgroundColor: "#C99237" }
                      : { backgroundColor: "transparent" }
                  }
                >
                  <CategoryAvatar
                    categoryId={c.id}
                    categoryName={c.name}
                    active={active}
                    size="lg"
                  />
                  <span
                    className={`${styles.montserrat}  ${active ? "font-[700]" : "font-[500]"} min-w-0 flex-1 text-[14px] font-[500] leading-snug lg:text-[13px] xl:text-[15px]`}
                  >
                    {c.name}
                  </span>
                  <div className="relative h-[29px] w-[29px]">
                    <Image
                      src="/navbar/arrow.png"
                      alt=""
                      fill
                      aria-hidden
                      className={`object-contain transition-opacity ${
                        active
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="flex min-w-0 flex-col border-t border-[#D9D9D9] pt-5 lg:relative lg:z-0 lg:-ml-2 lg:h-full lg:min-h-0 lg:border-l lg:border-[#D9D9D9] lg:border-t-0 lg:pl-14 lg:pt-10">
            <div className="min-w-0 lg:flex-1 lg:min-h-0">
              <div
                className={`grid grid-cols-1 gap-x-0 gap-y-4 ${subServiceGridCols} sm:gap-y-5`}
              >
                {cat.services.map((svc) => (
                  <Link
                    key={svc.href + svc.title}
                    href={svc.href}
                    title={svc.title}
                    {...megaMenuLinkProps(svc.href)}
                    onClick={() => megaMenuServiceClick(svc.href, onNavigate)}
                    className="flex gap-5 rounded-lg transition-colors duration-200 hover:bg-neutral-50"
                  >
                    <ServiceThumb
                      src={svc.image ?? CATEGORY_IMAGE_MAP[cat.id]}
                      title={svc.title}
                    />
                    <div className="flex items-center">
                      <div className="min-w-0 flex-1">
                        <p
                          className={`lg:text-[13px] xl:text-[15px] font-[600] leading-[27px]  ${styles.montserrat}`}
                        >
                          {svc.title}
                        </p>
                        <p
                          className={` ${styles.fontopensans} mt-0.5 lg:text-[13px] xl:text-[14px] leading-snug text-[#585757] line-clamp-2`}
                        >
                          {svc.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-4 shrink-0 lg:mt-auto py-4">
              <FooterInsights />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type MobileAccordionProps = {
  openCategoryIndex: number | null;
  onToggleCategory: (index: number) => void;
  onNavigate?: () => void;
};

export function ServicesMegaMenuMobileAccordion({
  openCategoryIndex,
  onToggleCategory,
  onNavigate,
}: MobileAccordionProps) {
  return (
    <div className="space-y-2 pb-2">
      {SERVICES_MEGA_MENU_CATEGORIES.map((c, i) => {
        const open = openCategoryIndex === i;
        return (
          <div
            key={c.id}
            className="overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm"
          >
            <div className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-neutral-50">
              <button
                type="button"
                onClick={() => window.open(c.href, "_blank")}
                className="shrink-0 border-0 bg-transparent p-0 text-left"
                aria-label={`Open ${c.name} (new tab)`}
              >
                <CategoryAvatar
                  categoryId={c.id}
                  categoryName={c.name}
                  active={false}
                />
              </button>
              <Link
                href={c.href}
                
                title={c.name}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 font-[700] text-[15px] text-neutral-900"
              >
                {c.name}
              </Link>
              <button
                type="button"
                aria-expanded={open}
                aria-label={open ? `Collapse ${c.name}` : `Expand ${c.name}`}
                onClick={() => onToggleCategory(i)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-[#C59D4F]"
              >
                <HiChevronRight
                  className={`h-5 w-5 transition-transform duration-200 ${
                    open ? "rotate-90 text-[#C59D4F]" : ""
                  }`}
                  aria-hidden
                />
              </button>
            </div>
            {open && (
              <div className="border-t border-neutral-100 bg-neutral-50/50 px-3 py-3 sm:px-4">
                {/* <Link
                  href={c.href}
                  onClick={onNavigate}
                  className="mb-3 block text-center text-sm font-[600] text-[#C59D4F] underline-offset-2 hover:underline"
                >
                  View all {c.name}
                </Link> */}
                <div
                  className={`grid grid-cols-1 gap-2 ${
                    c.id === "3d-rendering-services"
                      ? "xs:grid-cols-3"
                      : "xs:grid-cols-2"
                  }`}
                >
                  {c.services.map((svc) => (
                    <Link
                      key={svc.href + svc.title}
                      href={svc.href}
                      title={`View all ${c.name}`}
                      {...megaMenuLinkProps(svc.href)}
                      onClick={() => megaMenuServiceClick(svc.href, onNavigate)}
                      className="flex gap-2.5 rounded-lg border border-transparent bg-white p-2.5  transition-colors hover:border-[#C59D4F]/30"
                    >
                      <ServiceThumb
                        src={svc.image ?? CATEGORY_IMAGE_MAP[c.id]}
                        title={svc.title}
                      />
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-[15px] font-[600] leading-snug  ${styles.montserrat}`}
                        >
                          {svc.title}
                        </p>
                        <p
                          className={` ${styles.fontopensans} mt-0.5 text-[14px] leading-snug text-[#585757] line-clamp-2`}
                        >
                          {svc.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
