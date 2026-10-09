"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, ToastContainer } from "react-toastify";
import { FiXCircle } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Breadcrumb from "@/components/ui/Breadcrumb";

const EditMediaBannerPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id?.toString();

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    image: null as File | null,
    status: "",
    existingImage: "", // New
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing data
  useEffect(() => {
    const fetchBanner = async () => {
      if (!id) return;
      try {
        const res = await axios.get(
          `/api/system-settings/manage-mediaBanner/${id}`
        );
        const { title, status, image } = res.data;

        setFormData({
          id,
          title,
          image: null,
          status,
          existingImage: image,
        });

        setPreviewImage(`/media-banners/${image}`);
      } catch (error) {
        console.error("Failed to fetch media banner:", error);
        toast.error("Failed to load media banner.");
      }
    };

    fetchBanner();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreviewImage(null);
  };

  const validateForm = () => {
    if (!formData.title || !formData.status) {
      toast.error("Title and status are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitData = new FormData();
    submitData.append("id", formData.id);
    submitData.append("title", formData.title);
    submitData.append("status", formData.status);
    if (formData.image) {
      submitData.append("image", formData.image);
    }

    setLoading(true);
    try {
      await axios.put(
        `/api/system-settings/manage-mediaBanner/${formData.id}`,
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("✅ Media Banner updated successfully!");
      router.push("/admin/mediabanner");
    } catch (error) {
      console.error("Error updating media banner:", error);
      toast.error("❌ Failed to update media banner.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <ToastContainer />

      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          Edit Media Banner
        </h1>
        <Breadcrumb
          currentPage="Edit Media Banner"
          middleLinks={[
            { name: "Manage Media Banner", href: "/admin/mediabanner" },
          ]}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg max-w-3xl mx-auto shadow-md p-5 space-y-6"
      >
        {/* Title */}
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter banner title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Status */}
        <div className="space-y-1">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, status: value }))
            }
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Image Upload */}
        <div className="space-y-1">
          <Label htmlFor="image">Upload Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {previewImage && (
            <div className="relative w-fit mt-3">
              <img
                src={previewImage}
                alt="Preview"
                className="w-32 h-32 object-cover rounded shadow"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <FiXCircle size={18} />
              </button>
            </div>
          )}
          {!previewImage && formData.existingImage && (
            <p className="text-sm text-gray-600">
              Current Image: {formData.existingImage}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Saving..." : "Update Media Banner"}
        </Button>
      </form>

      <footer className="admin-footer mt-10">
        Designed and Developed by <strong>Ritz Media World</strong>
      </footer>
    </div>
  );
};

export default EditMediaBannerPage;
