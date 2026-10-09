import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './webDevelopment.module.css'

export default function Experience() {
    return (
        <section className={`bg-gradient-to-r from-[#c78c2f] via-[#d19a42] to-[#d8a04a]`}>
            <div className={`relative w-full overflow-hidden  py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 min-[1240px]:py-20 min-[1366px]:py-26 ${styles.page_containerWidth} `}>
                <div className="pointer-events-none absolute inset-0 ">
                    <Image
                        src="/webDevelopment/curve.png"
                        alt="decorative curve"
                        fill
                        title="decorative curve"
                        className="object-fit"
                    />
                </div>

                <div className="relative z-10 mx-auto flex w-full flex-col items-center justify-between gap-6 px-4 sm:px-5 md:px-8 lg:flex-row lg:items-center lg:gap-8 lg:px-8 xl:px-18 min-[1240px]:gap-10 min-[1240px]:px-10">
                    <div className="w-full text-center text-white lg:w-auto lg:text-center">
                        <p className={`text-[14px] leading-[24px] sm:text-[15px] sm:leading-[28px] md:text-[16px] md:leading-[30px] lg:text-[16px] lg:leading-[30px] min-[1240px]:text-[17px] min-[1240px]:leading-[31px] min-[1366px]:text-[18px] min-[1366px]:leading-[30px] ${styles.fontopensans} font-[600]`}>
                            17+ years of <br className="hidden lg:block" />transforming brands <br className="hidden lg:block" />into legends through{" "}<br className="hidden lg:block" />
                            <span className="font-[800]">
                                visionary campaigns,<br className="hidden lg:block" /> powerful narratives,<br className="hidden lg:block" />
                            </span>{" "}
                            and strategic <br className="hidden lg:block" />execution.
                        </p>
                    </div>

                    <Link
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Go to Ritz Media World homepage"
                        title="Ritz Media World"
                        className="relative flex w-full max-w-[761px] items-center justify-center 
    lg:w-[540px] lg:h-[300px] lg:flex-none  xl:w-[761px] xl:h-[403px] xl:flex-none
    min-[1240px]:w-[650px] min-[1240px]:h-[350px] 
   "
                    >
                        <Image
                            src="/varunimage/experience.png"
                            alt="experience"
                            width={761}
                            height={403}
                            title="experience"
                            priority
                            className="w-full h-full object-contain"
                        />
                    </Link>

                    <div className="w-full text-center text-white lg:w-auto lg:text-center">
                        <p className={`text-[14px] leading-[24px] sm:text-[15px] sm:leading-[28px] md:text-[16px] md:leading-[30px] lg:text-[16px] lg:leading-[30px] min-[1240px]:text-[17px] min-[1240px]:leading-[31px] min-[1366px]:text-[17px] min-[1366px]:leading-[30px] ${styles.fontopensans} `}>
                            We believe in staying <br className="hidden lg:block" />ahead, with{" "}
                            <span className="font-[800]">creative<br className="hidden lg:block" /> storytelling</span> and
                            <br className="hidden lg:block" />  leveraging AI to <br className="hidden lg:block" />deliver{" "}
                            <span className="font-[800]">
                                stunning <br className="hidden lg:block" /> visuals in record time.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section >
    )
}
