"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Download } from "lucide-react";
import * as XLSX from "xlsx";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import RMWPopup from "@/components/rmw_popup/RMWPopup";

interface PageLink {
  link: string;
  name: string;
  sub: {
    link: string;
    name: string;
  }[];
}


export default function Page() {
  const [pagesLinks, setPagesLinks] = useState<PageLink[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ message: "", status: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isBackupLoading, setIsBackupLoading] = useState(false);
  const getAllPagesLinks = async () => {
    try {
      setIsLoading(true);
      const { data, status } = await axios.get("/api/header_data");
      setPagesLinks(data);
      setPopupData({ message: data.message, status });
      setShowPopup(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (typeof error === "object" && error !== null && "message" in error) {
        setPopupData({
          message: (error as { message: string }).message,
          status:
            error instanceof Error && "status" in error
              ? (error as { status?: number }).status ?? 500
              : 500,
        });
      } else {
        setPopupData({ message: "An unknown error occurred.", status: 500 });
      }
      setShowPopup(true);
    }
  };

  const router = useRouter();

  // Get Backup Of All Content  :::
  const getBackup = async () => {
    try {
      setIsBackupLoading(true);
      const { data } = await axios.get("/api/get-services-backup");
      
      if (data.success && data.data) {
        // Flatten the nested data structure for Excel
        const flattenedData: any[] = [];
        
        data.data.forEach((service: any) => {
          if (service.sub && service.sub.length > 0) {
            service.sub.forEach((subItem: any) => {
              if (subItem.third && subItem.third.length > 0) {
                subItem.third.forEach((thirdItem: any) => {
                  flattenedData.push({
                    'Service ID': service.id || '',
                    'Service Name': service.name || '',
                    'Service Description': service.description || '',
                    'Service Link': service.link || '',
                    'Sub Service ID': subItem.id || '',
                    'Sub Service Name': subItem.name || '',
                    'Sub Service Description': subItem.description || '',
                    'Sub Service Link': subItem.link || '',
                    'Third Service ID': thirdItem.id || '',
                    'Third Service Name': thirdItem.name || '',
                    'Third Service Description': thirdItem.description || '',
                    'Third Service Link': thirdItem.link || '',
                  });
                });
              } else {
                // If no third level, add sub service row
                flattenedData.push({
                  'Service ID': service.id || '',
                  'Service Name': service.name || '',
                  'Service Description': service.description || '',
                  'Service Link': service.link || '',
                  'Sub Service ID': subItem.id || '',
                  'Sub Service Name': subItem.name || '',
                  'Sub Service Description': subItem.description || '',
                  'Sub Service Link': subItem.link || '',
                  'Third Service ID': '',
                  'Third Service Name': '',
                  'Third Service Description': '',
                  'Third Service Link': '',
                });
              }
            });
          } else {
            // If no sub services, add service row only
            flattenedData.push({
              'Service ID': service.id || '',
              'Service Name': service.name || '',
              'Service Description': service.description || '',
              'Service Link': service.link || '',
              'Sub Service ID': '',
              'Sub Service Name': '',
              'Sub Service Description': '',
              'Sub Service Link': '',
              'Third Service ID': '',
              'Third Service Name': '',
              'Third Service Description': '',
              'Third Service Link': '',
            });
          }
        });

        // Create workbook and worksheet
        const worksheet = XLSX.utils.json_to_sheet(flattenedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Services Backup");

        // Generate Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const timestamp = new Date().toISOString().split('T')[0];
        link.download = `services-backup-${timestamp}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        setPopupData({ 
          message: "Backup downloaded successfully!", 
          status: 200 
        });
        setShowPopup(true);
      } else {
        setPopupData({ 
          message: "No data available for backup", 
          status: 404 
        });
        setShowPopup(true);
      }
      setIsBackupLoading(false);
    } catch (error) {
      setIsBackupLoading(false);
      console.error("Internal Server Error : ", error);
      setPopupData({ 
        message: "Failed to download backup. Please try again.", 
        status: 500 
      });
      setShowPopup(true);
    }
  };


  useEffect(() => {
    getAllPagesLinks();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      {showPopup && (
        <RMWPopup
          message={popupData.message}
          status={popupData.status}
          onClose={() => setShowPopup(false)}
        />
      )}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <h1 className={styles.heading}>Admin Panel - Page Manager</h1>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={getBackup}
            disabled={isBackupLoading}
            className={styles.backupBtn}
            style={{
              opacity: isBackupLoading ? 0.7 : 1,
              cursor: isBackupLoading ? "not-allowed" : "pointer",
            }}
          >
            {isBackupLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download size={18} />
                <span>Backup</span>
              </>
            )}
          </button>
          <button
            onClick={() => router.push("/admin/content/add")}
            className={styles.addMoreBtn}
          >
            <Plus size={18} />
            <span>Add More</span>
          </button>
        </div>
      </div>

      <div className={styles.pagesWrapper}>
        {pagesLinks.map((page, idx) => (
          <div key={idx} className={styles.pageCard}>
            <h3 className={styles.pageTitle}>{page.name}</h3>
            <div className={styles.subLinks}>
              {page.sub.map((sub, subIdx) => (
                <button
                  key={subIdx}
                  className={`${styles.subLinkBtn} `}
                  onClick={() => {
                    const createdLink = sub.link.split("/").join("=");
                    router.push(`/admin/content/${createdLink}`);
                  }}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
