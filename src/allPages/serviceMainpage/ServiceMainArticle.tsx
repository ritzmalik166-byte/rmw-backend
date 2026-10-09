// "use client"
// import { useSplitText } from "@/hooks/useSplitText";
// import Link from "next/link";

// const ServiceMainArticle = () => {

//   const textRefs = useSplitText();

//   return (
//     <div
//       className="elementor-element elementor-element-296b406 e-con-full e-flex e-con e-parent e-lazyloaded"
//       data-id="296b406"
//       data-element_type="container"
//     >
//       <div
//         className="elementor-element elementor-element-f3c0a3c e-con-full e-flex e-con e-child"
//         data-id="f3c0a3c"
//         data-element_type="container"
//       >
//         <div
//           className="elementor-element elementor-element-a2d5968 elementor-widget elementor-widget-blogpost"
//           data-id="a2d5968"
//           data-element_type="widget"
//           data-widget_type="blogpost.default"
//         >
//           <div className="elementor-widget-container">
//             <section className="tp-blog-area pt-145 pb-125">
//               <div className="container">
//                 <div className="tp-blog__top mb-65">
//                   <div className="row align-items-center">
//                     <div className="col-xl-8 col-lg-8 col-md-8">
//                       <div className="tp-blog__title-box">
//                         <h3
//                         ref={(el) => { if (el) textRefs.current.push(el) }}
//                           className="tp-section-title tp-split__text tp-split__in-right"
//                           style={{ perspective: "400px" }}
//                         >
//                           <div
//                             className="tp-split__line"
//                             style={{
//                               display: "block",
//                               textAlign: "start",
//                               position: "relative",
//                             }}
//                           >
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
//                                 L
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
//                                 A
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
//                                 T
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
//                                 E
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
//                                 S
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
//                                 T
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
//                                     A
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
//                                     R
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
//                                     T
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
//                                     I
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
//                                     C
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
//                                     E
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
//                                     S
//                                   </div>
//                                 </div>
//                               </i>
//                             </span>
//                           </div>
//                         </h3>
//                       </div>
//                     </div>
//                     <div className="col-xl-4 col-lg-4 col-md-4">
//                       <div className="tp-blog__action text-md-end">
//                         <Link
//                           className="tp-btn-primary"
//                           href="/blogs"
//                           target="_self"
//                           rel="nofollow"
//                         >
//                           <span> More about us </span>
//                           <i className="fal fa-arrow-right"></i>
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-xl-12">
//                     <div className="tp-blog__item">
//                       <div
//                         className="tp-blog__bg"
//                         data-background="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/blog-2-bg-1.jpg"
//                         style={{
//                           backgroundImage:
//                             "url(https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/blog-2-bg-1.jpg)",
//                         }}
//                       ></div>
//                       <div className="tp-blog__shape"></div>
//                       <div className="row align-items-center justify-content-between">
//                         <div className="col-xl-9 col-lg-9">
//                           <div className="tp-blog__content d-sm-flex align-items-center">
//                             <div className="tp-blog__thumb tp-blog-post-widget-thumb">
//                               <Link href="/" target="_blank">
//                                 <img
//                                   decoding="async"
//                                   src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/blog-post-6.png"
//                                   alt=""
//                                 />
//                               </Link>
//                             </div>
//                             <div className="tp-blog__text">
//                               <div className="tp-blog__meta-box d-flex align-items-center">
//                                 <span className="tp-blog__meta-date">
//                                   24 Sep 2024
//                                 </span>
//                                 <span className="tp-blog__meta-comment">
//                                   COMMENTS (0)
//                                 </span>
//                               </div>
//                               <h3 className="tp-blog__title">
//                                 <Link href="/" target="_blank">
//                                   Transform Your Business with Expert Digital
//                                 </Link>
//                               </h3>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="col-xl-3 col-lg-3">
//                           <div className="tp-blog__button p-relative text-lg-end">
//                             <Link
//                               className="tp-btn-blog"
//                               href="/" target="_blank"
//                             >
//                               <span>BLOG DETAILS</span>
//                               <b>
//                                 <i className="fas fa-long-arrow-right"></i>
//                               </b>
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="tp-blog__item">
//                       <div
//                         className="tp-blog__bg"
//                         data-background="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/blog-2-bg-1.jpg"
//                         style={{
//                           backgroundImage:
//                             "url(https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/blog-2-bg-1.jpg)",
//                         }}
//                       ></div>
//                       <div className="tp-blog__shape"></div>
//                       <div className="row align-items-center justify-content-between">
//                         <div className="col-xl-9 col-lg-9">
//                           <div className="tp-blog__content d-sm-flex align-items-center">
//                             <div className="tp-blog__thumb tp-blog-post-widget-thumb">
//                               <Link href="/" target="_blank">
//                                 <img
//                                   decoding="async"
//                                   src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/blog-post-2.jpg"
//                                   alt=""
//                                 />
//                               </Link>
//                             </div>
//                             <div className="tp-blog__text">
//                               <div className="tp-blog__meta-box d-flex align-items-center">
//                                 <span className="tp-blog__meta-date">
//                                   24 Sep 2024
//                                 </span>
//                                 <span className="tp-blog__meta-comment">
//                                   COMMENTS (0)
//                                 </span>
//                               </div>
//                               <h3 className="tp-blog__title">
//                                 <Link href="/" target="_blank">
//                                   Boost Your Online Presence with Our
//                                 </Link>
//                               </h3>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="col-xl-3 col-lg-3">
//                           <div className="tp-blog__button p-relative text-lg-end">
//                             <Link
//                               className="tp-btn-blog"
//                               href="/" target="_blank"
//                             >
//                               <span>BLOG DETAILS</span>
//                               <b>
//                                 <i className="fas fa-long-arrow-right"></i>
//                               </b>
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="tp-blog__item">
//                       <div
//                         className="tp-blog__bg"
//                         data-background="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/blog-2-bg-1.jpg"
//                         style={{
//                           backgroundImage:
//                             "url(https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/blog-2-bg-1.jpg)",
//                         }}
//                       ></div>
//                       <div className="tp-blog__shape"></div>
//                       <div className="row align-items-center justify-content-between">
//                         <div className="col-xl-9 col-lg-9">
//                           <div className="tp-blog__content d-sm-flex align-items-center">
//                             <div className="tp-blog__thumb tp-blog-post-widget-thumb">
//                               <Link href="/" target="_blank">
//                                 <img
//                                   decoding="async"
//                                   src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/09/blog-post-5.png"
//                                   alt=""
//                                 />
//                               </Link>
//                             </div>
//                             <div className="tp-blog__text">
//                               <div className="tp-blog__meta-box d-flex align-items-center">
//                                 <span className="tp-blog__meta-date">
//                                   24 Sep 2024
//                                 </span>
//                                 <span className="tp-blog__meta-comment">
//                                   COMMENTS (0)
//                                 </span>
//                               </div>
//                               <h3 className="tp-blog__title">
//                                 <Link href="/" target="_blank">
//                                   Innovative Solutions for a Digital Tomorrow
//                                 </Link>
//                               </h3>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="col-xl-3 col-lg-3">
//                           <div className="tp-blog__button p-relative text-lg-end">
//                             <Link
//                               className="tp-btn-blog"
//                               href="/" target="_blank"
//                             >
//                               <span>BLOG DETAILS</span>
//                               <b>
//                                 <i className="fas fa-long-arrow-right"></i>
//                               </b>
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
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

// export default ServiceMainArticle;
