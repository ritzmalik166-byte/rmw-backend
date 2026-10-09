import Link from "next/link";
import styles from "./webDevelopment.module.css";

const EXPLORE_ARROW_IMAGE =
  "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

export default function Section2() {
  return (
    <section className="flex w-full items-center justify-center bg-white py-[35px] lg:py-[50px]">
      <div
        className={`${styles.page_containerWidth} mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-14`}
      >
        <div
          className={`mx-auto flex w-full max-w-[1300px] flex-col gap-5 text-center md:gap-6 lg:gap-7 ${styles.montserrat} ${styles.aboutIntro}`}
        >
          <p className="text-[14px] font-normal leading-[1.65] text-black sm:text-[15px] md:text-[16px] lg:text-[18px] lg:leading-[1.6] xl:text-[20px] xl:leading-[1.55]">
            In today's era, your website isn&apos;t merely a collection of
            pages, it&apos;s your brand&apos;s most persuasive spokesperson.{" "}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap font-semibold text-[#C99237] hover:underline"
              title="Ritz Media World"
            >
              Ritz Media World,
            </a>{" "}
            websites with a purpose, through our unique combination of custom web
            development, responsive design and{" "}
            <em className="not-italic">website performance optimization</em> we create websites that
            deliver real results for your business.
          </p>

          <p
            className={`${styles.fontopensans} text-[14px] font-normal leading-[1.65] text-black sm:text-[10px] md:text-[12px] lg:text-[12px] lg:leading-[1.6] xl:text-[16px] xl:leading-[1.55]`}
          >
            Recognised as a trustworthy{" "}
            <em className="font-semibold italic">
              web development company in India
            </em>
            , a go-to option for any business looking for a web development
            company near me, we provide web development and{" "}
            <em className="font-semibold italic">
              web designing services in Delhi NCR
            </em>{" "}
            as well. We provide excellent{" "}
            <em className="font-semibold italic">
              web designing services in Noida
            </em>
            , Greater Noida and Delhi, creating all websites to have a high
            ranking, faster loading speeds, and better conversion rates.
          </p>

          <p
            className={`${styles.fontopensans} text-[14px] font-normal leading-[1.65] text-black sm:text-[10px] md:text-[12px] lg:text-[12px] lg:leading-[1.6] xl:text-[16px] xl:leading-[1.55]`}
          >
            Be it a custom made website, a CMS powered platform such as
            WordPress, or an e-commerce solution built to convert visitors into
            customers with secure payment gateways, API integrations and detailed
            tracking, we build all the elements to perform better. Our landing
            pages are developed with A/B testing, CRO (Conversion Rate
            Optimization), lead generation funnels, turning traffic into
            concrete results.
          </p>

          <div className="flex w-full items-center justify-center pt-1 md:pt-2">
            <Link
              href="/contact.html"
              title="Let's Talk Today"
              target="_blank"
              aria-label="Let's Talk Today"
              className="letsTalkToday flex items-center justify-center gap-4 rounded-[5px] p-0 xl:p-3"
            >
              <span className="text-[18px] font-[500] md:text-[20px]">
                Let&apos;s Talk Today
              </span>
              <span className="letsTalkTodayIcon flex h-10 w-10 items-center justify-center rounded-full bg-[#C99237] transition-colors hover:bg-[#b8822f] sm:h-11 sm:w-11">
                <img
                  src={EXPLORE_ARROW_IMAGE}
                  alt="Let's Talk Today – explore link arrow"
                  title="Let's Talk Today"
                  className="text-[16px] text-white"
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
