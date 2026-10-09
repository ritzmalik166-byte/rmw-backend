import React from 'react';
import styles2 from '../page.module.css';
import styles from './page.module.css';

// Helper function to convert className to class for dangerouslySetInnerHTML
const convertClassNameToClass = (html: string): string => {
    if (!html) return '';
    return html.replace(/className=/g, 'class=');
};

function ServiceCard({ service, index }: { service: any, index: number }) {
    const { title, image, slug, subServices, description, margin, link } = service;
    const plainTitle = String(title || "Service")
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();
    const imgLabel = `${plainTitle} – Ritz Media World`;
    return (
        <div className="w-full flex flex-col justify-center lg:flex-row lg:justify-between gap-4 sm:gap-6 lg:gap-10 py-6 sm:py-8 md:py-10 lg:py-[50px] border-b-[1px] border-b-[#D9D9D9]  px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12">

            {/* Left Side Container  */}
            <div onClick={() => window.open(`${link}`, "_blank")} className="w-full  cursor-pointer lg:w-auto h-[200px] sm:h-[250px] md:h-[300px] lg:h-[377px] relative" >

               
                <img src={image} alt={imgLabel} title="Ritz Media World" className={`z-10 relative h-full object-contain xl:object-cover 
  ${index === 3 ? "w-full" : "w-full"}`}
                />

            </div>

            {/* Right Side Container  */}
            <div className='w-full lg:w-[42%] xl:max-w-[550px] flex flex-col gap-3 sm:gap-4'>
                {/* Title  */}
                <div className={`flex lg:justify-between justify-center items-center lg:items-center w-full `}>
                    <h3 onClick={(e) => { e.stopPropagation(); window.open(`${link}`, "_blank"); }} className={`cursor-pointer text-[18px] md:text-[22px] lg:text-[28px] text-center lg:text-left font-medium xl:text-[30px] ${styles2.fontmontserrat} text-[#0F1640]`}>
                        {plainTitle}
                    </h3>
                    <div className="hidden lg:flex justify-center lg:justify-start">
                    <div onClick={() => window.open(`${link}`, "_blank")} className="w-[40px] h-[40px]  bg-[#C99237] hover:bg-[#0F1640] rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out">
                        <svg className="w-[20px] h-[18px]" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.1701 4.23947L24.8452 13.1667L18.7764 5.82364L28.1701 4.23947Z" fill="white" />
                            <rect x="3.1853" y="24.2397" width="24" height="1" transform="rotate(-39.5724 3.1853 24.2397)" fill="white" />
                        </svg>
                    </div>
                </div>
                </div>

                <p
                    className='font-[400] text-[13px] sm:text-[14px] text-[#0F1640] md:text-[16px] leading-relaxed text-center lg:text-left'
                    dangerouslySetInnerHTML={{ __html: convertClassNameToClass(description || '') }}
                />
                <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:grid-cols-3 gap-x-2 sm:gap-x-2 gap-y-2 sm:gap-y-2  ">
                    {subServices.map((subService: any) => (
                        <div onClick={() => window.open(subService.slug, "_blank")} key={subService.title} className='bg-[#F2F2F2] hover:bg-[#0F1640] lg:pl-2
                          rounded-[2px] px-2  lg:py-2  min-h-[70px] cursor-pointer sm:min-h-[80px]  lg:h-[88px] flex justify-center lg:justify-start items-center text-center lg:text-left  text-[#0F1640] hover:text-white'>
                            <h4 className={`font-[600] text-[13px]  sm:text-[14px] md:text-[14px] leading-relaxed p-1.5 ${styles2.fontopensans}`}>
                                <a href={subService.slug} target="_blank" rel="noopener noreferrer">{subService.title}</a>
                            </h4>
                        </div>
                    ))}
                </div>
                {/* and circle link  */}
                <div className="flex lg:hidden justify-center lg:justify-start">
                    <div onClick={() => window.open(`${link}`, "_blank")} className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] md:w-[54px] md:h-[54px] lg:w-[58px] lg:h-[58px] bg-[#C99237] hover:bg-[#0F1640] rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out">
                        <svg className="w-[20px] h-[18px] sm:w-[24px] sm:h-[22px] md:w-[28px] md:h-[26px] lg:w-[32px] lg:h-[29px]" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.1701 4.23947L24.8452 13.1667L18.7764 5.82364L28.1701 4.23947Z" fill="white" />
                            <rect x="3.1853" y="24.2397" width="24" height="1" transform="rotate(-39.5724 3.1853 24.2397)" fill="white" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard;
