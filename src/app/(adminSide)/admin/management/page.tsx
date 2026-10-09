"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  endOfDay,
  endOfMonth,
  format,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import {
  Activity,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  RefreshCw,
  Search,
  Shield,
  Trash2,
  User,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function validateManagementPassword(password: string): string | null {
  const missing: string[] = [];
  if (password.length < 8) missing.push("at least 8 characters");
  if (!/[A-Z]/.test(password)) missing.push("an uppercase letter");
  if (!/[a-z]/.test(password)) missing.push("a lowercase letter");
  if (!/[0-9]/.test(password)) missing.push("a number");
  if (!/[^A-Za-z0-9]/.test(password)) missing.push("a special character");
  if (missing.length === 0) return null;
  return `Password must include ${missing.join(", ")}.`;
}

type MeUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type ManagementRow = {
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
  activityTime: string;
  createdAt?: string;
};

function authHeaders(): HeadersInit {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("rm_token") : null;
  return {
    Authorization: `Bearer ${token ?? ""}`,
    "Content-Type": "application/json",
  };
}

function formatRole(role: string): string {
  if (role === "super_admin") return "Super admin";
  if (role === "editor") return "Editor";
  return role.replace(/_/g, " ");
}

function rowId(row: ManagementRow): string {
  return String(row._id);
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
}

function formatWhen(value?: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return format(d, "dd MMM yyyy, HH:mm");
}

type DatePreset =
  | "all"
  | "today"
  | "last7"
  | "last30"
  | "thisMonth"
  | "lastMonth"
  | "custom";

const DATE_PRESET_LABELS: Record<DatePreset, string> = {
  all: "All",
  today: "Today",
  last7: "Last 7 Days",
  last30: "Last 30 Days",
  thisMonth: "This Month",
  lastMonth: "Last Month",
  custom: "Custom Range",
};

function getDateRange(
  preset: DatePreset,
  customFrom: string,
  customTo: string
): { start: Date; end: Date } | null {
  const now = new Date();
  switch (preset) {
    case "all":
      return null;
    case "today":
      return { start: startOfDay(now), end: endOfDay(now) };
    case "last7":
      return { start: startOfDay(subDays(now, 6)), end: endOfDay(now) };
    case "last30":
      return { start: startOfDay(subDays(now, 29)), end: endOfDay(now) };
    case "thisMonth":
      return { start: startOfMonth(now), end: endOfDay(now) };
    case "lastMonth": {
      const prev = subMonths(now, 1);
      return { start: startOfMonth(prev), end: endOfMonth(prev) };
    }
    case "custom": {
      if (!customFrom || !customTo) return null;
      return {
        start: startOfDay(new Date(customFrom)),
        end: endOfDay(new Date(customTo)),
      };
    }
    default:
      return null;
  }
}

function activityKind(text: string): {
  label: string;
  className: string;
} {
  const t = text.toLowerCase();
  if (t.includes("logged in") || t.includes("login")) {
    return { label: "Login", className: "bg-emerald-50 text-emerald-700 border-emerald-200" };
  }
  if (t.includes("deleted") || t.includes("delete") || t.includes("removed")) {
    return { label: "Delete", className: "bg-red-50 text-red-700 border-red-200" };
  }
  if (t.includes("password")) {
    return { label: "Password", className: "bg-amber-50 text-amber-800 border-amber-200" };
  }
  if (t.includes("status") || t.includes("active") || t.includes("inactive")) {
    return { label: "Status", className: "bg-blue-50 text-blue-700 border-blue-200" };
  }
  if (t.includes("registered") || t.includes("created")) {
    return { label: "Create", className: "bg-violet-50 text-violet-700 border-violet-200" };
  }
  if (t.includes("updated") || t.includes("update")) {
    return { label: "Update", className: "bg-sky-50 text-sky-700 border-sky-200" };
  }
  return { label: "Action", className: "bg-gray-50 text-gray-700 border-gray-200" };
}

export default function ManagementPage() {
  const [me, setMe] = useState<MeUser | null>(null);
  const [management, setManagement] = useState<ManagementRow[]>([]);
  const [activities, setActivities] = useState<ActivityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [rowBusy, setRowBusy] = useState<Record<string, boolean>>({});
  const [deleteTarget, setDeleteTarget] = useState<ManagementRow | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [passwordTarget, setPasswordTarget] = useState<ManagementRow | null>(
    null
  );
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [activityQuery, setActivityQuery] = useState("");
  const [activityDatePreset, setActivityDatePreset] =
    useState<DatePreset>("all");
  const [activityFrom, setActivityFrom] = useState("");
  const [activityTo, setActivityTo] = useState("");

  const resetPasswordDialog = () => {
    setPasswordTarget(null);
    setNewPassword("");
    setConfirmPassword("");
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const loadActivities = useCallback(async () => {
    const actRes = await fetch("/api/management/activities", {
      headers: { Authorization: `Bearer ${localStorage.getItem("rm_token")}` },
    });
    if (!actRes.ok) {
      const j = await actRes.json().catch(() => ({}));
      throw new Error(
        typeof j.message === "string" ? j.message : "Could not load activities"
      );
    }
    const actJson = (await actRes.json()) as { activities?: ActivityRow[] };
    setActivities(
      Array.isArray(actJson.activities)
        ? actJson.activities.map((a) => ({
            ...a,
            _id: String(a._id),
            managementId: String(a.managementId),
            activity: String(a.activity ?? ""),
          }))
        : []
    );
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const meRes = await fetch("/api/management/controller", {
        headers: { Authorization: `Bearer ${localStorage.getItem("rm_token")}` },
      });
      if (!meRes.ok) {
        const j = await meRes.json().catch(() => ({}));
        throw new Error(
          typeof j.message === "string" ? j.message : "Could not load profile"
        );
      }
      const meJson = (await meRes.json()) as {
        user?: { id?: string; name?: string; email?: string; role?: string };
      };
      const u = meJson.user;
      if (
        !u?.name ||
        !u?.email ||
        !u?.role ||
        (u.role !== "super_admin" && u.role !== "editor")
      ) {
        throw new Error("Invalid session");
      }
      setMe({
        id: typeof u.id === "string" ? u.id : "",
        name: u.name,
        email: u.email,
        role: u.role,
      });

      const listRes = await fetch("/api/management/get-all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("rm_token")}` },
      });
      if (!listRes.ok) {
        const j = await listRes.json().catch(() => ({}));
        throw new Error(
          typeof j.message === "string" ? j.message : "Could not load team"
        );
      }
      const listJson = (await listRes.json()) as {
        management?: ManagementRow[];
      };
      setManagement(
        Array.isArray(listJson.management)
          ? listJson.management.map((m) => ({
              ...m,
              _id: String(m._id),
            }))
          : []
      );

      if (u.role === "super_admin") {
        await loadActivities();
      } else {
        setActivities([]);
      }
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : "Something went wrong");
      setMe(null);
      setManagement([]);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }, [loadActivities]);

  useEffect(() => {
    void load();
  }, [load]);

  const managementById = useMemo(() => {
    const map = new Map<string, ManagementRow>();
    for (const m of management) map.set(rowId(m), m);
    return map;
  }, [management]);

  const filteredActivities = useMemo(() => {
    const range = getDateRange(activityDatePreset, activityFrom, activityTo);
    let items = activities;

    if (range) {
      items = items.filter((a) => {
        const raw = a.activityTime || a.createdAt || "";
        const date = new Date(raw);
        if (Number.isNaN(date.getTime())) return false;
        return isWithinInterval(date, range);
      });
    }

    const q = activityQuery.trim().toLowerCase();
    if (!q) return items;

    return items.filter((a) => {
      const actor = managementById.get(String(a.managementId));
      const hay = [
        a.activity,
        actor?.name,
        actor?.email,
        formatWhen(a.activityTime || a.createdAt),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [
    activities,
    activityQuery,
    activityDatePreset,
    activityFrom,
    activityTo,
    managementById,
  ]);

  const hasActivityFilters =
    activityQuery.trim().length > 0 || activityDatePreset !== "all";

  const clearActivityFilters = () => {
    setActivityQuery("");
    setActivityDatePreset("all");
    setActivityFrom("");
    setActivityTo("");
  };

  const stats = useMemo(() => {
    return {
      total: management.length,
      active: management.filter((m) => m.isActive).length,
      superAdmins: management.filter((m) => m.role === "super_admin").length,
      activities: activities.length,
    };
  }, [management, activities.length]);

  const setActiveForUser = async (row: ManagementRow, next: boolean) => {
    const id = rowId(row);
    setRowBusy((b) => ({ ...b, [id]: true }));
    try {
      const res = await fetch("/api/management/controller", {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ userId: id, isActive: next }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(typeof j.message === "string" ? j.message : "Update failed");
        return;
      }
      setManagement((prev) =>
        prev.map((m) => (rowId(m) === id ? { ...m, isActive: next } : m))
      );
      toast.success("Status updated");
      if (me?.role === "super_admin") {
        try {
          await loadActivities();
        } catch {
          /* ignore refresh errors */
        }
      }
    } finally {
      setRowBusy((b) => ({ ...b, [id]: false }));
    }
  };

  const confirmChangePassword = async () => {
    if (!passwordTarget) return;
    const policyError = validateManagementPassword(newPassword);
    if (policyError) {
      toast.error(policyError);
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    const id = rowId(passwordTarget);
    setChangingPassword(true);
    try {
      const res = await fetch("/api/management/change-password", {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ userId: id, password: newPassword }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(
          typeof j.message === "string" ? j.message : "Password update failed"
        );
        return;
      }
      toast.success("Password updated");
      resetPasswordDialog();
      if (me?.role === "super_admin") {
        try {
          await loadActivities();
        } catch {
          /* ignore */
        }
      }
    } finally {
      setChangingPassword(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const id = rowId(deleteTarget);
    setDeleting(true);
    try {
      const res = await fetch("/api/management/controller", {
        method: "DELETE",
        headers: authHeaders(),
        body: JSON.stringify({ userId: id }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(typeof j.message === "string" ? j.message : "Delete failed");
        return;
      }
      setManagement((prev) => prev.filter((m) => rowId(m) !== id));
      setDeleteTarget(null);
      toast.success("User removed");
      if (me?.role === "super_admin") {
        try {
          await loadActivities();
        } catch {
          /* ignore */
        }
      }
    } finally {
      setDeleting(false);
    }
  };

  const isSuperAdmin = me?.role === "super_admin";
  const myId = me?.id ?? "";

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-5 p-2 md:p-4">
        <Toaster position="top-right" />
        <Skeleton className="h-24 w-full rounded-lg" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Skeleton className="h-20 rounded-lg" />
          <Skeleton className="h-20 rounded-lg" />
          <Skeleton className="h-20 rounded-lg" />
          <Skeleton className="h-20 rounded-lg" />
        </div>
        <Skeleton className="h-64 w-full rounded-lg" />
        <div className="flex items-center justify-center gap-2 py-6 text-sm text-gray-500">
          <Loader2 className="size-4 animate-spin" />
          Loading management…
        </div>
      </div>
    );
  }

  if (!me) {
    return (
      <div className="p-6">
        <Toaster position="top-right" />
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          Unable to load this page.
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => void load()}
          >
            <RefreshCw className="size-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-5 p-2 md:p-4">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="rounded-lg border border-gray-200 bg-white px-5 py-5 shadow-sm sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <Users className="size-5 text-gray-500" />
              <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                Management
              </h1>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {isSuperAdmin
                ? "Manage team accounts, passwords, status, and review the full activity log."
                : "Update active status or remove non–super-admin accounts."}
            </p>
            <div className="mt-3">
              <Breadcrumb currentPage="Management" />
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void load()}
            aria-label="Refresh management data"
          >
            <RefreshCw className="size-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Session + stats */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:col-span-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Your session
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-[#C59D4F]/15 text-sm font-semibold text-[#9A7530]">
              {getInitials(me.name)}
            </div>
            <div className="min-w-0">
              <p className="truncate font-medium text-gray-900">{me.name}</p>
              <p className="truncate text-sm text-gray-500">{me.email}</p>
              <span className="mt-1 inline-flex rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-700">
                {formatRole(me.role)}
              </span>
            </div>
          </div>
        </div>

        {[
          { label: "Team members", value: stats.total, icon: Users },
          { label: "Active", value: stats.active, icon: User },
          { label: "Super admins", value: stats.superAdmins, icon: Shield },
          ...(isSuperAdmin
            ? [{ label: "Activities", value: stats.activities, icon: Activity }]
            : []),
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-lg border border-gray-200 bg-white px-4 py-3.5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-medium text-gray-500">{label}</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{value}</p>
              </div>
              <div className="rounded-md bg-gray-50 p-2 text-gray-500">
                <Icon className="size-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Team</h2>
          <p className="mt-0.5 text-sm text-gray-500">
            {isSuperAdmin
              ? "All management users. Change passwords, toggle status, or delete accounts."
              : "Editors can change editors and other roles except super admins."}
          </p>
        </div>

        {management.length === 0 ? (
          <div className="px-5 py-14 text-center text-sm text-gray-500">
            No users found.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {/* Header row — desktop */}
            <div className="hidden grid-cols-[minmax(0,1.4fr)_minmax(0,1.4fr)_120px_90px_110px] gap-3 bg-gray-50/80 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500 md:grid">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span>Active</span>
              <span className="text-right">Actions</span>
            </div>

            {management.map((row) => {
              const id = rowId(row);
              const isSelf = myId !== "" && id === myId;
              const isTargetSuper = row.role === "super_admin";
              const editorLocked = me.role === "editor" && isTargetSuper;
              const switchDisabled = rowBusy[id] || editorLocked || isSelf;
              const deleteDisabled = rowBusy[id] || isSelf || editorLocked;

              return (
                <div
                  key={id}
                  className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.4fr)_120px_90px_110px] md:items-center md:gap-3"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                      {getInitials(row.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-gray-900">
                        {row.name}
                        {isSelf ? (
                          <span className="ml-1.5 text-xs font-normal text-gray-400">
                            (you)
                          </span>
                        ) : null}
                      </p>
                      <p className="truncate text-xs text-gray-500 md:hidden">
                        {row.email}
                      </p>
                    </div>
                  </div>

                  <p className="hidden truncate text-sm text-gray-600 md:block">
                    {row.email}
                  </p>

                  <div>
                    <span
                      className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-medium ${
                        row.role === "super_admin"
                          ? "border-[#C59D4F]/25 bg-[#C59D4F]/10 text-[#9A7530]"
                          : "border-gray-200 bg-gray-50 text-gray-700"
                      }`}
                    >
                      {formatRole(row.role)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 md:hidden">Active</span>
                    <Switch
                      checked={row.isActive}
                      disabled={switchDisabled}
                      onCheckedChange={(checked) =>
                        setActiveForUser(row, checked)
                      }
                      aria-label={`Active ${row.name}`}
                    />
                  </div>

                  <div className="flex items-center justify-start gap-1 md:justify-end">
                    {isSuperAdmin ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            disabled={rowBusy[id]}
                            onClick={() => setPasswordTarget(row)}
                            className="inline-flex size-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50"
                            aria-label={`Change password for ${row.name}`}
                          >
                            <KeyRound className="size-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Change password</TooltipContent>
                      </Tooltip>
                    ) : null}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          disabled={deleteDisabled}
                          onClick={() => setDeleteTarget(row)}
                          className="inline-flex size-8 items-center justify-center rounded-md border border-gray-200 bg-white text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                          aria-label={`Delete ${row.name}`}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Activity log — list/timeline (avoids admin-v2 table CSS) */}
      {isSuperAdmin ? (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-5 py-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Activity log
                </h2>
                <p className="mt-0.5 text-sm text-gray-500">
                  All management actions across the admin panel.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap lg:w-auto lg:justify-end">
                <div className="relative w-full sm:min-w-[220px] sm:flex-1 lg:w-56 lg:flex-none">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    value={activityQuery}
                    onChange={(e) => setActivityQuery(e.target.value)}
                    placeholder="Search activities…"
                    className="pl-9 pr-9"
                    aria-label="Search activity log"
                  />
                  {activityQuery ? (
                    <button
                      type="button"
                      onClick={() => setActivityQuery("")}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label="Clear activity search"
                    >
                      <X className="size-4" />
                    </button>
                  ) : null}
                </div>

                <div className="w-full sm:w-44">
                  <label className="sr-only" htmlFor="activity-date-preset">
                    Filter by date
                  </label>
                  <select
                    id="activity-date-preset"
                    value={activityDatePreset}
                    onChange={(e) =>
                      setActivityDatePreset(e.target.value as DatePreset)
                    }
                    className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    aria-label="Filter activity log by date"
                  >
                    {(Object.keys(DATE_PRESET_LABELS) as DatePreset[]).map(
                      (key) => (
                        <option key={key} value={key}>
                          {DATE_PRESET_LABELS[key]}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {activityDatePreset === "custom" && (
                  <>
                    <div className="w-full sm:w-40">
                      <label className="sr-only" htmlFor="activity-from">
                        From date
                      </label>
                      <Input
                        id="activity-from"
                        type="date"
                        value={activityFrom}
                        onChange={(e) => setActivityFrom(e.target.value)}
                        aria-label="Activity from date"
                      />
                    </div>
                    <div className="w-full sm:w-40">
                      <label className="sr-only" htmlFor="activity-to">
                        To date
                      </label>
                      <Input
                        id="activity-to"
                        type="date"
                        value={activityTo}
                        onChange={(e) => setActivityTo(e.target.value)}
                        aria-label="Activity to date"
                      />
                    </div>
                  </>
                )}

                {hasActivityFilters && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-9"
                    onClick={clearActivityFilters}
                  >
                    <X className="size-4" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Showing {filteredActivities.length} of {activities.length} events
            </p>
          </div>

          <div className="max-h-[560px] overflow-y-auto">
            {filteredActivities.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 px-5 py-14 text-center">
                <p className="text-sm text-gray-500">
                  {activities.length === 0
                    ? "No activities yet."
                    : "No activities match your filters."}
                </p>
                {hasActivityFilters && activities.length > 0 ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={clearActivityFilters}
                  >
                    <X className="size-4" />
                    Clear Filters
                  </Button>
                ) : null}
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {filteredActivities.map((a) => {
                  const actor = managementById.get(String(a.managementId));
                  const kind = activityKind(a.activity || "");
                  const when = formatWhen(a.activityTime || a.createdAt);
                  return (
                    <li
                      key={a._id}
                      className="flex gap-3 px-5 py-4 transition-colors hover:bg-gray-50/80"
                    >
                      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                        {actor ? getInitials(actor.name) : <Activity className="size-3.5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-medium ${kind.className}`}
                          >
                            {kind.label}
                          </span>
                          <span className="text-xs text-gray-500">{when}</span>
                          {actor ? (
                            <span className="truncate text-xs text-gray-400">
                              by {actor.name}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1.5 break-words text-sm leading-relaxed text-gray-900 whitespace-pre-wrap">
                          {a.activity?.trim() || "—"}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      ) : null}

      {/* Password dialog */}
      <Dialog
        open={!!passwordTarget}
        onOpenChange={(open) => !open && resetPasswordDialog()}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change password</DialogTitle>
            <DialogDescription>
              Set a new password for{" "}
              <strong>{passwordTarget?.name}</strong> ({passwordTarget?.email}).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-1">
            <div className="space-y-2">
              <Label htmlFor="mgmt-new-password">New password</Label>
              <div className="relative">
                <Input
                  id="mgmt-new-password"
                  type={showNewPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={changingPassword}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-1 size-8 -translate-y-1/2"
                  onClick={() => setShowNewPassword((v) => !v)}
                  aria-label={
                    showNewPassword ? "Hide password" : "Show password"
                  }
                >
                  {showNewPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mgmt-confirm-password">Confirm password</Label>
              <div className="relative">
                <Input
                  id="mgmt-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={changingPassword}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-1 size-8 -translate-y-1/2"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Must be at least 8 characters and include uppercase, lowercase, a
              number, and a special character.
            </p>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={changingPassword}
              onClick={resetPasswordDialog}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={changingPassword || !newPassword || !confirmPassword}
              onClick={() => void confirmChangePassword()}
            >
              {changingPassword ? "Updating…" : "Update password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete user?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove{" "}
              <strong>{deleteTarget?.name}</strong> ({deleteTarget?.email}). This
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <Button
              type="button"
              variant="destructive"
              disabled={deleting}
              onClick={() => void confirmDelete()}
            >
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
