import Image from "next/image";
import styles from "./Contact.module.css";

const offerings = [
    "Digital Marketing",
    "Creative Services",
    "Print Advertising",
    "Radio Advertising",
    "Content Marketing",
    "Web Development",
    "Celebrity Endorsements",
    "Influencer Marketing",
];

const highlights = [
    {
        title: "#BRANDSFIRST",
        text: "Every decision starts with building stronger brand authority.",
    },
    {
        title: "#VISIONTOREALITY",
        text: "Strategic thinking turned into real-world brand growth.",
    },
    {
        title: "#RESULTSOVERNOISE",
        text: "Focus on what moves the brand forward, not what just looks good.",
    },
    {
        title: "#GROWCONNECTED",
        text: "Reach audiences seamlessly across digital ecosystems and real-world touchpoints.",
    },
];

export default function TogetherTowardOneGoal() {
    return (
        <section className="w-full px-4 pb-12 pt-2 md:px-5 md:pb-14 md:pt-4 lg:px-8 lg:pb-[70px] lg:pt-10 xxl:px-0">
            <div className="mx-auto grid w-full  grid-cols-1 overflow-hidden md:grid-cols-2 lg:grid-cols-[42.5%_30%_30%]">
                <div className="bg-white px-[18px] pb-[30px] pt-[34px] md:col-span-2 md:px-7 md:pb-[34px] md:pt-[38px] lg:col-auto lg:px-[30px] lg:pb-[42px] lg:pt-[44px] xxl:pl-5 xxl:pr-7 xxl:pt-[46px] xxl:pb-10">
                    <h2 className={` ${styles.montserratBold} flex flex-col text-[20px] leading-[1.02] tracking-[0.2px] text-[#111111] sm:text-[30px] md:text-[40px]`}>
                        <span className="font-bold">Together</span>
                        <span className="font-medium text-[#bf9339]">Toward</span>
                        <span className="font-bold">One Goal</span>
                    </h2>

                    <p className={` ${styles.fontopensans} mt-[18px] max-w-[500px] text-[16px] leading-[1.6] text-[#181818] md:mt-5 md:text-[16px] lg:mt-4 lg:text-[16px] lg:leading-tight font-[400]`}>
                        We at Ritz Media World help brands grow at every stage! With
                        integrated expertise in PR, digital marketing, performance,
                        influencer marketing, and reputation management, we build visibility
                        locally and credibility globally across India.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3 lg:gap-x-[10px] lg:gap-y-[10px]">
                        {offerings.map((item) => (
                            <span
                                key={item}
                                className={`whitespace-nowrap rounded-full border border-[#C99237] px-[22px] py-[11px] text-[12px] leading-none text-[#C99237] md:px-6 md:py-3 md:text-base lg:px-[15px] lg:py-[9px] lg:text-[12px]${styles.montserratBold}`}
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-[29px] bg-[#0b1351] px-6 py-[34px] md:px-7 md:py-[38px] lg:h-full lg:justify-between lg:gap-0 lg:px-9 lg:py-11 xxl:px-[34px] xxl:py-[46px]">
                    {highlights.map((item) => (
                        <div key={item.title} className="px-5">
                            <h3 className={` ${styles.montserratBold} text-[16px] leading-none tracking-[0.2px] text-white md:text-[18px] lg:text-[20px] `}>
                                {item.title}
                            </h3>
                            <p className={` ${styles.fontopensans} mt-[10px] text-[22px] leading-[1.55] text-white md:text-[26px] lg:mt-[9px] lg:text-[14px] font-400 lg:leading-tight`}>
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="relative min-h-[520px] md:min-h-[640px] lg:min-h-0 lg:aspect-[0.78]">
                    <Image
                        src="/contact/globe.png"
                        alt="Hand hovering over glowing digital globe"
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 34vw"
                    />
                </div>
            </div>
        </section>
    );
}