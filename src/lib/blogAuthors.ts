/** Preset blog authors for admin posting (Ritz Media World). */
export const BLOG_AUTHORS = [
  "Akansha Verma",
  "Shorye Verma",
  "Manav Raj Chopra",
  "Khubeb (Ayan)",
] as const;

export type BlogAuthor = (typeof BLOG_AUTHORS)[number];

export const DEFAULT_BLOG_AUTHOR: BlogAuthor = BLOG_AUTHORS[0];

export function isBlogAuthor(value: string): value is BlogAuthor {
  return (BLOG_AUTHORS as readonly string[]).includes(value);
}
