/** Extract a Google Docs document ID from a bare ID or a docs.google.com URL. */
export function extractGoogleDocId(input: string): string | null {
  const raw = String(input || "").trim();
  if (!raw) return null;

  // Bare document ID (alphanumeric, hyphens, underscores)
  if (/^[a-zA-Z0-9_-]{10,}$/.test(raw) && !raw.includes("/") && !raw.includes(".")) {
    return raw;
  }

  try {
    const url = new URL(raw);
    const host = url.hostname.toLowerCase();
    if (host !== "docs.google.com" && host !== "www.docs.google.com") {
      return null;
    }

    const match = url.pathname.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
    return match?.[1] ?? null;
  } catch {
    // Path-like without protocol
    const match = raw.match(/docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]+)/i);
    return match?.[1] ?? null;
  }
}

/** Decide whether an input should be sent as googleDocUrl or googleDocId. */
export function resolveGoogleDocFormField(
  input: string
): { googleDocUrl: string } | { googleDocId: string } | null {
  const raw = String(input || "").trim();
  if (!raw) return null;

  if (/docs\.google\.com\/document\/d\//i.test(raw) || /^https?:\/\//i.test(raw)) {
    const id = extractGoogleDocId(raw);
    if (!id) return null;
    return { googleDocUrl: raw };
  }

  const id = extractGoogleDocId(raw);
  if (!id) return null;
  return { googleDocId: id };
}
