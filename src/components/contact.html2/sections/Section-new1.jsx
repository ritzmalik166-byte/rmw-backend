import React from "react";
import Image from "next/image";
import Link from "next/link";
import pageStyles from "./page.module.css";
import s1 from "./section-new1.module.css";

const SERVICE_LINKS = [
    {
        label: "Digital Marketing",
        href: "https://ritzmediaworld.com/services/digital-marketing",
    },
    {
        label: "Creative Services",
        href: "https://ritzmediaworld.com/services/creative-services",
    },
    {
        label: "Print Advertising",
        href: "https://ritzmediaworld.com/services/print-advertising",
    },
    {
        label: "Radio Advertising",
        href: "https://ritzmediaworld.com/services/radio-advertising",
    },
    {
        label: "Content Marketing",
        href: "https://ritzmediaworld.com/services/contents-marketing",
    },
    {
        label: "Web Development",
        href: "https://ritzmediaworld.com/services/web-designing-and-development",
    },
    {
        label: "Celebrity Endorsements",
        href: "https://ritzmediaworld.com/services/celebrity-endorsements",
    },
    {
        label: "Influencer Marketing",
        href: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india",
    },
];

const HASHTAG_BLOCKS = [
    {
        tag: "#BRANDSFIRST",
        text: "Every decision starts with building stronger brand authority.",
    },
    {
        tag: "#VISIONTOREALITY",
        text: "Strategic thinking turned into real-world brand growth.",
    },
    {
        tag: "#RESULTSOVERNOISE",
        text: "Focus on what moves the brand forward, not what just looks good.",
    },
    {
        tag: "#GROWCONNECTED",
        text: "Reach audiences seamlessly across digital ecosystems and real-world touchpoints.",
    },
];

function SectionNew1() {
    return (
        <section className="w-full overflow-x-hidden pt-[35px] md:pt-[70px]">
            <div className="flex w-full flex-col lg:flex-row lg:items-stretch">
                {/* Left — heading, copy, service pills */}
                <div className="flex w-full justify-center py-8 lg:w-1/2 lg:justify-start lg:py-10">
                    <div
                        className={`${s1.leftInner} ${pageStyles.containerWidth} ${s1.leftCol}`}
                    >
                        <h2 className={`${s1.heading} ${s1.headingDesktop}`}>
                            <span className={s1.headingPart}>Together </span>
                            <span
                                className={`${s1.headingPart} ${s1.headingAccent}`}
                            >
                                Toward{" "}
                            </span>
                            <span className={s1.headingGoal}>One Goal</span>
                        </h2>

                        <p className={s1.body}>
                            We at Ritz Media World help brands grow at every
                            stage! With integrated expertise in PR, digital
                            marketing, performance, influencer marketing, and
                            reputation management, we build visibility locally
                            and credibility globally across India.
                        </p>

                        <ul className={s1.serviceGrid}>
                            {SERVICE_LINKS.map(({ label, href }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        title={label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={s1.serviceLink}
                                    >
                                        <span className={s1.serviceLinkText}>
                                            {label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right — navy panel (400×570) + image (391×571, 63/92) */}
                <div className={`${s1.rightWrap} lg:ml-auto`}>
                    <div className={s1.navyPanel}>
                        {HASHTAG_BLOCKS.map(({ tag, text }) => (
                            <div key={tag} className={s1.hashtagBlock}>
                                <h4 className={s1.hashtagTitle}>{tag}</h4>
                                <p className={s1.hashtagText}>{text}</p>
                            </div>
                        ))}
                    </div>

                    <div className={s1.imageWrap}>
                        <Image
                            src="/varunimage/contect-newsection-left-immage.jpg"
                            alt="Hand reaching toward a glowing digital sphere, Ritz Media World"
                            title="Hand reaching toward a glowing digital sphere, Ritz Media World"
                            fill
                            loading="lazy"
                            className="object-cover object-center"
                            sizes="(max-width: 1023px) 100vw, 391px"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SectionNew1;
