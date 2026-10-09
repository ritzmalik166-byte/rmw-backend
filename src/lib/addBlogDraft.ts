export const ADD_BLOG_STEP1_KEY = "add-blog-step-1";
export const ADD_BLOG_STEP2_PREFIX = "add-blog-step-2-page-";

export function clearAddBlogDraft() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(ADD_BLOG_STEP1_KEY);

  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(ADD_BLOG_STEP2_PREFIX)) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach((key) => localStorage.removeItem(key));
}
