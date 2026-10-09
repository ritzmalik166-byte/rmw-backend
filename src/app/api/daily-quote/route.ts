import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type DailyQuote = {
  quote: string;
  author: string;
  date: string;
  source: "zenquotes" | "fallback";
};

const ZENQUOTES_TODAY_URL = "https://zenquotes.io/api/today";
const FALLBACK_RETRY_MS = 15 * 60 * 1000;

const FALLBACK_QUOTES: { quote: string; author: string }[] = [
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { quote: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { quote: "Do the hard jobs first. The easy jobs will take care of themselves.", author: "Dale Carnegie" },
  { quote: "Small daily improvements are the key to staggering long-term results.", author: "Robin Sharma" },
  { quote: "Content builds relationships. Relationships are built on trust. Trust drives revenue.", author: "Andrew Davis" },
  { quote: "Done is better than perfect.", author: "Sheryl Sandberg" },
  { quote: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { quote: "Creativity is intelligence having fun.", author: "Albert Einstein" },
  { quote: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { quote: "Great things are done by a series of small things brought together.", author: "Vincent van Gogh" },
  { quote: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { quote: "Make each day your masterpiece.", author: "John Wooden" },
  { quote: "Well begun is half done.", author: "Aristotle" },
  { quote: "Action is the foundational key to all success.", author: "Pablo Picasso" },
];

let cached: (DailyQuote & { retryAt?: number }) | null = null;

function todayKey(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
}

function fallbackQuote(date: string): DailyQuote {
  const dayNumber = Math.floor(Date.parse(`${date}T00:00:00Z`) / 86_400_000);
  const pick = FALLBACK_QUOTES[dayNumber % FALLBACK_QUOTES.length]!;
  return { ...pick, date, source: "fallback" };
}

async function fetchZenQuote(date: string): Promise<DailyQuote | null> {
  try {
    const res = await fetch(ZENQUOTES_TODAY_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as unknown;
    const item = Array.isArray(data) ? (data[0] as { q?: unknown; a?: unknown }) : null;
    const quote = typeof item?.q === "string" ? item.q.trim() : "";
    const author = typeof item?.a === "string" ? item.a.trim() : "";
    // ZenQuotes returns its rate-limit notice as a regular quote.
    if (!quote || !author || /too many requests/i.test(quote)) return null;
    return { quote, author, date, source: "zenquotes" };
  } catch {
    return null;
  }
}

export async function GET() {
  const date = todayKey();
  const needsRefresh =
    !cached ||
    cached.date !== date ||
    (cached.source === "fallback" && (cached.retryAt ?? 0) <= Date.now());

  if (needsRefresh) {
    const fresh = await fetchZenQuote(date);
    cached = fresh ?? { ...fallbackQuote(date), retryAt: Date.now() + FALLBACK_RETRY_MS };
  }

  const { quote, author, source } = cached!;
  return NextResponse.json(
    { quote, author, date, source },
    { headers: { "Cache-Control": "private, max-age=600" } }
  );
}
