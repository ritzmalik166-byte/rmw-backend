"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Table from "@/components/ui/AdminTable";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import {
  Calendar,
  ChevronDown,
  Download,
  Eye,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  User,
  X,
} from "lucide-react";

interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  subject?: string;
  category?: string;
  message: string;
  mobile?: string;
  etype: string;
  send_date: string;
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

function getSubject(entry: ContactEnquiry): string {
  return (entry.subject || entry.category || "").trim() || "—";
}

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

function filterByDateRange(
  items: ContactEnquiry[],
  range: { start: Date; end: Date } | null
): ContactEnquiry[] {
  if (!range) return items;
  return items.filter((item) => {
    const date = new Date(item.send_date);
    if (Number.isNaN(date.getTime())) return false;
    return isWithinInterval(date, range);
  });
}

function filterBySearch(
  items: ContactEnquiry[],
  query: string
): ContactEnquiry[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) => {
    const fields = [
      item.name,
      item.email,
      item.mobile,
      getSubject(item),
      item.message,
    ];
    return fields.some((field) =>
      String(field ?? "")
        .toLowerCase()
        .includes(q)
    );
  });
}

function truncateMessage(message: string, max = 80): string {
  const cleaned = (message || "").replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max)}…`;
}

function exportEnquiries(items: ContactEnquiry[], filename: string) {
  if (items.length === 0) {
    toast.error("No enquiries to export for the selected range.");
    return;
  }

  const exportData = items.map((item) => ({
    Name: item.name || "",
    Email: item.email || "",
    Mobile: item.mobile || "",
    Subject: getSubject(item) === "—" ? "" : getSubject(item),
    Message: item.message || "",
    "Enquiry Type": item.etype || "",
    "Submitted Date": item.send_date
      ? format(new Date(item.send_date), "dd MMM yyyy, HH:mm")
      : "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "ContactEnquiries");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, filename);
  toast.success(`Exported ${items.length} enquir${items.length === 1 ? "y" : "ies"}.`);
}

const Page = () => {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [datePreset, setDatePreset] = useState<DatePreset>("all");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [selected, setSelected] = useState<ContactEnquiry | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactEnquiry | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportCustomOpen, setExportCustomOpen] = useState(false);
  const [exportFrom, setExportFrom] = useState("");
  const [exportTo, setExportTo] = useState("");

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/system-settings/contact-enquiry");
      const data = res.data as ContactEnquiry[];
      setEnquiries(data.filter((entry) => entry.etype === "ContactUs"));
    } catch (err) {
      console.error("Error fetching contact enquiries:", err);
      setError("Failed to load contact enquiries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchEnquiries();
  }, [fetchEnquiries]);

  const dateRange = useMemo(
    () => getDateRange(datePreset, customFrom, customTo),
    [datePreset, customFrom, customTo]
  );

  const filteredEnquiries = useMemo(() => {
    const byDate = filterByDateRange(enquiries, dateRange);
    return filterBySearch(byDate, searchQuery);
  }, [enquiries, dateRange, searchQuery]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 || datePreset !== "all";

  const stats = useMemo(() => {
    const now = new Date();
    return {
      total: enquiries.length,
      withEmail: enquiries.filter((e) => e.email).length,
      withMobile: enquiries.filter((e) => e.mobile).length,
      thisMonth: enquiries.filter((e) => {
        const d = new Date(e.send_date);
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      }).length,
    };
  }, [enquiries]);

  const clearFilters = () => {
    setSearchQuery("");
    setDatePreset("all");
    setCustomFrom("");
    setCustomTo("");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await axios.delete(
        `/api/system-settings/contact-enquiry/${deleteTarget.id}`
      );
      if (res.status === 200) {
        setEnquiries((prev) => prev.filter((e) => e.id !== deleteTarget.id));
        if (selected?.id === deleteTarget.id) setSelected(null);
        toast.success("Enquiry deleted successfully.");
      } else {
        toast.error("Failed to delete enquiry.");
      }
    } catch (err) {
      console.error("Error deleting enquiry:", err);
      toast.error("Failed to delete enquiry.");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleExportPreset = (preset: DatePreset) => {
    if (preset === "custom") {
      setExportCustomOpen(true);
      return;
    }
    const range = getDateRange(preset, "", "");
    const items = filterByDateRange(enquiries, range);
    exportEnquiries(items, `ContactEnquiries-${preset}.xlsx`);
  };

  const handleExportCustom = () => {
    if (!exportFrom || !exportTo) {
      toast.error("Please select both From and To dates.");
      return;
    }
    const range = getDateRange("custom", exportFrom, exportTo);
    const items = filterByDateRange(enquiries, range);
    exportEnquiries(items, "ContactEnquiries-custom.xlsx");
    setExportCustomOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-5">
        {/* Header */}
        <div className="rounded-xl border border-gray-200 bg-white px-5 py-5 shadow-sm sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                Contact Enquiries
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Review and manage contact form submissions
              </p>
              <div className="mt-3">
                <Breadcrumb currentPage="Contact-Enquiry" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => void fetchEnquiries()}
                disabled={loading}
                aria-label="Refresh enquiries"
              >
                <RefreshCw
                  className={`size-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>

              <DropdownMenu open={exportOpen} onOpenChange={setExportOpen}>
                <DropdownMenuTrigger asChild>
                  <Button type="button" size="sm" aria-label="Export enquiries">
                    <Download className="size-4" />
                    Export
                    <ChevronDown className="size-3.5 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => handleExportPreset("all")}>
                    Export All
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleExportPreset("today")}>
                    Today
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExportPreset("last7")}>
                    Last 7 Days
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExportPreset("last30")}>
                    Last 30 Days
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExportPreset("thisMonth")}
                  >
                    This Month
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExportPreset("lastMonth")}
                  >
                    Last Month
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleExportPreset("custom")}>
                    Custom Range
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            {
              label: "Total Enquiries",
              value: stats.total,
              icon: MessageSquare,
            },
            { label: "With Email", value: stats.withEmail, icon: Mail },
            { label: "With Mobile", value: stats.withMobile, icon: Phone },
            { label: "This Month", value: stats.thisMonth, icon: Calendar },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3.5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-gray-500">{label}</p>
                  {loading ? (
                    <Skeleton className="mt-2 h-7 w-12" />
                  ) : (
                    <p className="mt-1 text-xl font-semibold text-gray-900">
                      {value}
                    </p>
                  )}
                </div>
                <div className="rounded-lg bg-gray-50 p-2 text-gray-500">
                  <Icon className="size-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
            <div className="relative flex-1">
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                Search
              </label>
              <Search className="pointer-events-none absolute bottom-2.5 left-3 size-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, email, mobile, subject, message…"
                className="pl-9"
                aria-label="Search enquiries"
              />
            </div>

            <div className="w-full lg:w-48">
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                Date
              </label>
              <select
                value={datePreset}
                onChange={(e) => setDatePreset(e.target.value as DatePreset)}
                className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                aria-label="Filter by date"
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

            {datePreset === "custom" && (
              <>
                <div className="w-full lg:w-40">
                  <label className="mb-1.5 block text-xs font-medium text-gray-500">
                    From
                  </label>
                  <Input
                    type="date"
                    value={customFrom}
                    onChange={(e) => setCustomFrom(e.target.value)}
                    aria-label="Custom from date"
                  />
                </div>
                <div className="w-full lg:w-40">
                  <label className="mb-1.5 block text-xs font-medium text-gray-500">
                    To
                  </label>
                  <Input
                    type="date"
                    value={customTo}
                    onChange={(e) => setCustomTo(e.target.value)}
                    aria-label="Custom to date"
                  />
                </div>
              </>
            )}

            {hasActiveFilters && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9"
                onClick={clearFilters}
              >
                <X className="size-4" />
                Clear Filters
              </Button>
            )}
          </div>
          {!loading && !error && (
            <p className="mt-3 text-xs text-gray-500">
              Showing {filteredEnquiries.length} of {enquiries.length} enquiries
            </p>
          )}
        </div>

        {/* Content */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <p className="text-sm text-gray-600">{error}</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => void fetchEnquiries()}
              >
                <RefreshCw className="size-4" />
                Retry
              </Button>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="py-16 text-center text-sm text-gray-500">
              No contact enquiries found.
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <p className="text-sm text-gray-500">
                No enquiries match your filters.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={clearFilters}
              >
                <X className="size-4" />
                Clear Filters
              </Button>
            </div>
          ) : (
            <Table
              columns={[
                {
                  key: "name",
                  label: "Name",
                  render: (row) => (
                    <div className="flex items-center gap-2">
                      <User className="size-4 shrink-0 text-gray-400" />
                      <span className="truncate font-medium text-gray-900">
                        {row.name}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "email",
                  label: "Email",
                  render: (row) => (
                    <a
                      href={`mailto:${row.email}`}
                      className="truncate text-sm text-blue-600 hover:underline"
                    >
                      {row.email}
                    </a>
                  ),
                },
                {
                  key: "mobile",
                  label: "Mobile",
                  render: (row) =>
                    row.mobile ? (
                      <a
                        href={`tel:${row.mobile}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {row.mobile}
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    ),
                },
                {
                  key: "message",
                  label: "Message",
                  render: (row) => (
                    <p className="max-w-[220px] truncate text-sm text-gray-600">
                      {truncateMessage(row.message)}
                    </p>
                  ),
                },
                {
                  key: "send_date",
                  label: "Date",
                  render: (row) => (
                    <span className="whitespace-nowrap text-sm text-gray-600">
                      {format(new Date(row.send_date), "dd MMM, yyyy")}
                    </span>
                  ),
                },
              ]}
              data={filteredEnquiries}
              actionButtons={(row) => (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setSelected(row)}
                    className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
                    aria-label={`View enquiry from ${row.name}`}
                  >
                    <Eye className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(row)}
                    className="rounded-md p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
                    aria-label={`Delete enquiry from ${row.name}`}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              )}
              emptyMessage="No contact enquiries found."
            />
          )}
        </div>

        <footer className="py-2 text-center text-sm text-gray-500">
          Designed and Developed by{" "}
          <strong className="font-medium text-gray-800">Ritz Media World</strong>
        </footer>
      </div>

      {/* View modal */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
            <DialogDescription>
              Full details for the selected contact enquiry.
            </DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <DetailRow label="Name" value={selected.name} />
              <DetailRow label="Email" value={selected.email} />
              <DetailRow label="Mobile" value={selected.mobile || "—"} />
              <DetailRow label="Subject" value={getSubject(selected)} />
              <DetailRow label="Enquiry Type" value={selected.etype} />
              <DetailRow
                label="Submitted Date"
                value={format(
                  new Date(selected.send_date),
                  "dd MMM yyyy, HH:mm"
                )}
              />
              <div>
                <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Message
                </p>
                <div className="whitespace-pre-wrap break-words rounded-lg border border-gray-200 bg-gray-50 p-3 text-gray-800">
                  {selected.message}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open && !deleting) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete enquiry?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the enquiry from{" "}
              <strong>{deleteTarget?.name}</strong>. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                void handleDelete();
              }}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Export custom range */}
      <Dialog open={exportCustomOpen} onOpenChange={setExportCustomOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Export Custom Range</DialogTitle>
            <DialogDescription>
              Choose a date range. The To date includes the full day until
              23:59:59.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                From Date
              </label>
              <Input
                type="date"
                value={exportFrom}
                onChange={(e) => setExportFrom(e.target.value)}
                aria-label="Export from date"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                To Date
              </label>
              <Input
                type="date"
                value={exportTo}
                onChange={(e) => setExportTo(e.target.value)}
                aria-label="Export to date"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setExportCustomOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={handleExportCustom}>
              <Download className="size-4" />
              Export
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="break-words text-gray-900">{value}</p>
    </div>
  );
}

export default Page;
