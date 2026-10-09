import Banner from "./sections/Banner";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";
import Section4 from "./sections/Section4";
import Section5 from "@/components/influencer-marketing-agency-in-india/Section5";
import Section6 from "./sections/Section6";
import Section7 from "@/components/content-marketing/Section7";
import Section8 from "./sections/Section8";
import { getServiceThirdData } from "@/lib/getServiceThirdLayerData";
import BrandImpactSection1 from "../copy/BrandImpactSection1";
import WhiteLayer from "../home-v3/services/WhiteLayer";
async function ServiceInner({
    slug,
    parentServiceLink,
}: {
    slug: string;
    parentServiceLink?: string;
}) {
    const res = await getServiceThirdData(slug, parentServiceLink);

    return (
        <>
            <Banner slug={slug}/>
            <Section2 data={res}/>
            {/* <Section3 /> */}
            <WhiteLayer/>
            <Section4 />
            <Section5 />
            <Section6 />
            <Section7 text="Ready to Be Found Precisely When It Matters Most?" />
            {/* <Section8 /> */}
            <div className="py-[35px] lg:py-[70px]">
            <BrandImpactSection1 />
            </div>
        </>
    )
}

export default ServiceInner;

