import { ArrowLeftIcon } from "lucide-react";
import { BsGlobe } from "react-icons/bs";
import { SlClock } from "react-icons/sl";
import { HiOutlineUsers } from "react-icons/hi2";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "../page.module.css";


function Section2() {
    return (
        <section className="w-full flex justify-center items-center py-6 sm:py-10 md:py-14 xl:py-[70px]">
            {/* Centered align container */}
            <div className={`flex flex-col gap-4 sm:gap-6 md:gap-8 w-full ${styles.containerWidth}`}>
                {/* Row 1 */}
                <div className="w-full flex flex-col gap-3 sm:gap-4 xl:gap-5">
                    <div>
                        <button
                            type="button"
                            className="h-[48px] xl:h-[54px] w-full max-w-[270px] xl:max-w-none xl:w-[270px] px-4 xl:px-6 rounded-[5px] border border-[#C99237] bg-transparent flex justify-center items-center gap-3 cursor-pointer text-[#C99237] hover:bg-[#C99237] hover:text-white transition-colors duration-200"
                        >
                            <ArrowLeftIcon className="w-[15px] h-[15px] shrink-0" />
                            <span className={`${styles.fontopensans} font-[700] text-[14px] xl:text-[15px]`}>Back to Newspapers</span>
                        </button>
                    </div>

                    <div className="w-full py-5 pl-4 sm:py-8 sm:pl-6 xl:py-10 xl:pl-8 rounded-[4px] bg-[#F7F7F7] flex flex-col lg:flex-row justify-start items-center  lg:items-stretch overflow-hidden gap-4 sm:gap-6">
                        {/* Left: image */}
                        <div className="w-full md:w-auto md:max-w-[296px] md:min-w-[280px] h-[200px] sm:h-[240px] xl:h-[320px] bg-white flex justify-center items-center p-4 sm:p-6 xl:p-10 shrink-0 rounded-[20px] overflow-hidden">
                            <img
                                className="w-[140px] sm:w-[180px] xl:w-[234px] h-auto object-contain"
                                src="/news/the-economic-times.png"
                                alt="The Economic Times"
                            />
                        </div>
                        {/* Right: content */}
                        <div className="flex flex-col items-center lg:items-start justify-between gap-5 w-full pr-3 sm:gap-6 xl:gap-8 px-0 xl:pr-0">
                            <div className="flex flex-col gap-2 sm:gap-3 text-center lg:text-left">
                                <h2 className={`${styles.fontmontserrat} font-[700] text-[20px] sm:text-[22px] xl:text-[26px] text-[#1a1a1a] leading-tight`}>
                                    The Economic Times
                                </h2>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 xl:gap-6">
                                    <div className="flex items-center gap-2 text-[#222222]">
                                        <BsGlobe className="w-5 h-5 xl:w-6 xl:h-6 text-[#222222] shrink-0" />
                                        <span className={`${styles.fontopensans} font-[400] text-[14px] sm:text-[15px] xl:text-[16px]`}>English</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#222222]">
                                        <SlClock className="w-5 h-5 xl:w-6 xl:h-6 text-[#222222] shrink-0" />
                                        <span className={`${styles.fontopensans} font-[400] text-[14px] sm:text-[15px] xl:text-[16px]`}>Monday - Friday</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#222222]">
                                        <HiOutlineUsers className="w-5 h-5 xl:w-6 xl:h-6 text-[#222222] shrink-0" />
                                        <span className={`${styles.fontopensans} font-[400] text-[14px] sm:text-[15px] xl:text-[16px]`}>Circulation: 195K</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-white px-3 py-3 sm:pl-3 sm:pr-6 sm:py-5 xl:py-5 rounded-[5px] min-h-[88px] sm:min-h-0 flex-[1_1_calc(50%-4px)] sm:flex-1 xl:flex-none min-w-0 xl:w-auto xl:min-w-[301px] text-center sm:text-left">
                                    <img src="/offer.svg" alt="" className="w-9 h-9 sm:w-10 sm:h-10 xl:w-[51px] xl:h-auto shrink-0 object-contain" />
                                    <div className="min-w-0">
                                        <p className={`${styles.fontopensans} font-[400] text-[13px] sm:text-[14px] xl:text-[16px] text-[#222222]`}>Starting Price</p>
                                        <p className={`${styles.fontmontserrat} font-[700] text-[16px] xl:text-[30px] text-[#1a1a1a] leading-tight`}>
                                            <span className="font-[400] text-[14px] xl:text-[24px]">₹</span> 1,95,000
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-white px-3 py-3 sm:pl-3 sm:pr-8 sm:py-5 xl:py-5 rounded-[5px] min-h-[88px] sm:min-h-0 flex-[1_1_calc(50%-4px)] sm:flex-1 xl:flex-none min-w-0 xl:w-auto xl:min-w-[244px] text-center sm:text-left">
                                    <img src="/book.svg" alt="" className="w-9 h-9 sm:w-10 sm:h-10 xl:w-[60px] xl:h-auto shrink-0 object-contain" />
                                    <div className="min-w-0">
                                        <p className={`${styles.fontopensans} font-[400] text-[13px] sm:text-[14px] xl:text-[16px] text-[#222222]`}>Readership</p>
                                        <p className={`${styles.fontmontserrat} font-[500] text-[20px] sm:text-[24px] xl:text-[30px] text-[#1a1a1a] leading-tight`}>585K</p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-white px-3 py-3 sm:pl-3 sm:pr-8 sm:py-5 xl:py-5 rounded-[5px] min-h-[88px] sm:min-h-0 flex-[1_1_calc(50%-4px)] sm:flex-1 xl:flex-none min-w-0 xl:w-auto xl:min-w-[258px] text-center sm:text-left">
                                    <img src="/p-location.svg" alt="" className="w-8 h-8 sm:w-9 sm:h-9 xl:w-[46px] xl:h-auto shrink-0 object-contain" />
                                    <div className="min-w-0">
                                        <p className={`${styles.fontopensans} font-[400] text-[13px] sm:text-[14px] xl:text-[16px] text-[#222222]`}>Area Covered</p>
                                        <p className={`${styles.fontmontserrat} font-[500] text-[20px] sm:text-[24px] xl:text-[30px] text-[#1a1a1a] leading-tight`}>Mumbai</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="h-[48px] xl:h-[54px] w-full max-w-[208px] xl:max-w-none xl:w-[208px] px-6 rounded-[5px] bg-[#C99237] flex justify-center items-center gap-3 cursor-pointer text-white hover:bg-[#b8832f] active:scale-[0.98] transition-colors duration-200"
                                >
                                    <span className={`${styles.fontmontserrat} font-[700] text-[16px] xl:text-[17px]`}>Add To Bag</span>
                                    <AiOutlinePlus className="w-[22px] h-[22px] shrink-0" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="w-full flex flex-col xl:flex-row justify-center items-center xl:justify-start xl:items-start gap-4 sm:gap-6 xl:gap-8 pt-0 sm:pt-2">
                    <div className="flex flex-col gap-1.5 sm:gap-2 flex-shrink-0 lg:max-w-[500px] text-center xl:text-left">
                        <p className={`${styles.fontopensans} font-[600] text-[16px] sm:text-[18px] xl:text-[20px] uppercase text-[#C99237]`}>
                            Available Advertisement Options
                        </p>
                        <h2 className={`${styles.fontmontserrat} font-[700] text-[22px] sm:text-[28px] xl:text-[36px] text-[#1a1a1a] leading-tight`}>
                            Advertising in Economic Times, Mumbai, English Newspaper
                        </h2>
                    </div>
                    <div className="flex flex-col gap-1.5 sm:gap-2 border-0 xl:border-l border-[#D9D9D9] xl:pl-8 text-center xl:text-left">
                        <p className={`${styles.fontmontserrat} font-[500] text-[18px] sm:text-[20px] xl:text-[24px] text-[#000000]`}>Newspaper Details</p>
                        <p className={`${styles.fontopensans} font-[400] text-[14px] sm:text-[15px] xl:text-[16px] text-[#000000] leading-relaxed xl:max-w-[581px]`}>
                            Economic Times, Mumbai, English with a circulation of around 195000 is one of the most popular English newspaper. Economic Times, Mumbai, English helps build trustworthiness through association covering different topics.
                            <br /><br />
                            This newspaper helps showcase ads to a wide audience, improving visibility and delivering high impact by prompting potential customers in making purchases.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Section2;
