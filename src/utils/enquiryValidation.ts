const REASON_OPTIONS = [
  "General Inquiry",
  "New Project",
  "RFP Submission",
  "Partnership",
] as const;

const HOW_HEARD_OPTIONS = [
  "Search Engine",
  "Social Media",
  "Referral",
  "Advertisement",
  "Other",
] as const;

export type EnquiryValidationResult =
  | { ok: true }
  | { ok: false; error: string };

const VULGAR_PATTERNS: RegExp[] = [
  /\bf+u+c+k+\w*\b/i,
  /\bs+h+i+t+\w*\b/i,
  /\ba+s+s+h+o+l+e+\w*\b/i,
  /\bb+i+t+c+h+\w*\b/i,
  /\bd+i+c+k+\w*\b/i,
  /\bc+u+n+t+\w*\b/i,
  /\bp+i+s+s+\w*\b/i,
  /\bb+a+s+t+a+r+d+\w*\b/i,
  /\bw+h+o+r+e+\w*\b/i,
  /\bs+l+u+t+\w*\b/i,
  /\bn+i+g+g+[ae]r?\w*\b/i,
  /\bf+a+g+g?o+t+\w*\b/i,
  /\bd+a+m+n+\w*\b/i,
  /\bc+r+a+p+\w*\b/i,
  /\bsuck(?:s|ing)?\b/i,
  /\bidiot\w*\b/i,
  /\bstupid\b/i,
  /\bdumbass\b/i,
  /\bmotherf+u+c+k+\w*\b/i,
  /\bwtf\b/i,
  /\bstfu\b/i,
];

function extractLabeledValue(message: string, label: string): string | null {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Capture only the value on the same line as the label.
  // This avoids accidentally grabbing following fields when the payload
  // contains newlines (or escaped newline tokens like "\\n").
  const regex = new RegExp(
    `${escaped}\\s*:\\s*([^\\r\\n]+?)(?:\\r?\\n|\\\\[nr]|$)`,
    "i",
  );
  const match = message.match(regex);
  return match?.[1]?.trim() || null;
}

function extractBodyMessage(message: string): string {
  const match = message.match(/Message\s*:\s*([\s\S]*)$/i);
  return (match?.[1] || message).trim();
}

function containsVulgarLanguage(...texts: Array<string | null | undefined>): boolean {
  return texts.some((text) => {
    if (!text) return false;
    return VULGAR_PATTERNS.some((pattern) => pattern.test(text));
  });
}

function isAllowedValue(
  value: string,
  allowed: readonly string[]
): boolean {
  // Normalize:
  // - trim
  // - collapse repeated whitespace
  // - handle literal "\n" / "\r" sequences (seen in some payloads)
  // - case-insensitive
  const normalize = (s: string) =>
    s
      .replace(/\\[nr]/g, " ")
      .replace(/\u00A0/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  const normalized = normalize(value);
  return allowed.some((option) => normalize(option) === normalized);
}

/** Returns true when name/email/message (or structured fields) contain vulgar language. */
export function isVulgarEnquiry(
  message: string,
  extras?: { name?: string | null; email?: string | null }
): boolean {
  const trimmed = (message || "").trim();
  const reason = extractLabeledValue(trimmed, "Reason for Inquiry");
  const howHeard = extractLabeledValue(trimmed, "How did you hear about us");
  const body = extractBodyMessage(trimmed);

  return containsVulgarLanguage(
    trimmed,
    body,
    reason,
    howHeard,
    extras?.name,
    extras?.email
  );
}

/** Validates structured contact enquiry fields (reason / how-heard when present). */
export function validateEnquiryMessage(
  message: string
): EnquiryValidationResult {
  const trimmed = (message || "").trim();
  if (!trimmed) {
    return { ok: false, error: "Message is required." };
  }

  const hasReasonLabel = /Reason\s+for\s+Inquiry\s*:/i.test(trimmed);
  const hasHeardLabel = /How\s+did\s+you\s+hear\s+about\s+us\s*:/i.test(trimmed);

  const reason = extractLabeledValue(trimmed, "Reason for Inquiry");
  const howHeard = extractLabeledValue(trimmed, "How did you hear about us");
  const body = extractBodyMessage(trimmed);

  if (hasReasonLabel || hasHeardLabel) {
    if (!reason) {
      return { ok: false, error: "Reason for Inquiry is required." };
    }
    if (!isAllowedValue(reason, REASON_OPTIONS)) {
      return {
        ok: false,
        error:
          "Invalid Reason for Inquiry. Allowed: General Inquiry, New Project, RFP Submission, Partnership.",
      };
    }

    if (!howHeard) {
      return { ok: false, error: "How did you hear about us is required." };
    }
    if (!isAllowedValue(howHeard, HOW_HEARD_OPTIONS)) {
      return {
        ok: false,
        error:
          "Invalid How did you hear about us. Allowed: Search Engine, Social Media, Referral, Advertisement, Other.",
      };
    }

    if (!body) {
      return { ok: false, error: "Message body is required." };
    }
  }

  return { ok: true };
}

export { REASON_OPTIONS, HOW_HEARD_OPTIONS };