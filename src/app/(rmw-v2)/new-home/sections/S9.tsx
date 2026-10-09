"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BsArrowDown } from "react-icons/bs";
import { gsap } from "gsap";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question:
      "Best Creative Agency In The Real Estate Segment In Delhi NCR",
    // question: "What services does RMW offer?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
  },
  {
    question:
      "Best Real Estate Podcast Beyond The Blueprints",
    // question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on the scope and complexity of the work. A typical branding project may take 4-6 weeks, while a complete digital marketing campaign can range from 2-8 weeks. We work closely with clients to establish realistic timelines and deliver high-quality results within agreed timeframes.",
  },
  {
    question:
      "Excellence In Digital Media By Dainik Jagran",
    // question: "What is your approach to client collaboration?",
    answer:
      "We believe in transparent communication and collaborative partnerships. Our team maintains regular check-ins, provides progress updates, and welcomes client feedback throughout the project lifecycle. We strive to be an extension of your team, always available for support and consultation.",
  },
  {
    question:
      "Trsuted Digital Advertising  Agency In NCR-Awarded by The Economic Times",
    // question: "What services does RMW offer?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
  },
  {
    question:
      "Icons By The Times Of India",
    // question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on the scope and complexity of the work. A typical branding project may take 4-6 weeks, while a complete digital marketing campaign can range from 2-8 weeks. We work closely with clients to establish realistic timelines and deliver high-quality results within agreed timeframes.",
  },
  {
    question:
      "Soecial Achievement Award In Retail Category",
    // question: "What is your approach to client collaboration?",
    answer:
      "We believe in transparent communication and collaborative partnerships. Our team maintains regular check-ins, provides progress updates, and welcomes client feedback throughout the project lifecycle. We strive to be an extension of your team, always available for support and consultation.",
  },
];

