"use client";

import axios, { isAxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import type { BotChatRow } from "../overview/chatsOverviewUtils";
import {
  formatChatDateTime,
  getChatTimestamp,
} from "../overview/chatsOverviewUtils";

type Props = {
  userId: number | null;
  headerTitle: string;
};

type HistoryResponse = {
  chatting_history?: BotChatRow[];
  message?: string;
};

export default function RightSide({ userId, headerTitle }: Props) {
  const [rows, setRows] = useState<BotChatRow[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId == null) {
      setRows(null);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setRows(null);

    axios
      .get<HistoryResponse>(`/api/chatting/get/all-users/${userId}`)
      .then(({ data }) => {
        if (cancelled) return;
        const list = data.chatting_history;
        setRows(Array.isArray(list) ? list : []);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (isAxiosError(err) && err.response?.status === 404) {
          setRows([]);
          setError(null);
          return;
        }
        const msg =
          isAxiosError(err) && err.response?.data
            ? String(
                (err.response.data as { message?: string }).message ??
                  "Failed to load",
              )
            : "Failed to load history";
        setError(msg);
        setRows(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const chronological = useMemo(() => {
    if (!rows?.length) return [];
    return [...rows].sort((a, b) => {
      const ia = typeof a.id === "number" ? a.id : 0;
      const ib = typeof b.id === "number" ? b.id : 0;
      return ia - ib;
    });
  }, [rows]);

  if (userId == null) {
    return (
      <div className="flex h-full min-h-0 flex-1 flex-col items-center justify-center bg-[#efeae2] px-6 text-center">
        <div className="max-w-sm rounded-2xl border border-slate-200/60 bg-white/80 px-6 py-8 shadow-sm backdrop-blur-sm">
          <p className="text-lg font-medium text-slate-800">
            Chatbot history
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Choose a user from the list to view their full message history.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col bg-[#efeae2]">
      <div className="flex shrink-0 items-center gap-3 border-b border-slate-200/80 bg-[#f0f2f5] px-4 py-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white"
          aria-hidden
        >
          {headerTitle.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h2 className="truncate font-semibold text-slate-900">{headerTitle}</h2>
          <p className="truncate text-xs text-slate-500">User id · {userId}</p>
        </div>
      </div>

      <div
        className="min-h-0 flex-1 overflow-y-auto px-3 py-4"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8b8a8' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {loading && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`h-14 max-w-[80%] animate-pulse rounded-xl bg-white/60 ${
                  i % 2 === 0 ? "mr-auto" : "ml-auto"
                }`}
              />
            ))}
          </div>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && chronological.length === 0 && (
          <p className="rounded-lg bg-white/70 px-3 py-8 text-center text-sm text-slate-600 shadow-sm">
            No messages for this user yet.
          </p>
        )}

        {!loading && !error && chronological.length > 0 && (
          <ul className="flex flex-col gap-2">
            {chronological.map((row, index) => {
              const userText = (row.user_message ?? "").trim() || "—";
              const botText = (row.bot_reply ?? "").trim() || "—";
              const t = getChatTimestamp(row);
              const timeLabel = t ? formatChatDateTime(t) : null;
              const key =
                typeof row.id === "number" ? String(row.id) : `row-${index}`;

              return (
                <li key={key} className="flex flex-col gap-2">
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-lg rounded-tr-sm bg-[#dcf8c6] px-3 py-2 shadow-sm">
                      <p className="whitespace-pre-wrap break-words text-sm text-slate-900">
                        {userText}
                      </p>
                      {timeLabel && (
                        <p className="mt-1 text-right text-[10px] text-slate-500">
                          {timeLabel}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-lg rounded-tl-sm bg-white px-3 py-2 shadow-sm">
                      <p className="text-xs font-medium text-emerald-700">
                        Bot
                      </p>
                      <p className="mt-1 whitespace-pre-wrap break-words text-sm text-slate-900">
                        {botText}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
