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
    srNo: 1,
    title: "Digital Marketing",
    menuImg: "https://source.unsplash.com/random/300x200?marketing",
    desc: "Leading supplier of organic clarified butter.",
  },
  {
    srNo: 2,
    title: "Web Development",
    menuImg: "https://source.unsplash.com/random/300x200?web",
    desc: "Building responsive and fast websites.",
  },
  {
    srNo: 3,
    title: "Graphic Design",
    menuImg: "https://source.unsplash.com/random/300x200?design",
    desc: "Creating visually stunning brand assets.",
  },
  {
    srNo: 4,
    title: "App Development",
    menuImg: "https://source.unsplash.com/random/300x200?app",
    desc: "Custom Android and iOS app solutions.",
  },
  {
    srNo: 5,
    title: "Search Engine Optimization",
    menuImg: "https://source.unsplash.com/random/300x200?seo",
    desc: "Helping websites rank on Google.",
  },
  {
    srNo: 6,
    title: "Content Writing",
    menuImg: "https://source.unsplash.com/random/300x200?content",
    desc: "Creative and SEO-friendly content writing.",
  },
  {
    srNo: 7,
    title: "UI/UX Design",
    menuImg: "https://source.unsplash.com/random/300x200?uiux",
    desc: "Designing smooth and user-friendly interfaces.",
  },
  {
    srNo: 8,
    title: "Brand Strategy",
    menuImg: "https://source.unsplash.com/random/300x200?brand",
    desc: "Positioning your brand for success.",
  },
  {
    srNo: 9,
    title: "Social Media Management",
    menuImg: "https://source.unsplash.com/random/300x200?social",
    desc: "Growing your presence across platforms.",
  },
  {
    srNo: 10,
    title: "Email Marketing",
    menuImg: "https://source.unsplash.com/random/300x200?email",
    desc: "Reach your audience directly and effectively.",
  },
  {
    srNo: 11,
    title: "Video Editing",
    menuImg: "https://source.unsplash.com/random/300x200?video",
    desc: "Editing professional reels and videos.",
  },
  {
    srNo: 12,
    title: "Photography",
    menuImg: "https://source.unsplash.com/random/300x200?photography",
    desc: "Capturing brand moments beautifully.",
  },
  {
    srNo: 13,
    title: "Influencer Marketing",
    menuImg: "https://source.unsplash.com/random/300x200?influencer",
    desc: "Connecting you with top influencers.",
  },
  {
    srNo: 14,
    title: "Print Media",
    menuImg: "https://source.unsplash.com/random/300x200?print",
    desc: "Flyers, brochures, and print advertising.",
  },
  {
    srNo: 15,
    title: "Event Promotions",
    menuImg: "https://source.unsplash.com/random/300x200?event",
    desc: "Managing offline brand events.",
  },
  {
    srNo: 16,
    title: "Lead Generation",
    menuImg: "https://source.unsplash.com/random/300x200?leads",
    desc: "Driving quality leads to grow your business.",
  },
  {
    srNo: 17,
    title: "E-commerce Setup",
    menuImg: "https://source.unsplash.com/random/300x200?ecommerce",
    desc: "Complete Shopify and WooCommerce setup.",
  },
  {
    srNo: 18,
    title: "Product Photography",
    menuImg: "https://source.unsplash.com/random/300x200?product",
    desc: "High-quality photos that convert.",
  },
  {
    srNo: 19,
    title: "Reel Creation",
    menuImg: "https://source.unsplash.com/random/300x200?reels",
    desc: "Engaging short video content for Instagram.",
  },
  {
    srNo: 20,
    title: "Copywriting",
    menuImg: "https://source.unsplash.com/random/300x200?copywriting",
    desc: "Catchy taglines and ad copy that sells.",
  },
  {
    srNo: 21,
    title: "Data Analytics",
    menuImg: "https://source.unsplash.com/random/300x200?analytics",
    desc: "Understanding what your audience wants.",
  },
  {
    srNo: 22,
    title: "Google Ads",
    menuImg: "https://source.unsplash.com/random/300x200?ads",
    desc: "High-performing campaigns with great ROI.",
  },
  {
    srNo: 23,
    title: "Facebook Marketing",
    menuImg: "https://source.unsplash.com/random/300x200?facebook",
    desc: "Reach your customers where they scroll.",
  },
  {
    srNo: 24,
    title: "Logo Design",
    menuImg: "https://source.unsplash.com/random/300x200?logo",
    desc: "Minimalistic and modern logo design.",
  },
  {
    srNo: 25,
    title: "Poster Designing",
    menuImg: "https://source.unsplash.com/random/300x200?poster",
    desc: "Beautiful posters for print and digital.",
  },
  {
    srNo: 26,
    title: "Brochure Design",
    menuImg: "https://source.unsplash.com/random/300x200?brochure",
    desc: "Designing eye-catching brochures.",
  },
  {
    srNo: 27,
    title: "Packaging Design",
    menuImg: "https://source.unsplash.com/random/300x200?packaging",
    desc: "Attractive package design for your product.",
  },
  {
    srNo: 28,
    title: "Blog Writing",
    menuImg: "https://source.unsplash.com/random/300x200?blog",
    desc: "Writing engaging and SEO-optimized blogs.",
  },
  {
    srNo: 29,
    title: "Script Writing",
    menuImg: "https://source.unsplash.com/random/300x200?script",
    desc: "Crafting impactful video or ad scripts.",
  },
  {
    srNo: 30,
    title: "360° Campaigns",
    menuImg: "https://source.unsplash.com/random/300x200?campaign",
    desc: "Integrated campaigns across all platforms.",
  }
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
          Manage Services
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
          Manage Services
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
          <p className="w-[15%]">Sr No.</p>
          <p className="w-1/4">Title</p>
          <p className="w-1/4">Image</p>
          <p className="w-1/4">Description</p>
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
                <p className="w-full md:w-[15%] text-sm text-[#688A7E] truncate">
                  {data.srNo}
                </p>
                <p className="w-1/4 h-16 text-[#688A7E] truncate text-sm">
                  {data.title}
                </p>
                <div className="w-1/4 h-16 overflow-hidden ">
                  <img
                    src={data.menuImg}
                    alt=""
                    className="w-1/2 h-full object-contain"
                  />
                </div>

                <p className="w-1/4 h-16 text-[#688A7E] truncate text-sm">
                  {data.desc}
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
