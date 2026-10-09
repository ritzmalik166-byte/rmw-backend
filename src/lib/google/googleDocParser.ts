/**
 * Deterministic Google Docs → blog meta + HTML converter.
 * No LLM. Uses Docs API structural elements (paragraph, textRun, table, bullet).
 */

type DocsTextStyle = {
  bold?: boolean | null;
  italic?: boolean | null;
  underline?: boolean | null;
  link?: { url?: string | null } | null;
};

type DocsParagraphElement = {
  textRun?: {
    content?: string | null;
    textStyle?: DocsTextStyle | null;
  } | null;
  inlineObjectElement?: { inlineObjectId?: string | null } | null;
};

type DocsParagraph = {
  elements?: DocsParagraphElement[] | null;
  paragraphStyle?: {
    namedStyleType?: string | null;
    alignment?: string | null;
  } | null;
  bullet?: {
    listId?: string | null;
    nestingLevel?: number | null;
  } | null;
};

type DocsTableCell = {
  content?: DocsStructuralElement[] | null;
};

type DocsTableRow = {
  tableCells?: DocsTableCell[] | null;
};

type DocsTable = {
  tableRows?: DocsTableRow[] | null;
};

type DocsStructuralElement = {
  paragraph?: DocsParagraph | null;
  table?: DocsTable | null;
  sectionBreak?: unknown;
  tableOfContents?: unknown;
};

type DocsList = {
  listProperties?: {
    nestingLevels?: Array<{
      glyphType?: string | null;
      glyphSymbol?: string | null;
    } | null> | null;
  } | null;
};

export type GoogleDocLike = {
  body?: { content?: DocsStructuralElement[] | null } | null;
  lists?: Record<string, DocsList> | null;
};

export type ParsedGoogleBlog = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  mtDesc: string;
  blogContent: string;
};

const META_SECTION = "blog meta";
const CONTENT_SECTION = "blog content";

const META_FIELDS = {
  "meta title": "metaTitle",
  "meta description": "metaDescription",
  "meta keywords": "metaKeywords",
  "mt desc": "mtDesc",
} as const;

type MetaFieldKey = (typeof META_FIELDS)[keyof typeof META_FIELDS];

