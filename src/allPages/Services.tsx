// import ProjectSwiper from "./Homepage/ProjectSwiper";
// import ServiceFirst from "./servicePage/serviceFirst";
// import testimonials from "./servicePage/testimonials";
import SwiperHome from "./Homepage/SwiperHome";
// import Service from "./Homepage/service";
// import serviceImg from "./servicePage/serviceImg";


import React from 'react'
import ServiceFirst from "./serviceSecondPage/ServiceFirst";
import ServiceImg from "./serviceSecondPage/ServiceImg";

const Services = () => {
  return (
    <>
      <ServiceFirst/>
      <SwiperHome />
      {/* <Service /> */}
      <ServiceImg/>
    </>
  )
}

export default Services