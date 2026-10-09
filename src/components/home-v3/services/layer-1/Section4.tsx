import Layer1Card from "./cards/Layer1Card";
import data from "../../../../../servive-layer-2.json";
import styles from './page.module.css';
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
function Section4() {
    return (
        <section className={`w-full flex justify-center items-center pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-[70px] pb-8 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-[70px] ${styles.containerWidth}`}>
            {/* Centered Align Container  */}
            <div className="w-full flex flex-col justify-center items-center gap-6 sm:gap-8 lg:gap-10">
                {/* Row 1 For Heading  */}
                <div className="w-full flex flex-col text-center justify-center items-center  px-4 sm:px-0">
                    <a href="/services" target="_blank" className={`font-[600] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] cursor-pointer text-[#C99237] uppercase ${styles.fontopensans}`}>Services</a>
                    <h2 className={`font-[700] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[34px] xl:text-[36px] text-[#000000] leading-tight sm:leading-snug  ${styles.fontmontserrat}`}>Our Digital Marketing Services</h2>
                    <p className={`font-[400] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-[#000000] ${styles.fontopensans}`}>is more than what you'll ever need</p>
                </div>

                {/* Row 2 For Cards  */}
                <div className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr items-stretch gap-8 md:gap-6 lg:gap-8 xl:gap-10 ${styles.cardsContainer}`}>
                    {
                        data.map((item: Item, idx: number) => {
                            return (
                                <Layer1Card item={item} key={idx} idx={idx} />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Section4;