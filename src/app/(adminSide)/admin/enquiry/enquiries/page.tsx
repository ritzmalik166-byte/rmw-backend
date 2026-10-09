"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
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
import { toast } from "sonner";
import {
  Calendar,
  ChevronDown,
  Download,
  Eye,
  Home,
  Mail,
  MessageSquare,
  Monitor,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  User,
  X,
} from "lucide-react";

interface Enquiry {
  id: string;
  etype: string;
  name: string;
  email: string;
  mobile?: string;
  message: string;
  category?: string;
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

function getCategoryLabel(item: Enquiry): string {
  return (item.category || item.etype || "General").trim() || "General";
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
  items: Enquiry[],
  range: { start: Date; end: Date } | null
): Enquiry[] {
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

async function exportEnquiries(items: Enquiry[], filename: string) {
  if (items.length === 0) {
    toast.error("No enquiries found for the selected period.");
    return;
  }

  try {
    const XLSX = await import("xlsx");
    const saveAs = (await import("file-saver")).default;

    const exportData = items.map((item) => ({
      Name: item.name || "",
      Email: item.email || "",
      Mobile: item.mobile || "",
      Category: getCategoryLabel(item),
      Message: item.message || "",
      "Enquiry Type": item.etype || "",
      "Submitted Date": item.send_date
        ? format(new Date(item.send_date), "dd MMM yyyy, HH:mm")
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, filename);
    toast.success(
      `Exported ${items.length} enquir${items.length === 1 ? "y" : "ies"}.`
    );
  } catch (err) {
    console.error("Error exporting to Excel:", err);
    toast.error("Failed to export enquiries.");
  }
}

const Page = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [datePreset, setDatePreset] = useState<DatePreset>("all");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Enquiry | null>(null);
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
      setEnquiries(res.data as Enquiry[]);
    } catch (err) {
      console.error("Error fetching enquiries:", err);
      setError("Unable to load enquiries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchEnquiries();
  }, [fetchEnquiries]);

  const typeOptions = useMemo(() => {
    const set = new Set<string>();
    for (const item of enquiries) {
      const value = (item.etype || item.category || "").trim();
      if (value) set.add(value);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [enquiries]);

  const dateRange = useMemo(
    () => getDateRange(datePreset, customFrom, customTo),
    [datePreset, customFrom, customTo]
  );

  const filteredData = useMemo(() => {
    let items = filterByDateRange(enquiries, dateRange);

    if (typeFilter !== "all") {
      items = items.filter(
        (item) =>
          (item.etype || "").trim() === typeFilter ||
          (item.category || "").trim() === typeFilter
      );
    }

    const q = searchTerm.trim().toLowerCase();
    if (q) {
      items = items.filter((item) =>
        [
          item.name,
          item.email,
          item.mobile,
          item.message,
          item.category,
          item.etype,
        ].some((field) =>
          String(field ?? "")
            .toLowerCase()
            .includes(q)
        )
      );
    }

    return items;
  }, [enquiries, dateRange, typeFilter, searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / entriesPerPage) || 1
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    return filteredData.slice(startIndex, startIndex + entriesPerPage);
  }, [filteredData, currentPage, entriesPerPage]);

  const stats = useMemo(() => {
    const now = new Date();
    return {
      total: enquiries.length,
      thisMonth: enquiries.filter((e) => {
        const date = new Date(e.send_date);
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      }).length,
      filtered: filteredData.length,
      showing: paginatedData.length,
    };
  }, [enquiries, filteredData.length, paginatedData.length]);

  const hasActiveFilters =
    searchTerm.trim().length > 0 ||
    datePreset !== "all" ||
    typeFilter !== "all";

  const showingFrom =
    filteredData.length === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1;
  const showingTo = Math.min(
    currentPage * entriesPerPage,
    filteredData.length
  );

  const clearFilters = () => {
    setSearchTerm("");
    setDatePreset("all");
    setCustomFrom("");
    setCustomTo("");
    setTypeFilter("all");
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    try {
      await axios.delete(
        `/api/system-settings/contact-enquiry/${deleteTarget.id}`
      );
      setEnquiries((prev) => prev.filter((e) => e.id !== deleteTarget.id));
      if (selected?.id === deleteTarget.id) setSelected(null);
      toast.success("Enquiry deleted successfully.");
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
    void exportEnquiries(
      filterByDateRange(enquiries, getDateRange(preset, "", "")),
      `Enquiries_${preset}_${format(new Date(), "yyyy-MM-dd")}.xlsx`
    );
  };

  const handleExportCustom = () => {
    if (!exportFrom || !exportTo) {
      toast.error("Please select both From and To dates.");
      return;
    }
    void exportEnquiries(
      filterByDateRange(
        enquiries,
        getDateRange("custom", exportFrom, exportTo)
      ),
      `Enquiries_custom_${format(new Date(), "yyyy-MM-dd")}.xlsx`
    );
    setExportCustomOpen(false);
  };

  const pageButtons = useMemo(() => {
    const buttons: number[] = [];
    const showCount = Math.min(5, totalPages);
    for (let i = 0; i < showCount; i++) {
      let pageNum: number;
      if (totalPages <= 5) pageNum = i + 1;
      else if (currentPage <= 3) pageNum = i + 1;
      else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
      else pageNum = currentPage - 2 + i;
      buttons.push(pageNum);
    }
    return buttons;
  }, [currentPage, totalPages]);

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-5">
        {/* Header */}
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-5 shadow-sm sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <Monitor className="size-5 text-gray-500" />
                <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                  Enquiry Management
                </h1>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Manage and review all customer enquiries.
              </p>
              <nav
                className="mt-3 flex items-center gap-2 text-xs text-gray-500"
                aria-label="Breadcrumb"
              >
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1 hover:text-gray-800"
                >
                  <Home className="size-3.5" />
                  Home
                </Link>
                <span>/</span>
                <span className="text-gray-700">Enquiries</span>
              </nav>
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
              label: "Total Enquiries",
              value: stats.total,
              icon: MessageSquare,
            },
            { label: "This Month", value: stats.thisMonth, icon: Calendar },
            { label: "Filtered", value: stats.filtered, icon: Search },
            { label: "Showing", value: stats.showing, icon: Eye },
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
          {loading ? (
            <div className="grid gap-3 lg:grid-cols-4">
              <Skeleton className="h-9 w-full lg:col-span-2" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
                <div className="relative flex-1">
                  <label className="mb-1.5 block text-xs font-medium text-gray-500">
                    Search
                  </label>
                  <Search className="pointer-events-none absolute bottom-2.5 left-3 size-4 text-gray-400" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search name, email, mobile, message, category, type…"
                    className="pl-9"
                    aria-label="Search enquiries"
                  />
                </div>

                <div className="w-full lg:w-44">
                  <label className="mb-1.5 block text-xs font-medium text-gray-500">
                    Date
                  </label>
                  <select
                    value={datePreset}
                    onChange={(e) => {
                      setDatePreset(e.target.value as DatePreset);
                      setCurrentPage(1);
                    }}
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
                        onChange={(e) => {
                          setCustomFrom(e.target.value);
                          setCurrentPage(1);
                        }}
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
                        onChange={(e) => {
                          setCustomTo(e.target.value);
                          setCurrentPage(1);
                        }}
                        aria-label="Custom to date"
                      />
                    </div>
                  </>
                )}

                {typeOptions.length > 0 && (
                  <div className="w-full lg:w-48">
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">
                      Category
                    </label>
                    <select
                      value={typeFilter}
                      onChange={(e) => {
                        setTypeFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                      aria-label="Filter by category"
                    >
                      <option value="all">All Categories</option>
                      {typeOptions.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="w-full lg:w-36">
                  <label className="mb-1.5 block text-xs font-medium text-gray-500">
                    Entries
                  </label>
                  <select
                    value={entriesPerPage}
                    onChange={(e) => {
                      setEntriesPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    aria-label="Entries per page"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>

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
              {!error && (
                <p className="mt-3 text-xs text-gray-500">
                  Showing {showingFrom}–{showingTo} of {filteredData.length}{" "}
                  enquiries
                </p>
              )}
            </>
          )}
        </div>

        {/* Content */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          {loading ? (
            <div className="space-y-3 p-4 sm:p-5">
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
                No enquiries found
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Customer enquiries will appear here.
              </p>
            </div>
          ) : filteredData.length === 0 ? (
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
            <>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[900px]">
                  <thead className="border-b border-gray-200 bg-gray-50/80">
                    <tr>
                      {[
                        "Name",
                        "Email",
                        "Phone",
                        "Category",
                        "Message",
                        "Date",
                        "Actions",
                      ].map((label) => (
                        <th
                          key={label}
                          className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                        >
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/80">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <User className="size-4 shrink-0 text-gray-400" />
                            <span className="font-medium text-gray-900">
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <a
                            href={`mailto:${item.email}`}
                            className="truncate text-sm text-blue-600 hover:underline"
                          >
                            {item.email}
                          </a>
                        </td>
                        <td className="px-4 py-3">
                          {item.mobile ? (
                            <a
                              href={`tel:${item.mobile}`}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {item.mobile}
                            </a>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-700">
                            {getCategoryLabel(item)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="max-w-[220px] truncate text-sm text-gray-600">
                            {truncateMessage(item.message)}
                          </p>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {format(new Date(item.send_date), "dd MMM, yyyy")}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  type="button"
                                  onClick={() => setSelected(item)}
                                  className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
                                  aria-label={`View enquiry from ${item.name}`}
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
                                  onClick={() => setDeleteTarget(item)}
                                  className="rounded-md p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
                                  aria-label={`Delete enquiry from ${item.name}`}
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="divide-y divide-gray-100 md:hidden">
                {paginatedData.map((item) => (
                  <div key={item.id} className="space-y-3 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <User className="size-4 shrink-0 text-gray-400" />
                        <h3 className="truncate font-medium text-gray-900">
                          {item.name}
                        </h3>
                      </div>
                      <span className="shrink-0 rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-700">
                        {getCategoryLabel(item)}
                      </span>
                    </div>
                    <a
                      href={`mailto:${item.email}`}
                      className="block truncate text-sm text-blue-600"
                    >
                      {item.email}
                    </a>
                    {item.mobile ? (
                      <a
                        href={`tel:${item.mobile}`}
                        className="block text-sm text-blue-600"
                      >
                        {item.mobile}
                      </a>
                    ) : null}
                    <p className="line-clamp-2 text-sm text-gray-600">
                      {truncateMessage(item.message, 100)}
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                      <span className="text-xs text-gray-500">
                        {format(new Date(item.send_date), "dd MMM, yyyy")}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setSelected(item)}
                          className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
                          aria-label={`View enquiry from ${item.name}`}
                        >
                          <Eye className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="rounded-md p-2 text-red-500 hover:bg-red-50"
                          aria-label={`Delete enquiry from ${item.name}`}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {filteredData.length > 0 && (
                <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-200 px-4 py-3 sm:flex-row sm:px-5">
                  <p className="text-xs text-gray-500 sm:text-sm">
                    Showing {showingFrom}–{showingTo} of {filteredData.length}{" "}
                    enquiries
                  </p>
                  {totalPages > 1 && (
                    <div className="flex flex-wrap items-center justify-center gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      {pageButtons.map((pageNum) => (
                        <Button
                          key={pageNum}
                          type="button"
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          aria-label={`Go to page ${pageNum}`}
                          aria-current={
                            currentPage === pageNum ? "page" : undefined
                          }
                        >
                          {pageNum}
                        </Button>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </>
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
            <DialogTitle>Enquiry Details</DialogTitle>
            <DialogDescription>
              Full details for the selected enquiry.
            </DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-6 text-sm">
              <section className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Contact
                </h3>
                <DetailRow label="Name" value={selected.name} />
                <div>
                  <p className="mb-1 text-xs font-medium text-gray-500">
                    Email
                  </p>
                  <a
                    href={`mailto:${selected.email}`}
                    className="break-all text-blue-600 hover:underline"
                  >
                    {selected.email}
                  </a>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-gray-500">
                    Phone
                  </p>
                  {selected.mobile ? (
                    <a
                      href={`tel:${selected.mobile}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selected.mobile}
                    </a>
                  ) : (
                    <p className="text-gray-900">—</p>
                  )}
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Enquiry
                </h3>
                <DetailRow
                  label="Category"
                  value={getCategoryLabel(selected)}
                />
                <DetailRow
                  label="Enquiry Type"
                  value={selected.etype || "—"}
                />
                <DetailRow
                  label="Submitted Date"
                  value={format(
                    new Date(selected.send_date),
                    "dd MMM yyyy, HH:mm"
                  )}
                />
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
            <AlertDialogTitle>Delete this enquiry?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete this enquiry
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
