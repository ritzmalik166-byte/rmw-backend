"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import pageStyles from "@/components/contact.html2/sections/page.module.css";

const NAVY_ACTIVE = "#1E255E";

const faqItems = [
  {
    id: "01",
    question: "Which files are needed for a 3D rendering?",
    answer:
      "We generally use architectural floor plans, elevation drawings, site plans, and any references or moodboards we are given on finishes. We can use CAD, PDF's, or even hand drawn sketches - we accommodate projects whatever the current stage of development.",
  },
  {
    id: "02",
    question: "Can 3D renders be made for unbuilt projects?",
    answer:
      "Yes, Pre-construction visualizations is in fact one of our most common uses. The photorealistic images are created using only blueprints and architectural designs, enabling you to market and sell units before a brick has been laid.",
  },
  {
    id: "03",
    question: "How long does it take to create a set of 3D renderings?",
    answer:
      "Standard turnaround is between 5-10 working days depending on the difficulty and the amount of images required. Rush turnaround is available and can be used on time sensitive launches. We will always agree on the date of completion before we start on your project.",
  },
  {
    id: "04",
    question: "Do you offer 3D rendering for Delhi NCR regions?",
    answer:
      "Yes, Ritz Media World offers architectural 3D rendering services in Delhi, Gurgaon, Noida, Faridabad, Greater Noida and across other Delhi NCR areas. For larger township and commercial projects, we provide services all over Pan India",
  },
  {
    id: "05",
    question: "Can 3D renders be used in direct marketing campaigns?",
    answer:
      "Yes, In fact they have proven themselves to work wonders. We provide images in all formats optimized forFacebook Ads, Google Display, Instagram, website banners and print brochures ensuring you are making your advertisements as effective as possible, at all times.",
  },
];

export default function Faq3D() {
  const [activeId, setActiveId] = useState(faqItems[0].id);
  const [heights, setHeights] = useState<Record<string, number>>({});
  const answerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const measureHeights = useCallback(() => {
    const next: Record<string, number> = {};
    faqItems.forEach((item) => {
      const el = answerRefs.current[item.id];
      if (el) next[item.id] = el.scrollHeight;
    });
    setHeights(next);
  }, []);

  useLayoutEffect(() => {
    measureHeights();
    window.addEventListener("resize", measureHeights);
    return () => window.removeEventListener("resize", measureHeights);
  }, [measureHeights, activeId]);

  return (
    <section className="w-full bg-white px-4 pt-[35px] pb-[35px] md:px-6 md:pt-[70px] md:pb-[70px] lg:px-8">
      <div className="mx-auto w-full max-w-[1366px]">
        <div
          className={`overflow-hidden rounded-[12px] bg-white ${pageStyles.fontopensans} lg:grid lg:grid-cols-[42.8%_57.2%] lg:items-center`}
        >
          <div className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <h2
              className={`${pageStyles.fontMontserrat} text-center text-[30px] font-semibold leading-[1.05] tracking-[-0.01em] text-[#0E0E0E] sm:text-[35px] md:text-[40px] lg:text-left lg:text-[30px] xl:text-[45px]`}
            >
              Frequently Asked Questions
            </h2>

            <p
              className={`mt-7 text-center text-[14px] font-semibold leading-[1.28] text-[#111111] sm:text-[15px] lg:mt-9 lg:text-left lg:text-[16px] ${pageStyles.fontopensans}`}
            >
              Your 3D Rendering Questions, Answered!
            </p>

            <p
              className={`mt-5 text-center text-[14px] leading-[1.72] text-[#2F2F2F] sm:text-[15px] lg:mt-6 lg:max-w-[560px] lg:text-left lg:text-[16px] xl:max-w-[500px]`}
            >
              We provide comprehensive information on necessary files, render
              times, walkthrough videos, revisions, and how our 3D rendering
              service can help your project stand out.
            </p>
          </div>

          <div className="py-0">
            {faqItems.map((item, index) => {
              const isOpen = activeId === item.id;
              const isFirst = index === 0;
              const isLast = index === faqItems.length - 1;

              return (
                <div
                  key={item.id}
                  className={`-mt-[7px] overflow-hidden border border-solid border-[#1A235C] transition-[background-color] duration-300 ease-out ${
                    isFirst ? "mt-0 rounded-t-[12px]" : "rounded-t-[12px]"
                  } ${isLast ? "rounded-b-[12px]" : ""} ${
                    isOpen
                      ? "relative z-[2] text-white"
                      : "relative z-[1] bg-white text-[#111111] hover:bg-[#F8F9FC]"
                  }`}
                  style={
                    isOpen ? { backgroundColor: NAVY_ACTIVE } : undefined
                  }
                >
                  <button
                    type="button"
                    className="flex min-h-[62px] w-full cursor-pointer items-center gap-4 rounded-t-[12px] px-5 py-4 text-left sm:min-h-[70px] sm:gap-5 sm:px-6 sm:py-5 lg:min-h-[72px] lg:px-7"
                    onClick={() =>
                      setActiveId((prev) =>
                        prev === item.id ? prev : item.id
                      )
                    }
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`${pageStyles.fontMontserrat} w-10 shrink-0 text-[16px] font-semibold leading-none sm:w-12 sm:text-[18px] lg:text-[18px]`}
                    >
                      {item.id}
                    </span>
                    <h3
                      className={`${pageStyles.fontMontserrat} m-0 flex-1 text-[16px] font-semibold leading-[1.32] sm:text-[17px] lg:text-[18px]`}
                    >
                      {item.question}
                    </h3>
                  </button>

                  <div
                    className={`overflow-hidden transition-[height,opacity] duration-500 ease-in-out ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      height: isOpen
                        ? heights[item.id]
                          ? `${heights[item.id]}px`
                          : "auto"
                        : "0px",
                    }}
                  >
                    <div
                      ref={(el) => {
                        answerRefs.current[item.id] = el;
                      }}
                      className="px-5 pb-6 sm:px-6 sm:pb-7 lg:px-7 lg:pb-8"
                    >
                      <div className="flex gap-4 sm:gap-5">
                        <span className="w-10 shrink-0 sm:w-12" />
                        <p className="max-w-[900px] whitespace-pre-line text-[14px] leading-[1.8] text-white/90 sm:text-[15px] lg:text-[16px]">
                          {item.answer}
                        </p>
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
