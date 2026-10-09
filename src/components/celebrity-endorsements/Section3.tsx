"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";
import accordionStyles from "./Section3.module.css";

const CELEBRITY_IMAGE = "/service-v3/celebrity-endorsements/s3/celebrity.jpg";
const EXPLORE_ARROW_IMAGE =
  "/service-v3/celebrity-endorsements/s3/group-105398.svg";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  image?: string;
};

const servicesData: ServiceItem[] = [
  {
    id: "01",
    title: "Celebrity Identification",
    href: "/services/celebrity-endorsements/celebrity-identification-services",
    image: "/varunimage/Celebrity-Identification-celebrity.jpg",
    description:
      "Choosing the right celebrity endorsement isn't luck, it's strategy. At Ritz Media World, we identify celebrities for brand endorsement which bears an image, values, and fan following that fully coincides with your brand. We make sure that every recommendation we offer is authentic, credible, conversion focused, turning celebrity fans into lifelong customers of your brand.",
  },
  {
    id: "02",
    title: "Contract Negotiations",
    href: "/services/celebrity-endorsements/negotiating-contracts",
    image: "/varunimage/Contract-%20Negotiations-celebrity.jpg",
    description:
      "Convincing celebrities to endorse is more precise than it is flair and showmanship. The professionals on our team offer you the best deal possible, managing costs and ensuring that every partnership is one of maximum value and minimum risk.",
  },
  {
    id: "03",
    title: "Campaign Integration",
    href: "/services/celebrity-endorsements/campaign-integration",
    image: "/varunimage/Campaign-Integration-celebrity.jpg",
    description:
      "Celebrity endorsements are pivotal when they seamlessly integrate. We utilize celebrity endorsements in all marketing channels to enhance effectiveness. We infuse the personality of a celebrity in all your advertising – digital, prints, radio, events and more – to make your investment of a celebrity 100 times effective.",
  },
  {
    id: "04",
    title: "Creative Collaboration",
    href: "/services/celebrity-endorsements/creative-collaboration",
    image: "/varunimage/Creative-%20Collaboration-celebrity.jpg",
    description:
      "Celebrities can tell great stories that can influence people. Our in-house creative team collaborates with the best to create endorsement campaigns that are authentic, engaging, and build brand trust. Every collaboration is carefully designed to take advantage of the celebrity figure and transform the admiration into action by loyal customers. This effect creates measurable results.",
  },
  {
    id: "05",
    title: "Public Relations",
    href: "/services/celebrity-endorsements/public-relations",
    image: "/varunimage/Public-Relations-celebrity.jpg",
    description:
      "Most effective celebrity endorsements are global and integrated across all touch points. We deliver powerful celebrity campaigns that deliver effective ROI across a broad range of platforms from digital and social media to print, events and radio.",
  },
  {
    id: "06",
    title: "Legal Compliance",
    href: "/services/celebrity-endorsements/legal-compliance",
    image: "/varunimage/Legal-Compliance%20-celebrity.jpg",
    description:
      "Careful attention to detail makes a good celebrity endorsement campaign. At Ritz Media World, we handle the legalities involved in making sure that your brand is legally protected. Every celebrity endorsement campaign will be beneficial for your brand, transparent and risk-free thanks to our attention to detail.",
  },
];

