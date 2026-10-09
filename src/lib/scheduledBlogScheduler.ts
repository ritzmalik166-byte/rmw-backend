import { publishScheduledBlogs } from "@/lib/publishScheduledBlogs";

const globalScheduler = globalThis as typeof globalThis & {
  __scheduledBlogCronTimer?: ReturnType<typeof setInterval>;
  __scheduledBlogCronStarted?: boolean;
};

const INTERVAL_MS = Number(process.env.SCHEDULED_BLOG_CRON_INTERVAL_MS || 30_000);

async function runScheduledBlogCheck() {
  try {
    const result = await publishScheduledBlogs();

    if (result.publishedCount > 0) {
      console.log(
        `[scheduled-blog-cron] Published ${result.publishedCount} blog(s):`,
        result.published.map((blog) => `"${blog.title}"`).join(", ")
      );
    }
  } catch (error) {
    console.error("[scheduled-blog-cron] Check failed:", error);
  }
}

/** Starts the in-process scheduler once (dev + production Node server). */
export function ensureScheduledBlogScheduler() {
  if (typeof window !== "undefined") return;
  if (globalScheduler.__scheduledBlogCronStarted) return;

  globalScheduler.__scheduledBlogCronStarted = true;

  void runScheduledBlogCheck();

  globalScheduler.__scheduledBlogCronTimer = setInterval(
    runScheduledBlogCheck,
    INTERVAL_MS
  );

  console.log(
    `[scheduled-blog-cron] Active — checking every ${INTERVAL_MS / 1000}s for due scheduled blogs`
  );
}

export function stopScheduledBlogScheduler() {
  if (globalScheduler.__scheduledBlogCronTimer) {
    clearInterval(globalScheduler.__scheduledBlogCronTimer);
    globalScheduler.__scheduledBlogCronTimer = undefined;
  }
  globalScheduler.__scheduledBlogCronStarted = false;
}

/** Run one publish check immediately (e.g. right after a blog is scheduled). */
export async function triggerScheduledBlogCheck() {
  return runScheduledBlogCheck();
}
