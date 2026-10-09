import BrandImpactSection1 from "@/components/copy/BrandImpactSection1";
import Section1 from "@/components/work-html2/Section1"
import Section2 from "@/components/work-html2/Section2" 
export default function Page() {
  return (
    <main className="w-full overflow-x-hidden">
      <Section1/>
      <Section2/>  
      <div className="w-full pb-[35px] lg:pb-[70px]">
        <BrandImpactSection1/>
      </div>
    </main>
  );
}
