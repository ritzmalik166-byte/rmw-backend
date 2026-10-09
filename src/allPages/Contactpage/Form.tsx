// export default Form;

"use client"; //changed

import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import {
    CONTACT_COUNTRIES,
    DEFAULT_CONTACT_COUNTRY,
    SORTED_CONTACT_COUNTRIES,
    validateContactPhone,
    type CountryEntry,
} from "@/lib/contactPhoneValidation";

import { useSplitText } from "@/hooks/useSplitText"; //changed

const Form = () => {
    const textRefs = useSplitText(); //changed
    const captchaRef = useRef<HCaptcha>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const [selectedCountry, setSelectedCountry] =
        useState<CountryEntry>(() => DEFAULT_CONTACT_COUNTRY);
    const phoneInputRef = useRef<HTMLInputElement>(null);

    const rejectInvalidPhone = (message: string) => {
        toast.error(message, {
            id: "contact-phone-invalid",
            duration: 5000,
        });
        phoneInputRef.current?.focus();
    };

    const handleCaptchaVerify = (token: string) => {
        setCaptchaToken(token);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!captchaToken) {
            toast.error("Please complete the captcha");
            return;
        }

        const form = e.currentTarget;
        const formData = new FormData(form);
        const nationalRaw = (formData.get("phone") as string) ?? "";
        const nationalDigits = nationalRaw.replace(/\D/g, "");
        const phoneResult = validateContactPhone(
            nationalDigits,
            selectedCountry,
        );
        if (!phoneResult.ok) {
            rejectInvalidPhone(phoneResult.error);
            return;
        }

        const phoneE164 = phoneResult.e164;

        const service = formData.get("service") as string;
        const query = formData.get("query") as string;
        const message = `Service: ${service}\n\nQuery: ${query}`;

        const data = {
            etype: "ContactUs",
            name: formData.get("name"),
            phone: phoneE164,
            email: formData.get("email"),
            message,
        };

        try {
            const response = await fetch(
                "/api/system-settings/contact-enquiry",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );

            const result = await response.json();

            if (response.ok) {
                toast.success(
                    result.message || "Query submitted successfully!",
                );

                form.reset();
                setSelectedCountry(DEFAULT_CONTACT_COUNTRY);
                captchaRef.current?.resetCaptcha();
                setCaptchaToken(null);
            } else {
                toast.error(result.message || "Submission failed. Try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Server error. Please try again later.");
        }
    };

    return (
        <>
            <div className="tp-contact__area" style={{ marginTop: "30px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6">
                            <div className="tp-contact__left pr-20 pl-20">
                                <div className="tp-contact__title-box mb-75 ">
                                    <h2
                                        ref={(el) => {
                                            if (el) textRefs.current.push(el);
                                        }}
                                        className="tp-section-title tp-split__text tp-split__in-right mb-35 text-black"
                                        style={{ perspective: "400px" }}
                                    >
                                        <div
                                            ref={(el) => {
                                                if (el)
                                                    textRefs.current.push(el);
                                            }}
                                            className="tp-split__line"
                                            style={{
                                                display: "block",
                                                textAlign: "start",
                                                position: "relative",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    position: "relative",
                                                    display: "inline-block",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        display: "inline-block",
                                                        translate: "none",
                                                        rotate: "none",
                                                        scale: "none",
                                                        transform:
                                                            "translate(0px, 0px)",
                                                        opacity: 1,
                                                    }}
                                                >
                                                    A
                                                </div>
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        display: "inline-block",
                                                        translate: "none",
                                                        rotate: "none",
                                                        scale: "none",
                                                        transform:
                                                            "translate(0px, 0px)",
                                                        opacity: 1,
                                                    }}
                                                >
                                                    s
                                                </div>
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        display: "inline-block",
                                                        translate: "none",
                                                        rotate: "none",
                                                        scale: "none",
                                                        transform:
                                                            "translate(0px, 0px)",
                                                        opacity: 1,
                                                    }}
                                                >
                                                    k{" "}
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    position: "relative",
                                                    display: "inline-block",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        display: "inline-block",
                                                        translate: "none",
                                                        rotate: "none",
                                                        scale: "none",
                                                        transform:
                                                            "translate(0px, 0px)",
                                                        opacity: 1,
                                                    }}
                                                >
                                                    B
                                                </div>
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        display: "inline-block",
                                                        translate: "none",
                                                        rotate: "none",
                                                        scale: "none",
                                                        transform:
                                                            "translate(0px, 0px)",
                                                        opacity: 1,
                                                    }}
                                                >
                                                    o
                                                </div>
                                            </div>
                                            <span>
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        display: "inline-block",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        l
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        d
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        l
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        y,{" "}
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        A
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        n
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        d{" "}
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        R
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        e
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        c
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        e
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        i
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        v
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        e{" "}
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        B
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        r
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        i
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        l
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        l
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        i
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        a
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        n
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        t
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        l
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            display:
                                                                "inline-block",
                                                            translate: "none",
                                                            rotate: "none",
                                                            scale: "none",
                                                            transform:
                                                                "translate(0px, 0px)",
                                                            opacity: 1,
                                                        }}
                                                    >
                                                        y
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                    </h2>
                                    <p
                                        className="wow tpfadeUp animated text-black"
                                        data-wow-duration=".9s"
                                        data-wow-delay=".3s"
                                        style={{
                                            visibility: "visible",
                                            animationDuration: "0.9s",
                                            animationDelay: "0.3s",
                                        }}
                                    >
                                        You’ve got a project, an idea, or a
                                        marketing emergency that needs our
                                        genius intervention? Well, we’ve seen
                                        them all. Let’s get in touch and fall in
                                        love. All you need to do is fill out the
                                        details below.
                                    </p>
                                </div>
                                <div
                                    className="tp-contact__content d-flex align-items-center wow tpfadeUp animated"
                                    data-wow-duration=".9s"
                                    data-wow-delay=".5s"
                                    style={{
                                        visibility: "visible",
                                        animationDuration: "0.9s",
                                        animationDelay: "0.5s",
                                        justifyContent: "space-between", //changed
                                    }}
                                >
                                    <div className="tp-contact__text ">
                                        <h3 className="tp-contact__title text-black">
                                            Contact
                                        </h3>
                                        <div
                                            className="d-flex align-items-center mb-1"
                                            style={{ gap: "10px" }}
                                        >
                                            <a
                                                href="tel:+919220516777"
                                                title="Call Ritz Media World"
                                                aria-label="Call Ritz Media World"
                                                className="d-inline-flex flex-shrink-0"
                                            >
                                                <img
                                                    src="/contact/phone.svg"
                                                    alt="Phone"
                                                    title="Call Ritz Media World"
                                                    width={22}
                                                    height={22}
                                                />
                                            </a>
                                            <a
                                                href="tel:+919220516777"
                                                className="tp-contact__title-sm text-black mb-0"
                                            >
                                                +91 9220516777
                                            </a>
                                        </div>
                                        <div
                                            className="d-flex align-items-center"
                                            style={{ gap: "10px" }}
                                        >
                                            <a
                                                href="https://wa.me/917290002168"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="WhatsApp Ritz Media World"
                                                aria-label="WhatsApp Ritz Media World"
                                                className="d-inline-flex flex-shrink-0"
                                            >
                                                <img
                                                    src="/contact/whatsapp.png"
                                                    alt="WhatsApp"
                                                    title="WhatsApp Ritz Media World"
                                                    width={22}
                                                    height={22}
                                                />
                                            </a>
                                            <a
                                                href="https://wa.me/917290002168"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="tp-contact__title-sm text-black mb-0"
                                            >
                                                +91 7290002168
                                            </a>
                                        </div>
                                    </div>
                                    <div className="tp-contact__email">
                                        <h3 className="tp-contact__title text-black">
                                            Email
                                        </h3>
                                        <a
                                            href="mailto:info@ritzmediaworld.com"
                                            className="tp-contact__title-sm text-black"
                                        >
                                            info@ritzmediaworld.com
                                        </a>
                                    </div>
                                </div>
                                <div
                                    className="tp-contact__content d-flex align-items-center wow tpfadeUp animated"
                                    data-wow-duration=".9s"
                                    data-wow-delay=".7s"
                                    style={{
                                        visibility: "visible",
                                        animationDuration: "0.9s",
                                        animationDelay: "0.7s",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div className=" tp-contact__adress">
                                        <h3 className="tp-contact__title text-black">
                                            Address
                                        </h3>
                                        <div className="tp-contact__title-sm text-black">
                                            402 – 404 , 4th floor Corporate
                                            Park, <br /> Tower A1 Sector 142
                                            ,Noida
                                        </div>
                                    </div>
                                    <div className="tp-contact__social">
                                        <h3 className="tp-contact__title text-black">
                                            Follow
                                        </h3>
                                        <div className="tp-contact__social-link">
                                            <Link
                                                title="Facebook"
                                                className="fbI"
                                                href="https://www.facebook.com/ritzmediaworld/"
                                            >
                                                <i aria-hidden="true">
                                                    <FaFacebookF />
                                                </i>
                                            </Link>
                                            <Link
                                                title="Instagram"
                                                className="inst"
                                                href="https://www.instagram.com/ritzmediaworld/"
                                            >
                                                <i aria-hidden="true">
                                                    <FaInstagram />
                                                </i>
                                            </Link>
                                            <Link
                                                title="Twitter"
                                                className="twt"
                                                href="https://x.com/i/flow/login?redirect_after_login=%2Fritzmediaworld"
                                                target="http://1"
                                                rel="http://1"
                                            >
                                                <i aria-hidden="true">
                                                    <FaXTwitter />
                                                </i>
                                            </Link>
                                            <Link
                                                title="LinkedIn"
                                                className="linked"
                                                href="https://www.linkedin.com/company/ritzmediaworld/?originalSubdomain=in"
                                            >
                                                <i aria-hidden="true">
                                                    <FaLinkedin />
                                                </i>
                                            </Link>
                                            <Link
                                                title="YouTube"
                                                className="ytb"
                                                href="https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia"
                                                target="http://1"
                                                rel="http://1"
                                            >
                                                <i aria-hidden="true">
                                                    <FaYoutube />
                                                </i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 p-0">
                            <div
                                className="tp-contact__inner wow tpfadeUp animated"
                                data-wow-duration=".9s"
                                data-wow-delay=".9s"
                                style={{
                                    visibility: "visible",
                                    animationDuration: "0.9s",
                                    animationDelay: "0.9s",
                                    borderRadius: "20px",
                                    background: "white",
                                    border: "2px solid black",
                                }}
                            >
                                <div id="contact-form">
                                    <div
                                        className="wpcf7 js"
                                        id="wpcf7-f990-p70-o1"
                                        lang="en-US"
                                        dir="ltr"
                                        data-wpcf7-id="990"
                                    >
                                        <div className="screen-reader-response">
                                            <p
                                                role="status"
                                                aria-live="polite"
                                                aria-atomic="true"
                                            ></p>
                                            <ul></ul>
                                        </div>
                                        <form
                                            onSubmit={handleSubmit}
                                            className="wpcf7-form init"
                                        >
                                            <div className="postbox__comment-form">
                                                <div className="row">
                                                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                                                        <div className="postbox__comment-input mb-35">
                                                            <input
                                                                className="inputText"
                                                                style={{
                                                                    background:
                                                                        "white",
                                                                }}
                                                                placeholder="Your Name"
                                                                type="text"
                                                                name="name"
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                                                        <div className="postbox__comment-input mb-35">
                                                            <input
                                                                className="inputText"
                                                                style={{
                                                                    background:
                                                                        "white",
                                                                }}
                                                                placeholder="Email Address"
                                                                type="email"
                                                                name="email"
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-xxl-4 col-xl-4 col-lg-4">
                                                        <div className="postbox__comment-input mb-35">
                                                            <select
                                                                aria-label="Country calling code"
                                                                className="inputText"
                                                                style={{
                                                                    background:
                                                                        "white",
                                                                }}
                                                                value={
                                                                    selectedCountry.code
                                                                }
                                                                onChange={(e) => {
                                                                    const next =
                                                                        CONTACT_COUNTRIES.find(
                                                                            (c) =>
                                                                                c.code ===
                                                                                e.target
                                                                                    .value,
                                                                        );
                                                                    if (next) {
                                                                        setSelectedCountry(
                                                                            next,
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                {SORTED_CONTACT_COUNTRIES.map(
                                                                    (c) => (
                                                                        <option
                                                                            key={
                                                                                c.code
                                                                            }
                                                                            value={
                                                                                c.code
                                                                            }
                                                                        >
                                                                            {
                                                                                c.flag
                                                                            }{" "}
                                                                            {
                                                                                c.dial_code
                                                                            }{" "}
                                                                            {
                                                                                c.name
                                                                            }
                                                                        </option>
                                                                    ),
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-xxl-8 col-xl-8 col-lg-8">
                                                        <div className="postbox__comment-input mb-35">
                                                            <input
                                                                ref={
                                                                    phoneInputRef
                                                                }
                                                                className="inputText"
                                                                style={{
                                                                    background:
                                                                        "white",
                                                                }}
                                                                placeholder="Mobile number (without country code)"
                                                                type="tel"
                                                                name="phone"
                                                                required
                                                                inputMode="numeric"
                                                                autoComplete="tel-national"
                                                                maxLength={15}
                                                                onInput={(
                                                                    e,
                                                                ) => {
                                                                    e.currentTarget.value =
                                                                        e.currentTarget.value.replace(
                                                                            /[^0-9]/g,
                                                                            "",
                                                                        );
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Dropdown added here */}
                                                    <div className="col-xxl-12">
                                                        <div className="postbox__comment-input mb-35">
                                                            <select
                                                                name="service"
                                                                required
                                                                className="inputText"
                                                                style={{
                                                                    background:
                                                                        "white",
                                                                }}
                                                            >
                                                                <option value="">
                                                                    Select
                                                                    Service
                                                                </option>
                                                                <option>
                                                                    Digital
                                                                    Marketing
                                                                </option>
                                                                <option>
                                                                    Creative
                                                                    Services
                                                                </option>
                                                                <option>
                                                                    Print
                                                                    Advertising
                                                                </option>
                                                                <option>
                                                                    Radio
                                                                    Advertising
                                                                </option>
                                                                <option>
                                                                    Content
                                                                    Marketing
                                                                </option>
                                                                <option>
                                                                    Web
                                                                    Designing &
                                                                    Development
                                                                </option>
                                                                <option>
                                                                    Celebrity
                                                                    Endorsements
                                                                </option>
                                                                <option>
                                                                    Influencer
                                                                    Marketing
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-xxl-12">
                                                        <div className="postbox__comment-input mb-20">
                                                            <textarea
                                                                className="textareaText"
                                                                style={{
                                                                    background:
                                                                        "white",
                                                                }}
                                                                placeholder="Write Message"
                                                                name="query"
                                                                rows={3}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-xxl-12 mb-4 text-center">
                                                        <HCaptcha
                                                            sitekey="e4a44c7a-13c4-4534-b210-d41242d2d262"
                                                            onVerify={
                                                                handleCaptchaVerify
                                                            }
                                                            ref={captchaRef}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="tp-contact__action">
                                                <button
                                                    type="submit"
                                                    className="tp-btn-secondary"
                                                    style={{
                                                        padding: "20px 30px",
                                                        background: "#10153f",
                                                        color: "white",
                                                    }}
                                                >
                                                    Submit{" "}
                                                    {/* <span>
                                                        <i className="far fa-angle-right"></i>
                                                    </span> */}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28052.52086266602!2d77.4128188!3d28.49264095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce530165cc6c1%3A0x9ea28df462e9945e!2sRitz%20Media%20World-Digital%20Marketing%20Agency%20in%20Noida%20%7C%20Social%20Media%20Agency%20in%20Noida%20%7C%20Newspaper%20%26%20Radio%20Ad%20Agency%20in%20Noida!5e0!3m2!1sen!2sin!4v1742542850888!5m2!1sen!2sin"
                width="800"
                height="600"
                
                style={{ border: 0, width: "100vw" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </>
    );
};

export default Form;
