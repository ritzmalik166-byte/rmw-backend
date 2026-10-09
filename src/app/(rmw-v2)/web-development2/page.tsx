import Section6 from '@/components/influencer-marketing-agency-in-india/Clients'
import About from '@/components/WebDevelopment/About'
import Banner from '@/components/WebDevelopment/Banner'
import Section7 from '@/components/home-v3/services/layer-1/Section7'
import BrandImpactSection1 from '@/components/copy/BrandImpactSection1'
import Section5 from '@/components/influencer-marketing-agency-in-india/Section5'
import SectionT from '@/components/content-marketing/Section7'
import React from 'react'
import Experience from '@/components/WebDevelopment/Experience'
import NewS2 from '../new-home/sections/NewS2'
import WhatWeProvide from '@/components/WebDevelopment/WhatWeProvide'
import DevMatters from '@/components/WebDevelopment/DevMatters'
import Stats from '@/components/WebDevelopment/Stats'

export default function page() {
    return (
        <div className='pb-8'>
            <Banner />
            <About />
            <WhatWeProvide />
            <Experience />
            <Stats />
            <DevMatters />
            <Section6 />
            <SectionT text='Ready to Transform Your Website from Ordinary to Unforgettable?' />
            <Section5 />
            <Section7 />
            <BrandImpactSection1 />
        </div>
    )
}
