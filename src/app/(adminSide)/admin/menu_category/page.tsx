"use client";
import React, { useEffect, useState } from "react";
import {
  FilePen,
  Home,
  Monitor,
  Trash2,
  AlertTriangle,
  Eye,
  X,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import AddCategoryModal from "./add-category-modal/AddCategoryModal";

interface Category {
  _id: string;
  categoryName: string;
  categorySlug: string;
  categoryMetaTitle: string;
  categoryMetaDescription: string;
  categoryMetaKeywords: string;
  createdAt: string;
  updatedAt: string;
}

const Page: React.FC = () => {
  const [ritzCategories, setRitzCategory] = useState<Category[]>([]);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    categoryName: "",
    categorySlug: "",
    categoryMetaTitle: "",
    categoryMetaDescription: "",
    categoryMetaKeywords: "",
  });

  const deleteData = async () => {
    try {
      await axios.delete(`/api/ritzCats/deletePrevCat/${currentCategory?._id}`);
      setRitzCategory(
        ritzCategories?.filter((cat) => cat._id !== currentCategory?._id)
      );
      setDeleteConfirmModal(false);
    } catch (error) {
      console.error(error);
      alert("Failed to delete category");
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `/api/ritzCats/updatePrevCat/${currentCategory?._id}`,
        formData
      );
      setRitzCategory(
        ritzCategories?.map((cat) =>
          cat._id === currentCategory?._id ? data.updatedCategory : cat
        )
      );
      setEditModal(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update category");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  async function fetchAllTheCategory() {
    try {
      const { data } = await axios.get(`/api/ritzCats/getAllCats`);
      setRitzCategory(data.allCategories);
    } catch (error) {
      console.error(error);
      alert("Internal Server Error In Fetching All Categories!");
    }
  }

  useEffect(() => {
    fetchAllTheCategory();
  }, []);

  useEffect(() => {
    if (currentCategory) {
      setFormData({
        categoryName: currentCategory.categoryName,
        categorySlug: currentCategory.categorySlug,
        categoryMetaTitle: currentCategory.categoryMetaTitle,
        categoryMetaDescription: currentCategory.categoryMetaDescription,
        categoryMetaKeywords: currentCategory.categoryMetaKeywords,
      });
    }
  }, [currentCategory]);

  return (
    <div className="bg-[#EEEEEE] flex flex-col gap-6 p-4 md:p-8 min-h-screen">
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCategoryAdded={() => {
          // Refresh your categories list
          fetchAllTheCategory();
        }}
      />
      {/* Delete Confirmation Modal */}
      {deleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 w-full max-w-md shadow-2xl text-center relative">
            <button
              onClick={() => setDeleteConfirmModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <div className="flex justify-center mb-4">
              <AlertTriangle className="text-red-600 w-12 h-12" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Confirm Deletion
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {currentCategory?.categoryName}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition duration-200 font-medium"
                onClick={() => setDeleteConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200 font-medium"
                onClick={deleteData}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editModal && currentCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              Edit Category: {currentCategory.categoryName}
            </h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#688A7E]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category Slug
                  </label>
                  <input
                    type="text"
                    name="categorySlug"
                    value={formData.categorySlug}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#688A7E]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="categoryMetaTitle"
                  value={formData.categoryMetaTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#688A7E]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meta Description
                </label>
                <textarea
                  name="categoryMetaDescription"
                  value={formData.categoryMetaDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#688A7E]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meta Keywords (comma separated)
                </label>
                <input
                  type="text"
                  name="categoryMetaKeywords"
                  value={formData.categoryMetaKeywords}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#688A7E]"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditModal(false)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#688A7E] hover:bg-[#436b5d] text-white rounded-lg transition duration-200 font-medium"
                >
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Category Modal */}
      {viewModal && currentCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 w-full max-w-2xl shadow-2xl relative">
            <button
              onClick={() => setViewModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              Category Details
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Category Name
                  </h3>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    {currentCategory.categoryName}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Slug
                  </h3>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    {currentCategory.categorySlug}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Meta Title
                </h3>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {currentCategory.categoryMetaTitle}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Meta Description
                </h3>
                <p className="text-gray-800 dark:text-gray-200">
                  {currentCategory.categoryMetaDescription}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Meta Keywords
                </h3>
                <p className="text-gray-800 dark:text-gray-200">
                  {currentCategory.categoryMetaKeywords}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Created At
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200">
                    {new Date(currentCategory.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Last Updated
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200">
                    {new Date(currentCategory.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Title */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-[#ACACAC] flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-light uppercase">
          <Monitor className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
          Manage Menu
        </h1>
      </div>

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 bg-white p-3 rounded-md shadow-sm">
        <Link
          title="Home"
          href="/admin"
          className="text-[#2955B3] flex items-center gap-2 hover:underline"
        >
          <Home className="w-4 h-4" />
          Home
        </Link>
        <span className="text-[#ACACAC] font-bold">/</span>
        <h1 className="text-[#838383] flex items-center gap-2">
          <Monitor className="w-4 h-4" />
          Manage Category
        </h1>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#9CA9B4] p-4">
          <p className="text-white font-medium text-base sm:text-lg">
            Manage Categories
          </p>
        </div>

        {/* Sorting and Add Button */}
        <div className="flex flex-col gap-6 p-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-[#688A7E] whitespace-nowrap">
                Show Entries
              </p>
              <select className="border border-[#365248] rounded-md px-3 py-1.5 text-[#365248] outline-none cursor-pointer">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 rounded-md font-semibold text-white bg-[#688A7E] hover:bg-[#365248] cursor-pointer transition duration-200"
            >
              Add New Category
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search categories..."
              className="block w-full pl-10 pr-3 py-2 border border-[#1a6249] rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#688A7E] focus:border-[#688A7E] sm:text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {/* Table Headers - Desktop */}
          <div className="hidden md:grid grid-cols-12 bg-[#CCCCCC] px-4 py-3 font-bold text-[#688A7E] text-sm uppercase">
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Slug</div>
            <div className="col-span-3">Meta Title</div>
            <div className="col-span-2">Created</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          {/* Data Rows */}
          <div className="divide-y">
            {ritzCategories?.length > 0 ? (
              ritzCategories?.map((category) => (
                <div
                  key={category?._id}
                  className="grid grid-cols-1 md:grid-cols-12 px-4 py-3 gap-2 md:gap-0 hover:bg-gray-50"
                >
                  {/* Category Name - Mobile Header */}
                  <div className="md:hidden font-semibold text-[#365248]">
                    Name
                  </div>
                  <div className="md:col-span-3 text-sm text-[#365248] font-medium truncate">
                    {category?.categoryName}
                  </div>

                  {/* Slug - Mobile Header */}
                  <div className="md:hidden font-semibold text-[#365248]">
                    Slug
                  </div>
                  <div className="md:col-span-2 text-sm text-gray-500 truncate">
                    {category?.categorySlug}
                  </div>

                  {/* Meta Title - Mobile Header */}
                  <div className="md:hidden font-semibold text-[#365248]">
                    Meta Title
                  </div>
                  <div className="md:col-span-3 text-sm text-gray-600 truncate">
                    {category?.categoryMetaTitle}
                  </div>

                  {/* Created At - Mobile Header */}
                  <div className="md:hidden font-semibold text-[#365248]">
                    Created
                  </div>
                  <div className="md:col-span-2 text-sm text-gray-400">
                    {new Date(category?.createdAt).toLocaleDateString()}
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-2 flex justify-start md:justify-center gap-2 mt-2 md:mt-0">
                    <button
                      onClick={() => {
                        setCurrentCategory(category);
                        setViewModal(true);
                      }}
                      className="p-2 cursor-pointer bg-blue-500 hover:bg-blue-600 transition text-white rounded-md"
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentCategory(category);
                        setEditModal(true);
                      }}
                      className="p-2 cursor-pointer bg-green-600 hover:bg-green-700 transition text-white rounded-md"
                      title="Edit"
                    >
                      <FilePen size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentCategory(category);
                        setDeleteConfirmModal(true);
                      }}
                      className="p-2 cursor-pointer bg-red-500 hover:bg-red-600 transition text-white rounded-md"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No categories found...
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-4 border-t">
          <p className="text-sm text-gray-600">
            Showing 1 to {ritzCategories?.length} of {ritzCategories?.length}{" "}
            entries
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="px-5 py-2 border rounded-md border-gray-300 text-gray-400 font-semibold cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled
              className="px-5 py-2 border rounded-md border-gray-300 text-gray-400 font-semibold cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;