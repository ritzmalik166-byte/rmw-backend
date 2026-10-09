"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Info,
  Loader2,
  Lock,
  UserPlus,
  X,
} from "lucide-react";

type FormProps = {
  onAuthenticated?: () => void;
};

export default function Form({ onAuthenticated }: FormProps) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await fetch("/api/management/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail.trim(),
          password: loginPassword,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setLoginError(
          typeof data.message === "string" ? data.message : "Login failed"
        );
        return;
      }
      if (data.token) {
        localStorage.setItem("rm_token", data.token);
        sessionStorage.setItem("rm_show_login_toast", "1");
        onAuthenticated?.();
      } else {
        setLoginError("No token returned");
      }
    } catch {
      setLoginError("Something went wrong. Try again.");
    } finally {
      setLoginLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left brand panel */}
      <div
        className="hidden lg:flex lg:w-[48%] xl:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #081422 0%, #0F2237 45%, #0B1A2B 100%)",
        }}
      >
        {/* Decorative orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(197,157,79,0.15) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 -right-20 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(197,157,79,0.04) 0%, transparent 70%)",
            }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Brand mark */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-auto h-auto flex items-center justify-center overflow-hidden"
              // style={{
              //   background: "rgba(197,157,79,0.12)",
              //   boxShadow: "0 8px 24px rgba(197,157,79,0.3)",
              //   border: "1px solid rgba(197,157,79,0.25)",
              // }}
            >
              <Image
                src="/favicon.ico"
                alt="RMW logo"
                width={40}
                height={40}
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-white font-bold text-lg tracking-wide leading-none">
                RMW
              </p>
              <p
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: "#C59D4F" }}
              >
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 space-y-10">
          <div>
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight tracking-tight">
              Manage everything
              <br />
              <span style={{ color: "#C59D4F" }}>from one place.</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed" style={{ color: "#7A96AE" }}>
              
            </p>
          </div>

          {/* Access info */}
          <div
            className="rounded-2xl p-5 flex gap-4"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(197,157,79,0.14)" }}
            >
              <Info className="w-5 h-5" style={{ color: "#C59D4F" }} />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">
                New to the admin panel?
              </p>
              <p className="text-sm leading-relaxed mt-1" style={{ color: "#8EA4B6" }}>
                Kindly Contact Administrator for Account Creation.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between">
          <p className="text-sm" style={{ color: "#2D4A5F" }}>
            © {new Date().getFullYear()} RMW. All rights reserved.
          </p>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(197,157,79,0.12)",
              color: "#C59D4F",
              border: "1px solid rgba(197,157,79,0.2)",
            }}
          >
            v2.0
          </span>
        </div>
      </div>

      {/* Right form panel */}
      <div
        className="flex-1 flex items-center justify-center p-6 sm:p-10"
        style={{ background: "#F0F4F8" }}
      >
        <div className="w-full max-w-md space-y-8">
          {/* Mobile brand header */}
          <div className="lg:hidden flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
              // style={{
              //   background: "rgba(197,157,79,0.12)",
              //   boxShadow: "0 4px 12px rgba(197,157,79,0.25)",
              //   border: "1px solid rgba(197,157,79,0.25)",
              // }}
            >
              <Image
                src="/favicon.ico"
                alt="RMW logo"
                width={30}
                height={30}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <p
                className="font-bold text-lg leading-none"
                style={{ color: "#0B1623" }}
              >
                RMW Admin
              </p>
              <p className="text-xs" style={{ color: "#C59D4F" }}>
                v2.0 Management
              </p>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h2
              className="text-3xl font-bold tracking-tight"
              style={{ color: "#0B1623" }}
            >
              Welcome back
            </h2>
            <p className="text-sm mt-2" style={{ color: "#64748B" }}>
              Sign in to your management account to continue.
            </p>
          </div>

          {/* Form card */}
          <div
            className="bg-white rounded-2xl p-8 space-y-6"
            style={{
              boxShadow:
                "0 4px 6px rgba(0,0,0,0.04), 0 20px 60px rgba(11,22,35,0.08)",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="login-email"
                  className="text-sm font-semibold"
                  style={{ color: "#374151" }}
                >
                  Email address
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="h-11 rounded-xl border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-[#C59D4F] transition-colors"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="login-password"
                  className="text-sm font-semibold"
                  style={{ color: "#374151" }}
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    className="h-11 rounded-xl pr-12 border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-[#C59D4F] transition-colors"
                    type={showLoginPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter Your Password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    onClick={() => setShowLoginPassword((v) => !v)}
                    aria-label={
                      showLoginPassword ? "Hide password" : "Show password"
                    }
                    style={{ color: "#9CA3AF" }}
                  >
                    {showLoginPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {loginError && (
                <div
                  className="flex items-start gap-2.5 p-3.5 rounded-xl"
                  style={{
                    background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.12)",
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: "#EF4444" }}
                  />
                  <p className="text-sm" style={{ color: "#DC2626" }}>
                    {loginError}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full h-11 rounded-xl font-semibold text-white text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, #C59D4F 0%, #9A7530 100%)",
                  boxShadow: loginLoading
                    ? "none"
                    : "0 4px 14px rgba(197,157,79,0.35)",
                }}
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  "Sign in to Dashboard"
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateAccountModal(true)}
                className="w-full h-10 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  background: "rgba(197,157,79,0.08)",
                  color: "#9A7530",
                  border: "1px solid rgba(197,157,79,0.18)",
                }}
              >
                <UserPlus className="w-4 h-4" />
                Create account
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "#F3F4F6" }} />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "#D1D5DB" }}
              >
                Secured
              </span>
              <div className="flex-1 h-px" style={{ background: "#F3F4F6" }} />
            </div>

            {/* Security note */}
            <div className="flex items-center justify-center gap-2">
              <Lock className="w-3.5 h-3.5" style={{ color: "#C59D4F" }} />
              <span className="text-xs" style={{ color: "#9CA3AF" }}>
                Protected by JWT authentication
              </span>
            </div>
          </div>
        </div>
      </div>
      {showCreateAccountModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(11,22,35,0.62)", backdropFilter: "blur(8px)" }}
          onClick={(e) => {
            if (e.currentTarget === e.target) setShowCreateAccountModal(false);
          }}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl p-6"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 24px 80px rgba(11,22,35,0.24)",
            }}
          >
            <button
              type="button"
              onClick={() => setShowCreateAccountModal(false)}
              className="absolute right-4 top-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
              style={{ color: "#94A3B8" }}
              aria-label="Close create account info"
            >
              <X className="w-4 h-4" />
            </button>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "rgba(197,157,79,0.12)" }}
            >
              <UserPlus className="w-6 h-6" style={{ color: "#C59D4F" }} />
            </div>
            <h3 className="text-xl font-bold" style={{ color: "#0B1623" }}>
              New to the admin panel?
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "#64748B" }}>
              Kindly Contact Administrator for Account Creation.
            </p>
            <button
              type="button"
              onClick={() => setShowCreateAccountModal(false)}
              className="mt-6 w-full h-10 rounded-xl text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #C59D4F 0%, #9A7530 100%)",
                boxShadow: "0 4px 14px rgba(197,157,79,0.28)",
              }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
