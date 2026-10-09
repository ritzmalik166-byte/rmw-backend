import BrandImpactSection1 from "../copy/BrandImpactSection1";
import Banner from "./sections/Banner";
import Section2 from "./sections/Section2";

function Blog({ all_blogs }: { all_blogs: any[] }) {
    return (
        <>
            <Banner />
            <Section2 all_blogs={all_blogs} />
            <div className="w-full pb-[35px] lg:pb-[70px]">
                <BrandImpactSection1 />
            </div>
        </>
    );
}

export default Blog;