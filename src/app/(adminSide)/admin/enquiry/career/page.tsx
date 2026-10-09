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
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import {
  Briefcase,
  Calendar,
  ChevronDown,
  Download,
  Eye,
  FileText,
  Mail,
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
  resume: string;
  category: string;
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

const encodeFilePath = (filePath: string): string => {
  if (!filePath) return filePath;
  const parts = filePath.split("/");
  return parts.map((part) => encodeURIComponent(part)).join("/");
};

function getResumeFilename(resume: string): string {
  if (!resume) return "";
  const cleaned = resume.split("?")[0] || resume;
  const parts = cleaned.split("/").filter(Boolean);
  const name = parts[parts.length - 1] || "";
  try {
    return decodeURIComponent(name);
  } catch {
    return name;
  }
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

function truncateMessage(message: string, max = 72): string {
  const cleaned = (message || "").replace(/\s+/g, " ").trim();
  if (!cleaned) return "—";
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max)}…`;
}

function exportApplications(items: ContactEnquiry[], filename: string) {
  if (items.length === 0) {
    toast.error("No applications found for the selected period.");
    return;
  }

  const exportData = items.map((item) => ({
    Name: item.name || "",
    Email: item.email || "",
    Mobile: item.mobile || "",
    Category: item.category || "",
    Message: item.message || "",
    Resume: item.resume || "",
    "Enquiry Type": item.etype || "",
    "Submitted Date": item.send_date
      ? format(new Date(item.send_date), "dd MMM yyyy, HH:mm")
      : "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "CareerEnquiries");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, filename);
  toast.success(
    `Exported ${items.length} application${items.length === 1 ? "" : "s"}.`
  );
}

const Page = () => {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [datePreset, setDatePreset] = useState<DatePreset>("all");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
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
      setEnquiries(data.filter((entry) => entry.etype === "career"));
    } catch (err) {
      console.error("Error fetching career enquiries:", err);
      setError("Unable to load career applications.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchEnquiries();
  }, [fetchEnquiries]);

  const categoryOptions = useMemo(() => {
    const set = new Set<string>();
    for (const item of enquiries) {
      const cat = (item.category || "").trim();
      if (cat) set.add(cat);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [enquiries]);

  const dateRange = useMemo(
    () => getDateRange(datePreset, customFrom, customTo),
    [datePreset, customFrom, customTo]
  );

  const filteredEnquiries = useMemo(() => {
    let items = filterByDateRange(enquiries, dateRange);

    if (categoryFilter !== "all") {
      items = items.filter(
        (item) => (item.category || "").trim() === categoryFilter
      );
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      items = items.filter((item) =>
        [item.name, item.email, item.mobile, item.category, item.message].some(
          (field) =>
            String(field ?? "")
              .toLowerCase()
              .includes(q)
        )
      );
    }

    return items;
  }, [enquiries, dateRange, categoryFilter, searchQuery]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    datePreset !== "all" ||
    categoryFilter !== "all";

  const stats = useMemo(() => {
    const now = new Date();
    return {
      total: enquiries.length,
      withResume: enquiries.filter((e) => e.resume).length,
      withEmail: enquiries.filter((e) => e.email).length,
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
    setCategoryFilter("all");
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
        toast.success("Application deleted successfully.");
      } else {
        toast.error("Failed to delete application.");
      }
    } catch (err) {
      console.error("Error deleting career enquiry:", err);
      toast.error("Failed to delete application.");
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
    exportApplications(
      filterByDateRange(enquiries, range),
      `CareerEnquiries-${preset}.xlsx`
    );
  };

  const handleExportCustom = () => {
    if (!exportFrom || !exportTo) {
      toast.error("Please select both From and To dates.");
      return;
    }
    const range = getDateRange("custom", exportFrom, exportTo);
    exportApplications(
      filterByDateRange(enquiries, range),
      "CareerEnquiries-custom.xlsx"
    );
    setExportCustomOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-5">
        {/* Header */}
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-5 shadow-sm sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <Briefcase className="size-5 text-gray-500" />
                <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                  Career Enquiries
                </h1>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Manage and review career applications submitted through your
                website.
              </p>
              <div className="mt-3">
                <Breadcrumb currentPage="Career-Enquiry" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => void fetchEnquiries()}
                disabled={loading}
                aria-label="Refresh applications"
              >
                <RefreshCw
                  className={`size-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>

              <DropdownMenu open={exportOpen} onOpenChange={setExportOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    size="sm"
                    aria-label="Export applications"
                  >
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
                  <DropdownMenuItem
                    onClick={() => handleExportPreset("last30")}
                  >
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
                  <DropdownMenuItem
                    onClick={() => handleExportPreset("custom")}
                  >
                    Custom Range
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Total Applications",
              value: stats.total,
              icon: Briefcase,
            },
            { label: "With Resume", value: stats.withResume, icon: FileText },
            { label: "With Email", value: stats.withEmail, icon: Mail },
            { label: "This Month", value: stats.thisMonth, icon: Calendar },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-lg border border-gray-200 bg-white px-4 py-3.5 shadow-sm"
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
                <div className="rounded-md bg-gray-50 p-2 text-gray-500">
                  <Icon className="size-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
            <div className="relative flex-1">
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                Search
              </label>
              <Search className="pointer-events-none absolute bottom-2.5 left-3 size-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, email, mobile, category, message…"
                className="pl-9"
                aria-label="Search applications"
              />
            </div>

            <div className="w-full lg:w-44">
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

            {categoryOptions.length > 0 && (
              <div className="w-full lg:w-48">
                <label className="mb-1.5 block text-xs font-medium text-gray-500">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  aria-label="Filter by category"
                >
                  <option value="all">All Categories</option>
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
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
              Showing {filteredEnquiries.length} of {enquiries.length}{" "}
              applications
            </p>
          )}
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
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
            <div className="py-16 text-center">
              <p className="text-sm font-medium text-gray-800">
                No career applications yet
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Career applications submitted through the website will appear
                here.
              </p>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <p className="text-sm text-gray-500">
                No applications match your filters.
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
            <div className="overflow-x-auto">
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
                    key: "category",
                    label: "Category",
                    render: (row) => (
                      <span className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-700">
                        {row.category || "—"}
                      </span>
                    ),
                  },
                  {
                    key: "resume",
                    label: "Resume",
                    render: (row) =>
                      row.resume ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a
                              href={encodeFilePath(row.resume)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                              aria-label={`View resume for ${row.name}`}
                            >
                              <FileText className="size-3.5" />
                              <span className="hidden sm:inline">View</span>
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            {getResumeFilename(row.resume) || "View Resume"}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
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
                      <p className="max-w-[200px] truncate text-sm text-gray-600">
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
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setSelected(row)}
                          className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
                          aria-label={`View application from ${row.name}`}
                        >
                          <Eye className="size-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>View</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(row)}
                          className="rounded-md p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
                          aria-label={`Delete application from ${row.name}`}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                  </div>
                )}
                emptyMessage="No career applications found."
              />
            </div>
          )}
        </div>

        <footer className="py-2 text-center text-sm text-gray-500">
          Designed and Developed by{" "}
          <strong className="font-medium text-gray-800">
            Ritz Media World
          </strong>
        </footer>
      </div>

      {/* View modal */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Full details for the selected career application.
            </DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-6 text-sm">
              <section className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Applicant
                </h3>
                <DetailRow label="Name" value={selected.name} />
                <DetailRow label="Email" value={selected.email} />
                <DetailRow label="Mobile" value={selected.mobile || "—"} />
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Application
                </h3>
                <DetailRow
                  label="Category"
                  value={selected.category || "—"}
                />
                <DetailRow
                  label="Application Date"
                  value={format(
                    new Date(selected.send_date),
                    "dd MMM yyyy, HH:mm"
                  )}
                />
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Resume
                </h3>
                {selected.resume ? (
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-md border border-gray-200 bg-gray-50 p-3">
                    <div className="flex min-w-0 items-center gap-2 text-gray-700">
                      <FileText className="size-4 shrink-0" />
                      <span className="truncate">
                        {getResumeFilename(selected.resume) || "Resume file"}
                      </span>
                    </div>
                    <Button asChild size="sm" variant="outline">
                      <a
                        href={encodeFilePath(selected.resume)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="size-4" />
                        View Resume
                      </a>
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-500">No resume attached</p>
                )}
              </section>

              <section>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Message
                </h3>
                <div className="whitespace-pre-wrap break-words rounded-md border border-gray-200 bg-gray-50 p-3 text-gray-800">
                  {selected.message || "—"}
                </div>
              </section>
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
            <AlertDialogTitle>Delete this application?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete this career
              application
              {deleteTarget?.name ? (
                <>
                  {" "}
                  from <strong>{deleteTarget.name}</strong>
                </>
              ) : null}
              ? This action cannot be undone.
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
              Export Excel
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
      <p className="mb-1 text-xs font-medium text-gray-500">{label}</p>
      <p className="break-words text-gray-900">{value}</p>
    </div>
  );
}

export default Page;
