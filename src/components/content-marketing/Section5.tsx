// import Image from "next/image";
import styles from "./page.module.css";

function Section5() {
    return (
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-[35px] xl:py-[70px] flex justify-center items-center border-b border-[#D9D9D9]">
            {/* Mobile-only layout (visible < 768px) */}
            <div className={`w-full px-4 pb-6 md:hidden ${styles.s5Mobile}`}>
                <div className="w-full flex flex-col gap-5 text-center">
                    <div className="w-full flex justify-center items-center py-6 bg-[#F1F1F1] rounded-lg">
                        <h2 className={`font-[700] text-[22px] leading-tight ${styles.fontmontserrat}`}>Why Content <br /> Marketing Matters</h2>
                    </div>
                    <div className="w-full flex flex-col gap-8 items-center">
                        <img src="/alishba-services-v3/content-marketing/whycontentmarketingmatters.jpg" alt="Why Content Marketing Matters" title="Why Content Marketing Matters" className="w-full h-auto object-cover rounded-lg" />
                        <div className="w-full flex  px-4 py-4 flex-col gap-3 items-center border border-[#DFDDDD] rounded-lg">
                            <h3 className={`font-[700] text-[16px] ${styles.fontmontserrat}`}>Increase Organic Traffic</h3>
                            <p className={`font-[400] text-[14px] text-[#333] ${styles.fontopensans}`}>SEO is a key factor for your website to get ranked in the search engines and if that happens, more people looking for answers will be able to find your page.</p>
                        </div>

                    </div>
                    <div className="w-full flex flex-col gap-2  px-4 py-4 items-center border border-[#DFDDDD] rounded-lg">
                        <h3 className={`font-[700] text-[16px] ${styles.fontmontserrat}`}>Build Trust & Authority</h3>
                        <p className={`font-[400] text-[14px] text-[#333] ${styles.fontopensans}`}>Producing informative content can be a key factor in your company gaining the status of an authority figure in the market.</p>
                    </div>
                    <div className="w-full flex flex-col gap-2 py-4 px-4 border border-[#DFDDDD] rounded-lg items-center">
                        <h3 className={`font-[700] text-[16px] ${styles.fontmontserrat}`}>Encourage Engagement & Conversation</h3>
                        <p className={`font-[400] text-[14px] text-[#333] ${styles.fontopensans}`}>Creating content for your audience that resonates will lead to engagement, sharing, and conversions.</p>
                    </div>
                    <div className="w-full flex flex-col gap-2  px-4 py-4 items-center border border-[#DFDDDD] rounded-lg">
                        <h3 className={`font-[700] text-[16px] ${styles.fontmontserrat}`}>Increase Sales & Lead Generation</h3>
                        <p className={`font-[400] text-[14px] text-[#333] ${styles.fontopensans}`}>Content is a major driver behind sales  from signing up to newsletters to purchasing.</p>
                        
                    </div>
                    <div className="w-full overflow-hidden">
                        <img src="/team-banner.png" alt="Why Content Marketing Matters" title="Why Content Marketing Matters" className="w-full h-auto object-cover rounded-lg" />
                    </div>
                    <div className="w-full flex flex-col gap-3 pt-4 items-center">
                        <img src="/service-v3/content-marketing/s5/17-yow2.png" alt="17 Years of Working" title="17 Years of Working" className="w-full max-w-[240px] h-auto object-contain" />
                      <a href="https://share.google/KiTNs3mJMr5qUOkjK" target="_blank" rel="noopener noreferrer">  <img src="/g-5-star2.png" alt="Google Reviews" title="Google Reviews" className="w-full max-w-[271px] h-auto object-contain" /></a>
                        <div className="w-full border-t border-[#D9D9D9] pt-4 flex justify-between max-w-[280px] mx-auto">
                            <div className="flex flex-col gap-0 items-center">
                                <p className={`font-[700] text-[28px] text-[#0F1640] ${styles.fontmontserrat}`}>1M+</p>
                                <p className={`font-[600] text-[14px] text-[#0F1640] ${styles.fontopensans}`}>Creatives Published</p>
                            </div>
                            <div className="flex flex-col gap-0 items-center">
                                <p className={`font-[700] text-[28px] text-[#0F1640] ${styles.fontmontserrat}`}>500+</p>
                                <p className={`font-[600] text-[14px] text-[#0F1640] ${styles.fontopensans}`}>Success Stories</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tablet & Desktop (visible from md) */}
            <div className={`hidden md:flex w-full flex-col ${styles.containerWidth} gap-6 sm:gap-8 md:gap-9 lg:gap-10 xl:gap-20`}>
                {/* Row 1  */}
                <div className="w-full">
                    {/* Top Row  */}
                    <div className={`w-full flex flex-col md:flex-row md:flex-nowrap xl:h-[252px] gap-0 ${styles.s5CardRow}`}>
                        <div className={`w-full md:flex-1 flex justify-center items-center text-center py-6 sm:py-8 md:py-10 bg-[#F1F1F1] min-w-0 ${styles.s5Card}`}>
                            <p className={`font-[700] ${styles.s5CardTitle} ${styles.fontMontserrat}`}>Why Content <br /> Marketing Matters</p>
                        </div>
                        <div className={`w-full md:flex-1 px-4 sm:px-6 text-center md:px-0 lg:px-0  flex flex-col gap-2 sm:gap-3 pt-4 sm:pt-5 md:py-6  min-w-0 ${styles.s5Card}`}>
                            <p className={`font-[700] ${styles.s5CardSubtitle} text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] ${styles.fontMontserrat}`}>Increase Organic Traffic</p>
                            <p className={`font-[400] max-w-[80%] self-center text-center text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] ${styles.fontopensans}`}>SEO is a key factor for your website to get ranked in the search engines and if that happens, more people looking for answers will be able to find your page.
                            </p>
                        </div>
                        <div className={`w-full md:flex-1 xl:h-[252px] min-w-0 ${styles.s5Card}`}>
                            <img src="/alishba-services-v3/content-marketing/whycontentmarketingmatters.jpg" alt="Why Content Marketing Matters" title="Why Content Marketing Matters" className="w-full h-full lg:h-full xl:h-full object-cover" />
                        </div>
                    </div>

                    {/* Bottom Row  */}
                    <div className={`w-full flex flex-col md:flex-row md:flex-nowrap xl:h-[202px] gap-0 mt-0 ${styles.s5CardRow}`}>
                        <div className={`w-full md:flex-1 flex flex-col gap-2 sm:gap-3 px-4 sm:px-6 text-center md:px-8 lg:px-10 xl:px-10 pt-4 sm:pt-5 md:py-6 xl:pt-6 min-w-0 ${styles.s5Card}`}>
                            <p className={`font-[700] ${styles.s5CardSubtitle} text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] ${styles.fontMontserrat}`}>Build Trust & Authority</p>
                            <p className={`font-[400] max-w-full text-center text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] ${styles.fontopensans}`}>Producing informative content can be a key factor in your company gaining the status of an authority figure in the market.

                            </p>
                        </div>
                        <div className={`w-full md:flex-1 px-4 sm:px-6 text-center md:px-8 lg:px-10 xl:px-10 border border-[#DFDDDD] flex flex-col gap-2 sm:gap-3 pt-4 sm:pt-5 md:py-6 xl:pt-6 min-w-0 ${styles.s5Card}`}>
                            <p className={`font-[700] ${styles.s5CardSubtitle} text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] ${styles.fontMontserrat}`}>Encourage Engagement & <br className="hidden xl:block" /> Conversation</p>
                            <p className={`font-[400] max-w-full text-center text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] ${styles.fontopensans}`}>Creating content for your audience that resonates will lead to engagement, sharing, and conversions.
                            </p>
                        </div>
                        <div className={`w-full md:flex-1 flex flex-col gap-2 sm:gap-3 px-4 sm:px-6 text-center md:px-8 lg:px-10 xl:px-10 pt-4 sm:pt-5 md:py-6 xl:pt-6 min-w-0 ${styles.s5Card}`}>
                            <p className={`font-[700] ${styles.s5CardSubtitle} text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] ${styles.fontMontserrat}`}>Increase Sales & Lead <br className="hidden xl:block" /> Generation</p>
                            <p className={`font-[400] max-w-full text-center text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] ${styles.fontopensans}`}>Content is a major driver behind sales from signing up to newsletters to purchasing. </p>
                        </div>
                    </div>
                </div>

                {/* Row 2  */}
                <div className="w-full flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-0 md:justify-between lg:justify-start">
                    {/* Left Side Container  */}
                    <div className="w-[62%] lg:w-[70%] xl:w-[863px] h-auto xl:h-[430px] relative overflow-hidden">
                        <img src="/team-banner.png" alt="Why Content Marketing Matters" title="Why Content Marketing Matters" className="xl:object-cover" />
                    </div>

                    {/* Right Side Container  */}
                    <div className="px-8 w-[38%] lg:w-[30%] xl:w-[calc(100%-831px)] h-auto xl:h-[430px] relative flex flex-col justify-end xl:justify-between ">
                        {/* Top Row  */}
                        <div className="flex flex-col w-full ">

                            {/* Years Of Working Image  */}
                            <img src="/varun/content-marketing/workingexperienec.jpg" alt="Why Content Marketing Matters" title="Why Content Marketing Matters" className="w-[275px] xl:w-full  h-auto object-cover" />

                            {/* Google Reviews Image  */}
                            <a href="https://share.google/KiTNs3mJMr5qUOkjK" target="_blank" rel="noopener noreferrer"><img src="/g-5-star2.png" alt="Why Content Marketing Matters" title="Why Content Marketing Matters" className="w-[275px] xl:w-[271px]  h-auto object-cover cursor-pointer" /></a>
                        </div>

                        {/* Bottom Row  */}
                        <div className="w-full border-t border-[#D9D9D9] pt-3 sm:pt-4 xl:pt-3 flex justify-between gap-4 sm:gap-6 xl:gap-0">
                            {/* Left Side Container  */}
                            <div className="flex flex-col gap-1 sm:gap-2">
                                <p className={`font-[700] text-[32px] sm:text-[40px] md:text-[31px] lg:text-[50px] text-[#0F1640] ${styles.fontmontserrat}`}>1M+</p>
                                <p className={`font-[600] text-[12px] sm:text-[14px] xl:text-[16px] text-[#0F1640] ${styles.fontopensans}`} >Creatives Published</p>
                            </div>

                            {/* Right Side Container  */}
                            <div className="flex flex-col gap-1 sm:gap-2">
                                <p className={`font-[700] text-[32px] sm:text-[40px] md:text-[31px] lg:text-[50px] text-[#0F1640] ${styles.fontmontserrat}`}>500+</p>
                                <p className={`font-[600] text-[12px] sm:text-[14px] xl:text-[16px] text-[#0F1640] ${styles.fontopensans}`} >Success Stories</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section5;



