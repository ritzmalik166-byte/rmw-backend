import { useEffect } from "react";

const useStickyElements = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Header Sticky Logic
      if (scrollY < 100) {
        document.getElementById("header-sticky")?.classList.remove("header-sticky");
        document.getElementById("header-sticky-2")?.classList.remove("header-sticky-2");
      } else {
        document.getElementById("header-sticky")?.classList.add("header-sticky");
        document.getElementById("header-sticky-2")?.classList.add("header-sticky-2");
      }

      // Side Menu Sticky Logic
      const sideMenu = document.querySelectorAll(".tp-side-menu-5");
      sideMenu.forEach((menu) => {
        if (scrollY < 100) {
          menu.classList.remove("sticky-active");
        } else {
          menu.classList.add("sticky-active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
  }, []);
};

export default useStickyElements;
