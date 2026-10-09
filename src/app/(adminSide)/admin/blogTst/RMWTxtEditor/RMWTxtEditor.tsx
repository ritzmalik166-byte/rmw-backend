// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import {
//   FaPlusSquare,
//   FaVideo,
//   FaMusic,
//   FaImage,
//   FaFileAlt,
//   FaBold,
//   FaItalic,
//   FaUnderline,
//   FaListUl,
//   FaListOl,
//   FaAlignLeft,
//   FaAlignCenter,
//   FaAlignRight,
//   FaLink,
//   FaTable,
//   FaSmile,
//   FaCode,
//   FaUndo,
//   FaRedo,
//   FaParagraph,
//   FaHeading,
//   FaIndent,
//   FaOutdent,
// } from "react-icons/fa";

// interface RMWTxtEditorProps {}

// function RMWTxtEditor({}: RMWTxtEditorProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const [isUnderline, setIsUnderline] = useState(false);
//   const editorRef = useRef<HTMLDivElement>(null);
//   const [leftAlign, setLeftAlign] = useState(false);
//   const [rightAlign, setRightAlign] = useState(false);
//   const [centerAlign, setCenterAlign] = useState(false);

//   const handleFormat = (format: string) => {
//     document.execCommand(format, false);
//     if (editorRef.current) {
//       setIsBold(document.queryCommandState("bold"));
//       setIsItalic(document.queryCommandState("italic"));
//       setIsUnderline(document.queryCommandState("underline"));
//     }
//   };

//   const handleInsert = (type: string) => {
//     // Placeholder for insert functionality
//     console.log(`Insert ${type}`);
//     setIsOpen(false);
//   };

//   const handleTxtAlign = (align: string) => {
//     const selection = window.getSelection();
//     if (!selection || selection.rangeCount === 0 || !align) return;

//     const range = selection.getRangeAt(0);
//     const parent = range.startContainer.parentElement;

//     if (!parent) return;
//     // Reset previous alignments
//     parent.style.textAlign = "";
//     parent.style.display = "";
//     if (align.includes("center")) {
//       setLeftAlign(false);
//       setRightAlign(false);
//       setCenterAlign(true);
//       parent.style.textAlign = "center";
//       parent.style.display = "block";
//     } else if (align.includes("right")) {
//       setLeftAlign(false);
//       setRightAlign(true);
//       setCenterAlign(false);
//       parent.style.textAlign = "right";
//       parent.style.display = "block";
//     } else if (align.includes("left")) {
//       setLeftAlign(true);
//       setRightAlign(false);
//       setCenterAlign(false);
//       parent.style.textAlign = "left";
//       parent.style.display = "block";
//     }
//   };

//   const handleHeadings = (headingType: string) => {
//     const selection = window.getSelection();
//     if (!selection || selection.rangeCount === 0 || !headingType) return;

//     const range = selection.getRangeAt(0);
//     const parent = range.startContainer.parentElement;
//     if (!parent) return;

//     const allHeadings = ["h1", "h2", "h3", "h4", "h5", "h6"];

//     // ✅ Case 1: Agar already heading hai
//     if (allHeadings.includes(parent.tagName.toLowerCase())) {
//       // Agar same heading type select kiya → remove heading (convert to <p>)
//       if (parent.tagName.toLowerCase() === headingType.toLowerCase()) {
//         const p = document.createElement("p");
//         p.innerHTML = parent.innerHTML;
//         parent.replaceWith(p);
//         return;
//       }

//       // Agar different heading type select kiya → replace heading
//       const newHeading = document.createElement(headingType);
//       newHeading.innerHTML = parent.innerHTML;
//       parent.replaceWith(newHeading);
//       return;
//     }

//     // ✅ Case 2: Agar parent heading nahi hai
//     const newHeading = document.createElement(headingType);
//     const selectedText = range.extractContents();

//     // Agar sirf text select hai → usko heading me wrap kar do
//     newHeading.appendChild(selectedText);

//     // Range ko replace karo new heading se
//     range.deleteContents();
//     range.insertNode(newHeading);

//     // Cursor ko heading ke baad le jao
//     selection.removeAllRanges();
//     const newRange = document.createRange();
//     newRange.setStartAfter(newHeading);
//     newRange.collapse(true);
//     selection.addRange(newRange);
//   };

//   const handleFontSize = (fontSize: string) => {
//     const selecton = window.getSelection();
//     if (!selecton || selecton.rangeCount === 0 || !fontSize) return;
//     const range = selecton?.getRangeAt(0);
//     const parent = range?.startContainer.parentElement;
//     if (!parent) return;
//     const txtSize = fontSize + "px";
//     parent.style.fontSize = txtSize;
//   };
//   const [listCount, setListCount] = useState<number>(0);
//   console.log(listCount);

