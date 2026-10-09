import Image from "next/image";
import Link from "next/link";
// import styles from "./Section2.module.css";

const EXPLORE_ARROW_IMAGE =
  "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

export default function Section2() {
  return (
    <section className="w-full min-w-0 max-md:overflow-x-hidden flex items-center justify-center py-12 sm:py-16 md:py-16 lg:py-20 bg-white">
      <div className="mx-auto w-full max-w-full px-4 text-center sm:px-0 sm:w-[85%] md:w-[80%] lg:w-[72%]">
        {/* <h2
          className="mx-auto max-w-full break-words text-black font-[800] text-[22px] sm:text-[26px] md:text-[24px] lg:text-[30px] leading-[1.3] sm:leading-[30px] md:leading-[35px] lg:leading-[42px] xl:max-w-[1000px]"
          style={{ fontFamily: "MontserratBold" }}
        >
          Creativity is not an afterthought, but an advantage. At{" "}
          <span className="text-[#C99237]">Ritz Media World</span>, we realize
          that mediocracy is something no brand can truly afford.
        </h2> */}
        <h2
          className="mx-auto max-w-full break-words text-black font-[800] text-[22px] sm:text-[26px] md:text-[24px] lg:text-[30px] leading-[1.3] sm:leading-[30px] md:leading-[35px] lg:leading-[42px] xl:max-w-[1000px]"
          style={{ fontFamily: "MontserratBold" }}
        >
          Creativity is not an afterthought but an advantage.

        </h2>

        <div
          className="mx-auto mt-3 max-w-full space-y-3 text-[14px] text-[#2d2d2d] leading-relaxed sm:mt-7 sm:space-y-4 sm:text-[15px] md:mt-4 md:text-[16px] xl:max-w-[1000px]"
          style={{ fontFamily: "OpenSansRegular" }}
        >
          {/* <p>
            From branding that shapes perception to design that demands
            attention, our creative services are strategically inventive,
            memorably original, and reliably persuasive.Whether it’s crafting identities that resonate deeply or visuals
            that linger delightfully, every piece of creative is engineered not
            just to be seen, but to sell. Good design gets noticed; great
            design gets chosen.
          </p>
          <p>
            With Ritz, your brand won’t merely blend in—it will confidently
            stand apart, win hearts, and effortlessly outperform competitors
            stuck in the predictable rut of convention.
          </p> */}
          <p>
            We know that mediocrity is not an option that any brand can afford. This is why, as the<i> best creative agency in India</i>, we at <b> <a href="/" target="_blank" className="cursor-pointer">Ritz Media World</a></b>, ensure that not only are our branding strategies creative and innovative, but they are also highly effective. While the beauty of good design lies in the fact that it is beautiful, it must also be noticeable.
          </p>
          <p>We provide end-to-end <i>creative services</i> to your brand, provide the edge that your brand needs, and ensure that the impact and success are nothing short of remarkable.</p>
        </div>

        <Link
          title="Contact us"
          href="/contact.html"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us"
          className="group mt-8 sm:mt-5 md:mt-7 letsTalkToday inline-flex items-center justify-center gap-4"
        >
          <span
            className="text-[#0F1640] text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px]"
            style={{ fontFamily: "MontserratMedium" }}
          >
            Contact us
          </span>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C99237] transition-colors group-hover:bg-[#b8822f] letsTalkTodayIcon sm:size-11">
            <Image
              src={EXPLORE_ARROW_IMAGE}
              alt="Ritz Media World – contact us"
              title="Ritz Media World"
              width={20}
              height={18}
            />
          </span>
        </Link>
      </div>
    </section>
  );
}
