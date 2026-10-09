"use client";
import React, { useEffect, useRef, useState } from "react";
import { LuDownload, LuMail, LuPhone } from "react-icons/lu";
import { FaArrowRight, FaArrowRightLong } from "react-icons/fa6";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

function S11() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
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

  // Function to validate phone number
  const validatePhone = (phoneNumber: string): string => {
    // Remove all non-digit characters for validation
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    
    // Check if empty
    if (!phoneNumber.trim()) {
      return "Phone number is required";
    }
    
    // Check if it contains only digits, spaces, +, -, and ()
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(phoneNumber)) {
      return "Phone number can only contain digits, spaces, +, -, and ()";
    }
    
    // Check length (should be 10 digits for Indian numbers, or 10-13 with country code)
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
    
    // Check if it starts with valid Indian country code or direct number
    if (digitsOnly.length === 10) {
      // 10-digit Indian mobile number (should start with 6-9)
      if (!/^[6-9]/.test(digitsOnly)) {
        return "Indian mobile numbers should start with 6, 7, 8, or 9";
      }
    } else if (digitsOnly.length === 11) {
      // 11 digits - might be with 0 prefix
      if (!/^0[6-9]/.test(digitsOnly)) {
        return "Invalid phone number format";
      }
    } else if (digitsOnly.length === 12 || digitsOnly.length === 13) {
      // 12-13 digits - with country code (91 for India)
      if (!/^91[6-9]/.test(digitsOnly)) {
        return "Invalid country code. Use +91 for India";
      }
    }

   
    const mobilePart = digitsOnly.slice(-10);
    if (/^(\d)\1{9}$/.test(mobilePart)) {
      return "Please enter a valid phone number";
    }

    return ""; 
  };

  // Handle phone input change with validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    
    // Clear error if user is typing
    if (phoneError) {
      setPhoneError("");
    }
  };

  // Validate on blur
  const handlePhoneBlur = () => {
    const error = validatePhone(phone);
    setPhoneError(error);
  };

  // Function to download PDF
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
    
    // Validate phone number
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
      // Prepare enquiry data with default values indicating it's from home page
      const enquiryData = {
        etype: "HomePageDownload",
        name: "Home Page Visitor",
        email: "homepage@ritzmediaworld.com",
        phone: phone.trim(),
        message: "Enquiry from Home Page - 2026 Brand Impact Report Download Request",
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
        // Show success modal
        setModal({
          open: true,
          status: "success",
          message: "Thank you! Your enquiry has been submitted successfully. The PDF will download shortly.",
        });

        // Reset form
        setPhone("");
        setPhoneError("");

        // Download PDF after a short delay
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
const router = useRouter();
  const handleAuditRequest = () => {
    // Handle audit request logic here
    // console.log("Audit requested");
    // router.push("/contact.html", { target: "_blank" });
    window.open("/contact.html", "_blank");
  };

  // Auto-close modal for success messages
  useEffect(() => {
    if (modal.open && modal.status === "success") {
      const timer = setTimeout(() => {
        setModal({ ...modal, open: false });
      }, 5000); // Close after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [modal.open, modal.status]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      gsap.fromTo(
        leftRef.current,
        { autoAlpha: 0, x: -50 },
        { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );

      gsap.fromTo(
        rightRef.current,
        { autoAlpha: 0, x: 50 },
        { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
      );

      // Stagger animation for list items
      gsap.fromTo(
        ".list-item-animate",
        { autoAlpha: 0, x: -20 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.6,
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen pt-[28px] lg:pt-0 flex justify-center items-center bg-gradient-to-b from-[#101828] via-[#1E2939] to-[#1E2939] overflow-x-hidden overflow-y-hidden relative max-w-full"
    >
      {/* Centered Align Div  */}
      <div className="w-[90%] max-w-[1400px] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 relative z-20 overflow-x-hidden">
        {/* Left Side Container  */}
        <div
          ref={leftRef}
          className="w-full lg:w-[664px] xl:w-[700px] min-h-[552px] flex flex-col justify-between gap-6 sm:gap-8 md:gap-10 overflow-x-hidden max-w-full"
        >
          {/* Top Section */}
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
            <button className="w-fit px-4 sm:px-5 py-2 sm:py-2.5 font-[400] text-[12px] sm:text-[13px] md:text-[14px] text-white rounded-full bg-[#F3830E] cursor-pointer hover:bg-[#f3840ed2] transition-colors duration-300">
              Free Resource
            </button>
            <div className="flex flex-col gap-2">
              <h3 className="font-[500] text-[28px] sm:text-[32px] md:text-[34px] lg:text-[36px] leading-[1.2] text-[#F3830E]">
                2026 Brand Impact Report
              </h3>
              <h3 className="font-[500] text-[28px] sm:text-[32px] md:text-[34px] lg:text-[36px] leading-[1.2] text-white">
                Download Our
              </h3>
            </div>
            <p className="font-[400] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.6] text-[#D1D5DC] max-w-[600px]">
              Get exclusive insights into real estate and lifestyle brand
              marketing trends, strategies, and ROI benchmarks for 2026.
            </p>
          </div>

          {/* Middle Section - List */}
          <div>
            <ul
              className="font-[400] text-[13px] md:text-[14px] lg:text-[13px] xl:text-[16px] list-disc pl-4 flex flex-col gap-2 sm:gap-3 text-left text-[#D1D5DC]"
              style={{
                fontFamily: "PoppinsRegular",
              }}
            >
              <li className="list-item-animate">Industry benchmarks for real estate marketing ROI</li>
              <li className="list-item-animate">Proven strategies for UHNI audience targeting</li>
              <li className="list-item-animate"> 2026 digital and print advertising trends</li>
              <li className="list-item-animate">Case studies with measurable results</li>
            </ul>
          </div>

          {/* Bottom Section - Form */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <form
              onSubmit={handleDownload}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start"
            >
              <div className="flex-1 relative w-full">
                <LuPhone className={`absolute left-4 sm:left-5 md:left-6 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
                  phoneError ? "text-[#EF4444]" : "text-[#99A1AF]"
                }`} />
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={handlePhoneBlur}
                  placeholder="Enter your phone (e.g., +91 9220516777)"
                  required
                  className={`w-full h-[48px] sm:h-[56px] pl-11 sm:pl-12 md:pl-14 pr-4 sm:pr-5 md:pr-6 bg-white/10 border rounded-[8px] text-white placeholder:text-[#99A1AF] focus:outline-none focus:bg-white/15 transition-all duration-300 text-[14px] sm:text-[15px] md:text-[16px] ${
                    phoneError 
                      ? "border-[#EF4444] focus:border-[#EF4444]" 
                      : "border-white/20 focus:border-[#F3830E]"
                  }`}
                />
                {phoneError && (
                  <p className="absolute top-full left-0 mt-1 text-[12px] sm:text-[13px] text-[#EF4444] font-[400]">
                    {phoneError}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-[164px] h-[48px] sm:h-[56px] liquid text-white flex justify-center items-center gap-2 rounded-[8px] font-[500] text-[14px] sm:text-[15px] md:text-[16px] hover:bg-[#f3840ed2] transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LuDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{isSubmitting ? "Submitting..." : "Download Free"}</span>
              </button>
            </form>
            <p className="font-[400] text-[12px] sm:text-[13px] md:text-[14px] text-[#99A1AF]">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>

        {/* Right Side Container  */}
        <div
          ref={rightRef}
          className="w-full lg:w-[624px] xl:w-[680px] rounded-[20px] sm:rounded-[22px] md:rounded-[24px] border-[0.8px] border-white/30 min-h-[450px] sm:min-h-[480px] md:min-h-[518px] gap-6 sm:gap-8 md:gap-[32px] flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 bg-white/5 backdrop-blur-sm overflow-x-hidden max-w-full"
        >
          {/* Top Section */}
          <div className="w-full max-w-[518px] flex flex-col justify-center items-center text-center gap-4 sm:gap-5 md:gap-6">
            <div onClick={()=>window.open("/contact.html", "_blank")} className="w-[56px] h-[56px]  sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px] rounded-[14px] sm:rounded-[15px] md:rounded-[16px] bg-[#F3830E] flex justify-center items-center text-white hover:bg-[#F3830E]/30 transition-colors duration-300">
              <FaArrowRightLong className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffffff]" />
            </div>
            <h2 className="font-[600] text-[28px] sm:text-[32px] md:text-[34px] lg:text-[36px] leading-[1.2] text-white">
              Get a Free <span className="text-[#F3830E]">Brand Audit</span>
            </h2>
            <p className="font-[400] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.6] text-[#D1D5DC]">
              Let our experts analyze your current brand positioning and provide
              actionable recommendations.
            </p>
          </div>

          {/* Middle Section - List */}
          <div className="w-full max-w-[500px]">
            <ul
              className="list-disc pl-4 flex flex-col gap-2 sm:gap-3 font-[400] text-[13px] md:text-[15px] lg:text-[13px] xl:text-[16px] text-left text-[#D1D5DC]"
              style={{
                fontFamily: "PoppinsRegular",
              }}
            >
              <li className="list-item-animate">Comprehensive brand analysis</li>
              <li className="list-item-animate">Competitor positioning review</li>
              <li className="list-item-animate">Growth opportunity identification</li>
              <li className="list-item-animate">Customized strategy roadmap</li>
            </ul>
          </div>

          {/* Bottom Section - Button */}
          <button
            onClick={handleAuditRequest}
            className="w-full liquid px-6 sm:px-8 md:px-10 h-[40px] font-[500] text-[14px] sm:text-[15px] md:text-[16px] text-[#101828] rounded-[8px] bg-white hover:bg-[#F0F0F0] flex justify-center items-center gap-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Request A Free Audit</span>
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Absolute Positioned Divs */}
      {/* div 1  */}
      <div className="w-[484px] h-[484px] opacity-[10%] absolute bottom-0 right-0 z-0 overflow-hidden max-w-full pointer-events-none">
        <img src="/new-page/cont-1.png" className="w-full h-full object-contain max-w-full" alt="" />
      </div>

       {/* div 2  */}
       <div className="w-[484px] h-[484px] opacity-[10%] absolute left-0 top-0 z-0 overflow-hidden max-w-full pointer-events-none">
        <img src="/new-page/cont-2.png" className="w-full h-full object-contain max-w-full" alt="" />
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[16px] shadow-2xl max-w-[400px] w-[90%] mx-4 overflow-hidden">
            {/* Modal Header */}
            <div className={`px-6 py-4 ${
              modal.status === "success" ? "bg-[#10B981]" : "bg-[#EF4444]"
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

export default S11;