//   //  const editorRef = useRef<HTMLDivElement>(null);
//   const [liActive, setLiActive] = useState<string>("");
//   useEffect(() => {
//     const listBuildingHandler = () => {
//       const selection = window.getSelection();
//       if (!selection || selection.rangeCount === 0) return;
//       if (listCount === 0) {
//         setLiActive("not-selected");
//       } else if (listCount < 6) {
//         setLiActive("ul-selected");
//       } else {
//         setLiActive("ol-active");
//       }
//       const range = selection.getRangeAt(0);
//       const container = range.commonAncestorContainer;

//       // Check if we're already inside a list
//       const listParent = findListParent(container);

//       if (listCount === 0 && listParent) {
//         // Convert list to paragraphs
//         convertListToParagraphs(listParent);
//         return;
//       }

//       if (listCount > 0) {
//         // Create a new list or convert existing content
//         if (listParent) {
//           // Change the existing list type
//           changeListType(listParent, listCount);
//         } else {
//           // Create a new list from selection
//           createNewList(range, listCount);
//         }
//       }
//     };

//     listBuildingHandler();
//   }, [listCount]);

//   // Helper function to find if we're inside a list
//   const findListParent = (node: Node): HTMLElement | null => {
//     let parent = node.parentElement;
//     while (parent) {
//       if (parent.tagName === "UL" || parent.tagName === "OL") {
//         return parent;
//       }
//       parent = parent.parentElement;
//     }
//     return null;
//   };

//   // Convert list items to paragraphs
//   const convertListToParagraphs = (list: HTMLElement) => {
//     const items = Array.from(list.querySelectorAll("li"));
//     const paragraphs = items.map((item) => {
//       const p = document.createElement("p");
//       p.innerHTML = item.innerHTML;
//       return p;
//     });

//     list.replaceWith(...paragraphs);
//   };

//   // Change type of existing list
//   const changeListType = (list: HTMLElement, count: number) => {
//     const items = Array.from(list.querySelectorAll("li"));
//     const newList = createListElement(count);

//     items.forEach((item) => {
//       const newItem = document.createElement("li");
//       newItem.innerHTML = item.innerHTML;
//       newList.appendChild(newItem);
//     });

//     list.replaceWith(newList);
//   };

//   // Create a new list element based on count
//   const createListElement = (count: number): HTMLElement => {
//     let listElement: HTMLElement;
//     let listStyle: string | null = null;
//     let olType: string | null = null;

//     switch (count) {
//       case 1:
//         listElement = document.createElement("ul");
//         listStyle = "disc";
//         break;
//       case 2:
//         listElement = document.createElement("ul");
//         listStyle = "circle";
//         break;
//       case 3:
//         listElement = document.createElement("ul");
//         listStyle = "square";
//         break;
//       case 4:
//         listElement = document.createElement("ol");
//         olType = "upper-roman";
//         break;
//       case 5:
//         listElement = document.createElement("ol");
//         olType = "lower-roman";
//         break;
//       case 6:
//         listElement = document.createElement("ol");
//         olType = "lower-alpha";
//         break;
//       case 7:
//         listElement = document.createElement("ol");
//         olType = "decimal";
//         break;
//       default:
//         listElement = document.createElement("ul");
//     }

//     if (listStyle) listElement.style.listStyleType = listStyle;
//     if (olType !== null) listElement.style.listStyleType = olType;

//     return listElement;
//   };

//   // Create a new list from selection
//   const createNewList = (range: Range, count: number) => {
//     if (range.collapsed) {
//       // Empty selection - create a single list item
//       const newList = createListElement(count);
//       const listItem = document.createElement("li");
//       listItem.innerHTML = "<br>"; // Empty item
//       newList.appendChild(listItem);

//       range.deleteContents();
//       range.insertNode(newList);

//       // Move cursor inside the list item
//       const newRange = document.createRange();
//       newRange.setStart(listItem, 0);
//       newRange.collapse(true);

//       const selection = window.getSelection();
//       if (selection) {
//         selection.removeAllRanges();
//         selection.addRange(newRange);
//       }
//     } else {
//       // Handle text selection
//       const fragment = range.cloneContents();
//       const div = document.createElement("div");
//       div.appendChild(fragment);

//       // Split content by lines
//       const textContent = div.textContent || "";
//       const lines = textContent
//         .split(/\n/)
//         .filter((line) => line.trim() !== "");

//       if (lines.length > 0) {
//         const newList = createListElement(count);

//         lines.forEach((line) => {
//           const listItem = document.createElement("li");
//           listItem.textContent = line;
//           newList.appendChild(listItem);
//         });

