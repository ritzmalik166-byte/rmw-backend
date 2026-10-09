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
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { title, description, status } = formData;
    if (!title || !description || !status) {
      toast.error("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await axios.post("/api/system-settings/manage-faq", formData);
      toast.success("🎉 FAQ added successfully!");
      router.push("/admin/howitworks");
    } catch (error) {
      console.error("Error adding FAQ:", error);
      toast.error("❌ Failed to add FAQ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 ">
      <ToastContainer />

      {/* Heading and Breadcrumb */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Add FAQ</h1>
        <Breadcrumb
          currentPage="Add FAQ"
          middleLinks={[{ name: "Manage FAQ", href: "/admin/howitworks" }]}
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
            placeholder="Enter FAQ title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter FAQ description"
            rows={5}
            value={formData.description}
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

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Add FAQ"}
        </Button>
      </form>

      <footer className="admin-footer mt-8">
        Designed and Developed by <strong>Ritz Media World</strong>
      </footer>
    </div>
  );
};

export default Page;
