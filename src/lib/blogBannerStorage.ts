import fs from "fs";
import path from "path";

const PUBLIC_IMAGE_PREFIX = "/images/";

function getImageUploadDir(): string {
  const baseDir = process.env.SERVER_IMG_PATH;
  if (!baseDir) {
    throw new Error("SERVER_IMG_PATH is not configured");
  }
  return path.join(baseDir, "images");
}

/** Resolve `filename` inside the upload dir, rejecting anything that escapes it. */
function resolveInsideUploadDir(uploadDir: string, filename: string): string {
  const resolved = path.resolve(path.join(uploadDir, filename));
  if (!resolved.startsWith(path.resolve(uploadDir) + path.sep)) {
    throw new Error("Invalid upload path");
  }
  return resolved;
}

export function saveBufferToUploads(buffer: Buffer, filename: string): string {
  const uploadDir = getImageUploadDir();
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const resolved = resolveInsideUploadDir(uploadDir, filename);
  fs.writeFileSync(resolved, buffer);
  return `${PUBLIC_IMAGE_PREFIX}${filename}`;
}

export async function saveFileToUploads(file: File, filename: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  return saveBufferToUploads(Buffer.from(bytes), filename);
}

export function safeUploadFilename(originalName: string): string {
  const basename = path.basename(originalName || "banner");
  const cleaned = basename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
  return `${Date.now()}-${cleaned || "banner"}`;
}

/**
 * Validate a previously saved `/images/<filename>` path and confirm the file exists.
 * Returns the normalized public path, or null when invalid / missing.
 */
export function resolveUploadedImagePath(publicPath: string): string | null {
  const raw = String(publicPath || "").trim();
  if (!raw.startsWith(PUBLIC_IMAGE_PREFIX)) return null;

  const filename = raw.slice(PUBLIC_IMAGE_PREFIX.length);
  if (!/^[a-zA-Z0-9._-]{1,160}$/.test(filename) || /^\.+$/.test(filename)) {
    return null;
  }

  try {
    const resolved = resolveInsideUploadDir(getImageUploadDir(), filename);
    if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) return null;
  } catch {
    return null;
  }

  return `${PUBLIC_IMAGE_PREFIX}${filename}`;
}