//         range.deleteContents();
//         range.insertNode(newList);
//       }
//     }
//   };
//   // Helper function to get list type name
//   function getListTypeName(count: number): string {
//     switch (count) {
//       case 0:
//         return "Paragraph";
//       case 1:
//         return "Unordered List (Disc)";
//       case 2:
//         return "Unordered List (Circle)";
//       case 3:
//         return "Unordered List (Square)";
//       case 4:
//         return "Ordered List (Upper Roman)";
//       case 5:
//         return "Ordered List (Lower Roman)";
//       case 6:
//         return "Ordered List (Lower Alpha)";
//       case 7:
//         return "Ordered List (Numeric)";
//       default:
//         return "Unknown";
//     }
//   }

//   return (
//     <div className="w-full max-w-4xl mx-auto font-sans">
//       {/* Editor Container */}
//       <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl">
//         {/* Formatting Toolbar */}
//         <div className="flex flex-wrap items-center gap-1 p-3 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
//           {/* Text Style */}
//           <div className="flex items-center gap-1 mr-2">
//             <select
//               onChange={(e) => handleHeadings(e.target.value)}
//               className="text-xs py-1.5 px-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="normal">Normal</option>
//               {[
//                 { value: "h1", tag: 1 }, // h1
//                 { value: "h2", tag: 2 }, // h2
//                 { value: "h3", tag: 3 }, // h3
//                 { value: "h4", tag: 4 }, // h4
//                 { value: "h5", tag: 5 }, // h5
//                 { value: "h6", tag: 6 }, // h6
//               ].map((vl) => (
//                 <option className="font-bold" key={vl.tag} value={vl.value}>
//                   Heading {vl.tag}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Font Options */}
//           <div className="flex items-center gap-1 mr-2">
//             <select className="text-xs py-1.5 px-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
//               <option value="arial">Arial</option>
//               <option value="times">Times New Roman</option>
//               <option value="courier">Courier New</option>
//               <option value="georgia">Georgia</option>
//             </select>

//             <div className="flex items-center gap-1">
//               <select
//                 className="text-xs py-1.5 px-2 w-[80px] rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 onChange={(e) => {
//                   //   const size = Number(e.target.value);
//                   handleFontSize(e.target.value);
//                 }}
//               >
//                 {[12, 14, 16, 18, 20, 24, 28, 32, 36, 48].map((size) => (
//                   <option key={size} value={size}>
//                     {size}px
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Basic Formatting */}
//           <div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
//             <button
//               onClick={() => handleFormat("bold")}
//               className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${
//                 isBold ? "bg-gray-200 text-blue-600" : ""
//               }`}
//               title="Bold"
//             >
//               <FaBold className="text-sm" />
//             </button>
//             <button
//               onClick={() => handleFormat("italic")}
//               className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${
//                 isItalic ? "bg-gray-200 text-blue-600" : ""
//               }`}
//               title="Italic"
//             >
//               <FaItalic className="text-sm" />
//             </button>
//             <button
//               onClick={() => handleFormat("underline")}
//               className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${
//                 isUnderline ? "bg-gray-200 text-blue-600" : ""
//               }`}
//               title="Underline"
//             >
//               <FaUnderline className="text-sm" />
//             </button>
//           </div>

//           {/* Alignment */}
//           <div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
//             <button
//               className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${
//                 leftAlign === true && "text-blue-600 bg-gray-200"
//               }`}
//               title="Align Left"
//               onClick={() => handleTxtAlign("left")}
//             >
//               <FaAlignLeft className="text-sm" />
//             </button>
//             <button
//               className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${
//                 centerAlign === true && "text-blue-600 bg-gray-200"
//               }`}
//               title="Align Center"
//               onClick={() => handleTxtAlign("center")}
//             >
//               <FaAlignCenter className="text-sm" />
//             </button>
//             <button
//               className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${
//                 rightAlign === true && "text-blue-600 bg-gray-200"
//               }`}
//               title="Align Right"
//               onClick={() => handleTxtAlign("right")}
//             >
//               <FaAlignRight className="text-sm" />
//             </button>
//           </div>

//           {/* Lists */}
//           <div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
//             <button
//               className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${
//                 liActive === "ul-selected" && "text-blue-600"
//               }`}
//               title="List"
//               onClick={() => {
//                 setListCount((pr) => (pr === 6 || pr === 7 ? 0 : pr + 1));
//               }}
//             >
//               <FaListUl className="text-sm" />
//             </button>
//             <button
//               onClick={() => setListCount((pr) => (pr === 7 ? 0 : 7))}
//               className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${
//                 liActive === "ol-active" && "text-blue-600"
//               }`}
//               title="Numbered List"
//             >
//               <FaListOl className="text-sm" />
//             </button>
//             <button
//               className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
//               title="Indent"
//             >
//               <FaIndent className="text-sm" />
//             </button>
//             <button
//               className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
//               title="Outdent"
//             >
//               <FaOutdent className="text-sm" />
//             </button>
//           </div>

