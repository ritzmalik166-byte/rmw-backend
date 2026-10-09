import { FIND_BLOGS_BY_CATEGORY } from "@/app/api/get_all_blogs/route";
import CategoriesSection from "@/components/categories2/CategoriesSection";


async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const result = await FIND_BLOGS_BY_CATEGORY(slug);
    const data = result.data ?? [];
    const category_meta_details = result.category_meta_details ?? null;

    console.log("category_meta_details", category_meta_details);
    console.log("data", data);
    return (
      <CategoriesSection slug={slug} blogs={data} />
    )
}


export default Page;