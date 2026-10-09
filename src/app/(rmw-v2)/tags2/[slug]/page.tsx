import BlogsFetchByTags from "@/components/tags/BlogsFetchByTags";
import { FIND_BLOGS_BY_KEYWORD } from "@/app/api/get_all_blogs/route";

async function Tags2Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    const normalizedTitle = slug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    const blog_from_tags = await FIND_BLOGS_BY_KEYWORD(normalizedTitle); 
    
    return (
        <BlogsFetchByTags title={normalizedTitle} blogs={blog_from_tags.data ?? []}/>
    )
}

export default Tags2Page;