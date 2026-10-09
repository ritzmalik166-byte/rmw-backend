import dynamic from "next/dynamic";
import Clients from "../influencer-marketing-agency-in-india/Clients";
import Banner from "./sections/Banner";
import Section2 from "./sections/Section2";
import Section2M from "./sections/Section2M";

const Section3 = dynamic(() => import("./sections/Section3"));
const Section4 = dynamic(() => import("./sections/Section4"));
const Section5 = dynamic(() => import("./sections/Section5"));
const Section5M = dynamic(() => import("./sections/Section5M"));
const Section6 = dynamic(() => import("./sections/Section6"));
const Section7 = dynamic(() => import("./sections/Section7"));
const Section8 = dynamic(() => import("./sections/Section8"));
const Section9 = dynamic(() => import("./sections/Section9"));
const Section9M = dynamic(() => import("./sections/Section9M"));
const Section11 = dynamic(() => import("./sections/Section11"));
const Section12 = dynamic(() => import("./sections/Section12"));

function About() {
    return (
        <>
            <Banner />
            <div className="block md:hidden">
                <Section2M />
            </div>
            <div className="hidden md:block">
                <Section2 />
            </div>
            <Section3 />
            <Section4 />
            <div className="block md:hidden">
                <Section5M />
            </div>
            <div className="hidden md:block">
                <Section5 />
            </div>
            <Section6 />
            <Section7 />
            <Section8 />
            <div className="block md:hidden">
                <Section9M />
            </div>
            <div className="hidden md:block">
                <Section9 />
            </div>
            <Clients pd="pt-[35px] lg:pt-[70px]" />
            <Section11 />
            <Section12 />
        </>
    );
}

export default About;
