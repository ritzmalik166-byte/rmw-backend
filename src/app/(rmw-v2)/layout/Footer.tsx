"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GrLocation } from "react-icons/gr";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiLinkedin } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { LuTwitter } from "react-icons/lu";
import { FaYoutube } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { ChevronUp, X } from "lucide-react";
import { useRouter } from "next/navigation";
import XIcon from "../new-home/components/XIcon";

function Footer() {
  const router = useRouter();
  const handleConsultation = () => {
    window.open("/contact.html", "_blank");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative w-full overflow-x-hidden flex justify-center items-center pt-12 bg-[#101828]">
      {/* Centered Align Div  */}
      <div className="w-full max-w-[95%] flex flex-col">
        {/* Row 1 - CTA Banner */}
        <div className="w-full min-h-[120px] sm:min-h-[130px] md:min-h-[146px] bg-[#F3830E] text-white flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 gap-4 sm:gap-6">
          <div className="flex flex-col gap-2 sm:gap-3 text-center sm:text-left">
            <h2 className="font-[600] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-[1.2] text-white">
              Ready to Elevate Your Brand?
            </h2>
            <p className="font-[400] text-[14px]  text-white/90">
              Let&apos;s discuss your next brand-elevating campaign
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={handleConsultation}
              className="font-[500] liquid2 rounded-[8px] bg-white cursor-pointer text-[13px] px-3 sm:text-[14px] w-full sm:w-[200px] md:w-[232px] h-[40px]  text-[#F3830E] hover:bg-[#F0F0F0] transition-colors duration-300 whitespace-nowrap"
            >
              Schedule Free Consultation
            </button>
          </div>
        </div>

        {/* Row 2 - Main Footer Content */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-between items-start px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12 lg:py-16 gap-8 sm:gap-10 md:gap-12 lg:gap-6 xl:gap-8">
          {/* Box 1 - Logo & About */}
          <div className="flex flex-col w-full min-h-[206px] justify-between gap-6 sm:gap-8">
            {/* Logo Container */}
            <div className="w-[140px] sm:w-[160px] md:w-[180px] h-auto">
              <Link href="/" target="_blank" title="Home" className="block">
                <Image
                  src="/new-page/new-design-logo.png"
                  alt="RITZ Media World Logo"
                  width={180}
                  height={60}
                  className="object-contain"
                  priority
                />
              </Link>
            </div>
            {/* Paragraph */}
            <div>
              <p className="font-[400] text-[14px]  leading-[1.6] text-[#D1D5DC]">
                Accelerate your journey to success with result-oriented
                solutions for Digital Advertising, Social Media Management, SEO,
                and Compelling Content backed by more than 17 years of
                advertising wisdom with a wide array of clients across all
                industries across the Indian subcontinent.
              </p>
            </div>
            {/* Google Reviews  */}
            <div
              className="w-[220px] h-[54px] relative overflow-hidden rounded-full cursor-pointer"
              onClick={() =>
                window.open("https://share.google/vdKYtVQQ8Ym2AvZj3", "_blank")
              }
            >
              <Image
                src={"/new-about/google-reviews.png"}
                fill
                alt="Ritz Media World"
              ></Image>
            </div>
            {/* Social Media Icons */}
            <div className="flex w-full justify-start items-center gap-3 sm:gap-4">
              <a
                href="https://www.facebook.com/ritzmediaworld/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[40px] h-[40px] bg-[#1E2939] flex justify-center items-center rounded-[10px] hover:bg-[#F3830E] transition-colors duration-300 cursor-pointer group"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5 text-white group-hover:text-[#101828] transition-colors duration-300" />
              </a>
              <a
                href="https://www.instagram.com/ritzmediaworld/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[40px] h-[40px] bg-[#1E2939] flex justify-center items-center rounded-[10px] hover:bg-[#F3830E] transition-colors duration-300 cursor-pointer group"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5 text-white group-hover:text-[#101828] transition-colors duration-300" />
              </a>
              <a
                href="https://x.com/i/flow/login?redirect_after_login=%2Fritzmediaworld"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[40px] h-[40px] bg-[#1E2939] flex justify-center items-center rounded-[10px] hover:bg-[#F3830E] transition-colors duration-300 cursor-pointer group"
                aria-label="Twitter"
              >
                {/* <X className="w-5 h-5 text-white group-hover:text-[#101828] transition-colors duration-300" /> */}
                <XIcon className="w-5 h-5 text-white group-hover:text-[#101828] transition-colors duration-300" />
              </a>
              <a
                href="https://www.linkedin.com/company/ritzmediaworld/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[40px] h-[40px] bg-[#1E2939] flex justify-center items-center rounded-[10px] hover:bg-[#F3830E] transition-colors duration-300 cursor-pointer group"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5 text-white group-hover:text-[#101828] transition-colors duration-300" />
              </a>
              <a
                href="https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[40px] h-[40px] bg-[#1E2939] flex justify-center items-center rounded-[10px] hover:bg-[#F3830E] transition-colors duration-300 cursor-pointer group"
                aria-label="YouTube"
              >
                <FaYoutube className="w-5 h-5 text-white group-hover:text-[#101828] transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Box 2 - Quick Links */}
          <div className="w-full min-h-[206px] flex flex-col justify-start gap-4 sm:gap-5 lg:pl-[90px]">
            <h2 className="font-[600] text-[16px] text-white mb-2">
              Quick Links
            </h2>
            <Link
              title="Home"
              href="/" target="_blank"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer"
            >
              Home
            </Link>
            <Link
              title="About"
              href="/about.html"
              target="_blank"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer"
            >
              About
            </Link>
            <Link
              title="Our Work"
              href="/work.html"
              target="_blank"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer"
            >
              Our Work
            </Link>
            <Link
              title="Blogs"
              href="/blogs"
              target="_blank"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer"
            >
              Blogs
            </Link>
            <Link
              title="Web Stories"
              href="/web-stories"
              target="_blank"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer"
            >
              Web Stories
            </Link>
            <Link
              title="Contact"
              href="/contact.html"
              target="_blank"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer"
            >
              Contact
            </Link>
            <Link
              title="Careers"
              href="/career"
              target="_blank"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer"
            >
              Careers
            </Link>
            {/* 
            <Link
              title="Discussion Forum"
              href="/discussion-forum"
              target="_blank"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer"
            >
              Discussion Forum
            </Link>
           
            <Link
              title="Clients"
              href="/clients"
              target="_blank"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer"
            >
              Clients
            </Link> */}
          </div>

          {/* Box 3 - Services */}
          <div className="w-full min-h-[206px] flex flex-col justify-start gap-4 sm:gap-5">
            <h2 className="font-[600] text-[16px] sm:text-[17px] md:text-[16px] text-white mb-2">
              Services
            </h2>
            <Link
              title="Digital Marketing"
              href="/services/digital-marketing"
              target="_blank"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer"
            >
              Digital Marketing
            </Link>
            <Link
              title="Print Advertising"
              href="/services/print-advertising"
              target="_blank"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer"
            >
              Print Advertising
            </Link>
            <Link
              title="Radio Advertising"
              href="/services/radio-advertising"
              target="_blank"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer"
            >
              Radio Advertising
            </Link>
            <Link
              title="Creative Services"
              href="/services/creative-services"
              target="_blank"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer"
            >
              Creative Services
            </Link>
            <Link
              title="Content Marketing"
              href="/services/contents-marketing"
              target="_blank"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer"
            >
              Content Marketing
            </Link>
            <Link
              title="Web Development"
              href="/services/web-designing-and-development"
              target="_blank"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer"
            >
              Web Development
            </Link>
            <Link
              title="Celebrity Endorsements"
              href="/services/celebrity-endorsements"
              target="_blank"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer"
            >
              Celebrity Endorsements
            </Link>
            <Link
              title="Influencer Marketing"
              href="/services/influencer-marketing-agency-in-india"
              target="_blank"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer"
            >
              Influencer Marketing
            </Link>
            {/* <Link
              title="3D Rendering Services"
              href="/services/3d-rendering-services"
              target="_blank"
              className="font-[400] text-[14px]  text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer"
            >
              3D Rendering Services
            </Link> */}
          </div>

          {/* Box 4 - Contact Us */}
          <div className="w-full min-h-[206px] flex flex-col justify-start gap-4 sm:gap-5">
            <h2 className="font-[600] text-[16px] sm:text-[17px] md:text-[16px] text-white mb-2">
              Contact Us
            </h2>
            <Link
              title="Contact Us"
              href="/contact.html"
              target="_blank"
              className="flex gap-3 sm:gap-4 items-start hover:text-[#F3830E] transition-colors duration-300 cursor-pointer group"
            >
              <GrLocation className="w-[20px] h-[20px] text-[#F3830E] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
              <p className="font-[400] text-[14px]  leading-[1.6] text-[#D1D5DC] group-hover:text-[#F3830E] transition-colors duration-300">
                Address: 402 – 404, <br /> 4th floor Corporate Park, <br />
                Tower A1 Sector 142, <br /> Noida
              </p>
            </Link>
            <a
              href="tel:09220516777"
              target="_blank"
              className="flex gap-3 sm:gap-4 items-center hover:text-[#F3830E] transition-colors duration-300 cursor-pointer group"
            >
              <MdOutlineLocalPhone className="w-[20px] h-[20px] text-[#F3830E] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
              <p className="font-[400] text-[14px]  text-[#D1D5DC] group-hover:text-[#F3830E] transition-colors duration-300">
                09220516777
              </p>
            </a>
            <a
              href="tel:07290002168"
              target="_blank"
              className="flex gap-3 sm:gap-4 items-center hover:text-[#F3830E] transition-colors duration-300 cursor-pointer group"
            >
              <MdOutlineLocalPhone className="w-[20px] h-[20px] text-[#F3830E] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
              <p className="font-[400] text-[14px]  text-[#D1D5DC] group-hover:text-[#F3830E] transition-colors duration-300">
                07290002168
              </p>
            </a>
            <a
              href="mailto:info@ritzmediaworld.com"
              target="_blank"
              className="flex gap-3 sm:gap-4 items-center hover:text-[#F3830E] transition-colors duration-300 cursor-pointer group"
            >
              <MdOutlineMailOutline className="w-[20px] h-[20px] text-[#F3830E] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
              <p className="font-[400] text-[14px]  text-[#D1D5DC] group-hover:text-[#F3830E] transition-colors duration-300 break-all">
                info@ritzmediaworld.com
              </p>
            </a>
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-[20px] h-[20px] flex-shrink-0"></div>
              <p className="font-[400] text-[14px]  text-[#D1D5DC]">
                Office Hours: 9AM - 7PM
              </p>
            </div>
          </div>
        </div>

        {/* Row 3 - Partners Logos  */}
        <div className="w-full flex justify-center items-center mb-8">
          {/* Responsive Centered Align Container */}
          <div className="flex flex-row flex-wrap justify-between items-center gap-[32px] sm:gap-[40px] md:gap-[56px] lg:gap-[56px] w-full max-w-[360px] sm:max-w-[480px] md:max-w-none md:w-auto">
            <div className="w-[48px] h-[28px] sm:w-[60px] sm:h-[32px] md:w-[72px] md:h-[40px] relative flex-shrink-0">
              <Image
                fill
                className="object-contain"
                src={"/new-page/footer/ins.png"}
                alt="INS Partner Logo"
                sizes="(max-width: 767px) 48px, (max-width: 1023px) 60px, 72px"
              />
            </div>
            <div className="w-[64px] h-[22px] sm:w-[84px] sm:h-[28px] md:w-[104px] md:h-[35px] relative flex-shrink-0">
              <Image
                fill
                className="object-contain"
                src={"/new-page/footer/meta.png"}
                alt="Meta Partner Logo"
                sizes="(max-width: 767px) 64px, (max-width: 1023px) 84px, 104px"
              />
            </div>
            <div className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] md:w-[56px] md:h-[56px] relative flex-shrink-0">
              <Image
                fill
                className="object-contain"
                src={"/new-page/footer/google-partner.png"}
                alt="Google Partner Logo"
                sizes="(max-width: 767px) 36px, (max-width: 1023px) 44px, 56px"
              />
            </div>
            <div className="w-[40px] h-[18px] sm:w-[54px] sm:h-[22px] md:w-[71px] md:h-[32px] relative flex-shrink-0">
              <Image
                fill
                className="object-contain"
                src={"/new-page/footer/msme.png"}
                alt="MSME Partner Logo"
                sizes="(max-width: 767px) 40px, (max-width: 1023px) 54px, 71px"
              />
            </div>
          </div>
        </div>

        {/* Row 4 - Footer Bottom */}
        <div className="w-full border-t-[0.8px] border-[#1E2939] flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 gap-4 sm:gap-6">
          <p className="font-[400] text-[12px] sm:text-[13px] md:text-[14px] text-[#D1D5DC] text-center sm:text-left">
            © 2026 RITZ Media World. All rights reserved.
          </p>

          <ul className="hidden flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 md:gap-6">
            <li>
              <p className="font-[400] text-[12px] sm:text-[13px] md:text-[14px] text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer">
                Privacy Policy
              </p>
            </li>
            <li>
              <p className="font-[400] text-[12px] sm:text-[13px] md:text-[14px] text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer">
                Terms of Service
              </p>
            </li>
            <li>
              <p className="font-[400] text-[12px] sm:text-[13px] md:text-[14px] text-[#D1D5DC] hover:text-[#F3830E] transition-colors duration-300 cursor-pointer">
                Sitemap
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917290002168"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute hidden cursor-pointer bottom-24 left-6 sm:bottom-28 sm:left-8 md:bottom-32 md:left-10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 z-50 group animate-bounce-arrow"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform duration-300" />
      </a>

      {/* Scroll to Top Arrow Button */}
      <button
        onClick={scrollToTop}
        className="absolute cursor-pointer bottom-6 left-6 sm:bottom-8 sm:left-8 md:bottom-10 md:left-10 w-[50px] h-[50px]  bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 z-50 group animate-bounce-arrow"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6 text-[#F3830E] group-hover:scale-110 transition-transform duration-300" />
      </button>

      <style jsx>{`
        @keyframes bounce-arrow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce-arrow {
          animation: bounce-arrow 2s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
