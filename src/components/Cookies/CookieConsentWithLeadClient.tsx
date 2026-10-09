"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import Link from "next/link";

const CookieConsentWithLeadClient = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [userIP, setUserIP] = useState<string>("");
  const trackIP = async () => {
    try {
      const { data, status } = await axios.get("/api/user-ip-tracker");
      setUserIP(data.IP_ADDRESS);
      return status;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const consent = localStorage.getItem("userIP");
    const track = async () => {
      try {
        const status = await trackIP();
        if (!consent && status === 200) {
          document.body.style.overflow = "hidden";
          setShowBanner(true);
        }
      } catch (error) {
        console.error("IP tracking failed", error);
      }
    };
    track();
  }, []);

  const handleConsent = async (value: "accepted" | "rejected") => {
    if (value === "accepted" && userIP) {
      const DCIP = decodeURIComponent(userIP);

      const { status } = await axios.post("/api/user-ip-tracker", {
        user_ip: userIP,
      });
      if (status === 200) {
        setShowBanner(false);
        localStorage.setItem("userIP", DCIP);
        document.cookie = `userIP=${userIP}; path=/; max-age=${
          60 * 60 * 24 * 365
        }`;
      }
    } else {
      setShowBanner(false);
    }
    document.body.style.overflowY = "auto";
  };

  return (
    <>
      {showBanner && (
        <section className={styles.cookieBanner}>
          <div
            className={styles.bannerContent}
            style={{
              borderRadius: "0px",
            }}
          >
            <p className={styles.bannerText}>
              This website uses cookies to improve user experience on our
              website and help us understand how its used. By using our website,
              you consent to all cookies in accordance with our Cookie Policy.{" "}
              <Link href="/privacy-policy" title="Learn more" className={styles.privacyLink}>
                Learn more
              </Link>
            </p>
            <div className={styles.actions}>
              <button
                style={{
                  borderRadius: "0px",
                }}
                onClick={() => handleConsent("rejected")}
                className={styles.acceptBtn}
              >
                Reject All
              </button>
              <button
                style={{
                  borderRadius: "0px",
                }}
                onClick={() => handleConsent("accepted")}
                className={styles.rejectBtn}
              >
                Accept All
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CookieConsentWithLeadClient;
