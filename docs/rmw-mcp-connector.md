# RMW Blog MCP Connector

The MCP connector lets Claude work with the Ritz Media World blog system through a small, controlled set of tools.

> **Claude cannot publish, schedule, edit, or delete blogs through this connector.**
> Every blog it creates is saved as a **draft**, authored by the configured RMW agent account (Priyanshi), for the RMW team to review and publish from the admin panel.

- Endpoint: `/api/mcp`
- Production URL: `https://rmw.ritzmediaworld.in/api/mcp`
- Transport: Streamable HTTP (stateless), served by [`mcp-handler`](https://www.npmjs.com/package/mcp-handler) v2 on top of `@modelcontextprotocol/server` v2

## Tools

| Tool | Type | Purpose |
|---|---|---|
| `list_categories` | read-only | Blog categories (`id`, `name`, `slug`) from the same `RitzCats` collection the admin dropdown uses |
| `list_blogs` | read-only | Existing blogs (`id`, `title`, `slug`, `url`, `status`, `author`, `category`, dates). Supports `page`, `limit` (max 50, default 20), `status` and `search` (title/slug) |
| `upload_banner` | write (file only) | Saves a banner image and returns `bannerPath`. Does not create a blog |
| `create_blog_draft` | write | Creates a **draft** blog from a Google Doc |

No other tools exist. There is no publish, schedule, edit or delete operation.

### `upload_banner`

Input: `filename`, `dataBase64` (base64 image bytes; a `data:` URL prefix is allowed), and optional `mimeType`.

Before anything is written, the server checks:

1. The data is valid base64 and not empty.
2. The decoded file is **less than 600 KB** (`< 614,400` bytes).
3. The **actual file bytes** are JPG, PNG or WebP (magic-byte check). A declared `mimeType` that doesn't match the bytes is rejected.
4. The filename is reduced to its base name and sanitized with the same `safeUploadFilename()` the admin panel uses. The extension is forced to match the detected type.
5. The file is written with the admin panel's own `saveBufferToUploads()` into `SERVER_IMG_PATH/images/`, with a path-traversal guard.

It returns `bannerPath` (for example `/images/1790000000000-cover.webp`) and a `previewUrl`.

### `create_blog_draft`

Input:

| Field | Required | Notes |
|---|---|---|
| `blogTitle` | yes | Must be unique, as in the admin panel |
| `blogCategoryId` | yes | An `id` from `list_categories` |
| `googleDocUrl` or `googleDocId` | yes (one) | Only `docs.google.com/document/d/<ID>` URLs or bare document IDs |
| `blogSlug` | no | Generated from the title when omitted |
| `bannerPath` | no | Value returned by `upload_banner`. Must point to an existing file in the images folder |

The following are **not accepted** and are silently dropped if sent: `publishStatus`, `scheduledAt`, `blogAuthor`, or any other field.

Successful response:

```json
{
  "success": true,
  "message": "Blog draft created successfully",
  "blog": { "id": "...", "title": "...", "slug": "...", "status": "draft", "author": "Priyanshi", "banner": "/images/..." },
  "warnings": ["META TITLE is missing in the Google Doc."]
}
```

`warnings` lists anything the draft still needs before someone can publish it: missing META TITLE, missing META DESCRIPTION/MT DESC, empty content, no banner, or a slug that was changed.

## How it works (no second import implementation)

The Google Doc import logic that used to live inside `src/app/api/ritz_blogs/upload/route.ts` was moved, unchanged, into a shared service. Both the admin panel's **Import from Docs** API and the MCP connector call the same code:

```text
Admin "Import from Docs" API           MCP create_blog_draft
(/api/ritz_blogs/upload,               (/api/mcp)
 /api/blog/import-google-doc)                 |
            |                                 |
            +---- importBlogFromGoogleDoc() --+
                  src/lib/google/googleDocBlogImport.ts
                        |
      extractGoogleDocId -> fetchGoogleDoc -> parseGoogleDoc
      slug rules -> category rules -> RitzBlogModel.create -> ManagementActivities
```

| File | Role |
|---|---|
| `src/app/api/mcp/route.ts` | MCP endpoint and authentication gate |
| `src/lib/rmw-connector/tools.ts` | Tool definitions and Zod input schemas |
| `src/lib/rmw-connector/service.ts` | Connector service: agent account, categories, blogs, banner, draft |
| `src/lib/rmw-connector/auth.ts` | Temporary shared-secret verification |
| `src/lib/google/googleDocBlogImport.ts` | Shared Google Doc → blog import (used by the admin API too) |
| `src/lib/blogBannerStorage.ts` | Shared safe image storage helpers (used by the admin API too) |

The admin API's responses, messages, validation order and database format are unchanged.

## Google Docs access

- Docs are read with the existing service account using the read-only `documents.readonly` scope (`GOOGLE_CLIENT_EMAIL` / `GOOGLE_PRIVATE_KEY`).
- The doc must be **shared as Viewer** with `blog-importer@rmw-blog-importer.iam.gserviceaccount.com`.
- Only Google Docs IDs and `docs.google.com/document/d/<ID>` URLs are accepted (`extractGoogleDocId()`). The connector never fetches any other URL.
- The doc must follow the RMW template:

```text
BLOG META
META TITLE
<value>
META DESCRIPTION
<value>
META KEYWORDS
<value>
MT DESC
<value>
====================
BLOG CONTENT
<article content>
```

The existing parser handles headings, bold, italic, underline, links, lists, tables, alignment, `[IMAGE-N]` placeholders, HTML sanitization and the fixed blog typography.

## Priyanshi as the author

- `RMW_AGENT_ADMIN_ID` holds the MongoDB `_id` of Priyanshi's **Management** (admin panel) account.
- Before every write (`upload_banner`, `create_blog_draft`), the connector loads that account from MongoDB and rejects the request if it is **missing**, **inactive**, or its role is not `super_admin` / `editor`.
- `blogAuthor` is always `Management.name` from the database. Anything Claude sends is ignored.
- Deactivating Priyanshi's account in the admin panel immediately stops Claude from creating drafts. The read-only tools keep working.
- Claude never logs in with Priyanshi's email or password. No session or JWT is created.

## Why Claude can only create drafts

- `publishStatus` is hard-coded to `"draft"` in `createDraftBlogFromGoogleDoc()`. It is not a tool parameter.
- Zod strips unknown fields, so `publishStatus`, `scheduledAt` and `blogAuthor` in a request have no effect.
- Drafts are saved with `blogStatus: false` and no `publishedAt` / `scheduledAt`, so they never appear on the public site, in the sitemap, or in the scheduler.
- Existing draft rules apply. If the requested slug is already taken, the draft is saved with the admin panel's `-draft-<timestamp>` suffix and a warning is returned. Duplicate titles are rejected.

## Activity log

Each draft writes a `ManagementActivities` record for the agent account:

```text
[blog.create.draft.via_claude] User Priyanshi (<email>) saved a draft blog via Claude: <blog title>
```

## Environment variables

Add these to the server's `.env` (never commit real values):

```env
# MongoDB _id of Priyanshi's Management (Editor) account
RMW_AGENT_ADMIN_ID=
# TEMPORARY: long random secret for MCP testing (min 32 characters)
RMW_MCP_SECRET=
```

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

If `RMW_MCP_SECRET` is missing, shorter than 32 characters, or still a `<placeholder>`, `/api/mcp` answers `503 MCP connector is not configured`.

The connector also relies on the variables the app already uses: `MONGO_URL`, `SERVER_IMG_PATH`, `NEXT_PUBLIC_SERVER_IMG_PATH`, `GOOGLE_CLIENT_EMAIL` and `GOOGLE_PRIVATE_KEY`.

## Running locally

1. Set `RMW_AGENT_ADMIN_ID` to an active `editor` or `super_admin` Management account in your local database, and set `RMW_MCP_SECRET`.
2. `npm run dev`
3. Connect an MCP client to `http://localhost:3000/api/mcp` with the header `Authorization: Bearer <RMW_MCP_SECRET>`.

## Testing with MCP Inspector

```bash
npx @modelcontextprotocol/inspector
```

1. Transport: **Streamable HTTP**.
2. URL: `http://localhost:3000/api/mcp` locally, or `https://rmw.ritzmediaworld.in/api/mcp`.
3. Authentication: add the header `Authorization` = `Bearer <RMW_MCP_SECRET>`.
4. Connect, then open **Tools → List Tools**. You should see exactly `list_categories`, `list_blogs`, `upload_banner` and `create_blog_draft`.

Authentication errors:

| Request | Response |
|---|---|
| No `Authorization` header | `401 Authentication required` |
| Wrong secret | `401 Invalid MCP credentials` |
| Secret not configured on the server | `503 MCP connector is not configured` |

## Temporary secret authentication

`/api/mcp` currently accepts `Authorization: Bearer <RMW_MCP_SECRET>` and compares it in constant time. The secret is only read from `process.env` and never appears in responses or logs.

This is for development and testing (MCP Inspector, local clients) only. It is a single shared key with no per-user identity, and it must be replaced before rolling the connector out to the team.

## Production OAuth migration

The route already goes through `withMcpAuth` from `mcp-handler`, which is the hook for OAuth:

```ts
const authenticatedHandler = withMcpAuth(mcpHandler, verifyMcpBearerToken, { required: true });
```

To move to OAuth:

1. Choose an OAuth 2.1 authorization server that RMW team members sign in to, for example your identity provider or Google Workspace through an auth service. It should support Client ID Metadata Documents or Dynamic Client Registration so Claude can register as a client.
2. Replace `verifyMcpBearerToken` in `src/lib/rmw-connector/auth.ts` with a verifier that validates the OAuth access token: signature/JWKS, issuer, audience = `https://rmw.ritzmediaworld.in/api/mcp`, and expiry. Return an `AuthInfo` only for authorized RMW team accounts, using an email-domain or allowlist check.
3. Add the protected resource metadata route at `src/app/.well-known/oauth-protected-resource/route.ts` using `protectedResourceHandler({ authServerUrls: [<issuer>] })` and `metadataCorsOptionsRequestHandler()` from `mcp-handler`.
4. Remove the shared-secret pre-check block in `src/app/api/mcp/route.ts` so `withMcpAuth` returns the standard OAuth `401` challenge that points clients to the metadata document.
5. After OAuth works end to end with Claude, delete `RMW_MCP_SECRET` from the server environment.

Drafts are still authored by `RMW_AGENT_ADMIN_ID` after the migration. OAuth controls **who may connect**, not the blog author.

## Connecting Claude

- Connector URL: `https://rmw.ritzmediaworld.in/api/mcp`
- Claude's custom-connector setup authenticates with OAuth, so connect Claude after the OAuth migration above. Until then, use MCP Inspector or a client that can send a custom `Authorization` header for testing.
- Banner uploads are sent as base64 JSON (about 820 KB for a 600 KB image). If a reverse proxy limits request size (nginx `client_max_body_size` defaults to 1 MB), keep it at 1 MB or more for `/api/mcp`.
