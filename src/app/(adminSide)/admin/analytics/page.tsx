"use client";
import React, { useEffect, useState } from "react";
import Row1 from "./compo/Row1";
import Row2 from "./compo/Row2";
import Row3 from "./compo/Row3";
import axios from "axios";
import { TrendingUp, Calendar, Download, RefreshCw } from "lucide-react";
import styles from "./page.module.css";

// Interface for Devices Info items
interface DeviceInfoItem {
  totalPhones?: number;
  totalTablets?: number;
  totalDekstopDevices?: number;
  overAllPercentage: number;
}

// Union type for the data property of different query types
type AnalyticalDataItemData =
  | { totalUsers: string; performanceAvg: string }
  | { totalSessions: string; performanceAvg: string }
  | { totalBounceUsers: string; lastUsersBounceRate: string }
  | { usersSpentTime: string; lastSpentTimeAvg: string }
  | {
      totalSessions: number;
      totalSessionsRaw: number;
      cityWise: Record<string, number>;
      cityWiseRaw: Record<string, number>;
    }
  | Record<string, number> // For User Travel Paths & User Referral Sources
  | DeviceInfoItem[]; // For Devices Info

// Main interface for analytical data
interface AnalyticalDataItem {
  queryType:
    | "Total Users"
    | "Session Count"
    | "Bounce Rate"
    | "Avg. Visit Duration"
    | "Session Analytics By City"
    | "User Travel Paths"
    | "User Referral Sources"
    | "User Page Activity"
    | "Devices Info";
  data: AnalyticalDataItemData;
}

// Type for your array
type AnalyticalData = AnalyticalDataItem[];

interface PageActivityData {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
}

interface UserPageActivity {
  [url: string]: PageActivityData;
}

