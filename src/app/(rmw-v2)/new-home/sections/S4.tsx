"use client";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const servicesData = [
  {
    title: "Lead-Gen Digital",
    icn: "/new-page/icns/loudspeeker.png",
    para: "Performance-driven digital campaigns engineered to capture high-intent audiences and convert with precision.",
    list: [
      "SEO & SEM",
      "Social Media Marketing",
      "PPC Campaigns",
      "Analytics & Optimization",
    ],
    bg1: "#2B7FFF",
    bg2: "#155DFC",
    link: "/services/lead-gen-digital",
  },
  {
    title: "Creative Print & OOH",
    icn: "/new-page/icns/print.png",
    para: "High-impact outdoor and print storytelling that surrounds your audience online and off.",
    list: [
      "Billboard Campaigns",
      "Newspaper Centrespreads",
      "Magazine Advertising",
      "Transit Media",
    ],
    bg1: "#AD46FF",
    bg2: "#9810FA",
    link: "/services/creative-print-ooh",
  },
  {
    title: "Branding & Identity",
    icn: "/new-page/icns/paint-plate.png",
    para: "Distinctive brand systems built on insight, crafted to scale across every touchpoint.",
    list: [
      "Brand Strategy",
      "Visual Identity",
      "Brand Guidelines",
      "Market Positioning",
    ],
    bg1: "#F6339A",
    bg2: "#E60076",
    link: "/services/branding-identity",
  },
  {
    title: "Web & Experience",
    icn: "/new-page/icns/glob_white.png",
    para: "Immersive digital experiences that merge human-centric design with conversion-first thinking.",
    list: [
      "Website Development",
      "UI/UX Design",
      "Mobile Apps",
      "E-commerce Solutions",
    ],
    bg1: "#D4A574",
    bg2: "#C49A6C",
    link: "/services/web-experience",
  },
];

function S4() {
  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-[#FFFFFF] py-16 sm:py-20 md:pt-0 lg:py-24">
      <div className="flex w-full max-w-[95%] flex-col items-center gap-12 px-4 sm:px-6 lg:px-8">
        {/* Row 1 */}
        <div className="flex flex-col gap-4 items-center text-center sm:max-w-3xl">
          <button className="inline-flex w-fit rounded-full bg-[#D4A574] px-5 py-2 text-[14px] font-[400] text-white">
            What We Do
          </button>
          <h2 className="text-3xl font-semibold text-[#101828] sm:text-4xl lg:text-[48px] lg:leading-[1.1] ">
            360° Brand{" "}
            <span className="text-[#D4A574]">Elevation Services</span>
          </h2>
          <p className="max-w-2xl text-base text-[#4A5565] sm:text-[20px] font-[400]">
            Integrated solutions that work together to build powerful brands and
            drive measurable results
          </p>
        </div>

        {/* Row 2 */}
        <div className="grid gap-6 sm:grid-cols-2">
          {servicesData.map((service) => (
            <div
              key={service.title}
              className="flex h-full min-h-[360px] flex-col justify-between rounded-[24px] border border-[#E5E7EB] bg-white px-6 py-8 gap-4 transition-transform duration-300 hover:-translate-y-2 sm:px-8 sm:py-10"
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${service.bg1} 0%, ${service.bg2} 100%)`,
                }}
              >
                <Image
                  src={service.icn}
                  alt={service.title}
                  width={34}
                  height={34}
                />
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-[22px] font-semibold text-[#101828] sm:text-[24px]">
                  {service.title}
                </h3>
                <p className="text-sm text-[#4A5565] sm:text-base">
                  {service.para}
                </p>
              </div>

              <ul className="flex flex-col gap-2 text-sm text-[#364153] sm:text-base">
                {service.list.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[6px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-[#D4A574]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                title="Learn more"
                href={service.link}
                className="group inline-flex items-center gap-2 text-sm font-medium text-[#D4A574] transition-transform duration-200 hover:translate-x-1 sm:text-base"
              >
                Learn more
                <MoveRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm font-[400] text-[#364153] sm:text-[18px]">
            Need a custom solution combining multiple services?
          </p>
          <Link
            title="Let's create your integrated strategy"
            href="/contact.html"
            className="text-base font-[400] text-[#D4A574] underline-offset-4 transition-colors duration-200 hover:underline flex justify-center items-center gap-2 text-center sm:text-[18px]"
          >
            Let's create your integrated strategy <FaArrowRight className="mt-2"/>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default S4;
