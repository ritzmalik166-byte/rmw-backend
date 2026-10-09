import Image from "next/image";
import Link from "next/link";
import styles from './discussion.module.css';

const EXPLORE_ARROW_IMAGE =
    "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

export default function Section2() {
    return (
        <section className="w-full flex items-center justify-center py-[35px] lg:py-[50px] bg-white">
            <div className="w-[100%] md:w-[100%] lg:w-[100%] xl:w-[74%] text-center mx-auto px-4 md:px-[40px] lg:px-[50px] min-[1370px]:!w-[1300px] min-[1370px]:!max-w-[1300px] min-[1370px]:mx-auto">
                <p
                    className={`text-black  text-[20px] sm:text-[20px] md:text-[20px] lg:text-[24px] leading-[30px]   md:leading-[30px] lg:leading-[30px] xl:leading-[40px] xl:max-w-[1000px] mx-auto ${styles.montserrat}  `}
                >
                    <span className="font-bold">Discussion Forum by</span> <span className="text-[#C99237] font-bold">Ritz Media World </span><span className="font-normal">
                        a space where ideas meet <br/> strategy and conversations turn into growth.
                    </span>
                </p>

                <div
                    className={`${styles.fontopensans} lg:mt-6 text-black text-[12px] sm:text-[14px] md:text-[16px] leading-[23px] md:leading-[25px] lg:text-[16px] w-full max-w-[849px] mx-auto text-center`}
                >
                    <p>
                        Whether you're looking for a SEO company in Noida, a social media marketing agency, or the best digital marketing company in Delhi, this forum is your place to ask questions, share insights, and explore the <br/> future of advertising and digital marketing.

                    </p>
                </div>

                <div className={`w-full flex justify-center items-center ${styles.montserrat}`}> 
                    <Link href="/contact.html" target="_blank" title="Let's Talk Today" aria-label="Let's Talk Today" className="mt-4 lg:mt-5 flex  items-center justify-center gap-4 letsTalkToday p-3 rounded-[5px] letsTalkToday">
                        <span
                            className="text-[18px]   md:text-[20px] font-[500]"

                        >
                            Let&apos;s Talk Today
                        </span>
                        <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C99237] flex items-center justify-center hover:bg-[#b8822f] transition-colors letsTalkTodayIcon">
                            <img src={EXPLORE_ARROW_IMAGE} alt="Explore Arrow" className="text-white text-[16px]" />
                        </span>
                    </Link></div>

            </div>
        </section>
    );
}
