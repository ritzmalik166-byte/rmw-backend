"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import { MessageCircle, Phone, X, Bot } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import gsap from "gsap";
import Image from "next/image";
import ServicesBoat, { ServicesBoatRef } from "@/components/servicesBoat/ServicesBoat";
import { RubyContext } from "@/ruby-context/ruby.context";
function ContactBtns() {
  const context = useContext(RubyContext);
  if (!context) {
    throw new Error('ContactBtns must be used within RubyProvider');
  }
  const { setIsRubyOpen } = context;
  const [isOpen, setIsOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const scrollCloseEnabledRef = useRef(false);

  const FAN_AUTO_OPEN_DELAY_MS = 1000;
  const SCROLL_CLOSE_GRACE_MS = 3500;
  const mainButtonRef = useRef<HTMLButtonElement>(null);
  const phoneButtonRef = useRef<HTMLButtonElement>(null);
  const whatsappButtonRef = useRef<HTMLButtonElement>(null);
  const chatbotButtonRef = useRef<HTMLButtonElement>(null);
  const servicesBoatRef = useRef<ServicesBoatRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Auto fan-out contact buttons only (Ruby chat opens on chatbot click)
  useEffect(() => {
    const openTimer = window.setTimeout(() => {
      setIsOpen(true);
    }, FAN_AUTO_OPEN_DELAY_MS);

    return () => window.clearTimeout(openTimer);
  }, []);

  // Collapse fan on scroll down; close Ruby too if it was open
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const graceTimer = window.setTimeout(() => {
      scrollCloseEnabledRef.current = true;
    }, SCROLL_CLOSE_GRACE_MS);

    const handleScroll = () => {
      if (!scrollCloseEnabledRef.current) return;

      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;

      if (delta > 12 && currentY > 100) {
        setIsOpen(false);
        setIsRubyOpen(false);
      }

      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.clearTimeout(graceTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setIsRubyOpen]);

  useEffect(() => {
    if (!containerRef.current) return;

    const getDistance = () => {
      if (typeof window === "undefined")
        return { phone: -88, whatsapp: -176, chatbot: -264 };
      const width = window.innerWidth;

      if (width >= 1024) {
        return { phone: -60, whatsapp: -120, chatbot: -180 };
      }
      if (width >= 768) {
        // Main: 4.5rem (72px), Button: 4rem (64px)
        return { phone: -62, whatsapp: -122, chatbot: -182 };
      }
      if (width >= 640) {
        // Main: 4rem (64px), Button: 3.5rem (56px)
        return { phone: -76, whatsapp: -136, chatbot: -216 };
      }
      // Main: 3.5rem (56px), Button: 3rem (48px)
      return { phone: -60, whatsapp: -134, chatbot: -208 };
    };

    const distances = getDistance();

    if (isOpen) {
      // Opening animation
      const tl = gsap.timeline();

      // Animate phone button
      if (phoneButtonRef.current) {
        tl.to(
          phoneButtonRef.current,
          {
            y: distances.phone,
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          0
        );
      }

      // Animate WhatsApp button
      if (whatsappButtonRef.current) {
        tl.to(
          whatsappButtonRef.current,
          {
            y: distances.whatsapp,
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          0.1
        );
      }

      // Animate Chatbot button
      if (chatbotButtonRef.current) {
        tl.to(
          chatbotButtonRef.current,
          {
            y: distances.chatbot,
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          0.2
        );
      }

      // Rotate main button icon
      if (mainButtonRef.current) {
        gsap.to(mainButtonRef.current.querySelectorAll(".main-icon"), {
          rotation: 180,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    } else {
      // Closing animation
      const tl = gsap.timeline();

      // Animate phone button
      if (phoneButtonRef.current) {
        tl.to(
          phoneButtonRef.current,
          {
            y: 0,
            opacity: 0,
            scale: 0.5,
            duration: 0.2,
            ease: "power2.in",
          },
          0
        );
      }

      // Animate WhatsApp button
      if (whatsappButtonRef.current) {
        tl.to(
          whatsappButtonRef.current,
          {
            y: 0,
            opacity: 0,
            scale: 0.5,
            duration: 0.2,
            ease: "power2.in",
          },
          0
        );
      }

      // Animate Chatbot button
      if (chatbotButtonRef.current) {
        tl.to(
          chatbotButtonRef.current,
          {
            y: 0,
            opacity: 0,
            scale: 0.5,
            duration: 0.2,
            ease: "power2.in",
          },
          0
        );
      }

      // Rotate main button icon back
      if (mainButtonRef.current) {
        gsap.to(mainButtonRef.current.querySelectorAll(".main-icon"), {
          rotation: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    }
  }, [isOpen]);

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = "tel:+917290002168";
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open("https://wa.me/917290002168", "_blank");
  };

  const handleChatbotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Trigger ServicesBoat to open
    setIsRubyOpen(true);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 right-2 z-[9999] flex flex-col items-center justify-end"
      style={{ position: "fixed", bottom: "1rem", right: "0.5rem" }}
    >
      {/* ServicesBoat Component - Hidden button, controlled by chatbot button */}
      {/* <ServicesBoat ref={servicesBoatRef} hideButton={true} /> */}

      {/* Chatbot Button - Top button */}
      <button
        ref={chatbotButtonRef}
        onClick={handleChatbotClick}
        className="absolute w-[50px] h-[50px] bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-gray-100 active:scale-95 z-20"
        aria-label="Chat with bot"
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          bottom: 0,
          opacity: 0,
          transform: "translateY(0) scale(0.5)",
        }}
      >
        <Image
          src="/AI_Bot_Icon.png"
          alt="Ritz Media World"
          title="Ritz Media World"
          width={24}
          height={24}
          className="object-contain"
        />
      </button>

      {/* WhatsApp Button */}
      <button
        ref={whatsappButtonRef}
        onClick={handleWhatsAppClick}
        className="absolute w-[50px] h-[50px] bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-gray-100 active:scale-95 z-20"
        aria-label="WhatsApp us"
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          bottom: 0,
          opacity: 0,
          transform: "translateY(0) scale(0.5)",
        }}
      >
        <FaWhatsapp className="w-6 h-6 text-[#F3830E]" />
      </button>

      {/* Phone Button - Middle button */}
      <button
        ref={phoneButtonRef}
        onClick={handlePhoneClick}
        className="absolute w-[50px] h-[50px] bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-gray-100 active:scale-95 z-20"
        aria-label="Call us"
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          bottom: 0,
          opacity: 0,
          transform: "translateY(0) scale(0.5)",
        }}
      >
        <Phone
          className="w-6 h-6  text-[#F3830E]"
          strokeWidth={2}
        />
      </button>

      {/* Main Toggle Button - Always visible at bottom */}
      <button
        ref={mainButtonRef}
        onClick={toggleMenu}
        className="w-[50px] h-[50px] bg-white rounded-full shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 relative z-30"
        style={{ position: "relative" }}
        aria-label={isOpen ? "Close menu" : "Open contact menu"}
      >
        {/* Chat Icon (shown when closed) */}
        <MessageCircle
          className={`main-icon absolute w-6 h-6 text-[#F3830E] transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
          strokeWidth={2}
        />

        {/* Close Icon (shown when open) */}
        <X
          className={`main-icon absolute w-6 h-6 text-[#F3830E] transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          strokeWidth={2.5}
        />
      </button>
    </div>
  );
}

export default ContactBtns;
