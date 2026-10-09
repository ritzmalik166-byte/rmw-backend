"use client";
import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";
import { BsArrowRight } from "react-icons/bs";

type MarketReport = {
    id: string;
    label: string;
    subtitle: string;
    filePath: string;
    downloadName: string;
};

const MARKET_REPORTS: MarketReport[] = [
    {
        id: "noida",
        label: "Noida Market Intelligence Reports",
        subtitle: "June 2026 outlook",
        filePath: "/uploads/Noida outlook RMW report .pdf",
        downloadName: "RMW Noida Market Intelligence Reports.pdf",
    },
    {
        id: "ghaziabad",
        label: "Ghaziabad Market Intelligence Reports",
        subtitle: "Regional growth & investment corridors",
        filePath: "/RMW Ghaziabad Report copy (1).pdf",
        downloadName: "RMW Ghaziabad Market Intelligence Reports.pdf",
    },
    {
        id: "gurgaon",
        label: "Gurgaon Market Intelligence Reports",
        subtitle: "Residential & commercial market insights",
        filePath: "/RMW Gurgaon Report copy.pdf",
        downloadName: "RMW Gurgaon Market Intelligence Reports.pdf",
    },
    {
        id: "outer-ring-rd",
        label: "Outer Ring Road Market Intelligence Reports",
        subtitle: "Connectivity corridors & growth outlook",
        filePath: "/RMW Outer Ring Rd Report copy.pdf",
        downloadName: "RMW Outer Ring Rd Market Intelligence Reports.pdf",
    },
];

