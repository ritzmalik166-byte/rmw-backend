const mysql = require("mysql2/promise");
const mongoose = require("mongoose");
const {
  siteUrl,
  STATIC_PAGE_SLUGS,
  safeToPath,
  pickBlogSlug,
  pickBlogLastmod,
} = require("./next-sitemap.blog-sources");
const { resolveServiceSitemapPath } = require("./next-sitemap.shared");

/**
 * MySQL card.blog_image vs Mongo card.blogBanner — same rules as
 * src/allPages/Category/catergory.tsx (Image src).
 */
function buildMysqlBlogImageAbs(blog_image) {
  if (!blog_image || typeof blog_image !== "string") return null;
  const v = blog_image.trim();
  if (!v) return null;
  if (v.includes("/images")) {
    const tail = v.split("/images")[1] || "";
    if (!tail) return null;
    return `${siteUrl}/api/images${tail}`;
  }
  return `${siteUrl}/blogs/${v}`;
}

function buildMongoBlogBannerAbs(blogBanner) {
  if (!blogBanner || typeof blogBanner !== "string") return null;
  const tail = blogBanner.split("/images")[1] || "";
  if (!tail) return null;
  return `${siteUrl}/api/images${tail}`;
}

function serviceSecondStoredImageToAbs(stored) {
  if (!stored || typeof stored !== "string") return null;
  const t = stored.trim();
  if (!t) return null;
  if (/^https?:\/\//i.test(t)) return t;
  if (t.includes("/")) {
    const p = t.startsWith("/") ? t : `/${t}`;
    return `${siteUrl}${p}`;
  }
  return `${siteUrl}/service-second-images/${t}.jpg`;
}

function serviceThirdImageToAbs(image_url) {
  if (!image_url || typeof image_url !== "string") return null;
  const t = image_url.trim().replace(/^\/+/, "");
  if (!t) return null;
  if (/^https?:\/\//i.test(t)) return t;
  return `${siteUrl}/${t}`;
}

function isBlockedBlogPath(relPath) {
  const normalized = String(relPath).replace(/^\/+/, "");
  return STATIC_PAGE_SLUGS.has(normalized);
}

function mergeLastmod(existing, incoming) {
  if (!incoming) return existing;
  if (!existing) return incoming;
  return new Date(incoming) > new Date(existing) ? incoming : existing;
}

/**
 * @returns {Promise<Array<{ path: string, lastmod: string|null, images: Array<{ url: string, title?: string }> }>>}
 */
async function fetchImageSitemapEntries() {
  /** @type {Map<string, { path: string, lastmod: string|null, images: Map<string, string|undefined> }>} */
  const byPath = new Map();

  function touch(path, lastmod) {
    if (!byPath.has(path)) {
      byPath.set(path, { path, lastmod: null, images: new Map() });
    }
    const row = byPath.get(path);
    row.lastmod = mergeLastmod(row.lastmod, lastmod);
    return row;
  }

  function addImage(relPath, lastmod, imageAbsUrl, title) {
    const resolvedPath = resolveServiceSitemapPath(relPath);
    if (!resolvedPath) return;
    relPath = resolvedPath;
    if (!imageAbsUrl) return;
    try {
      new URL(imageAbsUrl);
    } catch {
      return;
    }
    if (isBlockedBlogPath(relPath)) return;
    const row = touch(relPath, lastmod);
    if (!row.images.has(imageAbsUrl)) {
      row.images.set(imageAbsUrl, title || undefined);
    }
  }

  const host = process.env.DATABASE_HOST;
  const user = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;
  const database = process.env.DATABASE_NAME;
  const port = Number(process.env.DATABASE_PORT || 3306);

  if (host && user && database) {
    let connection;
    try {
      connection = await mysql.createConnection({ host, user, password, database, port });

      const [blogRows] = await connection.execute(
        `SELECT slug, blog_image, title, created_at
         FROM blogs
         WHERE category_id != 1 AND status = 1
           AND blog_image IS NOT NULL AND TRIM(blog_image) <> ''`
      );

      for (const row of blogRows) {
        const rel = safeToPath(row.slug);
        if (!rel) continue;
        const imgUrl = buildMysqlBlogImageAbs(row.blog_image);
        const lastmod = pickBlogLastmod({
          created_at: row.created_at,
        });
        addImage(rel, lastmod, imgUrl, row.title || undefined);
      }

      const [caseStudyRows] = await connection.execute(
        `SELECT slug, blog_image, title, created_at
         FROM blogs
         WHERE category_id = 1
           AND blog_image IS NOT NULL AND TRIM(blog_image) <> ''`
      );

      for (const row of caseStudyRows) {
        const rel = safeToPath(row.slug);
        if (!rel) continue;
        const imgUrl = buildMysqlBlogImageAbs(row.blog_image);
        const lastmod = pickBlogLastmod({
          created_at: row.created_at,
        });
        addImage(rel, lastmod, imgUrl, row.title || undefined);
      }

      const [serviceSecond] = await connection.execute(
        `SELECT link, img1, img2 FROM services
         WHERE link IS NOT NULL AND TRIM(link) <> ''
           AND (
             (img1 IS NOT NULL AND TRIM(img1) <> '')
             OR (img2 IS NOT NULL AND TRIM(img2) <> '')
           )`
      );

      for (const row of serviceSecond) {
        const seg = typeof row.link === "string" ? row.link.trim().replace(/^\/+|\/+$/g, "") : "";
        if (!seg) continue;
        const rel = `/services/${seg}`;
        for (const raw of [row.img1, row.img2]) {
          const imgUrl = serviceSecondStoredImageToAbs(raw);
          addImage(rel, null, imgUrl, undefined);
        }
      }

      const [thirdRows] = await connection.execute(
        `SELECT s.link AS second_link, ss.link AS third_link, st.image_url, st.title
         FROM service_third st
         INNER JOIN service_second ss ON st.service2_id = ss.id
         INNER JOIN services s ON ss.service_id = s.id
         WHERE st.image_url IS NOT NULL AND TRIM(st.image_url) <> ''
           AND ss.link IS NOT NULL AND TRIM(ss.link) <> ''
           AND s.link IS NOT NULL AND TRIM(s.link) <> ''`
      );

      for (const row of thirdRows) {
        const s =
          typeof row.second_link === "string" ? row.second_link.trim().replace(/^\/+|\/+$/g, "") : "";
        const t = typeof row.third_link === "string" ? row.third_link.trim().replace(/^\/+|\/+$/g, "") : "";
        if (!s || !t) continue;
        const rel = `/services/${s}/${t}`;
        const imgUrl = serviceThirdImageToAbs(row.image_url);
        addImage(rel, null, imgUrl, row.title || undefined);
      }
    } catch (error) {
      console.error("[next-sitemap] Image sitemap MySQL failed", error);
    } finally {
      if (connection) await connection.end();
    }
  }

  const mongoUrl = process.env.MONGO_URL;
  if (mongoUrl) {
    let conn;
    try {
      conn = await mongoose.createConnection(mongoUrl).asPromise();
      const docs = await conn
        .collection("ritzblogmodels")
        .find(
          { blogStatus: true },
          { projection: { blogBanner: 1, blogSlug: 1, blogTitle: 1, createdAt: 1, updatedAt: 1 } }
        )
        .toArray();

      for (const doc of docs) {
        const rawSlug = pickBlogSlug(doc);
        const rel = safeToPath(rawSlug);
        if (!rel) continue;
        const imgUrl = buildMongoBlogBannerAbs(doc.blogBanner);
        const lastmod = pickBlogLastmod(doc);
        addImage(rel, lastmod, imgUrl, doc.blogTitle || undefined);
      }
    } catch (error) {
      console.error("[next-sitemap] Image sitemap Mongo failed", error);
    } finally {
      if (conn) await conn.close();
    }
  }

  const out = [];
  for (const { path, lastmod, images } of byPath.values()) {
    if (images.size === 0) continue;
    out.push({
      path,
      lastmod,
      images: Array.from(images.entries()).map(([url, title]) => ({ url, title })),
    });
  }

  console.log(`[next-sitemap] Image sitemap sources merged → ${out.length} page URLs with ≥1 image`);
  return out;
}

module.exports = {
  fetchImageSitemapEntries,
};
