import styles from "../../sections/page.module.css";

function Banner({ title }: { title: string }) {
    return (
        <section className="w-full min-h-[280px] sm:min-h-[320px] xl:min-h-[379px] relative bg-[#0F1640] flex justify-center items-end pb-12 xl:pb-12 px-4 sm:px-6">
            <div className="absolute left-0 bottom-0 w-full h-full z-0 flex items-end pointer-events-none">
                <img src="/blogs2/s1-layer.png" alt="Ritz Media World – article banner" title="Ritz Media World" className="w-full h-auto object-cover object-bottom" />
            </div>

            {/* Page Heading And Info  */}
            <div className="w-full flex flex-col justify-center items-center text-center z-10 gap-3 sm:gap-4 max-w-[1300px]">
                <h1 className={`font-[600] lg:font-[700] text-[21px] md:text-[30px] xl:text-[40px]  text-white ${styles.fontmontserrat}`}>
                    {title || "Blogs"}
                </h1>
            </div>
        </section>
    )
}


export default Banner;