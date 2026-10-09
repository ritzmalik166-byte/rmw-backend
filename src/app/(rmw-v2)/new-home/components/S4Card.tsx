"use client";
import Image from "next/image";
import Link from "next/link";
import React, { forwardRef } from "react";
import { FiArrowRight } from "react-icons/fi";

interface ListItem {
  text: string;
  link: string;
}

interface S4CardProps {
  linkTxt: string;
  title: string;
  list: ListItem[];
  cardBg: string;
  linkBG: string;
  linkTxtColor: string;
  img: string;
  link: string;
  disableSticky?: boolean;
  border: string;
  btnBg: string;
  idx:number;
}

const S4Card = forwardRef<HTMLDivElement, S4CardProps>(
  (
    {
      link,
      linkTxt,
      title,
      list,
      cardBg,
      linkBG,
      linkTxtColor,
      img,
      disableSticky = false,
      border,
      btnBg,
      idx,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`w-full flex flex-col-reverse lg:flex-row rounded-[32px] justify-between  ${cardBg} overflow-hidden ${border}`}

      >
        {/* LEFT CONTENT */}
        <div className="flex-1 min-h-[350px] sm:min-h-[380px] md:min-h-[400px] lg:h-[532px] flex items-center p-6 lg:p-12">
          <div className="w-full max-w-[600px] flex flex-col gap-5">
            <Link
              title={linkTxt}
              href={link} target="_blank"
              className={`inline-flex w-fit h-[36px] lg:h-[42px] px-5 justify-center items-center cursor-pointer ${btnBg} rounded-[8px] font-[600] text-[18px] ${linkTxtColor} transition-transform hover:scale-105`}
            >
              {linkTxt}
            </Link>

            <h2 className="font-[600] text-[28px] md:text-[32px] lg:text-[36px] text-black leading-tight">
              {title}
            </h2>

            <ul className="flex flex-col gap-3">
              {list.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-[15px] lg:text-[16px] text-black"
                >
                  <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-[#21EAB5]" />
                  <Link
                    title={item.text}
                    href={item.link}
                    target="_blank"
                    className="hover:text-[#D4A574] transition-colors cursor-pointer"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              onClick={() => window.open(link, "_blank")}
              className="w-fit min-w-[130px] h-[34px] px-4  bg-white rounded-[8px] text-black font-[500] text-[14px] flex items-center gap-2 hover:scale-105 transition-transform"
            >
              Read More <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* IMAGE SIDE */}
        <div className="w-full lg:w-[400px] xl:w-[595px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[532px] relative">
          <Image
            onClick={() => window.open(link, "_blank")}
            src={img}
            alt={linkTxt}
            fill
            className={`lg:object-cover md:object-fill object-cover ${idx == 2 ? "object-top lg:object-center" : "object-center"}`}
          />
        </div>
      </div>
    );
  }
);

S4Card.displayName = "S4Card";

export default S4Card;