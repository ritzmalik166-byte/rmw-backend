import styles from "./page.module.css";

function Banner({ title }: { title: string }) {
    return (
        <section className="w-full min-h-[280px] sm:min-h-[320px] md:min-h-[379px] relative bg-[#0F1640] flex justify-center items-end pb-6 sm:pb-12 px-4 sm:px-6">
            <div className="absolute left-0 bottom-0 w-full h-full z-0 flex items-end pointer-events-none">
                <img src="/blogs2/s1-layer.png" alt="Ritz Media World – tags banner" title="Ritz Media World" className="w-full h-auto object-cover object-bottom" />
            </div>

            {/* Page Heading And Info  */}
            <div className="w-full flex flex-col justify-center items-center text-center z-10 gap-3 sm:gap-4 max-w-[1280px]">
                <h1 className={`font-[800] text-[32px] sm:text-[40px]  text-white leading-tight ${styles.fontmontserrat}`}>
                    {title || "Tags"}
                </h1>
            </div>
        </section>
    )
}


export default Banner;