import Image from "next/image";
import styles from "./webDevelopment.module.css";

const STATS = [
    { value: "1M+", label: "Creatives Published" },
    { value: "1K+", label: "Campaigns Executed" },
    { value: "500+", label: "Success Stories" },
    { value: "1B+", label: "Words Written" },
];

export default function Stats() {
    return (
        <section className="w-full border-y border-[#E6E3E3] bg-white py-6 sm:py-7 md:py-8 lg:py-10 xl:py-10">
            <div className={`${styles.page_containerWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-0">
                    <a
                        href="https://share.google/KiTNs3mJMr5qUOkjK"
                        target="_blank"
                        rel="noreferrer"
                        title="Google Reviews"
                        className="mx-auto w-fit md:mx-0 md:shrink-0 md:pr-8 lg:pr-10"
                        aria-label="Open Google reviews"
                    >
                        <Image
                            src="/webDevelopment/Google-Rating-5.png"
                            alt="Google reviews – Ritz Media World"
                            title="Ritz Media World"
                            width={271}
                            height={72}
                            className="pt-3 h-auto w-[100%] max-w-full sm:w-[230px] lg:w-[271px]"
                        />
                    </a>

                    <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-0 ">
                        {STATS.map((item, index) => (
                            <div
                                key={item.label}
                                className={`rounded-md p-3 text-center md:rounded-none md:px-5 md:py-1 md:text-left lg:px-8 ${
                                    index > 0 ? "md:border-l md:border-[#AFAFAF]" : ""
                                }`}
                            >
                                <p
                                    className={`text-[34px] font-[700] leading-[1] text-[#0F1640] sm:text-[40px] md:text-[32px] lg:text-[42px] xl:text-[52px] ${styles.montserrat}`}
                                >
                                        {item.value}
                                </p>
                                <p
                                    className={`mt-2 text-[13px] font-[600] leading-[1.3] text-[#111111] sm:text-[14px] md:text-[12px] lg:text-[13px] xl:text-[14px] ${styles.fontopensans}`}
                                >
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
