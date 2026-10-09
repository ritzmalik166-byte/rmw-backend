// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// export const useMouseMove = () => {
//   const sectionRef = useRef<HTMLElement | null>(null);

//   useEffect(() => {
//     if (!sectionRef.current) return;

//     const moveSection = sectionRef.current;
//     const moveSectionElements = moveSection.querySelectorAll(".tp-mouse-move-element");

//     if (!moveSectionElements.length) return;

//     const handleMouseMove = (e: MouseEvent) => {
//       const { clientX: x, clientY: y } = e;
//       const viewportWidth = window.innerWidth;
//       const viewportHeight = window.innerHeight;
//       const centerX = viewportWidth / 2;
//       const centerY = viewportHeight / 2;

//       gsap.to(moveSectionElements, {
//         x: x > centerX ? 20 : -20,
//         y: y > centerY ? 5 : -5,
//         scale: x < centerX ? 1.1 : 1, // Scale effect when moving left
//         duration: 2,
//         ease: "power4.out",
//       });
//     };

//     moveSection.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       moveSection.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return sectionRef;
// };
