"use client";

import RMWLoader from "@/components/rmw_loader/RMWLoader";
import RMWPopup from "@/components/rmw_popup/RMWPopup";
import axios from "axios";
import { ImagePlus, Pencil, RefreshCcw, Save, Search, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const PAGE_SIZE = 10;

type ServiceThirdRow = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  service2_id: number;
};

type ListApiResponse = {
  success: boolean;
  message: string;
  total: number;
  query?: string | null;
  data: ServiceThirdRow[];
};

type EditState = {
  id: number;
  title: string;
  description: string;
  image_url: string;
};

const serverBase = process.env.NEXT_PUBLIC_SERVER_IMG_PATH || "";

function getImageUrl(imagePath: string) {
  if (!imagePath) return "";
  if (imagePath.startsWith("blob:") || imagePath.startsWith("data:")) return imagePath;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) return imagePath;

  if (imagePath.startsWith("/images/")) {
    const fileName = imagePath.split("/images/")[1];
    return `${serverBase}/api/images/${fileName}`;
  }

  if (imagePath.startsWith("images/")) {
    const fileName = imagePath.split("images/")[1];
    return `${serverBase}/api/images/${fileName}`;
  }

  const normalized = imagePath.replace(/^\/+/, "");
  return serverBase ? `${serverBase}/${normalized}` : `/${normalized}`;
}

