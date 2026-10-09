"use client";

import Image from "next/image";
import ContactLeadForm from "../ContactLeadForm";
import pageStyles from "./page.module.css";

const SOCIAL_LINKS = [
    {
        src: "/varun.icon/facebook.svg",
        href: "https://www.facebook.com/ritzmediaworld/",
        label: "Facebook",
        linkTitle: "Ritz Media World on Facebook",
        color: "#1877f2",
    },
    {
        src: "/varun.icon/twitter.svg",
        href: "https://x.com/ritzmediaworld",
        label: "X",
        linkTitle: "Ritz Media World on X",
        color: "#000",
    },
    {
        src: "/varun.icon/instagram.svg",
        href: "https://www.instagram.com/ritzmediaworld/",
        label: "Instagram",
        linkTitle: "Ritz Media World on Instagram",
        color: "#e4405f",
    },
    {
        src: "/varun.icon/linkedin.svg",
        href: "https://www.linkedin.com/company/ritzmediaworld/",
        label: "LinkedIn",
        linkTitle: "Ritz Media World on LinkedIn",
        color: "#0a66c2",
    },
    {
        src: "/varun.icon/youtube.svg",
        href: "https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia",
        label: "YouTube",
        linkTitle: "Ritz Media World on YouTube",
        color: "#ff0000",
    },
];

function Section2() {
    return (
        <>
            <section className="w-full bg-white py-[35px] lg:py-[70px]">
                <div
                    className={`w-full ${pageStyles.containerWidth} flex flex-col md:w-full md:items-center lg:flex-row lg:items-stretch justify-center gap-8 lg:gap-[40px] xl:gap-[80px]`}
                >
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <div className="relative w-full aspect-square min-h-0">
                            <div
                                className="absolute inset-0 rounded-full overflow-hidden lg:h-[450px] xl:h-[590px]"
                                style={{ borderRadius: "50%" }}
                            >
                                <Image
                                    src="/varunimage/contactemployee.jpg"
                                    alt="Office team at work"
                                    title="Office team at work"
                                    fill
                                    sizes="(max-width: 1023px) 100vw, 480px"
                                    className="object-cover rounded-full"
                                />
                            </div>
                            <div className="absolute right-[26px] bottom-[-56px] lg:bottom-[10px] xl:bottom-[-20px] w-[170px] h-[170px] sm:w-[42%] sm:min-w-[140px] sm:min-h-[140px] sm:aspect-square sm:h-auto bg-white rounded-full  flex flex-col items-center justify-center gap-3 p-4 border-[1px] border-[#0F1640]">
                                <p
                                    className={`font-semibold text-[18px] leading-[26px] text-center text-black m-0 ${pageStyles.fontMontserrat}`}
                                >
                                    Follow Us
                                </p>
                                <div className="flex items-center justify-center gap-1 flex-wrap">
                                    {SOCIAL_LINKS.map(
                                        ({ src, href, label, linkTitle }) => (
                                            <a
                                                key={label}
                                                href={href}
                                                className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform"
                                                aria-label={linkTitle}
                                                title={linkTitle}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Image
                                                    src={src}
                                                    alt={label}
                                                    title={label}
                                                    width={23}
                                                    height={23}
                                                    className="object-contain w-[23px] h-[23px]"
                                                />
                                            </a>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-[560px] md:max-w-full md:w-full lg:w-1/2 lg:max-w-none">
                        <h2
                            className={`font-semibold text-[20px] sm:text-[22px] md:text-[26px] lg:text-[30px] xl:text-[40px] text-[#000000] mt-[20px] lg:mt-0 mb-2 lg:mb-0 xl:mb-2 leading-[50px] text-center lg:text-left ${pageStyles.fontMontserrat}`}
                        >
                            Your Big Idea Starts Here
                        </h2>
                        <p
                            className={`text-[15px] lg:text-[15px] xl:text-[15px] text-[#000000] mb-7 lg:mb-0 xl:mb-7 w-full lg:max-w-[540px] leading-[26px] text-center lg:text-left ${pageStyles.fontopensans}`}
                        >
                            Got a project you&apos;re thinking about? Fill out the
                            form below, & our team will reach out to you soon to
                            make your ideas happen!
                        </p>

                        <ContactLeadForm variant="inline" />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Section2;
