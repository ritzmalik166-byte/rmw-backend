"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  MessageCircle,
  FileText,
  BookOpen,
  Newspaper,
  Monitor,
  Home,
  Settings,
  Users,
  UserPlus,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "../../lib/utils";
import LogoutButton from "../logout/Logout";
import {
  readManagementSessionUser,
  type ManagementSessionUser,
} from "@/lib/managementSession";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import "./Sidenav.css";

type SidebarProps = {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
};

type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href?: string;
  icon: React.ElementType;
  children?: NavChild[];
  group: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    group: "main",
  },
  {
    label: "Chats",
    icon: MessageCircle,
    group: "main",
    children: [
      { label: "Overview", href: "/admin/chats/overview" },
      { label: "History", href: "/admin/chats/history" },
      { label: "Export", href: "/admin/chats/export" },
    ],
  },
  {
    label: "Blog",
    icon: FileText,
    group: "content",
    children: [
      { label: "Add Blog", href: "/admin/add-blog" },
      { label: "Import from Docs", href: "/admin/upload-new-blog" },
      { label: "Manage Blogs", href: "/admin/manage-blogs" },
    ],
  },
  {
    label: "Web Stories",
    icon: BookOpen,
    group: "content",
    children: [
      { label: "Add Topics", href: "/admin/add-web-story-topics" },
      { label: "Manage Topics", href: "/admin/manage-web-story-topics" },
      { label: "Add Story", href: "/admin/add-web-story" },
      { label: "Manage Stories", href: "/admin/manage-web-stories" },
    ],
  },
  {
    label: "Newspaper",
    icon: Newspaper,
    group: "content",
    children: [
      { label: "Manage", href: "/admin/newspaper/manage" },
      { label: "Add Newspaper", href: "/admin/newspaper" },
      { label: "Manage Ads", href: "/admin/newspaper/ads/manage" },
    ],
  },
  {
    label: "Web Pages",
    icon: Monitor,
    group: "website",
    children: [
      { label: "Page Cards", href: "/admin/content" },
      { label: "Categories", href: "/admin/menu_category" },
    ],
  },
  {
    label: "Home",
    icon: Home,
    group: "website",
    children: [
      { label: "Services", href: "/admin/manage-services/service-third" },
    ],
  },
  {
    label: "System Settings",
    icon: Settings,
    group: "system",
    children: [
      { label: "Contact Enquiry", href: "/admin/enquiry" },
      { label: "Career Enquiry", href: "/admin/enquiry/career" },
      { label: "All Enquiries", href: "/admin/enquiry/enquiries" },
      { label: "Enquiry Tracker", href: "/admin/enquiry/tracker" },
    ],
  },
  {
    label: "Management",
    href: "/admin/management",
    icon: Users,
    group: "system",
  },
  {
    label: "Create User",
    href: "/admin/register",
    icon: UserPlus,
    group: "system",
  },
];

const GROUP_LABELS: Record<string, string> = {
  main: "Overview",
  content: "Content",
  website: "Website",
  system: "Administration",
};

const GROUPS = ["main", "content", "website", "system"];

function roleLabel(role?: string) {
  if (role === "super_admin") return "Super Admin";
  if (role === "editor") return "Editor";
  return role || "User";
}

