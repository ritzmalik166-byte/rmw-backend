import Banner from "./sections/Banner";
import Section2 from "./sections/Section2";


function BlogInner({ slug , category, blog, categoryName, all_categories, latest_3_blogs, related_blogs, all_blogs }: { slug: string, category: string, blog: any, categoryName: string, all_categories: any, latest_3_blogs: any, related_blogs: any, all_blogs: any }) {
  
    return (
        <>
            <Banner title={blog?.title || blog?.blogTitle || ""} />
            <Section2 slug={slug} category={category} blog={blog} all_categories={all_categories} related_blogs={related_blogs} all_blogs={all_blogs} />
        </>
    )
  }

export default BlogInner;