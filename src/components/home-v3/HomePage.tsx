import S1 from "@/components/home-v3/S1";
import S2 from "@/components/home-v3/S2";
import S3 from "@/components/home-v3/S3";
import S4 from "@/components/home-v3/S4";
import S5 from "@/components/home-v3/S5";
import S6 from "@/components/home-v3/S6";
import S7 from "@/components/home-v3/S7";
import S8 from "@/components/home-v3/S8";
import React from "react";
import styles from "@/app/(rmw-v2)/page.module.css";
// import NewYear from "./new-home/sections/NewYear";
// import PageAnimations from "./components/PageAnimations";
import { fetchHomePageBlogs } from "@/app/(rmw-v2)/lib/fetchData";
import NewBanner from "@/components/home-v3/NewBanner";
import HomeHeroIntro from "@/components/home-v3/HomeHeroIntro";
import BrandImpactSection2 from "@/components/copy/BrandImpactSection2";
import HomePageLinkTitles from "@/components/home-v3/HomePageLinkTitles";

async function HomePage() {
  // Fetch data server-side
  const latestBlogs = await fetchHomePageBlogs();
  const blogsLoading = latestBlogs.length === 0;

  return (
    <>
      <HomePageLinkTitles />
      {/* Client-side animations component */}
      {/* <PageAnimations /> */}
      {/* Hero Section - Full Width */}
      {/* <S1></S1> */}
      {/* <NewYear></NewYear> */}
      {/* <S1></S1>  */}
      <NewBanner />
      <HomeHeroIntro />
      <div>
        <S2></S2>
      </div>

      <S3></S3>

      <div>
        <S4></S4>
      </div>

      <S5></S5>

      <div className="w-full">
        <S6></S6>
      </div>

      <S7></S7>

      <div className="w-full">
        <S8 blogs={latestBlogs} blogsLoading={blogsLoading}></S8>
      </div>
      <div className="w-full ">
        <BrandImpactSection2></BrandImpactSection2>
      </div>
    </>
  );
}

export default HomePage;