function S9() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAccordion = (index: number) => {
    const isOpening = openIndex !== index;
    const newOpenIndex = isOpening ? index : null;
    setOpenIndex(newOpenIndex);

    // Animate the clicked accordion item
    const accordionItem = accordionRefs.current[index];
    const answerContent = answerRefs.current[index];
    const arrowIcon = accordionItem?.querySelector(
      ".arrow-icon"
    ) as HTMLElement | null;

    if (!accordionItem || !answerContent) return;

    if (isOpening) {
      // Close previously open item
      if (openIndex !== null && openIndex !== index) {
        const prevItem = accordionRefs.current[openIndex];
        const prevAnswer = answerRefs.current[openIndex];
        const prevArrow = prevItem?.querySelector(
          ".arrow-icon"
        ) as HTMLElement | null;

        if (prevItem && prevAnswer) {
          gsap.to(prevAnswer, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => {
              prevAnswer.style.display = "none";
              prevAnswer.style.height = "auto";
            },
          });
          if (prevArrow) {
            gsap.to(prevArrow, {
              rotation: 0,
              duration: 0.3,
              ease: "power2.inOut",
            });
          }
        }
      }

      // Open new item
      answerContent.style.display = "block";
      const targetHeight = answerContent.scrollHeight;
      answerContent.style.height = "0px";
      answerContent.style.opacity = "0";

      gsap.to(answerContent, {
        height: targetHeight,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          answerContent.style.height = "auto";
        },
      });

      if (arrowIcon) {
        gsap.to(arrowIcon, {
          rotation: 180,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    } else {
      // Close current item
      answerContent.style.height = `${answerContent.scrollHeight}px`;
      // Force reflow
      answerContent.offsetHeight;
      gsap.to(answerContent, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          answerContent.style.display = "none";
          answerContent.style.height = "auto";
        },
      });

      if (arrowIcon) {
        gsap.to(arrowIcon, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Adjust animation distance based on screen size
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const imageX = isMobile ? -30 : -50;
      const contentX = isMobile ? 30 : 50;

      // Initialize arrow rotations to 0 and ensure answer content is hidden
      accordionRefs.current.forEach((accordionItem, idx) => {
        if (accordionItem) {
          const arrowIcon = accordionItem.querySelector(
            ".arrow-icon"
          ) as HTMLElement | null;
          if (arrowIcon) {
            gsap.set(arrowIcon, { rotation: 0 });
          }
        }
        // Ensure answer content starts hidden
        const answerContent = answerRefs.current[idx];
        if (answerContent) {
          answerContent.style.display = "none";
          answerContent.style.height = "auto";
          answerContent.style.opacity = "0";
        }
      });

      // Initial animation for section
      gsap.fromTo(
        imageRef.current,
        { autoAlpha: 0, x: imageX },
        { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );

      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0, x: contentX },
        { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
      );

      // Stagger animation for FAQ items
      gsap.fromTo(
        accordionRefs.current.filter((ref) => ref !== null),
        { autoAlpha: 0, y: isMobile ? 15 : 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.6,
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-screen min-h-screen flex justify-center items-center py-12 sm:py-16 md:py-20 lg:py-24 overflow-x-hidden bg-cover bg-no-repeat bg-center bg-[url(/home-v3/awards-bg/awards-bg-mobile.png)] md:bg-[url(/home-v3/awards-bg/awards-bg-desktop.png)]"
    >
      {/* Centered Positioned Div */}
      <div className="w-[90%] max-w-[1400px] flex flex-col lg:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
        {/* Left Side Image  */}
        <div
          ref={imageRef}
          className="w-full lg:flex-1 h-[280px] sm:h-[350px] md:h-[420px] lg:h-[500px] xl:h-[580px] 2xl:h-[650px] relative flex-shrink-0 order-2 lg:order-1"
        >
          <Image
            src={"/new-page/award-img.jpg"}
            alt="RMW FAQ"
            fill
            className="object-contain"
            priority
          />

          {/* Absolute Position Div - Responsive positioning */}
          <div className="hidde md:absolute -right-8 sm:-right-12 md:-right-16 lg:-right-18 -top-10 sm:-top-12 md:-top-16 lg:-top-20 -z-10 opacity-60 lg:opacity-100">
            <div className="relative w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] lg:w-[218px] lg:h-[218px]">
              <Image
                src={"/new-page/icns/Ellipse1.png"}
                alt="RMW Decorative"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right Side Content  */}
        <div
          ref={contentRef}
          className="w-full lg:flex-1 flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 order-1 lg:order-2"
        >
          {/* Heading */}
          <div>
            <p className="font-[400] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[42px] leading-[30px] text-white">
              Awards & Company<span className="text-[#D4A574]">Recognitions</span>
            </p>
          </div>

          {/* FAQ Accordion Items */}
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
            {faqData.map((faq, idx) => {
              return (
                <div
                  key={`faq-${idx}`}
                  ref={(el) => {
                    accordionRefs.current[idx] = el;
                  }}
                  className="group w-full min-h-[56px] sm:min-h-[64px] md:min-h-[72px] lg:min-h-[80px] bg-[#3A4966] hover:bg-[#4A5A76] text-white rounded-[12px] sm:rounded-[14px] md:rounded-[16px] lg:rounded-[18px] xl:rounded-[20px] overflow-hidden transition-all duration-300 cursor-pointer border border-transparent hover:border-[#D4A574]/30 hover:shadow-lg hover:shadow-[#D4A574]/10"
                  onClick={() => toggleAccordion(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleAccordion(idx);
                    }
                  }}
                  aria-expanded={openIndex === idx}
                >
                  {/* Question Row */}
                  <div className="flex justify-between items-center gap-3 sm:gap-4 md:gap-5 px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-3 sm:py-4 md:py-5 lg:py-6">
                    <p className="font-[400] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] leading-[1.4] sm:leading-[1.5] text-white group-hover:text-[#D4A574] transition-colors duration-300 flex-1">
                      {faq.question}
                    </p>
                    <div className="arrow-icon flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex items-center justify-center transition-transform duration-300 group-hover:-rotate-90">
                      <BsArrowDown className="w-full h-full text-[#ffffff] group-hover:text-[#D4A574] transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Answer Content */}
                  {/* <div
                    ref={(el) => {
                      answerRefs.current[idx] = el;
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-5 md:px-6 lg:px-8 pb-4 sm:pb-5 md:pb-6">
                      <p className="font-[400] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.7] text-white/90">
                        {faq.answer}
                      </p>
                    </div>
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default S9;
