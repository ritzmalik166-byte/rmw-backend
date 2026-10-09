import Image from "next/image";
import styles from "./page.module.css"

function Section4() {
    return (
        <section className="flex w-full items-center justify-center pt-10 lg:pt-[70px]">
            {/* Centered Align Container  */}
            <div className={`flex w-full flex-col-reverse items-center justify-between gap-8 md:gap-12 lg:flex-row lg:items-stretch lg:gap-10 ${styles.containerWidth}`}>
                {/* Left Side Container  */}
                <div className="relative w-full shrink-0 max-md:h-auto max-md:aspect-[603/566] md:h-[615px] lg:w-[500px] lg:h-[480px] xl:w-[603px] xl:h-[566px]">
                    <Image src={'/slug/s3/seo-s3-img1.jpg'} fill alt="Ritz Media World – SEO services" title="Ritz Media World"></Image>
                </div>

                {/* Right Side Container — stretches to row height (matches tallest sibling) */}
                <div className="flex min-h-0 flex-1 flex-col items-start justify-between self-stretch lg:max-w-[593px] w-full gap-4 lg:gap-5">
                    {/* Row 1  */}
                    <div className="flex flex-col gap-2">
                        <h2 className={`mt-[-4px] font-[700] leading-tight text-center md:text-left xl:text-[36px] text-[23px] md:text-[28px] ${styles.fontmontserrat}`}>We’re Award-Winning Development Agencies</h2>
                        <p className={`font-[400] text-center md:text-left xl:text-[16px] text-[14px] lg:text-[13px]  xl:leading-[28px]  ${styles.fontpoppins}`}>
                            We’ve held hands with budding brands that have shattered sealings of convention. With us behind them, they have achieved great feats in their industry and went on to dominate their competition.
                        </p>
                    </div>

                    {/* Row 2  */}
                    <div className="flex items-center gap-5 flex-row md:justify-between md:gap-8 lg:gap-2 xl:gap-12">
                        <div>  <img src="/services-v3-slug/s4/17_plus.png" alt="Ritz Media World – 17+ years of experience" title="Ritz Media World" className="h-auto w-[220px] md:w-[300px] xl:w-[429px]" /></div>

                        <div className="flex flex-col   justify-center items-center">
                            <p className={`font-[600] text-[40px] md:text-[50px] ${styles.fontmontserrat}`}>300+</p>
                            <p className={`font-[400] text-[14px] ${styles.fontopensans}`}>Successful Projects</p></div>
                    </div>

                    {/* Row 3  */}
                    <div className="w-full flex flex-col gap-4 justify-between">
                        <ul className={`font-[400] text-[14px] lg:text-[13px] xl:text-[14px] list-none md:list-disc pl-4 flex flex-col xl:gap-1  text-center md:text-left mb-4 md:mb-0 [&>li::marker]:text-[20px] ${styles.fontpoppins}`}>
                            <li>Your site will be more accessible & visible with creative optimization</li>
                            <li>Optimize your web pages to boost brand rankings</li>
                            <li>Increase your sales with high-quality SEO customized services</li>
                        </ul>
                        <div className="flex justify-center md:justify-start">
                            <a href="/about.html" target="_blank" className="flex justify-between items-center gap-4 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity">
                                <p className={`font-[500] text-[18px] ${styles.fontmontserrat}`}>More about us</p>
                                <div className="w-[40px] h-[40px] bg-[#C99237] rounded-full flex justify-center items-center">

                                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.4276 2.92383L17.1346 9.08052L12.9492 4.01635L19.4276 2.92383Z" fill="white" />
                                        <rect x="2.19672" y="16.7173" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19672 16.7173)" fill="white" />
                                    </svg>

                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Section4;