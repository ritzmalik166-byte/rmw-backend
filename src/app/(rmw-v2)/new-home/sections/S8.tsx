"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

type Testimonial = {
  comment: string;
  name: string;
  designation?: string;
};

const testimonials: Testimonial[] = [
  {
    comment:
      "To me, advertising my brand was merely a means to ensure my elongated presence in the market. Thanks to ritz Media world, my advertisements not only ensured my brand’s sustenance but have also got me a great number of quality leads.",
    name: "Madhusudan Ghee",
    designation: "Managing Director",
  },
  {
    comment:
      "If there is one thing serving as a full service digital agency for more than a decade taught us, it has to be the value of relationships. Therefore, our relationship with our clients is both a priority and a point of pride to us.",
    name: "FAIRFOX - EON",
    designation: "Marketing Head",
  },
  {
    comment:
      "They not only make sure that they deliver on their promises, but also educate you on what exactly is needed to be done for your brand, thereby preventing you from under or over spending your precious money.",
    name: "Eldeco Group",
    designation: "Managing Director",
  },
  {
    comment:
      "I must admit that RMW and its team of professionals are always on my favourite list. They have always delivered the best services to me even if they had to put in extra efforts and their team has always been available for extensive support.",
    name: "Escorts Tractor",
    designation: "Chief Communication Officer",
  },
];

