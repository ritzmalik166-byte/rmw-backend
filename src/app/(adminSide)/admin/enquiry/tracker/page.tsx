"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { format } from "date-fns";
import { toast } from "sonner";
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Calendar,
  Check,
  Copy,
  Download,
  Eye,
  Filter,
  Globe,
  Home,
  Mail,
  MapPin,
  Network,
  Phone,
  RefreshCw,
  Search,
  Server,
  Shield,
  User,
  Wifi,
  X,
} from "lucide-react";

interface EnquiryTrackerItem {
  _id: string;
  name: string;
  email: string;
  message: string;
  etype?: string;
  mobile?: string | null;
  ip: string;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  timezone?: string | null;
  isp?: string | null;
  connectionType?: string | null;
  organisation?: string | null;
  asn?: string | null;
  ipv4?: string | null;
  ipv6?: string | null;
  createdAt: string;
}

interface TrackerPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface TrackerApiResponse {
  success: boolean;
  data?: EnquiryTrackerItem[];
  pagination?: TrackerPagination;
  stats?: {
    total?: number;
    connectionTypeCounts?: Record<string, number>;
  };
  error?: string;
}

interface Filters {
  q: string;
  etype: string;
  country: string;
  state: string;
  city: string;
  connectionType: string;
  isp: string;
  from: string;
  to: string;
}

const EMPTY_FILTERS: Filters = {
  q: "",
  etype: "",
  country: "",
  state: "",
  city: "",
  connectionType: "",
  isp: "",
  from: "",
  to: "",
};

const CONNECTION_TYPES = ["mobile", "broadband", "hosting", "VPN", "unknown"];
const EXPORT_MAX = 100;

const FILTER_LABELS: Record<keyof Filters, string> = {
  q: "Search",
  etype: "Type",
  country: "Country",
  state: "State",
  city: "City",
  connectionType: "Connection",
  isp: "ISP",
  from: "From",
  to: "To",
};

