"use client";

import pageStyles from "./page.module.css";

const GOOGLE_REVIEWS_URL = "https://share.google/ZGxv9MVrThm5TXQbc";

const STATS = [
    {
        number: "350+",
        title: "Satisfied Clients",
        desc: "Brands we've helped grow and succeed",
        variant: "gold-fill",
    },
    {
        number: "35+",
        title: "Awards",
        desc: "Passion, Obsession, and Persistence always pay off",
        variant: "gold-outline",
    },
    {
        number: "4.9",
        title: "Google reviews",
        sub: "★★★★★",
        isGoogle: true,
        variant: "white",
    },
    {
        number: "40+",
        title: "Service Categories",
        desc: "Designed to suit your growth needs at every stage",
        variant: "navy-fill",
    },
    {
        number: "17+",
        title: "Glorious Years",
        desc: "grueling hours that have led to remarkable branding success",
        variant: "navy-outline",
    },
];

function Section5() {
    return (
        <section className="w-full bg-white pb-[35px]  lg:pt-[70px]">
            <div
                className={`w-full ${pageStyles.containerWidth} max-w-[1300px] mx-auto`}
            >
                <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-6 lg:gap-7 xl:flex-nowrap xl:justify-center xl:gap-0">
                    {STATS.map((item, idx) => (
                        <div
                            key={item.title}
                            className={`
                w-[270px] h-[270px] min-w-[270px] min-h-[270px] max-w-[270px] max-h-[270px]
                mx-auto sm:mx-0
                rounded-full flex flex-col items-center justify-center
                text-center px-5 py-6
                ${idx === 1 ? "border border-[#C99237]" : idx === 4 ? "border border-[#0F1640]" : "border-0"} shrink-0
                ${idx === 0 ? "xl:ml-0" : "xl:-ml-8"}
                ${idx === 0 || idx === 2 ? "xl:z-30" : idx === 3 ? "xl:z-20" : "xl:z-10"}
                ${
                    item.variant === "gold-fill"
                        ? "bg-[#C99237] border-[#C99237] text-white"
                        : item.variant === "gold-outline"
                          ? "bg-white border-[#C99237] text-black"
                          : item.variant === "navy-fill"
                            ? "bg-[#0F1640] border-[#0F1640] text-white"
                            : item.variant === "navy-outline"
                              ? "bg-white border-[#0F1640] text-black"
                              : "bg-white border-gray-200 text-black"
                }
              `}
                            style={
                                item.isGoogle
                                    ? {
                                          boxShadow:
                                              "0px 0px 8px 0px #B5B5B540",
                                      }
                                    : undefined
                            }
                        >
                            {item.isGoogle ? (
                                <a
                                    href={GOOGLE_REVIEWS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="View Ritz Media World Google reviews"
                                    aria-label="View Ritz Media World Google reviews (opens in new tab)"
                                    className="inline-flex cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C99237]"
                                >
                                    <img
                                        src="/varunimage/contact-page-google-review.png"
                                        alt="Google reviews 5.0 – Ritz Media World"
                                        title="Google reviews 5.0 – Ritz Media World"
                                        className="w-[250px] h-auto object-contain pointer-events-none"
                                    />
                                </a>
                            ) : (
                                <>
                                    <p
                                        className={`${
                                            idx === 0 ||
                                            idx === 1 ||
                                            idx === 3 ||
                                            idx === 4
                                                ? "text-[50px] leading-[100%] font-semibold text-current inline-flex flex-wrap items-baseline justify-center gap-1"
                                                : "text-4xl font-bold"
                                        } mb-3 text-center ${pageStyles.fontMontserrat}`}
                                    >
                                        {idx === 0 ||
                                        idx === 1 ||
                                        idx === 3 ||
                                        idx === 4 ? (
                                            <>
                                                {item.number.replace("+", "")}
                                                <span className="relative -top-[20px] inline-flex shrink-0 items-center justify-center">
                                                    <img
                                                        src={
                                                            item.variant ===
                                                                "gold-fill" ||
                                                            item.variant ===
                                                                "navy-fill"
                                                                ? "/varunimage/white-plus.png"
                                                                : "/varunimage/black-plus-contact.png"
                                                        }
                                                        alt="Plus sign"
                                                        title="Plus sign"
                                                        width={20}
                                                        height={20}
                                                        className="h-[20px] w-[20px] max-h-[20px] max-w-[20px] object-contain"
                                                    />
                                                </span>
                                            </>
                                        ) : (
                                            item.number
                                        )}
                                    </p>
                                    <p
                                        className={`${
                                            idx === 0 ||
                                            idx === 1 ||
                                            idx === 3 ||
                                            idx === 4
                                                ? "text-[18px] leading-[26px] font-semibold text-current"
                                                : "text-base font-semibold"
                                        } mb-1 text-center max-w-[180px] ${pageStyles.fontMontserrat}`}
                                    >
                                        {item.title}
                                    </p>
                                    <p
                                        className={`${
                                            idx === 0 ||
                                            idx === 1 ||
                                            idx === 3 ||
                                            idx === 4
                                                ? "text-[15px] leading-[24px] font-normal text-current max-w-[175px]"
                                                : `text-xs leading-snug ${
                                                      item.variant ===
                                                          "gold-fill" ||
                                                      item.variant ===
                                                          "navy-fill"
                                                          ? "text-white/90"
                                                          : "text-gray-600"
                                                  }`
                                        } mt-2 text-center ${pageStyles.fontopensans}`}
                                    >
                                        {item.desc}
                                    </p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Section5;
