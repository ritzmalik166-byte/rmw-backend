import AwardCard from "./cards/AwardCard";
import styles from './page.module.css';
function Section7() {
    const awardsData = [
        {
            img: "/service-v3/layer1/s7/aw1.jpg",
            title: "Best Creative Agency (Real Estate) in Delhi/NCR By Big FM",
            description: "Best Creative Agency (Real Estate) in Delhi/NCR By Big FM",
        },
        {
            img: "/service-v3/layer1/s7/aw2.png",
            title: "Best Real Estate Podcast In India - HT Smartcast Podmasters Awards 2025",
            description: "Best Real Estate Podcast In India - HT Smartcast Podmasters Awards 2025",
        },
        {
            img: "/service-v3/layer1/s7/aw3.png",
            title: "Most Trusted Advertising Agency in Delhi/NCR – The Economic Times (2024)",
            description: "Most Trusted Advertising Agency in Delhi/NCR – The Economic Times (2024)",
        },
        {
            img: "/service-v3/layer1/s7/aw4.png",
            title: "Most Trusted Advertising Agency in Delhi/NCR – The Economic Times (2022)",
            description: "Most Trusted Advertising Agency in Delhi/NCR – The Economic Times (2022)",
        },
        {
            img: "/service-v3/layer1/s7/aw5.png",
            title: "Excellence in Digital Media – Hindustan Times (2024)",
            description: "Excellence in Digital Media – Hindustan Times (2024)",
        },
        
    ]
    return (
          <section className="w-full flex justify-center items-center py-8 sm:py-12 md:py-16 lg:py-[70px]">
            {/* Centered Align Container  */}
            <div className={`w-full flex flex-wrap justify-center items-center gap-x-4 gap-y-8 ${styles.containerWidth} ${styles.awardsContainer}`}>
                {/* Card 1  */}
                <div className="w-[406px] lg:h-[360px] xl:h-[414px] h-[414px] border-[1px] border-[#D4D4D4] relative p-4">
                    {/* Absolute Image 1  */}
                    <img src="/service-v3/layer1/s7/award-hand.png" alt="Awards & Company Recognitions" title="Awards & Company Recognitions" className="w-[239px] h-auto object-cover absolute bottom-0 left-0 z-1" />

                    {/* Absolute Image 2  */}
                    <img src="/service-v3/layer1/s7/elips1.png" alt="Ritz Media World" title="Ritz Media World" className="w-[185px] h-auto object-cover absolute bottom-0 left-[20%] z-0" />

                    {/* Top Row Content Container   */}
                    <div className="w-full flex flex-col justify-end items-end text-end">
                        <h2 className={`font-[600] text-[14px] xl:text-[16px] uppercase text-[#C99237] ${styles.fontopensans}`}>Achievement Awards</h2>
                        <h3 className={`font-[500] text-[21px] lg:text-[19px] xl:text-[30px] text-black max-w-[200px] ${styles.fontmontserrat}`}><span className="font-[700]">Awards</span> &  <span className="font-[700]">Company Recognitions</span></h3>
                    </div>
                </div>

                {/* Card 2  */}
                <AwardCard img={awardsData[0].img} title={awardsData[0].title} description={awardsData[0].description} />

                {/* Card 3  */}
                <AwardCard img={awardsData[1].img} title={awardsData[1].title} description={awardsData[1].description} />

                {/* Card 4  */}
                <AwardCard img={awardsData[2].img} title={awardsData[2].title} description={awardsData[2].description} />

                {/* Card 5  */}
                <AwardCard img={awardsData[3].img} title={awardsData[3].title} description={awardsData[3].description} />

                {/* Card 6  */}
                <AwardCard img={awardsData[4].img} title={awardsData[4].title} description={awardsData[4].description} />


            </div>
        </section>
    )
}

export default Section7;