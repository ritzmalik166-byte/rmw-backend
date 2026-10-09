import { useEffect } from "react";

const useCustomCursor = () => {
  useEffect(() => {
    const cursorInner = document.querySelector(".cursor-inner") as HTMLElement;
    const cursorOuter = document.querySelector(".cursor-outer") as HTMLElement;
    const mouseCursor = document.querySelector(".mouseCursor") as HTMLElement;

    if (!cursorInner || !cursorOuter || !mouseCursor) return;

    const isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isHovering) {
        cursorOuter.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const onMouseEnter = () => {
      cursorInner.classList.add("active");
      cursorOuter.classList.add("active");
    };

    const onMouseLeave = (e: Event) => {
      if (!(e.target as HTMLElement)?.closest(".cursor-pointer, button, a")) {
        cursorInner.classList.remove("active");
        cursorOuter.classList.remove("active");
      }
    };

    const onCursorPointEnter = () => mouseCursor.classList.add("cursor-big");
    const onCursorPointLeave = () => mouseCursor.classList.remove("cursor-big");

    const onCursorPointEnter2 = () => cursorInner.classList.add("active");
    const onCursorPointLeave2 = () => cursorInner.classList.remove("active");

    document.addEventListener("mousemove", onMouseMove);

    document.querySelectorAll("button, a, .cursor-pointer").forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    document.querySelectorAll(".tp-cursor-point-area").forEach((el) => {
      el.addEventListener("mouseenter", onCursorPointEnter);
      el.addEventListener("mouseleave", onCursorPointLeave);
    });

    document.querySelectorAll(".tp-cursor-point-area-2").forEach((el) => {
      el.addEventListener("mouseenter", onCursorPointEnter2);
      el.addEventListener("mouseleave", onCursorPointLeave2);
    });

    cursorInner.style.visibility = "visible";
    cursorOuter.style.visibility = "visible";

    return () => {
      document.removeEventListener("mousemove", onMouseMove);

      document.querySelectorAll("button, a, .cursor-pointer").forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });

      document.querySelectorAll(".tp-cursor-point-area").forEach((el) => {
        el.removeEventListener("mouseenter", onCursorPointEnter);
        el.removeEventListener("mouseleave", onCursorPointLeave);
      });

      document.querySelectorAll(".tp-cursor-point-area-2").forEach((el) => {
        el.removeEventListener("mouseenter", onCursorPointEnter2);
        el.removeEventListener("mouseleave", onCursorPointLeave2);
      });
    };
  }, []);
};

export default useCustomCursor;
