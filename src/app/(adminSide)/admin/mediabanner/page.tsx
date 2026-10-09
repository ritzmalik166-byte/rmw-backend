"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash } from "react-icons/fi";
import { Home, Monitor } from "lucide-react";
import Link from "next/link";

interface MediaBanner {
  id: string;
  title: string;
  image: string;
  status: string;
}

const MediaBannerPage = () => {
  const [banners, setBanners] = useState<MediaBanner[]>([]);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchBanners = async () => {
    try {
      const res = await axios.get(`/api/media-banners`, {
        params: { limit: entriesPerPage, page: currentPage, search },
      });
      setBanners(res.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, [entriesPerPage, currentPage, search]);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/api/media-banners/${deleteId}`);
      setShowModal(false);
      fetchBanners();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div className="bg-[#EEEEEE] min-h-screen p-4 md:p-8 space-y-4">

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full text-center">
            <div className="text-red-600 text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold">Are you sure?</h2>
            <p className="text-sm text-gray-600 mt-2">
              This action cannot be undone. The banner will be permanently deleted.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header & Breadcrumb */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-[#ACACAC] flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-light uppercase">
          <Monitor className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
          Manage Media Banner
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-4 bg-white p-3 rounded-md shadow-sm">
        <h1 className="text-[#2955B3] flex items-center gap-2"><Home className="w-4 h-4" /> Home</h1>
        <span className="text-[#ACACAC] font-bold">/</span>
        <h1 className="text-[#838383] flex items-center gap-2"><Monitor className="w-4 h-4" /> Manage Media Banner</h1>
      </div>

      <div className="bg-[#9CA9B4] p-4">
        <p className="text-white font-medium text-base sm:text-lg">Manage Page</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-6 p-4">
        <div className="flex justify-end">
          <Link
            title="Add Content"
            href={"/admin/content/add"}
            className="px-6 py-2 rounded-md font-semibold text-white bg-[#688A7E] hover:bg-[#365248] transition duration-200"
          >
            Add Content
          </Link>
        </div>

        <div className="flex flex-col items-end md:flex-row justify-between gap-4 flex-wrap">
          {/* Show Entries */}
          <div className="flex items-center gap-2">
            <p className="font-semibold text-[#688A7E] whitespace-nowrap">Show Entries</p>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-[#365248] rounded-md px-3 py-1.5 text-[#365248] outline-none cursor-pointer"
            >
              {[10, 25, 50, 100].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 border border-[#1a6249] rounded-md px-3 py-2 w-full md:w-auto">
            <p className="text-[#717272] font-medium whitespace-nowrap">Search Now</p>
            <input
              type="text"
              placeholder="Search here..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent outline-none placeholder:text-[#365248] text-[#365248] w-full"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="hidden md:flex bg-[#CCCCCC] px-4 py-3 text-sm font-bold text-[#688A7E] uppercase">
          <p className="w-1/4">Image</p>
          <p className="w-1/4">Title</p>
          <p className="w-1/6 text-center">Action</p>
        </div>
        <div className="divide-y">
          {banners.length > 0 ? (
            banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-3 ${
                  index % 2 === 0 ? "bg-[#F5F5F5]" : "bg-white"
                }`}
              >
                <div className="w-1/4">
                  <img
                    src={banner.image}
                    alt="Banner"
                    className="w-20 h-16 object-contain rounded-md"
                  />
                </div>
                <p className="w-1/4 text-[#688A7E] truncate">{banner.title}</p>
                <div className="w-full md:w-1/6 flex gap-2 mt-2 md:mt-0">
                  <Link
                    title="Edit Content"
                    href={`/admin/content/edit/${banner.id}`}
                    className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                  >
                    <FiEdit />
                  </Link>
                  <button
                    onClick={() => {
                      setDeleteId(banner.id);
                      setShowModal(true);
                    }}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center">No data found</div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-t pt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-5 py-2 border rounded-md text-[#688A7E] hover:bg-[#436b5d] hover:text-white"
        >
          Previous
        </button>

        <div className="flex gap-1 flex-wrap">
          {Array.from({ length: 5 }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1.5 border rounded-md ${
                currentPage === i + 1
                  ? "bg-[#688A7E] text-white"
                  : "border-[#688A7E] hover:bg-[#688A7E] hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-5 py-2 border rounded-md text-[#688A7E] hover:bg-[#436b5d] hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MediaBannerPage;
