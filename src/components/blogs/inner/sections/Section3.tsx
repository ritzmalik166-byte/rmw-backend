"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CiCalendar } from "react-icons/ci";
import { Download } from "lucide-react";
import Link from "next/link";
import styles from "../../sections/page.module.css";
import BrandImpactSection1 from "@/components/copy/BrandImpactSection1";

interface BLOGSTRUCTURE {
    blogTitle: string;
    blogBanner: string;
    blogSlug: string;
    createdAt: Date;
}

function Section3({
    blogs,
    pd = "pt-[35px] lg:pt-[70px]"
}: {
    blogs: BLOGSTRUCTURE[] | null | undefined;
    pd?: string;
}) {
    const safeBlogs = blogs ?? [];
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
                message:
                    "Enquiry from Home Page - 2025 Brand Impact Report Download Request",
                category: "Brand Impact Report Download",
            };

            const response = await fetch(
                "/api/system-settings/contact-enquiry",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(enquiryData),
                },
            );

            const result = await response.json();

            if (response.ok && result.success) {
                setModal({
                    open: true,
                    status: "success",
                    message:
                        "Thank you! Your enquiry has been submitted successfully. The PDF will download shortly.",
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
                    message:
                        result.error ||
                        "Failed to submit enquiry. Please try again.",
                });
            }
        } catch (error) {
            console.error("Enquiry submission error:", error);
            setModal({
                open: true,
                status: "error",
                message:
                    "Due to internal server errors your enquiry couldn't be sent. Please try again.",
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
        <section className={`w-full min-h-screen bg-[#ffffff] flex justify-center items-center ${pd}`}>
            {/* Centered Align Container  */}
            <div className={`w-full flex flex-col gap-12 sm:gap-16 lg:gap-20`}>
           

                {/* Row 2  */}
                <div className="w-full pb-[35px] lg:pb-[70px]">
                    <BrandImpactSection1 />
                </div>
            </div>


        </section>
    );
}

export default Section3;
