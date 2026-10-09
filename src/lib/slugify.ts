/** Normalize user input into a URL-safe blog slug. */
export function normalizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Format slug while typing — keeps spaces so users can separate words. */
export function formatSlugInput(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, " ")
    .replace(/-+/g, "-");
}

/** Generate a slug from a title when no custom slug is provided. */
export function generateSlugFromTitle(title: string): string {
  return normalizeSlug(
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
  );
}

/** Validate slug format for admin input. */
export function isValidSlugInput(value: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}