function stripHtml(content: string) {
  return content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default function ServiceThirdPage() {
  const [cards, setCards] = useState<ServiceThirdRow[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ message: "", status: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [editState, setEditState] = useState<EditState | null>(null);
  const [originalState, setOriginalState] = useState<EditState | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [debouncedSearch, refreshKey]);

  const fetchServices = useCallback(async () => {
    try {
      setIsLoading(true);
      const params =
        debouncedSearch.length > 0 ? { q: debouncedSearch } : undefined;
      const { data } = await axios.get<ListApiResponse>(
        "/api/service-third-images-update",
        { params }
      );
      setCards(data?.data || []);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setPopupData({
          message: error.response?.data?.message || error.message,
          status: error.response?.status || 500,
        });
      } else {
        setPopupData({ message: "Failed to fetch service third data", status: 500 });
      }
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices, refreshKey]);

  const displayedCards = cards.slice(0, visibleCount);
  const hasMore = visibleCount < cards.length;

  const openEditModal = (card: ServiceThirdRow) => {
    const initial: EditState = {
      id: card.id,
      title: card.title || "",
      description: card.description || "",
      image_url: card.image_url || "",
    };

    setOriginalState(initial);
    setEditState(initial);
    setSelectedFile(null);
    setPreviewUrl(getImageUrl(card.image_url || ""));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedFile(null);
    setPreviewUrl("");
    setEditState(null);
    setOriginalState(null);
  };

  const handleImagePick = (file?: File) => {
    if (!file || !editState) return;
    const localUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(localUrl);
  };

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const updateServiceThird = async () => {
    if (!editState || !originalState) return;

    const trimmedTitle = editState.title.trim();
    const descriptionPlain = stripHtml(editState.description || "").trim();
    const hasImage =
      Boolean(selectedFile) ||
      Boolean(editState.image_url && editState.image_url.trim());

    if (!trimmedTitle) {
      setPopupData({ message: "Title is required.", status: 400 });
      setShowPopup(true);
      return;
    }
    if (!descriptionPlain) {
      setPopupData({ message: "Description is required.", status: 400 });
      setShowPopup(true);
      return;
    }
    if (!hasImage) {
      setPopupData({ message: "An image is required.", status: 400 });
      setShowPopup(true);
      return;
    }

    const formData = new FormData();

    if (editState.title !== originalState.title) {
      formData.append("title", trimmedTitle);
    }
    if (editState.description !== originalState.description) {
      formData.append("description", editState.description);
    }
    if (selectedFile) {
      formData.append("image_url", selectedFile);
    }

    if (Array.from(formData.keys()).length === 0) {
      setPopupData({ message: "No changes to update", status: 400 });
      setShowPopup(true);
      return;
    }

    try {
      setIsUpdating(true);
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("rm_token")
          : null;
      const { data, status } = await axios.patch(
        `/api/service-third-images-update/${editState.id}`,
        formData,
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        } 
      );
      setPopupData({
        message: data?.message || "Service Third updated successfully",
        status,
      });
      setShowPopup(true);
      closeModal();
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setPopupData({
          message: error.response?.data?.message || error.message,
          status: error.response?.status || 500,
        });
      } else {
        setPopupData({ message: "Failed to update service third", status: 500 });
      }
      setShowPopup(true);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-[#f3e9d2] p-4 md:p-8">
      {showPopup && (
        <RMWPopup
          message={popupData.message}
          status={popupData.status}
          onClose={() => setShowPopup(false)}
        />
      )}

      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-2xl border border-white/80 bg-white/85 p-5 shadow-lg backdrop-blur md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="mb-2 inline-flex rounded-full bg-[#f3e9d2] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#9a7530]">
                Manage Services / Service Third
              </p>
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Service Third Manager
              </h1>
              <p className="mt-2 text-sm text-slate-600 md:text-base">
                Edit title, rich description and image for each Service Third card.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end md:w-auto">
              <div className="relative w-full min-w-[200px] sm:max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by title, description, id…"
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none ring-[#c59d4f] transition placeholder:text-slate-400 focus:border-[#c59d4f] focus:ring-2"
                  aria-label="Search service third"
                />
              </div>
              <button
                onClick={() => setRefreshKey((prev) => prev + 1)}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 sm:w-auto"
                type="button"
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-xl bg-slate-900">
            <RMWLoader />
          </div>
        ) : cards.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            No Service Third records found
            {debouncedSearch ? ` matching “${debouncedSearch}”.` : "."}
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-slate-600">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {displayedCards.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-900">{cards.length}</span>{" "}
              cards
              {debouncedSearch ? (
                <span className="text-slate-500">
                  {" "}
                  (search: “{debouncedSearch}”)
                </span>
              ) : null}
            </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {displayedCards.map((card) => (
              <article
                key={card.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  {getImageUrl(card.image_url) ? (
                    <Image
                      src={getImageUrl(card.image_url)}
                      alt={card.title || "service-third-image"}
                      fill
                      className=" transition duration-300 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="line-clamp-1 text-lg font-semibold text-slate-900">
                    {card.title || "Untitled"}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                    {stripHtml(card.description || "") || "No description"}
                  </p>

                  <button
                    onClick={() => openEditModal(card)}
                    className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#c59d4f] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#9a7530]"
                    type="button"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                </div>
              </article>
            ))}
          </div>
            {hasMore ? (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((c) =>
                      Math.min(c + PAGE_SIZE, cards.length)
                    )
                  }
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#e6cf9f] bg-[#f3e9d2] px-6 py-2.5 text-sm font-semibold text-[#9a7530] shadow-sm transition hover:bg-[#ecd9b3] hover:shadow-md"
                >
                  Load more
                  <span className="text-xs font-normal text-[#9a7530]">
                    (+{Math.min(PAGE_SIZE, cards.length - visibleCount)})
                  </span>
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>

      {modalOpen && editState && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm">
          <div className="relative max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl md:p-6">
            <button
              className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              onClick={closeModal}
              type="button"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="mb-5 text-xl font-semibold text-slate-900">
              Update Service Third
            </h2>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="flex flex-col">
                <div className="relative h-[320px] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      No image selected
                    </div>
                  )}
                </div>

                <label className="mt-3 inline-flex w-fit cursor-pointer items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
                  <ImagePlus className="h-4 w-4" />
                  Change Image
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImagePick(e.target.files?.[0])}
                  />
                </label>

                <p className="mt-2 text-xs text-slate-500">
                  Dummy preview link:{" "}
                  <span className="break-all font-mono text-[11px] text-[#9a7530]">
                    {previewUrl || "Select an image to generate local preview link"}
                  </span>
                </p>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Title
                </label>
                <input
                  type="text"
                  value={editState.title}
                  onChange={(e) =>
                    setEditState((prev) =>
                      prev ? { ...prev, title: e.target.value } : prev
                    )
                  }
                  className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none ring-[#c59d4f] transition focus:ring-2"
                  placeholder="Enter title"
                />

                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  value={editState.description}
                  onChange={(e) =>
                    setEditState((prev) =>
                      prev ? { ...prev, description: e.target.value } : prev
                    )
                  }
                  rows={8}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none ring-[#c59d4f] transition focus:ring-2"
                  placeholder="Enter description"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-4">
              <button
                onClick={closeModal}
                type="button"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>

              <button
                onClick={updateServiceThird}
                type="button"
                disabled={isUpdating}
                className="inline-flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#c59d4f] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#9a7530] disabled:cursor-not-allowed disabled:bg-[#e0c48f]"
              >
                {isUpdating ? <RMWLoader /> : <Save className="h-4 w-4" />}
                {isUpdating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
