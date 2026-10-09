import type { RecentChatItem } from "./chatsOverviewUtils";
import { formatChatDateTime } from "./chatsOverviewUtils";

type Props = {
  items: RecentChatItem[];
  empty: boolean;
};

export function RecentChatsPanel({ items, empty }: Props) {
  return (
    <div className="flex h-full min-h-[320px] flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/60 ring-1 ring-slate-100 sm:p-6">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">Recent chats</h2>
        <p className="text-sm text-slate-500">Latest 10 user messages</p>
      </div>

      {empty ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-16 text-center">
          <p className="text-sm font-medium text-slate-600">No chats yet</p>
          <p className="mt-1 max-w-xs text-xs text-slate-400">
            Recent messages will show here after visitors use the chatbot.
          </p>
        </div>
      ) : (
        <ul className="max-h-[420px] flex-1 space-y-3 overflow-y-auto pr-1">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-slate-100 bg-slate-50/60 p-3 transition-colors hover:bg-slate-50"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  {item.username}
                </span>
                <time
                  className="shrink-0 text-xs text-slate-400"
                  dateTime={item.time.toISOString()}
                >
                  {formatChatDateTime(item.time)}
                </time>
              </div>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-700">
                {item.user_message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
