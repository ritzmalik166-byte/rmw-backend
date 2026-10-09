"use client";
import React, { useEffect, useState } from "react";
import {
  FilePen,
  FilePenLine,
  Home,
  Leaf,
  Monitor,
  Trash2,
} from "lucide-react";
import Link from "next/link";

import { AlertTriangle } from "lucide-react";

function page() {
  // const router = useRouter
const contentData = [
  {
    menuName: "Adds Placement",
    menuURL: "adds-placement",
    menuCategory: "Print Advertising",
    status: true,
  },
  {
    menuName: "Billboard Campaign",
    menuURL: "billboard-campaign",
    menuCategory: "Outdoor Advertising",
    status: true,
  },
  {
    menuName: "Digital Marketing",
    menuURL: "digital-marketing",
    menuCategory: "Online Marketing",
    status: true,
  },
  {
    menuName: "Social Media Strategy",
    menuURL: "social-media-strategy",
    menuCategory: "Social Media",
    status: false,
  },
  {
    menuName: "TV Commercials",
    menuURL: "tv-commercials",
    menuCategory: "Broadcast",
    status: true,
  },
  {
    menuName: "Radio Spots",
    menuURL: "radio-spots",
    menuCategory: "Broadcast",
    status: false,
  },
  {
    menuName: "Event Branding",
    menuURL: "event-branding",
    menuCategory: "Events",
    status: true,
  },
  {
    menuName: "Influencer Campaign",
    menuURL: "influencer-campaign",
    menuCategory: "Social Media",
    status: true,
  },
  {
    menuName: "Corporate Brochures",
    menuURL: "corporate-brochures",
    menuCategory: "Print Advertising",
    status: false,
  },
  {
    menuName: "SEO Optimization",
    menuURL: "seo-optimization",
    menuCategory: "Online Marketing",
    status: true,
  },
  {
    menuName: "Website Development",
    menuURL: "website-development",
    menuCategory: "Digital Solutions",
    status: true,
  },
  {
    menuName: "App Promotion",
    menuURL: "app-promotion",
    menuCategory: "Online Marketing",
    status: true,
  },
  {
    menuName: "Press Releases",
    menuURL: "press-releases",
    menuCategory: "Public Relations",
    status: false,
  },
  {
    menuName: "Newsletters",
    menuURL: "newsletters",
    menuCategory: "Email Marketing",
    status: true,
  },
  {
    menuName: "SMS Campaigns",
    menuURL: "sms-campaigns",
    menuCategory: "Mobile Marketing",
    status: false,
  },
  {
    menuName: "Product Launch",
    menuURL: "product-launch",
    menuCategory: "Events",
    status: true,
  },
  {
    menuName: "YouTube Ads",
    menuURL: "youtube-ads",
    menuCategory: "Video Marketing",
    status: true,
  },
  {
    menuName: "Magazine Inserts",
    menuURL: "magazine-inserts",
    menuCategory: "Print Advertising",
    status: false,
  },
  {
    menuName: "Poster Design",
    menuURL: "poster-design",
    menuCategory: "Creative Design",
    status: true,
  },
  {
    menuName: "Banner Campaigns",
    menuURL: "banner-campaigns",
    menuCategory: "Online Marketing",
    status: true,
  },
  {
    menuName: "Google Ads",
    menuURL: "google-ads",
    menuCategory: "PPC",
    status: true,
  },
  {
    menuName: "Facebook Promotions",
    menuURL: "facebook-promotions",
    menuCategory: "Social Media",
    status: true,
  },
  {
    menuName: "LinkedIn Outreach",
    menuURL: "linkedin-outreach",
    menuCategory: "B2B Marketing",
    status: false,
  },
  {
    menuName: "Instagram Creatives",
    menuURL: "instagram-creatives",
    menuCategory: "Social Media",
    status: true,
  },
  {
    menuName: "Motion Graphics",
    menuURL: "motion-graphics",
    menuCategory: "Creative Design",
    status: true,
  },
  {
    menuName: "Flyer Distribution",
    menuURL: "flyer-distribution",
    menuCategory: "Print Advertising",
    status: false,
  },
  {
    menuName: "Content Writing",
    menuURL: "content-writing",
    menuCategory: "Copywriting",
    status: true,
  },
  {
    menuName: "Reels Creation",
    menuURL: "reels-creation",
    menuCategory: "Video Marketing",
    status: true,
  },
  {
    menuName: "WhatsApp Marketing",
    menuURL: "whatsapp-marketing",
    menuCategory: "Mobile Marketing",
    status: true,
  },
  {
    menuName: "Trade Show Ads",
    menuURL: "trade-show-ads",
    menuCategory: "Events",
    status: false,
  },
];

  const [lftBtn, setLftBtn] = useState(0);
  const [rightBtn, setRightBtn] = useState(9);
  const [page, setPage] = useState([]);

  const pagination = (s, e) => {
    if (s < contentData.length) {
      if (contentData.length < 9) {
        setPage(contentData.slice(s, contentData.length - 1));
        return;
      }
      setPage(contentData.slice(s, e));
    }
  };
  const [ttPage, setTTPage] = useState(0);
  const [btnArr, setBtnArr] = useState([]);

  useEffect(() => {
    pagination(lftBtn, rightBtn);
    setTTPage(contentData.length / 8 + 1);
  }, [lftBtn, rightBtn]);

  const leftPage = () => {
    let newLeft = lftBtn - 9;
    if (newLeft < 0) newLeft = 0;

    let newRight;
    if (contentData.length < 10) {
      newRight = contentData.length;
    } else {
      newRight = newLeft + 9;
    }

    setLftBtn(newLeft);
    setRightBtn(newRight);
    pagination(newLeft, newRight);
  };

  const rightPage = () => {
    // debugger;
    let newLeft = lftBtn + 9;
    let newRight = newLeft + 9;

    if (newRight > contentData.length) {
      newRight = contentData.length;
      newLeft = newRight - (newRight % 9);
    }

    setLftBtn(newLeft);
    setRightBtn(newRight);
    pagination(newLeft, newRight);
  };

  const directPageNavigation = (e) => {
    let pageNum = Number(e.target.innerText);

    let newRight = 9 * pageNum;

    let newLeft = newRight - 9;
    if (newRight > contentData.length) {
      newRight = contentData.length;
      newLeft = newRight - (newRight % 9);
    }

    setLftBtn(newLeft);
    setRightBtn(newRight);
    pagination(newLeft, newRight);
  };

  const getDataWithSearch = (e) => {
    const value = e.target.value;

    setTimeout(() => {
      setPage(
        page.filter((data) =>
          data.pageTitle.toLowerCase().includes(value.toLowerCase())
        )
      );
      console.log("This is filtered post", page);
    }, 2000);
  };

  const getEntriesManually = (e) => {
    let val = Number(e.target.value);
    setPage(contentData.slice(0, val));
  };
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [deleteKey, setDeleteKey] = useState("");

  const deleteData = () => {
    // Delete Data Logic
  };

  const handleDataDeleteModal = (key) => {
    setDeleteKey(" ");
    setDeleteConfirmModal(true);
    setDeleteKey(key);
  };

  return (
    <div className="bg-[#EEEEEE] flex flex-col gap-6 sm:gap-8 md:gap-12 p-4 md:p-8 min-h-screen">
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
                onClick={deleteData}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Title Section */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-[#ACACAC] flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-light uppercase">
          <Monitor className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
          Manage Menu
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
          Manage Menu
        </h1>
      </div>

      {/* Main Section */}
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
                onChange={(E) => getEntriesManually(E)}
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
                onChange={(e) => getDataWithSearch(e)}
                className="bg-transparent outline-none placeholder:text-[#365248] text-[#365248] w-full"
              />
            </div>
          </div>
        </div>

        {/* Table Headings */}
        <div className="hidden md:flex bg-[#CCCCCC] px-4 py-3 justify-between font-bold text-[#688A7E] text-sm uppercase">
          <p className="w-1/4">Menu Name</p>
          <p className="w-1/5">Menu URL</p>
          <p className="w-[15%]">Category</p>
          <p className="w-1/12 text-center">Status</p>
          <p className="w-1/6 text-center">Action</p>
        </div>

        {/* List Items */}
        <div className="divide-y">
          {page ? (
            page.map((data, idx) => (
              <div
                key={idx}
                className={`flex flex-col md:flex-row md:justify-between items-start md:items-center px-4 py-3 gap-2 md:gap-0 ${
                  idx % 2 === 0 ? "bg-[#F5F5F5]" : "bg-white"
                }`}
              >
                <p className="w-full md:w-1/4 text-sm text-[#688A7E]">
                  {data.menuName}
                </p>
                <p className="w-full md:w-1/5 text-sm text-[#688A7E]">
                  {data.menuURL}
                </p>
                <p className="w-full md:w-[15%] text-sm text-[#688A7E] truncate">
                  {data.menuCategory}
                </p>

                <p className="w-full md:w-1/12 text-sm text-[#688A7E] text-center">
                  {data.status ? "Active" : "Inactive"}
                </p>
                <div className="w-full md:w-1/6 flex justify-start md:justify-center gap-2 mt-2 md:mt-0">
                  <Link
                    title="Edit Content"
                    href={`/admin/content/edit/${idx}`}
                    className="p-2 cursor-pointer bg-green-600 hover:bg-green-700 transition text-white rounded-md"
                  >
                    <FilePen />
                  </Link>
                  <button
                    onClick={() => handleDataDeleteModal(idx)}
                    className="p-2 cursor-pointer bg-red-500 hover:bg-red-600 transition text-white rounded-md"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4">Loading...</div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-4 border-t">
          <p className="text-sm opacity-0 text-gray-600">
            Showing 41 to 50 of 52 entries
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={leftPage}
              className="px-5 py-2 border rounded-md border-[#688A7E] text-[#688A7E] font-semibold hover:bg-[#436b5d] hover:text-white transition"
            >
              Previous
            </button>
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: ttPage }, (_, i) => (
                <p
                  key={i}
                  onClick={(e) => directPageNavigation(e)}
                  className="px-3 py-1.5 border border-[#688A7E] text-black rounded-md cursor-pointer hover:bg-[#688A7E] hover:text-white transition"
                >
                  {i + 1}
                </p>
              ))}
            </div>
            <button
              onClick={rightPage}
              className="px-5 py-2 border rounded-md border-[#688A7E] text-[#688A7E] font-semibold hover:bg-[#436b5d] hover:text-white transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;