export const PUBLISH_STATUSES = ["draft", "scheduled", "published"] as const;
export type PublishStatus = (typeof PUBLISH_STATUSES)[number];
export type PublishMode = PublishStatus;

export function getPublicBlogFilter(now = new Date()) {
  return {
    $or: [
      {
        blogStatus: true,
        $or: [
          { publishStatus: { $exists: false } },
          { publishStatus: null },
          { publishStatus: "published" },
        ],
      },
      {
        publishStatus: "scheduled",
        scheduledAt: { $lte: now },
      },
    ],
  };
}

export function resolveAdminPublishLabel(blog: {
  publishStatus?: string | null;
  scheduledAt?: string | Date | null;
  blogStatus?: boolean;
}): "draft" | "scheduled" | "published" | "inactive" {
  const status = (blog.publishStatus || "").toLowerCase();

  if (status === "draft") return "draft";
  if (status === "scheduled") return "scheduled";
  if (status === "published") {
    return blog.blogStatus === false ? "inactive" : "published";
  }

  return blog.blogStatus === false ? "inactive" : "published";
}

export function resolvePublishStatusLabel(blog: {
  publishStatus?: string | null;
  scheduledAt?: string | Date | null;
  blogStatus?: boolean;
}): "draft" | "scheduled" | "published" | "inactive" {
  const status = blog.publishStatus || "published";

  if (status === "draft") return "draft";

  if (status === "scheduled") {
    const scheduledAt = blog.scheduledAt ? new Date(blog.scheduledAt) : null;
    if (scheduledAt && scheduledAt.getTime() > Date.now()) {
      return "scheduled";
    }
    return blog.blogStatus === false ? "inactive" : "published";
  }

  return blog.blogStatus === false ? "inactive" : "published";
}

export function formatScheduledAt(value?: string | Date | null) {
  if (!value) return "";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isBlogPubliclyVisible(
  blog: {
    blogStatus?: boolean;
    publishStatus?: string | null;
    scheduledAt?: string | Date | null;
  },
  now = new Date()
) {
  const status = blog.publishStatus || "published";

  if (status === "draft") return false;

  if (status === "scheduled") {
    const scheduledAt = blog.scheduledAt ? new Date(blog.scheduledAt) : null;
    return Boolean(scheduledAt && scheduledAt.getTime() <= now.getTime());
  }

  return blog.blogStatus !== false;
}

export function getPublishSuccessMessage(mode: PublishMode, scheduledAt?: string) {
  if (mode === "draft") {
    return "Draft saved successfully. You can continue editing from Manage Blogs.";
  }
  if (mode === "scheduled" && scheduledAt) {
    return `Blog scheduled for ${formatScheduledAt(scheduledAt)}. It will publish automatically at that time.`;
  }
  return "Blog published successfully!";
}
