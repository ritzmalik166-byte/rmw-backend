"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import styles from "../page.module.css";
import S6 from "../S6";
import S7 from "../S7";
import ServiceCard from "./cards/ServiceCard";

import styles2 from "./page.module.css";
import { BsArrowUpRight } from "react-icons/bs";
import BrandImpactSection2 from "@/components/copy/BrandImpactSection2";
import WhiteLayer from "./WhiteLayer";
import BlueLayer from "./BlueLayer";

interface ServiceSubItem {
    service_id: number;
    [key: string]: any;
}

interface ServiceItem {
    id: number;
    sub?: ServiceSubItem[];
    [key: string]: any;
}

interface Section3Props {
    servicesData: ServiceItem[] | null | undefined;
}

function Section3({ servicesData }: Section3Props) {
    const [loader, setLoader] = useState<boolean>(true);
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [phoneError, setPhoneError] = useState("");

    const [modal, setModal] = useState<{
        open: boolean;
        status: "success" | "error";
        message: string;
    }>({
        open: false,
        status: "success",
        message: "",
    });

    const validatePhone = (phoneNumber: string): string => {
        const digitsOnly = phoneNumber.replace(/\D/g, "");

        if (!phoneNumber.trim()) {
            return "Phone number is required";
        }

        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(phoneNumber)) {
            return "Phone number can only contain digits, spaces, +, -, and ()";
        }

        if (digitsOnly.length < 10) {
            return "Phone number must have at least 10 digits";
        }

        if (digitsOnly.length > 13) {
            return "Phone number cannot exceed 13 digits";
        }

        // Check for repetitive digits (e.g., 9999999999, 8888888888, etc.)
        if (digitsOnly.length >= 10) {
            const firstDigit = digitsOnly[0];
            if (digitsOnly.split('').every(digit => digit === firstDigit)) {
                return "Please enter a valid phone number";
            }
        }

        if (digitsOnly.length === 10) {
            if (!/^[6-9]/.test(digitsOnly)) {
                return "Indian mobile numbers should start with 6, 7, 8, or 9";
            }
        } else if (digitsOnly.length === 11) {
            if (!/^0[6-9]/.test(digitsOnly)) {
                return "Invalid phone number format";
            }
        } else if (digitsOnly.length === 12 || digitsOnly.length === 13) {
            if (!/^91[6-9]/.test(digitsOnly)) {
                return "Invalid country code. Use +91 for India";
            }
        }

        return "";
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPhone(value);

        if (phoneError) {
            setPhoneError("");
        }
    };

    const handlePhoneBlur = () => {
        const error = validatePhone(phone);
        setPhoneError(error);
    };

    const downloadPDF = () => {
        const link = document.createElement("a");
        link.href = "/RMWCaseStudies_250327_081936.pdf";
        link.download = "RMWCaseStudies_250327_081936.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault();

        const phoneValidationError = validatePhone(phone);
        if (phoneValidationError) {
            setPhoneError(phoneValidationError);
            setModal({
                open: true,
                status: "error",
                message: phoneValidationError,
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const enquiryData = {
                etype: "HomePageDownload",
                name: "Home Page Visitor",
                email: "homepage@ritzmediaworld.com",
                phone: phone.trim(),
                message: "Enquiry from Home Page - 2025 Brand Impact Report Download Request",
                category: "Brand Impact Report Download",
            };

            const response = await fetch("/api/system-settings/contact-enquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(enquiryData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setModal({
                    open: true,
                    status: "success",
                    message: "Thank you! Your enquiry has been submitted successfully. The PDF will download shortly.",
                });

                setPhone("");
                setPhoneError("");

                setTimeout(() => {
                    downloadPDF();
                }, 500);
            } else {
                setModal({
                    open: true,
                    status: "error",
                    message: result.error || "Failed to submit enquiry. Please try again.",
                });
            }
        } catch (error) {
            console.error("Enquiry submission error:", error);
            setModal({
                open: true,
                status: "error",
                message: "Due to internal server errors your enquiry couldn't be sent. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (servicesData && servicesData?.length > 0) {
            setLoader(false);
            console.log(servicesData);

        }
    }, [servicesData]);

    useEffect(() => {
        if (modal.open && modal.status === "success") {
            const timer = setTimeout(() => {
                setModal({ ...modal, open: false });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [modal.open, modal.status]);


    return (
        <section className="flex justify-center items-center pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-[70px]">
            {/* Center Align Container  */}
            <div className={`flex flex-col  w-full  `}>

                {/* Row 1 For Heading  */}
                <div className={`flex items-end justify-center lg:justify-start mx-0 lg:mx-2 ${styles2.containerWidth}`}>
                    <h2 className={`font-[700] text-[#0F1640] text-[36px] ${styles2.fontmontserrat}`}>What we do </h2>

                </div>

                {/* Row 2 For Services Cards  */}
                <div className={`flex flex-col gap-3 ${styles2.containerWidth2}`}>
                    {/* Cards   */}
                    {
                        [
                            {
                                title: "Digital <br /> Marketing",
                                margin: "mr-[12px] pr-8 md:pr-40 lg:pr-18",
                                description: "Without a strategy, you're driving blindfolded in the digital world. At Ritz Media World, we specialize in social media marketing, PPC campaigns, and SEO services to make sure your brand not only survives but thrives. With innovative tactics that are effective, we have you covered whether you're searching for the top SEO company in Delhi or the best digital marketing agency in India.",
                                image: "/new-theme/digital-marketing.jpg",
                                link: "/services/digital-marketing",
                                subServices: [
                                    {
                                        title: "SEO (Search Engine Optimization)",
                                        slug: "https://ritzmediaworld.com/services/digital-marketing/search-engine-optimization-seo",
                                    },
                                    {
                                        title: "PPC (Google Ads) Services",
                                        slug: "https://ritzmediaworld.com/services/digital-marketing/ppc-google-ads-agency",
                                    },
                                    {
                                        title: "Social Media Management",
                                        slug: "https://ritzmediaworld.com/services/digital-marketing/social-media-management",
                                    },
                                    {
                                        title: "ORM (Online Reputation Management)",
                                        slug: "https://ritzmediaworld.com/services/digital-marketing/orm-in-digital-marketing",
                                    },
                                    {
                                        title: "Lead Generation",
                                        slug: "https://ritzmediaworld.com/services/digital-marketing/lead-generation",
                                    },
                                    {
                                        title: "Brand Awareness",
                                        slug: "https://ritzmediaworld.com/services/digital-marketing/brand-awareness",
                                    },
                                ]
                            },
                            {
                                title: "Creative <br /> Services",
                                margin: "lg:mr-[30px] pr-20 sm:pr-48 lg:pr-20 ",
                                description: "Creativity is not just decor. It is the heart of your brand. From branding to graphic design to memorable logos, we help you create a remarkable brand presence in the market. Are you ready to impress your audience? We make work that people might want to steal – but we hope you won’t and will keep it for yourself.",
                                image: "/new-theme/creative-services.jpg",
                                link: "/services/creative-services",
                                subServices: [
                                    {
                                        title: "Branding & Identity Development",
                                        slug: "https://ritzmediaworld.com/services/creative-services/branding-and-identity-development",
                                    },
                                    {
                                        title: "Graphic Design",
                                        slug: "https://ritzmediaworld.com/services/creative-services/graphic-designing",
                                    },
                                    {
                                        title: "Logo Design",
                                        slug: "https://ritzmediaworld.com/services/creative-services/logo-design",
                                    },
                                    {
                                        title: "Print Advertising Design",
                                        slug: "https://ritzmediaworld.com/services/creative-services/print-advertisement-design",
                                    },
                                    {
                                        title: "Packaging Design",
                                        slug: "https://ritzmediaworld.com/services/creative-services/packaging-design",
                                    },
                                ]
                            },
                            {
                                title: "Print <br /> Advertisement",
                                margin: "pr-4 pr-4 md:pr-32 lg:pr-0",
                                description: "Print advertising is more vibrant than ever in spite of the digital boom! We at Ritz Media World give your print advertisements life so they can speak for themselves. Whether you're searching for print advertising services in Delhi NCR, our ads have an impact and engage the right audience.",
                                image: "/new-theme/print-advertising.jpg",
                                link: "/services/print-advertising",
                                subServices: [
                                    {
                                        title: "Advertisement Design",
                                        slug: "https://ritzmediaworld.com/services/print-advertising/advertisement-designing",
                                    },
                                    {
                                        title: "Ad Placement",
                                        slug: "https://ritzmediaworld.com/services/print-advertising/ad-placements",
                                    },
                                    {
                                        title: "Copywriting",
                                        slug: "https://ritzmediaworld.com/services/print-advertising/copywriting",
                                    },
                                    {
                                        title: "Cost Negotiation",
                                        slug: "https://ritzmediaworld.com/services/print-advertising/negotiating-rates",
                                    },
                                    {
                                        title: "Ad Size Optimization",
                                        slug: "https://ritzmediaworld.com/services/print-advertising/ad-size-optimization",
                                    },
                                    {
                                        title: "Ad Scheduling",
                                        slug: "https://ritzmediaworld.com/services/print-advertising/advertisement-scheduling",
                                    },
                                ]
                            },
                            {
                                title: "Radio <br /> Advertising",
                                margin: "pr-8 md:pr-36 lg:pr-0  xl:pr-0 pt-0 xl:pt-0",
                                description: "People are listening, and they still have ears! We at Ritz Media World produce memorable radio ads. To make sure your message sticks, we combine persuasive soundscapes with catchy jingles. Radio advertising agencies in Delhi NCR can help you get your brand on the air.",
                                image: "/new-theme/radio-advertising.jpg",
                                link: "/services/radio-advertising",
                                subServices: [
                                    {
                                        title: "Advertisement Concept Development",
                                        slug: "https://ritzmediaworld.com/services/radio-advertising/advertisement-concept-development"
                                    },
                                    {
                                        title: "Scriptwriting",
                                        slug: "https://ritzmediaworld.com/services/radio-advertising/scriptwriting",
                                    },
                                    {
                                        title: "Voiceover Casting",
                                        slug: "https://ritzmediaworld.com/services/radio-advertising/voiceover-casting",
                                    },
                                    {
                                        title: "Recording & Production",
                                        slug: "https://ritzmediaworld.com/services/radio-advertising/recording-and-production",
                                    },
                                    {
                                        title: "Media Planning And Buying",
                                        slug: "https://ritzmediaworld.com/services/radio-advertising/media-planning-and-buying",
                                    },
                                    {
                                        title: "NEGOTIATING AD RATES",
                                        slug: "https://ritzmediaworld.com/services/radio-advertising/radio-cost-negotiation-india",
                                    },
                                ]
                            },
                            {
                                title: "Content <br /> Marketing",
                                margin: "pr-12 md:pr-42 lg:pr-12 xl:pr-16 2xl:pr-16",
                                description: "Content isn’t just king, compelling content is. We don’t just create words we create stories that drive action. From blogs that educate to videos that entertain, our content marketing agency in India crafts content that’s not only engaging but also strategically persuasive.",
                                image: "/new-theme/content.jpg",
                                link: "/services/contents-marketing",
                                subServices: [
                                    {
                                        title: "Customized Content Strategy",
                                        slug: "https://ritzmediaworld.com/services/contents-marketing/customized-content-strategy",
                                    },
                                    {
                                        title: "Email and Newsletters Marketing",
                                        slug: "https://ritzmediaworld.com/services/contents-marketing/email-and-newsletters-marketing",
                                    },
                                    {
                                        title: "Asset Creation and Infographics",
                                        slug: "https://ritzmediaworld.com/services/contents-marketing/asset-creation-and-infographics",
                                    },
                                    {
                                        title: "Content Promotion and Optimization",
                                        slug: "https://ritzmediaworld.com/services/contents-marketing/content-promotion-and-optimization",
                                    }
                                ]
                            },
                            {
                                title: "Web <br /> Development",
                                margin: "pr-4 md:pr-32 lg:pr-0 xl:pr-8 2xl:pr-10 xl:-mr-10",
                                description: "Let's make your website firm, interesting, and friendly because it is your digital handshake. Our web development services makes useful and friendly websites that attract and win the hearts of visitors. We assure you of an excellent online presence through our web designing services in India.",
                                image: "/new-theme/web-devlopment.jpg",
                                link: "/services/web-designing-and-development  ",
                                subServices: [
                                    {
                                        title: "UI/UX Design",
                                        slug: "https://ritzmediaworld.com/services/web-designing-and-development/ui-ux-design",
                                    },
                                    {
                                        title: "Custom Design & Development",
                                        slug: "https://ritzmediaworld.com/services/web-designing-and-development/custom-design-development",
                                    },
                                    {
                                        title: "E-Commerce Website Development",
                                        slug: "https://ritzmediaworld.com/services/web-designing-and-development/e-commerce-web-designing",
                                    },
                                    {
                                        title: "Landing Page Development",
                                        slug: "https://ritzmediaworld.com/services/web-designing-and-development/landing-page-development-services",
                                    },
                                    {
                                        title: "WordPress Web Design",
                                        slug: "https://ritzmediaworld.com/services/web-designing-and-development/wordpress-web-designing",
                                    }
                                ]
                            },
                            {
                                title: "Celebrity <br /> Endorsements",
                                margin: "pr-4  md:pr-30  lg:pr-0 xl:pr-14 xl:-mr-20",
                                description: "When a celebrity's whisper has the ability to influence people and speak louder, why shout? We assist your business in establishing connections with celebrities who can increase sales and improve your company's reputation. Are you trying to find the best digital marketing agency in Delhi? For you, we have the greatest celebrity endorsement.",
                                image: "/new-theme/celebrity-endorsment.jpg",
                                link: "/services/celebrity-endorsements",
                                subServices: [
                                    {
                                        title: "Celebrity Identification",
                                        slug: "https://ritzmediaworld.com/services/celebrity-endorsements/celebrity-identification-services",
                                    },
                                    {
                                        title: "Contract Negotiations",
                                        slug: "https://ritzmediaworld.com/services/celebrity-endorsements/negotiating-contracts",
                                    },
                                    {
                                        title: "Creative Collaboration",
                                        slug: "https://ritzmediaworld.com/services/celebrity-endorsements/creative-collaboration",
                                    },
                                    {
                                        title: "Campaign Integration",
                                        slug: "https://ritzmediaworld.com/services/celebrity-endorsements/campaign-integration",
                                    },
                                    {
                                        title: "Public Relations",
                                        slug: "https://ritzmediaworld.com/services/celebrity-endorsements/public-relations",
                                    },
                                    {
                                        title: "Legal Compliance",
                                        slug: "https://ritzmediaworld.com/services/celebrity-endorsements/legal-compliance",
                                    }
                                ]
                            },
                            {
                                title: "Influencer <br />   Marketing",
                                margin: "lg:-mr-[10px] pr-8 md:pr-36 lg:pr-4 xl:pr-5 xl:-mr-6    ",
                                description: "At Ritz Media World influencer marketing is about persuasion through reliable voices, not just numbers. As a leading influencer marketing agency, we assist you in attracting clients who are eluding the casual followers of your influencers. We offer a range of tactics with top social media marketing companies in India to make sure your brand is noticed and reaches the appropriate audience.",
                                image: "/new-theme/influencer-marketing.jpg",
                                link: "/services/influencer-marketing-agency-in-india",
                                subServices: [
                                    {
                                        title: "Influencer Identification",
                                        slug: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india/identification-influence-marketing-agency",
                                    },
                                    {
                                        title: "Cost-Benefit Analysis",
                                        slug: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india/cost-benefit-analysis",
                                    },
                                    {
                                        title: "Terms Negotiations",
                                        slug: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india/terms-negotiations",
                                    },
                                    {
                                        title: "Creative Collaboration",
                                        slug: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india/creative-collaboration",
                                    },
                                    {
                                        title: "Campaign Integration",
                                        slug: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india/campaign-integration",
                                    },
                                    {
                                        title: "Messaging Optimization",
                                        slug: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india/messaging-optimization",
                                    },
                                ]
                            }

                        ].map((service, idx) => {
                            return (
                                <ServiceCard key={idx} service={service} index={idx} />
                            )
                        })
                    }
                </div>
                <BlueLayer />
                {/* Row 3  */}
                <div className={`flex flex-col gap-6 py-[35px] xl:py-[70px] `}>

                    {/* Row 1  */}
                    <div className={`flex flex-col text-center md:text-left ${styles2.containerWidth}`}>
                        <h2 className={`font-[600] text-[12px] sm:text-[14px] md:text-[16px] uppercase text-[#C99237] ${styles2.fontopensans}`}>
                            Legendary Stories
                        </h2>
                        <h3 className={`font-[700] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] text-[#0F1640] ${styles2.fontmontserrat}`}>
                            We tell stories that lead to LEGENDS
                        </h3>
                        <p className={`font-[400] text-[14px] text-[#0F1640] sm:text-[15px] md:text-[16px] ${styles2.fontopensans}`}>
                            Crafting Stories That Build Timeless Legends
                        </p>
                    </div>

                    {/* Row 2  */}
                    <div className={`w-full flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-0 ${styles2.containerWidth}`}>
                        <div className="w-full lg:w-[456px] h-[280px] sm:h-[320px] md:h-[380px] lg:h-[424px] relative">
                            <Image src={"/home-v3/service-imgs/s3/s3-group.png"} alt="Ritz Media World – team and collective experience" title="Ritz Media World" fill className="w-full h-full object-cover"></Image>
                        </div>



                        <div className="w-full lg:w-[456px] h-[280px] sm:h-[320px] md:h-[380px] lg:h-[424px] relative">
                            <Image src={"/home-v3/service-imgs/s3/s3-increase.png"} alt="Ritz Media World – perpetual growth" title="Ritz Media World" fill className="w-full h-full object-cover"></Image>

                            {/* Absolute Position Text Container  */}
                            <div className="absolute inset-0 w-full h-full flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 text-center md:text-left">
                                <p className={`font-[400] text-[16px] md:text-[16px] lg:text-[18px] text-white ${styles2.fontopensans} max-w-[100%]`}>
                                    We command growth with millions of <br className="hidden xl:block" /> hours in collective experience. At this point, <br className="hidden xl:block" /> it's not a matter of 'if', it becomes a matter of 'when' you will attain the tipping point that will drive your.
                                </p>
                                <h4 className={`font-[300] text-[28px] sm:text-[36px] md:text-[42px] xl:text-[50px] text-white mt-2 sm:mt-4 leading-[1.1] ${styles2.fontopensans}`}>
                                    PERPETUAL <br />
                                    <span className="font-[800]">GROWTH</span>
                                </h4>
                            </div>
                        </div>


                        <div className="hidden lg:flex flex-col lg:pl-8 gap-4 sm:gap-6 lg:gap-8 justify-start lg:justify-end w-full lg:w-auto">

                            <div className="flex flex-row  lg:flex-col gap-6 sm:gap-8 lg:gap-6">
                                <div>
                                    <p className={`font-[700] text-[40px] sm:text-[50px] md:text-[41px] xl:text-[60px] text-[#0F1640] ${styles2.fontmontserrat}`}>
                                        1M+
                                    </p>
                                    <p className={`font-[600] text-[14px] text-[#0F1640] sm:text-[15px] md:text-[16px] ${styles2.fontopensans}`}>
                                        Creatives Published
                                    </p>
                                </div>

                                <div>
                                    <p className={`font-[700] text-[40px] sm:text-[50px] md:text-[41px] xl:text-[60px] text-[#0F1640] ${styles2.fontmontserrat}`}>
                                        500+
                                    </p>
                                    <p className={`font-[600] text-[14px] text-[#0F1640] sm:text-[15px] md:text-[16px] ${styles2.fontopensans}`}>
                                        Success Stories
                                    </p>
                                </div>
                            </div>

                            <div className="google-reviews w-full sm:w-[220px] md:w-[172px] xl:w-[269px] pt-2 border-t border-t-[#AFAFAF]">
                                <img onClick={() => window.open("https://share.google/KiTNs3mJMr5qUOkjK", "_blank")} src="/g-5-star2.png" alt="Google reviews – Ritz Media World" title="Ritz Media World" className="w-full cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    {/* White Layer Row  */}
                    <div className="w-full pt-[35px]  overflow-x-hidden"> <WhiteLayer /></div>

                    {/* Row 3  */}
                    <div className={`w-full flex flex-col md:flex-row justify-between pt-8 sm:pt-12 md:pt-16 lg:pt-[30px] gap-4 sm:gap-6 lg:gap-4 ${styles2.containerWidth}`}>
                        <div className="w-full md:w-[48%] lg:w-[615px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[505px] relative">
                            <Image onClick={() => window.open("https://ritzmediaworld.com/about.html", "_blank")} fill src={"/home-v3/service-imgs/s3/profitable-product2.png"} alt="Ritz Media World – profitable products and brand portfolio" title="Ritz Media World" className="w-full h-full object-cover filter brightness-60"></Image>

                            {/* Absolute Positioned Div 2 — centered < xl, left-aligned xl+ */}
                            <div
                                className="absolute top-1/2 z-[8] -translate-y-1/2 rounded-full bg-[#00000095] left-1/2  -translate-x-1/2
                                 h-[220px] w-[220px] 
                                md:h-[320px] md:w-[320px]
                                 lg:h-[400px] lg:w-[400px]
                                  xl:left-8 xl:h-[350px] xl:w-[350px] xl:translate-x-0"
                                aria-hidden
                            />

                            <div className="absolute left-1/2 top-1/2 z-10  max-w-full -translate-x-1/2 -translate-y-1/2 px-3 sm:px-4 w-full xl:left-20 xl:w-auto xl:max-w-[420px] xl:-translate-x-0 xl:translate-y-[-50%] xl:px-0">
                                <div className="flex w-full flex-col items-center justify-center gap-4 text-center sm:gap-5 md:gap-6 xl:items-start xl:text-left">
                                    <p className="font-[700] text-[20px] leading-tight text-white  md:text-[28px] lg:text-[40px] xl:text-[46px]">
                                        We Build <span className="font-[400]">Successful</span> <br />
                                        Profitable Products
                                    </p>
                                    <button
                                        onClick={() => window.open("https://ritzmediaworld.com/contact.html", "_blank")}
                                        className={`h-[48px] w-full max-w-[157px] md:max-w-[219px] cursor-pointer rounded-[5px] bg-[#ffffff] text-[15px] font-[600] text-black sm:h-[52px] sm:text-[16px] xl:h-[54px] ${styles2.fontopensans}`}
                                    >
                                        Get Expert Advice
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-[48%] lg:w-[615px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[505px] relative">
                            <Image onClick={() => window.open("https://ritzmediaworld.com/about.html", "_blank")} fill src={"/home-v3/service-imgs/s3/company-mission.png"} alt="Ritz Media World – company mission" title="Ritz Media World" className="w-full cursor-pointer h-full object-cover"></Image>
                        </div>
                    </div>

                </div>

                {/* Copy Components  */}
                <div className={`flex xl:pb-[70px] pb-[35px] flex-col ${styles2.containerWidth}`}>
                    {/* Copy Row 1  */}
                    <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                        {/* Left Side Container  */}
                        <div className="relative w-full sm:w-[194px] h-auto sm:h-[156px] border-b-[1px] sm:border-b-0 sm:border-r-[1px] border-r-[#D9D9D9] flex items-center justify-center sm:justify-start pb-4 sm:pb-0">
                            <h2 className="font-[700] text-[20px] sm:text-[22px] lg:text-[24px]" style={{
                                fontFamily: 'MontserratBold',
                            }}>Brands That Trust Us</h2>

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
                        <div className="flex flex-col md:flex-row items-center md:items-start w-full md:pl-[47px] sm:w-[calc(100%-194px)] overflow-x-hidden">
                            {/* Slider Container  */}
                            <div className="w-full overflow-hidden">
                                <div className={`flex gap-4 sm:gap-6 lg:gap-8 w-max ${styles.clientSlider}`}>
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
                                            <Image src={url} fill alt="Ritz Media World – client brand logo" title="Ritz Media World" className="object-contain" />
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
                </div>

                {/*  Components  */}
                <div className="w-full">
                    {/* Row 2  */}
                    <div className="w-full min-h-[160px] sm:min-h-[180px] md:min-h-[200px] lg:min-h-[220px] xl:min-h-[247px] bg-[#F7F7F7] flex justify-center items-center py-4 sm:py-5 md:py-6 lg:py-8 xl:py-0">
                        {/* Center Align Cards Container  */}
                        <div className="flex flex-wrap md:flex-nowrap justify-center items-center w-full px-4 sm:px-5 md:px-6 lg:px-8 xl:px-0 max-w-[1920px] mx-auto md:gap-10 lg:gap-16 xl:gap-20">
                            {
                                [
                                    {
                                        ttl: "1B+",
                                        desc: "Words Written",

                                    },
                                    {
                                        ttl: "1M+",
                                        desc: "Creatives Published",

                                    },
                                    {
                                        ttl: "1K+",
                                        desc: "Campaigns Executed",

                                    },
                                    {
                                        ttl: "500+",
                                        desc: "Success Stories",

                                    },

                                ].map((ob, idx) => {
                                    return (
                                        <div key={idx} className="flex items-center">
                                            <div className={`flex flex-col justify-center items-center text-center
                                                px-4 sm:px-6 md:px-4 lg:px-6 xl:px-10 2xl:px-14
                                                py-3 sm:py-4 md:py-3 lg:py-3.5 xl:py-4
                                                w-[calc(50vw-2rem)] sm:w-auto
                                                ${idx < 2 ? "border-b border-b-[#C9C9C9] sm:border-b-0" : ""}
                                                ${idx % 2 === 0 ? "border-r border-r-[#C9C9C9] sm:border-r-0" : ""}`}>
                                                <p className={`font-[700] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] xl:text-[60px] 2xl:text-[60px] text-[#0F1640] leading-tight ${styles2.fontmontserrat}`}>{ob.ttl}</p>
                                                <p className={`font-[600] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[16px] 2xl:text-[16px] text-[#0F1640] mt-1 sm:mt-1.5 md:mt-2 ${styles2.fontopensans}`}>{ob.desc}</p>
                                            </div>
                                            {idx !== 3 && <div className="hidden sm:block w-[1px] min-h-[80px] md:min-h-[100px] lg:min-h-[120px] xl:min-h-[137px] bg-[#C9C9C9]"></div>}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>


                <S6 padding="px-0" padding2="px-0"></S6>
                <S7></S7>


                <div className="pt-4 xl:pt-16">
                    <BrandImpactSection2 />
                </div>


            </div>

            {/* Modal */}
            {modal.open && (
                <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-[16px] shadow-2xl max-w-[400px] w-[90%] mx-4 overflow-hidden">
                        {/* Modal Header */}
                        <div className={`px-6 py-4 ${modal.status === "success" ? "bg-[#10B981]" : "bg-[#EF4444]"
                            }`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {modal.status === "success" ? (
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                    <h3 className="text-lg font-semibold text-white">
                                        {modal.status === "success" ? "Success" : "Error"}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setModal({ ...modal, open: false })}
                                    className="text-white hover:text-gray-200 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 py-4">
                            <p className="text-[#374151] text-sm leading-relaxed">
                                {modal.message}
                            </p>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={() => setModal({ ...modal, open: false })}
                                className={`px-4 py-2 rounded-[8px] font-[500] text-sm transition-colors ${modal.status === "success"
                                    ? "bg-[#10B981] text-white hover:bg-[#059669]"
                                    : "bg-[#EF4444] text-white hover:bg-[#DC2626]"
                                    }`}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Section3;