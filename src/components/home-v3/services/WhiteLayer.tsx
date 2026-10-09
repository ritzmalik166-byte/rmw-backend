import styles from "./page2.module.css";

function WhiteLayer() {
    const data = [
        {
            title: "Creative Services",
            link: "https://ritzmediaworld.com/services/creative-services",
            alt: "Creative Services",
        },
        {
            title: "Content Marketing",
            link: "https://ritzmediaworld.com/services/contents-marketing",
            alt: "Content Marketing",
        },
        {
            title: "Digital Marketing",
            link: "https://ritzmediaworld.com/services/digital-marketing",
            alt: "Digital Marketing",
        },
        {
            title: "Print Advertising",
            link: "https://ritzmediaworld.com/services/print-advertising",
            alt: "Print Advertising",
        },
        {
            title: "Radio Advertising",
            link: "https://ritzmediaworld.com/services/radio-advertising",
            alt: "Radio Advertising",
        },
    ]
    const renderItems = () =>
        data.map((itm, idx) => (
            <h2 key={idx} className="m-0 flex shrink-0 gap-[10px] whitespace-nowrap font-[700] text-[34px] leading-none sm:gap-3 sm:text-[54px] md:gap-4 md:text-[100px]">
                {itm.title.split(" ").map((word, i) => (
                    <a href={itm.link} target="_blank" key={i} className={i === 0 ? styles.combined : ""}>{word}</a>
                ))}
                .
            </h2>
        ));
        const renderItems2 = () =>
            data.map((itm, idx) => (
                <p key={idx} className="m-0 flex shrink-0 gap-[10px] whitespace-nowrap font-[700] text-[34px] leading-none sm:gap-3 sm:text-[54px] md:gap-4 md:text-[100px]">
                    {itm.title.split(" ").map((word, i) => (
                        <a href={itm.link} target="_blank" key={i} className={i === 0 ? styles.combined : ""}>{word}</a>
                    ))}
                    .
                </p>
            ));

    return (
        <section className="flex w-full min-h-[168px] items-center justify-center overflow-x-hidden bg-[#F7F7F7] py-3 md:py-4">
            {/* Centered Align Container  */}
            <div className="flex w-full items-center justify-center ">
                {/* Slides left to right infinitely  */}
                <div className={`flex w-full items-center justify-center ${styles.s3SlideTrack}`}>
                    <div className="flex items-center justify-center gap-2 md:gap-4">{renderItems()} {renderItems2()}</div> 
                </div>
            </div>
        </section>
    )
}

export default WhiteLayer;