import { rewriteLegacyBlogPostHref } from "@/lib/blogUrl";

/**
 * Normalizes CMS/blog HTML so links work with dangerouslySetInnerHTML.
 * SSR-safe (no DOM). Complements client-side legacy blog URL rewrites in Section2.
 */

function escapeAttr(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function decodeBasicEntities(html: string): string {
    return html
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&quot;/gi, '"')
        .replace(/&#0*39;/g, "'")
        .replace(/&#x0*27;/gi, "'")
        .replace(/&amp;/gi, "&");
}

function readHrefFromAttrs(attrs: string): string | null {
    const m =
        attrs.match(/\bhref\s*=\s*"([^"]*)"/i) ||
        attrs.match(/\bhref\s*=\s*'([^']*)'/i) ||
        attrs.match(/\bhref\s*=\s*([^\s>]+)/i);
    return m ? String(m[1] ?? "").trim() : null;
}

function fixAnchorOpeningTags(html: string): string {
    return html.replace(/<a(?:\s+([^>]*?))?>/gi, (match, attrs: string = "") => {
        const hrefVal = readHrefFromAttrs(attrs) ?? "";
        if (hrefVal && !/^javascript:/i.test(hrefVal)) {
            const legacyRewrite = rewriteLegacyBlogPostHref(hrefVal);
            if (legacyRewrite) {
                const newAttrs = attrs.replace(
                    /\bhref\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/i,
                    `href="${escapeAttr(legacyRewrite)}"`
                );
                return `<a ${newAttrs}>`;
            }
            let nextAttrs = attrs;
            if (
                !/^https?:/i.test(hrefVal) &&
                !hrefVal.startsWith("/") &&
                !hrefVal.startsWith("#") &&
                !hrefVal.startsWith("mailto:") &&
                !hrefVal.startsWith("tel:")
            ) {
                if (/^www\./i.test(hrefVal)) {
                    const fixed = `https://${hrefVal}`;
                    nextAttrs = attrs.replace(
                        /\bhref\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/i,
                        `href="${escapeAttr(fixed)}"`
                    );
                }
            }
            return `<a ${nextAttrs}>`;
        }

        const fromData =
            attrs.match(/\bdata-mce-href\s*=\s*"([^"]*)"/i)?.[1]?.trim() ||
            attrs.match(/\bdata-mce-href\s*=\s*'([^']*)'/i)?.[1]?.trim() ||
            attrs.match(/\bdata-sheets-href\s*=\s*"([^"]*)"/i)?.[1]?.trim() ||
            attrs.match(/\bdata-sheets-href\s*=\s*'([^']*)'/i)?.[1]?.trim() ||
            attrs.match(/\bdata-href\s*=\s*"([^"]*)"/i)?.[1]?.trim() ||
            attrs.match(/\bdata-href\s*=\s*'([^']*)'/i)?.[1]?.trim();

        if (fromData) {
            if (/^javascript:/i.test(fromData)) return match;
            const href = /^www\./i.test(fromData) ? `https://${fromData}` : fromData;
            if (/\bhref\s*=/i.test(attrs)) {
                const newAttrs = attrs.replace(
                    /\bhref\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/i,
                    `href="${escapeAttr(href)}"`
                );
                return `<a ${newAttrs}>`;
            }
            return `<a href="${escapeAttr(href)}" ${attrs}>`;
        }

        return match;
    });
}

function fixAnchorsWithUrlOnlyBody(html: string): string {
    return html.replace(
        /<a(?![^>]*\bhref\s*=)[^>]*>\s*((?:https?:\/\/|www\.)[^\s<]+)\s*<\/a>/gi,
        (full, url: string) => {
            const t = String(url).trim();
            if (!t || /^javascript:/i.test(t)) return full;
            const href = /^www\./i.test(t) ? `https://${t}` : t;
            return `<a href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">${t}</a>`;
        }
    );
}

const URL_RE =
    /\b(https?:\/\/[\w\-./%?#&=@+~,:;()[\]!$*]+|www\.[\w\-./%?#&=@+~,:;()[\]!$*]+)/gi;

function trimTrailingPunct(raw: string): { core: string; tail: string } {
    const core = raw.replace(/[),.;:!?]+$/g, "");
    const tail = raw.slice(core.length);
    return { core, tail };
}

function linkifyOutsideAnchors(html: string): string {
    return html
        .split(/(<a\b[^>]*>[\s\S]*?<\/a>)/gi)
        .map((block) => {
            if (/^<a\b/i.test(block)) return block;
            const parts = block.split(/(<[^>]+>)/g);
            return parts
                .map((part, i) => {
                    if (i % 2 === 1) return part;
                    return part.replace(URL_RE, (raw) => {
                        const { core, tail } = trimTrailingPunct(raw);
                        if (!core || /^javascript:/i.test(core)) return raw;
                        const href = /^www\./i.test(core) ? `https://${core}` : core;
                        return `<a href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">${core}</a>${tail}`;
                    });
                })
                .join("");
        })
        .join("");
}

function strongOrBoldUrlsToAnchors(html: string): string {
    return html.replace(
        /<(strong|b)(?:\s[^>]*)?>\s*((?:https?:\/\/|www\.)[^<]+?)\s*<\/\1>/gi,
        (full, _tag: string, url: string) => {
            const t = String(url).trim();
            if (!t || /^javascript:/i.test(t)) return full;
            const href = /^www\./i.test(t) ? `https://${t}` : t;
            return `<a href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">${t}</a>`;
        }
    );
}

function markdownLinksToAnchors(html: string): string {
    return html.replace(
        /\[([^\]\n]+)\]\((https?:\/\/[^)\s]+)\)/g,
        (_m, text: string, href: string) =>
            `<a href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">${text}</a>`
    );
}

/** CMS sometimes wraps stats/text in h3 inside code — unwrap to plain text inside code. */
function stripHeadingsInsideCode(html: string): string {
    return html.replace(
        /<code(\s[^>]*)?>([\s\S]*?)<\/code>/gi,
        (_match, attrs: string = "", inner: string) => {
            const cleaned = inner.replace(/<\/?h[1-6]\b[^>]*>/gi, "");
            return `<code${attrs}>${cleaned}</code>`;
        }
    );
}

export function normalizeBlogBodyHtml(html: string): string {
    if (!html || typeof html !== "string") return "";

    let out = html;
    if (/&lt;[a-z]/i.test(out) && !/<[a-z][\s/>]/i.test(out)) {
        out = decodeBasicEntities(out);
    }

    out = markdownLinksToAnchors(out);
    out = fixAnchorOpeningTags(out);
    out = fixAnchorsWithUrlOnlyBody(out);
    out = strongOrBoldUrlsToAnchors(out);
    out = linkifyOutsideAnchors(out);
    out = stripHeadingsInsideCode(out);

    return out;
}
