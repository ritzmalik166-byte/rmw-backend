"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { memo, useEffect } from "react";

const RMW_VISITOR_SESSION_KEY = "rmw_visitor_session_id";

const Footer = memo(() => {
  const pathname = usePathname();

  useEffect(() => {
    const recordTraffic = async () => {
      try {
        const payload: Record<string, string> = {
          url:
            typeof window !== "undefined" ? window.location.href : "",
          referrer:
            typeof document !== "undefined" ? document.referrer || "" : "",
        };
        try {
          const existing = sessionStorage.getItem(RMW_VISITOR_SESSION_KEY);
          if (existing) {
            payload.sessionId = existing;
          }
        } catch {
          /* sessionStorage unavailable */
        }

        const res = await fetch("/api/tracker", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = (await res.json().catch(() => ({}))) as {
          sessionId?: string;
        };
        if (res.ok && typeof data.sessionId === "string" && data.sessionId) {
          try {
            sessionStorage.setItem(RMW_VISITOR_SESSION_KEY, data.sessionId);
          } catch {
            /* ignore */
          }
        }
      } catch {
        /* ignore tracker failures */
      }
    };

    void recordTraffic();
  }, [pathname]);

  return (
    <footer className="footer-no-underline">
      {/* <!-- tp footer area start  --> */}

      <section
        className="tp-footer-area fix tp-footer__1 tp-footer__plr   z-index-11 p-relative"
        data-background=""
        data-bg-color=""
      >
        <div className="tp-footer__wrap">
          <div className="tp-cta-area  pb-40"></div>
          {/* <!-- tp cta area end  --> */}
          <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="col-12 col-md-6 col-lg-3">
                <div
                  id="custom_html-3"
                  className="widget_text tp-footer__widget footer-col-1-1 mb-40 widget_custom_html"
                >
                  <div className="widget_text tp-footer-widget-content">
                    <div
                      style={{ padding: "10px" }}
                      className="textwidget custom-html-widget"
                    >
                      <div className="tp-footer__logo">
                        <Link href="/" target="_blank" title="Home">
                          <Image
                            width={100}
                            height={100}
                            src="/logo-brown.png"
                            alt="logo"
                            title="Ritz Media World logo"
                            loading="lazy"
                            quality={60}
                            priority={false}
                          />
                        </Link>
                      </div>
                      <p style={{ color: "#ffffff", fontSize: "14px" }}>
                        Accelerate your journey to success with result-oriented
                        solutions for Digital Advertising, Social Media
                        Management, SEO, and Compelling Content backed by more
                        than 17 years of advertising wisdom with a wide array of
                        clients across all industries across the Indian
                        subcontinent.
                      </p>
                      <div className="tp-contact__social-link">
                        <Link
                          href="https://www.facebook.com/ritzmediaworld/"
                          title="Facebook"
                          className="footer-icon"
                          style={{ border: "none" }}
                        >
                          <i aria-hidden="true">
                            <FaFacebookF color="white" />
                          </i>
                        </Link>
                        <Link
                          title="Instagram"
                          href="https://www.instagram.com/ritzmediaworld/"
                          className="footer-icon"
                          style={{ border: "none" }}
                        >
                          <i aria-hidden="true">
                            <FaInstagram color="white" />
                          </i>
                        </Link>
                        <Link
                          title="Twitter"
                          href="https://x.com/i/flow/login?redirect_after_login=%2Fritzmediaworld"
                          target="http://1"
                          rel="http://1"
                          className="footer-icon"
                          style={{ border: "none" }}
                        >
                          <i aria-hidden="true">
                            <FaXTwitter color="white" />
                          </i>
                        </Link>
                        <Link
                          title="LinkedIn"
                          href="https://www.linkedin.com/company/ritzmediaworld/?originalSubdomain=in"
                          className="footer-icon"
                          style={{ border: "none" }}
                        >
                          <i aria-hidden="true">
                            <FaLinkedin color="white" />
                          </i>
                        </Link>
                        <Link
                          title="YouTube"
                          href="https://www.youtube.com/c/RitzMediaWorldCreativeThinksMedia"
                          className="footer-icon"
                          style={{ border: "none" }}
                          target="http://1"
                          rel="http://1"
                        >
                          <i aria-hidden="true">
                            <FaYoutube color="white" />
                          </i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-6 col-lg-3">
                <div
                  id="nav_menu-3"
                  className="tp-footer__widget footer-col-1-2 mb-40 widget_nav_menu"
                >
                  <div className="tp-footer-widget-content">
                    <div
                      className="tp-footer__widget-title"
                      style={{ color: "#ffffff", fontSize: "20px" }}
                    >
                      Quick Links
                    </div>
                    <div className="menu-our-location-container">
                      <ul id="menu-our-location" className="menu">
                        <li
                          id="menu-item-140"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-140"
                        >
                          <Link href="/" target="_blank" title="Home" style={{ color: "#ffffff" }}>
                            Home
                          </Link>
                        </li>
                        <li
                          id="menu-item-141"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-141"
                        >
                          <Link href="/about.html" title="About" style={{ color: "#ffffff" }}>
                            About
                          </Link>
                        </li>
                        {/* <li
                          id="menu-item-142"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-142"
                        >
                          <Link href="/services" style={{ color: "#ffffff" }}>
                            Services
                          </Link>
                        </li> */}
                        <li
                          id="menu-item-143"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-143"
                        >
                          <Link href="/work.html" title="Our Work" style={{ color: "#ffffff" }}>
                            Our Work
                          </Link>
                        </li>
                        <li
                          id="menu-item-144"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-144"
                        >
                          <Link href="/blogs" title="Blogs" style={{ color: "#ffffff" }}>
                            Blogs
                          </Link>
                        </li>
                        <li
                          id="menu-item-144"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-144"
                        >
                          <Link
                            href="/web-stories"
                            title="Web Stories"
                            style={{ color: "#ffffff" }}
                          >
                            Web Stories
                          </Link>
                        </li>
                        <li
                          id="menu-item-144"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-144"
                        >
                          <Link
                            href="/contact.html"
                            title="Contact"
                            style={{ color: "#ffffff" }}
                          >
                            Contact
                          </Link>
                        </li>
                        <li
                          id="menu-item-144"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-144"
                        >
                          <Link href="/career" title="Career" style={{ color: "#ffffff" }}>
                            Career
                          </Link>
                        </li>
                        {/* 
                        <li
                          id="menu-item-144"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-144"
                        >
                          <Link href="/discussion-forum" style={{ color: "#ffffff" }}>
                            Discussion Forum
                          </Link>
                        </li>
                        <li
                          id="menu-item-144"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-144"
                        >
                          <Link href="/clients" style={{ color: "#ffffff" }}>
                            Clients
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-6 col-lg-3">
                <div
                  id="nav_menu-4"
                  className="tp-footer__widget footer-col-1-4 mb-40 widget_nav_menu"
                >
                  <div className="tp-footer-widget-content">
                    <div
                      className="tp-footer__widget-title"
                      style={{ color: "#ffffff", fontSize: "20px" }}
                    >
                      our services
                    </div>
                    <div className="menu-footer-service-nav-container">
                      <ul id="menu-footer-service-nav" className="menu">
                        <li
                          id="menu-item-135"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-135"
                        >
                          <Link
                            href="/services/digital-marketing"
                            title="Digital Marketing"
                            style={{ color: "#ffffff" }}
                          >
                            Digital Marketing
                          </Link>
                        </li>
                        <li
                          id="menu-item-136"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-136"
                        >
                          <Link
                            title="Print Advertising"
                            href="/services/print-advertising"
                            style={{ color: "#ffffff" }}
                          >
                            Print Advertising
                          </Link>
                        </li>
                        <li
                          id="menu-item-137"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-137"
                        >
                          <Link
                            title="Radio Advertising"
                            href="/services/radio-advertising"
                            style={{ color: "#ffffff" }}
                          >
                            Radio Advertising
                          </Link>
                        </li>
                        <li
                          id="menu-item-138"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-138"
                        >
                          <Link
                            title="Creative Services"
                            href="/services/creative-services"
                            style={{ color: "#ffffff" }}
                          >
                            Creative Services
                          </Link>
                        </li>
                        <li
                          id="menu-item-138"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-138"
                        >
                          <Link
                            title="Content Marketing"
                            href="/services/contents-marketing"
                            style={{ color: "#ffffff" }}
                          >
                            Content Marketing
                          </Link>
                        </li>
                        <li
                          id="menu-item-139"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-139"
                        >
                          <Link
                            title="Web Development"
                            href="/services/web-designing-and-development"
                            style={{ color: "#ffffff" }}
                          >
                            Web Development
                          </Link>
                        </li>
                        <li
                          id="menu-item-139"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-139"
                        >
                          <Link
                            title="Celebrity Endorsements"
                            href="/services/celebrity-endorsements"
                            style={{ color: "#ffffff" }}
                          >
                            Celebrity Endorsements
                          </Link>
                        </li>
                        <li
                          id="menu-item-139"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-139"
                        >
                          <Link
                            title="Influencer Marketing"
                            href="/services/influencer-marketing-agency-in-india"
                            style={{ color: "#ffffff" }}
                          >
                            Influencer Marketing
                          </Link>
                        </li>
                        {/* <li
                          id="menu-item-139"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-139"
                        >
                          <Link
                            href="/services/3d-rendering-services"
                            style={{ color: "#ffffff" }}
                          >
                            3D Rendering Services
                          </Link>
                        </li>
                        <li
                          id="menu-item-139"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-139"
                        >
                          <Link
                            href="/services/real-estate-walkthrough"
                            style={{ color: "#ffffff" }}
                          >
                            Real Estate Walkthrough
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3 w-full min-h-[206px]">
                <div
                  id="custom_html-4"
                  className="widget_text tp-footer__widget footer-col-1-3 mb-40 widget_custom_html w-full min-h-[206px]"
                >
                  <div className="widget_text tp-footer-widget-content w-full min-h-[206px] flex flex-col">
                    <div
                      className="tp-footer__widget-title"
                      style={{ color: "#ffffff", fontSize: "20px" }}
                    >
                      Contact info
                    </div>
                    <div className="textwidget custom-html-widget">
                      <div className="tp-footer__contact-info">
                        <div className="tp-footer__list">
                          <Link
                            title="Address"
                            href="/contact.html"
                            style={{ color: "#ffffff" }}
                          >
                            Address: 402 – 404, <br /> 4th floor Corporate Park,{" "}
                            <br />
                            Tower A1 Sector 142, <br /> Noida
                          </Link>
                          <Link
                            title="Phone"
                            href="tel:09220516777"
                            style={{ color: "#ffffff" }}
                          >
                            09220516777
                          </Link>
                          <Link
                            title="Phone"
                            href="tel:07290002168"
                            style={{ color: "#ffffff" }}
                          >
                            07290002168
                          </Link>
                          <Link
                            title="Email"
                            href="mailto:
info@ritzmediaworld.com"
                            style={{ color: "#ffffff" }}
                          >
                            info@ritzmediaworld.com
                          </Link>
                          <div style={{ color: "#ffffff" }}>
                            Office Hours: 9:30AM - 6:30PM
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- tp copyright area start --> */}
          <div className="tp-copyright-area pb-5">
            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
              <div
                className="tp-copyright__wrap   pt-20"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <div className="row align-items-center">
                  <div className="">
                    <div className="tp-copyright__text">
                      <p style={{ color: "#ffffff" }}>
                        © 2026{" "}
                        <span style={{ color: "#ffffff" }}>
                          {" "}
                          RITZ MEDIA WORLD,
                        </span>{" "} <br />
                        All Rights Reserved
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <Image
                    src="/rmwPartners.png"
                    alt="Ritz Media World Partners"
                    title="Ritz Media World partners"
                    width={398}
                    height={100}
                    loading="lazy"
                    quality={60}
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <!-- tp copyright area end --> */}
        </div>
      </section>
      <style jsx global>{`
        .footer-no-underline a,
        .footer-no-underline a:link,
        .footer-no-underline a:visited,
        .footer-no-underline a:hover,
        .footer-no-underline a:active,
        .footer-no-underline a:focus,
        .footer-no-underline a:focus-visible {
          text-decoration: none !important;
        }
      `}</style>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
