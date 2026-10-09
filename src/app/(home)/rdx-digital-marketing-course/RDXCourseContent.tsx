"use client";

import React, { useEffect, useState, memo, Suspense } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamic imports for sliders
const SwiperSlider = dynamic(() => import("./slider/SwiperSlider"), {
  loading: () => (
    <div 
      style={{ 
        height: '400px',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite'
      }}
    >
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  ),
  ssr: false
});

const SwiperSlider2 = dynamic(() => import("./slider/SwiperSlider2"), {
  loading: () => (
    <div 
      style={{ 
        height: '400px',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite'
      }}
    >
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  ),
  ssr: false
});

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Do I need prior experience?",
    answer: "No. Curiosity and basic computer comfort are enough.",
  },
  {
    question: "Placement guaranteed?",
    answer:
      "No guarantees, placement assistance with real portfolio building, yes.",
  },
  {
    question: "Will I get a certificate?",
    answer:
      "Yes, an RDX completion certificate, plus prep for Google/Meta credentials.",
  },
  {
    question: "Live or recorded?",
    answer: "Live sessions with recordings for revision.",
  },
  {
    question: "Language?",
    answer:
      "English-first; we're comfortable supporting in Hinglish where needed.",
  },
  {
    question: "Is it only in Delhi-NCR?",
    answer: "In-person in NCR + hybrid live online for remote learners.",
  },
];

const slides = [
  {
    img: "/rdx/s9/seeo.png",
    alt: "SEO",
    title: "SEO (Search Engine Optimization)",
  },
  {
    img: "/rdx/icns/PPC.png",
    alt: "Google Ads",
    title: "PPC (Google Ads) Services",
  },
  {
    img: "/rdx/s9/seeo2.png",
    alt: "Social Media",
    title: "Social Media Management",
  },
  {
    img: "/rdx/icns/content-marketing.png",
    alt: "Content",
    title: "Content Marketing",
  },
  {
    img: "/rdx/icns/email-marketing.png",
    alt: "Email",
    title: "Email Campaigns",
  },
  {
    img: "/rdx/s9/seeo.png",
    alt: "SEO",
    title: "SEO (Search Engine Optimization)",
  },
  {
    img: "/rdx/icns/PPC.png",
    alt: "Google Ads",
    title: "PPC (Google Ads) Services",
  },
  {
    img: "/rdx/s9/seeo2.png",
    alt: "Social Media",
    title: "Social Media Management",
  },
  {
    img: "/rdx/icns/content-marketing.png",
    alt: "Content",
    title: "Content Marketing",
  },
  {
    img: "/rdx/icns/email-marketing.png",
    alt: "Email",
    title: "Email Campaigns",
  },
  {
    img: "/rdx/s9/seeo.png",
    alt: "SEO",
    title: "SEO (Search Engine Optimization)",
  },
  {
    img: "/rdx/icns/PPC.png",
    alt: "Google Ads",
    title: "PPC (Google Ads) Services",
  },
];

