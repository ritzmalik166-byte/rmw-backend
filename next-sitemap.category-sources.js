const mysql = require("mysql2/promise");

async function fetchCategorySitemapEntries() {
  const host = process.env.DATABASE_HOST;
  const user = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;
  const database = process.env.DATABASE_NAME;
  const port = Number(process.env.DATABASE_PORT || 3306);

  if (!host || !user || !database) {
    console.warn("[next-sitemap] Skipping category URLs (database env incomplete).");
    return [];
  }

  let connection;
  try {
    connection = await mysql.createConnection({ host, user, password, database, port });
    const [rows] = await connection.execute(
      "SELECT link FROM categories WHERE link IS NOT NULL AND TRIM(link) <> '' ORDER BY id ASC"
    );

    const paths = rows
      .map((row) => {
        const slug = String(row.link || "").trim().replace(/^\/+|\/+$/g, "");
        return slug ? `/category/${slug}` : null;
      })
      .filter(Boolean);

    console.log(`[next-sitemap] Categories: ${paths.length} /category URLs`);
    return paths;
  } catch (error) {
    console.error("[next-sitemap] Category URL fetch failed", error);
    return [];
  } finally {
    if (connection) await connection.end();
  }
}

module.exports = {
  fetchCategorySitemapEntries,
};
