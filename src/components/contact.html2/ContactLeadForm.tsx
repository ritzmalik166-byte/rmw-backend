"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import toast from "react-hot-toast";
import pageStyles from "./sections/page.module.css";
import {
    CONTACT_COUNTRIES,
    DEFAULT_CONTACT_COUNTRY,
    SORTED_CONTACT_COUNTRIES,
    validateContactPhone,
    type CountryEntry,
} from "@/lib/contactPhoneValidation";

const HCAPTCHA_SITEKEY = "e4a44c7a-13c4-4534-b210-d41242d2d262";

export const CONTACT_SERVICE_OPTIONS = [
    "Digital Marketing",
    "Creative Services",
    "Print Advertising",
    "Radio Advertising",
    "Content Marketing",
    "Web Development",
    "Celebrity Endorsements",
    "Influencer Marketing",
];

type ContactLeadFormProps = {
    variant?: "inline" | "modal";
    onSubmitSuccess?: () => void;
};

export default function ContactLeadForm({
    variant = "inline",
    onSubmitSuccess,
}: ContactLeadFormProps) {
    const captchaRef = useRef<HCaptcha>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] =
        useState<CountryEntry>(DEFAULT_CONTACT_COUNTRY);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitPopup, setSubmitPopup] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const isModal = variant === "modal";

    const rejectInvalidPhone = (message: string) => {
        toast.error(message, { id: "contact-phone-invalid", duration: 4500 });
        phoneInputRef.current?.focus();
    };

    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

    const handleCaptchaVerify = (token: string) => {
        setCaptchaToken(token);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;
        if (!captchaToken) {
            toast.error("Please complete the captcha");
            return;
        }

        const form = e.currentTarget;
        const formData = new FormData(form);
        const nationalRaw = (formData.get("phone") as string) ?? "";
        const nationalDigits = nationalRaw.replace(/\D/g, "");
        const phoneResult = validateContactPhone(nationalDigits, selectedCountry);
        if (!phoneResult.ok) {
            rejectInvalidPhone(phoneResult.error);
            return;
        }
        const phoneE164 = phoneResult.e164;

        const email = ((formData.get("email") as string) ?? "").trim();
        if (!isValidEmail(email)) {
            const msg = "Please enter a valid email address";
            toast.error(msg);
            setSubmitPopup({ type: "error", message: msg });
            return;
        }

        const service = formData.get("service") as string;
        const query = formData.get("query") as string;
        const message = `Service: ${service}\n\nQuery: ${query}`;

        const data = {
            etype: "ContactUs",
            name: formData.get("name"),
            phone: phoneE164,
            email,
            message,
        };

        try {
            setIsSubmitting(true);
            setSubmitPopup(null);
            const response = await fetch(
                "/api/system-settings/contact-enquiry",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                },
            );
            const result = await response.json();

            if (response.ok) {
                const okMsg = result.message || "Query submitted successfully!";
                toast.success(okMsg);
                setSubmitPopup({ type: "success", message: okMsg });
                form.reset();
                setSelectedCountry(DEFAULT_CONTACT_COUNTRY);
                captchaRef.current?.resetCaptcha();
                setCaptchaToken(null);
            } else {
                const errMsg = result.message || "Submission failed. Try again.";
                toast.error(errMsg);
                setSubmitPopup({ type: "error", message: errMsg });
            }
        } catch {
            const errMsg = "Server error. Please try again later.";
            toast.error(errMsg);
            setSubmitPopup({ type: "error", message: errMsg });
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeSubmitPopup = () => {
        const wasSuccess = submitPopup?.type === "success";
        setSubmitPopup(null);
        if (wasSuccess) onSubmitSuccess?.();
    };

    return (
        <>
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className={`flex flex-col ${
                    isModal ? "gap-5" : "gap-8 lg:gap-[10px] xl:gap-8"
                }`}
            >
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        className={`w-full py-2 px-0 bg-transparent border-0 border-b border-[#0F1640] text-base focus:outline-none focus:ring-0 text-[#5C5C5C] placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[60px] ${pageStyles.fontopensans}`}
                    />
                </div>
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-4">
                        <select
                            aria-label="Country calling code"
                            className={`w-full py-2 pr-6 bg-transparent border-0 border-b border-[#0F1640] text-[14px] font-medium text-[#5C5C5C] leading-[20px] focus:border-black focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-no-repeat bg-[length:16px_9px] bg-[position:right_0.25rem_center] ${pageStyles.fontMontserrat}`}
                            style={{
                                backgroundImage:
                                    'url("/varun.icon/down-arrow.svg")',
                            }}
                            value={selectedCountry.code}
                            onChange={(e) => {
                                const next = CONTACT_COUNTRIES.find(
                                    (c) => c.code === e.target.value,
                                );
                                if (next) setSelectedCountry(next);
                            }}
                        >
                            {SORTED_CONTACT_COUNTRIES.map((c) => (
                                <option key={c.code} value={c.code}>
                                    {c.flag} {c.dial_code}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-8">
                        <input
                            ref={phoneInputRef}
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            required
                            inputMode="numeric"
                            autoComplete="tel-national"
                            maxLength={15}
                            onInput={(e) => {
                                e.currentTarget.value =
                                    e.currentTarget.value.replace(
                                        /[^0-9]/g,
                                        "",
                                    );
                            }}
                            className={`w-full py-2 px-0 bg-transparent border-0 border-b border-[#0F1640] text-[#5C5C5C] text-base focus:border-black focus:outline-none focus:ring-0 placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-medium ${pageStyles.fontopensans}`}
                        />
                    </div>
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        autoComplete="email"
                        className={`w-full py-2 px-0 bg-transparent border-0 border-b border-[#0F1640] text-[#5C5C5C] text-base focus:border-black focus:outline-none focus:ring-0 placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-medium ${pageStyles.fontopensans}`}
                    />
                </div>
                <div>
                    <select
                        name="service"
                        required
                        defaultValue=""
                        className={`w-full py-2 pr-8 bg-transparent border-0 border-b border-[#0F1640] text-[14px] font-medium text-[#5C5C5C] leading-[20px] focus:border-black focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-no-repeat bg-[length:16px_9px] bg-[position:right_0.25rem_center] ${pageStyles.fontMontserrat}`}
                        style={{
                            backgroundImage:
                                'url("/varun.icon/down-arrow.svg")',
                        }}
                    >
                        <option value="" disabled>
                            Select Service
                        </option>
                        {CONTACT_SERVICE_OPTIONS.map((opt) => (
                            <option
                                key={opt}
                                value={opt}
                                className="text-black font-medium"
                            >
                                {opt}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <textarea
                        name="query"
                        placeholder="Write Message"
                        required
                        rows={isModal ? 3 : undefined}
                        className={`w-full py-2 px-0 bg-transparent border-0 border-b border-[#0F1640] text-[#5C5C5C] text-[14px] focus:border-black focus:outline-none focus:ring-0 placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-medium ${pageStyles.fontMontserrat} ${isModal ? "min-h-[72px]" : "leading-[10px] mt-0 lg:mt-5"}`}
                    />
                </div>
                <div
                    className={`flex flex-wrap items-center mt-3 ${
                        isModal ? "justify-center" : "justify-center lg:justify-start"
                    }`}
                >
                    <HCaptcha
                        sitekey={HCAPTCHA_SITEKEY}
                        onVerify={handleCaptchaVerify}
                        ref={captchaRef}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex w-fit items-center gap-5 text-base font-semibold text-black bg-transparent border-0 cursor-pointer hover:opacity-85 transition-opacity mt-3 disabled:opacity-60 disabled:cursor-not-allowed ${pageStyles.fontMontserrat} ${
                        isModal ? "mx-auto" : "mx-auto lg:mx-0"
                    }`}
                >
                    <span
                        className={`font-medium text-[18px] leading-[46px] text-black ${pageStyles.fontMontserrat}`}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </span>
                    <span className="w-[40px] h-[40px] rounded-full bg-[#C99237] flex items-center justify-center text-white flex-shrink-0">
                        <Image
                            src="/varun.icon/submitbuttonarrow.svg"
                            alt="Submit arrow"
                            title="Submit arrow"
                            width={22.07}
                            height={7.59}
                        />
                    </span>
                </button>
            </form>

            {isSubmitting && (
                <div className="fixed inset-0 z-[10001] bg-black/65 flex items-center justify-center px-4">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-2xl">
                        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#E5E7EB] border-t-[#0F1640]" />
                        <p
                            className={`text-[20px] font-semibold text-[#0F1640] ${pageStyles.fontMontserrat}`}
                        >
                            Submitting Your Query
                        </p>
                        <p
                            className={`mt-2 text-[14px] text-[#5C5C5C] ${pageStyles.fontopensans}`}
                        >
                            Please wait while we process your request.
                        </p>
                    </div>
                </div>
            )}

            {submitPopup && !isSubmitting && (
                <div className="fixed inset-0 z-[10001] bg-black/65 flex items-center justify-center px-4">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-2xl">
                        <div
                            className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-white ${
                                submitPopup.type === "success"
                                    ? "bg-green-600"
                                    : "bg-red-600"
                            }`}
                        >
                            {submitPopup.type === "success" ? "✓" : "!"}
                        </div>
                        <p
                            className={`text-[20px] font-semibold ${
                                submitPopup.type === "success"
                                    ? "text-green-700"
                                    : "text-red-700"
                            } ${pageStyles.fontMontserrat}`}
                        >
                            {submitPopup.type === "success"
                                ? "Submitted Successfully"
                                : "Submission Failed"}
                        </p>
                        <p
                            className={`mt-2 text-[14px] text-[#5C5C5C] ${pageStyles.fontopensans}`}
                        >
                            {submitPopup.message}
                        </p>
                        <button
                            type="button"
                            onClick={closeSubmitPopup}
                            className={`mt-5 inline-flex items-center justify-center rounded-full bg-[#0F1640] px-5 py-2 text-sm font-medium text-white ${pageStyles.fontMontserrat}`}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
