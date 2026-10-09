"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { BsArrowRight } from "react-icons/bs";
import { gsap } from "gsap";
import Link from "next/link";

type BlogCard = {
  img: string;
  title: string;
  link: string;
};

const blogsData: BlogCard[] = [
  {
    img: "/new-page/s10/b1.jpg",
    title: "7 Ways a Blog Can Help Your Business Right Now",
    link: "/blog/7-ways-blog-help-business",
  },
  {
    img: "/new-page/s10/b2.png",
    title: "Building Your Brand Identity in the Digital Age",
    link: "/blog/building-brand-identity",
  },
  {
    img: "/new-page/s10/b3.jpg",
    title: "Content Marketing: From Strategy to Execution",
    link: "/blog/content-marketing-strategy",
  },
];

function S10() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation for section
      gsap.fromTo(
        sectionRef.current,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );

      // Stagger animation for cards
      gsap.fromTo(
        ".blog-card",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.4,
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-screen min-h-[724px] flex justify-center items-center py-12 sm:py-16 md:py-20 lg:py-24 overflow-x-hidden bg-white"
    >
      <div className="w-[90%] max-w-[1400px] flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        {/* Header */}
        <div className="w-full text-center">
          <h2 className="font-[600] text-[32px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-[1.2] text-[#464646]">
            The Ritz INDIA <span className="text-[#D4A574]">Blog</span>
          </h2>
        </div>

        {/* Cards Grid Container */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-6">
            {blogsData.map((blog, idx) => (
              <Link
                key={`blog-${idx}`}
                href={blog.link}
                title={blog.title}
                className="blog-card w-full h-[380px] sm:h-[400px] md:h-[430px] lg:h-[456px] flex flex-col justify-between rounded-t-[20px] sm:rounded-t-[22px] md:rounded-t-[24px] overflow-hidden bg-white border border-[#E5E7EB] hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="w-full h-[220px] sm:h-[240px] md:h-[280px] lg:h-[322px] relative overflow-hidden">
                  <Image
                    src={blog.img}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Content Container */}
                <div className="flex flex-col justify-between flex-1 px-4 sm:px-5 md:px-6 py-4 sm:py-5">
                  {/* Title */}
                  <div className="flex-1 flex items-start">
                    <h2 className="font-[600] text-[#292929] text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] leading-[1.4] line-clamp-2 group-hover:text-[#D4A574] transition-colors duration-300">
                      {blog.title}
                    </h2>
                  </div>

                  {/* Read More Section */}
                  <div className="flex justify-end items-center mt-3 sm:mt-4 gap-1">
                    <p className="font-[600] text-[14px] sm:text-[15px] md:text-[16px] text-[#D4A574]">
                      Read More
                    </p>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                      <BsArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A574]" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default S10;
