"use client";

import Banners from "./sections/Banners";
import CareersOpening from "./sections/CareersOpening";
import LeftSectionForm from "./sections/LeftSectionForm";
import Hireingprocess from "./sections/Hireingprocess";
import Textimonials from "@/components/influencer-marketing-agency-in-india/Section5";
import Blogs from "@/components/clients/sections/Blogs";
import BrandImpactSection2 from "@/components/copy/BrandImpactSection2";

 function Page() {


    return (
        <>
            <Banners/>
            <CareersOpening/>
            <LeftSectionForm/>
            <Hireingprocess/>
            <Textimonials/>
            <Blogs/>
            <BrandImpactSection2/>
            
        </>
    );
}

export default Page;