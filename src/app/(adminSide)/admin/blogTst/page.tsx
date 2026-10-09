// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import { MdOutlineEditRoad, MdAdd, MdOutlineTitle } from "react-icons/md";
// import RMWTxtEditor from "./RMWTxtEditor/RMWTxtEditor";

// function Page() {
//   const [rowNumber, setRowNum] = useState(1);
//   const [isTitleEditing, setIsTitleEditing] = useState(false);
//   const titleRef = useRef<HTMLDivElement>(null);

//   const handleRowCount = () => {
//     setRowNum((pr) => pr + 1);
//   };

//   useEffect(() => {
//     interface KeyPressEvent extends KeyboardEvent {
//       key: string;
//     }

//     const handleKeyPress = (e: KeyPressEvent): void => {
//       if (e.key === "Enter" && !isTitleEditing) {
//         setRowNum((pr: number) => pr + 1);
//       }
//     };

//     // window.addEventListener("keypress", handleKeyPress);

//     // Cleanup: remove event listener when component unmounts
//     return () => {
//       window.removeEventListener("keypress", handleKeyPress);
//     };
//   }, [isTitleEditing]);

//   const handleTitleBlur = () => {
//     setIsTitleEditing(false);
//     if (titleRef.current && !titleRef.current.innerText.trim()) {
//       titleRef.current.innerText = "Enter The Title Here";
//     }
//   };

//   const focusTitle = () => {
//     setIsTitleEditing(true);
//     setTimeout(() => {
//       if (titleRef.current) {
//         const range = document.createRange();
//         const sel = window.getSelection();
//         range.selectNodeContents(titleRef.current);
//         range.collapse(false); // Move cursor to end
//         if (sel) {
//           sel.removeAllRanges();
//           sel.addRange(range);
//         }
//         titleRef.current.focus();
//       }
//     }, 10);
//   };

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 flex flex-col lg:flex-row items-center lg:items-start">
//       {/* Left Section  */}
//       <div className="w-full max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             Advanced Text Editor
//           </h1>
//           <p className="text-gray-600">
//             Create and organize your content with our powerful editor
//           </p>
//         </div>

//         {/* Title Section */}
//         <div className="w-full overflow-x-hidden relative bg-white rounded-xl shadow-md p-6 mb-6 group">
//           <div className="flex items-center gap-2 text-gray-500 mb-2">
//             <MdOutlineTitle className="text-xl" />
//             <span className="text-sm font-medium">Document Title</span>
//           </div>

//           <div
//             ref={titleRef}
//             contentEditable={true}
//             className="w-full p-3 min-h-[60px] text-2xl font-bold text-gray-800 rounded-lg border-2 border-dashed border-transparent hover:border-blue-200 focus:outline-none focus:border-blue-500 focus:bg-blue-50 transition-all cursor-text"
//             onFocus={() => setIsTitleEditing(true)}
//             onBlur={handleTitleBlur}
//             suppressContentEditableWarning={true}
//           >
//             Enter The Title Here
//           </div>

//           <div
//             className="absolute right-4 top-4 w-9 h-9 cursor-pointer bg-blue-100 text-blue-600 rounded-full flex items-center justify-center transition-all hover:bg-blue-200 hover:scale-110"
//             onClick={focusTitle}
//           >
//             <MdOutlineEditRoad className="h-5 w-5" />
//           </div>
//         </div>

//         {/* Editors Section */}
//         <div className="space-y-6">
//           {Array.from({ length: rowNumber }, (_, i) => (
//             <RMWTxtEditor key={i} />
//           ))}
//         </div>

//         {/* Add New Editor Button */}
//         <div className="mt-6 flex justify-center">
//           <button
//             onClick={handleRowCount}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-5 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
//           >
//             <MdAdd className="text-xl" />
//             Add New Editor Block
//           </button>
//         </div>

//         {/* Help Text */}
//         <div className="mt-8 text-center text-sm text-gray-500 p-4 bg-white rounded-lg shadow-sm">
//           <p>
//             Press Enter to quickly add a new editor block or click the button
//             above
//           </p>
//           <p className="mt-1">
//             Use the + icon in each editor to insert media content
//           </p>
//         </div>
//       </div>

//       {/* Right Section  */}
//       {/* Right Section  */}
//       <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-md p-6 mt-8 lg:mt-0 lg:ml-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">
//           SEO & Blog Settings
//         </h2>

//         {/* Blog Category */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600 mb-2">
//             Blog Category
//           </label>
//           <select className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
//             <option value="">Select Blog Category</option>
//             <option value="tech">Technology</option>
//             <option value="lifestyle">Lifestyle</option>
//             <option value="business">Business</option>
//             <option value="education">Education</option>
//           </select>
//         </div>

//         {/* Meta Title */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600 mb-2">
//             Meta Title
//           </label>
//           <input
//             type="text"
//             placeholder="Add Meta Title"
//             className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//           />
//         </div>

//         {/* Meta Keywords */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600 mb-2">
//             Meta Keywords
//           </label>
//           <input
//             type="text"
//             placeholder="Add Meta Keywords"
//             className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//           />
//         </div>

//         {/* Meta Description */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600 mb-2">
//             Meta Description
//           </label>
//           <textarea
//             placeholder="Create Meta Description"
//             rows={4}
//             className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
//           />
//         </div>

//         {/* Save Button */}
//         <button className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition">
//           Save Settings
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Page;