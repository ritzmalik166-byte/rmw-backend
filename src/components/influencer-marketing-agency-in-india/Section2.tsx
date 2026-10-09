import Image from "next/image";
import Link from "next/link";

const EXPLORE_ARROW_IMAGE =
  "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

export default function Section2() {
  return (
    <section className="w-full flex items-center justify-center py-[35px] lg:py-[70px] bg-white">
      <div className="w-[100%] md:w-[100%] lg:w-[100%] xl:w-[74%] text-center mx-auto px-4 md:px-[40px] lg:px-[50px] min-[1370px]:!w-[1300px] min-[1370px]:!max-w-[1300px] min-[1370px]:mx-auto">
        <p
          className="text-black font-[700] text-[20px] sm:text-[20px] md:text-[20px] lg:text-[24px] leading-[30px]   md:leading-[30px] lg:leading-[40px] xl:leading-[40px] xl:max-w-[1000px]   mx-auto"
          style={{ fontFamily: "MontserratRegular" }}
        >
          Influencer marketing goes beyond hype, it’s all about trust, reach, and results.
        </p>

        <div
          className="mt-3 lg:mt-6 text-[#2d2d2d] text-[15px] sm:text-[17px] md:text-[15px] leading-[23px] md:leading-[25px] lg:text-[16px] w-full max-w-[849px] mx-auto text-center"
          style={{ fontFamily: "OpenSansRegular" }}
        >
          <p>
            We specialize as a performance-driven <i>influencer marketing agency</i>, connecting brands with the right influencers through effective influencer brand partnerships that engage the desired audience. At <b><a href="/" target="_blank" className="cursor-pointer">Ritz Media World</a></b>, we ensure every campaign delivers measurable impact. <br /> <br className=""/>

            From influencer research and planning to full influencer campaign management, we create effective <i>influencer marketing campaigns</i> that boost awareness, engagement, and conversions. Whether you are looking to partner with influencers for <i> brand marketing</i> or looking for effective <i>influencer marketing services,</i> our solutions will ensure that every partnership results in measurable visibility and business growth.
          </p>
        </div>

        <div className="w-full flex justify-center items-center"> 
          <Link href="/contact.html" target="_blank" title="Let's Talk Today"
           aria-label="Let's Talk Today" className="mt-4 lg:mt-10 flex text-[#0F1640] items-center justify-center gap-4 letsTalkToday p-3 rounded-[5px] letsTalkToday">
          <span
            className="text-[18px]   md:text-[20px] font-[500]"
            style={{ fontFamily: "MontserratMedium" }}
          >
            Let&apos;s Talk Today
          </span>
          <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C99237] flex items-center justify-center hover:bg-[#b8822f] transition-colors letsTalkTodayIcon">
            <Image
              src={EXPLORE_ARROW_IMAGE}
              alt="Arrow"
              title="Arrow"
              width={22}
              height={20}
            />
          </span>
        </Link></div>
       
      </div>
    </section>
  );
}
