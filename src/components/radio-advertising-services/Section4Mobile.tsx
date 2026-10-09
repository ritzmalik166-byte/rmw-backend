import styles from "./page.module.css";

const ADVANTAGES_CARDS = [
    "FM Advertising, in fact amongst many other mediums usually brings the lowest cost per reach.",
    "Radio reaches the same listener repeatedly; studies show four to five ad exposures build consideration and drive action, FM effective.",
    "You can also run multiple jungles in one campaign to keep the message exciting.",
    "FM advertising lets brands target one city, like Delhi, by choosing stations covering specific areas, such as Radio Mirchi effectively.",
];

function Section4Mobile() {
    return (
        <section className="block lg:hidden w-full bg-[#0F1640] py-10">
            <div className={`w-full flex flex-col items-center text-center ${styles.containerWidth}`}>
                <p
                    className={`font-[400] text-[28px] leading-tight capitalize text-white mb-8 ${styles.fontmontserrat}`}
                    style={{ maxWidth: "320px" }}
                >
                    advantages
                    of   <br />
                    <span className="font-[700] text-[#C99237]">    radio
                       </span> advertising
                </p>
                <div className="w-full flex flex-col items-center max-w-[400px] md:max-w-full w-full">
                    {ADVANTAGES_CARDS.map((text, index) => (
                        <div
                            key={index}
                            className={`w-full py-4 border-b border-white/30 text-center last:border-b-0 ${styles.fontopensans}`}
                        >
                            <p className="font-[400] text-[14px] leading-relaxed text-white">
                                {text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Section4Mobile;
