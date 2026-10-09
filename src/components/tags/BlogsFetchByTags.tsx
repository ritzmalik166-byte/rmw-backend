import BrandImpactSection1 from "../copy/BrandImpactSection1";
import Banner from "./sections/Banner";
import Section2 from "./sections/Section2";

interface NormalizedBlog {
    title: string;
    slug: string;
    created_at: string;
    banner: string;
}
function BlogsFetchByTags({ title, blogs }: { title: string, blogs: any[] }) {
    function normalizeBlogs(blogs: any[]): NormalizedBlog[] {
        return blogs.map((blog: any) => ({
            title: blog.title || blog.blogTitle,
            slug: blog.slug || blog.blogSlug,
            created_at: blog.created_at || blog.createdAt,
            banner: blog.banner || blog.blogBanner || blog.blog_image,
        }));
    }
    const normalizedBlogs = normalizeBlogs(blogs);
    
    return (
        <>
            <Banner title={title} />
            <Section2 all_blogs={normalizedBlogs} />
            {/* <Section3 /> */}
            <div className="w-full pb-[35px] lg:pb-[70px]"> 
                <BrandImpactSection1 />
            </div>
        </>
    )
}


export default BlogsFetchByTags;