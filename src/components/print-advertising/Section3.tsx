"use client"

import S3Card from "./cards/S3Card";
import { BsArrowLeft } from "react-icons/bs";
import styles from "./page.module.css";
import { useState } from "react";

function Section3() {

    const cardsData = [
        {
            tile: "Advertisement Design",
            para: "Our expert designers create custom print advertisements that are engaging and clear in message, while evoking customer reaction instantly. We create beautiful print advertising that makes an impression. From flyers to brochures and magazine ads, we’ll make it happen! Allow us to assist you with your print marketing campaigns that convert readers to customers, page after page.",
            imgPath: "/service-v3/print-advertising/s3/advertising-design.jpg",
            bigImgPath: "/service-v3/print-advertising/s3/advertising-design.jpg",
        },
        {
            tile: "Ad Placement",
            para: "Wherever it is that your ad appears, it is just as important as the physical message itself. With years of experience and in-depth market knowledge, our media placement strategy gets your print ads, digital ads, marketing materials, etc., in front of your target audience. We utilize precise targeting around right places, geographies, to ensure maximum visibility, engagement and conversion of ads. Placement of the ad is not left to fate. The placement is designed to result in a profitable interaction with the audience.",
            imgPath: "/service-v3/print-advertising/s3/ad-placement.jpg",
            bigImgPath: "/service-v3/print-advertising/s3/ad-placement.jpg",
        },
        {
            tile: "Copywriting",
            para: " Words can persuade and great copy can convert. When you choose our expert copywriters, you are guaranteed not just any writing but effective marketing copy that will entice and convert.  Advertising copy is clever and trustworthy messaging to deliver results whether it is for print adverts, brochures or ad campaigns. We create the words that make your brand memorable",
            imgPath: "/service-v3/print-advertising/s3/copy-writnig.jpg",
            bigImgPath: "/service-v3/print-advertising/s3/copy-writnig.jpg",
        },
        {
            tile: "Cost Negotiation",
            para: "Why pay full price when you can negotiate it down? Backed by solid media relations and strong negotiation skills, Ritz ensures your ads get top-notch placements at an affordable price. We utilize your advertising budget as best as possible and get you the best placements without overspending. Save money for celebrating a success, not for paying an invoice.",
            imgPath: "/service-v3/print-advertising/s3/cost-negotiation.jpg",
            bigImgPath: "/service-v3/print-advertising/s3/cost-negotiation.jpg",
        },
        {
            tile: "Ad Size Optimization",
            para: "Bigger is not always better, smarter is. We optimize ad size to achieve the best of both worlds: maximum visibility and maximum ROI, ensuring your ad gets noticed without overspending. Every aspect is designed to deliver maximum visibility, maximum impact, and minimum waste, providing a smart solution to maximize your return on investment.",
            imgPath: "/service-v3/print-advertising/s3/ad-optimisation.jpg",
            bigImgPath: "/service-v3/print-advertising/s3/ad-optimisation.jpg",
        },
        {
            tile: "Ad Scheduling",
            para: "Timing is everything. We time your print advertising to fit in with the reader habits, seasonality and market opportunities so that your message does not just come in time but is impossible to miss. With expert ad scheduling, we ensure your campaigns reach the right audience at the right time. After all, being perfectly on time is substantially more impactful than shouting every day.",
            imgPath: "/service-v3/print-advertising/s3/ad-scheduling.jpg",
            bigImgPath: "/service-v3/print-advertising/s3/ad-scheduling.jpg",
        },
    ];

    const [activeCard, setActiveCard] = useState(0);
    const [activeCardImg, setActiveCardImg] = useState(cardsData[0].bigImgPath);
    return (
        <section className="w-full justify-center items-center py-8 sm:py-12 md:py-14 xl:py-[70px] border-t border-b border-[#E5E5E5]">
            {/* Centered Align Container  */}
            <div className={`w-full flex flex-col gap-4 sm:gap-14 ${styles.containerWidth2} px-4 sm:px-6 md:pl-8 xl:pr-0 xl:pl-10`}>
                {/* Top Container  */}
                <div className="w-full flex flex-col justify-center items-center text-center">
                    <p className={`font-[600] text-[14px] sm:text-[16px] uppercase text-[#C99237] ${styles.fontpopins}`}>
                        Services
                    </p>
                    <h2 className={`font-[700] text-[24px] sm:text-[28px] md:text-[32px] xl:text-[36px] ${styles.fontmontserrat}`}>
                        What We Provide
                    </h2>
                    <p className={`font-[400] text-[14px] sm:text-[16px] ${styles.fontopensans}`}>
                        Is more than what you’ll ever need
                    </p>
                </div>
                {/* Bottom Slider Container  */}
                <div className="w-full flex flex-col lg:flex-row justify-between gap-4 sm:gap-6 lg:gap-4 xl:gap-6 items-stretch lg:items-start">
                    {/* Left Side Container  */}
                    <div className="w-full min-w-0 lg:flex-1 lg:min-w-0">
                        {
                            Array.from({ length: 6 }).map((_, index) => (
                                <S3Card setActiveCard={setActiveCard} activeCard={activeCard} setActiveCardImg={setActiveCardImg} index={index} key={index} data={cardsData[index] as { tile: string; para: string; imgPath: string, bigImgPath: string }} />
                            ))
                        }
                    </div>
                    {/* Right Side Container  */}
                    <div className="w-full hidden lg:block min-w-0 lg:w-[400px] xl:w-[560px] lg:flex-shrink-0 relative">
                        {/* Absolute Positioned Container  */}
                        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[50px] lg:h-[50px] xl:w-[58px] xl:h-[58px] absolute top-4 left-2 sm:top-8 sm:left-4 lg:top-12 lg:-left-3 xl:top-20 xl:-left-5 rounded-full overflow-hidden flex justify-center items-center bg-[#C99237] cursor-pointer z-10">
                            <svg className="w-5 h-[18px] sm:w-6 sm:h-5 lg:w-7 lg:h-6 xl:w-8 xl:h-[29px]" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.1701 4.23947L24.8452 13.1667L18.7764 5.82364L28.1701 4.23947Z" fill="white" />
                                <rect x="3.18524" y="24.2398" width="24" height="1" transform="rotate(-39.5724 3.18524 24.2398)" fill="white" />
                            </svg>
                        </div>
                        {/* Main Image Container  */}
                        <div className="w-full overflow-hidden">
                            <img 
                                key={activeCardImg} 
                                src={activeCardImg} 
                                alt="" 
                                className={`w-full h-auto object-cover ${styles.slideIn} z-0`} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section3;