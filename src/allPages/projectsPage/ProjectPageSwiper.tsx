// "use client"

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/autoplay";
// import Link from "next/link";

// const ProjectPageSwiper = () => {
//   return (
//     <section className="tp-work-area p-relative fix pt-120 pb-160 tp-bg-className">
//       <div className="tp-work__shape">
//         <img
//           decoding="async"
//           src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/work-1-shape-1.png"
//           alt=""
          
//         />
//       </div>
//       <div className="container">
//         <div className="row">
//           <div className="col-md-12">
//             <div className="tp-work__title-box text-sm-center mb-55">
//               <h3 className="tp-section-title">
//                 SELECTED
//                 <span>
//                   <i>WORKS</i>
//                 </span>
//               </h3>
//             </div>
//           </div>
//         </div>
//         <div className="tp-work__wrap p-relative">
//           <div className="swiper-contianer fix tp-work__active swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
//             <Swiper
//             modules={[Autoplay]}
//             loop={true}
//             slidesPerView={1}
//             spaceBetween={30}
//             speed={1000}
//             autoplay={true}
//             effect={"slide"}
//               className="swiper-wrapper"
//               id="swiper-wrapper-2133abd4252b59ee"
//               aria-live="off"
//               style={{
//                 transform: 'translate3d(-2292px, 0px, 0px)',
//                 transitionDuration: '0ms'
//               }}>
//               <SwiperSlide
//               >
//                 <div className="tp-work__item p-relative">
//                   <div className="tp-work__thumb">
//                     <img
//                       decoding="async"  
//                       src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/work-1-1.jpg"
//                       alt=""

//                     />
//                   </div>
//                   <div className="tp-work__icon d-none d-md-block">
//                     <Link
//                       href="/" target="_blank"
//                       target=""
//                       rel=""
//                     >
//                       <span>
//                         <svg
//                           width="47"
//                           height="47"
//                           viewBox="0 0 47 47"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M2 45L42.3125 4.6875M2 2H45V45"
//                             stroke="currentColor"
//                             strokeWidth="2.5"
//                             strokeLinecap="square"
//                             strokeLinejoin="round"
//                           ></path>
//                         </svg>
//                       </span>
//                     </Link>
//                   </div>
//                   <div className="tp-work__content">
//                     <h3 className="tp-work__title">
//                       <Link href="/" target="_blank">
//                         Digital Marketing
//                       </Link>
//                     </h3>
//                     <span className="tp-work__subtitle">Art , Direction</span>
//                   </div>
//                 </div>
//               </SwiperSlide>
//               <SwiperSlide
                
