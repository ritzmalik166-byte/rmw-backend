import React from "react";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./Contact.module.css";


const formFieldClass = `w-full border-0 border-b border-[#0F1640] bg-transparent px-0 py-3 text-[14px] text-black outline-none placeholder:text-[#5C5C5C] focus:border-[#0F1640] ${styles.montserratMedium}`;

export default function Dreams() {
    const EXPLORE_ARROW_IMAGE =
        "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

    return (
        <section className="w-full  px-4 py-10 md:px-6 md:py-14 lg:px-12 lg:py-16 border-b border-[#E8E8E8]">
            <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14">
                <div className="relative mx-auto w-full max-w-[640px] lg:mx-0">
                    <div className="relative aspect-square w-full">
                        <Image
                            src="/contact/dream.png"
                            alt="Ritz Media World office team"
                            fill
                            priority
                            className="object-contain object-center"
                            sizes="(max-width: 768px) 92vw, (max-width: 1200px) 50vw, 620px"
                        />
                    </div>
                </div>

                <div className="w-full">
                    <h2
                        className={`text-[32px] leading-[1.15] text-black sm:text-[32px] ${styles.montserratBold}`}
                    >
                        Where Dreams Become Reality!
                    </h2>
                    <p
                        className={`mt-3 max-w-[620px] text-[16px] leading-7 text-black/75 ${styles.fontopensans}`}
                    >
                        Have an idea that's ready to take shape? Let's turn it
                        into reality. Connect with us, and let's start the
                        journey!
                    </p>

                    <form className="mt-8 space-y-5 sm:mt-10">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className={formFieldClass}
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className={formFieldClass}
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className={formFieldClass}
                        />
                        <div className="relative">
                            <select
                                defaultValue=""
                                className={`${formFieldClass} appearance-none pr-8 text-black/70`}
                            >
                                <option value="" disabled>
                                    Select Service
                                </option>
                                <option>Digital Marketing</option>
                                <option>Creative Services</option>
                                <option>Web Development</option>
                                <option>Branding</option>
                            </select>
                            <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[18px] text-black/70">
                                <IoIosArrowDown />
                            </span>
                        </div>
                        <textarea
                            rows={3}
                            placeholder="Write Message"
                            className={`${formFieldClass} resize-none pt-2 pb-3 leading-6`}
                        />

                        <img
                            src="/contact/captha.png"
                            alt="Captcha"
                            className="mt-2 w-full max-w-[380px] object-contain"
                        />

                        <div className="flex items-center justify-center md:justify-start gap-4 md:gap-4 lg:gap-4 xl:gap-6 ">
                            <span className={`
                        text-[16px] md:text-[16px] lg:text-[15px] xl:text-[18px] font-[500]  ${styles.montserrat}
                    `}>
                                Submit
                            </span>

                            <div className="
                                    w-[30px] h-[30px]
                                    sm:w-[34px] sm:h-[34px]
                                    md:w-[36px] md:h-[36px]
                                    bg-[#C99237] rounded-full 
                                    flex items-center justify-center cursor-pointer
                                ">
                                <img src={EXPLORE_ARROW_IMAGE} alt="Explore Arrow" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
