"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, X, Scan, Pause } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./page.module.css";
import axios from "axios";
import Image from "next/image";
import countryCodeData from "../../../country_code.json";
import { usePathname } from "next/navigation";

interface Country {
  name: string;
  code: string;
  dial_code: string;
}
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: Array<{
    0: { transcript: string };
    isFinal: boolean;
  }>;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: {
      new(): ISpeechRecognition;
    };
    webkitSpeechRecognition?: {
      new(): ISpeechRecognition;
    };
  }
}

interface BTNSMSGS {
  msg: string;
  id: number;
}

function ChatBoat() {
  // ------------------------- OLD SESSION LOGIC -------------------------
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [lastDate, setLastDate] = useState<Date>();

  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);
  const path = usePathname();
  // Determine if the component should render
  const hideChatBoat =
    path.includes("/rdx-digital-marketing-course") ||
    path.includes("/rdx-digital-marketing-Course");



  const toggleChat = async () => {
    try {
      const res = await axios.get(
        "https://apis.contenaissance.com/api/v1/session/create",
        {
          headers: {
            "X-API-Key":
              "26f8eb961b3d0b30a20b838cad928389aa38397695d78aa3f89f936903f42bce",
          },
        }
      );
      setSessionId(res.data.session_id);
      sessionStorage.setItem("RMW_SESSION", res.data.session_id);
      setLastDate(new Date());
    } catch (error) {
      console.error("Failed to create session:", error);
    }

    setIsOpen(!isOpen);
    if (backdropRef.current && !isOpen)
      backdropRef.current.style.display = "block";
  };

  const openBoat = () => {
    setIsOpen(true);
    const existingSession = sessionStorage.getItem("RMW_SESSION");
    if (!existingSession) {
      toggleChat();
    } else {
      setSessionId(existingSession);
    }
  };

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

  useEffect(() => {
    if (!lastDate) return;
    const expireMs = 15 * 60 * 1000; // 15 minutes
    const timer = setTimeout(async () => {
      try {
        await axios.post(
          "https://apis.contenaissance.com/api/v1/session/close",
          { session_id: sessionId },
          {
            headers: {
              "X-API-KEY":
                "26f8eb961b3d0b30a20b838cad928389aa38397695d78aa3f89f936903f42bce",
            },
          }
        );
      } catch (err) {
        console.error("Session close error:", err);
      }
    }, expireMs);
    return () => clearTimeout(timer);
  }, [lastDate, sessionId]);

  // ------------------------- NEW UI & CHAT LOGIC -------------------------
  const [isSmall, setIsSmall] = useState<boolean>(false);
  const [mobileView, setMobileView] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 786) {
        // Mobile logic
        setMobileView(true);
        setIsSmall(false);
      } else {
        setMobileView(false);
        setIsSmall(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [msg, setMsg] = useState("");
  const [msgsQue, setMsgsQue] = useState<BTNSMSGS[]>([]);
  const [suggestionsQues, setSuggestionsQue] = useState<BTNSMSGS[]>([]);
  const [btnsQue, setBtnsQue] = useState<BTNSMSGS[]>([
    { id: 1, msg: "Digital Marketing" },
    { id: 2, msg: "Creative Solutions" },
    { id: 3, msg: "Print/Radio Advertising" },
    { id: 4, msg: "Web Design/Tech Solutions" },
    { id: 5, msg: "Generative AI Content" },
    { id: 6, msg: "AI Sales Avatar" },
  ]);
  const [resLoader, setResLoader] = useState(false);
  const chatReff = useRef<HTMLDivElement | null>(null);
  const [isAudiable, setIsAudiable] = useState(false);

  // Auto scroll
  useEffect(() => {
    if (chatReff.current)
      chatReff.current.scrollTop = chatReff.current.scrollHeight;
  }, [msgsQue]);

  const chattingHandler = async () => {
    if (!msg) return;
    console.log('api hit');

    const res2 = await axios.post(
      "https://chatbot.ritzmediaworld.com/chat",
      {
        query: msg,
        history: ['']
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    console.log(res2);
    setMsgsQue((pr) => [
      ...pr,
      { msg, id: pr.length > 0 ? pr[pr.length - 1].id + 1 : 1 },
    ]);
    setMsg("");
    setSuggestionsQue([]);
    try {
      setResLoader(true);
      const data = { session_id: sessionId, user_input: msg };
      const res = await axios.post(
        "https://apis.contenaissance.com/api/v1/chat/v2",
        data,
        {
          headers: {
            "X-API-KEY":
              "26f8eb961b3d0b30a20b838cad928389aa38397695d78aa3f89f936903f42bce",
          },
        }
      );

      setResLoader(false);
      if (res.data.answer_html) {
        setSuggestionsQue([]);
        setMsgsQue((pr) => [
          ...pr,
          {
            msg: res.data.answer_html,
            id: pr.length > 0 ? pr[pr.length - 1].id + 1 : 1,
          },
        ]);
        if (res.data.suggestions) {
          res.data.suggestions.map((ob: string, idx: number) => {
            setSuggestionsQue((prev) => [...prev, { id: idx, msg: ob }]);
          });
        }

        new Audio("/msg-receive.mp3").play().catch(() => { });
      }
    } catch (err) {
      console.log(err);

      setResLoader(false);
      setMsgsQue((pr) => [
        ...pr,
        {
          msg: "Sorry, unable to connect right now. Please try again!",
          id: pr.length > 0 ? pr[pr.length - 1].id + 1 : 1,
        },
      ]);
      new Audio("/msg-receive.mp3").play().catch(() => { });
    }
  };

  const suggestionsHandler = async (msg: string) => {
    if (!msg) return;
    setMsgsQue((pr) => [
      ...pr,
      { msg, id: pr.length > 0 ? pr[pr.length - 1].id + 1 : 1 },
    ]);

    try {
      setResLoader(true);
      const data = { session_id: sessionId, user_input: msg };
      const res = await axios.post(
        "https://apis.contenaissance.com/api/v1/chat/v2",
        data,
        {
          headers: {
            "X-API-KEY":
              "26f8eb961b3d0b30a20b838cad928389aa38397695d78aa3f89f936903f42bce",
          },
        }
      );
      const res2 = await axios.post("https://chatbot.ritzmediaworld.com/chat", data);
      console.log(res2);
      setResLoader(false);
      if (res.data.answer_html) {
        setSuggestionsQue([]);
        setMsgsQue((pr) => [
          ...pr,
          {
            msg: res.data.answer_html,
            id: pr.length > 0 ? pr[pr.length - 1].id + 1 : 1,
          },
        ]);
        if (res.data.suggestions) {
          res.data.suggestions.map((ob: string, idx: number) => {
            setSuggestionsQue((prev) => [...prev, { id: idx, msg: ob }]);
          });
        }
        new Audio("/msg-receive.mp3").play().catch(() => { });
      }
    } catch (err) {
      console.log(err);

      setResLoader(false);
      setMsgsQue((pr) => [
        ...pr,
        {
          msg: "Sorry, unable to connect right now. Please try again!",
          id: pr.length > 0 ? pr[pr.length - 1].id + 1 : 1,
        },
      ]);
      new Audio("/msg-receive.mp3").play().catch(() => { });
    }
  };

  // Speech recognition
  useEffect(() => {
    const SpeechRec:
      | typeof window.SpeechRecognition
      | typeof window.webkitSpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRec) return;

    const recognition = new SpeechRec();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      if (event.results[event.resultIndex].isFinal) {
        setMsg((prev) => `${prev} ${transcript}`);
      }
    };

    if (isAudiable) recognition.start();
    else recognition.stop();

    return () => recognition.stop();
  }, [isAudiable]);

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
    } else {
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          backdropRef.current!.style.display = "none";
        },
      });
    }
  }, [isOpen]);

  const [openForm, setOpenForm] = useState(false);
  interface RESMODAL {
    status: number;
    msg: string;
  }
  // ------------------------- RENDER UI -------------------------
  const [username, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessages] = useState<string>("");
  const [formLoader, setFormLoader] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [modalMsg, setModalMessage] = useState<RESMODAL>({
    status: 200,
    msg: "",
  });
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(sessionId);

    e.preventDefault();
    try {
      setFormLoader(true);
      const num = countryCode + phone;
      const res = await axios.post(
        "https://apis.contenaissance.com/api/v1/user/update",
        {
          session_id: sessionId,
          name: username,
          email: userEmail,
          phone: num,
          message,
        }
      );
      if (res.status === 200) {
        setModalMessage({
          status: 200,
          msg: "Form Submitted!",
        });
      }
      setUserEmail("");
      setMessages("");
      setPhone("");
      setUserName("");
      setFormLoader(false);
    } catch (error) {
      console.log(error);
      setFormLoader(false);
      setModalMessage({
        status: 500,
        msg: "Internal Server Error, Please Try Again",
      });
    }
  };

  // const [search, setSearch] = useState("");

  // filter country codes based on search
  // const filteredCountries = countryCodeData.filter(
  //   (dt) =>
  //     dt.name.toLowerCase().includes(search.toLowerCase()) ||
  //     dt.code.toLowerCase().includes(search.toLowerCase()) ||
  //     dt.dial_code.includes(search)
  // );

  // Generative AI Content,
  if (hideChatBoat) {
    // Return null for rendering, but hooks above are still called
    return null;
  }

  const chatPanelStyle: React.CSSProperties = mobileView
    ? {
        width: "100%",
        height: "100dvh",
        position: "fixed",
        top: 0,
        left: 0,
        transform: "none",
        overflow: "hidden",
        borderRadius: 0,
      }
    : isSmall
      ? {
          width: "min(460px, calc(100vw - 2rem))",
          height: "min(88dvh, 820px)",
          position: "absolute",
          top: "50%",
          right: "1.5rem",
          transform: "translateY(-50%)",
          overflow: "hidden",
          borderRadius: "1rem",
        }
      : {
          width: "min(92vw, 1100px)",
          height: "min(90dvh, 900px)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflow: "hidden",
          borderRadius: "1rem",
        };

  return (
    <>
      <style>
        {`
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
      }
    `}
      </style>
      {/* Full-screen blur backdrop */}
      <div
        ref={backdropRef}
        className={styles.backdrop}
        style={{ display: isOpen ? "block" : "none" }}
      />

      <div className={styles.chatContainer} ref={containerRef}>
        {/* Chat Boat Trigger */}
        <div ref={boatRef} className={styles.chatBoat}>
          {isOpen ? (
            <X
              className={`text-black ${styles.boatIcon}`}
              onClick={() => setIsOpen(false)} // ✅ close chat
            />
          ) : (
            <Image
              src="/chat-icn-ui.png"
              alt="Chat Icon"
              className={`${styles.boatGifIcon} img-fluid`}
              onClick={openBoat} // only open
              width={50}
              height={50}
            />
          )}
          {!isOpen && <span className={styles.pulseAnimation}></span>}
        </div>

        {isOpen && (
          <div
            className="no-scrollbar"
            style={{
              width: "100vw",
              height: "100vh",
              position: "fixed",
              top: 0,
              left: 0,
              padding: 0,
              overflow: "auto", // still scrollable but scrollbar hidden
            }}
          >
            <div
              className={`${styles.txtureClr}`}
              style={chatPanelStyle}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  paddingBottom: "1rem",
                  overflow: "hidden",
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
                      alt="RMW Chat Bot"
                      src="/chat-icn-ui.png"
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
                      RitzBOT
                    </h2>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <button
                      onClick={() => setOpenForm((pr) => !pr)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.5rem 1.5rem",
                        borderRadius: "1.5rem",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        color: "white",
                        background:
                          "linear-gradient(to bottom, #9c6409, #926e2b, #aa7814)",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        cursor: "pointer",
                        transition: "transform 0.15s",
                      }}
                    >
                      {openForm ? "Close Form" : "Get In Touch"}
                    </button>

                    {!mobileView && (
                      <Scan
                        onClick={() => setIsSmall((pr) => !pr)}
                        style={{
                          color: "#111827",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Chat messages / greeting */}
                {msgsQue.length === 0 ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "2rem",
                    }}
                  >
                    <div style={{ maxWidth: "32rem", textAlign: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginBottom: "1.5rem",
                        }}
                      >
                        <Image
                          src="/rmw-logo-final.png"
                          alt="Ritz Media World Logo"
                          width={80}
                          height={80}
                          style={{ objectFit: "contain" }}
                        />
                      </div>

                      <h2
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "#000",
                          marginBottom: "0.75rem",
                        }}
                      >
                        Hi! I&apos;m RitzBOT! <br />A fully-homemade AI
                        Assistant.
                      </h2>

                      <p style={{ color: "#4b5563", lineHeight: 1.5 }}>
                        What can I help you with today?
                      </p>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "0.75rem",
                          flexWrap: "wrap",
                          marginTop: "1rem",
                        }}
                      >
                        {btnsQue.map((btnMsg, idx) => (
                          <button
                            key={idx}
                            onClick={() => (
                              suggestionsHandler(btnMsg.msg), setBtnsQue([])
                            )}
                            style={{
                              padding: "0.5rem 1rem",
                              cursor: "pointer",
                              backgroundColor: "white",
                              border: "1px solid #d1d5db",
                              color: "#000",
                              borderRadius: "9999px",
                              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                              transition: "all 0.2s",
                              fontSize: "0.875rem",
                            }}
                          >
                            {btnMsg.msg}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    ref={chatReff}
                    style={{
                      width: "100%",
                      maxHeight: "75%",
                      overflowY: "auto",
                      paddingTop: "0.5rem",
                      position: "absolute",
                      top: "4rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    {msgsQue.map((dt, idx) => (
                      <div
                        className={`${styles.dgHTML}`}
                        key={idx}
                        style={{
                          maxWidth: "70%",
                          padding: "0.5rem 1rem",
                          borderRadius: "0.5rem",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                          fontSize: "0.875rem",
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                          alignSelf: idx % 2 === 0 ? "flex-end" : "flex-start",
                          backgroundColor:
                            idx % 2 === 0 ? "#f3f4f6" : "#e5e7eb",
                          color: "#000",
                          marginLeft: "10px",
                          marginRight: "10px",
                        }}
                        dangerouslySetInnerHTML={{ __html: dt.msg }}
                      />
                    ))}
                    {suggestionsQues.length > 0 && (
                      <div
                        style={{
                          padding: "15px",
                        }}
                      >
                        {" "}
                        {suggestionsQues.map((btnMsg, idx) => (
                          <button
                            key={idx}
                            onClick={() => (
                              suggestionsHandler(btnMsg.msg),
                              setSuggestionsQue([])
                            )}
                            style={{
                              padding: "0.5rem 1rem", // px-4 py-2
                              cursor: "pointer",
                              backgroundColor: "#ffffff", // bg-white
                              border: "1px solid #d1d5db", // border-gray-300
                              color: "#000000", // text-black
                              borderRadius: "9999px", // rounded-full
                              boxShadow: "0 1px 2px rgba(0,0,0,0.05)", // shadow-sm
                              fontSize: "0.875rem", // text-sm
                              transition: "background 0.2s, border-color 0.2s",
                              marginTop: "10px",
                              marginBottom: "10px",
                              marginRight: "10px",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#f3f4f6"; // hover:bg-gray-100
                              e.currentTarget.style.borderColor = "#9ca3af"; // hover:border-gray-400
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "#ffffff";
                              e.currentTarget.style.borderColor = "#d1d5db";
                            }}
                          >
                            {btnMsg.msg}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Loader when bot is responding */}
                    {resLoader && (
                      <div className={`${styles.botMsg} ${styles.loader}`}>
                        <div className={styles.bounce}></div>
                        <div
                          className={`${styles.bounce} ${styles.delay1}`}
                        ></div>
                        <div
                          className={`${styles.bounce} ${styles.delay2}`}
                        ></div>
                      </div>
                    )}
                  </div>
                )}

                {/* Chat input area */}
                <div
                  style={{
                    width: "95%",
                    height: "4rem",
                    backgroundColor: "white",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid #9ca3af",
                    borderRadius: "2rem",
                  }}
                >
                  <textarea
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey && !resLoader) {
                        e.preventDefault();
                        chattingHandler();
                      }
                    }}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="*Message"
                    style={{
                      resize: "none",
                      width: "95%",
                      height: "100%",
                      padding: "1.25rem 2rem 0 1rem",
                      outline: "none", // removes default focus outline
                      border: "none", // ensures no border
                      boxShadow: "none", // removes any browser focus shadow
                      backgroundColor: "white",
                      color: "black",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      right: "0.25rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "#353535",
                      padding: "0.75rem",
                      borderRadius: "50%",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                  >
                    {isAudiable ? (
                      <Pause
                        onClick={() => setIsAudiable(false)}
                        style={{ color: "#fff" }}
                      />
                    ) : msg !== "" && !resLoader ? (
                      <Send
                        onClick={chattingHandler}
                        style={{ color: "#fff" }}
                      />
                    ) : (
                      <Mic
                        onClick={() => setIsAudiable(true)}
                        style={{ color: "#fff" }}
                      />
                    )}
                  </div>
                </div>

                {/* Form modal */}
                {openForm && (
                  <div
                    style={{
                      width: "100%",
                      height: "calc(100% - 4rem)",
                      position: "absolute",
                      top: "4rem",
                      backgroundColor: "white",
                      display: "flex",
                      flexDirection: "column",
                      color: "black",
                      overflowY: "auto",
                    }}
                  >
                    {/* Form Header */}
                    <div
                      style={{
                        padding: mobileView ? "1rem" : "1.5rem",
                      }}
                    >
                      <h2 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                        Please share your details:
                      </h2>
                      <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                        Kindly provide your basic information so we can reach
                        out to you easily. Please ensure your email and phone
                        number are correct.
                      </p>
                    </div>

                    {/* Form */}
                    <form
                      onSubmit={submitForm}
                      style={{
                        width: "100%",
                        margin: "0",
                        padding: mobileView ? "1rem" : "1.5rem",
                        borderRadius: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      {modalMsg && (
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

                      {/* Name */}
                      <input
                        required
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        type="text"
                        name="name"
                        placeholder="Name*"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "none",
                          borderBottom: "2px solid #AEAEAE",
                          backgroundColor: "none",
                          outline: "none",
                          marginBottom: "1rem",
                          color: "#000000",
                        }}
                      />

                      {/* Email */}
                      <input
                        required
                        onChange={(e) => setUserEmail(e.target.value)}
                        type="email"
                        name="email"
                        value={userEmail}
                        placeholder="Email*"
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
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

                      {/* Phone */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: mobileView ? "column" : "row",
                          gap: "0.5rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <select
                          required
                          name="countryCode"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          style={{
                            width: mobileView ? "100%" : "127px",
                            padding: "0.75rem",
                            border: "none",
                            borderBottom: "2px solid #AEAEAE",
                            backgroundColor: "#FBFBFB",
                            outline: "none",
                            color: "#000000",
                          }}
                        >
                          {countryCodeData.map((dt: Country, idx) => (
                            <option key={idx} value={`${dt.dial_code}`}>
                              {dt.dial_code} {dt.name}
                            </option>
                          ))}
                        </select>

                        <input
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          type="tel"
                          name="phone"
                          placeholder="Phone*"
                          pattern="^[0-9]{7,14}$"
                          style={{
                            flex: 1,
                            padding: "0.75rem",
                            border: "none",
                            borderBottom: "2px solid #AEAEAE",
                            backgroundColor: "#FBFBFB",
                            height: "49px",
                            outline: "none",
                            color: "#000000",
                          }}
                        />
                      </div>

                      {/* Message */}
                      <textarea
                        value={message}
                        onChange={(e) => setMessages(e.target.value)}
                        name="message"
                        placeholder="Message*"
                        rows={4}
                        style={{
                          width: "100%",
                          border: "none",
                          resize: "none",
                          padding: "0.75rem",
                          borderBottom: "2px solid #AEAEAE",
                          backgroundColor: "#FBFBFB",
                          outline: "none",
                          marginBottom: "1rem",
                          color: "#000000",
                        }}
                      />

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={formLoader}
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: formLoader ? "not-allowed" : "pointer",
                          padding: "0.75rem",
                          fontWeight: 500,
                          color: "#ffffff",
                          backgroundColor: formLoader ? "#9ca3af" : "#DCA54F",
                          transition: "background 0.2s",
                          border: "none",
                          borderRadius: "0.375rem",
                        }}
                      >
                        {formLoader ? (
                          <svg
                            style={{
                              height: "1.25rem",
                              width: "1.25rem",
                              color: "#ffffff",
                            }}
                            className="animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                          </svg>
                        ) : (
                          "Submit"
                        )}
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
}

export default ChatBoat;
