import styles from "./page.module.css";

function Banner({slug}: {slug: string}) {
    return (
        <section className="w-full min-h-[280px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-[409px] relative bg-[#0F1640] flex justify-center items-end pb-6 sm:pb-8 px-4 sm:px-6">
            <div className="absolute left-0 bottom-0 w-full h-full z-0 flex items-end pointer-events-none">
                <img src="/blogs2/s1-layer.png" alt="Ritz Media World – categories banner" title="Ritz Media World" className="w-full h-auto object-cover object-bottom" />
            </div>

            {/* Page Heading And Info  */}
            <div className="w-full flex flex-col justify-center items-center text-center z-10 gap-3 sm:gap-4 max-w-[1280px]">
                <h1 className={`font-[800] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[55px] text-white leading-tight ${styles.fontmontserrat}`}>
                    {(slug
                        ? slug
                            .split("-")
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")
                        : "Categories")}
                </h1>
            </div>
        </section>
    )
}


export default Banner;