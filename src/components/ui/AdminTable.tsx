// "use client";
// import React, { useMemo, useState } from "react";

// interface Column<T> {
//   key: keyof T | string;
//   label: string;
//   render?: (row: T) => React.ReactNode;
//   searchable?: boolean;
// }

// interface TableProps<T> {
//   columns: Column<T>[];
//   data: T[];
//   actionButtons?: (row: T) => React.ReactNode;
//   emptyMessage?: string;
//   entriesPerPageOptions?: number[];
//   defaultEntriesPerPage?: number;
//   searchableFields?: (keyof T)[];
//   leftHeaderButtons?: React.ReactNode; // ✅ NEW PROP
// }

// const AdminTable = <T,>({
//   columns,
//   data,
//   actionButtons,
//   emptyMessage = "No entries found.",
//   entriesPerPageOptions = [5, 10, 20, 50],
//   defaultEntriesPerPage = 10,
//   searchableFields = [],
//   leftHeaderButtons, // ✅ Accept optional buttons
// }: TableProps<T>) => {
//   const [entriesPerPage, setEntriesPerPage] = useState(defaultEntriesPerPage);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredData = useMemo(() => {
//     if (!searchQuery.trim()) return data;
//     return data.filter((item) =>
//       searchableFields.some((field) =>
//         String(item[field]).toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   }, [data, searchQuery, searchableFields]);

//   const totalPages = Math.ceil(filteredData.length / entriesPerPage);
//   const currentData = useMemo(() => {
//     const start = (currentPage - 1) * entriesPerPage;
//     return filteredData.slice(start, start + entriesPerPage);
//   }, [filteredData, currentPage, entriesPerPage]);

//   return (
//     <div className="w-full">
//       {/* Top Controls */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
//         <div className="flex items-center gap-2 flex-wrap">
//           {/* Entries Dropdown */}
//           <div>
//             <label className="text-sm mr-2">Show</label>
//             <select
//               className="border rounded px-2 py-1"
//               value={entriesPerPage}
//               onChange={(e) => {
//                 setEntriesPerPage(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//             >
//               {entriesPerPageOptions.map((num) => (
//                 <option key={num} value={num}>
//                   {num}
//                 </option>
//               ))}
//             </select>
//             <span className="ml-2 text-sm">entries</span>
//           </div>
//         </div>
//         {/* Optional Buttons on Left */}
//         {leftHeaderButtons && <div className="flex ">{leftHeaderButtons}</div>}

//         {/* Search Bar */}
//         {searchableFields.length > 0 && (
//           <input
//             type="text"
//             placeholder="Search..."
//             className="border rounded px-3 py-1 w-full md:w-64"
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//         )}
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border rounded bg-white shadow-sm">
//           <thead className="bg-gray-100 text-left">
//             <tr>
//               {columns.map((col) => (
//                 <th key={String(col.key)} className="p-3 border-b">
//                   {col.label}
//                 </th>
//               ))}
//               {actionButtons && <th className="p-3 border-b">Actions</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.length > 0 ? (
//               currentData.map((row, rowIndex) => (
//                 <tr key={rowIndex} className="hover:bg-gray-50">
//                   {columns.map((col) => (
//                     <td key={String(col.key)} className="p-3 border-b">
//                       {col.render
//                         ? col.render(row)
//                         : String((row as any)[col.key])}
//                     </td>
//                   ))}
//                   {actionButtons && (
//                     <td className="p-3 border-b">{actionButtons(row)}</td>
//                   )}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan={columns.length + (actionButtons ? 1 : 0)}
//                   className="p-3 text-center text-gray-500"
//                 >
//                   {emptyMessage}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-end mt-4 space-x-2">
//         <button
//           className="px-3 py-1 border rounded disabled:opacity-50"
//           onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//           disabled={currentPage === 1}
//         >
//           Prev
//         </button>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             className={`px-3 py-1 border rounded ${
//               currentPage === i + 1 ? "bg-blue-500 text-white" : ""
//             }`}
//             onClick={() => setCurrentPage(i + 1)}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button
//           className="px-3 py-1 border rounded disabled:opacity-50"
//           onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminTable;

"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
  searchable?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  actionButtons?: (row: T) => React.ReactNode;
  emptyMessage?: string;
  entriesPerPageOptions?: number[];
  defaultEntriesPerPage?: number;
  searchableFields?: (keyof T)[];
  leftHeaderButtons?: React.ReactNode;
}

const AdminTable = <T,>({
  columns,
  data,
  actionButtons,
  emptyMessage = "No entries found.",
  entriesPerPageOptions = [5, 10, 20, 50],
  defaultEntriesPerPage = 10,
  searchableFields = [],
  leftHeaderButtons,
}: TableProps<T>) => {
  const [entriesPerPage, setEntriesPerPage] = useState(defaultEntriesPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    return data.filter((item) =>
      searchableFields.some((field) =>
        String(item[field] ?? "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery, searchableFields]);

  // Reset page if filtered data is smaller than current page's range
  useEffect(() => {
    const maxPage = Math.ceil(filteredData.length / entriesPerPage);
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [filteredData.length, entriesPerPage, currentPage]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return filteredData.slice(start, start + entriesPerPage);
  }, [filteredData, currentPage, entriesPerPage]);

  return (
    <div className="w-full">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 sm:mb-6">
        {/* Left Section: Entries Dropdown and Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          {/* Entries Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-sm sm:text-base font-medium text-gray-700 whitespace-nowrap">Show</label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base font-medium text-gray-700 bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {entriesPerPageOptions.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <span className="text-sm sm:text-base font-medium text-gray-700 whitespace-nowrap">entries</span>
          </div>
          
          {/* Left Buttons */}
          {leftHeaderButtons && <div className="flex items-center">{leftHeaderButtons}</div>}
        </div>

        {/* Search Bar */}
        {searchableFields.length > 0 && (
          <div className="relative w-full sm:w-auto sm:min-w-[280px] md:min-w-[320px] lg:min-w-[360px]">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
              </div>
              <input
                type="text"
                placeholder="Search by name, email, category..."
                className="w-full pl-11 pr-10 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg text-xs sm:text-sm text-blue-700 font-semibold shadow-md z-10 transition-opacity duration-200">
                <span className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5" />
                  {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} found
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="">
        <table className="min-w-full border rounded bg-white shadow-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className="p-3 border-b">
                  {col.label}
                </th>
              ))}
              {actionButtons && <th className="p-3 border-b">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="p-3 border-b">
                      {col.render
                        ? col.render(row)
                        : String(row[col.key] ?? "-")}
                    </td>
                  ))}
                  {actionButtons && (
                    <td className="p-3 border-b">{actionButtons(row)}</td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actionButtons ? 1 : 0)}
                  className="p-3 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminTable;
