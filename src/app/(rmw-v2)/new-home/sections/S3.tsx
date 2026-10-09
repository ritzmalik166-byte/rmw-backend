"use client";

import Link from "next/link";
import React, { useRef } from "react";
import ScrollSlider, { CardData } from "../components/ScrollSlider";

// Card data array with dynamic backgrounds
const cardsData: CardData[] = [
  {
    id: 1,
    title: "Digital Marketing",
    description:
      "We plan and create content that attracts, educates and nurtures your audience, building brand authority, engagement and high-quality leads.",
    icon: "/new-page/Digital_marketing_wht.png",
    iconAlt: "Digital Marketing",
    features: [
      "Hyper-targeted media planning & buying",
      "Persona-driven communication frameworks",
      "Always-on analytics & optimisation",
      "Automated lead nurturing journeys",
    ],
    link: "https://ritzmediaworld.com/services/digital-marketing",
    linkText: "Explore Digital Marketing",
    bg: "linear-gradient(to bottom, #101828, #1E2939)", // Purple to dark purple gradient
    ellipseImage: "/new-page/elip.png",
    featureDotColor: "#F3830E",
    buttonBg: "bg-[#FFFFFF]",
    buttonTextColor: "text-black",
    buttonHoverBg: "hover:bg-[#F3830E]",
  },
  {
    id: 2,
    title: "Creative Service",
    description:
      "Performance-focused campaigns on Google and social that reach high-intent audiences and convert clicks into enquiries, sales and revenue",
    icon: "/new-page/Creative_Services_wht.png",
    iconAlt: "Creative Service",
    features: [
      "Brand workshops & positioning blueprints",
      "Integrated creative campaign systems",
      "Experience-first content architectures",
      "ATL / BTL orchestration for launches",
    ],
    link: "https://ritzmediaworld.com/services/creative-services",
    linkText: "Explore Creative Service",
    bg: "linear-gradient(to bottom, #EA580C, #C2410C)", // Blue gradient
    ellipseImage: "/new-page/elip2.png",
    featureDotColor: "#D1D5DC",
    buttonBg: "bg-[#ffffff]",
    buttonTextColor: "text-[#000000]",
    buttonHoverBg: "hover:bg-[#F3830E] hover:text-white",
  },
  {
    id: 3,
    title: "Print Advertisement",
    description:
      "Strategic newspaper and magazine ads with strong ideas, smart headlines and compelling layouts that cut through clutter and generate responses.",
    icon: "/new-page/Print_advvertising_wht.png",
    iconAlt: "Print Advertisement",
    features: [
      "Hyper-targeted media planning & buying",
      "Persona-driven communication frameworks",
      "Always-on analytics & optimisation",
      "Automated lead nurturing journeys",
    ],
    link: "https://ritzmediaworld.com/services/print-advertising",
    linkText: "Explore Print Advertisement",
    bg: "linear-gradient(to bottom, #103FCB, #081F65)", // Green to dark green gradient
    ellipseImage: "/new-page/elip.png",
    featureDotColor: "#F3830E",
    buttonBg: "bg-[#FFFFFF]",
    buttonTextColor: "text-black",
    buttonHoverBg: "hover:bg-[#F3830E]",
  },
  {
    id: 4,
    title: "Radio Advertisiment",
    description:
      "Memorable radio campaigns with scripts, distinctive voices and sound design that keep attention, build recall and drive listeners to act.",
    icon: "/new-page/Radio_advertising_Wht.png",
    iconAlt: "Radio Advertisiment",
    features: [
      "Brand workshops & positioning blueprints",
      "Integrated creative campaign systems",
      "Experience-first content architectures",
      "ATL / BTL orchestration for launches",
    ],
    link: "https://ritzmediaworld.com/services/radio-advertising",
    linkText: "Explore Radio Advertisiment",
    bg: "linear-gradient(to bottom, #CB1048, #430865)", // Red to dark red gradient
    ellipseImage: "/new-page/elip2.png",
    featureDotColor: "#D1D5DC",
    buttonBg: "bg-[#ffffff]",
    buttonTextColor: "text-[#000000]",
    buttonHoverBg: "hover:bg-[#F3830E] hover:text-white",
  }, {
    id: 5,
    title: "Content Marketing",
    description:
      "We plan and create content that attracts, educates and nurtures your audience, building brand authority, engagement and high-quality leads.",
    icon: "/new-page/Content_marketing_wht.png",
    iconAlt: "Content Marketing",
    features: [
      "Hyper-targeted media planning & buying",
      "Persona-driven communication frameworks",
      "Always-on analytics & optimisation",
      "Automated lead nurturing journeys",
    ],
    link: "https://ritzmediaworld.com/services/contents-marketing",
    linkText: "Explore Content Marketing",
    bg: "linear-gradient(to bottom, #EA580C, #C2410C)", // Orange to dark orange gradient
    ellipseImage: "/new-page/elip.png",
    featureDotColor: "#F3830E",
    buttonBg: "bg-[#FFFFFF]",
    buttonTextColor: "text-black",
    buttonHoverBg: "hover:bg-[#F3830E]",
  },
  {
    id: 6,
    title: "Web Development",
    description:
      "Fast, responsive websites that reflect your brand, deliver smooth user journeys and turn visitors into enquiries and loyal customers online.",
    icon: "/new-page/Web_development_wht.png",
    iconAlt: "Web Development",
    features: [
      "Brand workshops & positioning blueprints",
      "Integrated creative campaign systems",
      "Experience-first content architectures",
      "ATL / BTL orchestration for launches",
    ],
    link: "https://ritzmediaworld.com/services/web-designing-and-development",
    linkText: "Explore Web Development",
    bg: "linear-gradient(to bottom, #7C3AED, #5B21B6)", // Purple to dark purple gradient
    ellipseImage: "/new-page/elip2.png",
    featureDotColor: "#D1D5DC",
    buttonBg: "bg-[#ffffff]",
    buttonTextColor: "text-[#000000]",
    buttonHoverBg: "hover:bg-[#F3830E] hover:text-white",
  },

  {
    id: 7,
    title: "Influencer Marketing",
    description:
      "Strategic collaborations with credible influencers whose authentic content builds trust, extends reach and turns engaged followers into leads and customers.",
    icon: "/new-page/influencer_marketing_wht.png",
    iconAlt: "Influencer Marketing",
    features: [
      "Hyper-targeted media planning & buying",
      "Persona-driven communication frameworks",
      "Always-on analytics & optimisation",
      "Automated lead nurturing journeys",
    ],
    link: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india",
    linkText: "Explore Influencer Marketing",
    bg: "linear-gradient(to bottom, #6B46C1, #4C1D95)", // Purple to dark purple gradient
    ellipseImage: "/new-page/elip.png",
    featureDotColor: "#F3830E",
    buttonBg: "bg-[#FFFFFF]",
    buttonTextColor: "text-black",
    buttonHoverBg: "hover:bg-[#F3830E]",
  },
  {
    id: 8,
    title: "Celebrity Endorsement",
    description:
      "Celebrities are carefully matched so their image and audience align with your brand, boosting trust and impact across campaigns and events.",
    icon: "/new-page/Celebrity_Endorsements_wht.png",
    iconAlt: "Celebrity Endorsement",
    features: [
      "Brand workshops & positioning blueprints",
      "Integrated creative campaign systems",
      "Experience-first content architectures",
      "ATL / BTL orchestration for launches",
    ],
    link: "https://ritzmediaworld.com/services/celebrity-endorsements",
    linkText: "Explore Celebrity Endorsement",
    bg: "linear-gradient(to bottom, #103FCB, #081F65)", // Blue gradient
    ellipseImage: "/new-page/elip2.png",
    featureDotColor: "#D1D5DC",
    buttonBg: "bg-[#ffffff]",
    buttonTextColor: "text-[#000000]",
    buttonHoverBg: "hover:bg-[#F3830E] hover:text-white",
  },

];

function S3() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-hidden flex w-full justify-center bg-[#FFFFFF] py-16 sm:py-2 md:pb-8 lg:py-0 max-w-full"
    >
      <div className="flex w-full max-w-[95%] flex-col gap-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        {/* Row 1 */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-semibold text-[#101828] sm:text-4xl lg:text-[48px] lg:leading-[1.1] md:flex">
            Choose Your{" "}
            <span className="text-[#F3830E] md:block transform -translate-y-[4px]">
              Brand Journey
            </span>
          </h2>
          <p className="max-w-2xl text-[16px] text-[#4A5565] sm:text-lg">
            Tailored growth programmes engineered for the industries and
            audiences most.
          </p>
        </div>

        {/* Row 2 - Slider */}
        <ScrollSlider cards={cardsData} sectionRef={sectionRef} />

        {/* Row 3 */}
        <div className="flex justify-center text-center">
          <p className="max-w-xl text-sm text-[#4A5565] sm:text-[16px]">
            Not sure which path fits your brand?{" "}
            <Link href="https://ritzmediaworld.com/contact.html"
             target="_blank" title="Let's discuss your unique needs" className="text-[#4A5565] underline">
              Let's discuss your unique needs
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default S3;