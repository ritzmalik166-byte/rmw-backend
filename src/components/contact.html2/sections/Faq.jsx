"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import pageStyles from "./page.module.css";

const NAVY_ACTIVE = "#1E255E";

const FAQ_ITEMS = [
    {
        id: "01",
        question: "How can I expect the response after submitting the form?",
        answer:
            "We get back to you within 2–4 business hours. For urgent campaign or marketing queries, we prioritize faster replies, because as a digital marketing agency, we know your time is valuable.",
    },
    {
        id: "02",
        question: "Does Ritz Media World offer creative services in Delhi NCR?",
        answer:
            "Yes! We're a 360 degree digital marketing agency offering creative services, SEO services, social media management, paid ads, website design, and real estate lead generation, all across Delhi NCR.",
    },
    {
        id: "03",
        question: "How soon can digital marketing start showing results?",
        answer:
            "Paid ads can deliver results within days. SEO services take 3–6 months but build lasting growth. We recommend combining both for short-term wins and long-term authority.",
    },
    {
        id: "04",
        question: "Can you help generate real estate leads?",
        answer:
            "Absolutely. As a specialized real estate lead generation agency, we run targeted Meta and Google Ad campaigns, build high-converting landing pages, and deliver genuine buyer and investor enquiries, not just clicks.",
    },
    {
        id: "05",
        question: "Can I discuss my project before making a commitment?",
        answer:
            "Of course! We offer a free consultation, no pressure, no commitment. Just an honest conversation about your goals and how our digital marketing and creative services can help you get there.",
    },
    {
        id: "06",
        question: "How do I get started with Ritz Media World?",
        answer:
            "Simple, fill out the inquiry form, call, or email us. We'll schedule a quick discovery call and build a customized plan covering SEO services, paid ads, creative services, or whatever your brand needs.",
    },
    {
        id: "07",
        question: "Can you manage both organic and paid marketing?",
        answer:
            "Yes! We combine SEO services and organic strategies with paid advertising to deliver both immediate visibility and long-term growth, all managed by one dedicated digital marketing agency team.",
    },
    {
        id: "08",
        question: "Why should I contact Ritz Media World today?",
        answer:
            "Your competitors aren't waiting, so why are you? We're Delhi NCR's digital marketing agency that turns scrollers into buyers. Strong SEO services, sharp creative services, and real estate lead generation that actually delivers. Let's start today.",
    },
];

function Faq() {
    const [activeId, setActiveId] = useState(FAQ_ITEMS[0].id);
    const [heights, setHeights] = useState({});
    const answerRefs = useRef({});

    const measureHeights = useCallback(() => {
        const next = {};
        FAQ_ITEMS.forEach((item) => {
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
        <section className="w-full px-4 py-0 md:px-6 md:py-[0px] lg:px-8">
            <div className="mx-auto w-full max-w-[1366px]">
                <div
                    className={`overflow-hidden rounded-[12px] bg-white ${pageStyles.fontopensans} lg:grid lg:grid-cols-[42.8%_57.2%] lg:items-center`}
                >
                    {/* Left — intro */}
                    <div className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                        <h2
                            className={`${pageStyles.fontMontserrat} text-[30px] font-semibold leading-[1.05] tracking-[-0.01em] text-[#0E0E0E] text-center lg:text-left sm:text-[35px] md:text-[40px] xl:text-[45px] lg:text-[30px]`}
                        >
                            Frequently Asked Questions
                        </h2>

                        <p
                            className={`mt-7 text-[14px] font-semibold leading-[1.28] text-[#111111] text-center lg:text-left sm:text-[15px] lg:mt-9 lg:text-[16px] ${pageStyles.fontopensans}`}
                        >
                            Ready to Unleash the Power of Your Brand.
                        </p>

                        <p
                            className={`mt-5 xl:max-w-[500px] lg:w-full text-[14px] leading-[1.72] text-[#2F2F2F] text-center lg:text-left sm:text-[15px] lg:mt-6 lg:max-w-[560px] lg:text-[16px]`}
                        >
                            The FAQ section answers the most commonly asked
                            questions related to our services. See how Ritz Media
                            World can create creative solutions for your specific
                            needs and beyond expectations.
                        </p>
                    </div>

                    {/* Right — stacked accordion (Faq3D / contact pattern) */}
                    <div className="py-0">
                        {FAQ_ITEMS.map((item, index) => {
                            const isOpen = activeId === item.id;
                            const isFirst = index === 0;
                            const isLast = index === FAQ_ITEMS.length - 1;

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
                                        isOpen
                                            ? { backgroundColor: NAVY_ACTIVE }
                                            : undefined
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
                                            className={`${pageStyles.fontMontserrat} flex-1 text-[16px] font-semibold leading-[1.32] sm:text-[17px] lg:text-[18px] m-0`}
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

export default Faq;
