// "use client"

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
//  const Team = () => {

//   const [activeIndex, setActiveIndex] = useState(0);
//   const activeBgRef = useRef<HTMLDivElement>(null);
//   const widgetRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const items = widgetRef.current?.querySelectorAll(".tp-widget__item") || [];

//     const updateActiveBg = (el: HTMLElement | null) => {
//       if (!el || !activeBgRef.current || !widgetRef.current) return;
//       const topOffset = el.offsetTop;
//       const height = el.offsetHeight;
//       activeBgRef.current.style.top = `${topOffset}px`;
//       activeBgRef.current.style.height = `${height}px`;
//     };

//     const handleMouseEnter = (index: number) => {
//       setActiveIndex(index);
//       updateActiveBg(items[index] as HTMLElement);
//     };

//     const handleMouseLeave = () => {
//       updateActiveBg(items[activeIndex] as HTMLElement);
//     };

//     items.forEach((item, index) => {
//       item.addEventListener("mouseenter", () => handleMouseEnter(index));
//     });

//     widgetRef.current?.addEventListener("mouseleave", handleMouseLeave);

//     // Set initial active background
//     updateActiveBg(items[activeIndex] as HTMLElement);

//     return () => {
//       items.forEach((item) => {
//         item.removeEventListener("mouseenter", () => handleMouseEnter);
//       });
//       widgetRef.current?.removeEventListener("mouseleave", handleMouseLeave);
//     };
//   }, [activeIndex]);

//   return (
//     <div
//           className="elementor-element elementor-element-e49c4f4 e-con-full e-flex e-con e-parent"
//           data-id="e49c4f4"
//           data-element_type="container"
//         >
//           <div
//             className="elementor-element elementor-element-9103c08 e-con-full e-flex e-con e-child"
//             data-id="9103c08"
//             data-element_type="container"
//           >
//             <div
//               className="elementor-element elementor-element-526313f elementor-widget elementor-widget-team"
//               data-id="526313f"
//               data-element_type="widget"
//               data-widget_type="team.default"
//             >
//               <div className="elementor-widget-container">
//                 <section className="tp-team__area fix pt-140 pb-135 tp-bg-class">
//                   <div className="container">
//                     <div className="row">
//                       <div className="col-xl-12">
//                         <div className="tp-team__title-box mb-50">
//                           <span className="tp-section-title-pre  mb-25">
//                             Expert team
//                           </span>

//                           <div className="tp-section-title-wrap mb-20 d-md-flex align-items-center justify-content-between">
//                             <h3 className="tp-section-title">
//                               Expert Members <br />
//                               <span>
//                                 <i>Behind Us</i>
//                               </span>
//                             </h3>
//                             <Link
//                               href="https://etorisoft.com/wp/avtrix/team/"
//                               className="tp-btn-secondary mr-40 wow tpfadeUp"
//                               data-wow-duration=".9s"
//                               data-wow-delay=".1s"
//                               rel="nofollow"
//                               target="_self"
//                             >
                              
//                               more member
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-xl-12">
//                         <div
//                           className="tp-team__widgets tp-hover__widget p-relative wow tpFadeInUp"
//                           data-wow-duration=".9s"
//                           data-wow-delay=".3s"
//                         >
//                           <div className="tp-team__item tp-widget__item tp-hover__reveal-item ">
//                             <Link
//                               href="https://etorisoft.com/wp/avtrix/team-details/"
//                               target="_self"
//                               rel="nofollow"
//                             >
//                               <div className="tp-team__content d-md-flex justify-content-between">
//                                 <h3 className="tp-team__title">
//                                   01. Esther Hower
//                                   <span className="tp-team__tag">
//                                     <span>/</span>creative director
//                                   </span>
//                                 </h3>
//                                 <div className="tp-team__action">
//                                   Team Details
//                                   <span>
//                                     <i className="far fa-arrow-right"></i>
//                                   </span>
//                                 </div>
//                               </div>
//                             </Link>
//                             <div
//                               className="tp-hover__reveal-bg"
//                               data-background="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/08/team-3-5.jpg"
//                             ></div>
//                           </div>
//                           <div className="tp-team__item tp-widget__item tp-hover__reveal-item current">
//                             <Link
//                               href="https://etorisoft.com/wp/avtrix/team-details/"
//                               target="_self"
//                               rel="nofollow"
//                             >
//                               <div className="tp-team__content d-md-flex justify-content-between">
//                                 <h3 className="tp-team__title">
//                                   02. Robin Khan
//                                   <span className="tp-team__tag">
//                                     <span>/</span>Full Stack Developer
//                                   </span>
//                                 </h3>
//                                 <div className="tp-team__action">
//                                   Team Details
//                                   <span>
//                                     <i className="far fa-arrow-right"></i>
//                                   </span>
//                                 </div>
//                               </div>
//                             </Link>
//                             <div
//                               className="tp-hover__reveal-bg"
//                               data-background="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/08/team-3-6.jpg"
//                             ></div>
//                           </div>
//                           <div className="tp-team__item tp-widget__item tp-hover__reveal-item ">
//                             <Link
//                               href="https://etorisoft.com/wp/avtrix/team-details/"
//                               target="_self"
//                               rel="nofollow"
//                             >
//                               <div className="tp-team__content d-md-flex justify-content-between">
//                                 <h3 className="tp-team__title">
//                                   03. Jenny Wilson
//                                   <span className="tp-team__tag">
//                                     <span>/</span>Web Designer
//                                   </span>
//                                 </h3>
//                                 <div className="tp-team__action">
//                                   Team Details
//                                   <span>
//                                     <i className="far fa-arrow-right"></i>
//                                   </span>
//                                 </div>
//                               </div>
//                             </Link>
//                             <div
//                               className="tp-hover__reveal-bg"
//                               data-background="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/08/team-3-7.jpg"
//                             ></div>
//                           </div>
//                           <div className="tp-team__item tp-widget__item tp-hover__reveal-item current">
//                             <Link
//                               href="https://etorisoft.com/wp/avtrix/team-details/"
//                               target="_self"
//                               rel="nofollow"
//                             >
//                               <div className="tp-team__content d-md-flex justify-content-between">
//                                 <h3 className="tp-team__title">
//                                   04. Adam Smith
//                                   <span className="tp-team__tag">
//                                     <span>/</span>Digital Marketer
//                                   </span>
//                                 </h3>
//                                 <div className="tp-team__action">
//                                   Team Details
//                                   <span>
//                                     <i className="far fa-arrow-right"></i>
//                                   </span>
//                                 </div>
//                               </div>
//                             </Link>
//                             <div
//                               className="tp-hover__reveal-bg"
//                               data-background="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/08/team-3-8.jpg"
//                             ></div>
//                           </div>
//                           <span className="active-bg"></span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </section>
//               </div>
//             </div>
//           </div>
//         </div>
//   )
// }

// export default Team
