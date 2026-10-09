"use client";
import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
function NewMasterMinds() {
    const masters = [
        {
            img: "/rm.png",
            name: "Ritz Malik",
            role: "Founder",
            para: "Driven by an obsession with storytelling and innovation",
            // social: [
            //   {
            //     icn: <FaFacebookF />,
            //     link: "/",
            //   },
            //   {
            //     icn: <FaXTwitter />,
            //     link: "/",
            //   },
            //   {
            //     icn: <RiInstagramFill />,
            //     link: "/",
            //   },
            //   {
            //     icn: <FaLinkedinIn />,
            //     link: "/",
            //   },
            // ],
        },
        {
            img: "/sk.png",
            name: "Satvinder Kaur",
            role: "Founder",
            para: "The name that everyone knows as soon as they walk into the room.",
            // social: [
            //   {
            //     icn: <FaFacebookF />,
            //     link: "/",
            //   },
            //   {
            //     icn: <FaXTwitter />,
            //     link: "/",
            //   },
            //   {
            //     icn: <RiInstagramFill />,
            //     link: "/",
            //   },
            //   {
            //     icn: <FaLinkedinIn />,
            //     link: "/",
            //   },
            // ],
        },
        {
            img: "/nm.png",
            name: "Nishi",
            role: "COO",
            para: "The voice of reason is recognised by the creative team and clients alike.",
            // social: [
            //   {
            //     icn: <FaFacebookF />,
            //     link: "/",
            //   },
            //   {
            //     icn: <FaXTwitter />,
            //     link: "/",
            //   },
            //   {
            //     icn: <RiInstagramFill />,
            //     link: "/",
            //   },
            //   {
            //     icn: <FaLinkedinIn />,
            //     link: "/",
            //   },
            // ],
        },
    ];
    return (
        <></>
        // <section className="w-full bg-[#0F1640] min-h-[500px] sm:min-h-[600px] md:min-h-[700px] xl:min-h-[874px] flex justify-center items-center py-8 sm:py-12 md:py-16 lg:py-10 xl:py-20 px-4 sm:px-6 md:px-8 lg:px-0 overflow-x-hidden">
        //     <div className="w-[95%] sm:w-[95%] lg:w-[90%] flex flex-col justify-center items-center gap-10 sm:gap-14 md:gap-16 lg:gap-10 xl:gap-20">
        //         {/* Top Centered Div  */}
        //         <div className="text-center flex flex-col justify-center items-center gap-3 sm:gap-4 md:px-4">
        //             <h2 className="font-[600] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] text-white xl:max-w-xl">
        //                 The People at the Helm of RITZ MEDIA WORLD
        //             </h2>
        //             <p className="font-[400] text-[14px] sm:text-[15px] md:text-[16px] text-[#FFFFFF99] lg:max-w-2xl">
        //                 The group of leaders that lead with vision and
        //                 determination. They inspire innovation and drive growth.
        //             </p>
        //         </div>

        //         {/* Main Image Container  */}
        //         <div className="w-full flex flex-col lg:flex-row justify-center items-center sm:justify-between gap-6 sm:gap-4 md:gap-6 lg:gap-0">
        //             {masters.map((ob, idx) => {
        //                 return (
        //                     <div
        //                         className="w-full 
        //         sm:w-[48%]
        //          md:w-[75%] 
        //          xl:w-[400px] 
        //          h-[350px] sm:h-[400px] md:h-[523px] relative overflow-hidden masterMindsCard group cursor-pointer"
        //                         key={idx}
        //                     >
        //                         <Image
        //                             src={ob.img}
        //                             alt={ob.name}
        //                             fill
        //                             className="object-cover"
        //                             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 400px"
        //                         />

        //                         {/* Absolute Position Element  */}
        //                         <div className="masterMindsArrow absolute top-0 left-0 w-[50px] h-[48px] sm:w-[60px] sm:h-[58px] md:w-[68px] md:h-[66px] lg:w-[74px] lg:h-[72px] flex justify-center items-center bg-[#0F1640]">
        //                             <FaArrowRight className="masterMindsIcon w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px] text-white rotate-[-20deg] absolute top-6 left-6" />

        //                             {/* Centered Align Container  */}
        //                             <div className="masterMindsContent w-full h-full flex justify-center items-center px-4 sm:px-6 md:px-8">
        //                                 <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 text-center">
        //                                     {/* 1st Row - Name and Role  */}
        //                                     <div className="flex flex-col gap-2">
        //                                         <h2 className="font-[600] text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] text-white leading-tight">
        //                                             {ob.name}
        //                                         </h2>
        //                                         <p className="font-[400] text-[14px] sm:text-[15px] md:text-[16px] text-white/90 uppercase tracking-wider">
        //                                             {ob.role}
        //                                         </p>
        //                                     </div>

        //                                     {/* 2nd Row - Description  */}
        //                                     <div className="max-w-[280px] sm:max-w-[300px] md:max-w-[320px] mx-auto">
        //                                         <p className="font-[400] text-[13px] sm:text-[14px] md:text-[15px] text-white/80 leading-relaxed">
        //                                             {ob.para}
        //                                         </p>
        //                                     </div>

        //                                     {/* 3rd Row - Social Icons  */}
        //                                     {/* <div className="flex justify-center items-center gap-4 sm:gap-5 pt-2">
        //                 {ob.social.map((scl, socialIdx) => {
        //                   const socialPlatforms = ['facebook', 'x', 'instagram', 'linkedin'];
        //                   const platform = socialPlatforms[socialIdx] || '';
        //                   return (
        //                     <Link
        //                       key={socialIdx}
        //                       href={scl.link}
        //                       className={`masterMindsSocialIcon masterMindsSocial-${platform} w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex justify-center items-center text-white rounded-[8px] transition-all duration-300`}
        //                     >
        //                       {scl.icn}
        //                     </Link>
        //                   );
        //                 })}
        //               </div> */}
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 );
        //             })}
        //         </div>
        //     </div>
        // </section>
        // <h1>varun</h1>
        
    );
}

export default NewMasterMinds;
