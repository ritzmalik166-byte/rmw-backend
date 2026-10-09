"use client"

import styles from "../page.module.css";

type S5CardProps = { isActive?: boolean; isOpen: boolean, title: string, content: string, image: string, link: string, index: number; };

function S5Card({ isOpen, title, content, image, link, index }: S5CardProps) {
    const badge = (index + 1).toString().padStart(2, "0");
    return (
        <div
        onClick={() => window.open(link, "_blank")}
            className={`${styles.bookCardContainer} ${isOpen ? styles.bookCardContainerOpen : ""} h-[464px] flex flex-shrink-0 cursor-pointer`}
        >
            {/* Left Side Card Cover  */}
            <div className="w-[378px] h-full relative bg-[#F2F2F2] flex flex-col gap-4 p-8 flex-shrink-0">
                {/* Top Heading Row  */}
                <div className="w-full">
                    <h3 className={`font-[500] text-[24px] ml-[20px] lg:ml-0 ${styles.fontmontserrat}`}>{title}</h3>
                </div>

                {/* Bottom Image Row  */}
                <div className="w-full flex justify-center">
                    <img src={image} alt={`${title} – Ritz Media World`} title={`${title} – Ritz Media World`} className="w-[279px] lg:w-[332px] h-auto object-cover" />
                </div>

                {/* Absolute Positioned Div  */}
                <div className="absolute top-4 right-4">
                    <p className={`font-[500] text-[16px] text-[#C99237] ${styles.fontmontserrat}`}> {badge}</p>
                </div>
            </div>

            {/* Right Side Card Page Content – book flip */}
            <div
                className={`${styles.bookRightPage} ${isOpen ? styles.bookOpenRight : styles.bookCloseright} h-full flex flex-col items-start gap-6 p-10 bg-white border-[0.94px] border-[#F2F2F2]`}
            >
                <p className={`font-[400] text-[16px] justify-center text-left ${styles.fontopensans}`}>{content}
                </p>

                <button type="button" className="flex justify-center items-center gap-2" onClick={() => window.open(link, "_blank")}    >
                    <p className={`font-[500] text-[18px] ${styles.fontopensans}`}>Learn more</p>
                    <div className="w-[40px] h-[40px] bg-[#C99237] hover:bg-[#0F1640]  rounded-[50px] flex justify-center items-center cursor-pointer">

                        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.4276 2.92383L17.1346 9.08052L12.9493 4.01635L19.4276 2.92383Z" fill="white" />
                            <rect x="2.19678" y="16.7172" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19678 16.7172)" fill="white" />
                        </svg>

                    </div>
                </button>
            </div>
        </div>
    )
}


export default S5Card;