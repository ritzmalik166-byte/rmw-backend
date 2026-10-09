"use client";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import {
  ServicesMegaMenuMobileAccordion,
  ServicesMegaMenuPanel,
} from "./ServicesMegaMenu";
import {
  DEFAULT_CONTACT_COUNTRY,
  SORTED_CONTACT_COUNTRIES,
  validateContactPhone,
  type CountryEntry,
} from "@/lib/contactPhoneValidation";
import {
  CONTACT_EMAIL_PATTERN,
  CONTACT_EMAIL_TITLE,
  isValidContactEmail,
  CONTACT_EMAIL_ERROR_EN,
} from "@/lib/contactEmailValidation";

const HCaptcha = dynamic(() => import("@hcaptcha/react-hcaptcha"), {
  ssr: false,
});
const StaggeredMenu = dynamic(() => import("./StaggeredMenu"), {
  ssr: false,
});

function NewNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopServicesRef = useRef<HTMLLIElement>(null);
  const timelineRef = useRef<{ kill: () => void; reverse: () => void } | null>(
    null,
  );
  const gsapRef = useRef<(typeof import("gsap"))["gsap"] | null>(null);
  const isScrolledRef = useRef(false);
  const scrollRafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRafRef.current !== null) return;
      scrollRafRef.current = window.requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 0;
        if (nextScrolled !== isScrolledRef.current) {
          isScrolledRef.current = nextScrolled;
          setIsScrolled(nextScrolled);
        }
        scrollRafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  const [activeServiceCategory, setActiveServiceCategory] = useState(0);
  const [mobileOpenServiceCategory, setMobileOpenServiceCategory] = useState<
    number | null
  >(null);

  // GSAP: mega menu panel entrance
  useEffect(() => {
    if (!isHovered && timelineRef.current) {
      timelineRef.current.reverse();
    }

    if (!isHovered || !containerRef.current) return;
    let isActive = true;

    const runAnimation = async () => {
      const gsap = await loadGsap();
      if (!isActive || !containerRef.current) return;
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      const tl = gsap.timeline();
      gsap.set(containerRef.current, { opacity: 0, y: -14 });
      tl.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.38,
        ease: "power3.out",
      });
      timelineRef.current = tl;
    };

    runAnimation();

    return () => {
      isActive = false;
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isHovered]);

  useEffect(() => {
    if (!isHovered) {
      setActiveServiceCategory(0);
    }
  }, [isHovered]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedTrigger = desktopServicesRef.current?.contains(target);
      const clickedPanel = containerRef.current?.contains(target);
      if (!clickedTrigger && !clickedPanel) {
        setIsHovered(false);
      }
    };

    if (isHovered) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isHovered]);

  const secondaryNavItems = [
    { label: "Blogs", title: "Blogs", link: "https://ritzmediaworld.com/blogs" },
    { label: "Career", title: "Career", link: "https://ritzmediaworld.com/career" },
    { label: "Gallery", title: "Gallery", link: "https://ritzmediaworld.com/gallery" },
    {
      label: "Web Stories",
      title: "Web Stories",
      link: "https://ritzmediaworld.com/web-stories",
    },
  ] as const;

  const menuItems = secondaryNavItems.map((item) => ({
    label: item.label,
    ariaLabel: `Visit our ${item.label.toLowerCase()}`,
    link: item.link,
  }));

  const socialItems = [
    { label: 'X (Twitter)', link: 'https://x.com/ritzmediaworld' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/company/ritzmediaworld/?originalSubdomain=in' },
    { label: 'Facebook', link: 'https://www.facebook.com/ritzmediaworld/' },
    { label: 'YouTube', link: 'https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia' },
    { label: 'Instagram', link: 'https://www.instagram.com/ritzmediaworld/' }
  ];


  // Mobile-specific states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuTimelineRef = useRef<{ kill: () => void } | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isConsultModalClosing, setIsConsultModalClosing] = useState(false);
  const [isSubmittingConsult, setIsSubmittingConsult] = useState(false);
  const [consultModalScale, setConsultModalScale] = useState(1);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [consultForm, setConsultForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [consultPhoneCountry, setConsultPhoneCountry] =
    useState<CountryEntry>(() => DEFAULT_CONTACT_COUNTRY);
  const [consultErrors, setConsultErrors] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    captcha: "",
    form: "",
  });

  const loadGsap = async () => {
    if (gsapRef.current) return gsapRef.current;
    const mod = await import("gsap");
    gsapRef.current = mod.gsap;
    return mod.gsap;
  };

  // GSAP Animation for mobile menu
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    let isActive = true;

    const runAnimation = async () => {
      const gsap = await loadGsap();
      if (!isActive || !mobileMenuRef.current) return;

      if (isMobileMenuOpen) {
        if (mobileMenuTimelineRef.current) {
          mobileMenuTimelineRef.current.kill();
        }
        mobileMenuRef.current?.classList.remove('hidden');
        const menuItems = mobileMenuRef.current.querySelectorAll('.mobile-menu-item');
        const tl = gsap.timeline();

        gsap.set(mobileMenuRef.current, { opacity: 0, y: -12 });
        gsap.set(menuItems, { opacity: 0, y: -16 });

        tl.to(mobileMenuRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        });

        tl.to(
          menuItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.28,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.18",
        );

        mobileMenuTimelineRef.current = tl;
      } else {
        if (isMobileServicesOpen) {
          setIsMobileServicesOpen(false);
        }
        setMobileOpenServiceCategory(null);
        if (mobileMenuTimelineRef.current) {
          const menuItems = mobileMenuRef.current.querySelectorAll('.mobile-menu-item');
          const tl = gsap.timeline();

          tl.to(menuItems, {
            opacity: 0,
            y: -20,
            duration: 0.2,
            stagger: 0.05,
            ease: "power2.in"
          });

          tl.to(
            mobileMenuRef.current,
            {
              opacity: 0,
              y: -12,
              duration: 0.28,
              ease: "power3.in",
              onComplete: () => {
                if (mobileMenuRef.current && !isMobileMenuOpen) {
                  mobileMenuRef.current.classList.add("hidden");
                }
              },
            },
            "-=0.1",
          );

          mobileMenuTimelineRef.current = tl;
        }
      }
    };

    runAnimation();

    return () => {
      isActive = false;
      if (mobileMenuTimelineRef.current) {
        mobileMenuTimelineRef.current.kill();
      }
    };
  }, [isMobileMenuOpen, isMobileServicesOpen]);

  // Handle body scroll lock on mobile
  useEffect(() => {
    if (isMobileMenuOpen || isMobileServicesOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, isMobileServicesOpen]);

  const openConsultModal = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setConsultErrors({
      name: "",
      phone: "",
      email: "",
      message: "",
      captcha: "",
      form: "",
    });
    setConsultForm({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
    setConsultPhoneCountry(DEFAULT_CONTACT_COUNTRY);
    setCaptchaToken(null);
    setIsConsultModalClosing(false);
    setIsConsultModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeConsultModal = () => {
    setIsConsultModalClosing(true);
    setCaptchaToken(null);
    closeTimerRef.current = setTimeout(() => {
      setIsConsultModalOpen(false);
      setIsConsultModalClosing(false);
      document.body.style.overflow = "";
    }, 180);
  };

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isConsultModalOpen) {
        closeConsultModal();
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isConsultModalOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const updateScale = () => {
      requestAnimationFrame(() => {
        const h = window.innerHeight;
        if (h <= 620) setConsultModalScale(0.72);
        else if (h <= 700) setConsultModalScale(0.78);
        else if (h <= 780) setConsultModalScale(0.86);
        else if (h <= 860) setConsultModalScale(0.93);
        else setConsultModalScale(1);
      });
    };

    if (isConsultModalOpen) {
      updateScale();
      window.addEventListener("resize", updateScale);
    }

    return () => window.removeEventListener("resize", updateScale);
  }, [isConsultModalOpen]);

  const validateConsultForm = () => {
    const next = {
      name: "",
      phone: "",
      email: "",
      message: "",
      captcha: "",
      form: "",
    };

    if (!consultForm.name.trim()) {
      next.name = "Please enter your name.";
    }

    const phoneDigits = consultForm.phone.replace(/\D/g, "");
    const phoneResult = validateContactPhone(phoneDigits, consultPhoneCountry);
    if (!phoneResult.ok) {
      next.phone = phoneResult.error;
    }

    if (!consultForm.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!isValidContactEmail(consultForm.email)) {
      next.email = CONTACT_EMAIL_ERROR_EN;
    }



    if (!captchaToken) {
      next.captcha = "Please complete captcha.";
    }

    setConsultErrors(next);
    return Object.values(next).every((v) => !v);
  };

  const handleConsultSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateConsultForm()) return;

    const nationalDigits = consultForm.phone.replace(/\D/g, "");
    const phoneValidated = validateContactPhone(
      nationalDigits,
      consultPhoneCountry,
    );
    if (!phoneValidated.ok) {
      setConsultErrors((prev) => ({ ...prev, phone: phoneValidated.error }));
      return;
    }

    setIsSubmittingConsult(true);
    try {
      const response = await fetch("/api/system-settings/contact-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          etype: "NavbarConsulting",
          name: consultForm.name.trim(),
          phone: phoneValidated.e164,
          email: consultForm.email.trim(),
          message: consultForm.message.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        closeConsultModal();
      } else {
        setConsultErrors((prev) => ({
          ...prev,
          form: result?.message || result?.error || "Submission failed. Try again.",
        }));
      }
    } catch (error) {
      setConsultErrors((prev) => ({
        ...prev,
        form: "Server error. Please try again later.",
      }));
    } finally {
      setIsSubmittingConsult(false);
    }
  };

  const homepageLogoLink = (
    <a
      href="/"
      title="Ritz Media World homepage"
      aria-label="Ritz Media World homepage"
      className="inline-flex shrink-0"
    >
      <Image
        src="/rmw-logo-sm-size.png"
        alt="Ritz Media World logo"
        title="Ritz Media World logo"
        width={220}
        height={80}
        quality={70}
        priority
        className={`w-auto object-contain transition-all duration-300 ease-in-out hover:scale-105 ${
          isScrolled
            ? "h-[36px] sm:h-[40px] lg:h-[48px]"
            : "h-[52px] sm:h-[56px] lg:h-[80px]"
        }`}
      />
    </a>
  );

  return (
    <>
      {/* Desktop Navbar - Only visible on lg and above */}
      <nav
        className={`hidden lg:flex w-full justify-center items-center py-2 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-transparent"
          }`}
      >
        {/* Centered Align Div  */}
        <div className="w-[92%] flex justify-between items-center">
          <div>{homepageLogoLink}</div>
          {/* Right Side Container  */}
          <div
            className={`flex justify-end items-center gap-4 transition-colors duration-300 ${isScrolled ? "text-black" : "text-white"
              }`}
          >
            <ul className="flex justify-end items-center gap-6 xl:gap-12">
              <li ref={desktopServicesRef} className="relative">
                <Link
                  href="/services"
                  title="Services"
                  target="_blank"
                  onClick={() => {
                    if (hoverTimeoutRef.current) {
                      clearTimeout(hoverTimeoutRef.current);
                      hoverTimeoutRef.current = null;
                    }
                    setIsHovered(false);
                  }}
                  onMouseEnter={() => {
                    if (hoverTimeoutRef.current) {
                      clearTimeout(hoverTimeoutRef.current);
                      hoverTimeoutRef.current = null;
                    }
                    setActiveServiceCategory(0);
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => {
                    if (hoverTimeoutRef.current) {
                      clearTimeout(hoverTimeoutRef.current);
                    }
                    hoverTimeoutRef.current = setTimeout(() => {
                      setIsHovered(false);
                      hoverTimeoutRef.current = null;
                    }, 500);
                  }}
                  className={`font-[700] text-[15px] xl:text-[16px] transition-colors duration-300 ${isScrolled
                    ? "text-black hover:text-[#C99237]"
                    : "text-white hover:text-[#C99237]"
                    }`}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="https://ritzmediaworld.com/work.html"
                    target="_blank"
                  title="Our Work"
                  className={`font-[700] text-[15px] xl:text-[16px] transition-colors duration-300 ${isScrolled
                    ? "text-black hover:text-[#C99237]"
                    : "text-white hover:text-[#C99237]"
                    }`}
                >
                  Our Work
                </Link>
              </li>
              <li>
                <Link
                  href="https://ritzmediaworld.com/about.html"
                  target="_blank"
                  title="About Us"
                  className={`font-[700] text-[15px] xl:text-[16px] transition-colors duration-300 ${isScrolled
                    ? "text-black hover:text-[#C99237]"
                    : "text-white hover:text-[#C99237]"
                    }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="https://ritzmediaworld.com/contact.html"
                  target="_blank"
                  title="Contact"
                  className={`font-[700] text-[15px] xl:text-[16px] transition-colors duration-300 ${isScrolled
                    ? "text-black hover:text-[#C99237]"
                    : "text-white hover:text-[#C99237]"
                    }`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <div className="flex gap-4 justify-center items-center">
                  <button onClick={openConsultModal} className="w-[168px] h-[44px] font-[700] text-[15px] rounded-[5px] bg-[#C99237] cursor-pointer text-white hover:bg-[#B8822F] transition-colors duration-300 s1-btn-gold">
                    <p className="text-white">Free Consulting</p>
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(true)}
                    className={`${isScrolled ? "text-black" : "text-white"
                      } h-[34px] w-[34px] cursor-pointer transition-colors duration-300 hover:text-[#C99237] flex items-center justify-center`}
                    aria-label="Toggle menu"
                  >
                    <HiOutlineMenuAlt1 className="h-full w-full" />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {isHovered && (
          <div
            ref={containerRef}
            className="fixed inset-x-0 z-[100] flex justify-center "
            style={{ top: isScrolled ? "63px" : "92px" }}
            onMouseEnter={() => {
              if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = null;
              }
              setIsHovered(true);
            }}
          //   onMouseLeave={() => {
          //     setIsHovered(false);
          //     if (hoverTimeoutRef.current) {
          //       clearTimeout(hoverTimeoutRef.current);
          //       hoverTimeoutRef.current = null;
          //     }
          //   }
          // }
          >
            <div className="w-full ">
              <ServicesMegaMenuPanel
                activeCategoryIndex={activeServiceCategory}
                onCategoryChange={setActiveServiceCategory}
                onNavigate={() => setIsHovered(false)}
              />
            </div>
          </div>
        )}

        {/* Staggered Menu */}
        {(isMenuOpen || isMenuClosing) && (
          <>
            <div className="fixed inset-0 z-[9999] responsive-staggered-menu" style={{ height: '100vh', background: 'transparent' }}>
              <div className="relative w-full h-full">
                <StaggeredMenu
                  isOpen={isMenuOpen}
                  position="right"
                  items={menuItems}
                  socialItems={socialItems}
                  displaySocials={true}
                  displayItemNumbering={false}
                  menuButtonColor={isScrolled ? "#000" : "#fff"}
                  openMenuButtonColor="#000"
                  changeMenuColorOnOpen={true}
                  colors={['#1a1a1a', '#2a2a2a']}
                  logoUrl="/rmw-logo-sm-size.png"
                  accentColor="#C99237"
                  isFixed={true}
                  closeOnClickAway={true}
                  onMenuOpen={() => {
                    setIsMenuOpen(true);
                  }}
                  onMenuClose={() => {
                    setIsMenuClosing(true);
                    // Delay unmounting to allow close animation to complete
                    setTimeout(() => {
                      setIsMenuOpen(false);
                      setIsMenuClosing(false);
                    }, 800); // Match the close animation duration
                  }}
                />
              </div>
            </div>
            <style dangerouslySetInnerHTML={{
              __html: `
            /* Responsive font sizing for StaggeredMenu - default for mobile */
            .responsive-staggered-menu .sm-panel-item {
              font-size: 3rem !important;
            }
            
            /* For lg screens only (1024-1279px) */
            @media (min-width: 1024px) and (max-width: 1279px) {
              .responsive-staggered-menu .sm-panel-item {
                font-size: 2.8rem !important;
              }
            }
            
            /* For >=xl screens - full size */
            @media (min-width: 1280px) {
              .responsive-staggered-menu .sm-panel-item {
                font-size: 3rem !important;
              }
            }
            
            /* For <xl screens (lg to xl) with small height - reduce font size progressively */
            /* Largest height range first, then smaller ones override */
            @media (min-width: 1024px) and (max-width: 1279px) and (max-height: 800px) and (min-height: 701px) {
              .responsive-staggered-menu .sm-panel-item {
                font-size: 2.5rem !important;
              }
              .responsive-staggered-menu .sm-panel-list {
                gap: 1.5rem !important;
              }
            }
            
            @media (min-width: 1024px) and (max-width: 1279px) and (max-height: 700px) {
              .responsive-staggered-menu .sm-panel-item {
                font-size: 2rem !important;
              }
              .responsive-staggered-menu .sm-panel-list {
                gap: 1rem !important;
              }
            }
            
            @media (min-width: 1024px) and (max-width: 1279px) and (max-height: 600px) {
              .responsive-staggered-menu .sm-panel-item {
                font-size: 1.75rem !important;
              }
              .responsive-staggered-menu .sm-panel-list {
                gap: 1rem !important;
              }
            }
          `}} />
          </>
        )}
      </nav>

      {/* Mobile Navbar - Only visible below lg */}
      <nav
        className={`lg:hidden w-full flex justify-center items-center py-3.5 sm:py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5" : "bg-transparent"
          }`}
      >
        <div className="w-[90%] max-w-[1200px] flex justify-between items-center">
          <div className="flex items-center">{homepageLogoLink}</div>

          {/* Menu Toggle Button */}
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen((open) => {
                if (open) {
                  setIsMobileServicesOpen(false);
                  setMobileOpenServiceCategory(null);
                }
                return !open;
              });
            }}
            className={`${isScrolled ? "text-black" : "text-white"
              } h-[38px] w-[38px] sm:h-[40px] sm:w-[40px] cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center relative z-10 rounded-full hover:bg-black/5 active:bg-black/10`}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <HiOutlineMenuAlt1 className={`h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          ref={mobileMenuRef}
          className={`absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl shadow-2xl shadow-black/10 max-h-[calc(100dvh-64px)] overflow-y-auto overscroll-contain border-t border-gray-100 ${!isMobileMenuOpen && !isMenuClosing ? "hidden" : "flex flex-col"}`}
          style={{ zIndex: 50 }}
        >
          <div className="w-[95%] max-w-[1200px] mx-auto py-6 sm:py-8 space-y-2">
            {/* Services Link with Dropdown */}
            <div className="border-b border-gray-100 pb-2">
              <div className="mobile-menu-item flex w-full items-center gap-2 rounded-xl py-3 pl-5 pr-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 sm:py-2">
                <Link
                  href="/services"
                  title="Services"
                  className="group relative flex-1 py-1 text-left font-[700] text-[17px] text-gray-900 sm:text-[18px]"
                  onClick={() => {
                    setIsMobileServicesOpen(false);
                    setIsMobileMenuOpen(false);
                    setMobileOpenServiceCategory(null);
                  }}
                >
                  Services
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#C59D4F] transition-all duration-300 group-hover:w-full" />
                </Link>
                <button
                  type="button"
                  aria-expanded={isMobileServicesOpen}
                  aria-label={isMobileServicesOpen ? "Collapse services" : "Expand services"}
                  onClick={() => {
                    setIsMobileServicesOpen((open) => {
                      const next = !open;
                      if (next) {
                        setMobileOpenServiceCategory(0);
                      } else {
                        setMobileOpenServiceCategory(null);
                      }
                      return next;
                    });
                  }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#C59D4F]"
                >
                  <svg
                    className={`h-5 w-5 transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180 text-[#C59D4F]" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <div
                className={`mt-3 max-h-[min(52dvh,440px)] overflow-y-auto overscroll-contain ${isMobileServicesOpen ? "block" : "hidden"}`}
              >
                <div className="px-1 pb-4 sm:px-2">
                  <ServicesMegaMenuMobileAccordion
                    openCategoryIndex={mobileOpenServiceCategory}
                    onToggleCategory={(idx) => {
                      setMobileOpenServiceCategory((prev) =>
                        prev === idx ? null : idx,
                      );
                    }}
                    onNavigate={() => {
                      setIsMobileServicesOpen(false);
                      setIsMobileMenuOpen(false);
                      setMobileOpenServiceCategory(null);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Other Menu Items */}
            <div className="space-y-1 pt-2">
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  target="_blank"
                  title={item.title}
                  className="mobile-menu-item block font-[700] text-[17px] sm:text-[18px] py-4 px-5 rounded-xl transition-all duration-300 text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 active:bg-gray-100 group relative"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C99237] transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ))}

              <Link
                href="https://ritzmediaworld.com/work.html"
                target="_blank"
                title="Our Work"
                className="mobile-menu-item block font-[700] text-[17px] sm:text-[18px] py-4 px-5 rounded-xl transition-all duration-300 text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 active:bg-gray-100 group relative"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative">
                  Our Work
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C99237] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
              <Link
                href="https://ritzmediaworld.com/about.html"
                target="_blank"
                title="About Us"
                className="mobile-menu-item block font-[700] text-[17px] sm:text-[18px] py-4 px-5 rounded-xl transition-all duration-300 text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 active:bg-gray-100 group relative"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative">
                  About Us
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C99237] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
              <Link
                href="https://ritzmediaworld.com/contact.html"
                target="_blank"
                title="Contact"
                className="mobile-menu-item block font-[700] text-[17px] sm:text-[18px] py-4 px-5 rounded-xl transition-all duration-300 text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 active:bg-gray-100 group relative"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C99237] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-gray-100">
              <button
                className="mobile-menu-item w-full font-[700] text-[16px] sm:text-[17px] py-4 px-6 rounded-xl bg-gradient-to-r from-[#C99237] to-[#B8822F] text-white hover:from-[#B8822F] hover:to-[#A67227] active:from-[#A67227] active:to-[#956217] transition-all duration-300 shadow-lg shadow-[#C99237]/20 hover:shadow-xl hover:shadow-[#C99237]/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openConsultModal();
                }}
              >
                <span>Free Consulting</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 backdrop-blur-sm transition-opacity duration-300"
            style={{ top: '64px', zIndex: 40 }}
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsMobileServicesOpen(false);
              setMobileOpenServiceCategory(null);
            }}
            aria-hidden="true"
          />
        )}
      </nav>
      {isConsultModalOpen && (
        <div
          className={`fixed inset-0 z-[10000] flex items-start sm:items-center justify-center bg-black/50 px-3 sm:px-4 py-3 sm:py-4 transition-opacity duration-200 ${isConsultModalClosing ? "opacity-0" : "opacity-100"
            }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeConsultModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="consult-modal-title"
        >
          <div
            className={`w-full max-w-[600px] rounded-2xl bg-white p-4 sm:p-5 shadow-2xl transition-all duration-200 ${isConsultModalClosing
              ? "translate-y-2 opacity-0"
              : "translate-y-0 opacity-100"
              }`}
            style={{
              transform: `scale(${isConsultModalClosing ? consultModalScale * 0.95 : consultModalScale})`,
              transformOrigin: "center center",
            }}
          >
            <div className="mb-3 sm:mb-4 flex items-start justify-between border-b border-[#d4d4d4] pb-3">
              <div>
                <h2
                  id="consult-modal-title"
                  className="text-[22px] sm:text-[26px] font-[700] text-[#0F1640]"
                >
                  Free Consulting
                </h2>
                <p className="mt-1 text-[13px] text-[#636B7F]">
                  Fill the form and our team will contact you.
                </p>
              </div>
              <button
                type="button"
                onClick={closeConsultModal}
                className="h-9 w-9 rounded-full border cursor-pointer border-[#E3E7EF] text-[#3E465C] hover:bg-[#F6F8FC]"
                aria-label="Close popup"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConsultSubmit} className="flex flex-col gap-4 sm:gap-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <label className="block flex-1">
                  <span className="mb-1.5 block text-[18px] font-[600] text-[#1C2438]">Your Name</span>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={consultForm.name}
                    onChange={(e) => setConsultForm((prev) => ({ ...prev, name: e.target.value }))}
                    className={`h-[44px] w-full border-b bg-transparent px-0 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none transition ${consultErrors.name ? "border-[#EF4444]" : "border-[#DADDE5] focus:border-[#C99237]"
                      }`}
                  />
                  {consultErrors.name && <p className="mt-1 text-[12px] text-[#EF4444]">{consultErrors.name}</p>}
                </label>

                <label className="block flex-1">
                  <span className="mb-1.5 block text-[18px] font-[600] text-[#1C2438]">Email Address</span>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={consultForm.email}
                    onChange={(e) => setConsultForm((prev) => ({ ...prev, email: e.target.value }))}
                    pattern={CONTACT_EMAIL_PATTERN.source}
                    title={CONTACT_EMAIL_TITLE}
                    className={`h-[44px] w-full border-b bg-transparent px-0 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none transition ${consultErrors.email ? "border-[#EF4444]" : "border-[#DADDE5] focus:border-[#C99237]"
                      }`}
                  />
                  {consultErrors.email && <p className="mt-1 text-[12px] text-[#EF4444]">{consultErrors.email}</p>}
                </label>
              </div>

              <label className="block w-full">
                <span className="mb-1.5 block text-[18px] font-[600] text-[#1C2438]">Phone Number</span>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3">
                  <select
                    aria-label="Country calling code"
                    value={consultPhoneCountry.code}
                    onChange={(e) => {
                      const next = SORTED_CONTACT_COUNTRIES.find(
                        (c) => c.code === e.target.value,
                      );
                      if (next) setConsultPhoneCountry(next);
                    }}
                    className={`h-[44px] w-full sm:w-[min(11rem,33%)] sm:max-w-[13rem] sm:flex-shrink-0 border-b bg-transparent px-0 text-[14px] text-[#111827] outline-none transition cursor-pointer ${consultErrors.phone ? "border-[#EF4444]" : "border-[#DADDE5] focus:border-[#C99237]"
                      }`}
                  >
                    {SORTED_CONTACT_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.dial_code} {c.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={15}
                    placeholder="Mobile without country code"
                    value={consultForm.phone}
                    onChange={(e) =>
                      setConsultForm((prev) => ({
                        ...prev,
                        phone: e.target.value.replace(/[^0-9]/g, ""),
                      }))
                    }
                    className={`h-[44px] min-w-0 w-full flex-1 border-b bg-transparent px-0 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none transition ${consultErrors.phone ? "border-[#EF4444]" : "border-[#DADDE5] focus:border-[#C99237]"
                      }`}
                  />
                </div>
                {consultErrors.phone && <p className="mt-1 text-[12px] text-[#EF4444]">{consultErrors.phone}</p>}
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[18px] font-[600] text-[#1C2438]">Write Message</span>
                <textarea
                  rows={4}
                  placeholder="Tell us about your goals..."
                  value={consultForm.message}
                  onChange={(e) => setConsultForm((prev) => ({ ...prev, message: e.target.value }))}
                  className={`w-full min-h-[84px] sm:min-h-[92px] border-b bg-transparent px-0 py-1 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none transition ${consultErrors.message ? "border-[#EF4444]" : "border-[#DADDE5] focus:border-[#C99237]"
                    }`}
                />
                {consultErrors.message && <p className="mt-1 text-[12px] text-[#EF4444]">{consultErrors.message}</p>}
              </label>
              <label className="block flex-1">
                <span className="mb-1.5 block text-[18px] font-[600] text-[#1C2438]">Captcha</span>
                <div className={`border-b pb-2 overflow-x-auto ${consultErrors.captcha ? "border-[#EF4444]" : "border-[#DADDE5]"}`}>
                  <HCaptcha
                    sitekey="e4a44c7a-13c4-4534-b210-d41242d2d262"
                    onVerify={(token) => {
                      setCaptchaToken(token);
                      setConsultErrors((prev) => ({ ...prev, captcha: "" }));
                    }}
                    onExpire={() => setCaptchaToken(null)}
                    onError={() => setCaptchaToken(null)}
                  />
                </div>
                {consultErrors.captcha && <p className="mt-1 text-[12px] text-[#EF4444]">{consultErrors.captcha}</p>}
              </label>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                {consultErrors.form ? (
                  <p className="text-[13px] text-[#EF4444]">{consultErrors.form}</p>
                ) : (
                  <p className="text-[12px] text-[#6A7286]">We respect your privacy. No spam.</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmittingConsult}
                  className="h-[48px] w-full sm:w-auto min-w-[180px] rounded-xl bg-[#C99237] px-6 text-white font-[700] hover:bg-[#B8822F] disabled:opacity-60"
                >
                  {isSubmittingConsult ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default NewNavbar;