/** API row shapes (subset we export) */
export type ChattingHistoryExportRow = {
  id?: number | string;
  user_message?: string;
  bot_reply?: string;
  user_id?: number | string;
  chat_timing?: string | null;
};

export type ChatbotUserExportRow = {
  id?: number | string;
  user_id?: string | null;
  created_at?: string | null;
};

export type DownloadApiResponse = {
  chatting_history: ChattingHistoryExportRow[];
  chatbot_users?: ChatbotUserExportRow[];
};

const HISTORY_FIELDS = [
  "id",
  "user_message",
  "bot_reply",
  "user_id",
  "chat_timing",
] as const;

const USER_FIELDS = ["id", "user_id", "created_at"] as const;

export function pickHistoryRow(
  row: Record<string, unknown>,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of HISTORY_FIELDS) {
    const v = row[key];
    if (v == null || v === "") out[key] = "";
    else if (typeof v === "object" && v instanceof Date)
      out[key] = v.toISOString();
    else out[key] = String(v);
  }
  return out;
}

export function pickUserRow(
  row: Record<string, unknown>,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of USER_FIELDS) {
    const v = row[key];
    if (v == null || v === "") out[key] = "";
    else if (typeof v === "object" && v instanceof Date)
      out[key] = v.toISOString();
    else out[key] = String(v);
  }
  return out;
}

function escapeCsvCell(val: string): string {
  if (/[",\n\r]/.test(val)) return `"${val.replace(/"/g, '""')}"`;
  return val;
}

export function rowsToCsv(headers: string[], rows: Record<string, string>[]) {
  const headerLine = headers.map(escapeCsvCell).join(",");
  const lines = rows.map((r) =>
    headers.map((h) => escapeCsvCell(r[h] ?? "")).join(","),
  );
  return [headerLine, ...lines].join("\r\n");
}

export function downloadTextFile(
  filename: string,
  content: string,
  mime: string,
) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function sanitizeFilenameSegment(dateStr: string): string {
  return dateStr.replace(/[^\d-]/g, "").slice(0, 10);
}

export function buildExportBasename(startDate: string, endDate: string) {
  const s = sanitizeFilenameSegment(startDate);
  const e = sanitizeFilenameSegment(endDate);
  return `${s}_to_${e}`;
}
