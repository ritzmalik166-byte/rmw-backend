
import Banner from '@/components/contact/Banner'
import Dreams from '@/components/contact/Dreams'
import ServiceCategory from '@/components/contact/ServiceCategory'
import LetsConnect from '@/components/contact/LetsConnect'
import Location from '@/components/contact/Location'
import TogetherTowardOneGoal from '@/components/contact/TogetherTowardOneGoal'
import Faq from '@/components/contact/Faq'
import Section6 from '@/components/influencer-marketing-agency-in-india/Clients'
import React from 'react'
import BrandImpactSection1 from '@/components/copy/BrandImpactSection1'
import S7 from '@/components/home-v3/S7'

export default function page() {
    return (
        <div>

            <Banner />
            {/* <ServiceCategory /> */}
            <Dreams />
            <LetsConnect />
            <TogetherTowardOneGoal />
            <Location />
            <Faq />
            <ServiceCategory />
            <Section6 />
            <S7 />
            <BrandImpactSection1 />
        </div>
    )
}
