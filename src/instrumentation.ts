export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { ensureScheduledBlogScheduler } = await import(
      "@/lib/scheduledBlogScheduler"
    );
    ensureScheduledBlogScheduler();
  }
}
