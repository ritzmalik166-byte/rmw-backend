"use client";

import styles from "../page.module.css";

type S5CardMobileProps = {
    title: string;
    image: string;
    content: string;
    index: number;
    link: string;
};

function S5CardMobile({ title, image, content, index, link }: S5CardMobileProps) {
    // const badge = (index + 1).toString().padStart(2, "0");
    return (
        <article className="w-full h-full cursor-pointer min-h-0 max-w-full flex-shrink-0 flex flex-col bg-white rounded-xl overflow-hidden border border-[#E8E8E8] shadow-sm">
            <div onClick={() => window.open(link, "_blank")} className="relative w-full shrink-0 flex items-center justify-center py-3 px-2 sm:py-4 sm:px-2.5 md:px-3 lg:py-5 lg:px-2">
                <img
                    src={image}
                    alt={title}
                    title={title}
                    className="w-[95%] h-auto max-w-none sm:w-[98%] md:w-[98%] lg:w-full rounded-[10px] object-contain"
                />
                {/* <span className={`absolute top-3 right-3 font-[500] text-[14px] text-[#222] ${styles.fontmontserrat}`}>
                    {badge}
                </span> */}
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5 md:gap-4 md:p-6 min-h-0">
                <a
                    href={link}
                    target='_blank'
                    className="font-[500] text-[17px] sm:text-[18px] md:text-[20px] lg:text-[22px] leading-[1.25] text-[#1a1a1a] line-clamp-2 min-h-[2.75rem] sm:min-h-[2.875rem] md:min-h-[3.125rem] lg:min-h-[3.375rem] ${styles.fontmontserrat}"
                >
                    {title}
                </a>
                <p
                    className={`font-[400] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.5] text-left text-[#444] line-clamp-4 overflow-hidden h-[4.875rem] sm:h-[5.25rem] md:h-[5.625rem] lg:h-[6rem] shrink-0 ${styles.fontopensans}`}
                >
                    {content}
                </p>
                <button onClick={() => window.open(link, "_blank")} type="button" className="flex items-center gap-2 w-fit mt-auto pt-1 shrink-0">
                    <span className={`font-[500] text-[15px] md:text-[16px] lg:text-[17px] ${styles.fontopensans}`}>
                        Learn more
                    </span>
                    <div className="w-[34px] h-[34px] md:w-[38px] md:h-[38px] lg:w-[40px] lg:h-[40px] bg-[#C99237] rounded-full flex justify-center items-center flex-shrink-0">
                        <svg width="18" height="16" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.4276 2.92383L17.1346 9.08052L12.9493 4.01635L19.4276 2.92383Z" fill="white" />
                            <rect x="2.19678" y="16.7172" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19678 16.7172)" fill="white" />
                        </svg>
                    </div>
                </button>
            </div>
        </article>
    );
}

export default S5CardMobile;
