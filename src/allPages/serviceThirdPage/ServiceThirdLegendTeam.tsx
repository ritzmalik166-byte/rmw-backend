// "use client";

// import { useSplitText } from "@/hooks/useSplitText";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";

// import "swiper/css/navigation";
// import { FreeMode, Navigation } from "swiper/modules";
// import Link from "next/link";

// const ServiceThirdLegendTeam = () => {
//   const textRefs = useSplitText();

//   return (
//     <div
//       className="elementor-element elementor-element-402f260 e-con-full e-flex e-con e-parent e-lazyloaded"
//       data-id="402f260"
//       data-element_type="container"
//     >
//       <div
//         className="elementor-element elementor-element-b09a893 e-con-full e-flex e-con e-child"
//         data-id="b09a893"
//         data-element_type="container"
//       >
//         <div
//           className="elementor-element elementor-element-1bcb009 elementor-widget elementor-widget-team"
//           data-id="1bcb009"
//           data-element_type="widget"
//           data-widget_type="team.default"
//         >
//           <div className="elementor-widget-container">
//             <section className="tp-team__3-area fix p-relative pt-120 pb-135 tp-bg-className">
//               <div className="tp-team__3-shape">
//                 <img
//                   decoding="async"
//                   src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/team-3-shap-1.png"
//                   alt=""
//                 />
//               </div>
//               <div className="container">
//                 <div className="tp-team__3-top p-relative mb-60">
//                   <div className="row align-items-center">
//                     <div className="col-md-6 col-sm-7">
//                       <div
//                         ref={(el) => {
//                           if (el) textRefs.current.push(el);
//                         }}
//                         className="tp-team__3-title-box mb-30 tp-split__text tp-split__in-right"
//                         style={{ perspective: "400px" }}
//                       >
//                         <div
//                           ref={(el) => {
//                             if (el) textRefs.current.push(el);
//                           }}
//                           className="tp-split__line"
//                           style={{
//                             display: "block",
//                             textAlign: "start",
//                             position: "relative",
//                           }}
//                         >
//                           <h3 className="tp-section-title">
//                             <div
//                               style={{
//                                 position: "relative",
//                                 display: "inline-block",
//                               }}
//                             >
//                               <div
//                                 style={{
//                                   position: "relative",
//                                   display: "inline-block",
//                                   translate: "none",
//                                   rotate: "none",
//                                   scale: "none",
//                                   transform: "none",
//                                   opacity: 1,
//                                 }}
//                               >
//                                 M
//                               </div>
//                               <div
//                                 style={{
//                                   position: "relative",
//                                   display: "inline-block",
//                                   translate: "none",
//                                   rotate: "none",
//                                   scale: "none",
//                                   transform: "none",
//                                   opacity: 1,
//                                 }}
//                               >
//                                 e
//                               </div>
//                               <div
//                                 style={{
//                                   position: "relative",
//                                   display: "inline-block",
//                                   translate: "none",
//                                   rotate: "none",
//                                   scale: "none",
//                                   transform: "none",
//                                   opacity: 1,
//                                 }}
//                               >
//                                 e
//                               </div>
//                               <div
//                                 style={{
//                                   position: "relative",
//                                   display: "inline-block",
//                                   translate: "none",
//                                   rotate: "none",
//                                   scale: "none",
//                                   transform: "none",
//                                   opacity: 1,
//                                 }}
//                               >
//                                 t
//                               </div>
//                             </div>
//                             <div
//                               style={{
//                                 position: "relative",
//                                 display: "inline-block",
//                               }}
//                             >
//                               <div
//                                 style={{
//                                   position: "relative",
//                                   display: "inline-block",
//                                   translate: "none",
//                                   rotate: "none",
//                                   scale: "none",
//                                   transform: "none",
//                                   opacity: 1,
//                                 }}
//                               >
//                                 O
//                               </div>
//                               <div
//                                 style={{
//                                   position: "relative",
//                                   display: "inline-block",
//                                   translate: "none",
//                                   rotate: "none",
//                                   scale: "none",
//                                   transform: "none",
//                                   opacity: 1,
//                                 }}
//                               >
//                                 u
//                               </div>
//                               <div
//                                 style={{
//                                   position: "relative",
//                                   display: "inline-block",
//                                   translate: "none",
//                                   rotate: "none",
//                                   scale: "none",
//                                   transform: "none",
//                                   opacity: 1,
//                                 }}
//                               >
//                                 r
//                               </div>
//                               <div
//                                 style={{
//                                   position: "relative",
//                                   display: "inline-block",
//                                   translate: "none",
//                                   rotate: "none",
//                                   scale: "none",
//                                   transform: "none",
//                                   opacity: 1,
//                                 }}
//                               >
//                                 &nbsp;
//                               </div>
//                             </div>
//                             <span>
//                               <i>
//                                 <div
//                                   style={{
//                                     position: "relative",
//                                     display: "inline-block",
//                                   }}
//                                 >
//                                   <div
//                                     style={{
//                                       position: "relative",
//                                       display: "inline-block",
//                                       translate: "none",
//                                       rotate: "none",
//                                       scale: "none",
//                                       transform: "none",
//                                       opacity: 1,
//                                     }}
//                                   >
//                                     L
//                                   </div>
//                                   <div
//                                     style={{
//                                       position: "relative",
//                                       display: "inline-block",
//                                       translate: "none",
//                                       rotate: "none",
//                                       scale: "none",
//                                       transform: "none",
//                                       opacity: 1,
//                                     }}
//                                   >
//                                     e
//                                   </div>
//                                   <div
//                                     style={{
//                                       position: "relative",
//                                       display: "inline-block",
//                                       translate: "none",
//                                       rotate: "none",
//                                       scale: "none",
//                                       transform: "none",
//                                       opacity: 1,
//                                     }}
//                                   >
//                                     g
//                                   </div>
//                                   <div
//                                     style={{
//                                       position: "relative",
//                                       display: "inline-block",
//                                       translate: "none",
//                                       rotate: "none",
//                                       scale: "none",
//                                       transform: "none",
//                                       opacity: 1,
//                                     }}
//                                   >
//                                     e
//                                   </div>
//                                   <div
//                                     style={{
//                                       position: "relative",
//                                       display: "inline-block",
//                                       translate: "none",
//                                       rotate: "none",
//                                       scale: "none",
//                                       transform: "none",
//                                       opacity: 1,
//                                     }}
//                                   >
//                                     n
//                                   </div>
//                                   <div
//                                     style={{
//                                       position: "relative",
//                                       display: "inline-block",
//                                       translate: "none",
//                                       rotate: "none",
//                                       scale: "none",
//                                       transform: "none",
//                                       opacity: 1,
//                                     }}
//                                   >
//                                     d
//                                   </div>
//                                   <div
//                                     style={{
//                                       position: "relative",
//                                       display: "inline-block",
//                                       translate: "none",
//                                       rotate: "none",
//                                       scale: "none",
//                                       transform: "none",
//                                       opacity: 1,
//                                     }}
//                                   >
//                                     s
//                                   </div>
//                                 </div>
//                               </i>
//                             </span>
//                           </h3>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-6 col-sm-5">
//                       <div className="tp-team__3-arrow text-sm-end">
//                         <button
//                           className="team-prev"
//                           aria-label="Previous slide"
//                           aria-controls="swiper-wrapper-b210b3eb231a6c870"
//                         >
//                           <FaArrowLeft style={{ fontSize: "20px" }} />
//                         </button>
//                         <button
//                           className="team-next"
//                           aria-label="Next slide"
//                           aria-controls="swiper-wrapper-b210b3eb231a6c870"
//                         >
//                           <FaArrowRight style={{ fontSize: "20px" }} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="tp-team__wrap">
//                   <div className="swiper-container tp-team__3-active swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
//                     <Swiper
//                       spaceBetween={30}
//                       slidesPerView={4}
//                       loop={true}
//                       autoplay={false}
//                       speed={1200}
//                       breakpoints={{
//                         1200: { slidesPerView: 4 },
//                         992: { slidesPerView: 3 },
//                         768: { slidesPerView: 2 },
//                         576: { slidesPerView: 1 },
//                         0: { slidesPerView: 1 },
//                       }}
//                       navigation={{
//                         nextEl: ".team-next",
//                         prevEl: ".team-prev",
//                       }}
//                       modules={[FreeMode, Navigation]}
//                       className="swiper-wrapper"
//                       id="swiper-wrapper-b210b3eb231a6c870"
//                       aria-live="polite"
//                     >
//                       <SwiperSlide
//                         className="swiper-slide swiper-slide-next"
//                         data-swiper-slide-index="2"
//                         role="group"
//                         aria-label="7 / 12"
//                         style={{ width: "256.5px", marginRight: "30px" }}
//                       >
//                         <div
//                           className="tp-team__3-item wow tpFadeInUp"
//                           data-wow-duration="1s"
//                           data-wow-delay=".7s"
//                           style={{
//                             visibility: "visible",
//                             animationDuration: "1s",
//                             animationDelay: "0.7s",
//                             animationName: "tpFadeInUp",
//                           }}
//                         >
//                           <div className="tp-team__3-thumb p-relative">
//                             <Link href="/" target="_blank" rel="nofollow" target="_self">
//                               <img
//                                 decoding="async"
//                                 src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/team-3-3.jpg"
//                                 alt=""
//                               />
//                             </Link>
//                             <div className="tp-team__3-action">
//                               <Link href="/" target="_blank" rel="nofollow" target="_self">
//                                 <span>
//                                   <svg
//                                     width="42"
//                                     height="42"
//                                     viewBox="0 0 42 42"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                   >
//                                     <path
//                                       d="M2.55859 39.3603L37.5912 4.32769M2.55859 1.99219H39.9267V39.3603"
//                                       stroke="currentColor"
//                                       strokeWidth="2.5"
//                                       strokeLinecap="square"
//                                       strokeLinejoin="round"
//                                     ></path>
//                                   </svg>
//                                 </span>
//                               </Link>
//                             </div>
//                             <div className="tp-team__3-social">
//                               <div className="tp-team__3-social-link">
//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fab fa-twitter"></i>
//                                 </Link>

