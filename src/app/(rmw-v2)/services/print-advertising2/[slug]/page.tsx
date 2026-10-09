import Banner from "@/components/print-advertising/Banner";
import Section2 from "@/components/print-advertising/slug/Section2";
import Section3 from "@/components/print-advertising/Section3";
import Section4 from "@/components/print-advertising/Section4";
import Section5 from "@/components/print-advertising/Section5";
import Section6 from "@/components/print-advertising/Section6";
import Section7 from "@/components/print-advertising/Section7";
import S6 from "@/components/home-v3/S6";
import S7 from "@/components/home-v3/S7";
import Section9 from "@/components/print-advertising/Section9";

function Page() {
    return (
        <>
        <Banner /> 
        <Section2 />

        {/* Copied Sections  */}
        <Section7 />
        <S6 padding="lg:px-0 md:px-6" padding2="lg:px-0 md:px-6"></S6>
        <S7></S7>
        <Section9 />
        </>
    )
}

export default Page;