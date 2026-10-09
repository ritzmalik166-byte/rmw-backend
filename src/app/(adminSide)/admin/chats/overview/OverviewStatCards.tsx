import { MessageSquare, Users } from "lucide-react";

type Props = {
  totalChats: number;
  totalUsers: number;
};

export function OverviewStatCards({ totalChats, totalUsers }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/60 ring-1 ring-slate-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Chats</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">
              {totalChats.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Messages in bot history
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <MessageSquare className="h-6 w-6" aria-hidden />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/60 ring-1 ring-slate-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Users</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">
              {totalUsers.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Unique chatbot user sessions
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Users className="h-6 w-6" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
