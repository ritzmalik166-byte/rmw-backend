// "use client";
// import { useSplitText } from "@/hooks/useSplitText";
// import Link from "next/link";

// const ServiceMainTeam = () => {

//   const textRefs = useSplitText();

//   return (
//     <div
//       className="elementor-element elementor-element-070298b e-con-full e-flex e-con e-parent e-lazyloaded"
//       data-id="070298b"
//       data-element_type="container"
//     >
//       <div
//         className="elementor-element elementor-element-f3715f5 e-con-full e-flex e-con e-child"
//         data-id="f3715f5"
//         data-element_type="container"
//       >
//         <div
//           className="elementor-element elementor-element-f91a4f7 elementor-widget elementor-widget-team"
//           data-id="f91a4f7"
//           data-element_type="widget"
//           data-widget_type="team.default"
//         >
//           <div className="elementor-widget-container">
//             <section className="tp-team-area tp-team__2 p-relative pt-150 pb-160">
//               <div className="tp-team__2-shape">
//                 <img
//                   decoding="async"
//                   src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/team-2-shape.png"
//                   alt=""
//                 />
//               </div>
//               <div className="container">
//                 <div className="row">
//                   <div className="col-xl-12">
//                     <div
//                     ref={(el) => { if (el) textRefs.current.push(el) }}
//                       className="tp-team__title-box mb-55 d-flex justify-content-center tp-split__text tp-split__in-right"
//                       style={{ perspective: "400px" }}
//                     >
//                       <div
//                       ref={(el) => { if (el) textRefs.current.push(el) }}
//                         className="tp-split__line"
//                         style={{
//                           display: "block",
//                           textAlign: "start",
//                           position: "relative",
//                         }}
//                       >
//                         <h3 className="tp-section-title">
//                           <div
//                             style={{
//                               position: "relative",
//                               display: "inline-block",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 position: "relative",
//                                 display: "inline-block",
//                                 translate: "none",
//                                 rotate: "none",
//                                 scale: "none",
//                                 transform: "none",
//                                 opacity: 1,
//                               }}
//                             >
//                               M
//                             </div>
//                             <div
//                               style={{
//                                 position: "relative",
//                                 display: "inline-block",
//                                 translate: "none",
//                                 rotate: "none",
//                                 scale: "none",
//                                 transform: "none",
//                                 opacity: 1,
//                               }}
//                             >
//                               e
//                             </div>
//                             <div
//                               style={{
//                                 position: "relative",
//                                 display: "inline-block",
//                                 translate: "none",
//                                 rotate: "none",
//                                 scale: "none",
//                                 transform: "none",
//                                 opacity: 1,
//                               }}
//                             >
//                               e
//                             </div>
//                             <div
//                               style={{
//                                 position: "relative",
//                                 display: "inline-block",
//                                 translate: "none",
//                                 rotate: "none",
//                                 scale: "none",
//                                 transform: "none",
//                                 opacity: 1,
//                               }}
//                             >
//                               t
//                             </div>
//                           </div>
//                           <div
//                             style={{
//                               position: "relative",
//                               display: "inline-block",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 position: "relative",
//                                 display: "inline-block",
//                                 translate: "none",
//                                 rotate: "none",
//                                 scale: "none",
//                                 transform: "none",
//                                 opacity: 1,
//                               }}
//                             >
//                               O
//                             </div>
//                             <div
//                               style={{
//                                 position: "relative",
//                                 display: "inline-block",
//                                 translate: "none",
//                                 rotate: "none",
//                                 scale: "none",
//                                 transform: "none",
//                                 opacity: 1,
//                               }}
//                             >
//                               u
//                             </div>
//                             <div
//                               style={{
//                                 position: "relative",
//                                 display: "inline-block",
//                                 translate: "none",
//                                 rotate: "none",
//                                 scale: "none",
//                                 transform: "none",
//                                 opacity: 1,
//                               }}
//                             >
//                               r
//                             </div>
//                             <div
//                               style={{
//                                 position: "relative",
//                                 display: "inline-block",
//                                 translate: "none",
//                                 rotate: "none",
//                                 scale: "none",
//                                 transform: "none",
//                                 opacity: 1,
//                               }}
//                             >
//                               &nbsp;
//                             </div>
//                           </div>
//                           <span>
//                             <i>
//                               <div
//                                 style={{
//                                   position: "relative",
//                                   display: "inline-block",
//                                 }}
//                               >
//                                 <div
//                                   style={{
//                                     position: "relative",
//                                     display: "inline-block",
//                                     translate: "none",
//                                     rotate: "none",
//                                     scale: "none",
//                                     transform: "none",
//                                     opacity: 1,
//                                   }}
//                                 >
//                                   L
//                                 </div>
//                                 <div
//                                   style={{
//                                     position: "relative",
//                                     display: "inline-block",
//                                     translate: "none",
//                                     rotate: "none",
//                                     scale: "none",
//                                     transform: "none",
//                                     opacity: 1,
//                                   }}
//                                 >
//                                   e
//                                 </div>
//                                 <div
//                                   style={{
//                                     position: "relative",
//                                     display: "inline-block",
//                                     translate: "none",
//                                     rotate: "none",
//                                     scale: "none",
//                                     transform: "none",
//                                     opacity: 1,
//                                   }}
//                                 >
//                                   g
//                                 </div>
//                                 <div
//                                   style={{
//                                     position: "relative",
//                                     display: "inline-block",
//                                     translate: "none",
//                                     rotate: "none",
//                                     scale: "none",
//                                     transform: "none",
//                                     opacity: 1,
//                                   }}
//                                 >
//                                   e
//                                 </div>
//                                 <div
//                                   style={{
//                                     position: "relative",
//                                     display: "inline-block",
//                                     translate: "none",
//                                     rotate: "none",
//                                     scale: "none",
//                                     transform: "none",
//                                     opacity: 1,
//                                   }}
//                                 >
//                                   n
//                                 </div>
//                                 <div
//                                   style={{
//                                     position: "relative",
//                                     display: "inline-block",
//                                     translate: "none",
//                                     rotate: "none",
//                                     scale: "none",
//                                     transform: "none",
//                                     opacity: 1,
//                                   }}
//                                 >
//                                   d
//                                 </div>
//                                 <div
//                                   style={{
//                                     position: "relative",
//                                     display: "inline-block",
//                                     translate: "none",
//                                     rotate: "none",
//                                     scale: "none",
//                                     transform: "none",
//                                     opacity: 1,
//                                   }}
//                                 >
//                                   s
//                                 </div>
//                               </div>
//                             </i>
//                           </span>
//                         </h3>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="tp-team__2-wrap">
//                   <div className="row">
//                     <div className="col-xl-4 col-lg-4 col-md-6 col-12">
//                       <div
//                         className="tp-team__2-item wow none animated"
//                         data-wow-duration="s"
//                         data-wow-delay="s"
//                         style={{ visibility: "visible" }}
//                       >
//                         <div className="tp-team__2-thumb fix mb-25">
//                           <img
//                             decoding="async"
//                             src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/team-2-1.jpg"
//                             alt=""
//                           />
//                           <div className="tp-team__2-social">
//                             <div className="tp-team__2-social-link">
//                               <Link rel="nofollow" target="_blank" href="#">
//                                 <i className="fab fa-twitter"></i>
//                               </Link>

