"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";

interface RMWPopupProps {
  message: string;
  status: number;
  onClose?: () => void;
}

function RMWPopup({ message, status, onClose }: RMWPopupProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };
  
  const getStatusColor = () => {
    if (status >= 200 && status < 300) return "#10B981"; // Emerald green for success
    if (status >= 400 && status < 500) return "#F59E0B"; // Amber for client errors
    if (status >= 500) return "#EF4444"; // Red for server errors
    return "#3B82F6"; // Blue for other status codes
  };
  
  const getStatusIcon = () => {
    if (status >= 200 && status < 300) {
      return <CheckCircle2 className="w-6 h-6" strokeWidth={2} />;
    }
    if (status >= 400 && status < 500) {
      return <AlertTriangle className="w-6 h-6" strokeWidth={2} />;
    }
    if (status >= 500) {
      return <XCircle className="w-6 h-6" strokeWidth={2} />;
    }
    return <Info className="w-6 h-6" strokeWidth={2} />;
  };

  const getStatusTitle = () => {
    if (status >= 200 && status < 300) return "Success";
    if (status >= 400 && status < 500) return "Warning";
    if (status >= 500) return "Error";
    return "Information";
  };

  if (!isVisible) return null;

  const statusColor = getStatusColor();

  return (
    <div className="fixed inset-0 flex items-end justify-center p-4 px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-[1000]">
      <div
        className="max-w-sm w-full rounded-2xl pointer-events-auto overflow-hidden animate-fadeIn"
        style={{
          background: "linear-gradient(135deg, #0B1623 0%, #17283A 100%)",
          border: "1px solid rgba(197,157,79,0.25)",
          boxShadow: "0 16px 50px rgba(11,22,35,0.35)",
        }}
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${statusColor}26`, color: statusColor }}
            >
              {getStatusIcon()}
            </div>
            <div className="w-0 flex-1 pt-0.5">
              <p className="text-sm font-bold text-white">{getStatusTitle()}</p>
              <p className="mt-1 text-sm" style={{ color: "#B8C6D4" }}>
                {message}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold"
                  style={{
                    backgroundColor: `${statusColor}26`,
                    color: statusColor,
                  }}
                >
                  Status: {status}
                </span>
                <span className="text-[11px]" style={{ color: "#4A6070" }}>
                  Ritz Media World
                </span>
              </div>
            </div>
            <button
              className="flex-shrink-0 w-7 h-7 rounded-full inline-flex items-center justify-center transition-colors"
              style={{ color: "#64748B" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.color = "#E2E8F0";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#64748B";
              }}
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <div
          className="h-1 w-full"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="h-full"
            style={{
              width: "100%",
              backgroundColor: statusColor,
              animation: "progress 3s linear forwards",
            }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
        @keyframes fadeIn {
          from { 
            opacity: 0;
            transform: translateY(100%);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (min-width: 640px) {
          @keyframes fadeIn {
            from { 
              opacity: 0;
              transform: translateY(-100%);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default RMWPopup;