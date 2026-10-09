"use client";

import Image from "next/image";
import styles from "./page.module.css";
import s8 from "./Section8.module.css";

const CULTURE_ROW_1 = [
  {
    src: "/new-about/s7/s7-r1-i1.png",
    alt: "Ritz Media World office culture — creative team collaboration",
    title: "Office culture – Ritz Media World",
  },
  {
    src: "/new-about/s7/awd.jpg",
    alt: "Awards and achievements at Ritz Media World",
    title: "Awards – Ritz Media World",
  },
  {
    src: "/new-about/s7/s7-r1-i2.png",
    alt: "Team celebration at Ritz Media World",
    title: "Team celebration – Ritz Media World",
  },
] as const;

const CULTURE_ROW_2_SIDE = [
  {
    src: "/new-about/s7/team_s7_r1.jpg",
    alt: "Creative workspace at Ritz Media World",
    title: "Creative workspace – Ritz Media World",
  },
  {
    src: "/new-about/s7/s7-r2-i3.png",
    alt: "Collaborative culture at Ritz Media World",
    title: "Collaborative culture – Ritz Media World",
  },
] as const;

const CULTURE_ROW_2_CENTER = {
  src: "/new-about/s7/s7-r2-i2.png",
  alt: "Ritz Media World team — our culture of creativity and innovation",
  title: "Our culture – Ritz Media World",
} as const;

function Section8() {
  return (
    <section className={`flex w-full items-center justify-center pt-[40px] xl:pt-[70px] ${s8.root}`}>
      <div className={`w-full ${styles.containerWidth} flex flex-col gap-8 xl:gap-12 ${s8.container}`}>
        <div className="w-full flex flex-col justify-center items-center text-center">
          <h2 className={`font-[600] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] ${styles.fontmontserrat} ${s8.heading}`}>
            Our Culture
          </h2>
          <p className={`font-[400] text-[14px] sm:text-[15px] md:text-[16px] text-[#000000] max-w-[698px] md:px-4 ${styles.fontpoppins} ${s8.subtitle}`}>
            In our culture, we nurture creativity, seek out innovation,
            encourage collaboration, cultivate happiness, and occasionally
            break into senseless laughter.
          </p>
        </div>

        <div className={`w-full flex flex-col gap-4 md:gap-6 ${s8.gapRows}`}>
          <div className={`w-full flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 ${s8.gapRows}`}>
            {CULTURE_ROW_1.map((img) => (
                <div
                  className={`w-full sm:w-[calc(33.333%-0.67rem)] md:w-[calc(33.333%-1rem)] lg:w-[400px] h-[200px] sm:h-[250px] md:h-[280px] lg:h-[303px] relative overflow-hidden group cursor-pointer ${s8.tileR1}`}
                  key={img.src}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    title={img.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 400px"
                    className="transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                </div>
            ))}
          </div>

          <div className={`flex flex-col justify-center gap-4 md:gap-6 lg:flex-row lg:items-stretch ${s8.gapRows} ${s8.bottomRow}`}>
            <div className={`flex w-full shrink-0 flex-col gap-4 md:gap-6 lg:w-[400px] ${s8.gapRows} ${s8.sideCol}`}>
              {CULTURE_ROW_2_SIDE.map((img, idx) => (
                    <div
                      className={`w-full ${
                        idx === 0
                          ? `h-[200px] sm:h-[250px] md:h-[280px] lg:h-[303px] ${s8.h303}`
                          : `h-[300px] sm:h-[350px] md:h-[400px] lg:h-[449px] ${s8.h449}`
                      } relative overflow-hidden group cursor-pointer`}
                      key={img.src}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        title={img.title}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 1024px) 100vw, 400px"
                        className="transition-transform duration-700 ease-in-out group-hover:scale-110"
                      />
                    </div>
              ))}
            </div>

            <div className={`group relative h-[400px] w-full min-h-[280px] overflow-hidden sm:h-[500px] md:h-[600px] lg:h-auto lg:min-h-0 lg:w-[820px] lg:shrink-0 lg:self-stretch ${s8.center}`}>
              <Image
                src={CULTURE_ROW_2_CENTER.src}
                alt={CULTURE_ROW_2_CENTER.alt}
                title={CULTURE_ROW_2_CENTER.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1024px) 100vw, 820px"
                className="transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
  <button
    onClick={() => window.open("https://ritzmediaworld.com/gallery", "_blank")}
    className={`group relative overflow-hidden w-[141px] h-[50px] text-[15px] font-[700] text-white rounded-[8px]
    bg-[#C99237] cursor-pointer border border-[#C99237] ${s8.btn}`}
  >
    {/* Sliding Background */}
    <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>

    {/* Text */}
    <span className="relative z-10 transition-colors duration-500 group-hover:text-[#C99237]">
      View More
    </span>
  </button>
</div>
      </div>
    </section>
  );
}

export default Section8;