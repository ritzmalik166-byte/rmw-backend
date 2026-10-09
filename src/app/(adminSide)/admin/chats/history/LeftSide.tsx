"use client";

import type { ChatbotUserRow } from "../overview/chatsOverviewUtils";
import {
  buildUserIdToUsernameMap,
  displayUsernameFromSeed,
} from "../overview/chatsOverviewUtils";

type Props = {
  users: ChatbotUserRow[];
  selectedId: number | null;
  onSelect: (user: ChatbotUserRow) => void;
  loading: boolean;
  error: string | null;
};

export default function LeftSide({
  users,
  selectedId,
  onSelect,
  loading,
  error,
}: Props) {
  const nameMap = buildUserIdToUsernameMap(users);

  return (
    <div className="flex h-full min-h-0 flex-col border-r border-slate-200/90 bg-[#f8f9fa]">
      <div className="shrink-0 border-b border-slate-200/80 bg-[#f0f2f5] px-3 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Conversations
        </p>
        <p className="mt-0.5 text-sm text-slate-600">{users.length} users</p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {loading && (
          <div className="flex flex-col gap-2 p-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-16 animate-pulse rounded-lg bg-slate-200/70"
              />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="p-4 text-center text-sm text-red-600">{error}</div>
        )}

        {!loading && !error && users.length === 0 && (
          <div className="p-6 text-center text-sm text-slate-500">
            No chatbot users yet.
          </div>
        )}

        {!loading &&
          !error &&
          users
            .filter((u): u is ChatbotUserRow & { id: number } => typeof u.id === "number")
            .map((u) => {
            const id = u.id;
            const seed =
              typeof u.user_id === "string" && u.user_id.length > 0
                ? u.user_id
                : String(id);
            const title = nameMap.get(id) ?? displayUsernameFromSeed(seed);
            const selected = selectedId === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelect(u)}
                className={`flex w-full items-center gap-3 border-b border-slate-200/60 px-3 py-3 text-left transition-colors hover:bg-slate-100/90 ${
                  selected ? "bg-slate-200/70" : "bg-transparent"
                }`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${
                    selected ? "bg-emerald-600" : "bg-slate-500"
                  }`}
                  aria-hidden
                >
                  {title.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-900">{title}</p>
                  <p className="truncate text-xs text-slate-500" title={seed}>
                    {seed}
                  </p>
                </div>
              </button>
            );
            })}
      </div>
    </div>
  );
}
