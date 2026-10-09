import Section1 from "@/components/home-v3/services/layer-1/Section1";
import Section2 from "@/components/home-v3/services/layer-1/Section2";
import Section3 from "@/components/home-v3/services/layer-1/Section3";
import Section4 from "@/components/home-v3/services/layer-1/Section4";
import Section5 from "@/components/home-v3/services/layer-1/Section5";
import Section6 from "@/components/home-v3/services/layer-1/Section6";
import Section7 from "@/components/home-v3/services/layer-1/Section7";
import Section8 from "@/components/home-v3/services/layer-1/Section8";
import BrandImpactSection2 from "@/components/copy/BrandImpactSection2";

async function Page() {



    return (
        <>
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
            <Section7 />
            {/* <Section8 />  */}
            <BrandImpactSection2/>
        </>
    )
}

export default Page;