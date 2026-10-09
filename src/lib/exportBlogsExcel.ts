import axios from "axios";
import type { Cell, Worksheet } from "exceljs";

type ImageExtension = "jpeg" | "png" | "gif";

export interface MongoBlogExportSource {
  blogBanner: string;
  metaDescription?: string;
  metaTitle?: string;
  _id: string;
  blogCategoryId?: string;
  blogDescription: string;
  blogSlug: string;
  blogStatus: boolean;
  blogTitle: string;
  createdAt: string;
  updatedAt?: string;
  metaKeywords?: string;
  mtDesc?: string;
}

export interface MysqlBlogExportSource {
  blog_image: string;
  category_id: number;
  created_at: string;
  description: string;
  id: number;
  meta_description: string;
  meta_keywords: string;
  meta_title: string;
  slug: string;
  status: string;
  title: string;
  updated_at?: string;
}

export interface BlogExportRow {
  source: "MongoDB" | "MySQL";
  imagePath: string;
  title: string;
  slug: string;
  status: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  url: string;
}

export interface ExportProgress {
  phase: "preparing" | "images" | "writing" | "done";
  current: number;
  total: number;
  percent: number;
  label: string;
}

export type CategoryNameLookup = Record<string, string>;

const SITE_URL = "https://ritzmediaworld.com";
const HEADER_FILL = "FF365248";
const HEADER_FONT = "FFFFFFFF";
const ALT_ROW_FILL = "FFF5F7FA";
const IMAGE_COL_WIDTH = 22;
const IMAGE_ROW_HEIGHT = 78;
const THUMB_WIDTH = 140;
const THUMB_HEIGHT = 78;

const COLUMNS: { header: string; key: string; width: number }[] = [
  { header: "S.No.", key: "serial", width: 8 },
  { header: "Image", key: "image", width: IMAGE_COL_WIDTH },
  { header: "Source", key: "source", width: 12 },
  { header: "Title", key: "title", width: 36 },
  { header: "Slug", key: "slug", width: 28 },
  { header: "Status", key: "status", width: 12 },
  { header: "Category", key: "category", width: 22 },
  { header: "Meta Title", key: "metaTitle", width: 30 },
  { header: "Meta Description", key: "metaDescription", width: 40 },
  { header: "Meta Keywords", key: "metaKeywords", width: 32 },
  { header: "Description", key: "description", width: 48 },
  { header: "Created At", key: "createdAt", width: 20 },
  { header: "Updated At", key: "updatedAt", width: 20 },
  { header: "Blog URL", key: "url", width: 42 },
];

function formatDate(value: string | Date | undefined): string {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function detectImageExtension(
  url: string,
  contentType: string
): ImageExtension {
  const type = contentType.toLowerCase();
  if (type.includes("png") || url.toLowerCase().endsWith(".png")) return "png";
  if (type.includes("gif") || url.toLowerCase().endsWith(".gif")) return "gif";
  return "jpeg";
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Failed to read image blob"));
        return;
      }
      resolve(result.split(",")[1] || "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

async function convertBlobToPngBase64(blob: Blob): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error("Image conversion requires browser canvas");
  }

  const objectUrl = URL.createObjectURL(blob);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Failed to decode image"));
      img.src = objectUrl;
    });

    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth || THUMB_WIDTH;
    canvas.height = image.naturalHeight || THUMB_HEIGHT;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");

    ctx.drawImage(image, 0, 0);

    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => (result ? resolve(result) : reject(new Error("PNG conversion failed"))),
        "image/png"
      );
    });

    return blobToBase64(pngBlob);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function fetchImageForExcel(
  imagePath: string
): Promise<{ base64: string; extension: ImageExtension } | null> {
  if (!imagePath?.trim()) return null;

  try {
    const { data } = await axios.get<{
      success: boolean;
      base64?: string;
      contentType?: string;
      imageUrl?: string;
    }>("/api/blogs/backup-image", {
      params: { src: imagePath },
      timeout: 25000,
    });

    if (!data?.success || !data.base64) return null;

    const contentType = (data.contentType || "").toLowerCase();
    const imageUrl = data.imageUrl || imagePath;
    const isWebp =
      contentType.includes("webp") || imageUrl.toLowerCase().endsWith(".webp");

    if (isWebp) {
      const bytes = Uint8Array.from(atob(data.base64), (char) => char.charCodeAt(0));
      const blob = new Blob([bytes], { type: "image/webp" });
      const pngBase64 = await convertBlobToPngBase64(blob);
      return { base64: pngBase64, extension: "png" };
    }

    return {
      base64: data.base64,
      extension: detectImageExtension(imageUrl, contentType),
    };
  } catch {
    return null;
  }
}

