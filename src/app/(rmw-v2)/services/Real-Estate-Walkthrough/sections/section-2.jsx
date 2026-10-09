import Image from "next/image";
import Link from "next/link";

const EXPLORE_ARROW_IMAGE =
  "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

export default function Section2() {
  return (
    <section className="flex w-full justify-center bg-white px-4 py-[35px] sm:px-6 md:py-[70px]">
      <div className="mx-auto flex w-full  flex-col items-center text-center">
        <h2
          className="text-[18px] leading-[25px] text-[#000000] sm:text-[28px] sm:leading-[40px] lg:text-[30px] md:leading-[42px] md:text-[25px]"
          style={{
            fontFamily: "MontserratRegular, Montserrat, sans-serif",
            fontWeight: 400,
            letterSpacing: 0,
          }}
        >
          Closer to your property, in every sense of the word
        </h2>

        <p
          className=" mt-2 lg:mt-4 xl:mt-6 text-[14px] leading-[26px] text-[#000000] sm:mt-7 sm:text-[16px] sm:leading-[28px] md:mt-4 max-w-[1050px]"
          style={{
            fontFamily: "OpenSansRegular, Open Sans, sans-serif",
            fontWeight: 400,
            letterSpacing: 0,
          }}
        >
          A real estate walkthrough is no longer a nice-to-have – it&apos;s a
          sales imperative. In 2026, properties with immersive 3D walkthrough
          animations receive 87% more online views and convert buyers 40% faster
          than listings with static images alone.
        </p>

        <p
          className="mt-5 lg:mt-4 xl:mt-5 text-[14px] max-w-[1050px] leading-[26px] text-[#000000] md:mt-4 sm:text-[16px] sm:leading-[28px]"
          style={{
            fontFamily: "OpenSansRegular, Open Sans, sans-serif",
            fontWeight: 400,
            letterSpacing: 0,
          }}
        >
          At Ritz Media World, we produce cinematic-quality architectural
          walkthrough animations and interactive virtual tours that place your
          buyers inside your project , feeling the space, experiencing the light,
          and imagining their life there ; all before the first slab is poured.
        </p>

        <p
          className="mt-6 lg:mt-4 xl:mt-6 max-w-[850px] text-[14px] leading-[26px] text-[#000000]  sm:text-[16px] sm:leading-[28px] md:mt-5"
          style={{
            fontFamily: "OpenSansSemiBold, Open Sans, sans-serif",
            fontWeight: 600,
            letterSpacing: 0,
          }}
        >
          &ldquo;Speed up your real estate project showcase with 3D + AI-powered
          walkthroughs at 5X speed and 5X reduced costs, now available at Ritz
          Media World for a smarter, cost-efficient solution.&rdquo;
        </p>

        <div className="md:mt-4 lg:mt-6 xl:mt-8 flex items-center justify-center gap-4 sm:mt-10">
          <Link
            href="/contact.html"
            title="Let's Talk Today"
            target="_blank"
            aria-label="Let's Talk Today"
            className="text-[18px] font-medium text-[#0F1640] transition-colors  md:text-[20px]"
            style={{ fontFamily: "MontserratMedium, Montserrat, sans-serif" }}
          >
            Let&apos;s Talk Today
          </Link>
          <Link
            href="/contact.html"
            target="_blank"
            title="Let's Talk Today"
            aria-label="Let's Talk Today"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C99237] transition-colors hover:bg-[#0F1640] sm:h-11 sm:w-11"
          >
            <Image
              src={EXPLORE_ARROW_IMAGE}
              alt="Contact Ritz Media World – arrow icon"
              title="Let's Talk Today"
              width={22}
              height={20}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
