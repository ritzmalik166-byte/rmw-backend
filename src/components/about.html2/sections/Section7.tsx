import { Http2ServerRequest } from "node:http2";
import styles from "./page.module.css";
import s7 from "./Section7.module.css";

function Section7() {
    return (
        <section className={`w-full flex justify-center items-center ${s7.root}`}>
            {/* Centered Align Container  */}
            <div className={`w-full ${styles.containerWidth} ${s7.container}`}>
                <div className={`flex w-full flex-col items-center justify-center gap-8 ${s7.stack}`}>
                    {/* Hero — top on all breakpoints */}
                    <div className={`flex w-full max-w-full flex-col items-center gap-2 text-center ${s7.hero}`}>
                        <h2 className={`font-[600] text-[16px] uppercase text-[#C99237] ${styles.fontpoppins} ${s7.eyebrow}`}>
                            Our Commitment
                        </h2>
                        <h3 className={`max-w-[725px] font-[400] text-[36px] ${styles.fontmontserrat} ${s7.title}`}>
                            <span className="font-[700]">Innovating</span> for Tomorrow with
                            <span className="font-[700]"> Creativity</span> and <span className="font-[700]">Technology</span>
                        </h3>
                    </div>

                    {/* Cards — column below md; row from md up */}
                    <div
                        className={`flex w-full min-w-0 max-w-full flex-col items-center gap-4 md:flex-row md:flex-nowrap md:items-stretch md:justify-between md:gap-4 ${s7.row}`}
                    >
                        <div
                            className={`flex w-full max-w-full min-h-0 flex-col items-center justify-between gap-4 rounded-[5px] border border-[#D7D7D7] p-4 text-center md:h-[456px] md:w-[392px] md:max-w-none md:flex-none md:items-start md:gap-0 md:p-10 md:text-left ${s7.card} ${s7.cardPad}`}
                        >
                            <p className={`font-[400] text-[16px] ${styles.fontpoppins} ${s7.body}`}>
                                Where visuals driving tangible actions are a daily reality, we deliver meaningful results through foresight and
                                innovation. Believing that everything can be achieved via never-ending evolution.
                            </p>

                            <div className={`flex w-full flex-col items-center gap-3 md:items-start ${s7.iconStack}`}>
                                <img
                                    src="/new-about-imgs/s7/bulb.png"
                                    alt="Our vision — innovation and creative thinking at Ritz Media World"
                                    title="Our Vision – Ritz Media World"
                                    className={`h-auto w-[82px] max-w-full ${s7.bulb}`}
                                />
                                <p className={`font-[500] text-[36px] ${styles.fontmontserrat} ${s7.visionTitle}`}>Our Vision</p>
                            </div>
                        </div>

                        <div
                            className={`flex w-full max-w-full min-h-0 items-center justify-center overflow-hidden rounded-[5px] md:h-[456px] md:w-[392px] md:max-w-none md:flex-none ${s7.card} ${s7.cardMedia}`}
                        >
                            <img
                                src="/new-about-imgs/s7/brain.jpg"
                                alt="Ritz Media World team — creativity and technology in advertising"
                                title="Innovating with creativity and technology – Ritz Media World"
                                className="aspect-[392/456] min-h-[180px] w-full object-cover object-center md:aspect-auto md:h-full md:min-h-0"
                            />
                        </div>

                        <div
                            className={`flex w-full max-w-full min-h-0 flex-col items-center justify-between gap-4 rounded-[5px] bg-[#0F1640] p-4 text-center md:h-[456px] md:w-[392px] md:max-w-none md:flex-none md:items-start md:gap-0 md:p-10 md:text-left ${s7.card} ${s7.cardPad}`}
                        >
                            <p
                                className={`max-w-full font-[400] text-[16px] text-white md:max-w-[307px] ${styles.fontpoppins} ${s7.body} ${s7.bodyNarrow}`}
                            >
                                Every strategy we put together unlocks fresh opportunities. As a forward thinker, our aim is to create the future
                                today. Every project we deliver leaves a mark and has real impact and consequence.
                            </p>

                            <div className={`flex w-full flex-col items-center gap-3 md:items-start ${s7.iconStack}`}>
                                <img
                                    src="/new-about-imgs/s7/arrow.png"
                                    alt="Crafting strategies that shape the future — Ritz Media World"
                                    title="Crafting Strategies – Ritz Media World"
                                    className={`h-auto w-[98px] max-w-full ${s7.arrow}`}
                                />
                                <p className={`font-[500] text-[21px] text-white ${styles.fontmontserrat} ${s7.mission}`}>
                                    Crafting Strategies, Shaping the Future, & Driving Impact
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section7;