function Page() {
  const [duration, setDuration] = useState<string>("All");
  const [filter, setFilter] = useState<string>("All");
  const [queryType, setQueryType] = useState<string>("All");
  const [qType, setQType] = useState<string | undefined>("Total");
  const [analyticalData, setAnalyticalData] = useState<AnalyticalData>([]);

  const [totalUsers, setTotalUsers] = useState<{
    totalUsers: string;
    performanceAvg: string;
  } | null>(null);

  // For "Session Count"
  const [sessionCount, setSessionCount] = useState<{
    totalSessions: string;
    performanceAvg: string;
  } | null>(null);

  // For "Bounce Rate"
  const [boundeRate, setBoundeRate] = useState<{
    totalBounceUsers: string;
    lastUsersBounceRate: string;
  } | null>(null);

  // For "Avg. Visit Duration"
  const [avgVisitDuration, setAvgVisitDuration] = useState<{
    usersSpentTime: string;
    lastSpentTimeAvg: string;
  } | null>(null);

  // For "Session Analytics By City"
  const [sessionAnalyticsByCity, setSessionAnalyticsByCity] = useState<{
    totalSessions: number;
    totalSessionsRaw: number;
    cityWise: Record<string, number>;
    cityWiseRaw: Record<string, number>;
  } | null>(null);

  // For "User Travel Paths" & "User Referral Sources"
  const [userTravelPath, setUserTravelPath] = useState<Record<
    string,
    number
  > | null>(null);
  const [userRefferalSources, setUserRefferalSources] = useState<Record<
    string,
    number
  > | null>(null);

  // For "Devices Info"
  const [devicesData, setDevicesData] = useState<DeviceInfoItem[] | null>(null);

  // For "User Page Activity"
  const [userPageActivity, setUserPageActivity] =
    useState<UserPageActivity | null>(null);

  const getAnalyticalData = async () => {
    try {
      const { data } = await axios.post("/api/analytics", {
        queryType,
        duration,
        filter,
        qType,
      });
      if (data.data) {
        setAnalyticalData(data.data);
      }
    } catch (error) {
      console.log("Internal Server Error", error);
    }
  };
  useEffect(() => {
    getAnalyticalData();
  }, [duration, filter, queryType, qType]);

  useEffect(() => {
    if (analyticalData.length > 0) {
      analyticalData.forEach((data) => {
        switch (data.queryType) {
          case "Total Users":
            setTotalUsers(
              data.data as { totalUsers: string; performanceAvg: string }
            );
            break;
          case "Session Count":
            setSessionCount(
              data.data as { totalSessions: string; performanceAvg: string }
            );
            break;
          case "Bounce Rate":
            setBoundeRate(
              data.data as {
                totalBounceUsers: string;
                lastUsersBounceRate: string;
              }
            );
            break;
          case "Avg. Visit Duration":
            setAvgVisitDuration(
              data.data as { usersSpentTime: string; lastSpentTimeAvg: string }
            );
            break;
          case "Session Analytics By City":
            setSessionAnalyticsByCity(
              data.data as {
                totalSessions: number;
                totalSessionsRaw: number;
                cityWise: Record<string, number>;
                cityWiseRaw: Record<string, number>;
              }
            );
            break;
          case "User Travel Paths":
            setUserTravelPath(data.data as Record<string, number>);
            break;
          case "User Referral Sources":
            setUserRefferalSources(data.data as Record<string, number>);
            break;
          case "Devices Info":
            setDevicesData(data.data as DeviceInfoItem[]);
            break;
          case "User Page Activity":
            setUserPageActivity(data.data as unknown as UserPageActivity);
            break;
        }
      });
    }
  }, [analyticalData]);

  const [liveUsers, setLiveUsers] = useState(0);

useEffect(() => {
  async function getActiveUsers() {
    try {
      const res = await axios.get("/api/socket");
      setLiveUsers(res.data.count.length);
    } catch (err) {
      console.error("Failed to fetch active users", err);
    }
  }

  getActiveUsers();
  const interval = setInterval(getActiveUsers, 5000);

  return () => clearInterval(interval);
}, []);


  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [analyticalData]);

  useEffect(() => {
    setLastUpdated(new Date());
  }, [analyticalData]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <section className={styles.analyticsPage}>
      {/* Professional Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <h1 className={styles.pageTitle}>Analytics Dashboard</h1>
            <p className={styles.pageSubtitle}>
              Comprehensive insights into your website performance
            </p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.lastUpdate}>
              <RefreshCw size={14} className={styles.icon} />
              <span>Last updated: {formatTime(lastUpdated)}</span>
            </div>
            <button className={styles.downloadBtn}>
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Overview */}
        <div className={styles.quickStats}>
          <div className={styles.quickStatCard}>
            <TrendingUp size={20} className={styles.quickStatIcon} />
            <div>
              <div className={styles.quickStatValue}>{liveUsers}</div>
              <div className={styles.quickStatLabel}>Live Users</div>
            </div>
          </div>
          <div className={styles.quickStatCard}>
            <TrendingUp size={20} className={styles.quickStatIcon} />
            <div>
              <div className={styles.quickStatValue}>{totalUsers?.totalUsers || "0"}</div>
              <div className={styles.quickStatLabel}>Total Users</div>
            </div>
          </div>
          <div className={styles.quickStatCard}>
            <TrendingUp size={20} className={styles.quickStatIcon} />
            <div>
              <div className={styles.quickStatValue}>{sessionCount?.totalSessions || "0"}</div>
              <div className={styles.quickStatLabel}>Sessions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading analytics data...</p>
        </div>
      )}

      {/* Total Users, Session Count, Bounce Rate, Avg. Visit Duration, User Session Analytics in Row1 */}
      <Row1
        totalUsers={totalUsers}
        sessionCount={sessionCount}
        boundeRate={boundeRate}
        avgVisitDuration={avgVisitDuration}
        setDuration={setDuration}
        setFilter={setFilter}
        setQueryType={setQueryType}
        liveUsers={liveUsers}
      />

      {/* Session data by month, User travel paths in Row2 */}
      <Row2
        userTravelPath={userTravelPath}
        setDuration={setDuration}
        setQueryType={setQueryType}
      />

      {/* User Devices, User Referral Sources, User Page Activity in Row3 */}
      <Row3
        devicesData={devicesData}
        userRefferalSources={userRefferalSources}
        setDuration={setDuration}
        setQueryType={setQueryType}
        userPageActivity={userPageActivity} // Pass it here
      />
    </section>
  );
}

export default Page;