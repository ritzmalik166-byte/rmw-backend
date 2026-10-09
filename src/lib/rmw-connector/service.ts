import path from "path";
import mongoose from "mongoose";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import ManagementModel from "@/models/Management";
import RitzCats from "@/models/RitzCats.Schema";
import RitzBlogModel from "@/models/Blog.Schema";
import { SITE_URL } from "@/lib/sitemap/constants";
import { isBlogPubliclyVisible, resolveAdminPublishLabel } from "@/lib/blogPublish";
import { resolveBlogBannerUrl } from "@/lib/blogUrl";
import { safeUploadFilename, saveBufferToUploads } from "@/lib/blogBannerStorage";
import {
  BLOG_WRITER_ROLES,
  duplicateKeyConflictMessage,
  importBlogFromGoogleDoc,
  type GoogleDocBlogImportErrorCode,
} from "@/lib/google/googleDocBlogImport";

export const CLAUDE_DRAFT_ACTIVITY_ACTION = "blog.create.draft.via_claude";

export const BANNER_MAX_BYTES = 600 * 1024;

export type ConnectorErrorCode =
  | "AGENT_NOT_FOUND"
  | "AGENT_INACTIVE"
  | "AGENT_UNAUTHORIZED"
  | "INVALID_BANNER"
  | "BANNER_TYPE"
  | "BANNER_TOO_LARGE"
  | "DUPLICATE_BLOG"
  | "CREATE_FAILED"
  | GoogleDocBlogImportErrorCode;

/** Error whose message is safe to show to the MCP client. */
export class ConnectorError extends Error {
  constructor(
    public readonly code: ConnectorErrorCode,
    message: string
  ) {
    super(message);
    this.name = "ConnectorError";
  }
}

type AgentAccount = {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  role: string;
};

/**
 * Load the Management account Claude acts as (RMW_AGENT_ADMIN_ID).
 * Re-checked on every write so deactivating the account cuts access immediately.
 */
export async function getRmwAgentAccount(): Promise<AgentAccount> {
  const agentId = process.env.RMW_AGENT_ADMIN_ID?.trim();
  if (!agentId || !mongoose.Types.ObjectId.isValid(agentId)) {
    console.error("[rmw-connector] RMW_AGENT_ADMIN_ID is missing or not a valid ObjectId");
    throw new ConnectorError("AGENT_NOT_FOUND", "Agent account not found");
  }

  await connectMongoDB();
  const account = await ManagementModel.findById(agentId)
    .select("name email role isActive")
    .lean<{ _id: mongoose.Types.ObjectId; name?: string; email?: string; role?: string; isActive?: boolean }>();

  if (!account) {
    throw new ConnectorError("AGENT_NOT_FOUND", "Agent account not found");
  }
  if (!account.isActive) {
    throw new ConnectorError("AGENT_INACTIVE", "Agent account is inactive");
  }
  if (!(BLOG_WRITER_ROLES as readonly string[]).includes(String(account.role))) {
    throw new ConnectorError("AGENT_UNAUTHORIZED", "Agent account is not authorized");
  }

  const name = String(account.name || "").trim();
  if (!name) {
    throw new ConnectorError("AGENT_UNAUTHORIZED", "Agent account profile is incomplete");
  }

  return {
    _id: account._id,
    name,
    email: String(account.email || ""),
    role: String(account.role),
  };
}

export async function getBlogCategories() {
  await connectMongoDB();
  const categories = await RitzCats.find({})
    .select("categoryName categorySlug")
    .sort({ categoryName: 1 })
    .lean();

  return categories.map((cat) => ({
    id: String(cat._id),
    name: cat.categoryName,
    slug: cat.categorySlug,
  }));
}

export type ListBlogsOptions = {
  page?: number;
  limit?: number;
  status?: "draft" | "scheduled" | "published";
  search?: string;
};

