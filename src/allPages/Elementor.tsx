"use client";

import dynamic from "next/dynamic";
import Home from "./Homepage/Home";
import Service from "./Homepage/Service";

// Lazy load below-the-fold components
const Footer = dynamic(() => import("@/components/footer/Footer"), { ssr: false });
const SwiperHome = dynamic(() => import("./Homepage/SwiperHome"), { ssr: false });
const Work = dynamic(() => import("./Homepage/Work"), { ssr: false });
const Projects = dynamic(() => import("./Homepage/Projects"), { ssr: false });
const ProjectSwiper = dynamic(() => import("./Homepage/ProjectSwiper"), { ssr: false });
const Awards = dynamic(() => import("./Homepage/Awards"), { ssr: false });
const Experience = dynamic(() => import("./Homepage/Experience"), { ssr: false });
const Feedback = dynamic(() => import("./Homepage/Feedback"), { ssr: false });
const IntersectionObserverClient = dynamic(() => import("./Homepage/IntersectionObserverClient"), { ssr: false });

export default function Elementor() {
  const data = [
    {
      title: "Digital Marketing",
      description:
        "Turning browsers into buyers isn’t magic. It’s precise digital persuasion...",
      link: "/services/digital-marketing",
    },
    {
      title: "Content Marketing",
      description:
        "Content without action is merely decoration...",
      link: "/services/contents-marketing",
    },
    {
      title: "(PPC) Advertising",
      description:
        "Why chase customers when you can strategically appear...",
      link: "/services/digital-marketing/ppc-google-ads-agency",
    },
    {
      title: "Web Designing & Development",
      description:
        "Your website is your digital handshake...",
      link: "/services/web-designing-and-development",
    },
  ];

  return (
    <div data-elementor-type="wp-page" data-elementor-id="17" className="elementor elementor-17">
      <IntersectionObserverClient />
      <Home />
      <SwiperHome />
      <Service data={data} />
      <Work />
      <Projects />
      <ProjectSwiper />
      <Awards />
      <Experience />
      <Feedback />
      <Footer />
    </div>
  );
}