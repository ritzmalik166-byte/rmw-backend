"use client";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";

function Section9() {
    const [loader, setLoader] = useState<boolean>(true);
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [phoneError, setPhoneError] = useState("");

    const [modal, setModal] = useState<{
        open: boolean;
        status: "success" | "error";
        message: string;
    }>({
        open: false,
        status: "success",
        message: "",
    });

    const validatePhone = (phoneNumber: string): string => {
        const digitsOnly = phoneNumber.replace(/\D/g, "");

        if (!phoneNumber.trim()) {
            return "Phone number is required";
        }

        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(phoneNumber)) {
            return "Phone number can only contain digits, spaces, +, -, and ()";
        }

        if (digitsOnly.length < 10) {
            return "Phone number must have at least 10 digits";
        }

        if (digitsOnly.length > 13) {
            return "Phone number cannot exceed 13 digits";
        }

        // Check for repetitive digits (e.g., 9999999999, 8888888888, etc.)
        if (digitsOnly.length >= 10) {
            const firstDigit = digitsOnly[0];
            if (digitsOnly.split('').every(digit => digit === firstDigit)) {
                return "Please enter a valid phone number";
            }
        }

        if (digitsOnly.length === 10) {
            if (!/^[6-9]/.test(digitsOnly)) {
                return "Indian mobile numbers should start with 6, 7, 8, or 9";
            }
        } else if (digitsOnly.length === 11) {
            if (!/^0[6-9]/.test(digitsOnly)) {
                return "Invalid phone number format";
            }
        } else if (digitsOnly.length === 12 || digitsOnly.length === 13) {
            if (!/^91[6-9]/.test(digitsOnly)) {
                return "Invalid country code. Use +91 for India";
            }
        }

        return "";
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPhone(value);

        if (phoneError) {
            setPhoneError("");
        }
    };

    const handlePhoneBlur = () => {
        const error = validatePhone(phone);
        setPhoneError(error);
    };

    const downloadPDF = () => {
        const link = document.createElement("a");
        link.href = "/RMWCaseStudies_250327_081936.pdf";
        link.download = "RMWCaseStudies_250327_081936.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault();

        const phoneValidationError = validatePhone(phone);
        if (phoneValidationError) {
            setPhoneError(phoneValidationError);
            setModal({
                open: true,
                status: "error",
                message: phoneValidationError,
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const enquiryData = {
                etype: "HomePageDownload",
                name: "Home Page Visitor",
                email: "homepage@ritzmediaworld.com",
                phone: phone.trim(),
                message: "Enquiry from Home Page - 2025 Brand Impact Report Download Request",
                category: "Brand Impact Report Download",
            };

            const response = await fetch("/api/system-settings/contact-enquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(enquiryData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setModal({
                    open: true,
                    status: "success",
                    message: "Thank you! Your enquiry has been submitted successfully. The PDF will download shortly.",
                });

                setPhone("");
                setPhoneError("");

                setTimeout(() => {
                    downloadPDF();
                }, 500);
            } else {
                setModal({
                    open: true,
                    status: "error",
                    message: result.error || "Failed to submit enquiry. Please try again.",
                });
            }
        } catch (error) {
            console.error("Enquiry submission error:", error);
            setModal({
                open: true,
                status: "error",
                message: "Due to internal server errors your enquiry couldn't be sent. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (modal.open && modal.status === "success") {
            const timer = setTimeout(() => {
                setModal({ ...modal, open: false });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [modal.open, modal.status]);



    return (
        <section className="w-full bg-white py-[70px] flex flex-col gap-6">
            {/* Row 2  */}
            <div className={`w-full flex ${styles.containerWidth} flex-col xl:flex-row justify-between gap-6`}>
                {/* Left Side Container  */}
                <div className="w-full xl:flex-1 min-h-[500px] xl:h-[526px] bg-[#F7F7F7] flex flex-col justify-around px-1 lg:px-8 py-6 sm:py-7 lg:py-8 md:px-6">
                    <div className="text-center md:text-left mb-2 md:mb-0">
                        <p
                            className="uppercase font-[600] text-[14px] sm:text-[15px] lg:text-[16px] text-[#C99237]"
                            style={{
                                fontFamily: "OpenSansSemiBold",
                            }}
                        >
                            Free Resource
                        </p>
                        <p className="font-[700] text-[16px] lg:text-[24px] text-center md:text-left mb-2 md:mb-0">
                            Download Our
                        </p>
                        <h2
                            className="font-[700] text-[21px]  lg:text-[36px]"
                            style={{
                                fontFamily: "MontserratBold",
                            }}
                        >
                            2026 Brand Impact Report
                        </h2>
                    </div>


                    <p
                        className="font-[400] text-[13px]  lg:text-[16px] text-center md:text-left mb-2 md:mb-0"
                        style={{
                            fontFamily: "PoppinsRegular",
                        }}
                    >
                        Get exclusive insights into real estate and lifestyle brand marketing trends, strategies, and ROI benchmarks for 2026.
                    </p>

                    <ul
                        className="font-[400] text-[13px] md:text-[15px] lg:text-[16px] list-disc pl-4 flex flex-col gap-2 sm:gap-3 text-justify md:text-left mb-4 md:mb-0"
                        style={{
                            fontFamily: "PoppinsRegular",
                        }}
                    >
                        <li>Industry benchmarks for real estate marketing ROI</li>
                        <li>Proven strategies for UHNI audience targeting</li>
                        <li> 2025 digital and print advertising trends</li>
                        <li>Case studies with measurable results</li>
                    </ul>

                    <form onSubmit={handleDownload} className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-3">
                            <div className="flex-1 relative">
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    onBlur={handlePhoneBlur}
                                    placeholder="Enter your phone (e.g., +91 9220516777)"
                                    required
                                    className={`w-full sm:w-[319px] h-[48px] sm:h-[50px] border-1 rounded-[4px] bg-white px-4 placeholder:text-[#000000] placeholder:font-[400] placeholder:text-[13px] sm:placeholder:text-[14px] ${phoneError
                                        ? "border-[#EF4444]"
                                        : "border-[#DAD4D4]"
                                        }`}
                                />
                                {phoneError && (
                                    <p className="absolute top-full left-0 mt-1 text-[12px] text-[#EF4444] font-[400]">
                                        {phoneError}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-[209px] h-[48px] sm:h-[50px] bg-[#C99237] cursor-pointer text-white font-[700] text-[14px] sm:text-[14.5px] lg:text-[15px] flex justify-center items-center gap-2 rounded-[5px] hover:bg-[#B8822F] transition-colors s1-btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    fontFamily: "PoppinsRegular",
                                }}
                            >
                                <p className="text-white">{isSubmitting ? "Submitting..." : "Free Download"}</p>
                                <Download className="w-[18px] h-[18px] sm:w-[19px] sm:h-[19px]" />
                            </button>
                        </div>
                        <p
                            className="font-[400] text-[13px] sm:text-[14px] text-[#6E6E6E] text-center md:text-left"
                            style={{
                                fontFamily: "PoppinsRegular",
                            }}
                        >
                            No spam, unsubscribe anytime. We respect your privacy.
                        </p>
                    </form>
                </div>

                {/* Right Side Container  */}
                <div className="w-full lg:w-[100%] xl:w-[603px] lg:h-[526px] border-1 border-[#D4D4D4] lg:bg-[url('/home-v3/s8/s8img.png')] bg-cover bg-center px-6 sm:px-7 lg:px-8 py-6 sm:py-7 lg:py-8 flex flex-col gap-3 sm:gap-4">
                    <h2
                        className="font-[700] text-[24px] sm:text-[28px] lg:text-[36px] text-center md:text-left"
                        style={{
                            fontFamily: "MontserratBold",
                        }}
                    >
                        Get a Free <span className="text-[#C99237]">Brand Audit</span>{" "}
                    </h2>

                    <p
                        className="font-[400] text-[14px] md:text-[15px] lg:text-[16px] text-center md:text-left"
                        style={{
                            fontFamily: "PoppinsRegular",
                        }}
                    >
                        Let our experts analyze your current brand positioning and provide
                        actionable recommendations.
                    </p>

                    <ul
                        className="list-disc pl-4 flex flex-col gap-2 sm:gap-3 font-[400] text-[13px] md:text-[15px] lg:text-[16px] text-justify md:text-left"
                        style={{
                            fontFamily: "PoppinsRegular",
                        }}
                    >
                        <li>Comprehensive brand analysis</li>
                        <li>Competitor positioning review</li>
                        <li>Growth opportunity identification</li>
                        <li>Customized strategy roadmap</li>
                    </ul>

                    <div className="flex border-b-1 border-b-black items-center justify-between cursor-pointer pb-2 w-full sm:w-[224px] lg:mt-5 text-center md:text-left">
                        <Link
                            title="Request A Free Audit"
                            href={"https://ritzmediaworld.com/contact.html"}
                            target="_blank"
                            className="font-[600] text-[14px] sm:text-[15px] lg:text-[16px] text-black"
                            style={{
                                fontFamily: "MontserratSemiBold",
                            }}
                        >
                            Request A Free Audit
                        </Link>
                        <img
                            src="/home-v3/s3/rhgt.png"
                            alt="RMW"
                            className="w-[24px] h-[24px] sm:w-[25px] sm:h-[25px] lg:w-[27px] lg:h-[27px]"
                        />
                    </div>
                </div>
            </div>

            {/* Row 3  */}
            <div className={`w-full flex ${styles.containerWidth} justify-center items-center`}>
                {/* Center Align Container  */}
                <div className="flex flex-col gap-2 sm:gap-3 justify-center text-center items-center bg-[#F5F5F5] min-h-[200px] sm:min-h-[240px] lg:min-h-[279px] w-full px-4 sm:px-6 lg:px-0 py-8 sm:py-10 lg:py-0">
                    <h2
                        className="font-[800] text-[19px] md:text-[28px] lg:text-[36px]"
                        style={{
                            fontFamily: "MontserratExtraBold",
                        }}
                    >
                        Ready to Elevate Your Brand?
                    </h2>
                    <p
                        className="font-[400] text-[16px] md:text-[24px] lg:text-[30px]"
                        style={{
                            fontFamily: "OpenSansRegular",
                        }}
                    >
                        Let's discuss your next brand-elevating campaign
                    </p>
                    <button
                        onClick={() => window.open("https://ritzmediaworld.com/contact.html", "_blank")}
                        className="w-full sm:w-[260px] lg:w-[282px] h-[48px] sm:h-[50px] lg:h-[54px] mt-4 bg-[#C99237] cursor-pointer text-white font-[700] text-[14px] sm:text-[14.5px] lg:text-[15px] rounded-[5px] hover:bg-[#B8822F] transition-colors  s1-btn-gold"
                        style={{
                            fontFamily: "OpenSansBold",
                        }}
                    >
                        <p className="text-white">Schedule Free Consultation</p>
                    </button>
                </div>
            </div>
            {/* Modal */}
            {modal.open && (
                <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-[16px] shadow-2xl max-w-[400px] w-[90%] mx-4 overflow-hidden">
                        {/* Modal Header */}
                        <div className={`px-6 py-4 ${modal.status === "success" ? "bg-[#10B981]" : "bg-[#EF4444]"
                            }`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {modal.status === "success" ? (
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                    <h3 className="text-lg font-semibold text-white">
                                        {modal.status === "success" ? "Success" : "Error"}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setModal({ ...modal, open: false })}
                                    className="text-white hover:text-gray-200 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 py-4">
                            <p className="text-[#374151] text-sm leading-relaxed">
                                {modal.message}
                            </p>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={() => setModal({ ...modal, open: false })}
                                className={`px-4 py-2 rounded-[8px] font-[500] text-sm transition-colors ${modal.status === "success"
                                    ? "bg-[#10B981] text-white hover:bg-[#059669]"
                                    : "bg-[#EF4444] text-white hover:bg-[#DC2626]"
                                    }`}
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

export default Section9;