import styles from "../page.module.css"


function S5Card({ data }: { data: { title: string; location: string; price: string; circulation: string; img: string } }) {

    return (
        <div className={`${styles.s5Card} w-full lg:w-[280px] h-full min-h-[280px] sm:min-h-[320px] lg:min-h-[340px] flex flex-col bg-white overflow-hidden rounded-[16px] sm:rounded-[20px] gap-3 sm:gap-4 lg:gap-4`}>
            {/* Image area: 30% of card height */}
            <div className="w-full min-h-0 flex-shrink-0 relative overflow-hidden flex justify-center items-center h-[100px] sm:h-[120px] lg:h-[148px] border-b border-[#E5E5E5]">
                <img src={data.img} alt={data.title} className="max-w-[80%] max-h-full object-contain" />
            </div>

            {/* Content: remaining height */}
            <div className="flex-1 min-h-0 min-w-0 flex flex-col gap-3 sm:gap-4 lg:gap-4 px-2.5 sm:px-3 pb-2.5 sm:pb-3 lg:px-3 lg:pb-3 justify-between">
                <div className="flex flex-col gap-2 sm:gap-3">
                    <h5 className={`font-[700] text-[15px] sm:text-[17px] leading-tight line-clamp-2 ${styles.fontmontserrat}`}>{data.title}</h5>
                    <p className={`bg-[#F7F7F7] ${styles.fontopensans} px-2 py-1 rounded-[5px] font-[400] text-[12px] sm:text-[14px] text-[#000000] w-fit`}>{data.location}</p>
                </div>

                <div className="flex flex-col gap-2 sm:gap-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <svg className="w-[6px] h-[10px] sm:w-2 sm:h-[13px] flex-shrink-0" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.21301 12.1379L1.30013e-05 6.52794V5.77994H0.374013C0.97468 5.77994 1.47901 5.72327 1.88701 5.60994C2.30635 5.49661 2.63501 5.30961 2.87301 5.04894C3.11101 4.78827 3.25268 4.43127 3.29801 3.97794H1.30013e-05V2.88994H3.28101C3.20168 2.47061 3.04301 2.13061 2.80501 1.86994C2.56701 1.59794 2.24401 1.39961 1.83601 1.27494C1.43935 1.15027 0.952013 1.08794 0.374013 1.08794H1.30013e-05V-6.13332e-05H7.03801V1.08794H3.82501C4.08568 1.30327 4.30101 1.55827 4.47101 1.85294C4.64101 2.14761 4.74868 2.49327 4.79401 2.88994H7.03801V3.97794H4.82801C4.74868 4.80527 4.43135 5.45127 3.87601 5.91594C3.33201 6.36927 2.60668 6.65827 1.70001 6.78294L4.94701 12.1379H3.21301Z" fill="#222222" />
                        </svg>

                        <h2 className={`font-[700] text-[18px] sm:text-[22px] text-[#000000] ${styles.fontopensans}`}>{data.price} <span className="font-[400] text-[14px] sm:text-[17px]">Min Spend</span></h2>
                    </div>
                    <p className={`font-[400] text-[12px] sm:text-[14px] text-[#616060] ${styles.fontopensans}`}>Circulation: <span className="font-[600] text-[#555555]">{data.circulation}</span></p>
                </div>
            </div>
        </div>
    );
}

export default S5Card;