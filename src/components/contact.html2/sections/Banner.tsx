import Image from "next/image";
import styles from "./page.module.css";
import sectionStyles from "@/components/services-v3-subslug/layer-1/Section1.module.css";

const BANNER_ALT =
    "Contact Ritz Media World – digital marketing and branding agency in Delhi NCR";

function Banner() {
    return (
        <section
            className="relative flex h-[550px] w-full min-w-0 max-md:overflow-x-hidden items-center justify-center overflow-visible bg-[#0F1640] pb-8 sm:pb-12 md:h-[300px] md:min-h-[300px] md:items-stretch md:justify-start md:pb-3 lg:h-[500px] lg:min-h-[500px] lg:items-end lg:pb-10 xl:h-[500px] xl:min-h-[500px] xl:pb-26 min-[1536px]:h-auto min-[1536px]:min-h-[615px] px-4 sm:px-6 md:px-0"
            aria-label={BANNER_ALT}
        >
            <Image
                src="/varunimage/contact-mobile-banner.webp"
                alt={BANNER_ALT}
                title={BANNER_ALT}
                fill
                priority
                fetchPriority="high"
                className="object-cover object-center md:hidden"
                sizes="100vw"
            />
            <Image
                src="/varunimage/contact-deskstop-banner.webp"
                alt={BANNER_ALT}
                title={BANNER_ALT}
                fill
                priority
                className="hidden object-cover object-center md:block"
                sizes="100vw"
            />

            <div className="relative z-10 flex min-w-0 w-full max-lg:max-w-none lg:max-w-none -translate-y-14 sm:-translate-y-16 md:translate-y-0 lg:translate-y-3 xl:translate-y-17 flex-col text-center md:h-full md:justify-end md:gap-2 md:text-left lg:h-auto lg:justify-start lg:gap-0 xl:gap-5">
                <div className="relative hidden md:block md:h-[30px] md:w-[200px] xl:h-[37px] xl:w-[210px]">
                    <Image
                        src="/home-v3/service-imgs/s1/yellow-reactangle.png"
                        alt="Ritz Media World – contact"
                        title="Ritz Media World"
                        fill
                        sizes="210px"
                        priority
                    />
                    <p
                        className={`absolute top-[50%] right-8 translate-y-[-50%] font-[700] uppercase text-[16px] text-white ${styles.fontmontserrat}`}
                    >
                        GET IN TOUCH
                    </p>
                </div>

                <div className="min-w-0 pl-0 sm:pl-4 md:pl-[40px] lg:pl-[45px] xl:pl-[53px]">
                    <h1 className="min-w-0 mt-1 sm:mt-2 md:mt-0 xl:mt-3 text-white leading-[45px] sm:leading-[1.15] md:leading-tight lg:leading-[45px] xl:leading-[45px] lg:py-0 xl:py-0">
                        <span className="max-md:block max-md:w-full max-md:min-w-0 md:contents lg:inline-block lg:whitespace-nowrap lg:translate-y-2 xl:translate-y-0 xl:contents leading-normal">
                            <span
                                className={`${sectionStyles.bannerHeadlineSm} font-[800] md:text-[26px] lg:text-[30px] lg:font-[600] xl:text-[55px] xl:font-[500] lg:leading-[10px]`}
                                style={{ fontFamily: "MontserratExtraBold" }}
                            >
                                Contact
                                <span className="font-[500] lg:font-[600] xl:font-[500]">
                                    {" "}
                                    us
                                </span>
                            </span>
                        </span>
                    </h1>
                    <h2
                        className="mb-[20px] mt-2 w-full max-md:max-w-none font-[500] text-[14px] text-white sm:text-[16px] md:mb-2 md:max-w-[420px] md:text-[13px] lg:mb-0 lg:max-w-[450px] lg:mt-1 lg:text-[15px] lg:font-[400] xl:mb-[0] xl:max-w-[690px] xl:text-[21px] xl:font-[500]"
                        style={{ fontFamily: "MontserratMedium" }}
                    >
                        Get started with Ritz Media World For Digital Marketing Strategies, best SEO
                        services, and Creative Branding.
                    </h2>
                </div>
            </div>
        </section>
    );
}

export default Banner;
