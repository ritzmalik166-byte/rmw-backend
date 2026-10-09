import Link from "next/link";
import styles from "@/components/shared/container.module.css";

type Section8Props = {
  onScheduleClick?: () => void;
};

export default function Section8({ onScheduleClick }: Section8Props) {
  return (
    <section className="w-full bg-[#FFFFFF] flex justify-center pb-10 sm:pb-12 md:pb-14">
      <div className={`w-full max-w-[1300px] mx-auto text-center flex flex-col items-center ${styles.containerWidth}`}>
        <h2
          className="text-black font-[700] text-[20px] sm:text-[20px] md:text-[28px] lg:text-[36px] leading-tight"
          style={{ fontFamily: "MontserratBold" }}
        >
          Ready to Elevate Your Brand?
        </h2>
        <p
          className="text-black text-[18px] sm:text-[18px] md:text-[24px] lg:text-[26px] leading-[1.35] mt-2 sm:mt-3"
          style={{ fontFamily: "PoppinsRegular" }}
        >
          Let&apos;s discuss your next brand-elevating campaign
        </p>

        {onScheduleClick ? (
          <button
            type="button"
            title="Schedule Free Consultation"
            onClick={onScheduleClick}
            className="mt-7 sm:mt-8 md:mt-10 inline-flex items-center gap-5 border-b border-black pb-2 text-black font-[600] text-[18px] sm:text-[20px] md:text-[26px] lg:text-[16px] leading-none bg-transparent cursor-pointer"
            style={{ fontFamily: "MontserratSemiBold" }}
          >
            <span>Schedule Free Consultation</span>
            <img
              src="/home-v3/s3/rhgt.png"
              alt="Ritz Media World – schedule consultation"
              title="Ritz Media World"
              className="w-[24px] h-[24px] sm:w-[25px] sm:h-[25px] lg:w-[27px] lg:h-[27px]"
            />
          </button>
        ) : (
          <Link
            title="Schedule Free Consultation"
            href="https://ritzmediaworld.com/contact.html"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 sm:mt-8 md:mt-10 inline-flex items-center gap-5 border-b border-black pb-2 text-black font-[600] text-[18px] sm:text-[20px] md:text-[26px] lg:text-[16px] leading-none"
            style={{ fontFamily: "MontserratSemiBold" }}
          >
            <span>Schedule Free Consultation</span>
            <img
              src="/home-v3/s3/rhgt.png"
              alt="Ritz Media World – schedule consultation"
              title="Ritz Media World"
              className="w-[24px] h-[24px] sm:w-[25px] sm:h-[25px] lg:w-[27px] lg:h-[27px]"
            />
          </Link>
        )}
      </div>
    </section>
  );
}
