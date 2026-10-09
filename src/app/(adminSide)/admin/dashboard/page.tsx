"use client";

import Link from "next/link";
import axios from "axios";
import { League_Spartan } from "next/font/google";
import { formatDistanceToNowStrict, isToday } from "date-fns";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock3,
  FilePlus2,
  FileText,
  FileUp,
  Globe,
  Inbox,
  LayoutGrid,
  Lightbulb,
  Mail,
  Newspaper,
  RefreshCw,
  ShieldCheck,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  readManagementSessionUser,
  type ManagementSessionUser,
} from "@/lib/managementSession";
import { SITE_URL } from "@/lib/sitemap/constants";
import LogoutButton from "@/components/logout/Logout";

const headingFont = League_Spartan({ subsets: ["latin"], weight: ["600", "700"] });

/* ------------------------------------------------------------------ */
/* Types & constants                                                   */
/* ------------------------------------------------------------------ */
type TeamMember = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt?: string;
};

type ActivityRow = {
  _id: string;
  managementId: string;
  activity: string;
  activityTime?: string;
  createdAt?: string;
};

type DailyQuote = { quote: string; author: string; source: string };

type QuickLink = {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tint: string;
};

const QUICK_LINKS: QuickLink[] = [
  { label: "Add Blog", description: "Write a new article", href: "/admin/add-blog", icon: FilePlus2, tint: "bg-[#FFF3E6] text-[#D9822B]" },
  { label: "Import from Docs", description: "Google Doc to blog", href: "/admin/upload-new-blog", icon: FileUp, tint: "bg-[#EAF1FF] text-[#3B6FD8]" },
  { label: "Manage Blogs", description: "Edit, schedule, publish", href: "/admin/manage-blogs", icon: FileText, tint: "bg-[#FFF5E1] text-[#C08A1E]" },
  { label: "Add Web Story", description: "Create a visual story", href: "/admin/add-web-story", icon: BookOpen, tint: "bg-[#F1ECFF] text-[#7C5CD6]" },
  { label: "Newspaper", description: "Manage newspaper listings", href: "/admin/newspaper/manage", icon: Newspaper, tint: "bg-[#FFF3E3] text-[#C9822A]" },
  { label: "Enquiries", description: "Leads and contact forms", href: "/admin/enquiry/enquiries", icon: Inbox, tint: "bg-[#E8F6EE] text-[#2F9E62]" },
  { label: "Page Cards", description: "Website page content", href: "/admin/content", icon: LayoutGrid, tint: "bg-[#FFF2E2] text-[#D08A2E]" },
  { label: "Team", description: "Users and permissions", href: "/admin/management", icon: Users, tint: "bg-[#E8F6EE] text-[#2E9B5F]" },
];