const cards = [
  {
    img: "/rdx/s7/webpage.jpg",
    title: " Website & Landing Page Fundamentals",
    desc: "Learn how to build effective websites and landing pages with mobile-first design, UX principles, and conversion-focused structures, ending with hands-on creation for a fictional business.",
  },
  {
    img: "/rdx/s7/seo.jpg",
    title: " Search Engine Optimisation (SEO)",
    desc: "Master on-page, off-page, technical, and local SEO techniques, while leveraging industry tools like SEMrush and Ahrefs through practical SEO audits for optimized visibility.",
  },
  {
    img: "/rdx/s7/ads.jpg",
    title: "Search Engine Marketing (SEM) & Paid Ads",
    desc: "Discover Google Ads campaigns, keyword strategies, and ad copywriting essentials. Learn conversion tracking and create mock paid campaigns to sharpen practical SEM skills.",
  },
  {
    img: "/rdx/s7/social_media.jpg",
    title: "Social Media Marketing (SMM)",
    desc: "Understand organic and paid strategies across platforms like Instagram, LinkedIn, and YouTube. Develop content calendars, run ads, and design a social media plan.",
  },
  {
    img: "/rdx/s7/content_marketing.jpg",
    title: "Content Marketing",
    desc: "Learn storytelling, brand voice, and SEO-driven content creation. Create blog posts and social media assets while mastering repurposing across multiple platforms for greater reach.",
  },
  {
    img: "/rdx/s7/email_marketing.jpg",
    title: "Email Marketing & Automation",
    desc: "Explore ethical list building, campaign types, and automation workflows. Design segmented campaigns using Mailchimp or HubSpot, enhancing personalization and conversion-driven email strategies.",
  },
  {
    img: "/rdx/s7/businessman_working_with_business_analytics_data_management_system.jpg",
    title: "Digital Analytics & Data-Driven Marketing",
    desc: "Learn GA4, GTM, and Looker Studio to measure performance metrics. Build dashboards, analyze traffic, and optimize campaigns through data-driven insights and KPIs.",
  },
  {
    img: "/rdx/s7/ar-vr.png",
    title: " Emerging Technologies in Digital Marketing",
    desc: "Discover how AI, AR/VR, and voice search are reshaping marketing. Build campaigns powered by generative AI while preparing for cookie-less, data-privacy-focused digital futures.",
  },
  {
    img: "/rdx/s7/man-works-laptop-with-icons-social-media-screen.jpg",
    title: "Capstone Project & Career Prep",
    desc: "Develop and pitch a complete digital marketing strategy. Build a strong portfolio, prepare for interviews, and explore freelancing opportunities to launch your career.",
  },
];

const s8Slides = [
  {
    text: `"I completed the digital marketing course at Ritz Digital Xperts. The trainers were very supportive. I learned SEO, PPC, SMM, and more. This was my best learning experience."`,
    author: "— Shorye Verma",
    role: "Performance Marketer, Gurgaon",
  },
  {
    text: `"Learning Web Development at RDX was a great experience. The trainers were very helpful, and I learned technologies like HTML, CSS, JavaScript, and React. It gave me the confidence to build real-world projects."`,
    author: "— Syed Arhan",
    role: "Full Stack Engineer, Noida",
  },
  {
    text: `"Thanks to RDX (Ritz Digital Experts) and especially Akanksha ma'am for her guidance, I gained practical skills and confidence in digital marketing that will help me in my career."`,
    author: "— Manav ",
    role: "SEO Executive, Delhi",
  },
  {
    text: `"Learning Web Development at RDX was a great experience. The trainers were very helpful, and I learned technologies like HTML, CSS, JavaScript, and React. It gave me the confidence to build real-world projects."`,
    author: "— Syed Arhan",
    role: "Full Stack Engineer, Noida",
  },
  {
    text: `"Experts here provides step-by-step guidance, they also helped me in preparing for interviews and the placement cell connected me with top companies, and today I'm happily working as an SEO Content writer"`,
    author: "— Abhishek Singh",
    role: "Performance Marketer, Gurgaon",
  },
  {
    text: `"Thanks to RDX (Ritz Digital Experts) and especially Akanksha ma'am for her guidance, I gained practical skills and confidence in digital marketing that will help me in my career."`,
    author: "— Manav ",
    role: "SEO Executive, Delhi",
  },
];

interface RDXCourseContentProps {
  modalFormHandler: () => void;
}

