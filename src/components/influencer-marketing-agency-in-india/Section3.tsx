"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import accordionStyles from "./Section3.module.css";
import containerStyles from "@/components/celebrity-endorsements/page.module.css";

const EXPLORE_ARROW_IMAGE =
  "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

const servicesData = [
  {
    id: "01",
    title: "Influencer Identification",
    titleLineBreak: true,
    description:
      "When developing a partnership with an influencer, it is critical to find someone who not only has a voice, but also has the ability to create trust and influence purchasing behaviour amongst their audience, becoming lifelong customers for your business!|||Ritz Digital Media provides results-driven influencer partnerships through identifying and qualifying each influencer that shares similar values with the brand delivering authentic engagement, authentic influence, and measurable conversions.",
    hasImage: true,
    imageSrc: "/varun/influencer-marketing/Influencer%20Identification.jpg",
    link: "/services/influencer-marketing-agency-in-india/identification-influence-marketing-agency",
  },
  {
    id: "02",
    title: "Cost-Benefit Analysis",
    imageSrc: "/varun/influencer-marketing/Cost-Benefit%20Analysis.jpg",
    description:
      "Successful influencer marketing campaigns require balancing your budget with the return when investing in developing the relationship with each influencer you decide to partner with.|||Additionally, our team will work collaboratively with you to provide a complete cost benefit analysis and develop an influencer marketing strategy to ensure you receive maximum ROI on your budget, targeted investments, and authentic partnerships that will result in true business success, not just exposure.",
    link: "/services/influencer-marketing-agency-in-india/cost-benefit-analysis",
  },
  {
    id: "03",
    title: "Term Negotiations",
    imageSrc: "/varun/influencer-marketing/Terms%20Negotiations.jpg",
    description:
      "Bargaining with an influencer is an art. Our team will advocate for you to negotiate mutually beneficial terms, a well-defined strategic deliverable, and competitive pricing with each of your influencer partnerships, ensuring each partnership is risk-free, profitable and long-lasting.|||With our expertise we handle all influencer agreements professionally, protecting your interests to maximise the success of each of your influencer marketing campaigns.",
    link: "/services/influencer-marketing-agency-in-india/terms-negotiations",
  },
  {
    id: "04",
    title: "Creative Collaboration",
    imageSrc: "/varun/influencer-marketing/Creative%20Collaboration.jpg",
    description:
      "Influencers succeed with authentic engagement, not scripted messaging. We work closely with the influencers to leverage their authentic voice through effective brand messaging to create copy that is credible, compelling and drives action.|||Each campaign will allow the influencer to use their creativity to gain trust with audiences, resulting in measurable engagement of audiences.",
    link: "/services/influencer-marketing-agency-in-india/creative-collaboration",
  },
  {
    id: "05",
    title: "Campaign Integration",
    imageSrc: "/varun/influencer-marketing/Campaign%20Integration.jpg",
    description:
      "Combined with influencer content, the reach is best served if it is completely merged within the overall marketing campaign across all available media (digital, social, & traditional).|||Our goal is to reach more people through the best, most consistent messaging possible & persuade them to do business with the company's product in order to provide a greater level of marketing effectiveness.",
    link: "/services/influencer-marketing-agency-in-india/campaign-integration",
  },
  {
    id: "06",
    title: "Messaging Optimization",
    imageSrc: "/varun/influencer-marketing/Messaging%20Optimization.jpg",
    description:
      "Influencers can tell a great story, however, the great influence campaign must motivate customers to take action and participate in the brand and the product, whether that means making a purchase or joining the loyalty program (customer). With Ritz Media World, every influencer program provides results which are quantified!",
    link: "/services/influencer-marketing-agency-in-india/messaging-optimization",
  },
] as const;

type ServiceItem = (typeof servicesData)[number];

/** Tailwind md–xl: 768px ≤ width < 1280px (mid layout only) */
const MD_TO_XL_MEDIA = "(min-width: 768px) and (max-width: 1279px)";

function useIsMdToXl() {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MD_TO_XL_MEDIA);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return matches;
}

