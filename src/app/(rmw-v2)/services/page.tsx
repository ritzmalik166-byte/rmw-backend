import Section1 from '@/components/home-v3/services/Section1'
import Section2 from '@/components/home-v3/services/Section2'
import Section3 from '@/components/home-v3/services/Section3'; 
// import callServicesData from '@/lib/getServicePageData';



export default async function ServicePage1() {
    // const {data} = await callServicesData();

    return (
        <>
            <Section1 />
            <Section2 />
            <Section3 servicesData={[]}></Section3>
            
        </>
    )
}
