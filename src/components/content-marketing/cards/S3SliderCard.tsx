"use client";
import Image from "next/image";
import { BsArrowUpRight } from "react-icons/bs";
import { useState, useEffect } from "react";
import styles from "../page.module.css";


function S3SliderCard({ index, title, desc, activeCard, setActiveCard, image, activeCardTitle, link }: { index: number, title: string, desc: string, activeCard: number, setActiveCard: (index: number) => void, image: string, activeCardTitle: string, link: string }) {
    const [rotatedTextWidth, setRotatedTextWidth] = useState('400px');

    useEffect(() => {
        const updateWidth = () => {
            if (window.innerWidth < 640) {
                setRotatedTextWidth('250px');
            } else if (window.innerWidth < 768) {
                setRotatedTextWidth('300px');
            } else if (window.innerWidth < 1024) {
                setRotatedTextWidth('350px');
            } else {
                setRotatedTextWidth('400px');
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return (
        <div
            onClick={() => {
                if(activeCard !== index){
                    setActiveCard(index);
                } else {
                    window.open(link, "_blank");
                }
            }}
            className={`h-full overflow-hidden cursor-pointer transform-gpu will-change-[flex] ${index === 3 ? "border-r-0" : "border-r border-[#323E84]"} flex justify-between flex-col ${activeCard === index ? `${styles.cardContainerActive}  min-w-0` : "w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px] xl:w-[150px] min-[1360px]:w-[140px] flex-shrink-0"} ${styles.cardContainer}`}
        >
            {/* Top Container * Main Card */}
            <div  className={`flex h-[calc(100%-50px)] flex-col w-full justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 ${activeCard !== index ? "px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 lg:pl-0" : "px-5"} min-w-0 lg:pl-[50px]`}>
                {/* Upper Side  */}
                <div  className={`flex flex-col w-full gap-3 sm:gap-4 md:gap-5 ${activeCard === index ? "" : "relative"}`}>
                    <p className={`font-[600] text-[14px] sm:text-[16px] md:text-[16px] lg:text-[20px] xl:text-[22px] text-white uppercase ${styles.fontMontserrat} ${styles.cardTitle} 
                    ${activeCard === index
                            ? "rotate-0"
                            : "-rotate-90 origin-left absolute left-0 top-[100px] sm:top-[120px] md:top-[150px] lg:top-[180px] xl:top-[260px] whitespace-nowrap"
                        }`} style={activeCard !== index ? { width: rotatedTextWidth } : {}}>
                        {
                            activeCard === index ? activeCardTitle : <span dangerouslySetInnerHTML={{ __html: title }}></span>
                        }
                        
                    </p>
                    <div onClick={()=>window.open(link, "_blank")} className={`${styles.cardImage} ${activeCard === index ? styles.cardImageActive : styles.cardImageInactive} rounded-[4px] overflow-hidden`}>
                        <Image src={image} alt={activeCardTitle} title={activeCardTitle} fill className="object-cover" unoptimized />
                    </div>
                    <p onClick={()=>window.open(link, "_blank")} className={`font-[400] text-[12px] sm:text-[13px] md:text-[12px] lg:text-[15px] xl:text-[16px] text-white ${styles.fontOpenSans} ${styles.cardDescription} ${activeCard === index ? styles.cardDescriptionActive : styles.cardDescriptionInactive}`}>{desc}
                    </p>
                </div>
                {/* Bottom Side  */}
                <div className={`${styles.cardButton} ${activeCard === index ? styles.cardButtonActive : styles.cardButtonInactive}`}>
                    <a href={link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-[120px]  sm:w-[130px] md:w-[140px] lg:w-[150px] xl:w-[154px] h-[36px] sm:h-[38px] md:h-[40px] lg:h-[44px] xl:h-[46px] flex justify-between items-center gap-2 bg-transparent border-b-[2px] border-[#0F1640] text-white cursor-pointer hover:opacity-80 transition-opacity letsTalkToday2">
                        <p className={`font-[500] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] xl:text-[18px] text-white ${styles.fontMontserrat}`}>Learn More</p>
                        <div className="bg-[#C99237] h-[28px] w-[28px] sm:h-[30px] sm:w-[30px] md:h-[32px] md:w-[32px] lg:h-[36px] lg:w-[36px] xl:h-[40px] xl:w-[40px] rounded-[50px] flex justify-center items-center letsTalkTodayIcon">
                            <BsArrowUpRight className=" text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] xl:text-[18px] text-white" />
                        </div>  
                    </a>
                </div>
            </div>
            {/* Bottom Container  */}
            <div onClick={()=>window.open(link, "_blank")} className={`w-full border-t border-[#323E84] text-white ${activeCard !== index ? "px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20" : "px-[30px] lg:pl-[50px]"} py-4 sm:py-5 lg:py-6`}>
                <p className={`font-[500] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] ${styles.fontMontserrat}`}>{String(index + 1).padStart(2, '0')}</p>
            </div>
        </div>
    )
}

export default S3SliderCard;