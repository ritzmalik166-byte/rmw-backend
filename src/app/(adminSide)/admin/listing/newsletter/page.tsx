"use client";
import React, { useEffect, useState } from "react";
// import Breadcrumb from "@/components/ui/Breadcrumb";
import { AlertTriangle, Home, Monitor, Trash2 } from "lucide-react"; // or your icon library
import axios from "axios";

// interface Newsletter {
//   id: string;
//   email: string;
//   addDate: string;
// }

const NewslettersPage = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [filteredNewsletters, setFilteredNewsletters] = useState<Newsletter[]>(
    []
  );
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<string | null>(
    null
  );

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  type Newsletter = {
    id: string;
    email: string;
    addDate: string;
  };

  useEffect(() => {
    axios
      .get<Newsletter[]>("/api/system-settings/manage-newsletter")
      .then((res) => {
        const formatted = res.data.map((item) => ({
          ...item,
          addDate: formatDate(item.addDate),
        }));
        setNewsletters(formatted);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const filtered = newsletters.filter((n) =>
      n.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNewsletters(filtered);
    setCurrentPage(1);
  }, [searchQuery, entriesPerPage, newsletters]);

  const totalPages = Math.ceil(filteredNewsletters.length / entriesPerPage);
  const currentData = filteredNewsletters.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const confirmDelete = (id: string) => setDeleteConfirmModal(id);
  const handleDelete = async () => {
    if (!deleteConfirmModal) return;
    try {
      await axios.delete(
        `/api/system-settings/manage-newsletter/${deleteConfirmModal}`
      );
      setNewsletters((prev) => prev.filter((n) => n.id !== deleteConfirmModal));
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteConfirmModal(null);
    }
  };

  return (
    <div className="bg-[#EEEEEE] flex flex-col gap-6 sm:gap-8 md:gap-12 p-4 md:p-8 min-h-screen">
      {deleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 w-full max-w-md shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="text-red-600 w-12 h-12" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Are you sure?
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              This action cannot be undone. The entry will be permanently
              deleted.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-md transition"
                onClick={() => setDeleteConfirmModal(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Title + Breadcrumb */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-[#ACACAC] flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-light uppercase">
          <Monitor className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
          Manage Newsletter
        </h1>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 bg-white p-3 rounded-md shadow-sm">
        <h1 className="text-[#2955B3] flex items-center gap-2">
          <Home className="w-4 h-4" />
          Home
        </h1>
        <span className="text-[#ACACAC] font-bold">/</span>
        <h1 className="text-[#838383] flex items-center gap-2">
          <Monitor className="w-4 h-4" />
          Manage Newsletter
        </h1>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <div className="bg-[#9CA9B4] p-4">
          <p className="text-white font-medium text-base sm:text-lg">
            Newsletter Entries
          </p>
        </div>
        <div className="flex flex-col gap-6 p-4">
          <div className="flex justify-end">
            {/* Add export if needed */}
            {/* <button className="px-6 py-2 rounded-md font-semibold text-white bg-[#688A7E] hover:bg-[#365248] transition">
              Export To Excel
            </button> */}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-[#688A7E] whitespace-nowrap">
                Show Entries
              </p>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(+e.target.value)}
                className="border border-[#365248] rounded-md px-3 py-1.5 text-[#365248] outline-none cursor-pointer"
              >
                {[5, 10, 20, 50].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 border border-[#1a6249] rounded-md px-3 py-2 w-full md:w-auto">
              <p className="text-[#717272] font-medium whitespace-nowrap">
                Search Now
              </p>
              <input
                type="text"
                placeholder="Search email..."
                className="bg-transparent outline-none placeholder:text-[#365248] text-[#365248] w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="hidden md:flex bg-[#CCCCCC] px-4 py-3 font-bold text-[#688A7E] text-sm uppercase">
          <p className="w-[60%]">Email</p>
          <p className="w-[20%] text-center">Add Date</p>
          <p className="w-[20%] text-center">Action</p>
        </div>
        <div className="divide-y">
          {currentData.length ? (
            currentData.map((n) => (
              <div
                key={n.id}
                className="flex flex-col md:flex-row items-start md:items-center px-4 py-3 gap-2 md:gap-0 bg-white"
              >
                <p className="w-full md:w-[60%] text-sm text-[#688A7E]">
                  {n.email}
                </p>
                <p className="w-full md:w-[20%] text-sm text-[#688A7E] text-center">
                  {n.addDate}
                </p>
                <div className="w-full md:w-[20%] flex justify-start md:justify-center mt-2 md:mt-0">
                  <button
                    onClick={() => confirmDelete(n.id)}
                    className="text-red-600 hover:underline"
                  >
                    <Trash2 className="inline-block w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No entries found.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-4 border-t">
          <p className="text-sm text-gray-600">
            Showing {(currentPage - 1) * entriesPerPage + 1} to{" "}
            {Math.min(currentPage * entriesPerPage, filteredNewsletters.length)}{" "}
            of {filteredNewsletters.length} entries
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              className="px-5 py-2 border rounded-md text-[#688A7E] font-semibold hover:bg-[#436b5d] hover:text-white transition disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded-md transition ${
                    currentPage === i + 1
                      ? "bg-[#365248] text-white"
                      : "text-[#688A7E] hover:bg-[#436b5d] hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              className="px-5 py-2 border rounded-md text-[#688A7E] font-semibold hover:bg-[#436b5d] hover:text-white transition disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewslettersPage;
