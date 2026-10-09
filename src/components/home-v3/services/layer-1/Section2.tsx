import { BsArrowUpRight } from "react-icons/bs";
import styles from './page.module.css';
import Link from "next/link";
function Section2() {
    return (
        <section className={`w-full flex justify-center items-center py-8 sm:py-12 md:py-16 lg:py-20 xl:py-[70px]`}>
            {/* Centered Align Container   */}
            <div className={`w-full text-center flex flex-col gap-3 sm:gap-4 items-center justify-center max-w-[1175px] ${styles.containerWidth}`}>
                <p className={`font-[700] text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] xl:text-[30px] leading-tight sm:leading-snug md:leading-normal px-2 sm:px-0 ${styles.fontmontserrat}`}>
                    The digital world is louder than ever, and traditional marketing alone is no longer enough.
                </p>
                <p className={`font-[400] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] max-w-full sm:max-w-[996px] leading-relaxed px-2 sm:px-0 ${styles.fontopensans}`}>
                    As the <i>best digital marketing agency in India</i>,<b> <a href="/" target="_blank" className="cursor-pointer">Ritz Media World</a></b> helps brands increase visibility, drive qualified lead generation, and build strong brand awareness through data-driven campaigns. From <i>SEO services</i> India and website ranking services to <i>PPC</i>, <i>social media</i>, and <i>brand promotion</i> agency solutions, we focus on each and every aspect.<br /><br />  Whether you’re searching for the best digital marketing agency near me or digital marketing agency in Delhi NCR, our strategies are designed to attract the right audience and deliver customized measurable results.

                </p>
                <Link href="/contact.html" target="_blank" title="Contact us" className="letsTalkToday px-3 py-2   rounded-[5px]">
                    <button className="w-[140px] sm:w-[150px] lg:w-[154px] h-[42px] sm:h-[44px] lg:h-[46px] flex justify-between items-center gap-2 bg-transparent border-none cursor-pointer text-[#0F1640]">
                        <p className={`font-[500] text-[14px] sm:text-[15px] lg:text-[18px] ${styles.fontmontserrat}`}>
                            Contact us
                        </p>
                        <div className="bg-[#C99237] h-[34px] w-[34px] sm:h-[36px] sm:w-[36px] md:h-[38px] md:w-[38px] lg:h-[40px] lg:w-[40px] rounded-[50px] flex justify-center items-center text-white letsTalkTodayIcon">
                            <BsArrowUpRight className="text-white text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px]" />
                        </div>
                    </button>
                </Link>
            </div>
        </section>
    )
}

export default Section2;