"use client";
import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import styles from "../page.module.css";

interface Item {
    title: string;
    description: string;
    image: string;
    link: string;
    meta_titles: string;
    meta_description: string;
    meta_keywords: string;
    service2_id: number;
}
function Layer1Card({ item, idx }: { item: Item, idx: number }) {
    const { title, description, image, link, meta_titles, meta_description, meta_keywords } = item;
    return (
        <article 
            className="w-full cursor-pointer h-full flex flex-col justify-between gap-2"
            itemScope 
            itemType="https://schema.org/Service"
            aria-label={meta_titles || title}
            onClick={() => window.open(`${link}`, "_blank")}
        >
            {/* Row 1 - Header with Meta Info */}
            <header className="flex w-full justify-start pb-2">
                <div className="flex items-center gap-3">
                    <p className={`font-[600] text-[13px] sm:text-[18px] text-[#000000] ${styles.fontmontserrat}`}>{String(idx + 1).padStart(2, '0')}</p>
                    {meta_titles && (
                        <meta itemProp="name" content={meta_titles} />
                    )}
                    {meta_keywords && (
                        <meta itemProp="keywords" content={meta_keywords} />
                    )}
                </div>
            </header>

            {/* Row 2  */}
            <div className="w-full h-full flex flex-col justify-between gap-3 sm:gap-4 border-t-[1px] border-t-[#D9D9D9] border-r-[1px] border-r-[#D9D9D9]  pt-3 sm:pt-6">
                {/* Content Container  */}
                <div className="flex flex-col w-full gap-2 sm:gap-3 flex-grow">
                    <h3 
                        className={`font-[700] text-[16px] sm:text-[17px] lg:text-[18px] text-[#000000] leading-tight ${styles.fontopensans}`}
                        itemProp="name"
                        title={meta_titles || title}
                    >
                        {title}
                    </h3>
                    {meta_titles && meta_titles !== title && (
                        <p className="sr-only" itemProp="alternateName">{meta_titles}</p>
                    )}
                    <p 
                            className={`font-[400] max-w-[90%] text-[13px] sm:text-[16px] text-[#000000] leading-relaxed line-clamp-4 ${styles.fontopensans}`}
                        itemProp="description"
                        title={meta_description || description}
                    >
                        {description}
                    </p>
                    {meta_description && (
                        <meta itemProp="description" content={meta_description} />
                    )}
                </div>

                {/* Button Container  */}
                <div className="w-full flex flex-col gap-3 sm:gap-4">
                    <Link 
                        title="Learn more"
                        href={`${link}`} 
                        target="_blank" 
                        className="w-fit"
                        itemProp="url"
                        aria-label={`Learn more about ${meta_titles || title}`}
                    >
                        <button  className="w-[140px] sm:w-[154px] h-[42px] sm:h-[46px] flex justify-start items-center gap-6 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity group">
                            <p className={`font-[500] text-[16px] sm:text-[17px] lg:text-[18px] text-[#000000] ${styles.fontmontserrat}`}>More</p>
                            <div className="bg-[#C99237] h-[34px] w-[34px] sm:h-[36px] sm:w-[36px] lg:h-[40px] lg:w-[40px] rounded-[50px] flex justify-center items-center text-white group-hover:scale-110 transition-transform">
                                <BsArrowUpRight className="text-white text-[15px] sm:text-[16px] lg:text-[18px]" />
                            </div>
                        </button>
                    </Link>
                    <div className="w-full h-[150px] sm:h-[160px] lg:h-[169px] relative overflow-hidden">
                        <Image 
                            src={image} 
                            alt={meta_titles || title} 
                            fill 
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            itemProp="image"
                            title={meta_description || description}
                        />
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Layer1Card;
