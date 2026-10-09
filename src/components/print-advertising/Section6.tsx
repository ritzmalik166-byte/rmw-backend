import S6Card from "./cards/S6Card";
import styles from "./page.module.css"

function Section6() {
    const data = [
        {
            name: "Agniban",
            language: "(Hindi)",
        },
        {
            name: "Hindustan Times",
            language: "(English)",
        },
        {
            name: "Times Of India",
            language: "(Hindi)",
        },
        {
            name: "Navbharat Times",
            language: "(Hindi)",
        },
        {
            name: "Times Of India",
            language: "(English)",
        },
        {
            name: "The Economics Times",
            language: "(English)",
        },
        {
            name: "Times Of India",
            language: "(Banglore)",
        },
        {
            name: "The Pioneer",
            language: "(English)",
        },
    ]
    return (
        <section className="w-full flex justify-center items-center py-6 sm:py-8 md:py-10 lg:py-[35px] xl:py-[70px]">
            {/* ——— BELOW LG: Grid 2 cols (mobile) / 4 cols (sm to lg) ——— */}
            <div className={`lg:hidden w-full flex flex-col gap-3 sm:gap-4 ${styles.containerWidth}`}>
                <div className="w-full flex justify-center text-center px-2 sm:px-0">
                    <h2 className={`font-[700] text-[22px] sm:text-[28px] md:text-[32px] ${styles.fontmontserrat}`}>Select Your Newspapers</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
                    {data.map((item, index) => (
                        <S6Card key={index} data={item} />
                    ))}
                </div>
            </div>

            {/* ——— LG AND ABOVE: Original center align layout ——— */}
            <div className={`hidden lg:flex w-full flex-col justify-center items-center gap-3 sm:gap-4 ${styles.containerWidth}`}>
                {/* Top Container  */}
                <div className="w-full flex justify-center items-center text-center px-2 sm:px-0">
                    <h2 className={`font-[700] text-[22px] sm:text-[28px] md:text-[32px] xl:text-[36px] ${styles.fontmontserrat}`}>Select Your Newspapers</h2>
                </div>

                {/* Bottom Container  */}
                <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:items-start gap-3 sm:gap-4">
                    {/* Col 1  */}
                    <div className="w-full flex justify-center lg:block">
                        <S6Card data={data[0]}/>
                    </div>

                    {/* Col 2  */}
                    <div className="w-full flex flex-col gap-3 sm:gap-4 items-center lg:items-stretch">
                        <S6Card data={data[1]}/>
                        <S6Card data={data[2]}/>
                    </div>

                    {/* Col 3  */}
                    <div className="w-full flex flex-col gap-3 sm:gap-4 items-center lg:items-stretch">
                        <S6Card data={data[3]}/>
                        <S6Card data={data[4]}/>
                    </div>

                    {/* Col 4  */}
                    <div className="w-full flex flex-col gap-3 sm:gap-4 items-center lg:items-stretch">
                        <S6Card data={data[5]}/>
                        <S6Card data={data[6]}/>
                    </div>

                    {/* Col 5  */}
                    <div className="w-full flex justify-center lg:block">
                        <S6Card data={data[7]}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section6;