//           {/* Additional Options */}
//           <div className="flex items-center gap-1">
//             <button
//               className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
//               title="Insert Link"
//             >
//               <FaLink className="text-sm" />
//             </button>
//             <button
//               className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
//               title="Insert Table"
//             >
//               <FaTable className="text-sm" />
//             </button>
//             <button
//               className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
//               title="Insert Emoji"
//             >
//               <FaSmile className="text-sm" />
//             </button>
//             <button
//               className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
//               title="Code Block"
//             >
//               <FaCode className="text-sm" />
//             </button>
//           </div>

//           {/* Undo/Redo */}
//           <div className="flex items-center gap-1 ml-auto border-l border-gray-300 pl-2">
//             <button
//               className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
//               title="Undo"
//             >
//               <FaUndo className="text-sm" />
//             </button>
//             <button
//               className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
//               title="Redo"
//             >
//               <FaRedo className="text-sm" />
//             </button>
//           </div>
//         </div>

//         {/* Editable Text Area */}
//         <div
//           ref={editorRef}
//           contentEditable={true}
//           suppressContentEditableWarning={true}
//           className="w-full p-5 min-h-[250px] text-gray-700 focus:outline-none resize-none prose prose-lg max-w-none border-none focus:ring-0 prose-p:my-2 prose-headings:my-3 prose-headings:font-bold prose-blockquote:border-l-blue-400 prose-blockquote:bg-blue-50 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-ol:pl-6 prose-ul:pl-6 prose-li:my-1 prose-hr:my-4 prose-hr:border-gray-300"
//           style={{ lineHeight: "1.6" }}
//         >
//           Start typing here...
//         </div>

//         {/* Bottom Toolbar with Plus Icon */}
//         <div className="flex items-center justify-between p-3 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
//           <div className="text-xs text-gray-500">Word count: 0</div>

//           <div className="w-9 h-9 cursor-pointer text-blue-500 hover:text-blue-600 transition-all duration-200 hover:scale-110 bg-white rounded-full shadow-sm flex items-center justify-center">
//             <FaPlusSquare
//               className="h-5 w-5"
//               onClick={() => setIsOpen(!isOpen)}
//             />
//           </div>
//         </div>

//         {/* Modal / Dropdown */}
//         {isOpen && (
//           <div className="absolute right-10 bottom-2 bg-white border border-gray-200 shadow-2xl rounded-2xl w-72 p-4 z-[999] animate-in fade-in zoom-in-95 duration-200">
//             <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">
//               Insert Media
//             </h3>
//             <div className="grid grid-cols-2 gap-3">
//               {/* Video Option */}
//               <div
//                 className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5 group"
//                 onClick={() => handleInsert("video")}
//               >
//                 <div className="p-3 bg-red-100 rounded-full mb-2 group-hover:bg-red-200 transition-colors">
//                   <FaVideo className="text-red-600 text-xl" />
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">Video</span>
//                 <span className="text-xs text-gray-500 mt-1">
//                   MP4, MOV, AVI
//                 </span>
//               </div>

//               {/* Audio Option */}
//               <div
//                 className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5 group"
//                 onClick={() => handleInsert("audio")}
//               >
//                 <div className="p-3 bg-green-100 rounded-full mb-2 group-hover:bg-green-200 transition-colors">
//                   <FaMusic className="text-green-600 text-xl" />
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">Audio</span>
//                 <span className="text-xs text-gray-500 mt-1">
//                   MP3, WAV, OGG
//                 </span>
//               </div>

//               {/* Image Option */}
//               <div
//                 className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5 group"
//                 onClick={() => handleInsert("image")}
//               >
//                 <div className="p-3 bg-blue-100 rounded-full mb-2 group-hover:bg-blue-200 transition-colors">
//                   <FaImage className="text-blue-600 text-xl" />
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">Image</span>
//                 <span className="text-xs text-gray-500 mt-1">
//                   JPG, PNG, GIF
//                 </span>
//               </div>

//               {/* File Option */}
//               <div
//                 className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5 group"
//                 onClick={() => handleInsert("file")}
//               >
//                 <div className="p-3 bg-amber-100 rounded-full mb-2 group-hover:bg-amber-200 transition-colors">
//                   <FaFileAlt className="text-amber-600 text-xl" />
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">File</span>
//                 <span className="text-xs text-gray-500 mt-1">
//                   PDF, DOC, ZIP
//                 </span>
//               </div>
//             </div>

//             {/* Close button */}
//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1 rounded-full hover:bg-gray-100 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Help Text */}
//       <p className="text-xs text-gray-500 mt-3 text-center">
//         Use the toolbar to format your content or click the + icon to insert
//         media
//       </p>
//     </div>
//   );
// }

// export default RMWTxtEditor;
