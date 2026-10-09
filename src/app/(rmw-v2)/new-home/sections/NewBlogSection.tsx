"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BsEyeFill } from "react-icons/bs";
import { RiEyeCloseFill } from "react-icons/ri";
import gsap from "gsap";
import axios from "axios";

interface Blog {
  blogBanner: string;
  createdAt: string;
  blogTitle: string;
  _id: string;
  blogSlug: string;
  blogDescription:string;
}

// Helper function to convert UTC date to Indian date format (date only)
const formatIndianDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
 
    // Format as DD MMM YYYY (e.g., "15 Jan 2025") in Indian timezone
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'Asia/Kolkata'
    };
    
    return date.toLocaleDateString('en-IN', options);
  } catch (error) {
    // If date parsing fails, return original string
    return dateString;
  }
};

function NewBlogSection() {

  const [blogsData, setBlogsData] = useState<Blog[]>([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get("/api/ritz_blogs/get-all-blogs");
      // Exttract Oly 3 Latest Blogs
      const data = response.data.allBlogs.slice(0, 3);
      setBlogsData(data);

    }
    fetchBlogs();
  }, [])

  const [activeIdx, setActiveIdx] = useState<Number>(0);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const eyeIconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const eyeParentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      if (activeIdx === i) {
      }
    }
  }, [activeIdx]);

  useEffect(() => {
    const timer = setTimeout(() => {
      eyeIconRefs.current.forEach((icon) => {
        if (icon) {
          gsap.set(icon, { x: 0, y: 0, transformOrigin: "center center" });
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const [blinkEye, setBlinkEye] = useState(false);

  useEffect(() => {
    if (blinkEye) {
      const interval = setInterval(() => {
        setBlinkEye((pr) => !pr);
      }, 2000);

      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        setBlinkEye((pr) => !pr);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [blinkEye]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    if (activeIdx !== idx) return;

    const overlay = overlayRefs.current[idx];
    const eyeParent = eyeParentRefs.current[idx];
    const eyeIcon = eyeIconRefs.current[idx];

    if (!overlay || !eyeParent || !eyeIcon) return;

    const overlayRect = overlay.getBoundingClientRect();
    const parentRect = eyeParent.getBoundingClientRect();

    const mouseX = e.clientX - overlayRect.left;
    const mouseY = e.clientY - overlayRect.top;

    const parentCenterX = parentRect.left - overlayRect.left + parentRect.width / 2;
    const parentCenterY = parentRect.top - overlayRect.top + parentRect.height / 2;

    const offsetX = mouseX - parentCenterX;
    const offsetY = mouseY - parentCenterY;

    const iconElement = eyeIcon.querySelector('svg');
    if (!iconElement) return;

    const iconRect = iconElement.getBoundingClientRect();

    const iconSize = Math.max(iconRect.width, iconRect.height);
    const parentSize = Math.min(parentRect.width, parentRect.height);

    const padding = 5;
    const maxOffset = (parentSize / 2) - (iconSize / 2) - padding - 50;

    const safeMaxOffset = Math.max(5, maxOffset); 
    const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    const limitedX = distance > safeMaxOffset ? (offsetX / distance) * safeMaxOffset : offsetX;
    const limitedY = distance > safeMaxOffset ? (offsetY / distance) * safeMaxOffset : offsetY;



    gsap.to(eyeIcon, {
      x: limitedX,
      y: limitedY,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (idx: number) => {
    const eyeIcon = eyeIconRefs.current[idx];
    if (!eyeIcon) return;

    gsap.to(eyeIcon, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section className="relative flex w-full justify-center overflow-hidden overflow-x-hidden bg-white py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#FFFFFF] to-[#F9FAFB] max-w-full">
      <div className="flex w-full max-w-[92%] flex-col gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 sm:gap-8">
          <div className="flex flex-col items-start gap-3 sm:gap-4 w-full md:w-auto">
            <button className="rounded-full bg-[#F3830E] px-4 py-1.5 text-[10px] font-semibold text-[#ffffff] sm:px-6 sm:py-2 sm:text-xs md:text-sm">
              Latest Insights
            </button>
            <h2 className="text-2xl font-semibold text-[#101828] leading-tight sm:text-3xl md:text-4xl lg:text-[48px] lg:leading-[1.1]">
              Here's what we've been <br className="hidden sm:block" /> up to
            </h2>
          </div>

          <div className="max-w-full md:max-w-lg w-full md:w-auto">
            <p className="text-sm text-[#4A5565] leading-relaxed sm:text-base md:text-lg text-start">
              Explore industry insights, expert tips, and creative inspiration
              from the Ritz team. Our blog is where we share knowledge, ideas,
              and what's next in digital.
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row sm:flex-wrap sm:justify-center md:justify-evenly lg:flex-nowrap lg:justify-start items-stretch sm:items-center gap-4 sm:gap-4 md:gap-5 lg:gap-6">
          {blogsData.length > 0 && blogsData.map((cd, idx) => {
            return (
              <Link
                key={idx}
                title={cd.blogTitle}
                href={`/${cd.blogSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveIdx(idx)}
                ref={cardRef}
                className={`group flex flex-col overflow-hidden rounded-[20px] sm:rounded-[24px] bg-white transition-[width,transform,box-shadow] duration-700 ease-in-out hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(16,24,40,0.15)] w-full 
                  sm:w-[calc(50%-8px)] md:w-[calc(50%-10px)] lg:flex-shrink-0 lg:w-[315px] 
                  h-auto lg:h-[540px] 
                  shadow-[0_4px_20px_rgba(16,24,40,0.08)] ${idx === activeIdx ? "lg:w-[calc(100%-680px)]" : ""
                  }`}
              >
                <div className="relative h-[200px] w-full overflow-hidden sm:h-[240px] md:h-[280px] lg:h-[322px] flex-shrink-0">
                  <Image
                    // src={cd.blogBanner}
                    src={`/api/images${cd.blogBanner.split("/images")[1]}`
                    }
                    alt={cd.blogTitle}
                    fill
                    className="sm:object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  {/* Absolute Positioned Div  */}
                  <button className="w-[90px] sm:w-[100px] md:w-[111px] z-20 h-[28px] sm:h-[32px] md:h-[36px] rounded-full absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 cursor-pointer font-[400] text-[11px] sm:text-[12px] md:text-[14px] text-[#ffffff] bg-[#F3830E]">
                    Latest Inside
                  </button>
                  {/* Absolute Positioned Overlay Div  */}
                  <div
                    ref={(el) => {
                      overlayRefs.current[idx] = el;
                    }}
                    onMouseMove={(e) => handleMouseMove(e, idx)}
                    onMouseLeave={() => handleMouseLeave(idx)}
                    className={`w-full h-full absolute z-10 top-0 left-0 flex justify-center items-center transition-opacity duration-500 ease-in-out ${activeIdx === idx
                      ? "opacity-100 bg-[#000000b8] pointer-events-auto"
                      : "opacity-0 bg-transparent pointer-events-none"
                      }`}
                  >
                    <div
                      ref={(el) => {
                        eyeParentRefs.current[idx] = el;
                      }}
                      className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] bg-white rounded-full flex justify-center items-center relative overflow-hidden"
                    >
                      <div
                        ref={(el) => {
                          eyeIconRefs.current[idx] = el;
                        }}
                        className="absolute inset-0 flex justify-center items-center"
                        style={{
                          willChange: "transform",
                        }}
                      >
                        <BsEyeFill
                          className={`text-gray-400 text-xl sm:text-xl md:text-3xl lg:text-5xl transform transition-all duration-300 ease-out ml-1 z-50 ${blinkEye
                            ? "scale-y-[1] mt-0"
                            : "scale-y-[0.1] mt-2 opacity-60"
                            }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                <div className="flex flex-col gap-2 sm:gap-3 px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 flex-1 flex-grow">
                  <p className="text-xs font-normal text-[#4A5565] sm:text-sm md:text-base">
                    {formatIndianDate(cd.createdAt)}
                  </p>
                  <h3 className="text-base font-semibold text-[#101828] leading-snug sm:text-lg md:text-xl lg:text-[20px] line-clamp-2">
                    {cd.blogTitle}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default NewBlogSection;
