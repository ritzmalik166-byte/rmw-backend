import mongoose from "mongoose";
import RitzCats from "@/models/RitzCats.Schema";
import RitzBlogModel from "@/models/Blog.Schema";
import ManagementActivitiesModel from "@/models/ManagementActivities";
import { revalidateBlogListingPages } from "@/lib/revalidateBlogs";
import {
  generateSlugFromTitle,
  isValidSlugInput,
  normalizeSlug,
} from "@/lib/slugify";
import { extractGoogleDocId, fetchGoogleDoc } from "@/lib/google/docs";
import { parseGoogleDoc } from "@/lib/google/googleDocParser";
import {
  resolveUploadedImagePath,
  safeUploadFilename,
  saveFileToUploads,
} from "@/lib/blogBannerStorage";

/** Management roles allowed to create blogs (same rule as the admin blog APIs). */
export const BLOG_WRITER_ROLES = ["super_admin", "editor"] as const;

export type BlogImportActor = {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  email: string;
};

export type BlogBannerInput =
  | { kind: "file"; file: File }
  | { kind: "path"; path: string };

export type GoogleDocBlogImportInput = {
  actor: BlogImportActor;
  blogAuthor: string;
  blogTitle: string;
  blogSlugInput: string | null;
  blogCategoryId: string;
  publishStatus: string;
  scheduledAtRaw: string | null;
  googleDocIdRaw: string;
  googleDocUrlRaw: string;
  banner: BlogBannerInput | null;
  /** Override the activity log text (defaults to the admin panel wording). */
  buildActivityMessage?: (details: {
    actor: BlogImportActor;
    blogTitle: string;
    activityLabel: string;
  }) => string;
};

export type GoogleDocBlogImportErrorCode =
  | "INVALID_TITLE"
  | "INVALID_STATUS"
  | "INVALID_SCHEDULE"
  | "MISSING_GOOGLE_DOC"
  | "INVALID_GOOGLE_DOC"
  | "INVALID_SLUG"
  | "DUPLICATE_SLUG"
  | "CATEGORY_REQUIRED"
  | "INVALID_CATEGORY"
  | "INVALID_BANNER"
  | "BANNER_REQUIRED"
  | "GOOGLE_DOC_FORBIDDEN"
  | "GOOGLE_DOC_NOT_FOUND"
  | "GOOGLE_DOC_UNAVAILABLE"
  | "MISSING_META_TITLE"
  | "MISSING_META_DESCRIPTION"
  | "MISSING_CONTENT";

export type GoogleDocBlogImportFailure = {
  ok: false;
  status: number;
  code: GoogleDocBlogImportErrorCode;
  message: string;
};

export type GoogleDocBlogImportSuccess = {
  ok: true;
  status: 201;
  message: string;
  blog: InstanceType<typeof RitzBlogModel>;
  scheduledAt?: string;
  parsed: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    mtDesc: string;
    hasContent: boolean;
  };
};

export type GoogleDocBlogImportResult =
  | GoogleDocBlogImportSuccess
  | GoogleDocBlogImportFailure;

function fail(
  status: number,
  code: GoogleDocBlogImportErrorCode,
  message: string
): GoogleDocBlogImportFailure {
  return { ok: false, status, code, message };
}

export async function resolveUniqueSlug(baseSlug: string, publishStatus: string) {
  let blogSlug = baseSlug;
  let existingSlug = await RitzBlogModel.findOne({ blogSlug });

  if (existingSlug && publishStatus === "draft") {
    blogSlug = `${baseSlug}-draft-${Date.now()}`;
    existingSlug = await RitzBlogModel.findOne({ blogSlug });
  }

  return { blogSlug, existingSlug };
}

function classifyGoogleDocError(error: unknown): GoogleDocBlogImportErrorCode {
  const err = error as {
    status?: number;
    code?: number | string;
    response?: { status?: number };
  };
  const status = Number(err?.response?.status ?? err?.status ?? err?.code);
  if (status === 403 || status === 401) return "GOOGLE_DOC_FORBIDDEN";
  if (status === 404 || status === 400) return "GOOGLE_DOC_NOT_FOUND";
  return "GOOGLE_DOC_UNAVAILABLE";
}

