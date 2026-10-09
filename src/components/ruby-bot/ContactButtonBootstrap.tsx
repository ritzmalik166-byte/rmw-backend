"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import gsap from "gsap";
import Image from "next/image";
import { RubyContext } from "@/ruby-context/ruby.context";
import styles from "./page.module.css";

function ContactButtonBootstrap() {
  const context = useContext(RubyContext);
  if (!context) {
    throw new Error('ContactButtonBootstrap must be used within RubyProvider');
  }
  const { setIsRubyOpen } = context;
  const [isOpen, setIsOpen] = useState(false);
  const mainButtonRef = useRef<HTMLButtonElement>(null);
  const phoneButtonRef = useRef<HTMLButtonElement>(null);
  const whatsappButtonRef = useRef<HTMLButtonElement>(null);
  const chatbotButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
        const icons = mainButtonRef.current.querySelectorAll('[data-main-icon="true"]');
        gsap.to(icons, {
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
        const icons = mainButtonRef.current.querySelectorAll('[data-main-icon="true"]');
        gsap.to(icons, {
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
    // Trigger RubyBot to open
    setIsRubyOpen(true);
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
    >
      {/* Chatbot Button - Top button */}
      <button
        ref={chatbotButtonRef}
        onClick={handleChatbotClick}
        className={`${styles.subButton} ${isOpen ? styles.buttonActive : styles.buttonInactive}`}
        aria-label="Chat with bot"
      >
        <Image
          src="/AI_Bot_Icon.png"
          alt="Services Bot"
          title="Services Bot"
          width={24}
          height={24}
          className={styles.botIcon}
        />
      </button>

      {/* WhatsApp Button */}
      <button
        ref={whatsappButtonRef}
        onClick={handleWhatsAppClick}
        className={`${styles.subButton} ${isOpen ? styles.buttonActive : styles.buttonInactive}`}
        aria-label="WhatsApp us"
      >
        <FaWhatsapp className={styles.whatsappIcon} />
      </button>

      {/* Phone Button - Middle button */}
      <button
        ref={phoneButtonRef}
        onClick={handlePhoneClick}
        className={`${styles.subButton} ${isOpen ? styles.buttonActive : styles.buttonInactive}`}
        aria-label="Call us"
      >
        <Phone
          className={styles.phoneIcon}
          strokeWidth={2}
        />
      </button>

      {/* Main Toggle Button - Always visible at bottom */}
      <button
        ref={mainButtonRef}
        onClick={toggleMenu}
        className={styles.mainButton}
        aria-label={isOpen ? "Close menu" : "Open contact menu"}
      >
        {/* Chat Icon (shown when closed) */}
        <MessageCircle
          className={`${styles.mainIcon} ${styles.messageIcon} ${
            isOpen ? styles.iconHidden : styles.iconVisible
          }`}
          strokeWidth={2}
          data-main-icon="true"
        />

        {/* Close Icon (shown when open) */}
        <X
          className={`${styles.mainIcon} ${styles.closeIcon} ${
            isOpen ? styles.iconVisible : styles.iconHidden
          }`}
          strokeWidth={2.5}
          data-main-icon="true"
        />
      </button>
    </div>
  );
}

export default ContactButtonBootstrap;
