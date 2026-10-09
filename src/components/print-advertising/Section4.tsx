import styles from "./page.module.css";

const COL2_TILES = [
    { img: "/service-v3/print-advertising/s4/Business.jpg", label: "Business", textCls: "text-black" },
    { img: "/service-v3/print-advertising/s4/Recruitment.jpg", label: "Recruitment", textCls: "text-white" },
    { img: "/service-v3/print-advertising/s4/Travel.jpg", label: "Travel", textCls: "text-black" },
    { img: "/service-v3/print-advertising/s4/ToRent.jpg", label: "To Rent", textCls: "text-white" },
    { img: "/service-v3/print-advertising/s4/Property.jpg", label: "Property", textCls: "text-black" },
    { img: "/service-v3/print-advertising/s4/Vehicles.jpg", label: "Vehicles", textCls: "text-white" },
];
const COL4_TILES = [
    { img: "/service-v3/print-advertising/s4/Retail.jpg", label: "Retail", textCls: "text-white" },
    { img: "/service-v3/print-advertising/s4/Commercial.jpg", label: "Commercial", textCls: "text-white" },
    { img: "/service-v3/print-advertising/s4/Personal.jpg", label: "Personal", textCls: "text-white" },
    { img: "/service-v3/print-advertising/s4/Services.jpg", label: "Services", textCls: "text-black" },
    { img: "/service-v3/print-advertising/s4/Residential.jpg", label: "Residential", textCls: "text-white" },
    { img: "/service-v3/print-advertising/s4/Tenders.jpg", label: "Tenders", textCls: "text-black" },
];

