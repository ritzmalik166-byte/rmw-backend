import Image from "next/image";
import styles from "./page.module.css";

import ClientTestimonials from "@/components/influencer-marketing-agency-in-india/Section5";
import BrandImpactSection1 from "../copy/BrandImpactSection1";
import Clients from "../influencer-marketing-agency-in-india/Clients";
import AchievementAwards from "@/components/home-v3/S7"; 


const cards = [
  {
    icon: "/service-v3/celebrity-endorsements/high_fp/blueelip.png",
    h3: "Increase Visibility & Reach",
    description:
      "Celebrity endorsement of your brand captures instant attention and increases your brand reach. This helps your brand get noticed in a crowded marketplace.",
  },
  {
    icon: "/service-v3/celebrity-endorsements/high_fp/yellowelip.png",
    h3: "Establish Trust & Credibility",
    description:
      "Trust-building celebrities increase brand trust and credibility. Professional celebrity endorsement services increase your brand's credibility and believability.",
  },
  {
    icon: "/service-v3/celebrity-endorsements/high_fp/blueelip.png",
    h3: "Generate Engagement & Influence",
    description:
      "Celebrity marketing campaigns generate buzz and social media engagement. This builds stronger audience interaction and recall.",
  },
  {
    icon: "/service-v3/celebrity-endorsements/high_fp/yellowelip.png",
    h3: "Generate Leads & Conversions",
    description:
      "Brands partnering with celebrities for promotion generate stronger persuasion and recall. This results in higher enquiries, sales, and customer interest.",
  },
];

const rampOffsets = ["lg:mt-[180px]", "lg:mt-[120px]", "lg:mt-[60px]", "lg:mt-[0px]"];



export default function Section4() {
  return (
    <section className="w-full bg-white py-[35px] lg:py-[70px] overflow-x-hidden flex flex-col items-center">
      <div
        className={`w-full mx-auto px-4 sm:px-6 lg:px-0 ${styles.containerWidth}`}
      >
        <h2
          className="text-center text-black font-[700] leading-[30px] text-[24px] sm:text-[44px] md:text-[28px] lg:text-[36px] md:leading-[48px]"
          style={{ fontFamily: "MontserratBold" }}
        >
          <span className="block">Why Celebrity Endorsement Matter</span>
        </h2>

        <div className="mt-5 md:mt-10 lg:mt-10 xl:mt-20">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center lg:flex-nowrap lg:justify-start items-start">
            {cards.map((card, index) => (
              <div
                key={card.h3}
                className={`w-full min-w-0 sm:w-1/2 sm:max-w-[360px] lg:max-w-none lg:w-1/4 pb-5 sm:pb-12 lg:pb-0 ${rampOffsets[index]}`}
              >
                <div
                  className="relative lg:pl-9 xl:pl-8 lg:pr-6 xl:pr-5 lg:pt-0"
                >
                  {index === 0 ? (
                    <div className="absolute left-0 top-[38px] z-[1] hidden h-[274px] w-[0.5px] min-w-[0.5px] bg-[#E3E0E0] lg:block" />
                  ) : (
                    <div className="absolute left-0 top-[36px] z-[1] hidden h-[calc(100%+22px)] w-[0.5px] min-w-[0.5px] bg-[#E3E0E0] lg:block" />
                  )}
                  <div className="absolute left-0 top-[6px] z-0 hidden -translate-x-1/2 lg:mb-0 lg:block lg:-translate-x-1/2">
                    <img
                      src={card.icon}
                      alt={`${card.h3} – Ritz Media World`}
                      title={`${card.h3} – Ritz Media World`}
                      className="w-[30px] h-auto object-contain"
                    />
                  </div>

                  <div
                    className={
                      card.h3 === "Generate Engagement & Influence"
                        ? "lg:-mt-11"
                        : "lg:-mt-8"
                    }
                  >
                    <h3
                      className="text-center lg:text-left mx-auto lg:mx-0 text-black font-[700] text-[20px] leading-[30px] tracking-[0em] max-w-[288px] lg:leading-[25px] xl:leading-[30px] md:mt-0 mt-2"
                      style={{ fontFamily: "MontserratBold" }}
                    >
                      {card.h3 === "Generate Engagement & Influence" ? (
                        <>
                          Generate Engagement &amp;
                 
                          Influence
                        </>
                      ) : (
                        card.h3
                      )}
                    </h3>

                    {card.h3 === "Generate Leads & Conversions" ? (
                      <div className="mt-1 md:mt-3 w-full min-w-0 max-w-[224px] text-center lg:text-left mx-auto lg:mx-0">
                        <p
                          className="relative z-10 text-black font-[400] text-[16px] leading-[25px]  md:leading-[28px] tracking-[0em] lg:text-[14px] lg:leading-[25px] xl:text-[16px] xl:leading-[28px]"
                          style={{ fontFamily: "OpenSansRegular" }}
                        >
                          {card.description}
                        </p>
                      </div>
                    ) : (
                      <p
                        className="relative z-10 mt-1 md:mt-3 max-w-[234px] text-center lg:text-left mx-auto lg:mx-0 text-black font-[400] text-[16px] leading-[25px] tracking-[0em] lg:text-[15px] lg:leading-[25px] xl:text-[16px] xl:leading-[28px]"
                        style={{ fontFamily: "OpenSansRegular" }}
                      >
                        {card.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block lg:-mt-[180px] xl:-mt-[120px]">
  
  {/* XL → full width */}
  <div className="hidden xl:block relative w-full h-[278px]">
    <Image
      src="/varunimage/celebrity-bg.jpg"
      alt="Celebrity endorsement benefits section wave background – Ritz Media World"
      title="Celebrity endorsement benefits section wave background – Ritz Media World"
      fill
      className="object-cover"
      sizes="100vw"
    />
  </div>

  {/* LG → 700px width */}
  <div className="hidden lg:block xl:hidden lg:m-[80px]">
    <Image
      src="/varunimage/celebrity-bg.jpg"
      alt="Celebrity endorsement benefits section wave background – Ritz Media World"
      title="Celebrity endorsement benefits section wave background – Ritz Media World"
      width={900}
      height={278}
      className="mx-auto w-[900px] h-auto object-contain"
    />
  </div>

</div>
      </div>

      <div className="w-full -mt-8 sm:-mt-12 lg:-mt-[100px] xl:-mt-[0px] lg:pb-[20px]">
        {/* <ServicesV3SubslugLayer4Section5 /> */}
        <Clients pd="pt-[35px] lg:pt-[70px]" />
      </div>

      <div className="w-full -mt-4 sm:-mt-6 md:-mt-[0px] lg:-mt-[0px] xl:mt-[0px]">
        <ClientTestimonials />
      </div>

      <AchievementAwards />

      <div className="pt-[35px] lg:pt-[70px]">
        <BrandImpactSection1 />
      </div>
    </section>
  );
}
