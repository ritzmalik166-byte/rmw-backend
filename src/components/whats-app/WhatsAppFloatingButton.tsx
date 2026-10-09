"use client";
import React from "react";
import styles from "./page.module.css";
// import { MessageCircle} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Page() {
  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className={styles.whatsappButtonWrapper}>
        <a
          href="https://wa.me/917290002168" 
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappButton}
        >
          <FaWhatsapp size={28} />
        </a>
      </div>
    </>
  );
}
