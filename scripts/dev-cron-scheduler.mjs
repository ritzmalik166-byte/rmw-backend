/**
 * Local dev helper — polls the publish-scheduled-blogs cron route every minute.
 * Run alongside `npm run dev` in a second terminal:
 *   CRON_SECRET=your-secret npm run cron:scheduled-blogs
 */

const CRON_SECRET = process.env.CRON_SECRET || "dev-cron-secret";
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000";
const INTERVAL_MS = Number(process.env.CRON_INTERVAL_MS || 60_000);

async function tick() {
  const url = `${BASE_URL.replace(/\/$/, "")}/api/cron/publish-scheduled-blogs`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${CRON_SECRET}`,
      },
    });

    const data = await response.json();
    const stamp = new Date().toISOString();

    if (response.ok) {
      console.log(`[${stamp}]`, data.message, data.publishedCount > 0 ? data.published : "");
    } else {
      console.error(`[${stamp}] Cron failed (${response.status}):`, data);
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Cron request error:`, error);
  }
}

console.log(`Scheduled blog cron started — checking every ${INTERVAL_MS / 1000}s`);
console.log(`Target: ${BASE_URL}/api/cron/publish-scheduled-blogs`);

tick();
setInterval(tick, INTERVAL_MS);
