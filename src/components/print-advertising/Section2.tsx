"use client";

import { BsArrowUpRight } from "react-icons/bs";
import styles from "./page.module.css";
function Section2() {

    return (
        <section className="w-full justify-center items-center py-8 sm:py-12 md:py-14 lg:py-[70px]">
            {/* Centered Align Container  */}
            <div className={`w-full flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-5 md:gap-6 min-[1350px]:gap-4 ${styles.containerWidth}`}>
                {/* Left Side Container  */}
                <div className="flex flex-col justify-between gap-2 lg:gap-6 min-w-0">
                    {/* Top Container  */}
                    <div className="flex flex-col lg:gap-4 gap-2 max-w-[620px]">
                        <h2 className={`font-[700] text-[20px] text-center sm:text-left sm:text-[16px] xl:text-[30px] leading-tight ${styles.fontmontserrat}`}>
                            Rumors of print’s demise have been greatly exaggerated, <span className="font-[400]">It’s simply moved from crowded to prestigious.</span>
                        </h2>
                        <p className={`font-[400]  text-[12px] text-justify sm:text-left lg:text-[14px]  xl:text-[16px] ${styles.fontopensans}`}>
                            <span className="font-[700] text-[#C99237]"> Ritz Media World</span>, we harness the unmatched credibility and focused engagement that <span className="font-[700]">print advertising</span> uniquely offers. By expertly combining eye-catching visuals, persuasive copy, and strategic placements, we create print advertisements that not only capture attention but actively shape perception and influence decisions. <br className="hidden lg:block"/> <br className="hidden lg:block"/>
                            From newspapers and glossy magazines to bespoke publication, our print ads stand out distinctly amid digital fatigue. If your goal is authenticity, memorability, and conversion, there’s simply no medium more refreshingly effective than good old-fashioned print. Screens might scroll away, but paper stays persuasive.
                        </p>
                    </div>
                    {/* Bottom Container  */}
                    <div className="w-full flex justify-center sm:justify-start">
                        <button className="flex justify-between items-center gap-3 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity">
                            <p className={`font-[500] lg:text-[16px] text-[14px] ${styles.fontmontserrat}`}>
                                Contact us
                            </p>
                            <div className="bg-[#C99237] h-[36px] w-[36px] sm:h-[30px] sm:w-[30px] lg:h-[40px] lg:w-[40px] rounded-[50px] flex justify-center items-center text-white">
                                <BsArrowUpRight className="text-white text-[16px] sm:text-[17px] lg:text-[18px]" />
                            </div>
                        </button>
                    </div>
                </div>
                {/* Right Side Container  */}
                <div className="w-full lg:w-[480px] xl:w-[579px] lg:shrink-0 border border-[#E6E3E3]">
                    <img src="/service-v3/print-advertising/s2/rumors-of-print-demise.jpg" alt="Print Advertising" className="w-full h-auto object-cover" />
                </div>
            </div>
        </section>
    )
}
export default Section2;