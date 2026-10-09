import {
  eachDayOfInterval,
  endOfDay,
  format,
  isValid,
  parseISO,
  startOfDay,
  subDays,
} from "date-fns";

/** Rows from `chatbot_users` */
export type ChatbotUserRow = {
  id: number;
  user_id: string;
  [key: string]: unknown;
};

/** Rows from `user_chatting_history` */
export type BotChatRow = {
  id?: number;
  user_message?: string;
  bot_reply?: string;
  user_id?: number;
  chat_timing?: string | Date;
  created_at?: string | Date;
  updated_at?: string | Date;
  [key: string]: unknown;
};

export type ChatsApiResponse = {
  bot_chats: BotChatRow[];
  chats_users: ChatbotUserRow[];
};

const TIMESTAMP_KEYS = [
  "chat_timing",
  "created_at",
  "updated_at",
  "createdAt",
  "timestamp",
] as const;

export function getChatTimestamp(row: BotChatRow): Date | null {
  for (const key of TIMESTAMP_KEYS) {
    const v = row[key];
    if (v == null || v === "") continue;
    const d = v instanceof Date ? v : new Date(v as string | number);
    if (isValid(d)) return d;
  }
  return null;
}

/** Deterministic display name from IP or id string, e.g. User_A1B2 */
export function displayUsernameFromSeed(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  const hex = (Math.abs(h) >>> 0).toString(16).toUpperCase().padStart(8, "0");
  return `User_${hex.slice(0, 4)}`;
}

export function buildUserIdToUsernameMap(
  users: ChatbotUserRow[],
): Map<number, string> {
  const map = new Map<number, string>();
  for (const u of users) {
    if (typeof u.id !== "number") continue;
    const seed =
      typeof u.user_id === "string" && u.user_id.length > 0
        ? u.user_id
        : String(u.id);
    map.set(u.id, displayUsernameFromSeed(seed));
  }
  return map;
}

export function uniqueSessionCount(users: ChatbotUserRow[]): number {
  const ids = new Set<number>();
  for (const u of users) {
    if (typeof u.id === "number") ids.add(u.id);
  }
  return ids.size;
}

export type DayCount = { date: string; label: string; count: number };

export function aggregateChatsByDay(
  chats: BotChatRow[],
  days: 7 | 30,
): DayCount[] {
  const end = endOfDay(new Date());
  const start = startOfDay(subDays(end, days - 1));

  const dayKeys = eachDayOfInterval({ start, end }).map((d) =>
    format(d, "yyyy-MM-dd"),
  );

  const counts = new Map<string, number>();
  for (const key of dayKeys) counts.set(key, 0);

  for (const row of chats) {
    const t = getChatTimestamp(row);
    if (!t) continue;
    const key = format(startOfDay(t), "yyyy-MM-dd");
    if (!counts.has(key)) continue;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return dayKeys.map((key) => ({
    date: key,
    label: format(parseISO(`${key}T12:00:00`), "MMM d"),
    count: counts.get(key) ?? 0,
  }));
}

export function formatChatDateTime(d: Date): string {
  return format(d, "MMM d, yyyy · h:mm a");
}

export type RecentChatItem = {
  id: string;
  username: string;
  user_message: string;
  time: Date;
};

export function getRecentChats(
  chats: BotChatRow[],
  userMap: Map<number, string>,
  limit: number,
): RecentChatItem[] {
  const withTime = chats
    .map((row, index) => {
      const t = getChatTimestamp(row);
      if (!t) return null;
      const uid = row.user_id;
      const username =
        typeof uid === "number" && userMap.has(uid)
          ? userMap.get(uid)!
          : displayUsernameFromSeed(String(uid ?? index));
      const msg = row.user_message?.trim() || "(No message)";
      const id = String(row.id ?? `${t.getTime()}-${index}`);
      return { id, username, user_message: msg, time: t };
    })
    .filter((x): x is RecentChatItem => x !== null)
    .sort((a, b) => b.time.getTime() - a.time.getTime())
    .slice(0, limit);

  return withTime;
}
