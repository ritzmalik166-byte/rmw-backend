"use client";
import styles from "../../styles/page.module.css";
import { ArrowBigRight, MoveRight, PlaneIcon, Play } from "lucide-react";
import Image from "next/image";
import React from "react";
import { gsap } from "gsap";

function S1() {
  const sliderImages = React.useMemo(
    () => [
      // {
      //   src: "/new-page/s1/bg-4.jpg",
      //   alt: "Ritz Media World branding showcase",
      // },
      {
        src: "/new-page/s1/bg-3.jpg",
        alt: "Ritz Media World branding showcase",
      },

      {
        src: "/new-page/s1/rmw-bg-1.webp",
        alt: "Creative campaign in action at Ritz Media World",
      },
      {
        src: "/new-page/s1/rmw-bg-2.webp",
        alt: "Ritz Media World branding showcase",
      },
      {
        src: "/new-page/s1/rmw-bg-3.webp",
        alt: "Ritz Media World branding showcase",
      },
    ],
    []
  );

  const heroRef = React.useRef<HTMLElement | null>(null);
  const trackRef = React.useRef<HTMLDivElement | null>(null);

  const extendedSlides = React.useMemo(
    () => [...sliderImages, sliderImages[0]],
    [sliderImages]
  );

  React.useEffect(() => {
    if (!trackRef.current || sliderImages.length < 2) {
      return;
    }

    const ctx = gsap.context(() => {
      const stepDuration = 1.4;
      const holdDuration = 3.6;
      const tl = gsap.timeline({ repeat: -1 });

      const slideWidthPercent = 100 / extendedSlides.length;

      tl.set(trackRef.current, { xPercent: 0 });

      for (let index = 1; index <= sliderImages.length; index += 1) {
        tl.to(trackRef.current, {
          xPercent: -slideWidthPercent * index,
          duration: stepDuration,
          ease: "power2.inOut",
        });

        tl.to({}, { duration: holdDuration });
      }

      tl.set(trackRef.current, { xPercent: 0 });
    }, heroRef);

    return () => ctx.revert();
  }, [sliderImages.length, extendedSlides.length]);

  return (
    <section
      ref={heroRef}
      className="relative flex h-auto h-screen w-full items-center overflow-hidden overflow-x-hidden bg-neutral-900 max-w-full"
    >
      {/* Slider Container  */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${extendedSlides.length * 100}%` }}
        >
          {extendedSlides.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="relative h-full flex-shrink-0"
              style={{ width: `${100 / extendedSlides.length}%` }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                className="h-full w-full object-cover"
                sizes="100vw"
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/30 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Linear Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full">
        <div className="h-full w-full bg-[linear-gradient(90deg,rgba(105,57,7,0.88)0%,rgba(105,57,7,0.76)20%,rgba(105,57,7,0.48)40%,rgba(54,65,83,0.48)60%,rgba(54,65,83,0.76)80%,rgba(54,65,83,0.88)100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_45%)]" />
      </div>

      {/* Centerd Align Absolute Positioned Content Div  */}
      <div className="relative mx-auto flex w-full max-w-[720px] flex-col z-30 gap-4 sm:gap-6 lg:gap-8 px-6 text-white sm:px-10 py-8 lg:py-0">
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 text-center justify-center items-center self-end md:self-auto">
          <h1
            className="text-[25px] md:text-[28px] font-[700] leading-tight lg:text-5xl uppercase"
            style={{
              textShadow:
                "0 2px 8px rgba(0,0,0,0.22), 0 1px 0 rgba(0,0,0,0.13)",
            }}
          >
            BEYOND YOUR TYPICAL{" "}
            <span
              className="text-[#ffffff]"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.32)" }}
            >
              {" "}
              ADVERTISING AGENCY
            </span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm font-medium lg:text-base justify-center items-center">
          <button
            onClick={() =>
              window.open("https://ritzmediaworld.com/contact.html", "_blank")
            }
            className="inline-flex liquid cursor-pointer justify-center items-center gap-2 sm:gap-3 rounded-[8px] bg-[#F3830E] py-2 sm:py-2.5 lg:py-3 text-white transition  w-[134px] md:w-[180px] lg:w-[210px] text-xs sm:text-sm lg:text-base"
          >
            Free Consulting <MoveRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          </button>
          <button
            onClick={() =>
              window.open("https://ritzmediaworld.com/web-stories", "_blank")
            }
            className="inline-flex liquid3 cursor-pointer justify-center hover:text-white items-center bg-white gap-2 sm:gap-3 rounded-[8px] w-[134px] md:w-[180px] lg:w-[210px] py-2 sm:py-2.5 lg:py-3 text-black transition hover:bg-white/10 text-xs sm:text-sm lg:text-base"
          >
            <Play className="h-4 w-4 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
            Watch Our Story
          </button>
        </div>
      </div>

      {/* Bottom Centered Align Absolute Positioned Div  */}
      <div
        className={`pointer-events-none absolute z-30 bottom-10 left-1/2 hidden sm:flex  -translate-x-1/2`}
      >
        <div
          className={`w-full h-full  min-w-[435px] border border-white/10 items-center justify-center rounded-full ${styles.glasscard}  py-3`}
        >
          <div className="flex justify-center gap-8 w-full items-center px-12">
            <div className="flex border-r-2 border-white px-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.7099 6.15C17.4599 5.38 16.7899 5.21 16.4499 4.77C16.1399 4.31 16.1799 3.62 15.5299 3.15C14.8799 2.68 14.2299 2.92 13.6999 2.77C13.1699 2.62 12.8099 2 11.9999 2C11.1899 2 10.8199 2.58 10.2999 2.77C9.77993 2.96 9.12993 2.67 8.46993 3.15C7.80993 3.63 7.85993 4.31 7.54993 4.77C7.20993 5.21 6.54993 5.38 6.28993 6.15C6.02993 6.92 6.49993 7.45 6.49993 8C6.49993 8.55 5.99993 9.08 6.28993 9.85C6.57993 10.62 7.20993 10.79 7.54993 11.23C7.85993 11.69 7.81993 12.38 8.46993 12.85C9.11993 13.32 9.76993 13.08 10.2999 13.23C10.8299 13.38 11.1899 14 11.9999 14C12.8099 14 13.1799 13.42 13.6999 13.23C14.2199 13.04 14.8699 13.33 15.5299 12.85C16.1899 12.37 16.1399 11.69 16.4499 11.23C16.7899 10.79 17.4499 10.62 17.7099 9.85C17.9699 9.08 17.4999 8.55 17.4999 8C17.4999 7.45 17.9999 6.92 17.7099 6.15ZM11.9999 12C11.2088 12 10.4354 11.7654 9.77765 11.3259C9.11985 10.8864 8.60716 10.2616 8.30441 9.53073C8.00166 8.79983 7.92244 7.99556 8.07678 7.21964C8.23113 6.44371 8.61209 5.73098 9.1715 5.17157C9.73091 4.61216 10.4436 4.2312 11.2196 4.07686C11.9955 3.92252 12.7998 4.00173 13.5307 4.30448C14.2616 4.60723 14.8863 5.11992 15.3258 5.77772C15.7653 6.43552 15.9999 7.20887 15.9999 8C15.9999 9.06087 15.5785 10.0783 14.8284 10.8284C14.0782 11.5786 13.0608 12 11.9999 12ZM13.9999 8C13.9999 8.39556 13.8826 8.78224 13.6629 9.11114C13.4431 9.44004 13.1307 9.69638 12.7653 9.84776C12.3998 9.99913 11.9977 10.0387 11.6097 9.96157C11.2218 9.8844 10.8654 9.69392 10.5857 9.41421C10.306 9.13451 10.1155 8.77814 10.0384 8.39018C9.96118 8.00222 10.0008 7.60009 10.1522 7.23463C10.3035 6.86918 10.5599 6.55682 10.8888 6.33706C11.2177 6.1173 11.6044 6 11.9999 6C12.5304 6 13.0391 6.21071 13.4141 6.58579C13.7892 6.96086 13.9999 7.46957 13.9999 8ZM13.7099 15.56L13.0799 19.16L12.3499 23.29L9.73993 20.8L6.43993 22.25L7.76993 14.75C8.35603 15.0427 9.00504 15.1869 9.65993 15.17C10.0615 15.4763 10.5156 15.7068 10.9999 15.85C11.3236 15.9508 11.6609 16.0014 11.9999 16C12.5982 16.0019 13.1869 15.8504 13.7099 15.56ZM17.9199 18.78L15.3399 17.86L15.8499 14.92C16.1543 14.8137 16.4409 14.662 16.6999 14.47L16.8199 14.37L17.9199 18.78Z"
                  fill="#F3830E"
                />
              </svg>
              <p className="font-[500] text-[14px] lg:text-[16px] text-white">
                Award-Winning Agency{" "}
              </p>
            </div>
            <div>
              <p className="font-[500] text-[14px] lg:text-[16px] text-[#F3830E]">
                Since <span className="text-[14px] lg:text-[16px] text-white">2008</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default S1;
