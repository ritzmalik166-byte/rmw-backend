import type { ReactNode } from "react";

export default function ChatsHistoryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="shrink-0 border-b border-slate-200/80 pb-4">
        <h1 className="text-2xl font-semibold text-slate-900">Chats — History</h1>
      
      </header>
      <div className="mt-4 min-h-0 flex-1">{children}</div>
    </div>
  );
}
