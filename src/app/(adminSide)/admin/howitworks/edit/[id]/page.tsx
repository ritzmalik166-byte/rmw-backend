"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "@/components/ui/Breadcrumb";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id?.toString();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await axios.get(
          `/api/system-settings/manage-faq/${id}`
        );
        const { title, description, status } = response.data;
        setFormData({ title, description, status });
      } catch (error) {
        console.error("Error fetching FAQ:", error);
        toast.error("❌ Failed to load FAQ.");
      }
    };

    if (id) {
      fetchFaq();
    }
  }, [id]);

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
      await axios.put(`/api/system-settings/manage-faq/${id}`, formData);
      toast.success("✅ FAQ updated successfully!");
      router.push("/admin/howitworks");
    } catch (error) {
      console.error("Error updating FAQ:", error);
      toast.error("❌ Failed to update FAQ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <ToastContainer />
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Edit FAQ</h1>
        <Breadcrumb
          currentPage="Edit FAQ"
          middleLinks={[{ name: "Manage FAQ", href: "/admin/howitworks" }]}
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
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter FAQ title"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter FAQ description"
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
          {loading ? "Updating..." : "Update FAQ"}
        </Button>
      </form>

      <footer className="admin-footer mt-8">
        Designed and Developed by <strong>Ritz Media World</strong>
      </footer>
    </div>
  );
};

export default Page;
