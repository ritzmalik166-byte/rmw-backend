"use client";

import { useId, useRef, useState } from "react";
import {
    CONTACT_COUNTRIES,
    DEFAULT_CONTACT_COUNTRY,
    SORTED_CONTACT_COUNTRIES,
    validateContactPhone,
    type CountryEntry,
} from "@/lib/contactPhoneValidation";
import { MdFacebook } from "react-icons/md";
import { BsTwitterX } from "react-icons/bs";
import { TiSocialLinkedin } from "react-icons/ti";
import { BsYoutube } from "react-icons/bs";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import toast from "react-hot-toast";
import styles from "./page.module.css";
const HCAPTCHA_SITEKEY = "e4a44c7a-13c4-4534-b210-d41242d2d262";

const CHEVRON_DATA_URI =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADsQAAA7EB9YPtSQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHPSURBVHic7dzBVtpAAIXh+zLFfV3QZ4bnqnZT9Q3swuaoYCSBwGRmvu+c7FwMuT+BjSQAAAAAAAAAAAAAAAAAAAAAAAAAQOvukuyTPPy/9kk2RU9Ul6rv312SpySvB9dzkm3Bc9Vim7d7dXj/nlJJBPscH364XiKC72zzdo/G7t+u3NGme8z4Cxgi+FXsdOt1n6+fnB+vP8VON8NDvn8RIjg2ZfzXJL9LHXCOXU6/EB8H70499qv7CNjk6y8xIjg2Z/znVPIlMEl+Jvmb6RH0+HEw9bFf7RtFBOOaH38ggmPdjD8Qwbvuxh+IoOPxBz1H0P34gx4jMP6BniIw/ogeIjD+CS1HYPyJWozA+DO1FIHxz9RCBMa/UM0RGH8hNUZg/IXVFIHxr6SGCIx/ZWuOwPg3ssYIjH9ja4rA+IWsIQLjF1YyAuOvRIkIjL8yt4zA+Ct1iwiMv3LXjMD4lbhGBMavzJIRGL9SS0Rg/MpdEoHxG3FOBMZvzJz/uX+Z+bfGr8ScJ4HxG7VUBMav2KURGL8B50Zg/IbMjcD4DZoagfEbdioC43dg7MeY/Zh1Rzb5/HPsuyQ/ip4IAAAAAAAAAAAAAAAAAAAAAAAAAOjeP1TCsZ3QSll0AAAAAElFTkSuQmCC";

function ServiceSelectChevron() {
    const rawId = useId().replace(/:/g, "");
    const patternId = `service-select-pattern-${rawId}`;
    const imageId = `service-select-img-${rawId}`;
    return (
        <svg
            width={16}
            height={9}
            viewBox="0 0 16 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden
        >
            <rect width="16" height="9" fill={`url(#${patternId})`} />
            <defs>
                <pattern id={patternId} patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref={`#${imageId}`} transform="matrix(0.0106997 0 0 0.0189303 -0.173913 -0.730769)" />
                </pattern>
                <image
                    id={imageId}
                    width="128"
                    height="128"
                    preserveAspectRatio="none"
                    xlinkHref={CHEVRON_DATA_URI}
                    href={CHEVRON_DATA_URI}
                />
            </defs>
        </svg>
    );
}

