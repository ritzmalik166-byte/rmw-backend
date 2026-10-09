import styles from "./page.module.css";
import s5 from "./Section5.module.css";

function Section5() {
    return (
        <section className={`w-full py-[40px] xl:py-[70px] flex justify-center items-center ${s5.root}`}>
            <div className={`w-full ${styles.containerWidth} ${s5.container}`}>
                <div className={`w-full relative flex justify-between items-end gap-3 ${s5.row}`}>

                    <div className={`w-full max-w-[558px] h-auto absolute inset-0 flex flex-col gap-4 ${s5.overlay}`}>
                        <div className="flex flex-col ">
                            <h2 className={`font-[600] text-[16px] text-[#C99237] uppercase ${styles.fontpoppins} ${s5.eyebrow}`}>Our Journey</h2>
                            <h3 className={`font-[700] text-[36px] mb-1 ${styles.fontmontserrat} ${s5.heading}`}>17 Years of Brand Excellence</h3>
                        </div>
                        <p className={`font-[400] text-[16px] ${styles.fontpoppins} ${s5.copy}`}>From pioneering print innovations to 360° Digital Marketing , our journey reflects our commitment to excellence.</p>
                    </div>

                    <div className={`flex flex-col gap-2 w-[234px] ${s5.card}`}>
                        <div className={`flex flex-row items-end justify-between gap-2 ${s5.cardTop}`}>
                            <p className={`m-0 font-[700] text-[30px] leading-none ${styles.fontmontserrat} ${s5.year}`}>2008</p>
                            <p className={`m-0 font-[400] text-[18px] leading-tight ${styles.fontopensans} ${s5.label}`}>Foundation</p>
                        </div>
                        <div className="w-full h-auto">
                            <img src="/new-about-imgs/s4/abt-s4-img1.jpg" alt="2008 — Ritz Media World foundation milestone" title="2008 — Foundation" className="w-full h-auto object-cover" />
                        </div>
                    </div>

                    <div className={`flex flex-col gap-2 w-[234px] ${s5.card}`}>
                        <div className={`flex flex-row items-end justify-between gap-2 ${s5.cardTop}`}>
                            <p className={`m-0 font-[700] text-[30px] leading-none ${styles.fontmontserrat} ${s5.year}`}>2012</p>
                            <p className={`m-0 font-[400] text-[18px] text-end leading-normal ${styles.fontopensans} ${s5.label}`}>Innovation <br />
                                Leadership</p>
                        </div>
                        <div className="w-full h-auto">
                            <img src="/new-about-imgs/s4/abt-s4-img2.jpg" alt="2012 — Innovation leadership at Ritz Media World" title="2012 — Innovation Leadership" className="w-full h-auto object-cover" />
                        </div>
                    </div>

                    <div className={`flex flex-col gap-2 w-[234px] ${s5.card}`}>
                        <div className={`flex flex-row items-end justify-between gap-2 ${s5.cardTop}`}>
                            <p className={`m-0 font-[700] text-[30px] leading-none ${styles.fontmontserrat} ${s5.year}`}>2016</p>
                            <p className={`m-0 font-[400] text-[18px] text-end leading-normal ${s5.label}`}>Digital <br />
                                Expansion</p>
                        </div>
                        <div className="w-full h-auto">
                            <img src="/new-about-imgs/s4/abt-s4-img3.jpg" alt="2016 — Digital expansion at Ritz Media World" title="2016 — Digital Expansion" className="w-full h-auto object-cover" />
                        </div>
                    </div>

                    <div className={`flex flex-col gap-2 w-[234px] ${s5.card}`}>
                        <div className={`flex flex-row items-end justify-between gap-2 ${s5.cardTop}`}>
                            <p className={`m-0 font-[700] text-[30px] leading-none ${styles.fontmontserrat} ${s5.year}`}>2020</p>
                            <p className={`m-0 font-[400] text-[18px] text-end leading-normal ${styles.fontopensans} ${s5.label}`}>Premium <br />
                                Positioning</p>
                        </div>
                        <div className="w-full h-auto">
                            <img src="/new-about-imgs/s4/abt-s4-img4.jpg" alt="2020 — Premium positioning at Ritz Media World" title="2020 — Premium Positioning" className="w-full h-auto object-cover" />
                        </div>
                    </div>

                    <div className={`flex flex-col gap-2 w-[234px] ${s5.card}`}>
                        <div className={`flex flex-row items-end justify-between gap-2 ${s5.cardTop}`}>
                            <p className={`m-0 font-[700] text-[30px] leading-none ${styles.fontmontserrat} ${s5.year}`}>2026</p>
                            <p className={`m-0 font-[400] text-[18px] text-end leading-normal ${styles.fontopensans} ${s5.label}`}>AI-Powered 3D Rendering at 5X</p>
                        </div>
                        <div className="w-full h-auto">
                            <img src="/new-about-imgs/s4/abt-s4-img5.jpg" alt="2026 — Ritz Media World today" title="2026 — AI-Powered 3D Rendering at 5X" className="w-full h-auto object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section5;
