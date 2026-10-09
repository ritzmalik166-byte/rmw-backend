import styles from "./page.module.css";
import s4 from "./Section4.module.css";

function Section4() {
    return (
        <section className={`w-full py-[40px] xl:py-[70px] border-t border-b border-[#D9D9D9] ${s4.root}`}>
            <div className={`w-full flex flex-col gap-8 justify-center items-center ${styles.containerWidth} ${s4.container}`}>
                <div className="flex w-full flex-col items-center justify-center text-center">
                    <h2 className={`font-[600] text-[16px] uppercase text-[#C99237] ${styles.fontpoppins} ${s4.eyebrow}`}>Proven Results</h2>
                    <h3 className={`font-[700] mb-4 text-[36px] ${styles.fontmontserrat} ${s4.headline}`}>Our Work is Our <span className="text-[#C99237]">Reward</span></h3>
                    <p className={`mx-auto max-w-[769px] text-center font-[400] text-[16px] ${styles.fontpoppins} ${s4.intro}`}>We take pride in challenges that agencies tend to avoid. It is what drives us to do things never done before. That is what brings us our recognition and some awards along the way.</p>
                </div>

                <div
                    className={`grid w-full grid-cols-1 gap-4 justify-items-stretch md:flex md:flex-nowrap md:justify-center md:gap-0 ${s4.statsRow}`}
                >
                    <div
                        className={`ml-0 flex w-full max-w-full shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-[#EBEBEB] px-5 py-6 md:h-[272px] md:w-[272px] md:rounded-full md:px-0 md:py-0 md:ml-[-20px] ${s4.circle} ${s4.circleOverlap}`}
                    >
                        <div className="relative mx-auto w-fit">
                            <p className={`font-[600] text-[50px]  ${styles.fontmontserrat} ${s4.statNum}`}>350</p>
                            <p className={`font-[500] text-[40px] absolute -top-2 -right-5 ${styles.fontmontserrat} ${s4.statPlus} ${s4.plusTop} ${s4.plusR5}`}>+</p>
                        </div>
                        <p className={`text-center font-[600] text-[18px] ${styles.fontmontserrat} ${s4.statLabel}`}>Satisfied Clients</p>
                        <p className={`max-w-none font-[400] text-[15px] text-center md:max-w-[178px] ${styles.fontopensans} ${s4.statSub}`}>Brands we've helped grow and succeed</p>
                    </div>
                    <div
                        className={`ml-0 flex w-full max-w-full shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-[#EBEBEB] px-5 py-6 md:h-[272px] md:w-[272px] md:rounded-full md:px-0 md:py-0 md:ml-[-20px] ${s4.circle} ${s4.circleOverlap}`}
                    >
                        <div className="relative mx-auto w-fit">
                            <p className={`font-[600] text-[50px]  ${styles.fontmontserrat} ${s4.statNum}`}>35</p>
                            <p className={`font-[500] text-[40px] absolute -top-2 -right-6 ${styles.fontmontserrat} ${s4.statPlus} ${s4.plusTop} ${s4.plusR6}`}>+</p>
                        </div>
                        <p className={`text-center font-[600] text-[18px] ${styles.fontmontserrat} ${s4.statLabel}`}>Awards</p>
                        <p className={`max-w-none font-[400] text-[15px] text-center md:max-w-[178px] ${styles.fontopensans} ${s4.statSub}`}>Passion, Obsession, and Persistence always pay off</p>
                    </div>
                    <div
                        className={`ml-0 flex w-full max-w-full shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-[#EBEBEB] px-5 py-6 md:h-[272px] md:w-[272px] md:rounded-full md:px-0 md:py-0 md:ml-[-20px] ${s4.circle} ${s4.circleOverlap}`}
                    >
                        <div className="relative mx-auto w-fit">
                            <p className={`font-[600] text-[50px]  ${styles.fontmontserrat} ${s4.statNum}`}>40</p>
                            <p className={`font-[500] text-[40px] absolute -top-2 -right-6 ${styles.fontmontserrat} ${s4.statPlus} ${s4.plusTop} ${s4.plusR6}`}>+</p>
                        </div>
                        <p className={`text-center font-[600] text-[18px] ${styles.fontmontserrat} ${s4.statLabel}`}>Service Categories</p>
                        <p className={`max-w-none font-[400] text-[15px] text-center md:max-w-[178px] ${styles.fontopensans} ${s4.statSub}`}>Designed to suit your growth needs at every stage</p>
                    </div>
                    <div
                        className={`ml-0 flex w-full max-w-full shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-[#EBEBEB] px-5 py-6 md:h-[272px] md:w-[272px] md:rounded-full md:px-0 md:py-0 md:ml-[-20px] ${s4.circle}`}
                    >
                        <div className="relative mx-auto w-fit">
                            <p className={`font-[600] text-[50px]  ${styles.fontmontserrat} ${s4.statNum}`}>17</p>
                            <p className={`font-[500] text-[40px] absolute -top-2 -right-6 ${styles.fontmontserrat} ${s4.statPlus} ${s4.plusTop} ${s4.plusR6}`}>+</p>
                        </div>
                        <p className={`text-center font-[600] text-[18px] ${styles.fontmontserrat} ${s4.statLabel}`}>Glorious Years</p>
                        <p className={`max-w-none font-[400] text-[15px] text-center md:max-w-[178px] ${styles.fontopensans} ${s4.statSub}`}>grueling hours that have led to remarkable branding success</p>
                    </div>
                </div>

                <div className={`mx-auto max-w-[631px] text-center ${s4.footerWrap}`}>
                    <p className={`font-[400] text-[16px] ${styles.fontpoppins} ${s4.footerText}`}>Our Mad Men are obsessed with building stories. Like a moth to a flame, they're just obsessed with any branding problem that may need a solution.</p>
                </div>
            </div>
        </section>
    )
}


export default Section4;