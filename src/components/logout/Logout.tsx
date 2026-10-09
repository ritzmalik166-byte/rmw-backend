"use client";

import { useState } from "react";
import { clearManagementSessionUser } from "@/lib/managementSession";
import { AlertTriangle, ArrowRight, LogOut, X } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LogoutButtonProps {
  expanded?: boolean;
  variant?: "sidebar" | "button";
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  expanded = false,
  variant = "sidebar",
}) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("rm_token");
    clearManagementSessionUser();
    window.location.assign("/admin/dashboard");
  };

  const trigger = variant === "button" ? (
    <button
      type="button"
      onClick={() => setShowModal(true)}
      disabled={loading}
      className="group inline-flex h-10 flex-shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 shadow-[0_2px_6px_rgba(239,68,68,0.08)] transition hover:border-red-300 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40 disabled:opacity-60"
    >
      <LogOut className="size-4" />
      {loading ? "Signing out…" : "Sign out"}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  ) : (
    <button
      type="button"
      onClick={() => setShowModal(true)}
      disabled={loading}
      aria-label="Logout"
      className={cn(
        "group flex w-full items-center rounded-lg px-2.5 py-2.5 text-slate-400 transition-colors duration-150",
        "hover:bg-red-500/10 hover:text-red-400",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40",
        "disabled:opacity-60",
        expanded ? "justify-start gap-3" : "justify-center"
      )}
    >
      <LogOut className="size-[18px] flex-shrink-0" />
      {expanded && (
        <span className="text-[13px] font-medium">
          {loading ? "Logging out…" : "Logout"}
        </span>
      )}
    </button>
  );

  return (
    <>
      {variant === "sidebar" && !expanded ? (
        <Tooltip delayDuration={80}>
          <TooltipTrigger asChild>{trigger}</TooltipTrigger>
          <TooltipContent
            side="right"
            sideOffset={10}
            className="z-[80] border border-white/10 bg-[#111827] px-2.5 py-1.5 text-xs text-slate-100 shadow-lg"
          >
            Logout
          </TooltipContent>
        </Tooltip>
      ) : (
        trigger
      )}

      {showModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/55 p-4 backdrop-blur-[6px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-dialog-title"
        >
          <div className="relative w-full max-w-[380px] rounded-2xl border border-black/5 bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 flex size-7 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            <div className="mb-5 flex items-start gap-4">
              <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/10">
                <AlertTriangle className="size-6 text-red-500" />
              </div>
              <div className="pt-0.5">
                <h3
                  id="logout-dialog-title"
                  className="text-lg font-bold leading-tight text-[#0B1623]"
                >
                  Sign out?
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  You&apos;ll need to sign in again to access the admin panel.
                </p>
              </div>
            </div>

            <div className="mb-5 h-px bg-gray-100" />

            <p className="mb-6 text-sm leading-relaxed text-slate-600">
              Your current session will be terminated and you will be redirected
              to the login screen.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="h-10 flex-1 rounded-xl bg-gray-100 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="h-10 flex-1 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-sm font-semibold text-white shadow-md shadow-red-500/25 transition-opacity disabled:opacity-60"
              >
                {loading ? "Signing out…" : "Yes, sign out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
