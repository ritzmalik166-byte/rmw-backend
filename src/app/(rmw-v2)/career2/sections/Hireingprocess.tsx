"use client";

import Link from "next/link";
import { useState } from "react";

const hiringSteps = [
  {
    id: 1,
    title: "Discover Open Roles & Apply",
    description:
      "Browse current openings, choose the role matching your skills, and submit your application with resume and portfolio to begin your journey with our creative team.",
  
  },
  {
    id: 2,
    title: "Portfolio & Profile Review",
    description:
      "Our hiring team reviews your work, experience, and creative approach to understand how you can contribute to upcoming projects.",

  },
  {
    id: 3,
    title: "Creative / Technical Interaction",
    description:
      "You meet with specialists for a focused discussion on your process, problem-solving, and the kind of campaigns or products you enjoy building.",
 
  },
  {
    id: 4,
    title: "Team & HR Conversation",
    description:
      "We align on team fit, communication style, and growth expectations so both sides know what a successful partnership looks like.",

  },
  {
    id: 5,
    title: "Final Selection & Offer",
    description:
      "Selected candidates receive a formal offer with role details, timelines, and onboarding support to join Ritz Media World smoothly.",
 
  },
];

const life = [
  {
    eyebrow: "Life @",
    heading: "Find Your Next Role",
    description:
      "Explore a workplace where ideas move fast, teams collaborate openly, and every role connects to real brand impact across digital and creative projects.",
    buttonLabel: "View Open Roles",
    buttonHref: "#career-openings",
    image: "/gallery/Creative Team2.JPG",
    imageAlt: "Team exploring career opportunities at Ritz Media World",
  },
];

export default function Hireingprocess() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = hiringSteps[activeIndex];

  return (
    <main className="min-h-screen px-4 py-10 md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="text-center">
          <div className="text-3xl font-bold text-black md:text-5xl">
            Hiring Process
          </div>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
            Putting people first starts from the very first conversation. Share
            your skills and aspirations, and discover opportunities aligned with
            your journey.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-3 xl:flex-nowrap xl:gap-1">
          {hiringSteps.map((step, index) => {
            const isActive = activeIndex === index;

            return (
              <div key={step.id} className="flex items-center lg:contents">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-md border
                     px-4 py-3.5 text-left transition-all duration-300 sm:px-5
                      sm:py-4 lg:w-auto xl:max-w-auto ${isActive
                      ? "border-[#12163b] bg-[#12163b] text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${isActive
                        ? "bg-white text-[#12163b]"
                        : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {step.id}
                  </div>
                  <p className="min-w-0 flex-1 text-sm font-medium leading-snug">
                    {step.title}
                  </p>
                </button>

              </div>
            );
          })}
        </div>

        {/* Description — active step content */}
        <div className="mx-auto mt-8 max-w-4xl text-center">
          <p
            key={activeStep.id}
            className="text-sm leading-7 text-gray-600 transition-opacity duration-300 md:text-base"
          >
            {activeStep.description}
          </p>
        </div>

        {/* Life section */}
        {life.map((item, index) => (
          <div
            key={index}
            className="mt-16 overflow-hidden rounded-2xl bg-white shadow-sm transition-opacity duration-300"
          >
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div className="px-6 py-10 md:px-12">
                <div className="text-4xl font-light text-black md:text-5xl">
                  {item.eyebrow}
                </div>

                <div className="mt-2 text-2xl font-bold uppercase tracking-wide text-[#c58b2d]">
                  {item.heading}
                </div>

                <p className="mt-6 max-w-md text-sm leading-7 text-gray-600 md:text-base">
                  {item.description}
                </p>

                <Link
                  title={item.buttonLabel}
                  href={item.buttonHref}
                  className="mt-8 inline-block rounded-md bg-[#12163b] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1b2259]"
                >
                  {item.buttonLabel}
                </Link>
              </div>

              <div className="relative h-full min-h-[320px] w-full">
                <div className="absolute inset-0 overflow-hidden rounded-l-[120px] lg:rounded-l-[180px]">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
