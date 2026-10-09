"use client";
import React from "react";

interface HoverCardProps {
  width: string;
  height: string;
  title: string;
  para: string;
  id?: string | number;
  img?: string;
  imgID?: number;
  setMainImg?: (img: string) => void;
  setSubImg?: (img: string) => void;
  mainImg?: string;
}

function HoverCard({ width, height, title, para, id }: HoverCardProps) {
  return (
    <div
      className={`${width} ${height} border-t-[2px] border-[#D9D9D9] flex flex-col justify-center items-center gap-4 sm:gap-6 lg:gap-[30px] py-4 pt-5 sm:pt-6 lg:pt-7 ${
        id === "btm" ? "self-end" : ""
      }`}
    >
      <h3 className="font-[500] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px]">{title}</h3>
      <p className="font-[400] text-[#00000099] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-center px-2">{para}</p>
    </div>
  );
}

export default HoverCard;