//                               <Link rel="nofollow" target="_blank" href="#">
//                                 <i className="fab fa-facebook-f"></i>
//                               </Link>

//                               <Link rel="nofollow" target="_blank" href="#">
//                                 <i className="fab fa-instagram"></i>
//                               </Link>

//                               <Link rel="nofollow" target="_blank" href="#">
//                                 <i className="fab fa-linkedin-in"></i>
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="tp-team__2-content text-center">
//                           <span className="tp-team__2-designation">
                            
//                             CREATIVE DIRECTOR
//                           </span>
//                           <h3 className="tp-team__2-title">
//                             <Link
//                               href="/" target="_blank"
//                               target="_self"
//                               rel="nofollow"
//                             >
                              
//                               ESTHER HOWAR
//                             </Link>
//                           </h3>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-xl-4 col-lg-4 col-md-6 col-12">
//                       <div
//                         className="tp-team__2-item wow none animated"
//                         data-wow-duration="s"
//                         data-wow-delay="s"
//                         style={{ visibility: "visible" }}
//                       >
//                         <div className="tp-team__2-thumb fix mb-25">
//                           <img
//                             decoding="async"
//                             src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/team-2-2.jpg"
//                             alt=""
//                           />
//                           <div className="tp-team__2-social">
//                             <div className="tp-team__2-social-link">
//                               <Link rel="nofollow" target="_blank" href="#">
//                                 <i className="fab fa-twitter"></i>
//                               </Link>

//                               <Link rel="nofollow" target="_blank" href="#">
//                                 <i className="fab fa-facebook-f"></i>
//                               </Link>

//                               <Link rel="nofollow" target="_blank" href="#">
//                                 <i className="fab fa-instagram"></i>
//                               </Link>

//                               <Link rel="nofollow" target="_blank" href="#">
//                                 <i className="fab fa-linkedin-in"></i>
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="tp-team__2-content text-center">
//                           <span className="tp-team__2-designation">
                            
//                             MARKETING STAFF
//                           </span>
//                           <h3 className="tp-team__2-title">
//                             <Link
//                               href="/" target="_blank"
//                               target="_self"
//                               rel="nofollow"
//                             >
                              
//                               DWONA MEXBO
//                             </Link>
//                           </h3>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-xl-4 col-lg-4 col-md-6 col-12">
//                       <div
//                         className="tp-team__2-item wow none animated"
//                         data-wow-duration="s"
//                         data-wow-delay="s"
//                         style={{ visibility: "visible" }}
//                       >
//                         <div className="tp-team__2-thumb fix mb-25">
//                           <img
//                             decoding="async"
//                             src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/team-2-3.jpg"
//                             alt=""
//                           />
//                           <div className="tp-team__2-social">
//                             <div className="tp-team__2-social-link">
//                               <Link rel="nofollow" target="_blank" href="#">
//                                 <i className="fab fa-twitter"></i>
//                               </Link>

//                               <Link rel="nofollow" target="_blank" href="#">
//                                 <i className="fab fa-facebook-f"></i>
//                               </Link>

//                               <Link rel="nofollow" target="_blank" href="#">
//                                 <i className="fab fa-instagram"></i>
//                               </Link>

//                               <Link rel="nofollow" target="_blank" href="#">
//                                 <i className="fab fa-linkedin-in"></i>
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="tp-team__2-content text-center">
//                           <span className="tp-team__2-designation">
                            
//                             CREATIVE DIRECTOR
//                           </span>
//                           <h3 className="tp-team__2-title">
//                             <Link
//                               href="/" target="_blank"
//                               target="_self"
//                               rel="nofollow"
//                             >
                              
//                               MEORN DEXWA
//                             </Link>
//                           </h3>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="tp-team__2-action text-center mt-90">
//                     <Link
//                       className="tp-btn-secondary"
//                       href="/" target="_blank"
//                       rel="nofollow"
//                       target="_self"
//                     >
//                       Get More Team
//                     </Link>
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

// export default ServiceMainTeam;
