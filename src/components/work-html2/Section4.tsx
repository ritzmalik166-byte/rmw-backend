import Link from "next/link";

export default function Section4() {
  return (
    <section className="w-full bg-[#FFFFFF] py-12 sm:py-14 md:py-16 lg:py-13">
      <div className="w-[92%] sm:w-[90%] md:w-[86%] lg:w-[80%] mx-auto text-center flex flex-col items-center">
        <h2
          className="text-black font-[700] text-[36px] sm:text-[44px] md:text-[34px] lg:text-[36px] leading-tight"
          style={{ fontFamily: "MontserratBold" }}
        >
          Ready to Elevate Your Brand?
        </h2>
        <p
          className="text-black text-[17px] sm:text-[21px] md:text-[30px] lg:text-[26px] leading-[1.35] mt-2 sm:mt-3"
          style={{ fontFamily: "PoppinsRegular" }}
        >
          Let&apos;s discuss your next brand-elevating campaign
        </p>

        <Link
          title="Schedule Free Consultation"
          href="https://ritzmediaworld.com/contact.html"
          target="_blank"
          className="mt-7 sm:mt-8 md:mt-10 inline-flex items-center gap-5 border-b border-black pb-2 text-black font-[600] text-[18px] sm:text-[20px] md:text-[26px] lg:text-[16px] leading-none"
          style={{ fontFamily: "MontserratSemiBold" }}
        >
          <span>Schedule Free Consultation</span>
          <span aria-hidden="true" className="text-[24px] md:text-[30px]">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
