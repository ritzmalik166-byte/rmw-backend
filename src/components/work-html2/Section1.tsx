import React from "react";
import Image from "next/image";
export default function Section1() {
  return (
    <section
      className="w-full h-[220px] sm:h-[250px] md:h-[280px] lg:h-[300px] bg-[#0F1640] bg-no-repeat bg-center bg-cover flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/work-html/banners/wave_work.png')" }}
    >
      <div className="text-center mt-auto mb-[25px]">
        <h1
          className="text-white text-[34px] sm:text-[40px] md:text-[46px] lg:text-[55px] leading-[1.05]"
          style={{ fontFamily: "MontserratExtraBold" }}
        >
          Our{" "}
          <span className="inline-flex items-center">
            W
            <Image
              src="/work-html/s1/play_o_work.png"
              alt="o"
              width={34}
              height={34}
              className="mx-1 inline-block h-[34px] w-[34px]"
            />
            rk
          </span>
        </h1>
        <p
          className="text-white/90 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[21px] mt-2"
          style={{ fontFamily: "MontserratMedium" }}
        >
          Committed For Deliver Top Quality Services
        </p>
      </div>
    </section>
  );
}