function connectionBadgeClass(type?: string | null) {
  switch ((type || "").toLowerCase()) {
    case "vpn":
      return "bg-red-100 text-red-800 border-red-200";
    case "hosting":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "mobile":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "broadband":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

function getCount(
  counts: Record<string, number>,
  key: string
): number {
  if (counts[key] != null) return counts[key];
  const lower = key.toLowerCase();
  for (const [k, v] of Object.entries(counts)) {
    if (k.toLowerCase() === lower) return v;
  }
  return 0;
}

function locationLabel(item: EnquiryTrackerItem) {
  return [item.city, item.state, item.country].filter(Boolean).join(", ") || "—";
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
}

function formatDateSafe(value?: string | null, pattern = "dd MMM yyyy, HH:mm") {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return format(date, pattern);
}

async function copyText(value: string, label: string) {
  if (!value || value === "—") return;
  try {
    await navigator.clipboard.writeText(value);
    toast.success(`${label} copied`);
  } catch {
    toast.error(`Failed to copy ${label}`);
  }
}

const Page = () => {
  const [items, setItems] = useState<EnquiryTrackerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [connectionTypeCounts, setConnectionTypeCounts] = useState<
    Record<string, number>
  >({});
  const [selected, setSelected] = useState<EnquiryTrackerItem | null>(null);
  const [exporting, setExporting] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const fetchData = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const requestId = ++requestIdRef.current;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(limit));

      Object.entries(appliedFilters).forEach(([key, value]) => {
        if (value.trim()) params.set(key, value.trim());
      });

      const res = await axios.get<TrackerApiResponse>(
        `/api/system-settings/enquiry-tracker?${params.toString()}`,
        { signal: controller.signal }
      );

      if (requestId !== requestIdRef.current) return;

      setItems(res.data.data || []);
      setTotal(res.data.pagination?.total || 0);
      setTotalPages(res.data.pagination?.totalPages || 1);
      setConnectionTypeCounts(res.data.stats?.connectionTypeCounts || {});
    } catch (err) {
      if (axios.isCancel(err) || (err as { code?: string })?.code === "ERR_CANCELED") {
        return;
      }
      if (requestId !== requestIdRef.current) return;
      console.error("Error fetching enquiry tracker");
      setError("Unable to load enquiry tracker data.");
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [appliedFilters, page, limit]);

  useEffect(() => {
    void fetchData();
    return () => {
      abortRef.current?.abort();
    };
  }, [fetchData]);

  const activeFilterEntries = useMemo(
    () =>
      (Object.keys(appliedFilters) as (keyof Filters)[])
        .filter((key) => appliedFilters[key].trim())
        .map((key) => ({
          key,
          label: FILTER_LABELS[key],
          value: appliedFilters[key].trim(),
        })),
    [appliedFilters]
  );

  const applyFilters = () => {
    setPage(1);
    setAppliedFilters({ ...filters });
  };

  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setAppliedFilters(EMPTY_FILTERS);
    setPage(1);
  };

  const removeAppliedFilter = (key: keyof Filters) => {
    const next = { ...appliedFilters, [key]: "" };
    setFilters((prev) => ({ ...prev, [key]: "" }));
    setAppliedFilters(next);
    setPage(1);
  };

  const exportToExcel = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      const XLSX = await import("xlsx");
      const saveAs = (await import("file-saver")).default;

      const params = new URLSearchParams();
      params.set("page", "1");
      params.set("limit", String(EXPORT_MAX));
      Object.entries(appliedFilters).forEach(([key, value]) => {
        if (value.trim()) params.set(key, value.trim());
      });

      const res = await axios.get<TrackerApiResponse>(
        `/api/system-settings/enquiry-tracker?${params.toString()}`
      );
      const rows = res.data.data || [];
      const matchedTotal = res.data.pagination?.total ?? rows.length;

      if (rows.length === 0) {
        toast.error("No tracker records found for the selected filters.");
        return;
      }

      const exportData = rows.map((row) => ({
        Name: row.name,
        Email: row.email,
        Mobile: row.mobile || "",
        Type: row.etype || "",
        Message: row.message,
        IP: row.ip,
        IPv4: row.ipv4 || "",
        IPv6: row.ipv6 || "",
        Country: row.country || "",
        State: row.state || "",
        City: row.city || "",
        Timezone: row.timezone || "",
        ISP: row.isp || "",
        ConnectionType: row.connectionType || "",
        Organisation: row.organisation || "",
        ASN: row.asn || "",
        CreatedAt: formatDateSafe(row.createdAt, "dd/MM/yyyy HH:mm"),
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "EnquiryTracker");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(data, `EnquiryTracker_${format(new Date(), "yyyy-MM-dd")}.xlsx`);

      if (matchedTotal > EXPORT_MAX) {
        toast.success(
          `Exported first ${rows.length} of ${matchedTotal} matching records (API max ${EXPORT_MAX}).`
        );
      } else {
        toast.success(`Exported ${rows.length} record${rows.length === 1 ? "" : "s"}.`);
      }
    } catch (err) {
      console.error("Error exporting enquiry tracker");
      toast.error("Failed to export tracker data.");
    } finally {
      setExporting(false);
    }
  };

  const broadband = getCount(connectionTypeCounts, "broadband");
  const vpn = getCount(connectionTypeCounts, "VPN");
  const hosting = getCount(connectionTypeCounts, "hosting");
  const mobile = getCount(connectionTypeCounts, "mobile");

  const pageButtons = useMemo(() => {
    const buttons: number[] = [];
    const showCount = Math.min(5, totalPages);
    for (let i = 0; i < showCount; i++) {
      let pageNum: number;
      if (totalPages <= 5) pageNum = i + 1;
      else if (page <= 3) pageNum = i + 1;
      else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
      else pageNum = page - 2 + i;
      buttons.push(pageNum);
    }
    return buttons;
  }, [page, totalPages]);

  const showingFrom = total === 0 ? 0 : (page - 1) * limit + 1;
  const showingTo = Math.min(page * limit, total);

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-5">
        {/* Header */}
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-5 shadow-sm sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <Network className="size-5 text-gray-500" />
                <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                  Enquiry Tracker
                </h1>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Review flagged enquiry submissions with IP and network metadata.
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
                <span className="text-gray-700">Enquiry Tracker</span>
              </nav>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => void fetchData()}
                disabled={loading}
                aria-label="Refresh tracker data"
              >
                <RefreshCw
                  className={`size-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => void exportToExcel()}
                disabled={exporting || loading}
                aria-label="Export tracker data"
              >
                <Download className="size-4" />
                {exporting ? "Exporting…" : "Export"}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats — from filtered API stats only */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Total Matches",
              value: total,
              icon: Filter,
              accent: "border-l-blue-500",
            },
            {
              label: "Broadband",
              value: broadband,
              icon: Wifi,
              accent: "border-l-green-500",
            },
            {
              label: "VPN",
              value: vpn,
              icon: Shield,
              accent: "border-l-red-500",
            },
            {
              label: "Hosting / Mobile",
              value: hosting + mobile,
              icon: Server,
              accent: "border-l-orange-500",
            },
          ].map(({ label, value, icon: Icon, accent }) => (
            <div
              key={label}
              className={`rounded-lg border border-gray-200 border-l-4 bg-white px-4 py-3.5 shadow-sm transition-shadow hover:shadow-md ${accent}`}
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
          <div className="mb-4 flex items-center gap-2">
            <Filter className="size-4 text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-900">Filters</h2>
            {loading && (
              <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-gray-500">
                <RefreshCw className="size-3 animate-spin" />
                Loading…
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                Search
              </label>
              <Search className="pointer-events-none absolute bottom-2.5 left-3 size-4 text-gray-400" />
              <Input
                value={filters.q}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, q: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") applyFilters();
                }}
                placeholder="Search name, email, IP, city, ISP, ASN…"
                className="pl-9 pr-9"
                aria-label="Search tracker records"
                disabled={loading}
              />
              {filters.q && (
                <button
                  type="button"
                  onClick={() => setFilters((f) => ({ ...f, q: "" }))}
                  className="absolute bottom-2.5 right-3 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <Field
              label="Enquiry type"
              value={filters.etype}
              onChange={(v) => setFilters((f) => ({ ...f, etype: v }))}
              placeholder="e.g. ContactUs, career"
              disabled={loading}
            />

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                Connection type
              </label>
              <select
                value={filters.connectionType}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    connectionType: e.target.value,
                  }))
                }
                disabled={loading}
                className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:opacity-50"
                aria-label="Filter by connection type"
              >
                <option value="">All connection types</option>
                {CONNECTION_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <Field
              label="Country"
              value={filters.country}
              onChange={(v) => setFilters((f) => ({ ...f, country: v }))}
              placeholder="Country"
              disabled={loading}
            />
            <Field
              label="State"
              value={filters.state}
              onChange={(v) => setFilters((f) => ({ ...f, state: v }))}
              placeholder="State"
              disabled={loading}
            />
            <Field
              label="City"
              value={filters.city}
              onChange={(v) => setFilters((f) => ({ ...f, city: v }))}
              placeholder="City"
              disabled={loading}
            />
            <Field
              label="ISP"
              value={filters.isp}
              onChange={(v) => setFilters((f) => ({ ...f, isp: v }))}
              placeholder="ISP"
              disabled={loading}
            />
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                From date
              </label>
              <Input
                type="date"
                value={filters.from}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, from: e.target.value }))
                }
                disabled={loading}
                aria-label="From date"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                To date
              </label>
              <Input
                type="date"
                value={filters.to}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, to: e.target.value }))
                }
                disabled={loading}
                aria-label="To date"
              />
            </div>
          </div>

          {activeFilterEntries.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {activeFilterEntries.map(({ key, label, value }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => removeAppliedFilter(key)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-700 hover:bg-gray-100"
                  aria-label={`Remove ${label} filter`}
                >
                  <span className="font-medium">{label}:</span>
                  <span className="max-w-[140px] truncate">{value}</span>
                  <X className="size-3" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button
              type="button"
              size="sm"
              onClick={applyFilters}
              disabled={loading}
            >
              Apply Filters
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={clearFilters}
              disabled={loading || activeFilterEntries.length === 0}
            >
              Clear Filters
            </Button>
            <p className="text-xs text-gray-500">
              Export is limited to the first {EXPORT_MAX} matching records.
            </p>
          </div>
        </div>

        {/* Table card */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-center gap-2">
              <Globe className="size-4 text-gray-500" />
              <h2 className="text-sm font-semibold text-gray-900">
                Tracked Enquiries
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500" htmlFor="tracker-limit">
                Show
              </label>
              <select
                id="tracker-limit"
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                disabled={loading}
                className="border-input h-8 rounded-md border bg-transparent px-2 text-sm shadow-xs outline-none"
                aria-label="Rows per page"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="space-y-3 p-4 sm:p-5">
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
                onClick={() => void fetchData()}
              >
                <RefreshCw className="size-4" />
                Retry
              </Button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm font-medium text-gray-800">
                No tracked enquiries found
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {activeFilterEntries.length > 0
                  ? "Try adjusting or clearing your filters."
                  : "Flagged enquiry submissions will appear here."}
              </p>
              {activeFilterEntries.length > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[1000px]">
                  <thead className="border-b border-gray-200 bg-gray-50/80">
                    <tr>
                      {[
                        "Name",
                        "Contact",
                        "Location",
                        "IP / ISP",
                        "Connection",
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
                    {items.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50/80">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                              {getInitials(item.name)}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-gray-900">
                                {item.name}
                              </p>
                              <p className="truncate text-xs text-gray-500">
                                {item.etype || "contact"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <a
                            href={`mailto:${item.email}`}
                            className="block max-w-[180px] truncate text-blue-600 hover:underline"
                          >
                            {item.email}
                          </a>
                          {item.mobile ? (
                            <a
                              href={`tel:${item.mobile}`}
                              className="mt-0.5 block text-xs text-blue-600 hover:underline"
                            >
                              {item.mobile}
                            </a>
                          ) : (
                            <p className="mt-0.5 text-xs text-gray-400">—</p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          <div className="flex items-start gap-1">
                            <MapPin className="mt-0.5 size-3.5 shrink-0 text-gray-400" />
                            <span className="break-words">
                              {locationLabel(item)}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-gray-400">
                            {item.timezone || "—"}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          <p className="font-mono text-xs">{item.ip}</p>
                          <p className="mt-0.5 max-w-[160px] truncate text-xs">
                            {item.isp || "—"}
                          </p>
                          {item.organisation ? (
                            <p className="mt-0.5 max-w-[160px] truncate text-xs text-gray-400">
                              {item.organisation}
                            </p>
                          ) : null}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${connectionBadgeClass(
                              item.connectionType
                            )}`}
                          >
                            {item.connectionType || "unknown"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                          {formatDateSafe(item.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                onClick={() => setSelected(item)}
                                className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
                                aria-label={`View details for ${item.name}`}
                              >
                                <Eye className="size-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>View</TooltipContent>
                          </Tooltip>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile */}
              <div className="divide-y divide-gray-100 lg:hidden">
                {items.map((item) => (
                  <div key={item._id} className="space-y-2.5 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                          {getInitials(item.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.etype || "contact"}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`shrink-0 rounded-md border px-2 py-0.5 text-xs font-medium ${connectionBadgeClass(
                          item.connectionType
                        )}`}
                      >
                        {item.connectionType || "unknown"}
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
                    <p className="text-xs text-gray-500">
                      {locationLabel(item)}
                    </p>
                    <p className="font-mono text-xs text-gray-500">{item.ip}</p>
                    <p className="truncate text-xs text-gray-500">
                      {item.isp || "—"}
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                      <span className="text-xs text-gray-400">
                        {formatDateSafe(item.createdAt, "dd MMM yyyy")}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSelected(item)}
                        aria-label={`View details for ${item.name}`}
                      >
                        <Eye className="size-4" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-200 px-4 py-3 sm:flex-row sm:px-5">
                <p className="text-xs text-gray-500 sm:text-sm">
                  Showing {showingFrom}–{showingTo} of {total} · Page {page} of{" "}
                  {totalPages}
                </p>
                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(1)}
                      disabled={page === 1}
                      aria-label="First page"
                    >
                      First
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    {pageButtons.map((pageNum) => (
                      <Button
                        key={pageNum}
                        type="button"
                        variant={page === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(pageNum)}
                        aria-label={`Go to page ${pageNum}`}
                        aria-current={page === pageNum ? "page" : undefined}
                      >
                        {pageNum}
                      </Button>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                    >
                      Next
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(totalPages)}
                      disabled={page === totalPages}
                      aria-label="Last page"
                    >
                      Last
                    </Button>
                  </div>
                )}
              </div>
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

      {/* Details modal */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tracker Details</DialogTitle>
            <DialogDescription>
              Applicant, network, and location details for this submission.
            </DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-6 text-sm">
              <Section title="Applicant" icon={User}>
                <DetailRow label="Name" value={selected.name} />
                <div>
                  <p className="mb-1 text-xs font-medium text-gray-500">Email</p>
                  <a
                    href={`mailto:${selected.email}`}
                    className="inline-flex items-center gap-1.5 break-all text-blue-600 hover:underline"
                  >
                    <Mail className="size-3.5 shrink-0" />
                    {selected.email}
                  </a>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-gray-500">Mobile</p>
                  {selected.mobile ? (
                    <a
                      href={`tel:${selected.mobile}`}
                      className="inline-flex items-center gap-1.5 text-blue-600 hover:underline"
                    >
                      <Phone className="size-3.5 shrink-0" />
                      {selected.mobile}
                    </a>
                  ) : (
                    <p className="text-gray-900">—</p>
                  )}
                </div>
                <DetailRow
                  label="Enquiry Type"
                  value={selected.etype || "contact"}
                />
              </Section>

              <Section title="Network" icon={Network}>
                <CopyRow label="IP" value={selected.ip} />
                <CopyRow label="IPv4" value={selected.ipv4 || "—"} />
                <CopyRow label="IPv6" value={selected.ipv6 || "—"} />
                <div>
                  <p className="mb-1 text-xs font-medium text-gray-500">
                    Connection Type
                  </p>
                  <span
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${connectionBadgeClass(
                      selected.connectionType
                    )}`}
                  >
                    {selected.connectionType || "unknown"}
                  </span>
                </div>
                <CopyRow label="ISP" value={selected.isp || "—"} />
                <DetailRow
                  label="Organisation"
                  value={selected.organisation || "—"}
                />
                <CopyRow label="ASN" value={selected.asn || "—"} />
              </Section>

              <Section title="Location" icon={MapPin}>
                <DetailRow label="Country" value={selected.country || "—"} />
                <DetailRow label="State" value={selected.state || "—"} />
                <DetailRow label="City" value={selected.city || "—"} />
                <DetailRow
                  label="Timezone"
                  value={selected.timezone || "—"}
                />
              </Section>

              <Section title="Submission" icon={Calendar}>
                <DetailRow
                  label="Created"
                  value={formatDateSafe(selected.createdAt)}
                />
              </Section>

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
    </div>
  );
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-500">
        {label}
      </label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={label}
      />
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
        <Icon className="size-3.5" />
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium text-gray-500">{label}</p>
      <p className="break-words text-gray-900">{value}</p>
    </div>
  );
}

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const canCopy = Boolean(value && value !== "—");

  const handleCopy = async () => {
    if (!canCopy) return;
    await copyText(value, label);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <p className="mb-1 text-xs font-medium text-gray-500">{label}</p>
      <div className="flex items-start gap-2">
        <p className="min-w-0 flex-1 break-all font-mono text-xs text-gray-900 sm:text-sm">
          {value}
        </p>
        {canCopy && (
          <button
            type="button"
            onClick={() => void handleCopy()}
            className="shrink-0 rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            aria-label={`Copy ${label}`}
          >
            {copied ? (
              <Check className="size-3.5 text-green-600" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Page;