//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fab fa-facebook-f"></i>
//                                 </Link>

//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fab fa-instagram"></i>
//                                 </Link>

//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fa-brands fa-youtube"></i>
//                                 </Link>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="tp-team__3-content d-flex align-items-center justify-content-between">
//                             <div className="tp-team__3-text">
//                               <h3 className="tp-team__3-title">
//                                 <Link href="/" target="_blank" rel="nofollow" target="_self">
                                  
//                                   Kristin Watson
//                                 </Link>
//                               </h3>
//                               <span className="tp-team__3-designation">
//                                 BACKEND DEVELOPER
//                               </span>
//                             </div>
//                             <div className="tp-team__3-link">
//                               <Link href="/" target="_blank" rel="nofollow" target="_self">
//                                 <span>
//                                   <i className="fas fa-long-arrow-right"></i>
//                                 </span>
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                       </SwiperSlide>
//                       <SwiperSlide
//                         className="swiper-slide"
//                         data-swiper-slide-index="3"
//                         role="group"
//                         aria-label="8 / 12"
//                         style={{ width: "256.5px", marginRight: "30px" }}
//                       >
//                         <div
//                           className="tp-team__3-item wow tpFadeInUp"
//                           data-wow-duration="1s"
//                           data-wow-delay=".9s"
//                           style={{
//                             visibility: "visible",
//                             animationDuration: "1s",
//                             animationDelay: "0.9s",
//                             animationName: "tpFadeInUp",
//                           }}
//                         >
//                           <div className="tp-team__3-thumb p-relative">
//                             <Link href="/" target="_blank" rel="nofollow" target="_self">
//                               <img
//                                 decoding="async"
//                                 src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/team-3-4.png"
//                                 alt=""
//                               />
//                             </Link>
//                             <div className="tp-team__3-action">
//                               <Link href="/" target="_blank" rel="nofollow" target="_self">
//                                 <span>
//                                   <svg
//                                     width="42"
//                                     height="42"
//                                     viewBox="0 0 42 42"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                   >
//                                     <path
//                                       d="M2.55859 39.3603L37.5912 4.32769M2.55859 1.99219H39.9267V39.3603"
//                                       stroke="currentColor"
//                                       strokeWidth="2.5"
//                                       strokeLinecap="square"
//                                       strokeLinejoin="round"
//                                     ></path>
//                                   </svg>
//                                 </span>
//                               </Link>
//                             </div>
//                             <div className="tp-team__3-social">
//                               <div className="tp-team__3-social-link">
//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fab fa-twitter"></i>
//                                 </Link>

