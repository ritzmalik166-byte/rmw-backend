"use client"
import React from 'react'
import S4Card from '../components/S4Card';

function S4C() {
    const s4CardsData = [
        {
          linkTxt: "Creative Print & OOH",
          title: "Marketing strategies that work effectively.",
          list: [
            "SEO & SEM",
            "Social Media Marketing",
            "PPC Campaigns",
            "Analytics & Optimization",
          ],
          cardBg: "bg-gradient-to-tl from-[#D1FFEC] to-[#F7FFDF]",
          linkBG: "bg-[#21EAB5]",
          linkTxtColor: "text-[#101828]",
          img: "/new-page/s4/s4-im1.png",
        },
        {
          linkTxt: "Creative Print & OOH",
          title: "Marketing strategies that work effectively.",
          list: [
            "SEO & SEM",
            "Social Media Marketing",
            "PPC Campaigns",
            "Analytics & Optimization",
          ],
          cardBg: "bg-gradient-to-tl from-[#D1FFEC] to-[#F7FFDF]",
          linkBG: "bg-[#21EAB5]",
          linkTxtColor: "text-[#101828]",
          img: "/new-page/s4/s4-im2.png",
        },
        {
          linkTxt: "Creative Print & OOH",
          title: "Marketing strategies that work effectively.",
          list: [
            "SEO & SEM",
            "Social Media Marketing",
            "PPC Campaigns",
            "Analytics & Optimization",
          ],
          cardBg: "bg-gradient-to-tl from-[#D1FFEC] to-[#F7FFDF]",
          linkBG: "bg-[#21EAB5]",
          linkTxtColor: "text-[#101828]",
          img: "/new-page/s4/s4-im3.png",
        },
      ];
  return (
    <section className="w-[100%] relative bg-red-600 mt-8 sm:mt-10 lg:mt-12 flex flex-col gap-6 sm:gap-8 lg:gap-10 h-[100vh] overflow-y-auto">
      {/* Cards Section  */}
  <div className='w-[90%] mx-auto'>
  {/* {s4CardsData.map((ob, idx) => (
        <S4Card
          key={idx}
          linkTxt={ob.linkTxt}
          title={ob.title}
          list={ob.list}
          cardBg={ob.cardBg}
          linkBG={ob.linkBG}
          linkTxtColor={ob.linkTxtColor}
          img={ob.img}
        />
      ))} */}
  </div>
    </section>
  )
}

export default S4C