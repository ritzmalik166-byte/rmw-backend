

import dynamic from "next/dynamic";
import ServiceMainHero from './ServiceMainHero';
import Footer from '@/components/footer/Footer';

// Lazy load heavy or below-the-fold components
const ProjectSwiper = dynamic(() => import('../Homepage/ProjectSwiper'));
const ServiceMainIdentity = dynamic(() => import('./ServiceMainIdentity'));
const ServiceMainOurService = dynamic(() => import('./ServiceMainOurService'));
const ServiceMainAbout = dynamic(() => import('./ServiceMainAbout'));
const SwiperHome = dynamic(() => import('../Homepage/SwiperHome'));
const ProjectMarque = dynamic(() => import('../projectsPage/ProjectMarque'));
const ProjectNumbers = dynamic(() => import('../projectsPage/ProjectNumbers'));
const Awards = dynamic(() => import('../Homepage/Awards'));
// const Experts = dynamic(() => import("../aboutPage/Experts"), { ssr: false });
const ServiceMainTestimonial = dynamic(() => import('./ServiceMainTestimonial'));
const ServiceMainTalk = dynamic(() => import('./ServiceMainTalk'));

const ServiceMainPage = () => {
  return (
    <>
      {/* Above-the-fold content: Hero */}
      <ServiceMainHero />

      {/* Lazy-loaded components */}
      <ProjectSwiper />
      <ServiceMainIdentity />
      <ServiceMainOurService/>
      <ServiceMainAbout/>
      <SwiperHome/>
      <ProjectMarque />
      <ProjectNumbers />
      <Awards/>
      {/* <Experts/>  */}
      <ServiceMainTestimonial />
      <ServiceMainTalk />

      {/* Footer */}
      <Footer/>
    </>
  )
}

export default ServiceMainPage;