//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fab fa-facebook-f"></i>
//                                 </Link>

//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fab fa-instagram"></i>
//                                 </Link>

//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fa-brands fa-youtube"></i>
//                                 </Link>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="tp-team__3-content d-flex align-items-center justify-content-between">
//                             <div className="tp-team__3-text">
//                               <h3 className="tp-team__3-title">
//                                 <Link href="/" target="_blank" rel="nofollow" target="_self">
                                  
//                                   Ronald Richards
//                                 </Link>
//                               </h3>
//                               <span className="tp-team__3-designation">
//                                 MARKETING OFFICER
//                               </span>
//                             </div>
//                             <div className="tp-team__3-link">
//                               <Link href="/" target="_blank" rel="nofollow" target="_self">
//                                 <span>
//                                   <i className="fas fa-long-arrow-right"></i>
//                                 </span>
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                       </SwiperSlide>
//                       <SwiperSlide
//                         className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-prev"
//                         data-swiper-slide-index="0"
//                         role="group"
//                         aria-label="9 / 12"
//                         style={{ width: "256.5px", marginRight: "30px" }}
//                       >
//                         <div
//                           className="tp-team__3-item wow tpFadeInUp"
//                           data-wow-duration="1s"
//                           data-wow-delay=".3s"
//                           style={{
//                             visibility: "visible",
//                             animationDuration: "1s",
//                             animationDelay: "0.3s",
//                             animationName: "tpFadeInUp",
//                           }}
//                         >
//                           <div className="tp-team__3-thumb p-relative">
//                             <Link href="/" target="_blank" rel="nofollow" target="_self">
//                               <img
//                                 decoding="async"
//                                 src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/team-3-1.png"
//                                 alt=""
//                               />
//                             </Link>
//                             <div className="tp-team__3-action">
//                               <Link href="/" target="_blank" rel="nofollow" target="_self">
//                                 <span>
//                                   <svg
//                                     width="42"
//                                     height="42"
//                                     viewBox="0 0 42 42"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                   >
//                                     <path
//                                       d="M2.55859 39.3603L37.5912 4.32769M2.55859 1.99219H39.9267V39.3603"
//                                       stroke="currentColor"
//                                       strokeWidth="2.5"
//                                       strokeLinecap="square"
//                                       strokeLinejoin="round"
//                                     ></path>
//                                   </svg>
//                                 </span>
//                               </Link>
//                             </div>
//                             <div className="tp-team__3-social">
//                               <div className="tp-team__3-social-link">
//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fab fa-twitter"></i>
//                                 </Link>

