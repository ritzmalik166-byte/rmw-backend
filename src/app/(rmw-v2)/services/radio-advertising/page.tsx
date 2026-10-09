import S6 from "@/components/home-v3/S6";
import Banner from "@/components/radio-advertising-services/Banner";
import Section2 from "@/components/radio-advertising-services/Section2";
import Section3 from "@/components/radio-advertising-services/Section3";
import Section4 from "@/components/radio-advertising-services/Section4";
import Section4Mobile from "@/components/radio-advertising-services/Section4Mobile";
import Section5 from "@/components/radio-advertising-services/Section5";
import Section6 from "@/components/radio-advertising-services/Section6";
import Section7 from "@/components/radio-advertising-services/Section7";
import S7 from "@/components/home-v3/S7";
// import Section9 from "@/components/print-advertising/Section9" ;
import BrandImpactSection2 from "@/components/copy/BrandImpactSection2";
import Section9 from "@/components/services-v3-subslug/layer-4/Section9";
function Page() {
    return (
        <>
            <Banner />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section4Mobile />
            <Section5 />
            <Section6 imgPath="/radio-advertising-page/radio-graphics.png" />
            <Section7 />
            <S6 padding="px-0" padding2="px-0"></S6>
            <S7></S7>
            {/* <Section9 /> */}
            <div className="pt-[40px] lg:pt-[70px]">
                <BrandImpactSection2 />
            </div>
            <Section9 />
        </>
    )
}

export default Page;