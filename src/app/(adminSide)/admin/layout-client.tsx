"use client";

import Sidebar from "@/components/sidenav/Sidenav";
import Form from "@/components/admin/Form";
import AdminHeader from "@/components/admin/AdminHeader";
import Image from "next/image";
import {
  clearManagementSessionUser,
  MANAGEMENT_SESSION_USER_KEY,
} from "@/lib/managementSession";
import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

type AuthState = "loading" | "authenticated" | "unauthenticated";
type WelcomeToast = { name: string; role: string } | null;

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(true);
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [welcomeToast, setWelcomeToast] = useState<WelcomeToast>(null);

  const verifySession = useCallback(async () => {
    const token = localStorage.getItem("rm_token");
    if (!token) {
      clearManagementSessionUser();
      setAuthState("unauthenticated");
      return;
    }
    try {
      const res = await fetch("/api/management/controller", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = (await res.json()) as {
          user?: { id?: string; name?: string; email?: string; role?: string };
        };
        const u = data.user;
        if (
          u &&
          typeof u.name === "string" &&
          typeof u.email === "string" &&
          typeof u.role === "string"
        ) {
          sessionStorage.setItem(
            MANAGEMENT_SESSION_USER_KEY,
            JSON.stringify({
              ...(typeof u.id === "string" ? { id: u.id } : {}),
              name: u.name,
              email: u.email,
              role: u.role,
            })
          );
          if (sessionStorage.getItem("rm_show_login_toast") === "1") {
            sessionStorage.removeItem("rm_show_login_toast");
            setWelcomeToast({ name: u.name, role: u.role });
          }
        } else {
          clearManagementSessionUser();
        }
        setAuthState("authenticated");
      } else {
        localStorage.removeItem("rm_token");
        clearManagementSessionUser();
        setAuthState("unauthenticated");
      }
    } catch {
      localStorage.removeItem("rm_token");
      clearManagementSessionUser();
      setAuthState("unauthenticated");
    }
  }, []);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  useEffect(() => {
    if (!welcomeToast) return;
    const id = window.setTimeout(() => setWelcomeToast(null), 4200);
    return () => window.clearTimeout(id);
  }, [welcomeToast]);

  if (authState === "loading") {
    return (
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center gap-5"
        style={{ background: "#0B1623" }}
      >
        {/* Brand logo */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden"
          // style={{
          //   background: "rgba(197,157,79,0.12)",
          //   boxShadow: "0 8px 32px rgba(197,157,79,0.35)",
          //   border: "1px solid rgba(197,157,79,0.25)",
          // }}
        >
          <Image
            src="/favicon.ico"
            alt="RMW logo"
            width={42}
            height={42}
            className="object-contain"
            priority
          />
        </div>

        {/* Loading indicator */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Loader2
              className="w-4 h-4 animate-spin"
              style={{ color: "#C59D4F" }}
            />
            <span className="text-sm font-medium" style={{ color: "#4A6070" }}>
              Verifying session…
            </span>
          </div>
          {/* Progress bar */}
          <div
            className="w-32 h-0.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div
              className="h-full rounded-full animate-pulse"
              style={{
                background: "linear-gradient(90deg, #C59D4F, #9A7530)",
                width: "60%",
              }}
            />
          </div>
        </div>

        <p className="text-xs" style={{ color: "#1E3A50" }}>
          RMW Admin Panel v2.0
        </p>
      </div>
    );
  }

  if (authState === "unauthenticated") {
    return <Form onAuthenticated={verifySession} />;
  }

  return (
    <div
      className="flex w-full min-h-screen"
      style={{ background: "#F0F4F8" }}
    >
      {/* Sidebar */}
      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      {welcomeToast && (
        <div
          className="fixed right-6 top-20 z-[120] w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl p-4"
          style={{
            background: "linear-gradient(135deg, #0B1623 0%, #17283A 100%)",
            border: "1px solid rgba(197,157,79,0.25)",
            boxShadow: "0 16px 50px rgba(11,22,35,0.22)",
          }}
          role="status"
        >
          <div className="flex gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(197,157,79,0.16)" }}
            >
              <CheckCircle2 className="w-5 h-5" style={{ color: "#C59D4F" }} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" style={{ color: "#C59D4F" }} />
                <p className="text-sm font-bold text-white">Welcome back!</p>
              </div>
              <p className="mt-1 text-sm text-white">
                Hi {welcomeToast.name}, you are now signed in.
              </p>
              <p className="mt-1 text-xs" style={{ color: "#8EA4B6" }}>
                Admin session started successfully.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main area */}
      <div
        className="flex flex-col flex-1 min-h-screen transition-all duration-300"
        style={{ marginLeft: expanded ? "256px" : "64px" }}
      >
        {/* Fixed top header */}
        <AdminHeader expanded={expanded} setExpanded={setExpanded} />

        {/* Page content with top offset for header */}
        <main className="flex-1 p-6 mt-16 admin-v2">
          {children}
        </main>
      </div>
    </div>
  );
}