//               >
//                 <div className="tp-work__item p-relative">
//                   <div className="tp-work__thumb">
//                     <img
//                       decoding="async"
//                       src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/work-1-1.jpg"
//                       alt=""
//                     />
//                   </div>
//                   <div className="tp-work__icon d-none d-md-block">
//                     <Link
//                       href="/" target="_blank"
//                       target=""
//                       rel=""
//                     >
//                       <span>
//                         <svg
//                           width="47"
//                           height="47"
//                           viewBox="0 0 47 47"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M2 45L42.3125 4.6875M2 2H45V45"
//                             stroke="currentColor"
//                             strokeWidth="2.5"
//                             strokeLinecap="square"
//                             strokeLinejoin="round"
//                           ></path>
//                         </svg>
//                       </span>
//                     </Link>
//                   </div>
//                   <div className="tp-work__content">
//                     <h3 className="tp-work__title">
//                       <Link href="/services/digital-marketing">
//                         Digital Marketing
//                       </Link>
//                     </h3>
//                     <span className="tp-work__subtitle">Art , Direction</span>
//                   </div>
//                 </div>
//               </SwiperSlide>
//               <SwiperSlide
//               >
//                 <div className="tp-work__item p-relative">
//                   <div className="tp-work__thumb">
//                     <img
//                       decoding="async"
//                       src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/work-1-2.jpg"
//                       alt=""
//                     />
//                   </div>
//                   <div className="tp-work__icon d-none d-md-block">
//                     <Link
//                       href="/" target="_blank"
//                       target=""
//                       rel=""
//                     >
//                       <span>
//                         <svg
//                           width="47"
//                           height="47"
//                           viewBox="0 0 47 47"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M2 45L42.3125 4.6875M2 2H45V45"
//                             stroke="currentColor"
//                             strokeWidth="2.5"
//                             strokeLinecap="square"
//                             strokeLinejoin="round"
//                           ></path>
//                         </svg>
//                       </span>
//                     </Link>
//                   </div>
//                   <div className="tp-work__content">
//                     <h3 className="tp-work__title">
//                       <Link href="/services/digital-marketing/">
//                         Digital Marketing
//                       </Link>
//                     </h3>
//                     <span className="tp-work__subtitle">Art , Direction</span>
//                   </div>
//                 </div>
//               </SwiperSlide>
//               <SwiperSlide
//               >
//                 <div className="tp-work__item p-relative">
//                   <div className="tp-work__thumb">
//                     <img
//                       decoding="async"
//                       src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/work-1-3.jpg"
//                       alt=""
//                     />
//                   </div>
//                   <div className="tp-work__icon d-none d-md-block">
//                     <Link
//                       href="/services/digital-marketing/"
//                       target=""
//                       rel=""
//                     >
//                       <span>
//                         <svg
//                           width="47"
//                           height="47"
//                           viewBox="0 0 47 47"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M2 45L42.3125 4.6875M2 2H45V45"
//                             stroke="currentColor"
//                             strokeWidth="2.5"
//                             strokeLinecap="square"
//                             strokeLinejoin="round"
//                           ></path>
//                         </svg>
//                       </span>
//                     </Link>
//                   </div>
//                   <div className="tp-work__content">
//                     <h3 className="tp-work__title">
//                       <Link href="/services/digital-marketing/">
//                         Digital Marketing
//                       </Link>
//                     </h3>
//                     <span className="tp-work__subtitle">Art , Direction</span>
//                   </div>
//                 </div>
//               </SwiperSlide>
//               <SwiperSlide
//               >
//                 <div className="tp-work__item p-relative">
//                   <div className="tp-work__thumb">
//                     <img
//                       decoding="async"
//                       src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/work-1-1.jpg"
//                       alt=""
//                     />
//                   </div>
//                   <div className="tp-work__icon d-none d-md-block">
//                     <Link
//                       href="/services/digital-marketing/"
//                       target=""
//                       rel=""
//                     >
//                       <span>
//                         <svg
//                           width="47"
//                           height="47"
//                           viewBox="0 0 47 47"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M2 45L42.3125 4.6875M2 2H45V45"
//                             stroke="currentColor"
//                             strokeWidth="2.5"
//                             strokeLinecap="square"
//                             strokeLinejoin="round"
//                           ></path>
//                         </svg>
//                       </span>
//                     </Link>
//                   </div>
//                   <div className="tp-work__content">
//                     <h3 className="tp-work__title">
//                       <Link href="/services/digital-marketing/">
//                         Digital Marketing
//                       </Link>
//                     </h3>
//                     <span className="tp-work__subtitle">Art , Direction</span>
//                   </div>
//                 </div>
//               </SwiperSlide>
//               <SwiperSlide
//               >
//                 <div className="tp-work__item p-relative">
//                   <div className="tp-work__thumb">
//                     <img
//                       decoding="async"
//                       src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/work-1-1.jpg"
//                       alt=""
//                     />
//                   </div>
//                   <div className="tp-work__icon d-none d-md-block">
//                     <Link
//                       href="/services/digital-marketing/"
//                       target=""
//                       rel=""
//                     >
//                       <span>
//                         <svg
//                           width="47"
//                           height="47"
//                           viewBox="0 0 47 47"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M2 45L42.3125 4.6875M2 2H45V45"
//                             stroke="currentColor"
//                             strokeWidth="2.5"
//                             strokeLinecap="square"
//                             strokeLinejoin="round"
//                           ></path>
//                         </svg>
//                       </span>
//                     </Link>
//                   </div>
//                   <div className="tp-work__content">
//                     <h3 className="tp-work__title">
//                       <Link href="/services/digital-marketing/">
//                         Digital Marketing
//                       </Link>
//                     </h3>
//                     <span className="tp-work__subtitle">Art , Direction</span>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             </Swiper>
//             <span
//               className="swiper-notification"
//               aria-live="assertive"
//               aria-atomic="true"
//             ></span>
//           </div>
//           <div className="tp-work__dots d-none d-sm-block">
//             <div className="tp-pagination__dots swiper-pagination-clickable swiper-pagination-bullets">
//               <span
//                 className="swiper-pagination-bullet"
//                 role="button"
//                 aria-label="Go to slide 1"
//               ></span>
//               <span
//                 className="swiper-pagination-bullet swiper-pagination-bullet-active"
//                 role="button"
//                 aria-label="Go to slide 2"
//               ></span>
//               <span
//                 className="swiper-pagination-bullet"
//                 role="button"
//                 aria-label="Go to slide 3"
//               ></span>
//               <span
//                 className="swiper-pagination-bullet"
//                 role="button"
//                 aria-label="Go to slide 4"
//               ></span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProjectPageSwiper;
