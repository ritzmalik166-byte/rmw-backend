import Banner from "./sections/Banner";
import Section2 from "./sections/Section2";
import BrandImpactSection1 from "../copy/BrandImpactSection1";

function CategoriesSection({ slug, blogs }: { slug: string, blogs: any[] }) {
    return (
        <>
            <Banner slug={slug} />
            <Section2 all_blogs={blogs} />
            <div className="w-full pb-[35px] lg:pb-[70px]">
                <BrandImpactSection1 />
            </div>
        </>
    )
}

export default CategoriesSection;