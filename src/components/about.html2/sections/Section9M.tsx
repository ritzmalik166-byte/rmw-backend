import styles from "./page.module.css";
import s9 from "./Section9.module.css";
import m from "./Section9M.module.css";

function Section9M() {
    return (
        <section className={`flex w-full justify-center pt-[40px] xl:pt-[70px] ${s9.root} ${m.mRoot}`}>
            <div className={`w-full ${styles.containerWidth} ${s9.container}`}>
                <div className={m.stack}>
                    {/* 1 — Headings (same copy as Section9 top card) */}
                    <div
                        className={`flex w-full max-w-full flex-col items-center justify-center gap-4 rounded-[5px] border border-[#D7D7D7] px-5 py-8 text-center ${s9.topCard}`}
                    >
                        <p className={`font-[700] text-[36px] ${styles.fontmontserrat} ${s9.heading} ${m.headingTight}`}>Why Choose Us</p>
                        <p className={`font-[400] text-[22px] ${styles.fontpoppins} ${s9.subheading} ${m.subTight}`}>
                            17+ Years Of Storytelling Driving Brand Growth & Recognition.
                        </p>
                        <p className={`max-w-[840px] font-[400] text-[16px] ${styles.fontpoppins} ${s9.desc} ${m.descTight}`}>
                            We&apos;ve been helping brands turn ideas into impactful campaigns through our creative strategies and data-driven
                            marketing, allowing them to stand out against its competition and be a household name.
                        </p>
                    </div>

                    {/* 2 — Image + badge (badge below image, centered) */}
                    <div className={m.mediaBlock}>
                        <img
                            src="/new-about-imgs/s9/team2.jpg"
                            alt="Ritz Media World team — 17+ years of brand storytelling"
                            title="Why choose Ritz Media World"
                            className={m.heroImg}
                        />
                        <div className={`bg-white px-5 py-6 text-center shadow-sm ${s9.badge} ${m.badgeBelow}`}>
                            <p className={`font-[600] text-[18px] ${styles.fontmontserrat} ${s9.badgeText} ${m.badgeTight}`}>
                                Years of Storytelling, Turning Ideas Into Stories That Matter
                            </p>
                        </div>
                    </div>

                    {/* 3 — Metrics strip (same as Section9 left column) */}
                    <div className={`flex w-full flex-col items-center justify-center gap-6 bg-[#0F1640] py-8 ${s9.leftCol} ${m.metrics}`}>
                        <div className={`flex max-w-[206px] flex-col items-center justify-center gap-2 text-center ${s9.metric206}`}>
                            <p className={`font-[700] text-[32px] text-white ${styles.fontmontserrat} ${s9.metricNum} ${m.metricNumM}`}>350+</p>
                            <p className={`font-[400] text-[16px] text-white ${styles.fontopensans} ${s9.metricText} ${m.metricTextM}`}>
                                very satisfied clients worldwide.
                            </p>
                        </div>

                        <div className={`flex max-w-[236px] flex-col items-center justify-center gap-2 text-center ${s9.metric236}`}>
                            <p className={`font-[700] text-[32px] text-white ${styles.fontmontserrat} ${s9.metricNum} ${m.metricNumM}`}>200+</p>
                            <p className={`font-[400] text-[16px] text-white ${styles.fontopensans} ${s9.metricText} ${m.metricTextM}`}>
                                 award winning digital media agency.
                            </p>
                        </div>

                        <div className={`flex max-w-[236px] flex-col items-center justify-center gap-2 text-center ${s9.metric236}`}>
                            <p className={`font-[700] text-[32px] text-white ${styles.fontmontserrat} ${s9.metricNum} ${m.metricNumM}`}>300+</p>
                            <p className={`font-[400] text-[16px] text-white ${styles.fontopensans} ${s9.metricText} ${m.metricTextM}`}>
                                Successful projects completed in one year..
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Section9M;
