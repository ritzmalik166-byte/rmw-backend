"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    image: null as File | null,
    status: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setPreviewImage(null);
  };

  const validateForm = () => {
    const { title, image, status } = formData;
    if (!title || !image || !status) {
      toast.error("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const form = new FormData();
    form.append("title", formData.title);
    form.append("status", formData.status);
    if (formData.image) form.append("image", formData.image);

    setLoading(true);
    try {
      await axios.post(
        "/api/system-settings/manage-mediaBanner/add-banner",
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("🎉 Media Banner added successfully!");
      setFormData({ title: "", image: null, status: "" });
      setPreviewImage(null);
      router.push("/admin/mediabanner");
    } catch (error) {
      console.error("Error adding media banner:", error);
      toast.error("❌ Failed to add media banner.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 ">
      <ToastContainer />

      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          Add Media Banner
        </h1>
        <Breadcrumb
          currentPage="Add Media Banner"
          middleLinks={[
            { name: "Manage Media Banner", href: "/admin/mediabanner" },
          ]}
        />
      </div>

      {/* Form */}
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
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Add Media Banner"}
        </Button>
      </form>
      <footer className="admin-footer">
        Designed and Developed by <strong>Ritz Media World</strong>
      </footer>
    </div>
  );
};

export default Page;