export default function Section3() {
  const [openItem, setOpenItem] = useState<string | null>(servicesData[0]?.id ?? null);

  const toggleExplore = (id: string) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-[#0F1640] py-10 sm:py-12 md:py-14 lg:py-16 flex justify-center px-4 sm:px-6 lg:px-0">
      <div className={`w-full mx-auto ${styles.containerWidth}`}>
        <div className="flex flex-col gap-5 sm:gap-6">
          <div className="flex flex-col gap-1 sm:gap-2 text-center md:text-left">
          <a
            href="/services"
            title="Services"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p
              className="text-[#C99237] uppercase text-[12px] lg:text-[16px] font-[600]"
              style={{ fontFamily: "MontserratSemiBold" }}
            >
              Services
            </p>
          </a>
            <div className="flex flex-col items-center gap-0 text-center md:flex-row md:items-baseline md:justify-start md:text-left">
              <h2
                className="text-white text-[30px] sm:text-[32px] md:text-[34px] lg:text-[36px] leading-[1.25] lg:leading-[50px] font-[700]"
                style={{ fontFamily: "MontserratBold" }}
              >
                What We Provide{" "}
              </h2>
              <span
                className="block text-[#FFFFFF] text-[16px] leading-[28px] font-[400] md:ml-2 md:inline"
                style={{ fontFamily: "OpenSansRegular" }}
              >
                Is more than what you&apos;ll ever need
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-[10px]">
            {servicesData.map((item) => {
              const isOpen = openItem === item.id;

              const exploreMoreLink = (
                <Link
                  title="Explore More"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex cursor-pointer items-center gap-5 no-underline"
                >
                  <span
                    className="text-white text-[16px] sm:text-[18px]"
                    style={{ fontFamily: "MontserratMedium" }}
                  >
                    Explore More
                  </span>
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center transition-transform duration-500 ease-in-out">
                    <Image
                      src={EXPLORE_ARROW_IMAGE}
                      alt="Explore more – link arrow"
                      title="Explore more"
                      width={22}
                      height={20}
                      className="transition-transform duration-500 ease-in-out"
                    />
                  </span>
                </Link>
              );

              return (
                <div
                  key={item.id}
                  className={`rounded-[10px] ${accordionStyles.accordionItem} ${
                    isOpen
                      ? `${accordionStyles.accordionItemOpen} overflow-visible lg:min-h-[506px]`
                      : "overflow-hidden"
                  }`}
                
                >
                  <div
                    className="flex items-start justify-between gap-6 sm:gap-8 px-4 sm:px-5 md:px-6 lg:px-6 py-5 sm:py-4 cursor-pointer"
                    onClick={() => toggleExplore(item.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleExplore(item.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3 sm:items-baseline sm:gap-8 md:gap-12 lg:gap-[155px]">
                      <p
                        className="shrink-0 text-white text-[18px] leading-[36px] font-[500] sm:leading-[40px] md:leading-[50px] lg:mt-2"
                        style={{ fontFamily: "MontserratMedium" }}
                      >
                        {item.id}.
                      </p>
                      <div className="min-w-0 flex-1">
                        <h3
                          className={`${accordionStyles.accordionTitleUnder357} m-0 text-white font-[600] text-[18px] leading-[36px] sm:text-[24px] sm:leading-[40px] md:text-[25px] md:leading-[50px] lg:text-[25px] lg:leading-[50px] xl:text-[28px] tracking-[0em]`}
                          style={{ fontFamily: "MontserratSemiBold" }}
                        >
                          <Link
                            title={item.title}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              const isDesktop = window.matchMedia(
                                "(min-width: 1024px)",
                              ).matches;
                              if (isDesktop) {
                                e.stopPropagation();
                              } else {
                                e.preventDefault();
                              }
                            }}
                            className="text-inherit no-underline hover:text-inherit"
                          >
                            {item.title}
                          </Link>
                        </h3>
                      </div>
                    </div>

                    <span
                      className="flex shrink-0 self-center cursor-pointer items-center text-[22px] leading-none text-white sm:text-[24px]"
                      aria-hidden
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExplore(item.id);
                      }}
                    >
                      <i
                        className={isOpen ? "ri-subtract-line" : "ri-add-line"}
                      />
                    </span>
                  </div>

                  {/* Accordion content - description + image */}
                  <div
                    className={`${accordionStyles.accordionContent} ${isOpen ? accordionStyles.accordionContentOpen : accordionStyles.accordionContentClosed}`}
                  >
                    <div className="px-4 sm:px-5 md:px-6 lg:px-6 pb-5 sm:pb-6 md:pb-7">
                      <div className="pl-0 sm:pl-[80px] lg:pl-[180px]">
                        <p
                          className="mt-0 max-w-[796px] pt-0 text-[16px] font-[400] leading-[28px] tracking-[0em] text-white"
                          style={{ fontFamily: "OpenSansRegular" }}
                        >
                          {item.description}
                        </p>

                        <Link
                          href={item.href}
                          title="Explore More"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="relative mt-6 block h-[190px] w-full max-w-[796px] overflow-hidden rounded-[8px] sm:mt-7 sm:h-[225px] md:mt-8 md:h-[250px] lg:mt-8 lg:h-[258px]"
                        >
                          <Image
                            src={item.image ?? CELEBRITY_IMAGE}
                            alt={item.title}
                            title={item.title}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1280px) 796px, (min-width: 1024px) 60vw, 90vw"
                          />
                        </Link>

                        {isOpen ? (
                          <div className="mt-4 sm:mt-5 lg:mt-8">
                            {exploreMoreLink}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
