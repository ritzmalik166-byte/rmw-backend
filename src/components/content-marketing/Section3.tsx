"use client";
import { useState } from "react";
import Image from "next/image";
import { BsArrowUpRight } from "react-icons/bs";
import S3SliderCard from "./cards/S3SliderCard";
import styles from "./page.module.css";

function Section3() {
    const [activeCard, setActiveCard] = useState(0);
    const cardsData = [
        {
            image: "/service-v3/content-marketing/s3/Customized-content-strategy-new.jpg",
            title: "Customized<br /> content  strategy",
            activeCardTitle: "Customized content strategy",
            desc: "Generic content yields generic results. At Ritz Media World, we develop personalized content marketing campaigns that suit your brand, audience, and goals. Our content marketing strategy is a result of expert insights, search engine optimization, and creative storytelling that ensures every word counts and every word drives readers to act and convert.",
            link: "/services/contents-marketing/customized-content-strategy",
        },
        {
            image: "/alishba-services-v3/content-marketing/emailandnewsletter.jpg",
            title: "Email and Newsletter <br /> Marketing",
            activeCardTitle: "Email and Newsletter Marketing",
            desc: "Boost your business to the next level with our email marketing and newsletters solutions. We design customized email marketing campaigns that not only engage your subscribers but also help you generate high conversions. From automated campaigns or a promotional newsletter, our approach ensures that every email gives you a measurable return on investment (ROI).",
            link: "/services/contents-marketing/email-and-newsletters-marketing",
        },
        {
            image: "/service-v3/content-marketing/s3/Asset-Creation-Infographics-new.jpg",
            title: "Asset Creation and <br /> Infographics",
            activeCardTitle: "Asset Creation and Infographics",
            desc: "Use our content asset creation and infographics services to bring your brand to life. We create visual content, infographics, and digital assets that make complex information simple, increase engagement, and boost social media reach. Our graphic content strategies will help your business communicate ideas effectively and make your brand more visible on the internet.",
            link: "/services/contents-marketing/asset-creation-and-infographics",
        },
        {
            image: "/service-v3/content-marketing/s3/Content%20Promotion%20and%20Optimization-new.jpg",
            title: "Content Promotion <br /> and Optimization",
            activeCardTitle: "Content Promotion and Optimization",
            desc: "Undiscovered great content means wasted opportunity. At Ritz Media World, we maximize the reach and conversion potential of your content by promoting and optimizing it across all platforms. Through the strategic application of SEO, social media marketing, and paid advertising, we ensure that the right people are reached, and our results are constantly refined for maximum ROI.",
            link: "/services/contents-marketing/content-promotion-and-optimization",
        },
    ];
    return (
        <section className="w-full xl:pt-[70px] pt-[35px] flex justify-center gap-5 sm:gap-10 items-center flex-col border-t border-[#D9D9D9]">
            {/* Heading Container  */}
            <div className="w-full flex flex-col   items-center justify-center ">
                <a
                    href="/services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-[600] text-[16px] uppercase cursor-pointer text-[#C99237] ${styles.fontpoppins}`}
                >
                    Services
                </a>
                <h2
                    className={`font-[700] text-[22px] text-center sm:text-[36px]  ${styles.fontmontserrat}`}
                >
                    What We Provide
                </h2>
                <p className={`font-[400] text-[16px] pt-3 ${styles.fontopensans}`}>
                    Is more than what you’ll ever need
                </p>
            </div>

            {/* Mobile: Simple top image + bottom content cards (visible only < 768px) */}
            <div
                className={`w-full px-4 pb-6 sm:hidden ${styles.s3MobileCards}`}
            >
                {cardsData.map(
                    (
                        item: { image: string; title: string; desc: string; activeCardTitle: string; link: string },
                        index: number,
                    ) => (
                        <div
                            key={index}
                            className="w-full flex flex-col rounded-lg overflow-hidden bg-[#0F1640] mb-4"
                            onClick={()=>window.open(item.link, "_blank")}
                        >
                            <div className="w-full relative aspect-[16/10] shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    title={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col gap-2 p-4">
                                <h3
                                    className={`font-[600] text-[16px] text-white uppercase   ${styles.fontMontserrat}`}
                                >
                                    {item.activeCardTitle}
                                </h3>
                                <p
                                    className={`font-[400] text-[14px] text-white/90 leading-[20px] line-clamp-4 ${styles.fontopensans}`}
                                >
                                    {item.desc}
                                </p>
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-1 w-[110px] h-[34px] flex items-center gap-2 bg-transparent border-none text-white cursor-pointer hover:opacity-80 transition-opacity letsTalkToday">
                                    <p
                                        className={`font-[500] text-[12px]  ${styles.fontMontserrat}`}
                                    >
                                        Learn More
                                    </p>
                                    <div className="bg-[#C99237] h-[24px] w-[24px] rounded-full flex justify-center items-center shrink-0 letsTalkTodayIcon">
                                        <BsArrowUpRight className=" text-[12px] text-white" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    ),
                )}
            </div>

            {/* Tablet & Desktop: Animated Slider (hidden on mobile, visible from 768px) */}
            <div className="hidden sm:flex w-full bg-[#0F1640] justify-between h-[500px] md:h-[550px] lg:h-[600px] xl:h-[631px] overflow-x-hidden">
                <div
                    className={`w-full h-full flex overflow-x-hidden ${styles.containerWidth2}`}
                >
                    {cardsData.map(
                        (
                            item: {
                                image: string;
                                title: string;
                                activeCardTitle: string;
                                desc: string;
                                link: string;
                            },
                            index: number,
                        ) => (
                            <S3SliderCard
                                key={index}
                                index={index}
                                image={item.image}
                                title={item.title}
                                activeCardTitle={item.activeCardTitle}
                                desc={item.desc}
                                link={item.link}
                                activeCard={activeCard}
                                setActiveCard={setActiveCard}
                            />
                        ),
                    )}
                </div>
            </div>
        </section>
    );
}

export default Section3;
