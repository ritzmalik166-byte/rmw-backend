"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import { Button } from "../../../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { Label } from "../../../../../components/ui/label";
import Editor from "../../../../../components/Editor/Editor";
import { FiXCircle } from "react-icons/fi";
import { formatSlugInput, normalizeSlug } from "@/lib/slugify";

const UpdateBlog = () => {
  const router = useRouter();
  const { blog_slug } = useParams(); // Get the blog slug from the URL

  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    slug: "",

    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    blogImage: null as File | null, // Store new image file
    description: "",
    mtDesc: "",
  });

  const [existingImage, setExistingImage] = useState<string | null>(null); // Store current image path
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // ✅ Track data loading
  const [previewImage, setPreviewImage] = useState<string | null>(null); // For image preview

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/blog/categories");
        setCategories(response.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching categories:", error.message);
          toast.error("Failed to load categories: " + error.message);
        } else {
          console.error("Unexpected error:", error);
          toast.error("An unexpected error occurred");
        }
      }
    };
    fetchCategories();
  }, []);

  // Fetch blog data when the component mounts
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const { data } = await axios.get(`/api/blog/${blog_slug}`);

        setFormData({
          category_id: data.blog.category_id?.toString() || "",
          title: data.blog.title || "",
          slug: data.blog.slug || "",
          meta_title: data.blog.meta_title || "",
          meta_description: data.blog.meta_description || "",
          meta_keywords: data.blog.meta_keywords || "",
          blogImage: null, // Don't set the image directly
          description: data.blog.description || "",
          mtDesc: data.blog.mtDesc || "",
        });

        setExistingImage(data.blog.blog_image);
        setPreviewImage(
          data.blog.blog_image ? `/blogs/${data.blog.blog_image}` : null
        );
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching categories:", error.message);
          toast.error("Failed to load categories: " + error.message);
        } else {
          console.error("Unexpected error:", error);
          toast.error("An unexpected error occurred");
        }
      } finally {
        setIsFetching(false); // ✅ Data loaded
      }
    };

    fetchBlogData();
  }, [blog_slug]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "slug") {
      setFormData({ ...formData, slug: formatSlugInput(value) });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  // Handle select change
  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, category_id: value });
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, blogImage: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Remove image
  const removeImage = () => {
    setFormData({ ...formData, blogImage: null });
    setPreviewImage(existingImage ? `/blogs/${existingImage}` : null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "blogImage" && value === null) return;
      if (value !== null && value !== "") {
        formDataToSend.append(key, value as string | Blob);
      }
    });

    if (!formData.blogImage && existingImage) {
      formDataToSend.append("existingImage", existingImage);
    }

    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("rm_token")
          : null;
      await axios.patch(`/api/blog/${blog_slug}`, formDataToSend, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("✅ Blog updated successfully!");
      router.push("/admin/manage-blogs");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error pushing blog:", error);
        toast.error("Failed to load categories: " + error.message);
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Loading blog data...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-4"
    >
      <h2 className="text-xl font-semibold">Update Blog</h2>

      <Label>Blog Category</Label>
      <Select
        onValueChange={handleSelectChange}
        value={formData.category_id}
        disabled={loading}
      >
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
      <Input
        name="title"
        value={formData.title}
        onChange={handleChange}
        disabled={loading}
      />

      <Label>Slug URL</Label>
      <Input
        name="slug"
        value={formData.slug}
        onChange={handleChange}
        onBlur={() =>
          setFormData((prev) => ({ ...prev, slug: normalizeSlug(prev.slug) }))
        }
        disabled={loading}
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
        disabled={loading}
      />

      <Label>Meta Description</Label>
      <Textarea
        name="meta_description"
        value={formData.meta_description}
        onChange={handleChange}
        disabled={loading}
      />

      <Label>Meta Keywords</Label>
      <Input
        name="meta_keywords"
        value={formData.meta_keywords}
        onChange={handleChange}
        disabled={loading}
      />

      <Label>Blog Image</Label>
      <div className="relative">
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={loading}
        />
        {previewImage && (
          <div className="relative mt-3">
            <img
              src={previewImage}
              alt="Blog"
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

      <Button type="submit" className="w-full mt-4" disabled={loading}>
        {loading ? "Updating..." : "Update Blog"}
      </Button>
    </form>
  );
};

export default UpdateBlog;