//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fab fa-facebook-f"></i>
//                                 </Link>

//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fab fa-instagram"></i>
//                                 </Link>

//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fa-brands fa-youtube"></i>
//                                 </Link>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="tp-team__3-content d-flex align-items-center justify-content-between">
//                             <div className="tp-team__3-text">
//                               <h3 className="tp-team__3-title">
//                                 <Link href="/" target="_blank" rel="nofollow" target="_self">
                                  
//                                   Alextina Ditarson
//                                 </Link>
//                               </h3>
//                               <span className="tp-team__3-designation">
//                                 GRAPHIC DESIGNER
//                               </span>
//                             </div>
//                             <div className="tp-team__3-link">
//                               <Link href="/" target="_blank" rel="nofollow" target="_self">
//                                 <span>
//                                   <i className="fas fa-long-arrow-right"></i>
//                                 </span>
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                       </SwiperSlide>
//                       <SwiperSlide
//                         className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
//                         data-swiper-slide-index="1"
//                         role="group"
//                         aria-label="10 / 12"
//                         style={{ width: "256.5px", marginRight: "30px" }}
//                       >
//                         <div
//                           className="tp-team__3-item wow tpFadeInUp"
//                           data-wow-duration="1s"
//                           data-wow-delay=".5s"
//                           style={{
//                             visibility: "visible",
//                             animationDuration: "1s",
//                             animationDelay: "0.5s",
//                             animationName: "tpFadeInUp",
//                           }}
//                         >
//                           <div className="tp-team__3-thumb p-relative">
//                             <Link href="/" target="_blank" rel="nofollow" target="_self">
//                               <img
//                                 decoding="async"
//                                 src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/team-3-2.png"
//                                 alt=""
//                               />
//                             </Link>
//                             <div className="tp-team__3-action">
//                               <Link href="/" target="_blank" rel="nofollow" target="_self">
//                                 <span>
//                                   <svg
//                                     width="42"
//                                     height="42"
//                                     viewBox="0 0 42 42"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                   >
//                                     <path
//                                       d="M2.55859 39.3603L37.5912 4.32769M2.55859 1.99219H39.9267V39.3603"
//                                       stroke="currentColor"
//                                       strokeWidth="2.5"
//                                       strokeLinecap="square"
//                                       strokeLinejoin="round"
//                                     ></path>
//                                   </svg>
//                                 </span>
//                               </Link>
//                             </div>
//                             <div className="tp-team__3-social">
//                               <div className="tp-team__3-social-link">
//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fab fa-twitter"></i>
//                                 </Link>

