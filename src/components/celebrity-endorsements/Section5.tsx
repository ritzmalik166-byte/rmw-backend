"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import styles from "./page.module.css";

const validatePhone = (phoneNumber: string): string => {
  const digitsOnly = phoneNumber.replace(/\D/g, "");
  if (!phoneNumber.trim()) return "Phone number is required";
  const phoneRegex = /^[\d\s\+\-\(\)]+$/;
  if (!phoneRegex.test(phoneNumber))
    return "Phone number can only contain digits, spaces, +, -, and ()";
  if (digitsOnly.length < 10) return "Phone number must have at least 10 digits";
  if (digitsOnly.length > 13) return "Phone number cannot exceed 13 digits";

  if (digitsOnly.length >= 10) {
    const firstDigit = digitsOnly[0];
    if (digitsOnly.split("").every((digit) => digit === firstDigit)) {
      return "Please enter a valid phone number";
    }
  }

  if (digitsOnly.length === 10) {
    if (!/^[6-9]/.test(digitsOnly))
      return "Indian mobile numbers should start with 6, 7, 8, or 9";
  } else if (digitsOnly.length === 11) {
    if (!/^0[6-9]/.test(digitsOnly)) return "Invalid phone number format";
  } else if (digitsOnly.length === 12 || digitsOnly.length === 13) {
    if (!/^91[6-9]/.test(digitsOnly))
      return "Invalid country code. Use +91 for India";
  }
  return "";
};

