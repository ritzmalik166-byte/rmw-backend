"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CiCalendar } from "react-icons/ci"; 
import styles from "./S3.module.css";
interface BLOGSTRUCTURE {
    blogTitle: string;
    blogBanner: string;
    blogSlug: string;
    createdAt: Date;
}

function S8({
    blogs,
    blogsLoading,
}: {
    blogs: BLOGSTRUCTURE[];
    blogsLoading: boolean;
}) {
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
        link.href = "/Gold-in-the-Abyss.pptx";
        link.download = "Gold-in-the-Abyss.pptx";
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
        <section className="w-full min-h-0 bg-[#ffffff] flex justify-center items-center py-10 sm:py-14 lg:py-[70px] ">
            {/* Centered Align Container  */}
            <div className={`w-full  flex flex-col gap-12 sm:gap-16 lg:gap-20 ${styles.container}`}>
                {/* Row 1  */}
                <div className="w-full flex flex-col gap-8 sm:gap-9 lg:gap-10">
                    {/* Header  */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6">
                        {/* Left Side Container  */}
                        <div className="flex flex-col gap-2 sm:gap-3 text-center md:text-left">
                            <h2
                                className="font-[600] text-[14px] sm:text-[15px] lg:text-[16px] text-[#C99237] uppercase"
                                style={{
                                    fontFamily: "OpenSansSemiBold",
                                }}
                            >
                                Latest Insights
                            </h2>
                            <h3
                                className="font-[700] text-[24px] sm:text-[28px] lg:text-[36px] text-black"
                                style={{
                                    fontFamily: "MontserratBold",
                                }}
                            >
                                Here's what we've been up to
                            </h3>
                            <p
                                className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px] text-black max-w-5xl"
                                style={{
                                    fontFamily: "OpenSansRegular",
                                }}
                            >
                                Insights, launches, partnerships, and stories
                                from across our ecosystem.
                            </p>
                        </div>

                        {/* Right Side Container  */}
                        <button
                            onClick={() =>
                                window.open(
                                    "https://ritzmediaworld.com/blogs",
                                    "_blank",
                                )
                            }
                            className="font-[600] text-[14px] sm:text-[14.5px] lg:text-[15px] w-full sm:w-[179px] h-[48px] sm:h-[50px] lg:h-[54px] border-1 border-[#C99237] rounded-[5px] cursor-pointer  flex-shrink-0 s1-btn-transparent"
                            style={{
                                fontFamily: "OpenSansSemiBold",
                            }}
                        >
                            <p>Read more blogs</p>
                        </button>
                    </div>

                    {/* Main Container  */}
                    <div className="w-full flex flex-col sm:flex-row justify-between gap-6 sm:gap-4 ">
                        {blogs.length > 0
                            ? blogs.map((ob, idx) => {
                                  return (
                                      <div
                                          key={idx}
                                          className="w-full sm:w-[calc(33.333%-10px)] lg:w-[405px] h-auto md:max-lg:h-[311px] lg:h-[311px] flex flex-col gap-2 min-h-0"
                                      >
                                          {/* Image Container  */}
                                          <div className="w-full relative h-[250px] sm:h-[220px] md:max-lg:h-[212px] lg:h-[212px] min-h-0 shrink-0 overflow-hidden">
                                              <Image
                                                  onClick={() =>
                                                      window.open(
                                                          `https://ritzmediaworld.com/${ob.blogSlug}`,
                                                          "_blank",
                                                      )
                                                  }
                                                  src={`${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}${ob.blogBanner}`}
                                                  alt="RMW"
                                                  title="RMW"
                                                  fill
                                                  unoptimized
                                                  sizes="(min-width: 1024px) 405px, (min-width: 640px) 33vw, 100vw"
                                                  className="object-cover cursor-pointer"
                                              />
                                          </div>
                                          <p className="font-[400] text-[13px] sm:text-[14px] lg:text-[15px] text-[#575757] flex gap-2 items-center">
                                              <CiCalendar className="w-[16px] h-[16px] sm:w-[17px] sm:h-[17px] lg:w-[18px] lg:h-[18px]" />{" "}
                                              {(() => {
                                                  const date =
                                                      ob.createdAt instanceof
                                                      Date
                                                          ? ob.createdAt
                                                          : new Date(
                                                                ob.createdAt,
                                                            );
                                                  return isNaN(date.getTime())
                                                      ? ""
                                                      : date.toLocaleDateString();
                                              })()}
                                          </p>
                                          <h4
                                              onClick={() =>
                                                  window.open(
                                                      `https://ritzmediaworld.com/${ob.blogSlug}`,
                                                      "_blank",
                                                  )
                                              }
                                              className="font-[600] text-[15px] xl:text-[18px] text-black sm:max-lg:line-clamp-2"
                                              style={{
                                                  fontFamily:
                                                      "OpenSansSemiBold",
                                              }}
                                          >
                                              {ob.blogTitle}
                                          </h4>
                                      </div>
                                  );
                              })
                            : [1, 2, 3].map((idx) => {
                                  return (
                                      <div
                                          key={idx}
                                          className="w-full sm:w-[calc(33.333%-10px)] lg:w-[405px] h-auto md:max-lg:h-[311px] lg:h-[311px] flex flex-col gap-2 min-h-0"
                                      >
                                          {/* Image Skeleton */}
                                          <div className="w-full relative h-[250px] md:max-lg:h-[212px] lg:h-[212px] bg-gray-200 rounded animate-pulse shrink-0"></div>
                                          {/* Date Skeleton */}
                                          <div className="flex gap-2 items-center">
                                              <div className="w-[16px] h-[16px] sm:w-[17px] sm:h-[17px] lg:w-[18px] lg:h-[18px] bg-gray-200 rounded animate-pulse"></div>
                                              <div className="w-[100px] h-[15px] sm:h-[16px] lg:h-[17px] bg-gray-200 rounded animate-pulse"></div>
                                          </div>
                                          {/* Title Skeleton */}
                                          <div className="flex flex-col gap-2">
                                              <div className="w-full h-[18px] sm:h-[19px] lg:h-[20px] bg-gray-200 rounded animate-pulse"></div>
                                              <div className="w-[80%] h-[18px] sm:h-[19px] lg:h-[20px] bg-gray-200 rounded animate-pulse"></div>
                                          </div>
                                      </div>
                                  );
                              })}
                    </div>
                </div>

               
            </div>

          
        </section>
    );
}

export default S8;
