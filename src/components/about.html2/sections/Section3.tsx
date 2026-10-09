import styles from "./page.module.css";
import s3 from "./Section3.module.css";
import Link from "next/link";

function Section3() {
    const data = [
        {
            title: "Brand Identity",
            description: "As a leading creative digital marketing agency and a top branding agency in Delhi NCR, we design visual systems that strengthen brand recognition and long lasting growth. Branding advancements given by us help businesses to compete efficiently in Delhi NCR and pan India level.",
            image: "/new-about-imgs/s3/abt-s3-img1.jpg",
            link: "https://ritzmediaworld.com/services/creative-services/branding-and-identity-development"
        },
        {
            title: "Advertising Design",
            description: "Among the top PPC Company in Delhi and Noida, and the best advertising agencies in India, our print advertising services are managed with perfection and are aligned with the newspaper ad cost planning which includes TOI newspaper ad cost and Dainik Jagran newspaper ad cost. We maximize visibility, budgets and ROI thanks to expert knowledge.",
            image: "/new-about-imgs/s3/abt-s3-img2.jpg",
            link: "https://ritzmediaworld.com/services/print-advertising/advertisement-designing"
        },
        {
            title: "Content Marketing",
            description: "As a creative digital marketing agency and one of Delhi NCR’s leading advertising agencies, we deliver strategic content marketing solutions designed to enhance visibility and improve search rankings. Our SEO-optimized content, performance-driven creatives, and compelling brand storytelling help businesses attract high-intent audiences and drive measurable growth ",
            image: "/new-about-imgs/s3/abt-s3-img3.jpg",
            link: "https://ritzmediaworld.com/services/contents-marketing"
        },
        {
            title: "Digital Marketing",
            description: "We deliver result-driven digital marketing services designed to maximize ROI. From paid advertising and performance marketing to social media and search engine marketing, our tailored strategies help your brand thrive in today’s competitive digital landscape.",
            image: "/new-about-imgs/s3/abt-s3-4.jpg",
            link: "https://ritzmediaworld.com/services/digital-marketing"
        },
    ]
    return (
        <section className={`w-full py-[40px] xl:py-[70px] flex justify-center items-center ${s3.root}`}>
            {/* Centered Align Container  */}
            <div className={`w-full flex flex-col gap-10 md:gap-22 ${styles.containerWidth} ${s3.container}`}>
                {
                    data.map((item, idx) => {
                        return (
                            <div
                                key={item.title}
                                className={`flex w-full flex-col-reverse items-center justify-between gap-0 md:items-stretch ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} ${s3.row}`}
                            >
                                {/* Text column (first in DOM; stacks under image below md via flex-col-reverse) */}
                                <div className={`relative mt-4 flex w-full flex-col gap-2 items-center text-center md:mt-4 md:w-[calc(100%-477px)] ${idx % 2 === 0 ? "md:items-start md:text-start" : "md:items-end md:text-end"} ${s3.leftCol}`}>

                                    {/* Top rule — desktop / tablet only */}
                                    <div
                                        className={`pointer-events-none hidden h-[40px] w-full md:absolute md:inset-0 md:block ${s3.absLine}`}
                                        aria-hidden
                                    />

                                    {/* Row 1  */}
                                    <div
                                        className={`relative z-[1] w-full flex gap-4 items-center justify-center pl-0 md:items-center md:pl-1 ${idx % 2 === 0 ? "md:justify-start" : "md:justify-end"} ${s3.titleRow}`}
                                    >
                                        <div className={`flex flex-row items-baseline gap-2 md:gap-4 ${styles.fontmontserrat}`}>

                                            <span
                                                className={`shrink-0 font-[500] md:text-[16px] text-[13px] text-[#0F1640] ${s3.idx}`}
                                            >
                                                0{idx + 1}.
                                            </span>

                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title={item.title}
                                                className={`cursor-pointer no-underline ${styles.fontmontserrat}`}
                                            >
                                                <h3
                                                    className={`font-[700] text-[24px] leading-tight text-[#0F1640] md:text-[36px] ${s3.title}`}
                                                >
                                                    {item.title}
                                                </h3>
                                            </a>

                                        </div>
                                    </div>
                                    {/* Row 2  */}
                                    <div
                                        className={`relative z-[1] ml-0 flex flex-col gap-4 items-center text-center md:ml-9 ${idx % 2 === 0 ? "md:items-start md:text-start" : "md:items-end md:text-end"} ${s3.bodyRow}`}
                                    >
                                        <p className={`mx-auto font-[400] text-[14px] max-w-[640px] md:mx-0 md:text-[16px] ${styles.fontpoppins} ${s3.desc}`}>
                                            {item.description}
                                        </p>
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={`Learn more about ${item.title}`}
                                            className={`flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#C99237] hover:bg-[#0F1640] no-underline ${s3.cta}`}
                                            aria-label={`Learn more about ${item.title}`}
                                        >
                                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                                <path d="M19.4276 2.92383L17.1346 9.08052L12.9492 4.01635L19.4276 2.92383Z" fill="white" />
                                                <rect x="2.19672" y="16.7171" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19672 16.7171)" fill="white" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Image column (second in DOM; appears first below md via flex-col-reverse) */}
                                <div className={`h-auto w-full shrink-0 md:w-[477px] ${s3.imgCol}`}>
                                    <Link href={item.link} target="_blank" title={item.title} rel="noopener noreferrer">
                                        <img
                                            src={item.image}
                                            alt={`${item.title} – Ritz Media World advertising services`}
                                            title={`${item.title} – Ritz Media World`}
                                            className="h-auto w-full"
                                        />
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Section3;