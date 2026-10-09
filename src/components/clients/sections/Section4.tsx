import Link from "next/link";
import styles from "./page.module.css";

function Section4() {
    return (
        <section className="w-full py-8 sm:py-10 xl:py-[70px] flex justify-center items-center px-4 sm:px-6 lg:px-0">
            <div
                className={`w-full ${styles.containerWidth} bg-[#AE7414] rounded-[5px] py-8 sm:py-10 px-5 sm:px-8 md:px-10 relative flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 sm:gap-8 overflow-hidden`}
            >
                {/* Background */}
                <div
                    className="w-full h-full absolute inset-0 pointer-events-none"
                    aria-hidden
                >
                    <img
                        src="/clients-page/bg.png"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Left */}
                <div
                    className={`relative z-10 flex flex-col gap-3 sm:gap-4 max-w-full lg:max-w-[65%] ${styles.fontmontserrat}`}
                >
                    <p className="font-[700] text-[22px] sm:text-[28px] md:text-[32px] lg:text-[36px] text-white leading-tight sm:leading-snug">
                        Let&apos;s Build Something Great Together
                    </p>
                    <p className="font-[400] text-[14px] sm:text-[16px] md:text-[17px] lg:text-[19px] text-white leading-relaxed">
                        Join our growing list of happy clients and start your creative journey with us today.
                    </p>
                </div>

                {/* CTA */}
                <div className="relative z-10 w-full lg:w-auto shrink-0">
                    <Link
                        title="Start Your Project"
                        href="/contact.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Start Your Project"
                        className="group letsTalkToday inline-flex w-full sm:w-auto items-center justify-center sm:justify-start gap-3 sm:gap-4 cursor-pointer rounded-[5px] transition-opacity hover:opacity-90"
                    >
                        <span className="font-[500] text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] text-white whitespace-nowrap">
                            Start Your Project
                        </span>
                        <span className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-white flex justify-center items-center transition-colors group-hover:bg-[#f5f5f5] letsTalkTodayIcon">
                            <svg
                                width="22"
                                height="20"
                                viewBox="0 0 22 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden
                            >
                                <path
                                    d="M19.4276 2.92383L17.1346 9.08052L12.9493 4.01635L19.4276 2.92383Z"
                                    fill="#C99237"
                                />
                                <rect
                                    x="2.19678"
                                    y="16.7172"
                                    width="16.5517"
                                    height="0.689655"
                                    transform="rotate(-39.5724 2.19678 16.7172)"
                                    fill="#C99237"
                                />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Section4;
