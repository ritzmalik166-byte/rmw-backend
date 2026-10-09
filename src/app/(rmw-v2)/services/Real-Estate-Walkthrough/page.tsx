import React from 'react'
import Section1 from './sections/Section1'
import Section2 from './sections/section-2'
import Section3 from './sections/Section-3'
import Section4 from './sections/Section4'
import OurProcess from './sections/our-process'
import FAQ from './sections/FAQ'
import Section5 from '../../../../components/influencer-marketing-agency-in-india/Section5'
import Section7 from '../../../../components/radio-advertising-services/Section7'
import BrandImpactSection1 from '../../../../components/copy/BrandImpactSection1'
import DigitalMarketingSection7 from '../../../../components/home-v3/services/layer-1/Section7'
function RealEstateWalkthrough() {
  return (
    <div>
    <Section1/>
    <Section2/>
    <Section3/>
    <Section4/>
    <OurProcess />
    <FAQ />
    <Section5 />
    <Section7/>
    <DigitalMarketingSection7/>
    <div className="pb-[35px] lg:pb-[70px]">
      <BrandImpactSection1 />
      </div>
    </div>
  )
}

export default RealEstateWalkthrough