function styleHeaderRow(worksheet: Worksheet) {
  const headerRow = worksheet.getRow(1);
  headerRow.height = 24;
  headerRow.eachCell((cell: Cell) => {
    cell.font = { bold: true, color: { argb: HEADER_FONT }, size: 11 };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: HEADER_FILL },
    };
    cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
    cell.border = {
      top: { style: "thin", color: { argb: "FFD0D5DD" } },
      left: { style: "thin", color: { argb: "FFD0D5DD" } },
      bottom: { style: "thin", color: { argb: "FFD0D5DD" } },
      right: { style: "thin", color: { argb: "FFD0D5DD" } },
    };
  });
}

function styleDataRow(worksheet: Worksheet, rowNumber: number, zebra: boolean) {
  const row = worksheet.getRow(rowNumber);
  row.eachCell((cell: Cell) => {
    cell.alignment = { vertical: "top", wrapText: true };
    cell.border = {
      top: { style: "thin", color: { argb: "FFE4E7EC" } },
      left: { style: "thin", color: { argb: "FFE4E7EC" } },
      bottom: { style: "thin", color: { argb: "FFE4E7EC" } },
      right: { style: "thin", color: { argb: "FFE4E7EC" } },
    };
    if (zebra) {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: ALT_ROW_FILL },
      };
    }
  });
}

function reportProgress(
  onProgress: ExportProgressCallback | undefined,
  progress: ExportProgress
) {
  onProgress?.(progress);
}

export function mapMongoBlogToExportRow(
  blog: MongoBlogExportSource,
  stripHTML: (html: string) => string,
  categoryNames: CategoryNameLookup
): BlogExportRow {
  const categoryId = blog.blogCategoryId || "";
  return {
    source: "MongoDB",
    imagePath: blog.blogBanner || "",
    title: blog.blogTitle || "",
    slug: blog.blogSlug || "",
    status: blog.blogStatus ? "active" : "inactive",
    category: categoryNames[categoryId] || categoryId || "Uncategorized",
    metaTitle: blog.metaTitle || "",
    metaDescription: blog.metaDescription || blog.mtDesc || "",
    metaKeywords: blog.metaKeywords || "",
    description: stripHTML(blog.blogDescription || ""),
    createdAt: formatDate(blog.createdAt),
    updatedAt: formatDate(blog.updatedAt),
    url: blog.blogSlug ? `${SITE_URL}/${blog.blogSlug}` : "",
  };
}

export function mapMysqlBlogToExportRow(
  blog: MysqlBlogExportSource,
  stripHTML: (html: string) => string,
  categoryNames: CategoryNameLookup
): BlogExportRow {
  const categoryId = String(blog.category_id ?? "");
  return {
    source: "MySQL",
    imagePath: blog.blog_image || "",
    title: blog.title || "",
    slug: blog.slug || "",
    status: blog.status || "",
    category: categoryNames[categoryId] || categoryId || "Uncategorized",
    metaTitle: blog.meta_title || "",
    metaDescription: blog.meta_description || "",
    metaKeywords: blog.meta_keywords || "",
    description: stripHTML(blog.description || ""),
    createdAt: formatDate(blog.created_at),
    updatedAt: formatDate(blog.updated_at),
    url: blog.slug ? `${SITE_URL}/${blog.slug}` : "",
  };
}

export type ExportProgressCallback = (progress: ExportProgress) => void;

