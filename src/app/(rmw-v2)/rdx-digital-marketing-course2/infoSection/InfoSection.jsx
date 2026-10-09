import Image from 'next/image';
import React from 'react'
// import saveImage from "/image-15.png"

export default function InfoSection() {
  const careers = [
    "Performance Marketing Specialist (Meta/Google)",
    "SEO Strategist / Technical SEO",
    "Social Media & Content Strategist (IG/YouTube/LinkedIn)",
    "Marketing Analyst (GA4, Looker/Data Studio)",
    "Marketing Automation & CRM (HubSpot/Zoho/WhatsApp)",
    "Conversion Rate Optimization (CRO) & Landing Page Specialist",
    "E-commerce Performance Marketer (D2C & Marketplaces)",
    "Media Planner / Digital Strategist",
    "Influencer & Partnerships Manager",
    
    "AI-for-Marketing Specialist (creative ops, testing, prompts)",
  ];
  return (
    <div className='mt-0 md:mt-5 '>
      <section className=" py-5 md:py-12 px-4 md:px-10 lg:px-20">
        <div className="max-w-full mx-auto grid lg:grid-cols-2 gap-10 items-center">

          <div className="relative w-full h-[450px] md:h-[550px] lg:h-[600px]">
            <Image
              src="/image-15.png"
              alt="Career"
              fill
              className="object-cover"
              priority
            />

       
            <div className="absolute top-8 left-8 text-white">
              <h2 className="text-3xl md:text-5xl font-light leading-tight">
                Save Upto <br />
                <span className="text-4xl md:text-6xl font-semibold">
                  40%
                </span>
              </h2>
            </div>
          </div>

          
          <div>
            <p className="text-gray-500 text-lg mb-2 border-b border-gray-500 pb-2">
              Info
            </p>

            <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-snug">
              Career Pathways You Can <br className="hidden md:block" />
              Step Into
            </h2>

            <ul className="space-y-4">
              {careers.map((career, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-sm md:text-base">
                    {career}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
