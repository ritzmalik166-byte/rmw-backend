"use client"
import Image from "next/image";
import styles from "./Section4.module.css";

function Section4() {
    return (
        <>
        <section className="w-full flex justify-center items-center border-b border-t border-[#E6E3E3] py-6 sm:py-8 md:py-10 lg:py-[35px] xl:py-[70px]">
            {/* Centered Align Container  */}
            <div className={`w-full flex flex-col items-center sm:items-start sm:h-auto lg:h-auto sm:flex-row gap-6 sm:gap-4 md:gap-5 lg:gap-4 ${styles.containerWidth} ${styles.layoutRow}`}>
                {/* Left Side Container  */}
                <div className={`w-full sm:w-[56%] lg:w-[475px] xl:w-[594px] flex flex-col gap-4 sm:gap-10 lg:gap-12 xl:gap-6 flex-shrink-0 min-w-0 ${styles.leftColumn}`}>
                    {/* Top Container  */}
                    <div className="h-[90px] sm:h-[130px] md:h-[160px] xl:h-[194px] flex items-center">
                        <img src="/service-v3/content-marketing/s5/17-yow2.png" alt="Ritz Media World – 17 years of experience" title="Ritz Media World" className="w-auto h-full object-contain" />
                    </div>
                    {/* Bottom Container  */}
                    <div className="w-full flex flex-col gap-4 md:gap-10 sm:gap-5 lg:gap-2">
                        {/* Row 1  */}
                        <div className="w-full flex flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                            <p className={`font-[500] text-[16px] sm:text-[20px] md:text-[24px] xl:text-[28px] leading-tight ${styles.fontmontserrat}`}>A Skill <span className="font-[700]">Creative Team Delivering</span> Solutions That Drive <span className="font-[700]">Brand Growth</span></p>
                            <img src="/service-v3/print-advertising/s7/rocket-booster2.png" alt="Ritz Media World" title="Ritz Media World" className="h-[44px] sm:h-[60px] md:h-[72px] xl:h-[93px] w-auto flex-shrink-0" />
                        </div>

                        {/* Row 2  */}
                        <div className="w-full min-w-0">
                            <img src="/service-v3/print-advertising/s7/s7-group-img.png" alt="Ritz Media World – creative team" title="Ritz Media World" className="w-full h-auto object-contain" />
                        </div>
                    </div>
                </div>
                {/* Right Side Container  */}
                <div className="w-full sm:w-[40%] lg:w-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 xl:gap-8 min-w-0">
                    {/* Col 1 - Mobile Frame Video  */}
                    <div className="flex-col    hidden lg:flex justify-center items-center text-center w-full lg:w-auto order-2 lg:order-1 flex-shrink-0">
                        <div className="relative w-full h-[673px] sm:w-[260px] sm:h-[515px] lg:w-[230px] lg:h-[554px] xl:w-[299px] xl:h-[560px] mx-auto flex-shrink-0 overflow-hidden mt-[-10px]">
                            <Image src="/service-v3/layer1/charts/mobile-frame-img.png" alt="Ritz Media World – mobile showcase" title="Ritz Media World" fill className="object-contain z-10" sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 299px" />

                            <video src="/test-images/test-video.mp4" className="absolute z-[1] top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[92%] h-[90%] sm:h-[80%] xl:h-[97%] rounded-[54px] sm:rounded-[30px] object-cover" autoPlay loop muted playsInline preload="metadata"></video>
                        </div>
                    </div>
                    {/* Col 2 - Stats & Reviews  */}
                    <div className="w-full  lg:w-[200px] xl:w-[295px] flex flex-col  lg:gap-4 xl:gap-0 order-1 lg:order-2">
                        {/* Row 1  */}
                        <div className="w-full flex flex-col gap-3">
                            <div className="w-full min-w-0"><img src="/service-v3/print-advertising/s7/s7-graphics.png" alt="Ritz Media World – campaign graphics" title="Ritz Media World" className="w-full h-auto object-contain" /></div>

                            <div className="flex w-full justify-between mt-0 lg:mt-[-5px]">
                                <div className="flex flex-col gap-0 ">
                                    <p className={`font-[700] text-[37px] sm:text-[32px] xl:text-[37px] ${styles.fontmontserrat}`}>1M+</p>
                                    <p className={`font-[600] text-[12px] sm:text-[12px] md:text-[14px] ${styles.fontopensans}`}>Creatives Published</p>
                                </div>
                                <div className="flex flex-col gap-0 ">
                                    <p className={`font-[700] text-[37px] sm:text-[32px] xl:text-[37px] ${styles.fontmontserrat}`}>500+</p>
                                    <p className={`font-[600] text-[12px] sm:text-[12px] md:text-[14px] ${styles.fontopensans}`}>Success Stories</p>
                                </div>
                            </div>
                        </div>
                        {/* Row 2  */}
                        <div className="w-full min-w-0 flex justify-center sm:block mt-2 sm:mt-0 md:mt-4 lg:mt-[20px]">
                            <img onClick={() => window.open("https://share.google/KiTNs3mJMr5qUOkjK", "_blank")} src="/g-5-star2.png" alt="Google reviews – Ritz Media World" title="Ritz Media World" className="w-[200px] cursor-pointer max-w-full h-auto object-contain sm:w-[189px] lg:max-w-[271px] xl:w-[250px]" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="w-full h-[1px] bg-[#D9D9D9]"></div>
        </>
    )
}

export default Section4;