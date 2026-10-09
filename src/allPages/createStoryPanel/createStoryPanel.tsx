"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./page.module.css";
import Image from "next/image";
interface StoryFolder {
  id: number;
  title: string;
  slug: string;
  cover_image_url: string;
  category: string;
  author: string;
  date: string;
}

interface Story {
  id: number;
  title: string;
  image: string;
  slug: string;
  slides: Array<{ type: string; text: string; image: string }>;
}

const CreateStoryPanel: React.FC = () => {
  
  const [showForm, setShowForm] = useState(false);
  const [folders, setFolders] = useState<StoryFolder[]>([]);
  const [showStoryOverlay, setShowStoryOverlay] = useState(false);
  const [activeFolderId, setActiveFolderId] = useState<number | null>(null);
  const [stories, setStories] = useState<Record<number, Story[]>>({});

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageName, setCoverImageName] = useState("");
  const [category, setCategory] = useState("Finance");
  const [author, setAuthor] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    setSlug(value.toLowerCase().replace(/\s+/g, "-"));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setCoverImageName(file.name);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!title || !slug || !coverImage) {
      alert("Please fill all required fields and select a cover image.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("coverImage", coverImage); // File object
    formData.append("category", category || ""); // default if blank
    formData.append("author", author || "");
  
    try {
      const res = await fetch("/api/story-folder", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      // console.log("📦 Server Response:", data);
  
      if (res.ok) {
        const newId = data.id;
  
        const newFolder: StoryFolder = {
          id: newId,
          title,
          category,
          date: data.date,
          slug,
          cover_image_url: data.cover_image_url,
          author: data.author,
        };
  
        setFolders((prev) => [...prev, newFolder]);
        setStories((prev) => ({ ...prev, [newId]: [] }));
        setActiveFolderId(newId);
        setShowForm(false);
        setShowStoryOverlay(true);
  
        // Reset form
        setTitle("");
        setSlug("");
        setCoverImage(null);
        setCoverImageName("");
        setCategory("Finance");
        setAuthor("");
  
        // console.log("✅ Story folder saved successfully.");
      } else {
        console.error("❌ API Error:", data.error);
      }
    } catch (err) {
      console.error("❌ Network Error:", err);
    }
  };
  
  
  

  // const handleAddStory = () => {
  //   if (activeFolderId === null) return;

  //   const newStory: Story = {
  //     id: stories[activeFolderId]?.length + 1 || 1,
  //     title: `Story ${stories[activeFolderId]?.length + 1 || 1}`,
  //     image: "https://via.placeholder.com/150",
  //     slug,
  //     slides: [],
  //   };

  //   setStories((prev) => ({
  //     ...prev,
  //     [activeFolderId]: [...(prev[activeFolderId] || []), newStory],
  //   }));
  // };

  const [showStoryForm, setShowStoryForm] = useState(false);
  // const [newStoryTitle, setNewStoryTitle] = useState("");
  // const [newStorySlides, setNewStorySlides] = useState([
  //   { type: "image", text: "", image: "" },
  //   { type: "video", text: "", image: "" },
  // ]);

  // const handleAddSlide = () => {
  //   setNewStorySlides([
  //     ...newStorySlides,
  //     { type: "image", text: "", image: "" },
  //   ]);
  // };

  // const handleSlideChange = (index: number, field: string, value: string) => {
  //   const updatedSlides = [...newStorySlides];
  //   updatedSlides[index] = { ...updatedSlides[index], [field]: value };
  //   setNewStorySlides(updatedSlides);
  // };

  // const handleSubmitNewStory = () => {
  //   if (activeFolderId === null) return;
  //   const folder = folders.find((f) => f.id === activeFolderId);
  //   const slug =
  //     folder?.title.toLowerCase().replace(/\s+/g, "-") || "story-slug";

  //   const newStory: Story = {
  //     id: stories[activeFolderId]?.length + 1 || 1,
  //     title: newStoryTitle,
  //     image: newStorySlides[0].image || "https://via.placeholder.com/150", // first slide image as cover
  //     slug,
  //     slides: newStorySlides,
  //   };

  //   setStories((prev) => ({
  //     ...prev,
  //     [activeFolderId]: [...(prev[activeFolderId] || []), newStory],
  //   }));

  //   // Reset
  //   setShowStoryForm(false);
  //   setNewStoryTitle("");
  //   setNewStorySlides([
  //     { type: "image", text: "", image: "" },
  //     { type: "video", text: "", image: "" },
  //   ]);
  // };

  const [newSlide, setNewSlide] = useState({
    type: "image",
    text: "",
    image: "",
  });

  const handleSubmitNewSlide = () => {
    if (!activeFolderId) return;

    const newStory = {
      id: Date.now(),
      title: "Untitled Story",
      slug: folders.find((f) => f.id === activeFolderId)?.slug || "",
      slides: [newSlide],
      image: newSlide.image,
    };

    setStories((prev) => ({
      ...prev,
      [activeFolderId]: [...(prev[activeFolderId] || []), newStory],
    }));

    setNewSlide({ type: "image", text: "", image: "" });
    setShowStoryForm(false);
  };

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await fetch("/api/story-folder");
        if (!res.ok) throw new Error("Failed to fetch folders");
        const data: StoryFolder[] = await res.json();
        setFolders(data);
      } catch (error) {
        console.error("Error fetching story folders:", error);
      }
    };
    fetchFolders();
  }, []);

  return (
    <div className="container py-5 position-relative">
      {!showForm && (
        <div className="bg-white rounded shadow p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Story Folders</h2>
            <button
              className="btn btn-primary fw-semibold"
              onClick={() => setShowForm(true)}
            >
              + Add New Folder
            </button>
          </div>

          <table className="table table-borderless align-middle">
            <thead className="fw-semibold">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {folders.map((folder) => (
                <tr key={folder.id}>
                  <td>{folder.title}</td>
                  <td>{folder.category}</td>
                  <td>{folder.author}</td>
                  <td>{folder.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
          <div
            className="bg-white rounded shadow p-4"
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="fw-bold mb-0">Admin Panel</h2>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowForm(false)}
              >
                ← Back
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  value={title}
                  onChange={handleTitleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="slug" className="form-label">
                  Slug *
                </label>
                <input
                  type="text"
                  id="slug"
                  className="form-control"
                  value={slug}
                  readOnly
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="coverImage" className="form-label">
                  Cover Image URL *
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={coverImageName}
                    placeholder="/storytestimg.jpg"
                    readOnly
                  />
                  <input
                    type="file"
                    className="form-control"
                    id="coverImage"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  id="category"
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Finance</option>
                  <option>Health</option>
                  <option>Technology</option>
                  <option>Travel</option>
                  <option>Education</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="author" className="form-label">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  className="form-control"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-dark w-100 fw-semibold">
                Create
              </button>
            </form>
          </div>
      )}

      {/* 🟡 Overlay for Story Cards */}
      {showStoryOverlay && activeFolderId !== null && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-90 text-white d-flex flex-column p-5 z-3 overflow-auto">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold mb-0">
              Add Stories to 
              {folders.find((f) => f.id === activeFolderId)?.title}
            </h3>
            <button
              className="btn btn-outline-light"
              onClick={() => setShowStoryOverlay(false)}
            >
              ← Back to Folders
            </button>
          </div>

          <div className="row g-4">
            {(stories[activeFolderId] || []).map((story) => (
              <div key={story.id} className="col-6 col-md-3">
                <div className="card bg-white text-dark h-100">
                  <Image
                    src={story.image}
                    alt={story.title}
                    width={300}
                    height={200}
                    className={styles.cardImg}
                  />
                  
                </div>
              </div>
            ))}

            {/* Add Story Card */}
            {/* Add Story Card */}
            <div className="col-6 col-md-3">
              <div
                className="card h-100 d-flex justify-content-center align-items-center bg-secondary text-white"
                style={{ cursor: "pointer", minHeight: "150px" }}
                onClick={() => setShowStoryForm(true)}
              >
                <h1 className="display-4">+</h1>
                <p className="mb-0">Add New Story</p>
              </div>
            </div>

            {/* Story Creation Form Modal */}
            {showStoryForm && (
              <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-90 text-white overflow-auto z-5 p-4">
                <div
                  className="bg-secondary p-4 rounded mx-auto"
                  style={{ maxWidth: "600px" }}
                >
                  <h4 className="mb-4 text-center">Add New Slide</h4>

                  <div className="border bg-light text-dark rounded p-3 mb-3">
                    {/* Slide Type */}
                    <div className="mb-3">
                      <label className="form-label">Slide Type</label>
                      <select
                        className="form-select"
                        value={newSlide.type}
                        onChange={(e) =>
                          setNewSlide({ ...newSlide, type: e.target.value })
                        }
                      >
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                      </select>
                    </div>

                    {/* Slide Text */}
                    <div className="mb-3">
                      <label className="form-label">Slide Text</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Describe this slide..."
                        value={newSlide.text}
                        onChange={(e) =>
                          setNewSlide({ ...newSlide, text: e.target.value })
                        }
                      />
                    </div>

                    {/* File Upload */}
                    <div className="mb-3">
                      <label className="form-label">
                        Upload {newSlide.type === "video" ? "Video" : "Image"}
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        accept={
                          newSlide.type === "video" ? "video/*" : "image/*"
                        }
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setNewSlide({ ...newSlide, image: url });
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-between gap-3">
                    <button
                      className="btn btn-success"
                      onClick={handleSubmitNewSlide}
                    >
                      Save Slide
                    </button>
                    <button
                      className="btn btn-outline-light"
                      onClick={() => setShowStoryForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateStoryPanel;