const RDXCourseContent = memo(({ modalFormHandler }: RDXCourseContentProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [s8Current, setS8Current] = useState(0);
  const [s8CardsPerView, setS8CardsPerView] = useState(3);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Responsive cards per view
  useEffect(() => {
    const updateS8CardsPerView = () => {
      if (window.innerWidth <= 768) {
        setS8CardsPerView(1);
      } else if (window.innerWidth <= 1200) {
        setS8CardsPerView(2);
      } else {
        setS8CardsPerView(3);
      }
    };

    updateS8CardsPerView();
    window.addEventListener("resize", updateS8CardsPerView);
    return () => window.removeEventListener("resize", updateS8CardsPerView);
  }, []);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setS8Current((prev) =>
        prev + s8CardsPerView >= s8Slides.length ? 0 : prev + s8CardsPerView
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [s8CardsPerView, s8Slides.length]);

  // Pagination count
  const s8TotalPages = Math.ceil(s8Slides.length / s8CardsPerView);
  const s8CurrentPage = Math.floor(s8Current / s8CardsPerView);

  return (
    <>
      {/* From Here The Section 1 Is Starting  */}
      <section className={styles.section}>
        {/* This Is Row 1 */}
        <div className={styles.row1}>
          <Image
            width={700}
            height={365}
            priority={true}
            src="/RITZ DIGITAL XPERTS ACADEMY.png"
            alt="Ritz Digital Xperts Academy"
            title="Ritz Digital Xperts Academy"
          />
          {/* <div className={styles.heading}>
            <h1>
              <span className={styles.highlight}>Digital marketing course</span>{" "}
              with <span className={styles.highlight}>generative AI</span>{" "}
            </h1>
            <h2>
              <span className={styles.highlight}>Job Ready skills</span> that
              hiring managers actually want.
            </h2>
          </div> */}
          <div className={styles.heading}>
            <h1>
              <span className={styles.highlight}> AI-Powered Digital Marketing Course</span>
              <br />
              Build Job-Ready Skills That Get You Hired.
            </h1>
            {/* <h2>
              <span className={styles.highlight}>Job Ready skills</span> that
              hiring managers actually want.
            </h2> */}
          </div> 
        </div>

        {/* This Is Row 2 */}
        <div className={styles.row2}>
          {/* Left Side */}
          <div className={styles.leftSide}>
            <span className={styles.highlight}>
              <Link
                title="Contact RMW"
                href="/contact.html"
                className="tp-hero__action-btn"
                aria-label="Contact RMW"
              >
                <span>
                  <svg
                    width="33"
                    height="33"
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.99996 26.5469L29.4548 7.97636M6.73828 2L31.2851 6.73832L26.5468 31.2852"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </span>

            <button className={styles.advisorButton} onClick={modalFormHandler}>
              Talk to an Advisor
            </button>
          </div>

          {/* Right Side */}
          <div className={styles.rightSide}>
            <p className={styles.description}>
              Backed by <b>Ritz Media World</b>, an INS-registered,
              award-winning agency with a Meta partner and Google-certified
              team, RDX turns curious learners into confident digital marketers.
              We keep it practical, fast, and career-focused. There are no
              jargon marathons, just the real work.
            </p>
          </div>
        </div>
      </section>

      {/* From Here The Section 2 Is Starting  */}
      <section className={styles.section2s2}>
        <div className={styles.containers2}>
          {/* Absolute Position Div 1  */}
          <div className={styles.absoluteDiv1s2}>
            <Image
              height={132} // 100 in mobile screens
              width={132} // 100 in mobile screens
              src="/rdx/rdxi2.png"
              alt="Decoration 1"
              title="Decorative graphic 1"
              sizes="(max-width: 640px) 100px, (max-width: 1024px) 150px, 210px"
              className="h-auto w-auto"
            />
          </div>

          {/* Absolute Position Div 2  */}
          <div className={styles.absoluteDiv2s2}>
            <Image
              src="/rdx/rdxi3.png"
              alt="Decoration 2"
              title="Decorative graphic 2"
              width={210}
              height={210}
              sizes="(max-width: 640px) 100px, (max-width: 1024px) 150px, 210px"
              className="h-auto w-auto"
            />
          </div>

          <Image
            fill
            src="/rdx/s2/rdx-s2-img1.png"
            className={styles.mainImages2}
            alt="Main Image"
            title="Digital marketing overview visual"
          />
        </div>
      </section>

      {/* From Here The Section 3 Is Starting  */}
      <section className={styles.section3}>
        {/* Absolute  */}
        <img
          src="/rdx/s2/esxe1.png"
          className={styles.absoluteImg1}
          alt="Background decoration 1"
          title="Background decoration 1"
        />

        <img
          src="/rdx/s2/rdxe2.png"
          className={styles.absoluteImg2}
          alt="Background decoration 2"
          title="Background decoration 2"
        />

        {/* Centered Align Div  */}
        <div className={styles.centeredDiv}>
          {/* Top 1  */}
          <div className={styles.top1}>
            <p className={styles.top1Text}>About</p>
          </div>

          {/* Top 2  */}
          <div className={styles.top2}>
            <h2 className={styles.top2Heading}>
              Why Digital Marketing, Why Now (Industry Trends)
            </h2>
          </div>

          {/* Grid Cards Container  */}
          <div className={styles.gridContainer}>
            {/* Card1  */}
            <div className={styles.card}>
              {/* Icon Img  */}

              <div className={styles.cardIcon}>
                {" "}
                <Image
                  fill
                  quality={70}
                  src="/rdx/s2/rdxicn1.png"
                  alt="India growth market icon"
                  title="India growth market icon"
                />
              </div>
              <h3 className={styles.cardHeading}>
               India is the world's fastest-growing online market

              </h3>
              <p className={styles.cardText}>
                Exploding mobile usage, vernacular adoption, and video-first behaviour mean brands need skilled marketers more than ever.

              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>
                {" "}
                <Image
                  fill
                  quality={70}
                  src="/rdx/s2/rdxicn2.png"
                  alt="India growth market icon"
                  title="Performance drives budgets icon"
                />
              </div>
              <h3 className={styles.cardHeading}>Performance drives budgets</h3>
              <p className={styles.cardText}>
               Budgets follow outcomes. If you can plan, run, and scale campaigns, you will never be on the bench.

              </p>
            </div>

            <div className={styles.card}>
              {/* Icon Img  */}
              <div className={styles.cardIcon}>
                {" "}
                <Image
                  fill
                  quality={70}
                  src="/rdx/s2/rdxicn3.png"
                  alt="India growth market icon"
                  title="AI copilot icon"
                />
              </div>
              <h3 className={styles.cardHeading}>
                 AI is a copilot, not a replacement.

              </h3>
              <p className={styles.cardText}>
                The pros who pair human insight with AI tools outpace everyone else.

              </p>
            </div>

            <div className={styles.card}>
              {/* Icon Img  */}
              <div className={styles.cardIcon}>
                {" "}
                <Image
                  fill
                  quality={70}
                  src="/rdx/s2/rdxicn4.png"
                  alt="India growth market icon"
                  title="Data privacy icon"
                />
              </div>
              <h3 className={styles.cardHeading}>First-party data & privacy</h3>
              <p className={styles.cardText}>
                 Smart tagging, consent, and CRM fluency are now core skills, not nice-to-haves.

              </p>
            </div>

            <div className={styles.card}>
              {/* Icon Img  */}
              <div className={styles.cardIcon}>
                {" "}
                <Image
                  fill
                  quality={70}
                  src="/rdx/s2/rdxicn5.png"
                  alt="India growth market icon"
                  title="Creator economy icon"
                />
              </div>
              <h3 className={styles.cardHeading}>Creator economy meets commerce
 Creator economy meets commerce
              </h3>
              <p className={styles.cardText}>
                Social + search + influencers + landing pages = measurable revenue.
              </p>
            </div>

            <div className={styles.card}>
              {/* Icon Img  */}
              <div className={styles.cardIcon}>
                {" "}
                <Image
                  fill
                  quality={70}
                  src="/rdx/s2/rdxicn6.png"
                  alt="India growth market icon"
                  title="Real skills icon"
                />
              </div>
              <h3 className={styles.cardHeading}>Real skills beat certificate</h3>
              <p className={styles.cardText}>
                Portfolios with live results move resumes to the top of the pile.

              </p>
            </div>
          </div>
        </div>
      </section>

      {/* From Here The Section 4 Is Starting  */}
      <section className={styles.section4}>
        {/* Centered Align Div  */}
        <div className={styles.centeredContainer}>
          {/* Left Side Container  */}
          <div className={styles.leftSide}>
            <div className={styles.leftImage}>
              {" "}
              <Image
                fill
                src="/rdx/s4/rdxs4.png"
                alt="Career pathways illustration"
                title="Career pathways illustration"
              />
            </div>
          </div>

          {/* Right Side Container  */}
          <div className={styles.rightSide}>
            <div className={styles.infoHeader}>
              <p className={styles.infoText}>Info</p>
            </div>
            <div className={styles.headingContainer}>
              <h2 className={styles.sectionHeading}>
                Career Pathways You Can Step Into
              </h2>
            </div>
            <ul className={styles.careerList}>
              <li>
                <div className={styles.careerItem}>
                  <div className={styles.verifyIcon}>
                    <Image fill src="/rdx/s4/rdxveriify.png" alt="Verified" title="Verified career pathway" />
                  </div>
                  <p className={styles.careerText}>
                    Performance Marketing Specialist (Meta/Google)
                  </p>
                </div>
              </li>
              <li>
                <div className={styles.careerItem}>
                  <div className={styles.verifyIcon}>
                    <Image fill src="/rdx/s4/rdxveriify.png" alt="Verified" title="Verified career pathway" />
                  </div>
                  <p className={styles.careerText}>
                    SEO Strategist / Technical SEO
                  </p>
                </div>
              </li>

              <li>
                <div className={styles.careerItem}>
                  <div className={styles.verifyIcon}>
                    <Image fill src="/rdx/s4/rdxveriify.png" alt="Verified" title="Verified career pathway" />
                  </div>
                  <p className={styles.careerText}>
                    Social Media & Content Strategist (IG/YouTube/LinkedIn)
                  </p>
                </div>
              </li>

              <li>
                <div className={styles.careerItem}>
                  <div className={styles.verifyIcon}>
                    <Image fill src="/rdx/s4/rdxveriify.png" alt="Verified" title="Verified career pathway" />
                  </div>
                  <p className={styles.careerText}>
                    Marketing Analyst (GA4, Looker/Data Studio)
                  </p>
                </div>
              </li>

              <li>
                <div className={styles.careerItem}>
                  <div className={styles.verifyIcon}>
                    <Image fill src="/rdx/s4/rdxveriify.png" alt="Verified" title="Verified career pathway" />
                  </div>
                  <p className={styles.careerText}>
                    Marketing Automation & CRM (HubSpot/Zoho/WhatsApp)
                  </p>
                </div>
              </li>

              <li>
                <div className={styles.careerItem}>
                  <div className={styles.verifyIcon}>
                    <Image fill src="/rdx/s4/rdxveriify.png" alt="Verified" title="Verified career pathway" />
                  </div>
                  <p className={styles.careerText}>
                    Conversion Rate Optimization (CRO) & Landing Page Specialist
                  </p>
                </div>
              </li>

              <li>
                <div className={styles.careerItem}>
                  <div className={styles.verifyIcon}>
                    <Image fill src="/rdx/s4/rdxveriify.png" alt="Verified" title="Verified career pathway" />
                  </div>
                  <p className={styles.careerText}>
                    E-commerce Performance Marketer (D2C & Marketplaces)
                  </p>
                </div>
              </li>

              <li>
                <div className={styles.careerItem}>
                  <div className={styles.verifyIcon}>
                    <Image fill src="/rdx/s4/rdxveriify.png" alt="Verified" title="Verified career pathway" />
                  </div>
                  <p className={styles.careerText}>
                    Media Planner / Digital Strategist
                  </p>
                </div>
              </li>

              <li>
                <div className={styles.careerItem}>
                  <div className={styles.verifyIcon}>
                    <Image fill src="/rdx/s4/rdxveriify.png" alt="Verified" title="Verified career pathway" />
                  </div>
                  <p className={styles.careerText}>
                    Influencer & Partnerships Manager
                  </p>
                </div>
              </li>

              <li>
                <div className={styles.careerItem}>
                  <div className={styles.verifyIcon}>
                    <Image fill src="/rdx/s4/rdxveriify.png" alt="Verified" title="Verified career pathway" />
                  </div>
                  <p className={styles.careerText}>
                    AI-for-Marketing Specialist (creative ops, testing, prompts)
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* From Here The Section 5 Is Starting  */}
      <section className={styles.s5}>
        {/* Left Side Girl Image Png  */}
        <div className={styles.leftImage}>
          <img
            src="/rdx/s5/grlImgPng.png"
            alt="RDX"
            title="Digital marketing course visual"
            className={styles.girlImage}
          />
        </div>

        {/* Right Side Actual Content Div  */}
        <div className={styles.rightContent}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.heading2}>
              The Course We Offer: Digital Marketing Mastery
            </h2>
            <p className={styles.paragraph}>
              A practitioner-led program designed by an agency that ships
              campaigns daily. Each module ends with a hands-on project;
              everything rolls into a final Capstone you can show in interviews.
            </p>
            <div className={styles.listContainer}>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <p>
                    <b> 12 Weeks :</b> 2–3 sessions/week · Live + recorded
                    access
                  </p>
                </li>
                <li className={styles.listItem}>
                  <p>
                    <b>Tool labs:</b> Google Ads, Meta Ads, GA4, GTM, Looker
                    Studio, Search Console, ChatGPT & AI tools, HubSpot/Zoho
                  </p>
                </li>
                <li className={styles.listItem}>
                  <p>
                    <b>Live briefs :</b> from the RMW ecosystem (when available)
                  </p>
                </li>
                <li className={styles.listItem}>
                  <p>
                    <b>Career sprint :</b> resume clinic, portfolio reviews,
                    mock interviews
                  </p>
                </li>
                <li className={styles.listItem}>
                  <p>
                    <b>Language:</b> English (with Hinglish comfort where
                    helpful)
                  </p>
                </li>
                <li className={styles.listItem}>
                  <p>
                    <b>Batch size :</b> Small, so you get real feedback
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <button
                className={styles.advisorButton}
                onClick={modalFormHandler}
              >
                Talk to an Advisor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* From Here The Section 6 Is Starting  */}
      <section className={styles.s6}>
        {/* Centered Align Div  */}
        <div className={styles.s6centeredDiv}>
          {/* Top Header Div  */}
          <div className={styles.topHeader}>
            <div className={styles.headerBorder}>
              <p className={styles.aboutText}>About</p>
              <h2 className={styles.mainHeading}>Why RDX Works</h2>
            </div>
          </div>

          {/* Main Container  */}
          <div className={styles.mainContainer}>
            {/* Left Side Div  */}
            <div className={styles.leftSide6}>
              {/* Cards  */}
              <div className={styles.s6card}>
                <h3 className={styles.cardTitle}>Agency DNA</h3>
                <p className={styles.cardDescription}>
                  Agency DNA: Built by Ritz Media World; we practice what we
                  teach.
                </p>
              </div>

              <div className={styles.s6card}>
                <h3 className={styles.cardTitle}>Tool-first, fluff-free</h3>
                <p className={styles.cardDescription}>
                  You will touch the dashboards every week.
                </p>
              </div>

              <div className={styles.s6card}>
                <h3 className={styles.cardTitle}>Portfolio over PowerPoint</h3>
                <p className={styles.cardDescription}>Proof beats theory.</p>
              </div>

              <div className={styles.s6card}>
                <h3 className={styles.cardTitle}>Career support</h3>
                <p className={styles.cardDescription}>
                  Mock interviews, referrals when relevant, and access to the
                  RDX Talent Pool.
                </p>
              </div>

              <div className={styles.s6card}>
                <h3 className={styles.cardTitle}>Approachable mentors</h3>
                <p className={styles.cardDescription}>
                  Clear feedback, office hours, real talk.
                </p>
              </div>
            </div>

            {/* Right Side Div  */}
            <div className={styles.rightSide6}>
              <div className={styles.imageContainer}>
                {/* Image Container  */}
                <div className={styles.mainImageWrapper}>
                  <img
                    src="/rdx/s6/rdxs6.png"
                    className={styles.mainImage}
                    alt="Why RDX works team visual"
                    title="Why RDX works team visual"
                  />
                </div>
                <div style={{ marginTop: "40px" }}>
                  <button
                    className={styles.advisorButton2}
                    onClick={modalFormHandler}
                  >
                    Talk to an Advisor
                  </button>
                </div>

                {/* Absolute Position Image  */}
                <img
                  src="/rdx/s6/rdxs62.png"
                  className={styles.absoluteImage}
                  alt="Decorative overlay"
                  title="Decorative overlay"
                />

                {/* Second Elips  */}
                <img
                  src="/rdx/s6/s6_elips.png"
                  style={{
                    width: "295.14px",
                    height: "319px",
                    position: "absolute",
                    left: "40px",
                    bottom: "0",
                    zIndex: "-1",
                  }}
                  alt="Decorative ellipse"
                  title="Decorative ellipse"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From Here The Section 7 Is Starting  */}
      <section className={styles.s7}>
        <div className={styles.s7Centered}>
          <div className={styles.s7Border}>
            <p className={styles.s7About}>About</p>
          </div>
          <h2 className={styles.s7Heading}>What You will Learn</h2>

          {/* Slider Container */}
          <div
            style={{
              overflow: "hidden",
              marginTop: "60px",
            }}
          >
            <Suspense fallback={
              <div 
                style={{ 
                  height: '400px',
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite'
                }}
              >
                <style jsx>{`
                  @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                  }
                `}</style>
              </div>
            }>
              <SwiperSlider dt={cards}></SwiperSlider>
            </Suspense>
          </div>
        </div>
      </section>

      <section className={styles.s8}>
        {/* Overlay Div */}
        <div className={styles.s8Overlay}></div>

        <div className={styles.s8Centered}>
          {/* Top Header Div */}
          <div className={styles.s8Header}>
            <h2 className={styles.s8Title}>What Learners Say</h2>
            <p className={styles.s8Subtitle}>
              Real success stories from professionals who transformed their
              careers with our performance marketing program.
            </p>
          </div>

          {/* Bottom Slider Div */}
          <div className={styles.s8Bottom}>
            {/* Slider */}
            <div className={styles.s8Slider}>
              {/* Visible Cards */}
              {s8Slides
                .slice(s8Current, s8Current + s8CardsPerView)
                .map((slide, index) => (
                  <div key={index} className={styles.s8Card}>
                    <img
                      src="/rdx/s8/tabler_quote.png"
                      alt="quote"
                      title="Quote icon"
                      className={styles.s8Quote}
                    />
                    <p className={styles.s8CardText}>{slide.text}</p>
                    <p className={styles.s8CardAuthor}>
                      {slide.author}
                      <span className={styles.s8CardRole}>{slide.role}</span>
                    </p>
                  </div>
                ))}
            </div>

            {/* Buttons and Pagination Container */}
            <div className={styles.s8Controls}>
              <div className={styles.s8Pagination}>
                {Array.from({ length: s8TotalPages }).map((_, index) => (
                  <p
                    key={index}
                    className={`${styles.s8Dot} ${
                      s8CurrentPage === index
                        ? styles.s8DotActive
                        : styles.s8DotInactive
                    }`}
                    onClick={() => setS8Current(index * s8CardsPerView)}
                  ></p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From Here The Section 9 Is Starting  */}
      <section className={styles.s9}>
        <div className={styles.s9Centered}>
          <Suspense fallback={
            <div 
              style={{ 
                height: '400px',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite'
              }}
            >
              <style jsx>{`
                @keyframes shimmer {
                  0% { background-position: -200% 0; }
                  100% { background-position: 200% 0; }
                }
              `}</style>
            </div>
          }>
            <SwiperSlider2 dataArray={slides}></SwiperSlider2>
          </Suspense>
        </div>
      </section>

      {/* From Here The Section 10 Is Starting  */}
      <section className={styles.s10}>
        {/* Absolute Position Elips  */}
        <img
          src="/rdx/s10/s10_elips.png"
          alt="rmw"
          title="Section background ellipse"
          className={styles.s10Elips}
        />

        {/* Centered Align Div  */}
        <div className={styles.s10Centered}>
          {/* Top Header Div  */}
          <div className={styles.s10Header}>
            <h2 className={styles.s10Title}>Frequently Asked Questions</h2>
            <p className={styles.s10Subtitle}>
              Real success stories from professionals who transformed their
              careers with our performance marketing program.
            </p>
          </div>

          {/* Center Align Div  */}
          <div className={styles.s10Center}>
            {/* Cards  */}
            {faqs.map((faq, index) => (
              <div key={index} className={styles.s10CardWrapper}>
                {/* Card (Question) */}
                <div
                  className={styles.s10Card}
                  onClick={() => toggleAccordion(index)}
                  style={{ cursor: "pointer" }}
                >
                  <h3 className={styles.s10CardText}>{faq.question}</h3>
                  <img
                    src={
                      openIndex === index
                        ? "/rdx/s10/icons8_minus.png"
                        : "/rdx/s10/icons8_plus.png"
                    }
                    alt="toggle"
                    title={openIndex === index ? "Collapse answer" : "Expand answer"}
                    className={styles.s10CardIcon}
                  />
                </div>

                {/* Accordion Content with Animation */}
                <div
                  className={styles.s10AccordionContent}
                  style={{
                    maxHeight: openIndex === index ? "200px" : "0",
                    overflow: "hidden",
                    backgroundColor: "white",
                    borderRadius: "0 0 10px 10px",
                    marginTop: "-20px",
                    padding: openIndex === index ? "15px 35px" : "0 35px",
                    fontSize: "16px",
                    fontWeight: 400,
                    transition: "all 0.3s ease",
                  }}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button className={styles.advisorButton} onClick={modalFormHandler}>
              Talk to an Advisor
            </button>
          </div>
          {/* Bottom Align Div  */}
          <div className={styles.s10Bottom}>
            {/* Left Side Div  */}
            <div className={styles.s10Left}>
              {/* Elips */}
              <img
                src="/rdx/s10/s-11-elps.png"
                alt="elips"
                title="Top decorative ellipse"
                className={styles.s10ElipsSmallTop}
              />
              <img
                src="/rdx/s10/s-12-elps.png"
                alt="elips"
                title="Bottom decorative ellipse"
                className={styles.s10ElipsSmallBottom}
              />
              <div className={styles.s10LeftContent}>
                <h2 className={styles.s10LeftTitle}>Fees Structure & EMIs</h2>
                <p className={styles.s10LeftText}>
                  Transparent fees. Early-bird offers and EMI options are
                  available on request.
                </p>
                <p className={styles.s10LeftText}>
                  Ask our team for the current cohort pricing
                </p>
                <button
                  className={styles.advisorButton}
                  onClick={modalFormHandler}
                >
                  Talk to an Advisor
                </button>
              </div>
            </div>

            {/* Right Side Div  */}
            <div className={styles.s10Right}>
              <img
                src="/rdx/s10/s10Img.png"
                alt="RDX"
                title="Fees and EMI illustration"
                className={styles.s10RightImage}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

RDXCourseContent.displayName = "RDXCourseContent";

export default RDXCourseContent;
