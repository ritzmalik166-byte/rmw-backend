"use client";
import React, { useState, useRef, useEffect } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import styles from "./page.module.css";
import axios from "axios";

interface RDXModalProps {
  onClick: () => void;
}
interface USERIPDATA {
  user_city: string;
  user_country: string;
  user_device: string;
  user_pinCode: string;
  user_place: string;
}

function Popup({
  message,
  onClose,
  onClick,
}: {
  message: string;
  onClose: () => void;
  onClick: () => void;
}) {
  return (
    <div className={styles.popupOverlay}>
      <div className={`${styles.popupBox}`}>
        <p>{message}</p>
        <button
          onClick={() => {
            onClose();
            onClick();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}

function RDXModal({ onClick }: RDXModalProps) {
  const captchaRef = useRef<HCaptcha>(null);

  // Track User I.P Address For Modal Form ::
  const [Name, setUserName] = useState<string>("");
  const [Email, setUserEmail] = useState<string>("");
  const [Phone, setUserPhone] = useState<string>("");
  const [Device, setUserDevice] = useState<string>("");
  const [City, setUserCity] = useState<string>("");
  const [Country, setUserCountry] = useState<string>("");
  const [FillDate, setCurrentData] = useState<string>("");
  const [Time, setCurrentTime] = useState<string>("");
  const [Place, setUserPlace] = useState<string>("");
  const [Pincode, setUserPincode] = useState<string>("");
  const [Course, selectUserCourse] = useState<string>("");
  const [loader, setFormLoader] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [popupType, setPopupType] = useState<"success" | "error" | "">("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    async function trackUserIP() {
      try {
        const { data } = await axios.get("/api/user-ip-tracker");
        if (data) {
          const {
            user_city,
            user_country,
            user_device,
            user_pinCode,
            user_place,
          }: USERIPDATA = data.userAddress;
          setUserCity(user_city);
          setUserCountry(user_country);
          setUserDevice(user_device);
          setUserPincode(user_pinCode);
          setUserPlace(user_place);
        } else {
          setUserCity("Sorry Not Found !");
          setUserCountry("Sorry Not Found !");
          setUserDevice("Sorry Not Found !");
          setUserPincode("Sorry Not Found !");
          setUserPlace("Sorry Not Found !");
        }
      } catch (error) {
        console.log("Tracking Error", error);
      }
    }
    trackUserIP();
  }, []);

  const currentData = new Date();

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    
    // Validate repetitive digits
    if (Phone) {
      const digitsOnly = Phone.replace(/\D/g, "");
      if (digitsOnly.length >= 10) {
        const firstDigit = digitsOnly[0];
        if (digitsOnly.split('').every(digit => digit === firstDigit)) {
          setPopupMessage("❌ Please enter a valid phone number");
          setPopupType("error");
          setShowPopup(true);
          return;
        }
      }
    }
    
    setFormLoader(true);
    const crTime = currentData.toLocaleTimeString();
    setCurrentTime(crTime);
    setCurrentData(currentData.toLocaleDateString());

    try {
      const formData = new FormData();
      formData.append("Name", Name);
      formData.append("Email", Email);
      formData.append("Phone", Phone);
      formData.append("Device", Device);
      formData.append("City", City);
      formData.append("Country", Country);
      formData.append("FillDate", FillDate);
      formData.append("Time", Time);
      formData.append("Place", Place);
      formData.append("Pincode", Pincode);
      formData.append("Course", Course);
      console.log(Time, City, Country, Place, Pincode, Device);

      const { data } = await axios.post(
        "https://script.google.com/macros/s/AKfycbzFqaCNywGWywm5fROT1tCxBzuMNyWIRni_ACmMqBbEsBEFKbnksKIDjpX6BCQZTY40eQ/exec", // <--deployed web app URL
        formData
      );

      if (data.result === "success") {
        setPopupMessage("✅ Data saved to Google Sheet successfully!");
        setPopupType("success");
        setShowPopup(true);
      } else {
        setPopupMessage("❌ Error saving data: " + (data.error?.message || ""));
        setPopupType("error");
        setShowPopup(true);
      }

      setFormLoader(false);
      setUserCity("");
      setUserCountry("");
      setUserDevice("");
      setUserPincode("");
      setUserPlace("");
      setUserName("");
      setUserEmail("");
      setUserPhone("");
      selectUserCourse("");
      setCurrentData("");
      setCurrentTime("");
    } catch (error) {
      setFormLoader(false);
      console.error("Internal Server Error!", error);
      setPopupMessage("Something went wrong while submitting the form.");
      setPopupType("error");
      setShowPopup(true);
    }
  }

  return (
    <>
      <div className={styles.modalOverlay}>
        {showPopup && (popupType === "success" || popupType === "error") && (
          <Popup
            message={popupMessage}
            onClose={() => setShowPopup(false)}
            onClick={onClick}
          />
        )}

        <div className={styles.modalContent}>
          <button className={styles.closeBtn} onClick={() => onClick()}>
            ✖
          </button>

          <h2 className={styles.modalTitle}>Register Now</h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              name="Name"
              value={Name}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Name"
              required
            />
            <input
              name="Email"
              value={Email}
              onChange={(e) => setUserEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
            />
            <input
              name="Phone"
              value={Phone}
              onChange={(e) => setUserPhone(e.target.value)}
              type="tel"
              placeholder="Phone"
              required
            />

            <select
              name="Course"
              onChange={(e) => selectUserCourse(e.target.value)}
              required
            >
              <option value="">Select Course</option>
              <option value="digital-marketing-mastery">
                Digital Marketing Mastery
              </option>
            </select>

            {/* Captcha */}
            <HCaptcha
              sitekey="e4a44c7a-13c4-4534-b210-d41242d2d262"
              onVerify={(token) => {
                console.log("Captcha verified:", token);
                setIsVerified(true); // Captcha verify hone par button enable
              }}
              ref={captchaRef}
            />

            <button
              style={{
                cursor: isVerified ? "pointer" : "not-allowed",
              }}
              type="submit"
              className={styles.submitBtn}
              disabled={!isVerified || loader} // Disable until verified or loading
            >
              {loader ? <div className={styles.loader}></div> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RDXModal;
