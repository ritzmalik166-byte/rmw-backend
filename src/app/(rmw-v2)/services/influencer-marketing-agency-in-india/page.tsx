// import PageAnimations from "@/app/(rmw-v2)/components/PageAnimations";
import Section1 from "@/components/influencer-marketing-agency-in-india/Section1";
import Section2 from "@/components/influencer-marketing-agency-in-india/Section2";
import Section3 from "@/components/influencer-marketing-agency-in-india/Section3";
import Section4 from "@/components/influencer-marketing-agency-in-india/Section4";
import Section5 from "@/components/influencer-marketing-agency-in-india/Section5";
import Section6 from "@/components/influencer-marketing-agency-in-india/Section6";
import Section7 from "@/components/influencer-marketing-agency-in-india/Section7";
import Section8 from "@/components/influencer-marketing-agency-in-india/Section8";
import BrandImpactSection1 from "@/components/copy/BrandImpactSection1";
// import Section9 from "@/components/services-v3-subslug/layer-4/Section9";
export default function Page() {
  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      {/* <Section7 /> */}
      {/* <Section8 />  */}
      <div className="pb-[35px] lg:pb-[70px]">
      <BrandImpactSection1 />
      </div>
    </>
  );
}