function ServiceAccordionRow({
  item,
  isOpen,
  onToggle,
  onClose,
}: {
  item: ServiceItem;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const panelId = `section3-panel-${item.id}`;
  const triggerId = `section3-trigger-${item.id}`;
  const headingId = `section3-heading-${item.id}`;
  const headingIdMid = `section3-heading-mid-${item.id}`;

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        queueMicrotask(() =>
          triggerRef.current?.focus({ preventScroll: true }),
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const openExternal = () => {
    window.open(item.link, "_blank", "noopener,noreferrer");
  };

  const handleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
    queueMicrotask(() =>
      triggerRef.current?.focus({ preventScroll: true }),
    );
  };

  const isFirst = item.id === "01";
  const isMdToXl = useIsMdToXl();
  const descriptionParagraphs = item.description
    .split("|||")
    .map((p) => p.trim());

  return (
    <div
      className={`border-b border-[#2A3378] ${accordionStyles.accordionRow}`}
    >
      <button
        ref={triggerRef}
        type="button"
        id={triggerId}
        hidden={isOpen}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full min-h-[56px] sm:min-h-0 py-4 sm:py-10 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-white/5 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#C99237]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1640]"
      >
        <p
          className="text-[#E5E8FF] text-[15px] sm:text-[17px] md:text-[20px] leading-[22px] font-[700]"
          style={{ fontFamily: "MontserratRegular" }}
        >
          {item.title}
        </p>
        <Plus
          className="shrink-0 text-[#BFC6FF] w-4 h-4 sm:w-5 sm:h-5"
          aria-hidden
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={
          isOpen ? (isMdToXl ? headingIdMid : headingId) : triggerId
        }
        className={`${accordionStyles.accordionPanel} cursor-pointer ${
          isOpen
            ? accordionStyles.accordionPanelOpen
            : accordionStyles.accordionPanelClosed
        }`}
        onClick={openExternal}
      >
        <div className={accordionStyles.accordionPanelInner}>
          {/* Original 3-column layout: &lt; md and xl+ */}
          <div className="py-5 sm:py-6 block md:hidden xl:block">
            <div className="flex flex-col xl:flex-row gap-8 xl:gap-10 items-start">
              <div className="flex items-start justify-between gap-3 sm:gap-4 xl:gap-5 w-full xl:w-[22%] shrink-0 ml-0">
                <div className="flex items-center sm:items-center xl:items-start gap-3 sm:gap-4 xl:gap-5 min-w-0">
                  <span
                    className={`text-[#FFFFFF] text-[13px] sm:text-[15px] ${isFirst ? "xl:pt-2 xl:mt-2" : "xl:pt-1 xl:mt-2"}`}
                    style={{ fontFamily: "MontserratMedium" }}
                  >
                    {item.id}
                  </span>
                  <h3
                    id={headingId}
                    tabIndex={-1}
                    className="text-white text-[24px] xl:text-[28px] leading-[28px] sm:leading-[28px] xl:leading-[44px] font-[500] outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C99237]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1640] rounded-sm"
                    style={{ fontFamily: "OpenSansRegular" }}
                  >
                    {item.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCollapse}
                  aria-label={`Collapse ${item.title}`}
                  className="flex xl:hidden shrink-0 mt-1 hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <Image
                    src="/service-v3/influencer-marketing-agency-in-india/s2/cross.svg"
                    alt="Ritz Media World"
                    title="Ritz Media World"
                    width={20}
                    height={20}
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                </button>
              </div>

              <div
                id={`section3-desc-${item.id}`}
                className="w-full xl:flex-1 mt-1 xl:mt-0 scroll-mt-4"
              >
                <div
                  className={
                    isFirst
                      ? "text-[#FFFFFF] text-[16px] font-[400] leading-[30px] sm:leading-[24px] xl:leading-[30px] tracking-[0] xl:text-[16px]"
                      : "text-[#FFFFFF] text-[16px] font-[400] leading-[30px] sm:leading-[24px] xl:leading-[28px] tracking-[0] xl:text-[14px]"
                  }
                  style={{ fontFamily: "OpenSansRegular" }}
                >
                  {descriptionParagraphs.map((para, i) => (
                    <p
                      key={i}
                      className={i > 0 ? "mt-3 sm:mt-4 xl:mt-5" : ""}
                    >
                      {para}
                    </p>
                  ))}
                </div>
                <div className="flex justify-start items-start">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Learn more about ${item.title}`}
                    className="mt-2 cursor-pointer xl:mt-6 hidden border-b-[2px] border-[#0F1640] letsTalkToday2 xl:flex items-center gap-2.5 "
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    <span
                      className="text-white text-[14px] sm:text-[15px]"
                      style={{ fontFamily: "MontserratMedium" }}
                    >
                      Learn more
                    </span>
                    <Link
                      title="Learn more"
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Learn more about ${item.title}`}
                      className="w-[40px] h-[40px] rounded-full bg-[#C99237] letsTalkTodayIcon flex items-center justify-center hover:bg-[#b8822f] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image
                        src={EXPLORE_ARROW_IMAGE}
                        alt="Ritz Media World"
                        title="Ritz Media World"
                        width={22}
                        height={7}
                      />
                    </Link>
                  </a>
                </div>
              </div>

              <div
                className={`w-full xl:w-auto flex flex-col items-start gap-3 shrink-0 ${isFirst ? "mt-4 xl:mt-0" : "mt-2 xl:mt-0"}`}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="relative">
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      title={item.title}
                      className="xl:aspect-auto rounded-[5px] overflow-hidden w-full aspect-[4/3] xl:w-[357px] xl:h-auto"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleCollapse}
                    aria-label={`Collapse ${item.title}`}
                    className="hidden xl:flex shrink-0 mt-1 hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <Image
                      src="/service-v3/influencer-marketing-agency-in-india/s2/cross.svg"
                      alt="Ritz Media World"
                      title="Ritz Media World"
                      width={30}
                      height={30}
                    />
                  </button>
                </div>
                <div
                  className="flex xl:hidden mt-1 items-center gap-2.5 w-full"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <span
                    className="text-white text-[14px] sm:text-[15px]"
                    style={{ fontFamily: "MontserratMedium" }}
                  >
                    Learn more
                  </span>
                  <Link
                    title="Learn more"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Learn more about ${item.title}`}
                    className="w-[40px] h-[40px] rounded-full bg-[#C99237] flex items-center justify-center hover:bg-[#b8822f] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={EXPLORE_ARROW_IMAGE}
                      alt="Ritz Media World"
                      title="Ritz Media World"
                      width={22}
                      height={7}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* md–xl only: row 1 title + cross, row 2 copy | image */}
          <div className="py-5 sm:py-6 hidden md:block xl:hidden">
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex items-start justify-between gap-3 sm:gap-4 md:gap-5 w-full">
                <div className="flex items-start gap-3 sm:gap-4 md:gap-5 min-w-0">
                  <span
                    className={`text-[#FFFFFF] text-[13px] sm:text-[15px] ${isFirst ? "md:pt-2 md:mt-2" : "md:pt-1 md:mt-2"}`}
                    style={{ fontFamily: "MontserratMedium" }}
                  >
                    {item.id}
                  </span>
                  <p
                    id={headingIdMid}
                    tabIndex={-1}
                    className="text-white text-[24px] md:text-[22px] lg:text-[28px] leading-[28px] sm:leading-[28px] md:leading-[44px] font-[500] outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C99237]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1640] rounded-sm"
                    style={{ fontFamily: "OpenSansRegular" }}
                  >
                    {item.title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCollapse}
                  aria-label={`Collapse ${item.title}`}
                  className="shrink-0 mt-1 hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <Image
                    src="/service-v3/influencer-marketing-agency-in-india/s2/cross.svg"
                    alt="Ritz Media World"
                    title="Ritz Media World"
                    width={30}
                    height={30}
                  />
                </button>
              </div>

              <div className="flex lex-row gap-6 lg:gap-8 items-start w-full">
                <div
                  id={`section3-desc-mid-${item.id}`}
                  className="w-full lg:flex-1 min-w-0 mt-0 scroll-mt-4"
                >
                  <div
                    className={
                      isFirst
                        ? "text-[#FFFFFF] text-[16px] font-[400] leading-[30px] sm:leading-[24px] md:leading-[30px] tracking-[0] md:text-[14px] lg:text-[16px]"
                        : "text-[#FFFFFF] text-[16px] font-[400] leading-[30px] sm:leading-[24px] md:leading-[28px] tracking-[0] md:text-[14px]"
                    }
                    style={{ fontFamily: "OpenSansRegular" }}
                  >
                    {descriptionParagraphs.map((para, i) => (
                      <p
                        key={i}
                        className={i > 0 ? "mt-3 sm:mt-4 md:mt-5" : ""}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                  <div className="flex justify-start items-start">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Learn more about ${item.title}`}
                      className="mt-2 cursor-pointer md:mt-6 flex border-b-[2px] border-[#0F1640] letsTalkToday2 items-center gap-2.5"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <span
                        className="text-white text-[14px] sm:text-[15px]"
                        style={{ fontFamily: "MontserratMedium" }}
                      >
                        Learn more
                      </span>
                      <Link
                        href={item.link}
                        target="_blank"
                        title="Learn more"
                        rel="noopener noreferrer"
                        aria-label={`Learn more about ${item.title}`}
                        className="w-[40px] h-[40px] rounded-full bg-[#C99237] letsTalkTodayIcon flex items-center justify-center hover:bg-[#b8822f] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Image
                          src={EXPLORE_ARROW_IMAGE}
                          alt="Ritz Media World"
                          title="Ritz Media World"
                          width={22}
                          height={7}
                        />
                      </Link>
                    </a>
                  </div>
                </div>

                <div
                  className={`w-auto shrink-0 flex flex-col items-start ${isFirst ? "mt-0" : "mt-0"}`}
                >
                  <div className="relative w-[280px]">
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      title={item.title}
                      className="rounded-[5px] overflow-hidden w-full aspect-[4/3] lg:aspect-auto lg:w-[280px] lg:h-[198px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Section3() {
  const [openItem, setOpenItem] = useState<string | null>("01");
  const closePanel = useCallback(() => setOpenItem(null), []);

  return (
    <section className="w-full bg-[#0F1640] py-[35px] lg:py-[70px] flex justify-center px-4 sm:px-6 lg:px-0">
      <div
        className={`w-full mx-auto overflow-hidden ${containerStyles.containerWidth}`}
      >
        <div className="text-center">
          <a
            href="/services"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Services"
            className="uppercase text-[11px] sm:text-[12px] tracking-[0.1em] text-[#C99237]"
            style={{ fontFamily: "MontserratSemiBold" }}
          >
            Services
          </a>
          <h2
            className="text-white text-[28px] lg:text-[36px] font-[700] leading-tight"
            style={{ fontFamily: "MontserratBold" }}
          >
            What We Provide
          </h2>
          <p
            className="text-[#FFFFFF] text-[12px] sm:text-[13px] md:text-[14px] mt-1"
            style={{ fontFamily: "OpenSansRegular" }}
          >
            Is more than what you&apos;ll ever need
          </p>
        </div>

        <div className="h-px w-full bg-[#2A3378] mt-8 sm:mt-10" />

        {servicesData.map((item) => (
          <ServiceAccordionRow
            key={item.id}
            item={item}
            isOpen={openItem === item.id}
            onToggle={() =>
              setOpenItem((prev) => (prev === item.id ? null : item.id))
            }
            onClose={closePanel}
          />
        ))}

        <p

          className="block  text-[#FFFFFF] text-[14px] font-[400] leading-[24px] tracking-[0] mt-4 text-left md:text-center lg:text-left hover:opacity-90 outline-none focus-visible:underline"
          style={{ fontFamily: "OpenSansRegular" }}
        >
          Not sure which path fits your brand?{" "}
          <br className="block md:hidden" />
          <Link href="https://ritzmediaworld.com/contact.html"
            target="_blank"
            title="Let's discuss your unique needs."
            rel="noopener noreferrer" className="underline cursor-pointer">
            Let&apos;s discuss your unique needs.
          </Link >
        </p>
      </div>
    </section>
  );
}