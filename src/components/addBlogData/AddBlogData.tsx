"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import axios from "axios";
// import { toast } from "sonner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiXCircle } from "react-icons/fi";
import Editor from "@/components/Editor/Editor";
import { formatSlugInput, normalizeSlug } from "@/lib/slugify";

const AddBlogData = () => {
  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    blogImage: null as File | null,
    description: "",
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/blog/categories");
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "slug") {
      setFormData((prev) => ({ ...prev, slug: formatSlugInput(value) }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, category_id: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, blogImage: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, blogImage: null });
    setPreviewImage(null);
  };

  const validateForm = () => {
    for (const key in formData) {
      if (
        formData[key as keyof typeof formData] === "" ||
        formData[key as keyof typeof formData] === null
      ) {
        setErrorMessage("All fields are required");
        toast.error("All fields are required");
        return false;
      }
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formDataToSend.append(key, value as string | Blob);
      }
    });

    try {
      await axios.post("/api/blog/addBlogs", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("🎉 Blog added successfully!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setFormData({
        category_id: "",
        title: "",
        slug: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        blogImage: null,
        description: "",
      });

      setPreviewImage(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding blog :", error);
        toast.error("❌ Failed to add blog!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error("Unknown error", error);
        toast.error("❌ Failed to add blog!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-4"
      >
        <h2 className="text-xl font-semibold">Add New Blog</h2>

        <Label>Blog Category</Label>
        <Select onValueChange={handleSelectChange} value={formData.category_id}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label>Blog Title</Label>
        <Input name="title" value={formData.title} onChange={handleChange} />

        <Label>Slug URL</Label>
        <Input
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          onBlur={() =>
            setFormData((prev) => ({ ...prev, slug: normalizeSlug(prev.slug) }))
          }
          placeholder="e.g. my blog post"
        />
        <p className="text-xs text-muted-foreground">
          Blog will open at /{normalizeSlug(formData.slug) || "your-slug-url"}
        </p>

        <Label>Meta Title</Label>
        <Input
          name="meta_title"
          value={formData.meta_title}
          onChange={handleChange}
        />

        <Label>Meta Description</Label>
        <Textarea
          name="meta_description"
          value={formData.meta_description}
          onChange={handleChange}
        />

        <Label>Meta Keywords</Label>
        <Input
          name="meta_keywords"
          value={formData.meta_keywords}
          onChange={handleChange}
        />

        <Label>Blog Image</Label>
        <div className="relative">
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {previewImage && (
            <div className="relative mt-3">
              <img
                src={previewImage}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md shadow-md"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <FiXCircle size={20} />
              </button>
            </div>
          )}
        </div>

        <Label>Blog Content</Label>
        <Editor
        value={formData.description}
        onChange={(value) => setFormData({ ...formData, description: value })}
      />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? "Saving..." : "Save Blog"}
        </Button>
      </form>
    </>
  );
};

export default AddBlogData;
