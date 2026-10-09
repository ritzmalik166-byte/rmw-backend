import Image from "next/image";
import Link from "next/link";
import brandStyles from "./BrandThatTrustUs.module.css";
import containerStyles from "@/components/celebrity-endorsements/page.module.css";

export default function BrandThatTrustUs() {
  return (
    <section className="w-full bg-[#FFFFFF] py-[35px] lg:py-[70px] flex justify-center px-4 sm:px-6 lg:px-0">
      <div className={`w-full mx-auto overflow-hidden ${containerStyles.containerWidth}`}>
        <div
          className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0"
          data-no-gsap-animation
        >
          {/* Left Side Container */}
          <div className="relative w-full sm:w-[194px] h-auto sm:h-[156px] border-b-0 sm:border-r-[1px] border-r-[#D9D9D9] flex items-center justify-center sm:justify-start pb-4 sm:pb-0">
            <h2
              className="font-[700] text-[20px] sm:text-[22px] lg:text-[24px]"
              style={{ fontFamily: "MontserratBold" }}
            >
              Brands That Trust Us
            </h2>

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
          <div className="relative flex w-full md:pl-[47px] sm:w-[calc(100%-194px)] pt-0 sm:pt-5 gap-2 sm:gap-3 min-w-0">
            <div className="absolute top-[-28px] left-0 w-full h-[1px] bg-[#EBEBEB] sm:left-[0px] sm:w-[calc(100%+12px)]" />
            <div className="absolute bottom-[-28px] left-0 w-full h-[1px] bg-[#EBEBEB] sm:left-[0px] sm:w-[calc(100%+12px)]" />
            {/* Slider Container - logoStrip clips top/bottom with boundary cover */}
            <div className={`flex-1 min-w-0 ${brandStyles.logoStrip}`}>
              <div
                className={`flex gap-4 sm:gap-6 lg:gap-8 w-max ${brandStyles.clientSlider}`}
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
                    <Image src={url} fill alt="Ritz Media World Clients" title="Ritz Media World Clients" className="object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* View More Container */}
            <div className="w-[100px] sm:w-[120px] lg:w-[146px] h-[56px] sm:h-[67px] lg:h-[81px] flex justify-center items-center flex-shrink-0">
              <Link
                title="Show more"
                href="/clients"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[600] text-[14px] sm:text-[15px] lg:text-[16px] cursor-pointer border-b"
              >
                Show more
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-full mt-12">
        <div className="h-[1px] w-full bg-[#D9D9D9]" />
      </div> */}
    </section>
  );
}
