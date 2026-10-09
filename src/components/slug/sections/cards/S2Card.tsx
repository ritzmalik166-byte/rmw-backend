import styles from "../page.module.css";
function S2Card({ index, data }: { index: number, data: any }) { 
    return (
        <div className="flex h-auto w-full lg:h-[470px]">
            <div className={`flex h-full w-full flex-col-reverse gap-4 lg:gap-14 ${index % 2 === 0 ? "lg:flex-row" : "lg:justify-start lg:flex-row-reverse"}`}>
                {/* Left Side Container */}
                <div className="relative h-[470px] w-full max-md:h-auto max-md:aspect-[653/470] lg:h-full lg:w-[653px]">
                    <img
                        src={`/${data.image_url}`}
                        alt={`${data.title} – Ritz Media World`}
                        title={data.title}
                        className="h-full w-full object-cover object-center md:[object-position:0_-34px]"
                    />
               </div>

                {/* Right Side Container */}
                <div
                    className={`mt-5 flex max-w-full flex-col items-center justify-center gap-4 lg:mt-0 lg:max-w-[470px] lg:items-start ${index % 2 === 0 ? "max-md:px-0 md:pr-[50px] xl:pr-0" : "max-md:px-0 md:pl-[50px] xl:pl-0"}`}
                >
                    <h3
                        className={`w-full text-center text-[22px] font-[700] md:text-[30px] ${index % 2 === 0 ? "lg:text-left" : "lg:text-right"} ${styles.fontmontserrat}`}
                    >
                        {data.title}
                    </h3>
                    <p
                        className={`text-center text-[15px] font-[400] leading-[26px] md:text-[16px] md:leading-[28px] ${index % 2 === 0 ? "lg:text-left" : "lg:text-right"} ${styles.fontpoppins}`}
                    >
                        {data.description}
                    </p>
                </div> 
            </div>
        </div>
    )
}

export default S2Card;