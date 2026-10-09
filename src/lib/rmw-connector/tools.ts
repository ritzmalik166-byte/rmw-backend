import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/server";
import {
  ConnectorError,
  createDraftBlogFromGoogleDoc,
  getBlogCategories,
  getBlogs,
  uploadBlogBanner,
} from "@/lib/rmw-connector/service";

type ToolResult = {
  content: { type: "text"; text: string }[];
  structuredContent?: Record<string, unknown>;
  isError?: boolean;
};

function ok(payload: Record<string, unknown>): ToolResult {
  return {
    content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
    structuredContent: payload,
  };
}

function toolError(error: unknown, tool: string): ToolResult {
  const safe =
    error instanceof ConnectorError
      ? { error: error.code, message: error.message }
      : { error: "INTERNAL_ERROR", message: "The request could not be completed" };

  if (!(error instanceof ConnectorError)) {
    console.error(`[rmw-connector] ${tool} failed:`, error);
  }

  const payload = { success: false, ...safe };
  return {
    content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
    structuredContent: payload,
    isError: true,
  };
}

async function run(tool: string, fn: () => Promise<Record<string, unknown>>) {
  try {
    return ok(await fn());
  } catch (error) {
    return toolError(error, tool);
  }
}

// ~600 KB of binary is ~820k base64 chars; leave headroom so oversized files get the friendly size error.
const MAX_BASE64_CHARS = 1_200_000;

export const RMW_CONNECTOR_INSTRUCTIONS = [
  "Ritz Media World (RMW) blog connector.",
  "You can list categories and blogs, upload a banner image, and create DRAFT blogs from a Google Doc.",
  "You cannot publish, schedule, edit or delete blogs; every blog you create is saved as a draft for the RMW team to review.",
  "Workflow: list_categories -> (optional) list_blogs to avoid duplicates -> (optional) upload_banner -> create_blog_draft.",
  "The Google Doc must follow the RMW template (BLOG META / BLOG CONTENT) and be shared as Viewer with the RMW importer service account.",
].join(" ");

export function registerRmwConnectorTools(server: McpServer) {
  server.registerTool(
    "list_categories",
    {
      title: "List blog categories",
      description:
        "List the blog categories available in the RMW admin panel. Use the returned id as blogCategoryId in create_blog_draft.",
      inputSchema: z.object({}),
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async () =>
      run("list_categories", async () => {
        const categories = await getBlogCategories();
        return { categories, count: categories.length };
      })
  );

  server.registerTool(
    "list_blogs",
    {
      title: "List existing blogs",
      description:
        "List existing RMW blogs (newest first) with title, slug, public URL, status and author. Use search to check for duplicates before creating a draft.",
      inputSchema: z.object({
        page: z.number().int().min(1).max(10_000).optional().describe("Page number, starting at 1 (default 1)."),
        limit: z.number().int().min(1).max(50).optional().describe("Results per page, max 50 (default 20)."),
        status: z
          .enum(["draft", "scheduled", "published"])
          .optional()
          .describe("Only return blogs with this status."),
        search: z
          .string()
          .trim()
          .max(100)
          .optional()
          .describe("Case-insensitive text to match against blog title or slug."),
      }),
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async (args) => run("list_blogs", () => getBlogs(args))
  );

  server.registerTool(
    "upload_banner",
    {
      title: "Upload blog banner",
      description:
        "Upload a banner (cover) image for a blog draft. JPG, PNG or WebP only, less than 600 KB. Send the image bytes as base64. Returns bannerPath to pass to create_blog_draft. Does not create a blog.",
      inputSchema: z.object({
        filename: z.string().trim().min(1).max(200).describe("Original file name, e.g. banner.webp."),
        mimeType: z
          .string()
          .trim()
          .max(100)
          .optional()
          .describe("image/jpeg, image/png or image/webp. Checked against the actual file bytes."),
        dataBase64: z
          .string()
          .min(1)
          .max(MAX_BASE64_CHARS)
          .describe("Image file contents encoded as base64 (a data: URL prefix is allowed)."),
      }),
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false,
      },
    },
    async (args) => run("upload_banner", () => uploadBlogBanner(args))
  );

  server.registerTool(
    "create_blog_draft",
    {
      title: "Create blog draft from Google Doc",
      description:
        "Create a new RMW blog as a DRAFT from a Google Doc that follows the RMW template. The blog is always saved as a draft and the author is always the RMW agent account; it is never published or scheduled. Provide googleDocUrl or googleDocId.",
      inputSchema: z.object({
        blogTitle: z.string().trim().min(1).max(300).describe("Blog title shown on the site."),
        blogSlug: z
          .string()
          .trim()
          .max(200)
          .optional()
          .describe("Optional URL slug (lowercase letters, numbers, hyphens). Generated from the title when omitted."),
        blogCategoryId: z
          .string()
          .trim()
          .regex(/^[a-fA-F0-9]{24}$/, "Invalid category")
          .describe("Category id from list_categories."),
        googleDocUrl: z
          .string()
          .trim()
          .max(2048)
          .optional()
          .describe("https://docs.google.com/document/d/<ID>/... link."),
        googleDocId: z.string().trim().max(200).optional().describe("Google Docs document ID."),
        bannerPath: z
          .string()
          .trim()
          .max(300)
          .optional()
          .describe("bannerPath returned by upload_banner (optional for drafts)."),
      }),
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: true,
      },
    },
    async (args) => run("create_blog_draft", () => createDraftBlogFromGoogleDoc(args))
  );
}
