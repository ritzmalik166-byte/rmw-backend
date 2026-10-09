"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface ServiceSubItem {
  name: string;
  link: string;
}

interface ServiceItem {
  name: string;
  link: string;
  sub: ServiceSubItem[];
}

function Navbar() {
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesData, setServicesData] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(72);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef<number>(0);
  const isNavbarHiddenRef = useRef<boolean>(false);

  // Fetch services data from API
  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await fetch("/api/header_data");
        if (response.ok) {
          const data = await response.json();
          // Ensure data is an array
          if (Array.isArray(data)) {
            setServicesData(data);
          } else {
            console.error("Invalid data format received from API:", data);
            setServicesData([]);
          }
        } else {
          console.error(
            "Failed to fetch services data:",
            response.status,
            response.statusText
          );
          setServicesData([]);
        }
      } catch (error) {
        console.error("Error fetching services data:", error);
        setServicesData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesData();
  }, []);

  // Fix Lenis scrolling issue - prevent Lenis from intercepting wheel events on dropdown
  useEffect(() => {
    const dropdown = servicesDropdownRef.current;
    const mobileMenu = mobileMenuRef.current;

    const handleWheel = (e: WheelEvent) => {
      // Stop propagation to prevent Lenis from handling this event
      e.stopPropagation();
    };

    const handleTouchStart = (e: TouchEvent) => {
      // Stop propagation for touch events as well
      e.stopPropagation();
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Stop propagation for touch move events
      e.stopPropagation();
    };

    if (dropdown && servicesOpen) {
      dropdown.addEventListener("wheel", handleWheel, { passive: false });
      dropdown.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      dropdown.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }

    if (mobileMenu && mobileMenuOpen) {
      mobileMenu.addEventListener("wheel", handleWheel, { passive: false });
      mobileMenu.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      mobileMenu.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }

    return () => {
      if (dropdown) {
        dropdown.removeEventListener("wheel", handleWheel);
        dropdown.removeEventListener("touchstart", handleTouchStart);
        dropdown.removeEventListener("touchmove", handleTouchMove);
      }
      if (mobileMenu) {
        mobileMenu.removeEventListener("wheel", handleWheel);
        mobileMenu.removeEventListener("touchstart", handleTouchStart);
        mobileMenu.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [servicesOpen, mobileMenuOpen]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      if (!ulRef.current) return;

      const currentScrollY = window.scrollY;
      const scrolled = currentScrollY > 0;
      setIsScrolled(scrolled);

      // Determine if navbar should be hidden (only when scrolled past threshold)
      // Don't hide navbar if services dropdown or mobile menu is open
      if (!servicesOpen && !mobileMenuOpen && scrolled) {
        // Determine scroll direction
        if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
          // Scrolling down - hide navbar
          isNavbarHiddenRef.current = true;
          setIsNavbarHidden(true);
        } else if (currentScrollY < lastScrollY.current) {
          // Scrolling up - show navbar
          isNavbarHiddenRef.current = false;
          setIsNavbarHidden(false);
        }

        // Always show navbar at the top
        if (currentScrollY <= 0) {
          isNavbarHiddenRef.current = false;
          setIsNavbarHidden(false);
        }
      }

      lastScrollY.current = currentScrollY;

      if (scrolled) {
        navRef.current.style.position = "fixed";
        navRef.current.style.top = "0";
        navRef.current.style.backgroundColor = "white";
        navRef.current.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
        ulRef.current.style.color = "black";
      } else {
        navRef.current.style.position = "absolute";
        navRef.current.style.top = "0";
        navRef.current.style.backgroundColor = "white";
        navRef.current.style.removeProperty("box-shadow");
        ulRef.current.style.color = "black";
      }

      // Apply transform based on navbar hidden state
      if (!servicesOpen && !mobileMenuOpen) {
        if (isNavbarHiddenRef.current && scrolled) {
          navRef.current.style.transform = "translateY(-100%)";
        } else {
          navRef.current.style.transform = "translateY(0)";
        }
      } else {
        navRef.current.style.transform = "translateY(0)";
      }
    };

    // Set initial state
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [servicesOpen, mobileMenuOpen]);

  // Handle services dropdown hover
  const handleMouseHover = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setServicesOpen(true);
    // Ensure navbar is visible when hovering
    if (navRef.current) {
      navRef.current.style.transform = "translateY(0)";
      isNavbarHiddenRef.current = false;
      setIsNavbarHidden(false);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 300);
  }, []);

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("[data-services-link]")
      ) {
        setServicesOpen(false);
      }
    };

    if (servicesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [servicesOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("[data-mobile-menu-button]")
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = "unset";
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  // Close menus on route change or when mobile menu opens
  useEffect(() => {
    if (mobileMenuOpen) {
      setServicesOpen(false);
    }
  }, [mobileMenuOpen]);
  

  // Close mobile menu services when mobile menu closes
  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileServicesOpen(false);
    }
  }, [mobileMenuOpen]);

  // Calculate navbar height dynamically
  useEffect(() => {
    const updateNavbarHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight;
        setNavbarHeight(height || 72); // Fallback to 72px if height is 0
      }
    };

    // Initial calculation
    updateNavbarHeight();

    // Update on resize
    window.addEventListener("resize", updateNavbarHeight);

    // Update when navbar state changes
    const timeoutId = setTimeout(updateNavbarHeight, 100);

    return () => {
      window.removeEventListener("resize", updateNavbarHeight);
      clearTimeout(timeoutId);
    };
  }, [isScrolled, servicesOpen]);

  // Update dropdown position when navbar height changes
  useEffect(() => {
    if (servicesDropdownRef.current) {
      servicesDropdownRef.current.style.top = `${navbarHeight}px`;
      servicesDropdownRef.current.style.maxHeight = `calc(100vh - ${navbarHeight}px)`;
    }
  }, [navbarHeight, servicesOpen]);

  // Show navbar when services dropdown or mobile menu opens
  useEffect(() => {
    if (servicesOpen || mobileMenuOpen) {
      isNavbarHiddenRef.current = false;
      setIsNavbarHidden(false);
      if (navRef.current) {
        navRef.current.style.transform = "translateY(0)";
      }
    }
  }, [servicesOpen, mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="w-full flex justify-center overflow-x-hidden items-center absolute top-0 left-0 z-50 transition-all duration-300 ease-in-out"
      >
        {/* Centered Align Div  */}
        <div className="xl:w-[90%] w-full flex justify-between items-center py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
          {/* Logo div - Responsive */}
          <Link
            href="/"
            title="Ritz Media World"
            className="relative h-[32px] w-[180px] sm:h-[38px] sm:w-[210px] md:h-[42px] md:w-[245px]"
          >
            <Image
              fill
              src={"/new-page/new-design-logo.png"}
              alt="Ritz Media World Logo"
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:block">
            <ul
              ref={ulRef}
              className="flex justify-center items-center gap-4 xl:gap-6 2xl:gap-8 font-[500] text-white text-sm xl:text-base 2xl:text-lg transition-colors duration-300"
            >
              <li className="cursor-pointer hover:opacity-80 transition-opacity">
                <Link href={"/"} title="Home">Home</Link>
              </li>
              <li className="cursor-pointer hover:opacity-80 transition-opacity">
                <Link href={"/about.html"} target="_blank" title="About">
                  About
                </Link>
              </li>
              <li
                className="cursor-pointer hover:opacity-80 transition-opacity relative"
                onMouseEnter={handleMouseHover}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={"/services"}
                  target="_blank"
                  data-services-link
                  title="Services"
                >
                  Services
                </Link>
              </li>
              <li className="cursor-pointer hover:opacity-80 transition-opacity">
                <Link href={"/work.html"} target="_blank" title="Our Work">
                  Our Work
                </Link>
              </li>
              <li className="cursor-pointer hover:opacity-80 transition-opacity">
                <Link href={"/blogs"} target="_blank" title="Blog">
                  Blog
                </Link>
              </li>
              <li className="cursor-pointer hover:opacity-80 transition-opacity">
                <Link href={"/rdx-digital-marketing-course"} target="_blank" title="Academy">
                  Academy
                </Link>
              </li>
              <li className="cursor-pointer hover:opacity-80 transition-opacity">
                <Link href={"/contact.html"} target="_blank" title="Contact Us">
                  Contact Us
                </Link>
              </li>
              <li>
                <button
                  onClick={() => window.open("https://ritzmediaworld.com/contact.html", "_blank")}
                  className="px-4 liquid xl:px-6 2xl:px-8 h-9 xl:h-10 2xl:h-[42px] cursor-pointer rounded-lg text-white bg-[#F3830E] font-[500] text-sm xl:text-base 2xl:text-lg hover:bg-[#F3830E] transition-colors whitespace-nowrap"
                >
                  Free Consulting
                </button>
              </li>
            </ul>
          </div>

          {/* Mobile Navigation Button */}
          <button
            data-mobile-menu-button
            onClick={toggleMobileMenu}
            className={`block lg:hidden transition-colors p-2 ${
              isScrolled || mobileMenuOpen
                ? "text-black hover:text-gray-700"
                : "text-black hover:text-gray-200"
            }`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Desktop Services Dropdown - Moved outside nav to prevent transform issues */}
      {servicesOpen && (
        <div
          ref={servicesDropdownRef}
          onMouseEnter={handleMouseHover}
          onMouseLeave={handleMouseLeave}
          className="hidden lg:block fixed left-0 w-full bg-white shadow-lg z-[100] transition-opacity duration-200 opacity-100 lg:w-[95%] lg:left-[50%] lg:transform lg:-translate-x-1/2 services-dropdown-scroll"
          style={{
            top: `${navbarHeight}px`,
            maxHeight: `calc(100vh - ${navbarHeight}px)`,
            overflowY: "auto",
            overflowX: "hidden",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12">
            {loading ? (
              <div className="text-center py-8">Loading services...</div>
            ) : servicesData.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No services available at the moment.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 xl:gap-6 2xl:gap-8">
                {/* Dynamically render all services from API */}
                {(() => {
                  // Distribute services evenly across columns (excluding the last column which is for special offer)
                  // We'll use 3 columns for services on xl screens
                  const servicesPerColumn = Math.ceil(servicesData.length / 3);
                  const column1Services = servicesData.slice(
                    0,
                    servicesPerColumn
                  );
                  const column2Services = servicesData.slice(
                    servicesPerColumn,
                    servicesPerColumn * 2
                  );
                  const column3Services = servicesData.slice(
                    servicesPerColumn * 2
                  );



                  return (
                    <>
                      {/* Column 1 */}
                      <div className="space-y-8">
                        {column1Services.map((service, idx) => (
                          <div key={`col1-${service.name}-${idx}`}>
                            <h2 onClick={()=>window.open(service.link, "_blank")} className="font-[500] text-lg text-black mb-4 cursor-pointer">
                              {service.name}
                            </h2>
                            <ul className="font-[400] text-base text-[#00000099] space-y-2">
                              {service.sub && service.sub.length > 0 ? (
                                service.sub.map((subItem, subIdx) => (
                                  <li key={subIdx}>
                                    <Link
                                      title={subItem.name}
                                      href={subItem.link}
                                      target="_blank"
                                      className="hover:text-[#F3830E] transition-colors"
                                    >
                                      {subItem.name}
                                    </Link>
                                  </li>
                                ))
                              ) : (
                                <li className="text-gray-400">
                                  No sub-services available
                                </li>
                              )}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Column 2 */}
                      <div className="space-y-8">
                        {column2Services.map((service, idx) => (
                          <div key={`col2-${service.name}-${idx}`}>
                            <h2 onClick={()=>window.open(service.link, "_blank")} className="font-[500] text-lg text-black mb-4 cursor-pointer">
                              {service.name}
                            </h2>
                            <ul className="font-[400] text-base text-[#00000099] space-y-2">
                              {service.sub && service.sub.length > 0 ? (
                                service.sub.map((subItem, subIdx) => (
                                  <li key={subIdx}>
                                    <Link
                                      title={subItem.name}
                                      href={subItem.link}
                                      target="_blank"
                                      className="hover:text-[#F3830E] transition-colors"
                                    >
                                      {subItem.name}
                                    </Link>
                                  </li>
                                ))
                              ) : (
                                <li className="text-gray-400">
                                  No sub-services available
                                </li>
                              )}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Column 3 */}
                      <div className="space-y-8">
                        {column3Services.map((service, idx) => (
                          <div key={`col3-${service.name}-${idx}`}>
                            <h2 onClick={()=>window.open(service.link, "_blank")} className="font-[500] text-lg text-black mb-4 cursor-pointer">
                              {service.name}
                            </h2>
                            <ul className="font-[400] text-base text-[#00000099] space-y-2">
                              {service.sub && service.sub.length > 0 ? (
                                service.sub.map((subItem, subIdx) => (
                                  <li key={subIdx}>
                                    <Link
                                      title={subItem.name}
                                      href={subItem.link}
                                      target="_blank"
                                      className="hover:text-[#F3830E] transition-colors"
                                    >
                                      {subItem.name}
                                    </Link>
                                  </li>
                                ))
                              ) : (
                                <li className="text-gray-400">
                                  No sub-services available
                                </li>
                              )}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}

                {/* Column 4 - Special Offer Image (Desktop only) */}
                <div className="hidden xl:block relative h-[698px] overflow-hidden bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
                  <Image
                    src={"/new-page/dog.png"}
                    fill
                    alt="Special Offer"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 w-full h-full flex flex-col justify-between items-center p-6 bg-gradient-to-b from-black/200 to-black/40">
                    {/* Top Section - Text */}
                    <div className="text-center pt-4">
                      <p className="uppercase font-[500] text-white text-[18px] sm:text-[20px] mb-2">
                        SPECIAL OFFER
                      </p>
                      <p className="uppercase font-[500] text-white text-[18px] sm:text-[20px] mb-3">
                        GET UPTO
                      </p>
                      <p className="text-[#E3AE59] font-bold text-[20px] sm:text-[25px] lg:text-[35px]">
                        10% OFF
                      </p>
                    </div>

                    {/* Bottom Section - Button and Small Text */}
                    <div className="flex flex-col items-center gap-3 pb-4">
                      <button
                        onClick={() =>
                          window.open("https://ritzmediaworld.com/rdx-digital-marketing-course", "_blank")
                        }
                        className="w-[191px] h-[48px] bg-[#E3AE59] text-white rounded-full cursor-pointer font-[500] text-[20px] hover:opacity-90 transition-opacity shadow-lg"
                      >
                        GET NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-[400px] bg-white shadow-2xl z-[70] lg:hidden transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto services-dropdown-scroll">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b-[0.8px] border-[#b8b8b8]">
            <div className="relative h-8 w-40">
              <Image
                fill
                src={"/new-page/new-design-logo.png"}
                alt="Ritz Media World"
                className="object-contain"
              />
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close mobile menu"
            >
              <X size={24} className="text-black" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/" target="_blank"
                  title="Home"
                  onClick={toggleMobileMenu}
                  className="block px-4 py-3 text-black font-[500] text-base hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about.html"
                  target="_blank"
                  title="About"
                  onClick={toggleMobileMenu}
                  className="block px-4 py-3 text-black font-[500] text-base hover:bg-gray-100 rounded-lg transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-black font-[500] text-base hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Services
                  <span
                    className={`transform transition-transform ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {/* Mobile Services Dropdown */}
                {mobileServicesOpen && (
                  <div className="pl-4 mt-2 space-y-4 border-l-2 border-gray-200">
                    {servicesData.map((service, idx) => (
                      <div key={idx}>
                        <h3 onClick={()=>window.open(service.link, "_blank")} className="font-[500] text-sm text-gray-700 mb-2 cursor-pointer">
                          {service.name}
                        </h3>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {service.sub.map((subItem, subIdx) => (
                            <li key={subIdx}>
                              <Link
                                title={subItem.name}
                                href={subItem.link}
                                onClick={toggleMobileMenu}
                                className="hover:text-[#F3830E] transition-colors"
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
              <li>
                <Link
                  href="/blogs"
                  title="Our Work"
                  target="_blank"
                  onClick={toggleMobileMenu}
                  className="block px-4 py-3 text-black font-[500] text-base hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Our Work
                </Link>
              </li>
              <li>
                <Link
                  title="Blog"
                  href="/" target="_blank"
                  onClick={toggleMobileMenu}
                  className="block px-4 py-3 text-black font-[500] text-base hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  title="Academy"
                  href="/rdx-digital-marketing-course"
                  target="_blank"
                  onClick={toggleMobileMenu}
                  className="block px-4 py-3 text-black font-[500] text-base hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Academy
                </Link>
              </li>
              <li>
                <Link
                  title="Contact Us"
                  href="/contact.html"
                  target="_blank"
                  onClick={toggleMobileMenu}
                  className="block px-4 py-3 text-black font-[500] text-base hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t-[0.8px] border-[#b8b8b8]">
            <button
              onClick={() =>
                window.open("https://ritzmediaworld.com/contact.html", "_blank")
              }
              className="w-full h-12 bg-[#F3830E] text-white rounded-full font-[500] text-base hover:bg-[#F3830E] transition-colors"
            >
              Free Consulting
            </button>
            {/* Special Offer Section for Mobile */}
            <div className="mt-4 relative h-48 rounded-lg overflow-hidden">
              <Image
                src={"/new-page/dog.png"}
                fill
                alt="Special Offer"
                className="object-cover"
              />
              <div className="absolute inset-0 w-full h-full flex flex-col justify-end gap-2 items-center p-4 bg-black/30">
                <div className="text-center">
                  <p className="uppercase font-[500] text-white text-sm">
                    Special Offer <br /> Get upto
                  </p>
                </div>
                <button
                  onClick={() => window.open("https://ritzmediaworld.com/rdx-digital-marketing-course", "_blank")}
                  className="w-[160px] h-10 bg-[#F3830E] text-white rounded-full cursor-pointer font-[500] text-base hover:bg-[#D39E49] transition-colors"
                >
                  Get Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