const downloadPDF = () => {
  const link = document.createElement("a");
  link.href = "/RMWCaseStudies_250327_081936.pdf";
  link.download = "RMWCaseStudies_250327_081936.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function Section5() {
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [modal, setModal] = useState<{
    open: boolean;
    status: "success" | "error";
    message: string;
  }>({ open: false, status: "success", message: "" });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    if (phoneError) setPhoneError("");
  };

  const handlePhoneBlur = () => {
    setPhoneError(validatePhone(phone));
  };

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneValidationError = validatePhone(phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      setModal({ open: true, status: "error", message: phoneValidationError });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/system-settings/contact-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          etype: "HomePageDownload",
          name: "Celebrity Endorsements Page Visitor",
          email: "celebrity-endorsements@ritzmediaworld.com",
          phone: phone.trim(),
          message:
            "Enquiry from Celebrity Endorsements Page - 2026 Brand Impact Report Download Request",
          category: "Brand Impact Report Download",
        }),
      });

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
        setTimeout(() => downloadPDF(), 500);
      } else {
        setModal({
          open: true,
          status: "error",
          message: result.error || "Failed to submit enquiry. Please try again.",
        });
      }
    } catch {
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
      const timer = setTimeout(() => setModal((m) => ({ ...m, open: false })), 5000);
      return () => clearTimeout(timer);
    }
  }, [modal.open, modal.status]);

  return (
    <section className="w-full bg-white flex justify-center items-center py-[35px] lg:py-[70px] px-4 sm:px-6 lg:px-0">
      <div className={`w-full  mx-auto flex flex-col lg:flex-row justify-between gap-6 lg:gap-6 xl:gap-10 overflow-hidden ${styles.containerWidth}`}>
        {/* Left – 2026 Brand Impact Report */}
        <div className="w-full lg:w-[54%] xl:w-[48%] min-w-0 min-h-auto lg:h-[600px] xl:h-[526px] bg-[#F7F7F7] flex flex-col justify-around gap-3 sm:gap-4 lg:gap-4 xl:gap-0 px-4 sm:px-5 md:px-6 lg:px-8 py-6 sm:py-7 lg:py-8">
          <div className="text-center md:text-left mb-2 md:mb-0">
            <p
              className="uppercase font-[600] text-[14px] sm:text-[15px] lg:text-[16px] text-[#C99237]"
              style={{ fontFamily: "OpenSansSemiBold" }}
            >
              Free Resource
            </p>
            <p
              className="font-[700] text-[15px] sm:text-[18px] md:text-[20px] lg:text-[24px]"
              style={{ fontFamily: "MontserratBold" }}
            >
              Download Our
            </p>
            <h2
              className="font-[700] text-[20px] sm:text-[24px] md:text-[28px] lg:text-[36px]"
              style={{ fontFamily: "MontserratBold" }}
            >
              2026 Brand Impact Report
            </h2>
          </div>
          <p
            className="font-[400] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-center md:text-left"
            style={{ fontFamily: "PoppinsRegular" }}
          >
            Get exclusive insights into real estate and lifestyle brand marketing
            trends, strategies, and ROI benchmarks for 2026.
          </p>
          <ul
            className="font-[400] text-[13px] md:text-[14px] lg:text-[13px] xl:text-[16px] list-disc pl-4 flex flex-col gap-2 sm:gap-3 text-left"
            style={{ fontFamily: "PoppinsRegular" }}
          >
            <li>Industry benchmarks for real estate marketing ROI</li>
            <li>Proven strategies for UHNI audience targeting</li>
            <li>2026 digital and print advertising trends</li>
            <li>Case studies with measurable results</li>
          </ul>
          <form onSubmit={handleDownload} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-between md:justify-start lg:justify-between xl:justify-between gap-3">
              <div className="flex-1 relative md:flex-initial xl:flex-1">
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={handlePhoneBlur}
                  placeholder="Enter your phone (e.g., +91 9220516777)"
                  required
                  className={`w-full sm:w-[319px] lg:w-full h-[48px] sm:h-[50px] border rounded-[4px] bg-white px-4 placeholder:text-[#000000] placeholder:font-[400] placeholder:text-[13px] sm:placeholder:text-[14px] ${
                    phoneError ? "border-[#EF4444]" : "border-[#DAD4D4]"
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
                className="w-full sm:w-[209px] lg:w-full xl:w-[209px] h-[48px] sm:h-[50px] bg-[#C99237] cursor-pointer text-white font-[700] text-[14px] sm:text-[14.5px] lg:text-[15px] flex justify-center items-center gap-2 rounded-[5px] hover:bg-[#B8822F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "PoppinsRegular" }}
              >
                <span className="text-white">
                  {isSubmitting ? "Submitting..." : "Free Download"}
                </span>
                <Download className="w-[18px] h-[18px] sm:w-[19px] sm:h-[19px]" />
              </button>
            </div>
            <p
              className="font-[400] text-[13px] sm:text-[14px] text-[#6E6E6E] text-center md:text-left"
              style={{ fontFamily: "PoppinsRegular" }}
            >
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </form>
        </div>

        {/* Right – Brand Audit */}
        <div className="w-full lg:w-[46%] xl:w-[48%] min-w-0 lg:h-[600px] xl:h-[526px] border border-[#D4D4D4] bg-[url('/home-v3/s8/s8img.png')] bg-cover bg-center px-4 sm:px-6 lg:px-8 py-6 sm:py-7 lg:py-8 flex flex-col gap-3 sm:gap-4">
          <h2
            className="font-[700] text-[22px] sm:text-[26px] md:text-[28px] lg:text-[36px] text-center md:text-left"
            style={{ fontFamily: "MontserratBold" }}
          >
            Get a Free <span className="text-[#C99237]">Brand Audit</span>
          </h2>
          <p
            className="font-[400] text-[14px] md:text-[15px] lg:text-[16px] text-center md:text-left"
            style={{ fontFamily: "PoppinsRegular" }}
          >
            Let our experts analyze your current brand positioning and provide
            actionable recommendations.
          </p>
          <ul
            className="list-disc pl-4 flex flex-col gap-2 sm:gap-3 font-[400] text-[13px] md:text-[15px] lg:text-[13px] xl:text-[16px] text-left"
            style={{ fontFamily: "PoppinsRegular" }}
          >
            <li>Comprehensive brand analysis</li>
            <li>Competitor positioning review</li>
            <li>Growth opportunity identification</li>
            <li>Customized strategy roadmap</li>
          </ul>
          <div className="flex border-b border-black items-center justify-center sm:justify-center md:justify-between gap-5 sm:gap-5 md:gap-0 cursor-pointer pb-2 w-full sm:w-[224px] lg:mt-5 mx-auto md:mx-0 whitespace-nowrap">
            <Link
              title="Request A Free Audit"
              href="https://ritzmediaworld.com/contact.html"
              target="_blank"
              className="font-[600] text-[14px] sm:text-[15px] lg:text-[16px] text-black whitespace-nowrap"
              style={{ fontFamily: "MontserratSemiBold" }}
            >
              Request A Free Audit
            </Link>
            <img
              src="/home-v3/s3/rhgt.png"
              alt="Ritz Media World – contact"
              title="Ritz Media World"
              className="w-[24px] h-[24px] sm:w-[25px] sm:h-[25px] lg:w-[27px] lg:h-[27px]"
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[16px] shadow-2xl max-w-[400px] w-[90%] mx-4 overflow-hidden">
            <div
              className={`px-6 py-4 ${
                modal.status === "success" ? "bg-[#10B981]" : "bg-[#EF4444]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {modal.status === "success" ? (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                  <h3 className="text-lg font-semibold text-white">
                    {modal.status === "success" ? "Success" : "Error"}
                  </h3>
                </div>
                <button
                  onClick={() => setModal((m) => ({ ...m, open: false }))}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-6 py-4">
              <p className="text-[#374151] text-sm leading-relaxed">
                {modal.message}
              </p>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setModal((m) => ({ ...m, open: false }))}
                className={`px-4 py-2 rounded-[8px] font-[500] text-sm transition-colors ${
                  modal.status === "success"
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
  );
}