/** Friendly 409 message for MongoDB duplicate-key errors, or null for other errors. */
export function duplicateKeyConflictMessage(error: unknown): string | null {
  const err = error as { code?: number; keyPattern?: Record<string, unknown> };
  if (err?.code !== 11000) return null;

  const field = Object.keys(err.keyPattern || {})[0] || "field";
  const friendlyField =
    field === "blogTitle" ? "title" : field === "blogSlug" ? "URL slug" : field;
  return `A blog with this ${friendlyField} already exists. Please use a different ${friendlyField} or edit the existing blog.`;
}

/**
 * Google Doc → RitzBlogModel import used by the admin "Import from Docs" API
 * and the Claude MCP connector. Callers are responsible for authenticating
 * `actor` and connecting to MongoDB. Unexpected errors (including duplicate
 * keys on create) are thrown.
 */
export async function importBlogFromGoogleDoc(
  input: GoogleDocBlogImportInput
): Promise<GoogleDocBlogImportResult> {
  const {
    actor,
    blogAuthor,
    blogTitle,
    blogSlugInput,
    blogCategoryId,
    publishStatus,
    scheduledAtRaw,
    googleDocIdRaw,
    googleDocUrlRaw,
    banner,
  } = input;

  if (!blogTitle) {
    return fail(400, "INVALID_TITLE", "Blog title is required");
  }

  if (!["draft", "scheduled", "published"].includes(publishStatus)) {
    return fail(400, "INVALID_STATUS", "Invalid publish status");
  }

  let scheduledAt: Date | null = null;
  if (publishStatus === "scheduled") {
    if (!scheduledAtRaw) {
      return fail(400, "INVALID_SCHEDULE", "Schedule date and time are required");
    }
    scheduledAt = new Date(String(scheduledAtRaw));
    if (Number.isNaN(scheduledAt.getTime()) || scheduledAt <= new Date()) {
      return fail(400, "INVALID_SCHEDULE", "Scheduled time must be in the future");
    }
  }

  const docIdSource = googleDocIdRaw || googleDocUrlRaw;
  if (!docIdSource) {
    return fail(400, "MISSING_GOOGLE_DOC", "googleDocId or googleDocUrl is required");
  }

  const documentId = extractGoogleDocId(docIdSource);
  if (!documentId) {
    return fail(400, "INVALID_GOOGLE_DOC", "Invalid Google Doc ID or URL");
  }

  const baseSlug = blogSlugInput
    ? normalizeSlug(String(blogSlugInput))
    : generateSlugFromTitle(blogTitle);

  if (!baseSlug || !isValidSlugInput(baseSlug)) {
    return fail(
      400,
      "INVALID_SLUG",
      "A valid slug URL is required (letters, numbers, and hyphens only)"
    );
  }

  const { blogSlug, existingSlug } = await resolveUniqueSlug(baseSlug, publishStatus);
  if (existingSlug) {
    return fail(
      409,
      "DUPLICATE_SLUG",
      "This slug URL is already in use. Please choose a different one."
    );
  }

  const requiresCategory =
    publishStatus === "published" || publishStatus === "scheduled";

  if (requiresCategory && !blogCategoryId) {
    return fail(400, "CATEGORY_REQUIRED", "Please select a category");
  }

  let fetchCat = null;
  if (blogCategoryId) {
    if (!mongoose.Types.ObjectId.isValid(blogCategoryId)) {
      return fail(404, "INVALID_CATEGORY", "Category not found");
    }
    fetchCat = await RitzCats.findById(blogCategoryId);
    if (!fetchCat) {
      return fail(404, "INVALID_CATEGORY", "Category not found");
    }
  }

  if (requiresCategory && !fetchCat) {
    return fail(404, "INVALID_CATEGORY", "Category not found");
  }

  // Draft without category: pick oldest category (same spirit as existing create API)
  if (!fetchCat && publishStatus === "draft") {
    fetchCat = await RitzCats.findOne().sort({ createdAt: 1 });
    if (!fetchCat) {
      return fail(404, "INVALID_CATEGORY", "Category not found");
    }
  }

  let blogBannerPath = "";
  if (banner?.kind === "file") {
    const filename = safeUploadFilename(banner.file.name);
    blogBannerPath = await saveFileToUploads(banner.file, filename);
  } else if (banner?.kind === "path") {
    const resolved = resolveUploadedImagePath(banner.path);
    if (!resolved) {
      return fail(
        400,
        "INVALID_BANNER",
        "Banner image not found. Upload it first and pass the returned path."
      );
    }
    blogBannerPath = resolved;
  }

  if (
    (publishStatus === "published" || publishStatus === "scheduled") &&
    !blogBannerPath
  ) {
    return fail(400, "BANNER_REQUIRED", "Cover image is required to publish");
  }

  let googleDoc;
  try {
    googleDoc = await fetchGoogleDoc(documentId);
  } catch (err) {
    console.error("[import-google-doc] Failed to fetch Google Doc:", err);
    return fail(
      400,
      classifyGoogleDocError(err),
      "Unable to fetch the Google Doc. Check the document ID and that it is shared with the service account."
    );
  }

  const parsed = parseGoogleDoc(googleDoc);
  const metaTitle = parsed.metaTitle;
  const metaDescription = parsed.metaDescription;
  const metaKeywords = parsed.metaKeywords;
  const mtDesc = parsed.mtDesc || metaDescription;
  const blogContentHtml = parsed.blogContent;

  if (publishStatus === "published" || publishStatus === "scheduled") {
    if (!metaTitle) {
      return fail(400, "MISSING_META_TITLE", "META TITLE is required in the Google Doc");
    }
    if (!metaDescription && !parsed.mtDesc) {
      return fail(
        400,
        "MISSING_META_DESCRIPTION",
        "META DESCRIPTION or MT DESC is required in the Google Doc"
      );
    }
    if (!blogContentHtml) {
      return fail(400, "MISSING_CONTENT", "BLOG CONTENT is required in the Google Doc");
    }
  }

  // Compatible with existing renderer: rich HTML lives in blogBody[].metaDescription
  // (see Section2 getRichDescription). Google META TITLE maps to blogBody[].metaTitle.
  // When it matches / is contained in blogTitle, the public renderer hides the extra H2.
  const blogBody = [
    {
      metaTitle: metaTitle || blogTitle,
      metaDescription: blogContentHtml || "",
      innerImg: "",
    },
  ];

  const blogDescription = blogContentHtml || "";

  const isLive = publishStatus === "published";
  const publishedAt =
    publishStatus === "published"
      ? new Date()
      : publishStatus === "scheduled"
        ? null
        : null;

  const newBlog = await RitzBlogModel.create({
    blogTitle,
    blogBanner: blogBannerPath,
    blogBody,
    metaKeywords: metaKeywords || undefined,
    blogCategoryId: fetchCat!._id,
    blogStatus: isLive,
    publishStatus,
    scheduledAt: publishStatus === "scheduled" ? scheduledAt : undefined,
    publishedAt,
    blogSlug,
    blogDescription,
    mtDesc: mtDesc || undefined,
    blogAuthor,
  });

  const activityLabel =
    publishStatus === "draft"
      ? "saved a draft blog"
      : publishStatus === "scheduled"
        ? "scheduled a blog"
        : "added a new blog";

  const activity = input.buildActivityMessage
    ? input.buildActivityMessage({ actor, blogTitle, activityLabel })
    : `User ${actor.name} (${actor.email}) ${activityLabel}: ${blogTitle}`;

  const newManagementActivity = new ManagementActivitiesModel({
    managementId: actor._id,
    activity,
    activityTime: new Date(),
  });
  await newManagementActivity.save();

  if (publishStatus === "scheduled") {
    const { ensureScheduledBlogScheduler } = await import(
      "@/lib/scheduledBlogScheduler"
    );
    ensureScheduledBlogScheduler();
  }

  if (isLive) {
    await revalidateBlogListingPages();
  }

  return {
    ok: true,
    status: 201,
    message:
      publishStatus === "draft"
        ? "Draft saved successfully"
        : publishStatus === "scheduled"
          ? "Blog scheduled successfully. It will publish automatically at the chosen time."
          : "Blog published successfully",
    blog: newBlog,
    scheduledAt:
      publishStatus === "scheduled" && scheduledAt
        ? scheduledAt.toISOString()
        : undefined,
    parsed: {
      metaTitle,
      metaDescription,
      metaKeywords,
      mtDesc: parsed.mtDesc,
      hasContent: Boolean(blogContentHtml),
    },
  };
}
