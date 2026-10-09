"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, Menu, Search, X } from "lucide-react";
import {
  readManagementSessionUser,
  type ManagementSessionUser,
} from "@/lib/managementSession";

type AdminHeaderProps = {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
};

const PAGE_TITLES: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/analytics": "Analytics",
  "/admin/chats/overview": "Chats — Overview",
  "/admin/chats/history": "Chats — History",
  "/admin/chats/export": "Chats — Export",
  "/admin/add-blog": "Blog — Add New",
  "/admin/upload-new-blog": "Blog — Import from Docs",
  "/admin/manage-blogs": "Blog — Manage",
  "/admin/add-web-story-topics": "Web Stories — Add Topics",
  "/admin/manage-web-story-topics": "Web Stories — Manage Topics",
  "/admin/add-web-story": "Web Stories — Add Story",
  "/admin/manage-web-stories": "Web Stories — Manage",
  "/admin/newspaper/ads/manage": "Newspaper — Manage Ads",
  "/admin/newspaper/ads": "Newspaper — Ads",
  "/admin/newspaper/manage": "Newspaper — Manage",
  "/admin/newspaper": "Newspaper — Add",
  "/admin/content": "Web Pages — Page Cards",
  "/admin/menu_category": "Web Pages — Categories",
  "/admin/manage-services/service-third": "Home — Services",
  "/admin/enquiry/enquiries": "System — Enquiries",
  "/admin/enquiry/career": "System — Career",
  "/admin/enquiry": "System — Contact Enquiry",
  "/admin/management": "Management",
  "/admin/register": "Create User",
};

function getPageTitle(pathname: string): string {
  const sortedKeys = Object.keys(PAGE_TITLES).sort(
    (a, b) => b.length - a.length
  );
  for (const key of sortedKeys) {
    if (pathname.startsWith(key)) return PAGE_TITLES[key];
  }
  return "Admin Panel";
}

export default function AdminHeader({ expanded, setExpanded }: AdminHeaderProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<ManagementSessionUser | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setUser(readManagementSessionUser());
  }, []);

  const pageTitle = getPageTitle(pathname);

  return (
    <header
      className="fixed top-0 right-0 h-16 flex items-center px-5 gap-3 z-30 transition-all duration-300"
      style={{
        left: expanded ? "256px" : "64px",
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 1px 12px rgba(0,0,0,0.04)",
      }}
    >
      {/* Sidebar toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
        style={{ color: "#6B7280" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#F3F4F6";
          (e.currentTarget as HTMLElement).style.color = "#111827";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "transparent";
          (e.currentTarget as HTMLElement).style.color = "#6B7280";
        }}
        aria-label="Toggle sidebar"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1
          className="text-[15px] font-semibold truncate"
          style={{ color: "#0B1623" }}
        >
          {pageTitle}
        </h1>
      </div>

      {/* Search */}
      {searchOpen ? (
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2 transition-all"
          style={{
            background: "#F9FAFB",
            border: "1px solid #E5E7EB",
          }}
        >
          <Search className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#9CA3AF" }} />
          <input
            autoFocus
            placeholder="Quick search…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm outline-none w-36 sm:w-48"
            style={{ color: "#374151" }}
          />
          <button
            onClick={() => {
              setSearchOpen(false);
              setSearchQuery("");
            }}
            style={{ color: "#9CA3AF" }}
            className="transition-colors hover:text-gray-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setSearchOpen(true)}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
          style={{ color: "#6B7280" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#F3F4F6";
            (e.currentTarget as HTMLElement).style.color = "#111827";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "#6B7280";
          }}
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>
      )}

      {/* Notifications */}
      <button
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors relative flex-shrink-0"
        style={{ color: "#6B7280" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#F3F4F6";
          (e.currentTarget as HTMLElement).style.color = "#111827";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "transparent";
          (e.currentTarget as HTMLElement).style.color = "#6B7280";
        }}
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        <span
          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
          style={{ background: "#C59D4F" }}
        />
      </button>

      {/* User info */}
      {user && (
        <div
          className="flex items-center gap-2.5 pl-3"
          style={{ borderLeft: "1px solid #E5E7EB" }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(197,157,79,0.15), rgba(197,157,79,0.3))",
              color: "#B8892E",
              border: "1.5px solid rgba(197,157,79,0.3)",
            }}
          >
            {user.name?.charAt(0)?.toUpperCase() ?? "A"}
          </div>
          <div className="hidden sm:block min-w-0">
            <p
              className="text-sm font-semibold leading-tight truncate max-w-[120px]"
              style={{ color: "#0B1623" }}
            >
              {user.name}
            </p>
            <p
              className="text-xs leading-tight"
              style={{ color: "#C59D4F" }}
            >
              {user.role === "super_admin" ? "Super Admin" : "Editor"}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
