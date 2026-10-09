"use client";

import axios, { isAxiosError } from "axios";
import { useCallback, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  buildExportBasename,
  downloadTextFile,
  pickHistoryRow,
  pickUserRow,
  rowsToCsv,
  type ChatbotUserExportRow,
  type ChattingHistoryExportRow,
  type DownloadApiResponse,
} from "./chatsExportUtils";

type ExportFormat = "csv" | "json";

function isValidDateRange(start: string, end: string): boolean {
  if (!start || !end) return false;
  const a = new Date(`${start}T00:00:00`);
  const b = new Date(`${end}T00:00:00`);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return false;
  return a.getTime() <= b.getTime();
}

async function fetchExportData(
  startDate: string,
  endDate: string,
): Promise<DownloadApiResponse> {
  const { data } = await axios.get<DownloadApiResponse>(
    "/api/chatting/download",
    { params: { startDate, endDate } },
  );
  return data;
}

async function runExport(
  format: ExportFormat,
  history: ChattingHistoryExportRow[],
  users: ChatbotUserExportRow[] | undefined,
  basename: string,
) {
  const historyRows = history.map((row) =>
    pickHistoryRow(row as Record<string, unknown>),
  );
  const historyHeaders = [
    "id",
    "user_message",
    "bot_reply",
    "user_id",
    "chat_timing",
  ];

  const pause = () => new Promise((r) => setTimeout(r, 200));

  if (format === "csv") {
    const csv = rowsToCsv(historyHeaders, historyRows);
    downloadTextFile(
      `chatting-history_${basename}.csv`,
      csv,
      "text/csv;charset=utf-8",
    );
    const userList = users?.length
      ? users.map((u) => pickUserRow(u as Record<string, unknown>))
      : [];
    if (userList.length > 0) {
      await pause();
      const userCsv = rowsToCsv(["id", "user_id", "created_at"], userList);
      downloadTextFile(
        `chatbot-users_${basename}.csv`,
        userCsv,
        "text/csv;charset=utf-8",
      );
    }
  } else {
    const historyPayload = historyRows.map((r) => ({
      id: r.id,
      user_message: r.user_message,
      bot_reply: r.bot_reply,
      user_id: r.user_id,
      chat_timing: r.chat_timing,
    }));
    downloadTextFile(
      `chatting-history_${basename}.json`,
      JSON.stringify(historyPayload, null, 2),
      "application/json;charset=utf-8",
    );
    if (users?.length) {
      await pause();
      const userPayload = users.map((u) => {
        const p = pickUserRow(u as Record<string, unknown>);
        return {
          id: p.id,
          user_id: p.user_id,
          created_at: p.created_at,
        };
      });
      downloadTextFile(
        `chatbot-users_${basename}.json`,
        JSON.stringify(userPayload, null, 2),
        "application/json;charset=utf-8",
      );
    }
  }
}

export default function ChatsExportPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const canExport = useMemo(
    () => isValidDateRange(startDate, endDate),
    [startDate, endDate],
  );

  const handleExport = useCallback(
    async (format: ExportFormat) => {
      if (!canExport) {
        toast.error("Choose a valid start and end date (start ≤ end).");
        return;
      }

      setLoading(true);
      const t = toast.loading(
        format === "csv" ? "Preparing CSV export…" : "Preparing JSON export…",
      );

      try {
        const data = await fetchExportData(startDate, endDate);
        const history = Array.isArray(data.chatting_history)
          ? data.chatting_history
          : [];
        const users = Array.isArray(data.chatbot_users)
          ? data.chatbot_users
          : [];

        if (history.length === 0) {
          toast.dismiss(t);
          toast.error("No data found between selected dates.");
          return;
        }

        const basename = buildExportBasename(startDate, endDate);
        await runExport(
          format,
          history,
          users.length ? users : undefined,
          basename,
        );

        toast.dismiss(t);
        const extra =
          users.length > 0
            ? ` (+ chatbot users: ${users.length})`
            : "";
        toast.success(
          `Exported ${history.length} chat row${history.length === 1 ? "" : "s"}${extra}.`,
        );
      } catch (err) {
        toast.dismiss(t);
        if (isAxiosError(err)) {
          const status = err.response?.status;
          const msg = (err.response?.data as { message?: string })?.message;
          if (status === 404 || msg === "No data found") {
            toast.error("No data found between selected dates.");
            return;
          }
          if (status === 400) {
            toast.error(msg || "Invalid request. Check your dates.");
            return;
          }
        }
        toast.error("Export failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [canExport, startDate, endDate],
  );

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 4500 }} />
      <div className="min-h-screen bg-slate-50/80 pb-12">
        <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
          <header className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Chats — Export
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Download chat history (and matching users when available) for a
              date range. Uses server filters on{" "}
              <code className="rounded bg-slate-200/80 px-1 py-0.5 text-xs">
                chat_timing
              </code>{" "}
              and{" "}
              <code className="rounded bg-slate-200/80 px-1 py-0.5 text-xs">
                created_at
              </code>
              .
            </p>
          </header>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/60 ring-1 ring-slate-100 sm:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Date range
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Start date
                </span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  End date
                </span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </label>
            </div>

            {!canExport && (startDate || endDate) && (
              <p className="mt-3 text-sm text-amber-700" role="status">
                Select both dates with start on or before end.
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                disabled={!canExport || loading}
                onClick={() => handleExport("csv")}
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Working…" : "Export CSV"}
              </button>
              <button
                type="button"
                disabled={!canExport || loading}
                onClick={() => handleExport("json")}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Working…" : "Export JSON"}
              </button>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-slate-500">
              <strong className="text-slate-600">CSV / JSON — history:</strong>{" "}
              id, user_message, bot_reply, user_id, chat_timing.
              <br />
              <strong className="text-slate-600">Users (if any):</strong> id,
              user_id, created_at — second file only when the API returns user
              rows.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
