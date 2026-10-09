"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Pencil, Trash2, Search, Filter, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import RMWPopup from "@/components/rmw_popup/RMWPopup";

interface PAGECARD {
  s3heading1: string;
  s3para: string;
  cards: CardItem[];
}

interface CardItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
}

function Page() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { subContent } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ message: "", status: 0 });
  const [cardsData, setCardsData] = useState<PAGECARD | null>(null);
  const router = useRouter();
  // Simulate data loading
  useEffect(() => {
    const getCardsData = async (subLink: string) => {
      try {
        setIsLoading(true);
        const { data, status } = await axios.get(`/api/${subLink}`);
        setCardsData(data);
        setPopupData({ message: data.message, status });
        setShowPopup(true);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (typeof error === "object" && error !== null && "message" in error) {
          setPopupData({
            message: (error as { message: string }).message,
            status:
              error instanceof Error && "status" in error
                ? (error as { status?: number }).status ?? 500
                : 500,
          });
        } else {
          setPopupData({ message: "An unknown error occurred.", status: 500 });
        }
        setShowPopup(true);
      }
    };

    if (subContent) {
      const subLink = Array.isArray(subContent) ? subContent[0] : subContent;
      const url = subLink.split("%3D").join("/");
      getCardsData(url);
    }
  }, [subContent]);

  const handleBack = () => {
    router.push("/admin/content");
  };

  const handleDelete = async (id: string) => {
    try {
      const { status, data } = await axios.delete(
        `/api/sql-single-page-card/delete/${id}`
      );
      setPopupData({ message: data.message, status });
      setShowPopup(true);
      setShowModal(false);
    } catch (error) {
      if (typeof error === "object" && error !== null && "message" in error) {
        setPopupData({
          message: (error as { message: string }).message,
          status:
            error instanceof Error && "status" in error
              ? (error as { status?: number }).status ?? 500
              : 500,
        });
      } else {
        setPopupData({ message: "An unknown error occurred.", status: 500 });
      }
      setShowPopup(true);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/content/edit/${id}`);
  };

  const openDeleteModal = (id: string) => {
    setSelectedCard(id);
    setShowModal(true);
  };

  const filteredCards =
    cardsData?.cards.filter(
      (card) =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showPopup && (
        <RMWPopup
          message={popupData.message}
          status={popupData.status}
          onClose={() => setShowPopup(false)}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <button
            className="flex cursor-pointer items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-6"
            onClick={handleBack}
          >
            <ArrowLeft size={18} className="mr-2" />
            <span>Back</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {cardsData?.s3heading1 || "Content Items"}
              </h2>
              {/* <p className="text-gray-600 mt-2">
                {cardsData?.s3para || "Manage your content items"}
              </p> */}
            </div>

            <button
              onClick={() => router.push("/admin/content/add")}
              className="mt-4 cursor-pointer md:mt-0 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus size={18} className="mr-2" />
              Add New Item
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0">
            <div className="relative flex-grow">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search content..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button className="md:ml-4 cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Filter size={18} className="mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Cards List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filteredCards.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No content items found.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredCards.map((card) => (
                <div
                  key={card.id}
                  className="p-6 flex flex-col md:flex-row md:items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200">
                      <img
                        src={`${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/${card.image_url}`}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{card.description}</p>
                  </div>

                  <div className="flex items-center mt-4 md:mt-0 md:ml-6 space-x-3">
                    <button
                      onClick={() => handleEdit(card.id)}
                      className="p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                      title="Edit"
                    >
                      <Pencil size={18} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(card.id)}
                      className="p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                      title="Delete"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Confirm Deletion
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this item? This action cannot be
                undone.
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="cursor-pointer px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => selectedCard && handleDelete(selectedCard)}
                  className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
