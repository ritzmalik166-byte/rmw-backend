"use client";

import React from "react";
import S1 from "../new-home/sections/S1";
import S2 from "../new-home/sections/S2";
import S3 from "../new-home/sections/S3";
import S5 from "../new-home/sections/S5";
import S7 from "../new-home/sections/s7";
import S8 from "../new-home/sections/S8";
import S9 from "../new-home/sections/S9";
import S11 from "../new-home/sections/S11";
import ASI from "../new-home/components/ASI";
import InstagramIcon from "../new-home/components/InstagramIcon";
import FacebookIcon from "../new-home/components/FacebookIcon";
import YouTubeIcon from "../new-home/components/YouTubeIcon";
import LinkedInIcon from "../new-home/components/LinkedInIcon";
import XIcon from "../new-home/components/XIcon";
import S3C from "../new-home/sections/S3C";
import NewBlogSection from "../new-home/sections/NewBlogSection";
import NewS2 from "../new-home/sections/NewS2";
import NewS4 from "../new-home/sections/NewS4";
import S51 from "../new-home/sections/S51";
import CustomCursor from "../new-home/components/CustomCursor";
import LenisSmoothScroll from "../new-home/components/LenisSmoothScroll";
import RouteChangeHandler from "../new-home/components/RouteChangeHandler";
import OurAwards from "../new-home/sections/OurAwards";
import RDS from "../new-home/sections/RDS";
import Christmas from "../new-home/components/Christmas";
import FlyingSanta2 from "../new-home/components/FlyingSanta2";
import NewYear from "../new-home/sections/NewYear";
import NewYearAnimation from "@/components/home-v3/NewYearAnimation";

function page() {
  // useEffect(() => {
  //   window.location.reload();
  // }, []);
  return (
    <main className="">
      {/* <LenisSmoothScroll />*/}
      {/* <RouteChangeHandler />  */}
      {/* <CustomCursor /> */}
 
    <NewYearAnimation></NewYearAnimation>

      {/* <Christmas></Christmas> */}
    <NewYear></NewYear>


      {/* <S1></S1> */}
      {/* <S2></S2> */}
      <NewS2></NewS2>
      <S3C></S3C>
      <S3></S3>
      {/* <S4></S4> */}
      {/* <NewS4></NewS4> */}
      <RDS></RDS>
      {/* <S4C></S4C> */}

      <S5></S5>
      <S51></S51>
      <S7></S7>
      <S8 ></S8>
      {/* <S9></S9> */}
     <OurAwards></OurAwards>
      {/* <S10></S10> */}
      <NewBlogSection></NewBlogSection>
      <S11></S11>
      <ASI icn={<FacebookIcon />} py="top-[245px]" px="right-[0px]" bgType="facebook"></ASI>
      <ASI icn={<InstagramIcon />} py="top-[295px]" px="right-[0px]" bgType="instagram"></ASI>
      <ASI icn={<YouTubeIcon />} py="top-[345px]" px="right-[0px]" bgType="youtube"></ASI>
      <ASI icn={<LinkedInIcon />} py="top-[395px]" px="right-[0px]" bgType="linkedin"></ASI>
      <ASI icn={<XIcon />} py="top-[444px]" px="right-[0px]" bgType="x"></ASI>
      {/* <FlyingSanta2 /> */}
      {/* <FlyingSanta2 /> */}
    </main>
  );
}

export default page;