"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import accordionStyles from "./Section3.module.css";
import containerStyles from "@/components/celebrity-endorsements/page.module.css";

const EXPLORE_ARROW_IMAGE =
  "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

export default function Section3() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const accordionItems = [
    {
      label: "Branding & Identity Development",
      paragraphs: [
        "Take your brand identity to the next level with our branding and design services. We help you in developing a memorable and authentic brand identity that resonates with your customers, fosters brand loyalty, and helps you stand out in the cutthroat competition.",
        "Our comprehensive branding services include logo development, brand positioning, and visual communication to help you achieve success.", 
      ],
      imageSrc:
        "/varunimage/Branding&IdentityDevelopment.png",
      learnMoreHref:
        "/services/creative-services/branding-and-identity-development",
        heightAndWidth:"w-[398px] h-auto"
    },
    {
      label: "Graphic Design",
      paragraphs: [
        "Leverage the power of visual communication with our expert services in graphic designing. Through competent execution, we convert audiences whether online or offline into engage, empowering and convincing you. We focus on designing effective graphics for effective communication.",
        "Our solution in graphic design helps you effectively communicate messages by designing effective graphics.",
      ],
      imageSrc: "/varunimage/GraphicDesign.png",
      learnMoreHref:
        "/services/creative-services/graphic-designing",
          heightAndWidth:"w-[420px] h-auto"
    },
    {
      label: "Logo Design",
      paragraphs: [
        "The logo of any brand is their identity. We can help you design a unique and memorable logo that creates trust and makes a lasting impression on your audience. We are professionals in logo design!",
        "With a logo design of your choice, we can ensure that your brand gets noticed, helps develop brand loyalty and helps create instant recognition. It is thus important for brand advertising",
      ],
      imageSrc: "/varunimage/logoad2.png",
      learnMoreHref:
        "/services/creative-services/logo-design",
        heightAndWidth:"w-[391px] h-auto"
    },
    {
      label: "Print Advertising Design",
      paragraphs: [
        "Leave your mark in the print media industry with effective print advertising design solutions from us. Our designs are made in a way that piques interest and encourages audience response.",
        "Brochure design or flyer design or poster design; whether any paper you give us, we will turn it into a profit-making print ad design.",
      ],
      imageSrc: "/varunimage/printadv2.png",
      learnMoreHref:
        "/services/creative-services/print-advertisement-design",
        heightAndWidth:"w-[393px] h-auto"
    },
    {
      label: "Packaging Design",
      paragraphs: [
        "Use your product packaging as a marketing tool to persuade your customers to buy your product.",
        " Our packaging design services ensure that you attain instant success through our highly persuasive and effective packaging design that influences customer behavior and creates brand identity.",
      ],
      imageSrc: "/varunimage/PackagingDesign.png",
      learnMoreHref:
        "/services/creative-services/packaging-design",
        heightAndWidth:"w-[403px] h-auto"
    },
  ];

  return (
    <section className="w-full min-w-0 max-md:overflow-x-hidden bg-[#F7F7F7] py-10 sm:py-12 md:py-16 lg:py-20 flex justify-center px-4 sm:px-6 lg:px-0">
      <div className={`w-full mx-auto overflow-hidden ${containerStyles.containerWidth}`}>
        <div className="text-center">
          <Link
            title="Services"
            href="/services"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[600] uppercase text-[11px] sm:text-[12px] tracking-[0.1em] text-[#C99237]"
            style={{ fontFamily: "MontserratSemiBold" }}
          >
            Services
          </Link>
          <h2
            className="text-black text-[28px] lg:text-[36px] font-[700] leading-tight"
            style={{ fontFamily: "MontserratBold" }}
          >
            What We Provide
          </h2>
          <p
            className="text-[#00000] text-[12px] sm:text-[13px] md:text-[14px] mt-1"
            style={{ fontFamily: "OpenSansRegular" }}
          >
            Is more than what you&apos;ll ever need
          </p>
        </div>

        <div className="h-px w-full bg-[#AAA8A8] mt-8 sm:mt-10" />

        <div className="space-y-4">
          {accordionItems.map((item) => {
            const isOpen = openItem === item.label;

            return (
              <div  key={item.label} className="border-b border-[#AAA8A8] pb-6">
                <button
                  type="button"
                  onClick={() => setOpenItem(isOpen ? null : item.label)}
                  className="w-full py-4 sm:py-5 flex items-center justify-between gap-3 text-left"
                  aria-expanded={isOpen}
                >
                  <h3
                   onClick={()=>{
                    if(isOpen){ 
                      window.open(item.learnMoreHref, "_blank");
                    }
                  }}
                    className="text-[22px] cursor-pointer leading-[28px] text-[#000000] font-[600]"
                    style={{ fontFamily: '"Open Sans", sans-serif' }}
                  >
                    {item.label}
                  </h3>
                  {isOpen ? (
                    <img
                   
                      src="/varun.icon/cross-content-marketing.svg"
                      alt="Ritz Media World – close section"
                      title="Ritz Media World"
                     
                      className="shrink-0 w-7 cursor-pointer h-7 sm:w-[40px] sm:h-[40px] select-none mt-2"
                    />
                  ) : (
                    <span className="text-[#6E6E6E] text-4xl leading-none select-none">
                      +
                    </span>
                  )}
                </button>

                <div
                  className={`${accordionStyles.accordionContent} ${isOpen ? accordionStyles.accordionContentOpen : accordionStyles.accordionContentClosed}`}
                >
                  <div className="pt-0">
                    <div className="flex min-w-0 flex-col items-start md:gap-8 lg:flex-row lg:gap-14 xl:gap-20">
                      <div className="relative flex w-full min-w-0 justify-center sm:w-auto lg:max-w-[430px] xl:max-w-[480px] lg:justify-start">
                        <div className={`relative`}>
                          <img
                          onClick={() => window.open(item.learnMoreHref, "_blank")}
                            src={item.imageSrc}
                            alt={`${item.label} – Ritz Media World`}
                            title={item.label}
                            className={`${item.heightAndWidth}`}
                          />
                        </div>
                      </div>

                      <div className="flex-1 max-w-[680px] justify-center lg:self-center">
                        <div className="space-y-5 justify-center mt-[24px]">
                          {item.paragraphs.map((para, i) => (
                            <p
                            onClick={()=>{
                              window.open(item.learnMoreHref, "_blank");
                            }}
                              key={i}
                              className="text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed md:leading-[28px] text-[#00000]"
                              style={{ fontFamily: "PoppinsRegular" }}
                            >
                              {para}
                            </p>
                          ))}
                        </div>

                        <Link
                          title="Learn more"
                          href={item.learnMoreHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Learn more about ${item.label}`}
                          className="group mt-8 letsTalkToday inline-flex items-center gap-4 flex-wrap"
                        >
                          <span
                            className="text-[#101828] text-[18px]"
                            style={{ fontFamily: "MontserratMedium" }}
                          >
                            Learn more
                          </span>
                          <span className="w-10 h-10 rounded-full bg-[#C99237] flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#b8822f] letsTalkTodayIcon">
                            <Image
                              src={EXPLORE_ARROW_IMAGE}
                              alt="Ritz Media World – learn more"
                              title="Ritz Media World"
                              width={18}
                              height={16}
                            />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
