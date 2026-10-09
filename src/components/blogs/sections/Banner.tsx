import styles from "./page.module.css";

const BANNER_ALT = "Ritz Media World – blogs banner";
const MOB_BANNER = "/blogs2/s1-layer-mob.webp";
const DESK_BANNER = "/blogs2/s1-layer-desk.webp";

function Banner() {
    return (
        <section className="w-full min-h-[280px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-[409px] relative bg-[#0F1640] flex justify-center items-end pb-6 sm:pb-8 px-4 sm:px-6">
            <div className="absolute left-0 bottom-0 w-full h-full z-0 flex items-end pointer-events-none">
                <picture className="block h-full w-full">
                    <source media="(max-width: 767px)" srcSet={MOB_BANNER} type="image/webp" />
                    <source media="(min-width: 768px)" srcSet={DESK_BANNER} type="image/webp" />
                    <img
                        src={MOB_BANNER}
                        alt={BANNER_ALT}
                        title="Ritz Media World"
                        width={828}
                        height={183}
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                        className="h-full w-full object-cover object-bottom"
                    />
                </picture>
            </div>

            <div className="w-full flex flex-col justify-center items-center text-center z-10 gap-3 sm:gap-4 max-w-[1280px]">
                <h1 className="hidden">Blogs</h1>
                <p className={`font-[800] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[55px] text-white  ${styles.fontmontserrat}`}>
                    Blogs
                </p>
                <p className={`font-[500] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[21px] text-white max-w-[700px] ${styles.fontmontserrat}`}>
                    Stay updated with the latest trends, innovations, and in-depth articles to keep you ahead in the digital world.
                </p>
            </div>
        </section>
    )
}


export default Banner;
