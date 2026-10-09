import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";


const EXPLORE_ARROW_IMAGE =
  "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

export default function Section2() {
  return (
    <section className="w-full flex justify-center bg-white py-[35px] lg:py-[70px]  border-b border-[#E6E3E3] px-4 sm:px-6 lg:px-0">
      <div
        className={`w-full mx-auto flex flex-col lg:flex-row justify-between gap-6 lg:gap-6 xl:gap-10 overflow-hidden ${styles.containerWidth}`}
      >
        <div className="w-full lg:w-[54%] xl:w-[48%] min-w-0 max-lg:text-center lg:text-left">
            <div className="mx-auto w-full max-w-[760px] min-w-0 lg:mx-0">
              <div className="mx-auto w-full max-w-[616px] min-w-0 lg:mx-0">
                <p
                  className="text-[#1C1C1C] text-[18px] leading-[30px]"
                  style={{
                    fontFamily: "MontserratRegular",
                    fontWeight: 400,
                    fontStyle: "normal",
                    letterSpacing: 0,
                  }}
                >
                  <span className="font-[700]" style={{ fontFamily: "MontserratBold" }}>
                    Celebrity endorsement services
                  </span>{" "}
                   help brands earn customers’ trust, achieve brand recognition, and mold consumer behavior beyond glitz and glamour. At{" "}
                  <span
                    className="font-[700] text-[#C99237]"
                    style={{ fontFamily: "MontserratBold" }}
                  >
                    <a
                      href="https://ritzmediaworld.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Ritz Media World official website"
                      className="text-inherit no-underline hover:text-inherit"
                    >
                      Ritz Media World
                    </a>
                  </span>
                  , we develop brands and promote them with celebrities to attract and catch the impact.

                </p>
              </div>

              <div
                className="mt-3 sm:mt-4 text-[#000000] lg:max-w-[604px] lg:w-full text-[16px] leading-[27px]"
                style={{ fontFamily: "OpenSansRegular" }}
              >
                <p>
                Our team takes care of the entire process if you are looking for{" "}
                  <span className="font-[700] " style={{ fontFamily: "OpenSansBold" }}>
                    celebrity endorsement services for brand promotion
                  </span>
                  , <i>celebrity marketing campaigns</i>, or high-performing brand ambassador partnerships. Our celebrity endorsement campaigns enhance credibility, reach, and engagement.
                </p>
                <p className="mt-3 md:mt-4">
                  From scouting the best talent and setting up collaboration agreements
                  to executing flawless celebrity marketing campaigns, we
                  ensure that every celebrity endorsement campaign enhances
                  credibility, reach, and engagement.
                </p>
                <p className="mt-3 md:mt-4 ">By leveraging expertise in celebrity endorsements, we elevate your brand value as well as create a buzz for your audience, building trust by connecting you with the masses.</p>
              </div>

              <div className="mt-7 sm:mt-2 md:mt-6 lg:mt-7 flex items-center justify-center gap-4 lg:justify-start">
              <Link href="/contact.html" target="_blank" title="Let's Talk Today" aria-label="Let's Talk Today">
  <span
    className="text-[#0F1640] text-[19px] sm:text-[20px] md:text-[20px] lg:text-[18px] font-[500] cursor-pointer"
    style={{ fontFamily: "MontserratMedium" }}
  >
    Let&apos;s Talk Today
  </span>
</Link>

<Link
  href="/contact.html"
  target="_blank"
  title="Let's Talk Today"
  aria-label="Let's Talk Today"
  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C99237] hover:bg-[#0F1640] flex items-center justify-center transition-colors"
>
  <Image
    src={EXPLORE_ARROW_IMAGE}
    alt="Arrow"
    title="Arrow"
    width={22}
    height={20}
  />
</Link>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[46%] xl:w-[48%] min-w-0 max-lg:text-center md:mt-5 lg:mt-0 lg:text-left">
            <div className="flex w-full min-w-0 flex-col md:grid md:grid-cols-[42%_58%]">
              <div className="relative order-1 overflow-hidden md:order-none md:col-start-2 md:row-start-1 lg:h-full">
                <img
                  src="/varunimage/celebrity-page-image.png"
                  alt="Ritz Media World team"
                  title="Ritz Media World team"
                  className="w-full lg:h-full lg:w-full lg:object-cover h-auto"
                />
              </div>

              <div className="order-2 border-l border-[#D9D9D9] pl-[16px] pr-5 pt-6 sm:pt-7 md:order-none md:col-start-1 md:row-start-1 md:py-4 lg:min-h-[189px] lg:pt-2 lg:pl-[16px] lg:pr-5 lg:px-7 xl:pt-4 max-lg:border-l-0 max-md:pl-0 max-md:pr-0 max-md:text-center md:px-6 md:text-left lg:text-left">
                <p
                  className="text-[#0F1640] text-[52px] sm:text-[56px] md:text-[58px] lg:text-[56px] xl:text-[60px] leading-none font-[700]"
                  style={{ fontFamily: "MontserratSemiBold" }}
                >
                  35
                  <sup className="text-[30px] sm:text-[32px] md:text-[34px] top-[-1.7rem]">+</sup>
                </p>
                <p
                  className="mt-3 lg:mt-0 xl:mt-3 text-[#000000] text-[30px] sm:text-[34px] md:text-[18px] lg:text-[20px] font-[700] leading-none"
                  style={{ fontFamily: "MontserratSemiBold" }}
                >
                  Awards
                </p>
                <p
                  className="mt-3 lg:mt-1 xl:mt-3 lg:leading-[22px] lg:text-[15px] xl:text-[4px] xl:leading-[27px] text-[#000000] text-[16px] leading-[28px] font-[400] tracking-[0em] xl:text-[17px]"
                  style={{ fontFamily: "OpenSansRegular" }}
                >
                  Passion, Obsession, and Persistence always pay off.
                </p>
              </div>

              <div className="relative order-3 mt-5 md:mt-0 h-[300px] w-full overflow-hidden sm:h-[360px] md:order-none md:col-start-1 md:row-start-2 md:h-[430px] lg:h-[433px]">
                <Image
                  src="/service-v3/layer1/s7/aw2.png"
                  alt="Studio setup"
                  title="Studio setup"
                  fill
                  className="object-cover"
                  sizes="(min-width:1280px) 260px, (min-width:1024px) 220px, 42vw"
                />
              </div>

              <div className="order-4 md:pb-0 lg:pb-0 flex min-w-0 flex-col md:order-none md:col-start-2 md:row-start-2 md:py-8 max-lg:text-center lg:py-4 lg:text-left xl:py-7">
                <div className="max-md:order-1 max-md:mt-5 px-6 sm:px-7 lg:px-7 md:order-1 md:text-left">
                  <p
                    className="text-[#000000] text-[20px] leading-[28px] md:leading-[35px] lg:leading-[28px] font-[400] tracking-[0em] lg:max-w-[270px]"
                    style={{ fontFamily: "MontserratRegular " }}
                  >
                    Years of Storytelling, Turning Ideas Into Stories That Matter
                  </p>
                </div>

                <div className="relative mx-auto mt- max-md:order-2 w-full max-w-full overflow-visible sm:mt-7 md:mt-10 lg:mt-0 md:order-2 lg:mx-0 lg:mt-4 xl:mt-10 h-[108px] sm:h-[128px] md:h-[136px] lg:h-[156px]">
                  <div className="absolute inset-y-0 mt-0 max-md:inset-x-0 max-md:px-6 sm:max-md:px-7 md:left-7 md:-right-8 lg:-right-10 xl:-right-12 md:mt-6 lg:mt-8 xl:mt-0">
                    <div className="relative h-full w-full mt-4 md:mt-0">
                      <Image
                        src="/varunimage/17-working.png"
                        alt="17 years working experience"
                        title="17 years working experience"
                        fill
                        className="object-contain object-center md:object-left"
                        sizes="(min-width:1280px) 480px, (min-width:1024px) 400px, 65vw"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 max-md:order-3 h-[108px] sm:h-[128px] md:mt-[70px] md:h-auto md:block sm:mt-6 md:order-3 lg:mt-9 xl:mt-8 px-6 sm:px-7 lg:px-7 flex justify-center">
                <a
                  href="https://share.google/k0IbsAXQuNfr9nX8m"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Ritz Media World Google reviews"
                  aria-label="View Ritz Media World Google reviews"
                >
                  <img
                    src="/g-5-star2.png"
                    alt="Ritz Media World Google reviews rating"
                    title="Ritz Media World Google reviews rating"
                    className="block h-auto w-full max-w-[80%] sm:max-w-[90%] md:max-w-[60%] lg:max-w-none lg:w-full xl:max-w-[94%] max-md:h-full max-md:w-[200px] max-md:max-w-none max-md:object-contain max-md:object-center cursor-pointer"
                  />
                </a>
</div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
