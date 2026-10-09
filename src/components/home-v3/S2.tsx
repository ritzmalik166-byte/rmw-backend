"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import styles from "./S3.module.css";
import styles2 from "./page.module.css";
import CanvasTransition from "./CanvasTransition";
interface CardItem {
  act: boolean;
  id: string;
  ttl: string;
  img: string;
  para: string;
  link: string;
}
function S2() {
  const [activeCard, setActiveCard] = useState<CardItem>({
    act: true,
    id: "01",
    ttl: "Digital Marketing",
    img: "/varunimage/digital-marketing-brand.jpg",
    para: "We design digital strategies that balance reach and relevance, combining performance marketing, data insights, and platform intelligence to drive sustained visibility, intent, and measurable business growth.",
    link: "https://ritzmediaworld.com/services/digital-marketing",
  });

  const [prevImage, setPrevImage] = useState<string>("/varunimage/digital-marketing-brand.jpg");
  const [nextImage, setNextImage] = useState<string>("/varunimage/digital-marketing-brand.jpg");
  const [showTransition, setShowTransition] = useState(false);
  const [displayImage, setDisplayImage] = useState<string>("/varunimage/digital-marketing-brand.jpg");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoType, setVideoType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const pendingCardRef = useRef<CardItem | null>(null);
  const imagePreloadRef = useRef<HTMLImageElement | null>(null);
  const stateChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleCardHover = (ob: CardItem) => {
    if (ob.img !== activeCard.img && !showTransition) {
      setPrevImage(activeCard.img);
      setNextImage(ob.img);
      setDisplayImage(activeCard.img);
      pendingCardRef.current = ob;

      if (stateChangeTimeoutRef.current) {
        clearTimeout(stateChangeTimeoutRef.current);
      }
      setShowTransition(true);

      const totalAnimationTime = 350;
      const stateChangeTime = totalAnimationTime * 0.35;

      stateChangeTimeoutRef.current = setTimeout(() => {
        if (pendingCardRef.current) {
          const newCard = { ...pendingCardRef.current };

          setDisplayImage(newCard.img);

          setActiveCard((prev) => {
            prev.act = false;
            newCard.act = true;
            return newCard;
          });
        }
      }, stateChangeTime);

      const img = document.createElement("img");
      img.src = ob.img;
      imagePreloadRef.current = img;
    }
  };

  const handleTransitionComplete = () => {
    if (stateChangeTimeoutRef.current) {
      clearTimeout(stateChangeTimeoutRef.current);
      stateChangeTimeoutRef.current = null;
    }

    if (pendingCardRef.current) {
      const newCard = { ...pendingCardRef.current };

      setDisplayImage(newCard.img);

      setActiveCard((prev) => {
        prev.act = false;
        newCard.act = true;
        return newCard;
      });

      pendingCardRef.current = null;

      setShowTransition(false);
    }
  };

  useEffect(() => {
    const determineVideoType = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVideoType('desktop');
      } else if (width >= 768) {
        setVideoType('tablet');
      } else {
        setVideoType('mobile');
      }
    };

    determineVideoType();

    window.addEventListener('resize', determineVideoType);
    return () => window.removeEventListener('resize', determineVideoType);
  }, []);

  const handlePlayClick = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setVideoType('desktop');
    } else if (width >= 768) {
      setVideoType('tablet');
    } else {
      setVideoType('mobile');
    }

    setIsVideoOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
    document.body.style.overflow = 'unset';
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const getVideoSource = () => {
    switch (videoType) {
      case 'desktop':
        return '/new-page/dekstop-vd.mp4';
      case 'tablet':
        return '/new-page/tab-vd.mp4';
      case 'mobile':
        return '/new-page/mobile-vd.mp4';
      default:
        return '/new-page/dekstop-vd.mp4';
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <section className="bg-white w-full flex flex-col items-center justify-center min-h-screen py-10 sm:py-14 lg:py-[70px]  px-0">
      {/* Centered Align Main Container  */}
      <div className={`w-full  flex flex-col gap-8 sm:gap-9 lg:gap-10 xl:gap-18 ${styles.container}`}>
        {/* Row 1  */}
        <div className="w-full flex flex-col lg:flex-row justify-between gap-8 lg:gap-0 xl:gap-10">
          {/* Col 1  */}
          <div className="w-full xl:max-w-[422px] lg:max-w-[380px] xl:w-auto flex flex-col gap-4 sm:gap-5 lg:gap-6">
            <h2 className="font-[700] text-[22px] sm:text-[26px] xl:text-[30px] text-center lg:text-left" style={{
              fontFamily: 'MontserratBold',
            }}>
              What can you expect from us?
            </h2>
            <p className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px] text-center lg:text-left" style={{
              fontFamily: 'OpenSansRegular',
            }}>
              We create campaigns that look great and work even better, delivering consistent results you can trust. At{" "}
              <b className="text-[#C99237]" style={{ fontFamily: "OpenSansBold" }}>Ritz Media World</b>, we combine creativity with strategy to earn our reputation as the best{" "}
              <b className="text-[#C99237]" style={{ fontFamily: "OpenSansBold" }}>advertising agency</b> for brands looking to grow. Your trusted advertising partner in Noida, we&apos;re here to make every campaign count.

            </p>
            <button onClick={() => window.open("https://ritzmediaworld.com/services", "_blank")} className="w-full sm:w-[200px] lg:w-[219px] h-[48px] sm:h-[50px] lg:h-[54px] border-[1px] border-[#C99237] rounded-[5px] font-[600] text-[14px] sm:text-[14.5px] lg:text-[15px] s1-btn-transparent cursor-pointer  self-center lg:self-start">
              <p>Click to know more</p>
            </button>
          </div>
          {/* Col 2 */}
          <div className="w-full lg:w-[355px] block md:hidden lg:block h-[250px] sm:h-[300px] lg:h-[370px] relative mx-auto lg:mx-0">
            <Image src={"/home-v3/s2/800-x-800.jpg"} alt="rmw" title="rmw" fill className="object-contain"></Image>
          </div>

          {/* Col 3  */}
          <div className="w-full lg:w-[425px] block md:hidden lg:block h-[250px] sm:h-[280px] lg:h-[350px]">
            {/* Row 1  */}
            <div className="flex w-full h-[50%] border-b-[1px] border-b-[#AFAFAF]">
              <div className="w-[50%] h-full flex flex-col justify-center items-center text-center border-r-[1px] border-r-[#AFAFAF] ">
                <p className="font-[700] text-[36px] sm:text-[48px] xl:text-[60px] text-[#0F1640]" style={{
                  fontFamily: 'MontserratBold',
                }}>1M+</p>
                <p className="font-[600] text-[13px] sm:text-[14px] lg:text-[16px]" style={{
                  fontFamily: 'OpenSansSemiBold',
                }}>Campaigns Executed</p>
              </div>
              <div className="w-[50%] h-full flex flex-col justify-center items-center text-center ">
                <p className="font-[700] text-[36px] sm:text-[48px] xl:text-[60px] text-[#0F1640]" style={{
                  fontFamily: 'MontserratBold',
                }}>1K+</p>
                <p className="font-[600] text-[13px] sm:text-[14px] lg:text-[16px]" style={{
                  fontFamily: 'OpenSansSemiBold',
                }}>Happy Clients</p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex w-full h-[50%]">
              <div className="w-[50%] h-full flex flex-col justify-center items-center text-center border-r-[1px] border-r-[#AFAFAF]">
                <p className="font-[700] text-[36px] sm:text-[48px] xl:text-[60px] text-[#0F1640]" style={{
                  fontFamily: 'MontserratBold',
                }}>500+</p>
                <p className="font-[600] text-[13px] sm:text-[14px] lg:text-[16px]" style={{
                  fontFamily: 'OpenSansSemiBold',
                }}>Solutions</p>
              </div>
              <div className="w-[50%] h-full flex flex-col justify-center items-center text-center">
                <p className="font-[700] text-[36px] sm:text-[48px] xl:text-[60px] text-[#0F1640]" style={{
                  fontFamily: 'MontserratBold',
                }}>1B+</p>
                <p className="font-[600] text-[13px] sm:text-[14px] lg:text-[16px]" style={{
                  fontFamily: 'OpenSansSemiBold',
                }}>Impressions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full hidden md:flex lg:hidden justify-between">  {/* Col 2 */}
          <div className="w-full lg:w-[355px] h-[250px] sm:h-[300px] lg:h-[370px] relative mx-auto lg:mx-0">
            <Image src={"/home-v3/s2/800-x-800.jpg"} alt="rmw" title="rmw" fill className="object-contain"></Image>
          </div>

          {/* Col 3  */}
          <div className="w-full lg:w-[425px] h-[250px] sm:h-[280px] lg:h-[350px]">
            {/* Row 1  */}
            <div className="flex w-full h-[50%] border-b-[1px] border-b-[#AFAFAF]">
              <div className="w-[50%] h-full flex flex-col justify-center items-center text-center border-r-[1px] border-r-[#AFAFAF] ">
                <p className="font-[700] text-[36px] sm:text-[48px] xl:text-[60px] text-[#0F1640]" style={{
                  fontFamily: 'MontserratBold',
                }}>1M+</p>
                <p className="font-[600] text-[13px] sm:text-[14px] lg:text-[16px]" style={{
                  fontFamily: 'OpenSansSemiBold',
                }}>Campaigns Executed</p>
              </div>
              <div className="w-[50%] h-full flex flex-col justify-center items-center text-center ">
                <p className="font-[700] text-[36px] sm:text-[48px] xl:text-[60px] text-[#0F1640]" style={{
                  fontFamily: 'MontserratBold',
                }}>1K+</p>
                <p className="font-[600] text-[13px] sm:text-[14px] lg:text-[16px]" style={{
                  fontFamily: 'OpenSansSemiBold',
                }}>Happy Clients</p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex w-full h-[50%]">
              <div className="w-[50%] h-full flex flex-col justify-center items-center text-center border-r-[1px] border-r-[#AFAFAF]">
                <p className="font-[700] text-[36px] sm:text-[48px] xl:text-[60px] text-[#0F1640]" style={{
                  fontFamily: 'MontserratBold',
                }}>500+</p>
                <p className="font-[600] text-[13px] sm:text-[14px] lg:text-[16px]" style={{
                  fontFamily: 'OpenSansSemiBold',
                }}>Solutions</p>
              </div>
              <div className="w-[50%] h-full flex flex-col justify-center items-center text-center">
                <p className="font-[700] text-[36px] sm:text-[48px] xl:text-[60px] text-[#0F1640]" style={{
                  fontFamily: 'MontserratBold',
                }}>1B+</p>
                <p className="font-[600] text-[13px] sm:text-[14px] lg:text-[16px]" style={{
                  fontFamily: 'OpenSansSemiBold',
                }}>Impressions</p>
              </div>
            </div>
          </div></div>
        {/* Row 2  */}
        <div className="w-full">
          {/* Row 1  */}
          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-20 xl:gap-30 border-[1px] border-[#E2E2E2] py-6 sm:py-7 lg:py-8 px-4 sm:px-6 lg:px-0">
            <div className="w-full sm:w-[280px] flex flex-col justify-center items-center gap-2 text-center">
              <img src="/home-v3/s2/clock.png" alt="RMW" title="RMW" className="w-[39px] h-auto" />
              <h3 className="font-[600] text-[18px] sm:text-[19px] lg:text-[20px]" style={{
                fontFamily: 'MontserratSemiBold',
              }}>
                Global Reach <br /> Local Alignment
              </h3>
              <p className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px]" style={{
                fontFamily: 'OpenSansRegular',
              }}>
                A global mindset aligned with regional market realities.
              </p>
            </div>

            <div className="w-full sm:w-[280px] flex flex-col justify-center items-center gap-2 text-center">
              <img src="/home-v3/s2/board.png" alt="RMW" title="RMW" className="w-[49px] h-auto" />
              <h3 className="font-[600] text-[18px] sm:text-[19px] lg:text-[20px]" style={{
                fontFamily: 'MontserratSemiBold',
              }}>
                Outcome-Focused Execution
              </h3>
              <p className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px]" style={{
                fontFamily: 'OpenSansRegular',
              }}>
                Experienced teams driving solutions based on business objectives.
              </p>
            </div>

            <div className="w-full sm:w-[280px] flex flex-col justify-center items-center gap-2 text-center">
              <img src="/home-v3/s2/wave.png" alt="RMW" title="RMW" className="w-[37px] h-auto" />
              <h3 className="font-[600] text-[18px] sm:text-[19px] lg:text-[20px]" style={{
                fontFamily: 'MontserratSemiBold',
              }}>
                Creative Integrity
              </h3>
              <p className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px]" style={{
                fontFamily: 'OpenSansRegular',
              }}>
                Building work that respects brand identity and long-term credibility.
              </p>
            </div>
          </div>

          {/* Row 2  */}
          <div className="w-full h-[250px] sm:h-[350px] lg:h-[426px] relative">
            {/* <Image src={"/home-v3/s2/team-bg.jpeg"} alt="" fill className="object-cover"></Image> */}
            <Image src={"/home-v3/s2/team-bg1.png"} alt="Ritz Media World – team" title="Ritz Media World – team" fill className="object-cover"></Image>

            <div
              onClick={handlePlayClick}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              className="cursor-pointer w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] lg:w-[54px] lg:h-[54px] rounded-full flex justify-center items-center bg-[#FFFFFF] z-10 hover:scale-110 transition-transform"
            >
              <svg
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 4.46558C9.66667 4.85048 9.66667 5.81273 9 6.19763L1.5 10.5278C0.833332 10.9127 -5.28905e-07 10.4315 -4.95256e-07 9.66173L-1.16704e-07 1.00148C-8.30548e-08 0.231676 0.833333 -0.249449 1.5 0.135451L9 4.46558Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Row 3  */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0" data-no-gsap-animation>
          {/* Left Side Container  */}
          <div className="relative w-full sm:w-[194px] h-auto sm:h-[156px] border-b-[1px] border-b-[#D9D9D9] sm:border-b-0 sm:border-r-[1px] border-r-[#D9D9D9] flex items-center justify-center sm:justify-start pb-4 sm:pb-0">
            <p className="font-[700] text-[20px] sm:text-[22px] lg:text-[24px]" style={{
              fontFamily: 'MontserratBold',
            }}>Brands That Trust Us</p>

            <p className="absolute top-[50%] transform -translate-y-[50%] -right-3 hidden sm:block">
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.25 6.49512L-6.11749e-07 12.9903L-4.39216e-08 -7.39247e-05L11.25 6.49512Z"
                  fill="#D9D9D9"
                />
              </svg>
            </p>
          </div>

          {/* Right Side Container  */}
          <div className="flex w-full md:pl-[47px] sm:w-[calc(100%-194px)] overflow-x-hidden flex-col md:flex-row items-center md:items-start gap-4 md:gap-0">
            {/* Slider Container  */}
            <div className="w-full overflow-hidden">
              <div className={`flex gap-4 sm:gap-6 lg:gap-8 w-max ${styles2.clientSlider}`}>
                {[
                  "/new-page/logos/prm-9.jpg",
                  "/new-page/logos/prm-22.jpg",
                  "/new-page/logos/mpf-bl.png",
                  "/new-page/logos/rdx-lg.avif",
                  "/new-page/logos/prm-9.jpg",
                  "/new-page/logos/prm-2.png",
                  // duplicate set 1
                  "/new-page/logos/prm-3.png",
                  "/new-page/logos/prm-4.png",
                  "/new-page/logos/prm-5.png",
                  "/new-page/logos/prm-6.png",
                  "/new-page/logos/prm-9.jpg",
                  "/new-page/logos/prm-7.png",
                  // duplicate set 2 for seamless loop
                  "/new-page/logos/prm-8.jpg",
                  "/new-page/logos/prm-10.png",
                  "/new-page/logos/prm-11.jpg",
                  "/new-page/logos/prm-12.png",
                  "/new-page/logos/exotica-logo.png",
                  "/new-page/logos/prm-14.png",
                  "/new-page/logos/prm-16.png",
                  "/new-page/logos/prm-17.jpg",
                  "/new-page/logos/prm-18.png",
                  "/new-page/logos/prm-19.png",
                  "/new-page/logos/prm-20.jpg",
                  "/new-page/logos/scnd-3.jpg",
                  "/new-page/logos/scnd-4.jpg",
                  "/new-page/logos/scnd-5.jpg",
                  "/new-page/logos/scnd-6.jpg",
                  "/new-page/logos/scnd-7.jpg",
                  "/new-page/logos/scnd-8.jpg",
                  "/new-page/logos/scnd-9.jpg",
                  "/new-page/logos/scnd-10.jpg",
                  "/new-page/logos/scnd-11.jpg",
                  "/new-page/logos/scnd-12.jpg",
                  "/new-page/logos/scnd-13.jpg",
                  "/new-page/logos/scnd-14.jpg",
                  "/new-page/logos/scnd-15.jpg",
                  "/new-page/logos/scnd-16.jpg",
                  "/new-page/logos/scnd-17.jpg",
                  "/new-page/logos/scnd-18.jpg",
                ].map((url, idx) => (
                  <div
                    key={idx}
                    className="w-[100px] h-[56px] sm:w-[120px] sm:h-[67px] lg:w-[146px] lg:h-[81px] relative shrink-0"
                  >
                    <Image src={url} fill alt="RMW" title="RMW" className="object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* View More Container  */}
            <div className="w-[100px] sm:w-[120px] lg:w-[146px] h-[56px] sm:h-[67px] lg:h-[81px] flex justify-center items-center flex-shrink-0">
              <Link
                title="Show more"
                href={"https://ritzmediaworld.com/about.html"}
                target="_blank"
                className="font-[600] text-[14px] sm:text-[15px] lg:text-[16px] cursor-pointer border-b"
              >
                Show more
              </Link>
            </div>
          </div>
        </div>

        {/* Row 4  */}
        <div className="w-full flex flex-col gap-8 sm:gap-10 lg:gap-12">
          {/* Div 1  */}
          <div className="w-full">
            <h2 className="font-[700] text-[24px] sm:text-[28px] lg:text-[36px] text-center md:text-left" style={{
              fontFamily: 'MontserratBold',
            }}  >
              Choose Your Brand Journey
            </h2>
            <p className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px] text-center md:text-left" style={{
              fontFamily: 'OpenSansRegular',
            }}>
              Tailored growth programmes engineered for the industries and
              audiences most.
            </p>
          </div>

          {/* Div 2  */}
          <div className="w-full flex flex-col lg:flex-row justify-between gap-8 lg:gap-0">
            {/* Left Side Container  */}
            <div className="lg:flex lg:flex-col grid grid-cols-2 gap-4 lg:gap-4">
              {[
                {
                  act: true,
                  id: "01",
                  ttl: "Digital Marketing",
                  img: "/varunimage/digital-marketing-brand.jpg",
                  para: "We design digital strategies that balance reach and relevance, combining performance marketing, data insights, and platform intelligence to drive sustained visibility, intent, and measurable business growth.",
                  link: "https://ritzmediaworld.com/services/digital-marketing",
                },
                {
                  act: false,
                  id: "02",
                  ttl: "Creative Service",
                  img: "/varunimage/creative-brand.jpg",
                  para: "We craft brand identities and visual systems that feel consistent, contemporary, and meaningful, helping brands communicate clearly while standing out across digital, print, and physical environments.",
                  link: "https://ritzmediaworld.com/services/creative-services",
                },
                {
                  act: false,
                  id: "03",
                  ttl: "Print Advertisement",
                  img: "/varunimage/print-brand.jpg",
                  para: "We create high-impact print campaigns that deliver credibility and recall, blending strong creative thinking with strategic placements across newspapers, magazines, outdoor formats, and on-ground brand touchpoints.",
                  link: "https://ritzmediaworld.com/services/print-advertising",
                },
                {
                  act: false,
                  id: "04",
                  ttl: "Radio Advertisement",
                  img: "/varunimage/radio-brand.jpg",
                  para: "We develop audio-led brand stories that connect emotionally with listeners, using strategic scripting, voice, and media planning to deliver reach, frequency, and regional relevance.",
                  link: "https://ritzmediaworld.com/services/radio-advertising",
                },
                {
                  act: false,
                  id: "05",
                  ttl: "Content Marketing",
                  img: "/varunimage/content-brand.jpg",
                  para: "We plan and create content that attracts, educates, and nurtures your audience, building brand authority, engagement, and long-term trust through consistent, platform-native storytelling.",
                  link: "https://ritzmediaworld.com/services/contents-marketing",
                },
                {
                  act: false,
                  id: "06",
                  ttl: "Web Development",
                  img: "/varunimage/webdevelopment.jpg",
                  para: "We build digital platforms that are intuitive, scalable, and performance-ready, aligning design, user experience, and technology to support brand credibility, discovery, and conversion.",
                  link: "https://ritzmediaworld.com/services/web-designing-and-development",
                },
                {
                  act: false,
                  id: "07",
                  ttl: "Influencer Marketing",
                  img: "/varunimage/influencer-brand.jpg",
                  para: "We enable authentic influencer collaborations that align with brand values, helping businesses reach niche communities through credible voices, contextual storytelling, and measurable campaign performance.",
                  link: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india",
                },
                {
                  act: false,
                  id: "08",
                  ttl: "Celebrity Endorsement",
                  img: "/varunimage/celebraity-brand.jpg",
                  para: "We manage strategic celebrity associations that enhance brand perception, handling selection, negotiation, and execution to ensure relevance, credibility, and long-term brand equity.",
                  link: "https://ritzmediaworld.com/services/celebrity-endorsements",
                },
              ].map((ob) => {
                return (
                  <div
                    key={ob.id}
                    onClick={() => handleCardHover(ob)}
                    // onMouseEnter={() => handleCardHover(ob)}
                    className={`relative xl:pl-16 flex gap-2 sm:gap-3 lg:gap-4 ${ob.ttl === activeCard.ttl ? "text-[#000000] " + styles.activeCardLine : "text-[#C5C5C5]"
                      } cursor-pointer transition-colors duration-200`}
                  >
                    <p className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px]" style={{
                      fontFamily: 'MontserratRegular',
                    }}>{ob.id}</p>
                    <h3 className="font-[700] text-[14px] md:text-[24px] xl:text-[30px] " style={{
                      fontFamily: 'OpenSansBold',
                    }}>{ob.ttl}</h3>
                  </div>
                );
              })}
            </div>
            {/* Right Side Container  */}
            <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 w-full lg:max-w-[580px] xl:max-w-[602px] xl:pr-0 lg:pr-8">
              <div className="w-full xl:w-[602px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[336px] relative overflow-hidden mx-auto lg:mx-0 cursor-pointer">
                <Image
                  src={displayImage}
                  onClick={() => window.open(activeCard.link, "_blank")}
                  alt="RMW"
                  title="RMW"
                  fill
                  priority
                  style={{ transition: 'opacity 0.1s' }}
                />
                {showTransition && (
                  <CanvasTransition
                    key={`${prevImage}-${nextImage}`}
                    width={602}
                    height={336}
                    oldImage={prevImage}
                    newImage={nextImage}
                    onComplete={handleTransitionComplete}
                  />
                )}
              </div>
              <p className="font-[400] text-[13px] sm:text-[13.5px] lg:text-[14px] text-center md:text-left" style={{
                fontFamily: 'OpenSansRegular',
              }}>
                {activeCard.para}
              </p>
              <button onClick={() => window.open(activeCard.link, "_blank")} className="w-full sm:w-[240px] lg:max-w-[261px] font-[600] text-[14px] sm:text-[14.5px] lg:text-[15px] h-[48px] sm:h-[50px] lg:h-[54px] rounded-[5px] cursor-pointer border-[1px] border-[#C99237]  s1-btn-transparent">
                <p>Explore {activeCard.ttl}</p>
              </button>
            </div>
          </div>

          {/* Div 3  */}
          <div className="w-full">
            <p className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px] text-center md:text-left" style={{
              fontFamily: 'OpenSansRegular',
            }}>
              Not sure which path fits your brand? <br className="md:hidden block" /> 
              <span className="font-[600] text-[14px] sm:text-[15px] lg:text-[16px] underline cursor-pointer hover:text-[#C99237] transition-colors duration-200" style={{
                fontFamily: 'OpenSansSemiBold',
              }} onClick={() => window.open("https://ritzmediaworld.com/contact.html", "_blank")}>
                Let's discuss your unique needs
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[9999] flex justify-center items-center"
          onClick={handleCloseVideo}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-90"></div>

          {/* Video Container */}
          <div
            className="relative w-[90vw] h-[90vh] flex justify-center items-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseVideo}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 flex justify-center items-center cursor-pointer transition-all hover:scale-110"
              aria-label="Close video"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Single Video Element - Source changes based on screen size */}
            <video
              ref={videoRef}
              src={getVideoSource()}
              className="w-full h-full object-contain"
              autoPlay
              controls
              playsInline
              key={videoType} // Force re-render when video type changes
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default S2;