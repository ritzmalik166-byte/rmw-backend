"use client";

import Image from "next/image";
import React from "react";
import { gsap } from "gsap";

type StatCard = {
  title: string;
  boldPara: string;
  para: string;
  icn: string;
};

type SliderItem = {
  urls: string;
};

function S2() {
  const cardData: StatCard[] = React.useMemo(
    () => [
      {
        title: "17+",
        boldPara: "Words Written",
        para: "Industry-leading expertise",
        icn: "/new-page/icns/badge-2.png",
      },
      {
        title: "1000+",
        boldPara: "Creatives Published",
        para: "Across multiple sectors",
        icn: "/new-page/icns/badge-icn.png",
      },
      {
        title: "500+",
        boldPara: "Success Stories",
        para: "Brands transformed",
        icn: "/new-page/icns/users-icn.png",
      },
      {
        title: "94%",
        boldPara: "Client Retention",
        para: "Long-term partnerships",
        icn: "/new-page/icns/bolt-icn.png",
      },
      {
        title: "250%",
        boldPara: "Avg. ROI Increase",
        para: "Measured results",
        icn: "/new-page/icns/circle-icn.png",
      },
      {
        title: "50+",
        boldPara: "Campaigns Executed",
        para: "Pan-India presence",
        icn: "/new-page/icns/globe-icn.png",
      },
    ],
    []
  );

  const sliderData: SliderItem[] = React.useMemo(
    () => [
      { urls: "/new-page/s2/sl-1.png" },
      { urls: "/new-page/s2/sl-2.png" },
      { urls: "/new-page/s2/sl-3.png" },
      { urls: "/new-page/s2/sl-4.png" },
      { urls: "/new-page/s2/sl-5.png" },
      { urls: "/new-page/s2/sl-6.png" },
      { urls: "/new-page/s2/sl-7.png" },
    ],
    []
  );

  const sectionRef = React.useRef<HTMLElement | null>(null);
  const marqueeRef = React.useRef<HTMLDivElement | null>(null);

  const marqueeItems = React.useMemo(
    () => [...sliderData, ...sliderData],
    [sliderData]
  );

  React.useEffect(() => {
    if (!marqueeRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const track = marqueeRef.current;

      gsap.fromTo(
        track,
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 20,
          ease: "none",
          repeat: -1,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full justify-center overflow-hidden bg-[#ffffff] py-16 sm:py-20 md:pb-0 lg:py- lg:pb-10 lg:pt-20 bg-gradient-to-br from-[#F9FAFB] to-[#FFFFFF]"
    >
      <div className="flex w-full max-w-[90%] flex-col items-center gap-12 px-4 sm:px-6 lg:px-8">
        {/* Row 1 */}
        <div className="flex w-full md:max-w-3xl flex-col items-center gap-4 text-center">
          <button className="rounded-full bg-[#E8DDD1] px-6 py-2 text-xs font-[400] text-[#8B7355] sm:text-sm md:text-[14px]">
            Trusted by Industry Leaders
          </button>
          <h2 className="text-3xl font-semibold text-[#101828] sm:text-4xl lg:text-[48px] lg:leading-[1.15] md:flex ">
            Numbers That Speak{" "}
            <span className="text-[#D4A574] md:block transform -translate-y-[4px]">Excellence</span>
          </h2>
          <p className="text-base w-full text-[#4A5565] md:text-[20px] font-[400] lg:w-2xl">
            17 years of transforming brands into market leaders through creative
            strategy and proven results.
          </p>
        </div>

        {/* Row 2 */}
        <div className="grid w-full gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {cardData.map((card) => (
            <div
              key={card.title}
              className="flex h-full  gap-5 rounded-2xl border border-[#E8DDD1]/70 bg-white/70 px-6 py-5 lg:p-7"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8DDD1]">
                <Image
                  src={card.icn}
                  alt={card.boldPara}
                  width={28}
                  height={28}
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-3xl font-[500] text-[#101828] sm:text-[32px] md:text-[36px]">
                  {card.title}
                </h3>
                <p className="text-sm font-medium text-[#101828] sm:text-base">
                  {card.boldPara}
                </p>
                <p className="text-xs text-[#4A5565] sm:text-sm md:text-[14px] font[400]">
                  {card.para}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Row 3 */}
        {/* <div className="flex w-full flex-col items-center gap-12">
          <p className="text-sm text-[#4A5565] sm:text-base md:text-start text-center">
            Trusted by premium brands across real estate, lifestyle, and UHNI sectors
          </p>

          <div className="relative w-full overflow-hidden bg-white/70 py-6">
            <div
              ref={marqueeRef}
              className="flex min-w-[200%] items-center gap-10 px-8 sm:gap-16 sm:px-10"
            >
              {marqueeItems.map((item, idx) => (
                <div
                  key={`${item.urls}-${idx}`}
                  className="flex h-[82px] w-[147px] flex-shrink-0 items-center justify-center opacity-80 transition-opacity duration-300 hover:opacity-100"
                >
                  <Image src={item.urls} alt="Client logo" width={147} height={82} />
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default S2;
