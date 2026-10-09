// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import Link from "next/link";
// import Loader from "@/components/loader/Loader";
// import parse from "html-react-parser";
// import { IoSearchSharp } from "react-icons/io5";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";

// type RelatedBlog = {
//   id: number;
//   title: string;
//   slug: string;
//   blog_image: string;
//   created_at: string;
// };

// type Sidecard = {
//   id: number;
//   blog_image: string;
//   title: string;
//   slug: string;
//   created_at: string;
// };

// type BlogPost = {
//   id: number;
//   category_id: number;
//   title: string;
//   slug: string;
//   youtube_url: string;
//   yt_width: number;
//   yt_height: number;
//   meta_title: string;
//   meta_description: string;
//   meta_keywords: string;
//   blog_image: string;
//   description: string;
//   created_at: string;
// };

// const Article1 = () => {
//   const [article, setArticle] = useState<BlogPost | null>(null);
//   const [sidecard, setSidecard] = useState<Sidecard[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([]);

//   const params = useParams();
//   const blog_slug = params?.blogDetailPage as string;
//   const contentRef = useRef<HTMLDivElement>(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Search logic is already reactive via state
//   };

//   const filteredPosts = sidecard.filter((post) =>
//     post.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await axios.get(`/api/blog/${blog_slug}`);
//         const response_card = await axios.get(`/api/blog/sidecards`);
//         const related = await axios.get(`/api/blog/related/${blog_slug}`);
//         setRelatedBlogs(related.data.related);
//         setArticle(response.data.blog);
//         setSidecard(response_card.data); // ✅ Assumes response.data.blog is array);
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "An unknown error occurred"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlog();
//   }, [blog_slug]);

//   if (loading) return <Loader />;
//   if (error) return <p>Error: {error}</p>;
//   if (!article) return <p>No article found.</p>;

//   return (
//     <section className="pt-160" style={{ backgroundColor: "#f0f0f0" }}>
//       <div className="container">
//         <div className="row">
//           {/* Main Content */}
//           <div className="col-md-8" ref={contentRef}>
//             <div
//               className="text-black rounded shadow-sm"
//               style={{ backgroundColor: "#f2f2f2" }}
//             >
//               <img
//                 src={`/blogs/${article.blog_image}`}
//                 alt={article.slug}
//                 className="img-fluid rounded mb-3"
//               />
              
//               <div className="text-black mb-2 px-4">
//                 <i className="fas fa-calendar-alt me-2"></i>
//                 {new Intl.DateTimeFormat("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 }).format(new Date(article.created_at))}
//               </div>
//               <div className="blog_description px-4">
//                 {parse(article.description)}
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="col-md-4" style={{ backgroundColor: "#f0f0f0" }}>
//             <div
//               id="stickySidebar"
//               style={{
//                 position: "sticky",
//                 top: "120px",
//                 maxHeight: "75vh",
//                 overflowY: "auto",
//                 paddingRight: "8px",
//               }}
//             >
//               {/* Search */}
//               <div
//                 className="p-3 rounded shadow-sm mb-4"
//                 style={{ backgroundColor: "#1f1f1f" }}
//               >
//                 <h5 className="mb-3 text-white">Search</h5>
//                 <form onSubmit={handleSearch}>
//                   <div className="input-group">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Search..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     <button
//                       className="btn "
//                       style={{ backgroundColor: "#8a5a0d" }}
//                       type="submit"
//                     >
//                       <IoSearchSharp style={{ color: "white" }} />
//                     </button>
//                   </div>
//                 </form>
//               </div>

//               {/* Recent Posts */}
//               <div
//                 className="p-3 text-white rounded shadow-sm mb-4"
//                 style={{ backgroundColor: "#1f1f1f" }}
//               >
//                 <h5 className="mb-3 text-white">Recent Posts</h5>
//                 {filteredPosts.map((post) => (
//                   <div key={post.id} className="d-flex mb-3 gap-3">
//                     <Link href={`/${post.slug}`}>
//                       <img
//                         src={`/blogs/${post.blog_image}`}
//                         alt={post.title}
//                         className="rounded me-3"
//                         style={{
//                           width: "190px",
//                           height: "80px",
//                           objectFit: "cover",
//                         }}
//                       />
//                     </Link>
//                     <div>
//                       <h6 className="mb-1 text-white">
//                         <Link href={`/${post.slug}`}>{post.title}</Link>
//                       </h6>
//                       <small className="text-white">
//                         {new Intl.DateTimeFormat("en-US", {
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         }).format(new Date(post.created_at))}
//                       </small>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Categories */}
//               <div
//                 className="p-3 rounded text-white shadow-sm mb-4"
//                 style={{ backgroundColor: "#1f1f1f" }}
//               >
//                 <h5 className="mb-3 text-white">Categories</h5>
//                 <ul className="list-unstyled mb-0">
//                   <li>
//                     <Link href="/category/digital-marketing-agency">
//                       Digital Marketing Agency
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/category/artist-management-agency">
//                       Artist Management Agency
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/category/best-ad-agency">Best Ad Agency</Link>
//                   </li>
//                   <li>
//                     <Link href="/category/case-study">Case Study</Link>
//                   </li>
//                   <li>
//                     <Link href="/category/celebrity-endorsements-agency">
//                       Celebrity Endorsements Agency
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/category/fm-radio-advertising">
//                       FM Radio Advertising
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/category/graphic-designing-service">
//                       Graphic Designing Service
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/category/performance-marketing-agency">
//                       Performance Marketing Agency
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/category/print-advertising-agency">
//                       Print Advertising Agency
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/category/web-design-and-development">
//                       Web Design and Development
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Swiper Carousel */}
//       <div
//         style={{ width: "100vw", overflow: "hidden", padding: "5rem 0 3rem" }}
//       >
//         <Swiper
//           modules={[Autoplay]}
//           loop={true}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           speed={1000}
//           grabCursor={true}
//           spaceBetween={20}
//           breakpoints={{
//             0: { slidesPerView: 1, spaceBetween: 10 },
//             768: { slidesPerView: 2, spaceBetween: 15 },
//             1024: { slidesPerView: 3, spaceBetween: 20 },
//           }}
//           style={{ width: "90%", height: "350px", margin: "auto" }}
//         >
//           {relatedBlogs.map((image, index) => (
//             <SwiperSlide key={index}>
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   height: "100%",
//                 }}
//               >
//                 <Link href={`/${image.slug}`}>
//                   <img
//                     src={`/blogs/${image.blog_image}`}
//                     alt={image.title}
//                     loading="lazy"
//                     style={{ width: "100%", height: "80%", objectFit: "cover" }}
//                   />
//                   <h3
//                     style={{
//                       margin: "10px 0 0",
//                       fontSize: "1.2rem",
//                       textAlign: "center",
//                     }}
//                   >
//                     {image.title}
//                   </h3>
//                 </Link>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// };

// export default Article1;