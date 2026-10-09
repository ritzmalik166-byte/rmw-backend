import { useEffect } from "react";
import gsap from "gsap";

const useGSAPHoverEffect = () => {
  useEffect(() => {
    // Select all button wrappers and items
    const hoverBtns = document.querySelectorAll(".tp-hover__btn-wrap");
    const hoverBtnItems = document.querySelectorAll(".tp-hover__btn-item");

    hoverBtns.forEach((btn, i) => {
      const target = hoverBtnItems[i] as HTMLElement;
      if (!target) return;

      // Parallax function
      const parallaxIt = (e: MouseEvent, target: HTMLElement, movement: number) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        const width = rect.width;
        const height = rect.height;

        gsap.to(target, {
          x: ((relX - width / 2) / width) * movement,
          y: ((relY - height / 2) / height) * movement,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      // Event listeners
      const onMouseMove = (e: Event) => parallaxIt(e as MouseEvent, target, 80);
      const onMouseLeave = () =>
        gsap.to(target, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });

      btn.addEventListener("mousemove", onMouseMove);
      btn.addEventListener("mouseleave", onMouseLeave);

      // Cleanup
      return () => {
        btn.removeEventListener("mousemove", onMouseMove);
        btn.removeEventListener("mouseleave", onMouseLeave);
      };
    });
  }, []);
};

export default useGSAPHoverEffect;
