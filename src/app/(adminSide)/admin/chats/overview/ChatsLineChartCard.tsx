"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DayCount } from "./chatsOverviewUtils";

type Range = 7 | 30;

type Props = {
  data: DayCount[];
  range: Range;
  onRangeChange: (r: Range) => void;
  empty: boolean;
};

export function ChatsLineChartCard({
  data,
  range,
  onRangeChange,
  empty,
}: Props) {
  return (
    <div className="flex h-full min-h-[320px] flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/60 ring-1 ring-slate-100 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Chat activity
          </h2>
          <p className="text-sm text-slate-500">
            Messages per day · last {range} days
          </p>
        </div>
        <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50/80 p-0.5">
          {([7, 30] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onRangeChange(d)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                range === d
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Last {d} days
            </button>
          ))}
        </div>
      </div>

      {empty ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-16 text-center">
          <p className="text-sm font-medium text-slate-600">No activity yet</p>
          <p className="mt-1 max-w-xs text-xs text-slate-400">
            Chat volume will appear here once messages are recorded with
            timestamps.
          </p>
        </div>
      ) : (
        <div className="min-h-[260px] w-full flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-slate-200"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#64748b" }}
                tickLine={false}
                axisLine={{ stroke: "#e2e8f0" }}
                interval="preserveStartEnd"
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fill: "#64748b" }}
                tickLine={false}
                axisLine={false}
                width={36}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.08)",
                }}
                labelStyle={{ fontWeight: 600, color: "#0f172a" }}
                formatter={(value: number) => [
                  `${value} chat${value === 1 ? "" : "s"}`,
                  "Count",
                ]}
                labelFormatter={(_, payload) =>
                  payload?.[0]?.payload?.date
                    ? String(payload[0].payload.date)
                    : ""
                }
              />
              <Line
                type="monotone"
                dataKey="count"
                name="Chats"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ r: 3, fill: "#4f46e5", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
