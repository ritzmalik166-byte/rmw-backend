import styles from "./page.module.css";

function Section3() {
    const data = [
        {
            title: "Creative Services",
            link: "/services/creative-services",
            alt: "Creative Services",
        },
        {
            title: "Content Marketing",
            link: "/services/contents-marketing",
            alt: "Content Marketing",
        },
        {
            title: "Digital Marketing",
            link: "/services/digital-marketing",
            alt: "Digital Marketing",
        },
        {
            title: "Advertising Design",
            link: "/services/print-advertising",
            alt: "Advertising Design",
        },
        {
            title: "Print Advertising",
            link: "/services/print-advertising",
            alt: "Print Advertising",
        },
        {
            title: "Email Marketing",
            link: "/services/email-marketing",
            alt: "Email Marketing",
        },
        {
            title: "Content Writing",
            link: "/services/content-writing",
            alt: "Content Writing",
        },
        {
            title: "Content Strategy",
            link: "/services/content-strategy",
            alt: "Content Strategy",
        },
        {
            title: "Content Optimization",
            link: "/services/content-optimization",
            alt: "Content Optimization",
        },
        {
            title: "Web Development",
            link: "/services/web-designing-and-development",
            alt: "Web Development",
        }
    ]
    const renderItems = () =>
        data.map((itm, idx) => (
            <h2 key={idx} className="m-0 flex shrink-0 gap-2 whitespace-nowrap font-[700] text-[34px] leading-none sm:text-[54px] md:gap-4 md:text-[100px]">
                {itm.title.split(" ").map((word, i) => (
                    <span key={i} className={i === 0 ? styles.combined : ""}>{word}</span>
                ))}
                .
            </h2>
        ));

    return (
        <section className="flex w-full items-center justify-center overflow-x-hidden bg-[#F7F7F7] py-3 md:py-4">
            {/* Centered Align Container  */}
            <div className="flex w-full items-center justify-center overflow-hidden">
                {/* Slides left to right infinitely  */}
                <div className={`flex w-full items-center justify-center ${styles.s3SlideTrack}`}>
                    <div className="flex items-center justify-center gap-2 md:gap-4">{renderItems()}</div>
                    <div className="flex items-center justify-center gap-2 md:gap-4">{renderItems()}</div>
                </div>
            </div>
        </section>
    )
}

export default Section3;