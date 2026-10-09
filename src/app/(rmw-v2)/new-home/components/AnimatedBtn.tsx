"use client";
import React, { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "./page.module.css";

function AnimatedBtn({
  btnText,
  link = "",
  bg,
  txt,
}: {
  btnText: string;
  link?: string;
  bg?: string;
  txt?: string;
}) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onClick={() => window.open(link, "_blank")}
      className={`w-[62px] h-[62px] rounded-full text-white flex items-center justify-center cursor-pointer ${
        bg ? bg : "bg-[#0F1640]"
      } ${styles.animatedBtn}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex justify-center items-center whitespace-nowrap w-full">
        <FaArrowRight
          className={`${
            txt ? txt : "text-[#FFFFFF]"
          } w-[20px] h-[20px] rotate-[329deg] flex-shrink-0  ${
            styles.animatedBtnIcn
          }
          ${isHover && txt ? "text-white" : "text-[#0F1640]"}  
          `}
        />
        <span className={`text-white font-medium ${styles.animatedBtnText}`}>
          {btnText}
        </span>
      </div>
    </div>
  );
}
export default AnimatedBtn;