function Section6() {
    const captchaRef = useRef<HCaptcha>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<CountryEntry>(() => DEFAULT_CONTACT_COUNTRY);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
        query: "",
    });
    const [popupMessage, setPopupMessage] = useState<string | null>(null);
    const [popupType, setPopupType] = useState<"success" | "error">("error");

    const handleCaptchaVerify = (token: string) => {
        setCaptchaToken(token);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (name === "phone") {
            const digits = value.replace(/\D/g, "").slice(0, 15);
            setFormData((prev) => ({ ...prev, phone: digits }));
            return;
        }
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const showPopup = (type: "success" | "error", message: string) => {
        setPopupType(type);
        setPopupMessage(message);
        if (type === "success") {
            toast.success(message);
            return;
        }
        toast.error(message);
    };

    const validateForm = (): { ok: true; phoneE164: string } | { ok: false } => {
        const trimmedName = formData.name.trim();
        const phoneDigits = formData.phone.replace(/\D/g, "");
        const trimmedEmail = formData.email.trim();
        const trimmedService = formData.service.trim();
        const trimmedQuery = formData.query.trim();

        if (!trimmedName || trimmedName.length < 2) {
            showPopup("error", "Please enter a valid name");
            return { ok: false };
        }

        const phoneResult = validateContactPhone(phoneDigits, selectedCountry);
        if (!phoneResult.ok) {
            showPopup("error", phoneResult.error);
            phoneInputRef.current?.focus();
            return { ok: false };
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            showPopup("error", "Please enter a valid email address");
            return { ok: false };
        }

        if (!trimmedService) {
            showPopup("error", "Please select a service");
            return { ok: false };
        }

        if (!trimmedQuery || trimmedQuery.length < 10) {
            showPopup("error", "Please enter a message of at least 10 characters");
            return { ok: false };
        }

        if (!captchaToken) {
            showPopup("error", "Please complete the captcha");
            return { ok: false };
        }

        return { ok: true, phoneE164: phoneResult.e164 };
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmitting) {
            return;
        }

        const validation = validateForm();
        if (!validation.ok) return;

        try {
            setIsSubmitting(true);

            const captchaRes = await fetch("/api/verify-captcha", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: captchaToken }),
            });

            const captchaData: { success?: boolean } = await captchaRes.json();

            if (!captchaRes.ok || !captchaData.success) {
                showPopup("error", "Captcha verification failed. Please try again.");
                captchaRef.current?.resetCaptcha();
                setCaptchaToken(null);
                return;
            }

            const payload = {
                name: formData.name.trim(),
                phone: validation.phoneE164,
                email: formData.email.trim(),
                service: formData.service.trim(),
                query: formData.query.trim(),
            };

            const response = await fetch("/api/save-contact-query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result: { message?: string } = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Unable to submit form");
            }

            showPopup("success", "Thank you! Your query has been submitted.");
            setSelectedCountry(DEFAULT_CONTACT_COUNTRY);
            setFormData({
                name: "",
                phone: "",
                email: "",
                service: "",
                query: "",
            });
            captchaRef.current?.resetCaptcha();
            setCaptchaToken(null);
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Something went wrong. Please try again.";
            showPopup("error", message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="flex w-full justify-center overflow-visible py-8   sm:py-10  pb-12 lg:py-12 lg:pb-16 xl:items-center xl:py-[70px]">
            <div
                className={`flex w-full flex-col items-center gap-8 md:gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-6  ${styles.containerWidth}`}
            >
                {/* Left Side Container — circle: scaled lg…xl, exact 621px at xl+ */}
                <div className="relative mx-auto mb-0 flex aspect-square w-full max-w-[350px] shrink-0 flex-col rounded-full bg-[#0F1640] px-3 max-md:pb-10 sm:w-[82%] sm:max-w-none md:w-[76%] lg:mx-0 lg:mb-0 lg:w-[52%] lg:max-w-[min(100%,520px)] xl:aspect-auto xl:h-[621px] xl:w-[621px] xl:max-w-none gap-6 pt-12 sm:gap-8 sm:pt-14 lg:gap-10 lg:pt-16 xl:gap-12 xl:pt-20">

                    {/* Row 1  */}
                    <div className="w-full text-center px-2">
                        <p
                            className={`font-[700] text-[14px] leading-snug text-white sm:text-[20px] lg:text-[24px] xl:text-[30px] ${styles.fontmontserrat}`}
                        >
                            Let’s Connect & Bring <br /> Your Vision to Life.
                        </p>
                    </div>

                    {/* Row 2  */}
                    <div className="flex w-full flex-col gap-4 px-4 sm:gap-5 sm:px-10 md:px-12 lg:gap-6 lg:px-14 xl:gap-8 xl:px-20">
                        {/* Top Div  */}
                        <div className="flex w-full flex-row sm:items-start sm:justify-between sm:gap-3">
                            {/* Left Side Container  */}
                            <div className="flex min-w-0 flex-1 flex-col gap-1 sm:gap-2 xl:gap-4">
                                <p
                                    className={`font-[400] text-[12px] text-white sm:text-[14px] xl:text-[16px] ${styles.fontopensans}`}
                                >
                                    Address
                                </p>
                                <p
                                    className={`font-[600] text-[11px] leading-snug text-white sm:text-[13px] lg:text-[14px] xl:text-[16px] ${styles.fontmontserrat}`}
                                >
                                    <span
                                    className="leading-[20px] sm:leading-[28px] cursor-pointer"
                                        onClick={() =>
                                            window.open("https://maps.app.goo.gl/tjeEjr4GgaLjGLCA7", "_blank")
                                        }
                                    >
                                        402 – 404, 4th Floor, <br /> Corporate Park, Tower A1, <br /> Sector 142,
                                        Noida
                                    </span>
                                </p>
                            </div>

                            {/* Right Side Container  */}
                            <div className="flex min-w-0 flex-col gap-3 sm:shrink-0">
                                <p
                                    className={`font-[400] text-[12px] text-white sm:text-[14px] xl:text-[16px] ${styles.fontopensans}`}
                                >
                                    Phone Number
                                </p>
                                <p
                                    className={`font-[600] text-[13px] text-white sm:text-[15px] xl:text-[18px] ${styles.fontmontserrat}`}
                                >
                                    <span className="cursor-pointer" onClick={() => window.open("tel:09220516777", "_blank")}>09220516777</span>
                                    
                                </p>
                                <p
                                    className={`font-[600] text-[13px] text-white sm:text-[15px] xl:text-[18px] ${styles.fontmontserrat}`}
                                >
                                   
                                    <span className="cursor-pointer" onClick={() => window.open("tel:07290002168", "_blank")}>07290002168</span>
                                </p>
                            </div>
                        </div>

                        {/* Bottom Div  */}
                        <div className="flex w-full justify-between">
                            <div className="flex flex-col gap-2">
                                <p
                                    className={`font-[400] text-[12px] text-white sm:text-[14px] xl:text-[16px] ${styles.fontopensans}`}
                                >
                                    Email Address
                                </p>
                                <p className={`font-[600] text-[13px] text-white sm:text-[15px] xl:text-[20px] ${styles.fontmontserrat}`}>
                                    <span
                                        className="break-all cursor-pointer"
                                        onClick={() => window.open("mailto:info@ritzmediaworld.com", "_blank")}
                                    >
                                        info@ritzmediaworld.com
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Absolute Position Div  */}
                    <div className="absolute bottom-[-16px] right-0 flex h-[125px] w-[125px] flex-col items-center justify-center gap-1 rounded-full border-[1px] border-[#0F1640] bg-white text-center sm:bottom-[-32px] sm:right-[16px] sm:h-[200px] sm:w-[200px] sm:gap-3
                     lg:bottom-[-44px] lg:right-[-15px] 
                     lg:h-[230px] lg:w-[230px] xl:bottom-[-40px] xl:right-[30px] xl:h-[265px] xl:w-[265px] xl:gap-4">
                        <p className={`font-[600] text-[11px] sm:text-[14px] xl:text-[18px] ${styles.fontmontserrat}`}>Follow Us</p>
                        <div className="flex justify-center items-center gap-[6px] sm:gap-3 xl:gap-4">
                            <a href="https://www.facebook.com/ritzmediaworld" target="_blank" className="md:w-[22px] w-[15px] h-[15px] cursor-pointer md:h-[22px] flex justify-center items-center">
                                <MdFacebook className="w-full h-full text-[#1877F2]" />
                            </a>
                            <a href="https://x.com/ritzmediaworld" target="_blank" className="md:w-[22px] w-[15px] h-[15px] cursor-pointer md:h-[22px] flex justify-center items-center">
                                <BsTwitterX className="w-full h-full text-[#000000]" />
                            </a>
                            <a
                                href="https://www.instagram.com/ritzmediaworld"
                                target="_blank"
                                aria-label="Instagram"
                                className="md:w-[22px] w-[15px] h-[15px] cursor-pointer md:h-[22px] flex justify-center items-center"
                            >
                                <img
                                    src="/icons/insta-icn.svg"
                                    alt="Ritz Media World on Instagram"
                                    title="Ritz Media World"
                                    width={22}
                                    height={22}
                                    className="h-full w-full object-contain cursor-pointer"
                                />
                            </a>

                            <a href="https://www.linkedin.com/company/ritzmediaworld" target="_blank" className="md:w-[22px] w-[15px] h-[15px] md:h-[22px] cursor-pointer rounded-full bg-[#007AB9] flex justify-center items-center">
                                <TiSocialLinkedin className="w-full h-full text-white cursor-pointer" />
                            </a>
                            <a href="https://www.youtube.com/@ritzmediaworld" target="_blank" className="md:w-[22px] w-[15px] h-[15px] md:h-[22px] cursor-pointer flex justify-center items-center">
                                <BsYoutube className="w-full h-full text-[#FF0000] cursor-pointer" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Side Container  */}
                <div className="flex w-full flex-col gap-4 lg:flex-1 lg:max-w-[min(100%,384px)] xl:max-w-[538px] xl:flex-none justify-between">
                    {/* Row 1  */}
                    <div>
                        <p
                            className={`font-[600] text-center md:text-left text-[26px] leading-tight sm:text-[30px] lg:text-[34px] xl:text-[40px] ${styles.fontmontserrat}`}
                        >
                            Your Big Idea Starts Here
                        </p>
                        <p className={`mt-2 font-[400] text-center md:text-left text-[14px] leading-relaxed sm:text-[15px] ${styles.fontpoppins}`}>
                            Got a project you&apos;re thinking about? Fill out the form below, & our team will reach out
                            to you soon to make your ideas happen!
                        </p>
                    </div>
                    {/* Row 2  */}
                    <div>
                        <form className="flex flex-col gap-6 xl:gap-8" onSubmit={handleSubmit}>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={`w-full pb-4 border-b-[1px] border-[#0F1640] outline-none placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-[500] ${styles.fontmontserrat}`} placeholder="Your Name" />
                            <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:gap-3">
                                <div className="relative w-full shrink-0 sm:max-w-[min(100%,200px)]">
                                    <select
                                        aria-label="Country calling code"
                                        value={selectedCountry.code}
                                        onChange={(e) => {
                                            const next = CONTACT_COUNTRIES.find((c) => c.code === e.target.value);
                                            if (next) setSelectedCountry(next);
                                        }}
                                        className={`w-full cursor-pointer appearance-none bg-transparent pb-4 pr-8 text-[#5C5C5C] font-[500] text-[14px] border-b-[1px] border-[#0F1640] outline-none ${styles.fontmontserrat}`}
                                    >
                                        {SORTED_CONTACT_COUNTRIES.map((c) => (
                                            <option key={c.code} value={c.code} className="text-[#5C5C5C] font-[500] text-[14px]">
                                                {c.flag} {c.dial_code} {c.name}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-end pb-4">
                                        <ServiceSelectChevron />
                                    </span>
                                </div>
                                <input
                                    ref={phoneInputRef}
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    inputMode="numeric"
                                    autoComplete="tel-national"
                                    maxLength={15}
                                    className={`min-w-0 flex-1 pb-4 border-b-[1px] border-[#0F1640] outline-none placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-[500] ${styles.fontmontserrat}`}
                                    placeholder="Mobile number (without country code)"
                                />
                            </div>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full pb-4 border-b-[1px] border-[#0F1640] outline-none placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-[500] ${styles.fontmontserrat}`} placeholder="Email Address" />
                            <div className="relative w-full">
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleInputChange}
                                    className={`w-full cursor-pointer appearance-none bg-transparent pb-4 pr-8 text-[#5C5C5C] font-[500] text-[14px] border-b-[1px] border-[#0F1640] outline-none ${styles.fontmontserrat}`}
                                >
                                    <option value="" className="text-[#5C5C5C] font-[500] text-[14px]">Select Service</option>
                                    <option value="Digital Marketing" className="text-[#5C5C5C] font-[500] text-[14px]">Digital Marketing</option>
                                    <option value="Creative Services" className="text-[#5C5C5C] font-[500] text-[14px]">Creative Services</option>
                                    <option value="Print Advertising" className="text-[#5C5C5C] font-[500] text-[14px]">Print Advertising</option>
                                    <option value="Radio Advertising" className="text-[#5C5C5C] font-[500] text-[14px]">Radio Advertising</option>
                                    <option value="Content Marketing" className="text-[#5C5C5C] font-[500] text-[14px]">Content Marketing</option>
                                    <option value="Web Development" className="text-[#5C5C5C] font-[500] text-[14px]">Web Development</option>
                                    <option value="Celebrity Endorsements" className="text-[#5C5C5C] font-[500] text-[14px]">Celebrity Endorsements</option>
                                    <option value="Influencer Marketing" className="text-[#5C5C5C] font-[500] text-[14px]">Influencer Marketing</option>
                                    <option value="Real Estate Walkthrough" className="text-[#5C5C5C] font-[500] text-[14px]">Real Estate Walkthrough</option>
                                    <option value="3D Rendering Services" className="text-[#5C5C5C] font-[500] text-[14px]">3D Rendering Services</option>
                                </select>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-end pb-4">
                                    <ServiceSelectChevron />
                                </span>
                            </div>
                            <input type="text"
                                name="query"
                                value={formData.query}
                                onChange={handleInputChange}
                                className={`w-full mt-4 pb-4 border-b-[1px] border-[#0F1640] outline-none placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-[500] ${styles.fontmontserrat}`}
                                placeholder="Write Message"
                            />

                            {/* H Captcha  */}
                            <div className="flex w-full justify-center md:justify-start overflow-x-auto max-md:scale-[0.9] max-md:origin-left">
                                <HCaptcha
                                    sitekey={HCAPTCHA_SITEKEY}
                                    onVerify={handleCaptchaVerify}
                                    ref={captchaRef}
                                />
                            </div>
                            <div className="flex justify-center md:justify-start">
                                <button type="submit" disabled={isSubmitting} className="flex justify-between items-center gap-4 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity disabled:cursor-not-allowed disabled:opacity-60">
                                    <p className={`font-[500] text-[16px] xl:text-[18px] ${styles.fontmontserrat}`}>{isSubmitting ? "Submitting..." : "Submit"}</p>
                                    <div className="w-[40px] h-[40px] bg-[#C99237] rounded-full flex justify-center items-center">

                                        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.4276 2.92383L17.1346 9.08052L12.9492 4.01635L19.4276 2.92383Z" fill="white" />
                                            <rect x="2.19672" y="16.7173" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19672 16.7173)" fill="white" />
                                        </svg>

                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {popupMessage && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl">
                        <p className={`text-base font-[600] ${popupType === "success" ? "text-green-700" : "text-red-700"} ${styles.fontmontserrat}`}>
                            {popupType === "success" ? "Success" : "Error"}
                        </p>
                        <p className={`mt-2 text-sm text-[#222] ${styles.fontpoppins}`}>{popupMessage}</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setPopupMessage(null)}
                                className="rounded-md bg-[#0F1640] px-4 py-2 text-sm text-white"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}


export default Section6;