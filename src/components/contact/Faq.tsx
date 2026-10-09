"use client";

import { useRef, useState } from "react";
import styles from "./Contact.module.css";

type FaqItem = {
    id: string;
    question: string;
    answer: string;
};

const faqItems: FaqItem[] = [
    {
        id: "01",
        question: "What is Ritz Media World's response time to an inquiry?",
        answer: "Ritz Media World aims to respond to all queries within 4 business hours during business days.\n\nFor urgent needs you can connect with us on call at +91 9220516777, our operating hours are Monday - Friday, 9:30AM - 6:30PM.",
    },
    {
        id: "02",
        question: "Does Ritz Media World work with startups and small businesses?",
        answer: "Yes. We work with startups, growing brands, and established businesses with tailored strategies for each stage.",
    },
    {
        id: "03",
        question: "What does Ritz Media's free brand consultation include?",
        answer: "Our consultation includes a discovery call, current brand assessment, opportunity mapping, and service recommendations.",
    },
    {
        id: "04",
        question: "Can I hire a single service from Ritz Media?",
        answer: "Absolutely. You can engage us for individual services or a full-scope marketing partnership.",
    },
    {
        id: "05",
        question: "How do you measure campaign success?",
        answer: "We track outcomes against goals using relevant KPIs such as reach, engagement, leads, conversions, and ROI.",
    },
    {
        id: "06",
        question: "Does Ritz Media work with clients beyond Noida and Delhi NCR?",
        answer: "Yes. We collaborate with clients across India and internationally through remote and hybrid engagement models.",
    },
    {
        id: "07",
        question: "What industries does Ritz Media serve?",
        answer: "We serve a wide range of industries including real estate, healthcare, education, retail, hospitality, and technology.",
    },
    {
        id: "08",
        question: "How do I begin with Ritz Media World?",
        answer: "You can get started by sharing your requirements through our contact form, email, or a quick consultation call.",
    },
];

export default function Faq() {
    const [activeId, setActiveId] = useState<string>(faqItems[0].id);
    const answerRefs = useRef<Record<string, HTMLDivElement | null>>({});

    return (
        <section className="w-full px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12">
            <div className="mx-auto w-full max-w-[1366px]">
                <div className="overflow-hidden rounded-[12px] bg-white lg:grid lg:grid-cols-[42.8%_57.2%]">
                    <div className="px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                        <h2 className={` ${styles.montserratBold} text-[30px] font-semibold leading-[1.05] tracking-[-0.01em] text-[#0E0E0E] sm:text-[35px] md:text-[40px] lg:text-[45px]`}>
                            Frequently asked questions
                        </h2>

                        <p className={`mt-7  text-[14px] font-semibold leading-[1.28] text-[#111111] sm:text-[15px] lg:mt-9 lg:text-[16px] ${styles.fontopensans}`}>
                            Ready to Unleash the Power of Your Brand.
                        </p>

                        <p className={`${styles.fontopensans} mt-5 max-w-[500px]  text-[14px] leading-[1.72] text-[#2F2F2F] sm:text-[15px] lg:mt-6 lg:max-w-[560px] lg:text-[16px]`}>
                            The FAQ section answers the most commonly asked questions related to our services. See how Ritz Media World can create creative solutions for your specific needs and beyond expectations.
                        </p>
                    </div>

                    <div className="py-0">
                        {faqItems.map((item) => {
                            const isOpen = activeId === item.id;
                            const isFirst = item.id === faqItems[0].id;
                            const isLast = item.id === faqItems[faqItems.length - 1].id;

                            return (
                                <div
                                    key={item.id}
                                    className={`-mt-[7px] overflow-hidden border border-[#1A235C] ${isFirst ? "mt-0 rounded-t-[12px]" : "rounded-t-[12px]"
                                        } ${isLast ? "rounded-b-[12px]" : ""} ${isOpen ? "bg-[#1A235C] text-white" : "bg-[#FFFFFF] text-[#111111]"
                                        }`}
                                >
                                    <button
                                        type="button"
                                        className="flex min-h-[62px] w-full items-center gap-4 rounded-t-[12px] px-5 py-4 text-left sm:min-h-[70px] sm:px-6 sm:py-5 lg:min-h-[72px] lg:px-7"
                                        onClick={() => setActiveId((prev) => (prev === item.id ? prev : item.id))}
                                        aria-expanded={isOpen}
                                    >
                                        <span className={` ${styles.montserratBold}  text-[16px] leading-none sm:text-[18px] lg:text-[18px]`}>
                                            {item.id}
                                        </span>
                                        <span className={`${styles.montserratBold} text-[16px]  leading-[1.32] sm:text-[17px] lg:text-[18px]`}>
                                            {item.question}
                                        </span>
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-[height,opacity] duration-500 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"
                                            }`}
                                        style={{
                                            height: isOpen
                                                ? `${answerRefs.current[item.id]?.scrollHeight ?? 0}px`
                                                : "0px",
                                        }}
                                    >
                                        <div
                                            ref={(el) => {
                                                answerRefs.current[item.id] = el;
                                            }}
                                            className="px-5 pb-6 sm:px-6 sm:pb-7 lg:px-7 lg:pb-8"
                                        >
                                            <p className={`max-w-[900px] whitespace-pre-line [font-family:'Open_Sans',sans-serif] text-[14px] leading-[1.8] text-white/90 sm:text-[15px] lg:text-[16px]`}>
                                                {item.answer}
                                            </p>
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
