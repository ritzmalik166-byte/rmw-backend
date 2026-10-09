import Image from "next/image";
import styles from "./page.module.css";

function Section4() {
    return (
        <section className="hidden lg:block w-full h-[320px] sm:h-[400px] md:h-[383px] lg:h-[523px] xl:h-[640px] relative overflow-hidden">
            {/* Top row – two text blocks */}
            <div className="w-full absolute top-0 left-0 z-10 px-3 sm:px-4 xl:px-0">
                <p
                    className={`absolute top-3 sm:top-6 xl:top-10 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 xl:left-auto xl:translate-x-0 sm:right-[14%] xl:right-[17%] max-w-[260px] sm:max-w-[220px] xl:max-w-none xl:w-[230px] font-[400] text-white text-[11px] sm:text-[12px] xl:text-[14px] text-center ${styles.fontopensans}`}
                >
                    FM Advertising, in fact amongst many other mediums usually brings the lowest cost per reach.
                </p>
                <p
                    className={`absolute top-14 lg:top-20 xl:top-24 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 xl:left-auto xl:translate-x-0 right-[5%] sm:right-[38%] xl:right-[40%] max-w-[280px] sm:max-w-[240px] xl:max-w-none xl:w-[230px] font-[400] text-white text-[11px] sm:text-[12px] xl:text-[14px] text-center ${styles.fontopensans}`}
                >
                    Radio reaches the same listener repeatedly; studies show four to five ad exposures build consideration and drive action, FM effective.
                </p>
            </div>

            {/* Bottom row – two text blocks */}
            <div className="w-full absolute bottom-0 left-0 z-10 px-3 sm:px-4 xl:px-0">
                <p
                    className={`absolute bottom-3 sm:bottom-2 xl:bottom-10 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 xl:left-auto xl:translate-x-0 sm:right-[6%] xl:right-[8%] max-w-[260px] sm:max-w-[200px] xl:max-w-none xl:w-[200px] font-[400] text-white text-[11px] sm:text-[12px] xl:text-[14px] text-center ${styles.fontopensans}`}
                >
                    You can also run multiple jungles in one campaign to keep the message exciting.
                </p>
                <p
                    className={`absolute bottom-14 sm:bottom-2 lg:bottom-8 left-1/2 -translate-x-1/2 xl:left-auto xl:right-[50%] xl:translate-x-0 max-w-[280px] sm:max-w-[240px] xl:max-w-none xl:w-[230px] font-[400] text-white text-[11px] sm:text-[12px] xl:text-[14px] text-center ${styles.fontopensans}`}
                >
                    FM advertising lets brands target one city, like Delhi, by choosing stations covering specific areas, such as Radio Mirchi effectively.
                </p>
            </div>

            <Image src="/alishba-services-v3/radio-advertising/s4-banner2.jpg" alt="Radio Advertising" title="Radio Advertising" fill className="object-cover" />
        </section>
    );
}

export default Section4;
