"use client";

import Image from "next/image";
import styles from "./page.module.css";
import s2 from "./Section2.module.css";
import m from "./Section2M.module.css";
import { GoStarFill } from "react-icons/go";

function Section2M() {
    const reviewers = ["/new-about-imgs/s2/rrv1.png", "/new-about-imgs/s2/rrv2.png", "/new-about-imgs/s2/rrv3.png"];

    return (
        <section className={`w-full py-[40px] xl:py-[70px] border-b border-[#D9D9D9] ${s2.root}`}>
            <div className={`w-full ${styles.containerWidth} ${s2.container}`}>
                {/* Row 1 — intro copy + team image */}
                <div className={m.rowIntro}>
                    <p className={`font-[400] text-center text-[20px] ${styles.fontmontserrat} ${s2.rightLead}`}>
                        We believe in staying ahead by combining <span className="font-[700]">creative storytelling</span> and{" "}
                        <span className="font-[700]">leveraging AI</span> to deliver <span className="font-[700]">stunning visuals</span> in{" "}
                        <span className="font-[700]">record time</span>.
                    </p>
                    <p className={`font-[400] text-[14px] text-center !mt-0 ${styles.fontopensans} ${s2.rightBody}`}>
                        For the better part of the last two decades,                         <a href="/" target="_blank"
                            rel="noopener noreferrer" title="Ritz Media World"
                            className="font-semibold cursor-pointer text-[#C99237] hover:underline"> RITZ MEDIA WORLD </a> has been building narratives that drive competitive movements. They
                        don&apos;t just influence behaviors but develop lasting habits. <br />
                        <br />
                        We pride ourselves in going out of our way to understand the consumer mindset in every walk of life. This enables us to build
                        campaigns that don&apos;t just speak at them, but we build campaigns that speak to them.
                    </p>
                    <div className={`relative h-auto w-full max-w-[564px] shrink-0 ${s2.teamWrap}`}>
                        <Image
                            src="/new-about-imgs/s2/team.jpg"
                            alt="Ritz Media World creative team"
                            title="Ritz Media World team"
                            width={1128}
                            height={752}
                            sizes="(max-width: 768px) 100vw, 564px"
                            className="mt-1 h-auto w-full"
                        />
                    </div>
                </div>

                {/* Row 2 — left: 17 years + reviews; right: stats + award image */}
                <div className={m.rowSplit}>
                    <div className={`flex flex-col justify-between gap-0 ${m.splitLeft}`}>
                        <Image
                            src="/new-about-imgs/s2/17years.png"
                            alt="17+ years of advertising and branding experience at Ritz Media World"
                            title="17+ years of experience – Ritz Media World"
                            width={320}
                            height={190}
                            className={`w-[320px] h-auto max-w-full object-contain ${s2.img17}`}
                            priority
                        />
                        <div className={`flex items-end gap-4 mb-6 ${s2.reviewsRow}`}>
                            <div className="flex gap-4">
                                <div className={`flex gap-2 ${s2.avatarRow}`}>
                                    <div className={`flex items-center rounded-full bg-white py-1 ${s2.avatarPad}`}>
                                        {reviewers.map((reviewer, idx) => (
                                            <div
                                                key={reviewer}
                                                className={`relative w-[47px] h-[47px] shrink-0 rounded-full overflow-hidden border-3 border-[#ffffff] bg-white ${s2.avatar} ${idx > 0 ? `-ml-[10px] ${s2.avatarOverlap}` : ""
                                                    }`}
                                                style={{ zIndex: idx + 1 }}
                                            >
                                                <Image
                                                    src={reviewer}
                                                    alt={`Google reviewer ${idx + 1} – Ritz Media World`}
                                                    title={`Google reviewer ${idx + 1}`}
                                                    width={47}
                                                    height={47}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <p
                                            className={`font-[600] text-[13px] uppercase text-[#3C3C3C] ${styles.fontmontserrat} ${s2.reviewsLabel}`}
                                        >
                                            more than <br /> 143 google reviews
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-end gap-0">
                                <div className="relative flex items-center justify-center">
                                    <GoStarFill className={`relative z-[5] h-[41px] w-[41px] text-[#C99237] ${s2.starIcon}`} />
                                    <p
                                        className={`absolute right-1/2 top-1/2 z-10 translate-x-1/2 -translate-y-1/2 font-[600] text-[13px] text-white ${styles.fontmontserrat} ${s2.starScore}`}
                                    >
                                        5.0
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        window.open(
                                            "https://share.google/KiTNs3mJMr5qUOkjK",
                                            "_blank",
                                            "noopener,noreferrer"
                                        )
                                    }
                                    title="Google Reviews"
                                    aria-label="Google Reviews"
                                    className={`w-[40px] h-[40px] rounded-full bg-[#C99237] flex justify-center hover:bg-[#0F1640] cursor-pointer items-center border-0 p-0 ${s2.gBadge}`}
                                >
                                    <svg
                                        width="22"
                                        height="20"
                                        viewBox="0 0 22 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19.4276 2.92383L17.1346 9.08052L12.9492 4.01635L19.4276 2.92383Z"
                                            fill="white"
                                        />
                                        <rect
                                            x="2.19672"
                                            y="16.7171"
                                            width="16.5517"
                                            height="0.689655"
                                            transform="rotate(-39.5724 2.19672 16.7171)"
                                            fill="white"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={m.splitRight}>
                        <div className={`flex flex-col justify-between ${s2.leftCol}`}>
                            <div className={`w-full text-center pt-3 ${s2.whoRow}`}>
                                <p className={`font-[600] text-[14px] uppercase ${styles.fontmontserrat} ${s2.whoLabel}`}>who are we ?</p>
                            </div>
                            <div className="flex w-full flex-col items-center justify-center text-center">
                                <div className="relative flex items-center justify-center">
                                    <p className={`font-[600] text-[60px] text-[#0F1640] ${styles.fontmontserrat} ${s2.statNum}`}>35</p>
                                    <p className={`absolute -right-[15px] top-[3px] font-[500] text-[30px] ${s2.statPlus}`}>+</p>
                                </div>
                                <p className={`font-[600] text-[20px] ${styles.fontmontserrat} ${s2.statAwards}`}>Awards</p>
                                <p className={`font-[400] text-[16px] ${styles.fontopensans} ${s2.statTagline}`}>
                                    Passion, Obsession, and  Persistence always pay off.
                                </p>
                            </div>
                        </div>
                        <div className={`h-auto w-full max-w-[388px] ${s2.awardWrap}`}>
                            <img
                                src="/new-about-imgs/s2/abt-s2-awarrd.jpg"
                                alt="Awards and recognition earned by Ritz Media World"
                                title="Ritz Media World awards and recognition"
                                className="h-auto w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Section2M;
