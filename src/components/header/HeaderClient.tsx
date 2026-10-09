"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import useStickyElements from "@/hooks/useStickyElements";
import styles from "./page.module.css";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import { gsap } from "gsap";
import axios from "axios";
import AnalyticsTracker from "./Tracker/AnalyticsTracker";

type SubService = {
  name: string;
  link: string;
};

type ServiceMenuItem = {
  name: string;
  link: string;
  sub: SubService[];
};

type HeaderClientProps = {
  headerData: ServiceMenuItem[];
};

const useWindowWidth = () => {
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 100); // Throttle resize events for better performance
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return width;
};

const HeaderClient: React.FC<HeaderClientProps> = ({ headerData }) => {
  const pathname = usePathname();

  const [menuData, setMenuData] = useState<ServiceMenuItem[]>([]);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const imgT = useRef<HTMLImageElement | null>(null);

  // 🔹 Close menu & reset dropdown when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServiceDropdownOpen(true);
  }, [pathname]);

  // 🔹 Fetch menu data once
  useEffect(() => {
    axios
      .get("/api/header_data")
      .then((res) => setMenuData(res.data))
      .catch((err) => console.error("Failed to fetch menu", err));
  }, []);

  // 🔹 Sticky elements
  useStickyElements();

  // 🔹 Handle dropdown hover with delay
  const handleMouseEnter = useCallback((index: number) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    // Immediately show the new dropdown
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Set a delay before hiding (300ms)
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
      hoverTimeoutRef.current = null;
    }, 300);
  }, []);

  // 🔹 Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // 🔹 Click outside dropdown → reset service dropdown
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest(`.${styles.dropdown}`)) {
      setIsServiceDropdownOpen(true);
    }
  }, []);

  // 🔹 Menu toggle handlers
  const handleMenuToggle = useCallback(() => {
    if (isMobile) {
      setIsMenuOpen(!isMenuOpen);
    } else {
      setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
    }
  }, [isMobile, isMenuOpen, isDesktopSidebarOpen]);

  const handleMobileMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  // 🔹 Detect mobile resize with throttling for better performance
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setWindowWidth(width);
        setIsMobile(width < 992);
      }, 100); // Throttle resize events
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // 🔹 Fetch blogs (for slugs check)
  // useEffect(() => {
  //   axios.get("/api/all_blogs")
  //     .then((res) => setBlogs(res.data))
  //     .catch((err) => console.error("Error fetching blogs", err));
  // }, []);

  // // 🔹 Check if current path is a blog
  // const blogSlugs = blogs.map((b) => b.slug);
  // const pathSlug = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  // const isBlog = blogSlugs.includes(pathSlug);

  // 🔹 GSAP animation for image
  useEffect(() => {
    if (imgT.current) {
      gsap.from(imgT.current, {
        opacity: 0,
        duration: 0.5,
      });
    }
  }, [imgT.current?.src]);

  async function activeUserCount() {
    try {
      await axios.post("/api/socket");
    } catch (err) {
      console.error("Failed to increment active user", err);
    }
  }
  useEffect(() => {
    activeUserCount();
    // Tab close ya leave → count--
    const handleBeforeUnload = () => {
      const url = "/api/socket/delete-count";
      const data = null;
      navigator.sendBeacon(url, data);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);



  return (
    <header className="header-no-underline">
      <AnalyticsTracker></AnalyticsTracker>
      <div
        id="header-sticky"
        className={`tp-header-top-area tp-header__style-1 tp-header__transparent tp-header__border ${styles.headerBackground}`}
        style={{
          // background: "red",
          borderBottom: "white",
          position: "relative",
        }}
      >
        {/* Diwali Special Images  */}

        {/* <FlagWave /> */}
        <div
          className="container-fluid"
          style={{
            position: "relative",
          }}
        >
          <div className="row align-items-center">
            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-6">
              <div
                className="tp-main__logo"
                style={{
                  width: "128px",
                  padding: "16px 5px",
                  display: " flex",
                  alignItems: "center",
                }}
              >
                <Link
                  className="main-logo"
                  href="/"
                  prefetch={false}
                  title="Ritz Media World"
                  style={{ borderRadius: "0px !important", overflow: "hidden" }}
                >
                  <Image
                    src="/rmw-logo-sm-size.png"
                    alt="rmw-logo"
                    title="Ritz Media World logo"
                
                    className={styles.lgImg}
                    ref={imgT}
                    width={55}
                    height={70}
                    priority
                    // onMouseEnter={handleLogoChange}
                    // onMouseLeave={handleLogoChange}
                  />
                </Link>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8 d-none d-lg-block">
              <div className="tp-main__menu d-flex justify-content-center">
                <nav>
                  <ul id="menu-main-menu" className="menu-main-menu">
                    <li className="nav-item">
                      <Link
                        href="/" target="_blank"
                        title="Home"
                        prefetch={false}
                        className="nav-links"
                        style={{
                          textShadow:
                            pathname === "/"
                              ? "0px 4px 6px rgba(255, 255, 255, 0.3), 0px 1px 3px rgba(255, 255, 255, 0.2)"
                              : "inherit",
                          fontWeight: "bold",
                          color: pathname === "/" ? "#8a5a0d" : "inherit",
                        }}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="/about.html"
                        title="About"
                        target="_blank"
                        className="nav-links"
                        style={{
                          fontWeight: "bold",
                          textShadow:
                            pathname === "/about.html"
                              ? "0px 4px 6px rgba(255, 255, 255, 0.3), 0px 1px 3px rgba(255, 255, 255, 0.2)"
                              : "inherit",
                          color:
                            pathname === "/about.html" ? "#8a5a0d" : "inherit",
                        }}
                      >
                        About
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="/services"
                        title="Services"
                        className="nav-links"
                        target="_blank"
                        style={{
                          fontWeight: "bold",
                          textShadow:
                            pathname === "/services"
                              ? "0px 4px 6px rgba(255, 255, 255, 0.3), 0px 1px 3px rgba(255, 255, 255, 0.2)"
                              : "inherit",
                          color:
                            pathname === "/services" ? "#8a5a0d" : "inherit",
                        }}
                      >
                        Services
                      </Link>

                      <div
                        className="tp-submenu submenu has-homemenu"
                        style={{
                          fontWeight: "bold",
                          // padding: "0 25px",
                          width: "100vw",
                          left: "-70%",
                          transform: "translate(-36%, 0)",
                        }}
                      >
                        <div
                          data-elementor-type="container"
                          data-elementor-id="103"
                          className="elementor elementor-103"
                        >
                          <div className="elementor-element elementor-element-039dca9 e-con-full d-flex justify-content-center align-items-center e-con e-parent">
                            <div className="elementor-element elementor-element-f21576b e-con-full d-flex justify-content-center align-items-center e-con e-child">
                              <div className="elementor-element elementor-element-08a5267 elementor-widget elementor-widget-tp-menu-demo">
                                <div className="w-100">
                                  <ul className="d-flex justify-content-evenly align-items-center flex-nowrap list-unstyled m-0 p-0"
                                 
                                  
                                  >
                                    {menuData.map((item, index) => (
                                      <li
                                        key={index}
                                        className="position-relative text-center px-2"
                                        style={{
                                          width: "180px",
                                          height: "50px",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        {/* Main Menu Item */}
                                        <Link
                                          href={`${item.link}`}
                                          target="_blank"
                                          title={item.name}
                                          className="nav-link"
                                          style={{ fontSize: "14px"  }}
                                          onMouseEnter={() => handleMouseEnter(index)}
                                          onMouseLeave={handleMouseLeave}
                                        >
                                          {item.name}{" "}
                                          {index !== menuData.length - 2 && (
                                            <span> | </span>
                                          )}
                                        </Link>
                                        {/* Submenu */}
                                        <ul
                                          className="dropdown-menu position-absolute shadow"
                                          style={{
                                            borderTop: "2px solid #fddf82",
                                            top: "100%",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            minWidth: "200px",
                                            display: hoveredIndex === index ? "block" : "none",
                                            background: "#f2f2f2eb",
                                            color: "#0c0c0c",
                                            zIndex: 999999999999,
                                          }}
                                          onMouseEnter={() => handleMouseEnter(index)}
                                          onMouseLeave={handleMouseLeave}
                                        >
                                          {item.sub.map((subItem, subIndex) => (
                                            <li key={subIndex}>
                                              <Link
                                                className={styles.subDropLink}
                                                href={subItem.link}
                                                target="_blank"
                                                title={subItem.name}
                                                style={{
                                                  padding: "2px 0",
                                                  fontSize: "15px",
                                                  display: "block",
                                                  color: "#0c0c0c",
                                                  textDecoration: "none",
                                                }}
                                              >
                                                {subItem.name}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </li>
                                    ))}
                                  </ul>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="/work.html"
                        target="_blank"
                        title="Our Work"
                          className="nav-links"
                        style={{
                          fontWeight: "bold",
                          textShadow:
                            pathname === "/our-work"
                              ? "0px 4px 6px rgba(255, 255, 255, 0.3), 0px 1px 3px rgba(255, 255, 255, 0.2)"
                              : "inherit",
                          color:
                            pathname === "/our-work" ? "#8a5a0d" : "inherit",
                        }}
                      >
                        Our Work
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        title="Blog"
                        href="/blogs"
                        target="_blank"
                        className="nav-links"
                        style={{
                          fontWeight: "bold",
                          textShadow:
                            pathname === "/blogs"
                              ? "0px 4px 6px rgba(255, 255, 255, 0.3), 0px 1px 3px rgba(255, 255, 255, 0.2)"
                              : "inherit",
                          // color:
                          // pathname === "/blogs" || isBlog === true
                          //   ? "#8a5a0d"
                          //   : "inherit",
                        }}
                      >
                        Blog
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        title="Academy"
                        href="/rdx-digital-marketing-course"
                        target="_blank"
                        className="nav-links"
                        style={{
                          fontWeight: "bold",
                          textShadow:
                            pathname === "/rdx-digital-marketing-course"
                              ? "0px 4px 6px rgba(255, 255, 255, 0.3), 0px 1px 3px rgba(255, 255, 255, 0.2)"
                              : "inherit",
                          color:
                            pathname === "/rdx-digital-marketing-course"
                              ? "#8a5a0d"
                              : "inherit",
                        }}
                      >
                        Academy
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        title="Contact us"
                        href="/contact.html/"
                        target="_blank"
                          className="nav-links"
                        style={{
                          fontWeight: "bold",
                          textShadow:
                            pathname === "/contact.html"
                              ? "0px 4px 6px rgba(255, 255, 255, 0.3), 0px 1px 3px rgba(255, 255, 255, 0.2)"
                              : "inherit",
                          color:
                            pathname === "/contact.html"
                              ? "#8a5a0d"
                              : "inherit",
                        }}
                      >
                        Contact us
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-6">
              <div className="tp-header__right d-flex justify-content-end">
                <div className="tp-header__action">
                  <ul>
                    <li>
                      <button
                        className="tp-header__burs-btn tp-offcanvas-open-btn"
                        onClick={handleMenuToggle}
                      >
                        <span>
                          <svg
                            width="28"
                            height="26"
                            viewBox="0 0 28 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <ellipse
                              cx="2.39023"
                              cy="2.39022"
                              rx="2.39023"
                              ry="2.39022"
                              fill="#8A5A0D"
                            />
                            <ellipse
                              cx="13.9137"
                              cy="2.39022"
                              rx="2.39023"
                              ry="2.39022"
                              fill="black"
                              fillOpacity="0.7"
                            />
                            <ellipse
                              cx="25.441"
                              cy="2.39022"
                              rx="2.39023"
                              ry="2.39022"
                              fill="black"
                              fillOpacity="0.7"
                            />
                            <ellipse
                              cx="2.39023"
                              cy="12.6339"
                              rx="2.39023"
                              ry="2.39022"
                              fill="black"
                              fillOpacity="0.7"
                            />
                            <ellipse
                              cx="13.9137"
                              cy="12.6349"
                              rx="2.39023"
                              ry="2.39022"
                              fill="black"
                            />
                            <ellipse
                              cx="25.441"
                              cy="12.6349"
                              rx="2.39023"
                              ry="2.39022"
                              fill="black"
                              fillOpacity="0.7"
                            />
                            <ellipse
                              cx="2.39023"
                              cy="23.0484"
                              rx="2.39023"
                              ry="2.39022"
                              fill="black"
                              fillOpacity="0.7"
                            />
                            <ellipse
                              cx="13.9996"
                              cy="23.0484"
                              rx="2.39023"
                              ry="2.39022"
                              fill="black"
                              fillOpacity="0.7"
                            />
                            <ellipse
                              cx="25.609"
                              cy="23.0484"
                              rx="2.39023"
                              ry="2.39022"
                              fill="#8A5A0D"
                            />
                          </svg>
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobile && (
        <div
          className={`${styles.mobileMenuOverlay} ${
            isMenuOpen ? styles.open : ""
          }`}
          onClick={handleMobileMenuClose}
        >
          <div
            className={styles.mobileMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.mobileSidebarLogo}>
              <div className={styles.logoImageWrapper}>
                <Image
                  src="/rmw-logo-sm-size.png"
                  alt="RMW Logo"
                  title="Ritz Media World logo"
                  width={50}
                  height={70}
                  priority
                />
              </div>

              <button
                className={styles.closeMenu}
                onClick={() => setIsMenuOpen(false)}
              >
                ✖
              </button>
            </div>

            <nav>
              <ul className={`${styles.navItem}`}>
                <li>
                  <Link href="/" target="_blank" title="Home">Home</Link>
                </li>
                <li>
                  <Link href="/about.html" target="_blank" title="About">About</Link>
                </li>

                {/* Service Dropdown (Smooth) */}
                <li className={styles.dropdown}>
                  <div
                    className={styles.dropdownToggle}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsServiceDropdownOpen((prev) => !prev);
                    }}
                  >
                    <span>Service</span>
                    <button className={styles.dropdownArrow}>
                      {isServiceDropdownOpen ? "▲" : "▼"}
                    </button>
                  </div>
                  <ul
                    className={`${styles.submenu} ${
                      isServiceDropdownOpen ? styles.show : ""
                    }`}
                  >
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/digital-marketing" target="_blank" title="Digital Marketing">
                        Digital Marketing
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/creative-services" target="_blank" title="Creative Services">
                        Creative Services
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/print-advertising" target="_blank" title="Print Marketing">
                        Print Marketing
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/radio-advertising" target="_blank" title="Radio Marketing">
                        Radio Marketing
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/contents-marketing" target="_blank" title="Content Marketing">
                        Content Marketing
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/web-designing-and-development" target="_blank" title="Web Development">
                        Web Development
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/celebrity-endorsements" target="_blank" title="Celebrity Endorsements">
                        Celebrity Endorsements
                      </Link>
                    </li>
                    <li style={{ paddingLeft: "20px" }}>
                      <Link href="/services/influencer-marketing-agency-in-india" target="_blank" title="Influencer Marketing">
                        Influencer Marketing
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link href="/work.html" target="_blank" title="Our Work">Our Work</Link>
                </li>
                <li>
                  <Link href="/blogs" target="_blank" title="Blog">Blog</Link>
                </li>
                <li>
                  <Link href="/rdx-digital-marketing-course" target="_blank" title="Academy">Academy</Link>
                </li>
                <li>
                  <Link href="/contact.html" target="_blank" title="Contact us">Contact us</Link>
                </li>

                {/* href="/rdx-digital-marketing-course/" */}
              </ul>
            </nav>
            <div className="tp-hero__social-content">
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  justifyContent: "space-evenly",
                  fontSize: "20px",
                  color: "#8A5A0D",
                }}
              >
                <li>
                  <Link href="https://www.facebook.com/ritzmediaworld/" target="_blank" title="Facebook">
                    <FaFacebookF />
                  </Link>
                </li>
                <li>
                  <Link href="https://x.com/i/flow/login?redirect_after_login=%2Fritzmediaworld" target="_blank" title="Twitter">
                    <FaXTwitter />
                  </Link>
                </li>
                <li>
                  <Link href="https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia" target="_blank" title="YouTube">
                    <FaYoutube />
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/ritzmediaworld/" target="_blank" title="Instagram">
                    <FaInstagram />
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/company/ritzmediaworld/?originalSubdomain=in" target="_blank" title="LinkedIn">
                    <FaLinkedinIn />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (≥ 992px) */}
      {!isMobile && (
        <>
          {/* Dark Overlay */}
          {isDesktopSidebarOpen && (
            <div
              className={styles.overlay}
              onClick={() => setIsDesktopSidebarOpen(false)}
            ></div>
          )}

          {/* Sidebar */}
          <div
            className={`${styles.desktopSidebar} ${styles.mobileMenuOverlay} ${
              isDesktopSidebarOpen ? styles.open : ""
            }`}
            onClick={() => setIsDesktopSidebarOpen(false)}
          >
            <div
              className={styles.desktopSidebarContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.MobileSidebarLogo}>
                <Image
                  // style={{ height: "60px" }}
                  src="/rmw-logo-sm-size.png"
                  alt="RMW Logo"
                  title="Ritz Media World logo"
                  width={60}
                  height={100}
                  priority
                />
                <button
                  className={styles.closeMenu}
                  onClick={() => setIsDesktopSidebarOpen(false)}
                >
                  ✖
                </button>
              </div>

              <div
                style={{
                  fontSize: "18px",
                  fontFamily: "sans-serif",
                  color: "#000",
                }}
              >
                We build stories not just worth telling, but worth sharing.
                That’s what sets us apart.
              </div>

              <div>
                <p
                  style={{
                    color: "#000",
                    fontSize: "26px",
                    marginTop: "20px",
                  }}
                >
                  Case Studies
                </p>
                <div className={styles.caseImgs}>
                  <Link href="/revving-up-success-advertising-and-car-care-a-surprising-comparison" target="_blank" title="Case study thumbnail 1">
                    {/* <img src="/blogs/2023/09/acr-768x404.jpg" alt="" /> */}
                    <Image
                      src="https://ritzmediaworld.com/blogs/2023/09/acr-768x404.jpg"
                      alt="hI1"
                      title="Case study thumbnail 1"
                      width={200}
                      height={100}
                      priority
                    />
                  </Link>

                  <Link href="/sticking-to-success-a-case-study-on-the-fevicol-marketing-campaign" target="_blank" title="Case study thumbnail 2">
                    {/* <img src="/blogs/2023/09/Slide1-768x432.jpg" alt="" /> */}
                    <Image
                      src="https://ritzmediaworld.com/blogs/2023/09/Slide1-768x432.jpg"
                      alt="hI2"
                      title="Case study thumbnail 2"
                      width={200}
                      height={100}
                      priority
                    />
                  </Link>

                  <Link href="/from-reality-to-virtuality-metaverse-technology" target="_blank" title="Case study thumbnail 3">
                    {/* <img
                      src="/blogs/db16fa7c-4f82-1f75-04f3-4270575794e8_1100_550.png"
                      alt=""
                    /> */}
                    <Image
                      src="https://ritzmediaworld.com/blogs/db16fa7c-4f82-1f75-04f3-4270575794e8_1100_550.png"
                      alt="hI3"
                      title="Case study thumbnail 3"
                      width={200}
                      height={100}
                      priority
                    />
                  </Link>

                  <Link href="/how-did-cooking-shows-influence-indias-cooking-utensil-sales" target="_blank" title="Case study thumbnail 4">
                    {/* <img src="/blogs/cook-1024x539.jpg" alt="" /> */}
                    <Image
                      src="https://ritzmediaworld.com/blogs/cook-1024x539.jpg"
                      alt="hI4"
                      title="Case study thumbnail 4"
                      width={200}
                      height={100}
                      priority
                    />
                  </Link>
                </div>
              </div>

              <div className={styles.contactInfo}>
                <p style={{ fontSize: "20px", fontWeight: "bold" }}>Contact</p>
                <p>
                  Address: 402 – 404 , 4th floor Corporate Park, Tower A1 Sector
                  142, Noida
                </p>
                <p>
                  <Link href="https://ritzmediaworld.com/" target="_blank" title="Email">info@ritzmediaworld.com</Link>
                </p>
                <p>
                  <Link href="https://ritzmediaworld.com/" target="_blank" title="Phone">09220516777</Link>
                </p>
                <p>
                  <Link href="https://ritzmediaworld.com/" target="_blank" title="Phone">07290002168</Link>
                </p>
              </div>

              <div
                style={{
                  bottom: "20px",
                  position: "absolute",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                className="tp-hero__social-content"
              >
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    gap: "30px",
                    fontSize: "20px",
                    color: "#334258",
                  }}
                >
                  <li>
                    <Link href="https://www.facebook.com/ritzmediaworld/" target="_blank" title="Facebook">
                      <FaFacebookF />
                    </Link>
                  </li>
                  <li>
                    <Link href="https://x.com/i/flow/login?redirect_after_login=%2Fritzmediaworld" target="_blank" title="Twitter">
                      <FaXTwitter />
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia" target="_blank" title="YouTube">
                      <FaYoutube />
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.instagram.com/ritzmediaworld/" target="_blank" title="Instagram">
                      <FaInstagram />
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.linkedin.com/company/ritzmediaworld/?originalSubdomain=in" target="_blank" title="LinkedIn">
                      <FaLinkedinIn />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      <style jsx global>{`
        .header-no-underline a,
        .header-no-underline a:link,
        .header-no-underline a:visited,
        .header-no-underline a:hover,
        .header-no-underline a:active,
        .header-no-underline a:focus,
        .header-no-underline a:focus-visible {
          text-decoration: none !important;
        }
      `}</style>
    </header>
  );
};

export default HeaderClient;
