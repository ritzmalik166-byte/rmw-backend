"use client";
import React, { useRef, useState } from "react";
import styles from "./sideButton.module.css";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import toast from "react-hot-toast";

const SideButton: React.FC = () => {
    const captchaRef = useRef<HCaptcha | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleCaptchaVerify = (token: string) => {
        setCaptchaToken(token);
    };

    const toggleForm = () => setShowForm(!showForm);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!captchaToken) {
            toast.error("Please complete the captcha");
            return;
        }

        const form = formRef.current;
        if (!form) return;

        const formData = new FormData(form);
        const phone = formData.get("phone") as string;
        
        // Validate repetitive digits
        if (phone) {
            const digitsOnly = phone.replace(/\D/g, "");
            if (digitsOnly.length >= 10) {
                const firstDigit = digitsOnly[0];
                if (digitsOnly.split('').every(digit => digit === firstDigit)) {
                    toast.error("Please enter a valid phone number");
                    return;
                }
            }
        }

        const service = formData.get("service") as string;
        const query = formData.get("query") as string;
        const message = `Service: ${service}\n\nQuery: ${query}`;

        const data = {
            etype: "ContactUs",
            name: formData.get("name"),
            phone: phone,
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

                // Reset form and captcha
                form.reset();
                setCaptchaToken(null);
                captchaRef.current?.resetCaptcha();
                setShowForm(false);
            } else {
                toast.error(result.message || "Submission failed. Try again.");
            }
        } catch (error) {
            console.log("Submission error:", error);
            toast.error("Server error. Please try again later.");
        }
    };

    return (
        <>
            <div className={styles.growBusinessBtn} onClick={toggleForm}>
                FREE CONSULTANCY
            </div>

            <div
                className={`${styles.modalOverlay} ${showForm ? styles.show : ""}`}
                onClick={toggleForm}
            >
                <div
                    className={`${styles.modalContent} ${
                        showForm ? styles.slideIn : styles.slideOut
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className={styles.closeBtn}
                        style={{ fontSize: "40px" }}
                        onClick={toggleForm}
                    >
                        &times;
                    </button>

                    <h2 style={{ fontSize: "28px" }}>
                        WE&apos;LL CONNECT WITH YOU SHORTLY
                    </h2>

                    <form
                        className={styles.queryForm}
                        onSubmit={handleSubmit}
                        ref={formRef}
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Your Phone"
                            required
                            inputMode="numeric"
                            pattern="[0-9]{10}"
                            maxLength={10}
                            onInput={(e) => {
                                e.currentTarget.value =
                                    e.currentTarget.value.replace(
                                        /[^0-9]/g,
                                        "",
                                    );
                            }}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                        />
                        <select name="service" required>
                            <option value="">Select Service</option>
                            <option>Digital Marketing</option>
                            <option>Creative Services</option>
                            <option>Print Advertising</option>
                            <option>Radio Advertising</option>
                            <option>Content Marketing</option>
                            <option>Web Designing & Development</option>
                            <option>Celebrity Endorsements</option>
                            <option>Influencer Marketing</option>
                        </select>
                        <textarea
                            name="query"
                            placeholder="Your Query"
                            style={{ resize: "none", height: "100px" }}
                            required
                        />

                        <div className="mb-4 text-center">
                            <HCaptcha
                                sitekey="e4a44c7a-13c4-4534-b210-d41242d2d262"
                                onVerify={handleCaptchaVerify}
                                ref={captchaRef}
                            />
                        </div>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SideButton;
