import Image from "next/image";
import Link from "next/link";
import styles from "./Section5.module.css";

export default function Section5() {
  return (
    <section className="w-full  pt-[35px] lg:pt-[70px] flex flex-col justify-center">
      <div className={`w-full mx-auto overflow-hidden ${styles.containerWidth}`}>
        <div
          className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0"
          data-no-gsap-animation
        >
          {/* Left Side Container */}
          <div className="relative w-full sm:w-[194px] h-auto sm:h-[156px] border-b-[1px] sm:border-b-0   border-b-[#E6E3E3]  sm:border-r-[1px] border-r-[#D9D9D9] flex items-center justify-center sm:justify-start pb-2 sm:pb-0 px-4 sm:px-0">
            <Link
              href="https://ritzmediaworld.com/clients"
              target="_blank"
              rel="noopener noreferrer"
              title="View our clients"
              className="font-[700] text-[18px] sm:text-[20px] lg:text-[24px] text-[#111111] no-underline hover:text-[#C99237] transition-colors"
              style={{ fontFamily: "MontserratBold" }}
            >
              <h2 className="m-0 text-inherit text-[18px] sm:text-[20px] lg:text-[24px] font-[700]">
                Brands That Trust Us
              </h2>
            </Link>

            <p className="absolute top-[50%] transform -translate-y-[50%] -right-3 hidden sm:block">
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.25 6.49512L-6.11749e-07 12.9903L-4.39216e-08 -7.39247e-05L11.25 6.49512Z"
                  fill="#D9D9D9"
                />
              </svg>
            </p>
          </div>

          {/* Right Side Container */}
          <div className="flex w-full flex-col sm:flex-row items-center md:items-start sm:w-[calc(100%-194px)] md:pl-6 lg:pl-[47px] overflow-x-hidden">
            {/* Slider Container */}
            <div className="w-full overflow-hidden">
              <div
                className={`flex gap-4 sm:gap-6 lg:gap-8 w-max ${styles.clientSlider}`}
              >
                {[
                  "/new-page/logos/prm-9.jpg",
                  "/new-page/logos/prm-22.jpg",
                  "/new-page/logos/mpf-bl.png",
                  "/new-page/logos/rdx-lg.avif",
                  "/new-page/logos/prm-9.jpg",
                  "/new-page/logos/prm-2.png",
                  "/new-page/logos/prm-3.png",
                  "/new-page/logos/prm-4.png",
                  "/new-page/logos/prm-5.png",
                  "/new-page/logos/prm-6.png",
                  "/new-page/logos/prm-9.jpg",
                  "/new-page/logos/prm-7.png",
                  "/new-page/logos/prm-8.jpg",
                  "/new-page/logos/prm-10.png",
                  "/new-page/logos/prm-11.jpg",
                  "/new-page/logos/prm-12.png",
                  "/new-page/logos/exotica-logo.png",
                  "/new-page/logos/prm-14.png",
                  "/new-page/logos/prm-16.png",
                  "/new-page/logos/prm-17.jpg",
                  "/new-page/logos/prm-18.png",
                  "/new-page/logos/prm-19.png",
                  "/new-page/logos/prm-20.jpg",
                  "/new-page/logos/scnd-3.jpg",
                  "/new-page/logos/scnd-4.jpg",
                  "/new-page/logos/scnd-5.jpg",
                  "/new-page/logos/scnd-6.jpg",
                  "/new-page/logos/scnd-7.jpg",
                  "/new-page/logos/scnd-8.jpg",
                  "/new-page/logos/scnd-9.jpg",
                  "/new-page/logos/scnd-10.jpg",
                  "/new-page/logos/scnd-11.jpg",
                  "/new-page/logos/scnd-12.jpg",
                  "/new-page/logos/scnd-13.jpg",
                  "/new-page/logos/scnd-14.jpg",
                  "/new-page/logos/scnd-15.jpg",
                  "/new-page/logos/scnd-16.jpg",
                  "/new-page/logos/scnd-17.jpg",
                  "/new-page/logos/scnd-18.jpg",
                ].map((url, idx) => (
                  <div
                    key={idx}
                    className="w-[100px] h-[56px] sm:w-[120px] sm:h-[67px] lg:w-[146px] lg:h-[81px] relative shrink-0"
                  >
                    <Image src={url} fill alt="Ritz Media Clients" title="Ritz Media Clients" className="object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* View More Container */}
            <div className="w-[100px] sm:w-[120px] lg:w-[146px] h-[56px] sm:h-[67px] lg:h-[81px] flex justify-center items-center flex-shrink-0">
              <Link
                title="Show more clients"
                href="https://ritzmediaworld.com/clients"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[600] text-[14px] sm:text-[15px] lg:text-[16px] cursor-pointer text-[#111111] no-underline hover:text-[#C99237] transition-colors"
              >
                Show more
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-[35px] lg:mt-[70px]">
          <div className="h-[1px] w-full bg-[#D9D9D9]" />
        </div>
    </section>
  );
}