const LIST_BLOGS_DEFAULT_LIMIT = 20;
const LIST_BLOGS_MAX_LIMIT = 50;

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function getBlogs(options: ListBlogsOptions = {}) {
  const limit = Math.min(
    Math.max(Math.trunc(options.limit ?? LIST_BLOGS_DEFAULT_LIMIT), 1),
    LIST_BLOGS_MAX_LIMIT
  );
  const page = Math.max(Math.trunc(options.page ?? 1), 1);

  const filter: Record<string, unknown> = {};
  if (options.status === "draft" || options.status === "scheduled") {
    filter.publishStatus = options.status;
  } else if (options.status === "published") {
    filter.publishStatus = { $in: ["published", null] };
  }

  const search = options.search?.trim();
  if (search) {
    const pattern = new RegExp(escapeRegex(search), "i");
    filter.$or = [{ blogTitle: pattern }, { blogSlug: pattern }];
  }

  await connectMongoDB();
  const [total, blogs] = await Promise.all([
    RitzBlogModel.countDocuments(filter),
    RitzBlogModel.find(filter)
      .select(
        "blogTitle blogSlug blogStatus publishStatus scheduledAt publishedAt blogAuthor blogCategoryId createdAt"
      )
      .populate({ path: "blogCategoryId", select: "categoryName", model: RitzCats })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
  ]);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    blogs: blogs.map((blog) => {
      const category = blog.blogCategoryId as unknown as { categoryName?: string } | null;
      return {
        id: String(blog._id),
        title: blog.blogTitle,
        slug: blog.blogSlug,
        url: isBlogPubliclyVisible(blog) ? `${SITE_URL}/${blog.blogSlug}` : null,
        status: resolveAdminPublishLabel(blog),
        author: blog.blogAuthor || null,
        category: category?.categoryName || null,
        publishedAt: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : null,
        scheduledAt: blog.scheduledAt ? new Date(blog.scheduledAt).toISOString() : null,
        createdAt: blog.createdAt ? new Date(blog.createdAt).toISOString() : null,
      };
    }),
  };
}

const BANNER_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

type BannerMimeType = keyof typeof BANNER_TYPES;

const BANNER_TYPE_MESSAGE = "Banner image must be JPG, PNG or WebP";
const BANNER_SIZE_MESSAGE = "Banner image must be less than 600 KB";

function detectImageType(buffer: Buffer): BannerMimeType | null {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    buffer.length >= 8 &&
    buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  ) {
    return "image/png";
  }
  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "image/webp";
  }
  return null;
}

function normalizeDeclaredMimeType(value?: string): BannerMimeType | null | undefined {
  if (!value) return undefined;
  const lower = value.trim().toLowerCase();
  if (lower === "image/jpg") return "image/jpeg";
  return lower in BANNER_TYPES ? (lower as BannerMimeType) : null;
}

function decodeBase64Image(data: string): Buffer {
  let payload = data.trim();
  const dataUrl = /^data:([^;,]+);base64,/i.exec(payload);
  if (dataUrl) payload = payload.slice(dataUrl[0].length);

  payload = payload.replace(/\s+/g, "").replace(/-/g, "+").replace(/_/g, "/");
  if (!payload || !/^[A-Za-z0-9+/]+={0,2}$/.test(payload) || payload.length % 4 === 1) {
    throw new ConnectorError("INVALID_BANNER", "Banner image data must be valid base64");
  }

  return Buffer.from(payload, "base64");
}

export type UploadBannerInput = {
  filename: string;
  dataBase64: string;
  mimeType?: string;
};

export async function uploadBlogBanner(input: UploadBannerInput) {
  await getRmwAgentAccount();

  const declared = normalizeDeclaredMimeType(input.mimeType);
  if (declared === null) {
    throw new ConnectorError("BANNER_TYPE", BANNER_TYPE_MESSAGE);
  }

  const buffer = decodeBase64Image(input.dataBase64);
  if (buffer.length === 0) {
    throw new ConnectorError("INVALID_BANNER", "Banner image file is empty");
  }
  if (buffer.length >= BANNER_MAX_BYTES) {
    throw new ConnectorError("BANNER_TOO_LARGE", BANNER_SIZE_MESSAGE);
  }

  const detected = detectImageType(buffer);
  if (!detected || (declared && declared !== detected)) {
    throw new ConnectorError("BANNER_TYPE", BANNER_TYPE_MESSAGE);
  }

  // Extension always follows the real file type, never the client-supplied name
  const baseName = path.basename(String(input.filename || "banner").replace(/\\/g, "/"));
  const stem = baseName.replace(/\.[^.]*$/, "") || "banner";
  const filename = safeUploadFilename(`${stem.slice(0, 100)}.${BANNER_TYPES[detected]}`);

  const bannerPath = saveBufferToUploads(buffer, filename);

  return {
    success: true,
    message: "Banner uploaded successfully. Pass bannerPath to create_blog_draft.",
    bannerPath,
    previewUrl: resolveBlogBannerUrl(bannerPath) || null,
    mimeType: detected,
    sizeBytes: buffer.length,
  };
}

