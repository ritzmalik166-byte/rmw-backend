"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { ChatsLineChartCard } from "./ChatsLineChartCard";
import {
  aggregateChatsByDay,
  buildUserIdToUsernameMap,
  getRecentChats,
  type BotChatRow,
  type ChatbotUserRow,
  uniqueSessionCount,
} from "./chatsOverviewUtils";
import { OverviewStatCards } from "./OverviewStatCards";
import { RecentChatsPanel } from "./RecentChatsPanel";

type ChartRange = 7 | 30;

function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="h-32 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-32 animate-pulse rounded-2xl bg-slate-200" />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="h-[360px] animate-pulse rounded-2xl bg-slate-200 lg:col-span-3" />
        <div className="h-[360px] animate-pulse rounded-2xl bg-slate-200 lg:col-span-2" />
      </div>
    </div>
  );
}

export default function ChatsOverviewPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [botChats, setBotChats] = useState<BotChatRow[]>([]);
  const [chatsUsers, setChatsUsers] = useState<ChatbotUserRow[]>([]);
  const [chartRange, setChartRange] = useState<ChartRange>(7);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<{
          bot_chats?: BotChatRow[];
          chats_users?: ChatbotUserRow[];
          message?: string;
        }>("/api/chatting/get");
        if (cancelled) return;
        const chats = Array.isArray(res.data.bot_chats) ? res.data.bot_chats : [];
        const users = Array.isArray(res.data.chats_users)
          ? res.data.chats_users
          : [];
        setBotChats(chats);
        setChatsUsers(users);
      } catch {
        if (!cancelled) {
          setError("Could not load chat data. Please try again.");
          setBotChats([]);
          setChatsUsers([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const userMap = useMemo(
    () => buildUserIdToUsernameMap(chatsUsers),
    [chatsUsers],
  );

  const chartData = useMemo(
    () => aggregateChatsByDay(botChats, chartRange),
    [botChats, chartRange],
  );

  const recentChats = useMemo(
    () => getRecentChats(botChats, userMap, 10),
    [botChats, userMap],
  );

  const totalChats = botChats.length;
  const totalUsers = uniqueSessionCount(chatsUsers);
  const chartEmpty = botChats.length === 0;
  const recentEmpty = recentChats.length === 0;

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-50/80 pb-10">
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Chats overview
          </h1>
          <p className="text-sm text-slate-600">
            Bot conversations and visitor sessions at a glance.
          </p>
        </header>

        {error && (
          <div
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
          >
            {error}
          </div>
        )}

        <OverviewStatCards totalChats={totalChats} totalUsers={totalUsers} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-3">
            <ChatsLineChartCard
              data={chartData}
              range={chartRange}
              onRangeChange={setChartRange}
              empty={chartEmpty}
            />
          </div>
          <div className="lg:col-span-2">
            <RecentChatsPanel items={recentChats} empty={recentEmpty} />
          </div>
        </div>
      </div>
    </div>
  );
}
