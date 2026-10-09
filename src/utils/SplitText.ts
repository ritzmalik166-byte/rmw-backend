// // /utils/SplitText.ts
// export default class SplitText {
//     chars: HTMLElement[];
//     words: HTMLElement[];
//     lines: HTMLElement[];
  
//     constructor(element: HTMLElement, options: { type: string; linesClass?: string }) {
//       const types = options.type.split(",");
//       const linesClass = options.linesClass || "";
  
//       this.chars = [];
//       this.words = [];
//       this.lines = [];
  
//       if (types.includes("chars")) {
//         this.chars = this.splitChars(element);
//       }
//       if (types.includes("words")) {
//         this.words = this.splitWords(element);
//       }
//       if (types.includes("lines")) {
//         this.lines = this.splitLines(element, linesClass);
//       }
//     }
  
//     splitChars(element: HTMLElement) {
//       const chars = element.textContent?.split("") || [];
//       element.innerHTML = chars.map((char) => `<span class="char">${char}</span>`).join("");
//       return Array.from(element.querySelectorAll(".char")) as HTMLElement[];
//     }
  
//     splitWords(element: HTMLElement) {
//       const words = element.textContent?.split(" ") || [];
//       element.innerHTML = words.map((word) => `<span class="word">${word} </span>`).join("");
//       return Array.from(element.querySelectorAll(".word")) as HTMLElement[];
//     }
  
//     splitLines(element: HTMLElement, className: string) {
//       const lines = element.innerHTML.split("<br>");
//       element.innerHTML = lines.map((line) => `<div class="${className}">${line}</div>`).join("");
//       return Array.from(element.querySelectorAll(`.${className}`)) as HTMLElement[];
//     }
//   }
 

// /utils/SplitText.ts
export default class SplitText {
    chars: HTMLElement[] = [];
    words: HTMLElement[] = [];
    lines: HTMLElement[] = [];
  
    constructor(element: HTMLElement, options: { type: string; linesClass?: string }) {
      if (!element) return;
  
      const types = options.type.split(",");
      const linesClass = options.linesClass || "tp-split__line";
  
      const originalHTML = element.innerHTML; // Save original text in case of re-renders
  
      if (types.includes("words")) {
        this.words = this.splitWords(element);
      }
      if (types.includes("chars")) {
        this.chars = this.splitChars(element);
      }
      if (types.includes("lines")) {
        this.lines = this.splitLines(element, linesClass);
      }
  
      // Restore original HTML if split failed
      if (!this.chars.length && !this.words.length && !this.lines.length) {
        element.innerHTML = originalHTML;
      }
    }
  
    private splitChars(element: HTMLElement) {
      const chars = Array.from(element.textContent || "");
      element.innerHTML = chars.map((char) => `<span class="char">${char}</span>`).join("");
      return Array.from(element.querySelectorAll(".char")) as HTMLElement[];
    }
  
    private splitWords(element: HTMLElement) {
      const words = element.textContent?.split(" ") || [];
      element.innerHTML = words.map((word) => `<span class="word">${word} </span>`).join("");
      return Array.from(element.querySelectorAll(".word")) as HTMLElement[];
    }
  
    private splitLines(element: HTMLElement, className: string) {
      const lines = element.innerHTML.split("<br>");
      element.innerHTML = lines.map((line) => `<div class="${className}">${line}</div>`).join("");
      return Array.from(element.querySelectorAll(`.${className}`)) as HTMLElement[];
    }
  }
  