function NavTooltip({
  label,
  enabled,
  children,
}: {
  label: string;
  enabled: boolean;
  children: React.ReactNode;
}) {
  if (!enabled) return <>{children}</>;
  return (
    <Tooltip delayDuration={80}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side="right"
        sideOffset={10}
        className="z-[80] border border-white/10 bg-[#111827] px-2.5 py-1.5 text-xs text-slate-100 shadow-lg"
      >
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

export default function Sidebar({ expanded, setExpanded }: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [user, setUser] = useState<ManagementSessionUser | null>(null);

  useEffect(() => {
    setUser(readManagementSessionUser());
  }, []);

  useEffect(() => {
    const autoOpen: Record<string, boolean> = {};
    NAV_ITEMS.forEach((item) => {
      if (item.children) {
        const childActive = item.children.some((child) =>
          pathname === child.href || pathname.startsWith(child.href + "/")
        );
        if (childActive) autoOpen[item.label] = true;
      }
    });
    setOpenMenus((prev) => ({ ...prev, ...autoOpen }));
  }, [pathname]);

  const toggleMenu = (label: string) => {
    if (!expanded) {
      setExpanded(true);
      setOpenMenus((prev) => ({ ...prev, [label]: true }));
      return;
    }
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isRouteActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-40 flex h-screen flex-col transition-[width] duration-300 ease-out",
        expanded ? "w-64" : "w-16"
      )}
      style={{
        background:
          "linear-gradient(180deg, #0B1220 0%, #0F172A 55%, #111827 100%)",
        borderRight: "1px solid rgba(148,163,184,0.08)",
      }}
      aria-label="Admin navigation"
    >
      {/* Brand header */}
      <div
        className={cn(
          "flex h-16 flex-shrink-0 items-center border-b border-white/[0.06]",
          expanded ? "justify-between gap-2 px-3" : "justify-center px-2"
        )}
      >
        <div
          className={cn(
            "flex min-w-0 items-center",
            expanded ? "gap-2.5" : "justify-center"
          )}
        >
          <div
            className="flex size-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl"
            style={{
              background: "rgba(197,157,79,0.12)",
              border: "1px solid rgba(197,157,79,0.22)",
            }}
          >
            <Image
              src="/favicon.ico"
              alt="RMW logo"
              width={22}
              height={22}
              className="object-contain"
              priority
            />
          </div>
          {expanded && (
            <div className="min-w-0 overflow-hidden">
              <p className="truncate text-[13px] font-semibold tracking-wide text-white">
                RMW Admin
              </p>
              <p className="truncate text-[11px] font-medium text-[#C59D4F]/90">
                Management v2.0
              </p>
            </div>
          )}
        </div>

        {expanded && (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="inline-flex size-8 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors duration-150 hover:bg-white/[0.06] hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59D4F]/40"
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
          >
            <PanelLeftClose className="size-4 transition-transform duration-200" />
          </button>
        )}
      </div>

      {!expanded && (
        <div className="flex justify-center py-2">
          <NavTooltip label="Expand sidebar" enabled>
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex size-8 items-center justify-center rounded-lg text-slate-400 transition-colors duration-150 hover:bg-white/[0.06] hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59D4F]/40"
              aria-label="Expand sidebar"
            >
              <PanelLeftOpen className="size-4" />
            </button>
          </NavTooltip>
        </div>
      )}

      {/* User profile */}
      {user && (
        <div className={cn("flex-shrink-0", expanded ? "px-3 pt-3" : "px-2 pt-2")}>
          {expanded ? (
            <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-2.5 py-2.5">
              <div className="relative flex-shrink-0">
                <div
                  className="flex size-9 items-center justify-center rounded-full text-sm font-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(197,157,79,0.18), rgba(197,157,79,0.38))",
                    color: "#C59D4F",
                    border: "1px solid rgba(197,157,79,0.28)",
                  }}
                >
                  {user.name?.charAt(0)?.toUpperCase() ?? "A"}
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-[#0F172A] bg-emerald-400"
                  aria-hidden
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-white">
                  {user.name}
                </p>
                <span className="mt-0.5 inline-flex rounded-md bg-[#C59D4F]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#C59D4F]">
                  {roleLabel(user.role)}
                </span>
              </div>
            </div>
          ) : (
            <NavTooltip
              label={`${user.name} · ${roleLabel(user.role)}`}
              enabled
            >
              <div className="mx-auto flex justify-center">
                <div className="relative">
                  <div
                    className="flex size-8 items-center justify-center rounded-full text-xs font-semibold"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(197,157,79,0.18), rgba(197,157,79,0.38))",
                      color: "#C59D4F",
                      border: "1px solid rgba(197,157,79,0.28)",
                    }}
                  >
                    {user.name?.charAt(0)?.toUpperCase() ?? "A"}
                  </div>
                  <span
                    className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full border-2 border-[#0F172A] bg-emerald-400"
                    aria-hidden
                  />
                </div>
              </div>
            </NavTooltip>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav
        className={cn(
          "sidenav-scroll flex-1 space-y-1 overflow-y-auto py-3",
          expanded ? "px-2" : "px-1.5"
        )}
      >
        {GROUPS.map((group) => {
          const items = NAV_ITEMS.filter((item) => item.group === group);
          if (items.length === 0) return null;

          return (
            <div key={group} className={group !== "main" ? "pt-3" : ""}>
              {expanded ? (
                <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {GROUP_LABELS[group]}
                </p>
              ) : (
                group !== "main" && (
                  <div className="mx-auto mb-2 h-px w-7 bg-white/[0.06]" />
                )
              )}

              {items.map((item) => {
                const Icon = item.icon;
                const hasChildren = !!item.children;
                const isOpen = !!openMenus[item.label];
                const parentActive = hasChildren
                  ? item.children!.some((c) => isRouteActive(c.href))
                  : item.href
                    ? isRouteActive(item.href)
                    : false;

                const itemBase = cn(
                  "group relative mb-0.5 flex w-full items-center rounded-lg text-left transition-colors duration-150",
                  expanded ? "gap-3 px-2.5 py-2" : "justify-center px-0 py-2.5",
                  parentActive
                    ? "bg-[#C59D4F]/12 text-white"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                );

                return (
                  <div key={item.label}>
                    {hasChildren ? (
                      <NavTooltip label={item.label} enabled={!expanded}>
                        <button
                          type="button"
                          onClick={() => toggleMenu(item.label)}
                          className={itemBase}
                          aria-expanded={expanded ? isOpen : undefined}
                          aria-label={item.label}
                        >
                          {parentActive && (
                            <span
                              className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#C59D4F]"
                              aria-hidden
                            />
                          )}
                          <Icon
                            className={cn(
                              "size-[18px] flex-shrink-0 transition-colors duration-150",
                              parentActive
                                ? "text-[#C59D4F]"
                                : "text-slate-500 group-hover:text-slate-300"
                            )}
                          />
                          {expanded && (
                            <>
                              <span
                                className={cn(
                                  "flex-1 truncate text-[13px]",
                                  parentActive
                                    ? "font-medium text-white"
                                    : "font-medium"
                                )}
                              >
                                {item.label}
                              </span>
                              <ChevronRight
                                className={cn(
                                  "size-3.5 flex-shrink-0 text-slate-500 transition-transform duration-200",
                                  isOpen && "rotate-90"
                                )}
                              />
                            </>
                          )}
                        </button>
                      </NavTooltip>
                    ) : (
                      <NavTooltip label={item.label} enabled={!expanded}>
                        <Link
                          href={item.href!}
                          className={itemBase}
                          aria-current={parentActive ? "page" : undefined}
                          aria-label={item.label}
                        >
                          {parentActive && (
                            <span
                              className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#C59D4F]"
                              aria-hidden
                            />
                          )}
                          <Icon
                            className={cn(
                              "size-[18px] flex-shrink-0 transition-colors duration-150",
                              parentActive
                                ? "text-[#C59D4F]"
                                : "text-slate-500 group-hover:text-slate-300"
                            )}
                          />
                          {expanded && (
                            <>
                              <span
                                className={cn(
                                  "flex-1 truncate text-[13px]",
                                  parentActive
                                    ? "font-medium text-white"
                                    : "font-medium"
                                )}
                              >
                                {item.label}
                              </span>
                              {parentActive && (
                                <span
                                  className="size-1.5 flex-shrink-0 rounded-full bg-[#C59D4F]"
                                  aria-hidden
                                />
                              )}
                            </>
                          )}
                        </Link>
                      </NavTooltip>
                    )}

                    {/* Submenu */}
                    {hasChildren && expanded && (
                      <div
                        className="sidenav-submenu"
                        data-open={isOpen ? "true" : "false"}
                      >
                        <div className="sidenav-submenu-inner">
                          <div className="mb-1 ml-4 space-y-0.5 border-l border-white/[0.06] pl-3">
                            {item.children!.map((child) => {
                              const childActive = isRouteActive(child.href);
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  aria-current={
                                    childActive ? "page" : undefined
                                  }
                                  className={cn(
                                    "relative flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[12.5px] transition-colors duration-150",
                                    childActive
                                      ? "bg-[#C59D4F]/10 font-medium text-[#C59D4F]"
                                      : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-200"
                                  )}
                                >
                                  {childActive && (
                                    <span
                                      className="size-1 flex-shrink-0 rounded-full bg-[#C59D4F]"
                                      aria-hidden
                                    />
                                  )}
                                  <span className="truncate">{child.label}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="flex-shrink-0 border-t border-white/[0.06] p-2.5">
        <LogoutButton expanded={expanded} />
      </div>
    </aside>
  );
}
