import Banner from "./sections/Banner";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";
import Section4 from "./sections/Section4";
{/* Section 5   Import From Creative Services Inner Page*/ }
import Blogs from "./sections/Blogs";
import Section5 from "@/components/influencer-marketing-agency-in-india/Section5";
import BrandImpactSection1 from "@/components/copy/BrandImpactSection1";

type ClientsProps = {
    logos: string[];
};

function Clients({ logos }: ClientsProps) {
    return (
        <>
            <Banner />
            <Section2 />
            <Section3 logos={logos} />
            <Section4 />
            <Section5 />
            <Blogs />
            <BrandImpactSection1 />
        </>
    )
}

export default Clients;