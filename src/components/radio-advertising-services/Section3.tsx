
import styles from "./page.module.css";

function Section3() {
    return (
        <section className="w-full flex justify-center  lg:pt-[30px]">
            {/* Center align: stacked below xl, 3-column row at xl+ */}
            <div
                className={`w-full flex flex-col lg:flex-row justify-center items-center lg:items-end xl:items-stretch gap-6 sm:gap-8 xl:gap-0 ${styles.containerWidth}`}
            >
                {/* Col 1 – left image: narrow on mobile, fixed 222px at xl */}
                <div className="w-full max-w-[200px] sm:max-w-[20%] xl:w-[222px] xl:max-w-[222px] xl:flex-shrink-0 flex flex-col justify-end items-center pb-4 sm:pb-6 xl:pb-8">
                    <img
                        src="/alishba-services-v3/radio-advertising/s3-i2.png"
                        alt="Ritz Media World – radio advertising"
                        title="Ritz Media World – radio advertising"
                        className="w-full h-auto object-cover"
                    />

                </div>

                {/* Col 2 – main image + floating text box */}
                <div className="w-full mt-6 md:mt-0 md:w-[80%] xl:w-[798px] xl:flex-shrink-0 relative px-0">
                    {/* Floating box: full-width on small screens, max 450px at xl */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-full md:w-[calc(100%-2rem)] min-w-0 md:max-w-[450px]  -top-10 py-3 px-3 sm:py-4 sm:px-8 bg-[#F7F7F7] rounded-[4px]">
                        <div className="w-full min-h-0 shrink-0">
                            <p className={`font-[500] text-[13px] md:text-[16px] xl:text-[18px] text-center ${styles.fontmontserrat
                                }`}>
                                We strategically <span className="font-[700]">place your brand</span> across leading{" "}
                                <span className="font-[700]">FM stations</span> to build maximum audience engagement and visibility.
                            </p>
                        </div>
                    </div>
                    <img
                        src="/alishba-services-v3/radio-advertising/s3-i1.png"
                        alt="Ritz Media World – FM radio brand placement"
                        title="Ritz Media World – FM radio brand placement"
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Col 3 – CTA button */}
                <div className="flex justify-center   lg:justify-center items-end w-[10%] lg:w-auto pb-4 sm:pb-6 xl:pb-8">
                    <a
                    href='/contact.html' target='_blank'
                        type="a"
                        className="flex justify-center items-center gap-2 text-black px-4 py-2 rounded-[5px] cursor-pointer hover:opacity-90 transition-opacity min-w-[200px] "
                    >
                        <p className={`font-[500] text-[16px] sm:text-[18px] whitespace-nowrap ${styles.fontmontserrat}`}>Let's Talk Today</p>
                        <div className="w-[40px] h-[40px] bg-[#C99237] hover:bg-[#0F1640] rounded-full flex-shrink-0 flex justify-center items-center">
                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.4276 2.92383L17.1346 9.08052L12.9493 4.01635L19.4276 2.92383Z" fill="white" />
                                <rect x="2.19678" y="16.7172" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19678 16.7172)" fill="white" />
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Section3;
