"use client";

import Link from "next/link";
import Image from "next/image";
import useStickyElements from "@/hooks/useStickyElements"; //changed

const Header = () => {
  useStickyElements();

  return (
    <header>
      <div
        id="header-sticky"
        className="tp-header-top-area tp-header__style-1 tp-header__transparent tp-header__border pr-160 pl-160"
        style={{ backgroundColor: "#101010" }}
      >
        <div className="contianer-fluid">
          <div className="row align-items-center">
            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-6">
              <div
                className="tp-main__logo"
                style={{
                  background: "blue",
                }}
              >
                <Link className="main-logo" href="/" target="_blank" title="Ritz Media World">
                  <Image  
                    width={50}
                    height={50}
                    src="/logo_blue.png"
                    alt="Ritz Media World logo"
                    title="Ritz Media World logo"
                    priority
                  />
                </Link>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8 d-none d-lg-block ">
              <div className="tp-main__menu d-flex justify-content-center">
                <nav>
                  <ul id="menu-main-menu" className="">
                    <li
                      itemScope
                      itemType="https://www.schema.org/"
                      id="menu-item-2496"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-17 current_page_item active menu-item-2496 has-mega-menu has-dropdown nav-item"
                    >
                      <Link title="Home" href="/" target="_blank" className="nav-links">
                        Home
                      </Link>
                    </li>
                    <li
                      itemScope
                      itemType="https://www.schema.org/about/"
                      id="menu-item-73"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-73 nav-item"
                    >
                      <Link title="About" href="/about.html/" className="nav-links">
                        About
                      </Link>
                    </li>
                    <li
                      itemScope
                      itemType="https://www.schema.org/services"
                      id="menu-item-88"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children dropdown has-dropdown menu-item-88 nav-item"
                    >
                      <Link
                        title="Service"
                        href="/services"
                        className="nav-links"
                      >
                        Service
                      </Link>

                      <div className="tp-submenu submenu has-homemenu">
                        <div
                          data-elementor-type="container"
                          data-elementor-id="103"
                          className="elementor elementor-103"
                        >
                          <div
                            className="elementor-element elementor-element-039dca9 e-con-full e-flex e-con e-parent"
                            data-id="039dca9"
                            data-element_type="container"
                          >
                            <div
                              className="elementor-element elementor-element-f21576b e-con-full e-flex e-con e-child"
                              data-id="f21576b"
                              data-element_type="container"
                            >
                              <div
                                className="elementor-element elementor-element-08a5267 elementor-widget elementor-widget-tp-menu-demo"
                                data-id="08a5267"
                                data-element_type="widget"
                                data-widget_type="tp-menu-demo.default"
                              >
                                <div className="elementor-widget-container">
                                  <div className="row gx-6 row-cols-1 row-cols-md-2 row-cols-lg-5 row-cols-xl-6">
                                    <div className="col homemenu">
                                      <div className="homemenu-content text-center">
                                        <h4 className="homemenu-title">
                                          <Link
                                            title="Digital Marketing"
                                            href="/digital-marketing/#"

                                            rel="nofollow"
                                          >
                                            Digital Marketing
                                          </Link>
                                        </h4>
                                      </div>
                                    </div>
                                    <div className="col homemenu">
                                      {/* <div className="homemenu-thumb mb-15">
                                        <img
                                          src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/08/home-2.jpg"
                                          alt=""
                                        />
                                        <div className="homemenu-btn">
                                          <Link
                                            className="tp-menu-btn"
                                            href="/" target="_blank"
                                            
                                            rel="nofollow"
                                          >
                                            Multi page
                                          </Link>
                                        </div>
                                      </div> */}
                                      <div className="homemenu-content text-center">
                                        <h4 className="homemenu-title">
                                          <Link
                                            title="Branding"
                                            href="/" target="_blank"

                                            rel="nofollow"
                                          >
                                            Branding
                                          </Link>
                                        </h4>
                                      </div>
                                    </div>
                                    <div className="col homemenu">
                                      {/* <div className="homemenu-thumb mb-15">
                                        <img
                                          src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/08/home-3.jpg"
                                          alt=""
                                        />
                                        <div className="homemenu-btn">
                                          <Link
                                            className="tp-menu-btn"
                                            href="/" target="_blank"
                                            
                                            rel="nofollow"
                                          >
                                            Multi page
                                          </Link>
                                        </div>
                                      </div> */}
                                      <div className="homemenu-content text-center">
                                        <h4 className="homemenu-title">
                                          <Link
                                            href="/" target="_blank"
                                            title="Design Studio"
                                            rel="nofollow"
                                          >
                                            Design Studio
                                          </Link>
                                        </h4>
                                      </div>
                                    </div>
                                    <div className="col homemenu">
                                      {/* <div className="homemenu-thumb mb-15">
                                        <img
                                          src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/08/home-4.jpg"
                                          alt=""
                                        />
                                        <div className="homemenu-btn">
                                          <Link
                                            className="tp-menu-btn"
                                            href="/" target="_blank"
                                            
                                            rel="nofollow"
                                          >
                                            Multi page
                                          </Link>
                                        </div>
                                      </div> */}
                                      <div className="homemenu-content text-center">
                                        <h4 className="homemenu-title">
                                          <Link
                                            title="Freelancer"
                                            href="/" target="_blank"

                                            rel="nofollow"
                                          >
                                            Freelancer
                                          </Link>
                                        </h4>
                                      </div>
                                    </div>
                                    <div className="col homemenu">
                                      {/* <div className="homemenu-thumb mb-15">
                                        <img
                                          src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/08/home-5.jpg"
                                          alt=""
                                        />
                                        <div className="homemenu-btn">
                                          <Link
                                            className="tp-menu-btn"
                                            href="/" target="_blank"
                                            
                                            rel="nofollow"
                                          >
                                            Multi page
                                          </Link>
                                        </div>
                                      </div> */}
                                      <div className="homemenu-content text-center">
                                        <h4 className="homemenu-title">
                                          <Link
                                            title="Creative Agency"
                                            href="/" target="_blank"

                                            rel="nofollow"
                                          >
                                            Creative Agency
                                          </Link>
                                        </h4>
                                      </div>
                                    </div>
                                    <div className="col homemenu">
                                      {/* <div className="homemenu-thumb mb-15">
                                        <img
                                          src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/08/home-6.jpg"
                                          alt=""
                                        />
                                        <div className="homemenu-btn">
                                          <Link
                                            className="tp-menu-btn"
                                            href="/" target="_blank"
                                            
                                            rel="nofollow"
                                          >
                                            Multi page
                                          </Link>
                                        </div>
                                      </div> */}
                                      <div className="homemenu-content text-center">
                                        <h4 className="homemenu-title">
                                          <Link
                                            href="/" target="_blank"
                                            title="Portfolio Showcase"
                                            rel="nofollow"
                                          >
                                            Portfolio Showcase
                                          </Link>
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li
                      itemScope
                      itemType="https://www.schema.org/our-work/"
                      id="menu-item-94"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children dropdown has-dropdown menu-item-94 nav-item"
                    >
                      <Link
                        title="Our Work"
                        href="/work.html/"
                        className="nav-links"
                      >
                        Our Work
                      </Link>
                    </li>
                    <li
                      itemScope
                      itemType="https://www.schema.org/blog"
                      id="menu-item-74"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children dropdown has-dropdown menu-item-74 nav-item"
                    >
                      <Link title="Blog" href="/blogs" className="nav-links">
                        Blog
                      </Link>
                    </li>
                    <li
                      itemScope
                      itemType="https://www.schema.org/contact/"
                      id="menu-item-95"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children dropdown has-dropdown menu-item-95 nav-item"
                    >
                      <Link
                        title="Pages"
                        href="/contact.html/"
                        className="nav-links"
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
                      <button className="tp-header__burs-btn tp-offcanvas-open-btn">
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
                              fill="#fddf82"
                            />
                            <ellipse
                              cx="13.9137"
                              cy="2.39022"
                              rx="2.39023"
                              ry="2.39022"
                              fill="white"
                              fillOpacity="0.7"
                            />
                            <ellipse
                              cx="25.441"
                              cy="2.39022"
                              rx="2.39023"
                              ry="2.39022"
                              fill="white"
                              fillOpacity="0.7"
                            />
                            <ellipse
                              cx="2.39023"
                              cy="12.6339"
                              rx="2.39023"
                              ry="2.39022"
                              fill="white"
                              fillOpacity="0.7"
                            />
                            <ellipse
                              cx="13.9137"
                              cy="12.6349"
                              rx="2.39023"
                              ry="2.39022"
                              fill="white"
                            />
                            <ellipse
                              cx="25.441"
                              cy="12.6349"
                              rx="2.39023"
                              ry="2.39022"
                              fill="white"
                              fillOpacity="0.7"
                            />
                            <ellipse
                              cx="2.39023"
                              cy="23.0484"
                              rx="2.39023"
                              ry="2.39022"
                              fill="white"
                              fillOpacity="0.7"
                            />
                            <ellipse
                              cx="13.9996"
                              cy="23.0484"
                              rx="2.39023"
                              ry="2.39022"
                              fill="white"
                              fillOpacity="0.7"
                            />
                            <ellipse
                              cx="25.609"
                              cy="23.0484"
                              rx="2.39023"
                              ry="2.39022"
                              fill="#fddf82"
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
    </header>
  );
};

export default Header;