function Section4() {
    const labelClass = `${styles.fontmontserrat} absolute bottom-2 left-1/2 -translate-x-1/2 font-[600] text-[12px] sm:text-[14px] lg:text-[15px] xl:text-[16px]`;
    const labelClassMobile = `${styles.fontmontserrat} absolute bottom-2 left-1/2 -translate-x-1/2 font-[600] text-[12px] sm:text-[14px]`;

    return (
        <section className="w-full justify-center items-center py-8 sm:py-12 md:py-14 xl:py-[70px] border-b border-[#E5E5E5]">

            {/* ——— BELOW LG: Simple square grid + center card (full width) ——— */}
            <div className={`lg:hidden w-full flex flex-col gap-4 sm:gap-5 ${styles.containerWidth}`}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 w-full">
                    {COL2_TILES.map((t) => (
                        <div key={t.label} className="w-full aspect-square rounded-[10px] relative overflow-hidden">
                            <img src={t.img} alt={`Ritz Media World – ${t.label} print advertising`} title="Ritz Media World" className="w-full h-full object-cover" />
                            <p className={`${labelClassMobile} ${t.textCls}`}>{t.label}</p>
                        </div>
                    ))}
                </div>
                <div className="w-full min-h-[320px] hidden sm:min-h-[400px] rounded-[10px] relative flex-shrink-0">
                    <img src="/service-v3/print-advertising/s4/news-paper-frame.jpg" alt="Ritz Media World – book newspaper ads online" title="Ritz Media World" className="w-full h-full object-cover rounded-[10px] min-h-[320px] sm:min-h-[400px] object-center" />
                    <div className="absolute inset-0 z-10 flex flex-col justify-center items-center px-3 pt-4 gap-2 sm:gap-3 text-center">
                        <h3 className={`font-[700] text-[18px] sm:text-[22px] md:text-[26px] text-black ${styles.fontmontserrat}`}>Book Newspaper Ads Online at Lowest Rates</h3>
                        <button className="w-[110px] h-[32px] sm:w-[127px] sm:h-[36px] text-white font-[700] text-[13px] sm:text-[15px] bg-[#0F1640] rounded-[5px] cursor-pointer">Start Now</button>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 w-full">
                    {COL4_TILES.map((t) => (
                        <div key={t.label} className="w-full aspect-square rounded-[10px] relative overflow-hidden">
                            <img src={t.img} alt={`Ritz Media World – ${t.label} print advertising`} title="Ritz Media World" className="w-full h-full object-cover" />
                            <p className={`${labelClassMobile} ${t.textCls}`}>{t.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ——— LG AND ABOVE: Original 5-column layout ——— */}
            <div className={`hidden lg:flex w-full flex-col lg:flex-row justify-center gap-4 lg:gap-2 xl:gap-3 ${styles.containerWidth} overflow-x-hidden`}>
                {/* Col 1  */}
                <div className="hidden xl:block lg:mt-[8rem]  xl:mt-[12.5rem]">
                    <div className="w-[50px] h-[50px] rounded-[10px] bg-[#D59F474D]"></div>
                </div>

                {/* Col 2  */}
                <div className="flex gap-2 sm:gap-3 w-full max-w-[400px] lg:max-w-none justify-center lg:justify-end xl:justify-start">
                    {/* Left Side Container  */}
                    <div className="flex flex-col gap-2 sm:gap-3  min-w-0 max-w-[189px] lg:max-w-none">
                        <div className="w-full aspect-[189/205] lg:w-[160px] lg:h-[174px] xl:w-[189px] xl:h-[205px] lg:aspect-auto rounded-[10px] relative overflow-hidden">
                            <img src="/service-v3/print-advertising/s4/Business.jpg" alt="Ritz Media World – print advertising" title="Ritz Media World" className="w-full h-full object-cover" />
                            <p className={`${labelClass} text-black`}>Business</p>
                        </div>

                        <div className="w-full aspect-[189/126] lg:w-[160px] lg:h-[107px] xl:w-[189px] xl:h-[126px] lg:aspect-auto rounded-[10px] relative overflow-hidden">
                            <img src="/service-v3/print-advertising/s4/Recruitment.jpg" alt="Ritz Media World – print advertising" title="Ritz Media World" className="w-full h-full object-cover" />
                            <p className={`${labelClass} text-white`}>Recruitment</p>
                        </div>

                        <div className="w-full aspect-[189/126] lg:w-[160px] lg:h-[107px] xl:w-[189px] xl:h-[126px] lg:aspect-auto rounded-[10px] relative overflow-hidden">
                            <img src="/service-v3/print-advertising/s4/Travel.jpg" alt="Ritz Media World – print advertising" title="Ritz Media World" className="w-full h-full object-cover" />
                            <p className={`${labelClass} text-black`}>Travel</p>
                        </div>
                    </div>

                    {/* Right Side Container  */}
                    <div className="flex flex-col gap-2 sm:gap-3  min-w-0 max-w-[189px] lg:max-w-none">
                        <div className="w-full aspect-[189/127] lg:w-[160px] lg:h-[108px] xl:w-[189px] xl:h-[127px] lg:aspect-auto rounded-[10px] relative overflow-hidden">
                            <img src="/service-v3/print-advertising/s4/ToRent.jpg" alt="Ritz Media World – print advertising" title="Ritz Media World" className="w-full h-full object-cover" />
                            <p className={`${labelClass} text-white`}>To Rent</p>
                        </div>

                        <div className="w-full aspect-[189/205] lg:w-[160px] lg:h-[174px] xl:w-[189px] xl:h-[205px] lg:aspect-auto rounded-[10px] relative overflow-hidden">
                            <img src="/service-v3/print-advertising/s4/Property.jpg" alt="Ritz Media World – print advertising" title="Ritz Media World" className="w-full h-full object-cover" />
                            <p className={`${labelClass} text-black`}>Property</p>
                        </div>

                        <div className="w-full aspect-[109/112] lg:w-[92px] lg:h-[95px] xl:w-[109px] xl:h-[112px] lg:aspect-auto rounded-[10px] relative overflow-hidden max-w-[109px] lg:max-w-none">
                            <img src="/service-v3/print-advertising/s4/Vehicles.jpg" alt="Ritz Media World – print advertising" title="Ritz Media World" className="w-full h-full object-cover" />
                            <p className={`${labelClass} text-white`}>Vehicles</p>
                        </div>
                    </div>
                </div>

                {/* Col 3  */}
                <div className="w-full max-w-[317px] lg:w-[269px] lg:h-[429px] xl:w-[317px] xl:h-[505px] h-auto min-h-[320px] sm:min-h-[400px] lg:min-h-0 xl:min-h-0 rounded-[10px] relative flex-shrink-0">
                    <img src="/service-v3/print-advertising/s4/news-paper-frame.jpg" alt="Ritz Media World – book newspaper ads online" title="Ritz Media World" className="w-full h-full rounded-[10px]" />

                    <div className="absolute text-center top-0 left-0 z-10 w-full flex justify-center items-center px-3 pt-4 flex-col gap-2 sm:gap-3">
                        <h3 className={`font-[700] text-[18px] sm:text-[22px] md:text-[26px] lg:text-[27px] xl:text-[30px] text-black ${styles.fontmontserrat}`}>Book Newspaper Ads Online at Lowest Rates</h3>
                        <button className="w-[110px] h-[32px] sm:w-[127px] sm:h-[36px] text-white font-[700] text-[13px] sm:text-[15px] bg-[#0F1640] rounded-[5px] cursor-pointer">Start Now</button>
                    </div>
                </div>

                {/* Col 4  */}
                <div className="flex gap-2 sm:gap-3 w-full max-w-[400px] lg:max-w-none justify-center lg:justify-start">
                    {/* Left Side Container  */}
                    <div className="flex flex-col gap-2 sm:gap-3  min-w-0 max-w-[190px] lg:max-w-none">
                        <div className="w-full aspect-[190/205] lg:w-[161px] lg:h-[174px] xl:w-[190px] xl:h-[205px] lg:aspect-auto rounded-[10px] relative overflow-hidden">
                            <img src="/service-v3/print-advertising/s4/Retail.jpg" alt="Ritz Media World – print advertising" title="Ritz Media World" className="w-full h-full object-cover" />
                            <p className={`${labelClass} text-white`}>Retail</p>
                        </div>

                        <div className="w-full aspect-[190/126] lg:w-[161px] lg:h-[107px] xl:w-[190px] xl:h-[126px] lg:aspect-auto rounded-[10px] relative overflow-hidden">
                            <img src="/service-v3/print-advertising/s4/Commercial.jpg" alt="Ritz Media World – print advertising" title="Ritz Media World" className="w-full h-full object-cover" />
                            <p className={`${labelClass} text-white`}>Commercial</p>
                        </div>

                        <div className="w-full aspect-[190/126] lg:w-[161px] lg:h-[107px] xl:w-[190px] xl:h-[126px] lg:aspect-auto rounded-[10px] relative overflow-hidden">
                            <img src="/service-v3/print-advertising/s4/Personal.jpg" alt="Ritz Media World – print advertising" title="Ritz Media World" className="w-full h-full object-cover" />
                            <p className={`${labelClass} text-white`}>Personal</p>
                        </div>
                    </div>

                    {/* Right Side Container  */}
                    <div className="flex flex-col gap-2 sm:gap-3  min-w-0 max-w-[190px] lg:max-w-none">
                        <div className="w-full aspect-[190/127] lg:w-[161px] lg:h-[108px] xl:w-[190px] xl:h-[127px] lg:aspect-auto rounded-[10px] relative overflow-hidden">
                            <img src="/service-v3/print-advertising/s4/Services.jpg" alt="Ritz Media World – print advertising" title="Ritz Media World" className="w-full h-full object-cover" />
                            <p className={`${labelClass} text-black`}>Services</p>
                        </div>

                        <div className="w-full aspect-[190/205] lg:w-[161px] lg:h-[174px] xl:w-[190px] xl:h-[205px] lg:aspect-auto rounded-[10px] relative overflow-hidden">
                            <img src="/service-v3/print-advertising/s4/Residential.jpg" alt="Ritz Media World – print advertising" title="Ritz Media World" className="w-full h-full object-cover" />
                            <p className={`${labelClass} text-white`}>Residential</p>
                        </div>

                        <div className="w-full aspect-[109/112] lg:w-[92px] lg:h-[95px] xl:w-[109px] xl:h-[112px] lg:aspect-auto rounded-[10px] relative overflow-hidden max-w-[109px] lg:max-w-none">
                            <img src="/service-v3/print-advertising/s4/Tenders.jpg" alt="Ritz Media World – print advertising" title="Ritz Media World" className="w-full h-full object-cover" />
                            <p className={`${labelClass} text-black`}>Tenders</p>
                        </div>
                    </div>
                </div>

                {/* Col 5  */}
                <div className="hidden xl:block">
                    <div className="w-[50px] h-[50px] lg:mt-[3rem] xl:mt-[4.5rem] rounded-[10px] bg-[#0F16404D]"></div>
                </div>
            </div>
        </section>
    )
}

export default Section4;