//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fab fa-facebook-f"></i>
//                                 </Link>

//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fab fa-instagram"></i>
//                                 </Link>

//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fa-brands fa-youtube"></i>
//                                 </Link>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="tp-team__3-content d-flex align-items-center justify-content-between">
//                             <div className="tp-team__3-text">
//                               <h3 className="tp-team__3-title">
//                                 <Link href="/" target="_blank" rel="nofollow" target="_self">
                                  
//                                   Robin Khan
//                                 </Link>
//                               </h3>
//                               <span className="tp-team__3-designation">
//                                 WEB DEVELOPER
//                               </span>
//                             </div>
//                             <div className="tp-team__3-link">
//                               <Link href="/" target="_blank" rel="nofollow" target="_self">
//                                 <span>
//                                   <i className="fas fa-long-arrow-right"></i>
//                                 </span>
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                       </SwiperSlide>
//                       <SwiperSlide
//                         className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next"
//                         data-swiper-slide-index="2"
//                         role="group"
//                         aria-label="11 / 12"
//                         style={{ width: "256.5px", marginRight: "30px" }}
//                       >
//                         <div
//                           className="tp-team__3-item wow tpFadeInUp"
//                           data-wow-duration="1s"
//                           data-wow-delay=".7s"
//                           style={{
//                             visibility: "visible",
//                             animationDuration: "1s",
//                             animationDelay: "0.7s",
//                             animationName: "tpFadeInUp",
//                           }}
//                         >
//                           <div className="tp-team__3-thumb p-relative">
//                             <Link href="/" target="_blank" rel="nofollow" target="_self">
//                               <img
//                                 decoding="async"
//                                 src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/team-3-3.jpg"
//                                 alt=""
//                               />
//                             </Link>
//                             <div className="tp-team__3-action">
//                               <Link href="/" target="_blank" rel="nofollow" target="_self">
//                                 <span>
//                                   <svg
//                                     width="42"
//                                     height="42"
//                                     viewBox="0 0 42 42"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                   >
//                                     <path
//                                       d="M2.55859 39.3603L37.5912 4.32769M2.55859 1.99219H39.9267V39.3603"
//                                       stroke="currentColor"
//                                       strokeWidth="2.5"
//                                       strokeLinecap="square"
//                                       strokeLinejoin="round"
//                                     ></path>
//                                   </svg>
//                                 </span>
//                               </Link>
//                             </div>
//                             <div className="tp-team__3-social">
//                               <div className="tp-team__3-social-link">
//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fab fa-twitter"></i>
//                                 </Link>

