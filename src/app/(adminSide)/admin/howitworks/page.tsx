"use client";
import React, { useEffect, useState } from "react";
// import Breadcrumb from "@/components/ui/Breadcrumb";
import axios from "axios";
import { FiEdit, FiTrash } from "react-icons/fi";
import { AlertTriangle, Home, Monitor } from "lucide-react";
import Link from "next/link";

interface Faq {
  id: number;
  title: string;
  description: string;
  status: string;
}

const Page = () => {
  const [entriesPerPage, setEntriesPerPage] = useState<number>();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<Faq[]>([]);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

  useEffect(() => {
    setEntriesPerPage(10);
    setSearchQuery("");
  }, []);
  // const [deleteKey, setDeleteKey] = useState("");

  // const handleDataDeleteModal = (key: string) => {
  //   setDeleteKey(" ");
  //   setDeleteConfirmModal(true);
  //   setDeleteKey(key);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/system-settings/manage-faq");
        setFaqs(response.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const filtered = faqs.filter((faq) =>
      faq.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFaqs(filtered);
  }, [searchQuery, faqs]);

  const totalPages = Math.ceil(filteredFaqs.length / (entriesPerPage ?? 10));
  const currentData = filteredFaqs.slice(
    (currentPage - 1) * (entriesPerPage ?? 10),
    currentPage * (entriesPerPage ?? 10)
  );

  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(`/api/system-settings/manage-faq/${id}`);
      if (res.status === 200) {
        setFaqs((prev) => prev.filter((faq) => faq.id !== id));
      }
    } catch (err) {
      console.error("Error deleting FAQ:", err);
    }
  };

  return (
    <div className="bg-[#EEEEEE] flex flex-col gap-6 sm:gap-8 md:gap-8 p-4 md:p-8 min-h-screen">
      {deleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 w-full max-w-md shadow-lg text-center relative">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <AlertTriangle className="text-red-600 w-12 h-12" />
            </div>

            {/* Text */}
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Are you sure?
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              This action cannot be undone. The data will be permanently
              deleted.
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-md transition"
                onClick={() => setDeleteConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                // onClick={deleteData}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-[#ACACAC] flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-light uppercase">
          <Monitor className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
          Manage FAQ
        </h1>
      </div>

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 bg-white p-3 rounded-md shadow-sm">
        <h1 className="text-[#2955B3] flex items-center gap-2">
          <Home className="w-4 h-4" />
          Home
        </h1>
        <span className="text-[#ACACAC] font-bold">/</span>
        <h1 className="text-[#838383] flex items-center gap-2">
          <Monitor className="w-4 h-4" />
          Manage FAQ
        </h1>
      </div>

      {/* Top Controls */}
      {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">Show</label>
          <select
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className="ml-1 text-sm text-gray-600">entries</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search title..."
            className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Link
            title="Add FAQ"
            href="/admin/howitworks/add"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition"
          >
            Add FAQ
          </Link>
        </div>
      </div> */}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        {/* Header */}
        <div className="bg-[#9CA9B4] p-4">
          <p className="text-white font-medium text-base sm:text-lg">
            Manage Page
          </p>
        </div>

        {/* Sorting Section */}
        <div className="flex flex-col gap-6 p-4">
          <div className="flex justify-end">
            <Link
              title="Add Content"
              href={"/admin/content/add"}
              className="px-6 py-2 rounded-md font-semibold text-white bg-[#688A7E] hover:bg-[#365248] cursor-pointer transition duration-200"
            >
              Add Content
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 flex-wrap">
            {/* Show Entries */}
            <div className="flex items-center gap-2">
              <p className="font-semibold text-[#688A7E] whitespace-nowrap">
                Show Entries
              </p>
              <select
                // onChange={(E) => getEntriesManually(E)}
                className="border border-[#365248] rounded-md px-3 py-1.5 text-[#365248] outline-none cursor-pointer"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 border border-[#1a6249] rounded-md px-3 py-2 w-full md:w-auto">
              <p className="text-[#717272] font-medium whitespace-nowrap">
                Search Now
              </p>
              <input
                type="text"
                placeholder="Search here..."
                // onChange={(e) => getDataWithSearch(e)}
                className="bg-transparent outline-none placeholder:text-[#365248] text-[#365248] w-full"
              />
            </div>
          </div>
        </div>

        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No entries found.
                </td>
              </tr>
            ) : (
              currentData.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4">{entry.title}</td>
                  <td className="p-4 line-clamp-2 max-w-md">
                    {entry.description}
                  </td>
                  <td className="p-4 capitalize">{entry.status}</td>
                  <td className="p-4 space-x-2">
                    <a
                      href={`/admin/howitworks/edit/${entry.id}`}
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="Edit"
                    >
                      <FiEdit size={18} />
                    </a>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete"
                    >
                      <FiTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center md:justify-end gap-2 mt-6">
        <button
          className="px-3 py-1 border rounded text-sm hover:bg-gray-100 disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded text-sm ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 border rounded text-sm hover:bg-gray-100 disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-8">
        Designed and Developed by <strong>Ritz Media World</strong>
      </footer>
    </div>
  );
};

export default Page;
