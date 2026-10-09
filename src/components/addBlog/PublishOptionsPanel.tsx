"use client";

import { CalendarClock, FilePenLine, Rocket } from "lucide-react";
import type { PublishMode } from "@/lib/blogPublish";

interface PublishOptionsPanelProps {
  mode: PublishMode;
  scheduledAt: string;
  onModeChange: (mode: PublishMode) => void;
  onScheduledAtChange: (value: string) => void;
  disabled?: boolean;
}

const OPTIONS: {
  id: PublishMode;
  title: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "published",
    title: "Publish Now",
    description: "Make the blog live immediately for all readers.",
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    id: "scheduled",
    title: "Schedule",
    description: "Pick a date and time to publish automatically.",
    icon: <CalendarClock className="h-5 w-5" />,
  },
  {
    id: "draft",
    title: "Save as Draft",
    description: "Save progress without publishing. Edit anytime.",
    icon: <FilePenLine className="h-5 w-5" />,
  },
];

export default function PublishOptionsPanel({
  mode,
  scheduledAt,
  onModeChange,
  onScheduledAtChange,
  disabled = false,
}: PublishOptionsPanelProps) {
  const minScheduleValue = new Date(Date.now() + 5 * 60 * 1000)
    .toISOString()
    .slice(0, 16);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-[#0B1623]">Choose how to publish</h3>
        <p className="text-sm text-slate-500">
          Publish instantly, schedule for later, or save as a draft to finish later.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {OPTIONS.map((option) => {
          const selected = mode === option.id;
          return (
            <button
              key={option.id}
              type="button"
              disabled={disabled}
              onClick={() => onModeChange(option.id)}
              className={`rounded-2xl border p-4 text-left transition ${
                selected
                  ? "border-[#2955B3] bg-blue-50 shadow-sm"
                  : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
              } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
            >
              <div
                className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${
                  selected ? "bg-[#2955B3] text-white" : "bg-white text-slate-500"
                }`}
              >
                {option.icon}
              </div>
              <p className="font-semibold text-slate-800">{option.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>

      {mode === "scheduled" && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <label className="mb-2 block text-sm font-semibold text-amber-900">
            Schedule date & time
          </label>
          <input
            type="datetime-local"
            value={scheduledAt}
            min={minScheduleValue}
            disabled={disabled}
            onChange={(e) => onScheduledAtChange(e.target.value)}
            className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
          <p className="mt-2 text-xs text-amber-700">
            The blog will automatically go live at the selected time.
          </p>
        </div>
      )}
    </div>
  );
}
