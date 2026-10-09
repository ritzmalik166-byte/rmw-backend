import Image from "next/image";
import styles from "./page.module.css";

const BANNER_ALT =
    "About Ritz Media World – award-winning advertising agency in Delhi NCR";

export default function Section1() {
    return (
        <section
            className={`relative flex h-[460px] w-full items-center overflow-hidden pb-8 sm:pb-4 md:h-[302px] md:items-end lg:min-h-[515px] xl:min-h-[570px] px-0`}
            aria-label={BANNER_ALT}
        >
            <Image
                src="/new-about-imgs/s1/About-Us-page-mob.webp"
                alt={BANNER_ALT}
                title={BANNER_ALT}
                fill
                priority
                fetchPriority="high"
                unoptimized
                className="object-cover object-center md:hidden"
                sizes="100vw"
            />
            <Image
                src="/varunimage/About-Us-banner-new.webp"
                alt={BANNER_ALT}
                title={BANNER_ALT}
                fill
                loading="eager"
                fetchPriority="high"
                unoptimized
                className="hidden object-cover object-center md:block"
                sizes="100vw"
            />

            <div className="relative z-10 flex w-full max-w-full flex-col gap-3 sm:gap-4 md:max-w-[80%] md:gap-0 lg:max-w-none lg:gap-3 xl:gap-6">
                <div className="relative hidden h-[28px] w-full md:block md:h-[30px] md:w-[120px] lg:h-[37px] lg:w-[150px] xl:w-[150px] sm:h-[32px]">
                    <Image
                        src="/home-v3/service-imgs/s1/yellow-reactangle.png"
                        alt="About section label – Ritz Media World"
                        title="About – Ritz Media World"
                        fill
                        loading="lazy"
                        sizes="(min-width:1024px) 165px, (min-width:768px) 155px, (min-width:640px) 140px, 120px"
                    />
                    <p
                        className={`absolute top-[50%] right-4 -translate-y-1/2 text-center text-[12px] font-[700] uppercase text-white sm:right-5 sm:text-[13px] md:right-7 md:text-left md:text-[14px] lg:right-10 lg:text-[16px] xl:right-10 ${styles.fontmontserrat}`}
                        style={{ fontFamily: "MontserratBold" }}
                    >
                        About
                    </p>
                </div>
                <div className="flex flex-col gap-2 pb-[176px] pl-0 md:pb-[15px] md:pl-9 lg:pb-0 lg:pl-10 xl:pl-12">
                    <h1
                        className={`mt-1 text-center text-[26px] font-[700] leading-[1.1] text-white sm:mt-2 sm:text-[36px] sm:leading-[1.15] md:mt-0 md:text-left md:text-[31px] md:leading-[1.2] lg:text-[55px] lg:leading-14 ${styles.fontmontserrat}`}
                        style={{ fontFamily: "MontserratBold" }}
                    >
                        About Us
                    </h1>
                    <h2
                        className={`text-center text-[14px] font-[400] text-white sm:text-[16px] md:text-left lg:text-[19px] xl:text-[30px] ${styles.fontmontserrat}`}
                        style={{ fontFamily: "MontserratMedium" }}
                    >
                        Driving Success with Every Brand{" "}
                        <br className="hidden md:block" />
                        Strategy{" "}
                        <br className="block md:hidden" />
                        We Create and Deliver.
                    </h2>
                </div>
            </div>
        </section>
    );
}
