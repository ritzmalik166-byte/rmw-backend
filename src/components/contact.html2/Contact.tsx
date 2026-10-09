import dynamic from "next/dynamic";
import ContactConsultationProvider from "@/components/contact.html2/ContactConsultationProvider";
import Banner from "@/components/contact.html2/sections/Banner";
import Section2 from "./sections/Section2";

const Section3 = dynamic(() => import("./sections/Section3"));
const Section4 = dynamic(() => import("./sections/Section4"));
const SectionNew1 = dynamic(() => import("./sections/Section-new1"));
const Faq = dynamic(() => import("./sections/Faq"));
const Section5 = dynamic(
    () => import("../influencer-marketing-agency-in-india/Section5"),
);
const Section6 = dynamic(() => import("./sections/Section5"));
const Section7 = dynamic(() => import("./sections/Section7"));
const Section8 = dynamic(() => import("./sections/Section8"));
const Section9 = dynamic(() => import("./sections/Section9"));
const Section10 = dynamic(() => import("./sections/Section10"));

function Contact() {
    return (
        <ContactConsultationProvider>
            <main className="w-full overflow-x-hidden">
                <Banner />
                <Section2 />
                <Section4 />
                <SectionNew1 />
                <Section3 />
                <Faq />
                <Section5 />
                <Section6 />
                <Section7 />
                <Section8 />
                <Section9 />
                <Section10 />
            </main>
        </ContactConsultationProvider>
    );
}

export default Contact;
