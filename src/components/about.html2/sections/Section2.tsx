import Image from "next/image";
import styles from "./page.module.css";
import s2 from "./Section2.module.css";
import { GoStarFill } from "react-icons/go";
function Section2() {
    const reviewers = ["/new-about-imgs/s2/rrv1.png", "/new-about-imgs/s2/rrv2.png", "/new-about-imgs/s2/rrv3.png"];
    return (
        <section className={`w-full py-[40px] xl:py-[70px] border-b border-[#D9D9D9] ${s2.root}`}>
            {/* Centered Align Container  */}
            <div className={`w-full ${styles.containerWidth} ${s2.container}`}>
                <div className="flex w-full items-center justify-center">
                    {/* Left Side Container  */}
                    <div className={`flex shrink-0  border-t border-[#D9D9D9] justify-between self-stretch pt-10 gap-6 border-r ${s2.leftPane}`}>
                        {/* Left Side Col  */}
                        <div className={`flex flex-col justify-between gap-4 ${s2.leftCol}`}>
                            <div className={`w-full pt-3 ${s2.whoRow}`}>
                                <h2 className={`font-[600] text-[14px] uppercase ${styles.fontmontserrat} ${s2.whoLabel}`}>who are we ?</h2>
                            </div>

                            <div className="w-full flex flex-col justify-end items-end text-end">
                                <div className="relative flex justify-end items-end">
                                    <p className={`font-[600] text-[60px] text-[#0F1640] ${styles.fontmontserrat} ${s2.statNum}`}>35</p>
                                    <p className={`absolute top-[3px] -right-[15px] font-[500] text-[30px] ${s2.statPlus}`}>+</p>
                                </div>
                                <p className={`font-[600] text-[20px] ${styles.fontmontserrat} ${s2.statAwards}`}>Awards</p>
                                <p className={`font-[400] text-[16px] ${styles.fontopensans} ${s2.statTagline}`}>Passion, Obsession, and  <br /> Persistence always pay off.</p>
                            </div>
                        </div>

                        {/* Right Side Column  */}
                        <div className="flex flex-col justify-between gap-0">
                            <Image
                                src="/new-about-imgs/s2/17years.png"
                                alt="17+ years of advertising and branding experience at Ritz Media World"
                                title="17+ years of experience – Ritz Media World"
                                width={320}
                                height={190}
                                className={`w-[320px] h-auto object-contain ${s2.img17}`}
                                priority
                            />
                            <div className={`flex items-end gap-4 mb-6 ${s2.reviewsRow}`}>
                                {/* Left Side Container  */}
                                <div className="flex gap-4">
                                    <div className={`flex gap-2 ${s2.avatarRow}`}>
                                        <div className={`flex items-center rounded-full bg-white  py-1 ${s2.avatarPad}`}>
                                            {reviewers.map((reviewer, idx) => (
                                                <div
                                                    key={reviewer}
                                                    className={`relative w-[47px] h-[47px] shrink-0 rounded-full overflow-hidden border-4 border-[#ffffff] bg-white ${s2.avatar} ${idx > 0 ? `-ml-[10px] ${s2.avatarOverlap}` : ""
                                                        }`}
                                                    style={{ zIndex: idx + 1 }}
                                                >
                                                    <Image
                                                        src={reviewer}
                                                        alt={`Google reviewer ${idx + 1} – Ritz Media World`}
                                                        title={`Google reviewer ${idx + 1}`}
                                                        width={47}
                                                        height={47}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <p className={`font-[600] text-[16px] uppercase text-[#3C3C3C] ${styles.fontmontserrat} ${s2.reviewsLabel}`}>
                                                more than <br /> 143 google reviews

                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side Container  */}
                                <div className="flex flex-col justify-end items-end gap-0">
                                    {/* Star Div  */}
                                    <div className="flex items-center jusity-center relative">
                                        <GoStarFill className={`w-[41px] h-[41px]  text-[#C99237] relative z-5 ${s2.starIcon}`} />
                                        <p className={`font-[600] text-[13px] text-white absolute top-[50%] right-[50%] translate-x-[50%] -translate-y-[50%] z-10 ${styles.fontmontserrat} ${s2.starScore}`}>5.0</p>
                                    </div>

                                    <a
  href="https://share.google/KiTNs3mJMr5qUOkjK"
  target="_blank"
  rel="noopener noreferrer"
  title="Google Reviews"
  className={`w-[40px] h-[40px] rounded-full bg-[#C99237] flex justify-center hover:bg-[#0F1640] cursor-pointer items-center ${s2.gBadge}`}
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
</a>
                                </div>
                            </div>

                            <div className={`w-[388px] h-auto ${s2.awardWrap}`}>
                                <img
                                    src="/new-about-imgs/s2/abt-s2-awarrd.jpg"
                                    alt="Awards and recognition earned by Ritz Media World"
                                    title="Ritz Media World awards and recognition"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side Container  */}
                    <div className={`flex min-h-0  border-t border-[#D9D9D9] min-w-0 flex-1 flex-col justify-between self-stretch pt-10 pl-16 max-w-[604px] ${s2.rightPane}`}>
                        <p className={`font-[400] text-[24px] ${styles.fontmontserrat} ${s2.rightLead}`}>
                            We believe in staying ahead by combining <span className="font-[700]">creative storytelling</span> and <span className="font-[700]">leveraging AI</span> to deliver <span className="font-[700]">stunning visuals</span> in <span className="font-[700]">record time</span>.
                        </p>
                        <p className={`font-[400] text-[16px] ${styles.fontopensans} ${s2.rightBody}`}>For the better part
                             of the last two decades,
                             <a href="/" target="_blank" rel="noopener noreferrer" title="Ritz Media World"
                              className="font-semibold cursor-pointer text-[#C99237] hover:underline"> RITZ MEDIA WORLD </a> 
                          has been building narratives that drive competitive movements. They don't just influence behaviors but develop lasting habits. <br /><br />
                            We pride ourselves in going out of our way to understand the consumer mindset in every walk of life. This enables us to build campaigns that don't just speak at them, but we build campaigns that speak to them.</p>

                        <div className={`h-auto w-full max-w-[564px] mt-[20px] shrink-0 ${s2.teamWrap}`}>
                            <img
                                src="/varunimage/team-bg.avif"
                                alt="Ritz Media World creative team at work"
                                title="Ritz Media World team"
                                className="h-auto w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section2;