function S8() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  const nameRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<HTMLButtonElement[]>([]);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentSlide = useMemo(
    () => testimonials[activeIndex % testimonials.length],
    [activeIndex]
  );

  const animateSlide = () => {
    if (!sliderRef.current || !messageRef.current || !nameRef.current) {
      return;
    }

    // Adjust animation distance based on screen size
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const isTablet = typeof window !== "undefined" && window.innerWidth < 1024;
    const messageX = isMobile ? 40 : isTablet ? 60 : 80;
    const nameX = isMobile ? 30 : isTablet ? 45 : 60;

    const slideTimeline = gsap.timeline();

    slideTimeline.fromTo(
      messageRef.current,
      { autoAlpha: 0, x: messageX },
      { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out" }
    );

    slideTimeline.fromTo(
      nameRef.current,
      { autoAlpha: 0, x: nameX },
      { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    // Get active dot dimensions based on screen size
    const activeDotWidth = isMobile ? 24 : 30;
    const inactiveDotWidth = isMobile ? 8 : 10;

    gsap.to(".testimonial-dot", {
      width: inactiveDotWidth,
      backgroundColor: "#D0D5DD",
      duration: 0.3,
      ease: "power2.out",
    });

    const activeDot = dotsRef.current[activeIndex];
    if (activeDot) {
      gsap.to(activeDot, {
        width: activeDotWidth,
        backgroundColor: "#4F4F4F",
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleDotClick = (index: number) => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    setActiveIndex(index);
    startAutoplay();
  };

  const startAutoplay = () => {
    if (autoplayRef.current) {
      return;
    }
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6500);
  };

  useEffect(() => {
    animateSlide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Adjust initial animation based on screen size
      const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
      const initialY = isMobile ? 20 : 40;

      gsap.fromTo(
        sliderRef.current,
        { autoAlpha: 0, y: initialY },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      animateSlide();
    }, sliderRef);

    startAutoplay();

    return () => {
      ctx.revert();
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="testimonials" className="w-full flex justify-center overflow-x-hidden overflow-y-hidden items-center bg-gradient-to-br from-[#F9FAFB] to-[#ffffff] py-10 sm:py-14 md:py-20 md:pt-4 lg:py-20 px-4 sm:px-6 max-w-full min-h-screen">
      {/* Centered Align Div  */}
      <div className="w-full sm:w-[95%] md:w-[92%] lg:w-[90%] lg:max-w-[1400px] flex flex-col items-center gap-6 sm:gap-10 md:gap-14 lg:gap-16 relative overflow-y-hidden max-h-full">
        {/* Top Header Div  */}
        <div className="w-full relative flex flex-col justify-center items-center text-center gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 px-2 sm:px-4 md:px-0">
          <button className="inline-flex h-8 sm:h-9 w-[140px] sm:w-[156px] items-center justify-center rounded-full bg-[#F3830E] text-[12px] sm:text-[13px] lg:text-[14px] font-[400] text-[#ffffff]">
            Clients Testimonials
          </button>
          <h2 className="font-[600] text-[24px] sm:text-[28px] md:text-[36px] lg:text-[48px] leading-[1.2] sm:leading-[1.2] md:leading-[1.1] text-[#101828] px-2 md:flex">
            What Our Clients{" "}
            <span className="text-[#F3830E] md:block transform -translate-y-[4px]">
              Say
            </span>
          </h2>
          <p className="max-w-full sm:max-w-[600px] md:max-w-[650px] font-[400] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] text-[#4A5565] px-2 sm:px-4 md:px-0">
            Don&apos;t just take our word for it – hear from the brands
            we&apos;ve helped transform.
          </p>

          {/* Absoute Positioned Robot Div - Hidden on mobile, visible on tablet+ */}
          <div className="hidden md:block absolute left-0 lg:left-10 top-0 opacity-60 bounceAnim lg:opacity-100 overflow-hidden pointer-events-none">
            <div className="w-[60px] h-[60px] lg:w-[90px] lg:h-[90px] relative">
              <Image
                src={"/new-page/icns/Robot.png"}
                alt="RMW Home Page"
                fill
                className="object-contain max-w-full"
              ></Image>
            </div>
          </div>

          {/* Absolute Positioned Right Line Div - Hidden on mobile, visible on tablet+ */}
          <div className="hidden lg:block absolute right-10 xl:right-20 top-12 xl:top-20 bounceAnim2 opacity-60 overflow-hidden pointer-events-none">
            <div className="w-[60px] h-[120px] lg:w-[77px] lg:h-[151px] relative rotate-[5deg]">
              <Image
                src={"/new-page/icns/rght-line.png"}
                alt="RMW"
                fill
                className="object-contain max-w-full"
              ></Image>
            </div>
          </div>
        </div>

        {/* Botom Testimonials Div  */}
        <div className="w-full relative min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[391px] border-b-[4px] sm:border-b-[6px] md:border-b-[8px] lg:border-b-[9px] border-[#F3830E] rounded-[16px] sm:rounded-[20px] md:rounded-[25px] lg:rounded-[30px] shadow-[0_15px_30px_rgba(16,24,40,0.06)] sm:shadow-[0_20px_40px_rgba(16,24,40,0.06)] md:shadow-[0_35px_70px_rgba(16,24,40,0.08)] bg-white/90 backdrop-blur flex justify-center items-center px-3 sm:px-5 md:px-7 lg:px-12 py-5 sm:py-7 md:py-9 lg:py-10 mx-2 sm:mx-0 overflow-hidden xl:w-[1100px] max-w-full">
          {/* Centered Align Slider  */}
          <div
            ref={sliderRef}
            className="w-full  sm:max-w-[600px] md:max-w-[750px] lg:w-[813px] flex flex-col justify-between items-center gap-5 sm:gap-6 md:gap-8 lg:gap-10"
          >
            <div className="relative w-full px-2 sm:px-4 md:px-0">
              {/* Decorative Quote - Smaller on mobile */}
              {/* <span className="pointer-events-none absolute -top-6 sm:-top-8 md:-top-10 lg:-top-12 left-1/2 -translate-x-1/2 text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] text-[#F3830E]/20 leading-none">
                &ldquo;
              </span> */}
              {/* Here The Testimonial Message Will Show */}
              <p
                ref={messageRef}
                className="testimonial-card relative z-10 text-center font-[400] text-[15px] sm:text-[17px] md:text-[19px] lg:text-[20px] leading-[1.7] sm:leading-[1.75] md:leading-[1.8] text-[#101828] pt-4 sm:pt-6 md:pt-8"
              >
                {currentSlide.comment}
              </p>
            </div>

            <div
              ref={nameRef}
              className="flex flex-col items-center gap-1 sm:gap-2"
            >
              {/* Here The User Name Will Show  */}
              <p className="text-[18px] sm:text-[20px] md:text-[21px] lg:text-[22px] font-[600] text-[#101828]">
                {currentSlide.name}
              </p>
              {currentSlide.designation ? (
                <span className="text-[14px] sm:text-[15px] md:text-[16px] font-[400] text-[#667085] text-center px-4 sm:px-0">
                  {currentSlide.designation}
                </span>
              ) : null}
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-3 pt-2 sm:pt-0">
              {/* Here The Pagination Dots Will Show And The Dot Size Will be 10px*10px with rounded-full property and the active dot width will be 30px and bg will be #4F4F4F and slides will slide from right to left  */}
              {testimonials.map((_, index) => (
                <button
                  key={`testimonial-dot-${index.toString()}`}
                  ref={(el) => {
                    if (el) {
                      dotsRef.current[index] = el;
                    }
                  }}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Show testimonial ${index + 1}`}
                  className={`testimonial-dot h-[8px] sm:h-[10px] rounded-full transition-[width,background-color] duration-300 ease-out ${
                    activeIndex === index
                      ? "w-[24px] sm:w-[30px] bg-[#4F4F4F]"
                      : "w-[8px] sm:w-[10px] bg-[#D0D5DD]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Absolute Positioned Left Line Div - Hidden on mobile, visible on large screens */}
        <div className="hidden leftDirAnim xl:block absolute left-0 lg:left-0 xl:left-[10px] bottom-0 lg:bottom-0 xl:bottom-0 z-20 opacity-60 overflow-hidden pointer-events-none">
          <div className="w-[70px] h-[120px] xl:w-[87px] xl:h-[151px] relative rotate-[5deg]">
            <Image
              src={"/new-page/icns/lft-line.png"}
              alt="RMW"
              fill
              className="object-contain max-w-full"
            ></Image>
          </div>
        </div>
      </div>
    </section>
  );
}

export default S8;