export async function exportBlogsToExcel(
  rows: BlogExportRow[],
  fileName: string,
  onProgress?: ExportProgressCallback
): Promise<void> {
  const totalSteps = Math.max(rows.length + 1, 1);
  let completedSteps = 0;

  const tick = (phase: ExportProgress["phase"], label: string) => {
    completedSteps = Math.min(completedSteps + 1, totalSteps);
    const percent = Math.min(99, Math.round((completedSteps / totalSteps) * 100));
    reportProgress(onProgress, {
      phase,
      current: completedSteps,
      total: totalSteps,
      percent,
      label,
    });
  };

  reportProgress(onProgress, {
    phase: "preparing",
    current: 0,
    total: totalSteps,
    percent: 0,
    label: "Preparing workbook...",
  });

  const ExcelJS = (await import("exceljs")).default;
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Ritz Media World";
  workbook.created = new Date();

  const worksheet = workbook.addWorksheet("RMW Blogs", {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  worksheet.columns = COLUMNS.map(({ header, key, width }) => ({
    header,
    key,
    width,
  }));

  styleHeaderRow(worksheet);

  for (let index = 0; index < rows.length; index++) {
    const blog = rows[index];
    const rowNumber = index + 2;
    const zebra = index % 2 === 1;

    reportProgress(onProgress, {
      phase: "images",
      current: index + 1,
      total: rows.length,
      percent: Math.min(99, Math.round(((index + 1) / rows.length) * 95)),
      label: `Embedding images (${index + 1}/${rows.length})...`,
    });

    worksheet.addRow({
      serial: index + 1,
      image: "",
      source: blog.source,
      title: blog.title,
      slug: blog.slug,
      status: blog.status,
      category: blog.category,
      metaTitle: blog.metaTitle,
      metaDescription: blog.metaDescription,
      metaKeywords: blog.metaKeywords,
      description: blog.description,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      url: blog.url,
    });

    const row = worksheet.getRow(rowNumber);
    row.height = IMAGE_ROW_HEIGHT;
    row.getCell(1).alignment = { vertical: "middle", horizontal: "center" };
    row.getCell(14).value = {
      text: blog.url,
      hyperlink: blog.url,
    };
    row.getCell(14).font = { color: { argb: "FF1D4ED8" }, underline: true };

    styleDataRow(worksheet, rowNumber, zebra);

    if (blog.imagePath) {
      const imageData = await fetchImageForExcel(blog.imagePath);
      if (imageData) {
        const imageId = workbook.addImage({
          base64: imageData.base64,
          extension: imageData.extension,
        });

        worksheet.addImage(imageId, {
          tl: { col: 1.1, row: rowNumber - 1 + 0.15 },
          ext: { width: THUMB_WIDTH, height: THUMB_HEIGHT },
          editAs: "oneCell",
        });
      } else {
        row.getCell(2).value = "Image unavailable";
        row.getCell(2).alignment = { vertical: "middle", horizontal: "center" };
      }
    } else {
      row.getCell(2).value = "No image";
      row.getCell(2).alignment = { vertical: "middle", horizontal: "center" };
    }

    tick("images", `Processed ${index + 1} of ${rows.length} blogs`);
  }

  reportProgress(onProgress, {
    phase: "writing",
    current: rows.length,
    total: rows.length,
    percent: 98,
    label: "Writing Excel file...",
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);

  reportProgress(onProgress, {
    phase: "done",
    current: rows.length,
    total: rows.length,
    percent: 100,
    label: "Backup complete",
  });
}

export async function buildMysqlCategoryLookup(): Promise<CategoryNameLookup> {
  try {
    const { data } = await axios.get<Array<{ id: number; name: string }>>(
      "/api/blog/categories"
    );
    const lookup: CategoryNameLookup = {};
    for (const category of data || []) {
      lookup[String(category.id)] = category.name;
    }
    return lookup;
  } catch {
    return {};
  }
}

export async function buildMongoCategoryLookup(): Promise<CategoryNameLookup> {
  try {
    const { data } = await axios.get<{
      success: boolean;
      allCategories: Array<{ _id: string; categoryName: string }>;
    }>("/api/ritzCats/getAllCats");

    const lookup: CategoryNameLookup = {};
    for (const category of data?.allCategories || []) {
      lookup[String(category._id)] = category.categoryName;
    }
    return lookup;
  } catch {
    return {};
  }
}
