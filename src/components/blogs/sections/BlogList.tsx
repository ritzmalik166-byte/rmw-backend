import Section2 from "./Section2";

function BlogList({
    all_blogs,
    initialPage = 1,
}: {
    all_blogs: any[];
    initialPage?: number;
}) {
    return <Section2 all_blogs={all_blogs} initialPage={initialPage} />;
}

export default BlogList;
