"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface USERADDRESS {
  userCity: string;
  userCountry: string;
  userPincode: string;
  userArea: string;
}
interface USERNAVIGATION {
  pageLink: string;
  timeCount: number;
}
interface UNIQUEUSER {
  user_id: string;
  saved_date: string;
}

export default function AnalyticsTracker() {
  const [userAddress, setUserAddress] = useState<USERADDRESS>();
  const [userVisitTimePerPage, setUserVisitPerPage] = useState<
    USERNAVIGATION[]
  >([]);

  const prevPathRef = useRef<string | null>(null);
  const currPath = usePathname();

  // Fetch User Address :
  const [usersIP, setUsersIP] = useState<string>();
  const userIPTracker = async () => {
    try {
      const { data, status } = await axios.get("/api/user-ip-tracker");
      if (status === 200) {
        setUserAddress({
          userCity: data.userAddress.user_city,
          userCountry: data.userAddress.user_country,
          userArea: data.userAddress.user_place,
          userPincode: data.userAddress.user_pinCode,
        });
        setUsersIP(data.IP_ADDRESS);
        console.log(usersIP);
      }
    } catch (error) {
      console.log("Err in fetching user ip : ", error);
    }
  };
  useEffect(() => {
    userIPTracker();
  }, []);

  // Count User Time On Every Page
  const timeRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start timer for current page
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      timeRef.current += 1;
    }, 1000);

    // Save time spent on previous page (if exists)
    if (prevPathRef.current && timeRef.current > 0) {
      setUserVisitPerPage((prev) => [
        ...prev,
        {
          timeCount: timeRef.current,
          pageLink: prevPathRef.current as string,
        },
      ]);
    }

    // Reset timer and update previous page reference
    timeRef.current = 0;
    prevPathRef.current = window.location.href;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currPath]);

  // Generate User Unique ID :
  function generateRandomString(length = 12) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }

  const [isNewUser, setIsNewUser] = useState(false);
  const [userId, setUserId] = useState("");

  // Handle BeforeUnload Event (send data to backend)
  useEffect(() => {
    const handleUserTrack = () => {
      // Add the current page time before sending
      const finalData = [
        ...userVisitTimePerPage,
        { timeCount: timeRef.current, pageLink: window.location.href },
      ];

      if (isNewUser) {
        const payload = {
          user: userId,
          userVisitTimePerPage: finalData,
          trafficSource: document.referrer,
          userAddress: userAddress || {
            userCity: "",
            userCountry: "",
            userPincode: "",
            userArea: "",
          },
        };

        const blob = new Blob([JSON.stringify(payload)], {
          type: "application/json",
        });
        navigator.sendBeacon("/api/analytics/create-user", blob);
      } else {
        const payload = {
          user: userId,
          userVisitTimePerPage: finalData,
        };
        const blob = new Blob([JSON.stringify(payload)], {
          type: "application/json",
        });
        navigator.sendBeacon("/api/analytics/revisit-user", blob);
      }
    };

    window.addEventListener("beforeunload", handleUserTrack);
    return () => {
      window.removeEventListener("beforeunload", handleUserTrack);
    };
  }, [isNewUser, userId, userVisitTimePerPage, userAddress]);

  // Analytics Main Logic ---
  function analyticsIdController() {
    const createUser: UNIQUEUSER = { user_id: "", saved_date: "" };
    const date = new Date();
    const getUser = localStorage.getItem("RMW_AN_USER");

    if (!getUser) {
      const id = generateRandomString();
      const visitDate = date.toISOString();
      createUser.user_id = id;
      createUser.saved_date = visitDate;
      localStorage.setItem("RMW_AN_USER", JSON.stringify(createUser));

      setUserId(id);
      setIsNewUser(true);
    } else {
      const extractOBJ: UNIQUEUSER = JSON.parse(getUser);
      const currentDate = date.getTime();
      const lastSavedDate = new Date(extractOBJ.saved_date);
      const diff = currentDate - lastSavedDate.getTime();
      const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (diffDays < 30) {
        setUserId(extractOBJ.user_id);
        setIsNewUser(false);
      } else {
        localStorage.removeItem("RMW_AN_USER");
        const id = generateRandomString();
        const visitDate = date.toISOString();
        createUser.user_id = id;
        createUser.saved_date = visitDate;
        localStorage.setItem("RMW_AN_USER", JSON.stringify(createUser));

        setUserId(id);
        setIsNewUser(true);
      }
    }
  }

  useEffect(() => {
    analyticsIdController();
  }, []);

  return null;
}