function downloadFile(filePath: string, downloadName: string) {
    const link = document.createElement("a");
    link.href = encodeURI(filePath);
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function BrandImpactSection2({ hideBottomCta = false }: { hideBottomCta?: boolean }) {
    const [loader, setLoader] = useState<boolean>(true);
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [phoneError, setPhoneError] = useState("");
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [selectedReportId, setSelectedReportId] = useState(MARKET_REPORTS[0].id);

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
        link.href = "/Gold-in-the-Abyss.pptx";
        link.download = "Gold-in-the-Abyss.pptx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const openReportModal = () => {
        setSelectedReportId(MARKET_REPORTS[0].id);
        setReportModalOpen(true);
    };

    const closeReportModal = () => setReportModalOpen(false);

    const handleReportDownload = () => {
        const report = MARKET_REPORTS.find((r) => r.id === selectedReportId);
        if (!report) return;
        downloadFile(report.filePath, report.downloadName);
        setReportModalOpen(false);
    };

    useEffect(() => {
        if (!reportModalOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [reportModalOpen]);

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
                message: "Enquiry from Home Page - 2026 Brand Impact Reports Download Request",
                category: "Brand Impact Reports Download",
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
        <section className="w-full bg-white lg:pb-[70px] pb-[35px] flex flex-col gap-12">
            {/* Row 2  */}
            <div className={`w-full grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch ${styles.containerWidth}`}>
                {/* Left Side Container  */}
                <div className="w-full min-h-0 lg:min-h-[526px] h-full bg-[#F7F7F7] flex flex-col gap-3 sm:gap-4 px-4 lg:px-6 py-6 sm:py-7 lg:py-8 md:px-6">
                    <div className="text-left">
                        <p
                            className="uppercase font-[600] text-[14px] sm:text-[15px] lg:text-[15px] xl:text-[16px] text-[#C99237]"
                            style={{
                                fontFamily: "OpenSansSemiBold",
                            }}
                        >
                            Free Resource
                        </p>
                        <h2
                            className="font-[700] text-[21px] lg:text-[22px] xl:text-[28px] 2xl:text-[36px]"
                            style={{
                                fontFamily: "MontserratBold",
                            }}
                        >
                            Brand Impact Reports 2026
                        </h2>
                    </div>

                    <p
                        className="font-[400] text-[13px] lg:text-[13px] xl:text-[16px] text-left"
                        style={{
                            fontFamily: "PoppinsRegular",
                        }}
                    >
                        Get exclusive insights into real estate and lifestyle brand marketing trends, strategies, and ROI benchmarks for 2026.
                    </p>

                    <ul
                        className="font-[400] text-[13px] md:text-[14px] lg:text-[13px] xl:text-[16px] list-disc pl-4 flex flex-col gap-2 sm:gap-3 text-left"
                        style={{
                            fontFamily: "PoppinsRegular",
                        }}
                    >
                        <li>Industry benchmarks for real estate marketing ROI</li>
                        <li>Proven strategies for UHNI audience targeting</li>
                        <li> 2026 digital and print advertising trends</li>
                        <li>Case studies with measurable results</li>
                    </ul>

                    <form onSubmit={handleDownload} className="mt-4 lg:mt-auto flex flex-col gap-3">
                        <div className="flex flex-col gap-3">
                            <input
                                type="tel"
                                value={phone}
                                onChange={handlePhoneChange}
                                onBlur={handlePhoneBlur}
                                placeholder="Enter your phone (e.g., +91 9220516777)"
                                required
                                className={`w-full h-[48px] sm:h-[50px] border-1 rounded-[4px] bg-white px-4 placeholder:text-[#000000] placeholder:font-[400] placeholder:text-[13px] sm:placeholder:text-[14px] ${phoneError
                                    ? "border-[#EF4444]"
                                    : "border-[#DAD4D4]"
                                    }`}
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`${styles.freeDownloadButton} w-full h-[48px] sm:h-[50px] bg-[#C99237] cursor-pointer text-white font-[700] text-[14px] sm:text-[14.5px] lg:text-[15px] flex justify-center items-center gap-2 rounded-[5px] hover:bg-[#B8822F] transition-colors s1-btn-gold disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                <span className="text-white">{isSubmitting ? "Submitting..." : "Free Download"}</span>
                                <Download className="w-[18px] h-[18px] sm:w-[19px] sm:h-[19px] shrink-0" />
                            </button>
                        </div>
                        <p
                            className="font-[400] text-[13px] xl:text-[14px] text-[#6E6E6E] text-left"
                            style={{
                                fontFamily: "PoppinsRegular",
                            }}
                        >
                            No spam, unsubscribe anytime. We respect your privacy.
                        </p>
                    </form>
                </div>

                {/* Center Container - Noida Outlook Reports */}
                <div className="w-full min-h-0 lg:min-h-[526px] h-full border-1 border-[#D4D4D4] bg-white flex flex-col gap-3 sm:gap-4 px-4 lg:px-6 py-6 sm:py-7 lg:py-8 md:px-6">
                    <div className="text-left flex flex-col gap-2">
                        <p
                            className="uppercase font-[600] text-[14px] sm:text-[15px] lg:text-[15px] xl:text-[16px] text-[#C99237]"
                            style={{
                                fontFamily: "OpenSansSemiBold",
                            }}
                        >
                            Market Reports
                        </p>
                        <h2
                            className="font-[700] text-[17px] sm:text-[18px] lg:text-[19px] xl:text-[22px] 2xl:text-[26px] leading-snug"
                            style={{
                                fontFamily: "MontserratBold",
                            }}
                        >
                            A Ritz Media World{" "}
                            <span className="text-[#C99237]">RMW Market Intelligence Reports</span>{" "}
                            | June 2026
                        </h2>
                    </div>

                    <p
                        className="font-[400] text-[13px] lg:text-[13px] xl:text-[16px] text-left"
                        style={{
                            fontFamily: "PoppinsRegular",
                        }}
                    >
                        Download our latest real estate market intelligence reports covering market trends, growth corridors, investment opportunities, pricing insights, and strategic recommendations.
                    </p>

                    <ul
                        className="font-[400] text-[13px] md:text-[14px] lg:text-[13px] xl:text-[16px] list-disc pl-4 flex flex-col gap-2 sm:gap-3 text-left"
                        style={{
                            fontFamily: "PoppinsRegular",
                        }}
                    >
                        <li>Market trends and demand insights</li>
                        <li>Residential and commercial growth outlook</li>
                        <li>Investment corridors and emerging hotspots</li>
                        <li>RMW strategic recommendations for 2026</li>
                    </ul>

                    <div className="mt-4 lg:mt-auto flex flex-col gap-3">
                        <button
                            type="button"
                            onClick={openReportModal}
                            className={`${styles.freeDownloadButton} w-full h-[48px] sm:h-[50px] bg-[#C99237] cursor-pointer text-white font-[700] text-[14px] sm:text-[14.5px] lg:text-[15px] flex justify-center items-center gap-2 rounded-[5px] hover:bg-[#B8822F] transition-colors s1-btn-gold`}
                        >
                            <span className="text-white">Download Reports</span>
                            <Download className="w-[18px] h-[18px] sm:w-[19px] sm:h-[19px]" />
                        </button>
                        <p
                            className="font-[400] text-[13px] xl:text-[14px] text-[#6E6E6E] text-left"
                            style={{
                                fontFamily: "PoppinsRegular",
                            }}
                        >
                            Free PDF download. No signup required.
                        </p>
                    </div>
                </div>

                {/* Right Side Container  */}
                <div className="relative w-full min-h-0 lg:min-h-[526px] h-full min-w-0 overflow-hidden border-1 border-[#D4D4D4] px-4 lg:px-6 py-6 sm:py-7 lg:py-8 flex flex-col md:px-6 pb-28 sm:pb-32 lg:pb-8">
                    <img
                        src="/home-v3/s8/s8img.png"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-0 right-0 w-[62%] max-w-[220px] sm:max-w-[260px] h-auto select-none lg:w-full lg:max-w-full"
                    />

                    <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-3 sm:gap-4">
                        <h2
                            className="font-[700] text-[21px] sm:text-[24px] lg:text-[22px] xl:text-[28px] 2xl:text-[36px] text-left"
                            style={{
                                fontFamily: "MontserratBold",
                            }}
                        >
                            Get a Free <span className="text-[#C99237]">Brand Audit</span>{" "}
                        </h2>

                        <p
                            className="max-w-full lg:max-w-[95%] font-[400] text-[14px] md:text-[15px] lg:text-[13px] xl:text-[16px] text-left"
                            style={{
                                fontFamily: "PoppinsRegular",
                            }}
                        >
                            Let our experts analyze your current brand positioning and provide
                            actionable recommendations.
                        </p>

                        <ul
                            className="max-w-full lg:max-w-[72%] xl:max-w-[68%] list-disc pl-4 flex flex-col gap-2 sm:gap-3 font-[400] text-[13px] md:text-[15px] lg:text-[13px] xl:text-[16px] text-left"
                            style={{
                                fontFamily: "PoppinsRegular",
                            }}
                        >
                            <li>Comprehensive brand analysis</li>
                            <li>Competitor positioning review</li>
                            <li>Growth opportunity identification</li>
                            <li>Customized strategy roadmap</li>
                        </ul>

                        <Link
                            title="Request A Free Audit"
                            href={"https://ritzmediaworld.com/contact.html"}
                            target="_blank"
                            className="mt-2 lg:mt-6 mb-0 lg:mb-6 inline-flex w-fit max-w-full items-center gap-3 border-b-1 border-b-black pb-2 text-left"
                        >
                            <span
                                className="font-[600] text-[14px] sm:text-[15px] lg:text-[15px] xl:text-[16px] text-black whitespace-nowrap"
                                style={{
                                    fontFamily: "MontserratSemiBold",
                                }}
                            >
                                Request A Free Audit
                            </span>
                            <img
                                src="/home-v3/s3/rhgt.png"
                                alt="RMW"
                                title="RMW"
                                className="w-[24px] h-[24px] sm:w-[25px] sm:h-[25px] lg:w-[27px] lg:h-[27px] shrink-0"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            {!hideBottomCta && (
                <div className={`w-full flex ${styles.containerWidth} justify-center items-center`}>
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
                            Let&apos;s discuss your next brand-elevating campaign
                        </p>
                        <button
                            onClick={() =>
                                window.open(
                                    "https://ritzmediaworld.com/contact.html",
                                    "_blank",
                                )
                            }
                            className="w-full sm:w-[260px] lg:w-[282px] h-[48px] sm:h-[50px] lg:h-[54px] mt-4 bg-[#C99237] cursor-pointer text-white font-[700] text-[14px] sm:text-[14.5px] lg:text-[15px] rounded-[5px] hover:bg-[#B8822F] transition-colors  s1-btn-gold"
                            style={{
                                fontFamily: "OpenSansBold",
                            }}
                        >
                            <p className="text-white">
                                Schedule Free Consultation
                            </p>
                        </button>
                    </div>
                </div>
            )}
            {/* Market reports picker modal */}
            {reportModalOpen && (
                <div
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="market-report-modal-title"
                    onClick={closeReportModal}
                >
                    <div
                        className="w-full max-w-[440px] overflow-hidden rounded-2xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-3 border-b border-[#E8E8E8] bg-[#FAFAF8] px-5 py-4 sm:px-6">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#C99237]">
                                    Market Reports
                                </p>
                                <h3
                                    id="market-report-modal-title"
                                    className="mt-1 text-[17px] font-bold leading-snug text-[#1B1B1B] sm:text-[18px]"
                                    style={{ fontFamily: "MontserratBold" }}
                                >
                                    Choose reports to download
                                </h3>
                                <p
                                    className="mt-1 text-[13px] text-[#6E6E6E]"
                                    style={{ fontFamily: "PoppinsRegular" }}
                                >
                                    Select one of our RMW market intelligence reports.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={closeReportModal}
                                className="rounded-lg p-1.5 text-[#6E6E6E] transition-colors hover:bg-[#EFEFEF] hover:text-[#1B1B1B]"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-2 px-5 py-4 sm:px-6">
                            {MARKET_REPORTS.map((report) => {
                                const selected = selectedReportId === report.id;
                                return (
                                    <label
                                        key={report.id}
                                        className={`${styles.reportRadioOption} ${
                                            selected ? styles.reportRadioOptionSelected : ""
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="market-report"
                                            value={report.id}
                                            checked={selected}
                                            onChange={() => setSelectedReportId(report.id)}
                                            className={styles.reportRadioInput}
                                        />
                                        <span
                                            className={`${styles.reportRadioMark} ${
                                                selected ? styles.reportRadioMarkSelected : ""
                                            }`}
                                            aria-hidden
                                        />
                                        <span className="min-w-0 flex-1">
                                            <span
                                                className="block text-[14px] font-semibold text-[#1B1B1B]"
                                                style={{ fontFamily: "MontserratSemiBold" }}
                                            >
                                                {report.label}
                                            </span>
                                            <span
                                                className="mt-0.5 block text-[12px] text-[#6E6E6E]"
                                                style={{ fontFamily: "PoppinsRegular" }}
                                            >
                                                {report.subtitle}
                                            </span>
                                        </span>
                                    </label>
                                );
                            })}
                        </div>

                        <div className="flex flex-col-reverse gap-2 border-t border-[#E8E8E8] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                            <button
                                type="button"
                                onClick={closeReportModal}
                                className="h-11 rounded-lg border border-[#D4D4D4] px-4 text-[14px] font-semibold text-[#444] transition-colors hover:bg-[#F5F5F5]"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleReportDownload}
                                className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[#C99237] px-5 text-[14px] font-bold text-white transition-colors hover:bg-[#B8822F]"
                            >
                                Download PDF
                                <Download className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Phone / form feedback modal */}
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

export default BrandImpactSection2;