const LIVE_SITE_LABEL = SITE_URL.replace(/^https?:\/\//, "");
const RECENT_ACTIVITY_LIMIT = 8;

const HERO_BG = "/dashboard/dashboard-row1.jpg";
const THOUGHT_BG = "/dashboard/dashboard-row2.jpg";

const CARD_SHADOW =
  "shadow-[0_1px_2px_rgba(16,24,40,0.03),0_6px_20px_rgba(16,24,40,0.05)]";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
function formatRole(role: string): string {
  if (role === "super_admin") return "Super Admin";
  if (role === "editor") return "Editor";
  return role.replace(/_/g, " ");
}

function initials(name: string): string {
  const p = name.trim().split(/\s+/).filter(Boolean);
  if (!p.length) return "?";
  if (p.length === 1) return p[0]!.slice(0, 2).toUpperCase();
  return (p[0]![0] + p[p.length - 1]![0]).toUpperCase();
}

function greetingFor(date: Date): string {
  const h = date.getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function activityDate(a: ActivityRow): Date | null {
  const raw = a.activityTime || a.createdAt;
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}

function timeAgo(d: Date | null): string {
  if (!d) return "—";
  return formatDistanceToNowStrict(d, { addSuffix: true });
}

/** Activity messages may start with a machine tag such as "[blog.create.draft.via_claude]". */
function cleanActivity(text: string): string {
  return text.replace(/^\[[^\]]+\]\s*/, "");
}

function activityKind(text: string): { label: string; className: string } {
  const t = text.toLowerCase();
  if (t.includes("logged in") || t.includes("login"))
    return { label: "Login", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" };
  if (t.includes("delete") || t.includes("removed"))
    return { label: "Delete", className: "bg-rose-50 text-rose-700 ring-rose-200" };
  if (t.includes("password"))
    return { label: "Security", className: "bg-amber-50 text-amber-800 ring-amber-200" };
  if (t.includes("draft"))
    return { label: "Draft", className: "bg-slate-100 text-slate-700 ring-slate-200" };
  if (t.includes("publish") || t.includes("schedul"))
    return { label: "Publish", className: "bg-sky-50 text-sky-700 ring-sky-200" };
  if (t.includes("created") || t.includes("registered") || t.includes("added") || t.includes("upload"))
    return { label: "Create", className: "bg-violet-50 text-violet-700 ring-violet-200" };
  if (t.includes("update") || t.includes("status"))
    return { label: "Update", className: "bg-blue-50 text-blue-700 ring-blue-200" };
  return { label: "Action", className: "bg-slate-50 text-slate-600 ring-slate-200" };
}

function clockParts(date: Date): { time: string; period: string } {
  const parts = new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).formatToParts(date);
  const time = parts
    .filter((p) => p.type !== "dayPeriod")
    .map((p) => p.value)
    .join("")
    .trim();
  const period = parts.find((p) => p.type === "dayPeriod")?.value.toLowerCase() ?? "";
  return { time, period };
}

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

/**
 * Two layers of the same photo: a full-cover layer for the soft waves, and a
 * height-scaled layer that keeps the desk/shelf composition at a fixed size on
 * the right, feathered into the waves with a mask.
 */
function SceneBackground({
  src,
  ratio,
  zoom,
  posY,
  right = "0%",
  mask,
  sceneClassName,
}: {
  src: string;
  ratio: number;
  zoom: number;
  posY: number;
  right?: string;
  mask: string;
  sceneClassName?: string;
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 bg-left-top bg-no-repeat"
        style={{ backgroundImage: `url(${src})`, backgroundSize: "max(170%, 1400px) auto" }}
      />
      <div
        className={cn("absolute inset-y-0", sceneClassName)}
        style={{
          right,
          aspectRatio: `${ratio * zoom}`,
          backgroundImage: `url(${src})`,
          backgroundSize: `auto ${zoom * 100}%`,
          backgroundPosition: `right ${posY}%`,
          backgroundRepeat: "no-repeat",
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </div>
  );
}

function IconBadge({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      className={cn(
        "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#FBF3E4] text-[#B8913F]",
        className
      )}
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
    </span>
  );
}

function Panel({
  title,
  subtitle,
  icon: Icon,
  action,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-[#EEF0F3] bg-white",
        CARD_SHADOW,
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 px-6 pb-4 pt-5">
        <div className="flex min-w-0 items-center gap-3.5">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-[#EADBBF] bg-[#FDF8EF] text-[#B8913F]">
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-[#0D1334]">{title}</h2>
            {subtitle && <p className="truncate text-xs text-slate-500">{subtitle}</p>}
          </div>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function StatDecoration({ kind }: { kind: "wave" | "people" | "blocks" | "bars" }) {
  if (kind === "wave") {
    return (
      <svg viewBox="0 0 120 40" className="h-10 w-[96px] flex-shrink-0 2xl:w-[120px]" aria-hidden>
        <defs>
          <linearGradient id="statWaveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E9C988" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#E9C988" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 34 C 14 33, 22 28, 34 29 S 54 22, 66 20 S 88 14, 98 10 S 112 6, 120 4 L120 40 L0 40 Z"
          fill="url(#statWaveFill)"
        />
        <path
          d="M0 34 C 14 33, 22 28, 34 29 S 54 22, 66 20 S 88 14, 98 10 S 112 6, 120 4"
          fill="none"
          stroke="#D9AE5F"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "people") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
        <Users className="h-[18px] w-[18px]" strokeWidth={1.6} />
      </span>
    );
  }
  if (kind === "blocks") {
    return (
      <span className="flex items-end gap-1" aria-hidden>
        <span className="h-5 w-4 rounded-t-md bg-[#FBEFD9]" />
        <span className="h-8 w-6 rounded-t-md bg-[#F8E6C4]" />
      </span>
    );
  }
  return (
    <span className="flex items-end gap-1" aria-hidden>
      {[14, 22, 18, 30, 38].map((h, i) => (
        <span key={i} className="w-2 rounded-t-sm bg-slate-200/80" style={{ height: h }} />
      ))}
    </span>
  );
}

function StatCard({
  label,
  value,
  hint,
  icon,
  decoration,
  loading,
}: {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  decoration: "wave" | "people" | "blocks" | "bars";
  loading?: boolean;
}) {
  return (
    <div className={cn("rounded-2xl border border-[#EEF0F3] bg-white p-5 2xl:px-6 2xl:py-6", CARD_SHADOW)}>
      <div className="flex items-center gap-3">
        <IconBadge icon={icon} />
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#0D1334]">{label}</p>
      </div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          {loading ? (
            <span className="block h-9 w-24 animate-pulse rounded-lg bg-slate-100" />
          ) : (
            <p className="text-[32px] font-bold leading-none tabular-nums text-[#0D1334] 2xl:text-[34px]">{value}</p>
          )}
          <p className="mt-2.5 text-[13px] leading-snug text-slate-500">{hint}</p>
        </div>
        <StatDecoration kind={decoration} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard                                                           */
/* ------------------------------------------------------------------ */
export default function DashboardPage() {
  const [user, setUser] = useState<ManagementSessionUser | null>(null);
  const [now, setNow] = useState<Date | null>(null);

  const [quote, setQuote] = useState<DailyQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);

  const [visitors, setVisitors] = useState<number | null>(null);
  const [visitorsError, setVisitorsError] = useState(false);

  const [team, setTeam] = useState<TeamMember[]>([]);
  const [activities, setActivities] = useState<ActivityRow[]>([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [teamError, setTeamError] = useState<string | null>(null);

  useEffect(() => {
    setUser(readManagementSessionUser());
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    axios
      .get<DailyQuote>("/api/daily-quote")
      .then((r) => setQuote(r.data))
      .catch(() => setQuote(null))
      .finally(() => setQuoteLoading(false));

    axios
      .get<{ visitors: number }>("/api/get-visit-data")
      .then((r) => setVisitors(r.data?.visitors ?? null))
      .catch(() => setVisitorsError(true));
  }, []);

  const loadTeam = useCallback(async () => {
    const token = localStorage.getItem("rm_token");
    if (!token) {
      setTeamError("Sign in required to load team data.");
      setTeamLoading(false);
      return;
    }
    setTeamLoading(true);
    setTeamError(null);
    try {
      const res = await axios.get<{ management?: TeamMember[]; activities?: ActivityRow[] }>(
        "/api/management/get-all",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTeam(Array.isArray(res.data.management) ? res.data.management : []);
      setActivities(Array.isArray(res.data.activities) ? res.data.activities : []);
    } catch (e: unknown) {
      setTeamError(
        axios.isAxiosError(e) && e.response?.status === 401
          ? "Session expired. Please sign in again."
          : "Could not load team data."
      );
    } finally {
      setTeamLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTeam();
  }, [loadTeam]);

  const isSuperAdmin = user?.role === "super_admin";

  const memberById = useMemo(() => {
    const map = new Map<string, TeamMember>();
    for (const m of team) map.set(String(m._id), m);
    return map;
  }, [team]);

  const recentActivities = useMemo(
    () => activities.slice(0, RECENT_ACTIVITY_LIMIT),
    [activities]
  );

  const activitiesToday = useMemo(
    () => activities.filter((a) => {
      const d = activityDate(a);
      return d ? isToday(d) : false;
    }).length,
    [activities]
  );

  const activeMembers = team.filter((m) => m.isActive).length;

  const dateLabel = now
    ? now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : "—";
  const clock = now ? clockParts(now) : { time: "--:--:--", period: "" };
  const timeZoneLabel = now
    ? Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " ")
    : "";

  return (
    <div className="flex w-full flex-col gap-5 pb-10">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className={cn(
          "relative !mb-0 overflow-hidden rounded-[20px] border border-[#F1E8D8] bg-[#FBF7EF]",
          CARD_SHADOW
        )}
      >
        <SceneBackground
          src={HERO_BG}
          ratio={2069 / 760}
          zoom={1.32}
          posY={56}
          mask="linear-gradient(to right, transparent 0%, #000 30%)"
          sceneClassName="hidden lg:block"
        />

        <div className="relative flex flex-col gap-6 px-6 py-6 sm:px-9 sm:py-7 xl:flex-row xl:items-stretch xl:justify-between">
          {/* Greeting */}
          <div className="flex min-w-0 flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#EFE6D6] bg-white/90 px-3.5 py-1.5 text-[13px] text-[#3A4256] shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <CalendarDays className="h-4 w-4 text-[#B8913F]" strokeWidth={1.8} />
              {dateLabel}
            </span>

            <p className="mt-7 text-[22px] font-medium text-[#B8913F]">
              {now ? greetingFor(now) : "Welcome"},
            </p>
            <h1
              className={cn(
                headingFont.className,
                "mt-1 break-words text-[34px] font-bold leading-[1.05] tracking-[0.01em] text-[#0D1334] sm:text-[40px] xl:text-[32px] 2xl:text-[42px]"
              )}
            >
              {user?.name ?? "Admin"}
            </h1>

            {user && (
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#B8913F] to-[#8E6C2D] px-4 py-1 text-xs font-semibold text-white shadow-[0_4px_10px_rgba(184,145,63,0.3)]">
                  {formatRole(user.role)}
                </span>
                <span className="inline-flex min-w-0 items-center gap-2 text-[13px] text-[#3A4256]">
                  <Mail className="h-4 w-4 flex-shrink-0 text-slate-500" strokeWidth={1.8} />
                  <span className="truncate">{user.email}</span>
                </span>
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="whitespace-nowrap text-[13px] text-slate-500">Done for the day?</span>
              <LogoutButton variant="button" />
            </div>
          </div>

          {/* Right side: tagline, clock, live site. The far right stays clear for the hero photo. */}
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap xl:mr-[316px] xl:flex-nowrap xl:items-stretch 2xl:mr-[356px]">
            <div className="hidden w-[250px] flex-col justify-center pr-6 2xl:flex">
              <p className="whitespace-nowrap text-[16px] leading-relaxed text-[#1E2540]">
                &ldquo;Great content builds trust,
                <br />
                and trust builds brands.&rdquo;
              </p>
              <span className="mt-3 h-[2px] w-8 rounded-full bg-[#C59D4F]" />
            </div>

            <div className="flex w-full flex-col gap-4 sm:w-[300px]">
              <div className="rounded-2xl border border-white/70 bg-white/85 p-5 shadow-[0_8px_24px_rgba(16,24,40,0.06)] backdrop-blur-sm">
                <div className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3A4256]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#EADBBF] bg-[#FDF8EF] text-[#B8913F]">
                    <Clock3 className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  Current time
                </div>
                <p className="mt-3 flex items-baseline gap-2.5 font-bold tabular-nums text-[#0D1334]">
                  <span className="text-[38px] leading-none tracking-tight">{clock.time}</span>
                  {clock.period && <span className="text-[30px] font-semibold leading-none">{clock.period}</span>}
                </p>
                <p className="mt-2 text-xs text-slate-500">{timeZoneLabel}</p>
              </div>

              <a
                href={SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-[#B8913F] via-[#A7843A] to-[#8C6B2E] px-4 py-3.5 shadow-[0_10px_24px_rgba(140,107,46,0.3)] transition hover:brightness-105"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/15">
                    <Globe className="h-[18px] w-[18px] text-white" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-white">Visit live site</span>
                    <span className="block truncate text-xs text-[#FBF1DD]">{LIVE_SITE_LABEL}</span>
                  </span>
                </span>
                <ArrowUpRight className="h-[18px] w-[18px] flex-shrink-0 text-white transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Thought for today ────────────────────────────────── */}
      <section
        className={cn(
          "relative overflow-hidden rounded-[20px] border border-[#F1E8D8] bg-[#FBF7EF]",
          CARD_SHADOW
        )}
      >
        <SceneBackground
          src={THOUGHT_BG}
          ratio={2164 / 727}
          zoom={2.7}
          posY={58}
          right="max(0px, calc(36% - 290px))"
          mask="linear-gradient(to right, transparent 0%, #000 30%, #000 82%, transparent 100%)"
          sceneClassName="hidden xl:block"
        />

        <div className="relative flex min-h-[128px] items-center gap-5 px-6 py-6 sm:px-7 xl:pr-[calc(36%+90px)] 2xl:min-h-[140px]">
          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center self-start rounded-full border border-[#EFE3CC] bg-white/80 text-[#B8913F] shadow-[0_2px_8px_rgba(184,145,63,0.12)]">
            <Lightbulb className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <figure className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B8913F]">
              Thought for today
            </p>
            {quoteLoading ? (
              <div className="mt-2.5 space-y-2">
                <span className="block h-5 w-80 max-w-full animate-pulse rounded bg-[#EFE6D6]" />
                <span className="block h-3.5 w-32 animate-pulse rounded bg-[#EFE6D6]" />
              </div>
            ) : (
              <>
                <blockquote className="mt-1.5 text-[19px] font-medium leading-snug text-[#0D1334] 2xl:text-[22px]">
                  &ldquo;{quote?.quote ?? "Make each day your masterpiece."}&rdquo;
                </blockquote>
                <figcaption className="mt-1.5 text-[13px] text-slate-500">
                  — {quote?.author ?? "John Wooden"}
                </figcaption>
              </>
            )}
          </figure>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Site visitors"
          value={visitorsError || visitors == null ? "—" : visitors.toLocaleString("en-IN")}
          hint="All-time unique visitors"
          icon={Users}
          decoration="wave"
          loading={!visitorsError && visitors == null}
        />
        <StatCard
          label="Team members"
          value={team.length.toLocaleString("en-IN")}
          hint={isSuperAdmin ? "All admin accounts" : "Accounts visible to you"}
          icon={Users}
          decoration="people"
          loading={teamLoading}
        />
        <StatCard
          label="Active accounts"
          value={activeMembers.toLocaleString("en-IN")}
          hint={`${Math.max(team.length - activeMembers, 0)} inactive`}
          icon={UserCheck}
          decoration="blocks"
          loading={teamLoading}
        />
        <StatCard
          label="Activity today"
          value={isSuperAdmin ? activitiesToday.toLocaleString("en-IN") : "—"}
          hint={isSuperAdmin ? "Actions logged since midnight" : "Visible to super admins"}
          icon={Activity}
          decoration="bars"
          loading={teamLoading}
        />
      </div>

      {/* ── Quick links ──────────────────────────────────────── */}
      <Panel title="Quick links" subtitle="Jump straight into your most-used tools" icon={LayoutGrid}>
        <div className="grid grid-cols-1 gap-4 px-6 pb-6 sm:grid-cols-2 xl:grid-cols-4">
          {QUICK_LINKS.map(({ label, description, href, icon: Icon, tint }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-3.5 rounded-xl border border-[#EEF0F3] bg-white px-4 py-3.5 transition hover:-translate-y-0.5 hover:border-[#E6D3AE] hover:shadow-[0_10px_24px_rgba(16,24,40,0.06)]"
            >
              <span className={cn("flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full", tint)}>
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold leading-snug text-[#0D1334]">{label}</span>
                <span className="mt-0.5 block text-xs leading-snug text-slate-500">{description}</span>
              </span>
              <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-[#B8913F]" />
            </Link>
          ))}
        </div>
      </Panel>

      {teamError && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <ShieldCheck className="h-4 w-4 flex-shrink-0" />
          {teamError}
        </div>
      )}

      {/* ── Recent activity ──────────────────────────────────── */}
      <Panel
        title="Recent activity"
        subtitle={isSuperAdmin ? "Latest actions across the admin panel" : "Team activity log"}
        icon={Activity}
        action={
          <button
            type="button"
            onClick={() => loadTeam()}
            disabled={teamLoading}
            title="Refresh"
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#EEF0F3] text-slate-500 transition hover:bg-slate-50 hover:text-slate-700 disabled:cursor-wait"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", teamLoading && "animate-spin")} />
          </button>
        }
      >
        {!isSuperAdmin && !teamLoading ? (
          <div className="flex flex-col items-center justify-center gap-2 border-t border-slate-100 px-6 py-14 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <p className="text-sm font-semibold text-[#0D1334]">Activity log is restricted</p>
            <p className="max-w-xs text-xs text-slate-500">
              Only super admins can view the team activity history.
            </p>
          </div>
        ) : (
          <ol className="max-h-[440px] overflow-y-auto border-t border-slate-100 px-6 py-2">
            {teamLoading ? (
              Array.from({ length: 5 }, (_, i) => (
                <li key={i} className="flex gap-3 py-3">
                  <span className="h-8 w-8 animate-pulse rounded-full bg-slate-100" />
                  <span className="flex-1 space-y-2">
                    <span className="block h-3.5 w-3/4 animate-pulse rounded bg-slate-100" />
                    <span className="block h-3 w-1/3 animate-pulse rounded bg-slate-100" />
                  </span>
                </li>
              ))
            ) : recentActivities.length === 0 ? (
              <li className="py-12 text-center text-sm text-slate-500">No activity recorded yet.</li>
            ) : (
              recentActivities.map((a, i) => {
                const actor = memberById.get(String(a.managementId));
                const text = cleanActivity(a.activity);
                const kind = activityKind(text);
                const when = activityDate(a);
                const isLast = i === recentActivities.length - 1;
                return (
                  <li key={a._id} className="relative flex gap-3 py-3">
                    {!isLast && (
                      <span className="absolute bottom-0 left-4 top-12 w-px bg-slate-100" aria-hidden />
                    )}
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#FBF3E4] text-[11px] font-semibold text-[#8C6B2E] ring-4 ring-white">
                      {actor ? initials(actor.name) : "?"}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-[#0D1334]">
                          {actor?.name ?? "Unknown user"}
                        </span>
                        <span className={cn("rounded-md px-1.5 py-0.5 text-[10px] font-semibold ring-1 ring-inset", kind.className)}>
                          {kind.label}
                        </span>
                        <span
                          className="ml-auto text-[11px] text-slate-400"
                          title={when ? when.toLocaleString("en-IN") : undefined}
                        >
                          {timeAgo(when)}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-slate-600">{text}</span>
                    </span>
                  </li>
                );
              })
            )}
          </ol>
        )}
        {isSuperAdmin && activities.length > RECENT_ACTIVITY_LIMIT && (
          <div className="border-t border-slate-100 px-6 py-3 text-right">
            <Link
              href="/admin/management"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#B8913F] transition hover:text-[#8C6B2E]"
            >
              View all {activities.length.toLocaleString("en-IN")} activities
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </Panel>
    </div>
  );
}