//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fab fa-facebook-f"></i>
//                                 </Link>

//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fab fa-instagram"></i>
//                                 </Link>

//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fa-brands fa-youtube"></i>
//                                 </Link>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="tp-team__3-content d-flex align-items-center justify-content-between">
//                             <div className="tp-team__3-text">
//                               <h3 className="tp-team__3-title">
//                                 <Link href="/" target="_blank" rel="nofollow" target="_self">
                                  
//                                   Kristin Watson
//                                 </Link>
//                               </h3>
//                               <span className="tp-team__3-designation">
//                                 BACKEND DEVELOPER
//                               </span>
//                             </div>
//                             <div className="tp-team__3-link">
//                               <Link href="/" target="_blank" rel="nofollow" target="_self">
//                                 <span>
//                                   <i className="fas fa-long-arrow-right"></i>
//                                 </span>
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                       </SwiperSlide>
//                       <SwiperSlide
//                         className="swiper-slide swiper-slide-duplicate"
//                         data-swiper-slide-index="3"
//                         role="group"
//                         aria-label="12 / 12"
//                         style={{ width: "256.5px", marginRight: "30px" }}
//                       >
//                         <div
//                           className="tp-team__3-item wow tpFadeInUp"
//                           data-wow-duration="1s"
//                           data-wow-delay=".9s"
//                           style={{
//                             visibility: "visible",
//                             animationDuration: "1s",
//                             animationDelay: "0.9s",
//                             animationName: "tpFadeInUp",
//                           }}
//                         >
//                           <div className="tp-team__3-thumb p-relative">
//                             <Link href="/" target="_blank" rel="nofollow" target="_self">
//                               <img
//                                 decoding="async"
//                                 src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/team-3-4.png"
//                                 alt=""
//                               />
//                             </Link>
//                             <div className="tp-team__3-action">
//                               <Link href="/" target="_blank" rel="nofollow" target="_self">
//                                 <span>
//                                   <svg
//                                     width="42"
//                                     height="42"
//                                     viewBox="0 0 42 42"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                   >
//                                     <path
//                                       d="M2.55859 39.3603L37.5912 4.32769M2.55859 1.99219H39.9267V39.3603"
//                                       stroke="currentColor"
//                                       strokeWidth="2.5"
//                                       strokeLinecap="square"
//                                       strokeLinejoin="round"
//                                     ></path>
//                                   </svg>
//                                 </span>
//                               </Link>
//                             </div>
//                             <div className="tp-team__3-social">
//                               <div className="tp-team__3-social-link">
//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fab fa-twitter"></i>
//                                 </Link>

//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fab fa-facebook-f"></i>
//                                 </Link>

//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fab fa-instagram"></i>
//                                 </Link>

//                                 <Link rel="nofollow" target="_blank" href="#">
//                                   <i className="fa-brands fa-youtube"></i>
//                                 </Link>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="tp-team__3-content d-flex align-items-center justify-content-between">
//                             <div className="tp-team__3-text">
//                               <h3 className="tp-team__3-title">
//                                 <Link href="/" target="_blank" rel="nofollow" target="_self">
                                  
//                                   Ronald Richards
//                                 </Link>
//                               </h3>
//                               <span className="tp-team__3-designation">
//                                 MARKETING OFFICER
//                               </span>
//                             </div>
//                             <div className="tp-team__3-link">
//                               <Link href="/" target="_blank" rel="nofollow" target="_self">
//                                 <span>
//                                   <i className="fas fa-long-arrow-right"></i>
//                                 </span>
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                       </SwiperSlide>
//                     </Swiper>
//                     <span
//                       className="swiper-notification"
//                       aria-live="assertive"
//                       aria-atomic="true"
//                     ></span>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceThirdLegendTeam;