function normalizeLabel(text: string): string {
  return text
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .trim()
    .toLowerCase()
    .replace(/=+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isSeparatorLine(text: string): boolean {
  const t = text.trim();
  return /^=+$/.test(t) || /^[-─—]+$/.test(t);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(text: string): string {
  return escapeHtml(text).replace(/`/g, "&#96;");
}

function isSafeHref(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (/^\s*javascript:/i.test(trimmed)) return false;
  if (/^\s*data:/i.test(trimmed)) return false;
  return /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(trimmed);
}

function convertTextRunToHtml(content: string, style?: DocsTextStyle | null): string {
  if (!content) return "";

  let html = escapeHtml(content).replace(/\n/g, "<br>");

  if (style?.bold) html = `<strong>${html}</strong>`;
  if (style?.italic) html = `<em>${html}</em>`;
  if (style?.underline) html = `<u>${html}</u>`;

  const linkUrl = style?.link?.url;
  if (linkUrl && isSafeHref(linkUrl)) {
    html = `<a href="${escapeAttr(linkUrl)}" target="_blank" rel="noopener noreferrer">${html}</a>`;
  }

  return html;
}

function paragraphPlainText(paragraph: DocsParagraph): string {
  const parts: string[] = [];
  for (const el of paragraph.elements || []) {
    if (el.textRun?.content) {
      parts.push(el.textRun.content);
    }
  }
  return parts.join("").replace(/\n$/g, "");
}

function paragraphInnerHtml(paragraph: DocsParagraph): string {
  const parts: string[] = [];
  for (const el of paragraph.elements || []) {
    if (el.textRun?.content != null) {
      parts.push(convertTextRunToHtml(el.textRun.content, el.textRun.textStyle));
    }
  }
  return parts.join("").replace(/(?:<br>)+$/i, "");
}

function headingTag(namedStyleType?: string | null): string {
  switch (namedStyleType) {
    case "HEADING_1":
    case "TITLE":
      return "h1";
    case "HEADING_2":
    case "SUBTITLE":
      return "h2";
    case "HEADING_3":
      return "h3";
    case "HEADING_4":
      return "h4";
    case "HEADING_5":
      return "h5";
    case "HEADING_6":
      return "h6";
    default:
      return "p";
  }
}

const HEADING_STYLE =
  "font-weight:700;color:rgb(11,83,148);font-family:'League Spartan',sans-serif";

const PARAGRAPH_STYLE = [
  "font-family:Arial,sans-serif",
  "color:rgb(0,0,0)",
  "background-color:transparent",
  "font-weight:400",
  "font-style:normal",
  "font-variant:normal",
  "text-decoration:none",
  "vertical-align:baseline",
  "white-space:pre-wrap",
  "font-size:18px",
].join(";");

/** Fixed blog typography — overrides anything from the Google Doc. */
const BLOG_TAG_STYLES: Record<string, string> = {
  h1: HEADING_STYLE,
  h2: `font-size:34px;${HEADING_STYLE}`,
  h3: `font-size:30px;${HEADING_STYLE}`,
  h4: HEADING_STYLE,
  h5: HEADING_STYLE,
  h6: HEADING_STYLE,
  p: PARAGRAPH_STYLE,
};

function alignmentCss(alignment?: string | null): string {
  switch (alignment) {
    case "CENTER":
      return "text-align:center";
    case "END":
    case "RIGHT":
      return "text-align:right";
    case "JUSTIFIED":
      return "text-align:justify";
    default:
      return "";
  }
}

/** Open-tag attributes with enforced typography (+ optional Docs alignment). */
function tagOpenAttrs(tag: string, alignment?: string | null): string {
  const parts: string[] = [];
  if (BLOG_TAG_STYLES[tag]) parts.push(BLOG_TAG_STYLES[tag]);
  const align = alignmentCss(alignment);
  if (align) parts.push(align);
  if (!parts.length) return "";
  return ` style="${parts.join(";")}"`;
}

function isOrderedList(lists: GoogleDocLike["lists"], listId: string, nestingLevel: number): boolean {
  const levels = lists?.[listId]?.listProperties?.nestingLevels;
  const level = levels?.[nestingLevel];
  const glyph = String(level?.glyphType || "").toUpperCase();
  return (
    glyph.includes("DECIMAL") ||
    glyph.includes("ALPHA") ||
    glyph.includes("ROMAN") ||
    glyph === "ZERO"
  );
}

export function replaceImagePlaceholders(html: string): string {
  if (!html) return html;

  // Standalone placeholder paragraphs already as text — leave as-is
  // Normalize bare [IMAGE-N] lines wrapped poorly into a single <p>
  return html.replace(
    /(?:<p[^>]*>\s*)?\[IMAGE-(\d+)\](?:\s*<\/p>)?/gi,
    (_match, num: string) => `<p${tagOpenAttrs("p")}>[IMAGE-${num}]</p>`
  );
}

function sanitizeHtml(html: string): string {
  let out = html;

  // Strip dangerous tags entirely
  out = out.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  out = out.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");
  out = out.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "");
  out = out.replace(/<embed\b[^>]*>/gi, "");
  out = out.replace(/<link\b[^>]*>/gi, "");
  out = out.replace(/<meta\b[^>]*>/gi, "");
  out = out.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

  // Strip event handlers and javascript: URLs
  out = out.replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  out = out.replace(/\shref\s*=\s*(?:"\s*javascript:[^"]*"|'\s*javascript:[^']*'|\s*javascript:[^\s>]+)/gi, ' href="#"');
  out = out.replace(/\ssrc\s*=\s*(?:"\s*javascript:[^"]*"|'\s*javascript:[^']*'|\s*javascript:[^\s>]+)/gi, "");

  return out;
}

function convertTableToHtml(
  table: DocsTable,
  lists: GoogleDocLike["lists"]
): string {
  const rows = table.tableRows || [];
  if (!rows.length) return "";

  const rowHtml = rows
    .map((row) => {
      const cells = row.tableCells || [];
      const cellHtml = cells
        .map((cell) => {
          const inner = convertStructuralElementsToHtml(cell.content || [], lists);
          return `<td>${inner || "&nbsp;"}</td>`;
        })
        .join("");
      return `<tr>${cellHtml}</tr>`;
    })
    .join("");

  return `<table>${rowHtml}</table>`;
}

type ListOpen = { tag: "ul" | "ol"; level: number };

function convertStructuralElementsToHtml(
  elements: DocsStructuralElement[],
  lists: GoogleDocLike["lists"]
): string {
  const chunks: string[] = [];
  const openLists: ListOpen[] = [];

  const closeListsTo = (level: number) => {
    while (openLists.length > 0 && openLists[openLists.length - 1].level >= level) {
      const closed = openLists.pop()!;
      chunks.push(`</${closed.tag}>`);
    }
  };

  const closeAllLists = () => closeListsTo(0);

  for (const el of elements) {
    if (el.table) {
      closeAllLists();
      chunks.push(convertTableToHtml(el.table, lists));
      continue;
    }

    const paragraph = el.paragraph;
    if (!paragraph) continue;

    const plain = paragraphPlainText(paragraph).trim();
    if (isSeparatorLine(plain)) continue;

    const inner = paragraphInnerHtml(paragraph);
    const bullet = paragraph.bullet;

    if (bullet?.listId) {
      const level = bullet.nestingLevel ?? 0;
      const ordered = isOrderedList(lists, bullet.listId, level);
      const tag: "ul" | "ol" = ordered ? "ol" : "ul";

      // Close deeper / mismatched lists
      while (
        openLists.length > 0 &&
        (openLists[openLists.length - 1].level > level ||
          (openLists[openLists.length - 1].level === level &&
            openLists[openLists.length - 1].tag !== tag))
      ) {
        const closed = openLists.pop()!;
        chunks.push(`</${closed.tag}>`);
      }

      // Open missing levels
      while (openLists.length === 0 || openLists[openLists.length - 1].level < level) {
        const nextLevel = openLists.length === 0 ? 0 : openLists[openLists.length - 1].level + 1;
        const nextOrdered =
          nextLevel === level ? ordered : isOrderedList(lists, bullet.listId, nextLevel);
        const nextTag: "ul" | "ol" = nextOrdered ? "ol" : "ul";
        openLists.push({ tag: nextTag, level: nextLevel });
        chunks.push(`<${nextTag}>`);
        if (nextLevel === level) break;
      }

      if (openLists.length === 0 || openLists[openLists.length - 1].level !== level) {
        openLists.push({ tag, level });
        chunks.push(`<${tag}>`);
      }

      chunks.push(`<li>${inner || "&nbsp;"}</li>`);
      continue;
    }

    closeAllLists();

    // Image placeholder alone → keep as paragraph text
    if (/^\[IMAGE-\d+\]$/i.test(plain)) {
      chunks.push(`<p${tagOpenAttrs("p")}>${escapeHtml(plain)}</p>`);
      continue;
    }

    if (!inner.trim() && !plain) {
      chunks.push("<br>");
      continue;
    }

    const tag = headingTag(paragraph.paragraphStyle?.namedStyleType);
    const attrs = tagOpenAttrs(tag, paragraph.paragraphStyle?.alignment);
    chunks.push(`<${tag}${attrs}>${inner}</${tag}>`);
  }

  closeAllLists();
  return chunks.join("");
}

function matchMetaField(normalized: string): MetaFieldKey | null {
  return (META_FIELDS as Record<string, MetaFieldKey>)[normalized] ?? null;
}

export function parseGoogleDoc(doc: GoogleDocLike): ParsedGoogleBlog {
  const content = doc.body?.content || [];
  const lists = doc.lists || {};

  const meta: Record<MetaFieldKey, string> = {
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    mtDesc: "",
  };

  type Phase = "before" | "meta" | "content";
  let phase: Phase = "before";
  let currentField: MetaFieldKey | null = null;
  const contentElements: DocsStructuralElement[] = [];

  for (const el of content) {
    if (el.table) {
      if (phase === "content") {
        contentElements.push(el);
      } else if (phase === "meta" && currentField) {
        // Ignore tables inside meta section
      }
      continue;
    }

    if (!el.paragraph) continue;

    const plain = paragraphPlainText(el.paragraph);
    const normalized = normalizeLabel(plain);

    if (isSeparatorLine(plain) || !normalized) {
      if (phase === "content" && plain && !isSeparatorLine(plain)) {
        contentElements.push(el);
      }
      continue;
    }

    if (normalized === META_SECTION) {
      phase = "meta";
      currentField = null;
      continue;
    }

    if (normalized === CONTENT_SECTION) {
      phase = "content";
      currentField = null;
      continue;
    }

    if (phase === "meta") {
      const field = matchMetaField(normalized);
      if (field) {
        currentField = field;
        continue;
      }

      if (currentField) {
        const value = plain.replace(/\n$/g, "").trim();
        if (value) {
          meta[currentField] = meta[currentField]
            ? `${meta[currentField]} ${value}`.trim()
            : value;
        }
      }
      continue;
    }

    if (phase === "content") {
      contentElements.push(el);
      continue;
    }

    // Before BLOG META / BLOG CONTENT: ignore template preamble
  }

  let blogContent = convertStructuralElementsToHtml(contentElements, lists);
  blogContent = replaceImagePlaceholders(blogContent);
  blogContent = sanitizeHtml(blogContent);

  return {
    metaTitle: meta.metaTitle.trim(),
    metaDescription: meta.metaDescription.trim(),
    metaKeywords: meta.metaKeywords.trim(),
    mtDesc: meta.mtDesc.trim(),
    blogContent: blogContent.trim(),
  };
}

export function extractBlogMeta(doc: GoogleDocLike): Omit<ParsedGoogleBlog, "blogContent"> {
  const parsed = parseGoogleDoc(doc);
  return {
    metaTitle: parsed.metaTitle,
    metaDescription: parsed.metaDescription,
    metaKeywords: parsed.metaKeywords,
    mtDesc: parsed.mtDesc,
  };
}

export function extractBlogContent(doc: GoogleDocLike): string {
  return parseGoogleDoc(doc).blogContent;
}