export type CreateDraftInput = {
  blogTitle: string;
  blogSlug?: string;
  blogCategoryId: string;
  googleDocUrl?: string;
  googleDocId?: string;
  bannerPath?: string;
};

function importErrorMessage(code: GoogleDocBlogImportErrorCode, fallback: string): string {
  switch (code) {
    case "INVALID_TITLE":
      return "Invalid blog title";
    case "MISSING_GOOGLE_DOC":
    case "INVALID_GOOGLE_DOC":
      return "Invalid Google Doc URL. Provide a docs.google.com/document/d/<ID> link or a document ID.";
    case "INVALID_SLUG":
      return "Invalid slug. Use lowercase letters, numbers and hyphens only.";
    case "DUPLICATE_SLUG":
      return "Duplicate blog slug";
    case "CATEGORY_REQUIRED":
    case "INVALID_CATEGORY":
      return "Invalid category";
    case "GOOGLE_DOC_FORBIDDEN": {
      const serviceAccount = process.env.GOOGLE_CLIENT_EMAIL?.trim();
      return serviceAccount
        ? `Google Doc is not shared with the RMW importer account. Share it with ${serviceAccount} as Viewer and try again.`
        : "Google Doc is not shared with the RMW importer account";
    }
    case "GOOGLE_DOC_NOT_FOUND":
      return "Google Doc could not be accessed. Check that the document ID or URL is correct.";
    case "GOOGLE_DOC_UNAVAILABLE":
      return "Google Doc could not be accessed";
    default:
      return fallback;
  }
}

function missingForPublishWarnings(parsed: {
  metaTitle: string;
  metaDescription: string;
  mtDesc: string;
  hasContent: boolean;
}): string[] {
  const warnings: string[] = [];
  if (!parsed.metaTitle) warnings.push("META TITLE is missing in the Google Doc.");
  if (!parsed.metaDescription && !parsed.mtDesc) {
    warnings.push("META DESCRIPTION / MT DESC is missing in the Google Doc.");
  }
  if (!parsed.hasContent) warnings.push("BLOG CONTENT is empty in the Google Doc.");
  return warnings;
}

/**
 * Create a DRAFT blog from a Google Doc as the configured agent account.
 * Status and author are fixed server-side and cannot be influenced by the caller.
 */
export async function createDraftBlogFromGoogleDoc(input: CreateDraftInput) {
  const agent = await getRmwAgentAccount();

  let result;
  try {
    result = await importBlogFromGoogleDoc({
      actor: agent,
      blogAuthor: agent.name,
      blogTitle: String(input.blogTitle || "").trim(),
      blogSlugInput: input.blogSlug?.trim() || null,
      blogCategoryId: String(input.blogCategoryId || "").trim(),
      publishStatus: "draft",
      scheduledAtRaw: null,
      googleDocIdRaw: String(input.googleDocId || "").trim(),
      googleDocUrlRaw: String(input.googleDocUrl || "").trim(),
      banner: input.bannerPath ? { kind: "path", path: input.bannerPath } : null,
      buildActivityMessage: ({ actor, blogTitle }) =>
        `[${CLAUDE_DRAFT_ACTIVITY_ACTION}] User ${actor.name} (${actor.email}) saved a draft blog via Claude: ${blogTitle}`,
    });
  } catch (error) {
    const conflict = duplicateKeyConflictMessage(error);
    if (conflict) {
      throw new ConnectorError("DUPLICATE_BLOG", conflict);
    }
    console.error("[rmw-connector] create_blog_draft failed:", error);
    throw new ConnectorError("CREATE_FAILED", "Failed to create draft");
  }

  if (!result.ok) {
    throw new ConnectorError(result.code, importErrorMessage(result.code, result.message));
  }

  const blog = result.blog;
  const requestedSlug = input.blogSlug?.trim();
  const warnings = missingForPublishWarnings(result.parsed);
  if (requestedSlug && blog.blogSlug !== requestedSlug) {
    warnings.push(
      `Slug "${requestedSlug}" was normalized or already taken; the draft was saved as "${blog.blogSlug}".`
    );
  }
  if (!blog.blogBanner) {
    warnings.push("No banner image attached. A cover image is required before publishing.");
  }

  return {
    success: true,
    message: "Blog draft created successfully",
    blog: {
      id: String(blog._id),
      title: blog.blogTitle,
      slug: blog.blogSlug,
      status: blog.publishStatus,
      author: blog.blogAuthor,
      banner: blog.blogBanner || null,
    },
    warnings,
  };
}
