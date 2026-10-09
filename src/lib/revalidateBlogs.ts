import { revalidatePath } from "next/cache";
import { regenerateBlogSitemaps } from "@/lib/regenerateBlogSitemaps";

/** Bust the /blogs listing cache and refresh sitemap files after admin blog changes. */
export async function revalidateBlogListingPages() {
  revalidatePath("/blogs");

  try {
    const result = await regenerateBlogSitemaps();
    if (!result.ok) {
      console.error("[revalidateBlogListingPages] Sitemap regeneration failed:", result.error);
    }
  } catch (error) {
    console.error("[revalidateBlogListingPages] Sitemap regeneration threw:", error);
  }
}
