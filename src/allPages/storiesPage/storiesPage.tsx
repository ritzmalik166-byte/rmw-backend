"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiShare2, FiBookOpen } from "react-icons/fi";

const stories = [
  {
    id: 1,
    title: "How money is made",
    slug: "how-money-is-made",
    cover_image_url: "/storytestimg.jpg",
    category: "Finance",
    author: "How Stuff Is Made",
    date: "May 15, 2025",
  },
  {
    id: 2,
    title: "5 Tips To Stay Focused While Studying",
    slug: "study-focus-tips",
    cover_image_url: "/storytestimg.jpg",
    category: "Education",
    author: "Campus Guru",
    date: "May 15, 2025",
  },
  {
    id: 3,
    title: "Amazing Health Benefits Of Jowar",
    slug: "jowar-benefits",
    cover_image_url: "/storytestimg.jpg",
    category: "Health",
    author: "Wellness Daily",
    date: "May 15, 2025",
  }
];

export default function WebStoriesPage() {
  const router = useRouter();

  useEffect(() => {
    const cards = document.querySelectorAll(".story-card");
    cards.forEach((card, index) => {
      (card as HTMLElement).style.opacity = "0";
      setTimeout(() => {
        (card as HTMLElement).style.transition = "opacity 0.6s ease";
        (card as HTMLElement).style.opacity = "1";
      }, index * 150);
    });
  }, []);

  const openStory = (slug: string) => {
    router.push(`/stories/${slug}`);
  };

  return (
    <div className="container py-5" style={{ marginTop: "60px" }}>
      <div
  className="d-flex justify-content-between align-items-center mb-4 px-3 py-2 rounded"
  style={{
    backgroundColor: "rgba(0, 0, 0, 0.4)",   // semi-transparent black
    backdropFilter: "blur(6px)",             // blur effect
    WebkitBackdropFilter: "blur(6px)",       // Safari support
  }}
>
        <h1 className="text-black d-flex align-items-center gap-2" style={{ 
          fontSize: "1.5rem",
          fontWeight: "600",
          margin: "0"
        }}>
          <FiBookOpen className="text-black" /> WEB STORIES
        </h1>
        <button className="btn btn-sm btn-dark d-flex align-items-center gap-1">
          <FiShare2 /> Share
        </button>
      </div>

      <div className="row g-4"
      >
        {stories.map((story) => (
          <div
            key={story.id}
            className="col-6 col-md-4 col-lg-3 story-card"
            style={{ cursor: "pointer" }}
            onClick={() => openStory(story.slug)}
          >
            <div
              className="rounded-3 overflow-hidden position-relative"
              style={{
                aspectRatio: "2 / 3",
                transition: "transform 0.3s ease",
              }}
            >
              <Image
                src={story.cover_image_url}
                alt={story.title}
                fill
                className="object-fit-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div
                className="position-absolute bottom-0 w-100 p-2"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.05))",
                }}
              >
                <div
                  className="text-white fw-semibold"
                  style={{ fontSize: "0.95rem" }}
                >
                  {story.title}
                </div>
              </div>
              <div
                className="position-absolute bottom-0 start-0 w-100 border-bottom border-white border-2"
                style={{ borderStyle: "dashed" }}
              ></div>
            </div>
            <div className="mt-2 d-flex justify-content-between align-items-center text-muted small px-1">
              <span>{story.date}</span>
              <FiShare2 />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
