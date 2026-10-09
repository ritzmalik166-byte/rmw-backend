"use client";

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./page.module.css";
import Image from "next/image";
import chatData from "../../../new-boat.json";

interface Service {
  title: string;
  description: string;
  cta: string[];
}

interface ServicesData {
  title: string;
  message: string;
  help: string;
  services: Service[];
}

interface ServicesBoatProps {
  hideButton?: boolean;
}

export interface ServicesBoatRef {
  openBoat: () => void;
}

const ServicesBoat = forwardRef<ServicesBoatRef, ServicesBoatProps>(({ hideButton = false }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ServicesData | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [clickedCTA, setClickedCTA] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);
  const chatReff = useRef<HTMLDivElement>(null);
  const [isSmall, setIsSmall] = useState<boolean>(false);
  const [mobileView, setMobileView] = useState<boolean>(false);
  const [selectService, setSelectService] = useState("");

  // Load JSON data
  useEffect(() => {
    if (chatData) {
      setData(chatData);
    }
  }, []);

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 786) {
        setMobileView(true);
        setIsSmall(false);
      } else {
        setMobileView(false);
        setIsSmall(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto scroll
  useEffect(() => {
    if (chatReff.current) {
      const scrollTarget = chatReff.current.scrollHeight - 800;

      // GSAP smooth scroll animation
      gsap.to(chatReff.current, {
        scrollTop: scrollTarget,
        duration: 1.2, // smooth animation speed (in seconds)
        ease: "power2.out", // easing for smooth motion
      });
    }
  }, [selectedServices]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !boatRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // GSAP animation
  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        chatReff.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5 }
      );
    }
  }, [isOpen]);

  const openBoat = () => {
    setIsOpen(true);
    if (backdropRef.current) {
      backdropRef.current.style.display = "block";
    }
  };

  // Expose openBoat function via ref
  useImperativeHandle(ref, () => ({
    openBoat,
  }));

  const handleServiceClick = (service: Service) => {
    setSelectedServices([...selectedServices, service]);
  };

  const handleCTAClick = (ctaText: string, service: Service) => {
    console.log("This is clicked cta ::", ctaText);

    setClickedCTA(ctaText);

    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setClickedCTA("");
  };

  // Helper function to download PDF from local public folder (forces download instead of opening)
  const downloadPDF = async (pdfPath: string, filename: string) => {
    try {
      const response = await fetch(pdfPath);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.status}`);
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Fallback to direct download if fetch fails
      const link = document.createElement("a");
      link.href = pdfPath;
      link.download = filename;
      link.click();
    }
  };

  // Form states
  const [username, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessages] = useState<string>("");
  const [formLoader, setFormLoader] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [modalMsg, setModalMessage] = useState<{ status: number; msg: string }>(
    {
      status: 200,
      msg: "",
    }
  );

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Use This API For This Form
    const data = {
      etype: "ContactUs",
      name: username,
      phone: phone,
      email: userEmail,
      message,
    };

    setFormLoader(true);

    try {
      const response = await fetch("/api/system-settings/contact-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setModalMessage({
          status: 200,
          msg: "Form Submitted Successfully!",
        });
        setUserEmail("");
        setMessages("");
        setPhone("");
        setUserName("");

        // And After Enquiry Submit Follow This
        if (selectService === "Creative Services") {
          window.open("https://www.instagram.com/rmwshowcase", "_blank");
        } else if (selectService === "Generative AI") {
          window.open("https://www.instagram.com/contenaissance", "_blank");
        } else if (selectService === "Radio Advertising") {
          window.open(
            "https://www.youtube.com/watch?v=OK7F9GSysps&list=PLF2LkcQMvAI8JKNM1iRu6eFIbqQvwklUt",
            "_blank"
          );
        } else if (selectService === "Digital Marketing") {
          downloadPDF(
            "/DigitalmarketingCaseStudy.pdf",
            "DigitalmarketingCaseStudy.pdf"
          );
        } else if (selectService === "Celebrity Endorsement") {
          downloadPDF(
            "/CelebrityEndorsements.pdf",
            "CelebrityEndorsements.pdf"
          );
        } else {
          downloadPDF(
            "/RMWCaseStudies_250327_081936.pdf",
            "RMW_CaseStudies.pdf"
          );
        }
      } else {
        setModalMessage({
          status: 400,
          msg: "Failed to submit form. Please try again.",
        });
      }
    } catch (error) {
      setModalMessage({
        status: 500,
        msg: "An error occurred. Please try again later.",
      });
    } finally {
      setFormLoader(false);
      setTimeout(() => {
        setShowForm(false);
        setModalMessage({ status: 200, msg: "" });
      }, 2000);
    }
  };

  return (
    <>
      <style>
        {`
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}
      </style>

      {/* Full-screen blur backdrop */}
      <div
        ref={backdropRef}
        className={styles.backdrop}
        style={{ display: isOpen ? "block" : "none" }}
      />

      <div className={styles.servicesContainer} ref={containerRef}>
        {/* Services Boat Trigger */}
        {!hideButton && (
          <div ref={boatRef} className={styles.servicesBoat}>
            {isOpen ? (
              <X
                className={`text-black ${styles.boatIcon}`}
                onClick={() => {
                  setIsOpen(false);
                  setShowForm(false);
                  setSelectedServices([]);
                }}
              />
            ) : (
              <Image
                src="/AI_Bot_Icon.png"
                alt="Services Icon"
                className={`${styles.boatGifIcon} img-fluid`}
                onClick={openBoat}
                width={50}
                height={50}
              />
            )}
            {!isOpen && <span className={styles.pulseAnimation}></span>}
          </div>
        )}

        {isOpen && data && (
          <div
            className="no-scrollbar"
            style={{
              width: "100vw",
              height: "100vh",
              position: "fixed",
              top: 0,
              left: 0,
              padding: 0,
              overflow: "hidden",
            }}
          >
            <div
              className={`${styles.txtureClr}`}
              style={{
                width: isSmall ? "460px" : "90%",
                height: "90%",
                position: "absolute",
                top: "50%",
                left: isSmall ? undefined : "50%",
                right: isSmall ? "20%" : undefined,
                transform: isSmall
                  ? "translateY(-50%) translateX(50%)"
                  : "translate(-50%, -50%)",
                overflow: "hidden",
                borderRadius: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  paddingBottom: "1rem",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    width: "100%",
                    height: "4rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 1.5rem",
                    borderBottom: "1px solid #d1d5db",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    backgroundColor: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <Image
                      alt="Services"
                      src="/logo_blue.png"
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        objectFit: "contain",
                      }}
                      width={50}
                      height={50}
                      priority
                    />
                    <h2
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      {data.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setShowForm(false);
                      setSelectedServices([]);
                    }}
                    style={{
                      padding: "0.5rem",
                      borderRadius: "0.5rem",
                      border: "1px solid #d1d5db",
                      background: "white",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f3f4f6";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "white";
                    }}
                    aria-label="Close"
                  >
                    <X size={20} color="#111827" />
                  </button>
                </div>

                {!showForm ? (
                  <>
                    {/* Chat messages */}
                    <div
                      ref={chatReff}
                      style={{
                        width: "100%",
                        // maxHeight: "75%",
                        overflowY: "auto",
                        paddingTop: "0.5rem",
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      {/* Initial Greeting - Always Show */}
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                          padding: "0rem 1rem 0.5rem",
                        }}
                      >
                        {/* Title as Logo */}
                        <div
                          style={{
                            width: "80px",
                            height: "80px",
                            background:
                              "linear-gradient(135deg, #8A5A0D 0%, #DCA54F 100%)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "2rem",
                            fontWeight: "bold",
                            color: "white",
                            marginBottom: "1rem",
                          }}
                        >
                          {data.title.charAt(0)}
                        </div>

                        {/* Title Message */}
                        <h2
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: "#000",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {data.title}
                        </h2>

                        {/* Welcome Message */}
                        <p
                          style={{
                            color: "#4b5563",
                            lineHeight: 1.5,
                            marginBottom: "1rem",
                            maxWidth: "500px",
                            fontSize: "0.875rem",
                          }}
                        >
                          {data.message}
                        </p>

                        {/* Help Message */}
                        <h3
                          style={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: "#111827",
                            marginBottom: "1rem",
                          }}
                        >
                          {data.help}
                        </h3>

                        {/* Service Buttons Grid - Always show below */}
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: mobileView
                              ? "1fr"
                              : "repeat(3, 1fr)",
                            gap: "0.75rem",
                            maxWidth: "600px",
                            width: "100%",
                            marginTop: "0.5rem",
                          }}
                        >
                          {data.services.map((service, idx) => {
                            const isSelected = selectedServices.some(
                              (s) => s.title === service.title
                            );
                            return (
                              <button
                                key={idx}
                                onClick={() => {
                                  handleServiceClick(service),
                                    setSelectService(service.title);
                                }}
                                style={{
                                  padding: "0.45rem 0.65rem",

                                  backgroundColor: "white",
                                  border: "1px solid #A27020",
                                  color: "#000",
                                  borderRadius: "29px",
                                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                  transition: "all 0.2s",
                                  fontSize: "0.775rem",
                                  fontWeight: 600,
                                  textAlign: "center",
                                  opacity: 1,
                                  lineHeight: "18px",
                                  //   whiteSpace:'nowrap'
                                }}
                              >
                                {service.title}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Show all selected service responses */}
                      {selectedServices.length > 0 && (
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.5rem",
                          }}
                        >
                          {selectedServices.map((service, idx) => (
                            <div
                              key={idx}
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                              }}
                            >
                              {/* Service Title Badge */}
                              <div
                                style={{
                                  alignSelf: "end",
                                  backgroundColor: "#8A5A0D",
                                  color: "white",
                                  padding: "0.75rem 1.5rem",
                                  borderRadius: "1rem",
                                  fontSize: "0.875rem",
                                  fontWeight: 600,
                                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                }}
                              >
                                {service.title}
                              </div>

                              {/* Description and CTAs */}
                              <div
                                style={{
                                  alignSelf: "start",
                                  maxWidth: "80%",
                                  padding: "1.5rem",
                                  borderRadius: "0.75rem",
                                  backgroundColor: "#f3f4f6",
                                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                }}
                              >
                                <p
                                  style={{
                                    color: "#6b7280",
                                    fontSize: "0.875rem",
                                    lineHeight: 1.8,
                                    marginBottom: "1.5rem",
                                  }}
                                >
                                  {service.description}
                                </p>

                                {/* CTA Buttons */}
                                <div
                                  style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "0.5rem",
                                    justifyContent: "start",
                                  }}
                                >
                                  {service.cta.map((ctaText, ctaIdx) => (
                                    <button
                                      key={ctaIdx}
                                      onClick={() =>
                                        handleCTAClick(ctaText, service)
                                      }
                                      style={{
                                        padding: "0.5rem 1rem",
                                        backgroundColor:
                                          ctaIdx === 0 ? "#8A5A0D" : "white",
                                        color:
                                          ctaIdx === 0 ? "white" : "#8A5A0D",
                                        border: "2px solid #8A5A0D",
                                        borderRadius: "0.5rem",
                                        cursor: "pointer",
                                        fontSize: "0.875rem",
                                        fontWeight: 600,
                                        transition: "all 0.2s",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                          "#7A4F0B";
                                        e.currentTarget.style.color = "white";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                          ctaIdx === 0 ? "#8A5A0D" : "white";
                                        e.currentTarget.style.color =
                                          ctaIdx === 0 ? "white" : "#8A5A0D";
                                      }}
                                    >
                                      {ctaText}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* Service Buttons Grid - Always show below */}
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: mobileView
                                ? "1fr"
                                : "repeat(3, 1fr)",
                              gap: "0.75rem",
                              maxWidth: "600px",
                              width: "100%",
                              marginTop: "0.5rem",
                            }}
                          >
                            {data.services.map((service, idx) => {
                              const isSelected = selectedServices.some(
                                (s) => s.title === service.title
                              );
                              return (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    setTimeout(() => {
                                      handleServiceClick(service),
                                        setSelectService(service.title);
                                    }, 200);
                                  }}
                                  style={{
                                    padding: "0.45rem 0.65rem",

                                    backgroundColor: "white",
                                    border: "1px solid #A27020",
                                    color: "#000",
                                    borderRadius: "29px",
                                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                    transition: "all 0.2s",
                                    fontSize: "0.775rem",
                                    fontWeight: 600,
                                    textAlign: "center",
                                    opacity: 1,
                                    lineHeight: "18px",
                                    //   whiteSpace:'nowrap'
                                  }}
                                >
                                  {service.title}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  /* FORM INTERFACE - Replaces Chat */
                  <div
                    style={{
                      width: "100%",
                      height: "calc(100% - 4rem)",
                      position: "absolute",
                      top: "4rem",
                      left: 0,
                      backgroundColor: "white",
                      display: "flex",
                      flexDirection: "column",
                      color: "black",
                      overflowY: "auto",
                    }}
                  >
                    {/* Form */}
                    <form
                      onSubmit={submitForm}
                      style={{
                        width: "100%",
                        padding: "1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      {/* Form Header with Close Button (Top Left) */}
                      <div
                        style={{
                          // padding: "1.5rem",
                          // borderBottom: "1px solid #d1d5db",
                          position: "sticky",
                          top: 0,
                          backgroundColor: "white",
                          zIndex: 10,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h2 style={{ fontSize: "18px" }}>
                          Fill enquiry form to{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {clickedCTA}
                          </span>
                        </h2>
                        <button
                          onClick={handleFormClose}
                          style={{
                            padding: "0.5rem",
                            borderRadius: "0.5rem",
                            border: "1px solid #d1d5db",
                            background: "white",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f3f4f6";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "white";
                          }}
                        >
                          <X size={20} color="#8A5A0D" />
                        </button>
                      </div>
                      {modalMsg.msg && (
                        <div
                          style={{
                            textAlign: "center",
                            fontWeight: 500,
                            color:
                              modalMsg.status === 200 ? "#16a34a" : "#ef4444",
                          }}
                        >
                          <p>{modalMsg.msg}</p>
                        </div>
                      )}

                      <input
                        required
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        type="text"
                        placeholder="Name*"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "none",
                          borderBottom: "2px solid #AEAEAE",
                          outline: "none",
                          marginBottom: "1rem",
                          color: "#000000",
                        }}
                      />

                      <input
                        required
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        type="email"
                        placeholder="Email*"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "none",
                          borderBottom: "2px solid #AEAEAE",
                          backgroundColor: "#FBFBFB",
                          outline: "none",
                          marginBottom: "1rem",
                          color: "#000000",
                        }}
                      />

                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          style={{
                            width: "127px",
                            padding: "0.75rem",
                            border: "none",
                            borderBottom: "2px solid #AEAEAE",
                            backgroundColor: "#FBFBFB",
                            outline: "none",
                            color: "#000000",
                          }}
                        >
                          <option value="+91">+91 India</option>
                          <option value="+1">+1 USA</option>
                          <option value="+44">+44 UK</option>
                        </select>

                        <input
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          type="tel"
                          placeholder="Phone*"
                          style={{
                            flex: 1,
                            padding: "0.75rem",
                            border: "none",
                            borderBottom: "2px solid #AEAEAE",
                            backgroundColor: "#FBFBFB",
                            outline: "none",
                            color: "#000000",
                          }}
                        />
                      </div>

                      <textarea
                        value={message}
                        onChange={(e) => setMessages(e.target.value)}
                        placeholder="Message*"
                        rows={4}
                        style={{
                          width: "100%",
                          resize: "none",
                          padding: "0.75rem",
                          border: "none",
                          borderBottom: "2px solid #AEAEAE",
                          backgroundColor: "#FBFBFB",
                          outline: "none",
                          marginBottom: "1rem",
                          color: "#000000",
                        }}
                      />

                      <button
                        type="submit"
                        disabled={formLoader}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          fontWeight: 500,
                          color: "#ffffff",
                          backgroundColor: formLoader ? "#9ca3af" : "#DCA54F",
                          border: "none",
                          borderRadius: "0.375rem",
                          cursor: formLoader ? "not-allowed" : "pointer",
                        }}
                      >
                        {formLoader ? "Submitting..." : "Submit"}
                      </button>

                      <p
                        style={{
                          fontSize: "16px",
                          color: "gray",
                          textAlign: "center",
                          alignSelf: "center",
                          paddingTop: "18px",
                        }}
                      >
                        OR IVR
                      </p>
                      <button
                        onClick={() => {
                          window.location.href = "tel:+91-9220516777";
                        }}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          fontWeight: 500,
                          color: "#ffffff",
                          backgroundColor: "#111642",
                          border: "none",
                          borderRadius: "0.375rem",
                          cursor: "pointer",
                          transition: "background-color 0.3s ease",
                        }}
                      >
                        Call RMW
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
});

ServicesBoat.displayName = "ServicesBoat";

export default ServicesBoat;
